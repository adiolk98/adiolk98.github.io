#!/usr/bin/env python3
"""WAV / MP4 -> MP3 without duration drift.

Most online converters lose or gain seconds because they re-time the stream
(realtime capture, forced 44.1 kHz resampling, AAC priming samples left in).
This keeps the source sample rate and channel layout, copies every sample once,
and writes the LAME/Xing header so players report the exact original length.

    python3 scripts/audio_to_mp3.py in.wav clip.mp4
    python3 scripts/audio_to_mp3.py -b 256 -o out/ *.m4a
    python3 scripts/audio_to_mp3.py --vbr in.wav        # LAME V0, ~245 kbps
    python3 scripts/audio_to_mp3.py --self-test

Requires ffmpeg + ffprobe on PATH.
"""

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

MP3_SAMPLE_RATES = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000]
TOLERANCE_S = 0.05  # one MP3 frame at 44.1 kHz is ~0.026 s


def nearest_mp3_sample_rate(rate: int) -> int:
    """MP3-legal rate for `rate`, preferring an integer divisor (96000 -> 48000)."""
    divisors = [r for r in MP3_SAMPLE_RATES if rate % r == 0]
    if divisors:
        return max(divisors)
    return min(MP3_SAMPLE_RATES, key=lambda r: abs(r - rate))


def probe(path: Path) -> dict:
    """First audio stream's rate/channels/duration, falling back to container duration."""
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries",
         "stream=sample_rate,channels,duration", "-show_entries", "format=duration",
         "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    data = json.loads(out.stdout)
    streams = data.get("streams") or []
    if not streams:
        raise SystemExit(f"{path.name}: no audio stream found")
    stream = streams[0]
    duration = stream.get("duration") or data.get("format", {}).get("duration")
    return {
        "sample_rate": int(stream["sample_rate"]),
        "channels": int(stream["channels"]),
        "duration": float(duration) if duration not in (None, "N/A") else None,
    }


def convert(src: Path, dst: Path, bitrate: int, vbr: bool) -> dict:
    info = probe(src)
    rate = nearest_mp3_sample_rate(info["sample_rate"])
    channels = min(info["channels"], 2)
    quality = ["-q:a", "0"] if vbr else ["-b:a", f"{bitrate}k"]

    dst.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(src),
         "-vn", "-sn", "-dn", "-map", "0:a:0", "-map_metadata", "0",
         "-c:a", "libmp3lame", *quality,
         "-ar", str(rate), "-ac", str(channels),
         "-write_xing", "1", "-id3v2_version", "3", str(dst)],
        check=True,
    )

    result = probe(dst)
    delta = None
    if info["duration"] is not None and result["duration"] is not None:
        delta = result["duration"] - info["duration"]
    return {
        "src_rate": info["sample_rate"], "out_rate": rate,
        "channels": channels, "resampled": rate != info["sample_rate"],
        "src_duration": info["duration"], "out_duration": result["duration"],
        "delta": delta, "size_mb": dst.stat().st_size / 1024 / 1024,
    }


def self_test() -> int:
    """Encode a known 5.000 s 48 kHz tone and assert the length survives the round trip."""
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "tone.wav"
        mp3 = Path(tmp) / "tone.mp3"
        subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-f", "lavfi",
             "-i", "sine=frequency=440:sample_rate=48000:duration=5",
             "-c:a", "pcm_s16le", str(wav)],
            check=True,
        )
        r = convert(wav, mp3, bitrate=320, vbr=False)
        assert r["out_rate"] == 48000, f"resampled a legal rate: {r['out_rate']}"
        assert not r["resampled"], "48 kHz source must not be resampled"
        assert abs(r["delta"]) < TOLERANCE_S, f"duration drifted {r['delta']:+.3f}s"
        assert nearest_mp3_sample_rate(96000) == 48000
        assert nearest_mp3_sample_rate(88200) == 44100
        assert nearest_mp3_sample_rate(47000) == 48000
        print(f"self-test OK  (delta {r['delta']:+.3f}s, {r['out_rate']} Hz kept)")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert WAV/MP4 to MP3 with no duration drift.")
    parser.add_argument("inputs", nargs="*", type=Path, help="source .wav / .mp4 / .m4a files")
    parser.add_argument("-b", "--bitrate", type=int, default=320, help="CBR kbps (default 320)")
    parser.add_argument("--vbr", action="store_true", help="LAME V0 VBR instead of CBR")
    parser.add_argument("-o", "--outdir", type=Path, help="output directory (default: next to source)")
    parser.add_argument("--self-test", action="store_true", help="run the round-trip length check")
    args = parser.parse_args()

    if args.self_test:
        return self_test()
    if not args.inputs:
        parser.error("give at least one input file (or --self-test)")

    failed = 0
    for src in args.inputs:
        if not src.is_file():
            print(f"{src}: not a file", file=sys.stderr)
            failed += 1
            continue
        dst = (args.outdir or src.parent) / f"{src.stem}.mp3"
        try:
            r = convert(src, dst, args.bitrate, args.vbr)
        except subprocess.CalledProcessError as err:
            print(f"{src.name}: ffmpeg failed ({err.returncode})", file=sys.stderr)
            failed += 1
            continue

        rate_note = f"{r['src_rate']} -> {r['out_rate']} Hz (resampled)" if r["resampled"] \
            else f"{r['out_rate']} Hz (untouched)"
        drift = "n/a" if r["delta"] is None else f"{r['delta']:+.3f}s"
        print(f"{dst}  {r['size_mb']:.2f} MB  {rate_note}  "
              f"{'mono' if r['channels'] == 1 else 'stereo'}  drift {drift}")
        if r["delta"] is not None and abs(r["delta"]) > TOLERANCE_S:
            print(f"  WARNING: {src.name} drifted more than {TOLERANCE_S}s", file=sys.stderr)
            failed += 1

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

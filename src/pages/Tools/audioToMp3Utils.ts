// Sample rates MPEG-1/2/2.5 Layer III can actually store.
export const MP3_SAMPLE_RATES: number[] = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000];

/**
 * Pick an MP3-legal sample rate for a source rate.
 * Prefers an integer divisor (96000 -> 48000, 88200 -> 44100) so resampling stays clean.
 */
export const nearestMp3SampleRate = (rate: number): number => {
  const divisors = MP3_SAMPLE_RATES.filter((r) => rate % r === 0);
  if (divisors.length > 0) return Math.max(...divisors);
  return MP3_SAMPLE_RATES.reduce((best, r) => (Math.abs(r - rate) < Math.abs(best - rate) ? r : best));
};

export const floatTo16BitPCM = (input: Float32Array, out?: Int16Array): Int16Array => {
  const target = out ?? new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    target[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return target;
};

/**
 * Read the container's native sample rate without decoding, so the AudioContext can be
 * created at that exact rate and the browser never silently resamples on decode.
 * Returns null when unknown (caller falls back to the default context rate).
 */
export const readSourceSampleRate = (bytes: Uint8Array): number | null => {
  if (bytes.length < 44) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tag = (o: number): string => String.fromCharCode(bytes[o], bytes[o + 1], bytes[o + 2], bytes[o + 3]);
  const plausible = (r: number): number | null => (r >= 8000 && r <= 384000 ? r : null);

  // RIFF/WAVE: walk chunks to `fmt `, sample rate sits 4 bytes into its payload.
  if (tag(0) === 'RIFF' && tag(8) === 'WAVE') {
    let p = 12;
    while (p + 8 <= bytes.length) {
      const size = view.getUint32(p + 4, true);
      if (tag(p) === 'fmt ') return plausible(view.getUint32(p + 12, true));
      if (size <= 0) break;
      p += 8 + size + (size % 2);
    }
    return null;
  }

  // ISO-BMFF (mp4/m4a): the AudioSampleEntry holds samplerate as 16.16 fixed at type+28.
  // ponytail: linear byte scan instead of a box-tree walk; fine to a few hundred MB.
  for (let p = 4; p + 32 <= bytes.length; p++) {
    if (bytes[p] === 0x6d && tag(p) === 'mp4a') return plausible(view.getUint16(p + 28));
  }
  return null;
};

export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds - Math.floor(seconds)) * 1000);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
};

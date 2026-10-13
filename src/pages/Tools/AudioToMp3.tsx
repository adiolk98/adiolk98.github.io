import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mp3Encoder } from '@breezystack/lamejs';
import {
  MP3_SAMPLE_RATES,
  nearestMp3SampleRate,
  readSourceSampleRate,
  floatTo16BitPCM,
  formatDuration
} from './audioToMp3Utils';

interface ConversionResult {
  url: string;
  fileName: string;
  sizeMb: string;
  duration: string;
  sampleRate: number;
  channels: number;
  resampled: boolean;
  kbps: number;
}

const BITRATES = [320, 256, 192, 128];
const BLOCK = 1152; // one MPEG Layer III granule pair

export const AudioToMp3: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [kbps, setKbps] = useState<number>(320);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setStatusText('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const convert = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setResult(null);
    setStatusText('Reading file...');
    await new Promise((r) => setTimeout(r, 50));

    let ctx: AudioContext | null = null;
    try {
      const buffer = await selectedFile.arrayBuffer();

      // Decode at the source's own rate: decodeAudioData resamples to the context rate,
      // so guessing wrong here is exactly what makes other converters drift.
      const nativeRate = readSourceSampleRate(new Uint8Array(buffer));
      ctx = nativeRate
        ? new AudioContext({ sampleRate: nearestMp3SampleRate(nativeRate) })
        : new AudioContext();

      setStatusText('Decoding audio track (no re-timing, sample exact)...');
      await new Promise((r) => setTimeout(r, 50));

      let audio = await ctx.decodeAudioData(buffer);
      const sourceRate = audio.sampleRate;
      let resampled = false;

      // Only path that touches the samples: a rate MP3 simply cannot store.
      if (!MP3_SAMPLE_RATES.includes(audio.sampleRate)) {
        const target = nearestMp3SampleRate(audio.sampleRate);
        setStatusText(`Source rate ${audio.sampleRate} Hz is not MP3-legal, resampling to ${target} Hz...`);
        await new Promise((r) => setTimeout(r, 50));
        const offline = new OfflineAudioContext(
          Math.min(audio.numberOfChannels, 2),
          Math.round((audio.length * target) / audio.sampleRate),
          target
        );
        const source = offline.createBufferSource();
        source.buffer = audio;
        source.connect(offline.destination);
        source.start();
        audio = await offline.startRendering();
        resampled = true;
      }

      // ponytail: >2 channels keeps the front pair; add a proper downmix when a 5.1 source shows up.
      const channels = Math.min(audio.numberOfChannels, 2);
      const left = audio.getChannelData(0);
      const right = channels > 1 ? audio.getChannelData(1) : null;
      const total = audio.length;

      const encoder = new Mp3Encoder(channels, audio.sampleRate, kbps);
      const chunks: Uint8Array[] = [];
      const leftBlock = new Int16Array(BLOCK);
      const rightBlock = new Int16Array(BLOCK);

      for (let i = 0; i < total; i += BLOCK) {
        const size = Math.min(BLOCK, total - i);
        const l = floatTo16BitPCM(left.subarray(i, i + size), size === BLOCK ? leftBlock : undefined);
        const r = right ? floatTo16BitPCM(right.subarray(i, i + size), size === BLOCK ? rightBlock : undefined) : undefined;
        const encoded = channels > 1 ? encoder.encodeBuffer(l, r) : encoder.encodeBuffer(l);
        if (encoded.length > 0) chunks.push(encoded);

        if ((i / BLOCK) % 200 === 0) {
          setStatusText(`Encoding MP3 @ ${kbps} kbps... ${Math.round((i / total) * 100)}%`);
          await new Promise((r) => setTimeout(r, 0));
        }
      }

      const tail = encoder.flush();
      if (tail.length > 0) chunks.push(tail);

      const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');

      setResult({
        url: URL.createObjectURL(blob),
        fileName: `${baseName}.mp3`,
        sizeMb: (blob.size / 1024 / 1024).toFixed(2),
        duration: formatDuration(total / audio.sampleRate),
        sampleRate: audio.sampleRate,
        channels,
        resampled: resampled || audio.sampleRate !== sourceRate,
        kbps
      });
      setStatusText('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusText(`X CONVERSION FAILED: ${message} (no decodable audio track?)`);
    } finally {
      ctx?.close();
      setIsProcessing(false);
    }
  };

  return (
    <div className="tool-detail" style={{
      fontFamily: "'DotGothic16', monospace",
      background: "var(--crt-phos-2)",
      color: "var(--crt-ink)",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100%',
      flexShrink: 0,
      padding: '1em',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Helmet>
        <title>WAV / MP4 to MP3 Converter | adi's Toolbox</title>
        <meta name="description" content="Convert WAV and MP4 files to MP3 in your browser with sample-exact duration and no extra re-encoding. 100% client-side, nothing is uploaded." />
      </Helmet>



      <div style={{ maxWidth: '640px', width: '100%', zIndex: 1 }}>
        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link className="px"
            to="/tools"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.75em",
              color: "var(--crt-rose-lo)",
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: "var(--crt-tan)",
              padding: '8px 16px',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              imageRendering: 'pixelated'
            }}
          >
            {'◄'} BACK TO TOOLBOX
          </Link>
        </div>

        {/* Retro Card */}
        <div className="px" style={{
          background: "var(--crt-cream)",
          padding: '40px 32px',
          boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
          imageRendering: 'pixelated'
        }}>
          {/* Header */}
          <div style={{boxShadow: "inset 0 -.14em 0 var(--crt-line)",  marginBottom: '32px',  paddingBottom: '20px' }}>
            <div
              className="game-blink"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.65em",
                letterSpacing: '1px',
                marginBottom: '8px'
              }}
            >
              {'★'} SYSTEM UTILITY // AUDIO ENCODER {'★'}
            </div>
            <h1
              className="game-color-shift"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "1.4em",
                margin: '0 0 12px 0',
                lineHeight: 1.3
              }}
            >
              WAV / MP4 TO MP3
            </h1>
            <p style={{ color: "var(--crt-ink-2)", fontSize: "1.2em", margin: 0 }}>
              Sample-exact conversion: the original sample rate and channel layout are kept,
              nothing is trimmed or padded, and the file never leaves your browser.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="px"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.background = "var(--crt-tan)";
              e.currentTarget.style.boxShadow = 'inset 0 0 0 .2em var(--crt-rose-lo)';
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.style.background = "var(--crt-tan)";
              e.currentTarget.style.boxShadow = 'inset 0 0 0 .18em var(--crt-line)';
            }}
            onDrop={(e) => {
              handleDrop(e);
              e.currentTarget.style.background = "var(--crt-tan)";
              e.currentTarget.style.boxShadow = 'inset 0 0 0 .18em var(--crt-line)';
            }}
            role="button"
            tabIndex={0}
            aria-label="選擇音訊檔案"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('fileInput')?.click();
              }
            }}
            onClick={() => document.getElementById('fileInput')?.click()}
            style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              padding: '36px 20px',
              cursor: 'pointer',
              background: "var(--crt-tan)",
              marginBottom: '28px',
              transition: 'all 0.1s step-end',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div className="px" style={{
                fontFamily: "'Press Start 2P', monospace",
                width: '48px',
                height: '48px',
                boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: "1.2em",
                background: selectedFile ? "var(--crt-green)" : "var(--crt-rose-lo)",
                color: "var(--crt-ink)"
              }}>
                {selectedFile ? '✓' : '+'}
              </div>
              <span style={{ fontSize: "1.2em", color: selectedFile ? "var(--crt-green)" : "var(--crt-ink)" }}>
                {selectedFile ? `SELECTED: ${selectedFile.name}` : 'Drag & drop WAV / MP4 / M4A here, or click to browse'}
              </span>
            </div>
            <input
              type="file"
              id="fileInput"
              accept=".wav,.mp4,.m4a,.mov,.aac,.mp3,audio/*,video/mp4"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Bitrate Selector */}
          <div className="px" style={{
            marginBottom: '28px',
            padding: '16px 20px',
            background: "var(--crt-tan)",
            boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
          }}>
            <label style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.75em",
              color: "var(--crt-ink)",
              display: 'block',
              marginBottom: '14px'
            }}>
              BITRATE (CBR)
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {BITRATES.map((rate) => (
                <button className="px"
                  key={rate}
                  onClick={() => setKbps(rate)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.7em",
                    padding: '10px 12px',
                    cursor: 'pointer',
                    background: kbps === rate ? "var(--crt-rose-lo)" : "var(--crt-cream)",
                    color: kbps === rate ? "var(--crt-tan)" : "var(--crt-ink-2)",
                    boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
                  }}
                >
                  {rate}k
                </button>
              ))}
            </div>
            <div style={{ fontSize: "1.05em", color: "var(--crt-ink-2)", marginTop: '12px' }}>
              320k is the LAME ceiling. Sample rate and channel count always follow the source.
            </div>
          </div>

          {/* Action Button */}
          <button className="px"
            onClick={convert}
            disabled={!selectedFile || isProcessing}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              background: !selectedFile || isProcessing ? "var(--crt-line)" : "var(--crt-green)",
              color: !selectedFile || isProcessing ? "var(--crt-ink-2)" : "var(--crt-tan)",
              padding: '18px',
              fontSize: "0.85em",
              cursor: !selectedFile || isProcessing ? 'not-allowed' : 'pointer',
              width: '100%',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              transition: 'all 0.1s step-end',
              imageRendering: 'pixelated'
            }}
          >
            {isProcessing ? 'ENCODING...' : 'CONVERT TO MP3 ►'}
          </button>

          {/* Status Output Terminal */}
          {statusText && (
            <div className="px" style={{
              marginTop: '24px',
              padding: '16px',
              background: "var(--crt-tan)",
              color: "var(--crt-green)",
              fontFamily: "'DotGothic16', monospace",
              fontSize: "1.2em",
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
            }}>
              {'>'} {statusText}
            </div>
          )}

          {/* Result Output */}
          {result && (
            <div className="px" style={{
              marginTop: '28px',
              padding: '24px',
              background: "var(--crt-tan)",
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
            }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.8em",
                color: "var(--crt-green)",
                textAlign: 'center'
              }}>
                {'✓'} ENCODE COMPLETE
              </div>

              <div style={{ fontSize: "1.15em", color: "var(--crt-ink-2)", lineHeight: 1.6 }}>
                <div>DURATION : {result.duration} (every sample kept; MP3 frame padding adds &lt;= 50 ms)</div>
                <div>RATE&nbsp;&nbsp;&nbsp;&nbsp; : {result.sampleRate} Hz {result.resampled ? '(resampled, source rate not MP3-legal)' : '(untouched)'}</div>
                <div>CHANNELS : {result.channels === 1 ? 'MONO' : 'STEREO'} @ {result.kbps} kbps CBR</div>
                <div>SIZE&nbsp;&nbsp;&nbsp;&nbsp; : {result.sizeMb} MB</div>
              </div>

              <audio controls src={result.url} style={{ width: '100%' }} />

              <a className="px"
                href={result.url}
                download={result.fileName}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  display: 'block',
                  background: "var(--crt-rose-lo)",
                  color: "var(--crt-ink)",
                  textDecoration: 'none',
                  padding: '16px 20px',
                  fontSize: "0.8em",
                  width: '100%',
                  textAlign: 'center',
                  boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                  boxSizing: 'border-box'
                }}
              >
                DOWNLOAD {result.fileName.length > 20 ? 'MP3' : result.fileName} {'►'}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

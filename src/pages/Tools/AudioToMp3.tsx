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
    <div style={{
      fontFamily: "'VT323', 'DotGothic16', monospace",
      background: '#0F0E17',
      color: '#FFFFFE',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      flexShrink: 0,
      padding: '60px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Helmet>
        <title>WAV / MP4 to MP3 Converter | adi's Toolbox</title>
        <meta name="description" content="Convert WAV and MP4 files to MP3 in your browser with sample-exact duration and no extra re-encoding. 100% client-side, nothing is uploaded." />
      </Helmet>

      {/* CRT Scanline Overlay Effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 99
      }} />

      <div style={{ maxWidth: '640px', width: '100%', zIndex: 1 }}>
        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/tools"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.75rem',
              color: '#FF8E3C',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#2A2A3B',
              padding: '8px 16px',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              imageRendering: 'pixelated'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF8E3C';
              e.currentTarget.style.color = '#0F0E17';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2A2A3B';
              e.currentTarget.style.color = '#FF8E3C';
            }}
          >
            {'◄'} BACK TO TOOLBOX
          </Link>
        </div>

        {/* Retro Card */}
        <div style={{
          background: '#16161A',
          padding: '40px 32px',
          border: '4px solid #000000',
          boxShadow: '8px 8px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
          imageRendering: 'pixelated'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px', borderBottom: '3px dashed #383A3F', paddingBottom: '20px' }}>
            <div
              className="game-blink"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
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
                fontSize: '1.4rem',
                margin: '0 0 12px 0',
                lineHeight: 1.3
              }}
            >
              WAV / MP4 TO MP3
            </h1>
            <p style={{ color: '#A7A9BE', fontSize: '1.2rem', margin: 0 }}>
              Sample-exact conversion: the original sample rate and channel layout are kept,
              nothing is trimmed or padded, and the file never leaves your browser.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.background = '#2A2A3B';
              e.currentTarget.style.borderColor = '#FF8E3C';
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.style.background = '#0F0E17';
              e.currentTarget.style.borderColor = '#383A3F';
            }}
            onDrop={(e) => {
              handleDrop(e);
              e.currentTarget.style.background = '#0F0E17';
              e.currentTarget.style.borderColor = '#383A3F';
            }}
            onClick={() => document.getElementById('fileInput')?.click()}
            style={{
              border: '3px dashed #383A3F',
              padding: '36px 20px',
              cursor: 'pointer',
              background: '#0F0E17',
              marginBottom: '28px',
              transition: 'all 0.1s step-end',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                width: '48px',
                height: '48px',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                background: selectedFile ? '#2CB67D' : '#FF8E3C',
                color: '#0F0E17'
              }}>
                {selectedFile ? '✓' : '+'}
              </div>
              <span style={{ fontSize: '1.2rem', color: selectedFile ? '#2CB67D' : '#FFFFFE' }}>
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
          <div style={{
            marginBottom: '28px',
            border: '3px solid #000000',
            padding: '16px 20px',
            background: '#0F0E17',
            boxShadow: '4px 4px 0px #000000'
          }}>
            <label style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.75rem',
              color: '#FFFFFE',
              display: 'block',
              marginBottom: '14px'
            }}>
              BITRATE (CBR)
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {BITRATES.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setKbps(rate)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.7rem',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    border: '3px solid #000000',
                    background: kbps === rate ? '#FF8E3C' : '#16161A',
                    color: kbps === rate ? '#0F0E17' : '#A7A9BE',
                    boxShadow: kbps === rate ? '3px 3px 0px #000000' : 'none'
                  }}
                >
                  {rate}k
                </button>
              ))}
            </div>
            <div style={{ fontSize: '1.05rem', color: '#A7A9BE', marginTop: '12px' }}>
              320k is the LAME ceiling. Sample rate and channel count always follow the source.
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={convert}
            disabled={!selectedFile || isProcessing}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              background: !selectedFile || isProcessing ? '#383A3F' : '#2CB67D',
              color: !selectedFile || isProcessing ? '#A7A9BE' : '#0F0E17',
              border: '3px solid #000000',
              padding: '18px',
              fontSize: '0.85rem',
              cursor: !selectedFile || isProcessing ? 'not-allowed' : 'pointer',
              width: '100%',
              boxShadow: !selectedFile || isProcessing ? 'none' : '5px 5px 0px #000000',
              transition: 'all 0.1s step-end',
              imageRendering: 'pixelated'
            }}
            onMouseDown={(e) => {
              if (!selectedFile || isProcessing) return;
              e.currentTarget.style.transform = 'translate(3px, 3px)';
              e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
            }}
            onMouseUp={(e) => {
              if (!selectedFile || isProcessing) return;
              e.currentTarget.style.transform = 'translate(0px, 0px)';
              e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
            }}
          >
            {isProcessing ? 'ENCODING...' : 'CONVERT TO MP3 ►'}
          </button>

          {/* Status Output Terminal */}
          {statusText && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              border: '3px solid #000000',
              background: '#0F0E17',
              color: '#2CB67D',
              fontFamily: "'VT323', monospace",
              fontSize: '1.2rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              {'>'} {statusText}
            </div>
          )}

          {/* Result Output */}
          {result && (
            <div style={{
              marginTop: '28px',
              padding: '24px',
              border: '3px solid #2CB67D',
              background: '#0F0E17',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '5px 5px 0px #000000'
            }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.8rem',
                color: '#2CB67D',
                textAlign: 'center'
              }}>
                {'✓'} ENCODE COMPLETE
              </div>

              <div style={{ fontSize: '1.15rem', color: '#A7A9BE', lineHeight: 1.6 }}>
                <div>DURATION : {result.duration} (every sample kept; MP3 frame padding adds &lt;= 50 ms)</div>
                <div>RATE&nbsp;&nbsp;&nbsp;&nbsp; : {result.sampleRate} Hz {result.resampled ? '(resampled, source rate not MP3-legal)' : '(untouched)'}</div>
                <div>CHANNELS : {result.channels === 1 ? 'MONO' : 'STEREO'} @ {result.kbps} kbps CBR</div>
                <div>SIZE&nbsp;&nbsp;&nbsp;&nbsp; : {result.sizeMb} MB</div>
              </div>

              <audio controls src={result.url} style={{ width: '100%' }} />

              <a
                href={result.url}
                download={result.fileName}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  display: 'block',
                  background: '#FF8E3C',
                  color: '#0F0E17',
                  textDecoration: 'none',
                  padding: '16px 20px',
                  fontSize: '0.8rem',
                  width: '100%',
                  textAlign: 'center',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  boxSizing: 'border-box'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
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

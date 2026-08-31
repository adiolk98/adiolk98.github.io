import { describe, it, expect } from 'vitest';
import {
  nearestMp3SampleRate,
  floatTo16BitPCM,
  readSourceSampleRate,
  formatDuration
} from '../audioToMp3Utils';

const wavWithRate = (rate: number): Uint8Array => {
  const bytes = new Uint8Array(64);
  const view = new DataView(bytes.buffer);
  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) bytes[offset + i] = text.charCodeAt(i);
  };
  ascii(0, 'RIFF');
  view.setUint32(4, 56, true);
  ascii(8, 'WAVE');
  ascii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 2, true);
  view.setUint32(24, rate, true);
  ascii(36, 'data');
  view.setUint32(40, 20, true);
  return bytes;
};

const mp4WithRate = (rate: number): Uint8Array => {
  const bytes = new Uint8Array(128);
  const view = new DataView(bytes.buffer);
  const at = 60; // 'mp4a' type field, samplerate is 16.16 fixed at +28
  bytes.set([0x6d, 0x70, 0x34, 0x61], at);
  view.setUint16(at + 28, rate);
  return bytes;
};

describe('audioToMp3Utils', () => {
  it('keeps MP3-legal rates and picks a clean divisor otherwise', () => {
    expect(nearestMp3SampleRate(44100)).toBe(44100);
    expect(nearestMp3SampleRate(48000)).toBe(48000);
    expect(nearestMp3SampleRate(96000)).toBe(48000);
    expect(nearestMp3SampleRate(88200)).toBe(44100);
    expect(nearestMp3SampleRate(47000)).toBe(48000);
  });

  it('converts float samples to 16-bit PCM and clamps out-of-range values', () => {
    const out = floatTo16BitPCM(new Float32Array([0, 1, -1, 2, -2, 0.5]));
    expect(Array.from(out)).toEqual([0, 32767, -32768, 32767, -32768, 16383]);
  });

  it('reads the native sample rate from WAV and MP4 headers', () => {
    expect(readSourceSampleRate(wavWithRate(48000))).toBe(48000);
    expect(readSourceSampleRate(wavWithRate(44100))).toBe(44100);
    expect(readSourceSampleRate(mp4WithRate(44100))).toBe(44100);
    expect(readSourceSampleRate(new Uint8Array(128))).toBeNull();
  });

  it('formats durations to millisecond precision', () => {
    expect(formatDuration(201.457)).toBe('03:21.457');
  });
});

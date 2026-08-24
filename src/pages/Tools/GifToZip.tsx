import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import JSZip from 'jszip';
import omggif from 'omggif';

export const GifToZip: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [frameCount, setFrameCount] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [result, setResult] = useState<{ thumb: string; zipUrl: string; fileName: string } | null>(null);

  const handleFileChange = (file: File) => {
    if (file.type !== 'image/gif') {
      alert('Please select a valid GIF file!');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setStatusText('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const processGif = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setResult(null);
    setStatusText('Reading GIF file... (this may take a few seconds)');

    await new Promise((r) => setTimeout(r, 50));

    try {
      const buffer = await selectedFile.arrayBuffer();
      const byteArray = new Uint8Array(buffer);
      const reader = new omggif.GifReader(byteArray);

      const totalFrames = reader.numFrames();
      const width = reader.width;
      const height = reader.height;

      setStatusText(`Parsed successfully! Original frames: ${totalFrames}, preparing extraction...`);
      await new Promise((r) => setTimeout(r, 50));

      const extractedFrames: HTMLCanvasElement[] = [];
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to create Canvas context');

      const imageData = ctx.createImageData(width, height);
      let previousImageData: Uint8ClampedArray | null = null;

      for (let i = 0; i < totalFrames; i++) {
        const frameInfo = reader.frameInfo(i);

        if (frameInfo.disposal === 3) {
          previousImageData = new Uint8ClampedArray(imageData.data);
        }

        reader.decodeAndBlitFrameRGBA(i, imageData.data);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.putImageData(imageData, 0, 0);
          extractedFrames.push(tempCanvas);
        }

        if (frameInfo.disposal === 2) {
          for (let y = frameInfo.y; y < frameInfo.y + frameInfo.height; y++) {
            for (let x = frameInfo.x; x < frameInfo.x + frameInfo.width; x++) {
              const idx = (y * width + x) * 4;
              imageData.data[idx] = 0;
              imageData.data[idx + 1] = 0;
              imageData.data[idx + 2] = 0;
              imageData.data[idx + 3] = 0;
            }
          }
        } else if (frameInfo.disposal === 3 && previousImageData) {
          imageData.data.set(previousImageData);
        }

        if (i % 5 === 0) {
          setStatusText(`Extracting frames... (${i + 1}/${totalFrames})`);
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      const targetCount = frameCount || 100;
      setStatusText(`Packaging... Generating ${targetCount} PNG images`);
      await new Promise((r) => setTimeout(r, 50));

      const zip = new JSZip();
      let firstFrameThumb = '';

      for (let i = 0; i < targetCount; i++) {
        const frameCanvas = extractedFrames[i % totalFrames];

        if (i === 0) {
          firstFrameThumb = frameCanvas.toDataURL('image/png');
        }

        const blob = await new Promise<Blob | null>((resolve) => frameCanvas.toBlob(resolve, 'image/png'));
        if (blob) {
          const fileName = `frame_${String(i + 1).padStart(3, '0')}.png`;
          zip.file(fileName, blob);
        }

        if (i % 10 === 0) {
          setStatusText(`Adding to archive... (${i + 1}/${targetCount})`);
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      setStatusText('Compressing into ZIP archive...');
      await new Promise((r) => setTimeout(r, 50));

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');

      setResult({
        thumb: firstFrameThumb,
        zipUrl,
        fileName: `${baseName}_${targetCount}pngs.zip`
      });
      setStatusText('');
    } catch (err: any) {
      console.error(err);
      setStatusText('❌ Conversion failed: ' + (err.message || 'Unknown error'));
    } finally {
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
        <title>GIF to ZIP Converter | adi's Toolbox</title>
        <meta name="description" content="Online tool to extract and convert GIF animations into individual PNG frame sequences, downloadable as a ZIP archive." />
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

      {/* Main Container */}
      <div style={{
        maxWidth: '640px',
        width: '100%',
        zIndex: 1
      }}>
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
            ◄ BACK TO TOOLBOX
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
              ★ SYSTEM UTILITY // CONVERTER ★
            </div>
            <h1 
              className="game-color-shift"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.6rem',
                margin: '0 0 12px 0',
                lineHeight: 1.3
              }}
            >
              GIF TO ZIP
            </h1>
            <p style={{ color: '#A7A9BE', fontSize: '1.2rem', margin: 0 }}>
              Decompose GIF animations into PNG frame sequences and download as a ZIP package
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
                {selectedFile ? `SELECTED: ${selectedFile.name}` : 'Drag & drop GIF file here, or click to browse'}
              </span>
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/gif"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Preview Section */}
          {previewUrl && (
            <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ 
                fontFamily: "'Press Start 2P', monospace", 
                fontSize: '0.7rem', 
                color: '#2CB67D' 
              }}>
                PREVIEW [GIF]
              </label>
              <div style={{ 
                border: '3px solid #000000', 
                padding: '12px', 
                background: '#0F0E17', 
                display: 'inline-block',
                boxShadow: '4px 4px 0px #000000',
                imageRendering: 'pixelated'
              }}>
                <img src={previewUrl} alt="GIF 預覽" style={{ maxWidth: '100%', maxHeight: '250px', display: 'block', imageRendering: 'pixelated' }} />
              </div>
            </div>
          )}

          {/* Settings Section */}
          <div style={{
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '3px solid #000000',
            padding: '16px 20px',
            background: '#0F0E17',
            boxShadow: '4px 4px 0px #000000'
          }}>
            <label style={{ 
              fontFamily: "'Press Start 2P', monospace", 
              fontSize: '0.75rem', 
              color: '#FFFFFE' 
            }}>
              TARGET FRAMES
            </label>
            <input
              type="number"
              value={frameCount}
              min={1}
              max={500}
              onChange={(e) => setFrameCount(parseInt(e.target.value) || 100)}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                background: '#16161A',
                border: '3px solid #000000',
                color: '#FF8E3C',
                padding: '8px 12px',
                width: '90px',
                fontSize: '0.9rem',
                textAlign: 'center',
                outline: 'none'
              }}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={processGif}
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
            {isProcessing ? 'PROCESSING...' : 'PROCESS & EXPORT ZIP ►'}
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
              alignItems: 'center',
              gap: '20px',
              boxShadow: '5px 5px 0px #000000'
            }}>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace", 
                fontSize: '0.8rem', 
                color: '#2CB67D' 
              }}>
                ✓ CONVERSION COMPLETE
              </div>
              <div style={{ border: '3px solid #000000', padding: '8px', background: '#16161A' }}>
                <img src={result.thumb} alt="第一幀縮圖" style={{ maxWidth: '100%', maxHeight: '180px', display: 'block', imageRendering: 'pixelated' }} />
              </div>
              <a
                href={result.zipUrl}
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
                DOWNLOAD ZIP (.ZIP) ►
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


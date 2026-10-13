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
      setStatusText(' Conversion failed: ' + (err.message || 'Unknown error'));
    } finally {
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
        <title>GIF to ZIP Converter | adi's Toolbox</title>
        <meta name="description" content="Online tool to extract and convert GIF animations into individual PNG frame sequences, downloadable as a ZIP archive." />
      </Helmet>


      {/* Main Container */}
      <div style={{
        maxWidth: '640px',
        width: '100%',
        zIndex: 1
      }}>
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
            ◄ BACK TO TOOLBOX
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
              SYSTEM UTILITY / CONVERTER
            </div>
            <h1
              className="game-color-shift"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "1.6em",
                margin: '0 0 12px 0',
                lineHeight: 1.3
              }}
            >
              GIF TO ZIP
            </h1>
            <p style={{ color: "var(--crt-ink-2)", fontSize: "1.2em", margin: 0 }}>
              將 GIF 拆成 PNG 圖片，打包下載。
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
            aria-label="選擇GIF檔案"
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
                fontSize: "0.7em",
                color: "var(--crt-green)"
              }}>
                PREVIEW [GIF]
              </label>
              <div className="px" style={{
                padding: '12px',
                background: "var(--crt-tan)",
                display: 'inline-block',
                boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                imageRendering: 'pixelated'
              }}>
                <img src={previewUrl} alt="GIF 預覽" style={{ maxWidth: '100%', maxHeight: '250px', display: 'block', imageRendering: 'pixelated' }} />
              </div>
            </div>
          )}

          {/* Settings Section */}
          <div className="px" style={{
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            background: "var(--crt-tan)",
            boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
          }}>
            <label style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.75em",
              color: "var(--crt-ink)"
            }}>
              TARGET FRAMES
            </label>
            <input className="px"
              type="number"
              value={frameCount}
              min={1}
              max={500}
              onChange={(e) => setFrameCount(parseInt(e.target.value) || 100)}
              style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                fontFamily: "'Press Start 2P', monospace",
                background: "var(--crt-cream)",
                color: "var(--crt-rose-lo)",
                padding: '8px 12px',
                width: '90px',
                fontSize: "0.9em",
                textAlign: 'center',
                outline: 'none'
              }}
            />
          </div>

          {/* Action Button */}
          <button className="px"
            onClick={processGif}
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
            {isProcessing ? 'PROCESSING...' : 'PROCESS & EXPORT ZIP ►'}
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
              alignItems: 'center',
              gap: '20px',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
            }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.8em",
                color: "var(--crt-green)"
              }}>
                ✓ CONVERSION COMPLETE
              </div>
              <div className="px" style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",   padding: '8px', background: "var(--crt-cream)" }}>
                <img src={result.thumb} alt="第一幀縮圖" style={{ maxWidth: '100%', maxHeight: '180px', display: 'block', imageRendering: 'pixelated' }} />
              </div>
              <a className="px"
                href={result.zipUrl}
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
                DOWNLOAD ZIP (.ZIP) ►
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


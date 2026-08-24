import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Rnd } from 'react-rnd';
import GIF from 'gif.js';

export const VideoToGif: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [resultSizeKb, setResultSizeKb] = useState<number | null>(null);

  // Video properties
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDim, setVideoDim] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(3);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [exportPreset, setExportPreset] = useState<'slack' | 'custom'>('slack');
  const [fps, setFps] = useState<number>(10);
  const [outputSize, setOutputSize] = useState<number>(128);

  // Crop box properties
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 200, height: 200 });

  const duration = Math.max(0.1, endTime - startTime);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file!');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setIsVideoLoading(true);
    setResult(null);
    setStatusText('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const dur = video.duration || 10;
    
    setVideoDuration(dur);
    setStartTime(0);
    setEndTime(exportPreset === 'slack' ? Math.min(dur, 2.0) : dur);
    setCurrentTime(0);

    // Force video to seek to 0s and pause so frame renders on mobile browsers without playing
    video.currentTime = 0;
    try {
      video.pause();
    } catch (_err) {}

    // Calculate actual rendered video dimensions considering object-fit: contain
    const rect = video.getBoundingClientRect();
    const naturalW = video.videoWidth || 300;
    const naturalH = video.videoHeight || 300;
    const elemW = rect.width || 300;
    const elemH = rect.height || 300;

    const cropSize = Math.min(200, Math.min(elemW * 0.8, elemH * 0.8));

    setVideoDim({
      width: elemW,
      height: elemH,
      naturalWidth: naturalW,
      naturalHeight: naturalH,
    });

    setCropBox({
      x: (elemW - cropSize) / 2,
      y: (elemH - cropSize) / 2,
      width: cropSize,
      height: cropSize,
    });

    setIsVideoLoading(false);
  };

  const processVideo = async () => {
    if (!videoRef.current || !selectedFile) return;

    setIsProcessing(true);
    setResult(null);
    setStatusText('Initializing GIF encoder...');

    const video = videoRef.current;
    
    // Natural intrinsic dimensions of video file
    const naturalW = video.videoWidth || videoDim.naturalWidth || 300;
    const naturalH = video.videoHeight || videoDim.naturalHeight || 300;

    // Get rendered element size
    const rect = video.getBoundingClientRect();
    const elemW = rect.width || videoDim.width || naturalW;
    const elemH = rect.height || videoDim.height || naturalH;

    // Account for object-fit: contain (letterboxing/pillarboxing inside <video> tag)
    const videoRatio = naturalW / naturalH;
    const elemRatio = elemW / elemH;

    let displayedW = elemW;
    let displayedH = elemH;
    let offsetX = 0;
    let offsetY = 0;

    if (elemRatio > videoRatio) {
      displayedW = elemH * videoRatio;
      offsetX = (elemW - displayedW) / 2;
    } else {
      displayedH = elemW / videoRatio;
      offsetY = (elemH - displayedH) / 2;
    }

    const scale = naturalW / displayedW;

    // Crop box position relative to actual video picture area
    const relCropX = Math.max(0, cropBox.x - offsetX);
    const relCropY = Math.max(0, cropBox.y - offsetY);

    const sourceX = Math.min(naturalW, relCropX * scale);
    const sourceY = Math.min(naturalH, relCropY * scale);
    const sourceW = Math.min(naturalW - sourceX, cropBox.width * scale);
    const sourceH = Math.min(naturalH - sourceY, cropBox.height * scale);

    let currentFps = exportPreset === 'slack' ? 10 : fps;
    let targetSize = outputSize || 128;
    const maxSlackBytes = 128 * 1024; // 128 KB limit for Slack

    // Helper to encode GIF with given fps & targetSize
    const generateGif = async (effectiveFps: number, dimensions: number): Promise<Blob> => {
      return new Promise<Blob>(async (resolve, reject) => {
        const gif = new GIF({
          workers: 2,
          quality: 10,
          workerScript: '/gif.worker.js',
          width: dimensions,
          height: dimensions,
        });

        const canvas = document.createElement('canvas');
        canvas.width = dimensions;
        canvas.height = dimensions;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        const delay = 1000 / effectiveFps;
        const totalFrames = Math.max(1, Math.floor(duration * effectiveFps));
        let currentFrame = 0;

        gif.on('progress', (p: number) => {
          setStatusText(`Encoding GIF (${dimensions}x${dimensions} @ ${effectiveFps}FPS)... ${Math.round(p * 100)}%`);
        });

        gif.on('finished', (blob: Blob) => {
          resolve(blob);
        });

        video.pause();

        for (let i = 0; i < totalFrames; i++) {
          const time = startTime + (i / effectiveFps);
          video.currentTime = time;

          await new Promise<void>((res) => {
            let timeoutId: number;
            const onSeeked = () => {
              clearTimeout(timeoutId);
              video.removeEventListener('seeked', onSeeked);
              res();
            };
            video.addEventListener('seeked', onSeeked);

            timeoutId = window.setTimeout(() => {
              video.removeEventListener('seeked', onSeeked);
              res();
            }, 150);
          });

          await new Promise((res) => setTimeout(res, 30));

          ctx.clearRect(0, 0, dimensions, dimensions);
          try {
            ctx.drawImage(
              video,
              sourceX, sourceY, sourceW, sourceH,
              0, 0, dimensions, dimensions
            );
          } catch (err) {
            console.error('Error drawing frame:', err);
          }

          gif.addFrame(ctx, { copy: true, delay });
          currentFrame++;
          setStatusText(`Extracting frames (${currentFrame}/${totalFrames})...`);
        }

        setStatusText('Rendering GIF...');
        gif.render();
      });
    };

    try {
      let finalBlob = await generateGif(currentFps, targetSize);

      // If Slack preset is active and output exceeds 128KB, automatically optimize parameters
      if (exportPreset === 'slack' && finalBlob.size > maxSlackBytes) {
        setStatusText(`Size is ${(finalBlob.size / 1024).toFixed(1)}KB (>128KB). Optimizing FPS & Resolution...`);
        
        // Pass 2: Try lowering FPS to 8
        currentFps = 8;
        finalBlob = await generateGif(currentFps, targetSize);

        // Pass 3: If still > 128KB, try FPS 6
        if (finalBlob.size > maxSlackBytes) {
          currentFps = 6;
          finalBlob = await generateGif(currentFps, targetSize);
        }

        // Pass 4: If still > 128KB, try 96x96 @ 6FPS
        if (finalBlob.size > maxSlackBytes) {
          currentFps = 6;
          targetSize = 96;
          finalBlob = await generateGif(currentFps, targetSize);
        }
      }

      const url = URL.createObjectURL(finalBlob);
      setResult(url);
      setResultSizeKb(Math.round(finalBlob.size / 1024));
      setStatusText(`Done! (${(finalBlob.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error('GIF generation failed:', err);
      setStatusText('GIF generation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Touch/Mobile detection state
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [isDraggingCrop, setIsDraggingCrop] = useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveToImages = async () => {
    if (!result) return;
    try {
      const response = await fetch(result);
      const blob = await response.blob();
      const fileName = `${selectedFile?.name ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'exported'}.gif`;
      const file = new File([blob], fileName, { type: 'image/gif' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Exported GIF',
          text: 'Save or share this GIF',
        });
      } else {
        // Fallback: Open image in new window/tab or direct long-press overlay
        const newTab = window.open(result, '_blank');
        if (!newTab) {
          alert('Long press the GIF image above and select "Save to Photos" / "Save Image".');
        }
      }
    } catch (err) {
      console.error('Error saving image:', err);
      alert('Long press the GIF image above and select "Save to Photos" / "Save Image".');
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
      padding: isMobile ? '20px 12px 40px' : '60px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Helmet>
        <title>Video to GIF | adi's Toolbox</title>
        <meta name="description" content="Crop a square from a video and convert it to a GIF." />
      </Helmet>

      {/* Main Container */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        zIndex: 1
      }}>
        {/* Back Link */}
        <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
          <Link 
            to="/tools" 
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              color: '#FF8E3C',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#2A2A3B',
              padding: isMobile ? '10px 14px' : '8px 16px',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              imageRendering: 'pixelated',
              touchAction: 'manipulation'
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
          padding: isMobile ? '20px 16px' : '40px 32px',
          border: '4px solid #000000',
          boxShadow: isMobile ? '4px 4px 0px #000000, inset -2px -2px 0px #242629' : '8px 8px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
          imageRendering: 'pixelated'
        }}>
          {/* Header */}
          <div style={{ marginBottom: isMobile ? '20px' : '32px', borderBottom: '3px dashed #383A3F', paddingBottom: isMobile ? '16px' : '20px' }}>
            <div 
              className="game-blink"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: isMobile ? '0.55rem' : '0.65rem',
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
                fontSize: isMobile ? '1.2rem' : '1.6rem',
                margin: '0 0 12px 0',
                lineHeight: 1.3
              }}
            >
              VIDEO TO GIF CROPPER
            </h1>
            <p style={{ color: '#A7A9BE', fontSize: isMobile ? '1rem' : '1.2rem', margin: 0 }}>
              Select a square region from your video and export it as a GIF.
            </p>
          </div>

          {/* Upload Dropzone */}
          {!videoUrl && (
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
                padding: isMobile ? '28px 16px' : '36px 20px',
                cursor: 'pointer',
                background: '#0F0E17',
                marginBottom: '28px',
                transition: 'all 0.1s step-end',
                textAlign: 'center',
                touchAction: 'manipulation'
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
                  background: '#FF8E3C',
                  color: '#0F0E17'
                }}>
                  +
                </div>
                <span style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#FFFFFE', lineHeight: 1.4 }}>
                  {isMobile ? 'Tap to choose a video file' : 'Drag & drop video file here, or click to browse'}
                </span>
              </div>
              <input
                type="file"
                id="fileInput"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}

          {/* Video Preview & Cropper */}
          {videoUrl && (
            <div style={{ marginBottom: '28px' }}>
              <label style={{ 
                fontFamily: "'Press Start 2P', monospace", 
                fontSize: isMobile ? '0.6rem' : '0.7rem', 
                color: '#2CB67D',
                marginBottom: '8px',
                display: 'block'
              }}>
                PREVIEW & CROP AREA
              </label>
              {/* Custom Integrated Player with Built-in Timeline Controls */}
              <div style={{ 
                position: 'relative', 
                border: '4px solid #000000', 
                background: '#0F0E17',
                boxShadow: isMobile ? '3px 3px 0px #000000' : '6px 6px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100%',
                overflow: 'hidden',
                borderRadius: '2px'
              }}>
                {/* Video Display Area */}
                <div style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%',
                  background: '#050508',
                  minHeight: isMobile ? '200px' : '260px',
                  overflow: 'hidden'
                }}>
                  {/* Loading overlay */}
                  {isVideoLoading && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15, 14, 23, 0.92)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 20,
                      gap: '16px'
                    }}>
                      <div className="retro-spinner" style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #383A3F',
                        borderTopColor: '#FF8E3C',
                        borderRightColor: '#2CB67D',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                      }} />
                      <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: isMobile ? '0.65rem' : '0.8rem',
                        color: '#FF8E3C',
                        letterSpacing: '1px'
                      }} className="game-blink">
                        LOADING VIDEO...
                      </div>
                    </div>
                  )}

                  {/* Video & Crop Overlay Wrapper */}
                  <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0 }}>
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      muted
                      preload="auto"
                      playsInline
                      webkit-playsinline="true"
                      onLoadStart={() => setIsVideoLoading(true)}
                      onLoadedMetadata={(e) => {
                        handleVideoLoaded(e);
                        const v = e.currentTarget;
                        // iOS Safari requires a play() + pause() tick on muted video to decode and display the first frame
                        const p = v.play();
                        if (p !== undefined) {
                          p.then(() => {
                            v.pause();
                            v.currentTime = 0;
                          }).catch(() => {
                            v.currentTime = 0;
                          });
                        }
                      }}
                      onLoadedData={(e) => {
                        handleVideoLoaded(e);
                      }}
                      onTimeUpdate={() => {
                        if (videoRef.current) {
                          setCurrentTime(videoRef.current.currentTime);
                          if (videoRef.current.currentTime >= endTime) {
                            videoRef.current.currentTime = startTime;
                          }
                        }
                      }}
                      style={{ display: 'block', maxWidth: '100%', maxHeight: isMobile ? '300px' : '420px', objectFit: 'contain' }}
                    />
                    
                    {videoDim.width > 0 && !isVideoLoading && (
                      <Rnd
                        bounds="parent"
                        position={{ x: cropBox.x, y: cropBox.y }}
                        size={{ width: cropBox.width, height: cropBox.height }}
                        onDragStart={() => setIsDraggingCrop(true)}
                        onDragStop={(_e, d) => {
                          setIsDraggingCrop(false);
                          setCropBox(prev => ({ ...prev, x: d.x, y: d.y }));
                        }}
                        onResizeStart={() => setIsDraggingCrop(true)}
                        onResizeStop={(_e, _dir, ref, _delta, position) => {
                          setIsDraggingCrop(false);
                          const newSize = Math.max(40, Math.min(ref.offsetWidth, ref.offsetHeight));
                          setCropBox({
                            width: newSize,
                            height: newSize,
                            x: position.x,
                            y: position.y
                          });
                        }}
                        lockAspectRatio={true}
                        style={{
                          border: '3px dashed #2CB67D',
                          boxShadow: isDraggingCrop ? '0 0 0 9999px rgba(0, 0, 0, 0.6)' : 'none',
                          cursor: 'move',
                          zIndex: 10,
                          touchAction: 'none'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: '#2CB67D',
                          color: '#0F0E17',
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: isMobile ? '0.45rem' : '0.5rem',
                          padding: '2px 4px',
                          fontWeight: 'bold',
                          pointerEvents: 'none'
                        }}>
                          GIF CROP
                        </div>
                      </Rnd>
                    )}
                  </div>
                </div>

                {/* Sleek Player Control Bar */}
                <div style={{
                  width: '100%',
                  background: '#16161A',
                  borderTop: '3px solid #000000',
                  padding: isMobile ? '12px 10px' : '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxSizing: 'border-box'
                }}>
                  {/* Timeline Title & Time Indicators */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    justifyContent: 'space-between', 
                    gap: isMobile ? '6px' : '0' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        background: '#2CB67D',
                        display: 'inline-block',
                        boxShadow: '0 0 6px #2CB67D'
                      }} />
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: isMobile ? '0.55rem' : '0.65rem', color: '#FFFFFE' }}>
                        TRIM TIMELINE
                      </span>
                    </div>

                    <div style={{ 
                      fontFamily: "'VT323', monospace", 
                      fontSize: isMobile ? '1.05rem' : '1.2rem', 
                      color: '#FF8E3C', 
                      display: 'flex', 
                      gap: isMobile ? '8px' : '12px',
                      flexWrap: 'wrap'
                    }}>
                      <span>CUR: <strong style={{ color: '#2CB67D' }}>{currentTime.toFixed(1)}s</strong></span>
                      <span>RANGE: <strong>{startTime.toFixed(1)}s - {endTime.toFixed(1)}s</strong></span>
                      <span>DUR: <strong>{duration.toFixed(1)}s</strong></span>
                    </div>
                  </div>

                  {/* Multi-layer Interactive Timeline Track */}
                  <div 
                    style={{
                      position: 'relative',
                      height: isMobile ? '40px' : '32px',
                      background: '#0F0E17',
                      border: '2px solid #383A3F',
                      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'visible',
                      cursor: 'pointer',
                      touchAction: 'none'
                    }}
                    onPointerDown={(e) => {
                      if (!videoDuration) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                      const clickRatio = clickX / rect.width;
                      const clickedTime = clickRatio * videoDuration;

                      const distS = Math.abs(clickedTime - startTime);
                      const distE = Math.abs(clickedTime - endTime);
                      const threshold = (videoDuration * 0.12) || 1.0; // Distance threshold to grab S or E handle

                      let activeTarget: 'S' | 'E' | 'PLAYHEAD' = 'PLAYHEAD';
                      if (exportPreset === 'slack') {
                        // In Slack preset, dragging anywhere on track adjusts the S position (moving the 1.5s window)
                        activeTarget = 'S';
                      } else {
                        if (distS <= threshold && distS <= distE) {
                          activeTarget = 'S';
                        } else if (distE <= threshold) {
                          activeTarget = 'E';
                        } else {
                          activeTarget = 'PLAYHEAD';
                        }
                      }

                      const handlePointerMove = (moveEvent: PointerEvent) => {
                        const mX = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
                        const mTime = (mX / rect.width) * videoDuration;

                        if (exportPreset === 'slack') {
                          const newS = Math.min(mTime, Math.max(0, videoDuration - 1.5));
                          setStartTime(newS);
                          setEndTime(newS + 1.5);
                          setCurrentTime(newS);
                          if (videoRef.current) videoRef.current.currentTime = newS;
                        } else {
                          if (activeTarget === 'S') {
                            const newS = Math.min(mTime, endTime - 0.1);
                            setStartTime(newS);
                            setCurrentTime(newS);
                            if (videoRef.current) videoRef.current.currentTime = newS;
                          } else if (activeTarget === 'E') {
                            const newE = Math.max(mTime, startTime + 0.1);
                            setEndTime(newE);
                            setCurrentTime(newE);
                            if (videoRef.current) videoRef.current.currentTime = newE;
                          } else {
                            setCurrentTime(mTime);
                            if (videoRef.current) videoRef.current.currentTime = mTime;
                          }
                        }
                      };

                      const handlePointerUp = () => {
                        window.removeEventListener('pointermove', handlePointerMove);
                        window.removeEventListener('pointerup', handlePointerUp);
                      };

                      window.addEventListener('pointermove', handlePointerMove);
                      window.addEventListener('pointerup', handlePointerUp);

                      // Initial trigger on pointer down
                      handlePointerMove(e.nativeEvent);
                    }}
                  >
                    {/* Selected Clip Highlight Area */}
                    <div style={{
                      position: 'absolute',
                      left: `${videoDuration ? (startTime / videoDuration) * 100 : 0}%`,
                      width: `${videoDuration ? ((endTime - startTime) / videoDuration) * 100 : 0}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(255, 142, 60, 0.2) 0%, rgba(255, 142, 60, 0.4) 50%, rgba(255, 142, 60, 0.2) 100%)',
                      borderLeft: '3px solid #FF8E3C',
                      borderRight: '3px solid #FF8E3C',
                      boxSizing: 'border-box',
                      pointerEvents: 'none'
                    }} />

                    {/* Current Playhead Indicator (Green Line / Playhead) */}
                    <div style={{
                      position: 'absolute',
                      left: `${videoDuration ? (currentTime / videoDuration) * 100 : 0}%`,
                      width: '2px',
                      height: '100%',
                      background: '#2CB67D',
                      boxShadow: '0 0 8px #2CB67D',
                      zIndex: 3,
                      pointerEvents: 'none'
                    }} />

                    {/* Start Handle (S 標記) */}
                    <div 
                      style={{
                        position: 'absolute',
                        left: `calc(${videoDuration ? (startTime / videoDuration) * 100 : 0}% - ${isMobile ? '10px' : '8px'})`,
                        width: isMobile ? '20px' : '16px',
                        height: '110%',
                        background: '#FF8E3C',
                        border: '2px solid #000000',
                        boxShadow: '0 0 8px #FF8E3C',
                        zIndex: 7,
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isMobile ? '10px' : '9px',
                        fontWeight: 'bold',
                        color: '#0F0E17',
                        fontFamily: "'Press Start 2P', monospace",
                        borderRadius: '2px'
                      }}
                    >
                      S
                    </div>

                    {/* End Handle (E 標記) */}
                    <div 
                      style={{
                        position: 'absolute',
                        left: `calc(${videoDuration ? (endTime / videoDuration) * 100 : 0}% - ${isMobile ? '10px' : '8px'})`,
                        width: isMobile ? '20px' : '16px',
                        height: '110%',
                        background: exportPreset === 'slack' ? '#72757E' : '#FF8E3C',
                        border: '2px solid #000000',
                        boxShadow: exportPreset === 'slack' ? 'none' : '0 0 8px #FF8E3C',
                        zIndex: 7,
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isMobile ? '10px' : '9px',
                        fontWeight: 'bold',
                        color: '#0F0E17',
                        fontFamily: "'Press Start 2P', monospace",
                        borderRadius: '2px',
                        opacity: exportPreset === 'slack' ? 0.7 : 1
                      }}
                    >
                      E
                    </div>
                  </div>

                  {/* Action Bar & Quick Setter Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '12px' : '10px', 
                    marginTop: '4px' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      alignItems: 'center', 
                      width: isMobile ? '100%' : 'auto',
                      justifyContent: isMobile ? 'space-between' : 'flex-start'
                    }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            if (videoRef.current.paused) {
                              if (videoRef.current.currentTime < startTime || videoRef.current.currentTime >= endTime) {
                                videoRef.current.currentTime = startTime;
                              }
                              const playPromise = videoRef.current.play();
                              if (playPromise !== undefined) {
                                playPromise.catch(() => {});
                              }
                            } else {
                              videoRef.current.pause();
                            }
                          }
                        }}
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: isMobile ? '0.55rem' : '0.65rem',
                          background: '#FF8E3C',
                          color: '#0F0E17',
                          border: '2px solid #000000',
                          padding: isMobile ? '10px 10px' : '8px 14px',
                          cursor: 'pointer',
                          boxShadow: '3px 3px 0px #000000',
                          minHeight: '44px',
                          touchAction: 'manipulation',
                          flex: isMobile ? 1 : 'none'
                        }}
                      >
                        ▶ PLAY / PAUSE
                      </button>

                      {exportPreset === 'slack' ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (videoRef.current) {
                              const newS = Math.min(videoRef.current.currentTime, Math.max(0, (videoDuration || 10) - 1.5));
                              setStartTime(newS);
                              setEndTime(newS + 1.5);
                            }
                          }}
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: isMobile ? '0.55rem' : '0.6rem',
                            background: '#2CB67D',
                            color: '#0F0E17',
                            border: '2px solid #000000',
                            padding: isMobile ? '10px 8px' : '8px 12px',
                            cursor: 'pointer',
                            boxShadow: '2px 2px 0px #000000',
                            minHeight: '44px',
                            touchAction: 'manipulation'
                          }}
                        >
                          SET START WINDOW
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              if (videoRef.current) {
                                setStartTime(videoRef.current.currentTime);
                              }
                            }}
                            style={{
                              fontFamily: "'Press Start 2P', monospace",
                              fontSize: isMobile ? '0.55rem' : '0.6rem',
                              background: '#2A2A3B',
                              color: '#2CB67D',
                              border: '2px solid #000000',
                              padding: isMobile ? '10px 8px' : '8px 12px',
                              cursor: 'pointer',
                              boxShadow: '2px 2px 0px #000000',
                              minHeight: '44px',
                              touchAction: 'manipulation'
                            }}
                          >
                            SET [S]
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (videoRef.current && videoRef.current.currentTime > startTime) {
                                setEndTime(videoRef.current.currentTime);
                              }
                            }}
                            style={{
                              fontFamily: "'Press Start 2P', monospace",
                              fontSize: isMobile ? '0.55rem' : '0.6rem',
                              background: '#2A2A3B',
                              color: '#2CB67D',
                              border: '2px solid #000000',
                              padding: isMobile ? '10px 8px' : '8px 12px',
                              cursor: 'pointer',
                              boxShadow: '2px 2px 0px #000000',
                              minHeight: '44px',
                              touchAction: 'manipulation'
                            }}
                          >
                            SET [E]
                          </button>
                        </>
                      )}
                    </div>

                    <div style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.2rem',
                      color: '#A7A9BE',
                      alignSelf: isMobile ? 'flex-end' : 'center'
                    }}>
                      TOTAL: {videoDuration.toFixed(1)}s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preset Mode Mode Selector */}
          {videoUrl && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px',
              background: '#0F0E17',
              border: '3px solid #000000',
              padding: '16px',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: '#FFFFFE' }}>
                EXPORT PRESET MODE
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    setExportPreset('slack');
                    setOutputSize(128);
                    setFps(10);
                    // Lock trim length to fixed 1.5s
                    const fixedLen = 1.5;
                    const maxS = Math.max(0, (videoDuration || 10) - fixedLen);
                    const newS = Math.min(startTime, maxS);
                    setStartTime(newS);
                    setEndTime(newS + fixedLen);
                    if (videoRef.current) {
                      videoRef.current.currentTime = newS;
                    }
                  }}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                    background: exportPreset === 'slack' ? '#2CB67D' : '#16161A',
                    color: exportPreset === 'slack' ? '#0F0E17' : '#A7A9BE',
                    border: '3px solid #000000',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    boxShadow: exportPreset === 'slack' ? '3px 3px 0px #000000' : 'none',
                    flex: 1,
                    minWidth: '160px',
                    touchAction: 'manipulation'
                  }}
                >
                  ⚡ SLACK EMOJI PRESET (&lt;128KB)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setExportPreset('custom');
                  }}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                    background: exportPreset === 'custom' ? '#FF8E3C' : '#16161A',
                    color: exportPreset === 'custom' ? '#0F0E17' : '#A7A9BE',
                    border: '3px solid #000000',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    boxShadow: exportPreset === 'custom' ? '3px 3px 0px #000000' : 'none',
                    flex: 1,
                    minWidth: '160px',
                    touchAction: 'manipulation'
                  }}
                >
                  ⚙ CUSTOM MODE
                </button>
              </div>
              {exportPreset === 'slack' && (
                <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.15rem', color: '#2CB67D' }}>
                  ★ Slack Preset Active: Fixed 128x128, 10 FPS, 1.5s duration limit. Drag the timeline to select the clip window!
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {videoUrl && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px'
            }}>
              {/* FPS Setting */}
              <div style={{
                flex: 1,
                minWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                border: '3px solid #000000',
                padding: '16px',
                background: exportPreset === 'slack' ? '#16161A' : '#0F0E17',
                opacity: exportPreset === 'slack' ? 0.6 : 1,
                boxShadow: '4px 4px 0px #000000'
              }}>
                <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: exportPreset === 'slack' ? '#A7A9BE' : '#FFFFFE' }}>
                  FPS {exportPreset === 'slack' && '(LOCKED 10)'}
                </label>
                <input
                  type="number"
                  value={fps}
                  disabled={exportPreset === 'slack'}
                  min={1}
                  max={30}
                  onChange={(e) => setFps(parseInt(e.target.value) || 10)}
                  style={{
                    fontFamily: "'VT323', monospace",
                    background: '#16161A',
                    border: '3px solid #000000',
                    color: exportPreset === 'slack' ? '#72757E' : '#FF8E3C',
                    padding: '8px',
                    fontSize: '1.2rem',
                    outline: 'none',
                    minHeight: '44px',
                    cursor: exportPreset === 'slack' ? 'not-allowed' : 'text'
                  }}
                />
              </div>

              {/* Output Size Formatter */}
              <div style={{
                flex: 1,
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                border: '3px solid #000000',
                padding: '16px',
                background: exportPreset === 'slack' ? '#16161A' : '#0F0E17',
                opacity: exportPreset === 'slack' ? 0.6 : 1,
                boxShadow: '4px 4px 0px #000000'
              }}>
                <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: exportPreset === 'slack' ? '#A7A9BE' : '#FFFFFE' }}>
                  OUTPUT SIZE ({outputSize}x{outputSize}) {exportPreset === 'slack' && '(LOCKED)'}
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <select
                    value={outputSize}
                    disabled={exportPreset === 'slack'}
                    onChange={(e) => setOutputSize(parseInt(e.target.value) || 128)}
                    style={{
                      fontFamily: "'VT323', monospace",
                      background: '#16161A',
                      border: '3px solid #000000',
                      color: exportPreset === 'slack' ? '#72757E' : '#2CB67D',
                      padding: '8px',
                      fontSize: '1.2rem',
                      outline: 'none',
                      minHeight: '44px',
                      flex: 1,
                      cursor: exportPreset === 'slack' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <option value={128}>128 x 128 (Emoji / Avatar)</option>
                    <option value={200}>200 x 200 (Medium)</option>
                    <option value={300}>300 x 300 (Standard)</option>
                    <option value={400}>400 x 400 (High Res)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {videoUrl && (
            <button
              onClick={processVideo}
              disabled={isProcessing}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                background: isProcessing ? '#383A3F' : '#2CB67D',
                color: isProcessing ? '#A7A9BE' : '#0F0E17',
                border: '3px solid #000000',
                padding: '18px',
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                width: '100%',
                boxShadow: isProcessing ? 'none' : '5px 5px 0px #000000',
                transition: 'all 0.1s step-end',
                imageRendering: 'pixelated',
                minHeight: '48px',
                touchAction: 'manipulation'
              }}
              onMouseDown={(e) => {
                if (isProcessing) return;
                e.currentTarget.style.transform = 'translate(3px, 3px)';
                e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
              }}
              onMouseUp={(e) => {
                if (isProcessing) return;
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
              }}
            >
              {isProcessing ? 'PROCESSING...' : 'EXPORT GIF ►'}
            </button>
          )}

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
              padding: isMobile ? '16px' : '24px',
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
                fontSize: isMobile ? '0.7rem' : '0.8rem', 
                color: '#2CB67D',
                textAlign: 'center'
              }}>
                ✓ CONVERSION COMPLETE
              </div>

              {resultSizeKb !== null && (
                <div style={{
                  background: resultSizeKb <= 128 ? 'rgba(44, 182, 125, 0.15)' : 'rgba(255, 142, 60, 0.15)',
                  border: `2px solid ${resultSizeKb <= 128 ? '#2CB67D' : '#FF8E3C'}`,
                  padding: '10px 14px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.2rem',
                  color: resultSizeKb <= 128 ? '#2CB67D' : '#FF8E3C',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  {resultSizeKb <= 128 ? (
                    <span>★ FILE SIZE: <strong>{resultSizeKb} KB</strong> (Ready for Slack Emoji &lt; 128KB!)</span>
                  ) : (
                    <span>⚠️ FILE SIZE: <strong>{resultSizeKb} KB</strong> (&gt; 128KB Slack Limit! Lower <strong>FPS</strong> or trim timeline duration to fit under 128KB)</span>
                  )}
                </div>
              )}

              <div style={{ border: '3px solid #000000', padding: '8px', background: '#16161A', width: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
                <img src={result} alt="Generated GIF" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block', imageRendering: 'pixelated' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '12px', width: '100%' }}>
                <a
                  href={result}
                  download={`${selectedFile?.name || 'video'}.gif`}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    display: 'block',
                    background: '#FF8E3C',
                    color: '#0F0E17',
                    textDecoration: 'none',
                    padding: '16px 20px',
                    fontSize: isMobile ? '0.65rem' : '0.75rem',
                    flex: 1,
                    textAlign: 'center',
                    border: '3px solid #000000',
                    boxShadow: '4px 4px 0px #000000',
                    boxSizing: 'border-box',
                    minHeight: '48px',
                    touchAction: 'manipulation'
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
                  DOWNLOAD (.GIF) ►
                </a>
                <button
                  type="button"
                  onClick={handleSaveToImages}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    display: 'block',
                    background: '#2CB67D',
                    color: '#0F0E17',
                    padding: '16px 20px',
                    fontSize: isMobile ? '0.65rem' : '0.75rem',
                    flex: 1,
                    textAlign: 'center',
                    border: '3px solid #000000',
                    boxShadow: '4px 4px 0px #000000',
                    boxSizing: 'border-box',
                    minHeight: '48px',
                    cursor: 'pointer',
                    touchAction: 'manipulation'
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
                  SAVE TO PHOTOS 🖼
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

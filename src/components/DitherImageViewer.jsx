import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 只註冊字型，不要去改 body/*：那會把整個桌面的字型一起換掉。
const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cubic';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const CameraBody = styled.div`
  font-family: 'Cubic', monospace;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border: 3px solid #333;
  border-radius: 12px;
  width: 480px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.4),
    inset 0 2px 0 rgba(255,255,255,0.1),
    inset 0 -2px 0 rgba(0,0,0,0.3),
    0 0 20px rgba(0,0,0,0.2);
  
  /* Vintage camera texture */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 1px, transparent 1px),
      repeating-linear-gradient(
        45deg,
        transparent 0px,
        transparent 2px,
        rgba(255,255,255,0.02) 2px,
        rgba(255,255,255,0.02) 4px
      );
    border-radius: 12px;
  }
  
  /* Camera brand logo area */
  &:after {
    content: 'ADI CAM';
    position: absolute;
    top: 15px;
    left: 20px;
    color: #888;
    font-size: 8px;
    font-family: 'Cubic', monospace;
    font-weight: bold;
    letter-spacing: 1px;
    z-index: 10;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
`;

const CCDScreen = styled.div`
  width: 400px;
  height: 260px;
  background: #1a1a1a;
  border: 4px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.5),
    0 2px 4px rgba(0,0,0,0.3);
  
  &:before {
    content: '';
    position: absolute;
    inset: 4px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 2px,
      rgba(0,255,0,0.03) 2px,
      rgba(0,255,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 60%,
      rgba(0,0,0,0.2) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
`;

const CCDImage = styled.img`
  max-width: 95%;
  max-height: 95%;
  image-rendering: pixelated;
  filter: grayscale(1) contrast(1.8) brightness(1.2);
  /* CCD 螢幕效果 */
  mix-blend-mode: screen;
  position: relative;
  z-index: 3;
  object-fit: contain;
  border-radius: 2px;
`;

const CCDDisplay = styled.div`
  color: #0f0;
  background: linear-gradient(145deg, #222, #111);
  border: 1px solid #444;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 11px;
  margin-bottom: 12px;
  letter-spacing: 1px;
  font-family: 'Cubic', monospace;
  position: relative;
  z-index: 2;
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1);
  max-width: 380px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 0 4px #0f0;
  
  /* Add LCD display effect */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 1px,
      rgba(0,255,0,0.1) 1px,
      rgba(0,255,0,0.1) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const VintageBadge = styled.div`
  background: linear-gradient(145deg, #333, #111);
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 8px 0;
  text-align: center;
  position: relative;
  z-index: 2;
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1);
  
  /* Add brushed metal texture */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 1px,
      rgba(255,255,255,0.03) 1px,
      rgba(255,255,255,0.03) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`;

const CCDStatusBar = styled.div`
  background: linear-gradient(145deg, #444, #222);
  border: 1px solid #666;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  font-family: 'Cubic', monospace;
  color: #0f0;
  margin-bottom: 12px;
  margin-top: 8px;
  position: relative;
  z-index: 2;
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1);
  max-width: 400px;
  text-align: center;
  text-shadow: 0 0 4px #0f0;
  
  /* Add vintage LED display effect */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 1px,
      rgba(0,255,0,0.1) 1px,
      rgba(0,255,0,0.1) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`;

const CameraControls = styled.div`
  display: flex;
  gap: 6px;
  margin: 12px;
  padding: 8px 12px;
  background: linear-gradient(145deg, #333, #111);
  border: 2px solid #555;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 3px 6px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.5);
  
  /* Add vintage camera control panel texture */
  &:before {
    content: '';
    position: absolute;
    inset: 2px;
    opacity: 0.1;
    pointer-events: none;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px),
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 3px,
        rgba(255,255,255,0.05) 3px,
        rgba(255,255,255,0.05) 6px
      );
    z-index: 0;
    border-radius: 6px;
  }
  
  /* Add model number */
  &:after {
    content: 'DCV-2000';
    position: absolute;
    bottom: -18px;
    right: 0;
    color: #666;
    font-size: 7px;
    font-family: 'Cubic', monospace;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
`;

const CameraBtn = styled.button`
  width: 28px;
  height: 24px;
  background: linear-gradient(145deg, #555, #333);
  border: 2px solid #777;
  border-radius: 4px;
  color: #ccc;
  font-size: 9px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  z-index: 1;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  
  &:active {
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 1px 2px rgba(0,0,0,0.2);
    transform: translateY(1px);
    background: linear-gradient(145deg, #444, #222);
  }
  
  &:hover:not(.active) {
    background: linear-gradient(145deg, #666, #444);
    border-color: #888;
    color: #fff;
  }
  
  &.active {
    background: linear-gradient(145deg, #0a5c2e, #064420);
    color: #0f0;
    border-color: #0a5c2e;
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 0 8px rgba(0,255,0,0.3);
    text-shadow: 0 0 4px #0f0;
  }
  
  /* Add vintage button texture */
  &:before {
    content: '';
    position: absolute;
    inset: 1px;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 1px,
      rgba(255,255,255,0.05) 1px,
      rgba(255,255,255,0.05) 2px
    );
    border-radius: 2px;
    pointer-events: none;
  }
`;

const CameraNavBtn = styled.button`
  width: 36px;
  height: 28px;
  background: linear-gradient(145deg, #444, #222);
  border: 2px solid #666;
  border-radius: 6px;
  color: #ccc;
  font-size: 12px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  
  &:active:not(:disabled) {
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 1px 2px rgba(0,0,0,0.2);
    transform: translateY(1px);
    background: linear-gradient(145deg, #333, #111);
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(145deg, #555, #333);
    border-color: #777;
    color: #fff;
  }
  
  &:disabled {
    background: linear-gradient(145deg, #333, #222);
    color: #555;
    cursor: not-allowed;
    box-shadow: 
      inset 0 1px 2px rgba(0,0,0,0.2),
      0 1px 0 rgba(255,255,255,0.05);
    border-color: #444;
  }
  
  /* Add vintage button texture */
  &:before {
    content: '';
    position: absolute;
    inset: 1px;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 1px,
      rgba(255,255,255,0.03) 1px,
      rgba(255,255,255,0.03) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`;

// All images from the assets/photo directory
const allImages = [
  { name: 'camera-1.jpg', path: '/assets/photo/camera-1.jpg' },
  { name: 'camera-2.jpg', path: '/assets/photo/camera-2.jpg' },
  { name: 'camera-3.jpg', path: '/assets/photo/camera-3.jpg' },
  { name: 'camera-4.jpg', path: '/assets/photo/camera-4.jpg' },
  { name: 'camera-5.jpg', path: '/assets/photo/camera-5.jpg' },
  { name: 'camera-6.jpg', path: '/assets/photo/camera-6.jpg' },
  { name: 'camera-7.jpg', path: '/assets/photo/camera-7.jpg' },
  { name: 'camera-8.jpg', path: '/assets/photo/camera-8.jpg' },
  { name: 'camera-9.jpg', path: '/assets/photo/camera-9.jpg' },
  { name: 'camera-10.jpg', path: '/assets/photo/camera-10.jpg' },
  { name: 'camera-11.jpg', path: '/assets/photo/camera-11.jpg' },
  { name: 'camera-12.jpg', path: '/assets/photo/camera-12.jpg' },
  { name: 'camera-13.jpg', path: '/assets/photo/camera-13.jpg' },
  { name: 'carry-cat.jpg', path: '/assets/photo/carry-cat.jpg' },
  { name: 'chu-with-me.jpg', path: '/assets/photo/chu-with-me.jpg' },
  { name: 'smile.jpg', path: '/assets/photo/smile.jpg' },
  { name: 'good-cat.png', path: '/assets/photo/good-cat.png' },
  { name: 'adi.jpg', path: '/assets/photo/adi.jpg' },
  { name: 'adi_logo_black.png', path: '/assets/photo/adi_logo_black.png' },
  { name: 'gpt_banana_icon.webp', path: '/assets/photo/gpt_banana_icon.webp' },
  { name: '20250402-gpt-1.webp', path: '/assets/photo/20250402-gpt-1.webp' },
  { name: 'website.webp', path: '/assets/photo/website.webp' },
  { name: 'family.jpg', path: '/assets/photo/family.jpg' },
];

const DitherImageViewer = () => {
  const [images, setImages] = useState([]);
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState('normal');
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const img = images[idx] || allImages[0];

  // Load and validate images from assets/photo directory
  useEffect(() => {
    // 平行載入：原本是一張等一張，23 張照片要卡好幾秒才會出現第一張。
    let cancelled = false;
    setLoading(true);
    setLoadedCount(0);

    const probe = (imageData) => new Promise(resolve => {
      const probeImage = new Image();
      probeImage.onload = () => resolve(imageData);
      probeImage.onerror = () => {
        console.warn(`Failed to load image: ${imageData.name}`);
        resolve(null);
      };
      probeImage.src = imageData.path;
    }).then(result => {
      if (!cancelled) setLoadedCount(count => count + 1);
      return result;
    });

    Promise.all(allImages.map(probe)).then(results => {
      if (cancelled) return;
      const validImages = results.filter(Boolean);
      setImages(validImages.length > 0 ? validImages : allImages);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);



  // Handle individual image loading
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    console.error(`Failed to display image: ${img.name}`);
  };

  const handleImageStart = () => {
    setImageLoading(true);
  };

  const prev = () => {
    if (images.length > 0) {
      setIdx(i => (i - 1 + images.length) % images.length);
    }
  };
  const next = () => {
    if (images.length > 0) {
      setIdx(i => (i + 1) % images.length);
    }
  };
  const first = () => setIdx(0);
  const last = () => setIdx(Math.max(0, images.length - 1));

  const applyFilter = (filterType) => {
    setFilter(filterType);
  };

  const getFilterStyle = () => {
    switch (filter) {
      case 'invert':
        return 'grayscale(1) contrast(1.8) brightness(1.2) invert(1)';
      case 'contrast':
        return 'grayscale(1) contrast(3) brightness(1.3)';
      case 'blur':
        return 'grayscale(1) contrast(1.8) brightness(1.2) blur(1px)';
      default:
        return 'grayscale(1) contrast(1.8) brightness(1.2)';
    }
  };

  return (
    <>
      <FontStyle />
      {/* 綁在機身而不是 window：不然別的 App 在打字時方向鍵也會被吃掉。 */}
      <CameraBody
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prev();
          else if (e.key === 'ArrowRight') next();
          else return;
          e.preventDefault();
        }}
      >
        <CCDStatusBar>
          {loading ? (
            `📡 LOADING: ${loadedCount}/${allImages.length} IMAGES...`
          ) : (
            `📷 IMG: ${idx + 1}/${images.length} | 🔍 ZOOM: ${Math.round(zoom * 100)}% | 🎨 MODE: ${filter.toUpperCase()}`
          )}
        </CCDStatusBar>
        
        <CameraControls>
          <CameraBtn 
            className={filter === 'normal' ? 'active' : ''}
            onClick={() => applyFilter('normal')}
            title="Normal"
          >
            N
          </CameraBtn>
          <CameraBtn 
            className={filter === 'invert' ? 'active' : ''}
            onClick={() => applyFilter('invert')}
            title="Invert"
          >
            I
          </CameraBtn>
          <CameraBtn 
            className={filter === 'contrast' ? 'active' : ''}
            onClick={() => applyFilter('contrast')}
            title="Contrast"
          >
            C
          </CameraBtn>
          <CameraBtn 
            className={filter === 'blur' ? 'active' : ''}
            onClick={() => applyFilter('blur')}
            title="Blur"
          >
            B
          </CameraBtn>
          <CameraBtn onClick={() => setZoom(z => Math.min(z + 0.25, 3))} title="Zoom In">
            +
          </CameraBtn>
          <CameraBtn onClick={() => setZoom(z => Math.max(z - 0.25, 0.25))} title="Zoom Out">
            -
          </CameraBtn>
        </CameraControls>
        
        <CCDScreen>
          {loading ? (
            <div style={{ color: '#0f0', fontSize: '12px', textAlign: 'center', fontFamily: 'Cubic, monospace' }}>
              📡 SCANNING PHOTOS...<br/>
              {loadedCount}/{allImages.length}
            </div>
          ) : images.length === 0 ? (
            <div style={{ color: '#f00', fontSize: '12px', fontFamily: 'Cubic, monospace' }}>❌ NO IMAGES FOUND</div>
          ) : (
            <>
              {imageLoading && (
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  color: '#0f0', 
                  fontSize: '11px',
                  fontFamily: 'Cubic, monospace',
                  zIndex: 4
                }}>
                  ⏳ LOADING IMAGE...
                </div>
              )}
              <CCDImage 
                src={img.path} 
                alt={img.name}
                onLoad={handleImageLoad}
                onError={handleImageError}
                onLoadStart={handleImageStart}
                style={{ 
                  filter: getFilterStyle(),
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center',
                  opacity: imageLoading ? 0.3 : 1
                }}
              />
            </>
          )}
        </CCDScreen>
        
        <CCDDisplay>
          {loading ? '📡 SCANNING...' : images.length === 0 ? '❌ NO IMAGES' : `📁 ${img.name}`}
        </CCDDisplay>
        
        {/* Add vintage camera details */}
        <VintageBadge>
          <div style={{ fontSize: '6px', color: '#999', marginBottom: '2px' }}>DIGITAL CAMERA</div>
          <div style={{ fontSize: '5px', color: '#666' }}>ADI Corporation • Made in Taiwan</div>
        </VintageBadge>
        
        <BtnRow>
          <CameraNavBtn onClick={first} disabled={loading || images.length === 0 || idx === 0} title="First">|◄</CameraNavBtn>
          <CameraNavBtn onClick={prev} disabled={loading || images.length === 0} title="Previous">◄</CameraNavBtn>
          <CameraNavBtn onClick={next} disabled={loading || images.length === 0} title="Next">►</CameraNavBtn>
          <CameraNavBtn onClick={last} disabled={loading || images.length === 0 || idx === images.length - 1} title="Last">►|</CameraNavBtn>
        </BtnRow>
      </CameraBody>
    </>
  );
};

export default DitherImageViewer;
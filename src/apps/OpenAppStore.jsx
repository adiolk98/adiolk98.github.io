import React, { useState } from 'react';

// 原本這裡是一個假的 App Store 連結（id1234567890），點下去只會開到 404 的頁面。
// 在真的上架之前，就在視窗裡誠實地講一聲，不要把人丟到死連結。
const REPO_URL = 'https://github.com/adiolk98/adiolk98.github.io';

export default function OpenAppStore() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: (-y / rect.height) * 15, y: (x / rect.width) * 15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleOpen = () => setShowDialog(true);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0f0f23',
      backgroundImage: 'radial-gradient(#27273b 1px, transparent 1px)',
      backgroundSize: '8px 8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Press Start 2P", "VT323", monospace',
      color: '#e2e8f0',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Import Pixel Art Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      {/* Retro Arcade Scanline overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* Header Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '10px',
        color: '#a78bfa',
        letterSpacing: '1px',
        background: '#18182c',
        padding: '6px 12px',
        border: '2px solid #4c1d95',
        boxShadow: '3px 3px 0px #000'
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          background: '#f43f5e',
          boxShadow: '0 0 6px #f43f5e',
          display: 'inline-block'
        }} />
        RETRO APP ARCADE
      </div>

      {/* Interactive Pixel Art 3D Icon Box */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpen}
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          perspective: '800px',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 0.3s ease',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        {/* Pixel Block Container */}
        <div style={{
          position: 'relative',
          width: '90px',
          height: '90px',
          backgroundColor: '#7c3aed',
          border: '4px solid #ffffff',
          boxShadow: isHovered
            ? '6px 6px 0px #f43f5e, -6px -6px 0px #00f0ff'
            : '6px 6px 0px #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          imageRendering: 'pixelated',
          transition: 'box-shadow 0.2s ease',
          zIndex: 3
        }}>
          {/* Pixelated App Store "A" Icon */}
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Pixel A shape */}
            <path d="M10 3h4v2h-4zM8 5h2v4H8zM14 5h2v4h-2zM6 9h2v4H6zM16 9h2v4h-2zM4 13h16v3H4zM4 16h3v4H4zM17 16h3v4h-3z" fill="#ffffff" />
            <path d="M9 13h6v1H9z" fill="#f43f5e" />
          </svg>
        </div>

        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#ffffff',
          textShadow: '2px 2px 0px #000000, -2px -2px 0px #7c3aed',
          letterSpacing: '1px'
        }}>
          APP STORE
        </div>
      </div>

      {/* Retro Pixel Arcade Button */}
      <button
        onClick={handleOpen}
        style={{
          marginTop: '28px',
          padding: '12px 20px',
          backgroundColor: '#f43f5e',
          color: '#ffffff',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '10px',
          border: '3px solid #ffffff',
          boxShadow: '4px 4px 0px #000000',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.1s ease',
          position: 'relative',
          zIndex: 3
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translate(0px, 0px)';
          e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ff6b81';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f43f5e';
          e.currentTarget.style.transform = 'translate(0px, 0px)';
          e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
        }}
      >
        [ PRESS START ]
      </button>

      {showDialog && (
        <div
          onClick={() => setShowDialog(false)}
          style={{
            position: 'absolute', inset: 0, zIndex: 5, background: 'rgba(5,5,15,.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#18182c', border: '3px solid #fff', boxShadow: '6px 6px 0 #000',
              padding: 16, textAlign: 'center', fontSize: 9, lineHeight: 1.8, maxWidth: 300
            }}
          >
            <div style={{ color: '#f43f5e', marginBottom: 10 }}>NOT ON THE STORE YET</div>
            <div style={{ color: '#e2e8f0', marginBottom: 14 }}>
              這個桌面還沒上架 App Store，<br />不過原始碼是公開的。
            </div>
            <button
              onClick={() => window.open(REPO_URL, '_blank', 'noopener,noreferrer')}
              style={{
                background: '#7c3aed', color: '#fff', border: '2px solid #fff',
                boxShadow: '3px 3px 0 #000', padding: '8px 12px', fontSize: 9,
                fontFamily: 'inherit', cursor: 'pointer', marginRight: 8
              }}
            >
              VIEW SOURCE
            </button>
            <button
              onClick={() => setShowDialog(false)}
              style={{
                background: '#334155', color: '#fff', border: '2px solid #fff',
                boxShadow: '3px 3px 0 #000', padding: '8px 12px', fontSize: 9,
                fontFamily: 'inherit', cursor: 'pointer'
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Footer Text */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        color: '#64748b',
        fontSize: '8px',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        CLICK ICON OR BUTTON TO OPEN STORE
      </div>
    </div>
  );
}

 
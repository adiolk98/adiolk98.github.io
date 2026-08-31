import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const ToolsIndex: React.FC = () => {
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
        <title>adi's Toolbox | Developer Utilities</title>
        <meta name="description" content="A collection of web-based developer tools and utilities built by adi, including GIF to ZIP converters and more." />
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

      {/* Back to Home Link */}
      <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '24px' }}>
        <Link 
          to="/" 
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
          ◄ RETURN TO PC
        </Link>
      </div>

      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div 
          className="game-blink"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.75rem',
            letterSpacing: '2px',
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}
        >
          ★ SYSTEM TOOLBOX V1.0 ★
        </div>

        <h1 
          className="game-color-shift"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1.6rem',
            margin: '0 0 14px 0',
            lineHeight: 1.3,
            letterSpacing: '0px'
          }}
        >
          ADI'S TOOLBOX
        </h1>

        <p style={{ 
          fontSize: '1.1rem', 
          margin: 0,
          color: '#A7A9BE',
          fontFamily: "'VT323', 'DotGothic16', monospace",
          letterSpacing: '0.5px'
        }}>
          UTILITY INVENTORY & DEVELOPER TOOLS
        </p>
      </div>

      {/* Grid Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '32px',
        width: '100%',
        maxWidth: '1000px',
        zIndex: 1
      }}>
        {/* GIF to ZIP Tool */}
        <Link 
          to="/tools/gifToZip" 
          style={{
            background: '#16161A',
            border: '4px solid #000000',
            padding: '28px',
            textDecoration: 'none',
            color: '#FFFFFE',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            boxShadow: '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
            transition: 'all 0.1s step-end',
            imageRendering: 'pixelated'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px #000000, inset -3px -3px 0px #2CB67D, inset 3px 3px 0px #72F2B2';
            e.currentTarget.style.borderColor = '#2CB67D';
            const icon = e.currentTarget.querySelector('.pixel-icon') as HTMLElement;
            if (icon) {
              icon.style.background = '#2CB67D';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0px, 0px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F';
            e.currentTarget.style.borderColor = '#000000';
            const icon = e.currentTarget.querySelector('.pixel-icon') as HTMLElement;
            if (icon) {
              icon.style.background = '#FF8E3C';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              className="pixel-icon"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.85rem',
                fontWeight: 'bold',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FF8E3C',
                color: '#0F0E17',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                flexShrink: 0
            }}>
              GIF
            </div>
            <div>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.9rem', 
                color: '#FFFFFE',
                lineHeight: 1.2
              }}>
                GIF TO ZIP
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#2CB67D',
                marginTop: '6px'
              }}>
                [ONLINE TOOL]
              </div>
            </div>
          </div>

          <div 
            style={{ 
              fontSize: '1rem', 
              color: '#A7A9BE', 
              lineHeight: 1.5,
              fontFamily: "'VT323', 'DotGothic16', monospace"
            }}>
            Decompose GIF animations into PNG image sequences and package them into a downloadable ZIP archive. 100% client-side processing for privacy and security.
          </div>

          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.65rem',
            color: '#FF8E3C',
            alignSelf: 'flex-end',
            marginTop: 'auto'
          }}>
            LAUNCH TOOL ►
          </div>
        </Link>

        {/* Video to GIF Tool */}
        <Link 
          to="/tools/videoToGif" 
          style={{
            background: '#16161A',
            border: '4px solid #000000',
            padding: '28px',
            textDecoration: 'none',
            color: '#FFFFFE',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            boxShadow: '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
            transition: 'all 0.1s step-end',
            imageRendering: 'pixelated'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px #000000, inset -3px -3px 0px #2CB67D, inset 3px 3px 0px #72F2B2';
            e.currentTarget.style.borderColor = '#2CB67D';
            const icon = e.currentTarget.querySelector('.pixel-icon-video') as HTMLElement;
            if (icon) {
              icon.style.background = '#2CB67D';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0px, 0px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F';
            e.currentTarget.style.borderColor = '#000000';
            const icon = e.currentTarget.querySelector('.pixel-icon-video') as HTMLElement;
            if (icon) {
              icon.style.background = '#FF8E3C';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              className="pixel-icon-video"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.85rem',
                fontWeight: 'bold',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FF8E3C',
                color: '#0F0E17',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                flexShrink: 0
            }}>
              VID
            </div>
            <div>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.1rem', 
                color: '#FFFFFE',
                lineHeight: 1.2
              }}>
                VIDEO TO GIF
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#2CB67D',
                marginTop: '6px'
              }}>
                [ONLINE TOOL]
              </div>
            </div>
          </div>

          <div 
            style={{ 
              fontSize: '1.25rem', 
              color: '#A7A9BE', 
              lineHeight: 1.5,
              fontFamily: "'VT323', 'DotGothic16', monospace"
            }}>
            Select a square region from your video and export it as a GIF animation right in your browser.
          </div>

          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.65rem',
            color: '#FF8E3C',
            alignSelf: 'flex-end',
            marginTop: 'auto'
          }}>
            LAUNCH TOOL ►
          </div>
        </Link>

        {/* JSON Formatter Tool */}
        <Link 
          to="/tools/jsonFormatter" 
          style={{
            background: '#16161A',
            border: '4px solid #000000',
            padding: '28px',
            textDecoration: 'none',
            color: '#FFFFFE',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            boxShadow: '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
            transition: 'all 0.1s step-end',
            imageRendering: 'pixelated'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px #000000, inset -3px -3px 0px #2CB67D, inset 3px 3px 0px #72F2B2';
            e.currentTarget.style.borderColor = '#2CB67D';
            const icon = e.currentTarget.querySelector('.pixel-icon-json') as HTMLElement;
            if (icon) {
              icon.style.background = '#2CB67D';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0px, 0px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F';
            e.currentTarget.style.borderColor = '#000000';
            const icon = e.currentTarget.querySelector('.pixel-icon-json') as HTMLElement;
            if (icon) {
              icon.style.background = '#FF8E3C';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              className="pixel-icon-json"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.6rem',
                fontWeight: 'bold',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FF8E3C',
                color: '#0F0E17',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                flexShrink: 0
            }}>
              {`{ }`}
            </div>
            <div>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.1rem', 
                color: '#FFFFFE',
                lineHeight: 1.2
              }}>
                JSON FORMAT
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#2CB67D',
                marginTop: '6px'
              }}>
                [ONLINE TOOL]
              </div>
            </div>
          </div>

          <div 
            style={{ 
              fontSize: '1.25rem', 
              color: '#A7A9BE', 
              lineHeight: 1.5,
              fontFamily: "'VT323', 'DotGothic16', monospace"
            }}>
            Format and validate JSON strings. Fast client-side processing to safely beautify and verify your JSON data.
          </div>

          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.65rem',
            color: '#FF8E3C',
            alignSelf: 'flex-end',
            marginTop: 'auto'
          }}>
            LAUNCH TOOL ►
          </div>
        </Link>

        {/* YAML Formatter Tool */}
        <Link 
          to="/tools/yamlFormatter" 
          style={{
            background: '#16161A',
            border: '4px solid #000000',
            padding: '28px',
            textDecoration: 'none',
            color: '#FFFFFE',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            boxShadow: '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
            transition: 'all 0.1s step-end',
            imageRendering: 'pixelated'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px #000000, inset -3px -3px 0px #FF8E3C, inset 3px 3px 0px #FFC0AD';
            e.currentTarget.style.borderColor = '#FF8E3C';
            const icon = e.currentTarget.querySelector('.pixel-icon-yaml') as HTMLElement;
            if (icon) {
              icon.style.background = '#FF8E3C';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0px, 0px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F';
            e.currentTarget.style.borderColor = '#000000';
            const icon = e.currentTarget.querySelector('.pixel-icon-yaml') as HTMLElement;
            if (icon) {
              icon.style.background = '#2A2A3B';
              icon.style.color = '#FF8E3C';
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              className="pixel-icon-yaml"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
                fontWeight: 'bold',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#2A2A3B',
                color: '#FF8E3C',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                flexShrink: 0
            }}>
              YAML
            </div>
            <div>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.1rem', 
                color: '#FFFFFE',
                lineHeight: 1.2
              }}>
                YAML FORMAT
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#FF8E3C',
                marginTop: '6px'
              }}>
                [ONLINE TOOL]
              </div>
            </div>
          </div>

          <div 
            style={{ 
              fontSize: '1.25rem', 
              color: '#A7A9BE', 
              lineHeight: 1.5,
              fontFamily: "'VT323', 'DotGothic16', monospace"
            }}>
            Format, validate, repair, and convert YAML to JSON. Features VS Code floating find & replace widget and line jumping.
          </div>

          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.65rem',
            color: '#FF8E3C',
            alignSelf: 'flex-end',
            marginTop: 'auto'
          }}>
            LAUNCH TOOL ►
          </div>
        </Link>

        {/* WAV / MP4 to MP3 Tool */}
        <Link 
          to="/tools/audioToMp3" 
          style={{
            background: '#16161A',
            border: '4px solid #000000',
            padding: '28px',
            textDecoration: 'none',
            color: '#FFFFFE',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            boxShadow: '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
            transition: 'all 0.1s step-end',
            imageRendering: 'pixelated'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px #000000, inset -3px -3px 0px #2CB67D, inset 3px 3px 0px #72F2B2';
            e.currentTarget.style.borderColor = '#2CB67D';
            const icon = e.currentTarget.querySelector('.pixel-icon-mp3') as HTMLElement;
            if (icon) {
              icon.style.background = '#2CB67D';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0px, 0px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F';
            e.currentTarget.style.borderColor = '#000000';
            const icon = e.currentTarget.querySelector('.pixel-icon-mp3') as HTMLElement;
            if (icon) {
              icon.style.background = '#FF8E3C';
              icon.style.color = '#0F0E17';
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              className="pixel-icon-mp3"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.85rem',
                fontWeight: 'bold',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FF8E3C',
                color: '#0F0E17',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                flexShrink: 0
            }}>
              MP3
            </div>
            <div>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.1rem', 
                color: '#FFFFFE',
                lineHeight: 1.2
              }}>
                WAV/MP4 TO MP3
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#2CB67D',
                marginTop: '6px'
              }}>
                [ONLINE TOOL]
              </div>
            </div>
          </div>

          <div 
            style={{ 
              fontSize: '1.25rem', 
              color: '#A7A9BE', 
              lineHeight: 1.5,
              fontFamily: "'VT323', 'DotGothic16', monospace"
            }}>
            Encode WAV and MP4 audio to MP3 at up to 320 kbps without changing the length: the original sample rate and channels are preserved, nothing is trimmed or padded.
          </div>

          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.65rem',
            color: '#FF8E3C',
            alignSelf: 'flex-end',
            marginTop: 'auto'
          }}>
            LAUNCH TOOL ►
          </div>
        </Link>
      </div>
    </div>
  );
};


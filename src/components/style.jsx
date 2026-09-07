import styled, { createGlobalStyle, keyframes } from "styled-components";

// 粒子動畫
const move = keyframes`
  0% { transform: translate(var(--x-start), var(--y-start)); }
  100% { transform: translate(var(--x-end), var(--y-end)); }
`;

// 粒子容器
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

// 單一粒子
const Particle = styled.div`
  position: absolute;
  background-color: #00aaff;
  border-radius: 50%;
  animation: ${move} linear infinite;
  opacity: 0;
  animation-duration: var(--duration);
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
  top: 0; /* Changed from var(--top) to be relative to the container */
  left: 0; /* Changed from var(--left) to be relative to the container */

  @keyframes move {
    0% {
      transform: translate(var(--x-start), var(--y-start)) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x-end), var(--y-end)) scale(0);
      opacity: 0;
    }
  }
`;

// 建立粒子的輔助函式
const createParticles = (num) => {
  const particles = [];
  for (let i = 0; i < num; i++) {
    const duration = Math.random() * 20 + 10; // 10-30s
    const delay = Math.random() * -duration; // Start at a random point in the animation
    const size = Math.random() * 3 + 2; // 2-5px
    const xStart = `${Math.random() * 100}vw`;
    const yStart = `${Math.random() * 100}vh`;
    const xEnd = `${Math.random() * 100}vw`;
    const yEnd = `${Math.random() * 100}vh`;

    const style = {
      '--duration': `${duration}s`,
      '--delay': `${delay}s`,
      '--size': `${size}px`,
      '--x-start': xStart,
      '--y-start': yStart,
      '--x-end': xEnd,
      '--y-end': yEnd,
    };
    particles.push(<Particle key={i} style={style} />);
  }
  return particles;
};

export const Particles = () => {
    return <ParticlesContainer>{createParticles(20)}</ParticlesContainer>;
}

// 新增像素字型 @font-face
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cubic_11';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-display: swap;
  }
  body {
    /* 這個復古桌面永遠是淺色的。不釘住 color-scheme 的話，使用者的系統在暗色模式時
       瀏覽器會把 input/button 換成深色 UA 樣式，App 裡沒明寫 color 的控制項就變成白字白底。 */
    color-scheme: light;
    font-family: 'Cubic_11', 'Tahoma', 'Arial', sans-serif;
    background: #222;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  .title-bar.xp {
    background: #111 !important;
    color: #fff;
    border-bottom: 1px solid #222;
  }
`

// CRT 螢幕外框
const CRTFrame = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CRTVignette = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 70%, rgba(0,0,0,0.18) 100%);
`;

const CRTScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow:
    0 0 60px 10px #000,
    0 0 0 5px #333 inset,
    0 0 80px 0 #222 inset;
  overflow: hidden;
  position: relative;
  background: #000;
`;

const CRTReflection = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
  /* 斜斜的高光條紋 */
  background:
    linear-gradient(120deg, rgba(255,255,255,0.18) 10%, rgba(255,255,255,0.04) 60%, transparent 80%),
    radial-gradient(ellipse 120% 60% at 50% 0%, rgba(255,255,255,0.13) 0%, transparent 80%);
`;

const CRTScanlines = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 3;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0px,
    rgba(0,0,0,0.08) 1px,
    transparent 2px,
    transparent 4px
  );
`;

export const CRTBackground = createGlobalStyle`
  body {
    background: linear-gradient(180deg, #181c22 0%, #23272e 100%);
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    /* Scanline */
    background: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.04) 0px,
      rgba(255,255,255,0.04) 1px,
      transparent 1.5px,
      transparent 4px
    );
    opacity: 0.5;
  }
  body::after {
    content: '';
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    /* CRT noise */
    background: url('data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><filter id="n" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.18"/></svg>');
    opacity: 0.25;
    mix-blend-mode: screen;
  }
`;

export {
  GlobalStyle,
  CRTFrame,
  CRTVignette,
  CRTScreen,
  CRTReflection,
  CRTScanlines
};
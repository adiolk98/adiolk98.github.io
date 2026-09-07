import React, { useEffect, useRef, useState } from 'react';

const IDLE_MS = 60000;
const LOGO_W = 190;
const LOGO_H = 74;

// 閒置久了就跳出來的螢幕保護程式。經典的撞牆彈跳字，撞到角落會加一分——
// 這顆彩蛋唯一的意義就是等它撞角。
function Screensaver({ onExit }) {
  const [hits, setHits] = useState(0);
  const [hue, setHue] = useState(0);
  const boxRef = useRef(null);
  const stateRef = useRef({ x: 60, y: 60, vx: 1.7, vy: 1.1 });

  useEffect(() => {
    let raf = 0;
    const step = () => {
      const s = stateRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      s.x += s.vx;
      s.y += s.vy;

      let bounced = 0;
      if (s.x <= 0 || s.x + LOGO_W >= w) {
        s.vx *= -1;
        s.x = Math.min(Math.max(0, s.x), w - LOGO_W);
        bounced += 1;
      }
      if (s.y <= 0 || s.y + LOGO_H >= h) {
        s.vy *= -1;
        s.y = Math.min(Math.max(0, s.y), h - LOGO_H);
        bounced += 1;
      }
      if (bounced) {
        setHue(prev => (prev + 47) % 360);
        // 同一幀撞到兩面牆＝正中角落
        if (bounced === 2) setHits(prev => prev + 1);
      }

      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${Math.round(s.x)}px, ${Math.round(s.y)}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      onPointerDown={onExit}
      onWheel={onExit}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        background: '#04070a',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          width: LOGO_W,
          height: LOGO_H,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          color: `hsl(${hue} 80% 68%)`,
          border: `3px solid hsl(${hue} 80% 68%)`,
          fontFamily: "'DotGothic16', monospace",
          textShadow: `0 0 12px hsl(${hue} 80% 60%)`,
          willChange: 'transform',
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 2 }}>adi.tw</div>
        <div style={{ fontSize: 10, opacity: 0.8 }}>RETRO OS</div>
      </div>

      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 26,
        textAlign: 'center',
        color: '#4a6070',
        fontFamily: "'DotGothic16', monospace",
        fontSize: 12,
        lineHeight: 2,
      }}>
        <div>撞到角落 {hits} 次</div>
        <div>動一下滑鼠或按任意鍵離開</div>
      </div>
    </div>
  );
}

// 閒置計時：任何輸入都會重新計時。回傳 [是否啟動, 手動啟動函式]。
export function useIdleScreensaver(enabled = true) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled || active) return;
    let timer = window.setTimeout(() => setActive(true), IDLE_MS);
    const reset = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => setActive(true), IDLE_MS);
    };
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel'];
    events.forEach(name => window.addEventListener(name, reset, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach(name => window.removeEventListener(name, reset));
    };
  }, [enabled, active]);

  // 啟動後任何按鍵也要能退出（滑鼠事件由覆蓋層自己處理）
  useEffect(() => {
    if (!active) return;
    const exit = () => setActive(false);
    window.addEventListener('keydown', exit);
    return () => window.removeEventListener('keydown', exit);
  }, [active]);

  return [active, setActive];
}

export default Screensaver;

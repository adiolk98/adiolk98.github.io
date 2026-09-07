import React, { useEffect, useRef, useState } from 'react';

const MOODS = {
  普通: { say: null, blinkEvery: 4200 },
  開心: { say: '喵～', blinkEvery: 1800 },
  想睡: { say: 'zzz', blinkEvery: 9000 },
  好奇: { say: '？', blinkEvery: 2600 },
};

const SPEED = 26; // px / 秒
const FLOOR_OFFSET = 62; // 讓牠站在工作列上面

// 8-bit 貓咪。原本被塞在一個壞掉的工作列元件裡沒人看得到，
// 現在讓牠自己在桌面上散步。點一下可以餵。
function CatSVG({ mood, facing, stepping }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const period = MOODS[mood]?.blinkEvery ?? 4200;
    const timer = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, period + Math.random() * 1200);
    return () => clearInterval(timer);
  }, [mood]);

  const asleep = mood === '想睡';
  const eyesShut = blink || asleep;

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 64 64"
      style={{ imageRendering: 'pixelated', transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      <rect x="16" y="32" width="32" height="24" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      <rect x="20" y="16" width="24" height="20" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      <rect x="20" y="10" width="6" height="8" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      <rect x="38" y="10" width="6" height="8" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      {eyesShut ? (
        <>
          <rect x="28" y="26" width="4" height="2" fill="#222" />
          <rect x="36" y="26" width="4" height="2" fill="#222" />
        </>
      ) : (
        <>
          <rect x="28" y="24" width="4" height="4" fill="#222" />
          <rect x="36" y="24" width="4" height="4" fill="#222" />
        </>
      )}
      <rect x="32" y="30" width="4" height="2" fill="#c96" />
      {/* 尾巴走路時會擺動 */}
      <rect x="46" y={stepping ? 42 : 46} width="10" height="4" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      {/* 腳：交替抬起來就有走路的感覺 */}
      <rect x="20" y={stepping ? 54 : 56} width="8" height="4" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      <rect x="36" y={stepping ? 56 : 54} width="8" height="4" fill="#f9e4b7" stroke="#222" strokeWidth="2" />
      {mood === '開心' && (
        <>
          <rect x="24" y="28" width="2" height="2" fill="#f88" />
          <rect x="42" y="28" width="2" height="2" fill="#f88" />
        </>
      )}
    </svg>
  );
}

function DesktopPet() {
  const [pos, setPos] = useState(() => ({ x: 120, target: 320 }));
  const [mood, setMood] = useState('普通');
  const [stepping, setStepping] = useState(false);
  const [heart, setHeart] = useState(false);
  const moodTimers = useRef([]);

  // 走路：朝目標移動，到了就休息一下再挑一個新目標。
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let restUntil = 0;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      setPos(prev => {
        const distance = prev.target - prev.x;
        if (Math.abs(distance) < 3) {
          if (!restUntil) restUntil = now + 1200 + Math.random() * 3000;
          if (now < restUntil) return prev;
          restUntil = 0;
          const width = window.innerWidth;
          return { ...prev, target: 40 + Math.random() * Math.max(80, width - 140) };
        }
        return { ...prev, x: prev.x + Math.sign(distance) * SPEED * dt };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 腳步動畫
  useEffect(() => {
    const timer = setInterval(() => setStepping(s => !s), 260);
    return () => clearInterval(timer);
  }, []);

  // 自己會換心情
  useEffect(() => {
    const timer = setInterval(() => {
      setMood(current => {
        if (current === '開心') return current; // 餵完的好心情不要被蓋掉
        const pool = ['普通', '普通', '想睡', '好奇'];
        return pool[Math.floor(Math.random() * pool.length)];
      });
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => () => moodTimers.current.forEach(clearTimeout), []);

  const feed = () => {
    setMood('開心');
    setHeart(true);
    moodTimers.current.push(setTimeout(() => setHeart(false), 1400));
    moodTimers.current.push(setTimeout(() => setMood('普通'), 5000));
  };

  const facing = pos.target >= pos.x ? 1 : -1;
  const bubble = MOODS[mood]?.say;

  return (
    <div
      onClick={feed}
      title="點我餵食"
      style={{
        position: 'absolute',
        left: 0,
        bottom: FLOOR_OFFSET,
        transform: `translateX(${Math.round(pos.x)}px)`,
        zIndex: 3,
        width: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {(heart || bubble) && (
        <div style={{
          fontFamily: "'DotGothic16', monospace",
          fontSize: 13,
          color: 'var(--crt-rose-ink, #fdf4e6)',
          textShadow: '1px 1px 2px #000',
          marginBottom: 2,
          pointerEvents: 'none',
        }}>
          {heart ? '❤️' : bubble}
        </div>
      )}
      <CatSVG mood={mood} facing={facing} stepping={stepping} />
    </div>
  );
}

export default DesktopPet;

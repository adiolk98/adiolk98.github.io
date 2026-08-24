import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const ROOM_WIDTH = 720;
const ROOM_HEIGHT = 440;
const PLAYER_SIZE = 32;
const MOVE_STEP = 4;

const DESK = { x: 300, y: 100, width: 140, height: 56 };

type Rect = { x: number; y: number; width: number; height: number };

function overlaps(boxX: number, boxY: number, boxSize: number, rect: Rect) {
  return boxX < rect.x + rect.width && boxX + boxSize > rect.x &&
    boxY < rect.y + rect.height && boxY + boxSize > rect.y;
}

export function Game() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState({ x: 340, y: 300 });
  const keysRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
        return;
      }
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate]);

  useEffect(() => {
    let frameId: number;
    const tick = () => {
      setPlayer((prev) => {
        const keys = keysRef.current;
        let dx = 0;
        let dy = 0;
        if (keys.ArrowUp) dy -= MOVE_STEP;
        if (keys.ArrowDown) dy += MOVE_STEP;
        if (keys.ArrowLeft) dx -= MOVE_STEP;
        if (keys.ArrowRight) dx += MOVE_STEP;
        if (!dx && !dy) return prev;

        const nextX = Math.min(Math.max(prev.x + dx, 0), ROOM_WIDTH - PLAYER_SIZE);
        const nextY = Math.min(Math.max(prev.y + dy, 0), ROOM_HEIGHT - PLAYER_SIZE);
        if (overlaps(nextX, nextY, PLAYER_SIZE, DESK)) return prev;
        return { x: nextX, y: nextY };
      });
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#1b1f2b', color: '#f4efe4'
    }}>
      <Helmet>
        <title>adi | Game</title>
        <meta name="description" content="A small RPG-style room to explore on adi's personal site." />
      </Helmet>

      <div style={{
        position: 'relative', width: ROOM_WIDTH, height: ROOM_HEIGHT,
        background: '#3a3f52', borderRadius: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden'
      }}>
        {/* desk */}
        <div style={{
          position: 'absolute', left: DESK.x, top: DESK.y, width: DESK.width, height: DESK.height,
          background: '#6b4d3a', borderRadius: 8, boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.25)'
        }} />
        {/* monitor on desk */}
        <div style={{
          position: 'absolute', left: DESK.x + 40, top: DESK.y - 34, width: 60, height: 40,
          background: '#111', borderRadius: 4, boxShadow: '0 0 12px rgba(90,200,255,0.5)'
        }}>
          <div style={{ position: 'absolute', inset: 4, background: '#5ac8ff', opacity: 0.7, borderRadius: 2 }} />
        </div>

        {/* player */}
        <div style={{
          position: 'absolute', left: player.x, top: player.y,
          width: PLAYER_SIZE, height: PLAYER_SIZE,
          background: '#f2b880', borderRadius: '40% 40% 50% 50%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
        }}>
          <div style={{ position: 'absolute', left: 7, top: 11, width: 5, height: 5, background: '#2b2b2b', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', right: 7, top: 11, width: 5, height: 5, background: '#2b2b2b', borderRadius: '50%' }} />
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.7 }}>方向鍵移動・ESC 回到桌面</div>
    </div>
  );
}

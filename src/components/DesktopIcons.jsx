import React, { useEffect, useRef, useState } from 'react';
import DesktopIcon from './DesktopIcon';
import { loadIconPositions, saveIconPositions } from './desktopSettings';

const CELL_W = 104;
const CELL_H = 108;
const PAD_X = 16;
const PAD_Y = 8;
const DRAG_THRESHOLD = 4; // 小於這個距離算點擊，不算拖曳

// 預設排列：跟以前一樣由左而右換行，只是現在算得出座標，才能拖走再放回來。
function gridPosition(index, width) {
  const columns = Math.max(1, Math.floor((width - PAD_X) / CELL_W));
  return {
    x: PAD_X + (index % columns) * CELL_W,
    y: PAD_Y + Math.floor(index / columns) * CELL_H,
  };
}

function DesktopIcons({ apps, onOpen, layoutVersion }) {
  const [positions, setPositions] = useState(loadIconPositions);
  const [dragging, setDragging] = useState(null); // { id, x, y }
  const [width, setWidth] = useState(0);
  const areaRef = useRef(null);
  const dragRef = useRef(null);
  // 拖曳結束後瀏覽器還是會補一個 click/dblclick，這個旗標把那一下吃掉，
  // 不然每次搬圖示都會順便把 App 打開。
  const justDraggedRef = useRef(false);

  const isTouch = typeof window !== 'undefined' && window.innerWidth <= 768;

  // 預設排列要用「桌面實際寬度」算欄數。CRT 的畫面比視窗窄，
  // 直接拿 window.innerWidth 會多算一欄，最後一個圖示就被排到畫面外。
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const measure = () => setWidth(area.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  // 「整理圖示」把存下來的位置清掉，就會退回預設排列。
  useEffect(() => {
    if (layoutVersion === 0) return;
    setPositions({});
    saveIconPositions({});
  }, [layoutVersion]);

  // 監聽在 pointerdown 當下就掛上去，不要放進 useEffect：
  // 拖得快一點就會在 React 重新 render 掛好監聽之前結束，位置就存不到。
  const startDrag = (e, app, fallback) => {
    if (isTouch || e.button !== 0) return;
    justDraggedRef.current = false;
    const at = positions[app.id] || fallback;
    dragRef.current = {
      id: app.id,
      startX: e.clientX,
      startY: e.clientY,
      originX: at.x,
      originY: at.y,
      x: at.x,
      y: at.y,
      moved: false,
      // 用 AbortController 一次拆掉這回合的監聽：每次 render 都會產生新的
      // handler 實體，靠 removeEventListener 比對身分會拆不乾淨。
      controller: new AbortController(),
    };
    const { signal } = dragRef.current.controller;
    window.addEventListener('pointermove', onDragMove, { signal });
    window.addEventListener('pointerup', endDrag, { signal });
    window.addEventListener('pointercancel', endDrag, { signal });
    setDragging({ id: app.id, x: at.x, y: at.y });
  };

  function onDragMove(e) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    drag.moved = true;
    const area = areaRef.current;
    const maxX = Math.max(0, (area?.clientWidth ?? 800) - 84);
    const maxY = Math.max(0, (area?.clientHeight ?? 600) - 88);
    drag.x = Math.min(Math.max(0, drag.originX + dx), maxX);
    drag.y = Math.min(Math.max(0, drag.originY + dy), maxY);
    setDragging({ id: drag.id, x: drag.x, y: drag.y });
  }

  function endDrag() {
    const drag = dragRef.current;
    if (!drag) return;
    drag.controller.abort();
    dragRef.current = null;
    setDragging(null);
    justDraggedRef.current = drag.moved;
    if (!drag.moved) return;
    const next = { ...positions, [drag.id]: { x: drag.x, y: drag.y } };
    setPositions(next);
    saveIconPositions(next);
  }

  return (
    <div
      ref={areaRef}
      style={{
        position: 'absolute',
        inset: '60px 0 0 0',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {apps.map((app, index) => {
        const fallback = gridPosition(index, width);
        const saved = positions[app.id] || fallback;
        const live = dragging?.id === app.id ? dragging : saved;
        return (
          <div
            key={app.id}
            onPointerDown={(e) => startDrag(e, app, fallback)}
            style={{
              position: 'absolute',
              left: live.x,
              top: live.y,
              width: 80,
              pointerEvents: 'auto',
              // 拖曳中的圖示要浮在最上面，而且不要因為滑過就觸發 hover 樣式
              zIndex: dragging?.id === app.id ? 5 : 1,
              opacity: dragging?.id === app.id ? 0.8 : 1,
              cursor: isTouch ? 'pointer' : 'grab',
            }}
          >
            <DesktopIcon
              icon={app.icon}
              label={app.name}
              disabled={app.disabled}
              onDoubleClick={() => {
                if (justDraggedRef.current) return;
                onOpen(app.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default DesktopIcons;

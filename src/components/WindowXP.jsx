import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { useSound, useClickSound } from "./ClickSoundContext";
import CustomWindow from "./CustomWindow";

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose) 52%, var(--crt-rose-lo) 100%);
  color: var(--crt-rose-ink);
  padding: 0 6px 0 10px;
  height: 100%;
  font-family: 'DotGothic16', monospace;
  font-size: 1em;
  box-shadow: inset 0 0 0 2px var(--crt-line);
  cursor: move;
  user-select: none;
`;

const TitleBarText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1em;
`;

const TitleBarControls = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  button {
    /* Real hit target is bigger than the visual swatch: the tube's barrel filter warps
       what's painted but not where clicks register, so a generous target forgives the
       few px of visual/actual mismatch near the screen edges. */
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .2);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, .34);
    border: none;
    color: var(--crt-rose-ink);
    width: 2.05em;
    height: 2.05em;
    line-height: 1;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.2s;
    &:hover, &:active, &:focus-visible {
      background: rgba(0, 0, 0, .4);
    }
    &:focus-visible {
      outline: 2px solid var(--crt-ink);
      outline-offset: 2px;
    }
  }
`;

const WindowBody = styled.div`
  /* border-box：不然 padding 會加在 100% 之外，每個 App 的底部都被切掉 20px。 */
  box-sizing: border-box;
  padding: 10px 8px;
  height: 100%;
  max-height: 100%;
  min-height: 0;
  overflow: auto;
  background: var(--crt-cream);
  &::-webkit-scrollbar {
    width: 8px;
    background: var(--crt-tan);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--crt-rose);
    border-radius: 1px;
  }
  font-size: .92em;
  color:var(--crt-ink);
  font-family:'DotGothic16',monospace;
  scrollbar-color:var(--crt-rose) var(--crt-tan);
  scrollbar-width:thin;
`;

const CustomWindowFrame = ({
  icon,
  title,
  children,
  onClose,
  onFocus,
  onMinimize,
  minimized = false,
  zIndex = 1,
  resizable = true,
  defaultSize = { x: 100, y: 100, width: 320, height: 200 },
}) => {
  const playClick = useClickSound();
  const { playCancel } = useSound();
  const [maximized, setMaximized] = useState(false);

  const [bounds, setBounds] = useState({ width: 800, height: 560 });
  const [box, setBox] = useState(defaultSize);
  useEffect(() => {
    const parent = document.getElementById('desktop-windows-layer');
    if (!parent) return;
    const measure = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      setBounds({ width, height });
      setBox(current => {
        const w = Math.min(current.width, width);
        const h = Math.min(current.height, height);
        return { width: w, height: h, x: Math.max(0, Math.min(current.x, width - w)), y: Math.max(0, Math.min(current.y, height - h)) };
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);
  const isMobile = bounds.width <= 640;
  const controlled = isMobile || maximized
    ? { position: { x: 0, y: 0 }, size: { width: bounds.width, height: bounds.height } }
    : { position: { x: box.x, y: box.y }, size: { width: box.width, height: box.height } };

  const withSound = (fn, sound) => () => {
    try {
      sound();
    } catch (error) {
      console.warn('Window control sound error (handled):', error.message);
    }
    if (fn) fn();
  };

  return (
    <Rnd
      {...controlled}
      bounds="parent"
      maxWidth={bounds.width}
      maxHeight={bounds.height}
      minWidth={Math.min(200, bounds.width)}
      minHeight={100}
      disableDragging={isMobile || maximized}
      enableResizing={!isMobile && !maximized && resizable}
      dragHandleClassName="window-title-bar"
      style={{ zIndex, display: minimized ? 'none' : undefined }}
      onDragStop={(_, data) => setBox(current => ({ ...current, x: data.x, y: data.y }))}
      onResizeStop={(_, __, element, ___, position) => setBox({ width: element.offsetWidth, height: element.offsetHeight, ...position })}
      onDragStart={() => onFocus && onFocus()}
      onResizeStart={() => onFocus && onFocus()}
    >
      <CustomWindow style={{ width: "100%", height: "100%" }} onMouseDown={() => onFocus && onFocus()}>
        <TitleBar
          className="window-title-bar px"
          onDoubleClick={() => !isMobile && setMaximized(m => !m)}
          onMouseDown={withSound(null, playClick)}
        >
          <TitleBarText>
            {icon && (
              <img
                src={icon}
                alt=""
                width="18"
                height="18"
                aria-hidden="true"
                style={{ marginRight: 8, verticalAlign: 'middle' }}
              />
            )}
            {title}
          </TitleBarText>
          <TitleBarControls>
            <button className="px" aria-label={`Minimize ${title} window`} onClick={withSound(onMinimize, playClick)}>—</button>
            {!isMobile && (
              <button className="px"
                aria-label={`${maximized ? 'Restore' : 'Maximize'} ${title} window`}
                onClick={withSound(() => setMaximized(m => !m), playClick)}
              >
                {maximized ? '❐' : '☐'}
              </button>
            )}
            <button className="px" aria-label={`Close ${title} window`} onClick={withSound(onClose, playCancel)}>✕</button>
          </TitleBarControls>
        </TitleBar>
        <WindowBody>
          {children}
        </WindowBody>
      </CustomWindow>
    </Rnd>
  );
};

export default CustomWindowFrame;

import React, { useState } from "react";
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
  height: 30px;
  font-family: 'DotGothic16', monospace;
  font-size: 1.1rem;
  box-shadow: inset 0 0 0 2px var(--crt-line);
  cursor: move;
  user-select: none;
`;

const TitleBarText = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
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
    width: 26px;
    height: 26px;
    line-height: 1;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
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
  height: calc(100% - 30px);
  max-height: calc(100% - 30px);
  overflow: auto;
  background: var(--crt-cream);
  &::-webkit-scrollbar {
    width: 8px;
    background: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1px;
  }
  font-size: 12px;
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const mobileSize = isMobile
    ? {
        x: 10,
        y: 38,
        width: Math.min(window.innerWidth - 20, 380),
        height: Math.min(window.innerHeight - 80, 520)
      }
    : defaultSize;

  // 最大化：撐滿選單列以下的整個桌面。視窗層的原點已經在選單列下方，所以 y 從 0 算起；
  // 底部再留給工作列，不然視窗最下面一行（例如 Terminal 的輸入列）會被工作列蓋住。
  const DOCK_HEIGHT = 46;
  const maximizedBox = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 30 - DOCK_HEIGHT };
  const controlled = isMobile
    ? { position: { x: 10, y: 38 }, size: { width: mobileSize.width, height: mobileSize.height } }
    : maximized
      ? { position: { x: maximizedBox.x, y: maximizedBox.y }, size: { width: maximizedBox.width, height: maximizedBox.height } }
      : {};

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
      default={mobileSize}
      {...controlled}
      minWidth={200}
      minHeight={100}
      disableDragging={isMobile || maximized}
      enableResizing={!isMobile && !maximized && resizable}
      dragHandleClassName="window-title-bar"
      style={{ zIndex, display: minimized ? 'none' : undefined }}
      onDragStart={() => onFocus && onFocus()}
      onResizeStart={() => onFocus && onFocus()}
    >
      <CustomWindow style={{ width: "100%", height: "100%" }} onMouseDown={() => onFocus && onFocus()}>
        <TitleBar
          className="window-title-bar"
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
            <button aria-label={`Minimize ${title} window`} onClick={withSound(onMinimize, playClick)}>—</button>
            {!isMobile && (
              <button
                aria-label={`${maximized ? 'Restore' : 'Maximize'} ${title} window`}
                onClick={withSound(() => setMaximized(m => !m), playClick)}
              >
                {maximized ? '❐' : '☐'}
              </button>
            )}
            <button aria-label={`Close ${title} window`} onClick={withSound(onClose, playCancel)}>✕</button>
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

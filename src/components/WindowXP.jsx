import React from "react";
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
  padding: 10px 8px;
  height: calc(100% - 30px);
  max-height: calc(100% - 30px);
  overflow-y: hidden;
  overflow-x: hidden;
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

const CustomWindowFrame = ({ icon, title, children, onClose, onFocus, defaultSize = { x: 100, y: 100, width: 320, height: 200 } }) => {
  const playClick = useClickSound();
  const { playCancel } = useSound();

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const mobileSize = isMobile
    ? {
        x: 10,
        y: 38,
        width: Math.min(window.innerWidth - 20, 380),
        height: Math.min(window.innerHeight - 80, 520)
      }
    : defaultSize;

  return (
    <Rnd
      default={mobileSize}
      position={isMobile ? { x: 10, y: 38 } : undefined}
      size={isMobile ? { width: Math.min(window.innerWidth - 20, 380), height: Math.min(window.innerHeight - 80, 520) } : undefined}
      minWidth={200}
      minHeight={100}
      disableDragging={isMobile}
      enableResizing={!isMobile}
      dragHandleClassName="window-title-bar"
      onDragStart={() => onFocus && onFocus()}
    >
      <CustomWindow style={{ width: "100%", height: "100%" }} onMouseDown={() => onFocus && onFocus()}>
        <TitleBar className="window-title-bar" onMouseDown={() => {
          try {
            playClick();
          } catch (error) {
            console.warn('Title bar click sound error (handled):', error.message);
          }
        }}>
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
            <button aria-label={`Close ${title} window`} onClick={() => {
              try {
                playCancel();
              } catch (error) {
                console.warn('Close button sound error (handled):', error.message);
              }
              onClose && onClose();
            }}>✕</button>
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
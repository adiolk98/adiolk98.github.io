import React from 'react';
import styled from 'styled-components';

// 只列出「已經開著」的視窗，就是一般作業系統的工作列：點一下切換、
// 縮到最小的視窗要有地方叫回來，中鍵或 ✕ 直接關掉。
const Bar = styled.div`
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: min(92%, 900px);
  overflow-x: auto;
  padding: 4px 6px;
  background: linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose-lo) 100%);
  box-shadow: inset 0 0 0 2px var(--crt-line), .16em .2em 0 rgba(0, 0, 0, .34);
  z-index: 900;
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  max-width: 150px;
  padding: 4px 8px;
  border: none;
  cursor: pointer;
  font-family: 'DotGothic16', monospace;
  font-size: 11px;
  color: var(--crt-ink);
  background: ${props => (props.$active ? 'var(--crt-cream)' : 'rgba(253, 244, 230, .55)')};
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, ${props => (props.$active ? '.42' : '.22')});
  opacity: ${props => (props.$minimized ? 0.6 : 1)};

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
  }

  &:hover { background: var(--crt-cream); }
  &:focus-visible { outline: 2px solid var(--crt-ink); outline-offset: 2px; }
`;

const CloseDot = styled.span`
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  font-size: 10px;
  background: rgba(0, 0, 0, .18);

  &:hover { background: var(--crt-red); color: var(--crt-cream); }
`;

function Dock({ items, activeId, onSelect, onClose }) {
  if (!items.length) return null;

  return (
    <Bar role="toolbar" aria-label="開啟中的視窗">
      {items.map(item => (
        <Item
          key={item.id}
          $active={item.id === activeId}
          $minimized={item.minimized}
          onClick={() => onSelect(item.id)}
          title={item.minimized ? `${item.name}（已縮小）` : item.name}
        >
          {item.icon && <img src={item.icon} alt="" aria-hidden="true" />}
          <span>{item.name}</span>
          <CloseDot
            role="button"
            aria-label={`關閉 ${item.name}`}
            onClick={(e) => { e.stopPropagation(); onClose(item.id); }}
          >
            ✕
          </CloseDot>
        </Item>
      ))}
    </Bar>
  );
}

export default Dock;

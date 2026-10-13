import React from 'react';

export default function Dock({ items, activeId, onSelect, onClose }) {
  return <div className="desktop-taskbar px" role="toolbar" aria-label="開啟中的視窗">
    <span className="taskbar-brand">ADI OS</span>
    <div className="taskbar-windows">
      {items.length ? items.map(item => <div className={`taskbar-item px ${item.id === activeId ? 'active' : ''} ${item.minimized ? 'minimized' : ''}`} key={item.id}>
        <button className="taskbar-select" onClick={() => onSelect(item.id)} aria-pressed={item.id === activeId} title={item.minimized ? `${item.name}（已縮小）` : item.name}>
          {item.icon && <img src={item.icon} alt="" aria-hidden="true" />}<span>{item.name}</span>
        </button>
        <button className="taskbar-close" aria-label={`關閉 ${item.name}`} onClick={() => onClose(item.id)}>×</button>
      </div>) : <span className="taskbar-hint">雙擊圖示，開啟程式。</span>}
    </div>
    <span className="taskbar-count">{String(items.length).padStart(2,'0')} OPEN</span>
  </div>;
}

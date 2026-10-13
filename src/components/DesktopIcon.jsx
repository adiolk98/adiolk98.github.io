import React, { useState } from 'react';
import { useClickSound } from './ClickSoundContext';

export default function DesktopIcon({ icon, label, onDoubleClick, disabled=false }) {
  const [selected,setSelected] = useState(false);
  const playClick = useClickSound();
  const select = () => {
    setSelected(true);
    try { playClick(); } catch { /* Audio is optional. */ }
  };
  return <button className={`desktop-icon px ${selected ? 'selected' : ''}`} disabled={disabled} aria-label={label}
    onClick={()=>{select();if(window.matchMedia('(max-width:768px), (pointer:coarse)').matches)onDoubleClick?.();}}
    onDoubleClick={()=>{if(!window.matchMedia('(max-width:768px), (pointer:coarse)').matches)onDoubleClick?.();}}
    onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();onDoubleClick?.(true);}}}
    onBlur={()=>setSelected(false)}>
    <img src={icon} alt="" width="48" height="48" aria-hidden="true" /><span>{label}</span>
  </button>;
}

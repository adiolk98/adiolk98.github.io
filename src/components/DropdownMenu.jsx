import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function DropdownMenu({ items, position, onClose }) {
  const ref = useRef(null);
  const host = document.querySelector('.crt-tube .warp') || document.body;
  const bounds = host.getBoundingClientRect();
  const x = position.x - bounds.left;
  const y = position.y - bounds.top;

  useLayoutEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    menu.style.left = `${Math.max(16,Math.min(x,host.clientWidth-menu.offsetWidth-16))}px`;
    menu.style.top = `${Math.max(16,Math.min(y,host.clientHeight-menu.offsetHeight-16))}px`;
    menu.querySelector('button:not(:disabled)')?.focus({preventScroll:true});
  },[x,y,host]);

  return createPortal(<div className="dropdown-menu-container desktop-dropdown px" role="menu" ref={ref} style={{left:x,top:y}} onKeyDown={e=>{
    const buttons = Array.from(ref.current.querySelectorAll('button:not(:disabled)'));
    const index = buttons.indexOf(document.activeElement);
    if (e.key==='Escape') { e.preventDefault(); onClose(); }
    if (e.key==='ArrowDown' || e.key==='ArrowUp') { e.preventDefault(); buttons[(index+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus(); }
  }}>
    {items.map((item,i)=>item.type==='separator' ? <div className="desktop-menu-rule" key={i} role="separator" /> : <button role="menuitem" key={i} disabled={item.disabled} onClick={()=>{item.action?.();onClose();}}>{item.label}</button>)}
  </div>,host);
}

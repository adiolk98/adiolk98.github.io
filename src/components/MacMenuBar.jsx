import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import DropdownMenu from './DropdownMenu';

export default function MacMenuBar({ onOpenApp, onCloseActive, onChangeWallpaper, onArrangeIcons, onScreensaver }) {
  const [now, setNow] = useState(new Date());
  const [notice, setNotice] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x:0, y:0 });
  const menuBarRef = useRef(null);
  const okRef = useRef(null);
  const audioRef = useRef(null);

  const menuConfig = {
    'ADI-9800': [
      { label:'關於這台電腦', action:()=>onOpenApp('wiki') },
      { label:'使用說明', action:()=>setNotice(true) },
    ],
    '檔案': [
      { label:'開啟 Finder', action:()=>onOpenApp('finder') },
      { label:'開啟 Terminal', action:()=>onOpenApp('terminal') },
      { type:'separator' },
      { label:'關閉目前視窗', action:onCloseActive },
    ],
    '桌面': [
      { label:'更換桌布', action:onChangeWallpaper },
      { label:'整理桌面圖示', action:onArrangeIcons },
      { label:'螢幕保護程式', action:onScreensaver },
    ],
    '前往': [
      { label:'作品集', action:()=>onOpenApp('works') },
      { label:'工具箱', action:()=>onOpenApp('tools') },
      { label:'關於 adi', action:()=>{ window.location.hash='/me'; } },
    ],
  };

  useEffect(() => {
    const timer = setInterval(()=>setNow(new Date()),1000);
    const outside = e => {
      if (menuBarRef.current?.contains(e.target) || e.target.closest('.dropdown-menu-container')) return;
      setOpenMenu(null);
    };
    const escape = e => { if (e.key==='Escape') setOpenMenu(null); };
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    return () => { clearInterval(timer); document.removeEventListener('pointerdown',outside); document.removeEventListener('keydown',escape); };
  },[]);

  useEffect(() => {
    if (!notice) return;
    const previous = document.activeElement;
    okRef.current?.focus({preventScroll:true});
    const key = e => {
      if (['Enter',' ','Escape'].includes(e.key)) { e.preventDefault(); setNotice(false); }
      if (e.key==='Tab') { e.preventDefault(); okRef.current?.focus(); }
    };
    document.addEventListener('keydown',key);
    return () => { document.removeEventListener('keydown',key); previous?.focus({preventScroll:true}); };
  },[notice]);

  const open = (name,e) => {
    if (openMenu===name) { setOpenMenu(null); return; }
    audioRef.current?.play().catch(()=>{});
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({x:rect.left,y:rect.bottom});
    setOpenMenu(name);
  };
  const date = now.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',month:'2-digit',day:'2-digit'});
  const time = now.toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false});
  const warp = document.querySelector('.crt-tube .warp');

  return <>
    <header className="desktop-menu px" ref={menuBarRef}>
      <audio ref={audioRef} src="/assets/sound-effects/select.wav" preload="none" />
      <nav aria-label="電腦選單" className="desktop-menu-items">
        {Object.keys(menuConfig).map(name=><button key={name} className={`${name==='ADI-9800' ? 'desktop-logo' : ''} ${openMenu===name ? 'open' : ''}`} aria-haspopup="menu" aria-expanded={openMenu===name} onClick={e=>open(name,e)}>{name}</button>)}
      </nav>
      <div className="desktop-clock"><span>{date}</span><time>{time}</time></div>
    </header>
    {openMenu && <DropdownMenu items={menuConfig[openMenu]} position={menuPosition} onClose={()=>setOpenMenu(null)} />}
    {notice && warp && createPortal(<div className="crt-scrim on" onClick={e=>{if(e.target===e.currentTarget)setNotice(false);}}>
      <div className="crt-dlgwrap"><div className="crt-panel crt-dlg px" role="dialog" aria-modal="true" aria-labelledby="desktop-help-title">
        <h2 id="desktop-help-title">使用這台電腦</h2><div className="rule" />
        <p>雙擊<em className="kw">桌面圖示</em>開啟程式。<br />拖曳標題列移動視窗。<br />用下方工作列切換或還原視窗。<br />手機點一下圖示即可開啟。</p>
        <button ref={okRef} className="crt-btn red px" onClick={()=>setNotice(false)}>確定 <span aria-hidden="true">↵</span></button>
      </div></div>
    </div>,warp)}
  </>;
}

import React, { useEffect, useState, useRef } from "react";
import DropdownMenu from "./DropdownMenu";

export default function MacMenuBar({ onOpenApp, onCloseActive }) {
  const [now, setNow] = useState(new Date());
  const [notice, setNotice] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuBarRef = useRef(null);
  const openAudioRef = useRef(null);
  const closeAudioRef = useRef(null);

  const playSound = (ref) => {
    if (ref.current) {
        ref.current.currentTime = 0;
        ref.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };
  
  const closeMenu = () => {
    if (openMenu) {
        playSound(closeAudioRef);
        setOpenMenu(null);
    }
  };

  // 用桌面自己的對話框，不要用瀏覽器原生 alert——那會跳出整個 CRT 畫面。
  const showHelp = () => setNotice(
    '雙擊桌面圖示開啟 App。\n視窗標題列可拖曳，右上角有縮小／最大化／關閉，\n下方工作列可以切換已開啟的視窗。'
  );

  const menuConfig = {
    icon: [
        { label: "關於這個 App", action: () => onOpenApp('wiki') },
        { type: "separator" },
        { label: "設定...", disabled: true },
        { label: "登出", disabled: true },
    ],
    檔案: [
      { label: "New Finder Window", action: () => onOpenApp('finder') },
      { label: "New Terminal", action: () => onOpenApp('terminal') },
      { type: "separator" },
      { label: "Move to Trash", disabled: true },
      { label: "Empty Trash...", action: () => setNotice('垃圾桶已經是空的。') },
      { type: "separator" },
      { label: "Close Window", action: () => onCloseActive && onCloseActive() },
    ],
    編輯: [{ label: "Undo", disabled: true }, { label: "Redo", disabled: true }],
    檢視: [{ label: "Zoom In", disabled: true }, { label: "Zoom Out", disabled: true }],
    前往: [
      { label: "作品集", action: () => onOpenApp('works') },
      { label: "Developer Tools", action: () => onOpenApp('tools') },
      { type: "separator" },
      { label: "Open Terminal", action: () => onOpenApp('terminal') },
    ],
    幫助: [{ label: "顯示幫助訊息", action: showHelp }],
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);

    const handleOutsideClick = (event) => {
      if (menuBarRef.current && menuBarRef.current.contains(event.target)) {
        return;
      }
      if (event.target.closest(".dropdown-menu-container")) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenu]);

  const handleMenuClick = (menuName, event) => {
    if (openMenu === menuName) {
      closeMenu();
    } else {
      playSound(openAudioRef);
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({ x: rect.left, y: rect.bottom });
      setOpenMenu(menuName);
    }
  };

  const weekDay = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const barStyle = {
    position: 'relative',
    width: '100%',
    height: 30,
    flex: '0 0 auto',
    background: 'linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose) 52%, var(--crt-rose-lo) 100%)',
    boxShadow: 'inset 0 0 0 2px var(--crt-line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: "'DotGothic16', 'Cubic_11', monospace",
    fontSize: 14,
    color: 'var(--crt-rose-ink)',
    zIndex: 999
  };
  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    marginLeft: 16
  };
  const appleStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    width: 20,
    height: 20
  };
  const menuItemStyle = (menuName) => ({
    cursor: 'pointer',
    padding: '3px 7px',
    transition: 'background 0.2s',
    userSelect: 'none',
    backgroundColor: openMenu === menuName ? 'rgba(0,0,0,.24)' : 'transparent'
  });
  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginRight: 18
  };
  const dateTimeStyle = {
    fontSize: 14
  };

  return (
    <div style={barStyle} ref={menuBarRef}>
      <audio ref={openAudioRef} src="/assets/sound-effects/select.wav" preload="auto" />
      <audio ref={closeAudioRef} src="/assets/sound-effects/select.wav" preload="auto" />
      <div style={leftStyle}>
        {Object.keys(menuConfig).map(itemKey => {
          if (itemKey === 'icon') {
            return (
              <img
                key={itemKey}
                src="/assets/gpt_banana_icon.webp"
                alt="banana"
                style={{
                  ...appleStyle,
                  cursor: 'pointer',
                  padding: '2px',
                  backgroundColor: openMenu === itemKey ? 'rgba(0,0,0,.24)' : 'transparent',
                }}
                onClick={(e) => handleMenuClick(itemKey, e)}
              />
            );
          }
          return (
            <span
              className="mac-menu-item"
              style={{
                ...menuItemStyle(itemKey),
                display: typeof window !== 'undefined' && window.innerWidth <= 768 && itemKey !== '檔案' ? 'none' : 'inline-block'
              }}
              key={itemKey}
              onClick={(e) => handleMenuClick(itemKey, e)}
            >{itemKey}</span>
          );
        })}
      </div>
      {openMenu && (
        <DropdownMenu
          items={menuConfig[openMenu]}
          position={menuPosition}
          onClose={closeMenu}
        />
      )}
      {notice && (
        <div
          onClick={() => setNotice(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div
            className="crt-panel px"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 320, whiteSpace: 'pre-wrap', fontFamily: "'DotGothic16', monospace", fontSize: 13 }}
          >
            <div style={{ marginBottom: 12 }}>{notice}</div>
            <div style={{ textAlign: 'right' }}>
              <button className="crt-btn red" onClick={() => setNotice(null)}>確定</button>
            </div>
          </div>
        </div>
      )}
      <div style={rightStyle}>
        <span role="img" aria-label="volume">🔊</span>
        <span style={dateTimeStyle}>{`週${weekDay} ${now.getMonth() + 1}月${now.getDate()}日`}</span>
        <span style={dateTimeStyle}>{timeString}</span>
      </div>
    </div>
  );
} 
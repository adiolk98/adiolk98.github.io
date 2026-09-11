import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Helmet } from 'react-helmet-async';
import { GlobalStyle, Particles } from "../components/style";

import DesktopIcons from "../components/DesktopIcons";
import CustomWindowFrame from "../components/WindowXP";
import DesktopBackground from "../components/DesktopBackground";
import DesktopPet from "../components/DesktopPet";
import Dock from "../components/Dock";
import DropdownMenu from "../components/DropdownMenu";
import Screensaver, { useIdleScreensaver } from "../components/Screensaver";
import Finder from "../components/Finder";
import { ClickSoundProvider, SoundProvider } from "../components/ClickSoundContext";
import MacMenuBar from "../components/MacMenuBar";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  wallpaperById,
  nextWallpaperId,
  loadWallpaperId,
  saveWallpaperId,
} from "../components/desktopSettings";

// app (Dynamic Imports)
import { FileSystemProvider } from "../apps/FileSystemContext";
const BrowserApp = lazy(() => import("../components/BrowserApp"));
const MP3Player = lazy(() => import("../components/MP3Player"));
const Terminal = lazy(() => import("../apps/Terminal"));
const YahooChat = lazy(() => import("../apps/YahooChat"));
const PDFViewer = lazy(() => import("../components/PDFViewer"));
const VSCodeTextEditor = lazy(() => import("../apps/vscodeEditor"));
const DitherImageViewer = lazy(() => import("../components/DitherImageViewer"));
const OpenAppStore = lazy(() => import("../apps/OpenAppStore"));
const GameBoyAdvance = lazy(() => import("../apps/GameBoyAdvance"));
const LockedFolderApp = lazy(() => import("../components/LockedFolderApp"));

// ↑↑↓↓←→←→BA
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

function useKonami(onUnlock) {
  // callback 放進 ref，effect 才不會每次 render 都重掛一次監聽（重掛會把輸入進度歸零）。
  const latest = useRef(onUnlock);
  latest.current = onUnlock;

  useEffect(() => {
    let progress = 0;
    const onKey = (e) => {
      const key = e.key.toLowerCase();
      progress = key === KONAMI[progress] ? progress + 1 : (key === KONAMI[0] ? 1 : 0);
      if (progress === KONAMI.length) {
        progress = 0;
        latest.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

const WindowLoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    height: '100%',
    width: '100%',
    background: '#f0f0f0',
    color: '#333',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '20px'
  }}>
    Loading application...
  </div>
);

// 集中管理所有 app 設定
const APP_CONFIGS = [
  {
    id: "wiki",
    name: "wiki",
    icon: "/assets/app/B/Wikipedia.png",
    windowProps: { title: "wiki", defaultSize: { x: 200, y: 120, width: 400, height: 500 } },
    content: (
      <div style={{
        padding: '16px',
        lineHeight: 1.8,
        fontSize: '1.1em',
        maxHeight: '100%',
        overflowY: 'auto',
        boxSizing: 'border-box',
        background: '#fff',
        color: '#222',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: '8px', color: '#2d72d9' }}>Welcome to adi.tw. v1</h2>
        <div>嗨，這是我的個人網站，歡迎使用，歡迎多點點看！</div>
      </div>
    )
  },
  {
    id: "browser",
    name: "Chrome",
    icon: "/assets/app/B/Google_Chrome.png",
    windowProps: { title: "Chrome", defaultSize: { x: 220, y: 120, width: 650, height: 540 } },
    Component: BrowserApp,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "/assets/app/terminal-removebg-preview.png",
    windowProps: { title: "Terminal", defaultSize: { x: 100, y: 100, width: 700, height: 350 } },
    Component: Terminal,
  },
  {
    id: "cv",
    name: "CV.pdf",
    icon: "/assets/app/B/Microsoft_PowerPoint.png",
    windowProps: { title: "CV.pdf", defaultSize: { x: 150, y: 150, width: 800, height: 600 } },
    Component: () => <PDFViewer filePath="/assets/cv.pdf" />,
  },
  {
    id: "mp3player",
    name: "千千靜聽",
    icon: "/assets/app/mp3player-removebg-preview.png",
    windowProps: { title: "千千靜聽", defaultSize: { x: 180, y: 180, width: 380, height: 470 }, resizable: true },
    Component: MP3Player,
  },
  {
    id: "dither-image-viewer",
    name: "Instagram CCD",
    icon: '/assets/app/B/instagram-old.png',
    windowProps: { title: "Instagram CCD", defaultSize: { x: 180, y: 180, width: 500, height: 512 }, resizable: false },
    Component: DitherImageViewer,
  },
  {
    id: "vscode-text-editor",
    name: "VSCode Editor",
    icon: "/assets/app/vscode-removebg-preview.png",
    windowProps: { title: "VSCode Editor", defaultSize: { x: 400, y: 100, width: 820, height: 600 }, resizable: true },
    Component: VSCodeTextEditor,
  },
  {
    id: 'instant-chat',
    name: '即時通',
    icon: '/assets/app/yahoo-message-removebg-preview.png',
    windowProps: { title: '即時通', defaultSize: { x: 900, y: 200, width: 350, height: 600 } },
    Component: YahooChat,
  },
  {
    id: 'open-appstore',
    name: 'App Store 下載',
    icon: '/assets/app/app-store-removebg-preview.png',
    windowProps: { title: 'App Store 下載', defaultSize: { x: 200, y: 120, width: 400, height: 300 }, resizable: true },
    Component: OpenAppStore,
  },
  {
    id: 'gameboy-advance',
    name: 'Game Boy Advance',
    icon: '/assets/gba/gba-interface.png',
    windowProps: { title: 'Game Boy Advance', defaultSize: { x: 300, y: 150, width: 500, height: 340 }, resizable: false },
    Component: GameBoyAdvance,
  },
  {
    id: 'pixel-snapper',
    name: 'Pixel Snapper',
    icon: '/assets/app/pixel-snapper.svg',
    windowProps: { title: 'Pixel Snapper', defaultSize: { x: 240, y: 130, width: 720, height: 560 }, resizable: true },
    Component: () => <PDFViewer filePath="/apps/pixel-me/index.html" title="Pixel Snapper" />,
  },
  {
    id: 'apnea-table',
    name: 'CO2 耐受表',
    icon: '/assets/app/apnea-table.svg',
    windowProps: { title: 'CO2 耐受表', defaultSize: { x: 280, y: 150, width: 700, height: 560 }, resizable: true },
    Component: () => <PDFViewer filePath="/apps/pixel-me/co2table.html" title="CO2 耐受表" />,
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    icon: '/assets/app/B/Toggl.png',
    onOpen: () => {
      window.location.href = '#/tools';
    },
  },
  {
    id: 'works',
    name: '作品集',
    icon: '/assets/app/works.svg',
    onOpen: () => {
      window.location.href = '#/works';
    },
  },
  {
    id: 'finder',
    name: 'Finder',
    icon: '/assets/app/finder-folder.svg',
    windowProps: { title: 'Finder', defaultSize: { x: 260, y: 140, width: 380, height: 320 }, resizable: true },
    Component: Finder,
  },
  {
    id: 'locked-folder',
    name: '不要打開',
    icon: '/assets/app/locked-folder.svg',
    windowProps: { title: '不要打開', defaultSize: { x: 260, y: 160, width: 340, height: 240 }, resizable: false },
    Component: LockedFolderApp,
  },
];

function AppContent() {
  // 視窗清單保持「開啟順序」不動——重新排序 DOM 會讓 iframe（Chrome、CV.pdf）重新載入，
  // 所以層疊順序改用各自的 z 值，聚焦時發一個新的號碼給它就好。
  const [windows, setWindows] = useState([]); // [{ id, minimized, offset, z }]
  const zCounter = useRef(0);
  const [wallpaperId, setWallpaperId] = useState(loadWallpaperId);
  const [contextMenu, setContextMenu] = useState(null); // { x, y }
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [toast, setToast] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [screensaverOn, setScreensaverOn] = useIdleScreensaver();

  const background = wallpaperById(wallpaperId);

  const say = (message) => {
    setToast(message);
    setTimeout(() => setToast(current => (current === message ? null : current)), 2200);
  };

  const changeWallpaper = () => {
    const id = nextWallpaperId(wallpaperId);
    setWallpaperId(id);
    saveWallpaperId(id);
    say(`桌布：${wallpaperById(id).name}`);
  };

  // 右鍵選單：點到別的地方就收起來（DropdownMenu 本身只負責畫）。
  useEffect(() => {
    if (!contextMenu) return;
    const close = (e) => {
      if (e.target.closest('.dropdown-menu-container')) return;
      setContextMenu(null);
    };
    document.addEventListener('mousedown', close);
    window.addEventListener('blur', close);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('blur', close);
    };
  }, [contextMenu]);

  // ↑↑↓↓←→←→BA：讓整個 CRT 翻一圈。
  useKonami(() => {
    setRolling(true);
    say('CHEAT MODE：桌面翻滾中');
    setTimeout(() => setRolling(false), 1400);
  });

  const topWindow = windows
    .filter(w => !w.minimized)
    .reduce((top, w) => (!top || w.z > top.z ? w : top), null);
  const activeAppId = topWindow?.id ?? null;

  const focus = (id) => setWindows(prev => {
    const target = prev.find(w => w.id === id);
    if (!target || (!target.minimized && target.id === activeAppId)) return prev;
    zCounter.current += 1;
    return prev.map(w => (w.id === id ? { ...w, minimized: false, z: zCounter.current } : w));
  });

  // 開啟 app：已經開著就拉到最上層，沒開過才新增（並且往右下錯開，才不會整疊完全重合）。
  const handleOpenApp = (id) => {
    const appConfig = APP_CONFIGS.find(app => app.id === id);
    if (appConfig?.onOpen) {
      appConfig.onOpen();
      return;
    }
    setWindows(prev => {
      zCounter.current += 1;
      if (prev.some(w => w.id === id)) {
        return prev.map(w => (w.id === id ? { ...w, minimized: false, z: zCounter.current } : w));
      }
      return [...prev, { id, minimized: false, offset: (prev.length % 6) * 24, z: zCounter.current }];
    });
  };

  const handleCloseApp = (id) => setWindows(prev => prev.filter(w => w.id !== id));

  const handleMinimizeApp = (id) => setWindows(prev =>
    prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
  );

  // 點 dock 上目前最上層的視窗＝縮到最小，其他情況＝叫出來並聚焦
  const toggleFromDock = (id) => {
    if (id === activeAppId) return handleMinimizeApp(id);
    focus(id);
  };

  const dockItems = windows.map(w => {
    const config = APP_CONFIGS.find(app => app.id === w.id);
    return { ...w, name: config?.name ?? w.id, icon: config?.icon };
  });

  const desktopMenu = [
    { label: `更換桌布（${wallpaperById(wallpaperId).name}）`, action: changeWallpaper },
    { label: '整理桌面圖示', action: () => { setLayoutVersion(v => v + 1); say('圖示歸位'); } },
    { type: 'separator' },
    { label: '開啟螢幕保護程式', action: () => setScreensaverOn(true) },
    { label: '關於這台電腦', action: () => handleOpenApp('wiki') },
  ];

  return (
    <div
      className={rolling ? 'desktop-barrel-roll' : undefined}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
      onContextMenu={(e) => {
        // 視窗和工作列裡面留給瀏覽器原本的右鍵選單（Terminal、編輯器要能複製貼上）。
        if (e.target.closest('#desktop-windows-layer, [role="toolbar"]')) return;
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <Helmet>
        <title>adi | Retro OS</title>
        <meta name="description" content="A personal website reimagined as a retro desktop OS with windows, apps, and mini-games by adi." />
      </Helmet>
      <DesktopBackground background={background} />
      <Particles style={{ pointerEvents: 'none' }} />
      <GlobalStyle />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        <MacMenuBar onOpenApp={handleOpenApp} onCloseActive={() => activeAppId && handleCloseApp(activeAppId)} />
        {/* 桌面 icon：可以拖著搬家，位置會記住 */}
        <DesktopIcons apps={APP_CONFIGS} onOpen={handleOpenApp} layoutVersion={layoutVersion} />
        <DesktopPet />
        {/* 視窗 */}
        <div id="desktop-windows-layer" style={{ position: 'relative', zIndex: 2 }}>
          {windows.map(win => {
            const app = APP_CONFIGS.find(a => a.id === win.id);
            if (!app) return null;
            const AppComponent = app.Component;
            const { defaultSize, ...rest } = app.windowProps || {};
            const size = defaultSize
              ? { ...defaultSize, x: defaultSize.x + win.offset, y: defaultSize.y + win.offset }
              : undefined;
            return (
              <CustomWindowFrame
                key={app.id}
                icon={app.icon}
                {...rest}
                defaultSize={size}
                zIndex={win.z}
                minimized={win.minimized}
                onClose={() => handleCloseApp(app.id)}
                onMinimize={() => handleMinimizeApp(app.id)}
                onFocus={() => focus(app.id)}
              >
                <Suspense fallback={<WindowLoadingFallback />}>
                  {AppComponent ? <AppComponent /> : app.content}
                </Suspense>
              </CustomWindowFrame>
            );
          })}
        </div>
        <Dock items={dockItems} activeId={activeAppId} onSelect={toggleFromDock} onClose={handleCloseApp} />
      </div>

      {contextMenu && (
        <DropdownMenu
          items={desktopMenu}
          position={contextMenu}
          onClose={() => setContextMenu(null)}
        />
      )}

      {toast && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 52,
          transform: 'translateX(-50%)',
          zIndex: 1200,
          padding: '6px 14px',
          background: 'rgba(23, 28, 36, .88)',
          color: 'var(--crt-rose-ink)',
          boxShadow: 'inset 0 0 0 2px var(--crt-rose)',
          fontFamily: "'DotGothic16', monospace",
          fontSize: 12,
          pointerEvents: 'none',
        }}>
          {toast}
        </div>
      )}

      {screensaverOn && <Screensaver onExit={() => setScreensaverOn(false)} />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <FileSystemProvider>
        <ClickSoundProvider>
          <SoundProvider>
            <AppContent />
          </SoundProvider>
        </ClickSoundProvider>
      </FileSystemProvider>
    </ErrorBoundary>
  );
}

export default App; 
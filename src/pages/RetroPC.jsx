import React, { useState, lazy, Suspense } from "react";
import { Helmet } from 'react-helmet-async';
import {
  GlobalStyle,
  Particles,
  DesktopIconsContainer
} from "../components/style";

import DesktopIcon from "../components/DesktopIcon";
import CustomWindowFrame from "../components/WindowXP";
import DesktopBackground from "../components/DesktopBackground";
import Taskbar from "../components/Taskbar";
import { ClickSoundProvider, SoundProvider } from "../components/ClickSoundContext";
import { AppWindowsProvider, useAppWindows } from "../components/AppWindowsContext";
import MacMenuBar from "../components/MacMenuBar";
import ErrorBoundary from "../components/ErrorBoundary";

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
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: '8px', color: '#2d72d9' }}>Welcome to adi.tw. v1</h2>
        <div style={{ marginBottom: '12px', color: '#d9534f', fontWeight: 'bold' }}>
          公告：即時通功能可以留言！我會看到！
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>feature:</span>
          <ol style={{ margin: '8px 0 0 24px' }}>
            <li>即時通可以留言!!</li>
            <li>instagram 盡量還原我喜歡的ccd風格, 原本想說要做無名小站</li>
            <li>cv.pdf, 是我的履歷有興趣可以聯絡我 kokp520@gmail.com</li>
            <li>App store 目前還沒做其他功能只放連結！</li>
          </ol>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>todo：</span>
          <ol style={{ margin: '8px 0 0 24px' }}>
            <li>[feature]yahoo即時通 storage狀態功能</li>
            <li>[feature]finder feature</li>
            <li>[feature]GBA game 做實際小遊戲，頁面調整</li>
            <li>[feature]chrome 多做網頁的功能</li>
          </ol>
        </div>
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
    windowProps: { title: "千千靜聽", defaultSize: { x: 180, y: 180, width: 380, height: 330 }, resizable: false },
    Component: MP3Player,
  },
  {
    id: "dither-image-viewer",
    name: "Instagram CCD",
    icon: '/assets/app/B/instagram-old.png',
    windowProps: { title: "Instagram CCD", defaultSize: { x: 180, y: 180, width: 500, height: 490 }, resizable: false },
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
    id: 'tools',
    name: 'Developer Tools',
    icon: '/assets/app/B/Toggl.png',
    onOpen: () => {
      window.location.href = '#/tools';
    },
  },
];

function AppContent() {
  const [openApps, setOpenApps] = useState({}); // { about: true, maple: false, ... }
  const [activeAppId, setActiveAppId] = useState(null);
  const { openApp, closeApp } = useAppWindows();

  // 建立背景狀態
  const [background, setBackground] = useState({
    type: 'video',
    src: '/assets/wallpaper-compressed.mp4'
  });

  // 開啟 app 並聚焦
  const handleOpenApp = (id) => {
    const appConfig = APP_CONFIGS.find(app => app.id === id);
    if (appConfig?.onOpen) {
      appConfig.onOpen();
      return;
    }
    setOpenApps(prev => ({ ...prev, [id]: true }));
    setActiveAppId(id);
    if (appConfig) {
      openApp({ id: appConfig.id, name: appConfig.name, icon: appConfig.icon });
    }
  };
  // 關閉 app
  const handleCloseApp = (id) => {
    setOpenApps(prev => ({ ...prev, [id]: false }));
    closeApp(id);
    if (activeAppId === id) setActiveAppId(null);
  };

  // 依照 activeAppId 決定視窗渲染順序（聚焦的最後渲染）
  const openedWindows = APP_CONFIGS.filter(app => openApps[app.id])
    .sort(w => w.id === activeAppId ? 1 : -1);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Helmet>
        <title>adi | Retro OS</title>
        <meta name="description" content="A personal website reimagined as a retro desktop OS with windows, apps, and mini-games by adi." />
      </Helmet>
      <DesktopBackground background={background} />
      <Particles style={{ pointerEvents: 'none' }} />
      <GlobalStyle />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        <MacMenuBar onOpenApp={handleOpenApp} />
        {/* 桌面 icon */}
        <DesktopIconsContainer style={{ zIndex: 1 }}>
          {APP_CONFIGS.map(app => (
            <DesktopIcon
              key={app.id}
              icon={app.icon}
              label={app.name}
              onDoubleClick={() => handleOpenApp(app.id)}
              disabled={app.disabled}
            />
          ))}
        </DesktopIconsContainer>
        {/* 視窗 */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {openedWindows.map(app => {
            const AppComponent = app.Component;
            return (
              <CustomWindowFrame
                key={app.id}
                icon={app.icon}
                {...app.windowProps}
                onClose={() => handleCloseApp(app.id)}
                onFocus={() => setActiveAppId(app.id)}
              >
                <Suspense fallback={<WindowLoadingFallback />}>
                  {AppComponent ? <AppComponent /> : app.content}
                </Suspense>
              </CustomWindowFrame>
            );
          })}
        </div>
        {/* <Taskbar activeAppId={activeAppId} onAppClick={handleAppClick} /> */}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <FileSystemProvider>
        <ClickSoundProvider>
          <SoundProvider>
            <AppWindowsProvider>
              <AppContent />
            </AppWindowsProvider>
          </SoundProvider>
        </ClickSoundProvider>
      </FileSystemProvider>
    </ErrorBoundary>
  );
}

export default App; 
import React, { useState } from "react";

const HOME_URL = "https://adiolk98.github.io/#/tools";

let tabSeq = 0;

function createTab(url = HOME_URL) {
  tabSeq += 1;
  return {
    id: `tab_${Date.now()}_${tabSeq}`,
    history: [url],
    index: 0,
    input: url,
    reloadKey: 0,
  };
}

// 輸入列的內容可能是網址，也可能是關鍵字；跟真的瀏覽器一樣自己判斷。
export function resolveUrl(input) {
  const value = input.trim();
  if (!value) return null;
  const isLikelyUrl = /^https?:\/\//i.test(value) || /^[^\s]+\.[a-z]{2,}(\/|$|\?)/i.test(value);
  if (!isLikelyUrl) return `https://www.google.com/search?q=${encodeURIComponent(value)}`;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function hostOf(url) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

export default function BrowserApp() {
  const [tabs, setTabs] = useState(() => [createTab()]);
  const [activeTabId, setActiveTabId] = useState(() => null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];
  const currentUrl = activeTab.history[activeTab.index];

  // 跨站頁面多半會用 X-Frame-Options 拒絕被內嵌，而且瀏覽器連錯誤頁都會觸發 onLoad，
  // 沒辦法從程式裡判斷成不成功。所以不用猜的：只要不是同源就固定提供「在新分頁開啟」。
  const isExternal = (() => {
    try {
      return new URL(currentUrl).origin !== window.location.origin;
    } catch {
      return false;
    }
  })();

  const patchTab = (id, patch) =>
    setTabs((prev) => prev.map((tab) => (tab.id === id ? { ...tab, ...patch } : tab)));

  const navigate = (url) => {
    const nextHistory = [...activeTab.history.slice(0, activeTab.index + 1), url];
    patchTab(activeTab.id, { history: nextHistory, index: nextHistory.length - 1, input: url });
  };

  const go = (delta) => {
    const nextIndex = activeTab.index + delta;
    if (nextIndex < 0 || nextIndex >= activeTab.history.length) return;
    patchTab(activeTab.id, { index: nextIndex, input: activeTab.history[nextIndex] });
  };

  const submitUrl = (e) => {
    if (e.key !== "Enter") return;
    const url = resolveUrl(e.target.value);
    if (url) navigate(url);
  };

  const addTab = () => {
    const tab = createTab();
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(tab.id);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    const remaining = tabs.filter((tab) => tab.id !== id);
    if (remaining.length === 0) {
      const fresh = createTab();
      setTabs([fresh]);
      setActiveTabId(fresh.id);
      return;
    }
    setTabs(remaining);
    if (id === activeTab.id) setActiveTabId(remaining[remaining.length - 1].id);
  };

  const btn = {
    border: "1px solid #ccc",
    background: "#fff",
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    fontSize: 13,
    lineHeight: 1,
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* 分頁列 */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 2, background: "#dee1e6", padding: "4px 4px 0" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              maxWidth: 160,
              padding: "6px 8px",
              border: "none",
              borderRadius: "8px 8px 0 0",
              cursor: "pointer",
              fontSize: 11,
              background: tab.id === activeTab.id ? "#fff" : "#c9ccd1",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {hostOf(tab.history[tab.index])}
            </span>
            <span
              role="button"
              aria-label="關閉分頁"
              onClick={(e) => closeTab(tab.id, e)}
              style={{ padding: "0 3px", borderRadius: 3 }}
            >
              ✕
            </span>
          </button>
        ))}
        <button onClick={addTab} aria-label="新增分頁" style={{ ...btn, alignSelf: "center", marginLeft: 4 }}>＋</button>
      </div>

      {/* 網址列 */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: "#f9f9f9", borderBottom: "1px solid #eee" }}>
        <button onClick={() => go(-1)} disabled={activeTab.index === 0} aria-label="上一頁" style={btn}>←</button>
        <button onClick={() => go(1)} disabled={activeTab.index >= activeTab.history.length - 1} aria-label="下一頁" style={btn}>→</button>
        <button onClick={() => patchTab(activeTab.id, { reloadKey: activeTab.reloadKey + 1 })} aria-label="重新整理" style={btn}>⟳</button>
        <button onClick={() => navigate(HOME_URL)} aria-label="首頁" style={btn}>⌂</button>
        <input
          type="text"
          value={activeTab.input}
          onChange={(e) => patchTab(activeTab.id, { input: e.target.value })}
          onKeyDown={submitUrl}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "6px 12px",
            borderRadius: 14,
            border: "1px solid #bbb",
            fontSize: 12,
            outline: "none",
          }}
          placeholder="搜尋 Google 或輸入網址"
        />
      </div>

      {/* 跨站提示 */}
      {isExternal && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "5px 10px",
          background: "#fff8e1",
          borderBottom: "1px solid #f0e0b0",
          color: "#6b5b2a",
          fontSize: 11,
        }}>
          <span>🔒 {hostOf(currentUrl)} 是外部網站，可能拒絕被內嵌顯示。</span>
          <button
            onClick={() => window.open(currentUrl, "_blank", "noopener,noreferrer")}
            style={{ ...btn, width: "auto", height: 22, padding: "0 10px", fontSize: 11, whiteSpace: "nowrap" }}
          >
            在新分頁開啟
          </button>
        </div>
      )}

      {/* 內容 */}
      <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
        <iframe
          key={`${activeTab.id}-${activeTab.reloadKey}`}
          src={currentUrl}
          title="browser"
          style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
        />
      </div>
    </div>
  );
}

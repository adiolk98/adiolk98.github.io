import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CrtHeader from '../../components/CrtHeader';
import CrtNavigation from '../../components/CrtNavigation';
import './toolbox.css';

const tools = [
  { path: 'gifToZip', code: 'GIF', title: 'GIF TO ZIP', name: '動畫拆解', description: '把動畫的每一格留下來。將 GIF 拆成 PNG 圖片，再打包成 ZIP 一次下載。', category: 'media', kind: '影像', input: 'GIF', output: 'PNG / ZIP', hint: '逐格擷取 · 批次打包', detail: '適合取出動畫素材、檢查畫格，或把喜歡的瞬間另外保存。', icon: 'image' },
  { path: 'videoToGif', code: 'VID', title: 'VIDEO TO GIF', name: '影片轉動畫', description: '選取一小段影片，裁切畫面，做成剛剛好的 GIF。', category: 'media', kind: '影片', input: 'VIDEO', output: 'GIF', hint: '片段選取 · 畫面裁切', detail: '適合分享操作示範、製作短動畫，或留下影片裡的一個片刻。', icon: 'video' },
  { path: 'audioToMp3', code: 'MP3', title: 'AUDIO TO MP3', name: '音訊轉檔', description: '留下需要的聲音。將音訊或影片中的聲音，轉成方便播放的 MP3。', category: 'media', kind: '音訊', input: 'AUDIO / VIDEO', output: 'MP3', hint: '聲音擷取 · MP3 輸出', detail: '適合提取影片音軌，或把不同格式的聲音整理成同一種格式。', icon: 'audio' },
  { path: 'jsonFormatter', code: 'JSON', title: 'JSON FORMAT', name: 'JSON 格式整理', description: '讓資料變得好讀。排版、驗證與修復 JSON，也能壓縮及搜尋內容。', category: 'data', kind: '資料', input: 'JSON', output: 'JSON', hint: '排版驗證 · 壓縮搜尋', detail: '適合檢查 API 回傳資料，或整理難以閱讀的 JSON 內容。', icon: 'json' },
  { path: 'yamlFormatter', code: 'YAML', title: 'YAML FORMAT', name: 'YAML 格式整理', description: '整理縮排與格式，驗證 YAML，或轉成 JSON 繼續使用。', category: 'data', kind: '資料', input: 'YAML', output: 'YAML / JSON', hint: '格式驗證 · JSON 轉換', detail: '適合檢查設定檔，或在 YAML 與 JSON 之間整理資料。', icon: 'yaml' },
] as const;

type Tool = typeof tools[number];
const categories = [{ id: 'all', name: '全部工具', code: 'ALL' }, { id: 'media', name: '影音處理', code: 'MEDIA' }, { id: 'data', name: '資料整理', code: 'DATA' }] as const;
type Category = typeof categories[number]['id'];

function UtilityIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="utility-icon" shapeRendering="crispEdges">
    <path d="M4 2h20v4h4v24H4z" fill="var(--crt-cream)" />
    <path d="M4 2h20v4h4v24H4V2Zm20 0v8h4" stroke="currentColor" strokeWidth="2" />
    {kind === 'video' ? <><path d="M8 12h16v12H8z" fill="var(--crt-rose)" /><path d="m14 14 6 4-6 4z" fill="currentColor" /><path d="M8 12h3v3H8zm13 0h3v3h-3zM8 21h3v3H8zm13 0h3v3h-3z" fill="var(--crt-tan)" /></>
      : kind === 'audio' ? <><path d="M18 10h4v12h-4zm-6 3h8v3h-8zM9 16h4v10H9z" fill="var(--crt-rose-lo)" /><path d="M8 22h6v4H8zm9-3h6v5h-6z" fill="currentColor" /></>
      : kind === 'image' ? <><path d="M8 12h16v12H8z" fill="var(--crt-phos-1)" /><path d="m8 24 6-8 4 4 3-4 3 8z" fill="var(--crt-green)" /><path d="M19 14h3v3h-3z" fill="var(--crt-tan)" /></>
      : <><path d="M12 12H9v4H7v3h2v5h3m8-12h3v4h2v3h-2v5h-3" stroke={kind === 'json' ? 'var(--crt-rose-lo)' : 'var(--crt-green)'} strokeWidth="2" /><path d="M15 14h3v3h-3zm0 7h3v3h-3z" fill="currentColor" /></>}
  </svg>;
}

function DiskIcon() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" className="utility-disk" shapeRendering="crispEdges">
    <path d="M4 4h32l8 8v32H4z" fill="var(--crt-rose)" />
    <path d="M4 4h32l8 8v32H4V4Z" fill="none" stroke="var(--crt-line)" strokeWidth="3" />
    <path d="M12 4h22v15H12z" fill="var(--crt-cream)" /><path d="M25 7h5v9h-5z" fill="var(--crt-phos-2)" />
    <path d="M11 26h26v18H11z" fill="var(--crt-tan)" /><path d="M16 31h16v2H16zm0 5h12v2H16z" fill="var(--crt-ink)" />
  </svg>;
}

function FormatPreview({ tool }: { tool: Tool }) {
  return <div className={`utility-preview px utility-preview-${tool.icon}`} aria-hidden="true">
    <div className="utility-preview-grid" />
    {tool.icon === 'json' || tool.icon === 'yaml' ? <div className="utility-code-preview">
      <span>{tool.icon === 'json' ? '{' : 'document:'}</span>
      <span>  <i>name</i>{tool.icon === 'json' ? ': "adi",' : ': adi'}</span>
      <span>  <i>ready</i>: true</span>
      <span>{tool.icon === 'json' ? '}' : '  tools: 5'}</span>
    </div> : tool.icon === 'audio' ? <div className="utility-waveform">{[3, 6, 9, 5, 12, 16, 10, 6, 14, 18, 12, 7, 4, 10, 6, 3].map((height, i) => <span key={i} style={{ height: `${height * .17}em` }} />)}</div>
      : <div className="utility-filmstrip">{[0, 1, 2].map(i => <div className="utility-film-frame" key={i}><span className="utility-pixel-sun" /><span className="utility-pixel-hill" /></div>)}</div>}
    <span className="utility-preview-caption">{tool.title}</span>
  </div>;
}

export function ToolsIndex() {
  const [category, setCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<string>('videoToGif');
  const inspector = useRef<HTMLElement>(null);
  const filtered = useMemo(() => tools.filter(tool => (category === 'all' || tool.category === category) && `${tool.name} ${tool.title} ${tool.hint} ${tool.input} ${tool.output}`.toLowerCase().includes(query.trim().toLowerCase())), [category, query]);
  const selected = filtered.find(tool => tool.path === selectedPath) ?? filtered[0];
  const selectTool = (path: string) => {
    setSelectedPath(path);
    if (window.matchMedia('(max-width:640px), (orientation:portrait)').matches) {
      inspector.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  };

  return <main className="screen-page toolbox-screen">
    <Helmet>
      <title>adi | 工具箱</title>
      <meta name="description" content="免費瀏覽器工具箱：GIF 拆圖、影片轉 GIF、音訊轉 MP3，以及 JSON、YAML 格式整理。檔案在本機處理。" />
    </Helmet>
    <CrtHeader section="UTILITY DISK" />
    <div className="screen-board utility-board">
      <header className="utility-heading">
        <div className="utility-heading-main"><DiskIcon /><div><span className="utility-eyebrow">ADI SOFTWARE / VOL. 01</span><h1>工具管理員</h1><p>把轉檔與資料整理，放進同一張磁片。</p></div></div>
        <div className="utility-local px"><span className="screen-dot" aria-hidden="true" /><div>檔案留在你的裝置<span>瀏覽器內處理 · 無須安裝</span></div></div>
      </header>
      <div className="utility-workbench">
        <aside className="utility-sidebar crt-panel px" aria-label="工具分類">
          <div className="utility-pane-heading">磁片目錄</div>
          <div className="utility-volume"><span className="utility-eyebrow">DRIVE A:</span><strong>日常工具集</strong><span>5 個程式</span></div>
          <div className="utility-categories">{categories.map(item => <button type="button" key={item.id} className={`px ${category === item.id ? 'is-selected' : ''}`} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}><span aria-hidden="true" className="utility-folder" /><span>{item.name}</span><small>{item.id === 'all' ? tools.length : tools.filter(tool => tool.category === item.id).length}</small></button>)}</div>
          <div className="utility-sidebar-note"><span className="utility-eyebrow">HOW TO USE</span><p>選擇工具<br />放入檔案或文字<br />儲存處理結果</p><span className="utility-directory">{'A:\\UTILITIES\\'}</span></div>
        </aside>
        <section className="utility-directory-pane crt-panel px" aria-labelledby="utility-directory-title">
          <div className="utility-pane-heading"><h2 id="utility-directory-title">{categories.find(item => item.id === category)?.name}</h2><span>{String(filtered.length).padStart(2, '0')} FILES</span></div>
          <div className="utility-searchbar"><label htmlFor="utility-search">搜尋工具</label><div className="utility-search-field px"><input id="utility-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="名稱、格式或用途…" autoComplete="off" />{query && <button type="button" aria-label="清除搜尋" onClick={() => setQuery('')}>×</button>}</div></div>
          <div className="utility-list-heading"><span>程式名稱</span><span>格式 / 用途</span></div>
          <div className="utility-file-list" aria-label="可用工具">{filtered.map(tool => <div className={`utility-file-row ${selected?.path === tool.path ? 'is-selected' : ''}`} key={tool.path}>
            <button type="button" className="utility-file-select" aria-pressed={selected?.path === tool.path} aria-label={`查看${tool.name}`} aria-controls="utility-inspector" onClick={() => selectTool(tool.path)}><UtilityIcon kind={tool.icon} /><span className="utility-file-name"><strong>{tool.name}</strong><span>{tool.title}</span></span><span className="utility-file-meta"><span>{tool.input} → {tool.output}</span><small>{tool.hint}</small></span></button>
            <Link to={`/tools/${tool.path}`} className="utility-file-open px" aria-label={`開啟${tool.name}`}><span aria-hidden="true">↗</span></Link>
          </div>)}</div>
          {!filtered.length && <div className="utility-empty"><UtilityIcon kind="json" /><h2>沒有找到工具</h2><p>試試 GIF、MP3、JSON，或切換分類。</p><button type="button" className="crt-btn tan px" onClick={() => { setQuery(''); setCategory('all'); }}>顯示全部工具</button></div>}
          <div className="utility-list-footer"><span>{query ? `搜尋「${query}」` : '選擇程式，查看右側說明。'}</span><span>5 個工具，隨時可用</span></div>
        </section>
        <aside ref={inspector} id="utility-inspector" className="utility-inspector crt-panel px" aria-label="工具說明">
          <div className="utility-pane-heading">程式預覽<span>INFO</span></div>
          {selected ? <><FormatPreview tool={selected} /><div className="utility-inspector-content"><div className="utility-inspector-label"><span className="utility-eyebrow">{selected.kind} / {selected.code}</span><span className="utility-ready">可使用</span></div><h2>{selected.name}</h2><p>{selected.description}</p><div className="utility-format-flow"><div><span>輸入</span><strong>{selected.input}</strong></div><span aria-hidden="true">→</span><div><span>輸出</span><strong>{selected.output}</strong></div></div><p className="utility-use-case">{selected.detail}</p><Link className="crt-btn red px utility-run" to={`/tools/${selected.path}`}>開啟工具 <span aria-hidden="true">↗</span></Link><span className="utility-run-note">開啟後再選擇檔案或貼上文字</span></div></> : <div className="utility-inspector-empty"><DiskIcon /><p>選一個工具，<br />查看它能幫上什麼忙。</p></div>}
        </aside>
      </div>
    </div>
    <div className="screen-status" role="status" aria-live="polite"><span>A:\UTILITIES\{selected?.code ?? 'SEARCH'}</span><span>{filtered.length} 個工具{selected ? ` · ${selected.name}` : ' · 無符合結果'}</span></div>
    <CrtNavigation />
  </main>;
}

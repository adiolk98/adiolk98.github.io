import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CrtHeader from '../../components/CrtHeader';
import CrtNavigation from '../../components/CrtNavigation';

const tools = [
  { path: 'gifToZip', code: 'GIF', title: 'GIF TO ZIP', name: '動畫拆解', description: '將 GIF 拆成 PNG 圖片，打包成 ZIP 一次下載。', category: 'IMAGE' },
  { path: 'videoToGif', code: 'VID', title: 'VIDEO TO GIF', name: '影片轉動畫', description: '選取影片片段與裁切範圍，製作自己的 GIF。', category: 'VIDEO' },
  { path: 'audioToMp3', code: 'MP3', title: 'AUDIO TO MP3', name: '音訊轉檔', description: '將音訊或影片中的聲音，轉成 MP3 檔案。', category: 'AUDIO' },
  { path: 'jsonFormatter', code: '{ }', title: 'JSON FORMAT', name: 'JSON 格式整理', description: '排版、驗證與修復 JSON，也能壓縮及搜尋內容。', category: 'CODE' },
  { path: 'yamlFormatter', code: 'YML', title: 'YAML FORMAT', name: 'YAML 格式整理', description: '整理與驗證 YAML，或轉成 JSON 繼續使用。', category: 'CODE' },
];

export function ToolsIndex() {
  return <main className="screen-page toolbox-screen">
    <Helmet>
      <title>adi | 工具箱</title>
      <meta name="description" content="免費瀏覽器工具箱：GIF 拆圖、影片轉 GIF、音訊轉 MP3，以及 JSON、YAML 格式整理。檔案在本機處理。" />
    </Helmet>
    <CrtHeader section="TOOL BOX" />
    <div className="screen-board toolbox-board">
      <section className="crt-panel px toolbox-intro">
        <div className="screen-eyebrow">UTILITY DISK / 05 PROGRAMS</div>
        <h1>日常工具箱</h1>
        <p>小工具，解決手邊的小事。</p>
        <div className="toolbox-note"><span className="screen-dot" aria-hidden="true" />檔案在瀏覽器內處理，無須上傳。</div>
      </section>
      <div className="toolbox-grid">
        {tools.map((tool, index) => <Link className="crt-panel px tool-card" key={tool.path} to={`/tools/${tool.path}`}>
          <div className="tool-card-top"><span className="tool-code px">{tool.code}</span><span className="screen-eyebrow">0{index + 1} / {tool.category}</span></div>
          <div><h2>{tool.name}</h2><span className="tool-latin">{tool.title}</span></div>
          <p>{tool.description}</p>
          <span className="tool-launch">開啟工具 <span aria-hidden="true">→</span></span>
        </Link>)}
        <aside className="crt-panel pink px toolbox-tip"><div className="screen-eyebrow">QUICK GUIDE</div><h2>選擇、處理、下載。</h2><p>選一個工具開始。轉檔完成後，直接儲存到自己的裝置。</p><span className="tool-latin">NO INSTALL REQUIRED</span></aside>
      </div>
    </div>
    <div className="screen-status"><span>LOCAL PROCESSING</span><span>工具已就緒</span></div>
    <CrtNavigation />
  </main>;
}

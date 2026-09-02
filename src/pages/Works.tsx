import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

type Project = {
  slug: string;
  name: string;
  date: string;        // YYYY.MM — sort key + rail badge
  dateLabel: string;   // human label
  url: string;
  repo: string;
  summary: string;
  description: string;
  tags: string[];
  role: string;
};

// newest first
const PROJECTS: Project[] = [
  {
    slug: 'co2table',
    name: 'CO₂ Table',
    date: '2026.09',
    dateLabel: '2026 年 9 月',
    url: 'https://co2table.com',
    repo: '~/myrepo/co2table',
    summary: '自由潛水 CO₂ 耐受表的乾式訓練工具。',
    description:
      '設定訓練表、跑計時器、記錄每次成績。無框架前端搭配 Cloudflare Workers API，網頁與 LINE Bot 共用同一份訓練演算法；LINE 版用 LIFF 內嵌計時器，結果寫回 Google Sheet。支援 PWA，可加到主畫面並離線使用。',
    tags: ['Vanilla JS', 'Cloudflare Workers', 'PWA', 'LINE LIFF', 'Google Apps Script'],
    role: '設計與開發',
  },
  {
    slug: 'truve',
    name: 'Truve',
    date: '2026.08',
    dateLabel: '2026 年 8 月',
    url: 'https://truve-news.vercel.app/',
    repo: '~/myrepo/truve',
    summary: '社群驅動的事實查核與新聞聲譽平台。',
    description:
      '去中心化的事實查核平台：使用者提出查核、社群投票、篩選佐證證據、處理申訴，全程以 app 內鈴鐺通知。Next.js 前端部署於 Vercel，Go 後端跑在 Google Cloud Run，帳號與資料庫走 Supabase，資料存取層用 sqlc 生成。',
    tags: ['Next.js', 'Go', 'Supabase', 'Cloud Run', 'sqlc'],
    role: '設計與開發',
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

// group consecutive entries by year, keeping input order (already newest-first)
function byYear(list: Project[]): { year: string; items: Project[] }[] {
  const out: { year: string; items: Project[] }[] = [];
  for (const p of list) {
    const year = p.date.slice(0, 4);
    const last = out[out.length - 1];
    if (last && last.year === year) last.items.push(p);
    else out.push({ year, items: [p] });
  }
  return out;
}

export const Works: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = rootRef.current?.querySelectorAll('.w-entry');
    if (!nodes) return;
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  const groups = byYear(PROJECTS);

  return (
    <div className="w-root" ref={rootRef}>
      <Helmet>
        <title>adi | 作品集</title>
        <meta name="description" content="adi 的作品時間軸 — 依開發年月排列的個人專案。" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="w-wrap">
        <a href="#/" className="w-back">&larr; 回桌面</a>

        <header className="w-hero">
          <p className="w-kicker">SELECTED WORK &middot; 作品集</p>
          <h1 className="w-title">一條按<span>年月</span>排列<br />的建造時間軸。</h1>
          <p className="w-lede">
            每一個專案都標上開發的年份與月份，依時間從新到舊排下來。
          </p>
        </header>

        <div className="w-timeline">
          {groups.map(g => (
            <section key={g.year} className="w-yeargroup">
              <div className="w-year" aria-hidden="true">{g.year}</div>
              <ol className="w-list">
                {g.items.map(p => (
                  <li key={p.slug} className="w-entry">
                    <div className="w-when">
                      <span className="w-dot" aria-hidden="true" />
                      <time dateTime={p.date.replace('.', '-')}>{p.dateLabel}</time>
                    </div>

                    <a className="w-card" href={p.url} target="_blank" rel="noreferrer">
                      <div className="w-card-head">
                        <h2 className="w-name">{p.name}</h2>
                        <span className="w-ext"><ArrowIcon /></span>
                      </div>
                      <p className="w-summary">{p.summary}</p>
                      <p className="w-desc">{p.description}</p>
                      <ul className="w-tags">
                        {p.tags.map(t => <li key={t}>{t}</li>)}
                      </ul>
                      <div className="w-meta">
                        <span>{p.role}</span>
                        <span className="w-sep" aria-hidden="true">/</span>
                        <span className="w-repo">{p.repo}</span>
                        <span className="w-visit">查看網站 <ArrowIcon /></span>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <div className="w-end" aria-hidden="true">
            <span className="w-dot" />
            <span>持續更新中</span>
          </div>
        </div>
      </div>

      <style>{`
        .w-root{
          --bg:#faf9f7; --ink:#111112; --ink-2:#6b6b70; --line:#e3e1dc;
          --card:#ffffff; --accent:#2563eb; --accent-soft:#eef2ff;
          min-height:100%; width:100%; box-sizing:border-box;
          background:var(--bg); color:var(--ink); flex:1;
          font-family:'Archivo','Helvetica Neue',system-ui,-apple-system,'PingFang TC','Noto Sans TC',sans-serif;
          font-size:16px; line-height:1.6;
          -webkit-font-smoothing:antialiased;
        }
        @media (prefers-color-scheme:dark){
          .w-root{
            --bg:#0e0e10; --ink:#f3f2ef; --ink-2:#9a9aa2; --line:#2a2a2e;
            --card:#161618; --accent:#6ea8fe; --accent-soft:#1b2440;
          }
        }
        .w-wrap{ max-width:760px; margin:0 auto; padding:clamp(20px,5vw,64px) clamp(18px,5vw,32px) 96px; }

        .w-back{
          display:inline-block; font-size:.85rem; color:var(--ink-2);
          text-decoration:none; letter-spacing:.02em; padding:4px 0; margin-bottom:clamp(32px,7vw,64px);
          transition:color .2s ease;
        }
        .w-back:hover{ color:var(--accent); }

        .w-hero{ margin-bottom:clamp(44px,9vw,88px); }
        .w-kicker{
          font-family:'Space Grotesk',sans-serif; font-size:.72rem; font-weight:600;
          letter-spacing:.22em; color:var(--ink-2); margin:0 0 20px;
        }
        .w-title{
          font-family:'Space Grotesk',sans-serif; font-weight:700;
          font-size:clamp(2rem,7vw,3.4rem); line-height:1.08; letter-spacing:-.03em;
          margin:0 0 20px;
        }
        .w-title span{ color:var(--accent); }
        .w-lede{ font-size:1.02rem; color:var(--ink-2); max-width:46ch; margin:0; }

        .w-year{
          font-family:'Space Grotesk',sans-serif; font-weight:700;
          font-size:clamp(3rem,14vw,6rem); line-height:1; letter-spacing:-.04em;
          color:transparent; -webkit-text-stroke:1.5px var(--line);
          margin:0 0 8px -2px; user-select:none;
        }
        .w-list{ list-style:none; margin:0; padding:0; }

        .w-entry{
          position:relative; padding:0 0 clamp(40px,8vw,72px) clamp(28px,7vw,56px);
          border-left:2px solid var(--line);
          opacity:0; transform:translateY(18px);
          transition:opacity .5s ease, transform .5s ease;
        }
        .w-entry.is-in{ opacity:1; transform:none; }
        .w-entry:last-child{ border-left-color:transparent; }

        .w-when{
          display:flex; align-items:center; gap:10px;
          font-family:'Space Grotesk',sans-serif; font-size:.82rem; font-weight:600;
          letter-spacing:.04em; color:var(--ink-2); margin-bottom:14px;
        }
        .w-dot{
          position:absolute; left:-7px; width:12px; height:12px; border-radius:50%;
          background:var(--accent); box-shadow:0 0 0 4px var(--bg);
        }

        .w-card{
          display:block; text-decoration:none; color:inherit;
          background:var(--card); border:1px solid var(--line); border-radius:14px;
          padding:clamp(20px,4vw,30px);
          transition:border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .w-card:hover{
          border-color:var(--accent); transform:translateY(-3px);
          box-shadow:0 14px 40px -18px rgba(37,99,235,.4);
        }
        .w-card:focus-visible{ outline:2px solid var(--accent); outline-offset:3px; }

        .w-card-head{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
        .w-name{
          font-family:'Space Grotesk',sans-serif; font-weight:700;
          font-size:clamp(1.35rem,4vw,1.8rem); letter-spacing:-.02em; margin:0;
        }
        .w-ext{ color:var(--ink-2); flex:none; transition:color .2s ease, transform .2s ease; }
        .w-card:hover .w-ext{ color:var(--accent); transform:translate(2px,-2px); }

        .w-summary{ font-size:1rem; font-weight:500; margin:10px 0 0; }
        .w-desc{ font-size:.92rem; color:var(--ink-2); margin:10px 0 0; }

        .w-tags{
          list-style:none; display:flex; flex-wrap:wrap; gap:8px;
          margin:18px 0 0; padding:0;
        }
        .w-tags li{
          font-family:'Space Grotesk',sans-serif; font-size:.72rem; font-weight:500;
          letter-spacing:.02em; color:var(--ink-2);
          border:1px solid var(--line); border-radius:999px; padding:4px 10px;
        }

        .w-meta{
          display:flex; align-items:center; flex-wrap:wrap; gap:8px;
          margin-top:18px; padding-top:16px; border-top:1px solid var(--line);
          font-family:'Space Grotesk',sans-serif; font-size:.76rem; color:var(--ink-2);
        }
        .w-sep{ opacity:.5; }
        .w-repo{ font-variant-ligatures:none; }
        .w-visit{
          margin-left:auto; display:inline-flex; align-items:center; gap:5px;
          color:var(--accent); font-weight:600;
        }

        .w-end{
          position:relative; padding-left:clamp(28px,7vw,56px);
          display:flex; align-items:center; gap:10px;
          font-family:'Space Grotesk',sans-serif; font-size:.8rem; color:var(--ink-2);
        }
        .w-end .w-dot{ position:relative; left:auto; background:var(--ink-2); box-shadow:none; }

        @media (prefers-reduced-motion:reduce){
          .w-entry{ opacity:1; transform:none; transition:none; }
          .w-card:hover{ transform:none; }
        }
      `}</style>
    </div>
  );
};

export default Works;

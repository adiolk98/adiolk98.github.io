import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type Project = {
  slug: string;
  name: string;
  date: string;        // YYYY.MM — sort key + rail badge
  dateLabel: string;   // human label
  url: string;
  images: string[];    // first is the cover; extras become a carousel
  summary: string;
  description: string;
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
    images: [
      '/assets/works/co2table-setup.jpg',
      '/assets/works/co2table-prep.jpg',
      '/assets/works/co2table-hold.jpg',
      '/assets/works/co2table-hold2.jpg',
      '/assets/works/co2table-about.jpg',
    ],
    summary: '自由潛水乾式訓練計時器。',
    description: '設定 CO₂ / O₂ 耐受表，跑計時、記錄成績。',
    role: '設計與開發',
  },
  {
    slug: 'truve',
    name: 'Truve',
    date: '2026.08',
    dateLabel: '2026 年 8 月',
    url: 'https://truve-news.vercel.app/',
    images: ['/assets/works/truve.jpg'],
    summary: 'Community-driven fact-checking and news reputation platform.',
    description:
      'Anyone can open a fact-check, attach evidence with a source URL, and vote. Each contributor carries a reputation score that weights their input.',
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

const Carousel: React.FC<{ images: string[]; name: string }> = ({ images, name }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  if (images.length < 2) {
    return (
      <div className="w-shots">
        <div className="w-slide" style={{ '--slide-img': `url("${images[0]}")` } as React.CSSProperties}>
          <img src={images[0]} alt={`${name} 截圖`} loading="lazy" />
        </div>
      </div>
    );
  }

  const go = (i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    t.scrollTo({ left: clamped * t.clientWidth, behavior: 'smooth' });
  };

  // read the live scroll position rather than stale `idx` so rapid clicks step one at a time
  const step = (dir: number) => {
    const t = trackRef.current;
    if (t) go(Math.round(t.scrollLeft / t.clientWidth) + dir);
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (t) setIdx(Math.round(t.scrollLeft / t.clientWidth));
  };

  return (
    <div className="w-shots is-carousel">
      <div className="w-track" ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <div key={src} className="w-slide" style={{ '--slide-img': `url("${src}")` } as React.CSSProperties}>
            <img src={src} alt={`${name} 截圖 ${i + 1}`} loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
      <button className="w-nav w-prev" aria-label="上一張" onClick={() => step(-1)} disabled={idx === 0}>‹</button>
      <button className="w-nav w-next" aria-label="下一張" onClick={() => step(1)} disabled={idx === images.length - 1}>›</button>
      <div className="w-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={i === idx ? 'on' : ''}
            aria-label={`第 ${i + 1} 張，共 ${images.length} 張`}
            aria-current={i === idx}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
};

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
        <meta name="description" content="adi 的作品 — 每個月開發一個 app。" />
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
          <p className="w-kicker">作品集 &middot; WORKS</p>
          <h1 className="w-title">每個月，<br />開發<span>一個 app</span>。</h1>
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

                    <article className="w-card">
                      <Carousel images={p.images} name={p.name} />
                      <div className="w-card-body">
                        <h2 className="w-name">
                          <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
                        </h2>
                        <p className="w-summary">{p.summary}</p>
                        <p className="w-desc">{p.description}</p>
                        <div className="w-meta">
                          <span>{p.role}</span>
                          <a className="w-visit" href={p.url} target="_blank" rel="noreferrer">
                            查看網站 <ArrowIcon />
                          </a>
                        </div>
                      </div>
                    </article>
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
          /* .stage (CrtTube) is a scrolling flex column; flex:1 there sized this box
             to one viewport, so its background stopped mid-scroll. Own the height. */
          min-height:100vh; width:100%; box-sizing:border-box; flex:0 0 auto;
          background:var(--bg); color:var(--ink);
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

        .w-year{
          font-family:'Space Grotesk',sans-serif; font-weight:700;
          font-size:clamp(3rem,14vw,6rem); line-height:1; letter-spacing:-.04em;
          font-variant-numeric:tabular-nums;
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
          font-variant-numeric:tabular-nums;
        }
        .w-dot{
          position:absolute; left:-7px; width:12px; height:12px; border-radius:50%;
          background:var(--accent); box-shadow:0 0 0 4px var(--bg);
        }

        .w-card{
          display:block; overflow:hidden;
          background:var(--card); border:1px solid var(--line); border-radius:14px;
          transition:border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .w-card:hover{
          border-color:var(--accent); transform:translateY(-3px);
          box-shadow:0 14px 40px -18px rgba(37,99,235,.4);
        }

        /* screenshot area / carousel */
        .w-shots{
          position:relative; overflow:hidden;
          height:clamp(300px, 52vh, 460px);
          background:var(--accent-soft); border-bottom:1px solid var(--line);
        }
        .w-track{
          display:flex; height:100%;
          overflow-x:auto; scroll-snap-type:x mandatory;
          scrollbar-width:none; -webkit-overflow-scrolling:touch;
        }
        .w-track::-webkit-scrollbar{ display:none; }
        .w-slide{
          position:relative; flex:0 0 100%; height:100%;
          scroll-snap-align:center;
          display:flex; align-items:center; justify-content:center;
          padding:16px; box-sizing:border-box; overflow:hidden;
        }
        .w-slide::before{
          content:''; position:absolute; inset:0;
          background:var(--slide-img) center/cover no-repeat;
          filter:blur(26px) saturate(1.15); transform:scale(1.25); opacity:.5;
        }
        .w-slide img{
          position:relative; max-width:min(88%, 640px); max-height:100%;
          width:auto; height:auto;
          border-radius:6px;
          box-shadow:0 10px 34px -12px rgba(0,0,0,.55);
        }

        .w-nav{
          position:absolute; top:50%; transform:translateY(-50%);
          width:34px; height:34px; border-radius:999px;
          border:1px solid var(--line); background:var(--card); color:var(--ink);
          font-size:1.15rem; line-height:1; cursor:pointer;
          display:grid; place-items:center;
          opacity:0; transition:opacity .2s ease;
        }
        .w-shots:hover .w-nav{ opacity:.92; }
        .w-nav:focus-visible{ opacity:1; outline:2px solid var(--accent); outline-offset:2px; }
        .w-nav:disabled{ opacity:0 !important; pointer-events:none; }
        .w-prev{ left:12px; } .w-next{ right:12px; }

        .w-dots{
          position:absolute; left:0; right:0; bottom:12px;
          display:flex; justify-content:center; gap:6px; padding:6px;
        }
        .w-dots button{
          width:6px; height:6px; padding:0; border:0; border-radius:999px; cursor:pointer;
          background:rgba(255,255,255,.55); box-shadow:0 0 0 1px rgba(0,0,0,.15);
          transition:width .2s ease, background .2s ease;
        }
        .w-dots button.on{ width:18px; background:#fff; }
        .w-dots button:focus-visible{ outline:2px solid var(--accent); outline-offset:2px; }

        .w-card-body{ padding:clamp(20px,4vw,30px); }
        .w-name{
          font-family:'Space Grotesk',sans-serif; font-weight:700;
          font-size:clamp(1.35rem,4vw,1.8rem); letter-spacing:-.02em; margin:0;
        }
        .w-name a{ color:inherit; text-decoration:none; }
        .w-name a:hover{ color:var(--accent); }
        .w-name a:focus-visible{ outline:2px solid var(--accent); outline-offset:3px; border-radius:2px; }

        .w-summary{ font-size:1rem; font-weight:500; margin:10px 0 0; }
        .w-desc{ font-size:.92rem; color:var(--ink-2); margin:10px 0 0; }

        .w-meta{
          display:flex; align-items:center; flex-wrap:wrap; gap:8px;
          margin-top:18px; padding-top:16px; border-top:1px solid var(--line);
          font-family:'Space Grotesk',sans-serif; font-size:.76rem; color:var(--ink-2);
        }
        .w-visit{
          margin-left:auto; display:inline-flex; align-items:center; gap:5px;
          color:var(--accent); font-weight:600; text-decoration:none;
        }
        .w-visit:hover{ text-decoration:underline; }

        .w-end{
          position:relative; padding-left:clamp(28px,7vw,56px);
          display:flex; align-items:center; gap:10px;
          font-family:'Space Grotesk',sans-serif; font-size:.8rem; color:var(--ink-2);
        }
        .w-end .w-dot{ position:relative; left:auto; background:var(--ink-2); box-shadow:none; }

        @media (prefers-reduced-motion:reduce){
          .w-entry{ opacity:1; transform:none; transition:none; }
          .w-card:hover{ transform:none; }
          .w-track{ scroll-behavior:auto; }
        }
      `}</style>
    </div>
  );
};

export default Works;

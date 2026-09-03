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
  splash?: boolean;    // 開場動畫預覽當作第一張
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
    splash: true,
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

// ── CO₂ Table 開場動畫（四支提案，各約 1.8s，每 4.2s 自動重播一輪） ──
const d = (v: string) => ({ '--d': v } as React.CSSProperties);

const AppMock = (
  <div className="wsp-app">
    <div className="wsp-t">CO2 Table</div>
    <div className="wsp-s">8 輪 · 閉氣 1:00 · 休息遞減</div>
    <div className="wsp-r"><span>1</span><i className="wsp-b h" /><span>1:00</span></div>
    <div className="wsp-r"><span>2</span><i className="wsp-b r" style={{ maxWidth: '74%' }} /><span>1:45</span></div>
    <div className="wsp-r"><span>3</span><i className="wsp-b h" /><span>1:00</span></div>
    <div className="wsp-r"><span>4</span><i className="wsp-b r" style={{ maxWidth: '60%' }} /><span>1:30</span></div>
  </div>
);

const SPLASHES: { key: string; label: string; art: React.ReactNode; mark: React.ReactNode }[] = [
  {
    key: 'diver',
    label: '蹼泳者',
    mark: <><b>CO2</b> Table</>,
    art: (
      <svg viewBox="0 0 260 140" width="86%" aria-label="蹼泳者線稿">
        <g className="wsp-diver">
          <path className="wsp-draw" style={d('0s')} pathLength={1} d="M238 61 C 214 59, 192 62, 170 67" />
          <circle className="wsp-draw" style={d('.18s')} cx="161" cy="72" r="10" pathLength={1} />
          <path className="wsp-draw" style={d('.3s')} pathLength={1} d="M153 66 C 134 68, 116 73, 98 79" />
          <path className="wsp-draw" style={d('.36s')} pathLength={1} d="M155 80 C 138 83, 120 85, 101 87" />
          <path className="wsp-draw" style={d('.46s')} pathLength={1} d="M150 79 C 141 86, 133 90, 124 92" />
          <path className="wsp-draw" style={d('.56s')} pathLength={1} d="M99 82 C 83 84, 67 88, 53 93" />
          <path className="wsp-draw" style={d('.6s')} pathLength={1} d="M100 87 C 85 91, 69 96, 55 101" />
          <g className="wsp-fin1">
            <path className="wsp-draw" style={d('.72s')} pathLength={1} d="M53 89 C 38 86, 22 80, 8 74 L 5 83 C 20 88, 37 94, 53 96 Z" />
          </g>
          <g className="wsp-fin2">
            <path className="wsp-draw" style={d('.8s')} pathLength={1} d="M55 98 C 40 100, 24 106, 10 112 L 14 120 C 27 114, 41 108, 56 105 Z" />
          </g>
        </g>
        <circle className="wsp-bubble" style={d('1.05s')} cx="150" cy="58" r="3" />
        <circle className="wsp-bubble" style={d('1.2s')} cx="140" cy="62" r="2" />
        <circle className="wsp-bubble" style={d('1.35s')} cx="146" cy="55" r="2.4" />
      </svg>
    ),
  },
  {
    key: 'ring',
    label: '呼吸環',
    mark: '閉氣訓練',
    art: (
      <svg viewBox="0 0 120 120" width="55%" aria-label="呼吸環">
        <circle className="wsp-ring" cx="60" cy="60" r="44" fill="none" stroke="#334155" strokeWidth="5" />
        <path className="wsp-arc" pathLength={1} d="M60 16 A 44 44 0 1 1 59.9 16" />
        <text className="wsp-ringtext" x="60" y="60" textAnchor="middle" dominantBaseline="central"
          fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="30" letterSpacing="3" fill="#F1F5F9">CO2</text>
      </svg>
    ),
  },
  {
    key: 'rope',
    label: '下潛繩',
    mark: <><b>CO2</b> Table</>,
    art: (
      <svg viewBox="0 0 120 150" width="60%" aria-label="下潛繩">
        <path className="wsp-draw wsp-rope" style={d('0s')} pathLength={1} d="M60 14 L 60 128" strokeWidth="2" />
        <line className="wsp-rung" style={d('.35s')} x1="52" y1="44" x2="68" y2="44" />
        <text className="wsp-depth" style={d('.35s')} x="76" y="47">10 M</text>
        <line className="wsp-rung" style={d('.6s')} x1="52" y1="76" x2="68" y2="76" />
        <text className="wsp-depth" style={d('.6s')} x="76" y="79">20 M</text>
        <line className="wsp-rung" style={d('.85s')} x1="52" y1="108" x2="68" y2="108" />
        <text className="wsp-depth" style={d('.85s')} x="76" y="111">30 M</text>
        <g className="wsp-pod"><circle cx="60" cy="20" r="7" fill="#DC2626" /></g>
      </svg>
    ),
  },
  {
    key: 'bars',
    label: '表格長條',
    mark: <><b>CO2</b> Table</>,
    art: (
      <svg viewBox="0 0 120 120" width="72%" aria-label="表格長條">
        <rect className="wsp-tbar" style={d('0s')} x="8" y="10" width="104" height="9" rx="3" fill="#DC2626" />
        <rect className="wsp-tbar" style={d('.12s')} x="8" y="26" width="88" height="9" rx="3" fill="#059669" />
        <rect className="wsp-tbar" style={d('.24s')} x="8" y="42" width="104" height="9" rx="3" fill="#DC2626" />
        <rect className="wsp-tbar" style={d('.36s')} x="8" y="58" width="72" height="9" rx="3" fill="#059669" />
        <rect className="wsp-tbar" style={d('.48s')} x="8" y="74" width="104" height="9" rx="3" fill="#DC2626" />
        <rect className="wsp-tbar" style={d('.6s')} x="8" y="90" width="56" height="9" rx="3" fill="#059669" />
        <rect className="wsp-tbar" style={d('.72s')} x="8" y="106" width="104" height="9" rx="3" fill="#DC2626" />
      </svg>
    ),
  },
];

// 重播 = 拔掉 class 再貼回去，強制動畫從頭跑
const replay = (el: HTMLElement) => {
  el.classList.remove('play');
  void el.offsetWidth;
  el.classList.add('play');
};

const SplashReel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const all = () => ref.current?.querySelectorAll<HTMLElement>('.wsp-phone').forEach(replay);
    all();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(all, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="wsp-reel" ref={ref}>
      {SPLASHES.map(s => (
        <div
          key={s.key}
          className="wsp-phone"
          tabIndex={0}
          role="button"
          aria-label={`重播開場動畫：${s.label}`}
          onClick={e => replay(e.currentTarget)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); replay(e.currentTarget); }
          }}
        >
          {AppMock}
          <div className="wsp-splash">
            {s.art}
            <div className="wsp-mark">{s.mark}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Carousel: React.FC<{ images: string[]; name: string; lead?: React.ReactNode }> = ({ images, name, lead }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const slides = [
    ...(lead ? [<div key="lead" className="w-slide is-lead">{lead}</div>] : []),
    ...images.map((src, i) => (
      <div key={src} className="w-slide" style={{ '--slide-img': `url("${src}")` } as React.CSSProperties}>
        <img src={src} alt={`${name} 截圖 ${i + 1}`} loading="lazy" draggable={false} />
      </div>
    )),
  ];

  if (slides.length < 2) return <div className="w-shots">{slides}</div>;

  const go = (i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
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
      <div className="w-track" ref={trackRef} onScroll={onScroll}>{slides}</div>
      <button className="w-nav w-prev" aria-label="上一張" onClick={() => step(-1)} disabled={idx === 0}>‹</button>
      <button className="w-nav w-next" aria-label="下一張" onClick={() => step(1)} disabled={idx === slides.length - 1}>›</button>
      <div className="w-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === idx ? 'on' : ''}
            aria-label={`第 ${i + 1} 張，共 ${slides.length} 張`}
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
                      <Carousel images={p.images} name={p.name} lead={p.splash ? <SplashReel /> : undefined} />
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

        /* ---- CO₂ Table 開場動畫預覽（第一張投影片） ---- */
        .w-slide.is-lead{ padding:12px; }
        .w-slide.is-lead::before{ display:none; }
        .wsp-reel{
          position:relative; z-index:1;
          display:flex; gap:8px; width:100%; height:100%;
          align-items:center; justify-content:center;
        }
        .wsp-phone{
          position:relative; flex:1 1 0; min-width:0;
          aspect-ratio:9/17; max-height:100%;
          container-type:inline-size;
          border-radius:14px; border:1px solid rgba(255,255,255,.09);
          background:#0F172A; color:#F1F5F9;
          overflow:hidden; cursor:pointer;
          box-shadow:0 12px 30px -18px #000;
        }
        .wsp-phone:focus-visible{ outline:2px solid #DC2626; outline-offset:2px; }

        .wsp-app{
          position:absolute; inset:0; opacity:0;
          padding:14cqw 7cqw 7cqw; display:flex; flex-direction:column; gap:3cqw;
          font-family:'Space Grotesk',sans-serif;
        }
        .wsp-t{ font-weight:700; font-size:11cqw; letter-spacing:.02em; line-height:1.1; }
        .wsp-s{ font-size:5.2cqw; color:#94A3B8; line-height:1.3; margin-bottom:2cqw; }
        .wsp-r{
          display:flex; align-items:center; gap:3cqw;
          font-size:5cqw; color:#94A3B8; font-variant-numeric:tabular-nums;
        }
        .wsp-b{ height:4cqw; border-radius:2px; flex:1; }
        .wsp-b.h{ background:#DC2626; }
        .wsp-b.r{ background:#059669; }

        .wsp-splash{
          position:absolute; inset:0; z-index:2; background:#0F172A;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7cqw;
        }
        .wsp-mark{
          font-family:'Space Grotesk',sans-serif; font-weight:700;
          font-size:8cqw; letter-spacing:.12em; text-transform:uppercase; opacity:0;
        }
        .wsp-mark b{ color:#DC2626; font-weight:700; }

        @keyframes wsp-draw{ from{ stroke-dashoffset:1; } to{ stroke-dashoffset:0; } }
        @keyframes wsp-fadeup{ from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:none; } }
        @keyframes wsp-exit{ to{ opacity:0; transform:scale(1.06); } }
        @keyframes wsp-enter{ from{ opacity:0; transform:scale(.98); } to{ opacity:1; transform:none; } }
        .wsp-phone.play .wsp-splash{ animation:wsp-exit .45s ease 1.75s forwards; }
        .wsp-phone.play .wsp-app{ animation:wsp-enter .45s ease 1.9s forwards; }
        .wsp-phone.play .wsp-mark{ animation:wsp-fadeup .5s ease 1.15s forwards; }

        .wsp-draw{
          fill:none; stroke:#F1F5F9; stroke-width:3;
          stroke-linecap:round; stroke-linejoin:round;
          stroke-dasharray:1; stroke-dashoffset:1;
        }
        .wsp-phone.play .wsp-draw{ animation:wsp-draw .55s cubic-bezier(.4,0,.2,1) var(--d,0s) forwards; }

        /* A 蹼泳者 */
        @keyframes wsp-glide{ 0%{ transform:translateX(-6px); } 100%{ transform:translateX(6px); } }
        @keyframes wsp-kick1{ 0%,100%{ transform:rotate(-7deg); } 50%{ transform:rotate(6deg); } }
        @keyframes wsp-kick2{ 0%,100%{ transform:rotate(7deg); } 50%{ transform:rotate(-6deg); } }
        @keyframes wsp-bub{
          from{ opacity:0; transform:translate(0,0) scale(.6); }
          40%{ opacity:.9; }
          to{ opacity:0; transform:translate(9px,-26px) scale(1); }
        }
        .wsp-fin1{ transform-box:view-box; transform-origin:52px 92px; }
        .wsp-fin2{ transform-box:view-box; transform-origin:54px 100px; }
        .wsp-phone.play .wsp-diver{ animation:wsp-glide 3.4s ease-in-out .3s both; }
        .wsp-phone.play .wsp-fin1{ animation:wsp-kick1 .85s ease-in-out .95s 2 both; }
        .wsp-phone.play .wsp-fin2{ animation:wsp-kick2 .85s ease-in-out .95s 2 both; }
        .wsp-bubble{ fill:#DC2626; opacity:0; }
        .wsp-phone.play .wsp-bubble{ animation:wsp-bub 1.1s ease-out var(--d) forwards; }

        /* B 呼吸環 */
        @keyframes wsp-inhale{ 0%{ transform:scale(.62); opacity:.35; } 55%,100%{ transform:scale(1); opacity:1; } }
        @keyframes wsp-co2in{ from{ opacity:0; letter-spacing:.5em; } to{ opacity:1; letter-spacing:.12em; } }
        .wsp-ring{ transform-box:view-box; transform-origin:60px 60px; }
        .wsp-phone.play .wsp-ring{ animation:wsp-inhale 1s cubic-bezier(.34,1.3,.64,1) both; }
        .wsp-arc{
          fill:none; stroke:#DC2626; stroke-width:5; stroke-linecap:round;
          stroke-dasharray:1; stroke-dashoffset:1;
        }
        .wsp-phone.play .wsp-arc{ animation:wsp-draw 1s cubic-bezier(.5,0,.5,1) .75s both; }
        .wsp-ringtext{ opacity:0; }
        .wsp-phone.play .wsp-ringtext{ animation:wsp-co2in .6s ease .5s forwards; }

        /* C 下潛繩 */
        @keyframes wsp-descend{ from{ transform:translateY(0); } to{ transform:translateY(96px); } }
        @keyframes wsp-tick{ from{ opacity:0; transform:translateX(-6px); } to{ opacity:1; transform:none; } }
        .wsp-phone.play .wsp-rope{ animation:wsp-draw 1.1s cubic-bezier(.4,0,.6,1) both; }
        .wsp-phone.play .wsp-pod{ animation:wsp-descend 1.15s cubic-bezier(.45,0,.55,1) .05s both; }
        .wsp-depth{
          opacity:0; font-family:'Space Grotesk',sans-serif; font-size:11px;
          letter-spacing:.1em; fill:#94A3B8;
        }
        .wsp-rung{ opacity:0; stroke:rgba(255,255,255,.18); stroke-width:2; }
        .wsp-phone.play .wsp-depth,
        .wsp-phone.play .wsp-rung{ animation:wsp-tick .3s ease var(--d) forwards; }

        /* D 表格長條 */
        @keyframes wsp-grow{ to{ transform:scaleX(1); } }
        .wsp-tbar{ transform:scaleX(0); transform-box:view-box; transform-origin:8px center; }
        .wsp-phone.play .wsp-tbar{ animation:wsp-grow .34s cubic-bezier(.3,0,.2,1) var(--d) forwards; }

        @media (prefers-reduced-motion:reduce){
          .w-entry{ opacity:1; transform:none; transition:none; }
          .w-card:hover{ transform:none; }
          .w-track{ scroll-behavior:auto; }
          /* 靜態收尾畫面：線稿畫完、長條長好、App 蓋在上面 */
          .wsp-phone.play *{ animation:none !important; }
          .wsp-draw, .wsp-arc{ stroke-dashoffset:0; }
          .wsp-mark, .wsp-depth, .wsp-rung, .wsp-app{ opacity:1; }
          .wsp-splash{ opacity:0; }
          .wsp-tbar{ transform:none; }
        }
      `}</style>
    </div>
  );
};

export default Works;

import{a as e,d as t,s as n,t as r}from"./index-CFhBUmPz.js";var i=t(n(),1),a=r(),o=[{slug:`co2table`,name:`CO₂ Table`,date:`2026.09`,dateLabel:`2026 年 9 月`,url:`https://co2table.com`,image:`/assets/works/co2table.jpg`,summary:`自由潛水乾式訓練計時器。`,description:`設定 CO₂ / O₂ 耐受表，跑計時、記錄成績。網頁與 LINE Bot 共用一套演算法。`,tags:[`Vanilla JS`,`Cloudflare Workers`,`PWA`,`LINE LIFF`],role:`設計與開發`},{slug:`truve`,name:`Truve`,date:`2026.08`,dateLabel:`2026 年 8 月`,url:`https://truve-news.vercel.app/`,image:`/assets/works/truve.jpg`,summary:`Community-driven fact-checking and news reputation platform.`,description:`Anyone can open a fact-check, attach evidence with a source URL, and vote. Each contributor carries a reputation score that weights their input.`,tags:[`Next.js`,`Go`,`Supabase`,`Cloud Run`],role:`設計與開發`}],s=()=>(0,a.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,a.jsx)(`path`,{d:`M7 17 17 7M8 7h9v9`})});function c(e){let t=[];for(let n of e){let e=n.date.slice(0,4),r=t[t.length-1];r&&r.year===e?r.items.push(n):t.push({year:e,items:[n]})}return t}var l=()=>{let t=(0,i.useRef)(null);(0,i.useEffect)(()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,n=t.current?.querySelectorAll(`.w-entry`);if(!n)return;if(e||!(`IntersectionObserver`in window)){n.forEach(e=>e.classList.add(`is-in`));return}let r=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(t.target.classList.add(`is-in`),r.unobserve(t.target))},{rootMargin:`0px 0px -12% 0px`});return n.forEach(e=>r.observe(e)),()=>r.disconnect()},[]);let n=c(o);return(0,a.jsxs)(`div`,{className:`w-root`,ref:t,children:[(0,a.jsxs)(e,{children:[(0,a.jsx)(`title`,{children:`adi | 作品集`}),(0,a.jsx)(`meta`,{name:`description`,content:`adi 的作品 — 每個月解決一個問題。`}),(0,a.jsx)(`link`,{rel:`preconnect`,href:`https://fonts.googleapis.com`}),(0,a.jsx)(`link`,{rel:`preconnect`,href:`https://fonts.gstatic.com`,crossOrigin:`anonymous`}),(0,a.jsx)(`link`,{href:`https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap`,rel:`stylesheet`})]}),(0,a.jsxs)(`div`,{className:`w-wrap`,children:[(0,a.jsx)(`a`,{href:`#/`,className:`w-back`,children:`← 回桌面`}),(0,a.jsxs)(`header`,{className:`w-hero`,children:[(0,a.jsx)(`p`,{className:`w-kicker`,children:`作品集 · WORKS`}),(0,a.jsxs)(`h1`,{className:`w-title`,children:[`每個月，`,(0,a.jsx)(`br`,{}),`解決`,(0,a.jsx)(`span`,{children:`一個問題`}),`。`]})]}),(0,a.jsxs)(`div`,{className:`w-timeline`,children:[n.map(e=>(0,a.jsxs)(`section`,{className:`w-yeargroup`,children:[(0,a.jsx)(`div`,{className:`w-year`,"aria-hidden":`true`,children:e.year}),(0,a.jsx)(`ol`,{className:`w-list`,children:e.items.map(e=>(0,a.jsxs)(`li`,{className:`w-entry`,children:[(0,a.jsxs)(`div`,{className:`w-when`,children:[(0,a.jsx)(`span`,{className:`w-dot`,"aria-hidden":`true`}),(0,a.jsx)(`time`,{dateTime:e.date.replace(`.`,`-`),children:e.dateLabel})]}),(0,a.jsxs)(`a`,{className:`w-card`,href:e.url,target:`_blank`,rel:`noreferrer`,children:[(0,a.jsx)(`div`,{className:`w-shot`,children:(0,a.jsx)(`img`,{src:e.image,alt:`${e.name} 網站截圖`,loading:`lazy`})}),(0,a.jsxs)(`div`,{className:`w-card-body`,children:[(0,a.jsxs)(`div`,{className:`w-card-head`,children:[(0,a.jsx)(`h2`,{className:`w-name`,children:e.name}),(0,a.jsx)(`span`,{className:`w-ext`,children:(0,a.jsx)(s,{})})]}),(0,a.jsx)(`p`,{className:`w-summary`,children:e.summary}),(0,a.jsx)(`p`,{className:`w-desc`,children:e.description}),(0,a.jsx)(`ul`,{className:`w-tags`,children:e.tags.map(e=>(0,a.jsx)(`li`,{children:e},e))}),(0,a.jsxs)(`div`,{className:`w-meta`,children:[(0,a.jsx)(`span`,{children:e.role}),(0,a.jsxs)(`span`,{className:`w-visit`,children:[`查看網站 `,(0,a.jsx)(s,{})]})]})]})]})]},e.slug))})]},e.year)),(0,a.jsxs)(`div`,{className:`w-end`,"aria-hidden":`true`,children:[(0,a.jsx)(`span`,{className:`w-dot`}),(0,a.jsx)(`span`,{children:`持續更新中`})]})]})]}),(0,a.jsx)(`style`,{children:`
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
          display:block; text-decoration:none; color:inherit; overflow:hidden;
          background:var(--card); border:1px solid var(--line); border-radius:14px;
          transition:border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .w-card:hover{
          border-color:var(--accent); transform:translateY(-3px);
          box-shadow:0 14px 40px -18px rgba(37,99,235,.4);
        }
        .w-card:focus-visible{ outline:2px solid var(--accent); outline-offset:3px; }

        .w-shot{
          aspect-ratio:16 / 10; overflow:hidden;
          background:var(--accent-soft); border-bottom:1px solid var(--line);
        }
        .w-shot img{
          width:100%; height:100%; object-fit:cover; object-position:top center;
          display:block; transition:transform .3s ease;
        }
        .w-card:hover .w-shot img{ transform:scale(1.03); }

        .w-card-body{ padding:clamp(20px,4vw,30px); }
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
      `})]})};export{l as Works,l as default};
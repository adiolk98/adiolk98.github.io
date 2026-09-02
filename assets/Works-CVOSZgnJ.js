import{a as e,d as t,s as n,t as r}from"./index-DLUIQ8cX.js";var i=t(n(),1),a=r(),o=[{slug:`co2table`,name:`CO₂ Table`,date:`2026.09`,dateLabel:`2026 年 9 月`,url:`https://co2table.com`,repo:`~/myrepo/co2table`,summary:`自由潛水 CO₂ 耐受表的乾式訓練工具。`,description:`設定訓練表、跑計時器、記錄每次成績。無框架前端搭配 Cloudflare Workers API，網頁與 LINE Bot 共用同一份訓練演算法；LINE 版用 LIFF 內嵌計時器，結果寫回 Google Sheet。支援 PWA，可加到主畫面並離線使用。`,tags:[`Vanilla JS`,`Cloudflare Workers`,`PWA`,`LINE LIFF`,`Google Apps Script`],role:`設計與開發`},{slug:`truve`,name:`Truve`,date:`2026.08`,dateLabel:`2026 年 8 月`,url:`https://truve-news.vercel.app/`,repo:`~/myrepo/truve`,summary:`社群驅動的事實查核與新聞聲譽平台。`,description:`去中心化的事實查核平台：使用者提出查核、社群投票、篩選佐證證據、處理申訴，全程以 app 內鈴鐺通知。Next.js 前端部署於 Vercel，Go 後端跑在 Google Cloud Run，帳號與資料庫走 Supabase，資料存取層用 sqlc 生成。`,tags:[`Next.js`,`Go`,`Supabase`,`Cloud Run`,`sqlc`],role:`設計與開發`}],s=()=>(0,a.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,a.jsx)(`path`,{d:`M7 17 17 7M8 7h9v9`})});function c(e){let t=[];for(let n of e){let e=n.date.slice(0,4),r=t[t.length-1];r&&r.year===e?r.items.push(n):t.push({year:e,items:[n]})}return t}var l=()=>{let t=(0,i.useRef)(null);(0,i.useEffect)(()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,n=t.current?.querySelectorAll(`.w-entry`);if(!n)return;if(e||!(`IntersectionObserver`in window)){n.forEach(e=>e.classList.add(`is-in`));return}let r=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(t.target.classList.add(`is-in`),r.unobserve(t.target))},{rootMargin:`0px 0px -12% 0px`});return n.forEach(e=>r.observe(e)),()=>r.disconnect()},[]);let n=c(o);return(0,a.jsxs)(`div`,{className:`w-root`,ref:t,children:[(0,a.jsxs)(e,{children:[(0,a.jsx)(`title`,{children:`adi | 作品集`}),(0,a.jsx)(`meta`,{name:`description`,content:`adi 的作品時間軸 — 依開發年月排列的個人專案。`}),(0,a.jsx)(`link`,{rel:`preconnect`,href:`https://fonts.googleapis.com`}),(0,a.jsx)(`link`,{rel:`preconnect`,href:`https://fonts.gstatic.com`,crossOrigin:`anonymous`}),(0,a.jsx)(`link`,{href:`https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap`,rel:`stylesheet`})]}),(0,a.jsxs)(`div`,{className:`w-wrap`,children:[(0,a.jsx)(`a`,{href:`#/`,className:`w-back`,children:`← 回桌面`}),(0,a.jsxs)(`header`,{className:`w-hero`,children:[(0,a.jsx)(`p`,{className:`w-kicker`,children:`SELECTED WORK · 作品集`}),(0,a.jsxs)(`h1`,{className:`w-title`,children:[`一條按`,(0,a.jsx)(`span`,{children:`年月`}),`排列`,(0,a.jsx)(`br`,{}),`的建造時間軸。`]}),(0,a.jsx)(`p`,{className:`w-lede`,children:`每一個專案都標上開發的年份與月份，依時間從新到舊排下來。`})]}),(0,a.jsxs)(`div`,{className:`w-timeline`,children:[n.map(e=>(0,a.jsxs)(`section`,{className:`w-yeargroup`,children:[(0,a.jsx)(`div`,{className:`w-year`,"aria-hidden":`true`,children:e.year}),(0,a.jsx)(`ol`,{className:`w-list`,children:e.items.map(e=>(0,a.jsxs)(`li`,{className:`w-entry`,children:[(0,a.jsxs)(`div`,{className:`w-when`,children:[(0,a.jsx)(`span`,{className:`w-dot`,"aria-hidden":`true`}),(0,a.jsx)(`time`,{dateTime:e.date.replace(`.`,`-`),children:e.dateLabel})]}),(0,a.jsxs)(`a`,{className:`w-card`,href:e.url,target:`_blank`,rel:`noreferrer`,children:[(0,a.jsxs)(`div`,{className:`w-card-head`,children:[(0,a.jsx)(`h2`,{className:`w-name`,children:e.name}),(0,a.jsx)(`span`,{className:`w-ext`,children:(0,a.jsx)(s,{})})]}),(0,a.jsx)(`p`,{className:`w-summary`,children:e.summary}),(0,a.jsx)(`p`,{className:`w-desc`,children:e.description}),(0,a.jsx)(`ul`,{className:`w-tags`,children:e.tags.map(e=>(0,a.jsx)(`li`,{children:e},e))}),(0,a.jsxs)(`div`,{className:`w-meta`,children:[(0,a.jsx)(`span`,{children:e.role}),(0,a.jsx)(`span`,{className:`w-sep`,"aria-hidden":`true`,children:`/`}),(0,a.jsx)(`span`,{className:`w-repo`,children:e.repo}),(0,a.jsxs)(`span`,{className:`w-visit`,children:[`查看網站 `,(0,a.jsx)(s,{})]})]})]})]},e.slug))})]},e.year)),(0,a.jsxs)(`div`,{className:`w-end`,"aria-hidden":`true`,children:[(0,a.jsx)(`span`,{className:`w-dot`}),(0,a.jsx)(`span`,{children:`持續更新中`})]})]})]}),(0,a.jsx)(`style`,{children:`
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
      `})]})};export{l as Works,l as default};
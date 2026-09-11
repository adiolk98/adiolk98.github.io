const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BrowserApp-DO_28pas.js","assets/index-BWIo_KtC.js","assets/index-hh1TRHzC.css","assets/MP3Player-t7IXCO1C.js","assets/styled-components.browser.esm-BAqr3oFr.js","assets/Terminal-DHBI1lLQ.js","assets/FileSystemContext-CZM_jQF6.js","assets/Terminal-B3oQaJWP.css","assets/YahooChat-CPEMi1ls.js","assets/lib-DRTWtbNW.js","assets/YahooChat-DDoo4DIN.css","assets/PDFViewer-Dedka6C5.js","assets/vscodeEditor-GIryYdVP.js","assets/DitherImageViewer-vpo9M7fa.js","assets/OpenAppStore-qijwr3Dc.js","assets/GameBoyAdvance-BuhjYuya.js","assets/LockedFolderApp-CM-lpVGJ.js","assets/PasswordModal-CZSW-vKX.js"])))=>i.map(i=>d[i]);
import{a as e,d as t,i as n,o as r,s as i,t as a}from"./index-BWIo_KtC.js";import{i as o,n as s,t as c}from"./styled-components.browser.esm-BAqr3oFr.js";import{n as l,r as u,t as d}from"./FileSystemContext-CZM_jQF6.js";import{t as f}from"./lib-DRTWtbNW.js";import{t as p}from"./PasswordModal-CZSW-vKX.js";var m=t(i(),1),h=a(),g=c`
  0% { transform: translate(var(--x-start), var(--y-start)); }
  100% { transform: translate(var(--x-end), var(--y-end)); }
`,_=o.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`,v=o.div`
  position: absolute;
  background-color: #00aaff;
  border-radius: 50%;
  animation: ${g} linear infinite;
  opacity: 0;
  animation-duration: var(--duration);
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
  top: 0; /* Changed from var(--top) to be relative to the container */
  left: 0; /* Changed from var(--left) to be relative to the container */

  @keyframes move {
    0% {
      transform: translate(var(--x-start), var(--y-start)) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x-end), var(--y-end)) scale(0);
      opacity: 0;
    }
  }
`,y=e=>{let t=[];for(let n=0;n<e;n++){let e=Math.random()*20+10,r=Math.random()*-e,i=Math.random()*3+2,a=`${Math.random()*100}vw`,o=`${Math.random()*100}vh`,s=`${Math.random()*100}vw`,c=`${Math.random()*100}vh`,l={"--duration":`${e}s`,"--delay":`${r}s`,"--size":`${i}px`,"--x-start":a,"--y-start":o,"--x-end":s,"--y-end":c};t.push((0,h.jsx)(v,{style:l},n))}return t},b=()=>(0,h.jsx)(_,{children:y(20)}),x=s`
  @font-face {
    font-family: 'Cubic_11';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-display: swap;
  }
  body {
    /* 這個復古桌面永遠是淺色的。不釘住 color-scheme 的話，使用者的系統在暗色模式時
       瀏覽器會把 input/button 換成深色 UA 樣式，App 裡沒明寫 color 的控制項就變成白字白底。 */
    color-scheme: light;
    font-family: 'Cubic_11', 'Tahoma', 'Arial', sans-serif;
    background: #222;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  .title-bar.xp {
    background: #111 !important;
    color: #fff;
    border-bottom: 1px solid #222;
  }
`;o.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,o.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 70%, rgba(0,0,0,0.18) 100%);
`,o.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow:
    0 0 60px 10px #000,
    0 0 0 5px #333 inset,
    0 0 80px 0 #222 inset;
  overflow: hidden;
  position: relative;
  background: #000;
`,o.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
  /* 斜斜的高光條紋 */
  background:
    linear-gradient(120deg, rgba(255,255,255,0.18) 10%, rgba(255,255,255,0.04) 60%, transparent 80%),
    radial-gradient(ellipse 120% 60% at 50% 0%, rgba(255,255,255,0.13) 0%, transparent 80%);
`,o.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 3;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0px,
    rgba(0,0,0,0.08) 1px,
    transparent 2px,
    transparent 4px
  );
`,s`
  body {
    background: linear-gradient(180deg, #181c22 0%, #23272e 100%);
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    /* Scanline */
    background: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.04) 0px,
      rgba(255,255,255,0.04) 1px,
      transparent 1.5px,
      transparent 4px
    );
    opacity: 0.5;
  }
  body::after {
    content: '';
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    /* CRT noise */
    background: url('data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><filter id="n" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.18"/></svg>');
    opacity: 0.25;
    mix-blend-mode: screen;
  }
`;var S=(0,m.createContext)(()=>{}),C=`/assets/sound-effects/click/base-click.mov`;function w({children:e}){let t=(0,m.useRef)(null),n=(0,m.useRef)(!1),r=()=>{if(!n.current&&t.current){t.current.muted=!0;let e=t.current.play();e!==void 0&&e.then(()=>{t.current.pause(),t.current.currentTime=0,t.current.muted=!1,n.current=!0}).catch(()=>{})}};return(0,h.jsxs)(S.Provider,{value:()=>{try{if(t.current){n.current||r(),t.current.currentTime=0;let e=t.current.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}}catch(e){console.warn(`Sound Play Sync Error (handled):`,e.message)}},children:[(0,h.jsx)(`audio`,{ref:t,src:C,preload:`auto`,onError:e=>console.warn(`Audio load error (handled):`,e)}),e]})}function T(){return(0,m.useContext)(S)}var E=(0,m.createContext)(()=>{}),D={cancel:`/assets/sound-effects/cancel.1.mp3`};function O({children:e}){let t=(0,m.useRef)({}),n=(0,m.useRef)({}),r=e=>{t.current[e]||(t.current[e]=new Audio(D[e]),t.current[e].preload=`auto`,n.current[e]=!1)},i=e=>{try{r(e);let i=t.current[e];if(i)if(n.current[e]){i.currentTime=0;let e=i.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}else{i.muted=!0;let t=i.play();t!==void 0&&t.then(()=>{i.pause(),i.currentTime=0,i.muted=!1,n.current[e]=!0,i.currentTime=0;let t=i.play();t!==void 0&&t.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}).catch(()=>{i.muted=!1,i.currentTime=0;let e=i.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})})}}catch(e){console.warn(`Sound Play Sync Error (handled):`,e.message)}};return(0,h.jsx)(E.Provider,{value:{playCancel:()=>i(`cancel`)},children:e})}function k(){return(0,m.useContext)(E)}var A=o.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 5px;
  width: 80px;
  cursor: pointer;
  user-select: none;
  border: none;
  background: transparent;
  filter: ${e=>e.disabled?`grayscale(100%)`:`none`};
  opacity: ${e=>e.disabled?.6:1};
  pointer-events: ${e=>e.disabled?`none`:`auto`};
  border-radius: 4px;
  background-color: ${e=>e.selected?`rgba(255, 255, 255, 0.1)`:`transparent`};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`,ee=o.img`
  width: 48px;
  height: 48px;
`,te=o.span`
  color: var(--crt-rose-ink, #fdf4e6);
  text-shadow: 1px 1px 2px black;
  font-family: 'DotGothic16', monospace;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  word-break: break-word;
  min-width: 0;
`;function ne({icon:e,label:t,onDoubleClick:n,disabled:r=!1}){let[i,a]=(0,m.useState)(!1),o=T(),s=()=>{!r&&n&&n()},c=()=>{if(!r){a(!0);try{o()}catch(e){console.warn(`Click sound error (handled):`,e.message)}typeof window<`u`&&window.innerWidth<=768&&n&&n()}};return(0,h.jsxs)(A,{onDoubleClick:s,onClick:c,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&!r&&(e.preventDefault(),c(),s())},onBlur:()=>{a(!1)},disabled:r,selected:i,"aria-label":t,children:[(0,h.jsx)(ee,{src:e,alt:``,width:`48`,height:`48`,"aria-hidden":`true`}),(0,h.jsx)(te,{children:t})]})}var j=`desktop-wallpaper`,M=`desktop-icon-positions`,N=[{id:`video`,name:`動態桌布`,type:`video`,src:`/assets/wallpaper-compressed.mp4`},{id:`phosphor`,name:`螢光幕綠`,type:`color`,src:`radial-gradient(ellipse 90% 80% at 50% 40%, #1d3a2a 0%, #0d1f16 60%, #060d0a 100%)`},{id:`rose`,name:`奶油玫瑰`,type:`color`,src:`linear-gradient(160deg, #d98d94 0%, #ecd8a6 55%, #f3e7d0 100%)`},{id:`website`,name:`網站截圖`,type:`image`,src:`/assets/photo/website.webp`},{id:`camera`,name:`底片照`,type:`image`,src:`/assets/photo/camera-5.jpg`},{id:`cat`,name:`好貓`,type:`image`,src:`/assets/photo/good-cat.png`}];function P(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.warn(`Failed to read ${e} (handled):`,n.message),t}}function F(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(t){console.warn(`Failed to persist ${e} (handled):`,t.message)}}var re=()=>P(j,N[0].id),ie=e=>F(j,e),I=e=>N.find(t=>t.id===e)||N[0],ae=e=>N[(N.findIndex(t=>t.id===e)+1)%N.length].id,oe=()=>P(M,{}),L=e=>F(M,e),R=104,se=108,z=16,ce=8,le=4;function ue(e,t){let n=Math.max(1,Math.floor((t-z)/R));return{x:z+e%n*R,y:ce+Math.floor(e/n)*se}}function de({apps:e,onOpen:t,layoutVersion:n}){let[r,i]=(0,m.useState)(oe),[a,o]=(0,m.useState)(null),[s,c]=(0,m.useState)(0),l=(0,m.useRef)(null),u=(0,m.useRef)(null),d=(0,m.useRef)(!1),f=typeof window<`u`&&window.innerWidth<=768;(0,m.useEffect)(()=>{let e=l.current;if(!e)return;let t=()=>c(e.clientWidth);t();let n=new ResizeObserver(t);return n.observe(e),()=>n.disconnect()},[]),(0,m.useEffect)(()=>{n!==0&&(i({}),L({}))},[n]);let p=(e,t,n)=>{if(f||e.button!==0)return;d.current=!1;let i=r[t.id]||n;u.current={id:t.id,startX:e.clientX,startY:e.clientY,originX:i.x,originY:i.y,x:i.x,y:i.y,moved:!1,controller:new AbortController};let{signal:a}=u.current.controller;window.addEventListener(`pointermove`,g,{signal:a}),window.addEventListener(`pointerup`,_,{signal:a}),window.addEventListener(`pointercancel`,_,{signal:a}),o({id:t.id,x:i.x,y:i.y})};function g(e){let t=u.current;if(!t)return;let n=e.clientX-t.startX,r=e.clientY-t.startY;if(!t.moved&&Math.hypot(n,r)<le)return;t.moved=!0;let i=l.current,a=Math.max(0,(i?.clientWidth??800)-84),s=Math.max(0,(i?.clientHeight??600)-88);t.x=Math.min(Math.max(0,t.originX+n),a),t.y=Math.min(Math.max(0,t.originY+r),s),o({id:t.id,x:t.x,y:t.y})}function _(){let e=u.current;if(!e||(e.controller.abort(),u.current=null,o(null),d.current=e.moved,!e.moved))return;let t={...r,[e.id]:{x:e.x,y:e.y}};i(t),L(t)}return(0,h.jsx)(`div`,{ref:l,style:{position:`absolute`,inset:`60px 0 0 0`,zIndex:2,pointerEvents:`none`},children:e.map((e,n)=>{let i=ue(n,s),o=r[e.id]||i,c=a?.id===e.id?a:o;return(0,h.jsx)(`div`,{onPointerDown:t=>p(t,e,i),style:{position:`absolute`,left:c.x,top:c.y,width:80,pointerEvents:`auto`,zIndex:a?.id===e.id?5:1,opacity:a?.id===e.id?.8:1,cursor:f?`pointer`:`grab`},children:(0,h.jsx)(ne,{icon:e.icon,label:e.name,disabled:e.disabled,onDoubleClick:()=>{d.current||t(e.id)}})},e.id)})})}var B=o.div`
  background: var(--crt-cream);
  box-shadow: inset 0 0 0 2px var(--crt-line), .22em .26em 0 rgba(0, 0, 0, .34);
  padding: 0;
  overflow: hidden;
  position: relative;
`,V=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose) 52%, var(--crt-rose-lo) 100%);
  color: var(--crt-rose-ink);
  padding: 0 6px 0 10px;
  height: 30px;
  font-family: 'DotGothic16', monospace;
  font-size: 1.1rem;
  box-shadow: inset 0 0 0 2px var(--crt-line);
  cursor: move;
  user-select: none;
`,H=o.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`,fe=o.div`
  display: flex;
  align-items: center;
  gap: 3px;
  button {
    /* Real hit target is bigger than the visual swatch: the tube's barrel filter warps
       what's painted but not where clicks register, so a generous target forgives the
       few px of visual/actual mismatch near the screen edges. */
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .2);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, .34);
    border: none;
    color: var(--crt-rose-ink);
    width: 26px;
    height: 26px;
    line-height: 1;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: rgba(0, 0, 0, .4);
    }
    &:focus-visible {
      outline: 2px solid var(--crt-ink);
      outline-offset: 2px;
    }
  }
`,pe=o.div`
  /* border-box：不然 padding 會加在 100% 之外，每個 App 的底部都被切掉 20px。 */
  box-sizing: border-box;
  padding: 10px 8px;
  height: calc(100% - 30px);
  max-height: calc(100% - 30px);
  overflow: auto;
  background: var(--crt-cream);
  &::-webkit-scrollbar {
    width: 8px;
    background: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1px;
  }
  font-size: 12px;
`,me=({icon:e,title:t,children:n,onClose:r,onFocus:i,onMinimize:a,minimized:o=!1,zIndex:s=1,resizable:c=!0,defaultSize:l={x:100,y:100,width:320,height:200}})=>{let u=T(),{playCancel:d}=k(),[p,g]=(0,m.useState)(!1),_=typeof window<`u`&&window.innerWidth<=768,v=_?{x:10,y:38,width:Math.min(window.innerWidth-20,380),height:Math.min(window.innerHeight-80,520)}:l,y={x:0,y:0,width:window.innerWidth,height:window.innerHeight-30-46},b=_?{position:{x:10,y:38},size:{width:v.width,height:v.height}}:p?{position:{x:y.x,y:y.y},size:{width:y.width,height:y.height}}:{},x=(e,t)=>()=>{try{t()}catch(e){console.warn(`Window control sound error (handled):`,e.message)}e&&e()};return(0,h.jsx)(f,{default:v,...b,minWidth:200,minHeight:100,disableDragging:_||p,enableResizing:!_&&!p&&c,dragHandleClassName:`window-title-bar`,style:{zIndex:s,display:o?`none`:void 0},onDragStart:()=>i&&i(),onResizeStart:()=>i&&i(),children:(0,h.jsxs)(B,{style:{width:`100%`,height:`100%`},onMouseDown:()=>i&&i(),children:[(0,h.jsxs)(V,{className:`window-title-bar`,onDoubleClick:()=>!_&&g(e=>!e),onMouseDown:x(null,u),children:[(0,h.jsxs)(H,{children:[e&&(0,h.jsx)(`img`,{src:e,alt:``,width:`18`,height:`18`,"aria-hidden":`true`,style:{marginRight:8,verticalAlign:`middle`}}),t]}),(0,h.jsxs)(fe,{children:[(0,h.jsx)(`button`,{"aria-label":`Minimize ${t} window`,onClick:x(a,u),children:`—`}),!_&&(0,h.jsx)(`button`,{"aria-label":`${p?`Restore`:`Maximize`} ${t} window`,onClick:x(()=>g(e=>!e),u),children:p?`❐`:`☐`}),(0,h.jsx)(`button`,{"aria-label":`Close ${t} window`,onClick:x(r,d),children:`✕`})]})]}),(0,h.jsx)(pe,{children:n})]})})},he=o.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`,ge=o.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.1) saturate(1.2);
`,_e=o.div`
  width: 100%;
  height: 100%;
  background: ${e=>e.src};
`,ve=o.div`
  width: 100%;
  height: 100%;
  background-image: url(${e=>e.src});
  background-size: cover;
  background-position: center;
  filter: brightness(0.9) contrast(1.1);
`,ye=({background:e})=>e?(0,h.jsxs)(he,{children:[e.type===`video`&&(0,h.jsx)(ge,{src:e.src,autoPlay:!0,loop:!0,muted:!0,playsInline:!0},e.src),e.type===`image`&&(0,h.jsx)(ve,{src:e.src}),e.type===`color`&&(0,h.jsx)(_e,{src:e.src})]}):null,U={普通:{say:null,blinkEvery:4200},開心:{say:`喵～`,blinkEvery:1800},想睡:{say:`zzz`,blinkEvery:9e3},好奇:{say:`？`,blinkEvery:2600}},be=26,xe=62;function Se({mood:e,facing:t,stepping:n}){let[r,i]=(0,m.useState)(!1);(0,m.useEffect)(()=>{let t=U[e]?.blinkEvery??4200,n=setInterval(()=>{i(!0),setTimeout(()=>i(!1),140)},t+Math.random()*1200);return()=>clearInterval(n)},[e]);let a=r||e===`想睡`;return(0,h.jsxs)(`svg`,{width:`56`,height:`56`,viewBox:`0 0 64 64`,style:{imageRendering:`pixelated`,transform:`scaleX(${t})`},"aria-hidden":`true`,children:[(0,h.jsx)(`rect`,{x:`16`,y:`32`,width:`32`,height:`24`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),(0,h.jsx)(`rect`,{x:`20`,y:`16`,width:`24`,height:`20`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),(0,h.jsx)(`rect`,{x:`20`,y:`10`,width:`6`,height:`8`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),(0,h.jsx)(`rect`,{x:`38`,y:`10`,width:`6`,height:`8`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),a?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`rect`,{x:`28`,y:`26`,width:`4`,height:`2`,fill:`#222`}),(0,h.jsx)(`rect`,{x:`36`,y:`26`,width:`4`,height:`2`,fill:`#222`})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`rect`,{x:`28`,y:`24`,width:`4`,height:`4`,fill:`#222`}),(0,h.jsx)(`rect`,{x:`36`,y:`24`,width:`4`,height:`4`,fill:`#222`})]}),(0,h.jsx)(`rect`,{x:`32`,y:`30`,width:`4`,height:`2`,fill:`#c96`}),(0,h.jsx)(`rect`,{x:`46`,y:n?42:46,width:`10`,height:`4`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),(0,h.jsx)(`rect`,{x:`20`,y:n?54:56,width:`8`,height:`4`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),(0,h.jsx)(`rect`,{x:`36`,y:n?56:54,width:`8`,height:`4`,fill:`#f9e4b7`,stroke:`#222`,strokeWidth:`2`}),e===`開心`&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`rect`,{x:`24`,y:`28`,width:`2`,height:`2`,fill:`#f88`}),(0,h.jsx)(`rect`,{x:`42`,y:`28`,width:`2`,height:`2`,fill:`#f88`})]})]})}function Ce(){let[e,t]=(0,m.useState)(()=>({x:120,target:320})),[n,r]=(0,m.useState)(`普通`),[i,a]=(0,m.useState)(!1),[o,s]=(0,m.useState)(!1),c=(0,m.useRef)([]);(0,m.useEffect)(()=>{let e=0,n=performance.now(),r=0,i=a=>{let o=Math.min((a-n)/1e3,.1);n=a,t(e=>{let t=e.target-e.x;if(Math.abs(t)<3){if(r||=a+1200+Math.random()*3e3,a<r)return e;r=0;let t=window.innerWidth;return{...e,target:40+Math.random()*Math.max(80,t-140)}}return{...e,x:e.x+Math.sign(t)*be*o}}),e=requestAnimationFrame(i)};return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)},[]),(0,m.useEffect)(()=>{let e=setInterval(()=>a(e=>!e),260);return()=>clearInterval(e)},[]),(0,m.useEffect)(()=>{let e=setInterval(()=>{r(e=>{if(e===`開心`)return e;let t=[`普通`,`普通`,`想睡`,`好奇`];return t[Math.floor(Math.random()*t.length)]})},9e3);return()=>clearInterval(e)},[]),(0,m.useEffect)(()=>()=>c.current.forEach(clearTimeout),[]);let l=()=>{r(`開心`),s(!0),c.current.push(setTimeout(()=>s(!1),1400)),c.current.push(setTimeout(()=>r(`普通`),5e3))},u=e.target>=e.x?1:-1,d=U[n]?.say;return(0,h.jsxs)(`div`,{onClick:l,title:`點我餵食`,style:{position:`absolute`,left:0,bottom:xe,transform:`translateX(${Math.round(e.x)}px)`,zIndex:3,width:56,display:`flex`,flexDirection:`column`,alignItems:`center`,cursor:`pointer`,userSelect:`none`},children:[(o||d)&&(0,h.jsx)(`div`,{style:{fontFamily:`'DotGothic16', monospace`,fontSize:13,color:`var(--crt-rose-ink, #fdf4e6)`,textShadow:`1px 1px 2px #000`,marginBottom:2,pointerEvents:`none`},children:o?`❤️`:d}),(0,h.jsx)(Se,{mood:n,facing:u,stepping:i})]})}var we=o.div`
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: min(92%, 900px);
  overflow-x: auto;
  padding: 4px 6px;
  background: linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose-lo) 100%);
  box-shadow: inset 0 0 0 2px var(--crt-line), .16em .2em 0 rgba(0, 0, 0, .34);
  z-index: 900;
`,Te=o.button`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  max-width: 150px;
  padding: 4px 8px;
  border: none;
  cursor: pointer;
  font-family: 'DotGothic16', monospace;
  font-size: 11px;
  color: var(--crt-ink);
  background: ${e=>e.$active?`var(--crt-cream)`:`rgba(253, 244, 230, .55)`};
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, ${e=>e.$active?`.42`:`.22`});
  opacity: ${e=>e.$minimized?.6:1};

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
  }

  &:hover { background: var(--crt-cream); }
  &:focus-visible { outline: 2px solid var(--crt-ink); outline-offset: 2px; }
`,Ee=o.span`
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  font-size: 10px;
  background: rgba(0, 0, 0, .18);

  &:hover { background: var(--crt-red); color: var(--crt-cream); }
`;function De({items:e,activeId:t,onSelect:n,onClose:r}){return e.length?(0,h.jsx)(we,{role:`toolbar`,"aria-label":`開啟中的視窗`,children:e.map(e=>(0,h.jsxs)(Te,{$active:e.id===t,$minimized:e.minimized,onClick:()=>n(e.id),title:e.minimized?`${e.name}（已縮小）`:e.name,children:[e.icon&&(0,h.jsx)(`img`,{src:e.icon,alt:``,"aria-hidden":`true`}),(0,h.jsx)(`span`,{children:e.name}),(0,h.jsx)(Ee,{role:`button`,"aria-label":`關閉 ${e.name}`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`✕`})]},e.id))}):null}var Oe=t(r(),1),ke=o.div.attrs({className:`dropdown-menu-container`})`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #000;
  padding: 5px ;
  min-width: 200px;
  z-index: 1000;
  font-family: 'Cubic_11', sans-serif;
  font-size: 15px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`,Ae=o.div`
  padding: 5px 20px;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${e=>e.isHovered?`#000080`:`transparent`};
  color: ${e=>e.isHovered?`white`:e.disabled?`#888`:`#000`};
  
  // Create a scanline effect for disabled items
  ${e=>e.disabled&&`
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 1px,
        rgba(0, 0, 0, 0.2) 2px,
        rgba(0, 0, 0, 0.2) 3px
      );
      pointer-events: none;
    }
  `}

  pointer-events: ${e=>e.disabled?`none`:`auto`};
`,je=o.div`
  height: 1px;
  border-top: 1px dotted #888;
  margin: 5px 4px;
`,W=({items:e,position:t,onClose:n})=>{let[r,i]=m.useState(-1),a=e=>{e.action&&e.action(),n()};return Oe.createPortal((0,h.jsx)(ke,{style:{top:t.y,left:t.x},children:e.map((e,t)=>e.type===`separator`?(0,h.jsx)(je,{},t):(0,h.jsx)(Ae,{disabled:e.disabled,onClick:()=>a(e),onMouseEnter:()=>i(t),onMouseLeave:()=>i(-1),isHovered:!e.disabled&&r===t,children:e.label},t))}),document.body)},G=6e4,K=190,q=74;function Me({onExit:e}){let[t,n]=(0,m.useState)(0),[r,i]=(0,m.useState)(0),a=(0,m.useRef)(null),o=(0,m.useRef)({x:60,y:60,vx:1.7,vy:1.1});return(0,m.useEffect)(()=>{let e=0,t=()=>{let r=o.current,s=window.innerWidth,c=window.innerHeight;r.x+=r.vx,r.y+=r.vy;let l=0;(r.x<=0||r.x+K>=s)&&(r.vx*=-1,r.x=Math.min(Math.max(0,r.x),s-K),l+=1),(r.y<=0||r.y+q>=c)&&(r.vy*=-1,r.y=Math.min(Math.max(0,r.y),c-q),l+=1),l&&(i(e=>(e+47)%360),l===2&&n(e=>e+1)),a.current&&(a.current.style.transform=`translate(${Math.round(r.x)}px, ${Math.round(r.y)}px)`),e=requestAnimationFrame(t)};return e=requestAnimationFrame(t),()=>cancelAnimationFrame(e)},[]),(0,h.jsxs)(`div`,{onPointerDown:e,onWheel:e,style:{position:`fixed`,inset:0,zIndex:4e3,background:`#04070a`,overflow:`hidden`,cursor:`none`},children:[(0,h.jsxs)(`div`,{ref:a,style:{position:`absolute`,width:K,height:q,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:4,color:`hsl(${r} 80% 68%)`,border:`3px solid hsl(${r} 80% 68%)`,fontFamily:`'DotGothic16', monospace`,textShadow:`0 0 12px hsl(${r} 80% 60%)`,willChange:`transform`},children:[(0,h.jsx)(`div`,{style:{fontSize:26,letterSpacing:2},children:`adi.tw`}),(0,h.jsx)(`div`,{style:{fontSize:10,opacity:.8},children:`RETRO OS`})]}),(0,h.jsxs)(`div`,{style:{position:`absolute`,left:0,right:0,bottom:26,textAlign:`center`,color:`#4a6070`,fontFamily:`'DotGothic16', monospace`,fontSize:12,lineHeight:2},children:[(0,h.jsxs)(`div`,{children:[`撞到角落 `,t,` 次`]}),(0,h.jsx)(`div`,{children:`動一下滑鼠或按任意鍵離開`})]})]})}function Ne(e=!0){let[t,n]=(0,m.useState)(!1);return(0,m.useEffect)(()=>{if(!e||t)return;let r=window.setTimeout(()=>n(!0),G),i=()=>{clearTimeout(r),r=window.setTimeout(()=>n(!0),G)},a=[`pointermove`,`pointerdown`,`keydown`,`wheel`];return a.forEach(e=>window.addEventListener(e,i,{passive:!0})),()=>{clearTimeout(r),a.forEach(e=>window.removeEventListener(e,i))}},[e,t]),(0,m.useEffect)(()=>{if(!t)return;let e=()=>n(!1);return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[t]),[t,n]}var J=`未命名.txt`,Pe=`0314`,Y=`puzzle-note-unlocked`;function Fe(){let{fileSystem:e,currentPath:t,setCurrentPath:n,cd:r,mkdir:i,touch:a,rm:o,readFile:s}=u(),[c,d]=(0,m.useState)(!1),[f,g]=(0,m.useState)(null),[_,v]=(0,m.useState)(null),[y,b]=(0,m.useState)(()=>localStorage.getItem(Y)===`1`),x=[...(l(e,t)||e).children||[]].sort((e,t)=>e.type===t.type?e.name.localeCompare(t.name):e.type===`folder`?-1:1),S=e=>{if(e.name===J&&!y){d(!0);return}g({name:e.name,content:s(e.name)??``})},C=e=>e===Pe?(localStorage.setItem(Y,`1`),b(!0),d(!1),g({name:J,content:s(J)??``}),!0):!1,[w,T]=(0,m.useState)(null),E=e=>{e.preventDefault();let t=w.value.trim();t&&(w.type===`folder`?i:a)(t),T(null)},D=()=>{_&&(o(_),v(null))},O=typeof window<`u`&&window.innerWidth<=768;return(0,h.jsxs)(`div`,{className:`finder-app`,children:[(0,h.jsxs)(`div`,{className:`finder-toolbar`,children:[(0,h.jsx)(`button`,{className:`finder-tool`,onClick:()=>r(`..`),disabled:t.length===0,title:`上一層`,children:`↰`}),(0,h.jsxs)(`nav`,{className:`finder-crumbs`,"aria-label":`路徑`,children:[(0,h.jsx)(`button`,{className:`finder-crumb`,onClick:()=>n([]),children:`電腦`}),t.map((e,r)=>(0,h.jsx)(`button`,{className:`finder-crumb`,onClick:()=>n(t.slice(0,r+1)),children:e},`${e}-${r}`))]}),(0,h.jsxs)(`div`,{className:`finder-tools`,children:[(0,h.jsx)(`button`,{className:`finder-tool`,onClick:()=>T({type:`folder`,value:`新增資料夾`}),title:`新增資料夾`,children:`＋📁`}),(0,h.jsx)(`button`,{className:`finder-tool`,onClick:()=>T({type:`file`,value:`untitled.txt`}),title:`新增檔案`,children:`＋📄`}),(0,h.jsx)(`button`,{className:`finder-tool`,onClick:D,disabled:!_,title:`刪除`,children:`🗑`})]})]}),w&&(0,h.jsxs)(`form`,{className:`finder-newrow`,onSubmit:E,children:[(0,h.jsx)(`span`,{children:w.type===`folder`?`📁`:`📄`}),(0,h.jsx)(`input`,{autoFocus:!0,value:w.value,onChange:e=>T({...w,value:e.target.value}),onKeyDown:e=>e.key===`Escape`&&T(null)}),(0,h.jsx)(`button`,{className:`finder-tool`,type:`submit`,children:`建立`}),(0,h.jsx)(`button`,{className:`finder-tool`,type:`button`,onClick:()=>T(null),children:`取消`})]}),(0,h.jsxs)(`div`,{className:`finder-icon-grid`,children:[x.map(e=>{let t=e.name===J&&!y,n=()=>e.type===`folder`?r(e.name):S(e);return(0,h.jsxs)(`button`,{className:`finder-icon${_===e.name?` selected`:``}`,onDoubleClick:n,onClick:()=>{v(e.name),O&&n()},children:[e.type===`folder`?(0,h.jsx)(`img`,{src:`/assets/app/finder-folder.svg`,alt:``,width:`48`,height:`48`}):(0,h.jsx)(`span`,{className:`finder-icon-emoji`,children:t?`🔒`:`📄`}),(0,h.jsx)(`span`,{children:e.name})]},e.name)}),x.length===0&&(0,h.jsx)(`div`,{className:`finder-empty`,children:`這個資料夾是空的`})]}),(0,h.jsxs)(`div`,{className:`finder-statusbar`,children:[(0,h.jsxs)(`span`,{children:[x.length,` 個項目`]}),(0,h.jsx)(`span`,{children:_||`未選取`})]}),c&&(0,h.jsx)(p,{title:`輸入密碼以開啟「${J}」`,onSubmit:C,onClose:()=>d(!1)}),f&&(0,h.jsx)(`div`,{style:{position:`fixed`,inset:0,background:`rgba(0,0,0,0.6)`,display:`flex`,alignItems:`center`,justifyContent:`center`,zIndex:9998},onClick:()=>g(null),children:(0,h.jsxs)(`div`,{className:`crt-panel px`,onClick:e=>e.stopPropagation(),style:{width:300,whiteSpace:`pre-wrap`,fontFamily:`'DotGothic16', monospace`},children:[(0,h.jsx)(`div`,{style:{marginBottom:8,fontWeight:`bold`},children:f.name}),f.content||`(空檔案)`]})})]})}function Ie({onOpenApp:e,onCloseActive:t}){let[n,r]=(0,m.useState)(new Date),[i,a]=(0,m.useState)(null),[o,s]=(0,m.useState)(null),[c,l]=(0,m.useState)({x:0,y:0}),u=(0,m.useRef)(null),d=(0,m.useRef)(null),f=(0,m.useRef)(null),p=e=>{e.current&&(e.current.currentTime=0,e.current.play().catch(e=>console.error(`Audio play failed:`,e)))},g=()=>{o&&(p(f),s(null))},_={icon:[{label:`關於這個 App`,action:()=>e(`wiki`)},{type:`separator`},{label:`設定...`,disabled:!0},{label:`登出`,disabled:!0}],檔案:[{label:`New Finder Window`,action:()=>e(`finder`)},{label:`New Terminal`,action:()=>e(`terminal`)},{type:`separator`},{label:`Move to Trash`,disabled:!0},{label:`Empty Trash...`,action:()=>a(`垃圾桶已經是空的。`)},{type:`separator`},{label:`Close Window`,action:()=>t&&t()}],編輯:[{label:`Undo`,disabled:!0},{label:`Redo`,disabled:!0}],檢視:[{label:`Zoom In`,disabled:!0},{label:`Zoom Out`,disabled:!0}],前往:[{label:`作品集`,action:()=>e(`works`)},{label:`Developer Tools`,action:()=>e(`tools`)},{type:`separator`},{label:`Open Terminal`,action:()=>e(`terminal`)}],幫助:[{label:`顯示幫助訊息`,action:()=>a(`雙擊桌面圖示開啟 App。
視窗標題列可拖曳，右上角有縮小／最大化／關閉，
下方工作列可以切換已開啟的視窗。`)}]};(0,m.useEffect)(()=>{let e=setInterval(()=>r(new Date),1e3),t=e=>{u.current&&u.current.contains(e.target)||e.target.closest(`.dropdown-menu-container`)||g()};return document.addEventListener(`mousedown`,t),()=>{clearInterval(e),document.removeEventListener(`mousedown`,t)}},[o]);let v=(e,t)=>{if(o===e)g();else{p(d);let n=t.currentTarget.getBoundingClientRect();l({x:n.left,y:n.bottom}),s(e)}},y=[`日`,`一`,`二`,`三`,`四`,`五`,`六`][n.getDay()],b=`${n.getHours().toString().padStart(2,`0`)}:${n.getMinutes().toString().padStart(2,`0`)}`,x={position:`relative`,width:`100%`,height:30,flex:`0 0 auto`,background:`linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose) 52%, var(--crt-rose-lo) 100%)`,boxShadow:`inset 0 0 0 2px var(--crt-line)`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,fontFamily:`'DotGothic16', 'Cubic_11', monospace`,fontSize:14,color:`var(--crt-rose-ink)`,zIndex:999},S={display:`flex`,alignItems:`center`,gap:18,marginLeft:16},C={fontSize:20,fontWeight:`bold`,marginRight:5,width:20,height:20},w=e=>({cursor:`pointer`,padding:`3px 7px`,transition:`background 0.2s`,userSelect:`none`,backgroundColor:o===e?`rgba(0,0,0,.24)`:`transparent`}),T={display:`flex`,alignItems:`center`,gap:12,marginRight:18},E={fontSize:14};return(0,h.jsxs)(`div`,{style:x,ref:u,children:[(0,h.jsx)(`audio`,{ref:d,src:`/assets/sound-effects/select.wav`,preload:`auto`}),(0,h.jsx)(`audio`,{ref:f,src:`/assets/sound-effects/select.wav`,preload:`auto`}),(0,h.jsx)(`div`,{style:S,children:Object.keys(_).map(e=>e===`icon`?(0,h.jsx)(`img`,{src:`/assets/gpt_banana_icon.webp`,alt:`banana`,style:{...C,cursor:`pointer`,padding:`2px`,backgroundColor:o===e?`rgba(0,0,0,.24)`:`transparent`},onClick:t=>v(e,t)},e):(0,h.jsx)(`span`,{className:`mac-menu-item`,style:{...w(e),display:typeof window<`u`&&window.innerWidth<=768&&e!==`檔案`?`none`:`inline-block`},onClick:t=>v(e,t),children:e},e))}),o&&(0,h.jsx)(W,{items:_[o],position:c,onClose:g}),i&&(0,h.jsx)(`div`,{onClick:()=>a(null),style:{position:`fixed`,inset:0,background:`rgba(0,0,0,0.5)`,zIndex:9999,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,h.jsxs)(`div`,{className:`crt-panel px`,onClick:e=>e.stopPropagation(),style:{width:320,whiteSpace:`pre-wrap`,fontFamily:`'DotGothic16', monospace`,fontSize:13},children:[(0,h.jsx)(`div`,{style:{marginBottom:12},children:i}),(0,h.jsx)(`div`,{style:{textAlign:`right`},children:(0,h.jsx)(`button`,{className:`crt-btn red`,onClick:()=>a(null),children:`確定`})})]})}),(0,h.jsxs)(`div`,{style:T,children:[(0,h.jsx)(`span`,{role:`img`,"aria-label":`volume`,children:`🔊`}),(0,h.jsx)(`span`,{style:E,children:`週${y} ${n.getMonth()+1}月${n.getDate()}日`}),(0,h.jsx)(`span`,{style:E,children:b})]})]})}var Le=class extends m.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){console.error(`ErrorBoundary caught an error:`,e,t),e.message&&e.message.includes(`play`)&&setTimeout(()=>{this.setState({hasError:!1,error:null})},100)}render(){return this.state.hasError?this.state.error&&this.state.error.message&&this.state.error.message.includes(`play`)?this.props.children:(0,h.jsxs)(`div`,{style:{padding:`20px`,textAlign:`center`,background:`#f8f9fa`,border:`1px solid #dee2e6`,borderRadius:`8px`,margin:`20px`},children:[(0,h.jsx)(`h2`,{style:{color:`#6c757d`},children:`出現了一些問題`}),(0,h.jsx)(`p`,{style:{color:`#868e96`},children:`請重新整理頁面或聯繫管理員`}),(0,h.jsx)(`button`,{onClick:()=>window.location.reload(),style:{padding:`8px 16px`,background:`#007bff`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`},children:`重新整理`})]}):this.props.children}},Re=(0,m.lazy)(()=>n(()=>import(`./BrowserApp-DO_28pas.js`),__vite__mapDeps([0,1,2]))),ze=(0,m.lazy)(()=>n(()=>import(`./MP3Player-t7IXCO1C.js`),__vite__mapDeps([3,1,2,4]))),Be=(0,m.lazy)(()=>n(()=>import(`./Terminal-DHBI1lLQ.js`),__vite__mapDeps([5,1,2,6,7]))),Ve=(0,m.lazy)(()=>n(()=>import(`./YahooChat-CPEMi1ls.js`),__vite__mapDeps([8,1,2,9,10]))),X=(0,m.lazy)(()=>n(()=>import(`./PDFViewer-Dedka6C5.js`),__vite__mapDeps([11,1,2]))),He=(0,m.lazy)(()=>n(()=>import(`./vscodeEditor-GIryYdVP.js`),__vite__mapDeps([12,1,2,4]))),Ue=(0,m.lazy)(()=>n(()=>import(`./DitherImageViewer-vpo9M7fa.js`),__vite__mapDeps([13,1,2,4]))),Z=(0,m.lazy)(()=>n(()=>import(`./OpenAppStore-qijwr3Dc.js`),__vite__mapDeps([14,1,2]))),We=(0,m.lazy)(()=>n(()=>import(`./GameBoyAdvance-BuhjYuya.js`),__vite__mapDeps([15,1,2,4]))),Ge=(0,m.lazy)(()=>n(()=>import(`./LockedFolderApp-CM-lpVGJ.js`),__vite__mapDeps([16,1,2,17]))),Q=[`arrowup`,`arrowup`,`arrowdown`,`arrowdown`,`arrowleft`,`arrowright`,`arrowleft`,`arrowright`,`b`,`a`];function Ke(e){let t=(0,m.useRef)(e);t.current=e,(0,m.useEffect)(()=>{let e=0,n=n=>{let r=n.key.toLowerCase();e=r===Q[e]?e+1:+(r===Q[0]),e===Q.length&&(e=0,t.current())};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[])}var qe=()=>(0,h.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justify:`center`,height:`100%`,width:`100%`,background:`#f0f0f0`,color:`#333`,fontFamily:`monospace`,fontSize:`14px`,padding:`20px`},children:`Loading application...`}),$=[{id:`wiki`,name:`wiki`,icon:`/assets/app/B/Wikipedia.png`,windowProps:{title:`wiki`,defaultSize:{x:200,y:120,width:400,height:500}},content:(0,h.jsxs)(`div`,{style:{padding:`16px`,lineHeight:1.8,fontSize:`1.1em`,maxHeight:`100%`,overflowY:`auto`,boxSizing:`border-box`,background:`#fff`,color:`#222`,borderRadius:`8px`,boxShadow:`0 2px 8px rgba(0,0,0,0.08)`},children:[(0,h.jsx)(`h2`,{style:{marginBottom:`8px`,color:`#2d72d9`},children:`Welcome to adi.tw. v1`}),(0,h.jsx)(`div`,{children:`嗨，這是我的個人網站，歡迎使用，歡迎多點點看！`})]})},{id:`browser`,name:`Chrome`,icon:`/assets/app/B/Google_Chrome.png`,windowProps:{title:`Chrome`,defaultSize:{x:220,y:120,width:650,height:540}},Component:Re},{id:`terminal`,name:`Terminal`,icon:`/assets/app/terminal-removebg-preview.png`,windowProps:{title:`Terminal`,defaultSize:{x:100,y:100,width:700,height:350}},Component:Be},{id:`cv`,name:`CV.pdf`,icon:`/assets/app/B/Microsoft_PowerPoint.png`,windowProps:{title:`CV.pdf`,defaultSize:{x:150,y:150,width:800,height:600}},Component:()=>(0,h.jsx)(X,{filePath:`/assets/cv.pdf`})},{id:`mp3player`,name:`千千靜聽`,icon:`/assets/app/mp3player-removebg-preview.png`,windowProps:{title:`千千靜聽`,defaultSize:{x:180,y:180,width:380,height:470},resizable:!0},Component:ze},{id:`dither-image-viewer`,name:`Instagram CCD`,icon:`/assets/app/B/instagram-old.png`,windowProps:{title:`Instagram CCD`,defaultSize:{x:180,y:180,width:500,height:512},resizable:!1},Component:Ue},{id:`vscode-text-editor`,name:`VSCode Editor`,icon:`/assets/app/vscode-removebg-preview.png`,windowProps:{title:`VSCode Editor`,defaultSize:{x:400,y:100,width:820,height:600},resizable:!0},Component:He},{id:`instant-chat`,name:`即時通`,icon:`/assets/app/yahoo-message-removebg-preview.png`,windowProps:{title:`即時通`,defaultSize:{x:900,y:200,width:350,height:600}},Component:Ve},{id:`open-appstore`,name:`App Store 下載`,icon:`/assets/app/app-store-removebg-preview.png`,windowProps:{title:`App Store 下載`,defaultSize:{x:200,y:120,width:400,height:300},resizable:!0},Component:Z},{id:`gameboy-advance`,name:`Game Boy Advance`,icon:`/assets/gba/gba-interface.png`,windowProps:{title:`Game Boy Advance`,defaultSize:{x:300,y:150,width:500,height:340},resizable:!1},Component:We},{id:`pixel-snapper`,name:`Pixel Snapper`,icon:`/assets/app/pixel-snapper.svg`,windowProps:{title:`Pixel Snapper`,defaultSize:{x:240,y:130,width:720,height:560},resizable:!0},Component:()=>(0,h.jsx)(X,{filePath:`/apps/pixel-me/index.html`,title:`Pixel Snapper`})},{id:`apnea-table`,name:`CO2 耐受表`,icon:`/assets/app/apnea-table.svg`,windowProps:{title:`CO2 耐受表`,defaultSize:{x:280,y:150,width:700,height:560},resizable:!0},Component:()=>(0,h.jsx)(X,{filePath:`/apps/pixel-me/co2table.html`,title:`CO2 耐受表`})},{id:`tools`,name:`Developer Tools`,icon:`/assets/app/B/Toggl.png`,onOpen:()=>{window.location.href=`#/tools`}},{id:`works`,name:`作品集`,icon:`/assets/app/works.svg`,onOpen:()=>{window.location.href=`#/works`}},{id:`finder`,name:`Finder`,icon:`/assets/app/finder-folder.svg`,windowProps:{title:`Finder`,defaultSize:{x:260,y:140,width:380,height:320},resizable:!0},Component:Fe},{id:`locked-folder`,name:`不要打開`,icon:`/assets/app/locked-folder.svg`,windowProps:{title:`不要打開`,defaultSize:{x:260,y:160,width:340,height:240},resizable:!1},Component:Ge}];function Je(){let[t,n]=(0,m.useState)([]),r=(0,m.useRef)(0),[i,a]=(0,m.useState)(re),[o,s]=(0,m.useState)(null),[c,l]=(0,m.useState)(0),[u,d]=(0,m.useState)(null),[f,p]=(0,m.useState)(!1),[g,_]=Ne(),v=I(i),y=e=>{d(e),setTimeout(()=>d(t=>t===e?null:t),2200)},S=()=>{let e=ae(i);a(e),ie(e),y(`桌布：${I(e).name}`)};(0,m.useEffect)(()=>{if(!o)return;let e=e=>{e.target.closest(`.dropdown-menu-container`)||s(null)};return document.addEventListener(`mousedown`,e),window.addEventListener(`blur`,e),()=>{document.removeEventListener(`mousedown`,e),window.removeEventListener(`blur`,e)}},[o]),Ke(()=>{p(!0),y(`CHEAT MODE：桌面翻滾中`),setTimeout(()=>p(!1),1400)});let C=t.filter(e=>!e.minimized).reduce((e,t)=>!e||t.z>e.z?t:e,null)?.id??null,w=e=>n(t=>{let n=t.find(t=>t.id===e);return!n||!n.minimized&&n.id===C?t:(r.current+=1,t.map(t=>t.id===e?{...t,minimized:!1,z:r.current}:t))}),T=e=>{let t=$.find(t=>t.id===e);if(t?.onOpen){t.onOpen();return}n(t=>(r.current+=1,t.some(t=>t.id===e)?t.map(t=>t.id===e?{...t,minimized:!1,z:r.current}:t):[...t,{id:e,minimized:!1,offset:t.length%6*24,z:r.current}]))},E=e=>n(t=>t.filter(t=>t.id!==e)),D=e=>n(t=>t.map(t=>t.id===e?{...t,minimized:!0}:t)),O=e=>{if(e===C)return D(e);w(e)},k=t.map(e=>{let t=$.find(t=>t.id===e.id);return{...e,name:t?.name??e.id,icon:t?.icon}}),A=[{label:`更換桌布（${I(i).name}）`,action:S},{label:`整理桌面圖示`,action:()=>{l(e=>e+1),y(`圖示歸位`)}},{type:`separator`},{label:`開啟螢幕保護程式`,action:()=>_(!0)},{label:`關於這台電腦`,action:()=>T(`wiki`)}];return(0,h.jsxs)(`div`,{className:f?`desktop-barrel-roll`:void 0,style:{position:`relative`,width:`100%`,height:`100%`,overflow:`hidden`},onContextMenu:e=>{e.target.closest(`#desktop-windows-layer, [role="toolbar"]`)||(e.preventDefault(),s({x:e.clientX,y:e.clientY}))},children:[(0,h.jsxs)(e,{children:[(0,h.jsx)(`title`,{children:`adi | Retro OS`}),(0,h.jsx)(`meta`,{name:`description`,content:`A personal website reimagined as a retro desktop OS with windows, apps, and mini-games by adi.`})]}),(0,h.jsx)(ye,{background:v}),(0,h.jsx)(b,{style:{pointerEvents:`none`}}),(0,h.jsx)(x,{}),(0,h.jsxs)(`div`,{style:{position:`relative`,zIndex:10,width:`100%`,height:`100%`},children:[(0,h.jsx)(Ie,{onOpenApp:T,onCloseActive:()=>C&&E(C)}),(0,h.jsx)(de,{apps:$,onOpen:T,layoutVersion:c}),(0,h.jsx)(Ce,{}),(0,h.jsx)(`div`,{id:`desktop-windows-layer`,style:{position:`relative`,zIndex:2},children:t.map(e=>{let t=$.find(t=>t.id===e.id);if(!t)return null;let n=t.Component,{defaultSize:r,...i}=t.windowProps||{},a=r?{...r,x:r.x+e.offset,y:r.y+e.offset}:void 0;return(0,h.jsx)(me,{icon:t.icon,...i,defaultSize:a,zIndex:e.z,minimized:e.minimized,onClose:()=>E(t.id),onMinimize:()=>D(t.id),onFocus:()=>w(t.id),children:(0,h.jsx)(m.Suspense,{fallback:(0,h.jsx)(qe,{}),children:n?(0,h.jsx)(n,{}):t.content})},t.id)})}),(0,h.jsx)(De,{items:k,activeId:C,onSelect:O,onClose:E})]}),o&&(0,h.jsx)(W,{items:A,position:o,onClose:()=>s(null)}),u&&(0,h.jsx)(`div`,{style:{position:`absolute`,left:`50%`,top:52,transform:`translateX(-50%)`,zIndex:1200,padding:`6px 14px`,background:`rgba(23, 28, 36, .88)`,color:`var(--crt-rose-ink)`,boxShadow:`inset 0 0 0 2px var(--crt-rose)`,fontFamily:`'DotGothic16', monospace`,fontSize:12,pointerEvents:`none`},children:u}),g&&(0,h.jsx)(Me,{onExit:()=>_(!1)})]})}function Ye(){return(0,h.jsx)(Le,{children:(0,h.jsx)(d,{children:(0,h.jsx)(w,{children:(0,h.jsx)(O,{children:(0,h.jsx)(Je,{})})})})})}export{Ye as default};
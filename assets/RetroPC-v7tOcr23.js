const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BrowserApp-zVm2L-G2.js","assets/index-BATXPz1e.js","assets/index-f04jDPud.css","assets/MP3Player-CH5xkIZd.js","assets/styled-components.browser.esm-Bj9l15OV.js","assets/Terminal-DeQeWk1M.js","assets/FileSystemContext-CAfAnlwo.js","assets/Terminal-Bqw_XOwU.css","assets/YahooChat-EfIPDXZP.js","assets/YahooChat-PlnlWHmn.css","assets/PDFViewer-FPiwnkS-.js","assets/vscodeEditor-jNRdURb0.js","assets/DitherImageViewer-CJNbQpJq.js","assets/OpenAppStore-eUM6qWbp.js","assets/GameBoyAdvance-Y_2l2QMm.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,o as n,r,t as i,u as a}from"./index-BATXPz1e.js";import{i as o,n as s,t as c}from"./styled-components.browser.esm-Bj9l15OV.js";import{t as l}from"./FileSystemContext-CAfAnlwo.js";import{t as u}from"./lib-CTdKv6yv.js";var d=a(n(),1),f=i(),p=c`
  0% { transform: translate(var(--x-start), var(--y-start)); }
  100% { transform: translate(var(--x-end), var(--y-end)); }
`,m=o.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`,h=o.div`
  position: absolute;
  background-color: #00aaff;
  border-radius: 50%;
  animation: ${p} linear infinite;
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
`,g=e=>{let t=[];for(let n=0;n<e;n++){let e=Math.random()*20+10,r=Math.random()*-e,i=Math.random()*3+2,a=`${Math.random()*100}vw`,o=`${Math.random()*100}vh`,s=`${Math.random()*100}vw`,c=`${Math.random()*100}vh`,l={"--duration":`${e}s`,"--delay":`${r}s`,"--size":`${i}px`,"--x-start":a,"--y-start":o,"--x-end":s,"--y-end":c};t.push((0,f.jsx)(h,{style:l},n))}return t},_=()=>(0,f.jsx)(m,{children:g(20)}),v=s`
  @font-face {
    font-family: 'Cubic_11';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-display: swap;
  }
  body {
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
`;var y=o.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 8px 0 0 16px;
  z-index: 2;
  pointer-events: none;

  & > * {
    pointer-events: auto;
    margin: 0 24px 8px 0;
    width: 80px;
  }
`,b=(0,d.createContext)(()=>{}),x=`/assets/sound-effects/click/base-click.mov`;function S({children:e}){let t=(0,d.useRef)(null),n=(0,d.useRef)(!1),r=()=>{if(!n.current&&t.current){t.current.muted=!0;let e=t.current.play();e!==void 0&&e.then(()=>{t.current.pause(),t.current.currentTime=0,t.current.muted=!1,n.current=!0}).catch(()=>{})}};return(0,f.jsxs)(b.Provider,{value:()=>{try{if(t.current){n.current||r(),t.current.currentTime=0;let e=t.current.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}}catch(e){console.warn(`Sound Play Sync Error (handled):`,e.message)}},children:[(0,f.jsx)(`audio`,{ref:t,src:x,preload:`auto`,onError:e=>console.warn(`Audio load error (handled):`,e)}),e]})}function C(){return(0,d.useContext)(b)}var w=(0,d.createContext)(()=>{}),T={cancel:`/assets/sound-effects/cancel.1.mp3`};function ee({children:e}){let t=(0,d.useRef)({}),n=(0,d.useRef)({}),r=e=>{t.current[e]||(t.current[e]=new Audio(T[e]),t.current[e].preload=`auto`,n.current[e]=!1)},i=e=>{try{r(e);let i=t.current[e];if(i)if(n.current[e]){i.currentTime=0;let e=i.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}else{i.muted=!0;let t=i.play();t!==void 0&&t.then(()=>{i.pause(),i.currentTime=0,i.muted=!1,n.current[e]=!0,i.currentTime=0;let t=i.play();t!==void 0&&t.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}).catch(()=>{i.muted=!1,i.currentTime=0;let e=i.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})})}}catch(e){console.warn(`Sound Play Sync Error (handled):`,e.message)}};return(0,f.jsx)(w.Provider,{value:{playCancel:()=>i(`cancel`)},children:e})}function te(){return(0,d.useContext)(w)}var E=o.button`
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
`,D=o.img`
  width: 48px;
  height: 48px;
`,O=o.span`
  color: var(--crt-rose-ink, #fdf4e6);
  text-shadow: 1px 1px 2px black;
  font-family: 'DotGothic16', monospace;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  word-break: break-word;
  min-width: 0;
`;function k({icon:e,label:t,onDoubleClick:n,disabled:r=!1}){let[i,a]=(0,d.useState)(!1),o=C(),s=()=>{!r&&n&&n()},c=()=>{if(!r){a(!0);try{o()}catch(e){console.warn(`Click sound error (handled):`,e.message)}typeof window<`u`&&window.innerWidth<=768&&n&&n()}};return(0,f.jsxs)(E,{onDoubleClick:s,onClick:c,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&!r&&(e.preventDefault(),c(),s())},onBlur:()=>{a(!1)},disabled:r,selected:i,"aria-label":t,children:[(0,f.jsx)(D,{src:e,alt:``,width:`48`,height:`48`,"aria-hidden":`true`}),(0,f.jsx)(O,{children:t})]})}var A=o.div`
  background: var(--crt-cream);
  box-shadow: inset 0 0 0 2px var(--crt-line), .22em .26em 0 rgba(0, 0, 0, .34);
  padding: 0;
  overflow: hidden;
  position: relative;
`,j=o.div`
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
`,M=o.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`,N=o.div`
  display: flex;
  align-items: center;
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
`,P=o.div`
  padding: 10px 8px;
  height: calc(100% - 30px);
  max-height: calc(100% - 30px);
  overflow-y: hidden;
  overflow-x: hidden;
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
`,F=({icon:e,title:t,children:n,onClose:r,onFocus:i,defaultSize:a={x:100,y:100,width:320,height:200}})=>{let o=C(),{playCancel:s}=te(),c=typeof window<`u`&&window.innerWidth<=768;return(0,f.jsx)(u,{default:c?{x:10,y:38,width:Math.min(window.innerWidth-20,380),height:Math.min(window.innerHeight-80,520)}:a,position:c?{x:10,y:38}:void 0,size:c?{width:Math.min(window.innerWidth-20,380),height:Math.min(window.innerHeight-80,520)}:void 0,minWidth:200,minHeight:100,disableDragging:c,enableResizing:!c,dragHandleClassName:`window-title-bar`,onDragStart:()=>i&&i(),children:(0,f.jsxs)(A,{style:{width:`100%`,height:`100%`},onMouseDown:()=>i&&i(),children:[(0,f.jsxs)(j,{className:`window-title-bar`,onMouseDown:()=>{try{o()}catch(e){console.warn(`Title bar click sound error (handled):`,e.message)}},children:[(0,f.jsxs)(M,{children:[e&&(0,f.jsx)(`img`,{src:e,alt:``,width:`18`,height:`18`,"aria-hidden":`true`,style:{marginRight:8,verticalAlign:`middle`}}),t]}),(0,f.jsx)(N,{children:(0,f.jsx)(`button`,{"aria-label":`Close ${t} window`,onClick:()=>{try{s()}catch(e){console.warn(`Close button sound error (handled):`,e.message)}r&&r()},children:`✕`})})]}),(0,f.jsx)(P,{children:n})]})})},I=o.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`,L=o.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.1) saturate(1.2);
`,R=o.div`
  width: 100%;
  height: 100%;
  background-image: url(${e=>e.src});
  background-size: cover;
  background-position: center;
  filter: brightness(0.9) contrast(1.1);
`,z=({background:e})=>e?(0,f.jsxs)(I,{children:[e.type===`video`&&(0,f.jsx)(L,{src:e.src,autoPlay:!0,loop:!0,muted:!0,playsInline:!0}),e.type===`image`&&(0,f.jsx)(R,{src:e.src})]}):null;o.div`
  position: fixed;
  left: 0; bottom: 0;
  width: 100vw;
  height: 100px;
  background: repeating-linear-gradient(
    to right,
    #222 0 8px, #333 8px 16px
  ), linear-gradient(180deg, #444 60%, #222 100%);
  border-top: 2px solid #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 0 32px 0 #000a;
`;var B=c`
  0% { transform: translateX(0); }
  20% { transform: translateX(40px); }
  50% { transform: translateX(0); }
  70% { transform: translateX(-40px); }
  100% { transform: translateX(0); }
`;o.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${B} 8s linear infinite;
  cursor: pointer;
`,o.div`
  position: absolute;
  left: 50%; top: -24px;
  transform: translateX(-50%);
  font-size: 24px;
  opacity: ${e=>+!!e.show};
  transition: opacity 0.3s;
  pointer-events: none;
`,o.div`
  font-family: 'VT323', 'Consolas', 'monospace';
  color: #fff;
  font-size: 1.2rem;
  margin-top: 2px;
  text-shadow: 0 0 2px #000, 0 0 8px #fff;
`,o.div`
  position: absolute;
  right: 32px;
  bottom: 18px;
  font-family: 'VT323', 'Consolas', 'monospace';
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 8px #fff, 0 0 2px #000;
  letter-spacing: 2px;
  z-index: 10;
`;var V=(0,d.createContext)(),ne=()=>(0,d.useContext)(V),H=({children:e})=>{let[t,n]=(0,d.useState)([]);return(0,f.jsx)(V.Provider,{value:{openApps:t,openApp:e=>{n(t=>t.find(t=>t.id===e.id)?t:[...t,e])},closeApp:e=>{n(t=>t.filter(t=>t.id!==e))}},children:e})},U=a(e(),1),W=o.div.attrs({className:`dropdown-menu-container`})`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #000;
  padding: 5px ;
  min-width: 200px;
  z-index: 1000;
  font-family: 'Cubic_11', sans-serif;
  font-size: 15px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`,G=o.div`
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
`,K=o.div`
  height: 1px;
  border-top: 1px dotted #888;
  margin: 5px 4px;
`,q=({items:e,position:t,onClose:n})=>{let[r,i]=d.useState(-1),a=e=>{e.action&&e.action(),n()};return U.createPortal((0,f.jsx)(W,{style:{top:t.y,left:t.x},children:e.map((e,t)=>e.type===`separator`?(0,f.jsx)(K,{},t):(0,f.jsx)(G,{disabled:e.disabled,onClick:()=>a(e),onMouseEnter:()=>i(t),onMouseLeave:()=>i(-1),isHovered:!e.disabled&&r===t,children:e.label},t))}),document.body)};function J({onOpenApp:e}){let[t,n]=(0,d.useState)(new Date),[r,i]=(0,d.useState)(null),[a,o]=(0,d.useState)({x:0,y:0}),s=(0,d.useRef)(null),c=(0,d.useRef)(null),l=(0,d.useRef)(null),u=e=>{e.current&&(e.current.currentTime=0,e.current.play().catch(e=>console.error(`Audio play failed:`,e)))},p=()=>{r&&(u(l),i(null))},m={icon:[{label:`關於這個 App`,action:()=>e(`about`)},{type:`separator`},{label:`設定...`,disabled:!0},{label:`登出`,disabled:!0,action:()=>alert(`登出功能待開發！`)}],檔案:[{label:`New Finder Window`,action:()=>e(`browser`)},{label:`New Terminal`,action:()=>e(`terminal`)},{type:`separator`},{label:`Move to Trash`,disabled:!0},{label:`Empty Trash...`,action:()=>alert(`垃圾桶已清空！`)},{type:`separator`},{label:`Close`,action:()=>alert(`關閉視窗功能待開發！`)}],編輯:[{label:`Undo`,disabled:!0},{label:`Redo`,disabled:!0}],檢視:[{label:`Zoom In`,disabled:!0},{label:`Zoom Out`,disabled:!0}],前往:[{label:`Open Terminal`,action:()=>e(`terminal`)}],幫助:[{label:`顯示幫助訊息`,action:()=>{alert(`這是一個自訂的幫助訊息！`)}}]};(0,d.useEffect)(()=>{let e=setInterval(()=>n(new Date),1e3),t=e=>{s.current&&s.current.contains(e.target)||e.target.closest(`.dropdown-menu-container`)||p()};return document.addEventListener(`mousedown`,t),()=>{clearInterval(e),document.removeEventListener(`mousedown`,t)}},[r]);let h=(e,t)=>{if(r===e)p();else{u(c);let n=t.currentTarget.getBoundingClientRect();o({x:n.left,y:n.bottom}),i(e)}},g=[`日`,`一`,`二`,`三`,`四`,`五`,`六`][t.getDay()],_=`${t.getHours().toString().padStart(2,`0`)}:${t.getMinutes().toString().padStart(2,`0`)}`,v={position:`relative`,width:`100%`,height:30,flex:`0 0 auto`,background:`linear-gradient(180deg, var(--crt-rose) 0%, var(--crt-rose) 52%, var(--crt-rose-lo) 100%)`,boxShadow:`inset 0 0 0 2px var(--crt-line)`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,fontFamily:`'DotGothic16', 'Cubic_11', monospace`,fontSize:14,color:`var(--crt-rose-ink)`,zIndex:999},y={display:`flex`,alignItems:`center`,gap:18,marginLeft:16},b={fontSize:20,fontWeight:`bold`,marginRight:5,width:20,height:20},x=e=>({cursor:`pointer`,padding:`3px 7px`,transition:`background 0.2s`,userSelect:`none`,backgroundColor:r===e?`rgba(0,0,0,.24)`:`transparent`}),S={display:`flex`,alignItems:`center`,gap:12,marginRight:18},C={fontSize:14};return(0,f.jsxs)(`div`,{style:v,ref:s,children:[(0,f.jsx)(`audio`,{ref:c,src:`/assets/sound-effects/select.wav`,preload:`auto`}),(0,f.jsx)(`audio`,{ref:l,src:`/assets/sound-effects/select.wav`,preload:`auto`}),(0,f.jsx)(`div`,{style:y,children:Object.keys(m).map(e=>e===`icon`?(0,f.jsx)(`img`,{src:`/assets/gpt_banana_icon.webp`,alt:`banana`,style:{...b,cursor:`pointer`,padding:`2px`,backgroundColor:r===e?`rgba(0,0,0,.24)`:`transparent`},onClick:t=>h(e,t)},e):(0,f.jsx)(`span`,{className:`mac-menu-item`,style:{...x(e),display:typeof window<`u`&&window.innerWidth<=768&&e!==`檔案`?`none`:`inline-block`},onClick:t=>h(e,t),children:e},e))}),r&&(0,f.jsx)(q,{items:m[r],position:a,onClose:p}),(0,f.jsxs)(`div`,{style:S,children:[(0,f.jsx)(`span`,{role:`img`,"aria-label":`volume`,children:`🔊`}),(0,f.jsx)(`span`,{style:C,children:`週${g} ${t.getMonth()+1}月${t.getDate()}日`}),(0,f.jsx)(`span`,{style:C,children:_})]})]})}var Y=class extends d.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){console.error(`ErrorBoundary caught an error:`,e,t),e.message&&e.message.includes(`play`)&&setTimeout(()=>{this.setState({hasError:!1,error:null})},100)}render(){return this.state.hasError?this.state.error&&this.state.error.message&&this.state.error.message.includes(`play`)?this.props.children:(0,f.jsxs)(`div`,{style:{padding:`20px`,textAlign:`center`,background:`#f8f9fa`,border:`1px solid #dee2e6`,borderRadius:`8px`,margin:`20px`},children:[(0,f.jsx)(`h2`,{style:{color:`#6c757d`},children:`出現了一些問題`}),(0,f.jsx)(`p`,{style:{color:`#868e96`},children:`請重新整理頁面或聯繫管理員`}),(0,f.jsx)(`button`,{onClick:()=>window.location.reload(),style:{padding:`8px 16px`,background:`#007bff`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`},children:`重新整理`})]}):this.props.children}},X=(0,d.lazy)(()=>r(()=>import(`./BrowserApp-zVm2L-G2.js`),__vite__mapDeps([0,1,2]))),Z=(0,d.lazy)(()=>r(()=>import(`./MP3Player-CH5xkIZd.js`),__vite__mapDeps([3,1,2,4]))),re=(0,d.lazy)(()=>r(()=>import(`./Terminal-DeQeWk1M.js`),__vite__mapDeps([5,1,2,6,7]))),ie=(0,d.lazy)(()=>r(()=>import(`./YahooChat-EfIPDXZP.js`),__vite__mapDeps([8,1,2,9]))),ae=(0,d.lazy)(()=>r(()=>import(`./PDFViewer-FPiwnkS-.js`),__vite__mapDeps([10,1,2]))),oe=(0,d.lazy)(()=>r(()=>import(`./vscodeEditor-jNRdURb0.js`),__vite__mapDeps([11,1,2,4]))),se=(0,d.lazy)(()=>r(()=>import(`./DitherImageViewer-CJNbQpJq.js`),__vite__mapDeps([12,1,2,4]))),Q=(0,d.lazy)(()=>r(()=>import(`./OpenAppStore-eUM6qWbp.js`),__vite__mapDeps([13,1,2]))),ce=(0,d.lazy)(()=>r(()=>import(`./GameBoyAdvance-Y_2l2QMm.js`),__vite__mapDeps([14,1,2,4]))),le=()=>(0,f.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justify:`center`,height:`100%`,width:`100%`,background:`#f0f0f0`,color:`#333`,fontFamily:`monospace`,fontSize:`14px`,padding:`20px`},children:`Loading application...`}),$=[{id:`wiki`,name:`wiki`,icon:`/assets/app/B/Wikipedia.png`,windowProps:{title:`wiki`,defaultSize:{x:200,y:120,width:400,height:500}},content:(0,f.jsxs)(`div`,{style:{padding:`16px`,lineHeight:1.8,fontSize:`1.1em`,maxHeight:`100%`,overflowY:`auto`,boxSizing:`border-box`,background:`#fff`,borderRadius:`8px`,boxShadow:`0 2px 8px rgba(0,0,0,0.08)`},children:[(0,f.jsx)(`h2`,{style:{marginBottom:`8px`,color:`#2d72d9`},children:`Welcome to adi.tw. v1`}),(0,f.jsx)(`div`,{style:{marginBottom:`12px`,color:`#d9534f`,fontWeight:`bold`},children:`公告：即時通功能可以留言！我會看到！`}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{style:{fontWeight:`bold`},children:`feature:`}),(0,f.jsxs)(`ol`,{style:{margin:`8px 0 0 24px`},children:[(0,f.jsx)(`li`,{children:`即時通可以留言!!`}),(0,f.jsx)(`li`,{children:`instagram 盡量還原我喜歡的ccd風格, 原本想說要做無名小站`}),(0,f.jsx)(`li`,{children:`cv.pdf, 是我的履歷有興趣可以聯絡我 kokp520@gmail.com`}),(0,f.jsx)(`li`,{children:`App store 目前還沒做其他功能只放連結！`})]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{style:{fontWeight:`bold`},children:`todo：`}),(0,f.jsxs)(`ol`,{style:{margin:`8px 0 0 24px`},children:[(0,f.jsx)(`li`,{children:`[feature]yahoo即時通 storage狀態功能`}),(0,f.jsx)(`li`,{children:`[feature]finder feature`}),(0,f.jsx)(`li`,{children:`[feature]GBA game 做實際小遊戲，頁面調整`}),(0,f.jsx)(`li`,{children:`[feature]chrome 多做網頁的功能`})]})]})]})},{id:`browser`,name:`Chrome`,icon:`/assets/app/B/Google_Chrome.png`,windowProps:{title:`Chrome`,defaultSize:{x:220,y:120,width:650,height:540}},Component:X},{id:`terminal`,name:`Terminal`,icon:`/assets/app/terminal-removebg-preview.png`,windowProps:{title:`Terminal`,defaultSize:{x:100,y:100,width:700,height:350}},Component:re},{id:`cv`,name:`CV.pdf`,icon:`/assets/app/B/Microsoft_PowerPoint.png`,windowProps:{title:`CV.pdf`,defaultSize:{x:150,y:150,width:800,height:600}},Component:()=>(0,f.jsx)(ae,{filePath:`/assets/cv.pdf`})},{id:`mp3player`,name:`千千靜聽`,icon:`/assets/app/mp3player-removebg-preview.png`,windowProps:{title:`千千靜聽`,defaultSize:{x:180,y:180,width:380,height:330},resizable:!1},Component:Z},{id:`dither-image-viewer`,name:`Instagram CCD`,icon:`/assets/app/B/instagram-old.png`,windowProps:{title:`Instagram CCD`,defaultSize:{x:180,y:180,width:500,height:490},resizable:!1},Component:se},{id:`vscode-text-editor`,name:`VSCode Editor`,icon:`/assets/app/vscode-removebg-preview.png`,windowProps:{title:`VSCode Editor`,defaultSize:{x:400,y:100,width:820,height:600},resizable:!0},Component:oe},{id:`instant-chat`,name:`即時通`,icon:`/assets/app/yahoo-message-removebg-preview.png`,windowProps:{title:`即時通`,defaultSize:{x:900,y:200,width:350,height:600}},Component:ie},{id:`open-appstore`,name:`App Store 下載`,icon:`/assets/app/app-store-removebg-preview.png`,windowProps:{title:`App Store 下載`,defaultSize:{x:200,y:120,width:400,height:300},resizable:!0},Component:Q},{id:`gameboy-advance`,name:`Game Boy Advance`,icon:`/assets/gba/gba-interface.png`,windowProps:{title:`Game Boy Advance`,defaultSize:{x:300,y:150,width:500,height:340},resizable:!1},Component:ce},{id:`tools`,name:`Developer Tools`,icon:`/assets/app/B/Toggl.png`,onOpen:()=>{window.location.href=`#/tools`}}];function ue(){let[e,n]=(0,d.useState)({}),[r,i]=(0,d.useState)(null),{openApp:a,closeApp:o}=ne(),[s,c]=(0,d.useState)({type:`video`,src:`/assets/wallpaper-compressed.mp4`}),l=e=>{let t=$.find(t=>t.id===e);if(t?.onOpen){t.onOpen();return}n(t=>({...t,[e]:!0})),i(e),t&&a({id:t.id,name:t.name,icon:t.icon})},u=e=>{n(t=>({...t,[e]:!1})),o(e),r===e&&i(null)},p=$.filter(t=>e[t.id]).sort(e=>e.id===r?1:-1);return(0,f.jsxs)(`div`,{style:{position:`relative`,width:`100%`,height:`100%`,overflow:`hidden`},children:[(0,f.jsxs)(t,{children:[(0,f.jsx)(`title`,{children:`adi | Retro OS`}),(0,f.jsx)(`meta`,{name:`description`,content:`A personal website reimagined as a retro desktop OS with windows, apps, and mini-games by adi.`})]}),(0,f.jsx)(z,{background:s}),(0,f.jsx)(_,{style:{pointerEvents:`none`}}),(0,f.jsx)(v,{}),(0,f.jsxs)(`div`,{style:{position:`relative`,zIndex:10,width:`100%`,height:`100%`},children:[(0,f.jsx)(J,{onOpenApp:l}),(0,f.jsx)(y,{style:{zIndex:1},children:$.map(e=>(0,f.jsx)(k,{icon:e.icon,label:e.name,onDoubleClick:()=>l(e.id),disabled:e.disabled},e.id))}),(0,f.jsx)(`div`,{style:{position:`relative`,zIndex:2},children:p.map(e=>{let t=e.Component;return(0,f.jsx)(F,{icon:e.icon,...e.windowProps,onClose:()=>u(e.id),onFocus:()=>i(e.id),children:(0,f.jsx)(d.Suspense,{fallback:(0,f.jsx)(le,{}),children:t?(0,f.jsx)(t,{}):e.content})},e.id)})})]})]})}function de(){return(0,f.jsx)(Y,{children:(0,f.jsx)(l,{children:(0,f.jsx)(S,{children:(0,f.jsx)(ee,{children:(0,f.jsx)(H,{children:(0,f.jsx)(ue,{})})})})})})}export{de as default};
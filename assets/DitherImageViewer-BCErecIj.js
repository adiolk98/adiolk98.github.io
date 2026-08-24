import{d as e,s as t,t as n}from"./index-cNFPjMuU.js";import{i as r,n as i}from"./styled-components.browser.esm-DBSIxPlw.js";var a=e(t(),1),o=n(),s=i`
  @font-face {
    font-family: 'Cubic';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  body, * {
    font-family: 'Cubic', 'monospace', Arial, sans-serif !important;
  }
`,c=r.div`
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border: 3px solid #333;
  border-radius: 12px;
  width: 480px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.4),
    inset 0 2px 0 rgba(255,255,255,0.1),
    inset 0 -2px 0 rgba(0,0,0,0.3),
    0 0 20px rgba(0,0,0,0.2);
  
  /* Vintage camera texture */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 1px, transparent 1px),
      repeating-linear-gradient(
        45deg,
        transparent 0px,
        transparent 2px,
        rgba(255,255,255,0.02) 2px,
        rgba(255,255,255,0.02) 4px
      );
    border-radius: 12px;
  }
  
  /* Camera brand logo area */
  &:after {
    content: 'ADI CAM';
    position: absolute;
    top: 15px;
    left: 20px;
    color: #888;
    font-size: 8px;
    font-family: 'Cubic', monospace;
    font-weight: bold;
    letter-spacing: 1px;
    z-index: 10;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
`,l=r.div`
  width: 400px;
  height: 260px;
  background: #1a1a1a;
  border: 4px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.5),
    0 2px 4px rgba(0,0,0,0.3);
  
  &:before {
    content: '';
    position: absolute;
    inset: 4px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 2px,
      rgba(0,255,0,0.03) 2px,
      rgba(0,255,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 60%,
      rgba(0,0,0,0.2) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
`,u=r.img`
  max-width: 95%;
  max-height: 95%;
  image-rendering: pixelated;
  filter: grayscale(1) contrast(1.8) brightness(1.2);
  /* CCD 螢幕效果 */
  mix-blend-mode: screen;
  position: relative;
  z-index: 3;
  object-fit: contain;
  border-radius: 2px;
`,d=r.div`
  color: #0f0;
  background: linear-gradient(145deg, #222, #111);
  border: 1px solid #444;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 11px;
  margin-bottom: 12px;
  letter-spacing: 1px;
  font-family: 'Cubic', monospace;
  position: relative;
  z-index: 2;
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1);
  max-width: 380px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 0 4px #0f0;
  
  /* Add LCD display effect */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 1px,
      rgba(0,255,0,0.1) 1px,
      rgba(0,255,0,0.1) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`,f=r.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: center;
`,p=r.div`
  background: linear-gradient(145deg, #333, #111);
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 8px 0;
  text-align: center;
  position: relative;
  z-index: 2;
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1);
  
  /* Add brushed metal texture */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 1px,
      rgba(255,255,255,0.03) 1px,
      rgba(255,255,255,0.03) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`,m=r.div`
  background: linear-gradient(145deg, #444, #222);
  border: 1px solid #666;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  font-family: 'Cubic', monospace;
  color: #0f0;
  margin-bottom: 12px;
  margin-top: 8px;
  position: relative;
  z-index: 2;
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.3),
    0 1px 0 rgba(255,255,255,0.1);
  max-width: 400px;
  text-align: center;
  text-shadow: 0 0 4px #0f0;
  
  /* Add vintage LED display effect */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 1px,
      rgba(0,255,0,0.1) 1px,
      rgba(0,255,0,0.1) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`,h=r.div`
  display: flex;
  gap: 6px;
  margin: 12px;
  padding: 8px 12px;
  background: linear-gradient(145deg, #333, #111);
  border: 2px solid #555;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 3px 6px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.5);
  
  /* Add vintage camera control panel texture */
  &:before {
    content: '';
    position: absolute;
    inset: 2px;
    opacity: 0.1;
    pointer-events: none;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px),
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 3px,
        rgba(255,255,255,0.05) 3px,
        rgba(255,255,255,0.05) 6px
      );
    z-index: 0;
    border-radius: 6px;
  }
  
  /* Add model number */
  &:after {
    content: 'DCV-2000';
    position: absolute;
    bottom: -18px;
    right: 0;
    color: #666;
    font-size: 7px;
    font-family: 'Cubic', monospace;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
`,g=r.button`
  width: 28px;
  height: 24px;
  background: linear-gradient(145deg, #555, #333);
  border: 2px solid #777;
  border-radius: 4px;
  color: #ccc;
  font-size: 9px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  z-index: 1;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  
  &:active {
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 1px 2px rgba(0,0,0,0.2);
    transform: translateY(1px);
    background: linear-gradient(145deg, #444, #222);
  }
  
  &:hover:not(.active) {
    background: linear-gradient(145deg, #666, #444);
    border-color: #888;
    color: #fff;
  }
  
  &.active {
    background: linear-gradient(145deg, #0a5c2e, #064420);
    color: #0f0;
    border-color: #0a5c2e;
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 0 8px rgba(0,255,0,0.3);
    text-shadow: 0 0 4px #0f0;
  }
  
  /* Add vintage button texture */
  &:before {
    content: '';
    position: absolute;
    inset: 1px;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 1px,
      rgba(255,255,255,0.05) 1px,
      rgba(255,255,255,0.05) 2px
    );
    border-radius: 2px;
    pointer-events: none;
  }
`,_=r.button`
  width: 36px;
  height: 28px;
  background: linear-gradient(145deg, #444, #222);
  border: 2px solid #666;
  border-radius: 6px;
  color: #ccc;
  font-size: 12px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  
  &:active:not(:disabled) {
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 1px 2px rgba(0,0,0,0.2);
    transform: translateY(1px);
    background: linear-gradient(145deg, #333, #111);
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(145deg, #555, #333);
    border-color: #777;
    color: #fff;
  }
  
  &:disabled {
    background: linear-gradient(145deg, #333, #222);
    color: #555;
    cursor: not-allowed;
    box-shadow: 
      inset 0 1px 2px rgba(0,0,0,0.2),
      0 1px 0 rgba(255,255,255,0.05);
    border-color: #444;
  }
  
  /* Add vintage button texture */
  &:before {
    content: '';
    position: absolute;
    inset: 1px;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 1px,
      rgba(255,255,255,0.03) 1px,
      rgba(255,255,255,0.03) 2px
    );
    border-radius: 4px;
    pointer-events: none;
  }
`,v=[{name:`camera-1.jpg`,path:`/assets/photo/camera-1.jpg`},{name:`camera-2.jpg`,path:`/assets/photo/camera-2.jpg`},{name:`camera-3.jpg`,path:`/assets/photo/camera-3.jpg`},{name:`camera-4.jpg`,path:`/assets/photo/camera-4.jpg`},{name:`camera-5.jpg`,path:`/assets/photo/camera-5.jpg`},{name:`camera-6.jpg`,path:`/assets/photo/camera-6.jpg`},{name:`camera-7.jpg`,path:`/assets/photo/camera-7.jpg`},{name:`camera-8.jpg`,path:`/assets/photo/camera-8.jpg`},{name:`camera-9.jpg`,path:`/assets/photo/camera-9.jpg`},{name:`camera-10.jpg`,path:`/assets/photo/camera-10.jpg`},{name:`camera-11.jpg`,path:`/assets/photo/camera-11.jpg`},{name:`camera-12.jpg`,path:`/assets/photo/camera-12.jpg`},{name:`camera-13.jpg`,path:`/assets/photo/camera-13.jpg`},{name:`carry-cat.jpg`,path:`/assets/photo/carry-cat.jpg`},{name:`chu-with-me.jpg`,path:`/assets/photo/chu-with-me.jpg`},{name:`smile.jpg`,path:`/assets/photo/smile.jpg`},{name:`good-cat.png`,path:`/assets/photo/good-cat.png`},{name:`adi.jpg`,path:`/assets/photo/adi.jpg`},{name:`adi_logo_black.png`,path:`/assets/photo/adi_logo_black.png`},{name:`gpt_banana_icon.webp`,path:`/assets/photo/gpt_banana_icon.webp`},{name:`20250402-gpt-1.webp`,path:`/assets/photo/20250402-gpt-1.webp`},{name:`website.webp`,path:`/assets/photo/website.webp`},{name:`family.jpg`,path:`/assets/photo/family.jpg`}],y=()=>{let[e,t]=(0,a.useState)([]),[n,r]=(0,a.useState)(0),[i,y]=(0,a.useState)(`normal`),[b,x]=(0,a.useState)(1),[S,C]=(0,a.useState)(!0),[w,T]=(0,a.useState)(!1),[E,D]=(0,a.useState)(0),O=e[n]||v[0];(0,a.useEffect)(()=>{(async()=>{try{C(!0),D(0);let e=[];for(let t=0;t<v.length;t++){let n=v[t];try{await new Promise((t,r)=>{let i=new Image;i.onload=()=>{e.push(n),D(e.length),t()},i.onerror=r,i.src=n.path})}catch{console.warn(`Failed to load image: ${n.name}`)}}t(e.length>0?e:v)}catch(e){console.error(`Error loading images:`,e),t(v)}finally{C(!1)}})()},[]);let k=()=>{T(!1)},A=()=>{T(!1),console.error(`Failed to display image: ${O.name}`)},j=()=>{T(!0)},M=()=>{e.length>0&&r(t=>(t-1+e.length)%e.length)},N=()=>{e.length>0&&r(t=>(t+1)%e.length)},P=()=>r(0),F=()=>r(Math.max(0,e.length-1)),I=e=>{y(e)};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{}),(0,o.jsxs)(c,{children:[(0,o.jsx)(m,{children:S?`📡 LOADING: ${E}/${v.length} IMAGES...`:`📷 IMG: ${n+1}/${e.length} | 🔍 ZOOM: ${Math.round(b*100)}% | 🎨 MODE: ${i.toUpperCase()}`}),(0,o.jsxs)(h,{children:[(0,o.jsx)(g,{className:i===`normal`?`active`:``,onClick:()=>I(`normal`),title:`Normal`,children:`N`}),(0,o.jsx)(g,{className:i===`invert`?`active`:``,onClick:()=>I(`invert`),title:`Invert`,children:`I`}),(0,o.jsx)(g,{className:i===`contrast`?`active`:``,onClick:()=>I(`contrast`),title:`Contrast`,children:`C`}),(0,o.jsx)(g,{className:i===`blur`?`active`:``,onClick:()=>I(`blur`),title:`Blur`,children:`B`}),(0,o.jsx)(g,{onClick:()=>x(e=>Math.min(e+.25,3)),title:`Zoom In`,children:`+`}),(0,o.jsx)(g,{onClick:()=>x(e=>Math.max(e-.25,.25)),title:`Zoom Out`,children:`-`})]}),(0,o.jsx)(l,{children:S?(0,o.jsxs)(`div`,{style:{color:`#0f0`,fontSize:`12px`,textAlign:`center`,fontFamily:`Cubic, monospace`},children:[`📡 SCANNING PHOTOS...`,(0,o.jsx)(`br`,{}),E,`/`,v.length]}):e.length===0?(0,o.jsx)(`div`,{style:{color:`#f00`,fontSize:`12px`,fontFamily:`Cubic, monospace`},children:`❌ NO IMAGES FOUND`}):(0,o.jsxs)(o.Fragment,{children:[w&&(0,o.jsx)(`div`,{style:{position:`absolute`,top:`50%`,left:`50%`,transform:`translate(-50%, -50%)`,color:`#0f0`,fontSize:`11px`,fontFamily:`Cubic, monospace`,zIndex:4},children:`⏳ LOADING IMAGE...`}),(0,o.jsx)(u,{src:O.path,alt:O.name,onLoad:k,onError:A,onLoadStart:j,style:{filter:(()=>{switch(i){case`invert`:return`grayscale(1) contrast(1.8) brightness(1.2) invert(1)`;case`contrast`:return`grayscale(1) contrast(3) brightness(1.3)`;case`blur`:return`grayscale(1) contrast(1.8) brightness(1.2) blur(1px)`;default:return`grayscale(1) contrast(1.8) brightness(1.2)`}})(),transform:`scale(${b})`,transformOrigin:`center`,opacity:w?.3:1}})]})}),(0,o.jsx)(d,{children:S?`📡 SCANNING...`:e.length===0?`❌ NO IMAGES`:`📁 ${O.name}`}),(0,o.jsxs)(p,{children:[(0,o.jsx)(`div`,{style:{fontSize:`6px`,color:`#999`,marginBottom:`2px`},children:`DIGITAL CAMERA`}),(0,o.jsx)(`div`,{style:{fontSize:`5px`,color:`#666`},children:`ADI Corporation • Made in Taiwan`})]}),(0,o.jsxs)(f,{children:[(0,o.jsx)(_,{onClick:P,disabled:S||e.length===0||n===0,title:`First`,children:`|◄`}),(0,o.jsx)(_,{onClick:M,disabled:S||e.length===0||n===0,title:`Previous`,children:`◄`}),(0,o.jsx)(_,{onClick:N,disabled:S||e.length===0||n===e.length-1,title:`Next`,children:`►`}),(0,o.jsx)(_,{onClick:F,disabled:S||e.length===0||n===e.length-1,title:`Last`,children:`►|`})]})]})]})};export{y as default};
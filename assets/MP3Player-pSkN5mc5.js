import{d as e,s as t,t as n}from"./index-COBtfL5P.js";import{i as r,n as i}from"./styled-components.browser.esm-DII11mJo.js";var a=e(t(),1),o=n(),s=i`
  @font-face {
    font-family: 'Cubic';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  body, * {
    font-family: 'Cubic', 'monospace', Arial, sans-serif !important;
  }
`,c=`
  repeating-linear-gradient(
    45deg,
    #000 0px, #000 1px,
    #fff 1px, #fff 2px,
    #000 2px, #000 3px,
    #fff 3px, #fff 4px
  )
`,l=r.div`
  background: #fff;
  border: 3px solid #000;
  width: 360px;
  height: 280px;
  display: flex;
  flex-direction: column;
  user-select: none;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
  box-shadow: 
    inset -2px -2px 0 #808080,
    inset 2px 2px 0 #ffffff;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
    background: ${c};
  }
`,u=r.div`
  background: #000;
  border: 3px inset #c0c0c0;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin: 4px;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.4;
    pointer-events: none;
    background: ${c};
    z-index: 0;
  }
`,d=r.div`
  color: #0f0;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  font-family: 'Cubic', monospace;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  width: 320px;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 2px #0f0;
`,f=r.div`
  color: #0f0;
  font-size: 10px;
  font-family: 'Cubic', monospace;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 2px #0f0;
`,p=r.div`
  display: flex;
  align-items: end;
  gap: 1px;
  height: 20px;
  margin-top: 4px;
  position: relative;
  z-index: 1;
`,m=r.div`
  width: 2px;
  background: #0f0;
  transition: height 0.1s ease;
  box-shadow: 0 0 2px #0f0;
`,h=r.div`
  display: flex;
  gap: 4px;
  margin: 8px 0;
  justify-content: center;
  position: relative;
  z-index: 1;
`,g=r.button`
  width: 24px;
  height: 18px;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  color: #000;
  font-size: 8px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  transition: none;
  position: relative;
  z-index: 1;
  
  &:active {
    border: 2px inset #c0c0c0;
    background: #a0a0a0;
  }
  
  &:hover {
    background: #d0d0d0;
  }
  
  &.active {
    border: 2px inset #c0c0c0;
    background: #808080;
    color: #fff;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    background: ${c};
    z-index: 0;
  }
`,_=r.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  padding: 8px;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.05;
    pointer-events: none;
    background: ${c};
    z-index: 0;
  }
`,v=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  position: relative;
  z-index: 1;
`,y=r.button`
  width: 32px;
  height: 24px;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  color: #000;
  font-size: 11px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none;
  position: relative;
  z-index: 1;
  image-rendering: pixelated;
  
  &:active {
    border: 2px inset #c0c0c0;
    background: #a0a0a0;
  }
  
  &:hover {
    background: #d0d0d0;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    background: ${c};
    z-index: 0;
  }
`,b=r.div`
  width: 320px;
  height: 12px;
  background: #000;
  border: 2px inset #c0c0c0;
  margin: 4px 0;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.3;
    pointer-events: none;
    background: ${c};
    z-index: 0;
  }
`,x=r.div`
  height: 100%;
  background: #0f0;
  transition: none;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 2px #0f0;
`,S=r.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 4px 0;
  position: relative;
  z-index: 1;
`,C=r.input`
  width: 60px;
  height: 6px;
  accent-color: #000;
  background: #c0c0c0;
  border: 1px inset #c0c0c0;
`,w=[{name:`周杰倫-稻香`,path:`/assets/mp3/Jay_chou-1.mp3`},{name:`Save as-tobylane`,path:`/assets/mp3/Save-as-tobylane.mp3`},{name:`錄音_0477（未命名）`,path:`/assets/mp3/Save-as-tobylane.mp3`}];function T(e){if(isNaN(e))return`00:00`;let t=Math.floor(e/60),n=Math.floor(e%60);return`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`}var E=()=>{let[e,t]=(0,a.useState)(0),[n,r]=(0,a.useState)(!1),[i,c]=(0,a.useState)(0),[E,D]=(0,a.useState)(0),[O,k]=(0,a.useState)(0),[A,j]=(0,a.useState)(.7),[M,N]=(0,a.useState)(`normal`),[P,F]=(0,a.useState)(!0),[I,L]=(0,a.useState)(Array(16).fill(0)),R=(0,a.useRef)(null),z=w[e];(0,a.useEffect)(()=>{if(n&&P){let e=setInterval(()=>{L(e=>e.map(()=>Math.random()*20))},100);return()=>clearInterval(e)}else L(Array(16).fill(0))},[n,P]),(0,a.useEffect)(()=>{try{if(n){let e=R.current.play();e!==void 0&&e.catch(e=>console.warn(`Audio play failed (handled):`,e.message))}else R.current.pause()}catch(e){console.warn(`Audio play sync error (handled):`,e.message)}},[n,e]),(0,a.useEffect)(()=>{let e=R.current,t=()=>{k(e.currentTime),c(e.currentTime/(e.duration||1)*100)},n=()=>{console.error(`Audio loading error`),r(!1)},i=()=>{D(e.duration)};return e.addEventListener(`timeupdate`,t),e.addEventListener(`loadedmetadata`,i),e.addEventListener(`error`,n),()=>{e.removeEventListener(`timeupdate`,t),e.removeEventListener(`loadedmetadata`,i),e.removeEventListener(`error`,n)}},[e]),(0,a.useEffect)(()=>{R.current.volume=A},[A]);let B=()=>r(e=>!e),V=()=>{t(M===`random`?Math.floor(Math.random()*w.length):e=>(e+1)%w.length),r(!0)},H=()=>{t(M===`random`?Math.floor(Math.random()*w.length):e=>(e-1+w.length)%w.length),r(!0)},U=e=>{t(e),r(!0)};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{}),(0,o.jsxs)(l,{children:[(0,o.jsxs)(u,{children:[(0,o.jsxs)(d,{children:[`♪ `,z.name]}),(0,o.jsxs)(f,{children:[T(O),` / `,T(E),` `,n?`►`:`■`,` | `,M.toUpperCase()]}),P&&(0,o.jsx)(p,{children:I.map((e,t)=>(0,o.jsx)(m,{style:{height:`${e}px`}},t))})]}),(0,o.jsxs)(_,{children:[(0,o.jsxs)(h,{children:[(0,o.jsx)(g,{className:M===`normal`?`active`:``,onClick:()=>{let e=[`normal`,`loop`,`random`],t=e.indexOf(M);N(e[(t+1)%e.length])},title:`Mode: ${M}`,children:(()=>{switch(M){case`loop`:return`↻`;case`random`:return`⚡`;default:return`→`}})()}),(0,o.jsx)(g,{onClick:()=>{F(e=>!e)},children:P?`█`:`▢`}),(0,o.jsx)(g,{onClick:()=>j(e=>e===0?.7:0),children:A===0?`🔇`:`🔊`})]}),(0,o.jsxs)(v,{children:[(0,o.jsx)(y,{onClick:H,children:`◄`}),(0,o.jsx)(y,{onClick:B,children:n?`■`:`►`}),(0,o.jsx)(y,{onClick:V,children:`►`}),(0,o.jsx)(y,{onClick:()=>U((e+1)%w.length),children:`♫`})]}),(0,o.jsx)(b,{onClick:e=>{let t=e.target.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*E;R.current.currentTime=n,k(n)},children:(0,o.jsx)(x,{style:{width:`${i}%`}})}),(0,o.jsxs)(S,{children:[(0,o.jsx)(`span`,{style:{color:`#000`,fontSize:10},children:`VOL`}),(0,o.jsx)(C,{type:`range`,min:`0`,max:`1`,step:`0.01`,value:A,onChange:e=>j(Number(e.target.value))})]}),(0,o.jsxs)(`div`,{style:{fontSize:10,color:`#000`,textAlign:`center`,marginTop:4},children:[`Track `,e+1,`/`,w.length,` | `,Math.round(A*100),`%`]}),(0,o.jsx)(`audio`,{ref:R,src:z.path,onEnded:M===`loop`?()=>{try{let e=R.current.play();e!==void 0&&e.catch(e=>console.warn(`Audio play failed (handled):`,e.message))}catch(e){console.warn(`Audio play sync error (handled):`,e.message)}}:V,loop:M===`loop`})]})]})]})};export{E as default};
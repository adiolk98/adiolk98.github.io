import{o as e,t,u as n}from"./index-BATXPz1e.js";import{i as r,r as i,t as a}from"./styled-components.browser.esm-Bj9l15OV.js";var o=n(e(),1),s=a`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`,c=a`
  0%, 100% { box-shadow: inset 0 0 20px rgba(100, 149, 237, 0.3); }
  50% { box-shadow: inset 0 0 30px rgba(100, 149, 237, 0.5); }
`;a`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`,a`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`,a`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
`;var l=r.div`
  width: 100%;
  height: 100%;
  max-width: ${e=>e.scale*480}px;
  max-height: ${e=>e.scale*320}px;
  background: url('/assets/gba/gba-interface.png') no-repeat center center;
  background-size: contain;
  position: relative;
  animation: ${i`${s} 1s ease-out`};
  overflow: hidden;
  
  /* 確保圖片完整顯示 */
  aspect-ratio: 480/320;
  transform: scale(${e=>e.scale});
  transform-origin: center center;
`,u=r.div`
  position: absolute;
  top: 30px;
  right: 40px;
  width: 5px;
  height: 5px;
  background: #0f0;
  border-radius: 50%;
  box-shadow: 0 0 6px #0f0;
  animation: ${i`${c} 2s infinite`};
`,d=r.div`
  position: absolute;
  top: 26%;
  left: 49%;
  transform: translateX(-50%);
  width: 36%;
  height: 40%;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  
  /* 確保螢幕內容完整顯示 */
  z-index: 10;
`,f=r.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`,p=r.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,m=r.div`
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`,h=r.canvas`
  border: 1px solid #fff;
  background: #f1f8e9;
  image-rendering: pixelated;
`,g=r.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 8px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-align: center;
  z-index: 20;
  animation: ${i`${s} 0.3s ease-out`};
`,_=r.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`,v=r.button`
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 2px 6px;
  font-size: 10px;
  cursor: pointer;
  min-width: 20px;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &:active {
    background: #d0d0d0;
  }
`,y=r.span`
  font-size: 9px;
  color: #333;
  margin: 0 4px;
`,b=t(),x=({scale:e,children:t})=>(0,b.jsxs)(l,{scale:e,children:[(0,b.jsx)(u,{}),t]}),S=({children:e})=>(0,b.jsx)(d,{children:e}),C=({scale:e,scaleUp:t,scaleDown:n})=>(0,b.jsxs)(_,{children:[(0,b.jsx)(v,{onClick:n,children:`-`}),(0,b.jsxs)(y,{children:[Math.round(e*100),`%`]}),(0,b.jsx)(v,{onClick:t,children:`+`})]}),w=({onVideoEnd:e})=>{let t=(0,o.useRef)(null);return(0,o.useEffect)(()=>{t.current&&t.current.play()},[]),(0,b.jsx)(f,{children:(0,b.jsxs)(p,{ref:t,onEnded:e,autoPlay:!0,muted:!1,controls:!1,children:[(0,b.jsx)(`source`,{src:`/assets/gameboy-opening.mp4`,type:`video/mp4`}),`您的瀏覽器不支援影片播放`]})})},T=.5,E=.1,D={BACKGROUND:`#2c2c2c`,PLAYER:`#ff0000`,STROKE:`#000000`,WHITE:`#ffffff`,WOOD_FLOOR:`#deb887`,CARPET_RED:`#dc143c`,WINDOW:`#87ceeb`,DOOR:`#8b4513`,SNAKE_HEAD:`#1b5e20`,SNAKE_BODY:`#4caf50`,SNAKE_FOOD:`#f44336`,SNAKE_BG:`#f1f8e9`},O={OPENING:`opening`,WORLD:`world`,SNAKE:`snake`},k={UP:`up`,DOWN:`down`,LEFT:`left`,RIGHT:`right`},A={WOOD_FLOOR:{x:0,y:0,walkable:!0},WALL:{x:1,y:0,walkable:!1},CARPET_RED:{x:2,y:0,walkable:!0},WINDOW:{x:3,y:0,walkable:!1},DOOR:{x:4,y:0,walkable:!0},BOOKSHELF:{x:0,y:1,walkable:!1},SMALL_SHELF:{x:1,y:1,walkable:!1},CHAIR:{x:2,y:1,walkable:!1},TABLE:{x:3,y:1,walkable:!1},BED:{x:4,y:1,walkable:!1},CHEST:{x:5,y:1,walkable:!1},SOFA:{x:6,y:1,walkable:!1},ARMCHAIR:{x:7,y:1,walkable:!1},PLANT_BIG:{x:0,y:2,walkable:!1},PLANT_SMALL:{x:1,y:2,walkable:!1},VASE:{x:2,y:2,walkable:!1},LAMP:{x:3,y:2,walkable:!1},COFFEE_TABLE:{x:4,y:2,walkable:!1},SIDE_TABLE:{x:5,y:2,walkable:!1},STOOL:{x:6,y:2,walkable:!1},COMPUTER:{x:7,y:2,walkable:!1},FIREPLACE:{x:0,y:3,walkable:!1},TV:{x:1,y:3,walkable:!1},MIRROR:{x:2,y:3,walkable:!1},PAINTING:{x:3,y:3,walkable:!1},DRESSER:{x:4,y:3,walkable:!1},STEREO:{x:5,y:3,walkable:!1},GLOBE:{x:6,y:3,walkable:!1},TELESCOPE:{x:7,y:3,walkable:!1}},j=[{id:0,name:`黑色線條房間`,width:20,height:12,tiles:[[`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`BOOKSHELF`,`WOOD_FLOOR`,`CHAIR`,`TABLE`,`WOOD_FLOOR`,`PLANT_BIG`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WINDOW`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`BED`,`BED`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`COMPUTER`,`CHAIR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`CARPET_RED`,`CARPET_RED`,`CARPET_RED`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`CHEST`,`WOOD_FLOOR`,`TV`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`CARPET_RED`,`SOFA`,`CARPET_RED`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WOOD_FLOOR`,`WALL`],[`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`,`WALL`]],computer:{x:10,y:7}}],M=class{constructor(e,t,n=k.DOWN){this.x=e,this.y=t,this.direction=n}setPosition(e,t){this.x=e,this.y=t}setDirection(e){this.direction=e}draw(e,t,n,r=16){e.fillStyle=D.PLAYER,e.strokeStyle=D.STROKE,e.lineWidth=2;let i=Math.floor(r*.6),a=Math.floor((r-i)/2);e.fillRect(t+a,n+a,i,i),e.strokeRect(t+a,n+a,i,i),e.fillStyle=D.STROKE;let o=Math.floor(r*.2);switch(this.direction){case k.UP:e.fillRect(t+a+i/2-o/2,n+a-o,o,o);break;case k.DOWN:e.fillRect(t+a+i/2-o/2,n+a+i,o,o);break;case k.LEFT:e.fillRect(t+a-o,n+a+i/2-o/2,o,o);break;case k.RIGHT:e.fillRect(t+a+i,n+a+i/2-o/2,o,o);break}}},N=class{constructor(e=0,t=0){this.x=e,this.y=t}update(e,t,n,r,i){if(!n.current)return;let a=n.current.getBoundingClientRect(),o=Math.floor(a.width/16),s=Math.floor(a.height/16),c=e-Math.floor(o/2),l=t-Math.floor(s/2);c=Math.max(0,Math.min(c,r-o)),l=Math.max(0,Math.min(l,i-s)),this.x=c,this.y=l}getPosition(){return{x:this.x,y:this.y}}},P=class{static drawTile(e,t,n,r,i,a){switch(e.strokeStyle=D.STROKE,e.lineWidth=1,e.fillStyle=D.WHITE,t){case`WALL`:e.fillStyle=D.STROKE,e.fillRect(n,r,i,a);break;case`WOOD_FLOOR`:e.fillStyle=D.WOOD_FLOOR,e.fillRect(n,r,i,a);break;case`CARPET_RED`:e.fillStyle=D.CARPET_RED,e.fillRect(n,r,i,a);break;case`WINDOW`:e.fillStyle=D.WINDOW,e.fillRect(n,r,i,a),e.strokeRect(n,r,i,a),e.beginPath(),e.moveTo(n+i/2,r),e.lineTo(n+i/2,r+a),e.moveTo(n,r+a/2),e.lineTo(n+i,r+a/2),e.stroke();break;case`DOOR`:e.fillStyle=D.DOOR,e.fillRect(n,r,i,a),e.strokeRect(n,r,i,a),e.fillStyle=D.STROKE,e.fillRect(n+i-2,r+a/2-1,1,2);break;case`BOOKSHELF`:e.strokeRect(n,r,i,a);for(let t=1;t<4;t++)e.beginPath(),e.moveTo(n,r+a/4*t),e.lineTo(n+i,r+a/4*t),e.stroke();break;case`CHAIR`:e.strokeRect(n+1,r+2,i-2,a-4),e.beginPath(),e.moveTo(n+1,r+2),e.lineTo(n+1,r),e.moveTo(n+i-1,r+2),e.lineTo(n+i-1,r),e.stroke();break;case`TABLE`:e.strokeRect(n,r+2,i,a-4),e.beginPath(),e.moveTo(n+1,r+2),e.lineTo(n+1,r+a),e.moveTo(n+i-1,r+2),e.lineTo(n+i-1,r+a),e.stroke();break;case`BED`:e.strokeRect(n,r,i,a),e.strokeRect(n,r,i,a/3);break;case`COMPUTER`:e.strokeRect(n,r,i,a-2),e.strokeRect(n+2,r+a-2,i-4,2);break;case`SOFA`:e.strokeRect(n,r+2,i,a-2),e.strokeRect(n,r,2,a),e.strokeRect(n+i-2,r,2,a);break;case`PLANT_BIG`:e.strokeRect(n+2,r+a-3,i-4,3),e.beginPath(),e.moveTo(n+i/2,r+a-3),e.lineTo(n+i/2,r+1),e.moveTo(n+1,r+2),e.lineTo(n+i-1,r+2),e.stroke();break;case`TV`:e.strokeRect(n,r,i,a),e.strokeRect(n+1,r+1,i-2,a-2);break;case`CHEST`:e.strokeRect(n,r+1,i,a-1),e.strokeRect(n,r,i,2);break;default:e.strokeRect(n,r,i,a);break}}static renderMap(e,t,n,r,i){e.fillStyle=D.BACKGROUND,e.fillRect(0,0,r,i);let a=Math.floor(r/16),o=Math.floor(i/16);for(let r=0;r<o;r++)for(let i=0;i<a;i++){let a=n.x+i,o=n.y+r;if(a>=0&&a<t.width&&o>=0&&o<t.height){let n=t.tiles[o][a];A[n]&&this.drawTile(e,n,i*16,r*16,16,16)}}}},F={x:10,y:6,direction:k.DOWN},I={x:0,y:0},L=({show:e,message:t=`按 Space 使用電腦`})=>e?(0,b.jsx)(g,{children:t}):null,R=(0,o.forwardRef)(({onComputerInteract:e,onPlayerMove:t},n)=>{let r=(0,o.useRef)(null),[i,a]=(0,o.useState)(new M(F.x,F.y,F.direction)),[s,c]=(0,o.useState)(0),[l,u]=(0,o.useState)(new N(I.x,I.y)),[d,f]=(0,o.useState)(!1),[p,m]=(0,o.useState)(!1);(0,o.useEffect)(()=>{let e=j[s].computer,t=Math.abs(i.x-e.x)+Math.abs(i.y-e.y)<=1;f(t),m(t)},[i,s]);let g=(e,t)=>{let n=j[s],i=new N(l.x,l.y);i.update(e,t,r,n.width,n.height),u(i)},_=(e,t)=>{let n=j[s],r=i.x+e,o=i.y+t;if(r<0||r>=n.width||o<0||o>=n.height)return;let c=A[n.tiles[o][r]];if(!c||!c.walkable)return;let l=new M(r,o,i.direction);e>0?l.setDirection(k.RIGHT):e<0?l.setDirection(k.LEFT):t>0?l.setDirection(k.DOWN):t<0&&l.setDirection(k.UP),a(l),g(r,o)},v=()=>{d&&e()};return(0,o.useImperativeHandle)(n,()=>({movePlayer:_,interactWithComputer:v,player:i,nearComputer:d})),(0,o.useEffect)(()=>{let e,t=()=>{if(r.current){let e=r.current,t=e.getContext(`2d`),n=j[s],a=e.getBoundingClientRect();(e.width!==a.width||e.height!==a.height)&&(e.width=a.width,e.height=a.height),P.renderMap(t,n,l,e.width,e.height);let o=(i.x-l.x)*16,c=(i.y-l.y)*16;i.draw(t,o,c,16)}e=requestAnimationFrame(t)};return e=requestAnimationFrame(t),()=>{e&&cancelAnimationFrame(e)}},[i,l,s]),(0,o.useEffect)(()=>{let e=()=>{g(i.x,i.y)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[i]),(0,b.jsxs)(`div`,{style:{width:`100%`,height:`100%`,background:`#2c2c2c`,position:`relative`,imageRendering:`pixelated`},children:[(0,b.jsx)(h,{ref:r,width:`100%`,height:`100%`,style:{width:`100%`,height:`100%`,display:`block`}}),(0,b.jsx)(`div`,{style:{position:`absolute`,bottom:`8px`,right:`8px`,fontSize:`7px`,color:`#ffffff`,fontFamily:`Courier New, monospace`,textShadow:`1px 1px 0px #000000`,background:`rgba(0, 0, 0, 0.7)`,padding:`4px 8px`,borderRadius:`4px`},children:`WASD: move | space/Enter: 互動`}),(0,b.jsx)(L,{show:p})]})}),z=class{constructor(){this.resetGame()}resetGame(){this.snake=[{x:5,y:5}],this.food={x:10,y:8},this.direction={x:1,y:0},this.score=0,this.gameRunning=!0}setDirection(e){this.direction=e}generateFood(){let e;do e={x:Math.floor(Math.random()*15),y:Math.floor(Math.random()*10)};while(this.snake.some(t=>t.x===e.x&&t.y===e.y));this.food=e}update(){if(!this.gameRunning)return;let e=[...this.snake],t={...e[0]};if(t.x+=this.direction.x,t.y+=this.direction.y,t.x<0||t.x>=15||t.y<0||t.y>=10){this.gameRunning=!1;return}if(e.some(e=>e.x===t.x&&e.y===t.y)){this.gameRunning=!1;return}e.unshift(t),t.x===this.food.x&&t.y===this.food.y?(this.score+=10,this.generateFood()):e.pop(),this.snake=e}draw(e,t,n){e.fillStyle=D.SNAKE_BG,e.fillRect(0,0,t,n),this.snake.forEach((t,n)=>{n===0?e.fillStyle=D.SNAKE_HEAD:e.fillStyle=D.SNAKE_BODY,e.fillRect(t.x*8,t.y*8,7,7)}),e.fillStyle=D.SNAKE_FOOD,e.fillRect(this.food.x*8,this.food.y*8,7,7)}getGameSpeed(){return Math.max(100,180-this.score)}},B=(0,o.forwardRef)(({onExit:e},t)=>{let n=(0,o.useRef)(null),[r]=(0,o.useState)(new z),[i,a]=(0,o.useState)(!0),[s,c]=(0,o.useState)(0),l=e=>{r.setDirection(e)};return(0,o.useImperativeHandle)(t,()=>({setDirection:l,gameRunning:i,setGameRunning:a,score:s})),(0,o.useEffect)(()=>{let e,t=performance.now(),o=s=>{let l=r.getGameSpeed();if(s-t>=l&&(i&&(r.update(),c(r.score),r.gameRunning||a(!1)),t=s),n.current){let e=n.current,t=e.getContext(`2d`);r.draw(t,e.width,e.height)}e=requestAnimationFrame(o)};return e=requestAnimationFrame(o),()=>{e&&cancelAnimationFrame(e)}},[i,r]),(0,b.jsxs)(m,{children:[(0,b.jsxs)(`div`,{style:{color:`#ffffff`,fontSize:`8px`,marginBottom:`4px`,fontFamily:`Courier New, monospace`,fontWeight:`bold`,textShadow:`1px 1px 0px #000000`},children:[`▲ Snake - Score: `,s,` ▲`]}),(0,b.jsx)(h,{ref:n,width:`120`,height:`80`}),(0,b.jsx)(`div`,{style:{fontSize:`7px`,color:`#ffffff`,fontFamily:`Courier New, monospace`,marginTop:`2px`,textShadow:`1px 1px 0px #000000`},children:`WASD: move | ESC: back to world`}),!i&&(0,b.jsxs)(`div`,{style:{position:`absolute`,top:`50%`,left:`50%`,transform:`translate(-50%, -50%)`,background:`rgba(255, 255, 255, 0.95)`,border:`2px solid #000000`,padding:`8px`,fontSize:`8px`,fontFamily:`Courier New, monospace`,fontWeight:`bold`,color:`#000000`,textAlign:`center`,borderRadius:`4px`},children:[`GAME OVER!`,(0,b.jsx)(`br`,{}),`Score: `,s,(0,b.jsx)(`br`,{}),`Press ESC Back to World`]})]})}),V=()=>{let[e,t]=(0,o.useState)(O.OPENING);return{gameState:e,setGameState:t,goToWorld:()=>t(O.WORLD),goToSnake:()=>t(O.SNAKE),goToOpening:()=>t(O.OPENING),isOpening:e===O.OPENING,isWorld:e===O.WORLD,isSnake:e===O.SNAKE}},H=(e=1)=>{let[t,n]=(0,o.useState)(e),r=e=>{n(Math.max(T,Math.min(2,e)))};return{scale:t,setScale:n,handleScaleChange:r,scaleUp:()=>r(t+E),scaleDown:()=>r(t-E)}},U=({gameState:e,movePlayer:t,setSnakeDirection:n,snakeDirection:r,interactWithComputer:i,goToWorld:a,setGameRunning:s,nearComputer:c})=>{(0,o.useEffect)(()=>{let o=o=>{switch(o.key.toLowerCase()){case`arrowup`:case`w`:e===O.WORLD?t(0,-1):e===O.SNAKE&&r.y===0&&n({x:0,y:-1});break;case`arrowdown`:case`s`:e===O.WORLD?t(0,1):e===O.SNAKE&&r.y===0&&n({x:0,y:1});break;case`arrowleft`:case`a`:e===O.WORLD?t(-1,0):e===O.SNAKE&&r.x===0&&n({x:-1,y:0});break;case`arrowright`:case`d`:e===O.WORLD?t(1,0):e===O.SNAKE&&r.x===0&&n({x:1,y:0});break;case`enter`:case` `:case`z`:e===O.WORLD&&c&&i();break;case`escape`:case`x`:e===O.SNAKE&&(a(),s(!1));break;default:break}};return window.addEventListener(`keydown`,o),()=>{window.removeEventListener(`keydown`,o)}},[e,r,c,t,n,i,a,s])},W=()=>{let{gameState:e,goToWorld:t,goToSnake:n,isOpening:r,isWorld:i,isSnake:a}=V(),{scale:s,scaleUp:c,scaleDown:l}=H(1),[u,d]=(0,o.useState)({x:1,y:0}),[f,p]=(0,o.useState)(!1),m=(0,o.useRef)(null),h=(0,o.useRef)(null),g=(e,t)=>{m.current&&m.current.movePlayer&&m.current.movePlayer(e,t)};(0,o.useEffect)(()=>{m.current&&m.current.nearComputer!==void 0&&p(m.current.nearComputer)},[i]);let _=()=>{n()};return U({gameState:e,movePlayer:g,setSnakeDirection:e=>{h.current&&h.current.setDirection&&h.current.setDirection(e),d(e)},snakeDirection:u,interactWithComputer:_,goToWorld:t,setGameRunning:()=>{},nearComputer:f}),(0,b.jsxs)(`div`,{style:{position:`relative`,width:`100%`,height:`100%`},children:[(0,b.jsx)(C,{scale:s,scaleUp:c,scaleDown:l}),(0,b.jsx)(x,{scale:s,children:(0,b.jsx)(S,{children:r?(0,b.jsx)(w,{onVideoEnd:t}):i?(0,b.jsx)(R,{onComputerInteract:_,ref:m}):a?(0,b.jsx)(B,{onExit:t,ref:h}):null})})]})};export{W as default};
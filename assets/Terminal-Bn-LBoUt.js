import{d as e,s as t,t as n}from"./index-_VUDyVeM.js";import{r}from"./FileSystemContext-CITk2dyu.js";var i=e(t(),1),a=n();function o({onCommand:e,onHistoryNav:t,onComplete:n,onInterrupt:o,inputRef:s}){let[c,l]=(0,i.useState)(``),{currentPath:u}=r();return(0,i.useEffect)(()=>{s&&s.current&&s.current.focus()},[s]),(0,a.jsxs)(`div`,{className:`terminal-input-line`,children:[(0,a.jsxs)(`span`,{className:`terminal-prompt`,children:[`/`+(u.length?u.join(`/`):``),`\xA0`]}),(0,a.jsx)(`input`,{ref:s,className:`terminal-input`,value:c,onChange:e=>l(e.target.value),onKeyDown:r=>{r.key===`Enter`?c.trim()!==``&&(e(c),l(``)):r.key===`ArrowUp`?(l(t(`up`)),r.preventDefault()):r.key===`ArrowDown`?(l(t(`down`)),r.preventDefault()):r.key===`Tab`?(r.preventDefault(),c.trim()&&l(n(c))):r.key===`c`&&r.ctrlKey&&(r.preventDefault(),o(c),l(``))},autoComplete:`off`,spellCheck:!1})]})}function s({line:e,onFadeOut:t,fadingOut:n}){let[r,o]=(0,i.useState)(`fade-in`);return(0,i.useEffect)(()=>{if(r===`fade-in`){let e=setTimeout(()=>o(``),500);return()=>clearTimeout(e)}if(r===`fade-out`){let e=setTimeout(()=>t&&t(),500);return()=>clearTimeout(e)}},[r,t]),(0,i.useEffect)(()=>{n&&o(`fade-out`)},[n]),e.type===`input`?(0,a.jsxs)(`div`,{className:`terminal-line ${r}`,children:[(0,a.jsxs)(`span`,{className:`terminal-prompt`,children:[e.cwd||`/`,` `]}),` `,e.value]}):(0,a.jsx)(`div`,{className:`terminal-line ${r}`,children:e.value})}function c(){let{ls:e,cd:t,mkdir:n,touch:i,rm:a,readFile:o,writeFile:s,tree:c,entryNames:u,currentPath:d}=r(),f={help:()=>`alias:
ls - 列出目錄
cd [dir] - 切換目錄
mkdir [dir] - 建立資料夾
touch [file] - 建立檔案
pwd - 顯示目前路徑
rm [檔案] - 刪除檔案
cat [檔案] - 顯示檔案內容
write [檔案] [內容] - 寫入檔案
tree - 顯示目錄樹
history - 顯示指令紀錄
（Tab 補完指令與檔名，↑↓ 翻歷史）

whoami - 顯示用戶信息
neofetch - 顯示系統信息
date - 顯示日期時間
ps - 顯示進程
ping [主機] - 網路測試

echo [文字] - 顯示文字
clear - 清除畫面
help - 顯示說明
vim - vim編輯器
nano - nano編輯器
sudo [命令] - 超級用戶模式
hacker - 駭客模式

`,clear:(e,t)=>{t(()=>[{type:`output`,value:`

`}])},echo:e=>e.join(` `),ls:()=>e(),cd:e=>e[0]?t(e[0])?``:`找不到資料夾：${e[0]}`:`請輸入目標資料夾名稱`,mkdir:e=>e[0]?n(e[0])?``:`已存在：${e[0]}`:`請輸入新資料夾名稱`,touch:e=>e[0]?i(e[0])?``:`已存在：${e[0]}`:`請輸入新檔案名稱`,pwd:()=>`/`+d.join(`/`),date:()=>new Date().toLocaleString(`zh-TW`,{year:`numeric`,month:`long`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,weekday:`long`}),whoami:()=>`adi - 全端工程師 👨‍💻`,neofetch:()=>`
    ╭─────────────────────────────────╮
    │  ▒█████▒ ██████▒ ██▒           │
    │  ██╔══██╗██╔══██╗██║           │
    │  ██████▒╙██╗  ██║██║           │
    │  ██╔══██╗██║  ██║██║           │
    │  ██║  ██║██████╔╝██║           │
    │  ╚═╝  ╚═╝╚═════╝ ╚═╝           │
    ╰─────────────────────────────────╯
    
    OS: Web Browser
    Host: about-adi.dev
    Kernel: JavaScript ES6+
    Uptime: ${Math.floor(performance.now()/1e3)} seconds
    Shell: adi-terminal
    Terminal: React Terminal
    CPU: Your device
    Memory: Infinite imagination
    `,cowsay:e=>{let t=e.join(` `)||`Moo!`,n=`─`.repeat(t.length+2);return`\n ┌${n}┐\n │ ${t} │\n └${n}┘\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`},matrix:()=>{let e=``;for(let t=0;t<10;t++){for(let t=0;t<50;t++)e+=`日ア十字母片仮名カタカナひらがな`[Math.floor(Math.random()*16)];e+=`
`}return`\n🔴 歡迎來到駭客帝國 🔴\n\n${e}`},fortune:()=>{let e=[`代碼如詩，但願你的永遠不是打油詩。`,`成功的秘訣就是每天進步一點點。`,`寫程式就像寫詩一樣，需要靈感和耐心。`,`最好的代碼是那些你六個月後還能看懂的。`,`除錯是寫程式的兩倍難度。`,`簡潔是複雜的最高境界。`,`Talk is cheap. Show me the code. - Linus Torvalds`,`程式碼寫給人看，偶爾讓電腦執行。`,`優秀的程式設計師寫出人人都能理解的代碼。`,`沒有完美的程式，只有不斷改進的程式。`];return`🔮 `+e[Math.floor(Math.random()*e.length)]},calc:e=>{let t=e.join(` `);if(!t)return`請輸入運算式，例如：calc 2 + 3`;let n=t.replace(/[^0-9+\-*/().\s]/g,``);try{let e=Function(`"use strict"; return (${n})`)();return Number.isFinite(e)?`${t} = ${e}`:`計算錯誤，請檢查運算式`}catch{return`計算錯誤，請檢查運算式`}},weather:()=>{let e=[`☀️ 晴天`,`🌤️ 多雲`,`☁️ 陰天`,`🌧️ 雨天`,`⛈️ 雷雨`,`🌨️ 雪天`],t=Math.floor(Math.random()*30)+10;return`今日天氣：${e[Math.floor(Math.random()*e.length)]} ${t}°C`},pokedex:e=>({1:`001 妙蛙種子 🌱 草系`,4:`004 小火龍 🔥 火系`,7:`007 傑尼龜 💧 水系`,25:`025 皮卡丘 ⚡ 電系`,150:`150 夢幻 🌟 超能力系`})[e[0]||`25`]||`找不到這隻寶可夢！`,snake:()=>`🐍 貪食蛇遊戲

┌─────────────────┐
│  🐍     🍎      │
│                 │
│    ← → ↑ ↓     │
│                 │
│  按方向鍵控制   │
└─────────────────┘

抱歉，這只是個展示！真正的遊戲需要更多代碼。`,history:()=>`history 功能已在 Terminal 元件中實現`,sudo:e=>e.join(` `).includes(`rm -rf`)?`🚨 警告：你差點刪除了整個宇宙！
好險這只是個模擬器... 😅`:`[sudo] password for adi: ***********
抱歉，你沒有sudo權限！ 🔒`,man:e=>`📖 ${e[0]||`man`} 手冊頁：\n\n這是一個模擬的terminal，沒有真正的man頁面。\n試試 'help' 來查看可用命令！`,vim:()=>`啟動 vim 編輯器...

:q! 💀 (逃離vim的經典組合鍵)

抱歉，這個terminal還沒有vim！
試試 'nano' 或 'edit' 代替。`,nano:()=>`GNU nano 編輯器

╔════════════════════════════════════╗
║  這是一個模擬的nano編輯器           ║
║  ^X 離開  ^O 儲存  ^W 搜尋         ║
║                                    ║
║  Hello, World!                     ║
║                                    ║
╚════════════════════════════════════╝

按 Ctrl+X 離開... (但這裡什麼都不會發生 😄)`,joke:()=>{let e=[`程式設計師的三大難題：
1. 命名變數
2. 快取失效
3. 計算邊界條件
4. 數學不好`,`為什麼程式設計師喜歡暗黑模式？
因為光會吸引蟲子！ 🐛`,`程式設計師的老婆：你能幫我買一打雞蛋嗎？如果有酪梨的話買一個。
程式設計師回來了：買了一個雞蛋。
老婆：為什麼只買一個？
程式設計師：因為有酪梨。`,`為什麼程式設計師不喜歡戶外運動？
因為外面的太陽太亮了，沒有語法高亮！ 🌞`,`程式設計師的浪漫：
如果你是我的變數，我永遠不會讓你為null。 💕`];return`😂 `+e[Math.floor(Math.random()*e.length)]},coffee:()=>`☕ 正在沖咖啡...

████████████████████████████████ 100%

你的咖啡好了！

🔋 精力 +50
🧠 專注力 +30
💻 寫程式能力 +100

記得不要喝太多，會心悸！`,hacker:()=>`🔴 啟動駭客模式...

正在入侵 Pentagon...
██████████████████████████████ 100%

存取被拒絕！

抱歉，你不是電影裡的駭客。
試試 'matrix' 命令來體驗駭客帝國效果！ 😎`,rickroll:()=>`🎵 Never gonna give you up
🎵 Never gonna let you down
🎵 Never gonna run around and desert you
🎵 Never gonna make you cry
🎵 Never gonna say goodbye
🎵 Never gonna tell a lie and hurt you

🎉 You've been Rick Rolled! 🎉`,portal:()=>`🟦 正在開啟時空門...

    🔵
   🔵🔵🔵
  🔵🔵🔵🔵🔵
 🔵🔵🔵🔵🔵🔵🔵
🔵🔵🔵🔵🔵🔵🔵🔵🔵
 🔵🔵🔵🔵🔵🔵🔵
  🔵🔵🔵🔵🔵
   🔵🔵🔵
    🔵

🚪 時空門已開啟！
但是... 你要去哪裡呢？`,meme:()=>{let e=[`This is fine. 🔥🐕🔥`,`Stonks 📈`,`Much wow, such terminal 🐕`,`It's not a bug, it's a feature! 🐛➡️✨`,`Works on my machine 🤷‍♂️`,`Have you tried turning it off and on again? 🔄`,`There are only 10 types of people in the world: those who understand binary and those who don't. 01010000`];return`🎭 `+e[Math.floor(Math.random()*e.length)]},rm:e=>e[0]?a(e[0])?``:`rm: ${e[0]}: 沒有這個檔案或目錄`:`請指定要刪除的檔案`,cat:e=>{if(!e[0])return`請指定要讀取的檔案`;let t=o(e[0]);return t===null?`cat: ${e[0]}: 沒有這個檔案`:t===``?`(空檔案)`:t},write:e=>{let[t,...n]=e;return t?(s(t,n.join(` `)),``):`用法：write [檔案] [內容]`},figlet:e=>`\n █████╗ ██████╗ ██╗\n██╔══██╗██╔══██╗██║\n███████║██║  ██║██║\n██╔══██║██║  ██║██║\n██║  ██║██████╔╝██║\n╚═╝  ╚═╝╚═════╝ ╚═╝\n\n"${e.join(` `)||`ADI`}" 的 ASCII 藝術字！`,color:()=>`
🌈 彩色文字測試：

🔴 紅色
🟠 橙色
🟡 黃色
🟢 綠色
🔵 藍色
🟣 紫色
⚫ 黑色
⚪ 白色`,ping:e=>{let t=e[0]||`localhost`;return`PING ${t}\n64 bytes from ${t}: time=${Math.floor(Math.random()*50)+1}ms\n連線正常! 🌐`},ps:()=>`PID    COMMAND
1      init
42     terminal
1337   node
9999   react-app

共 4 個進程正在運行`,tree:()=>c(),sl:()=>`
      🚂💨💨💨
    oooooooooooo
   oooooooooooooo
  oooooooooooooooo
 🚃🚃🚃🚃🚃🚃🚃🚃

嘟嘟～火車開過去了！
(這是 'ls' 打錯字的經典彩蛋)`};function p(e,t){let[n,...r]=e.trim().split(/\s+/),i=f[n];return i?i(r,t)??void 0:`command not found: ${n}`}return{handleCommand:p,complete:e=>l(e,Object.keys(f),u())}}function l(e,t,n){let r=e.split(/(\s+)/),i=r[r.length-1],a=(r.filter(e=>e.trim()).length<=1&&!/\s$/.test(e)?t:n).filter(e=>e.startsWith(i)&&i!==``);if(a.length===0)return{value:e,hint:``};let o=a[0];for(let e of a)for(;!e.startsWith(o);)o=o.slice(0,-1);let s=e.slice(0,e.length-i.length)+o;return{value:a.length===1?`${s} `:s,hint:a.length>1?a.join(`  `):``}}function u(){let[e,t]=(0,i.useState)([{type:`output`,value:`
\n\n
       ___         ___         ___   
      /   |       /    |       /    | 
    / /| |     / /| |      / /| | 
  / ___ |    / ___ |    / ___ | 
/_/     |_ /_/     |_ /_/  |_| 

Welcome to adi terminal!\nlast login: ${new Date().toLocaleString()}\ntype 'help' to see commands\n`}]),[n,l]=(0,i.useState)(!1),[u,d]=(0,i.useState)([]),[f,p]=(0,i.useState)(null),m=(0,i.useRef)(null),h=(0,i.useRef)(null),{handleCommand:g,complete:_}=c(),{currentPath:v}=r(),y=()=>`/`+v.join(`/`);(0,i.useEffect)(()=>{h.current&&(h.current.scrollTop=h.current.scrollHeight)},[e]);let b=e=>{if(e.trim()===`clear`){l(!0);return}if(e.trim()===`history`){t(t=>[...t,{type:`input`,value:e,cwd:y()}]);let n=u.length>0?u.map((e,t)=>`${t+1}  ${e}`).join(`
`):`命令歷史為空`;t(e=>[...e,{type:`output`,value:n}]),d(t=>[...t,e]),p(null);return}t(t=>[...t,{type:`input`,value:e,cwd:y()}]);let n=g(e,t,u);n&&t(e=>[...e,{type:`output`,value:n}]),d(t=>[...t,e]),p(null)},x=e=>{let{value:n,hint:r}=_(e);return r&&t(t=>[...t,{type:`input`,value:e,cwd:y()},{type:`output`,value:r}]),n},S=e=>{t(t=>[...t,{type:`input`,value:`${e}^C`,cwd:y()}]),p(null)},C=()=>{t([{type:`output`,value:`

`}]),l(!1)};return(0,a.jsxs)(`div`,{className:`terminal-container`,onClick:()=>m.current&&m.current.focus(),tabIndex:0,style:{outline:`none`},children:[(0,a.jsx)(`div`,{className:`terminal-output-area`,ref:h,children:e.map((t,r)=>(0,a.jsx)(s,{line:t,fadingOut:n,onFadeOut:n&&r===e.length-1?C:void 0},r))}),(0,a.jsx)(o,{onCommand:b,onHistoryNav:e=>{if(u.length===0)return``;let t=f;return t=e===`up`?t===null?u.length-1:Math.max(0,t-1):t===null?null:t<u.length-1?t+1:null,p(t),t===null?``:u[t]},onComplete:x,onInterrupt:S,inputRef:m})]})}export{u as default};
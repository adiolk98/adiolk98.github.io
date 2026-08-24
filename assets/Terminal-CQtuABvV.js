import{d as __toESM,s as require_react,t as require_jsx_runtime}from"./index-cNFPjMuU.js";import{n as useFileSystem}from"./FileSystemContext-AtGSnq_Y.js";var import_react=__toESM(require_react(),1),import_jsx_runtime=require_jsx_runtime();function TerminalInput({onCommand:e,onHistoryNav:t,inputRef:n}){let[r,i]=(0,import_react.useState)(``),{currentPath:a}=useFileSystem();return(0,import_react.useEffect)(()=>{n&&n.current&&n.current.focus()},[n]),(0,import_jsx_runtime.jsxs)(`div`,{className:`terminal-input-line`,children:[(0,import_jsx_runtime.jsxs)(`span`,{className:`terminal-prompt`,children:[`/`+(a.length?a.join(`/`):``),`\xA0`]}),(0,import_jsx_runtime.jsx)(`input`,{ref:n,className:`terminal-input`,value:r,onChange:e=>i(e.target.value),onKeyDown:n=>{n.key===`Enter`?r.trim()!==``&&(e(r),i(``)):n.key===`ArrowUp`?(i(t(`up`)),n.preventDefault()):n.key===`ArrowDown`&&(i(t(`down`)),n.preventDefault())},autoComplete:`off`,spellCheck:!1})]})}function TerminalOutput({line:e,onFadeOut:t,fadingOut:n}){let[r,i]=(0,import_react.useState)(`fade-in`),{currentPath:a}=useFileSystem();return(0,import_react.useEffect)(()=>{if(r===`fade-in`){let e=setTimeout(()=>i(``),500);return()=>clearTimeout(e)}if(r===`fade-out`){let e=setTimeout(()=>t&&t(),500);return()=>clearTimeout(e)}},[r,t]),(0,import_react.useEffect)(()=>{n&&i(`fade-out`)},[n]),e.type===`input`?(0,import_jsx_runtime.jsxs)(`div`,{className:`terminal-line ${r}`,children:[(0,import_jsx_runtime.jsxs)(`span`,{className:`terminal-prompt`,children:[a.join(`/`),` `]}),` `,e.value]}):(0,import_jsx_runtime.jsx)(`div`,{className:`terminal-line ${r}`,children:e.value})}function useTerminalCommands(){const{ls,cd,mkdir,touch,currentPath}=useFileSystem(),commands={help:()=>`alias:
ls - 列出目錄
cd [dir] - 切換目錄
mkdir [dir] - 建立資料夾
touch [file] - 建立檔案
pwd - 顯示目前路徑
rm [檔案] - 刪除檔案
cat [檔案] - 顯示檔案內容
tree - 顯示目錄樹

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

`}])},echo:e=>e.join(` `),ls:()=>ls(),cd:e=>e[0]?cd(e[0])?``:`找不到資料夾：${e[0]}`:`請輸入目標資料夾名稱`,mkdir:e=>e[0]?(mkdir(e[0]),``):`請輸入新資料夾名稱`,touch:e=>e[0]?(touch(e[0]),``):`請輸入新檔案名稱`,pwd:()=>`/`+currentPath.join(`/`),date:()=>new Date().toLocaleString(`zh-TW`,{year:`numeric`,month:`long`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,weekday:`long`}),whoami:()=>`adi - 全端工程師 👨‍💻`,neofetch:()=>`
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
    `,cowsay:e=>{let t=e.join(` `)||`Moo!`,n=`─`.repeat(t.length+2);return`\n ┌${n}┐\n │ ${t} │\n └${n}┘\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`},matrix:()=>{let e=`日ア十字母片仮名カタカナひらがな`,t=``;for(let e=0;e<10;e++){for(let e=0;e<50;e++)t+=`日ア十字母片仮名カタカナひらがな`[Math.floor(Math.random()*16)];t+=`
`}return`\n🔴 歡迎來到駭客帝國 🔴\n\n${t}`},fortune:()=>{let e=[`代碼如詩，但願你的永遠不是打油詩。`,`成功的秘訣就是每天進步一點點。`,`寫程式就像寫詩一樣，需要靈感和耐心。`,`最好的代碼是那些你六個月後還能看懂的。`,`除錯是寫程式的兩倍難度。`,`簡潔是複雜的最高境界。`,`Talk is cheap. Show me the code. - Linus Torvalds`,`程式碼寫給人看，偶爾讓電腦執行。`,`優秀的程式設計師寫出人人都能理解的代碼。`,`沒有完美的程式，只有不斷改進的程式。`];return`🔮 `+e[Math.floor(Math.random()*e.length)]},calc:args=>{const expression=args.join(` `);if(!expression)return`請輸入運算式，例如：calc 2 + 3`;try{const result=eval(expression.replace(/[^0-9+\-*/().\s]/g,``));return`${expression} = ${result}`}catch{return`計算錯誤，請檢查運算式`}},weather:()=>{let e=[`☀️ 晴天`,`🌤️ 多雲`,`☁️ 陰天`,`🌧️ 雨天`,`⛈️ 雷雨`,`🌨️ 雪天`],t=Math.floor(Math.random()*30)+10;return`今日天氣：${e[Math.floor(Math.random()*e.length)]} ${t}°C`},pokedex:e=>({1:`001 妙蛙種子 🌱 草系`,4:`004 小火龍 🔥 火系`,7:`007 傑尼龜 💧 水系`,25:`025 皮卡丘 ⚡ 電系`,150:`150 夢幻 🌟 超能力系`})[e[0]||`25`]||`找不到這隻寶可夢！`,snake:()=>`🐍 貪食蛇遊戲

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
但是... 你要去哪裡呢？`,meme:()=>{let e=[`This is fine. 🔥🐕🔥`,`Stonks 📈`,`Much wow, such terminal 🐕`,`It's not a bug, it's a feature! 🐛➡️✨`,`Works on my machine 🤷‍♂️`,`Have you tried turning it off and on again? 🔄`,`There are only 10 types of people in the world: those who understand binary and those who don't. 01010000`];return`🎭 `+e[Math.floor(Math.random()*e.length)]},rm:e=>e[0]?`已刪除：${e[0]} (模擬)`:`請指定要刪除的檔案`,cat:e=>e[0]?`檔案內容：${e[0]}\n這是一個模擬的檔案內容。`:`請指定要讀取的檔案`,figlet:e=>`\n █████╗ ██████╗ ██╗\n██╔══██╗██╔══██╗██║\n███████║██║  ██║██║\n██╔══██║██║  ██║██║\n██║  ██║██████╔╝██║\n╚═╝  ╚═╝╚═════╝ ╚═╝\n\n"${e.join(` `)||`ADI`}" 的 ASCII 藝術字！`,color:()=>`
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

共 4 個進程正在運行`,tree:()=>`
📁 目錄樹
├── 📁 home
├── 📁 documents
├── 📁 downloads
├── 📁 music
├── 📁 videos
└── 📁 pictures`,sl:()=>`
      🚂💨💨💨
    oooooooooooo
   oooooooooooooo
  oooooooooooooooo
 🚃🚃🚃🚃🚃🚃🚃🚃

嘟嘟～火車開過去了！
(這是 'ls' 打錯字的經典彩蛋)`};function handleCommand(e,t){let[n,...r]=e.trim().split(/\s+/),i=commands[n];return i?i(r,t)??void 0:`command not found: ${n}`}return{handleCommand}}function Terminal(){let[e,t]=(0,import_react.useState)([{type:`output`,value:`
\n\n
       ___         ___         ___   
      /   |       /    |       /    | 
    / /| |     / /| |      / /| | 
  / ___ |    / ___ |    / ___ | 
/_/     |_ /_/     |_ /_/  |_| 

Welcome to adi terminal!\nlast login: ${new Date().toLocaleString()}\ntype 'help' to see commands\n`}]),[n,r]=(0,import_react.useState)(!1),[i,a]=(0,import_react.useState)([]),[o,s]=(0,import_react.useState)(null),c=(0,import_react.useRef)(null),l=(0,import_react.useRef)(null),{handleCommand:u}=useTerminalCommands();(0,import_react.useEffect)(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[e]);let d=e=>{if(e.trim()===`clear`){r(!0);return}if(e.trim()===`history`){t(t=>[...t,{type:`input`,value:e}]);let n=i.length>0?i.map((e,t)=>`${t+1}  ${e}`).join(`
`):`命令歷史為空`;t(e=>[...e,{type:`output`,value:n}]),a(t=>[...t,e]),s(null);return}t(t=>[...t,{type:`input`,value:e}]);let n=u(e,t,i);n&&t(e=>[...e,{type:`output`,value:n}]),a(t=>[...t,e]),s(null)},f=()=>{t([{type:`output`,value:`

`}]),r(!1)};return(0,import_jsx_runtime.jsxs)(`div`,{className:`terminal-container`,onClick:()=>c.current&&c.current.focus(),tabIndex:0,style:{outline:`none`},children:[(0,import_jsx_runtime.jsx)(`div`,{className:`terminal-output-area`,ref:l,children:e.map((t,r)=>(0,import_jsx_runtime.jsx)(TerminalOutput,{line:t,fadingOut:n,onFadeOut:n&&r===e.length-1?f:void 0},r))}),(0,import_jsx_runtime.jsx)(TerminalInput,{onCommand:d,onHistoryNav:e=>{if(i.length===0)return``;let t=o;return t=e===`up`?t===null?i.length-1:Math.max(0,t-1):t===null?null:t<i.length-1?t+1:null,s(t),t===null?``:i[t]},inputRef:c})]})}export{Terminal as default};
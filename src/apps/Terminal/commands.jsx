import { useFileSystem } from '../FileSystemContext';

export function useTerminalCommands() {
  const { ls, cd, mkdir, touch, rm, readFile, writeFile, tree, entryNames, currentPath } = useFileSystem();

  const commands = {
    help: () =>
      `alias:
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

`,

// cowsay [文字] - 牛牛說話
// matrix - 駭客帝國效果
// fortune - 隨機名言
// pokedex [編號] - 寶可夢圖鑑
// snake - 貪食蛇遊戲
// joke - 程式設計師笑話
// coffee - 沖咖啡
// meme - 隨機迷因
// rickroll - 經典歌曲
// portal - 開啟時空門
// figlet [文字] - ASCII藝術字
// color - 顯示彩色文字
// sl - 火車彩蛋
    clear: (_args, setLines) => {
      setLines(() => [
        { type: 'output', value: '\n\n' },
      ]);
      return undefined;
    },
    echo: (args) => args.join(' '),
    ls: () => ls(),
    cd: (args) => {
      if (!args[0]) return '請輸入目標資料夾名稱';
      return cd(args[0]) ? '' : `找不到資料夾：${args[0]}`;
    },
    mkdir: (args) => {
      if (!args[0]) return '請輸入新資料夾名稱';
      return mkdir(args[0]) ? '' : `已存在：${args[0]}`;
    },
    touch: (args) => {
      if (!args[0]) return '請輸入新檔案名稱';
      return touch(args[0]) ? '' : `已存在：${args[0]}`;
    },
    pwd: () => '/' + currentPath.join('/'),
    date: () => new Date().toLocaleString('zh-TW', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long'
    }),
    whoami: () => 'adi - 全端工程師 👨‍💻',
    neofetch: () => `
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
    Uptime: ${Math.floor(performance.now() / 1000)} seconds
    Shell: adi-terminal
    Terminal: React Terminal
    CPU: Your device
    Memory: Infinite imagination
    `,
    cowsay: (args) => {
      const text = args.join(' ') || 'Moo!';
      const border = '─'.repeat(text.length + 2);
      return `\n ┌${border}┐\n │ ${text} │\n └${border}┘\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
    },
    matrix: () => {
      const chars = '日ア十字母片仮名カタカナひらがな';
      let result = '';
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 50; j++) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
        result += '\n';
      }
      return `\n🔴 歡迎來到駭客帝國 🔴\n\n${result}`;
    },
    fortune: () => {
      const fortunes = [
        '代碼如詩，但願你的永遠不是打油詩。',
        '成功的秘訣就是每天進步一點點。',
        '寫程式就像寫詩一樣，需要靈感和耐心。',
        '最好的代碼是那些你六個月後還能看懂的。',
        '除錯是寫程式的兩倍難度。',
        '簡潔是複雜的最高境界。',
        'Talk is cheap. Show me the code. - Linus Torvalds',
        '程式碼寫給人看，偶爾讓電腦執行。',
        '優秀的程式設計師寫出人人都能理解的代碼。',
        '沒有完美的程式，只有不斷改進的程式。'
      ];
      return '🔮 ' + fortunes[Math.floor(Math.random() * fortunes.length)];
    },
    calc: (args) => {
      const expression = args.join(' ');
      if (!expression) return '請輸入運算式，例如：calc 2 + 3';
      // 只留下數字與四則運算符號再交給 Function，避免 direct eval。
      const safe = expression.replace(/[^0-9+\-*/().\s]/g, '');
      try {
        const result = Function(`"use strict"; return (${safe})`)();
        return Number.isFinite(result) ? `${expression} = ${result}` : '計算錯誤，請檢查運算式';
      } catch {
        return '計算錯誤，請檢查運算式';
      }
    },
    weather: () => {
      const weather = ['☀️ 晴天', '🌤️ 多雲', '☁️ 陰天', '🌧️ 雨天', '⛈️ 雷雨', '🌨️ 雪天'];
      const temp = Math.floor(Math.random() * 30) + 10;
      return `今日天氣：${weather[Math.floor(Math.random() * weather.length)]} ${temp}°C`;
    },
    pokedex: (args) => {
      const pokemons = {
        '1': '001 妙蛙種子 🌱 草系',
        '4': '004 小火龍 🔥 火系',
        '7': '007 傑尼龜 💧 水系',
        '25': '025 皮卡丘 ⚡ 電系',
        '150': '150 夢幻 🌟 超能力系'
      };
      const num = args[0] || '25';
      return pokemons[num] || '找不到這隻寶可夢！';
    },
    snake: () => {
      return `🐍 貪食蛇遊戲\n\n┌─────────────────┐\n│  🐍     🍎      │\n│                 │\n│    ← → ↑ ↓     │\n│                 │\n│  按方向鍵控制   │\n└─────────────────┘\n\n抱歉，這只是個展示！真正的遊戲需要更多代碼。`;
    },
    history: () => 'history 功能已在 Terminal 元件中實現',
    sudo: (args) => {
      const cmd = args.join(' ');
      if (cmd.includes('rm -rf')) {
        return '🚨 警告：你差點刪除了整個宇宙！\n好險這只是個模擬器... 😅';
      }
      return `[sudo] password for adi: ***********\n抱歉，你沒有sudo權限！ 🔒`;
    },
    man: (args) => {
      const cmd = args[0] || 'man';
      return `📖 ${cmd} 手冊頁：\n\n這是一個模擬的terminal，沒有真正的man頁面。\n試試 'help' 來查看可用命令！`;
    },
    vim: () => {
      return `啟動 vim 編輯器...\n\n:q! 💀 (逃離vim的經典組合鍵)\n\n抱歉，這個terminal還沒有vim！\n試試 'nano' 或 'edit' 代替。`;
    },
    nano: () => {
      return `GNU nano 編輯器\n\n╔════════════════════════════════════╗\n║  這是一個模擬的nano編輯器           ║\n║  ^X 離開  ^O 儲存  ^W 搜尋         ║\n║                                    ║\n║  Hello, World!                     ║\n║                                    ║\n╚════════════════════════════════════╝\n\n按 Ctrl+X 離開... (但這裡什麼都不會發生 😄)`;
    },
    joke: () => {
      const jokes = [
        '程式設計師的三大難題：\n1. 命名變數\n2. 快取失效\n3. 計算邊界條件\n4. 數學不好',
        '為什麼程式設計師喜歡暗黑模式？\n因為光會吸引蟲子！ 🐛',
        '程式設計師的老婆：你能幫我買一打雞蛋嗎？如果有酪梨的話買一個。\n程式設計師回來了：買了一個雞蛋。\n老婆：為什麼只買一個？\n程式設計師：因為有酪梨。',
        '為什麼程式設計師不喜歡戶外運動？\n因為外面的太陽太亮了，沒有語法高亮！ 🌞',
        '程式設計師的浪漫：\n如果你是我的變數，我永遠不會讓你為null。 💕'
      ];
      return '😂 ' + jokes[Math.floor(Math.random() * jokes.length)];
    },
    coffee: () => {
      return `☕ 正在沖咖啡...\n\n████████████████████████████████ 100%\n\n你的咖啡好了！\n\n🔋 精力 +50\n🧠 專注力 +30\n💻 寫程式能力 +100\n\n記得不要喝太多，會心悸！`;
    },
    hacker: () => {
      return `🔴 啟動駭客模式...\n\n正在入侵 Pentagon...\n██████████████████████████████ 100%\n\n存取被拒絕！\n\n抱歉，你不是電影裡的駭客。\n試試 'matrix' 命令來體驗駭客帝國效果！ 😎`;
    },
    rickroll: () => {
      return `🎵 Never gonna give you up\n🎵 Never gonna let you down\n🎵 Never gonna run around and desert you\n🎵 Never gonna make you cry\n🎵 Never gonna say goodbye\n🎵 Never gonna tell a lie and hurt you\n\n🎉 You've been Rick Rolled! 🎉`;
    },
    portal: () => {
      return `🟦 正在開啟時空門...\n\n    🔵\n   🔵🔵🔵\n  🔵🔵🔵🔵🔵\n 🔵🔵🔵🔵🔵🔵🔵\n🔵🔵🔵🔵🔵🔵🔵🔵🔵\n 🔵🔵🔵🔵🔵🔵🔵\n  🔵🔵🔵🔵🔵\n   🔵🔵🔵\n    🔵\n\n🚪 時空門已開啟！\n但是... 你要去哪裡呢？`;
    },
    meme: () => {
      const memes = [
        'This is fine. 🔥🐕🔥',
        'Stonks 📈',
        'Much wow, such terminal 🐕',
        'It\'s not a bug, it\'s a feature! 🐛➡️✨',
        'Works on my machine 🤷‍♂️',
        'Have you tried turning it off and on again? 🔄',
        'There are only 10 types of people in the world: those who understand binary and those who don\'t. 01010000'
      ];
      return '🎭 ' + memes[Math.floor(Math.random() * memes.length)];
    },
    rm: (args) => {
      if (!args[0]) return '請指定要刪除的檔案';
      return rm(args[0]) ? '' : `rm: ${args[0]}: 沒有這個檔案或目錄`;
    },
    cat: (args) => {
      if (!args[0]) return '請指定要讀取的檔案';
      const content = readFile(args[0]);
      if (content === null) return `cat: ${args[0]}: 沒有這個檔案`;
      return content === '' ? '(空檔案)' : content;
    },
    write: (args) => {
      const [name, ...rest] = args;
      if (!name) return '用法：write [檔案] [內容]';
      writeFile(name, rest.join(' '));
      return '';
    },
    figlet: (args) => {
      const text = args.join(' ') || 'ADI';
      return `\n █████╗ ██████╗ ██╗\n██╔══██╗██╔══██╗██║\n███████║██║  ██║██║\n██╔══██║██║  ██║██║\n██║  ██║██████╔╝██║\n╚═╝  ╚═╝╚═════╝ ╚═╝\n\n"${text}" 的 ASCII 藝術字！`;
    },
    color: () => {
      return `\n🌈 彩色文字測試：\n\n🔴 紅色\n🟠 橙色\n🟡 黃色\n🟢 綠色\n🔵 藍色\n🟣 紫色\n⚫ 黑色\n⚪ 白色`;
    },
    ping: (args) => {
      const host = args[0] || 'localhost';
      const delay = Math.floor(Math.random() * 50) + 1;
      return `PING ${host}\n64 bytes from ${host}: time=${delay}ms\n連線正常! 🌐`;
    },
    ps: () => {
      return `PID    COMMAND\n1      init\n42     terminal\n1337   node\n9999   react-app\n\n共 4 個進程正在運行`;
    },
    tree: () => tree(),
    sl: () => {
      return `\n      🚂💨💨💨\n    oooooooooooo\n   oooooooooooooo\n  oooooooooooooooo\n 🚃🚃🚃🚃🚃🚃🚃🚃\n\n嘟嘟～火車開過去了！\n(這是 'ls' 打錯字的經典彩蛋)`;
    },
  };

  function handleCommand(input, setLines) {
    const [cmd, ...args] = input.trim().split(/\s+/);
    const handler = commands[cmd];
    if (handler) {
      return handler(args, setLines) ?? undefined;
    }
    return `command not found: ${cmd}`;
  }

  const complete = (input) => completeInput(input, Object.keys(commands), entryNames());

  return { handleCommand, complete };
}

// 補完規則：第一個字補指令，其餘補目前目錄的檔名。回傳 { value, hint }，
// hint 是有多個候選時要印出來的清單（跟真的 shell 一樣按兩次才列出）。
export function completeInput(input, commandNames, names) {
  const parts = input.split(/(\s+)/);
  const last = parts[parts.length - 1];
  const isFirstWord = parts.filter(p => p.trim()).length <= 1 && !/\s$/.test(input);
  const pool = isFirstWord ? commandNames : names;
  const matches = pool.filter(name => name.startsWith(last) && last !== '');
  if (matches.length === 0) return { value: input, hint: '' };

  // 補到所有候選的共同前綴為止
  let prefix = matches[0];
  for (const match of matches) {
    while (!match.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  const value = input.slice(0, input.length - last.length) + prefix;
  return {
    value: matches.length === 1 ? `${value} ` : value,
    hint: matches.length > 1 ? matches.join('  ') : '',
  };
}
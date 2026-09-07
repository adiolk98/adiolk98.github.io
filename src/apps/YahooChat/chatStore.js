// 這個站是純靜態部署（GitHub Pages），沒有 /api/chat 這個後端——
// 原本的 fetch 每兩秒打一次 404，訊息永遠是空的、狀態卻顯示「已連線」。
// 改成瀏覽器本機的訊息庫：留言會留著，同一台機器開兩個分頁也會同步。
const STORAGE_KEY = 'yahoo-chat-messages';

const SEED = {
  'message-board': [
    { user: 'adi', text: '這裡是留言板，想說什麼都可以留 👋🏻', timestamp: '2024-08-01T10:00:00.000Z' },
  ],
  'tech-talk': [
    { user: 'adi', text: '有卡住的 bug 也可以丟上來，當成 stackoverflow 用。', timestamp: '2024-08-01T10:05:00.000Z' },
  ],
  'gaming': [
    { user: 'adi', text: '有人要一起打魔物嗎', timestamp: '2024-08-01T10:10:00.000Z' },
  ],
};

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    console.warn('Chat store read failed (handled):', error.message);
    return {};
  }
}

function writeAll(all) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  } catch (error) {
    console.warn('Chat store write failed (handled):', error.message);
    return false;
  }
}

export function loadMessages(roomId) {
  const all = readAll();
  return all[roomId] ?? SEED[roomId] ?? [];
}

export function appendMessage(roomId, message) {
  const all = readAll();
  const next = [...(all[roomId] ?? SEED[roomId] ?? []), message];
  all[roomId] = next;
  return writeAll(all) ? next : null;
}

export function clearRoom(roomId) {
  const all = readAll();
  delete all[roomId];
  writeAll(all);
  return SEED[roomId] ?? [];
}

// 其他分頁寫入時 localStorage 會發 storage 事件，用它做跨視窗同步。
export function subscribe(roomId, onChange) {
  const handler = (event) => {
    if (event.key && event.key !== STORAGE_KEY) return;
    onChange(loadMessages(roomId));
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

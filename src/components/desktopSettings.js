// 桌面偏好設定：桌布、圖示位置。都存在瀏覽器裡，重新整理後還在。
const WALLPAPER_KEY = 'desktop-wallpaper';
const ICONS_KEY = 'desktop-icon-positions';

export const WALLPAPERS = [
  { id: 'video', name: '動態桌布', type: 'video', src: '/assets/wallpaper-compressed.mp4' },
  { id: 'phosphor', name: '螢光幕綠', type: 'color', src: 'radial-gradient(ellipse 90% 80% at 50% 40%, #1d3a2a 0%, #0d1f16 60%, #060d0a 100%)' },
  { id: 'rose', name: '奶油玫瑰', type: 'color', src: 'linear-gradient(160deg, #d98d94 0%, #ecd8a6 55%, #f3e7d0 100%)' },
  { id: 'website', name: '網站截圖', type: 'image', src: '/assets/photo/website.webp' },
  { id: 'camera', name: '底片照', type: 'image', src: '/assets/photo/camera-5.jpg' },
  { id: 'cat', name: '好貓', type: 'image', src: '/assets/photo/good-cat.png' },
];

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Failed to read ${key} (handled):`, error.message);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to persist ${key} (handled):`, error.message);
  }
}

export const loadWallpaperId = () => read(WALLPAPER_KEY, WALLPAPERS[0].id);
export const saveWallpaperId = (id) => write(WALLPAPER_KEY, id);

export const wallpaperById = (id) => WALLPAPERS.find(w => w.id === id) || WALLPAPERS[0];
export const nextWallpaperId = (id) => {
  const index = WALLPAPERS.findIndex(w => w.id === id);
  return WALLPAPERS[(index + 1) % WALLPAPERS.length].id;
};

export const loadIconPositions = () => read(ICONS_KEY, {});
export const saveIconPositions = (positions) => write(ICONS_KEY, positions);

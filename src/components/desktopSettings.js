// 桌面偏好設定：桌布、圖示位置。都存在瀏覽器裡，重新整理後還在。
const WALLPAPER_KEY = 'desktop-wallpaper-crt';
const ICONS_KEY = 'desktop-icon-positions';

export const WALLPAPERS = [
  { id: 'pixel-dusk', name: '昭和暮色', type: 'pixel', variant: 'dusk' },
  { id: 'pixel-night', name: '深夜街景', type: 'pixel', variant: 'night' },
  { id: 'pixel-rose', name: '玫瑰晨光', type: 'pixel', variant: 'rose' },
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

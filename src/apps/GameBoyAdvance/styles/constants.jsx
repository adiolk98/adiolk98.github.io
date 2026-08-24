// 遊戲常數
export const TILE_SIZE = 16;
export const TILESET_WIDTH = 10;

// 縮放限制
export const MIN_SCALE = 0.5;
export const MAX_SCALE = 2.0;
export const SCALE_STEP = 0.1;

// 顏色
export const COLORS = {
  BACKGROUND: '#2c2c2c',
  PLAYER: '#ff0000',
  STROKE: '#000000',
  WHITE: '#ffffff',
  WOOD_FLOOR: '#deb887',
  CARPET_RED: '#dc143c',
  WINDOW: '#87ceeb',
  DOOR: '#8b4513',
  SNAKE_HEAD: '#1b5e20',
  SNAKE_BODY: '#4caf50',
  SNAKE_FOOD: '#f44336',
  SNAKE_BG: '#f1f8e9'
};

// 遊戲狀態
export const GAME_STATES = {
  OPENING: 'opening',
  PRESS_START: 'press_start',
  WORLD: 'world',
  SNAKE: 'snake'
};

// 方向
export const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};
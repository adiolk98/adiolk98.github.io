import { useEffect } from 'react';
import { GAME_STATES } from '../styles/constants';

// targetRef：綁在 GBA 機身上而不是 window，不然桌面上其他 App
// （Terminal、編輯器）打字時方向鍵和 Enter 也會被這台掌機吃掉。
export const useKeyboard = ({
  gameState,
  movePlayer,
  setSnakeDirection,
  snakeDirection,
  interactWithComputer,
  goToWorld,
  setGameRunning,
  nearComputer,
  onStart,
  targetRef
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'arrowup':
        case 'w':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(0, -1);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.y === 0) {
            setSnakeDirection({x: 0, y: -1});
          }
          break;
        case 'arrowdown':
        case 's':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(0, 1);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.y === 0) {
            setSnakeDirection({x: 0, y: 1});
          }
          break;
        case 'arrowleft':
        case 'a':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(-1, 0);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.x === 0) {
            setSnakeDirection({x: -1, y: 0});
          }
          break;
        case 'arrowright':
        case 'd':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(1, 0);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.x === 0) {
            setSnakeDirection({x: 1, y: 0});
          }
          break;
        case 'enter':
        case ' ':
        case 'z':
          if (gameState === GAME_STATES.PRESS_START) {
            if (onStart) onStart();
          } else if (gameState === GAME_STATES.WORLD && nearComputer) {
            interactWithComputer();
          }
          break;
        case 'escape':
        case 'x':
          if (gameState === GAME_STATES.SNAKE) {
            goToWorld();
            setGameRunning(false);
          }
          break;
        default:
          break;
      }
    };

    const target = targetRef?.current;
    if (!target) return;
    target.addEventListener('keydown', handleKeyPress);
    return () => {
      target.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState, snakeDirection, nearComputer, movePlayer, setSnakeDirection, interactWithComputer, goToWorld, setGameRunning, onStart, targetRef]);
};
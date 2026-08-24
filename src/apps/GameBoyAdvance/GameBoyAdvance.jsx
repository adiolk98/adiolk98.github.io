import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GBABody from './components/GBABody';
import GBAScreen from './components/GBAScreen';
import SizeController from './components/SizeController';
import OpeningVideo from './games/OpeningVideo';
import PressStartScreen from './games/PressStartScreen';
import WorldGame from './games/WorldGame/WorldGame';
import SnakeGame from './games/SnakeGame/SnakeGame';
import { useGameState } from './hooks/useGameState';
import { useScale } from './hooks/useScale';
import { useKeyboard } from './hooks/useKeyboard';

const GameBoyAdvance = () => {
  const { gameState, goToWorld, goToSnake, goToPressStart, isOpening, isPressStart, isWorld, isSnake } = useGameState();
  const { scale, scaleUp, scaleDown } = useScale(1);
  const navigate = useNavigate();
  const handleStart = () => navigate('/game');
  
  // 貪吃蛇遊戲狀態
  const [snakeDirection, setSnakeDirection] = useState({ x: 1, y: 0 });
  const [nearComputer, setNearComputer] = useState(false);

  // 世界遊戲引用
  const worldGameRef = useRef(null);
  const snakeGameRef = useRef(null);

  // 玩家移動函數
  const movePlayer = (dx, dy) => {
    if (worldGameRef.current && worldGameRef.current.movePlayer) {
      worldGameRef.current.movePlayer(dx, dy);
    }
  };

  // 更新nearComputer狀態
  useEffect(() => {
    if (worldGameRef.current && worldGameRef.current.nearComputer !== undefined) {
      setNearComputer(worldGameRef.current.nearComputer);
    }
  }, [isWorld]);

  // 與電腦互動
  const interactWithComputer = () => {
    goToSnake();
  };

  // 蛇遊戲方向設置
  const setSnakeDirectionHandler = (direction) => {
    if (snakeGameRef.current && snakeGameRef.current.setDirection) {
      snakeGameRef.current.setDirection(direction);
    }
    setSnakeDirection(direction);
  };

  // 鍵盤控制
  useKeyboard({
    gameState,
    movePlayer,
    setSnakeDirection: setSnakeDirectionHandler,
    snakeDirection,
    interactWithComputer,
    goToWorld,
    setGameRunning: () => {}, // 空函數，因為貪吃蛇遊戲自己管理狀態
    nearComputer
  });

  const renderGameContent = () => {
    if (isOpening) {
      return <OpeningVideo onVideoEnd={goToPressStart} />;
    }

    if (isPressStart) {
      return <PressStartScreen onStart={handleStart} />;
    }

    if (isWorld) {
      return (
        <WorldGame
          onComputerInteract={interactWithComputer}
          ref={worldGameRef}
        />
      );
    }
    
    if (isSnake) {
      return <SnakeGame onExit={goToWorld} ref={snakeGameRef} />;
    }
    
    return null;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SizeController 
        scale={scale} 
        scaleUp={scaleUp} 
        scaleDown={scaleDown} 
      />
      
      <GBABody scale={scale}>
        <GBAScreen>
          {renderGameContent()}
        </GBAScreen>
      </GBABody>
    </div>
  );
};

export default GameBoyAdvance;
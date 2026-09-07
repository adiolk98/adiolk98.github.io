import React from 'react';

// Enter 由 GameBoyAdvance 的 useKeyboard 統一處理（綁在機身上，不是 window）。
const PressStartScreen = ({ onStart }) => {
  return (
    <div
      onClick={onStart}
      style={{
        width: '100%',
        height: '100%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <span
        className="game-blink"
        style={{ color: '#fff', fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
      >
        PRESS START
      </span>
    </div>
  );
};

export default PressStartScreen;

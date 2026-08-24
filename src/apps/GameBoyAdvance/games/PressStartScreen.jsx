import React, { useEffect } from 'react';

const PressStartScreen = ({ onStart }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') onStart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStart]);

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

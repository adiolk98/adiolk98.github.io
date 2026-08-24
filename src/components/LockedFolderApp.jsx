import React, { useState } from 'react';
import PasswordModal from './PasswordModal';

const FOLDER_PASSWORD = '0477';
const UNLOCK_KEY = 'puzzle-folder-unlocked';

function LockedFolderApp() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(UNLOCK_KEY) === '1');
  const [showPassword, setShowPassword] = useState(() => localStorage.getItem(UNLOCK_KEY) !== '1');

  const handleSubmit = (input) => {
    if (input === FOLDER_PASSWORD) {
      localStorage.setItem(UNLOCK_KEY, '1');
      setUnlocked(true);
      setShowPassword(false);
      return true;
    }
    return false;
  };

  if (!unlocked) {
    return (
      <div style={{
        padding: 24, textAlign: 'center', color: '#eee', background: '#111',
        height: '100%', boxSizing: 'border-box', fontFamily: "'DotGothic16', monospace"
      }}>
        <div style={{ marginBottom: 16 }}>🔒 這個資料夾被鎖住了</div>
        {!showPassword && (
          <button className="crt-btn red" onClick={() => setShowPassword(true)}>輸入密碼</button>
        )}
        {showPassword && (
          <PasswordModal
            title="輸入密碼"
            onSubmit={handleSubmit}
            onClose={() => setShowPassword(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%', background: '#111', color: '#eee',
      fontFamily: "'DotGothic16', monospace", fontSize: '1.2em'
    }}>
      你看看窗外。
    </div>
  );
}

export default LockedFolderApp;

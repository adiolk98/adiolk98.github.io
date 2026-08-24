import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Rnd } from 'react-rnd';
import YahooLoginScreen from './YahooLoginScreen';
import YahooMainWindow from './YahooMainWindow';
import YahooChatWindow from './YahooChatWindow';
import GhostChatWindow from './GhostChatWindow';
import './YahooChat.css';

// 聊天彈出視窗要 portal 到桌面視窗層，而不是留在即時通自己的視窗裡，
// 這樣才會是一個真正獨立、可拖曳的桌面視窗，而不是被裁切在母視窗內的子視窗。
const DESKTOP_WINDOWS_LAYER_ID = 'desktop-windows-layer';

// 主要即時通組件
function YahooChat() {
  const [username, setUsername] = useState('');
  const [openChatWindows, setOpenChatWindows] = useState({}); // 管理多個聊天視窗

  // 組件載入時檢查是否有保存的nickname
  useEffect(() => {
    const savedNickname = localStorage.getItem('yahoo-messenger-nickname');
    if (savedNickname) {
      setUsername(savedNickname);
    }
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    // 將nickname保存到localStorage
    localStorage.setItem('yahoo-messenger-nickname', name);
  };

  const handleLogout = () => {
    setUsername('');
    setOpenChatWindows({}); // 關閉所有聊天視窗
    // 清除保存的nickname
    localStorage.removeItem('yahoo-messenger-nickname');
  };

  const handleOpenChat = (room) => {
    setOpenChatWindows(prev => ({
      ...prev,
      [room.id]: room
    }));
  };

  const handleCloseChat = (roomId) => {
    setOpenChatWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[roomId];
      return newWindows;
    });
  };

  // 如果未登入，顯示登入畫面
  if (!username) {
    return <YahooLoginScreen onLogin={handleLogin} />;
  }

  // 登入後顯示主界面
  return (
    <div className="instant-chat-container">
      {/* 主界面 */}
      <YahooMainWindow 
        username={username}
        onLogout={handleLogout}
        onOpenChat={handleOpenChat}
      />

      {/* 彈出的聊天視窗：portal 成獨立的桌面視窗，可自由拖曳，不受即時通母視窗邊界限制 */}
      {typeof document !== 'undefined' && document.getElementById(DESKTOP_WINDOWS_LAYER_ID) &&
        Object.entries(openChatWindows).map(([roomId, room], index) =>
          createPortal(
            <Rnd
              key={roomId}
              default={{ x: 460 + index * 36, y: 90 + index * 36, width: 380, height: 520 }}
              minWidth={300}
              minHeight={360}
              dragHandleClassName="chat-popup-titlebar"
              style={{ zIndex: 1000 + index }}
            >
              {room.id === 'ghost-akai' ? (
                <GhostChatWindow
                  room={room}
                  onClose={() => handleCloseChat(roomId)}
                />
              ) : (
                <YahooChatWindow
                  room={room}
                  username={username}
                  onClose={() => handleCloseChat(roomId)}
                />
              )}
            </Rnd>,
            document.getElementById(DESKTOP_WINDOWS_LAYER_ID),
            roomId
          )
        )}
    </div>
  );
}

export default YahooChat;
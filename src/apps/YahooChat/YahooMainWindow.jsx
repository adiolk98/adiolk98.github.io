import React, { useState } from 'react';

const CHAT_ROOMS = [
  {
    id: 'message-board',
    name: '留言板',
    description: '有什麼想對我說的，請不要吝嗇留言👋🏻',
    icon: '📌',
    status: 'online'
  },
  {
    id: 'tech-talk',
    name: '技術討論',
    description: '你可以分享你的website or 當作stackoverflow',
    icon: '💻',
    status: 'online'
  },
  {
    id: 'offer-chat',
    name: '工作職缺分享',
    description: '如果有好的工作分享，可以留言🙂‍↕️',
    icon: '缺',
    status: 'online'
  },
  {
    id: 'gaming',
    name: '遊戲論壇',
    description: '好想打魔物',
    icon: '🎮',
    status: 'online'
  },
  {
    id: 'music',
    name: '千千靜聽分享群',
    description: '이영지 - Small girl feat. 도경수 (D.O.)',
    icon: '🎵',
    status: 'online'
  },
  {
    id: 'ghost-akai',
    name: '阿凱',
    description: '(這個帳號已經被刪除)',
    icon: '👤',
    status: 'offline'
  }
];

// Yahoo即時通主界面
function YahooMainWindow({ username, onLogout, onOpenChat }) {
  const [userStatus, setUserStatus] = useState('你在做什麼？');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const handleStatusEdit = () => {
    setIsEditingStatus(true);
  };

  const handleStatusSave = (e) => {
    if (e.key === 'Enter') {
      setIsEditingStatus(false);
    }
  };

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
  };

  return (
    <div className="yahoo-main-window">
      {/* 工具列 */}
      <div className="main-toolbar">
        <div className="toolbar-menus">
          <span className="menu-item">即時通(M)</span>
          <span className="menu-item">聯絡人(C)</span>
          <span className="menu-item">設定(S)</span>
          <span className="menu-item">說明(H)</span>
        </div>
        <div className="toolbar-buttons">
          <button className="toolbar-btn" onClick={handleLogout}>登出</button>
        </div>
      </div>

      {/* 用戶資訊區 */}
      <div className="user-info-section">
        <div className="user-avatar">👤</div>
        <div className="user-details">
          <div className="user-name-dropdown">
            <div className="online room-status"></div>
            <span className="user-name">{username}</span>
            <button 
              className="dropdown-arrow"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              ▼
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleLogout}>
                  登出
                </div>
              </div>
            )}
          </div>
          <div className="user-status-container">
            {isEditingStatus ? (
              <input
                type="text"
                value={userStatus}
                onChange={(e) => setUserStatus(e.target.value)}
                onKeyDown={handleStatusSave}
                onBlur={() => setIsEditingStatus(false)}
                className="status-input"
                autoFocus
              />
            ) : (
              <span 
                className="user-status"
                onClick={handleStatusEdit}
              >
                {userStatus}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 搜尋區 */}
      {/* <div className="search-section">
        <div className="search-tabs">
          <button className="search-tab active">我的聊天室</button>
          <button className="search-tab">全部聊天室</button>
        </div>
        <div className="search-input-container">
          <input 
            type="text" 
            placeholder="搜尋聊天室或聯絡人..."
            className="search-input"
          />
        </div>
      </div> */}

      {/* 聊天室列表 */}
      <div className="chatroom-list">
        <div className="list-header">
          <span className="list-title">📋 聊天室 ({CHAT_ROOMS.length})</span>
        </div>
        <div className="list-content">
          {CHAT_ROOMS.map(room => (
            <div 
              key={room.id}
              className="chatroom-item"
              onClick={() => onOpenChat(room)}
            >
              <div className="room-icon">{room.icon}</div>
              <div className="room-info">
                <div className="room-name">{room.name}</div>
                <div className="room-description">{room.description}</div>
              </div>
              <div className={`room-status ${room.status}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部狀態列 */}
      <div className="main-statusbar">
        <span>準備就緒</span>
        <span>{CHAT_ROOMS.length} 個聊天室</span>
      </div>
    </div>
  );
}

export default YahooMainWindow;
import React from 'react';

// 純前端的固定對話紀錄，不會呼叫真實留言板 API。
const MESSAGES = [
  { time: '凌晨 3:14', text: '欸，你最近有看那天的影片嗎' },
  { time: '凌晨 3:14', text: '就我們去那間舊公寓拍的那支' },
  { time: '凌晨 3:15', text: '我後來重看了一次，裡面有一段拍到不該拍到的東西' },
  { time: '凌晨 3:16', text: '而且我最近每天晚上睡覺，都會聽到奇怪的音樂...你也有嗎' },
  { time: '凌晨 3:17', text: '對了，如果你要打開我留在你那邊的檔案，密碼是那天的日期，0314' }
];

function GhostChatWindow({ room, onClose }) {
  return (
    <div className="yahoo-chat-popup">
      <div className="chat-popup-titlebar">
        <span className="titlebar-text">{room.icon} {room.name} - Yahoo! 即時通</span>
        <div className="titlebar-buttons">
          <button className="titlebar-btn close" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="chat-popup-messages">
        <div className="messages-header">
          <span>{room.description}</span>
        </div>
        <div className="messages-content">
          {MESSAGES.map((msg, i) => (
            <div key={i} className="message-item">
              <div className="message-header">
                <span className="message-user">{room.name}</span>
                <span className="message-time">{msg.time}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-popup-statusbar">
        <span>{room.icon}</span>
        <span>此帳號無法回覆</span>
      </div>
    </div>
  );
}

export default GhostChatWindow;

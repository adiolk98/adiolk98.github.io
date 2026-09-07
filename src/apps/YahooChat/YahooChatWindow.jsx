import React, { useState, useEffect, useRef } from 'react';
import { loadMessages, appendMessage, clearRoom, subscribe } from './chatStore';

// Yahoo即時通經典功能
const INSTANT_FEATURES = {
  '/buzz': '嗡嗡嗡！',
  '/nudge': '敲敲',
  '/wink': '眨眨眼 😉',
  '/kiss': '給你一個吻 💋',
  '/hug': '給你一個抱抱 🤗'
};

const EMOJIS = ['😊', '😂', '😭', '😎', '👍', '🙏', '🔥', '💀', '🎉', '❤️', '🐱', '☕'];

// 聊天視窗組件 - 作為彈出視窗
function YahooChatWindow({ room, username, onClose }) {
  const [messages, setMessages] = useState(() => loadMessages(room.id));
  const [inputText, setInputText] = useState('');
  const [storageOk, setStorageOk] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const windowRef = useRef(null);

  // 換聊天室時重新載入，並訂閱其他分頁的寫入
  useEffect(() => {
    setMessages(loadMessages(room.id));
    return subscribe(room.id, setMessages);
  }, [room.id]);

  const refresh = () => setMessages(loadMessages(room.id));

  const sendMessage = (text) => {
    const next = appendMessage(room.id, {
      user: username,
      text,
      timestamp: new Date().toISOString(),
    });
    if (next) setMessages(next);
    setStorageOk(Boolean(next));
  };

  const insertEmoji = (emoji) => {
    setInputText(prev => prev + emoji);
    setShowEmojis(false);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const command = INSTANT_FEATURES[inputText.trim()];
      if (command) {
        sendMessage(command);
      } else {
        sendMessage(inputText.trim());
      }
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-TW', { 
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 工具列功能 - 叮咚 + 搖晃視窗
  const handleDingDongShake = () => {
    // 發送叮咚訊息
    sendMessage('🔔 叮咚！有人在家嗎？');
    // 同時搖晃視窗
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  };

  return (
    <div className={`yahoo-chat-popup ${isShaking ? 'shake' : ''}`} ref={windowRef}>
      {/* 聊天視窗標題列 */}
      <div className="chat-popup-titlebar">
        <span className="titlebar-text">
          {room.icon} {room.name} - Yahoo! 即時通
        </span>
        <div className="titlebar-buttons">
          <button className="titlebar-btn close" onClick={onClose}>×</button>
        </div>
      </div>

      {/* 聊天訊息區 */}
      <div className="chat-popup-messages">
        <div className="messages-header">
          <span>{room.description}</span>
          <div>
            <button onClick={refresh} className="refresh-btn" title="重新整理">🔄</button>
            <button
              onClick={() => setMessages(clearRoom(room.id))}
              className="refresh-btn"
              title="清空這個聊天室"
            >
              🧹
            </button>
          </div>
        </div>
        
        <div className="messages-content">
          {messages.length === 0 ? (
            <div className="no-messages">
              <p>目前沒有訊息</p>
              <p>開始您的第一個對話吧！</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message-item">
                <div className="message-header">
                  <span className={`message-user ${msg.user === username ? 'own-user' : ''}`}>
                    {msg.user}
                  </span>
                  <span className="message-time">
                    {formatTime(msg.timestamp || msg.createdAt || Date.now())}
                  </span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 工具列 */}
      <div className="chat-popup-toolbar">
        <div className="toolbar-left">
          <button className="chat-btn" onClick={handleDingDongShake} title="叮咚！有人在家嗎？(搖晃視窗)">
            🔔
          </button>
          <button
            className="chat-btn"
            onClick={() => setShowEmojis(v => !v)}
            title="表情符號"
          >
            😊
          </button>
          {showEmojis && (
            <div className="emoji-picker">
              {EMOJIS.map(emoji => (
                <button key={emoji} onClick={() => insertEmoji(emoji)}>{emoji}</button>
              ))}
            </div>
          )}
        </div>
        <div className="toolbar-right">
          <span className={`connection-status ${storageOk ? 'connected' : 'disconnected'}`}>
            {storageOk ? '🟢 本機模式' : '🔴 無法儲存'}
          </span>
        </div>
      </div>

      {/* 輸入區域 */}
      <div className="chat-popup-input">
        <div className="input-container">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={room.id === 'message-board' 
              ? '在留言板留下您的足跡... ' 
              : '輸入訊息... '
            }
            className="message-input"
            rows="3"
          />
          <button 
            onClick={handleSend}
            className="send-btn"
            disabled={!inputText.trim()}
          >
            傳送
          </button>
        </div>
      </div>

      {/* 狀態列 */}
      <div className="chat-popup-statusbar">
        <span>{room.icon}</span>
        <span>訊息數: {messages.length}</span>
      </div>
    </div>
  );
}

export default YahooChatWindow;
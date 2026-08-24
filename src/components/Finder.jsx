import React, { useState } from 'react';
import { useFileSystem } from '../apps/FileSystemContext';
import PasswordModal from './PasswordModal';
import './Finder.css';

const NOTE_FILE = '未命名.txt';
const NOTE_PASSWORD = '0314';
const NOTE_CONTENT = '如果你在看這個...\n那首歌還沒停過。\n\n千千靜聽裡，找那個編號 0477 的錄音檔。';
const NOTE_UNLOCK_KEY = 'puzzle-note-unlocked';

function Finder() {
  const { fileSystem, currentPath, cd } = useFileSystem();
  const [showPassword, setShowPassword] = useState(false);
  const [viewingContent, setViewingContent] = useState(null);
  const [noteUnlocked, setNoteUnlocked] = useState(() => localStorage.getItem(NOTE_UNLOCK_KEY) === '1');

  // 取得目前目錄的 node
  function findNodeByPath(root, pathArr) {
    let node = root;
    for (const part of pathArr) {
      if (!node.children) return null;
      node = node.children.find(child => child.name === part && child.type === 'folder');
      if (!node) return null;
    }
    return node;
  }
  const currentNode = findNodeByPath(fileSystem, currentPath) || fileSystem;

  const handleFileClick = (child) => {
    if (child.name !== NOTE_FILE) return;
    if (noteUnlocked) {
      setViewingContent(NOTE_CONTENT);
      return;
    }
    setShowPassword(true);
  };

  const handlePasswordSubmit = (input) => {
    if (input === NOTE_PASSWORD) {
      localStorage.setItem(NOTE_UNLOCK_KEY, '1');
      setNoteUnlocked(true);
      setShowPassword(false);
      setViewingContent(NOTE_CONTENT);
      return true;
    }
    return false;
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <b>目前路徑：</b>/{currentPath.join('/')}
      </div>
      <div className="finder-icon-grid">
        {currentPath.length > 0 && (
          <button className="finder-icon" onDoubleClick={() => cd('..')}>
            <img src="/assets/app/finder-folder.svg" alt="" width="48" height="48" />
            <span>.. (上一層)</span>
          </button>
        )}
        {currentNode.children && currentNode.children.map(child => {
          const locked = child.name === NOTE_FILE && !noteUnlocked;
          const openChild = () => child.type === 'folder' ? cd(child.name) : handleFileClick(child);
          return (
            <button
              key={child.name}
              className="finder-icon"
              onDoubleClick={openChild}
              onClick={() => { if (typeof window !== 'undefined' && window.innerWidth <= 768) openChild(); }}
            >
              {child.type === 'folder' ? (
                <img src="/assets/app/finder-folder.svg" alt="" width="48" height="48" />
              ) : (
                <span className="finder-icon-emoji">{locked ? '🔒' : '📄'}</span>
              )}
              <span>{child.name}</span>
            </button>
          );
        })}
      </div>

      {showPassword && (
        <PasswordModal
          title={`輸入密碼以開啟「${NOTE_FILE}」`}
          onSubmit={handlePasswordSubmit}
          onClose={() => setShowPassword(false)}
        />
      )}

      {viewingContent && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998
          }}
          onClick={() => setViewingContent(null)}
        >
          <div
            className="crt-panel px"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 300, whiteSpace: 'pre-wrap', fontFamily: "'DotGothic16', monospace" }}
          >
            {viewingContent}
          </div>
        </div>
      )}
    </div>
  );
}

export default Finder;

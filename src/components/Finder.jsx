import React, { useState } from 'react';
import { useFileSystem, findNodeByPath } from '../apps/FileSystemContext';
import PasswordModal from './PasswordModal';
import './Finder.css';

const NOTE_FILE = '未命名.txt';
const NOTE_PASSWORD = '0314';
const NOTE_UNLOCK_KEY = 'puzzle-note-unlocked';

function Finder() {
  const { fileSystem, currentPath, setCurrentPath, cd, mkdir, touch, rm, readFile } = useFileSystem();
  const [showPassword, setShowPassword] = useState(false);
  const [viewing, setViewing] = useState(null); // { name, content }
  const [selected, setSelected] = useState(null);
  const [noteUnlocked, setNoteUnlocked] = useState(() => localStorage.getItem(NOTE_UNLOCK_KEY) === '1');

  const currentNode = findNodeByPath(fileSystem, currentPath) || fileSystem;
  // 資料夾排前面，跟真的檔案總管一樣
  const entries = [...(currentNode.children || [])].sort((a, b) =>
    a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'folder' ? -1 : 1
  );

  const openFile = (child) => {
    if (child.name === NOTE_FILE && !noteUnlocked) {
      setShowPassword(true);
      return;
    }
    setViewing({ name: child.name, content: readFile(child.name) ?? '' });
  };

  const handlePasswordSubmit = (input) => {
    if (input !== NOTE_PASSWORD) return false;
    localStorage.setItem(NOTE_UNLOCK_KEY, '1');
    setNoteUnlocked(true);
    setShowPassword(false);
    setViewing({ name: NOTE_FILE, content: readFile(NOTE_FILE) ?? '' });
    return true;
  };

  // 用視窗內的輸入列，而不是瀏覽器原生 prompt——原生對話框會跳出整個桌面。
  const [creating, setCreating] = useState(null); // { type, value }

  const submitCreate = (e) => {
    e.preventDefault();
    const name = creating.value.trim();
    if (name) (creating.type === 'folder' ? mkdir : touch)(name);
    setCreating(null);
  };

  const deleteSelected = () => {
    if (!selected) return;
    rm(selected);
    setSelected(null);
  };

  const isTouch = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className="finder-app">
      <div className="finder-toolbar">
        <button className="finder-tool" onClick={() => cd('..')} disabled={currentPath.length === 0} title="上一層">↰</button>
        <nav className="finder-crumbs" aria-label="路徑">
          <button className="finder-crumb" onClick={() => setCurrentPath([])}>電腦</button>
          {currentPath.map((part, i) => (
            <button
              key={`${part}-${i}`}
              className="finder-crumb"
              onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
            >
              {part}
            </button>
          ))}
        </nav>
        <div className="finder-tools">
          <button className="finder-tool" onClick={() => setCreating({ type: 'folder', value: '新增資料夾' })} title="新增資料夾">＋📁</button>
          <button className="finder-tool" onClick={() => setCreating({ type: 'file', value: 'untitled.txt' })} title="新增檔案">＋📄</button>
          <button className="finder-tool" onClick={deleteSelected} disabled={!selected} title="刪除">🗑</button>
        </div>
      </div>

      {creating && (
        <form className="finder-newrow" onSubmit={submitCreate}>
          <span>{creating.type === 'folder' ? '📁' : '📄'}</span>
          <input
            autoFocus
            value={creating.value}
            onChange={(e) => setCreating({ ...creating, value: e.target.value })}
            onKeyDown={(e) => e.key === 'Escape' && setCreating(null)}
          />
          <button className="finder-tool" type="submit">建立</button>
          <button className="finder-tool" type="button" onClick={() => setCreating(null)}>取消</button>
        </form>
      )}

      <div className="finder-icon-grid">
        {entries.map(child => {
          const locked = child.name === NOTE_FILE && !noteUnlocked;
          const open = () => (child.type === 'folder' ? cd(child.name) : openFile(child));
          return (
            <button
              key={child.name}
              className={`finder-icon${selected === child.name ? ' selected' : ''}`}
              onDoubleClick={open}
              onClick={() => {
                setSelected(child.name);
                if (isTouch) open();
              }}
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
        {entries.length === 0 && <div className="finder-empty">這個資料夾是空的</div>}
      </div>

      <div className="finder-statusbar">
        <span>{entries.length} 個項目</span>
        <span>{selected || '未選取'}</span>
      </div>

      {showPassword && (
        <PasswordModal
          title={`輸入密碼以開啟「${NOTE_FILE}」`}
          onSubmit={handlePasswordSubmit}
          onClose={() => setShowPassword(false)}
        />
      )}

      {viewing && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998
          }}
          onClick={() => setViewing(null)}
        >
          <div
            className="crt-panel px"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 300, whiteSpace: 'pre-wrap', fontFamily: "'DotGothic16', monospace" }}
          >
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>{viewing.name}</div>
            {viewing.content || '(空檔案)'}
          </div>
        </div>
      )}
    </div>
  );
}

export default Finder;

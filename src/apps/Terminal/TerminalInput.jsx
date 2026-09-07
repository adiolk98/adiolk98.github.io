import React, { useState, useEffect } from 'react';
import { useFileSystem } from '../FileSystemContext';

function TerminalInput({ onCommand, onHistoryNav, onComplete, onInterrupt, inputRef }) {
  const [input, setInput] = useState('');
  const { currentPath } = useFileSystem();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim() !== '') {
        onCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      setInput(onHistoryNav('up'));
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      setInput(onHistoryNav('down'));
      e.preventDefault();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input.trim()) setInput(onComplete(input));
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      onInterrupt(input);
      setInput('');
    }
  };

  // 產生 prompt 文字
  const prompt = '/' + (currentPath.length ? currentPath.join('/') : '');

  return (
    <div className="terminal-input-line">
      <span className="terminal-prompt">{prompt}&nbsp;</span>
      <input
        ref={inputRef}
        className="terminal-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

export default TerminalInput; 
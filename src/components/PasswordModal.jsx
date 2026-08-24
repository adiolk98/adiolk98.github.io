import React, { useState } from 'react';

// onSubmit(password) should return true on success, false on wrong password.
function PasswordModal({ title = '輸入密碼', onSubmit, onClose }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onSubmit(value.trim());
    if (!ok) {
      setError(true);
      setTimeout(() => setError(false), 400);
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
      }}
      onClick={onClose}
    >
      <form
        className="crt-panel px"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          width: 260,
          animation: error ? 'password-shake 0.4s' : 'none',
          fontFamily: "'DotGothic16', monospace"
        }}
      >
        <div style={{ marginBottom: 10, fontSize: '0.95em' }}>{title}</div>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '100%', boxSizing: 'border-box', padding: '6px 8px',
            marginBottom: 10, border: '2px solid var(--crt-ink)', background: 'var(--crt-rose-ink)'
          }}
        />
        {error && <div style={{ color: 'var(--crt-red)', fontSize: '0.8em', marginBottom: 8 }}>密碼不對...</div>}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="button" className="crt-btn dark" onClick={onClose}>取消</button>
          <button type="submit" className="crt-btn red">確認</button>
        </div>
      </form>
      <style>{`
        @keyframes password-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export default PasswordModal;

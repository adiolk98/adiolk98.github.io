import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/crtPixel.css';

const WORK = [
  { title: 'Retro OS', desc: '把個人網站重新做成一台桌面電腦：可拖曳視窗、應用程式與小遊戲。', tag: 'WEB' },
  { title: 'CCD Cam', desc: '網路攝影機模擬 Kodak DC50 —— 顆粒、光暈與類比感的不完美。', tag: 'IMG' },
];

const CONTACT = [
  { label: 'email', value: 'kokp520@gmail.com', href: 'mailto:kokp520@gmail.com' },
  { label: 'github', value: '@kokp520', href: 'https://github.com/kokp520' },
];

export const Me: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const okRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dialogOpen) return;
    okRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        setDialogOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dialogOpen]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>adi | Designer & Developer</title>
        <meta name="description" content="I'm adi — a designer, developer and maker. I build thoughtful, playful digital work across web, 3D, and typography." />
      </Helmet>

      <div className="crt-bar px" style={{ margin: '.7em .7em 0' }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '.85em', letterSpacing: '.04em' }}>
          adiolk<span style={{ opacity: .6 }}>98</span>
        </span>
        <button
          className="crt-btn tan px"
          style={{ marginLeft: 'auto', fontSize: '.66em' }}
          onClick={() => setDialogOpen(true)}
        >
          自我介紹
        </button>
      </div>

      <nav className="crt-nav px" style={{ margin: '.6em .7em 0' }}>
        <a href="#/" className="crt-nav-link">首頁</a>
        <a href="#/tools" className="crt-nav-link">工具</a>
        <a href="#/me" className="on">簡介</a>
      </nav>

      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: '.9em .7em 1.2em', display: 'flex', flexDirection: 'column', gap: '.9em' }}>
        <section className="crt-panel px" style={{ fontSize: '1.1em' }}>
          <div style={{ fontSize: '1.3em', lineHeight: 1.55, marginBottom: '.5em' }}>
            用<em style={{ color: 'var(--crt-red-lo)', fontStyle: 'normal' }}>細心與工藝</em>設計小系統。
          </div>
          <p style={{ color: 'var(--crt-ink-2)', lineHeight: 1.7, margin: 0 }}>
            我是 adiolk98，一名設計師、開發者與創作者。我在 web、3D 與字體排印之間，打造有想法又帶點玩心的作品。
          </p>
        </section>

        <section>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '.7em', color: 'var(--crt-rose)', marginBottom: '.6em' }}>
            精選作品
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '.7em' }}>
            {WORK.map(w => (
              <div key={w.title} className="crt-panel pink px">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.1em' }}>{w.title}</strong>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '.6em', color: 'var(--crt-ink-2)' }}>{w.tag}</span>
                </div>
                <p style={{ margin: '.4em 0 0', color: 'var(--crt-ink-2)', fontSize: '.95em', lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '.7em', color: 'var(--crt-rose)', marginBottom: '.6em' }}>
            聯絡方式
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '.7em' }}>
            {CONTACT.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="crt-panel px" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '.6em', color: 'var(--crt-ink-2)' }}>{c.label}</div>
                <div style={{ fontWeight: 700, fontSize: '1em', marginTop: '.3em' }}>{c.value}</div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className={`crt-scrim${dialogOpen ? ' on' : ''}`} onClick={e => { if (e.target === e.currentTarget) setDialogOpen(false); }}>
        <div className="crt-dlgwrap">
          <div className="crt-dlg crt-panel px" role="dialog" aria-modal="true" aria-labelledby="me-dtit">
            <h2 id="me-dtit">關於 adi</h2>
            <div className="rule" />
            <p>
              喜歡把<em className="kw">介面</em>做得有記憶點 —— 從像素風的桌面模擬器到細節講究的工具頁，
              都是同一個人在不同心情下的作品。
            </p>
            <button ref={okRef} className="crt-btn red px" onClick={() => setDialogOpen(false)}>
              OK
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .crt-nav-link{ color: var(--crt-ink-2); }
        .crt-nav-link.on, .crt-nav a.on{ background: rgba(216,115,122,.18); color: var(--crt-red-lo); box-shadow: inset 0 -.28em 0 var(--crt-red); }
      `}</style>
    </div>
  );
};

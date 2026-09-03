import React, { useEffect, useRef } from 'react';
import '../styles/crtPixel.css';

// convex strength — larger = more bulge, but also more mismatch between the warped
// (visual) and unwarped (actual, since CSS filter is paint-only) position of clickable
// elements. Kept lower than the skill default (0.05) because this tube wraps a fully
// interactive desktop — see close-button hit-area note in WindowXP.jsx.
const K = 0.032;

/** squircle outline for the glass clip-path: near-square, corners rounded, edges bowed. Pure percentages, so computed once. */
function squirclePolygon(n = 9, N = 112): string {
  const pts: string[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = 50 + 50 * Math.sign(c) * Math.abs(c) ** (2 / n);
    const y = 50 + 50 * Math.sign(s) * Math.abs(s) ** (2 / n);
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${pts.join(',')})`;
}
const GLASS_CLIP = squirclePolygon();

/** destination (nx,ny) samples source at (nx*s, ny*s); s decreases with radius so the centre magnifies. */
function buildBulgeMap(w: number, h: number): { url: string; scale: number } {
  const mw = 512;
  const mh = Math.max(64, Math.round((512 * h) / w));
  const cv = document.createElement('canvas');
  cv.width = mw;
  cv.height = mh;
  const ctx = cv.getContext('2d')!;
  const img = ctx.createImageData(mw, mh);
  const d = img.data;

  const denom = 1 + 2 * K;
  const dxs = new Float32Array(mw * mh);
  const dys = new Float32Array(mw * mh);
  let maxD = 1e-6;

  for (let j = 0; j < mh; j++) {
    const ny = (j / (mh - 1)) * 2 - 1;
    for (let i = 0; i < mw; i++) {
      const nx = (i / (mw - 1)) * 2 - 1;
      const s = (1 + K * (nx * nx + ny * ny)) / denom;
      const k = j * mw + i;
      const dx = (dxs[k] = ((nx * s - nx) * w) / 2);
      const dy = (dys[k] = ((ny * s - ny) * h) / 2);
      if (Math.abs(dx) > maxD) maxD = Math.abs(dx);
      if (Math.abs(dy) > maxD) maxD = Math.abs(dy);
    }
  }

  const S = maxD * 2;
  for (let k = 0, o = 0; k < mw * mh; k++, o += 4) {
    d[o] = Math.round((0.5 + dxs[k] / S) * 255);
    d[o + 1] = Math.round((0.5 + dys[k] / S) * 255);
    d[o + 2] = 0;
    d[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return { url: cv.toDataURL('image/png'), scale: S };
}

function drawScanlines(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = (canvas.width = Math.round(canvas.clientWidth * dpr));
  const h = (canvas.height = Math.round(canvas.clientHeight * dpr));
  if (!w || !h) return;
  ctx.clearRect(0, 0, w, h);
  const step = Math.max(3, Math.round(3 * dpr));
  const px = Math.max(1, Math.round(dpr));
  ctx.fillStyle = 'rgba(6,14,22,.17)';
  for (let y = 0; y < h; y += step) ctx.fillRect(0, y, w, px);
  ctx.fillStyle = 'rgba(6,14,22,.09)';
  for (let x = 0; x < w; x += step) ctx.fillRect(x, 0, px, h);
}

/** bakes a hard-edged bitmap cursor (SVG cursors get antialiased and lose the pixel edge). */
function bakeCursor(rows: string[], s: number): string {
  const c = document.createElement('canvas');
  c.width = rows[0].length * s;
  c.height = rows.length * s;
  const x = c.getContext('2d')!;
  for (let j = 0; j < rows.length; j++) {
    for (let i = 0; i < rows[j].length; i++) {
      const ch = rows[j][i];
      if (ch === '.') continue;
      x.fillStyle = ch === '#' ? '#101820' : '#f5ecd8';
      x.fillRect(i * s, j * s, s, s);
    }
  }
  return c.toDataURL('image/png');
}
const ARROW_ROWS = [
  '#..........', '##.........', '#o#........', '#oo#.......', '#ooo#......',
  '#oooo#.....', '#ooooo#....', '#oooooo#...', '#ooooooo#..', '#oooooooo#.',
  '#ooooo####.', '#oo#oo#....', '#o#.#oo#...', '##..#oo#...', '#....#oo#..',
  '.....#oo#..', '......###..',
];
const HAND_ROWS = [
  '..##........', '.#oo#.......', '.#oo#.......', '.#oo#.......', '.#oo#.......',
  '.#oo#.##....', '.#oo#o#o#...', '.#oo#o#o#.#.', '.#oo#o#o#o#.', '##oo#o#o#o#.',
  '#ooooooooo#.', '#ooooooooo#.', '#ooooooooo#.', '.#ooooooo#..', '.#ooooooo#..',
  '..#######...',
];
let cursorCss = '';
function cursorStyle(): string {
  if (!cursorCss) {
    const arrow = bakeCursor(ARROW_ROWS, 2);
    const hand = bakeCursor(HAND_ROWS, 2);
    cursorCss = `
      .crt-tube{cursor:url(${arrow}) 1 1, default}
      .crt-tube button,.crt-tube a,.crt-tube [role="button"],.crt-tube summary{cursor:url(${hand}) 5 0, pointer}
      .crt-tube input,.crt-tube textarea,.crt-tube [contenteditable],.crt-tube .monaco-editor,.crt-tube .xterm{cursor:text}
    `;
  }
  return cursorCss;
}

interface CrtTubeProps {
  children: React.ReactNode;
}

/**
 * The tube: bezel > glass (squircle clip, phosphor ground) > warp (real barrel-distortion
 * filter over live children) > scanline canvas + overlays (sheen/vignette/aberration, undistorted).
 * See private-skills/crt-pixel-ui — this mirrors templates/crt-shell.html verbatim, ported to React.
 */
export default function CrtTube({ children }: CrtTubeProps) {
  const tubeRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const warpRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLCanvasElement>(null);
  const bmapRef = useRef<SVGFEImageElement>(null);
  const bdispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const warp = warpRef.current!;
    const stage = stageRef.current!;
    const scan = scanRef.current!;
    const bmap = bmapRef.current!;
    const bdisp = bdispRef.current!;

    function redraw() {
      drawScanlines(scan);
      // offsetWidth/Height is a layout measurement, unaffected by the paint-only
      // `filter` — toggling it off here bought nothing and caused a visible
      // flash (barrel warp snapping off then back on) on every resize/font-load.
      const w = Math.round(warp.offsetWidth);
      const h = Math.round(warp.offsetHeight);
      if (w < 40) return;
      const m = buildBulgeMap(w, h);
      bmap.setAttribute('href', m.url);
      bmap.setAttribute('xlink:href', m.url);
      bdisp.setAttribute('scale', String(m.scale));
      warp.style.filter = 'url(#crt-barrel)';
    }

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(redraw, 120);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(warp);
    redraw();
    if (document.fonts?.ready) document.fonts.ready.then(redraw);

    // .stage scrolls live DOM under this filter. feDisplacementMap + double
    // feGaussianBlur isn't GPU-accelerated, so re-rastering it every scroll
    // frame is what makes the bulge stutter — drop the filter for the
    // duration of the scroll gesture (content still scrolls, just flat) and
    // restore it once scrolling settles.
    let st: ReturnType<typeof setTimeout>;
    let scrolling = false;
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        warp.style.filter = 'none';
      }
      clearTimeout(st);
      st = setTimeout(() => {
        scrolling = false;
        warp.style.filter = 'url(#crt-barrel)';
      }, 150);
    };
    stage.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      ro.disconnect();
      clearTimeout(t);
      clearTimeout(st);
      stage.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="crt-tube" ref={tubeRef}>
      <style>{`
        .crt-tube{
          position:relative; width:100%; height:100dvh;
          display:grid; place-items:stretch; box-sizing:border-box;
          background:#07080a;
        }
        .crt-tube .tube{
          position:relative;
          width:100%; height:100%;
          padding:clamp(2px,.28vw,5px);
          background:#040507;
          font-size:clamp(9px, min(1.92vh, 1.1vw), 22px);
        }
        .crt-tube .glass{
          position:relative; height:100%; overflow:hidden;
          background:radial-gradient(ellipse 94% 86% at 50% 45%,var(--crt-phos-1) 0%,var(--crt-phos-2) 60%,var(--crt-phos-3) 100%);
          clip-path:${GLASS_CLIP};
          isolation:isolate;
        }
        .crt-tube .warp{ position:absolute; inset:0; will-change:filter; }
        .crt-tube .stage{ position:absolute; inset:4.4% 4.8%; display:flex; flex-direction:column; overflow:auto; }
        .crt-tube #crt-scan{ position:absolute; inset:0; width:100%; height:100%; z-index:6; pointer-events:none; mix-blend-mode:multiply; opacity:.5; }
        .crt-tube .sheen,.crt-tube .vig,.crt-tube .aberr,.crt-tube .flicker{ position:absolute; inset:0; z-index:9; pointer-events:none; }
        .crt-tube .sheen{ background:
          radial-gradient(ellipse 44% 28% at 27% 13%,rgba(255,255,255,.10),transparent 63%),
          linear-gradient(106deg,transparent 35%,rgba(255,255,255,.038) 41%,transparent 47%); }
        .crt-tube .vig{ background:radial-gradient(ellipse 76% 70% at 50% 50%,transparent 44%,rgba(0,0,0,.28) 78%,rgba(0,0,0,.7) 100%); }
        .crt-tube .aberr{ opacity:.42; box-shadow:
          inset 3px 0 10px -5px rgba(120,190,255,.6), inset -3px 0 10px -5px rgba(255,120,130,.6),
          inset 0 4px 11px -6px rgba(150,200,255,.4), inset 0 -4px 11px -6px rgba(255,140,140,.4); }
        .crt-tube .flicker{ background:#cfe8ff; opacity:0; animation:crt-fl 7s steps(1) infinite; }
        @keyframes crt-fl{0%,96%{opacity:0}96.5%{opacity:.02}97%{opacity:0}98.4%{opacity:.013}98.7%{opacity:0}}
        @media (prefers-reduced-motion:reduce){ .crt-tube .flicker{ animation:none; } }
        ${cursorStyle()}
      `}</style>

      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <filter id="crt-barrel" x="0" y="0" width="100%" height="100%" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feImage ref={bmapRef} result="m" preserveAspectRatio="none" />
          <feDisplacementMap ref={bdispRef} in="SourceGraphic" in2="m" scale={0} xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feGaussianBlur in="warped" stdDeviation={0.25} result="soft" />
          <feGaussianBlur in="warped" stdDeviation={1.4} result="halo" />
          <feComposite in="halo" in2="soft" operator="arithmetic" k1={0} k2={0.12} k3={1} k4={0} />
        </filter>
      </svg>

      <div className="tube">
        <div className="glass" ref={glassRef}>
          <div className="warp" ref={warpRef}>
            <canvas id="crt-scan" ref={scanRef} />
            <div className="stage" ref={stageRef}>{children}</div>
          </div>
          <div className="sheen" />
          <div className="vig" />
          <div className="aberr" />
          <div className="flicker" />
        </div>
      </div>
    </div>
  );
}

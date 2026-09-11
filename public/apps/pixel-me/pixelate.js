/* pixelate.js — image -> pixel art. No deps, no build.
   pixelate(source, {size, colors, palette}) -> HTMLCanvasElement (1 art px = 1 canvas px)
   scaleUp(canvas, factor) -> HTMLCanvasElement (nearest-neighbour)
   Loads as a plain <script> — no build, no module server. Exposes window.Pixelate. */

const PALETTES = {
  gameboy: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'],
  pico8: ['#000000','#1d2b53','#7e2553','#008751','#ab5236','#5f574f','#c2c3c7','#fff1e8',
          '#ff004d','#ffa300','#ffec27','#00e436','#29adff','#83769c','#ff77a8','#ffccaa'],
  cga: ['#000000','#55ffff','#ff55ff','#ffffff'],
  nes: ['#000000','#fcfcfc','#f8f8f8','#bcbcbc','#7c7c7c','#a4e4fc','#3cbcfc','#0078f8',
        '#0000fc','#b8b8f8','#6888fc','#d8b8f8','#f878f8','#f8a4c0','#f87858','#fca044'],
};

const hex2rgb = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];

/** Downscale with box-averaging, then reduce the palette. */
function pixelate(source, { size = 96, colors = 16, palette = null } = {}) {
  const sw = source.naturalWidth || source.width;
  const sh = source.naturalHeight || source.height;
  const scale = size / Math.max(sw, sh);
  const w = Math.max(1, Math.round(sw * scale));
  const h = Math.max(1, Math.round(sh * scale));

  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;          // box-average on the way down
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, w, h);

  const img = ctx.getImageData(0, 0, w, h);
  const pal = palette ? palette.map(hex2rgb) : medianCut(img.data, colors);
  mapToPalette(img.data, pal);
  ctx.putImageData(img, 0, 0);

  c.palette = pal.map(([r,g,b]) => `#${[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}`);
  return c;
}

/** Nearest-neighbour upscale for display / export. */
function scaleUp(src, factor) {
  const c = document.createElement('canvas');
  c.width = src.width * factor; c.height = src.height * factor;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(src, 0, 0, c.width, c.height);
  return c;
}

/* ---- median cut: split the colour cube on its longest axis, n times ---- */
function medianCut(data, n) {
  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] < 128) continue;                       // ignore transparent
    pixels.push([data[i], data[i+1], data[i+2]]);
  }
  if (!pixels.length) return [[0,0,0]];

  let buckets = [pixels];
  const target = Math.max(2, Math.min(256, n));
  while (buckets.length < target) {
    // split the bucket with the widest channel range
    let bi = -1, best = -1;
    buckets.forEach((b, i) => {
      if (b.length < 2) return;
      const r = ranges(b), m = Math.max(r[0].d, r[1].d, r[2].d);
      if (m > best) { best = m; bi = i; }
    });
    if (bi < 0) break;                                   // nothing left to split
    const b = buckets[bi], r = ranges(b);
    const axis = r[0].d >= r[1].d && r[0].d >= r[2].d ? 0 : (r[1].d >= r[2].d ? 1 : 2);
    b.sort((x, y) => x[axis] - y[axis]);
    const mid = b.length >> 1;
    buckets.splice(bi, 1, b.slice(0, mid), b.slice(mid));
  }
  return buckets.filter(b => b.length).map(avg);
}

function ranges(b) {
  const lo = [255,255,255], hi = [0,0,0];
  for (const p of b) for (let c = 0; c < 3; c++) {
    if (p[c] < lo[c]) lo[c] = p[c];
    if (p[c] > hi[c]) hi[c] = p[c];
  }
  return [0,1,2].map(c => ({ d: hi[c] - lo[c] }));
}

function avg(b) {
  const s = [0,0,0];
  for (const p of b) { s[0]+=p[0]; s[1]+=p[1]; s[2]+=p[2]; }
  return s.map(v => Math.round(v / b.length));
}

function mapToPalette(data, pal) {
  const cache = new Map();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] < 128) { data[i+3] = 0; continue; }
    data[i+3] = 255;                                     // no partial alpha in pixel art
    const key = (data[i] << 16) | (data[i+1] << 8) | data[i+2];
    let c = cache.get(key);
    if (!c) {
      let bd = Infinity;
      for (const p of pal) {
        // weighted rgb distance — closer to perceived difference than plain euclidean
        const dr = data[i]-p[0], dg = data[i+1]-p[1], db = data[i+2]-p[2];
        const d = 2*dr*dr + 4*dg*dg + 3*db*db;
        if (d < bd) { bd = d; c = p; }
      }
      cache.set(key, c);
    }
    data[i] = c[0]; data[i+1] = c[1]; data[i+2] = c[2];
  }
}

/* self-check: node --input-type=module won't have canvas, so this runs in a browser console */
function _selfCheck() {
  const pal = medianCut(new Uint8ClampedArray([0,0,0,255, 255,255,255,255, 250,250,250,255, 5,5,5,255]), 2);
  console.assert(pal.length === 2, 'medianCut should yield 2 buckets', pal);
  const dark = pal.find(p => p[0] < 128), light = pal.find(p => p[0] > 128);
  console.assert(dark && light, 'buckets should split dark/light', pal);
  const d = new Uint8ClampedArray([10,10,10,255]);
  mapToPalette(d, [[0,0,0],[255,255,255]]);
  console.assert(d[0] === 0, 'near-black maps to black', d);
  return 'ok';
}

window.Pixelate = { pixelate, scaleUp, PALETTES, _selfCheck };

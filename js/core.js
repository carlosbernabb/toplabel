/* =========================================================
   Top Label · núcleo compartido
   Catálogos, dibujo de etiqueta (canvas), cotizador y visor 3D
   ========================================================= */

/* ---------- Datos de contacto (EDITAR con los reales) ---------- */
const TL_CONFIG = {
  whatsapp: '524420000000',            // formato internacional sin "+" ni espacios
  email: 'ventas@toplabel.com.mx',
  telefono: '442 000 0000',
  direccion: 'Querétaro, Qro., México',
  iva: 0.16,
};

/* ---------- Catálogos ---------- */
const TL = {};

TL.products = {
  botella: { name: 'Botella', cat: 'etiqueta', icon: 'bottle', w: 110, h: 85, desc: 'Vino, licor, salsa, aceite' },
  envase:  { name: 'Envase plástico', cat: 'etiqueta', icon: 'flask', w: 90, h: 100, desc: 'Detergente, shampoo, salsas' },
  frasco:  { name: 'Frasco',  cat: 'etiqueta', icon: 'jar',    w: 210, h: 55, desc: 'Miel, mermelada, cremas' },
  lata:    { name: 'Lata',    cat: 'etiqueta', icon: 'can',    w: 207, h: 100, desc: 'Cerveza, refresco, café frío' },
  bolsa:   { name: 'Bolsa stand-up', cat: 'etiqueta', icon: 'pouch', w: 100, h: 110, desc: 'Café, snacks, granola' },
  caja:    { name: 'Caja plegadiza', cat: 'caja', icon: 'box', w: 80, h: 150, d: 50, desc: 'Cosmético, farma, alimento' },
  textil:  { name: 'Etiqueta textil', cat: 'textil', icon: 'shirt', w: 50, h: 30, desc: 'Ropa, uniformes, marcas' },
};

TL.materials = {
  couche:     { name: 'Papel couché',        cat: 'etiqueta', rate: 0.0045, desc: 'Económico y versátil, colores vivos' },
  bopp:       { name: 'BOPP blanco',         cat: 'etiqueta', rate: 0.0060, desc: 'Plástico resistente a agua y refrigeración' },
  transp:     { name: 'BOPP transparente',   cat: 'etiqueta', rate: 0.0065, desc: 'Efecto "no label", se ve el producto' },
  metal:      { name: 'BOPP metalizado',     cat: 'etiqueta', rate: 0.0090, desc: 'Brillo plateado premium' },
  kraft:      { name: 'Papel kraft',         cat: 'etiqueta', rate: 0.0055, desc: 'Natural, artesanal, orgánico' },
  verjurado:  { name: 'Papel verjurado',     cat: 'etiqueta', rate: 0.0080, desc: 'Textura fina para vinos y licores' },
  holo:       { name: 'Holográfico',         cat: 'etiqueta', rate: 0.0120, desc: 'Arcoíris tornasol que llama la atención' },
  sulfatada:  { name: 'Cartulina sulfatada', cat: 'caja',     rate: 0.0028, desc: 'Blanca, lisa, ideal para alta impresión' },
  kraftcaja:  { name: 'Cartulina kraft',     cat: 'caja',     rate: 0.0030, desc: 'Look natural y sustentable' },
  metalcaja:  { name: 'Cartulina metalizada',cat: 'caja',     rate: 0.0045, desc: 'Acabado espejo para lujo' },
  satin:      { name: 'Satín',               cat: 'textil',   rate: 0.030,  desc: 'Suave y brillante, no irrita' },
  tafeta:     { name: 'Tafeta',              cat: 'textil',   rate: 0.024,  desc: 'Económica, ideal para instrucciones de lavado' },
  tejida:     { name: 'Tejida (damasco)',    cat: 'textil',   rate: 0.060,  desc: 'Máxima calidad y durabilidad' },
  algodon:    { name: 'Algodón',             cat: 'textil',   rate: 0.040,  desc: 'Natural, mate, sustentable' },
};

TL.finishes = {
  brillante: { name: 'Brillante',          cats: ['etiqueta', 'caja'], mult: 1.00, desc: 'Laminado gloss, colores intensos' },
  mate:      { name: 'Mate',               cats: ['etiqueta', 'caja'], mult: 1.05, desc: 'Elegante, sin reflejos' },
  soft:      { name: 'Soft-touch',         cats: ['etiqueta', 'caja'], mult: 1.20, desc: 'Tacto aterciopelado' },
  uv:        { name: 'Barniz UV selectivo',cats: ['etiqueta', 'caja'], mult: 1.25, desc: 'Mate con texto y logo brillantes' },
  oro:       { name: 'Hot stamping oro',   cats: ['etiqueta', 'caja'], mult: 1.35, desc: 'Texto en foil dorado' },
  plata:     { name: 'Hot stamping plata', cats: ['etiqueta', 'caja'], mult: 1.35, desc: 'Texto en foil plateado' },
  recto:     { name: 'Corte recto',        cats: ['textil'], mult: 1.00, desc: 'Orillas selladas a calor' },
  doblez:    { name: 'Doblez al centro',   cats: ['textil'], mult: 1.10, desc: 'Para costura en cuello' },
  laser:     { name: 'Corte láser',        cats: ['textil'], mult: 1.15, desc: 'Orilla limpia sin deshilar' },
};

TL.containers = {
  botella: [
    { id: 'ambar',  name: 'Vidrio ámbar',  color: '#7a3f0c', glass: true },
    { id: 'verde',  name: 'Vidrio verde',  color: '#1f4d2b', glass: true },
    { id: 'cristal',name: 'Vidrio cristal',color: '#dfeee9', glass: true },
    { id: 'negro',  name: 'Negro mate',    color: '#151515', glass: false, rough: 0.6 },
    { id: 'blanco', name: 'Plástico blanco',color: '#f2f2f2', glass: false, rough: 0.35 },
  ],
  envase: [
    { id: 'blanco', name: 'Blanco',       color: '#f4f4f2', glass: false, rough: 0.3 },
    { id: 'negro',  name: 'Negro',        color: '#1a1a1c', glass: false, rough: 0.35 },
    { id: 'natural',name: 'Natural translúcido', color: '#eef3f0', glass: true },
    { id: 'verde',  name: 'Verde translúcido',   color: '#2f8a3a', glass: true },
  ],
  frasco: [
    { id: 'cristal',name: 'Vidrio cristal',color: '#e4f0ec', glass: true },
    { id: 'ambar',  name: 'Vidrio ámbar',  color: '#7a3f0c', glass: true },
    { id: 'blanco', name: 'PET blanco',    color: '#f2f2f2', glass: false, rough: 0.3 },
  ],
  lata: [
    { id: 'alu',    name: 'Aluminio',      color: '#c9ccd1', metal: true },
    { id: 'negro',  name: 'Negro',         color: '#1a1a1a', metal: true },
  ],
  bolsa: [
    { id: 'kraft',  name: 'Kraft',         color: '#b88b5a', rough: 0.95 },
    { id: 'negra',  name: 'Negra mate',    color: '#1b1b1b', rough: 0.8 },
    { id: 'blanca', name: 'Blanca',        color: '#f1f1ee', rough: 0.6 },
    { id: 'metal',  name: 'Metalizada',    color: '#b9bec4', metal: true },
  ],
  caja: [],
  textil: [
    { id: 'marino', name: 'Azul marino',   color: '#1d2a4a' },
    { id: 'negra',  name: 'Tela negra',    color: '#202022' },
    { id: 'gris',   name: 'Gris jaspe',    color: '#8e9196' },
    { id: 'blanca', name: 'Tela blanca',   color: '#efefef' },
  ],
};

TL.fonts = [
  'Montserrat', 'Playfair Display', 'Bebas Neue', 'Cinzel', 'Oswald', 'Pacifico',
  'Abril Fatface', 'Dancing Script', 'Space Grotesk', 'Roboto Slab', 'Lobster', 'Archivo Black',
];
TL.fontsUrl = 'https://fonts.googleapis.com/css2?' + TL.fonts.map(f =>
  'family=' + f.replace(/ /g, '+') + (['Bebas Neue','Pacifico','Abril Fatface','Lobster','Archivo Black'].includes(f) ? '' : ':wght@400;700')
).join('&') + '&display=swap';

TL.shapes = { rect: 'Rectangular', round: 'Esquinas redondeadas', oval: 'Ovalada', circle: 'Circular' };

TL.defaultConfig = () => ({
  product: 'botella', container: 'ambar', capColor: '#111111', liquid: true, liquidColor: '#5a1220',
  material: 'verjurado', finish: 'oro', shape: 'round',
  w: 110, h: 85, d: 50, qty: 1000, presentation: 'rollo',
  bgType: 'natural', bg1: '#0f1a3a', bg2: '#3a6bd1',
  title: 'Casa Eddie', titleFont: 'Playfair Display', titleColor: '#1b1b1b', titleSize: 0.28,
  subtitle: 'RESERVA ESPECIAL', subColor: '#7a1f2b',
  details: 'Hecho en Querétaro · 750 ml', textY: 0, align: 'center',
  image: null, imageMode: 'logo', imgScale: 0.35, imgX: 0.5, imgY: 0.3,
  frame: true, frameColor: '#7a1f2b', posY: 0.45,
});

/* ---------- Dibujo de la etiqueta ----------
   Genera 3 canvas: color (con alfa), rugosidad y metalicidad.
   Los mapas de rugosidad/metal permiten barniz UV selectivo y foil. */
TL._imgCache = new Map();
TL.loadImage = (src) => {
  if (!src) return Promise.resolve(null);
  if (TL._imgCache.has(src)) return Promise.resolve(TL._imgCache.get(src));
  return new Promise(res => {
    const im = new Image();
    im.onload = () => { TL._imgCache.set(src, im); res(im); };
    im.onerror = () => res(null);
    im.src = src;
  });
};

TL.fontsReady = async (cfg) => {
  if (!document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`700 40px "${cfg.titleFont}"`),
      document.fonts.load(`400 40px "${cfg.titleFont}"`),
      document.fonts.load(`600 40px "Montserrat"`),
    ]);
  } catch (e) { /* sin fuentes: usa respaldo */ }
};

function tlShapePath(ctx, shape, W, H) {
  ctx.beginPath();
  if (shape === 'oval' || shape === 'circle') {
    ctx.ellipse(W / 2, H / 2, W / 2, H / 2, 0, 0, Math.PI * 2);
  } else if (shape === 'round') {
    const r = Math.min(W, H) * 0.09;
    ctx.roundRect ? ctx.roundRect(0, 0, W, H, r) : ctx.rect(0, 0, W, H);
  } else {
    ctx.rect(0, 0, W, H);
  }
}

function tlNoise(ctx, W, H, n, color, alpha, len) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, W / 900);
  for (let i = 0; i < n; i++) {
    const x = Math.random() * W, y = Math.random() * H, a = Math.random() * Math.PI;
    const l = (0.3 + Math.random()) * len;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
  }
  ctx.restore();
}

function tlWeave(ctx, W, H, step, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha; ctx.fillStyle = color;
  for (let y = 0; y < H; y += step) for (let x = (y / step) % 2 ? step / 2 : 0; x < W; x += step) ctx.fillRect(x, y, step / 2, step / 2);
  ctx.restore();
}

/* Fondo "natural" del material */
function tlMaterialBase(ctx, mat, W, H) {
  switch (mat) {
    case 'transp': return; // sin fondo
    case 'kraft': case 'kraftcaja':
      ctx.fillStyle = '#c29a6b'; ctx.fillRect(0, 0, W, H);
      tlNoise(ctx, W, H, 2200, '#8a6238', 0.25, W / 60);
      tlNoise(ctx, W, H, 900, '#e8c9a0', 0.25, W / 80); return;
    case 'verjurado': {
      ctx.fillStyle = '#f4eddc'; ctx.fillRect(0, 0, W, H);
      ctx.save(); ctx.globalAlpha = 0.08; ctx.strokeStyle = '#8c7a55'; ctx.lineWidth = Math.max(1, H / 500);
      for (let y = 0; y < H; y += H / 120) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.globalAlpha = 0.12;
      for (let x = 0; x < W; x += W / 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      ctx.restore(); return;
    }
    case 'metal': case 'metalcaja': {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#e9ecef'); g.addColorStop(0.45, '#aeb4ba'); g.addColorStop(0.55, '#f5f7f8'); g.addColorStop(1, '#9aa1a8');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); return;
    }
    case 'holo': {
      const g = ctx.createLinearGradient(0, 0, W, H);
      ['#ffd1f5', '#c6d8ff', '#bff7e6', '#fff3b8', '#ffc9d6', '#d4c6ff'].forEach((c, i, a) => g.addColorStop(i / (a.length - 1), c));
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      tlNoise(ctx, W, H, 600, '#ffffff', 0.35, W / 40); return;
    }
    case 'satin': {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#f7f7f7'); g.addColorStop(0.5, '#ffffff'); g.addColorStop(1, '#e8e8e8');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); return;
    }
    case 'tafeta':
      ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, W, H); tlWeave(ctx, W, H, Math.max(3, W / 220), '#000', 0.05); return;
    case 'tejida':
      ctx.fillStyle = '#f2f2f2'; ctx.fillRect(0, 0, W, H); tlWeave(ctx, W, H, Math.max(4, W / 120), '#000', 0.10); return;
    case 'algodon':
      ctx.fillStyle = '#f3efe4'; ctx.fillRect(0, 0, W, H); tlWeave(ctx, W, H, Math.max(4, W / 140), '#6b5a3a', 0.08); return;
    default:
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  }
}

const TL_TEXTURED = ['kraft', 'kraftcaja', 'verjurado', 'tafeta', 'tejida', 'algodon', 'satin'];

TL.drawLabel = async function (cfg, opts = {}) {
  const maxPx = opts.maxPx || 2048;
  const w = Math.max(10, cfg.w), h = Math.max(10, cfg.h);
  const k = Math.min(10, maxPx / Math.max(w, h));
  const W = Math.round(w * k), H = Math.round(h * k);
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const color = mk(), rough = mk(), metal = mk();
  const img = cfg.image ? await TL.loadImage(cfg.image) : null;
  await TL.fontsReady(cfg);

  const fin = cfg.finish;
  const isFoil = fin === 'oro' || fin === 'plata';
  const metallicBase = (cfg.material === 'metal' || cfg.material === 'metalcaja' || cfg.material === 'holo') && cfg.bgType === 'natural';
  const baseRough = { brillante: 0.12, mate: 0.75, soft: 0.95, uv: 0.85, oro: 0.6, plata: 0.6, recto: 0.85, doblez: 0.85, laser: 0.85 }[fin] ?? 0.6;
  const textRough = fin === 'uv' ? 0.08 : isFoil ? 0.18 : baseRough;
  const grey = v => { const n = Math.round(Math.max(0, Math.min(1, v)) * 255); return `rgb(${n},${n},${n})`; };

  const layout = TL.layout(cfg, W, H, img);

  // ---- capa de color ----
  const c = color.getContext('2d');
  c.save(); tlShapePath(c, cfg.shape, W, H); c.clip();
  tlMaterialBase(c, cfg.material, W, H);
  if (cfg.bgType !== 'natural') {
    let fill = cfg.bg1;
    if (cfg.bgType === 'gradient') { const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, cfg.bg1); g.addColorStop(1, cfg.bg2); fill = g; }
    if (TL_TEXTURED.includes(cfg.material)) { c.globalCompositeOperation = 'multiply'; }
    c.fillStyle = fill; c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = 'source-over';
  }
  if (img && cfg.imageMode === 'full') { tlDrawCover(c, img, W, H); }
  if (img && cfg.imageMode === 'logo') { const r = layout.img; c.drawImage(img, r.x, r.y, r.w, r.h); }
  if (cfg.frame) tlFrame(c, cfg, W, H, isFoil ? tlFoil(c, fin, W, H) : cfg.frameColor);
  tlText(c, cfg, layout, isFoil ? tlFoil(c, fin, W, H) : null);
  if (TL.products[cfg.product]?.cat === 'textil') tlStitch(c, W, H);
  c.restore();

  // ---- rugosidad ----
  const r = rough.getContext('2d');
  r.fillStyle = grey(metallicBase ? Math.min(baseRough, 0.3) : baseRough); r.fillRect(0, 0, W, H);
  if (img && cfg.imageMode === 'logo' && fin === 'uv') { const q = layout.img; r.fillStyle = grey(0.08); r.fillRect(q.x, q.y, q.w, q.h); }
  if (cfg.frame) tlFrame(r, cfg, W, H, grey(textRough));
  tlText(r, cfg, layout, grey(textRough));

  // ---- metalicidad ----
  const m = metal.getContext('2d');
  m.fillStyle = grey(metallicBase ? 0.95 : 0); m.fillRect(0, 0, W, H);
  if (isFoil) { if (cfg.frame) tlFrame(m, cfg, W, H, grey(1)); tlText(m, cfg, layout, grey(1)); }
  else if (metallicBase) { if (img && cfg.imageMode !== 'none') { const q = layout.img; m.fillStyle = grey(0.1); if (cfg.imageMode === 'full') m.fillRect(0, 0, W, H); else m.fillRect(q.x, q.y, q.w, q.h); } tlText(m, cfg, layout, grey(0.15)); }

  return { color, rough, metal, W, H };
};

TL.layout = function (cfg, W, H, img) {
  const hasLogo = img && cfg.imageMode === 'logo';
  const dy = (cfg.textY || 0) * H;
  const L = { hasLogo, img: { x: 0, y: 0, w: 0, h: 0 } };
  if (hasLogo) {
    const s = cfg.imgScale * Math.min(W, H) * 1.6;
    const ar = img.width / img.height;
    let iw = s, ih = s / ar;
    if (ih > H * 0.9) { ih = H * 0.9; iw = ih * ar; }
    L.img = { x: cfg.imgX * W - iw / 2, y: cfg.imgY * H - ih / 2, w: iw, h: ih };
  }
  const left = cfg.align === 'left';
  L.x = left ? W * 0.09 : W / 2;
  L.align = left ? 'left' : 'center';
  L.titleY = (hasLogo ? 0.62 : 0.44) * H + dy;
  L.subY = (hasLogo ? 0.76 : 0.62) * H + dy;
  L.detY = 0.86 * H + dy;
  L.maxW = W * (cfg.shape === 'circle' || cfg.shape === 'oval' ? 0.62 : 0.82);
  // En envases cilíndricos, el texto debe caber en la cara visible del frente
  const diam = { botella: 70, frasco: 84, lata: 66, envase: 68 }[cfg.product];
  if (diam) L.maxW = Math.min(L.maxW, (W / cfg.w) * diam * 0.8);
  return L;
};

function tlFit(ctx, text, font, size, maxW) {
  let s = size;
  ctx.font = font(s);
  while (s > 6 && ctx.measureText(text).width > maxW) { s *= 0.94; ctx.font = font(s); }
  return s;
}

function tlText(ctx, cfg, L, override) {
  const H = ctx.canvas.height, W = ctx.canvas.width;
  ctx.textAlign = L.align; ctx.textBaseline = 'middle';
  if (cfg.title) {
    const size = cfg.titleSize * H;
    tlFit(ctx, cfg.title, s => `700 ${s}px "${cfg.titleFont}", serif`, size, L.maxW);
    ctx.fillStyle = override || cfg.titleColor;
    ctx.fillText(cfg.title, L.x, L.titleY);
  }
  if (cfg.subtitle) {
    let size = Math.max(8, cfg.titleSize * H * 0.36);
    const sp = 'letterSpacing' in ctx;
    ctx.font = `600 ${size}px "Montserrat", sans-serif`;
    if (sp) ctx.letterSpacing = `${size * 0.18}px`;
    while (size > 6 && ctx.measureText(cfg.subtitle).width > L.maxW) {
      size *= 0.94; ctx.font = `600 ${size}px "Montserrat", sans-serif`; if (sp) ctx.letterSpacing = `${size * 0.18}px`;
    }
    ctx.fillStyle = override || cfg.subColor;
    ctx.fillText(cfg.subtitle, L.x, L.subY);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  }
  if (cfg.details) {
    const size = Math.max(7, Math.min(H * 0.07, W * 0.05));
    tlFit(ctx, cfg.details, s => `500 ${s}px "Montserrat", sans-serif`, size, L.maxW);
    ctx.fillStyle = override || cfg.titleColor;
    ctx.globalAlpha = override ? 1 : 0.8;
    ctx.fillText(cfg.details, L.x, L.detY);
    ctx.globalAlpha = 1;
  }
}

function tlFrame(ctx, cfg, W, H, style) {
  ctx.save();
  ctx.strokeStyle = style; ctx.lineWidth = Math.max(2, Math.min(W, H) * 0.012);
  const inset = Math.min(W, H) * 0.06;
  ctx.beginPath();
  if (cfg.shape === 'oval' || cfg.shape === 'circle') ctx.ellipse(W / 2, H / 2, W / 2 - inset, H / 2 - inset, 0, 0, Math.PI * 2);
  else if (ctx.roundRect) ctx.roundRect(inset, inset, W - inset * 2, H - inset * 2, cfg.shape === 'round' ? Math.min(W, H) * 0.05 : 0);
  else ctx.rect(inset, inset, W - inset * 2, H - inset * 2);
  ctx.stroke();
  ctx.restore();
}

function tlFoil(ctx, fin, W, H) {
  const g = ctx.createLinearGradient(0, 0, W, H);
  const stops = fin === 'oro' ? ['#a87b1f', '#f6dc8a', '#b8892b', '#f2d27a', '#8e6516'] : ['#8c9298', '#f4f6f8', '#a5abb1', '#eef0f2', '#80868c'];
  stops.forEach((s, i) => g.addColorStop(i / (stops.length - 1), s));
  return g;
}

function tlStitch(ctx, W, H) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = Math.max(1.5, H * 0.012);
  ctx.setLineDash([H * 0.04, H * 0.03]);
  const i = H * 0.05;
  ctx.strokeRect(i, i, W - i * 2, H - i * 2);
  ctx.restore();
}

function tlDrawCover(ctx, img, W, H) {
  const s = Math.max(W / img.width, H / img.height);
  const iw = img.width * s, ih = img.height * s;
  ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2, iw, ih);
}

/* ---------- Cotizador (precios de referencia, EDITAR) ---------- */
TL.quote = function (cfg) {
  const p = TL.products[cfg.product];
  const mat = TL.materials[cfg.material];
  const fin = TL.finishes[cfg.finish];
  const qty = Math.max(1, cfg.qty | 0);
  let area; // cm²
  if (p.cat === 'caja') {
    const w = cfg.w / 10, h = cfg.h / 10, d = cfg.d / 10;
    area = (2 * (w * h + w * d + h * d) + 2 * (w + d) * 1.5) * 1.15; // + solapas y merma
  } else {
    area = (cfg.w / 10) * (cfg.h / 10) * 1.08; // + merma de suaje
  }
  const setup = p.cat === 'caja' ? 2800 : p.cat === 'textil' ? 950 : 1450; // placas / suaje / arranque
  const volume = qty >= 50000 ? 0.55 : qty >= 25000 ? 0.62 : qty >= 10000 ? 0.72 : qty >= 5000 ? 0.85 : qty >= 2500 ? 0.93 : 1;
  const imageMult = cfg.imageMode === 'full' && cfg.image ? 1.08 : 1;
  const unit = Math.max(p.cat === 'caja' ? 1.2 : 0.09, area * mat.rate * fin.mult * volume * imageMult * (p.cat === 'textil' ? 5 : 10));
  const subtotal = unit * qty + setup;
  const iva = subtotal * TL_CONFIG.iva;
  const days = qty >= 25000 ? '12–15' : qty >= 5000 ? '8–12' : '6–9';
  return { unit, setup, subtotal, iva, total: subtotal + iva, days, area, volume };
};

TL.money = n => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: n < 10 ? 3 : 2, maximumFractionDigits: n < 10 ? 3 : 2 });

/* =========================================================
   Visor 3D (three.js r128, global THREE)
   ========================================================= */
const tlCol = hex => new THREE.Color(hex).convertSRGBToLinear();

class TLViewer {
  constructor(el, opts = {}) {
    this.el = el;
    this.opts = Object.assign({ autoRotate: true, interactive: true, bg: null }, opts);
    const R = this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    const mobile = matchMedia('(max-width: 860px)').matches;
    this.mobile = mobile;
    R.setPixelRatio(Math.min(mobile ? 1.5 : 2, window.devicePixelRatio || 1));
    R.outputEncoding = THREE.sRGBEncoding;
    R.toneMapping = THREE.ACESFilmicToneMapping;
    R.toneMappingExposure = 1.05;
    R.physicallyCorrectLights = false;
    el.appendChild(R.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 500);
    this.root = new THREE.Group();
    this.scene.add(this.root);
    this.obj = new THREE.Group();
    this.root.add(this.obj);

    // Ambiente de estudio procedural para reflejos
    const pmrem = new THREE.PMREMGenerator(R);
    this.scene.environment = pmrem.fromScene(TLViewer.studio(), 0.04).texture;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 0.35); this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(6, 10, 8); this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd7ff, 0.6); rim.position.set(-8, 6, -6); this.scene.add(rim);

    // sombra de contacto falsa
    const sc = document.createElement('canvas'); sc.width = sc.height = 256;
    const sx = sc.getContext('2d'); const g = sx.createRadialGradient(128, 128, 10, 128, 128, 128);
    g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = g; sx.fillRect(0, 0, 256, 256);
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
    this.shadow.rotation.x = -Math.PI / 2;
    this.root.add(this.shadow);

    this.rotY = -0.35; this.rotX = 0.08; this.zoom = 1; this.vel = 0;
    this.autoRotate = this.opts.autoRotate;
    this.dist = 30; this.center = new THREE.Vector3(0, 6, 0);
    if (this.opts.interactive) this._bindPointer();
    this._resize = () => this.resize();
    new ResizeObserver(this._resize).observe(el);
    this.resize();
    this._tick = this._tick.bind(this);
    this._last = performance.now();
    requestAnimationFrame(this._tick);
    this.version = 0;
  }

  static studio() {
    const s = new THREE.Scene();
    const room = new THREE.Mesh(new THREE.BoxGeometry(40, 30, 40), new THREE.MeshBasicMaterial({ color: 0x3a3f4a, side: THREE.BackSide }));
    room.position.y = 8; s.add(room);
    const panel = (w, h, x, y, z, ry, c) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 6, 0); s.add(m);
    };
    panel(14, 6, 0, 20, 4, 0, 0xffffff);
    panel(6, 16, 18, 8, 8, 0, 0xfff4e6);
    panel(6, 16, -18, 8, 6, 0, 0xe6efff);
    panel(18, 4, 0, 6, -19, 0, 0xffffff);
    panel(10, 3, 0, -6, 10, 0, 0x8899aa);
    return s;
  }

  _bindPointer() {
    const d = this.renderer.domElement;
    d.style.touchAction = 'pan-y';
    d.style.cursor = 'grab';
    let down = false, px = 0, py = 0;
    d.addEventListener('pointerdown', e => { down = true; px = e.clientX; py = e.clientY; d.setPointerCapture(e.pointerId); d.style.cursor = 'grabbing'; this.autoRotatePaused = true; });
    d.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
      this.rotY += dx * 0.01; this.vel = dx * 0.01;
      this.rotX = Math.max(-0.5, Math.min(0.7, this.rotX + dy * 0.006));
    });
    const up = () => { down = false; d.style.cursor = 'grab'; clearTimeout(this._resume); this._resume = setTimeout(() => this.autoRotatePaused = false, 2500); };
    d.addEventListener('pointerup', up); d.addEventListener('pointercancel', up);
    d.addEventListener('wheel', e => { e.preventDefault(); this.zoom = Math.max(0.45, Math.min(1.8, this.zoom * (1 + e.deltaY * 0.001))); }, { passive: false });
  }

  resize() {
    const w = this.el.clientWidth || 300, h = this.el.clientHeight || 300;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }

  _tick(t) {
    const dt = Math.min(0.05, (t - this._last) / 1000); this._last = t;
    if (this.autoRotate && !this.autoRotatePaused) this.rotY += dt * 0.45;
    else { this.rotY += this.vel; this.vel *= 0.9; }
    this.obj.rotation.y = this.rotY + (this.extRot || 0);
    this.root.rotation.x = this.rotX * 0.6;
    const dist = this.dist * this.zoom;
    this.camera.position.set(this.center.x, this.center.y + dist * 0.12, this.center.z + dist);
    this.camera.lookAt(this.center);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._tick);
  }

  _clear() {
    this.obj.traverse(o => { if (o.geometry) o.geometry.dispose(); const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []; ms.forEach(m => { ['map', 'roughnessMap', 'metalnessMap'].forEach(k => m[k] && m[k].dispose()); m.dispose(); }); });
    this.obj.clear();
  }

  _tex(canvas) {
    const t = new THREE.CanvasTexture(canvas);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    return t;
  }

  _labelMaterial(maps, cfg) {
    const map = this._tex(maps.color);
    const rough = new THREE.CanvasTexture(maps.rough);
    const metal = new THREE.CanvasTexture(maps.metal);
    const gloss = cfg.finish === 'brillante';
    return new THREE.MeshPhysicalMaterial({
      map, roughnessMap: rough, metalnessMap: metal, roughness: 1, metalness: 1,
      clearcoat: gloss ? 1 : 0, clearcoatRoughness: 0.06,
      transparent: true, alphaTest: 0.05, side: THREE.DoubleSide, envMapIntensity: 1.1,
    });
  }

  /* Construye la escena según la configuración */
  async set(cfg) {
    const ver = ++this.version;
    const p = TL.products[cfg.product];
    const maps = await TL.drawLabel(cfg, { maxPx: Math.min(this.opts.maxPx || 2048, this.mobile ? 1024 : 4096) });
    let sideMaps = null;
    if (p.cat === 'caja') {
      sideMaps = await TL.drawLabel(Object.assign({}, cfg, { w: cfg.d, title: '', subtitle: cfg.subtitle, details: cfg.details, image: null, frame: false, shape: 'rect' }), { maxPx: 1024 });
    }
    if (ver !== this.version) return; // llegó una configuración más nueva
    this._clear();
    this.shadow.visible = true;
    const cont = (TL.containers[cfg.product] || []).find(c => c.id === cfg.container) || (TL.containers[cfg.product] || [])[0];
    const build = { envase: this._flask, botella: this._bottle, frasco: this._jar, lata: this._can, bolsa: this._pouch, caja: this._box, textil: this._textile }[cfg.product];
    const info = build.call(this, cfg, maps, cont, sideMaps);
    // encuadre
    this.center.set(0, info.cy, 0);
    const fov = this.camera.fov * Math.PI / 180;
    const aspect = Math.max(0.6, this.camera.aspect);
    this.dist = (info.size / 2) / Math.tan(fov / 2) * (aspect < 1 ? 1.35 / aspect : 1.25);
    this.shadow.scale.set(info.foot * 2.6, info.foot * 2.6, 1);
    this.shadow.position.y = info.floor + 0.01;
  }

  _containerMat(cont) {
    if (cont.glass) return new THREE.MeshPhysicalMaterial({ color: tlCol(cont.color), roughness: 0.05, metalness: 0, transparent: true, opacity: cont.id === 'cristal' ? 0.2 : 0.82, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: cont.id === 'cristal' ? 1.4 : 0.7, depthWrite: false });
    if (cont.metal) return new THREE.MeshPhysicalMaterial({ color: tlCol(cont.color), roughness: 0.28, metalness: 1, envMapIntensity: 1.2 });
    return new THREE.MeshPhysicalMaterial({ color: tlCol(cont.color), roughness: cont.rough ?? 0.4, metalness: 0, clearcoat: (cont.rough ?? 0.4) < 0.5 ? 0.6 : 0 });
  }

  _wrapLabel(cfg, maps, R, yMin, yMax) {
    const hL = cfg.h / 10;
    const theta = Math.min(Math.PI * 2, (cfg.w / 10) / R);
    const span = Math.max(0, (yMax - yMin) - hL);
    const yc = yMin + hL / 2 + span * (1 - cfg.posY);
    const g = new THREE.CylinderGeometry(R * 1.006, R * 1.006, hL, 96, 1, true, -theta / 2, theta);
    const m = new THREE.Mesh(g, this._labelMaterial(maps, cfg));
    m.position.y = yc; m.renderOrder = 3;
    return m;
  }

  _liquid(cfg, cont, R, y0, y1) {
    if (!cont.glass || !cfg.liquid) return;
    const g = new THREE.CylinderGeometry(R, R, y1 - y0, 64);
    const m = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ color: tlCol(cfg.liquidColor), roughness: 0.2, envMapIntensity: 0.4, transparent: cont.id === 'cristal' || cont.id === 'natural', opacity: cont.id === 'cristal' || cont.id === 'natural' ? 0.35 : 1, depthWrite: !(cont.id === 'cristal' || cont.id === 'natural') }));
    m.position.y = (y0 + y1) / 2; m.renderOrder = 1;
    this.obj.add(m);
  }

  _bottle(cfg, maps, cont) {
    const R = 3.5;
    const pts = [[0, 0], [R - 0.35, 0], [R, 0.35], [R, 18], [R * 0.96, 19.2], [R * 0.72, 21], [1.45, 23.4], [1.3, 24.2], [1.3, 28], [0, 28]].map(([x, y]) => new THREE.Vector2(x, y));
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 96), this._containerMat(cont));
    body.renderOrder = 2;
    this.obj.add(body);
    this._liquid(cfg, cont, R * 0.93, 0.25, 17.4);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.42, 4.2, 48), new THREE.MeshPhysicalMaterial({ color: tlCol(cfg.capColor), roughness: 0.35, metalness: 0.2, clearcoat: 0.8 }));
    cap.position.y = 27.2; this.obj.add(cap);
    this.obj.add(this._wrapLabel(cfg, maps, R, 0.8, 17.6));
    return { cy: 14.6, size: 30, foot: R, floor: 0 };
  }

  _flask(cfg, maps, cont) {
    const R = 3.4;
    const pts = [[0, 0], [R - 0.4, 0], [R, 0.45], [R, 14.6], [R * 0.93, 15.8], [R * 0.6, 17.2], [1.55, 17.9], [1.45, 18.2], [1.45, 19.2], [0, 19.2]].map(([x, y]) => new THREE.Vector2(x, y));
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 96), this._containerMat(cont));
    body.renderOrder = 2; this.obj.add(body);
    this._liquid(cfg, cont, R * 0.93, 0.3, 14);
    const capMat = new THREE.MeshPhysicalMaterial({ color: tlCol(cfg.capColor), roughness: 0.35, clearcoat: 0.6 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.75, 2.4, 48), capMat);
    cap.position.y = 19.9; this.obj.add(cap);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.5, 0.5, 48), capMat);
    lid.position.y = 21.3; this.obj.add(lid);
    this.obj.add(this._wrapLabel(cfg, maps, R, 0.9, 14.4));
    return { cy: 10.8, size: 23.5, foot: R, floor: 0 };
  }

  _jar(cfg, maps, cont) {
    const R = 4.2, top = 8.2;
    const pts = [[0, 0], [R - 0.35, 0], [R, 0.35], [R, 7.0], [R - 0.3, 7.6], [R - 0.45, 7.8], [R - 0.45, top], [0, top]].map(([x, y]) => new THREE.Vector2(x, y));
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 96), this._containerMat(cont));
    body.renderOrder = 2; this.obj.add(body);
    this._liquid(cfg, cont, R * 0.94, 0.25, 7.2);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.2, R - 0.2, 1.6, 64), new THREE.MeshPhysicalMaterial({ color: tlCol(cfg.capColor), roughness: 0.3, metalness: 0.6 }));
    lid.position.y = top + 0.5; this.obj.add(lid);
    this.obj.add(this._wrapLabel(cfg, maps, R, 0.6, 6.9));
    return { cy: 4.7, size: 13, foot: R, floor: 0 };
  }

  _can(cfg, maps, cont) {
    const R = 3.3, H = 12.2;
    const pts = [[0, 0.35], [R * 0.82, 0], [R, 0.7], [R, H - 1.1], [R * 0.88, H - 0.25], [R * 0.9, H], [R * 0.84, H - 0.05], [0, H - 0.15]].map(([x, y]) => new THREE.Vector2(x, y));
    this.obj.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 96), this._containerMat(cont)));
    this.obj.add(this._wrapLabel(cfg, maps, R, 0.75, H - 1.15));
    return { cy: 6.3, size: 14.5, foot: R, floor: 0 };
  }

  _pouch(cfg, maps, cont) {
    const W = 14, H = 20, D = 2.4;
    const depth = (x, y) => {
      const yn = (y + H / 2) / H;
      const xs = Math.sqrt(Math.max(0, 1 - Math.pow(2 * x / W, 2)));
      const prof = yn > 0.9 ? 0.02 : Math.pow(1 - yn / 0.9, 0.55) * 0.85 + 0.15 * Math.sin(Math.PI * yn / 0.9);
      return D * xs * prof + 0.01;
    };
    const mkSide = (sign) => {
      const g = new THREE.PlaneGeometry(W, H, 48, 64);
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, sign * depth(p.getX(i), p.getY(i)));
      g.computeVertexNormals();
      return g;
    };
    const mat = this._containerMat(cont); mat.side = THREE.DoubleSide;
    const front = new THREE.Mesh(mkSide(1), mat), back = new THREE.Mesh(mkSide(-1), mat);
    [front, back].forEach(m => { m.position.y = H / 2; this.obj.add(m); });
    // zipper
    const zip = new THREE.Mesh(new THREE.BoxGeometry(W * 0.98, 0.18, 0.12), new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }));
    zip.position.set(0, H * 0.86, depth(0, H * 0.36) + 0.02); this.obj.add(zip);
    // etiqueta deformada sobre la cara frontal
    const lw = cfg.w / 10, lh = cfg.h / 10;
    const cy = -H / 2 + lh / 2 + 0.8 + (H * 0.78 - lh - 0.8) * (1 - cfg.posY);
    const g = new THREE.PlaneGeometry(lw, lh, 40, 40);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i) + cy; p.setY(i, y); p.setZ(i, depth(x, y) + 0.03); }
    g.computeVertexNormals();
    const lab = new THREE.Mesh(g, this._labelMaterial(maps, cfg));
    lab.position.y = H / 2; lab.renderOrder = 3; this.obj.add(lab);
    return { cy: H / 2, size: H + 2, foot: W / 2.2, floor: 0 };
  }

  _box(cfg, maps, cont, sideMaps) {
    const w = cfg.w / 10, h = cfg.h / 10, d = cfg.d / 10;
    const front = this._labelMaterial(maps, cfg);
    front.side = THREE.FrontSide; front.transparent = false; front.alphaTest = 0;
    const side = this._labelMaterial(sideMaps, cfg); side.side = THREE.FrontSide; side.transparent = false; side.alphaTest = 0;
    const capCanvas = document.createElement('canvas'); capCanvas.width = capCanvas.height = 4;
    const cx = capCanvas.getContext('2d'); cx.drawImage(sideMaps.color, sideMaps.W / 2, 2, 2, 2, 0, 0, 4, 4);
    const top = new THREE.MeshPhysicalMaterial({ map: this._tex(capCanvas), roughness: 0.6 });
    const g = new THREE.BoxGeometry(w, h, d);
    const box = new THREE.Mesh(g, [side, side, top, top, front, front]);
    box.position.y = h / 2; this.obj.add(box);
    // pestaña superior
    const flap = new THREE.Mesh(new THREE.BoxGeometry(w * 0.98, 0.04, d * 0.98), top);
    flap.position.y = h + 0.02; this.obj.add(flap);
    return { cy: h / 2, size: Math.max(h, w * 1.3) + 2, foot: Math.max(w, d) / 1.6, floor: 0 };
  }

  _textile(cfg, maps, cont) {
    const FW = 22, FH = 16;
    const fc = document.createElement('canvas'); fc.width = fc.height = 512;
    const x = fc.getContext('2d'); x.fillStyle = cont.color; x.fillRect(0, 0, 512, 512);
    x.globalAlpha = 0.12; x.fillStyle = '#000';
    for (let i = 0; i < 512; i += 4) { x.fillRect(0, i, 512, 1); x.fillRect(i, 0, 1, 512); }
    x.globalAlpha = 0.06; x.fillStyle = '#fff';
    for (let i = 2; i < 512; i += 4) x.fillRect(0, i, 512, 1);
    const ft = this._tex(fc); ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(6, 4);
    const fg = new THREE.PlaneGeometry(FW, FH, 40, 30);
    const p = fg.attributes.position;
    const wave = (x, y) => Math.sin(x * 0.45) * 0.35 + Math.cos(y * 0.5 + x * 0.2) * 0.25;
    for (let i = 0; i < p.count; i++) p.setZ(i, wave(p.getX(i), p.getY(i)));
    fg.computeVertexNormals();
    const fabric = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({ map: ft, roughness: 1, side: THREE.DoubleSide }));
    fabric.position.y = FH / 2 - 1; this.obj.add(fabric);
    const lw = cfg.w / 10, lh = cfg.h / 10;
    const lg = new THREE.PlaneGeometry(lw, lh, 20, 20);
    const lp = lg.attributes.position;
    for (let i = 0; i < lp.count; i++) lp.setZ(i, wave(lp.getX(i), lp.getY(i) + 1) + 0.06);
    lg.computeVertexNormals();
    const mat = this._labelMaterial(maps, cfg);
    if (cfg.material === 'satin') { mat.clearcoat = 0.4; }
    const lab = new THREE.Mesh(lg, mat);
    lab.position.y = FH / 2; this.obj.add(lab);
    this.shadow.visible = false;
    return { cy: FH / 2, size: Math.max(lh * 2.4, 9), foot: 0.01, floor: -50 };
  }

  snapshot() { return this.renderer.domElement.toDataURL('image/png'); }
}

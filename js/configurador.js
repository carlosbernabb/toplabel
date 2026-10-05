/* Top Label Studio · configurador */
(function () {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  // Fuentes de diseño
  const fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = TL.fontsUrl; document.head.appendChild(fl);

  /* ---------- Estado ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  };
  let cfg = Object.assign(TL.defaultConfig(), store.get('tl_design', {}));
  const qp = new URLSearchParams(location.search).get('p');
  if (qp && TL.products[qp] && qp !== cfg.product) applyProduct(qp, true);

  const viewer = new TLViewer($('#viewer'), { maxPx: 2048 });
  let step = 0;

  /* ---------- Iconos de producto ---------- */
  const icons = {
    bottle: '<svg viewBox="0 0 40 60"><path d="M16 4h8v10c0 3 6 5 6 12v28a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V26c0-7 6-9 6-12z"/><rect x="11" y="30" width="18" height="14" rx="1"/></svg>',
    flask: '<svg viewBox="0 0 40 60"><rect x="14" y="3" width="12" height="7" rx="1"/><path d="M16 10h8l2 5c4 1 6 3 6 7v31a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V22c0-4 2-6 6-7z"/><rect x="8" y="27" width="24" height="18"/></svg>',
    jar: '<svg viewBox="0 0 48 60"><rect x="10" y="10" width="28" height="6" rx="2"/><path d="M8 18h32v34a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z"/><rect x="8" y="28" width="32" height="14"/></svg>',
    can: '<svg viewBox="0 0 40 60"><path d="M12 6h16l3 4v42l-3 4H12l-3-4V10z"/><path d="M9 14h22M9 48h22"/></svg>',
    pouch: '<svg viewBox="0 0 48 60"><path d="M10 6h28v6c0 10 4 20 4 40a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3c0-20 4-30 4-40z"/><path d="M10 14h28"/><rect x="14" y="26" width="20" height="18" rx="2"/></svg>',
    box: '<svg viewBox="0 0 52 60"><path d="M26 6l20 10v28L26 54 6 44V16z"/><path d="M6 16l20 10 20-10M26 26v28"/></svg>',
    shirt: '<svg viewBox="0 0 56 60"><path d="M20 6l-14 8 5 10 5-3v33h24V21l5 3 5-10-14-8c-1 4-4 6-8 6s-7-2-8-6z"/><rect x="23" y="16" width="10" height="6"/></svg>',
  };

  /* ---------- Render de opciones ---------- */
  function renderProducts() {
    $('#optProduct').innerHTML = Object.entries(TL.products).map(([id, p]) =>
      `<button class="opt" data-v="${id}"><span class="pic">${icons[p.icon]}</span><b>${p.name}</b><small>${p.desc}</small></button>`).join('');
  }
  const matChip = { couche: 'sw-couche', bopp: 'sw-bopp', transp: 'sw-transp', metal: 'sw-metal', kraft: 'sw-kraft', verjurado: 'sw-verj', holo: 'sw-holo', sulfatada: 'sw-couche', kraftcaja: 'sw-kraft', metalcaja: 'sw-metal', satin: 'sw-bopp', tafeta: 'sw-couche', tejida: 'sw-verj', algodon: 'sw-verj' };
  const finChip = { brillante: 'linear-gradient(120deg,#2b4bd1,#86a5ff 45%,#2b4bd1 55%,#1b2f8a)', mate: '#3a4870', soft: 'linear-gradient(#2c3550,#262e46)', uv: 'linear-gradient(120deg,#2c3550 0 40%,#7f9cff 50%,#2c3550 60%)', oro: 'linear-gradient(120deg,#a87b1f,#f6dc8a,#b8892b,#f2d27a,#8e6516)', plata: 'linear-gradient(120deg,#8c9298,#f4f6f8,#a5abb1,#eef0f2,#80868c)', recto: '#d8d8d8', doblez: 'linear-gradient(90deg,#d8d8d8 49%,#9a9a9a 50%,#d8d8d8 51%)', laser: '#eee' };
  function renderMaterials() {
    const cat = TL.products[cfg.product].cat;
    $('#optMaterial').innerHTML = Object.entries(TL.materials).filter(([, m]) => m.cat === cat).map(([id, m]) =>
      `<button class="opt" data-v="${id}"><span class="chip ${matChip[id]}"></span><b>${m.name}</b><small>${m.desc}</small></button>`).join('');
    $('#optFinish').innerHTML = Object.entries(TL.finishes).filter(([, f]) => f.cats.includes(cat)).map(([id, f]) =>
      `<button class="opt" data-v="${id}"><span class="chip" style="background:${finChip[id]}"></span><b>${f.name}</b><small>${f.desc}</small></button>`).join('');
  }
  function renderContainers() {
    const list = TL.containers[cfg.product] || [];
    $('#optContainer').innerHTML = list.map(c => `<button class="chipbtn" data-v="${c.id}"><i style="background:${c.color}"></i>${c.name}</button>`).join('');
  }
  function renderShapes() {
    $('#optShape').innerHTML = Object.entries(TL.shapes).map(([id, n]) => `<button class="chipbtn" data-v="${id}">${n}</button>`).join('');
  }
  function renderFonts() {
    $('#selFont').innerHTML = TL.fonts.map(f => `<option value="${f}" style="font-family:'${f}'">${f}</option>`).join('');
  }
  const TIERS = [1000, 2500, 5000, 10000, 25000, 50000, 500, 100000];
  function renderTiers() {
    const tiers = [1000, 2500, 5000, 10000];
    $('#tiers').innerHTML = tiers.map(q => {
      const t = TL.quote(Object.assign({}, cfg, { qty: q }));
      return `<button class="tier" data-v="${q}"><b>${q.toLocaleString('es-MX')}</b><small>${TL.money(t.unit)} c/u</small></button>`;
    }).join('');
  }

  /* ---------- Producto ---------- */
  function applyProduct(id, silent) {
    const p = TL.products[id];
    const prevCat = TL.products[cfg.product].cat;
    cfg.product = id;
    cfg.w = p.w; cfg.h = p.h; if (p.d) cfg.d = p.d;
    const conts = TL.containers[id] || [];
    if (!conts.find(c => c.id === cfg.container)) cfg.container = conts[0]?.id || '';
    if (TL.materials[cfg.material].cat !== p.cat) cfg.material = Object.keys(TL.materials).find(k => TL.materials[k].cat === p.cat);
    if (!TL.finishes[cfg.finish].cats.includes(p.cat)) cfg.finish = Object.keys(TL.finishes).find(k => TL.finishes[k].cats.includes(p.cat));
    if (id === 'lata') { cfg.shape = 'rect'; cfg.posY = 0.5; }
    if (p.cat === 'caja') cfg.shape = 'rect';
    if (p.cat === 'textil' && prevCat !== 'textil') { cfg.shape = 'rect'; cfg.frame = false; cfg.titleSize = 0.34; cfg.bgType = 'natural'; }
    if (prevCat === 'textil' && p.cat !== 'textil') { cfg.titleSize = 0.28; }
    if (!silent) { renderMaterials(); renderContainers(); }
  }

  /* ---------- Sincroniza UI ← estado ---------- */
  function syncUI() {
    const p = TL.products[cfg.product];
    const mark = (sel, v) => $$(sel + ' [data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === String(v)));
    mark('#optProduct', cfg.product); mark('#optMaterial', cfg.material); mark('#optFinish', cfg.finish);
    mark('#optContainer', cfg.container); mark('#optShape', cfg.shape); mark('#optBg', cfg.bgType);
    mark('#optAlign', cfg.align); mark('#optImageMode', cfg.imageMode); mark('#optPres', cfg.presentation); mark('#tiers', cfg.qty);
    $$('[data-k]').forEach(el => {
      const v = cfg[el.dataset.k];
      if (el.type === 'checkbox') el.checked = !!v;
      else if (document.activeElement !== el) el.value = v ?? '';
      if (el.type === 'range') paintRange(el);
      if (el.type === 'color') el.nextElementSibling && !el.closest('label').textContent.includes('marco') && (el.nextElementSibling.textContent = String(v).toUpperCase());
    });
    const cont = (TL.containers[cfg.product] || []).find(c => c.id === cfg.container) || {};
    const hasCont = (TL.containers[cfg.product] || []).length > 0;
    $('#grpContainer').style.display = hasCont ? '' : 'none';
    $('#grpCap').style.display = ['botella', 'frasco', 'envase'].includes(cfg.product) ? '' : 'none';
    $('#grpLiquid').style.visibility = cont.glass ? 'visible' : 'hidden';
    $('#grpLiquidT').style.display = ['botella', 'frasco', 'envase'].includes(cfg.product) && cont.glass ? '' : 'none';
    $('#grpBgColors').style.display = cfg.bgType === 'natural' ? 'none' : '';
    $('#bg2wrap').style.display = cfg.bgType === 'gradient' ? '' : 'none';
    $('#grpLogo').style.display = cfg.image && cfg.imageMode === 'logo' ? '' : 'none';
    $('#optShape').parentElement.style.display = p.cat === 'caja' || cfg.product === 'lata' ? 'none' : '';
    $('#grpD').style.display = p.cat === 'caja' ? '' : 'none';
    $('#grpDims').className = p.cat === 'caja' ? 'row3' : 'row';
    $('#lblW').textContent = p.cat === 'caja' ? 'Frente (mm)' : 'Ancho (mm)';
    $('#grpPos').style.display = ['botella', 'envase', 'frasco', 'lata', 'bolsa'].includes(cfg.product) ? '' : 'none';
    $('#grpPres').style.display = p.cat === 'etiqueta' ? '' : 'none';
    $('#oImgScale').textContent = Math.round(cfg.imgScale * 100) + '%';
    $('#oTitleSize').textContent = Math.round(cfg.titleSize * 100) + '%';
    // pista de envolvente
    const circ = { botella: 220, envase: 214, frasco: 264, lata: 207 }[cfg.product];
    $('#wrapHint').textContent = circ ? `Perímetro del envase ≈ ${circ} mm · ${cfg.w >= circ ? 'la etiqueta da la vuelta completa' : `cubre ${Math.round(cfg.w / circ * 100)}% del contorno`}.` : p.cat === 'caja' ? 'Medidas interiores de la caja armada.' : '';
    // imagen
    const drop = $('#drop');
    if (cfg.image) {
      drop.classList.add('has');
      drop.innerHTML = `<input type="file" id="file" accept="image/*" hidden><img src="${cfg.image}" alt=""><div><b>Imagen cargada</b><br><small>Haz clic para cambiarla</small></div><button class="chipbtn" id="rmImg" type="button">Quitar</button>`;
    } else if (drop.classList.contains('has')) {
      drop.classList.remove('has');
      drop.innerHTML = `<input type="file" id="file" accept="image/*" hidden><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg><b>Arrastra tu imagen o haz clic</b><small>PNG con fondo transparente, JPG, WEBP o SVG</small>`;
    }
    $('#file').onchange = e => loadFile(e.target.files[0]);
    const rm = $('#rmImg'); if (rm) rm.onclick = e => { e.preventDefault(); e.stopPropagation(); cfg.image = null; update(); };
    renderTiers(); mark('#tiers', cfg.qty);
  }

  function paintRange(el) {
    const p = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.setProperty('--p', p + '%');
  }

  /* ---------- Actualización ---------- */
  let raf, saveT;
  function update(fast) {
    syncUI();
    updateQuote();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(async () => {
      $('#loading').classList.remove('off');
      await viewer.set(cfg);
      $('#loading').classList.add('off');
      if (flatOn) drawFlat();
    });
    clearTimeout(saveT);
    saveT = setTimeout(() => { if (!store.set('tl_design', cfg)) store.set('tl_design', Object.assign({}, cfg, { image: null })); }, 400);
  }

  function updateQuote() {
    const q = TL.quote(cfg);
    $('#qUnit').textContent = TL.money(q.unit);
    $('#qQty').textContent = cfg.qty.toLocaleString('es-MX');
    $('#qDays').textContent = q.days + ' días';
    $('#qTotal').textContent = TL.money(q.total);
    const p = TL.products[cfg.product];
    const cont = (TL.containers[cfg.product] || []).find(c => c.id === cfg.container);
    const rows = [
      ['Producto', p.name + (cont ? ` · ${cont.name}` : '')],
      ['Material', TL.materials[cfg.material].name],
      ['Acabado', TL.finishes[cfg.finish].name],
      ['Medidas', p.cat === 'caja' ? `${cfg.w} × ${cfg.h} × ${cfg.d} mm` : `${cfg.w} × ${cfg.h} mm · ${TL.shapes[cfg.shape]}`],
      ['Tipografía', cfg.titleFont],
      ['Imagen', cfg.image ? (cfg.imageMode === 'full' ? 'Arte completo' : 'Logo') : 'Sin imagen'],
    ];
    if (p.cat === 'etiqueta') rows.push(['Presentación', { rollo: 'Rollo para aplicadora', 'rollo-manual': 'Rollo manual', hojas: 'Hojas' }[cfg.presentation]]);
    $('#summary').innerHTML = rows.map(r => `<div><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
    $('#breakdown').innerHTML = [
      ['Cantidad', cfg.qty.toLocaleString('es-MX') + ' pzas'],
      ['Precio unitario', TL.money(q.unit)],
      ['Placas, suaje y arranque', TL.money(q.setup)],
      ['Subtotal', TL.money(q.subtotal)],
      ['IVA 16%', TL.money(q.iva)],
      ['<b style="color:var(--text)">Total estimado</b>', `<b style="color:var(--accent-2);font-size:18px">${TL.money(q.total)}</b>`],
    ].map(r => `<div><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
  }

  /* ---------- Eventos ---------- */
  const on = (sel, fn) => $(sel).addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { fn(b.dataset.v); update(); } });
  on('#optProduct', v => applyProduct(v));
  on('#optMaterial', v => cfg.material = v);
  on('#optFinish', v => cfg.finish = v);
  on('#optContainer', v => cfg.container = v);
  on('#optShape', v => { cfg.shape = v; if (v === 'circle') cfg.h = cfg.w = Math.min(cfg.w, cfg.h); });
  on('#optBg', v => cfg.bgType = v);
  on('#optAlign', v => cfg.align = v);
  on('#optImageMode', v => cfg.imageMode = v);
  on('#optPres', v => cfg.presentation = v);
  on('#tiers', v => cfg.qty = +v);

  $$('[data-k]').forEach(el => {
    const k = el.dataset.k;
    const ev = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(ev, () => {
      let v = el.type === 'checkbox' ? el.checked : el.type === 'range' || el.type === 'number' ? parseFloat(el.value) : el.value;
      if (el.type === 'number') {
        if (isNaN(v)) return;
        if (k === 'qty') v = Math.max(500, Math.round(v));
        else v = Math.max(+el.min, Math.min(+el.max, v));
        if (cfg.shape === 'circle' && (k === 'w' || k === 'h')) { cfg.w = cfg.h = v; }
      }
      cfg[k] = v;
      update();
    });
    if (el.type === 'number') el.addEventListener('blur', () => { el.value = cfg[k]; });
  });

  // Imagen: carga y arrastre
  function loadFile(f) {
    if (!f || !f.type.startsWith('image/')) return toast('Sube un archivo de imagen');
    if (f.size > 15 * 1024 * 1024) return toast('La imagen pesa más de 15 MB');
    const r = new FileReader();
    r.onload = () => {
      // Reduce imágenes enormes para que el visor sea fluido
      const im = new Image();
      im.onload = () => {
        const max = 2400, s = Math.min(1, max / Math.max(im.width, im.height));
        if (s < 1 || f.type !== 'image/svg+xml') {
          const c = document.createElement('canvas'); c.width = Math.round(im.width * s) || 1024; c.height = Math.round(im.height * s) || 1024;
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          cfg.image = c.toDataURL(f.type === 'image/jpeg' ? 'image/jpeg' : 'image/png', 0.92);
        } else cfg.image = r.result;
        if (!cfg.imageMode) cfg.imageMode = 'logo';
        update(); toast('Imagen cargada ✓');
      };
      im.src = r.result;
    };
    r.readAsDataURL(f);
  }
  const drop = $('#drop');
  ['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('drag'); }));
  drop.addEventListener('drop', e => loadFile(e.dataTransfer.files[0]));

  // Pasos
  function go(i) {
    step = Math.max(0, Math.min(4, i));
    $$('.tab').forEach((t, k) => { t.classList.toggle('on', k === step); t.classList.toggle('done', k < step); });
    $$('.pane').forEach((p, k) => p.classList.toggle('on', k === step));
    $('#prev').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('#next').textContent = step === 4 ? 'Agregar al pedido' : 'Siguiente';
    $('.panes').scrollTop = 0;
  }
  $('#tabs').addEventListener('click', e => { const t = e.target.closest('.tab'); if (t) go(+t.dataset.i); });
  $('#prev').onclick = () => go(step - 1);
  $('#next').onclick = () => step === 4 ? addToCart() : go(step + 1);

  // Escenario
  let flatOn = false;
  $('#viewMode').addEventListener('click', e => {
    const b = e.target.closest('[data-v]'); if (!b) return;
    flatOn = b.dataset.v === '2d';
    $$('#viewMode button').forEach(x => x.classList.toggle('on', x === b));
    $('#flat').classList.toggle('on', flatOn);
    viewer.renderer.domElement.style.visibility = flatOn ? 'hidden' : 'visible';
    $('#hint').style.display = flatOn ? 'none' : '';
    if (flatOn) drawFlat();
  });
  async function drawFlat() {
    const p = TL.products[cfg.product];
    const maps = await TL.drawLabel(cfg, { maxPx: 1400 });
    const wrap = $('#flatWrap');
    wrap.querySelector('canvas')?.remove();
    const c = maps.color; c.style.display = 'block';
    wrap.insertBefore(c, $('#dieline'));
    const dl = $('#dieline');
    dl.style.borderRadius = cfg.shape === 'oval' || cfg.shape === 'circle' ? '50%' : cfg.shape === 'round' ? Math.min(cfg.w, cfg.h) * 0.09 / Math.max(cfg.w, cfg.h) * 100 + '%' : '0';
    dl.style.inset = '34px';
    $('#dimW').textContent = (p.cat === 'caja' ? 'Frente ' : '') + cfg.w + ' mm';
    $('#dimH').textContent = cfg.h + ' mm';
  }
  $('#bgPick').addEventListener('click', e => {
    const b = e.target.closest('[data-v]'); if (!b) return;
    $$('#bgPick button').forEach(x => x.classList.toggle('on', x === b));
    $('#stage').className = 'cfg-stage ' + b.dataset.v;
  });
  $('#rotBtn').onclick = () => { viewer.autoRotate = !viewer.autoRotate; $('#rotBtn').classList.toggle('on', viewer.autoRotate); };
  const downloadShot = () => {
    const a = document.createElement('a');
    a.href = viewer.snapshot(); a.download = `mockup-${(cfg.title || 'etiqueta').toLowerCase().replace(/[^a-z0-9]+/gi, '-')}.png`; a.click();
    toast('Mockup descargado');
  };
  $('#shotBtn').onclick = downloadShot; $('#dlMock').onclick = downloadShot;

  /* ---------- Carrito ---------- */
  let cart = store.get('tl_cart', []);
  function thumb() {
    const src = viewer.renderer.domElement;
    const c = document.createElement('canvas'); const s = 240; c.width = c.height = s;
    const x = c.getContext('2d'); x.fillStyle = '#0f1a3a'; x.fillRect(0, 0, s, s);
    const k = Math.min(src.width, src.height);
    x.drawImage(src, (src.width - k) / 2, (src.height - k) / 2, k, k, 0, 0, s, s);
    return c.toDataURL('image/jpeg', 0.8);
  }
  function addToCart() {
    const q = TL.quote(cfg);
    cart.push({ id: Date.now(), cfg: Object.assign({}, cfg, { image: null }), hasImage: !!cfg.image, notes: $('#notes').value, quote: q, thumb: thumb() });
    store.set('tl_cart', cart);
    renderCart(); openCart(true);
    toast('Agregado a tu pedido ✓');
  }
  $('#addCart').onclick = addToCart; $('#addCart2').onclick = addToCart;

  function itemLine(it) {
    const c = it.cfg, p = TL.products[c.product];
    return `${p.name} · ${TL.materials[c.material].name} · ${TL.finishes[c.finish].name}<br>${p.cat === 'caja' ? `${c.w}×${c.h}×${c.d}` : `${c.w}×${c.h}`} mm · ${c.qty.toLocaleString('es-MX')} pzas`;
  }
  function totals() {
    const sub = cart.reduce((a, it) => a + it.quote.subtotal, 0);
    return { sub, iva: sub * TL_CONFIG.iva, total: sub * (1 + TL_CONFIG.iva) };
  }
  function renderCart(state) {
    $('#cartCount').textContent = cart.length || ''; $('#cartCount').dataset.n = cart.length;
    const body = $('#cartBody'), foot = $('#cartFoot');
    if (state && state.done) {
      body.innerHTML = `<div class="success"><div class="ok"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5"/></svg></div><h3>¡Pedido listo!</h3><p style="color:var(--muted)">Tu folio es</p><span class="folio">${state.folio}</span><p style="color:var(--muted);font-size:14px">Envíanos el resumen por WhatsApp o correo y adjunta tu arte final. Un asesor te contactará para la prueba de color.</p></div>`;
      foot.innerHTML = `<a class="btn btn-primary" href="${state.wa}" target="_blank" rel="noopener">Enviar por WhatsApp</a><a class="btn btn-ghost" href="${state.mail}">Enviar por correo</a><button class="btn btn-ghost" id="newOrder">Nuevo pedido</button>`;
      $('#newOrder').onclick = () => { cart = []; store.set('tl_cart', cart); renderCart(); openCart(false); };
      return;
    }
    if (!cart.length) {
      body.innerHTML = `<div class="empty"><div class="big"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg></div><p>Tu pedido está vacío.<br>Diseña tu etiqueta y agrégala aquí.</p></div>`;
      foot.innerHTML = ''; return;
    }
    body.innerHTML = cart.map((it, i) => `<div class="citem"><img src="${it.thumb}" alt=""><div><h4>${it.cfg.title || 'Sin título'}</h4><p>${itemLine(it)}</p></div><div><div class="pr">${TL.money(it.quote.subtotal)}</div><button class="rm" data-i="${i}">Quitar</button></div></div>`).join('')
      + `<form class="checkout" id="checkout"><h4 style="margin-top:10px">Tus datos</h4>
        <input class="input" name="name" required placeholder="Nombre completo">
        <input class="input" name="company" placeholder="Empresa / marca">
        <div class="row"><input class="input" name="email" type="email" required placeholder="Correo"><input class="input" name="phone" type="tel" required placeholder="Teléfono"></div>
        <input class="input" name="city" placeholder="Ciudad de entrega">
        <label class="toggle"><span>Requiero factura</span><input type="checkbox" name="invoice"><span class="sw"></span></label>
      </form>`;
    body.querySelectorAll('.rm').forEach(b => b.onclick = () => { cart.splice(+b.dataset.i, 1); store.set('tl_cart', cart); renderCart(); });
    const t = totals();
    foot.innerHTML = `<div class="tot"><span>Subtotal</span><span>${TL.money(t.sub)}</span></div><div class="tot"><span>IVA</span><span>${TL.money(t.iva)}</span></div><div class="tot grand"><span>Total estimado</span><span>${TL.money(t.total)}</span></div><button class="btn btn-primary" id="placeOrder">Generar pedido</button>`;
    $('#placeOrder').onclick = placeOrder;
  }
  function placeOrder() {
    const f = $('#checkout');
    if (!f.reportValidity()) return;
    const d = Object.fromEntries(new FormData(f));
    const now = new Date();
    const folio = `TL-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const t = totals();
    const lines = cart.map((it, i) => {
      const c = it.cfg, p = TL.products[c.product];
      const cont = (TL.containers[c.product] || []).find(x => x.id === c.container);
      return `${i + 1}. ${c.title || 'Sin título'}\n   ${p.name}${cont ? ' (' + cont.name + ')' : ''}\n   Material: ${TL.materials[c.material].name} · Acabado: ${TL.finishes[c.finish].name}\n   Medidas: ${p.cat === 'caja' ? `${c.w}×${c.h}×${c.d}` : `${c.w}×${c.h}`} mm · Forma: ${TL.shapes[c.shape]}\n   Cantidad: ${c.qty.toLocaleString('es-MX')} · Tipografía: ${c.titleFont}${it.hasImage ? ' · Con imagen (adjunto)' : ''}\n   Estimado: ${TL.money(it.quote.subtotal)} + IVA${it.notes ? `\n   Notas: ${it.notes}` : ''}`;
    }).join('\n\n');
    const msg = `Hola Top Label, quiero confirmar mi pedido.\n\nFolio: ${folio}\nNombre: ${d.name}\nEmpresa: ${d.company || '-'}\nCorreo: ${d.email}\nTeléfono: ${d.phone}\nCiudad: ${d.city || '-'}\nFactura: ${d.invoice ? 'Sí' : 'No'}\n\n${lines}\n\nTotal estimado: ${TL.money(t.total)} (IVA incl.)`;
    const orders = store.get('tl_orders', []); orders.push({ folio, date: now.toISOString(), customer: d, items: cart.map(i => ({ cfg: i.cfg, quote: i.quote, notes: i.notes })) }); store.set('tl_orders', orders);
    renderCart({ done: true, folio, wa: `https://wa.me/${TL_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, mail: `mailto:${TL_CONFIG.email}?subject=${encodeURIComponent('Pedido ' + folio)}&body=${encodeURIComponent(msg)}` });
  }
  function openCart(v) { $('#drawer').classList.toggle('open', v); $('#drawerBg').classList.toggle('open', v); }
  $('#openCart').onclick = () => openCart(true);
  $('#closeCart').onclick = () => openCart(false);
  $('#drawerBg').onclick = () => openCart(false);
  addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });

  let tt;
  function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2200); }

  /* ---------- Inicio ---------- */
  renderProducts(); renderMaterials(); renderContainers(); renderShapes(); renderFonts();
  go(0); renderCart(); update();
  document.fonts && document.fonts.ready.then(() => update());
})();

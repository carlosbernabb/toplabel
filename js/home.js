/* Top Label · página de inicio: animaciones ligadas al scroll */
(function () {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 860px)');

  /* ---------- Nav y utilidades ---------- */
  const nav = $('#nav');
  $('#burger').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  const wa = `https://wa.me/${TL_CONFIG.whatsapp}`;
  $('#ciWa').href = wa; $('#waFloat').href = wa + '?text=' + encodeURIComponent('Hola Top Label, me interesa cotizar etiquetas.');
  $('#ciWaT').textContent = TL_CONFIG.telefono;
  $('#ciMail').href = 'mailto:' + TL_CONFIG.email; $('#ciMailT').textContent = TL_CONFIG.email;
  $('#ciAddr').textContent = TL_CONFIG.direccion;
  $('#fMail').textContent = TL_CONFIG.email; $('#fTel').textContent = TL_CONFIG.telefono; $('#fAddr').textContent = TL_CONFIG.direccion;
  $('#yr').textContent = new Date().getFullYear();

  let via = 'wa';
  $$('#contactForm [data-via]').forEach(b => b.addEventListener('click', () => via = b.dataset.via));
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const msg = `Hola Top Label,\n\nNombre: ${$('#cName').value}\nEmpresa: ${$('#cCompany').value || '-'}\nCorreo: ${$('#cEmail').value}\nTeléfono: ${$('#cPhone').value || '-'}\nNecesito: ${$('#cType').value}\n\n${$('#cMsg').value}`;
    if (via === 'wa') window.open(`${wa}?text=${encodeURIComponent(msg)}`, '_blank');
    else location.href = `mailto:${TL_CONFIG.email}?subject=${encodeURIComponent('Cotización · ' + $('#cType').value)}&body=${encodeURIComponent(msg)}`;
  });

  /* ---------- Hero: fotos con parallax al mover el mouse ---------- */
  const hp = $('#heroPhotos');
  if (hp && matchMedia('(pointer:fine)').matches && !reduce) {
    const figs = [...hp.querySelectorAll('.ph')];
    hp.addEventListener('pointermove', e => {
      const r = hp.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      figs.forEach(f => { f.style.setProperty('--mx', `${-x * f.dataset.depth}px`); f.style.setProperty('--my', `${-y * f.dataset.depth}px`); });
    });
    hp.addEventListener('pointerleave', () => figs.forEach(f => { f.style.setProperty('--mx', '0px'); f.style.setProperty('--my', '0px'); }));
  }
  const phs = $$('.ph');

  /* ---------- Historias de clientes ---------- */
  const STORIES = [
    { brand: 'Mil Diablos', cat: 'Mezcal artesanal · Oaxaca', prod: 'mildiablos', focus: [50, 64, 3.2], text: 'Carácter artesanal en papel con textura, con toda la información regulatoria en una sola pieza.', chips: ['Contraetiqueta', 'Papel texturizado', 'Información NOM'] },
    { brand: 'Vish', cat: 'Lavatrastes líquido', prod: 'vish', focus: [51, 72, 2.4], text: 'Colores saturados y un corte a la medida de la botella para destacar en el pasillo.', chips: ['Suaje con forma', 'Alta saturación', 'Código de barras'] },
    { brand: 'Flor de Alfalfa', cat: 'Ghee · mantequilla clarificada', prod: 'flordealfalfa', focus: [50, 52, 1.7], text: 'Una etiqueta que abraza todo el frasco: ilustración al frente y tabla nutrimental atrás.', chips: ['Envolvente 360°', 'Corte ondulado', 'Tabla nutrimental'] },
    { brand: "D'Gari", cat: 'Jarabe sabor maple', prod: 'dgari', focus: [68, 70, 2.2], text: 'Fotografía apetitosa y sellos de advertencia integrados en un suaje especial.', chips: ['Sellos NOM-051', 'Suaje especial', 'Fotografía'] },
    { brand: 'Mr. Lucky', cat: 'Ajo pelado', prod: 'mrlucky', focus: [30, 64, 2], text: 'Etiqueta bilingüe lista para anaquel nacional y de exportación.', chips: ['Bilingüe', 'Iconografía', 'Exportación'] },
    { brand: 'Fancy Pets', cat: 'Shampoo para perro', prod: 'fancypets', focus: [50, 52, 2.4], text: 'Fotografía en escala de grises y textos técnicos de uso veterinario.', chips: ['Escala de grises', 'Uso veterinario', 'Fotografía'] },
  ];
  const story = $('#clientes');
  $('#storyMedia').innerHTML = STORIES.map((s, i) => `<div class="sm" data-i="${i}"><img class="prod" src="assets/productos/${s.prod}.jpg" alt="${s.brand}"><div class="lens" style="background-image:url(assets/productos/${s.prod}.jpg);background-size:${s.focus[2] * 100}%;background-position:${s.focus[0]}% ${s.focus[1]}%"><span>Detalle de la etiqueta</span></div><span class="pill a tag">Etiqueta Top Label</span></div>`).join('');
  $('#storyTexts').innerHTML = STORIES.map((s, i) => `<div class="st" data-i="${i}"><small>${s.cat}</small><h3>${s.brand}</h3><p>${s.text}</p><div class="chips">${s.chips.map(c => `<span>${c}</span>`).join('')}</div></div>`).join('');
  $('#storyIndex').innerHTML = STORIES.map((s, i) => `<li data-i="${i}">${s.brand}</li>`).join('');
  const smEls = $$('.sm'), stEls = $$('.st'), siEls = $$('#storyIndex li');
  // Carrusel automático: cambia solo cada 5 s, se pausa al pasar el mouse o si la sección no se ve
  const DUR = 5000;
  story.style.setProperty('--dur', DUR + 'ms');
  let storyIdx = -1, storyTimer, storyVisible = false, storyHover = false;
  function showStory(i) {
    storyIdx = (i + STORIES.length) % STORIES.length;
    smEls.forEach((e, k) => e.classList.toggle('on', k === storyIdx));
    stEls.forEach((e, k) => e.classList.toggle('on', k === storyIdx));
    siEls.forEach((e, k) => e.classList.toggle('on', k === storyIdx));
    schedule();
  }
  function schedule() {
    clearTimeout(storyTimer);
    const run = storyVisible && !storyHover && !reduce;
    story.classList.toggle('paused', !run);
    if (run) {
      const li = siEls[storyIdx];  // reinicia la barrita del tiempo junto con el temporizador
      if (li) { li.classList.remove('on'); void li.offsetWidth; li.classList.add('on'); }
      storyTimer = setTimeout(() => showStory(storyIdx + 1), DUR);
    }
  }
  $('#storyIndex').addEventListener('click', e => { const li = e.target.closest('li'); if (li) showStory(+li.dataset.i); });
  story.addEventListener('pointerenter', () => { storyHover = true; schedule(); });
  story.addEventListener('pointerleave', () => { storyHover = false; schedule(); });
  new IntersectionObserver(es => { storyVisible = es[0].isIntersecting; schedule(); }, { threshold: 0.35 }).observe(story);
  // deslizar en celular
  let sx = null;
  story.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  story.addEventListener('touchend', e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) showStory(storyIdx + (dx < 0 ? 1 : -1)); sx = null; });
  showStory(0);

  /* ---------- Cintas de marcas ---------- */
  const belts = $$('.belt').map(b => {
    const t = b.querySelector('.belt-track');
    t.innerHTML += t.innerHTML; // duplicado para ciclo continuo
    return { t, dir: +b.dataset.belt, x: 0 };
  });

  /* ---------- Estudio 3D ---------- */
  let studio = null;
  const base = TL.defaultConfig();
  const label = (o) => Object.assign({}, base, { title: '', subtitle: '', details: '', frame: false, shape: 'rect', bgType: 'natural', material: 'bopp', finish: 'brillante', imageMode: 'full' }, o);
  const PRESETS = [
    label({ product: 'envase', container: 'verde', liquid: true, liquidColor: '#3fae2a', capColor: '#e0262b', image: 'assets/productos/etiquetas/vish.jpg', w: 84, h: 108, posY: 0.45 }),
    label({ product: 'botella', container: 'cristal', liquid: true, liquidColor: '#efe9d6', capColor: '#7a1f2b', image: 'assets/productos/etiquetas/mildiablos.jpg', material: 'verjurado', finish: 'mate', w: 52, h: 142, posY: 0.35 }),
    label({ product: 'frasco', container: 'cristal', liquid: true, liquidColor: '#f2c94c', capColor: '#d9c27a', image: 'assets/productos/etiquetas/flordealfalfa.jpg', w: 150, h: 60, posY: 0.5 }),
    Object.assign({}, base, { product: 'lata', container: 'alu', material: 'bopp', finish: 'brillante', shape: 'rect', w: 207, h: 100, bgType: 'gradient', bg1: '#0f1a3a', bg2: '#ff7a3d', title: 'TU MARCA', titleFont: 'Bebas Neue', titleColor: '#ffffff', titleSize: 0.34, subtitle: 'AQUÍ VA TU DISEÑO', subColor: '#ffffff', details: 'Hecho en Querétaro', frame: false, posY: 0.5 }),
  ];
  if (window.THREE) {
    const el = $('#studioViewer');
    const start = () => {
      studio = new TLViewer(el, { maxPx: 1600 });
      studio.set(PRESETS[0]);
    };
    // Crea el visor solo cuando la sección se acerca (ahorra GPU en móvil)
    const lazy = new IntersectionObserver(es => { if (es[0].isIntersecting) { start(); lazy.disconnect(); } }, { rootMargin: '300px' });
    lazy.observe(el);
    $('#studioPicks').addEventListener('click', e => {
      const b = e.target.closest('[data-i]'); if (!b || !studio) return;
      $$('#studioPicks button').forEach(x => x.classList.toggle('on', x === b));
      studio.set(PRESETS[+b.dataset.i]);
    });
  }

  /* ---------- Bucle de scroll ---------- */
  const progress = $('#progress');
  const heroCopy = $('[data-hero-copy]');
  const speeds = $$('[data-speed]');
  const hs = $('#proceso'), hsTrack = $('#hsTrack'), hsBar = $('#hsBar');
  const studioSec = $('#studio');
  const rootStyle = document.documentElement.style;
  let lastY = scrollY, vel = 0, last = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const y = scrollY, vh = innerHeight, vw = innerWidth;
    const docH = document.documentElement.scrollHeight - vh;
    vel = vel * 0.88 + (y - lastY) * 0.12; lastY = y;

    nav.classList.toggle('scrolled', y > 20);
    const p = docH > 0 ? y / docH : 0;
    progress.style.transform = `scaleX(${p})`;
    rootStyle.setProperty('--ax1', `${Math.sin(p * 6.28) * -18}vw`);
    rootStyle.setProperty('--ay1', `${p * 40}vh`);
    rootStyle.setProperty('--ax2', `${Math.cos(p * 6.28) * 20}vw`);
    rootStyle.setProperty('--ay2', `${-p * 30}vh`);

    if (!reduce) {
      // Hero: el texto se aleja suavemente
      if (y < vh * 1.2 && !small.matches) {
        heroCopy.style.transform = `translateY(${y * 0.25}px)`;
        heroCopy.style.opacity = clamp(1 - y / (vh * 0.75));
        // Las fotos se separan y suben a distinta velocidad al bajar
        phs.forEach(f => f.style.setProperty('--sy', `${-y * f.dataset.depth / 60}px`));
      }
      // Parallax por velocidad
      speeds.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2 - vh / 2) * +el.dataset.speed;
        el.style.transform = `translate3d(0, ${off}px, 0)`;
      });
      // Cintas: avanzan solas y se aceleran con el scroll
      belts.forEach(b => {
        const half = b.t.scrollWidth / 2;
        if (!half) return;
        b.x -= b.dir * (30 * dt + vel * 0.6);
        while (b.x <= -half) b.x += half;
        while (b.x > 0) b.x -= half;
        b.t.style.transform = `translate3d(${b.x}px, 0, 0)`;
      });
    }

    // Proceso horizontal
    const hr = hs.getBoundingClientRect();
    const hp = clamp(-hr.top / (hs.offsetHeight - vh));
    if (!reduce) {
      const maxX = Math.max(0, hsTrack.scrollWidth - vw + 48);
      hsTrack.style.transform = `translate3d(${-hp * maxX}px, 0, 0)`;
    }
    hsBar.style.transform = `scaleX(${hp})`;

    // El producto del estudio 3D gira con el scroll
    if (studio) {
      const r = studioSec.getBoundingClientRect();
      studio.extRot = clamp((vh - r.top) / (vh + r.height)) * Math.PI * 1.4;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

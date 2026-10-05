/* Top Label · paletas de color
   El selector flotante es temporal para elegir el color con el cliente.
   Cuando decidan, dejen solo la paleta elegida en DEFAULT y borren el selector (SHOW_PICKER = false). */
(function () {
  const SHOW_PICKER = false; // paleta elegida: naranja
  const DEFAULT = 'naranja';
  const P = {
    naranja: { name: 'Naranja imprenta', a: '#ff7a3d', a2: '#ffa06e', rgb: '255, 122, 61', on: '#1a0a02', g: ['#ffc27a', '#ff7a3d', '#ff4f8b'] },
    cian:    { name: 'Cian tinta',       a: '#38bdf8', a2: '#7dd3fc', rgb: '56, 189, 248',  on: '#031520', g: ['#a5f3fc', '#38bdf8', '#818cf8'] },
    magenta: { name: 'Magenta CMYK',     a: '#ff3d8b', a2: '#ff7fb0', rgb: '255, 61, 139',  on: '#22030d', g: ['#ffb36b', '#ff3d8b', '#a78bfa'] },
    dorado:  { name: 'Dorado foil',      a: '#f5b841', a2: '#f8cf73', rgb: '245, 184, 65',  on: '#1d1300', g: ['#fbe3a1', '#f5b841', '#ff8a5b'] },
    violeta: { name: 'Violeta',          a: '#9b7bff', a2: '#c4b5fd', rgb: '155, 123, 255', on: '#0f0626', g: ['#c4b5fd', '#9b7bff', '#38bdf8'] },
    verde:   { name: 'Verde logo',       a: '#a8d93b', a2: '#c6f05a', rgb: '168, 217, 59',  on: '#0a1402', g: ['#c6f05a', '#7fd6a0', '#6ea0ff'] },
  };
  let cur = DEFAULT;
  if (SHOW_PICKER) { try { cur = localStorage.getItem('tl_theme') || DEFAULT; } catch (e) {} }
  if (!P[cur]) cur = DEFAULT;

  function apply(id) {
    const t = P[id], r = document.documentElement.style;
    r.setProperty('--accent', t.a); r.setProperty('--accent-2', t.a2); r.setProperty('--accent-rgb', t.rgb); r.setProperty('--on-accent', t.on);
    r.setProperty('--g1', t.g[0]); r.setProperty('--g2', t.g[1]); r.setProperty('--g3', t.g[2]);
    cur = id;
    try { localStorage.setItem('tl_theme', id); } catch (e) {}
    document.querySelectorAll('.theme-pick button').forEach(b => b.classList.toggle('on', b.dataset.t === id));
    const n = document.querySelector('.theme-pick .tn'); if (n) n.textContent = t.name;
  }
  apply(cur);

  if (!SHOW_PICKER) return;
  addEventListener('DOMContentLoaded', () => {
    const w = document.createElement('div');
    w.className = 'theme-pick';
    w.innerHTML = `<span class="tl">Paleta</span><span class="tn"></span><div>${Object.entries(P).map(([id, t]) =>
      `<button data-t="${id}" title="${t.name}" style="background:${t.a}"></button>`).join('')}</div>`;
    w.addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) apply(b.dataset.t); });
    document.body.appendChild(w);
    apply(cur);
  });
})();

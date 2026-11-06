/* ==========================================================================
   STUDIO — runtime for the redesigned conversion lab
   • real, persistent countdowns (localStorage) — same rules as production
   • creative carousels with story segments (Higgsfield-style)
   • spotlight state tabs, reveal-on-scroll, hero marquee
   Works for lightbox clones too (everything is re-scanned on each tick).
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const pad = n => String(n).padStart(2, '0');

  /* ---------------- deadlines (real timers) ----------------
     name -> duration (sec). Persisted, so a reload never resets the clock.
     When a demo deadline expires it restarts (lab only; production expires for real). */
  const DUR = { starter: 24 * 3600, exit: 5 * 60, promo: 2 * 24 * 3600 + 3 * 3600 + 15 * 60, yearly: 7 * 24 * 3600, home: 24 * 3600, welcome: 7 * 24 * 3600 };
  const key = n => 'qclab_dl_' + n;
  function deadline(name) {
    const dur = (DUR[name] || 3600) * 1000;
    let end = +localStorage.getItem(key(name)) || 0;
    if (!end || end - Date.now() > dur || end <= Date.now()) { end = Date.now() + dur; localStorage.setItem(key(name), end); }
    return end;
  }
  function parts(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, total: s };
  }
  function fmt(p, f) {
    if (f === 'ms') return pad(p.h * 60 + p.m) + ':' + pad(p.s);
    if (f === 'dh') return p.d + 'd ' + pad(p.h) + ':' + pad(p.m);
    if (f === 'dhms') return p.d + 'd ' + pad(p.h) + ':' + pad(p.m) + ':' + pad(p.s);
    if (f === 'human') return p.d > 0 ? p.d + ' day' + (p.d > 1 ? 's' : '') + ' ' + p.h + 'h' : p.h + 'h ' + p.m + 'm';
    return pad(p.d * 24 + p.h) + ':' + pad(p.m) + ':' + pad(p.s); // hms (hours can exceed 24)
  }
  /* 'exit' is a session offer: its 5-minute clock only starts once the exit block is actually on screen
     (production: starts when the exit-intent modal opens). Until then it shows the full duration. */
  const LAZY = { exit: true };
  const inView = el => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; };
  function tickTimers() {
    const now = Date.now(); const cache = {};
    const rem = n => {
      if (cache[n]) return cache[n];
      if (LAZY[n] && !((+localStorage.getItem(key(n)) || 0) > now)) {
        const settled = document.readyState === 'complete' && performance.now() > 1500; // layout stable, images sized
        const visible = settled && $$(`[data-tt="${n}"],[data-cd="${n}"],[data-prog="${n}"]`).some(inView);
        if (!visible) return (cache[n] = parts((DUR[n] || 3600) * 1000));
      }
      return (cache[n] = parts(deadline(n) - now));
    };
    $$('[data-tt]').forEach(el => { el.textContent = fmt(rem(el.dataset.tt), el.dataset.fmt || 'hms'); });
    $$('[data-cd]').forEach(el => {
      const p = rem(el.dataset.cd); const f = el.dataset.fmt || 'hms';
      const vals = f === 'dhms' ? [p.d, p.h, p.m, p.s] : f === 'ms' ? [p.h * 60 + p.m, p.s] : [p.d * 24 + p.h, p.m, p.s];
      $$('b', el).forEach((b, i) => { if (vals[i] !== undefined) b.textContent = pad(vals[i]); });
    });
    $$('[data-prog]').forEach(el => {
      const p = rem(el.dataset.prog); const dur = DUR[el.dataset.prog] || 3600;
      el.style.setProperty('--w', Math.max(2, Math.min(100, (p.total / dur) * 100)).toFixed(2) + '%');
    });
  }

  /* ---------------- carousels ---------------- */
  function initCarousels() {
    $$('.z-car:not([data-init])').forEach(car => {
      car.dataset.init = '1';
      const slides = $$('.z-sl', car); if (!slides.length) return;
      const segs = $$('.z-segs span', car), labs = $$('.z-segl span', car), txts = $$('.sl-txt', car);
      const dur = +(car.dataset.dur || 4600); car.style.setProperty('--dur', dur + 'ms');
      let i = slides.findIndex(s => s.classList.contains('on')); if (i < 0) i = 0;
      const show = k => {
        slides.forEach((s, j) => s.classList.toggle('on', j === k));
        segs.forEach((s, j) => { s.classList.toggle('on', j === k); s.classList.toggle('done', j < k); });
        labs.forEach((s, j) => s.classList.toggle('on', j === k));
        // .sl-txt groups live in several containers (chip row, caption block) — toggle by index within each parent
        const groups = new Map(); txts.forEach(s => { const g = groups.get(s.parentElement) || []; g.push(s); groups.set(s.parentElement, g); });
        groups.forEach(g => g.forEach((s, j) => s.classList.toggle('on', j === k)));
      };
      show(i);
      const t = setInterval(() => { if (!car.isConnected) { clearInterval(t); return; } i = (i + 1) % slides.length; show(i); }, dur);
      car.addEventListener('click', e => { const seg = e.target.closest('.z-segs span'); if (seg) { i = segs.indexOf(seg); show(i); } });
    });
  }

  /* ---------------- spotlight tabs ---------------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('.spot-tabs button'); if (!b) return;
    const spot = b.closest('.spot'); const k = +b.dataset.i;
    $$('.spot-tabs button', spot).forEach((x, j) => x.classList.toggle('on', j === k));
    $$('.spot-item', spot).forEach((x, j) => x.classList.toggle('on', j === k));
    const st = $('.spot-side .st', spot); if (st) st.textContent = b.dataset.name || b.textContent;
    const anat = $$('.spot-side ol', spot); if (anat.length > 1) anat.forEach((o, j) => o.style.display = j === k ? '' : 'none');
    const canvas = $('.spot-canvas', spot); if (canvas && b.dataset.theme) { canvas.classList.remove('dark', 'light'); canvas.classList.add(b.dataset.theme); }
  });

  /* ---------------- reveal on scroll ---------------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) { $$('.rv').forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    $$('.rv:not(.in)').forEach(el => io.observe(el));
  }

  /* ---------------- hero marquee (real outputs made with Quadcode agents) ---------------- */
  const MARQ = [
    ['../assets/c1.jpg', 'Product hero shot', 'Lumi · Nano Banana Pro', 'IMAGE'],
    ['../../assets/pricing/case-2.jpg', 'Perfume campaign', 'Lumi · Flux 2', 'IMAGE', 'p'],
    ['../assets/c2.jpg', 'Night-run commercial', 'Sonic · Veo 3.1', 'VIDEO'],
    ['../../assets/pricing/case-3.jpg', 'Fantasy key art', 'Lumi · Imagen 4', 'IMAGE', 'p'],
    ['../assets/c4.jpg', 'Synthwave single', 'Sonic · Suno v5', 'MUSIC'],
    ['../../assets/pricing/case-5.jpg', 'Booking app UI', 'Cody · Claude Opus', 'APP', 'p'],
    ['../assets/c3.jpg', 'Desert chase, 4K', 'Sonic · Kling 3.0', 'VIDEO'],
    ['../../assets/pricing/case-4.jpg', 'Game character', 'Lumi · Flux 2', 'IMAGE', 'p'],
    ['../assets/c6.jpg', 'Brand film teaser', 'Sonic · Seedance 2.0', 'VIDEO'],
    ['../../assets/pricing/case-6.jpg', 'Orchestral score', 'Sonic · ElevenLabs', 'AUDIO', 'p'],
    ['../assets/c5.jpg', 'Sneaker macro', 'Lumi · GPT Image 2', 'IMAGE'],
    ['../../assets/pricing/case-1.jpg', 'Launch poster', 'Lumi · Nano Banana Pro', 'IMAGE', 'p'],
  ];
  function buildMarquee() {
    const host = $('#marq'); if (!host) return;
    const item = m => `<div class="it ${m[4] || ''}" style="background-image:url('${m[0]}')"><span class="tg">${m[3]}</span><b>${m[1]}<small>${m[2]}</small></b></div>`;
    host.innerHTML = `<div class="track">${MARQ.map(item).join('')}${MARQ.map(item).join('')}</div>`;
  }

  /* ---------------- boot ---------------- */
  function boot() {
    buildMarquee();
    $$('.blk, .kit > div, .sec-head').forEach(el => el.classList.add('rv'));
    initReveal();
    initCarousels();
    tickTimers();
    setInterval(() => { tickTimers(); initCarousels(); }, 1000);
    // lightbox clones: re-scan quickly after open
    document.addEventListener('click', () => setTimeout(() => { initCarousels(); tickTimers(); }, 50));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 0)); else setTimeout(boot, 0);
  window.STUDIO = { deadline, DUR, fmt, parts };
})();

/* LAB APP — moved from ../app.js */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt = n => n.toLocaleString('ru-RU');
const money = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));

/* Top bar shared by all lab pages */
function labTop(active, extra = '') {
  const tabs = [['index.html','Исследование'],['site.html','A · Сайт и ЛК'],['ide.html','B · IDE']];
  return `<div class="lab-top"><div class="brand">Conversion <span>Lab</span> <span class="xs mut" style="color:var(--dim);font-weight:500">Quadcode × Higgsfield · 25.09.2026</span></div>
  <div class="tabs">${tabs.map(([h,l]) => `<a href="${h}"><button class="${active===h?'on':''}">${l}</button></a>`).join('')}</div>${extra}
  <a class="btn sm ghost" style="margin-left:auto" href="../docs/conversion-lab-spec.md" target="_blank" title="conversion-lab/docs/conversion-lab-spec.md">Спека (md)</a></div>`;
}

/* Countdown: deadline stored in localStorage so it survives reloads (prod: server-side deadline). */
function countdown(el, key, seconds, onEnd) {
  let dl = +localStorage.getItem(key);
  if (!dl || dl < Date.now()) { dl = Date.now() + seconds * 1000; localStorage.setItem(key, dl); }
  const tick = () => {
    const left = Math.max(0, Math.round((dl - Date.now()) / 1000));
    const h = Math.floor(left / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
    el.textContent = (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    if (left <= 0) { clearInterval(t); onEnd && onEnd(); }
  };
  tick(); const t = setInterval(tick, 1000); return t;
}
function resetTimers() { Object.keys(localStorage).filter(k => k.startsWith('lab.dl.')).forEach(k => localStorage.removeItem(k)); }

/* Lightbox for evidence screenshots */
function lightbox(src) {
  const d = document.createElement('div'); d.className = 'light'; d.innerHTML = `<img src="${src}">`;
  d.onclick = () => d.remove(); document.body.appendChild(d);
}
document.addEventListener('click', e => { const im = e.target.closest('.gal img, img[data-zoom]'); if (im) lightbox(im.src); });

/* Side panel item (used by site & ide pages) */
function itemHTML(it, on) {
  return `<div class="item ${on ? 'on' : ''}" data-id="${it.id}"><div class="t"><span class="pin">${it.id}</span>${esc(it.t)}</div>
  <div class="d">${esc(it.d || it.copy || '')}</div>
  <div class="kv"><span>Триггер</span><b>${esc(it.trig)}</b>${it.hf ? `<span>У HF</span><b>${esc(it.hf)}</b>` : ''}${it.cta ? `<span>CTA</span><b>${esc(it.cta)}</b>` : ''}<span>Влияет</span><b>${esc(it.eff)}</b><span>Нужно</span><b>${esc(it.need)}</b>${it.wave ? `<span>Волна</span><b>${it.wave}</b>` : ''}</div></div>`;
}
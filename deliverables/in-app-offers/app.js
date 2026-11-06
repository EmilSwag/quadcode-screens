/* ============================================================
   Quadcode AI — In-app monetization landing
   Mockups mirror the real IDE (v0.17441, "Creator" layout):
   title bar · LEFT: Chat/History/Console/Find · CENTER: Actions/Browser
   · RIGHT: Files/Meta/Debug · status bar with profile.
   Prices/credits mirror deliverables/pricing/app.js CONFIG.
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- icons (stroke, 24-grid). No emoji on this page. ---------- */
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  infinity: '<path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
  percent: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  video: '<path d="m16 13 5.2 3.1a.5.5 0 0 0 .8-.4V8.3a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  audio: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7C3.42 8.18 7.36 5 12 5s8.58 3.18 9.94 6.65a1 1 0 0 1 0 .7C20.58 15.82 16.64 19 12 19s-8.58-3.18-9.94-6.65Z"/><circle cx="12" cy="12" r="3"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  git: '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
};
const svg = (n, s = 16, sw = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

/* ---------- shared config (mirrors pricing CONFIG) ---------- */
const PLANS = {
  free:    { n: 'Free',    credits: 50,   daily: 10 },
  starter: { n: 'Starter', credits: 300,  m: 20,  a: 15 },   // REAL live price: $20/mo, $180/yr (25% off)
  plus:    { n: 'Plus',    credits: 1200, m: 59,  a: 47,  save: 144 },
  ultra:   { n: 'Ultra',   credits: 3000, m: 129, a: 99,  save: 360 },
};
// Credit packs 1:1 with Higgsfield's in-app store (seen 23.09 as a Plus user, EUR numbers kept in USD).
// Packs are an add-on to a plan (their FAQ: "...without changing your current subscription").
// Strike-through list price = credits × 8.5¢; the % shown is computed from these numbers.
const PACK_LIST_RATE = 0.085;
const PACK_VALID_DAYS = 90;
const PACKS = [
  { cr: 100,  usd: 6 },
  { cr: 200,  usd: 12 },
  { cr: 500,  usd: 29 },
  { cr: 1000, usd: 56 },
  { cr: 2000, usd: 105 },
  { cr: 4000, usd: 205, hi: true, lab: 'Most popular' },
  { cr: 5000, usd: 250, lab: 'Best value', upTo: 25000 },   // slider 5k → 25k
];
const PASSES = [
  { m: 'nb',  d: 1, usd: 5,  s: 'Nanobanana Pro · 2K · shared queue' },
  { m: 'nb',  d: 7, usd: 23, s: 'Nanobanana Pro · 2K · shared queue', hi: true },
  { m: 'wan', d: 7, usd: 29, s: 'Wan 2.7 · 720p · shared queue' },
  { m: 'sd',  d: 3, usd: 35, s: 'Seedance 2.5 · 1080p · shared queue' },
  { m: 'sd',  d: 7, usd: 65, s: 'Seedance 2.5 · 1080p · shared queue' },
];
// Model marks: letter-mark + brand colour (same palette as the pricing page).
const MODELS = {
  nb:    { n: 'Nanobanana Pro',     k: 'NB', c: '#fbbf24', type: 'image', cost: 2,  plan: 'free' },
  nb2:   { n: 'Nanobanana 2',       k: 'NB', c: '#fde68a', type: 'image', cost: 1,  plan: 'free' },
  flux:  { n: 'FLUX.2 Pro',         k: 'F',  c: '#f97316', type: 'image', cost: 1,  plan: 'starter' },
  gpti:  { n: 'GPT Image 2.5',      k: 'G',  c: '#10a37f', type: 'image', cost: 1,  plan: 'starter' },
  sd:    { n: 'Seedance 2.5',       k: 'S',  c: '#60a5fa', type: 'video', cost: 45, plan: 'plus',  res: '1080p · 5 s' },
  sdf:   { n: 'Seedance 2.5 Fast',  k: 'S',  c: '#93c5fd', type: 'video', cost: 12, plan: 'starter', res: '720p · 5 s' },
  omni:  { n: 'Gemini Omni Flash',  k: 'GO', c: '#a78bfa', type: 'video', cost: 8,  plan: 'free',  res: '720p · 5 s' },
  wan:   { n: 'Wan 2.7',            k: 'W',  c: '#34d399', type: 'video', cost: 13, plan: 'starter', res: '720p · 5 s' },
  kling: { n: 'Kling 3.0',          k: 'K',  c: '#f472b6', type: 'video', cost: 8,  plan: 'starter', res: '1080p · 5 s' },
  veo:   { n: 'Veo 3.1',            k: 'V',  c: '#38bdf8', type: 'video', cost: 40, plan: 'plus',  res: '1080p · 4 s' },
  sora:  { n: 'Sora 2 Pro',         k: 'So', c: '#e5e7eb', type: 'video', cost: 50, plan: 'plus',  res: '1080p · 4 s' },
  sa:    { n: 'Stable Audio 3',     k: 'SA', c: '#c084fc', type: 'audio', cost: 1,  plan: 'free' },
  suno:  { n: 'Suno v5',            k: 'Su', c: '#fb7185', type: 'audio', cost: 6,  plan: 'starter' },
  el:    { n: 'ElevenLabs v3',      k: '11', c: '#ffffff', type: 'audio', cost: 1,  plan: 'starter' },
  // LLMs (agent turns)
  gemf:  { n: 'gemini-3.8-flash',   k: 'G',  c: '#a78bfa', type: 'llm', plan: 'free' },
  sonnet:{ n: 'claude-sonnet-5',    k: 'C',  c: '#d97757', type: 'llm', plan: 'free', rec: true },
  grok:  { n: 'grok-4.7',           k: 'X',  c: '#e5e7eb', type: 'llm', plan: 'starter' },
  opus:  { n: 'claude-opus-5.5',    k: 'C',  c: '#d97757', type: 'llm', plan: 'plus' },
  fable: { n: 'claude-fable-5.1',   k: 'C',  c: '#d97757', type: 'llm', plan: 'ultra', isNew: true },
  gpt6:  { n: 'gpt-6-astra',        k: 'G',  c: '#10a37f', type: 'llm', plan: 'ultra' },
};
const PLAN_RANK = { free: 0, starter: 1, plus: 2, ultra: 3 };
const mark = (id, size = '') => { const m = MODELS[id]; const l = LOGO[id]; return l ? `<span class="mk lgt ${size}">${logo(l)}</span>` : `<span class="mk ${size}" style="background:${m.c}">${m.k}</span>`; };
const planBadge = (need, have) => PLAN_RANK[need] > PLAN_RANK[have] ? `<span class="pb ${need}">${PLANS[need].n}</span>` : '';
const IMG = (n) => `../../assets/content/c${((n - 1) % 6) + 1}.jpg`;
/* real vendor logos (assets/logos, lobehub icons + simple-icons) */
const LOGO = { nb: 'gemini', nb2: 'gemini', omni: 'gemini', gemf: 'gemini', veo: 'google', flux: 'flux', gpti: 'openai', sora: 'openai', gpt6: 'openai',
  sd: 'bytedance', sdf: 'bytedance', wan: 'alibaba', kling: 'kling', sa: 'stability', suno: 'suno', el: 'elevenlabs',
  sonnet: 'anthropic', opus: 'anthropic', fable: 'anthropic', grok: 'grok' };
const logo = (name, cls = '') => `<img class="lg ${cls}" src="../../assets/logos/${name}.svg" alt="">`;

/* ---------- light skin ----------
   The real Quadcode AI desktop app is light. styles.css was drawn dark, so every rule that
   targets the app window (.app) is re-toned once at load: neutral greys are inverted,
   pale text and deep backgrounds in brand colours are re-toned for a white surface.
   The landing page around the app stays dark. light.css is written light-native and is not touched. */
(function lightSkin() {
  const sheet = [...document.styleSheets].find(s => /\/styles\.css/.test(s.href || ''));
  if (!sheet) return;
  const hsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    if (mx === mn) return [0, 0, l * 100];
    const d = mx - mn, s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
    const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s * 100, l * 100];
  };
  const tone = (r, g, b, a, kind) => {
    if (Math.max(r, g, b) - Math.min(r, g, b) < 14) {                 // neutral grey
      const v = Math.round((r + g + b) / 3);
      if (kind === 'shadow' && v < 90) return `rgba(20,20,28,${+(a * .22).toFixed(3)})`;
      if (a < 1 && v > 200) return `rgba(0,0,0,${a})`;                 // white veil -> black veil
      if (a < 1 && v < 40) return `rgba(20,20,28,${+(a * .35).toFixed(3)})`; // scrim
      const o = kind === 'text' ? Math.max(255 - v, 24) : Math.max(255 - v, 20);
      return a < 1 ? `rgba(${o},${o},${o},${a})` : `rgb(${o},${o},${o})`;
    }
    const [h, s, l] = hsl(r, g, b);                                    // brand colour
    if (kind === 'text' && l > 66) return `hsla(${h | 0},${Math.min(s, 75) | 0}%,30%,${a})`;
    if (kind === 'bg' && l < 20 && a > .5) return `hsla(${h | 0},${Math.min(s, 70) | 0}%,94%,${a})`;
    return null;
  };
  const conv = (val, kind) => val
    .replace(/#([0-9a-f]{3}|[0-9a-f]{6})\b/gi, (m, x) => { const f = x.length === 3 ? x.split('').map(c => c + c).join('') : x; return `rgb(${parseInt(f.slice(0, 2), 16)}, ${parseInt(f.slice(2, 4), 16)}, ${parseInt(f.slice(4, 6), 16)})`; })
    .replace(/rgba?\(([^)]+)\)/g, (m, inner) => { const p = inner.split(/[\s,\/]+/).filter(Boolean).map(parseFloat); return tone(p[0], p[1], p[2], p.length > 3 ? p[3] : 1, kind) || m; });
  const kindOf = n => /^(color|fill|stroke|caret-color|-webkit-text-fill-color|--(text|muted|dim|ink))$/.test(n) ? 'text' : /shadow/.test(n) ? 'shadow' : /^background|^--(bg|card|panel)/.test(n) ? 'bg' : 'line';
  const walk = rules => {
    for (const r of rules) {
      if (!r.style) { if (r.cssRules) walk(r.cssRules); continue; }
      if (!/\.app\b/.test(r.selectorText || '')) continue;
      const names = [...r.style];
      for (const n of names) {
        const v = r.style.getPropertyValue(n);
        if (!/#|rgb/.test(v)) continue;
        const nv = conv(v, kindOf(n));
        if (nv !== v) r.style.setProperty(n, nv, r.style.getPropertyPriority(n));
      }
    }
  };
  try { walk(sheet.cssRules); } catch (e) { console.warn('lightSkin', e); }
})();
Object.entries({
  caretUp: '<path d="m18 15-6-6-6 6"/>',
  rewind: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  winMin: '<path d="M5 12h14"/>',
  winMax: '<rect x="4" y="4" width="16" height="16" rx="1"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
}).forEach(([k, v]) => { if (!(k in ICONS)) ICONS[k] = v; });
const money = (n) => '$' + n.toLocaleString('en-US');

/* ---------- PROPOSALS (Higgsfield-aligned monetization mechanics, proposal status) ---------- */
const PROPOSALS = {
  notice: 'Proposal status: aligned with Higgsfield live funnel audit 23–24.09.2026',
  exitIntent: {
    discountPct: 62,
    initialTimerSec: 478, // 07:58
    stickyTimerSec: 478,  // 07:58 (synchronized single visitor window)
    plusMonthly: 22,      // dropped from $59 monthly (-62% OFF)
    ultraMonthly: 49,     // dropped from $129 monthly (-62% OFF)
    note: 'Replaces standard 30% — discounts never stack; honest timer persisted per account',
  },
  retentionWinBack: {
    discountPct: 25,
    months: 2,
    discountedPlusMonthly: 44.25, // $59 * 0.75 = $44.25/mo
    savingsOver2Months: 29.50,    // ($59 - $44.25) * 2 = $29.50
    lossInMoney: 35.30, // calculated from $59 / 1,200 cr = $0.049167 * 718 cr = $35.30
    lossCredits: 718,
    lossGenerations: 359,
    reminderNoticeDays: 7,
    legalNotice: 'Strict 1-screen retention compliance (CA § 17602, BGB § 312k); optional post-cancel survey',
  },
  referralInApp: {
    friendDiscountPct: 60,
    friendWindowHours: 24,
    rewardModel: 'Seedance 2.5',
    tiers: [
      { friends: 1, passDays: 3, label: '3 days Unlimited Seedance 2.5' },
      { friends: 2, passDays: 5, label: '5 days Unlimited Seedance 2.5' },
      { friends: 3, passDays: 7, label: '7 days Unlimited Seedance 2.5 (Max)' },
    ],
  },
  affiliateCreator: {
    cashCommissionPct: 25,
    durationMonths: 12,
    audienceDiscountPct: 50,
    audienceWindowHours: 3,
    portalUrl: '../affiliate/index.html',
    note: 'Paid in real cash, not platform balance',
  },
  autoRefill: {
    rateCreditsPerDollar: 18,
    tiers: [
      { usd: 20, cr: 360 },
      { usd: 40, cr: 720 },
      { usd: 90, cr: 1620 },
      { usd: 150, cr: 2700 },
      { usd: 300, cr: 5400 },
    ],
    spendRule: 'Plan credits spend first; packs and auto-refill spend by earliest expiration date (90 days)',
    preChargeNotice: 'Email reminder before each charge',
  },
};

function getPersistentTimer(key, defaultSeconds) {
  try {
    const item = localStorage.getItem('qc_timer_' + key);
    const now = Math.floor(Date.now() / 1000);
    if (item) {
      const { expiry } = JSON.parse(item);
      const rem = expiry - now;
      if (rem > 0) return rem;
      const expiryReset = now + defaultSeconds;
      localStorage.setItem('qc_timer_' + key, JSON.stringify({ expiry: expiryReset }));
      return defaultSeconds;
    }
    const expiry = now + defaultSeconds;
    localStorage.setItem('qc_timer_' + key, JSON.stringify({ expiry }));
    return defaultSeconds;
  } catch (e) {
    return defaultSeconds;
  }
}
function formatTimer(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ---------- mockup pieces ---------- */
const AGENTS = { many: ['M', 'Many', 'Team Leader'], cody: ['C', 'Cody', 'Developer'], lumi: ['L', 'Lumi', 'Designer'], sonic: ['S', 'Sonic', 'Motion Designer'] };
const av = (id, cls = '') => `<span class="av ${id} ${cls}">${AGENTS[id][0]}</span>`;

function meter(o) {
  const pct = Math.max(0, Math.min(1, o.balance / o.max)), r = 7, c = 2 * Math.PI * r;
  const cls = o.balance <= 0 ? 'zero' : pct < 0.2 ? 'low' : '';
  const color = cls === 'zero' ? '#f87171' : cls === 'low' ? '#fbbf24' : '#F18024';
  return `<span class="meter ${cls}" title="Credits"><svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="${r}" stroke="rgba(255,255,255,.12)" stroke-width="2.5" fill="none"/><circle cx="9" cy="9" r="${r}" stroke="${color}" stroke-width="2.5" fill="none" stroke-dasharray="${(c * pct).toFixed(1)} ${c.toFixed(1)}" stroke-linecap="round"/></svg>${o.balance} cr</span>`;
}

function titleBar(o) {
  const plan = o.plan || 'free';
  // real Quadcode AI title bar (Windows): logo + project on the left, version in the middle, icon tools and window controls on the right
  return `<div class="tb">
    <span class="tb-logo">${QC_MARK}</span>${svg('down', 10)}
    <span class="proj">${o.project || 'sneaker-launch'} ${svg('down', 11)}</span>
    <span class="tbi">${svg('plus', 13)}</span><span class="tbi">${svg('menu', 13)}</span>
    <span class="ver">Quadcode AI v0.17441</span>
    <div class="tb-right">
      <span class="tbi">${svg('play', 13)}</span><span class="tbi">${svg('rocket', 13)}</span><span class="tbi">${svg('git', 13)}</span><span class="tbi" data-a="settings">${svg('settings', 13)}</span>
      <span class="toggles"><i></i><i class="on"></i><i class="on"></i><i></i></span>
      ${meter(o)}
      ${plan === 'free' || plan === 'starter' ? `<span class="upg">Upgrade <span class="pct">-30%</span></span>` : `<span class="planpill ${plan}">${PLANS[plan].n}</span>`}
      <span class="win"><i>${svg('winMin', 12)}</i><i>${svg('winMax', 11)}</i><i>${svg('x', 12)}</i></span>
    </div>
  </div>`;
}

function chip(id, have, opts = {}) {
  const m = MODELS[id]; const locked = PLAN_RANK[m.plan] > PLAN_RANK[have];
  return `<span class="chip ${locked ? 'locked' : ''} ${opts.on ? 'on' : ''}"${opts.a ? ` data-a="${opts.a}"` : ''}>${mark(id)}<span class="cn">${m.n}</span>${opts.res ? `<small>${opts.res}</small>` : ''}${locked ? planBadge(m.plan, have) : opts.free ? '<span class="pb free">Free</span>' : ''}${svg('down', 10)}</span>`;
}

function composer(o) {
  const have = o.plan || 'free';
  const chips = (o.chips || ['nb', 'sa', 'sd']).map(id => chip(id, have, { on: o.chipOn === id, a: 'media' })).join('');
  // Unlimited switch beside the selected media model (scene 9) — mirrors Higgsfield's composer toggle
  const unl = o.unl ? `<span class="chip unl ${o.unl.on ? 'on' : ''}">${svg('infinity', 11)}Unlimited<i class="sw"></i></span>` : '';
  const send = o.send || { label: 'Send', cost: '~47 cr' };
  // real composer: agent + media pickers on top, prompt, then + / rewind / Explore / LLM / mic / send
  const ag = AGENTS[o.agent || 'many'];
  return `<div class="composer">
    ${o.pop || ''}
    <div class="c-top">
      <span class="agent-chip">${av(o.agent || 'many')}<span class="an"><b>${ag[1]}</b><small>${ag[2]}</small></span>${svg('caretUp', 10)}</span>
      <span class="c-media">${chips}${unl}<span class="ico-b">${svg('users', 13)}</span></span>
    </div>
    <div class="text">${o.prompt || 'Message Many…'}</div>
    <div class="crow">
      <span class="ico-b">${svg('plus', 13)}</span><span class="ico-b">${svg('rewind', 13)}</span>
      <span class="tgl">Explore<i class="sw"></i></span>
      ${chip(o.llm || 'sonnet', have, { on: o.llmOpen, a: 'llm' })}
      <span class="sp"></span>
      <span class="ico-b sq">${svg('mic', 13)}</span>
      <span class="send ${send.state || ''}">${send.cost ? `<span class="c">${send.cost}</span>` : ''}${send.label}${svg('send', 11)}</span>
    </div>
  </div>`;
}

function msg(m) {
  if (m.who === 'user') return `<div class="msg user"><div class="bub">${m.text}</div></div>`;
  const a = AGENTS[m.who];
  return `<div class="msg">${av(m.who)}<div class="bub"><div class="who"><b>${a[1]}</b> ${a[2]} <span class="mb">${m.model || 'claude-sonnet-5'}</span><span class="ts">${m.ts || '14:02'}</span></div>${m.text}${m.extra || ''}</div></div>`;
}

const RESULTS = (blurLast) => `<div class="results">
  <div class="res"><img src="${IMG(2)}" alt=""><span class="tag">kf-01 · 2 cr</span></div>
  <div class="res"><img src="${IMG(4)}" alt=""><span class="tag">kf-02 · 2 cr</span></div>
  <div class="res ${blurLast ? 'blur' : ''}"><img src="${IMG(1)}" alt=""><span class="tag">${blurLast ? '4K · Plus' : 'kf-03 · 2 cr'}</span>${blurLast ? `<span class="lock"><span>${svg('lock', 13)}</span></span>` : ''}</div>
</div>`;

const SUBCARD = (o) => `<div class="sub ${o.state || ''}">
  <div class="sh">${av(o.agent)}<b>${AGENTS[o.agent][1]}:</b> ${o.task} <span class="meta">${o.meta}</span></div>
  ${o.items ? `<ul>${o.items.map(i => `<li class="${i[0]}">${svg(i[0] === 'done' ? 'check' : i[0] === 'wait' ? 'clock' : 'lock', 10, 2.6)}${i[1]}</li>`).join('')}</ul>` : ''}
  ${o.body || ''}
</div>`;

function chat(o) {
  const msgs = o.messages || [
    { who: 'user', text: 'Make a 15-second launch film for the AeroKnit sneaker: orange key light, slow-motion dust, anamorphic flares. Three key frames first, then animate the hero shot.' },
    { who: 'many', text: 'Plan: Lumi builds three key frames with Nanobanana Pro, Sonic animates the hero frame with Seedance 2.5 (1080p, 5 s), I cut the sequence and hand you the MP4.', extra:
      SUBCARD({ agent: 'lumi', task: 'Key frames', meta: '12 actions · 01:48', items: [['done', 'Brief → 3 prompts'], ['done', 'Nanobanana Pro · 3 images · 6 cr']], body: RESULTS(o.blurLast) }) +
      (o.sonicCard === false ? '' : SUBCARD(o.sonicCard || { agent: 'sonic', task: 'Hero shot', meta: 'Seedance 2.5 · 1080p · 5 s', state: 'wait', items: [['wait', 'Waiting to start · 45 cr']] })) },
  ];
  return `<div class="chat">${msgs.map(msg).join('')}</div>`;
}

// Settings → My Subscription (scene 10). Retention screen, not a billing table:
// renewal first, checklist with exactly one cross, credits, auto-refill, value recap,
// active pass, unused features, Rewind. Pause / switch / cancel stay visible at the bottom.
function subscriptionPanel(o = {}) {
  const check = (t, no, extra) => `<li class="${no ? 'no' : ''}">${svg(no ? 'x' : 'check', 10, 3)}${t}${extra ? `<small>${extra}</small>` : ''}</li>`;
  const on = t => `<span class="on">${svg('check', 9, 3)}${t}</span>`;
  const off = t => `<span>${t} <i>Try</i></span>`;
  const isMonthly = o.planCycle === 'monthly';
  const left = o.balance !== undefined ? o.balance : 718;
  const max = o.max || 1200;
  const pct = Math.round((left / max) * 100);
  return `<div class="subpage">
    <div class="sp-head">
      <div>
        <div class="sh2">Settings <span>/ My Subscription</span></div>
        <div class="sp-plan"><span class="planpill plus">Plus</span><b>${isMonthly ? 'Monthly · $59 / mo' : 'Annual · $564 / yr'}</b><small>Renews Oct 22, 2026 · Visa ···· 4421</small></div>
      </div>
      <div style="display:flex;gap:6px">
        <span class="sp-btn" style="background:#fff;border:1px solid rgba(0,0,0,.2);color:#111;font-weight:600">Change Commitment</span>
        <span class="sp-cta">${svg('zap', 11)}Upgrade to Ultra · $99/mo</span>
      </div>
    </div>
    <ul class="sp-check">
      ${check('1,200 credits every month')}
      ${check('All image, video, audio models')}
      ${check('6 parallel sub-agents')}
      ${check('Credits roll over 1 month')}
      ${check('Opus 5.5 for agent turns')}
      ${check('7-day passes from $5')}
      ${check('Priority render queue')}
      ${check('Lowest cost per credit', true, 'Ultra 3.3¢')}
    </ul>
    <div class="sp-row">
      <div class="sp-l"><b>${left} of ${max.toLocaleString('en-US')} monthly credits left</b><small>Cycle ends Oct 22 · leftovers roll over 1 month</small><div class="bar2"><i style="width:${pct}%"></i></div></div>
      <div class="sp-subcr"><b>Auto-refill credits: 0</b><small>Disabled · triggers under 10%</small></div>
      <span class="sp-btn g">Buy credits</span>
    </div>
    <div class="sp-row hi">
      <span class="ico">${svg('refresh', 12)}</span>
      <div class="sp-l"><b>Auto-refill is off</b><small>Top up 360–5,400 credits ($1 = 18 cr) automatically at 10% balance. Order: plan first, then earliest expiry.</small></div>
      <span class="sp-btn">Set-up &amp; Enable</span>
    </div>
    <div class="sp-stats">
      <div><b>41</b><span>key frames</span></div>
      <div><b>3</b><span>films shipped</span></div>
      <div><b>1,140</b><span>pass renders</span></div>
      <div><b class="g">$104</b><span>saved vs credits</span></div>
    </div>
    <div class="sp-row">
      ${mark('nb', 'lg')}
      <div class="sp-l"><b>Nanobanana Pro · 7-day unlimited</b><small>Ends Oct 14 · 1,140 renders so far · $0.02 each</small></div>
      <span class="pb free">Active</span>
    </div>
    <div class="sp-sect"><span>Your plan includes</span><b>6 / 15 used</b></div>
    <div class="sp-chips">
      ${on('Image')}${on('Video')}${on('Audio')}${on('Sub-agents')}${on('Deploy')}${on('Git')}
      ${off('4K upscale')}${off('Voice')}${off('Web agent')}${off('Extend video')}
    </div>
    <div class="sp-rewind">
      <div class="thumbs"><img src="${IMG(2)}" alt=""><img src="${IMG(4)}" alt=""><img src="${IMG(6)}" alt=""></div>
      <div class="sp-l"><div class="k">Your October</div><b>23 generations — and the film is not out yet</b><small>Top model Nanobanana Pro · top agent Lumi</small></div>
      <span class="sp-btn g">Share</span>
    </div>
    <div class="sp-foot">Plan settings: <span>Switch to monthly</span> · <span>Pause</span> · <span>Cancel plan</span><em>Access stays until Oct 22 either way. No ticket, no maze.</em></div>
  </div>`;
}

function centerPanel(o) {
  const tabs = o.centerTabs || ['Actions', 'File editors', 'Meta editors', 'Web browsers', 'App Builder'];
  let body = '';
  if (o.center === 'subscription') {
    body = subscriptionPanel(o);
  } else if (o.center === 'usage') {
    body = usagePanel();
  } else if (o.center === 'preview') {
    body = `<div class="preview"><img src="${IMG(1)}" alt=""><div class="pv-bar"><span>keyframe-03.png · 2048×2732</span><span class="pv-act">${svg('image', 11)}Upscale 4K <span class="pb plus">Plus</span></span></div></div>`;
  } else if (o.center === 'billing') {
    body = `<div class="settings">
      <div class="sh2">Settings <span>/ My Subscription</span></div>
      <div class="brow"><div><b>Plus · Monthly ($59/mo)</b><small>1,200 credits / mo · renews Oct 22</small></div><span class="tag2">Active</span></div>
      <div class="brow"><div><b>Used this cycle</b><small>482 / 1,200 credits</small></div><div class="bar2"><i style="width:40%"></i></div></div>
      <div class="brow"><div><b>Payment</b><small>Visa ···· 4421</small></div><span class="lnk">Change</span></div>
      <div class="brow"><div><b>Plan</b><small>Switch, pause or cancel</small></div><span class="lnk red">Cancel plan</span></div>
    </div>`;
  } else {
    body = `<div class="actions">
      <div class="subreq"><b>Sub-agent Requests</b><span class="mchip">${logo('gemini')} gemini-3.8-flash ${svg('down', 9)}</span><span class="mchip off">${logo('claude')} Claude Code disabled</span><span class="sp"></span>${svg('plus', 12)}${svg('trash', 12)}</div>
      <div class="acard done">${av('lumi')}<div><b>Lumi</b> · Key frames (3) <small>Nanobanana Pro · 6 cr · 01:48</small><div class="thumbs"><img src="${IMG(2)}" alt=""><img src="${IMG(4)}" alt=""><img src="${IMG(1)}" alt=""></div></div><span class="st ok">${svg('check', 10, 3)}</span></div>
      <div class="acard ${o.sonicState || 'wait'}">${av('sonic')}<div><b>Sonic</b> · Hero shot <small>Seedance 2.5 · 1080p · 5 s · 45 cr</small>${o.sonicNote ? `<div class="note">${o.sonicNote}</div>` : ''}</div><span class="st">${svg(o.sonicState === 'lock' ? 'lock' : 'clock', 10, 2.6)}</span></div>
      <div class="acard idle">${av('many')}<div><b>Many</b> · Assemble cut <small>waiting for hero shot</small></div><span class="st">${svg('clock', 10, 2.6)}</span></div>
    </div>`;
  }
  return `<div class="center"><div class="ptabs">${tabs.map((t, i) => `<span class="${i === (o.centerTab || 0) ? 'on' : ''}">${t}</span>`).join('')}</div>${body}</div>`;
}

function rightPanel() {
  return `<div class="right"><div class="ptabs"><span class="on">Files</span><span>Meta</span><span>Debug</span></div>
    <div class="files">
      <div class="fi dir">${svg('folder', 11)}sneaker-launch</div>
      <div class="fi dir in">${svg('folder', 11)}assets</div>
      <div class="fi in2">${svg('image', 11)}keyframe-01.png</div>
      <div class="fi in2">${svg('image', 11)}keyframe-02.png</div>
      <div class="fi in2">${svg('image', 11)}keyframe-03.png</div>
      <div class="fi dir in">${svg('folder', 11)}renders</div>
      <div class="fi in2 dim">${svg('video', 11)}hero-shot.mp4</div>
      <div class="fi dir in">${svg('folder', 11)}meta</div>
      <div class="fi in2">${svg('file', 11)}launch-film.md</div>
      <div class="fi in">${svg('file', 11)}brief.md</div>
    </div></div>`;
}

function statusBar(o) {
  return `<div class="sb">
    <span class="st"><i class="dot ${o.dot || 'busy'}"></i>${o.status || 'Sonic: waiting for credits…'}</span>
    <span>[${o.secs || 42}.29 s]: job</span><span class="jb"><i style="width:${Math.min(100, (o.secs || 42) / 2)}%"></i><em>${o.secs || 42}s</em></span><span class="ok">${svg('check', 9, 3)} File Sync Done: brief.md</span>
    <span class="sb-right"><span>Contact us ${svg('caretUp', 9)}</span><span class="me ${o.meOpen ? 'on' : ''}"><span class="avatar">E</span>Emil ${svg('caretUp', 9)}</span><span class="on"><i class="bar"></i>online ${svg('caretUp', 9)}</span></span>
  </div>`;
}

function frame(o = {}) {
  o = Object.assign({ balance: 38, max: 50, plan: 'free' }, o);
  return `<div class="app" style="${o.h ? `--h:${o.h}px` : ''}">
    ${titleBar(o)}
    <div class="body ${o.layout === 'wide' ? 'wide' : ''}">
      <div class="left">
        <div class="ptabs"><span class="on">${svg('bot', 10)}Chat</span><span>${svg('history', 10)}History</span><span>${svg('terminal', 10)}Console</span><span>${svg('search', 10)}Find in files</span></div>
        ${o.banner || ''}
        ${chat(o)}
        ${composer(o)}
      </div>
      ${centerPanel(o)}
    </div>
    ${statusBar(o)}
    ${o.toast || ''}
    ${o.menu || ''}
    ${o.overlay ? `<div class="ov ${o.ovPos === 'right' ? 'right' : ''}">${o.overlay}</div>` : ''}
    ${(o.hotspots || []).map(h => `<button class="hs" data-hs="${h.n}" style="left:${h.x}%;top:${h.y}%">${h.n}</button>`).join('')}
  </div>`;
}

/* ---------- modal building blocks ---------- */
/* ---------- 1:1 with Higgsfield: store modal (3 tabs), Boost speed, Usage ---------- */
const num = v => v.toLocaleString('en-US');
const usd2 = v => { const r = Math.round(v * 100) / 100; return '$' + (Number.isInteger(r) ? r.toLocaleString('en-US') : r.toFixed(2)); };
const packOff = p => Math.round((1 - p.usd / (p.cr * PACK_LIST_RATE)) * 100);
const perDollar = p => { const v = p.cr / p.usd; return Number.isInteger(v) ? v : v.toFixed(1); };
const outcomes = cr => `${num(Math.floor(cr / MODELS.nb.cost))} Nanobanana Pro images or ${num(Math.floor(cr / MODELS.sd.cost))} Seedance 2.5 videos`;

// Tab "Upgrade Plan". Logged-in Higgsfield hides tiers below the current one (no downgrade path here).
function storeTabPlans(plan) {
  const order = ['starter', 'plus', 'ultra'];
  const from = Math.max(0, order.indexOf(plan));
  return `<div class="st-plans">${order.slice(from).map(k => {
    const P = PLANS[k], cur = k === plan, top = k === 'ultra';
    return `<div class="pc ${top ? 'hi' : ''}">
      <div class="h"><b>${P.n}</b>${cur ? '<span class="tag">Current plan</span>' : top ? '<span class="tag hot">Best value</span>' : ''}</div>
      ${top ? '<div class="seg3"><span class="on">3,000</span><span>6,000</span><span>9,000</span></div>' : ''}
      <div class="big">${money(P.a)}<small>/mo</small><s>${money(P.m)}</s></div>
      <div class="s">${num(P.credits)} credits = ${outcomes(P.credits)}</div>
      <div class="sv">Save ${money((P.m - P.a) * 12)} compared to monthly</div>
      <div class="b ${cur ? 'g' : 'p'}">${cur ? 'Change commitment' : 'Upgrade plan'}</div>
    </div>`;
  }).join('')}</div>`;
}

// Tab "Top-up Credits": auto-refill banner, 7 packs with strike-through, "$1 = N credits", outcomes, 90-day validity.
function storeTabTopup() {
  const packsOrdered = [
    { cr: 5000, usd: 250, was: 425, off: 41, rate: 20, lab: 'Best Value', upTo: 25000, isSlider: true },
    { cr: 4000, usd: 205, was: 340, off: 40, rate: 20, lab: 'Most Popular', hi: true },
    { cr: 2000, usd: 105, was: 170, off: 38, rate: 19 },
    { cr: 1000, usd: 56, was: 85, off: 35, rate: 18 },
    { cr: 500, usd: 29, was: 42.5, off: 31, rate: 17 },
    { cr: 200, usd: 12, was: 17, off: 28, rate: 17 },
    { cr: 100, usd: 6, was: 8.5, off: 29, rate: 17 }
  ];

  return `
    <div class="refill-banner">
      <span class="refill-ico">${svg('refresh', 14)}</span>
      <span class="refill-text"><b>Enable credits auto-refill &amp; keep your workflow uninterrupted</b></span>
      <button class="btn-refill-setup">Set up</button>
    </div>
    <div class="topup-strips-list">
      ${packsOrdered.map(p => `
        <div class="topup-strip ${p.hi ? 'hi' : ''}">
          <div class="strip-left">
            <div class="strip-head">
              <span class="strip-credits">${num(p.cr)} credits</span>
              <span class="strip-rate">$1 = ${p.rate} credits</span>
              ${p.lab ? `<span class="strip-badge ${p.lab === 'Best Value' ? 'gold' : 'popular'}">${p.lab}</span>` : ''}
              <span class="strip-off">−${p.off}%</span>
            </div>
            <div class="strip-outcomes">
              <div>${svg('check', 11)} Up to ${num(Math.floor(p.cr / 2))} Nanobanana Pro (2K) image generations</div>
              <div>${svg('check', 11)} Up to ${num(Math.floor(p.cr / 45))} Seedance 2.5 (1080p) videos</div>
            </div>
            ${p.isSlider ? `
              <div class="strip-slider-ticks">
                <span>5k</span><span>7k</span><span>9k</span><span>11k</span><span>13k</span><span>15k</span><span>17k</span><span>19k</span><span>21k</span><span>23k</span><span>25k</span>
              </div>
            ` : ''}
          </div>
          <div class="strip-center">
            <s class="strip-was">$${p.was.toFixed(p.was % 1 ? 1 : 0)}</s>
            <b class="strip-price">$${p.usd}</b>
          </div>
          <div class="strip-right">
            <button class="btn-strip-purchase ${p.hi ? 'hi' : ''}">Purchase</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="legal">Extra packs sold only on top of a plan (Free accounts upgrade first) · valid ${PACK_VALID_DAYS} days · order: plan first, then earliest expiry</div>`;
}

// Tab "Unlimited Models": large model posters (HF screen 08) + hero banner
function storeTabUnlimited() {
  return `<div class="st-unl-container">
    <div class="unl-hero-banner" style="background-image: linear-gradient(90deg, rgba(12,12,16,.92) 0%, rgba(12,12,16,.75) 48%, rgba(12,12,16,.3) 100%), url('../../assets/pricing/case-1.jpg');">
      <div class="unl-hero-content">
        <div class="unl-hero-eyebrow">UNLIMITED ACCESS</div>
        <h2 class="unl-hero-title">SEEDANCE 2.5</h2>
        <p class="unl-hero-desc">World's best video model available on Quadcode AI</p>
        <div class="unl-hero-badges">
          <span class="unl-pill">${svg('video', 12)} 1080p · 4K</span>
          <span class="unl-pill">${svg('clock', 12)} Up to 30s clips</span>
          <span class="unl-pill hl">7-day pass · $65 <s>$105</s> <small>−38%</small></span>
        </div>
        <div class="unl-hero-actions">
          <button class="btn-hero-pass">Get 7-day pass · $65</button>
          <span class="unl-hero-link">Browse all models</span>
        </div>
      </div>
    </div>

    <div class="unl-cards-grid">
      <div class="unl-poster-card">
        <div class="unl-card-art" style="background-image: linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.85) 100%), url('../../assets/content/c1.jpg');">
          <div class="unl-card-top">
            <span class="unl-qbadge">2K · 4K</span>
          </div>
          <div class="unl-card-bottom">
            <div class="unl-card-name"><small>UNLIMITED</small><b>NANO BANANA PRO</b></div>
          </div>
        </div>
        <div class="unl-card-foot">
          <div class="unl-dur-select">
            <span class="unl-dchip">1-day $5</span>
            <span class="unl-dchip on">7-day $23 <s>$35</s></span>
          </div>
          <button class="btn-card-pass">Get 7-day pass · $23</button>
        </div>
      </div>

      <div class="unl-poster-card">
        <div class="unl-card-art" style="background-image: linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.85) 100%), url('../../assets/content/c5.jpg');">
          <div class="unl-card-top">
            <span class="unl-qbadge">1080p</span>
          </div>
          <div class="unl-card-bottom">
            <div class="unl-card-name"><small>UNLIMITED</small><b>KLING 3.0</b></div>
          </div>
        </div>
        <div class="unl-card-foot">
          <div class="unl-dur-select">
            <span class="unl-dchip">1-day $7</span>
            <span class="unl-dchip on">7-day $29 <s>$45</s></span>
          </div>
          <button class="btn-card-pass">Get 7-day pass · $29</button>
        </div>
      </div>

      <div class="unl-poster-card">
        <div class="unl-card-art" style="background-image: linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.85) 100%), url('../../assets/content/c4.jpg');">
          <div class="unl-card-top">
            <span class="unl-qbadge">720p · 1080p</span>
          </div>
          <div class="unl-card-bottom">
            <div class="unl-card-name"><small>UNLIMITED</small><b>WAN 2.7</b></div>
          </div>
        </div>
        <div class="unl-card-foot">
          <div class="unl-dur-select">
            <span class="unl-dchip">1-day $6</span>
            <span class="unl-dchip on">7-day $29 <s>$42</s></span>
          </div>
          <button class="btn-card-pass">Get 7-day pass · $29</button>
        </div>
      </div>

      <div class="unl-poster-card all-access">
        <div class="unl-card-art" style="background-image: linear-gradient(180deg, rgba(16,16,24,.4) 0%, rgba(10,10,16,.9) 100%), url('../../assets/pricing/case-3.jpg');">
          <div class="unl-card-top">
            <span class="unl-qbadge gold">7 Models</span>
          </div>
          <div class="unl-card-bottom">
            <div class="unl-card-name all"><small>ACCESS TO</small><b>ALL UNLIMITED MODELS</b></div>
          </div>
        </div>
        <div class="unl-card-foot">
          <div class="unl-all-desc">Included free for 7 days on Plus and Ultra plans</div>
          <button class="btn-card-pass hi">Unlock on Plus · $47/mo</button>
        </div>
      </div>
    </div>

    <div class="unl-store-footer">
      <div class="unl-filters-title">ALL UNLIMITED OFFERS · Filter by model type:</div>
      <div class="unl-filters">
        <span class="unl-fchip on">All models</span>
        <span class="unl-fchip">${svg('video', 11)} Video</span>
        <span class="unl-fchip">${svg('image', 11)} Image</span>
        <span class="unl-fchip">${logo('bytedance', 'f-lg')} ByteDance</span>
        <span class="unl-fchip">${logo('kling', 'f-lg')} Kling</span>
        <span class="unl-fchip">${logo('alibaba', 'f-lg')} Alibaba</span>
      </div>
    </div>
  </div>
  <div class="legal">Passes run in a shared queue, up to 2 jobs at once · 1, 3, and 7-day durations available · standard quality.</div>`;
}

function storeModal({ tab = 'topup', plan = 'plus', ctx = '' } = {}) {
  const tabs = [
    { k: 'topup', t: 'Top-up Credits', i: 'coins' },
    { k: 'unl', t: 'Unlimited Models', i: 'infinity' },
    { k: 'plan', t: 'Upgrade Plan', i: 'zap' },
  ];
  const tabSpans = tabs.map(tb => `<span class="${tb.k === tab ? 'on' : ''}" data-tab="${tb.k}">${svg(tb.i, 12)}${tb.t}</span>`).join('');
  return `<div class="md store">${X}
    <div class="st-h"><h3>Upgrade plan or buy credits</h3><p>Choose a higher plan for increased limits, or add extra credits</p></div>
    ${ctx}
    <div class="st-tabs">${tabSpans}</div>
    <div class="st-tab-pane" id="st-pane-topup" style="${tab === 'topup' ? '' : 'display:none'}">${storeTabTopup()}</div>
    <div class="st-tab-pane" id="st-pane-unl" style="${tab === 'unl' ? '' : 'display:none'}">${storeTabUnlimited()}</div>
    <div class="st-tab-pane" id="st-pane-plan" style="${tab === 'plan' ? '' : 'display:none'}">${storeTabPlans(plan)}</div>
    <div class="escape-subtle">Or run this turn with <a href="#">Gemini Omni Flash (1 cr)</a> — prompt and key frames preserved</div>
  </div>`;
}

// Boost speed: concurrency sold separately from plans (Higgsfield: +4…+16, 500–3,000 boost credits, "Buy for €97 €134").
function boostModal() {
  const media = Object.keys(MODELS).filter(k => MODELS[k].type !== 'llm');
  return `<div class="md boost">${X}
    <div class="kick">${svg('zap', 12)} Boost speed</div>
    <h3>Generate up to 3× faster with more parallel jobs</h3>
    <p>Buy boost credits with additional concurrency and run more agent jobs in parallel.</p>
    <div class="conc3">
      <div><b>0</b><span>Boost credits</span></div>
      <div><b>6 → 14</b><span>Video jobs at once (+8)</span></div>
      <div><b>8 → 16</b><span>Image jobs at once (+8)</span></div>
    </div>
    <div class="applied"><span>Applied to all ${media.length} media models</span>${media.slice(0, 9).map(k => mark(k)).join('')}</div>
    <div class="lbl">Add parallel jobs</div>
    <div class="seg3">${['+4', '+8', '+12', '+16'].map(v => `<span class="${v === '+8' ? 'on' : ''}">${v}</span>`).join('')}</div>
    <div class="lbl">Add boost credits</div>
    <div class="seg3">${[500, 1000, 1500, 2000, 2500, 3000].map(v => `<span class="${v === 1000 ? 'on' : ''}">${num(v)}</span>`).join('')}</div>
    <div class="cta"><span class="p">Buy for $97 <s>$134</s></span><span class="g">How it works</span></div>
    <div class="legal">Boost credits are spent only on jobs above your plan limit. Jobs within the limit keep using plan credits.</div>
  </div>`;
}

// Settings → Usage: spend in money per model (Higgsfield "Spend overview"), plus our run-out forecast.
function usagePanel() {
  const rate = PLANS.plus.a / PLANS.plus.credits;            // $ per credit at the Plus annual price
  const rows = [
    { m: 'sd', cr: 675, g: 15 }, { m: 'nb', cr: 230, g: 115 },
    { m: 'sonnet', cr: 145, g: 0, t: 'Agent turns' }, { m: 'suno', cr: 42, g: 7 },
  ];
  const spent = rows.reduce((s, r) => s + r.cr, 0);
  const gens = rows.reduce((s, r) => s + r.g, 0);
  const pct = r => Math.round(r.cr / spent * 100);
  const hist = [['sd', 45, 'Oct 7, 14:02'], ['nb', 2, 'Oct 7, 13:57'], ['nb', 2, 'Oct 7, 13:56'], ['suno', 6, 'Oct 7, 11:20']];
  return `<div class="settings usage">
    <div class="sh2">Settings <span>/ Usage</span></div>
    <div class="u-h">Spend overview <span>Sep 22 – Oct 7 · this cycle</span></div>
    <div class="u-kpi">
      <div><b>${money(Math.round(spent * rate * 100) / 100)}</b><span>Total cost</span></div>
      <div><b>${num(spent)}</b><span>Credits spent</span></div>
      <div><b>4</b><span>Features used</span></div>
      <div><b>${gens}</b><span>Total generations</span></div>
    </div>
    <div class="u-bar">${rows.map(r => `<i style="width:${pct(r)}%;background:${MODELS[r.m].c}"></i>`).join('')}</div>
    <div class="u-leg">${rows.map(r => `<span>${mark(r.m)}${r.t || MODELS[r.m].n} <b>${pct(r)}%</b></span>`).join('')}</div>
    <div class="u-fc">${svg('clock', 13)}<span>At this pace your 108 credits run out in <b>~2 days</b>, 14 days before renewal.</span><span class="b p">Upgrade to Ultra · $99/mo</span><span class="b g">Top up</span></div>
    <div class="u-row">${svg('refresh', 13)}<span>Credits auto-refill <em>Disabled</em></span><span class="b g">Set up &amp; enable</span></div>
    <div class="u-row">${svg('zap', 13)}<span>Concurrency boost · all models <em>+4 / +8 / +12 / +16 · none active</em></span><span class="b g">Get</span></div>
    <div class="u-h">Usage history</div>
    <div class="u-hist">${hist.map(([m, c, d]) => `<div>${mark(m)}<span>${MODELS[m].n}<em>${d}</em></span><b>−${c} credits</b></div>`).join('')}</div>
  </div>`;
}

const X = `<span class="x">${svg('x', 12)}</span>`;
const opt = (o) => `<div class="opt ${o.hi ? 'hi' : ''}">${o.mark ? mark(o.mark, 'lg') : `<span class="ico">${svg(o.icon || 'coins', 16)}</span>`}<div><div class="t">${o.t}${o.b ? `<span class="b ${o.bc || ''}">${o.b}</span>` : ''}</div><div class="s">${o.s}</div></div><div class="pr">${o.was ? `<s>${o.was}</s>` : ''}${o.pr}${o.small ? `<small>${o.small}</small>` : ''}</div></div>`;
const planCard = (id, opts = {}) => { const p = PLANS[id]; const price = opts.price ?? p.a; return `<div class="plancard ${opts.hi ? 'hi' : ''}"><div class="n">${p.n}${opts.b ? `<span class="b">${opts.b}</span>` : ''}</div><div class="pp">${opts.was ? `<s>$${opts.was}</s>` : ''}$${price}<small>/mo</small></div><div class="row"><span>${p.credits.toLocaleString('en-US')} credits / mo</span></div><ul>${(opts.li || []).map(l => `<li class="${l[0] ? '' : 'no'}">${svg(l[0] ? 'check' : 'x', 10, 3)}${l[1]}</li>`).join('')}</ul></div>`; };

/* ---------- SURFACES (map) ---------- */
const SURFACES = [
  { n: 1, x: 80.5, y: 3.4, a: '.tb .meter', t: 'Credit meter + Upgrade pill', s: 'Title bar, always visible. Ring turns amber under 20%, red at zero. Today the balance is hidden inside the profile popup.', when: 'always · replaces hidden balance' },
  { n: 2, x: 29, y: 85.5, a: '.composer [data-a="media"]', t: 'Media model chips', s: 'The three media pickers in the composer show the selected image / sound / video model, its cost and a plan badge when the model is above the user\'s tier.', when: 'on model select · gate by capability' },
  { n: 3, x: 6.5, y: 92.5, a: '.composer [data-a="llm"]', t: 'LLM picker', s: 'Existing picker gets plan badges per row: Sonnet and Gemini Flash on Free, Opus on Plus, Fable and GPT-6 on Ultra. Locked rows open the model-gate modal.', when: 'on LLM select' },
  { n: 4, x: 41.5, y: 92.5, a: '.composer .send', t: 'Send button with cost preview', s: 'Estimated credits for this turn, shown before the click. Turns grey with "Top up" when the balance can\'t cover it — the click opens the out-of-credits modal.', when: 'every turn · pre-flight' },
  { n: 5, x: 29, y: 14, a: '.inline', side: 'l', t: 'Inline banner above chat', s: 'The existing SubscriptionBannerWidget, rebuilt as a contextual one-liner: low balance, out of credits, unsubscribed after 3 days. Non-blocking, dismissable per day.', when: 'balance < 20% · day 3 · 402' },
  { n: 6, x: 44, y: 63, a: '.res.blur', t: 'Result gate in action cards', s: 'Premium variants of a finished result (4K, longer, upscaled) render blurred with a lock. The work is done — the user only decides whether to unlock.', when: 'after a successful generation' },
  { n: 7, x: 90.5, y: 97.2, a: '.sb .me', t: 'Profile popup as store', s: 'Status-bar profile popup grows from "Balance + Deposit" into balance bar, Top up, 7-day passes, Upgrade, Invite. The always-available entry point.', when: 'always · user-initiated' },
  { n: 8, x: 66, y: 56, t: 'Modal overlay', s: 'The single blocking surface. Adaptive: the first card depends on the model that triggered it. Always has an escape hatch (free alternative or "Not now").', when: 'model gate · out of credits · cancel · personal offer' },
  { n: 9, x: 79, y: 79.5, a: '.toast', t: 'Side card (toast)', s: 'Bottom-right of the center panel. Lifecycle offers with a real deadline: personal code, annual switch, win-back. One at a time, max one per day.', when: 'day 3 / 7 · renewal · churn risk' },
  { n: 10, x: 71.1, y: 3.4, a: '.tb [data-a="settings"]', side: 'l', t: 'Settings → My Subscription', s: 'The plan page as a retention screen: renewal date, checklist with one cross, credit bar, auto-refill, passes with "saved", unused features with a Try button. Pause, switch and cancel stay visible at the bottom.', when: 'always · 7 days before renewal · under 20% credits' },
];

/* ---------- SCENES ---------- */
const SCENES = [
  {
    id: 'model-gate', n: 1, title: 'Premium model selected on Free', surface: 8,
    lead: 'The user picks Seedance 2.5 for the hero shot while on the Free plan. The modal opens at the moment of intent — the prompt is written, the frames are ready.',
    spec: {
      Trigger: 'Media chip → model with <code>plan &gt; user.plan</code>',
      Fires: 'Immediately on selection, before any credits are spent. Once per model per session; the chip keeps its Plus badge afterwards.',
      Segment: 'Free · Starter (for Plus/Ultra models)',
      Offer: 'Card 1 = plan that unlocks the model (annual price, strike monthly). Card 2 = 7-day pass for that exact model. Card 3 = free alternative that runs now.',
      Escape: '"Run with Wan 2.7" — never a dead end; the prompt is kept.',
      Cap: 'Max 1 model-gate modal per 10 min; badge on chip stays as passive reminder.',
    },
    ev: '<b>+18% upgrades</b> when premium models are gated at model level with visible badges (Higgsfield "Plus only" rows; Midjourney/Runway model tiers).',
    kpi: ['Gate → checkout <b>≥ 12%</b>', 'Gate → free alt <b>≤ 40%</b>', 'Modal dismiss <b>&lt; 50%</b>'],
    frame: {
      plan: 'free', balance: 38, max: 50, chips: ['nb', 'sa', 'sd'], prompt: '<b>Animate keyframe-03 as the hero shot: slow-motion dust, anamorphic flare drift, 5 s.</b>',
      send: { label: 'Send', cost: '45 cr' }, sonicState: 'lock', sonicNote: 'Seedance 2.5 requires Plus', status: 'Sonic: waiting for model access',
      overlay: `<div class="md">${X}
        <div class="kick">${mark('sd')} Plus model · Seedance 2.5</div>
        <h3>Seedance 2.5 is a Plus model</h3>
        <p>Your shot is ready to run — <b>1080p · 5 s · 45 credits</b>. Choose how you want to unlock it.</p>
        <div class="opts">
          ${opt({ mark: 'sd', hi: true, t: 'Plus plan', b: 'Most popular', s: '1,200 credits / mo · every video model · 6 parallel jobs · 1-month rollover', pr: '$47', was: '$59', small: '/mo, billed annually' })}
          ${opt({ mark: 'sd', t: '7-day Seedance pass', s: 'Unlimited Seedance 2.5 · 1080p · shared queue · one-time', pr: '$65', small: 'one-time' })}
          ${opt({ mark: 'wan', t: 'Use Wan 2.7 instead', b: 'Free', bc: 'g', s: '720p · 13 credits · runs right now with your balance', pr: 'Free' })}
        </div>
        <div class="cta"><span class="p">Get Plus · $47/mo</span><span class="g">Run with Wan 2.7</span></div>
        <div class="legal">Cancel anytime in Settings → My Subscription. Your prompt and frames are kept either way.</div>
      </div>` },
  },
  {
    id: 'out-of-credits', n: 2, title: 'Out of credits in the middle of a job', surface: 8,
    lead: 'Sonic starts the hero shot; the balance covers 33 of 45 credits. Instead of a 402 error and a generic banner, the job pauses and the modal opens on Top-up Credits (7 tiers $6–$250, sold only on top of an active plan), with an Unlimited Models tab offering 1/3/7-day passes (7-day preselected) to finish the job without buying packs, and a subtle link to run on a cheap model.',
    spec: {
      Trigger: 'Pre-flight check fails: <code>cost &gt; balance</code> (also on HTTP 402)',
      Fires: 'At the moment the tool call is about to run. The sub-agent card switches to "paused", the job resumes automatically after checkout.',
      Segment: 'Paid plans open the store on Top-up Credits. Free opens the same modal on Upgrade Plan: packs are an add-on to a plan, as on Higgsfield ("...without changing your current subscription").',
      Offer: '1:1 Higgsfield store: Top-up Credits preselected (7 packs $6–$250 with struck list price 8.5¢/cr, $1 = N cr, 90 days validity, auto-refill banner) + Unlimited Models tab (1/3/7-day passes, 7-day preselected). Shortfall: 12 credits. Subtle link: run with Gemini Omni Flash (1 cr).',
      Escape: 'Unlimited Models tab or close / subtle link: run with cheap model (Gemini Omni Flash · 1 cr).',
      Cap: 'Blocking by nature; no timer. Pack discounts are list-price discounts, not countdowns.',
    },
    ev: '<b>Contextual paywalls convert ~6×</b> a generic upgrade prompt (12% vs 2%). Packs are sold only on top of a plan, so they cannot replace one: packs cost 5–6¢ per credit, Plus 3.9¢, Ultra 3.3¢. Higgsfield offers the Unlimited Models tab as a direct alternative to credit packs.',
    kpi: ['Modal → purchase <b>≥ 25%</b>', 'Auto-resume success <b>≥ 95%</b>', 'Pack ARPU <b>+$8</b>'],
    frame: {
      h: 800, plan: 'plus', balance: 33, max: 1200, chips: ['nb', 'sa', 'sd'], prompt: 'Animate keyframe-03 as the hero shot…',
      send: { label: 'Top up', cost: '45 cr', state: 'dis' }, sonicState: 'lock', sonicNote: 'Paused · 12 credits short · resumes after checkout', status: 'Sonic: paused — insufficient credits', dot: 'warn',
      overlay: storeModal({ tab: 'topup', plan: 'plus', ctx: `<div class="st-ctx">${av('sonic')}<span><b>Sonic's job is paused: 12 credits short.</b> Seedance 2.5 · 1080p · 5 s costs 45 credits, you have 33. It resumes after payment.</span></div>` }) },
  },
  {
    id: 'low-balance', n: 3, title: 'Low balance — inline, non-blocking rotating banner', surface: 5,
    lead: 'Under 20% of the monthly (or free) allowance the meter turns amber and a rotating yellow banner appears above the chat (1:1 with Higgsfield). Promotes a tier-above pass and auto-refill. No modal — the user is mid-work.',
    spec: {
      Trigger: '<code>balance / allowance &lt; 0.20</code>',
      Fires: 'On the first render after crossing the threshold. Dismissable; returns next day if still low. Meter stays amber.',
      Segment: 'All plans. Copy translates the balance into outcomes for the models the user actually uses.',
      Offer: 'Site-wide rotating banner: rotates tier-above pass (Unlimited Seedance 2.5 on Ultra with 30% OFF) and Auto-refill setup ($1 = 18 cr). Plus/Ultra also see "Upgrade credits" (3k/6k/9k selector).',
      Escape: 'Close. The banner never blocks the composer.',
      Cap: '1 impression per day per state; never stacks with a toast.',
    },
    ev: 'Usage-based prompts at <b>80% of quota</b> outperform time-based ones; auto-refill lifts pack repeat purchases <b>+20–30%</b> (Twilio/OpenAI patterns). Higgsfield uses the site-wide yellow bar to promote tier-above capabilities.',
    kpi: ['Banner → Top up <b>≥ 6%</b>', 'Auto-refill opt-in <b>≥ 15%</b>', 'Zero-balance sessions <b>−40%</b>'],
    frame: {
      plan: 'free', balance: 9, max: 50, chips: ['nb', 'sa', 'omni'], prompt: 'Now a second variant of keyframe-02 with a cooler rim light.',
      send: { label: 'Send', cost: '2 cr' }, sonicCard: false, sonicState: 'wait', status: 'Lumi: idle', dot: 'ok',
      banner: `<div class="inline rotating" id="scene3-rot-banner"><span class="ico">${svg('zap', 13)}</span><div class="rot-offer-wrap" style="flex:1;overflow:hidden"><div class="rot-offer active" data-idx="0"><span><b>9 credits left</b> · SPECIAL 30% OFF · Unlimited Seedance 2.5 on Ultra for 7 days. <a href="#" style="color:#f18024;font-weight:600;margin-left:4px">Get Unlimited Seedance 2.5</a> · or +10 free credits tomorrow at 09:00.</span></div><div class="rot-offer" data-idx="1" style="display:none"><span><b>Never pause a render</b> · Auto-refill at 10% balance ($1 = 18 cr, 360–5,400 cr). <a href="#" style="color:#f18024;font-weight:600;margin-left:4px">Set up &amp; Enable</a> · order: plan credits first.</span></div></div><span class="sp"><span class="mini">Top up</span><span class="mini g">Auto-refill</span></span></div>` },
  },
  {
    id: 'result-upsell', n: 4, title: 'After a great result — the aha moment', surface: 6,
    lead: 'Lumi delivers three key frames. The third is opened in the preview. The upsell is attached to the output the user already likes: 4K version blurred, "make it move" one click away.',
    spec: {
      Trigger: 'Successful generation + user opens / downloads / rates the result',
      Fires: 'Inside the action card and the preview tab — never as a modal. Blurred tile is a real 4K render kept for 24 h.',
      Segment: 'Free · Starter. Plus sees the same tile unlocked.',
      Offer: 'Model-adaptive: image result → "Upscale 4K · Plus" and "Animate with Seedance 2.5"; video result → "Extend to 15 s" and "Upscale to 4K (Topaz)".',
      Escape: 'Nothing to dismiss; the free result is fully usable.',
      Cap: 'Always on for premium variants; toast only on the first result of the day.',
    },
    ev: 'Paywalls after value delivery convert <b>2–3×</b> better than pre-value; blurred "ready" results use the endowment effect (Higgsfield sign-up wall after generation).',
    kpi: ['Tile → unlock <b>≥ 8%</b>', 'Toast → Plus <b>≥ 3%</b>', 'D1 retention <b>+5 pts</b>'],
    frame: {
      plan: 'free', balance: 32, max: 50, chips: ['nb', 'sa', 'omni'], blurLast: true, center: 'preview', centerTabs: ['Actions', 'Image Preview – keyframe-03.png', 'brief.md'], centerTab: 1,
      prompt: 'Love kf-03. Make it the hero.', send: { label: 'Send', cost: '~1 cr' }, sonicCard: false, status: 'Lumi: done · 3 files saved', dot: 'ok',
      toast: `<div class="toast"><span class="x">${svg('x', 11)}</span><div class="k">${mark('sd')} Make it move</div><h4>Animate keyframe-03 with Seedance 2.5</h4><p>Slow-motion dust, flare drift, 1080p · 5 s. Sonic has the prompt ready.</p><span class="mini">Animate · 45 cr <span class="pb plus" style="margin-left:6px">Plus</span></span></div>` },
  },
  {
    id: 'personal-offer', n: 5, title: 'Exit-intent 62% OFF & sticky countdown strip', surface: 8,
    lead: 'Higgsfield triggers a 62% OFF exit-intent overlay on /pricing with an active 07:58 countdown timer. When dismissed or applied, it collapses into a persistent 07:58 sticky top strip (synchronized single countdown window per visitor) that drops Plus to $22/mo (-62% OFF) and Ultra to $49/mo (-62% OFF). Discounts do NOT stack (replaces standard 30% promo). Timers are persisted per account and never reset on refresh.',
    spec: {
      Trigger: 'Exit-intent on /pricing (mouse leaves viewport) or Day 3 drop-off',
      Fires: 'Modal overlay with 07:58 timer. On dismiss or claim, collapses to persistent sticky top strip (synchronized 07:58 timer). Persisted in localStorage so reloading never gives free time.',
      Segment: 'Unsubscribed visitors & Free accounts',
      Offer: '62% OFF discount applied. Plus drops to $22/mo (was $59, 62% OFF); Ultra drops to $49/mo (was $129, 62% OFF). Replaces standard 30% offer (no stacking).',
      Escape: 'Close modal → drops to sticky top strip until timer reaches 00:00, then disappears completely.',
      Cap: 'Honest countdown: once per visitor, strictly non-resetting.',
    },
    ev: 'Honest countdowns lift conversion <b>+9.1%</b>; timers that reset lose <b>−3.2%</b> and drive refunds. Higgsfield /pricing exit-intent: 62% OFF with 07:58 timer, collapses to synchronized sticky banner.',
    kpi: ['Overlay → checkout <b>≥ 18%</b>', 'Sticky strip → paid <b>≥ 12%</b>', 'Refund rate <b>&lt; 2%</b>'],
    frame: {
      h: 700, plan: 'free', balance: 4, max: 50, chips: ['nb', 'sa', 'omni'], prompt: 'Message Many…', send: { label: 'Send', cost: '~1 cr' }, sonicCard: false, status: 'Many: ready', dot: 'ok',
      banner: `<div class="exit-sticky"><span class="pill">62% OFF APPLIED</span><span><b>SPECIAL 62% OFF</b> · Nano Banana Pro &amp; Seedance 2.5 Unlimited on Ultra with 62% OFF</span><span class="exit-timer-pill">${svg('clock', 11)} <span class="tm-persist-sticky">07:58</span> LEFT</span><span class="sp"><span class="mini p" style="background:#f18024;color:#fff;border-radius:6px;padding:3px 8px;font-weight:600">Claim 62% OFF</span></span></div>`,
      overlay: `<div class="md exit-62" style="--mw:480px">${X}
        <div class="kick">${svg('percent', 12)} EXTRA DISCOUNT ADDED <span class="tm exit-timer-pill">${svg('clock', 10)} <span class="tm-persist-exit">07:58</span> LEFT</span></div>
        <h3>EXTRA DISCOUNT ADDED · 62% OFF</h3>
        <p>You're getting an extra discount on top of your personal plan pricing. This is our absolute best offer. Promocode is applied.</p>
        <div class="ticket" style="border-color:rgba(248,90,106,.6);background:rgba(248,90,106,.08)">${svg('percent', 13)} Promocode applied · <b>EXTRA62</b> <span class="tm exit-timer-pill" style="background:#f85a6a">${svg('clock', 10)} <span class="tm-persist-exit">07:58</span></span></div>
        <div class="split">
          ${planCard('plus', { hi: true, b: '62% OFF', price: 22, was: 59, li: [[1, 'Seedance 2.5, Veo, Sora, Kling'], [1, '7-day unlimited passes included'], [1, '6 parallel sub-agents']] })}
          ${planCard('ultra', { b: '62% OFF', price: 49, was: 129, li: [[1, 'Everything in Plus, 4K everywhere'], [1, 'Unlimited Nanobanana Pro 7 days'], [1, 'Lowest cost per credit: 1.6¢']] })}
        </div>
        <div class="cta"><span class="p grad">Claim Your 62% OFF · $22/mo</span><span class="g">Continue with 62% OFF</span></div>
        <div class="legal">Discounts do not stack. Special introductory offer valid for a limited time per account.</div>
      </div>` },
  },
  {
    id: 'llm-gate', n: 6, title: 'Premium LLM selected — agent turns are credits too', surface: 3,
    lead: 'Quadcode is an agent workspace: frontier LLMs cost more per turn than most images. The existing LLM picker gets plan badges; picking Opus on Free opens a light popover, not a full modal.',
    spec: {
      Trigger: 'LLM picker → row with <code>plan &gt; user.plan</code>',
      Fires: 'Popover anchored to the picker. The selection stays on the current model until the user upgrades.',
      Segment: 'Free (Opus, Fable, GPT-6) · Starter (Fable, GPT-6) · Plus (Fable, GPT-6 on Ultra).',
      Offer: 'Plan that unlocks the row. Copy names what Free already includes so it never reads as a downgrade.',
      Escape: '"Keep Sonnet" — the recommended free model.',
      Cap: '1 popover per model per session; badges always visible.',
    },
    ev: 'Model-tier badges in the picker are the single strongest upgrade driver in AI tools (<b>+18%</b>); Cursor/Copilot gate frontier models the same way.',
    kpi: ['Popover → Plus <b>≥ 5%</b>', 'Opus share on Plus <b>≥ 35%</b>', 'Free LLM cost/user <b>−20%</b>'],
    frame: {
      plan: 'free', balance: 38, max: 50, chips: ['nb', 'sa', 'omni'], llm: 'sonnet', llmOpen: true, prompt: 'Refactor the storefront checkout to Stripe Payment Element and add Apple Pay.', agent: 'cody',
      send: { label: 'Send', cost: '~3 cr' }, sonicCard: false, status: 'Cody: ready', dot: 'ok',
      pop: `<div class="pop">
        <div class="llm-list">
          ${['gemf', 'sonnet', 'grok', 'opus', 'fable', 'gpt6'].map(id => { const m = MODELS[id]; const locked = PLAN_RANK[m.plan] > 0; return `<div class="lrow ${id === 'opus' ? 'sel' : ''} ${locked ? 'locked' : ''}">${mark(id)}<span class="ln">${m.n}</span>${m.rec ? '<span class="pb free">Recommended</span>' : ''}${m.isNew ? '<span class="pb new">New</span>' : ''}${locked ? `<span class="pb ${m.plan}">${PLANS[m.plan].n}</span>` : '<span class="incl">Included</span>'}</div>`; }).join('')}
        </div>
        <div class="pop-card">
          <div class="kick">${mark('opus')} Plus model</div>
          <h4>Opus 5.5 is on Plus</h4>
          <p>Free includes Sonnet 5 and Gemini Flash. Plus adds Opus, 1,200 credits and 6 parallel sub-agents.</p>
          <div class="cta"><span class="p">Get Plus · $47/mo</span><span class="g">Keep Sonnet</span></div>
        </div>
      </div>` },
  },
  {
    id: 'store', n: 7, title: 'The profile popup becomes the store', surface: 7,
    lead: 'Today the status-bar profile shows "Balance: 25.50 QCC" with Settings and Deposit. It becomes the store, 1:1 with Higgsfield\'s avatar menu: monthly credits + auto-refill counter, three Get rows (Top-up credits, Boost speed, Unlimited models), and Affiliate program (New) linking to ../affiliate/index.html.',
    spec: {
      Trigger: 'Click on profile in the status bar (user-initiated)',
      Fires: 'Always. Top-up credits and Unlimited models open the store modal on that tab (scene 2); Boost speed opens scene 12.',
      Segment: 'All plans. On Free, Top-up credits opens the store on Upgrade Plan until a plan is active.',
      Offer: 'Packs from $6, Boost speed +4 to +16 parallel jobs, Unlimited passes from $5. Add members for teams, Affiliate program marked New (leads to ../affiliate/index.html). Separate Auto-refill credits counter.',
      Escape: 'It is a menu — nothing to escape.',
      Cap: 'None.',
    },
    ev: 'Higgsfield keeps all three add-on stores one click from the avatar for every paid user. A visible, user-initiated store lifts repeat pack purchases and cuts "how do I pay" support tickets.',
    kpi: ['Menu open → purchase <b>≥ 4%</b>', 'Pack repeat rate <b>≥ 35%</b>', 'Boost attach on Plus/Ultra <b>≥ 5%</b>'],
    frame: {
      plan: 'plus', balance: 720, max: 1200, chips: ['nb', 'sa', 'omni'], prompt: 'Message Many…', send: { label: 'Send', cost: '~1 cr' }, sonicCard: false, status: 'Many: ready', dot: 'ok', meOpen: true,
      menu: `<div class="menu hf">
        <div class="me"><span class="avatar">E</span><div><div class="nm">Emil</div><div class="em">Plus plan</div></div><span class="pl">Plus</span></div>
        <div class="it plain">${svg('plus', 12)} Add members</div>
        <div class="cr"><div class="row"><span>Monthly credits</span><b>720 left</b></div><div class="dots">${Array.from({ length: 30 }, (_, i) => `<i class="${i < 18 ? 'on' : ''}"></i>`).join('')}</div><div class="row subcr" style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;padding-top:5px;border-top:1px dashed rgba(0,0,0,.1)"><span>Auto-refill credits</span><b style="color:#059669;background:#ecfdf5;padding:1px 6px;border-radius:4px;font-size:10px">0 cr (Disabled)</b></div></div>
        <div class="it"><span class="ico">${svg('coins', 13)}</span><span>Top-up credits<span class="sub">100 to 5,000 credits · from $6</span></span><span class="get">Get</span></div>
        <div class="it"><span class="ico">${svg('zap', 13)}</span><span>Boost speed<span class="sub">+4 to +16 parallel jobs</span></span><span class="get">Get</span></div>
        <div class="it"><span class="ico">${svg('infinity', 13)}</span><span>Unlimited models<span class="sub">Nanobanana Pro from $5 · Seedance 2.5 from $35</span></span><span class="get">Get</span></div>
        <hr>
        <div class="it plain">${svg('user', 12)} View profile</div>
        <div class="it plain">${svg('settings', 12)} Manage account</div>
        <a class="it plain" href="../affiliate/index.html" style="text-decoration:none;color:inherit;display:flex">${svg('gift', 12)} Affiliate program <span class="new">New</span></a>
        <div class="it plain">${svg('chat', 12)} Join community</div>
        <div class="it plain">${svg('globe', 12)} Language</div>
        <div class="it plain">${svg('logout', 12)} Sign out</div>
      </div>` },
  },
  {
    id: 'win-back', n: 8, title: 'Cancel flow — 1-screen win-back & legal cancellation', surface: 8,
    lead: 'A Plus user clicks "Cancel plan" in Settings → My Subscription. Unlike Higgsfield\'s 5-screen maze (which violates CA § 17602 & BGB § 312k), Quadcode presents everything on ONE clear retention screen: honest loss calculator ($35.30 in money / 718 credits / 359 gens calculated at $59/1,200 cr), timeline with 7-day reminder, 25% OFF for 2 months offer, "Remind me before renewal", and an immediate full-size "Cancel subscription" button. After cancellation, an optional 6-reason survey with "What could we have done better?" collects feedback without blocking, leading to the final confirmation screen showing access kept until Oct 22, 2026.',
    toolbar: `
      <div class="scene-toolbar">
        <span class="stb-label">Scenario steps:</span>
        <div class="stb-group">
          <button class="stb-btn on" data-cv="retention">1. Retention screen (1-screen win-back)</button>
          <button class="stb-btn" data-cv="survey">2. Post-cancel survey (optional)</button>
          <button class="stb-btn" data-cv="final">3. Final confirmation (Access kept)</button>
        </div>
      </div>`,
    spec: {
      Trigger: 'Settings → My Subscription → Cancel plan',
      Fires: 'Single retention screen. Once per cancel attempt. Full-size "Cancel subscription" button is directly accessible on this screen.',
      Segment: 'Plus · Ultra · Starter',
      Offer: '25% OFF for 2 months ($44.25/mo on Plus, was $59/mo, saves $29.50; proposal) · Delay: "Remind me 7 days before renewal" · Keep credits ($35.30 in money / 718 cr / 359 gens).',
      Escape: '"Keep my plan" / "Accept 25% offer" keeps subscription active. "Cancel subscription" executes immediate cancellation with zero barriers.',
      Cap: 'Strict 1-screen rule for legal compliance (California Auto-Renewal Law CA § 17602, German Fair Consumer Contracts Act BGB § 312k). Survey is strictly post-cancellation and optional.',
    },
    ev: 'Win-back flows save <b>20–34%</b> of cancellations; <b>75%</b> of paused users return. Higgsfield uses 5 screens: delay → loss calculator → 6 reasons → feedback → 25% OFF for 2 months. To maintain strict legal compliance with auto-renewal regulations (CA § 17602, BGB § 312k) and keep chargebacks &lt;0.5%, Quadcode places all retention incentives on a single screen with immediate cancellation capability, followed by optional feedback collection and transparent access confirmation.',
    kpi: ['Cancel → saved <b>≥ 25%</b>', 'Single-screen legal compliance <b>100%</b>', 'Chargeback rate <b>&lt; 0.5%</b>'],
    frame: {
      h: 840, plan: 'plus', balance: 718, max: 1200, chips: ['nb', 'suno', 'sd'], center: 'billing', centerTabs: ['Actions', 'Settings', 'brief.md'], centerTab: 1, prompt: 'Message Many…', send: { label: 'Send', cost: '~1 cr' }, sonicCard: false, status: 'Many: ready', dot: 'ok',
      overlay: `<div class="md" style="--mw:480px">${X}
        <div id="cview-retention">
          <div class="kick">${svg('flag', 12)} Keep your creative momentum</div>
          <h3>Keep your 718 credits and your projects live</h3>
          <p>You've already paid for this. If you cancel now, your remaining credits will disappear once your billing period ends on Oct 22.</p>
          <div class="c-timeline">
            <div class="tl-step on"><span class="tl-dot"></span><b>Today (Oct 7)</b><small>Decision moment</small></div>
            <span class="tl-arr">→</span>
            <div class="tl-step"><span class="tl-dot"></span><b>Oct 15 (7 days before)</b><small>We'll notify you</small></div>
            <span class="tl-arr">→</span>
            <div class="tl-step"><span class="tl-dot"></span><b>Oct 22 Renewal</b><small>Next billing cycle</small></div>
          </div>
          <div class="loss-grid">
            <div class="loss-c"><span class="loss-v">$35.30</span><span class="loss-l">in real money value ($59/1,200 cr)</span></div>
            <div class="loss-c hi"><span class="loss-v">718</span><span class="loss-l">credits left</span></div>
            <div class="loss-c"><span class="loss-v">359</span><span class="loss-l">in generations left</span></div>
          </div>
          <div class="ret-offer-box">
            <div class="ret-badge">LIMITED-TIME RETENTION OFFER</div>
            <div class="ret-title">25% OFF FOR YOUR NEXT 2 MONTHS</div>
            <p>Keep your 1,200 monthly credits and all video models for $44.25/mo (was $59/mo). Saves $29.50 over 2 months.</p>
            <div class="ret-actions">
              <button class="btn-accept-offer">Accept 25% Offer · $44.25/mo</button>
              <button class="btn-remind-me">Remind me before renewal</button>
            </div>
          </div>
          <div class="cancel-footer-row">
            <button class="btn-cancel-full">Cancel subscription</button>
            <button class="btn-keep-sub">Keep my plan</button>
          </div>
          <div class="legal">Your access and remaining credits stay active until Oct 22. No future charges.</div>
        </div>
        <div id="cview-survey" style="display:none">
          <div class="postcancel-box">
            <div class="pc-status">
              <span class="ico ok">${svg('check', 14, 3)}</span>
              <div><b>Subscription cancelled</b><p>Your Plus plan and 718 credits remain active until Oct 22, 2026. No further charges will occur.</p></div>
            </div>
            <div class="pc-survey">
              <div class="survey-title">Reason of cancellation · What could we have done better? (Optional)</div>
              <div class="survey-sub">Before you go... Could you share why you're leaving? We read every answer to improve.</div>
              <div class="survey-reasons">
                <label><input type="radio" name="r_cancel" value="1"> I only needed it for a one-time project</label>
                <label><input type="radio" name="r_cancel" value="2"> Technical issues</label>
                <label><input type="radio" name="r_cancel" value="3"> I found it too hard to use</label>
                <label><input type="radio" name="r_cancel" value="4"> I'm switching to another tool</label>
                <label><input type="radio" name="r_cancel" value="5" checked> It's too expensive for what I'm getting</label>
                <label><input type="radio" name="r_cancel" value="6"> It's missing features I need</label>
              </div>
              <div class="survey-field">
                <textarea placeholder="Tell us what could have been better..."></textarea>
                <span class="char-count">0/500</span>
              </div>
              <div class="survey-actions">
                <button class="btn-submit-feedback">Submit feedback</button>
                <button class="btn-skip-survey">Skip</button>
              </div>
            </div>
          </div>
        </div>
        <div id="cview-final" style="display:none">
          <div class="final-access-box">
            <div class="fa-icon ok">${svg('check', 20, 2.5)}</div>
            <h3>Access active until October 22, 2026</h3>
            <p class="fa-lead">Your subscription has been cancelled. No further charges will occur.</p>
            <div class="fa-details">
              <div class="fa-row"><span>Remaining credits</span><b>718 credits ($35.30 money value)</b></div>
              <div class="fa-row"><span>Active access</span><b>Plus features, Seedance 2.5, 6 sub-agents</b></div>
              <div class="fa-row"><span>Final expiry date</span><b>October 22, 2026 · 23:59 UTC</b></div>
              <div class="fa-row"><span>Saved projects &amp; assets</span><b>Kept safe indefinitely on Free tier</b></div>
            </div>
            <div class="fa-actions">
              <button class="btn-resubscribe">Resubscribe anytime</button>
              <button class="btn-back-workspace">Back to workspace</button>
            </div>
          </div>
        </div>
      </div>` },
  },
];

/* ---------- scenes 9–10: added after the live Higgsfield walkthrough (23.09.2026) ---------- */
SCENES.push(
  {
    id: 'unlimited-switch', n: 9, title: 'The Unlimited switch — a pass for the model in the chip', surface: 2,
    lead: 'A Plus user queues 36 Seedance clips for a campaign. Beside the model chip sits an Unlimited switch. One click opens a 1 / 3 / 7-day pass for exactly that model — the batch is kept and starts the moment checkout completes.',
    spec: {
      Trigger: 'Composer → <code>Unlimited</code> switch beside the selected media model. Auto-suggested when one turn costs <code>&gt; 30%</code> of the monthly allowance.',
      Fires: 'Modal for the model in the chip, nothing else. Batch cost against balance, resolution and parallel jobs are shown before the price.',
      Segment: 'Starter · Plus · Ultra. Free sees the plan first (scene 1); the switch stays visible with a Plus badge.',
      Offer: '1-day · 3-day · 7-day pass for this model. 7-day preselected; the 1-day price × days is struck through, so the discount is real arithmetic.',
      Escape: '"Run 24 clips on credits" — the part of the batch the balance covers, right now.',
      Cap: 'User-initiated: none. Auto-suggest: once per batch, never on turns under 30% of the allowance.',
    },
    ev: 'Verified live on Higgsfield (23.09): the switch sits beside the model in every composer and the modal preselects 7-day with the 1-day × days price struck (GPT Image €30 / €70 / €135; Seedance 2.5 €180 / €420 / €810). Offers shown at the moment of a large batch convert up to <b>6×</b> a store-only placement.',
    kpi: ['Switch → pass <b>≥ 10%</b>', 'Pass ARPPU <b>+$12</b>', 'Large-batch abandonment <b>−30%</b>'],
    frame: {
      plan: 'plus', balance: 1104, max: 1200, chips: ['nb', 'sa', 'sd'], chipOn: 'sd', unl: { on: true }, ovPos: 'right',
      prompt: 'Render 12 variants of the hero shot in 16:9, 9:16 and 1:1 — <b>36 clips · 1080p · 5 s</b>.',
      send: { label: 'Send', cost: '1,620 cr' },
      sonicCard: { agent: 'sonic', task: 'Hero variants', meta: 'Seedance 2.5 · 36 clips', state: 'wait', items: [['wait', 'Batch queued · 1,620 cr'], ['lock', 'Balance covers 24 of 36']] },
      sonicState: 'wait', sonicNote: 'Batch: 36 clips · 1,620 cr · balance covers 24', status: 'Sonic: batch waiting for confirmation',
      overlay: `<div class="md">${X}
        <div class="kick">${mark('sd')} Unlimited · Seedance 2.5 <span class="tm">2 parallel jobs</span></div>
        <h3>Unlimited Seedance 2.5 for this campaign</h3>
        <p>Your batch needs <b>1,620 credits</b>; you have <b>1,104</b>. A pass runs all 36 clips and every other Seedance shot you render this week.</p>
        <div class="batch"><div class="row"><span>36 clips · 1080p · 5 s</span><b>1,620 cr</b></div><div class="bar"><i style="width:68%"></i></div><div class="row"><span>Balance covers 24 of 36</span><b>1,104 cr</b></div></div>
        <div class="segrow"><div class="seg"><span>720p</span><span class="on">1080p</span></div><span class="conc">${svg('layers', 11)} 2 parallel jobs · shared queue</span></div>
        <div class="opts">
          ${opt({ mark: 'sd', t: '1-day pass', s: 'Try it out, no commitment', pr: '$15', small: 'one-time' })}
          ${opt({ mark: 'sd', t: '3-day pass', b: '−22%', s: 'A few days of full access', pr: '$35', was: '$45', small: 'one-time' })}
          ${opt({ mark: 'sd', hi: true, t: '7-day pass', b: '−38%', s: 'Great for a project or campaign', pr: '$65', was: '$105', small: 'one-time' })}
        </div>
        <div class="cta"><span class="p">Get 7-day pass · $65</span><span class="g">Run 24 clips on credits</span></div>
        <div class="legal">Standard modes · 1080p · 2 parallel jobs · credit jobs keep queue priority. Starts at checkout, ends Oct 14, 23:59.</div>
      </div>` },
  },
  {
    id: 'my-subscription', n: 10, title: 'My Subscription — the page that earns the renewal', surface: 10,
    lead: 'Settings → My Subscription is not a billing table. A Plus user sees what the plan already delivered, what they have not tried, and the one line only Ultra fixes. Pause, switch and cancel stay one click away — visible, not hidden.',
    spec: {
      Trigger: 'Settings → My Subscription (user-initiated) · deep link from the meter, the store and every renewal email',
      Fires: 'Always. Blocks reorder by state: 7 days before renewal the recap moves to the top; under 20% credits the auto-refill row moves up.',
      Segment: 'Starter · Plus · Ultra. Free sees the same page as a preview with the checklist unfilled.',
      Offer: 'One upgrade path (the single cross in the checklist) · auto-refill · packs · active passes with "saved" · unused features with a Try button.',
      Escape: 'It is a page. Nothing blocks, nothing counts down.',
      Cap: 'No timers, no discounts here. The page earns the renewal by showing value.',
    },
    ev: 'Verified live on Higgsfield (23.09): renewal date first, an 8-item checklist with exactly one cross ("Lowest cost per credit"), auto-refill offered twice, "saved in total" counters, a Rewind and a "1 / 15 features used" list. Feature adoption is the strongest predictor of renewal in credit-based SaaS; win-back saves <b>20–34%</b> only after this page has failed.',
    kpi: ['Auto-refill on <b>≥ 15%</b>', 'Unused feature → first use <b>≥ 25%</b>', 'M2 retention <b>+8 pts</b>'],
    frame: {
      h: 720, layout: 'wide', plan: 'plus', balance: 412, max: 1200, chips: ['nb', 'sa', 'sd'], center: 'subscription', centerTabs: ['Actions', 'Settings · My Subscription', 'brief.md'], centerTab: 1,
      messages: [
        { who: 'user', text: 'Open my subscription.' },
        { who: 'many', text: 'Here it is. 412 credits left this cycle, a Nanobanana Pro pass running until Oct 14, and 9 plan features you have not tried yet.' },
      ],
      prompt: 'Message Many…', send: { label: 'Send', cost: '~1 cr' }, status: 'Many: ready', dot: 'ok',
    },
  },
);

/* ---------- scene 11: the in-app checkout every CTA lands on (from the live-code audit, 23.09.2026) ---------- */
SCENES.push({
  id: 'checkout', n: 11, title: 'One checkout inside the app — no browser, no second login',
  surface: null, surfaceLabel: 'Every Upgrade · Get · Top up button',
  lead: 'Today every paid button in the app opens <code>quadcode.ai/profile/plans</code> in the browser. If the browser is not signed in, that page bounces to the home page, so the buyer signs in again, finds the plan and types a card. The new sheet opens over the workspace, keeps the job in the chat and takes a wallet payment in two taps.',
  spec: {
    Trigger: 'Primary CTA of surfaces 1–10 and scenes 1–10: Upgrade, Get pass, Top up, Keep my plan.',
    Fires: 'The sheet opens over the current workspace. The job that triggered it stays queued and starts on success.',
    Segment: 'Everyone. Methods 1:1 with Higgsfield: Apple Pay first where the device supports it, then card, then bank payment.',
    Offer: 'Exactly what the calling surface passed: plan and period, pack or pass. Price, credit for unused days, next charge date and what happens to current credits are shown above the button.',
    Escape: '"Back to my work" closes the sheet and keeps the job queued. "Pay in browser" stays as a fallback link.',
    Cap: 'No extra upsell inside checkout. One optional line, off by default: auto-refill.',
  },
  ev: 'Verified in the live code (23.09): the checkout lives only on the web, uses the legacy Stripe card field (card only: no Apple Pay or bank payments), and switching plans cancels the current subscription and charges the full new price with no credit line. Signed-out visits to <code>/profile/plans</code> redirect to the home page. Higgsfield keeps its whole store in an in-app modal (verified live).',
  kpi: ['Upgrade click → paid <b>2×</b> vs web flow', 'Wallet share of payments <b>≥ 40%</b>', 'Checkout drop-off <b>−30%</b>'],
  frame: {
    plan: 'starter', balance: 212, max: 300, chips: ['nb', 'sa', 'sd'], chipOn: 'sd', ovPos: 'right',
    prompt: 'Make the teaser in Seedance 2.5 — <b>1080p · 10 s</b>.',
    send: { label: 'Send', cost: '90 cr' },   // Seedance 2.5 1080p = 45 cr / 5 s (same table as the pricing page) × 10 s
    messages: [
      { who: 'user', text: 'Make the teaser in Seedance 2.5, 1080p, 10 seconds.' },
      { who: 'many', text: 'Seedance 2.5 at 1080p is on Plus. I kept the job — upgrade here and Sonic starts right after payment.' },
    ],
    status: 'Many: job kept · waiting for checkout', dot: 'warn',
    overlay: `<div class="md ck" style="--mw:318px"><span class="x">${svg('x', 12)}</span>
      <div class="kick"><span class="mk" style="background:var(--orange)">Q</span> Checkout <span class="tm">${svg('lock', 10)} Stripe</span></div>
      <h3>Upgrade to Plus</h3>
      <div class="ck-sum">
        <div class="row"><span>Plus · monthly · 1,200 credits</span><b>$59.00</b></div>
        <div class="row cr"><span>Unused Starter days · Oct 7 – 22</span><b>−$10.00</b></div>
        <div class="row tot"><span>Due today</span><b>$49.00</b></div>
        <div class="row dim"><span>New cycle today · then $59.00 on Nov 7</span><span>cancel anytime</span></div>
      </div>
      <div class="ck-keep">${svg('check', 11)}+1,200 credits now · your 212 stay · the job starts on payment</div>
      <div class="ck-wallets"><span class="w ap">Apple Pay</span><span class="w bk">Bank payment</span></div>
      <div class="ck-or">or pay by card</div>
      <div class="ck-card"><span>${svg('card', 12)}Card number</span><span>MM / YY</span><span>CVC</span></div>
      <div class="ck-opt"><i class="sw"></i>Auto-refill $40 for 720 credits below 120 · off</div>
      <div class="cta"><span class="p">Pay $49.00</span><span class="g">Back to my work</span></div>
      <div class="legal">USD incl. VAT · pause, switch or cancel in Settings → My Subscription · <u>Pay in browser</u></div>
    </div>`,
  },
});

/* ---------- scenes 12–13: the two Higgsfield add-ons we did not have (1:1 pass, 23.09.2026) ---------- */
SCENES.push({
  id: 'boost', n: 12, title: 'Boost speed: parallel jobs sold as an add-on', surface: 7,
  lead: 'Higgsfield sells speed separately from plans. In Quadcode it maps onto the agent team: a Plus user with six videos queued buys more parallel jobs instead of waiting for Sonic to finish one by one.',
  spec: {
    Trigger: 'Profile menu → Boost speed [Get], or the queue hits the plan limit (Sonic card: "3 jobs waiting · plan limit 6").',
    Fires: 'On click. The queue hint shows at most once per session.',
    Segment: 'Starter, Plus, Ultra. Free sees Upgrade Plan instead: its limit is 1 job.',
    Offer: '1:1 Higgsfield: +4 / +8 / +12 / +16 parallel jobs on all media models, boost credits 500 to 3,000, a struck-through price and "How it works". Limits shown as "6 → 14 video jobs at once".',
    Escape: 'Close: jobs keep running inside the plan limit.',
    Cap: 'No timer. Boost credits are spent only on jobs above the plan limit.',
  },
  ev: 'Seen in Higgsfield\'s store as a paid user (23.09): "Generate up to 3× faster with more parallel generations", +8 concurrency preselected, 1,000 boost credits for €97 instead of €134. Concurrency is the main plan difference on their pricing page (video jobs 1 / 2 / 6 / 8).',
  kpi: ['Boost attach on Plus/Ultra <b>≥ 5%</b>', 'Queue hint → purchase <b>≥ 8%</b>', 'Add-on revenue share <b>≥ 10%</b>'],
  frame: {
    h: 760, plan: 'plus', balance: 640, max: 1200, chips: ['nb', 'sa', 'sd'], chipOn: 'sd',
    prompt: 'Make all 9 product shots in Seedance 2.5…', send: { label: 'Send', cost: '405 cr' },
    status: 'Sonic: 6 running · 3 waiting', dot: 'warn',
    overlay: boostModal(),
  },
});

SCENES.push({
  id: 'usage', n: 13, title: 'Usage in money, with a run-out forecast', surface: 10,
  lead: 'Higgsfield shows spend in euros per model next to credits. We add one line they do not have: when the balance runs out at the current pace. That line is where Upgrade and Top up sit.',
  spec: {
    Trigger: 'Settings → Usage, or "Usage" in the profile menu.',
    Fires: 'Always. The forecast line appears when the balance runs out before renewal at the 7-day pace.',
    Segment: 'All paid plans. Free sees the same page with "Upgrade Plan" instead of Top up.',
    Offer: 'Spend overview (total cost, credits spent, features used, total generations), share per model, auto-refill switch, concurrency boost row, usage history.',
    Escape: 'It is a settings page — nothing to escape.',
    Cap: 'None. The forecast uses real spend, never a made-up deadline.',
  },
  ev: 'Higgsfield Usage page (23.09): "Spend overview: €19.18 total cost · 479.5 credits spent · 4 features used · 20 total generations", auto-refill "Disabled · Set up & enable", history rows "2 credits · Nano Banana Pro · Spent". Money next to credits makes the next pack an easy call.',
  kpi: ['Usage page → purchase <b>≥ 6%</b>', 'Auto-refill enabled <b>≥ 15%</b> of paid', 'Runs out before renewal <b>−30%</b>'],
  frame: {
    h: 800, layout: 'wide', plan: 'plus', balance: 108, max: 1200, chips: ['nb', 'sa', 'sd'],
    center: 'usage', centerTabs: ['Actions', 'Settings · Usage', 'brief.md'], centerTab: 1,
    messages: [
      { who: 'user', text: 'How much did I spend this month?' },
      { who: 'many', text: 'This cycle: $42.77, mostly Seedance 2.5 videos. At this pace your 108 credits last about two days.' },
    ],
    prompt: 'Message Many…', send: { label: 'Send', cost: '~1 cr' }, status: 'Many: ready', dot: 'ok',
  },
});

/* ---------- scenes 14–21: more buy and stay prompts (pass 2) ----------
   14–15 and 21 are copied from Higgsfield (guest walk 23.09); 16–20 cover what a paying
   Higgsfield user does not see (failed card, lapsed plan) and are grounded in billing data. */
const QC_MARK = '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#fff"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="#fff" opacity=".85"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="#fff" opacity=".85"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="#fff" opacity=".6"/></svg>';
const starterRow = (img, id, t) => `<div class="st-row"><img src="${IMG(img)}" alt=""><div><b>${t}</b><small>${mark(id)} ${MODELS[id].n} · ${MODELS[id].cost} cr</small></div><span class="go">${svg('right', 13)}</span></div>`;
const shelfRow = (id, o = {}) => {
  const m = MODELS[id];
  const lock = planBadge(m.plan, o.have || 'starter');
  return `<div class="lrow ${o.sel ? 'sel' : ''} ${lock ? 'locked' : ''}">${mark(id)}<span class="ln">${m.n}</span>`
    + (o.bdg ? `<span class="bdg ${o.bdg[0]}">${o.bdg[1]}</span>` : '')
    + (o.rs ? `<span class="rs">${o.rs}</span>` : '')
    + `<span class="lc">${o.was ? `<s>${o.was}</s>` : ''}${o.cost ?? m.cost} cr</span>`
    + (lock || '<span class="incl">included</span>') + '</div>';
};

SCENES.push(
  {
    id: 'welcome', n: 14, title: 'First launch: sign-in bonus and a welcome gift', surface: 8,
    lead: 'Higgsfield greets every guest with "Get an additional discount on premium plans after signing up", and its sign-up modal leads with "Sign in with business email & Get 50 credits". Quadcode\'s desktop sign-in copies both. Right after sign-in the user gets three one-click starters, so the first result lands before any paywall.',
    spec: {
      Trigger: 'First launch without a session (sign-in screen), then the first sign-in (welcome sheet).',
      Fires: 'Sign-in screen: work-email button first, Google / Apple / Microsoft / email below. Welcome sheet once after the first sign-in; the gift ticket then stays in the profile popup until it ends.',
      Segment: 'New accounts. Work email = company domain (not gmail, outlook, icloud), verified by a magic link.',
      Offer: '50 free credits, +50 for a work email, +10 every day. Welcome gift: +20% credits on the first plan or pack within 7 days (Plus yearly = 1,440 credits instead of 1,200).',
      Escape: '"Start creating" is the main button. No card, no plan picker on the way in.',
      Cap: 'One work-email bonus per account. One welcome gift per account; the 7-day end date is fixed at sign-in.',
    },
    ev: 'Seen on Higgsfield 23.09 as a guest: yellow top bar "Get an additional discount on premium plans after signing up", a "30% OFF" badge on Pricing, and the sign-up modal led by "Sign in with business email & Get 50 credits". Work emails also feed Enterprise leads.',
    kpi: ['Sign-in → first generation on day 0 <b>≥ 60%</b>', 'Work-email share of sign-ups <b>≥ 25%</b>', 'Gift → first purchase in 7 days <b>≥ 4%</b>'],
    frame: {
      h: 800, layout: 'wide', plan: 'free', balance: 100, max: 100, chips: ['nb', 'omni', 'sa'], sonicCard: false,
      prompt: 'Describe what you want to make…', send: { label: 'Send', cost: '~2 cr' }, status: 'Many: ready', dot: 'ok',
      overlay: `<div class="md duo" style="--mw:680px">${X}
        <div class="duo-c">
          <div class="step">1 · Sign-in screen</div>
          <div class="si-logo">${QC_MARK}</div>
          <h3>Welcome to Quadcode</h3>
          <p>Sign up and generate for free. No card needed.</p>
          <div class="si-b hi">${svg('mail', 13)} Continue with work email <span class="pill">+50 credits</span></div>
          <div class="si-or">or</div>
          <div class="si-b">${logo('google')} Continue with Google</div>
          <div class="si-b">${logo('apple')} Continue with Apple</div>
          <div class="si-b">${logo('microsoft')} Continue with Microsoft</div>
          <div class="si-b">Continue with email</div>
          <div class="si-gift">${svg('gift', 12)} <span>Sign up today: <b>+20% credits</b> on your first plan or pack</span></div>
        </div>
        <div class="duo-c">
          <div class="step">2 · Right after sign-in</div>
          <div class="kick">${svg('check', 12)} emil@aeroknit.com · verified</div>
          <h3>You have 100 credits to start</h3>
          <div class="wl-grid">
            <div class="wl-c"><b>50</b><span>Free credits</span></div>
            <div class="wl-c hi"><b>+50</b><span>Work email</span></div>
            <div class="wl-c"><b>+10</b><span>Every day</span></div>
          </div>
          <div class="ticket">${svg('gift', 13)} <span>Welcome gift: <b>+20% credits</b> on your first plan or pack</span> <span class="tm">${svg('clock', 12)} 6d 23h</span></div>
          <div class="lab2">Start with one click</div>
          ${starterRow(2, 'nb', 'Key frame in neon light')}
          ${starterRow(1, 'omni', 'Turn a still into a 5 s clip')}
          ${starterRow(4, 'sa', 'Music bed for a reel')}
          <div class="cta"><span class="p">Start creating</span><span class="g">Plans · +20%</span></div>
        </div>
      </div>` },
  },
  {
    id: 'model-shelf', n: 15, title: 'The model picker is a shop window', surface: 2,
    lead: 'Higgsfield\'s model menu sells: TOP and NEW badges, the max resolution on every row, a cheap Draft variant, and the Generate button shows the sale price struck through ("80 → 60"). The media chip in Quadcode opens the same shelf. Locked rows are visible and clickable, and the send button shows this week\'s price drop.',
    spec: {
      Trigger: 'Click on a media model chip (Lumi or Sonic). The struck price shows whenever the selected model has a live credit promo.',
      Fires: 'Every time, as a dropdown above the composer. A locked row opens scene 1 (model gate) with that model preselected.',
      Segment: 'All plans. Free sees Starter and Plus badges; paid plans see badges only on rows above their plan.',
      Offer: 'Featured: Seedance 2.5 (TOP, 1080p, Plus), Kling 3.0 (−25% this week: 8 → 6 credits), Seedance 2.5 Fast as a cheap draft. Side card: what Plus adds, $47/mo.',
      Escape: 'Esc closes. Nothing gets selected for the user.',
      Cap: 'One promoted model at a time, 7-day window, end date printed. The struck price is the real regular price, never an invented one.',
    },
    ev: 'Seen on Higgsfield 23.09: Generate button "80 → 60" credits, picker rows with TOP / NEW badges and resolution chips, a 480p Draft variant. Model-gated "Plus only" rows lift upgrades by 18% (research doc).',
    kpi: ['Picker opens → locked row click <b>≥ 10%</b>', 'Promoted model share of generations <b>+30%</b>', 'Starter → Plus from the picker <b>≥ 2% a month</b>'],
    frame: {
      h: 760, layout: 'wide', plan: 'starter', balance: 212, max: 300, chips: ['nb', 'kling', 'suno'], chipOn: 'kling', sonicCard: false,
      prompt: 'Animate keyframe-03: slow dolly-in, dust in the key light…', send: { label: 'Send', cost: '<s>8</s> 6 cr' }, status: 'Sonic: ready', dot: 'ok',
      pop: `<div class="pop shelf">
        <div class="llm-list">
          <div class="lsrch">${svg('search', 11)} Search video models</div>
          <div class="lsec">Featured</div>
          ${shelfRow('sd', { bdg: ['top', 'TOP'], rs: '1080p' })}
          ${shelfRow('kling', { sel: true, bdg: ['sale', '−25%'], rs: '4K', was: 8, cost: 6 })}
          ${shelfRow('sdf', { bdg: ['fast', 'DRAFT'] })}
          <div class="lsec">All models</div>
          ${shelfRow('veo', { bdg: ['new', 'NEW'] })}
          ${shelfRow('sora')}
          ${shelfRow('wan')}
          ${shelfRow('omni')}
        </div>
        <div class="pop-card">
          <div class="kick">${mark('sd')} Top model</div>
          <h4>Seedance 2.5 is on Plus</h4>
          <p>Starter has 4 of 7 video models. Plus adds Seedance 2.5, Veo 3.1 and Sora 2 Pro, 1,200 credits and 6 parallel jobs.</p>
          <div class="cta"><span class="p">Get Plus · $47/mo</span><span class="g">Keep Kling</span></div>
          <div class="sale-note">${svg('clock', 11)} Kling 3.0 costs 6 credits instead of 8 until Sunday.</div>
        </div>
      </div>` },
  },
  {
    id: 'pack-to-plan', n: 16, title: 'Second pack in a month: show the plan math', surface: 9,
    lead: 'A Starter user buys a second 500-credit pack in 30 days. The receipt does the math he will not do himself: $78 this month for 1,300 credits, while Plus gives 1,200 credits for $59, or $47 a month on yearly, and opens Seedance, Veo and Sora.',
    spec: {
      Trigger: 'Second pack in 30 days, or pack spend in 30 days ≥ the price gap to the next plan.',
      Fires: 'In the receipt toast, after the credits are added (never before payment). The same line sits in My Subscription for 30 days.',
      Segment: 'Starter → Plus, Plus → Ultra. Heavy Ultra buyers get the 6,000 / 9,000 credit selector instead.',
      Offer: 'Upgrade now, instantly: pack credits stay (90 days, freeze on cancel until reactivated, spend after plan credits by earliest expiry date), plan difference is prorated. Yearly $47 preselected, monthly $59 one click away.',
      Escape: 'Close. The toast does not come back for 30 days.',
      Cap: 'Once per 30 days, never on the first pack.',
    },
    ev: 'Packs must cost more per credit than the next plan, or they eat plan revenue (Mojo removed cheap packs: +14% revenue). Here packs cost 5–6¢ per credit and Plus 3.9–4.9¢. Higgsfield sells packs only on top of a plan and upgrades instantly with the credit difference applied.',
    kpi: ['Toast → upgrade <b>≥ 12%</b>', 'Pack buyers on Plus after 60 days <b>≥ 30%</b>', 'Revenue per pack buyer <b>+15%</b>'],
    frame: {
      h: 740, layout: 'wide', plan: 'starter', balance: 540, max: 300, chips: ['nb', 'kling', 'suno'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      toast: `<div class="toast wide"><span class="x">${svg('x', 11)}</span>
        <div class="k">${svg('check', 12)} 500 credits added · receipt QC-20931</div>
        <h4>This month: $78 for 1,300 credits</h4>
        <div class="tm-rows">
          <div><span>Starter plan · 300 cr</span><span>$20</span></div>
          <div><span>Pack 500 · Sep 04</span><span>$29</span></div>
          <div><span>Pack 500 · today</span><span>$29</span></div>
          <div class="tot"><span>6.0¢ per credit</span><span>$78</span></div>
        </div>
        <div class="tm-rows hi">
          <div><span>Plus · 1,200 cr every month</span><span>$59</span></div>
          <div class="tot"><span>4.9¢ per credit · 3.9¢ yearly</span><span>$47/mo</span></div>
        </div>
        <div class="toast-rule-box" style="margin:8px 0;padding:6px 8px;background:rgba(241,128,36,.08);border-left:2px solid #f18024;font-size:11px;color:#333">
          ${svg('check', 10)} <b>Pack credits stay 90 days:</b> they freeze if plan is cancelled until reactivated, and spend after monthly plan credits by earliest expiry date.
        </div>
        <p>Plus also opens Seedance 2.5, Veo 3.1 and Sora 2 Pro. Your 540 pack credits remain active for 90 days.</p>
        <span class="mini">Upgrade to Plus · $47/mo</span> <span class="mini g">Keep Starter</span>
      </div>` },
  },
  {
    id: 'annual-switch', n: 17, title: 'Change commitment: monthly to yearly modal with prorations', surface: 8,
    lead: 'Higgsfield keeps a "Change Commitment" button on the current plan card. Clicking it opens a dedicated modal (screen 78): new plan, unused credits prorated ("-$35.30" from honest $59/1,200 cr rate), Due today ($528.70), and the new annual billing cycle starts today immediately.',
    spec: {
      Trigger: 'Click "Change Commitment" button on current plan card in My Subscription or /pricing.',
      Fires: 'Modal overlay with prorations, new billing cycle starts today.',
      Segment: 'Monthly subscribers on any plan. Hidden for 60 days after a failed payment.',
      Offer: 'Switch to yearly immediately: Plus Annual $564/yr ($47/mo equivalent). Proration: Unused credits -$35.30. Due today: $528.70. Rollover credits move to annual pool.',
      Escape: '"Keep Monthly" closes modal. Button on plan card remains.',
      Cap: 'User-initiated on plan card; lifecycle prompt at 2nd renewal.',
    },
    ev: 'Higgsfield screen 78: "Changing commitment · Your new plan starts now. Unused credits are applied as a discount." Current Plus Monthly $59 → Plus Annual $564 (−20%), Unused credits −$35.30 (718 cr at $59/1,200 cr), Due today $528.70.',
    kpi: ['Modal → confirm <b>≥ 28%</b>', 'Yearly share of paid users <b>≥ 40%</b>', '12-month revenue retention <b>+20 pts</b>'],
    frame: {
      h: 760, layout: 'wide', plan: 'plus', balance: 718, max: 1200, chips: ['nb', 'kling', 'suno'], sonicCard: false,
      center: 'subscription', planCycle: 'monthly', centerTabs: ['Actions', 'Settings · My Subscription', 'brief.md'], centerTab: 1,
      status: 'Many: ready', dot: 'ok',
      overlay: `<div class="md change-comm" style="--mw:480px">${X}
        <div class="kick">${svg('refresh', 12)} Changing commitment · Annual billing</div>
        <h3>Changing commitment</h3>
        <p class="sub-lead" style="font-size:12.5px;color:#555;margin:4px 0 12px">Your new plan starts now. Unused credits are applied as a discount.</p>
        <div class="comm-plans">
          <div class="comm-box cur">
            <div class="comm-lab">Current plan</div>
            <div class="comm-name">Plus · Monthly</div>
            <div class="comm-price">$59.00 / month</div>
          </div>
          <div class="comm-arrow">→</div>
          <div class="comm-box new">
            <div class="comm-lab">New plan</div>
            <div class="comm-name">Plus · Annual</div>
            <div class="comm-price">$47.00 / mo <small>billed $564/yr (−20%)</small></div>
          </div>
        </div>
        <div class="ck-sum">
          <div class="row"><span>Plus Annual (1,200 credits/mo)</span><b>$564.00</b></div>
          <div class="row cr"><span>Prorations: Unused credits (718 cr)</span><b>−$35.30</b></div>
          <div class="row tot"><span>Amount due today</span><b>$528.70</b></div>
          <div class="row dim"><span>New annual cycle starts today (Oct 7, 2026)</span><span>renews at $564 on Oct 7, 2027</span></div>
        </div>
        <div class="ck-keep">${svg('check', 11)}1,200 fresh credits added · 718 rollover credits move to annual pool</div>
        <div class="cta"><span class="p">Confirm Change · Pay $528.70</span><span class="g">Keep Monthly</span></div>
        <div class="legal">By clicking Confirm Change, your new annual cycle starts today. You can change or cancel anytime in Manage Account.</div>
      </div>` },
  },
  {
    id: 'payment-failed', n: 18, title: 'Renewal failed: keep access, fix the card in the app', surface: 5,
    lead: '20–40% of subscription churn is a failed card, not a decision. Today Quadcode has no in-app signal and a card-only checkout. A failed renewal becomes a red banner, a 14-day grace period (the same Past Due window as Higgsfield) and a one-screen fix with Apple Pay or a bank payment.',
    spec: {
      Trigger: 'Stripe <code>invoice.payment_failed</code> on a renewal. Pre-dunning: card-expiry reminder 14 days before renewal.',
      Fires: 'Banner above the chat on every session until paid; can be hidden for 24 hours, not forever. Stripe Smart Retries: 8 tries in 14 days (the default Stripe recommends); email on day 0, 3 and 10.',
      Segment: 'All paid plans.',
      Offer: 'Nothing new to buy: Plus stays for 14 days; update the card or pay with a wallet. Credits and rollover stay.',
      Escape: '"Switch to Free" is a visible link, not hidden.',
      Cap: 'Grace once per 90 days. After day 14 the plan pauses for 30 days instead of cancelling.',
    },
    ev: 'Higgsfield help center: a failed renewal sends a "Complete payment" email with a Stripe Checkout link, and the plan stays Past Due for about 14 days before it is cancelled. Stripe recommends 8 retries within 2 weeks. Involuntary churn is 20–40% of all churn (Paddle; Recurly: 1.25% involuntary vs 2.34% voluntary a month). Stripe Smart Retries alone recover 30–40%; in-app prompts plus a hosted update flow lift recovery to 40–60%.',
    kpi: ['Failed renewals recovered <b>≥ 55%</b>', 'Involuntary churn <b>−40%</b>', 'Median days to recover <b>≤ 2</b>'],
    frame: {
      h: 740, layout: 'wide', plan: 'plus', balance: 718, max: 1200, chips: ['nb', 'sd', 'sa'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      banner: `<div class="inline bad"><span class="ico">${svg('card', 13)}</span><span><b>Plus renewal failed.</b> Card ····4242 declined. Plus stays on until Oct 21.</span><span class="sp"><span class="mini">Fix payment</span></span></div>`,
      overlay: `<div class="md" style="--mw:440px">${X}
        <div class="kick bad">${svg('alert', 12)} Payment failed · Plus stays on until Oct 21</div>
        <h3>Fix payment in one step</h3>
        <p>Nothing is lost: 718 credits, 3 projects and your presets stay. We retry on our own, but a new card works right away.</p>
        <div class="wal"><span class="w apple">${logo('applepay')}</span><span class="w bank">Bank payment</span></div>
        <div class="or-line">or pay with a card</div>
        <div class="cardf"><span>Card number</span><span>MM / YY</span><span>CVC</span></div>
        <div class="cta"><span class="p">Pay $59 and keep Plus</span><span class="g">Remind me tomorrow</span></div>
        <div class="stripe-note">${svg('lock', 10)} Payments secured by ${logo('stripe')}</div>
        <div class="legal">We retry up to 8 times until Oct 21. After that Plus pauses for 30 days; nothing is deleted. <u>Switch to Free</u></div>
      </div>` },
  },
  {
    id: 'credits-expiring', n: 19, title: 'Credits about to expire: turn them into work', surface: 5,
    lead: 'Monthly credits roll over for one month; pack credits last 90 days. Five days before any of them expire, the banner above the chat says how many and what they buy, and Many offers three ideas from the user\'s own projects. Used credits renew plans; forgotten ones cancel them.',
    spec: {
      Trigger: '50 or more credits (rollover or pack) expire within 5 days.',
      Fires: 'Banner once a day for up to 3 days, email once. The ideas card shows with the first banner only.',
      Segment: 'Starter, Plus, Ultra.',
      Offer: '"Use them": three prepared prompts from recent projects. "Keep them": on yearly, credits last 12 months.',
      Escape: 'Close for today.',
      Cap: '3 banners per expiring batch.',
    },
    ev: 'Real Quadcode rule: monthly credits roll over for 1 month, yearly credits last a year. Higgsfield packs expire after 90 days with no reminder, which the research lists as a pattern to avoid. Rollover plus usage nudges is the retention pattern it recommends.',
    kpi: ['Expiring credits used <b>≥ 60%</b>', 'Renewal rate of users with expiring credits <b>+8 pts</b>', 'Banner → yearly <b>≥ 3%</b>'],
    frame: {
      h: 740, layout: 'wide', plan: 'plus', balance: 718, max: 1200, chips: ['nb', 'sd', 'suno'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      banner: `<div class="inline warn"><span class="ico">${svg('clock', 13)}</span><span><b>312 credits expire Oct 12.</b> 6 Seedance clips or 156 images.</span><span class="sp"><span class="mini">Use them</span><span class="mini g">Keep · yearly</span></span></div>`,
      toast: `<div class="toast wide"><span class="x">${svg('x', 11)}</span>
        <div class="k">${svg('zap', 12)} Ideas from your projects</div>
        <h4>Use 312 credits before Oct 12</h4>
        <div class="ideas">
          <div>${mark('sd')} Extend hero-shot by 5 seconds <em>45 cr</em></div>
          <div>${mark('nb')} 4 more key frames, same light <em>8 cr</em></div>
          <div>${mark('suno')} Soundtrack for the launch film <em>6 cr</em></div>
        </div>
        <p>Monthly credits roll over for one month. On yearly they last 12 months.</p>
        <span class="mini">Run all three · 59 cr</span> <span class="mini g">Later</span>
      </div>` },
  },
  {
    id: 'comeback', n: 20, title: 'Plan ended: a welcome-back screen, not a locked app', surface: 8,
    lead: 'When a plan ends, today the user just finds locked models. Instead, the first launch afterwards shows what is safe (projects, frames, presets), what is paused (Plus models, parallel jobs) and one comeback price in dollars, not percent.',
    spec: {
      Trigger: 'First launch 7 or more days after a paid plan ended (cancelled or unpaid).',
      Fires: 'Modal once, then a "Welcome back" ticket in the profile popup for 7 days.',
      Segment: 'Former Starter, Plus and Ultra users. The offer matches the last plan; former Ultra users get Plus as the default.',
      Offer: 'First month back on Plus for $29 instead of $59, or Starter again for $15 a month on yearly. Credits left at cancellation come back with the plan.',
      Escape: '"Continue on Free" is a full-size button; the app keeps working.',
      Cap: 'Once per 90 days; never within 30 days of the cancel-flow save offer (scene 8).',
    },
    ev: 'One in four new subscriptions comes from people who cancelled before (Recurly). Discount-only win-backs bring back 5–12%; dollar offers do about 2× better than percent (SaaSquatch). Showing the user\'s own work beats generic copy.',
    kpi: ['Lapsed users who open the app → back on a plan <b>≥ 10%</b>', 'Returned users still paying at month 3 <b>≥ 50%</b>', 'Refunds <b>&lt; 3%</b>'],
    frame: {
      h: 800, layout: 'wide', plan: 'free', balance: 12, max: 50, chips: ['nb', 'omni', 'sa'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      overlay: `<div class="md" style="--mw:500px">${X}
        <div class="kick">${svg('refresh', 12)} Welcome back, Emil</div>
        <h3>Your work is safe. Plus is paused.</h3>
        <div class="wb-imgs"><img src="${IMG(1)}" alt=""><img src="${IMG(3)}" alt=""><img src="${IMG(5)}" alt=""></div>
        <div class="wb2">
          <div><div class="l">${svg('check', 11)} Kept</div><ul><li>3 projects, 41 key frames, 6 films</li><li>Presets, prompts, history</li><li>184 credits, back with the plan</li></ul></div>
          <div><div class="l p">${svg('pause', 11)} Paused</div><ul><li>Seedance 2.5, Veo 3.1, Sora 2 Pro</li><li>6 parallel sub-agents</li><li>1080p and 4K exports</li></ul></div>
        </div>
        <div class="opts">
          ${opt({ icon: 'rocket', hi: true, t: 'Plus, first month back', b: 'Save $30', bc: 'g', s: '1,200 credits · all models · then $59 a month', pr: '$29', was: '$59' })}
          ${opt({ icon: 'arrowDown', t: 'Starter again', s: '300 credits · Kling, Wan, Seedance Fast', pr: '$15', small: '/mo, yearly' })}
        </div>
        <div class="cta"><span class="p grad">Come back to Plus · $29</span><span class="g">Continue on Free</span></div>
        <div class="legal">One comeback price per 90 days. Cancel any time in Settings.</div>
      </div>` },
  },
  {
    id: 'challenge', n: 21, title: 'Live challenge: a reason to come back this week', surface: 9,
    lead: 'Higgsfield keeps a floating "Live now · $1,000,000 · Join Higgsfield Global Film Festival" card on the generator and a Contests tab in the main menu. Quadcode runs a smaller monthly challenge inside the app: a brief, a prize pool in credits and a gallery. A deadline the user cares about is the fastest way from Free to Plus.',
    spec: {
      Trigger: 'A challenge is live and the user has at least 1 generation.',
      Fires: 'Card in the bottom-right corner at session start while the challenge runs; progress ("2 of 3 shots") updates as the user works.',
      Segment: 'All plans. Free entrants see "Plus −30% during challenge week" in the card.',
      Offer: 'Prize pool 250,000 credits (1st place 100,000). Entry: a 15-second film made in Quadcode. Top 20 are featured in the app.',
      Escape: 'Collapse to a small pill, or hide for this challenge.',
      Cap: 'One challenge a month; the card stops after two dismissals.',
    },
    ev: 'Seen on Higgsfield 23.09: floating "Live now · $1,000,000 · Join Higgsfield Global Film Festival [Learn More]" on the video generator, plus a Contests tab in the main menu. A deadline and a public gallery drive repeat sessions and paid renders.',
    kpi: ['Weekly active creators <b>+15%</b>', 'Entrants → paid <b>≥ 8%</b>', 'Entries per challenge <b>≥ 300</b>'],
    frame: {
      h: 740, layout: 'wide', plan: 'free', balance: 26, max: 50, chips: ['nb', 'omni', 'sa'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      toast: `<div class="toast ch"><span class="x">${svg('x', 11)}</span>
        <div class="k"><span class="live"></span> Live now · 4 days left</div>
        <h4>Quadcode Film Week: 250,000 credits</h4>
        <img class="ch-img" src="${IMG(6)}" alt="">
        <p>Brief: a 15-second product film. 1st place 100,000 credits; the top 20 are featured in the app.</p>
        <div class="prog"><span style="width:66%"></span></div><small class="pg">2 of 3 shots done</small>
        <span class="mini">Open brief</span> <span class="mini g">Plus −30% this week</span>
      </div>` },
  },
);

/* ---------- scenes 22–29: payment paths and popup triggers from the Higgsfield payments audit (23.09) ---------- */
SCENES.push(
  {
    id: 'export-watermark', n: 22, title: 'Export on Free: the watermark sells the plan', surface: 8,
    lead: 'Higgsfield and Runway put a watermark on every Free generation and drop it on any paid plan. Quadcode marks Free exports only and keeps the original clean, so the file the user just made exports clean the moment they upgrade.',
    spec: {
      Trigger: 'A Free user clicks Export or Download on an image, clip or track.',
      Fires: 'Inside the export dialog: the preview shows the small mark, the plan card sits under it.',
      Segment: 'Free plan only. Paid plans never see the mark or the card.',
      Offer: 'Starter removes the mark from every export: $15 a month yearly or $20 monthly, 300 credits a month. This file exports clean right after payment.',
      Escape: '"Export with watermark" is always there, same size and quality.',
      Cap: 'Every Free export; the plan card folds to one line after 3 dismissals.',
    },
    ev: 'Higgsfield help center: on a free account every generation carries a Higgsfield watermark, any paid plan removes it, and there is no setting to switch it off. Runway works the same way. Export is the moment the user already likes the result and wants to post it.',
    kpi: ['Free exports → paid <b>≥ 4%</b>', 'Free upgrades started at export <b>≥ 20%</b>', 'Clean re-export after upgrade <b>≥ 60%</b>'],
    frame: {
      h: 760, layout: 'wide', plan: 'free', balance: 24, max: 50, chips: ['nb', 'omni', 'sa'], sonicCard: false,
      status: 'Lumi: image ready', dot: 'ok',
      overlay: `<div class="md" style="--mw:460px">${X}
        <div class="kick">${svg('image', 12)} Export · keyframe-03.png · 2048 × 2048</div>
        <h3>Post it without the mark</h3>
        <div class="wm-prev"><img src="${IMG(1)}" alt=""><span class="wm">${logo('quadcode')} Made with Quadcode</span></div>
        <div class="opts">
        ${opt({ icon: 'check', hi: true, t: 'Starter', b: 'No watermark', s: 'Every export clean · 300 credits a month · this file too', pr: '$15', small: '/mo yearly', was: '$20' })}
        ${opt({ icon: 'image', t: 'Export with watermark', s: 'Same size and quality, small mark in the corner', pr: 'Free' })}
        </div>
        <div class="cta"><span class="p">Upgrade and export clean</span><span class="g">Export with watermark</span></div>
        <div class="legal">Yearly: $180 today, or $20 monthly. Cancel any time in My Subscription.</div>
      </div>` },
  },
  {
    id: 'auto-refill', n: 23, title: 'Second credit stop in a month: turn on auto-refill', surface: 9,
    lead: 'Higgsfield charges auto-refill at a chosen tier with a threshold, 90-day validity, stopping on plan cancellation. Quadcode adds a separate "Auto-refill credits" counter, tiers at $1 = 18 cr ($20 for 360 cr … $300 for 5,400 cr), spend order (monthly plan first, then packs/refill by earliest expiry date), and email notice before each charge.',
    spec: {
      Trigger: 'A pack is bought after the second out-of-credits stop in 30 days (scene 2), or the user taps "Set up" in the store (scene 7).',
      Fires: 'Receipt toast right after the pack lands. The same switch lives in checkout (scene 11) and My Subscription.',
      Segment: 'Paid plans with a saved card or wallet.',
      Offer: 'Separate "Auto-refill credits" counter. Plus and Ultra only, as in Higgsfield (not on Starter). Threshold: 120 cr on Plus, 300 on Ultra. Amounts at $1 = 18 cr: $20 (360 cr), $40 (720 cr), $90 (1,620 cr), $150 (2,700 cr), $300 (5,400 cr). No monthly cap. A failed charge adds nothing. Order: plan credits first, then earliest expiry. Receipt by email after each charge.',
      Escape: '"Not now". Auto-refill stays off until the user turns it on.',
      Cap: 'Toast twice per 90 days at most.',
    },
    ev: 'Higgsfield help center: auto-refill is off by default, starts below the plan threshold, charges the saved payment method for the chosen amount, the credits last 90 days, and it stops on cancel. Rate $1 = 18 cr, amounts $20 to $300, not on the entry plan, no monthly cap. Order: plan first, then packs/refills by earliest expiry.',
    kpi: ['Pack buyers turning on auto-refill <b>≥ 25%</b>', 'Jobs paused for credits <b>−60%</b>', 'Refunds on refills <b>&lt; 1%</b>'],
    frame: {
      h: 720, layout: 'wide', plan: 'plus', balance: 612, max: 1200, chips: ['nb', 'sd', 'suno'], sonicCard: false,
      status: 'Sonic: rendering shot 3 of 4', dot: 'ok',
      toast: `<div class="toast wide"><span class="x">${svg('x', 11)}</span>
        <div class="k">${svg('refresh', 12)} Auto-refill settings · $1 = 18 cr</div>
        <h4>Auto-refill credits: 0 (Disabled)</h4>
        <div class="tm-rows">
          <div><span>Threshold trigger</span><span>Balance &lt; 10% (120 cr on Plus)</span></div>
          <div><span>Amounts ($1 = 18 cr)</span><span>$20 · $40 · $90 · $150 · $300</span></div>
          <div><span>Spending order</span><span>1) Monthly plan → 2) Earliest expiry</span></div>
          <div><span>Receipt</span><span>By email after every refill</span></div>
          <div class="tot"><span>Charged only below 120 credits</span><span>no monthly cap</span></div>
        </div>
        <div class="toast-rule-box" style="margin:8px 0;padding:6px 8px;background:rgba(241,128,36,.08);border-left:2px solid #f18024;font-size:11px;color:#333">
          ${svg('check', 10)} <b>Order:</b> plan credits are spent first; packs and refills spend by earliest expiry (90 days).
        </div>
        <span class="mini">Enable auto-refill ($40 · 720 cr)</span> <span class="mini g">Custom tier</span>
      </div>` },
  },
  {
    id: 'plan-credits', n: 24, title: 'Split billing paths: instant upgrade with proration vs. deferred downgrade', surface: 5,
    lead: 'Higgsfield separates billing mechanics: Upgrades take effect immediately with unused credits prorated ("Unused credits -$19.35") and reset billing date. Downgrades (like Plus to Starter) hide the junior plan from the top grid — reachable only via the feature compare table — and take effect at the next renewal date with $0 due today while preserving full Plus limits until then.',
    toolbar: `
      <div class="scene-toolbar">
        <span class="stb-label">Scenario steps:</span>
        <div class="stb-group">
          <button class="stb-btn on" data-st="upgrade">1. Instant Upgrade (Prorated)</button>
          <button class="stb-btn" data-st="downgrade">2. Deferred Downgrade ($0 today)</button>
        </div>
      </div>`,
    spec: {
      Trigger: 'Ultra used 85% of monthly credits before day 15, or subscriber clicks upgrade/downgrade.',
      Fires: 'Banner / modal. External scenario toolbar allows comparing instant upgrade vs deferred downgrade.',
      Segment: 'Subscribers. Junior plan (Starter) hidden from top grid for active Plus/Ultra users.',
      Offer: 'Upgrade (Ultra 6,000): $258/mo, prorated credit -$19.35, Due today $238.65, instant reset. Downgrade (Starter): $0 due today, $180 due on Oct 22 renewal, Plus limits kept until renewal; Starter hidden in top grid.',
      Escape: '"Stay on current plan".',
      Cap: 'Once per billing cycle.',
    },
    ev: 'Higgsfield audit: Ultra card has 3k / 6k / 9k slider. Upgrades apply instantly with proration and reset renewal date. Downgrades hide junior plans from top cards (reached only via compare table), take effect at next renewal with Due today $0.00, keeping existing limits until then.',
    kpi: ['Banner → bigger tier <b>≥ 15%</b>', 'Compare table downgrade retention <b>≥ 40%</b>', 'Packs bought by Ultra users <b>−30%</b>'],
    frame: {
      h: 780, layout: 'wide', plan: 'ultra', balance: 450, max: 3000, chips: ['sd', 'veo', 'kling'], sonicCard: false,
      status: 'Sonic: 3 renders in queue', dot: 'ok',
      banner: `<div class="inline warn"><span class="ico">${svg('trend', 13)}</span><span><b>85% of Ultra used on day 14.</b> 450 credits left, about 10 Seedance clips.</span><span class="sp"><span class="mini">Add credits to plan</span></span></div>`,
      overlay: `<div class="md split-tier" style="--mw:480px">${X}
        <div id="st-view-upgrade">
          <div class="kick">${svg('layers', 12)} Upgrading plan · Ultra 6,000 credits</div>
          <h3>Upgrade takes effect immediately</h3>
          <div class="seg3"><span>3,000</span><span class="on">6,000</span><span>9,000</span></div>
          <div class="ck-sum">
            <div class="row"><span>Ultra 6,000 · monthly</span><b>$258.00</b></div>
            <div class="row cr"><span>Proration: 450 unused credits of this cycle</span><b>−$19.35</b></div>
            <div class="row tot"><span>Amount due today</span><b>$238.65</b></div>
            <div class="row dim"><span>New cycle starts today (Oct 7, 2026)</span><span>renews at $258 on Nov 7, 2026 · 4.3¢/cr</span></div>
          </div>
          <div class="ck-keep">${svg('check', 11)}6,000 credits start now · current pack credits stay · 3 queue renders proceed</div>
          <div class="cta"><span class="p">Upgrade to 6,000 · Pay $238.65</span><span class="g">Keep 3,000</span></div>
          <div class="legal">Upgrade applies at once with proration. Pack credits still work on top.</div>
        </div>
        <div id="st-view-downgrade" style="display:none">
          <div class="kick">${svg('arrowDown', 12)} Downgrading plan · Deferred transition</div>
          <h3>Starter is hidden in top grid · Compare table access only</h3>
          <div class="downgrade-callout" style="margin:10px 0;padding:8px 10px;background:#f8f8f8;border-radius:8px;font-size:12px;color:#444">
            ${svg('lock', 11)} Like Higgsfield, junior plans are hidden from the primary plan cards for active subscribers. Downgrade is only reachable via feature comparison table.
          </div>
          <div class="ck-sum">
            <div class="row"><span>Current plan: Plus Monthly</span><b>$59.00 / mo</b></div>
            <div class="row"><span>New plan: Starter Annual (300 cr/mo)</span><b>$180.00 / yr ($15/mo)</b></div>
            <div class="row tot" style="color:#0a8554"><span>Due today (Oct 7, 2026)</span><b>$0.00</b></div>
            <div class="row dim"><span>Due on next renewal date (Oct 22, 2026)</span><span>$180.00</span></div>
          </div>
          <div class="ck-keep">${svg('check', 11)}Your Plus plan (1,200 cr, all video models, 6 sub-agents) stays fully active until Oct 22, 2026.</div>
          <div class="cta"><span class="p" style="background:#555">Confirm Downgrade to Starter</span><span class="g">Keep Plus Plan</span></div>
          <div class="legal">Changes will take effect at your next renewal date. You can cancel or change anytime before Oct 22.</div>
        </div>
      </div>` },
  },
  {
    id: 'team-invite', n: 25, title: 'Invite the team: free seats now, a shared pool later', surface: 7,
    lead: 'Higgsfield puts "+ Add members" at the top of the avatar menu and answers with "Create more, together": Team and Scale plans billed per seat, one credit pool, admin controls. The live Quadcode Monthly plan already shares credits with unlimited users, so the invite stays free and the modal sells the bigger pool a team will need.',
    spec: {
      Trigger: '"+ Add members" in the profile popup, "Share project", or a second sign-in from the same work domain.',
      Fires: 'Modal on click. A domain match shows a toast once.',
      Segment: 'Paid plans. Work-email accounts (scene 14) see Team first.',
      Offer: 'Invites are free and spend from your pool. For 2+ people: Team, $65 per seat a month yearly or $79 monthly, 1,000 credits per seat in one shared pool, 2 to 9 seats, VAT invoices. Scale: $150 per seat, 2,500 credits per seat, 5 to 15 seats, admin spend control and SSO.',
      Escape: '"Invite only" sends the invites and keeps the current plan.',
      Cap: 'Modal on every click; the domain toast once per 30 days.',
    },
    ev: 'Higgsfield: "+ Add members" in the avatar menu opens Team (€65 per seat) and Scale (€150 per seat) with a shared pool, admin spend controls and SSO on Scale. Every teammate spends from the same pool, so revenue per account grows without a new sign-up.',
    kpi: ['Paid accounts with 2+ members <b>≥ 15%</b>', 'Invite → Team <b>≥ 8%</b>', 'Revenue per invited account <b>+40%</b>'],
    frame: {
      h: 760, layout: 'wide', plan: 'plus', balance: 719, max: 1200, chips: ['nb', 'sd', 'suno'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      overlay: `<div class="md" style="--mw:460px">${X}
        <div class="kick">${svg('users', 12)} Create more, together</div>
        <h3>Invite your team</h3>
        <div class="inv"><span>anna@northframe.studio</span><span>mark@northframe.studio</span><em>Add email…</em></div>
        <p>Everyone you invite spends from your 719 credits. From two people, Team gives each seat 1,000 credits in one shared pool.</p>
        <div class="opts">
        ${opt({ icon: 'users', hi: true, t: 'Team', b: '5 seats', s: '5,000 shared credits, 1,000 a seat · shared workspace · VAT invoices', pr: '$65', small: '/seat/mo yearly', was: '$79' })}
        ${opt({ icon: 'user', t: 'Keep Plus', s: '1,200 credits a month, shared with everyone invited', pr: '$47', small: '/mo yearly' })}
        </div>
        <div class="cta"><span class="p">Invite and switch to Team</span><span class="g">Invite only</span></div>
        <div class="legal">Members sign in with Google, Microsoft or email. Remove anyone in one click.</div>
      </div>` },
  },
  {
    id: 'trial-24h', n: 26, title: 'First Plus model: 24 hours free, cancel in one click', surface: 8,
    lead: 'Higgsfield ran it in July 2026: every new user gets 24 hours of unlimited top models, the plan starts on its own after that, and one click inside the 24 hours cancels it for free. Quadcode offers the same day of Plus at the first tap on a Plus model, with a reminder two hours before the charge.',
    spec: {
      Trigger: 'A Free user with at least one generation taps a Plus model (Seedance 2.5, Veo 3.1, Sora 2 Pro).',
      Fires: 'First card of the model gate (scene 1). After the start: countdown in the credit meter, reminder toast and email 2 hours before the charge.',
      Segment: 'Free users who never paid and never had a trial. Card or wallet required.',
      Offer: 'Unlimited Seedance 2.5, Kling 3.0 and Nanobanana Pro for 24 hours at entry resolution, one job at a time, with the Unlimited switch on in the model menu (off = credits). Card up front, then Plus $59 a month, or $47 a month yearly if chosen now. One trial per person and card.',
      Escape: '"Stay on Free" with Gemini Omni Flash preselected.',
      Cap: 'Once per person, device and card.',
    },
    ev: 'Higgsfield, July 2026: 24 hours of unlimited top models for new users, then an automatic paid plan; "cancel in one click inside the first 24 hours and you pay nothing". First Page Sage (86 SaaS companies): trials that take a card up front convert 48.8% to paid vs 18.2% without a card. The reminder keeps disputes on the first charge low.',
    kpi: ['Model gate → trial start <b>≥ 20%</b>', 'Trial → paid <b>≥ 45%</b>', 'Disputes on first charge <b>&lt; 0.5%</b>'],
    frame: {
      h: 760, layout: 'wide', plan: 'free', balance: 26, max: 50, chips: ['nb', 'sd', 'sa'], sonicCard: false,
      status: 'Many: waiting for your choice', dot: 'ok',
      overlay: `<div class="md" style="--mw:450px">${X}
        <div class="kick">${svg('clock', 12)} New here · one time only</div>
        <h3>Try Plus free for 24 hours</h3>
        <p>Unlimited Seedance 2.5, Kling 3.0 and Nanobanana Pro until tomorrow 18:40. One job at a time at entry resolution. Keep Unlimited on in the model menu.</p>
        <div class="tm-rows">
          <div><span>Today 18:40 · Plus starts</span><span>$0</span></div>
          <div><span>Tomorrow 16:40 · reminder in the app and by email</span><span>—</span></div>
          <div class="tot"><span>Tomorrow 18:40 · Plus monthly</span><span>$59</span></div>
        </div>
        <div class="wal"><span class="w apple">${logo('applepay')}</span><span class="w bank">Bank payment</span></div>
        <div class="cta"><span class="p">Start 24 hours free</span><span class="g">Stay on Free</span></div>
        <div class="legal">Cancel in one click in My Subscription before tomorrow 18:40 and pay nothing. Yearly instead: $47 a month.</div>
      </div>` },
  },
  {
    id: 'new-model', n: 27, title: 'New model day: launch price for 72 hours', surface: 5,
    lead: 'Higgsfield adds a new top model within about a day of its release, with a banner, a NEW badge in the picker and a lower launch price in credits. Quadcode turns each launch into a 72-hour event: banner, NEW badge, crossed price on Send and sample shots made by the team.',
    spec: {
      Trigger: 'A new model goes live in Quadcode (same day as the vendor release).',
      Fires: 'Banner above the chat in the first session after launch; NEW badge in the picker for 14 days; crossed price on Send for 72 hours.',
      Segment: 'Everyone. Plans that include the model get the launch price; others see the plan or trial that opens it (scenes 1 and 26).',
      Offer: 'Veo 3.1 for 30 credits instead of 40 until Friday 18:00. Four sample clips and one click to try it on the current keyframe.',
      Escape: 'Hide the banner; the badge stays in the picker.',
      Cap: 'One launch banner a week.',
    },
    ev: 'Seen on Higgsfield 23.09: NEW badges in the model picker and a crossed credit cost on Generate (80 → 60). Research log: new top models get their own SKU and banner within 24 hours. A launch is the cheapest reason to open the app again and to try a higher plan.',
    kpi: ['Users trying the new model in 72 h <b>≥ 25%</b>', 'Gate → upgrade during launch <b>≥ 6%</b>', 'Returning users on launch day <b>+20%</b>'],
    frame: {
      h: 740, layout: 'wide', plan: 'plus', balance: 719, max: 1200, chips: ['nb', 'veo', 'sa'], sonicCard: false,
      status: 'Many: ready', dot: 'ok', send: { label: 'Send', cost: '<s>40</s> 30 cr' },
      banner: `<div class="inline"><span class="ico">${svg('zap', 13)}</span><span><b>Veo 3.1 is live.</b> 30 credits instead of 40 until Friday 18:00.</span><span class="sp"><span class="mini">Try it</span></span></div>`,
      toast: `<div class="toast ch"><span class="x">${svg('x', 11)}</span>
        <div class="k"><span class="live"></span> New today · launch price for 72 h</div>
        <h4>Veo 3.1 is in Quadcode</h4>
        <img class="ch-img" src="${IMG(2)}" alt="">
        <p>Native audio, 8-second shots, 1080p. Try it on keyframe-03 for 30 credits.</p>
        <span class="mini">Try on keyframe-03</span> <span class="mini g">See 4 samples</span>
      </div>` },
  },
  {
    id: 'month-recap', n: 28, title: 'Three days before renewal: what this month made', surface: 9,
    lead: 'Higgsfield shows "Your Rewind" and "Your plan includes 1/15 · Unused from your subscription" with a Show button per feature. Quadcode sends the same recap three days before the charge: what the user made, what it cost per piece, and one included feature not tried yet.',
    spec: {
      Trigger: '3 days before a monthly renewal (14 days before a yearly one), if the user generated at least once this cycle.',
      Fires: 'Toast at session start; the full recap opens in My Subscription (scene 10).',
      Segment: 'All paid plans.',
      Offer: 'Nothing to buy. 42 images, 6 clips and 1 film; 214 credits used, 86 carry over; 41¢ per piece. Not tried yet: Seedance 2.5 Fast drafts at 12 credits.',
      Escape: 'Close; the recap stays in My Subscription.',
      Cap: 'Once per billing cycle.',
    },
    ev: 'Higgsfield subscription page 23.09: "Your Rewind · 22 generations" and "Your plan includes 1/15 · Unused from your subscription" with 14 Show buttons. A reminder of what was made, right before the charge, cuts cancellations and refund requests; one more feature tried raises usage, and usage predicts renewal.',
    kpi: ['Renewal after recap <b>+5 pts</b>', 'Unused feature tried <b>≥ 20%</b>', 'Refund requests on renewal <b>−30%</b>'],
    frame: {
      h: 720, layout: 'wide', plan: 'starter', balance: 86, max: 300, chips: ['nb', 'kling', 'suno'], sonicCard: false,
      status: 'Many: ready', dot: 'ok',
      toast: `<div class="toast wide"><span class="x">${svg('x', 11)}</span>
        <div class="k">${svg('history', 12)} Your October · Starter renews Oct 22</div>
        <h4>42 images, 6 clips, 1 film</h4>
        <div class="rc-imgs"><img src="${IMG(1)}" alt=""><img src="${IMG(3)}" alt=""><img src="${IMG(5)}" alt=""></div>
        <div class="tm-rows">
          <div><span>Credits used</span><span>214 of 300</span></div>
          <div><span>Carry over to October</span><span>86</span></div>
          <div class="tot"><span>Cost per piece</span><span>41¢</span></div>
        </div>
        <p>Not tried yet: Seedance 2.5 Fast drafts at 12 credits, the cheapest way to test a shot before the final render.</p>
        <span class="mini">Try a draft</span> <span class="mini g">Open full recap</span>
      </div>` },
  },
  {
    id: 'referral', n: 29, title: 'Referral vs Creator Affiliate — two-track reward system', surface: 9,
    lead: 'Higgsfield separates B2C creator referrals from its Creator Affiliate program: friends get up to 60% off through a link that stays open 24 hours, and you earn 3 / 5 / 7 days of Unlimited Seedance 2.5 passes for 1 / 2 / 3 friends; creators earn up to 25% recurring CASH commission for 12 months with a 3-hour 50% discount window for their audience, managed at ../affiliate/index.html.',
    spec: {
      Trigger: 'A paid user exports or shares a finished piece, or taps "Invite" / "Affiliate" in the profile popup.',
      Fires: 'Toast after export; permanent entry points in avatar menu (Scene 7).',
      Segment: 'Track 1 (Referral): Plus and higher, not Starter, as in Higgsfield. Track 2 (Affiliate): creators and partners.',
      Offer: 'Track 1 (Higgsfield ran it Jul 1–16, 2026): only Plus and higher can invite. Friend gets up to 60% off through a 24-hour link. A friend counts after buying Plus monthly or higher and running one credit-paid generation. Inviter gets 3 / 5 / 7 days Unlimited Seedance 2.5 at 720p for 1 / 2 / 3 friends. Track 2: Up to 25% cash recurring for 12 mos, audience gets 50% OFF (3h window), paid via Stripe/Bank at ../affiliate/index.html.',
      Escape: 'Close; no repeat for 14 days.',
      Cap: 'Referral: up to 3 counted friends (7 days max); the link can\'t be recreated after 24 hours. Affiliate payouts in real money, not credits.',
    },
    ev: 'Higgsfield audit: separates B2C referral (Unlimited pass rewards) from creator Affiliate program ("New" in avatar menu, up to 25% cash recurring 12 months, 3h 50% audience promo). Schmitt et al.: referred customers churn 18% slower and have 16% higher LTV.',
    kpi: ['Exports → invite sent <b>≥ 12%</b>', 'Invited sign-ups → paid <b>≥ 8%</b>', 'Affiliate revenue share <b>≥ 15%</b>'],
    frame: {
      h: 760, layout: 'wide', plan: 'plus', balance: 640, max: 1200, chips: ['nb', 'sd', 'suno'], sonicCard: false,
      status: 'Sonic: film exported', dot: 'ok',
      toast: `<div class="toast wide ref-tracks-toast"><span class="x">${svg('x', 11)}</span>
        <div class="k">${svg('gift', 12)} Two ways to earn with Quadcode AI</div>
        <h4>In-app Creator Referral vs. Affiliate Partner</h4>
        <div class="ref-tracks">
          <div class="ref-track inapp">
            <div class="rt-head"><b>Track 1 · In-app Referral</b><span class="pill">Creator passes</span></div>
            <p>Friend gets <b>up to 60% off</b> via your link (open 24 hours). You earn Unlimited passes on flagship Seedance 2.5:</p>
            <ul class="ref-tier-list">
              <li><span>1 friend:</span> <b>3 days Unlimited Seedance 2.5</b></li>
              <li><span>2 friends:</span> <b>5 days Unlimited Seedance 2.5</b></li>
              <li><span>3 friends:</span> <b>7 days Unlimited Seedance 2.5 (Max)</b></li>
            </ul>
            <div class="ref-box"><span>quadcode.ai/r/emil-k7</span><b>Copy link</b></div>
          </div>
          <div class="ref-track aff">
            <div class="rt-head"><b>Track 2 · Affiliate Program</b><span class="pill green">Real cash</span></div>
            <p>Earn <b>up to 25% recurring CASH commission</b> for 12 months. Your audience gets a <b>3-hour window with 50% OFF</b>.</p>
            <div class="aff-perks">
              <div>${svg('check', 10)} Monthly cash payouts via Stripe / Bank</div>
              <div>${svg('check', 10)} Real money, not platform tokens</div>
            </div>
            <a class="mini p" href="../affiliate/index.html" style="display:inline-block;text-align:center;text-decoration:none;margin-top:10px">Open Affiliate Portal ${svg('right', 10)}</a>
          </div>
        </div>
        <div class="toast-rule-box" style="margin-top:8px;font-size:11px;color:#555">
          Friend invite active · Affiliate dashboard accessible via account menu.
        </div>
      </div>` },
  },
);

/* ---------- render: today's funnel audit (read from the live quadcode.ai code, 23.09.2026) ---------- */
// [icon, title, what the live product does today, fix label, link]
const LEAKS = [
  ['search', 'No public price', '<code>quadcode.ai/pricing</code> is a 404 and <code>/profile/plans</code> sends signed-out visitors to the home page. Ad and search traffic never sees a price.', 'Public pricing page', '../pricing/index.html'],
  ['globe', 'Every paid button leaves the app', 'The upgrade banner and the "Insufficient credits" banner open the plans page in the browser. The buyer switches window, signs in again and leaves the job behind.', 'Scene 11 · in-app checkout', '#s-checkout'],
  ['card', 'Card only', 'Checkout uses the legacy Stripe card field. No Apple Pay or bank payment — every buyer types 16 digits.', 'Scene 11 · wallets first', '#s-checkout'],
  ['refresh', 'Upgrading looks like paying twice', 'Switching plans cancels the current subscription and charges the full new price. No credit for unused days is shown.', 'Scene 11 · proration line', '#s-checkout'],
  ['ban', 'Cancel in one click, nothing offered', '"Keep subscription | Yes, cancel". No pause, no cheaper plan, no question why — the reason is saved as "Change plan" for everyone.', 'Scenes 8 and 10', '#s-win-back'],
  ['gift', 'The Free card sells promo codes', 'Free plan copy reads "Credits can be obtained via a promo code". The one place a free user looks for credits points away from buying.', 'Scenes 1–2 · offer in context', '#s-model-gate'],
  ['target', 'Ads learn the wrong value', 'The ad pixel sends a fixed $20 for monthly and $180 for yearly. Once Plus and Ultra launch, a $129 sale is reported as $20.', 'Send the real amount · one-line fix', null],
];

function renderAudit() {
  $('#leaks').innerHTML = LEAKS.map(([ic, t, today, fix, href], i) => `
    <li class="leak">
      <div class="lk-h"><span class="lk-ic">${svg(ic, 15)}</span><span class="lk-n">${String(i + 1).padStart(2, '0')}</span></div>
      <b>${t}</b>
      <p>${today}</p>
      ${href ? `<a class="lk-fix" href="${href}">${fix}${svg('right', 12)}</a>` : `<span class="lk-fix off">${fix}</span>`}
    </li>`).join('') + `
    <li class="leak live">
      <div class="lk-h"><span class="lk-ic">${svg('coins', 15)}</span><span class="lk-n">Live now</span></div>
      <b>What we sell today</b>
      <div class="lp"><span>Monthly</span><b>$20</b></div>
      <div class="lp"><span>Yearly</span><b>$180<small>$15 / mo · −25%</small></b></div>
      <p>Monthly credits roll over for one month; yearly credits expire after a year. The new pricing page keeps $20 as Starter and adds Plus and Ultra above it.</p>
    </li>`;
  // today's path vs the new path, step by step
  const step = (ic, t, bad) => `<li class="${bad ? 'bad' : ''}"><span>${svg(ic, 13)}</span>${t}</li>`;
  $('#pathToday').innerHTML = [
    step('zap', 'Upgrade'), step('globe', 'Browser opens', 1), step('shield', 'Sign in again', 1),
    step('search', 'Find the plan', 1), step('card', 'Type the card', 1), step('refresh', 'Find the job again', 1),
  ].join('');
  $('#pathNew').innerHTML = [
    step('zap', 'Upgrade'), step('card', 'Apple Pay · card · bank'), step('play', 'Job starts'),
  ].join('');
}

/* ---------- render: map ---------- */
function renderMap() {
  $('#mapFrame').innerHTML = frame({
    h: 720, plan: 'free', balance: 38, max: 50, chips: ['nb', 'sa', 'sd'], prompt: 'Animate keyframe-03 as the hero shot: slow-motion dust, anamorphic flare drift, 5 s.',
    send: { label: 'Send', cost: '45 cr' }, blurLast: true, sonicState: 'lock', sonicNote: 'Seedance 2.5 requires Plus', status: 'Sonic: waiting for model access',
    banner: `<div class="inline"><span class="ico">${svg('zap', 13)}</span><span><b>38 credits left</b> — 19 Nanobanana images or 4 Gemini Omni clips.</span><span class="sp"><span class="mini">Top up</span></span></div>`,
    toast: `<div class="toast"><span class="x">${svg('x', 11)}</span><div class="k">${svg('gift', 11)} Personal offer</div><h4>30% off Plus for your first year</h4><p>Code WELCOME30 · expires in 23:41:09</p><span class="mini">Claim</span></div>`,
    hotspots: SURFACES.map(s => ({ n: s.n, x: s.x, y: s.y })),
  });
  // Title-bar dots follow the real element: the bar switches to compact mode in narrow frames (container query).
  const mapApp = $('#mapFrame .app');
  // An anchor may match several elements (the three media chips) — the dot goes to the centre of their union.
  const unionRect = els => els.map(e => e.getBoundingClientRect()).reduce((u, r) => ({
    left: Math.min(u.left, r.left), top: Math.min(u.top, r.top), right: Math.max(u.right, r.right), bottom: Math.max(u.bottom, r.bottom),
  }));
  const placeAnchored = () => SURFACES.filter(s => s.a).forEach(s => {
    const els = $$(s.a, mapApp), hs = $(`#mapFrame .hs[data-hs="${s.n}"]`);
    if (!els.length || !hs || !hs.offsetParent) return;
    const u = unionRect(els), p = hs.offsetParent.getBoundingClientRect();
    if (!p.width) return;
    const r = { left: u.left, top: u.top, width: u.right - u.left, height: u.bottom - u.top };
    // Pin sits on the element's right edge (or left with side:'l'), vertically centred — the label stays readable.
    // .hs is positioned by its top-left corner, so shift by half its size.
    const px = s.side === 'l' ? r.left : r.left + r.width;
    hs.style.left = ((px - hs.offsetWidth / 2 - p.left) / p.width * 100).toFixed(1) + '%';
    hs.style.top = ((r.top + r.height / 2 - hs.offsetHeight / 2 - p.top) / p.height * 100).toFixed(1) + '%';
  });
  placeAnchored();
  new ResizeObserver(placeAnchored).observe(mapApp);
  $('#mapLegend').innerHTML = SURFACES.map(s => `<li data-hs="${s.n}"><span class="n">${s.n}</span><div><b>${s.t}</b><span>${s.s}</span><br><span class="when">${s.when}</span></div></li>`).join('');
  const setOn = (n) => { $$('[data-hs]').forEach(el => el.classList.toggle('on', el.dataset.hs === String(n))); };
  $$('#map [data-hs]').forEach(el => { el.addEventListener('mouseenter', () => setOn(el.dataset.hs)); el.addEventListener('click', () => setOn(el.dataset.hs)); });
  setOn(1);
}

/* ---------- render: scenes ---------- */
function renderScenes() {
  const protoLinks = {
    2: { url: '../app-states/index.html', label: '▶ Open in States Prototype (State 3 & 10 · Out of credits)' },
    11: { url: '../app-states/index.html', label: '▶ Open in States Prototype (State 6 & Step 5 · Checkout)' },
    14: { url: '../app-states/index.html', label: '▶ Open in States Prototype (State 1 & 4 · Welcome Gift)' },
  };

  $('#sceneNav').innerHTML = SCENES.map(s => `<a href="#s-${s.id}"><i>${s.n}</i>${s.title}</a>`).join('');
  $('#scenes').innerHTML = SCENES.map(s => `
    <article class="scene" id="s-${s.id}">
      <div class="frame">
        ${s.toolbar ? s.toolbar : ''}
        ${frame(s.frame)}
      </div>
      <aside class="spec">
        <div class="sc1">
          <span class="num"><i>${s.n}</i>${s.surface ? `Surface ${s.surface} · ${SURFACES[s.surface - 1].t}` : s.surfaceLabel}</span>
          <h3>${s.title}</h3>
          <p class="lead">${s.lead}</p>
          ${protoLinks[s.n] ? `<a class="proto-link-badge" href="${protoLinks[s.n].url}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:rgba(241,128,36,0.12);color:#ea580c;border:1px solid rgba(241,128,36,0.3);padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;margin-top:8px;text-decoration:none">${protoLinks[s.n].label}</a>` : ''}
        </div>
        <div class="sc2"><dl>${Object.entries(s.spec).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></div>
        <div class="sc3">
          <div class="ev">${svg('trend', 15)}<span>${s.ev}</span></div>
          <div class="kpi">${s.kpi.map(k => `<span>${k}</span>`).join('')}</div>
        </div>
      </aside>
    </article>`).join('');
}

/* ---------- render: offer logic ---------- */
function renderLogic() {
  const rows = [
    ['nb',    'Image · Nanobanana Pro',   'Included on Free (10/day)', '<span class="pill g">No gate</span> Upsell after result: 4K tile · "Animate with Seedance"', '7-day Nanobanana pass · $23'],
    ['sd',    'Video · Seedance 2.5',     'Plus',                       '<span class="pill">Plus · $47</span> then 7-day pass $65, then Wan 2.7 free alt', 'Seedance pass 3 d $35 / 7 d $65'],
    ['veo',   'Video · Veo 3.1 / Sora 2', 'Plus',                       '<span class="pill">Plus · $47</span> then Gemini Omni Flash free alt', '—'],
    ['wan',   'Video · Wan 2.7 / Kling',  'Starter',                    '<span class="pill b">Starter · $15</span> then Gemini Omni Flash free alt', 'Wan pass 7 d · $29'],
    ['suno',  'Audio · Suno v5 / ElevenLabs', 'Starter',                '<span class="pill b">Starter · $15</span> then Stable Audio 3 free alt', '—'],
    ['opus',  'LLM · Opus 5.5',           'Plus',                       '<span class="pill">Plus · $47</span> popover, keep Sonnet 5', '—'],
    ['fable', 'LLM · Fable 5.1 / GPT-6',  'Ultra',                      '<span class="pill v">Ultra · $99</span> popover, keep Opus (Plus) or Sonnet', '—'],
  ];
  $('#modelMatrix').innerHTML = `<tr><th>Selected</th><th>Min plan</th><th>Headline → fallback</th><th>Pass</th></tr>` +
    rows.map(r => `<tr><td><span class="m">${mark(r[0])}${r[1]}</span></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('');

  const seg = [
    ['Free',    '$47/mo Plus <small>strike $59 · code −30% once</small>', 'Packs unlock with any plan <small>store opens on Upgrade Plan</small>', 'Daily free 10 cr · streak bonus day 3/7'],
    ['Starter', 'Plus $47 <small>"save $144/yr" line</small>', 'Packs $6–$250 <small>7 packs · Most popular 4,000</small>', 'Annual switch card at 2nd renewal'],
    ['Plus',    'Ultra $99 <small>credit selector 3k/6k/9k</small>', 'Packs $6–$250 <small>+ Boost speed +4 to +16 jobs</small>', '1-month rollover · win-back on cancel'],
    ['Ultra',   'Team $65 a seat <small>2 to 9 seats · shared pool</small>', 'Packs $105–$250 <small>slider to 25k · Boost speed</small>', 'Passes only for new models'],
  ];
  $('#segmentMatrix').innerHTML = `<tr><th>Segment</th><th>Upgrade shown</th><th>Top up shown</th><th>Retention lever</th></tr>` +
    seg.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('');

  const gaps = [
    ['Balance hidden in the profile popup ("Balance: 25.50 QCC")', 'Credit meter in the title bar, amber under 20%, red at zero'],
    ['Subscription banner with 4 generic cases and a permanent "−25% limited time" pill', 'Contextual one-liner (low balance / 402 / day 3) and exactly one honest timer per account'],
    ['HTTP 402 → "Insufficient credits" banner, job lost', 'Pre-flight cost check → modal with the shortfall, job paused and auto-resumed'],
    ['CTA sends the user to quadcode.ai/profile/plans in the browser', 'Checkout inside the app: plan, pass or pack in one modal'],
    ['Every model available to every plan; no badges', 'Plan badges on media chips and LLM rows; gate opens at selection'],
    ['One way to pay: "Deposit"', 'One store, three tabs: plans, packs $6–$250, Unlimited passes from $5. Plus Boost speed and a Usage page in money'],
    ['Currency shown with decimals (9.2 QCC per image)', 'Whole credits everywhere, translated into outcomes ("= 19 images")'],
  ];
  $('#gapList').innerHTML = gaps.map(g => `<li><span class="was">${svg('x', 12, 2.5)}${g[0]}</span><span class="now">${svg('check', 12, 3)}${g[1]}</span></li>`).join('');

  // ---- Verified on Higgsfield (23–24.09.2026, logged-in Plus session & docs) ----
  const verified = [
    ['1 · Model gate', 'Composer "Unlimited" toggle → pass modal for the selected model (1/3/7-day, 7-day preselected, strikethrough anchor)', 'GPT Image 2.0: €30 / €90→€70 / €210→€135. Seedance 2.5: €180 / €540→€420 (22% off) / €1,260→€810 (36% off)'],
    ['2 · Out of credits', 'Store modal "Upgrade plan or buy credits" — tabs Top-up Credits (preselected) · Unlimited Models · Upgrade Plan; Auto-refill banner', 'Live: 7 packs (€6–€250), Unlimited Models tab as escape. [Help Center / video: generation blocked if cost > balance, opening store]'],
    ['3 · Low-balance banner', 'Site-wide yellow bar with tier-above offer; persistent auto-refill banner on Subscription and Usage pages', 'Live: "Auto-refill is disabled · Enable to automatically top up credits when running low [Set-up & Enable]" on both account pages'],
    ['4 · Result upsell', 'Result detail view: one lime CTA "Turn to video" above grey Recreate / Reference / Download', 'Cross-sell into the most expensive product right after a 2-credit image'],
    ['5 · Personal offer', 'Home carousel "API: Launch offer — up to 50% off through tomorrow"; header pill "Upgrade · 30% OFF"; /pricing exit-intent: 62% OFF timer', 'Deadline copy, no fake countdown; /pricing exit modal has 07:58 timer, closes to 05:30 sticky banner dropping Plus to €32/mo and Ultra to €63/mo (−50%)'],
    ['6 · Model picker gate', 'Generate button always carries the price ("Generate · 2 credits"); video composer shows model · 1080p · 30s + "Unlimited mode" switch', 'No hard locks for Plus — gating is done by price and by the Unlimited switch'],
    ['7 · Profile store', 'Avatar menu: "Plus Plan · Credits 718 left" dotted bar + three Get rows: Top-up credits · Boost speed · Unlimited models', 'Boost speed = "Generate up to 3× faster": +4/+8/+12/+16 parallel, 500–3,000 boost credits, "Buy for €97 €134"'],
    ['8 · Win-back', 'Show → Cancel Subscription → 5 screens: delay "Remind me in 22 days" → loss calculator $57.44 / 718 credits / 359 generations → survey 6 reasons → text feedback → offer 25% OFF for 2 months', 'Button "Confirm & cancel" appears only on screen 5. Exit back / dismiss keeps subscription active with 718 credits intact.'],
    ['9 · Unlimited switch', 'Composer: "Unlimited" switch beside the model → pass modal for that model only. 1 / 3 / 7-day, 7-day preselected, 1-day × days struck through, "2 concurrent" stated', 'Seen for GPT Image 2.0 (image) and as "Unlimited mode" in the Seedance 2.5 video composer; batch and prompt survive the modal'],
    ['10 · My Subscription', 'Manage Account → Subscription: "Your plan renews Oct 15" first, 8-item checklist with exactly one cross, credit bar 719 / 1,200, auto-refill twice, "+$0 saved in total", Your Rewind, "Your plan includes · 1/15"', 'We keep the structure and move pause · switch · cancel to a visible footer instead of hiding them behind "Show"'],
    ['11 · In-app checkout', 'Every Get and Upgrade opens one full-screen store modal inside the product ("Upgrade plan or buy credits"): tabs, pack grid, pass modal — the buyer never leaves the page', 'We copy the in-app sheet 1:1 (Apple Pay first, then card and bank payment) and add a proration line and the queued job that starts on payment'],
    ['12 · Boost speed', 'Store row "Boost speed [Get]" opens "Generate up to 3× faster with more parallel generations": boost credit balance, video and image concurrency with the added jobs shown', '+4 / +8 / +12 / +16 parallel, 500–3,000 boost credits (1,000 preselected), "Buy for €97 €134", How it works. Ours: same controls, limits shown as "6 → 14 jobs"'],
    ['13 · Usage', 'Settings → Usage "Spend overview": €19.18 total cost · 479.5 credits spent · 4 features used · 20 total generations, share per model', 'Auto-refill "Disabled · Set up & enable", concurrency boost row, history "2 credits · Nano Banana Pro · Spent". Ours adds the run-out forecast with Upgrade and Top up'],
    ['14 · Welcome', 'Guest top bar "Get an additional discount on premium plans after signing up"; sign-up modal led by "Sign in with business email & Get 50 credits"', 'Desktop sign-in: work email +50 credits first, welcome gift +20% credits on the first purchase for 7 days, three one-click starters'],
    ['15 · Model shelf', 'Generate button "80 → 60" credits; picker with TOP / NEW badges, resolution chips and a 480p Draft variant', 'The media chip opens the same shelf; locked rows open scene 1; one promoted model a week at its real regular price'],
    ['16 · Pack to plan', 'Packs sold only on top of an active plan; pack credits valid 90 days, spend after monthly credits by earliest expiry', '[Help Center] After a cancel, unused pack credits stay and work on Free plan models (one older article says they lock until you reactivate). Subscriptions offer substantially lower cost per credit'],
    ['17 · Change commitment', 'Pricing page: "Change Commitment" on Plus card (€59 → €47/mo yearly, 20% OFF); modal prorates unused credits', 'Live modal: "Unused credits -€33.53", net "Amount due today: €530.47", annual cycle starts immediately with credit carry-over'],
    ['18 · Payment failed', 'Help center: "Complete payment" email with a Stripe Checkout link; the plan stays Past Due for about 14 days, then cancels', 'Red banner, 14-day grace, 8 Stripe retries, Apple Pay and bank payment added to the card-only checkout'],
    ['19 · Credits expiring', 'Packs expire after 90 days; no reminder seen', 'Banner 5 days before rollover or pack credits expire, three ideas from the user\'s projects, yearly keeps credits 12 months'],
    ['20 · Welcome back', 'Not visible from an active subscription', 'Kept / paused lists with the user\'s own frames, one comeback price in dollars, once per 90 days'],
    ['21 · Live challenge', 'Floating "Live now · $1,000,000 · Join Higgsfield Global Film Festival" card and a Contests tab', 'Quadcode Film Week: 250,000-credit pool, progress in the card, Plus −30% for entrants'],
    ['22 · Export watermark', 'Help center: every Free generation carries a Higgsfield watermark, any paid plan removes it, no toggle', 'Mark on Free exports only, original kept clean, so the same file exports clean right after upgrading'],
    ['23 · Auto-refill', 'Live: off by default, separate "Auto-refill credits: 0" counter on Subscription page, setup banner in store and usage', '[Help Center] Triggers below plan balance threshold; fixed tiers ($20/360 cr … $300/5,400 cr at $1 = 18 cr); 90-day validity; earliest expiry spend'],
    ['24 · Bigger tier', 'Ultra card slider 3k/6k/9k; upgrade prorates unused credits immediately; downgrade to Starter hidden in top grid, found in compare table', 'Live upgrade modal: "Unused credits -€33.53", net €722.47 today; downgrade modal: effective next renewal, "Due today €0"'],
    ['25 · Team invite', 'Avatar menu: "+ Add members" at the very top above credits progress bar', 'Live: opens "Create more, together" with Team (€65/seat) & Scale (€150/seat), shared pool and admin controls'],
    ['26 · 24-hour trial', 'July 2026: 24 h of unlimited top models for new users, then a paid plan; one click inside 24 h cancels for free', 'One day of Plus at the first Plus-model tap, card or wallet up front, reminder 2 h before the $59 charge'],
    ['27 · New model day', 'NEW badges in the picker, crossed cost on Generate (80 → 60), new top models live within about 24 h', 'Veo 3.1 at 30 credits instead of 40 for 72 h, banner once, NEW badge for 14 days'],
    ['28 · Month recap', 'Subscription page: "Your Rewind · 22 generations" and "Your plan includes 1/15 · Unused from your subscription"', 'Toast 3 days before renewal: pieces made, cost per piece, one unused feature'],
    ['29 · Referral', 'Avatar menu: "Affiliate program (New)" → dedicated affiliate portal with cash commission; [Help Center] in-app referral program', 'Live affiliate: up to 25% cash commission for 12 mos, 3-hour 50% discount window for referrals. [Help Center: 1/2/3 friends → 3/5/7 days Unlimited Seedance]'],
  ];
  $('#verifiedMap').innerHTML = `<thead><tr><th>Our scene</th><th>Their surface</th><th>Detail</th></tr></thead><tbody>` +
    verified.map(v => `<tr><td><b>${v[0]}</b></td><td>${v[1]}</td><td class="dim">${v[2]}</td></tr>`).join('') + `</tbody>`;

  // [title, what we saw, where it lives now: 'Scene N' or 'Backlog']
  const fresh = [
    ['Unlimited switch beside the model', 'Per-model 1 / 3 / 7-day pass straight from the composer; 7-day preselected, 1-day × days struck through; batch and prompt survive', 'Scene 9'],
    ['Subscription page as a retention screen', '"Your plan renews Oct 15" · 8-item checklist with one cross ("Lowest cost per credit") that only Ultra fixes · credit bar 719 / 1,200', 'Scene 10'],
    ['Auto-refill, offered twice', '"Auto-refill is disabled — enable to automatically top up credits when running low [Set-up & Enable]" on Subscription and on Usage', 'Scene 10'],
    ['Value counters', '"6 models currently unlimited · 0 free generations · +$0 saved in total" — shows what the plan already gave you', 'Scene 10'],
    ['Your Rewind', 'Wrapped-style cards: "23 generations so far — and you\'re still just getting started", top model, locked "Your video generations"', 'Scene 10'],
    ['Feature adoption checklist', '"Your plan includes · 1/15" — used vs. unused features, each with a Show button; drives usage before renewal', 'Scene 10'],
    ['Cross-sell CTA on every result', '"Turn to video" as the single highlighted action after an image — ours: "Animate with Sonic" / "Ship with Cody"', 'Scene 4'],
    ['Usage page in money', '"€19.18 total cost · 479.5 credits · 4 features · 20 generations" + share bar per model → bridge to "Unlimited is cheaper for this model"', 'Backlog'],
    ['Parallelism as a product', 'Boost speed sells concurrency (+4…+16) and boost credits separately from plans — our analogue: "Run 4 agents at once"', 'Backlog'],
    ['5-screen retention flow on cancellation', 'Live: Show → Cancel Subscription → 5 screens: delay "Remind me in 22 days" → loss calculator $57.44 / 718 credits / 359 generations → survey 6 reasons → text feedback → offer 25% OFF for 2 months. Button "Confirm & cancel" appears only on screen 5', 'Scene 8'],
    ['Change commitment with instant proration', 'Live: "Change Commitment" button on current plan card; modal subtracts unused credits ("Unused credits -€33.53"), charges net €530.47, annual starts now', 'Scene 17'],
    ['Split billing: Instant upgrade vs. deferred downgrade', 'Live: Ultra slider upgrades instantly with credit proration; downgrade to Starter is hidden from top grid, found only in compare table, applies at next renewal with Due today €0', 'Scene 24'],
    ['Unlimited pass as zero-balance escape', 'Live: Store modal preselects Top-up Credits (7 tiers €6–€250) but offers "Unlimited Models" tab as direct alternative to credit packs; [Help Center / video: generation blocked if insufficient credits]', 'Scene 2'],
    ['Low-balance contextual banner rotation', 'Live: Site-wide yellow bar rotates tier-above passes ("Unlimited Seedance 2.5 with 30% OFF"); persistent auto-refill banner on Subscription & Usage', 'Scene 3'],
    ['Pack credits freeze on cancel & earliest expiry', '[Help Center] Packs require active plan; credits last 90 days and spend after plan credits; on cancel, pack credits freeze for remainder of 90 days until resubscribed', 'Scene 16'],
    ['Auto-refill threshold and dedicated balance', 'Live: separate "Auto-refill credits: 0" counter on Subscription page; [Help Center] auto-refill triggers below threshold, $1 = 18 cr tiers ($20–$300), spent by earliest expiry', 'Scene 23'],
    ['Team member invite in avatar menu header', 'Live: "+ Add members" sits prominently at the top of the avatar menu, leading to Team & Scale shared-pool plans with admin controls', 'Scene 25'],
    ['Two-track referral: B2B cash affiliate vs. B2C passes', 'Live: avatar menu "Affiliate program (New)" pays up to 25% cash for 12 mos with 3h 50% discount window; [Help Center] in-app referral pays 3/5/7 days Unlimited Seedance', 'Scene 29'],
    ['Exit-intent discount with personal countdown', 'Live: leaving /pricing triggers overlay: "62% OFF DISCOUNT · 07:58 LEFT"; closes to 5:30 sticky banner, dropping Plus to €32/mo and Ultra to €63/mo (50% off)', 'Scene 5'],
  ];
  $('#newMechanics').innerHTML = fresh.map(f => `<li><span class="now">${svg('plus', 12, 3)}<b>${f[0]}</b><span class="tag ${f[2] === 'Backlog' ? 'bl' : ''}">${f[2]}</span></span><span class="was dimtxt">${f[1]}</span></li>`).join('');

  $('#packsCard').innerHTML = `<div class="card-h"><span class="ico">${svg('coins', 15)}</span>Credit packs</div>
    <ul class="ladder">${PACKS.map(p => `<li class="${p.hi ? 'hi' : ''}"><span><b>${p.cr.toLocaleString('en-US')} credits</b>${p.lab ? `<span class="lab">${p.lab}</span>` : ''}</span><span class="rate">${(p.usd / p.cr * 100).toFixed(1)}¢ / cr</span><span class="pr">${money(p.usd)}</span></li>`).join('')}</ul>
    <div class="note">Plus annual = 3.9¢ per credit, Ultra = 3.3¢. Every pack costs more per credit than the next plan, so the pack is always a bridge, never a replacement.</div>`;

  $('#passesCard').innerHTML = `<div class="card-h"><span class="ico">${svg('infinity', 15)}</span>7-day unlimited passes</div>
    <div class="passes">${PASSES.map(p => `<div class="pass ${p.hi ? 'hi' : ''}">${mark(p.m, 'lg')}<div><div class="t">${MODELS[p.m].n} · ${p.d}-day</div><div class="s">${p.s}</div></div><div class="pr">${money(p.usd)}<small>one-time</small></div></div>`).join('')}</div>
    <div class="note">Mirrors Higgsfield's "Unlimited" upsell, without the throttling complaints: shared queue is stated up front, credit jobs keep priority.</div>`;

  $('#timerCard').innerHTML = `<div class="card-h"><span class="ico">${svg('clock', 15)}</span>One honest timer</div>
    <div class="timer-demo"><div class="big" id="demoTimer">23:41:09</div>
    <ul>
      <li>${svg('check', 13, 3)}<span>Starts once per account, server-side, on the personal-offer trigger.</span></li>
      <li>${svg('check', 13, 3)}<span>Visible in three places: toast, modal, profile popup. Same value everywhere.</span></li>
      <li>${svg('check', 13, 3)}<span>When it hits zero the code is dead. No reset on reload, reinstall or new session.</span></li>
      <li>${svg('check', 13, 3)}<span>Other surfaces never show countdowns. Scarcity is spent in one place.</span></li>
    </ul></div>`;
  // demo countdown (visual only)
  let s = 23 * 3600 + 41 * 60 + 9; const el = $('#demoTimer');
  setInterval(() => { s = Math.max(0, s - 1); el.textContent = [s / 3600, s % 3600 / 60, s % 60].map(n => String(Math.floor(n)).padStart(2, '0')).join(':'); }, 1000);
}

/* ---------- render: rules ---------- */
function renderRules() {
  const rules = [
    { ok: 1, k: 'Copy', icon: 'target', h: 'Gate by capability, not by time', p: 'Premium models carry a plan badge and open the modal at selection. The user always knows what unlocks what.' },
    { ok: 1, k: 'Copy', icon: 'layers', h: 'Three ways to pay, one preselected', p: 'Plan · pass · pack in every blocking modal. Preselection follows the trigger: model gate → plan, out of credits → pack.' },
    { ok: 1, k: 'Copy', icon: 'trend', h: 'Annual first, monthly struck', p: 'Every price is the annual monthly-equivalent with the monthly price struck through and a "save $X" line.' },
    { ok: 1, k: 'Copy', icon: 'eye', h: 'Cost before the click', p: 'Send button, chips and cards show credits up front. Surprise deductions are the #1 refund reason in AI tools.' },
    { ok: 0, k: 'Refuse', icon: 'ban', h: 'No "Unlimited" with hidden throttling', p: 'Passes state the shared queue explicitly. Higgsfield\'s unlimited-but-throttled is its most cited complaint.' },
    { ok: 0, k: 'Refuse', icon: 'refresh', h: 'No resetting countdowns', p: 'One timer per account, server-side. A reload never gives a new deadline. Fake urgency costs −3.2% and trust.' },
    { ok: 0, k: 'Refuse', icon: 'shield', h: 'No hidden cancellation', p: '"Cancel anyway" is a full button in the win-back modal. Cancel via support ticket is a chargeback machine.' },
    { ok: 0, k: 'Refuse', icon: 'bell', h: 'No offer stacking', p: 'One blocking surface at a time; banner and toast never appear together; max one lifecycle toast per day.' },
  ];
  $('#rulesGrid').innerHTML = rules.map(r => `<div class="rule ${r.ok ? '' : 'no'}"><span class="ico">${svg(r.icon, 17)}</span><span class="k">${r.ok ? 'We copy' : 'We refuse'}</span><h4>${r.h}</h4><p>${r.p}</p></div>`).join('');
}

/* ---------- render: plan ---------- */
function renderPlan() {
  const phases = [
    { k: 'Phase 1', w: 'Week 1–2', h: 'Price structure & meter', li: ['Public pricing page live (today: 404)', 'Credit meter + Upgrade pill in title bar', 'Cost preview on Send and chips', 'Rebuild banner: 4 cases → contextual one-liner'], m: 'Free → paid', v: '1.5% → 2.5%' },
    { k: 'Phase 2', w: 'Week 3–4', h: 'Gates & out-of-credits', li: ['Model gate modal with plan · pass · free alt', 'Out-of-credits modal with auto-resume', 'Store modal: 7 packs ($6–$250), passes, auto-refill', 'LLM picker badges + popover'], m: 'Modal → checkout', v: '≥ 12%' },
    { k: 'Phase 3', w: 'Week 5–6', h: 'Lifecycle & store', li: ['Personal offer, day 3/7, one honest timer', 'Profile popup → store, referral +100', 'Result gate: 4K tile, "make it move" toast', 'Auto-refill toggle at 10%', 'Unlimited switch in the composer → per-model pass'], m: 'ARPPU', v: '+18%' },
    { k: 'Phase 4', w: 'Week 7–8', h: 'Retention & win-back', li: ['Cancel flow: pause · downgrade · 50%', 'Annual switch card at 2nd renewal', 'Rollover shown in the credit meter', 'A/B: Plus $47 vs $39 annual', 'My Subscription page: checklist, auto-refill, recap'], m: 'M2 retention', v: '+8 pts' },
  ];
  $('#phases').innerHTML = phases.map(p => `<div class="phase"><div class="k">${p.k}<span>${p.w}</span></div><h4>${p.h}</h4><ul>${p.li.map(l => `<li>${svg('right', 12, 2.5)}<span>${l}</span></li>`).join('')}</ul><div class="metric">${p.m}<b>${p.v}</b></div></div>`).join('');
  const kpis = [
    ['Free → paid conversion', '1.5%', '→ 4%'],
    ['Modal → checkout', '—', '≥ 12%'],
    ['Pack repeat purchase', '—', '≥ 35%'],
    ['Annual share of new subs', '—', '≥ 55%'],
    ['Cancel → saved', '0%', '≥ 25%'],
  ];
  $('#kpis').innerHTML = kpis.map(k => `<div class="kpi-c"><div class="l">${k[0]}</div><div class="v">${k[1]}<small>today</small><em>${k[2]}</em></div></div>`).join('');
}

/* ---------- payments + popup map (Higgsfield payments audit, 23.09) ---------- */
const sceneId = n => (SCENES.find(s => s.n === n) || {}).id;
const sceneLink = n => `<a href="#s-${sceneId(n)}">${n}</a>`;

function renderPayments() {
  const pm = (names, extra = '') => `<span class="pmk">${names.map(n => logo(n)).join('')}${extra}</span>`;
  const methods = [
    [pm(['visa', 'mastercard', 'amex', 'jcb']), 'Cards', 'Yes, through Stripe Checkout', 'Yes: one Stripe card field, the only method', 'Yes, Stripe Payment Element'],
    [pm(['applepay']), 'Apple Pay', 'Yes', 'No', 'Yes, first button in checkout'],
    [pm(['stripe']), 'Bank payments', 'Yes', 'No', 'Yes, through Stripe, as in Higgsfield'],
    ['', 'PayPal, crypto', 'No', 'No', 'No, same as Higgsfield'],
    ['', 'Promo codes', 'Yes', 'Yes, "Enter code" window', 'Yes, one field in checkout'],
    ['', 'Tax and receipts', 'Tax added at checkout, invoice for every payment', 'Not checked', 'Stripe Tax, receipt and invoice by email'],
    ['', 'Change the saved method', 'Manage Account → Subscription → "+ Add new payment method"', 'Not in the app', 'My Subscription and the failed-payment banner'],
  ];
  $('#payMethods').innerHTML = `<thead><tr><th></th><th>Method</th><th>Higgsfield</th><th>Quadcode today</th><th>Quadcode ship</th></tr></thead><tbody>` +
    methods.map(r => `<tr><td class="pmc">${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td><td class="dim">${r[3]}</td><td class="ship">${r[4]}</td></tr>`).join('') + `</tbody>`;

  const paths = [
    ['Plan, monthly or yearly', 'Starter, Plus, Ultra; yearly up to 30% off', 'Monthly $20 or Yearly $180 ($15/mo), web page only', 'Starter $20 / $15, Plus $59 / $47, Ultra $129 / $99, checkout inside the app', [1, 11, 17]],
    ['Upgrade', 'Applies at once; unused credits prorated; billing date resets', 'Cancels the plan and charges the new one in full; no credit for unused days', 'Same as Higgsfield, with the credit line printed in checkout', [11, 16, 24]],
    ['Downgrade', 'At the end of the period', 'Same cancel-and-charge flow', 'At the next renewal, from My Subscription', [10]],
    ['More credits, same plan', 'Ultra slider: 3,000 / 6,000 / 9,000', 'Tier dropdown on Monthly, web only', '3,000 / 6,000 / 9,000 at 4.3¢ per credit, in the app', [24]],
    ['Credit packs', 'One-time, fixed or custom amount, 90 days, plan required', 'Web page only', '100–5,000 credits for $6–$250 plus a slider, 90 days', [2, 3, 7]],
    ['Auto-refill', 'Off by default; below the plan threshold; $1 = 18 credits; 90 days', 'None', 'Plus and Ultra: $20 / $40 / $90 / $150 / $300 at $1 = 18 credits, below the plan threshold, 90 days, no monthly cap', [11, 23]],
    ['Unlimited passes', 'Pay once for 1, 3 or 7 days, from €5', 'None', 'From $5 (Nanobanana Pro, 1 day) to $65 (Seedance 2.5, 7 days)', [9, 7]],
    ['Speed boost', 'More parallel jobs, paid add-on, no refunds', 'None', '+8 parallel jobs for $97', [12]],
    ['Team seats', 'Team €65 and Scale €150 per seat, shared pool', 'Monthly credits shared with unlimited users', 'Team $65 per seat yearly ($79 monthly), 1,000 credits a seat, 2 to 9 seats; Scale $150 per seat, 2,500 credits, 5 to 15 seats; one shared pool', [25]],
    ['Trial', '24 h of unlimited top models for new users (July 2026), then paid', '1,000 free tokens at install, promo codes', '24 h of Plus at the first Plus model, card up front', [26, 14]],
    ['Referral', 'Extra Unlimited days', 'None seen', '24-hour invite link on Plus and higher: friend up to 60% off, sender 3 / 5 / 7 days of Unlimited Seedance 2.5 for 1 / 2 / 3 friends who buy and generate', [29]],
  ];
  $('#payPaths').innerHTML = `<thead><tr><th>What you buy</th><th>Higgsfield</th><th>Quadcode today</th><th>Quadcode ship</th><th>Scenes</th></tr></thead><tbody>` +
    paths.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td class="dim">${r[2]}</td><td class="ship">${r[3]}</td><td class="sc">${r[4].map(sceneLink).join(' ')}</td></tr>`).join('') + `</tbody>`;

  const rules = [
    ['Spend order', 'Plan credits go first, then whatever expires soonest: packs, promo, refill. Same order as Higgsfield, printed in the checkout summary.'],
    ['Credit life', 'Pack and refill credits last 90 days and stay usable after a cancel. Monthly plan credits roll over for one month, Yearly credits last a year: the live Quadcode rules, kept.'],
    ['Refunds and failed cards', 'First purchase: refund within 7 days if no credits were used. Passes and boosts: no refund. EEA and UK: 14-day withdrawal. Failed renewal: 14 days Past Due, 8 Stripe retries, then a 30-day pause.'],
  ];
  $('#payRules').innerHTML = rules.map(r => `<div class="card"><div class="card-h">${r[0]}</div><p>${r[1]}</p></div>`).join('');
}

function renderPopups() {
  const lanes = [
    ['First launch', 'Install, sign in, first prompts', [[14, 'Welcome gift', 'Modal'], [6, 'Premium LLM picked', 'Popover'], [15, 'Model shelf', 'Popover']]],
    ['Free, first week', 'Creating on free credits', [[1, 'Premium model on Free', 'Modal'], [26, '24-hour Plus trial', 'Modal'], [4, 'After a great result', 'Toast'], [22, 'Export watermark', 'Modal'], [5, 'Day-3 personal offer', 'Modal']]],
    ['Credits run low', 'Balance near zero', [[3, 'Low balance', 'Banner'], [2, 'Out of credits mid-job', 'Modal'], [16, 'Second pack: plan math', 'Toast'], [23, 'Auto-refill', 'Toast'], [24, 'Bigger Ultra tier', 'Modal']]],
    ['Paid, growing', 'Speed, models, people', [[9, 'Unlimited switch', 'Modal'], [12, 'Boost speed', 'Modal'], [25, 'Invite the team', 'Modal'], [27, 'New model day', 'Banner'], [21, 'Live challenge', 'Toast'], [29, 'Referral', 'Toast']]],
    ['Before renewal', 'Last 3–14 days of a cycle', [[28, 'Month recap', 'Toast'], [19, 'Credits expiring', 'Banner'], [17, 'Monthly to yearly', 'Toast'], [18, 'Payment failed', 'Modal']]],
    ['Leaving and back', 'Cancel, lapse, return', [[8, 'Cancel flow save', 'Modal'], [20, 'Welcome back', 'Modal']]],
    ['Always there', 'Opened by the user', [[7, 'Store in profile popup', 'Popover'], [11, 'Checkout', 'Modal'], [10, 'My Subscription', 'Page'], [13, 'Usage and forecast', 'Page']]],
  ];
  const kindOf = {}, labelOf = {};
  lanes.forEach(l => l[2].forEach(([n, t, k]) => { kindOf[n] = k; labelOf[n] = t; }));
  $('#popupLanes').innerHTML = lanes.map(l => `<div class="lane"><h4>${l[0]}</h4><small>${l[1]}</small>` +
    l[2].map(([n, t, k]) => `<a class="pchip k-${k.toLowerCase()}" href="#s-${sceneId(n)}"><b>${n}</b><span>${t}</span><em>${k}</em></a>`).join('') + `</div>`).join('');

  const ladder = [
    ['P0', 'Payment failed', 'Mutes every promo until the card is fixed.', [18]],
    ['P1', 'Out of credits', 'The only popup allowed during a render: the job is already waiting.', [2, 3]],
    ['P2', 'The user clicked', 'Opens every time, no cap: the user asked for it.', [1, 26, 22, 6, 15, 9, 12, 25, 7, 11, 10, 13]],
    ['P3', 'Money moments', 'One per session; in the first session only the welcome gift.', [14, 5, 16, 23, 24, 17]],
    ['P4', 'Lifecycle toasts', 'One per day, at session start or after a result, never two in a row.', [4, 19, 21, 27, 28, 29]],
    ['P5', 'Save and return', 'Cancel save only inside the cancel flow; welcome back once per 90 days.', [8, 20]],
  ];
  const prOf = {};
  ladder.forEach(r => r[3].forEach(n => { prOf[n] = r[0]; }));
  $('#popupLadder').innerHTML = ladder.map(r => `<li><span class="p">${r[0]}</span><div><h5>${r[1]}</h5><p>${r[2]}</p><div class="ns">${r[3].map(n => `<a href="#s-${sceneId(n)}">${n} · ${labelOf[n]}</a>`).join('')}</div></div></li>`).join('');

  const freq = [
    ['One interruption per session', 'At most one modal the user did not ask for. Clicks (P2) never count.'],
    ['Toasts once a day', 'At session start or right after a result, at least 4 hours away from any modal.'],
    ['Renders come first', 'Nothing covers a running job except out of credits, and that one keeps the job in the queue.'],
    ['Three strikes', 'Dismissed three times, a popup folds into a one-line chip for 30 days.'],
    ['Price never goes backwards', 'Paying users never see Free offers or a price below what they already pay.'],
    ['First result before the first sale', 'Only the welcome gift shows before the first generation.'],
    ['Quiet during trouble', 'A failed payment or the cancel flow mutes every promo, timer and challenge card.'],
  ];
  $('#popupFreq').innerHTML = freq.map(f => `<li><b>${f[0]}</b>${f[1]}</li>`).join('');

  $('#popupTable').innerHTML = `<thead><tr><th>#</th><th>Popup</th><th>Type</th><th>Fires when</th><th>Who sees it</th><th>Cap</th><th>Priority</th></tr></thead><tbody>` +
    [...SCENES].sort((a, b) => a.n - b.n).map(s => { const sp = s.spec || {}; return `<tr><td>${sceneLink(s.n)}</td><td><b>${labelOf[s.n] || s.title}</b></td><td><span class="kd">${kindOf[s.n] || ''}</span></td><td>${sp.Trigger || ''}</td><td class="dim">${sp.Segment || ''}</td><td class="dim">${sp.Cap || ''}</td><td class="pr">${prOf[s.n] || ''}</td></tr>`; }).join('') + `</tbody>`;
}

/* ---------- init ---------- */
renderAudit(); renderMap(); renderScenes(); renderLogic(); renderPayments(); renderPopups(); renderRules(); renderPlan();

// Interactive view toggles and timers for Step 9.1 scenes
document.addEventListener('click', (e) => {
  // Store modal tab toggle
  const stTab = e.target.closest('.st-tabs span');
  if (stTab) {
    const bar = stTab.closest('.st-tabs');
    const md = stTab.closest('.md.store');
    if (bar && md) {
      bar.querySelectorAll('span').forEach(s => s.classList.remove('on'));
      stTab.classList.add('on');
      const target = stTab.dataset.tab;
      const topupPane = md.querySelector('#st-pane-topup');
      const unlPane = md.querySelector('#st-pane-unl');
      const planPane = md.querySelector('#st-pane-plan');
      if (topupPane) topupPane.style.display = target === 'topup' ? 'block' : 'none';
      if (unlPane) unlPane.style.display = target === 'unl' ? 'block' : 'none';
      if (planPane) planPane.style.display = target === 'plan' ? 'block' : 'none';
    }
  }

  // Scene 8 external toolbar toggle (retention, survey, final)
  const cv = e.target.closest('[data-cv]');
  if (cv) {
    const scene = cv.closest('.scene');
    if (scene) {
      scene.querySelectorAll('[data-cv]').forEach(s => s.classList.remove('on'));
      cv.classList.add('on');
      const target = cv.dataset.cv;
      const retEl = scene.querySelector('#cview-retention');
      const survEl = scene.querySelector('#cview-survey');
      const finalEl = scene.querySelector('#cview-final');
      if (retEl) retEl.style.display = target === 'retention' ? 'block' : 'none';
      if (survEl) survEl.style.display = target === 'survey' ? 'block' : 'none';
      if (finalEl) finalEl.style.display = target === 'final' ? 'block' : 'none';
    }
  }

  // Scene 8 interactive button flow
  const cancelBtn = e.target.closest('.btn-cancel-full');
  if (cancelBtn) {
    const scene = cancelBtn.closest('.scene');
    if (scene) {
      const surveyTab = scene.querySelector('[data-cv="survey"]');
      if (surveyTab) surveyTab.click();
    }
  }

  const submitSurveyBtn = e.target.closest('.btn-submit-feedback, .btn-skip-survey');
  if (submitSurveyBtn) {
    const scene = submitSurveyBtn.closest('.scene');
    if (scene) {
      const finalTab = scene.querySelector('[data-cv="final"]');
      if (finalTab) finalTab.click();
    }
  }

  const resubBtn = e.target.closest('.btn-resubscribe, .btn-back-workspace');
  if (resubBtn) {
    const scene = resubBtn.closest('.scene');
    if (scene) {
      const retTab = scene.querySelector('[data-cv="retention"]');
      if (retTab) retTab.click();
    }
  }

  // Scene 24 external toolbar toggle
  const st = e.target.closest('[data-st]');
  if (st) {
    const scene = st.closest('.scene');
    if (scene) {
      scene.querySelectorAll('[data-st]').forEach(s => s.classList.remove('on'));
      st.classList.add('on');
      const target = st.dataset.st;
      const upEl = scene.querySelector('#st-view-upgrade');
      const downEl = scene.querySelector('#st-view-downgrade');
      if (upEl && downEl) {
        if (target === 'upgrade') {
          upEl.style.display = 'block';
          downEl.style.display = 'none';
        } else {
          upEl.style.display = 'none';
          downEl.style.display = 'block';
        }
      }
    }
  }
});

// Character counter for feedback survey
document.addEventListener('input', (e) => {
  const ta = e.target.closest('.survey-field textarea');
  if (ta) {
    const counter = ta.parentNode.querySelector('.char-count');
    if (counter) counter.textContent = `${ta.value.length}/500`;
  }
});

// Scene 5 real persisted timers — synchronized: single countdown window per visitor for both modal & sticky banner
setInterval(() => {
  const exitSec = getPersistentTimer('exit_62', PROPOSALS.exitIntent.initialTimerSec);
  $$('.tm-persist-exit, .tm-persist-sticky').forEach(el => el.textContent = formatTimer(exitSec));
}, 1000);

// Scene 3 rotating banner between tier-above offer and auto-refill setup
setInterval(() => {
  const rotOffers = document.querySelectorAll('#scene3-rot-banner .rot-offer');
  if (rotOffers.length > 1) {
    const cur = Array.from(rotOffers).findIndex(el => el.style.display !== 'none');
    const next = (cur + 1) % rotOffers.length;
    rotOffers.forEach((el, i) => {
      el.style.display = i === next ? 'block' : 'none';
    });
  }
}, 4000);

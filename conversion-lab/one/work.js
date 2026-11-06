/* ============================================================
 * work.js — blocks 17–24 (section #work) + upgraded IDE menu (15)
 * Profile menu with live balance · Claim your bonus (web + IDE) ·
 * Guest passes · Workspace overview · Usage & forecast · Rewards.
 *
 * One source of truth: W{} = account states (new / claimed / low / sub).
 * Every element inside .wsync[data-comp] re-renders on setState(),
 * so the website and the IDE always show the same balance and offer.
 * Markup = plain HTML; styles in work.css (z-* web, zi-* IDE).
 * ============================================================ */
(function () {
  const C = window.QC_COMPONENTS || {};
  const { ov, tt, ic } = C;
  if (!ov || !window.BLOCKS_DATA) return;
  const A = '../assets/', R = '../../assets/';

  /* ---------- extra icons (lucide paths) ---------- */
  const WP = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    ext: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    ticket: '<path d="M3 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 11v2M13 17v2"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'
  };
  const wi = (n, cls) => WP[n]
    ? `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${WP[n]}</svg>`
    : ic(n, cls);

  /* ---------- account states (single source of truth) ---------- */
  const USER = { name: 'Alex Creator', ini: 'AC', mail: 'creator@example.com' };
  const W = {
    new:     { k: 'new',     tab: 'New account',   bal: 0,       plan: 'Free',  free: true,  bonus: 'ready', pct: 0,   warn: false, run: 'Welcome bonus waiting' },
    claimed: { k: 'claimed', tab: 'Bonus claimed', bal: 200,     plan: 'Free',  free: true,  bonus: 'done',  pct: 100, warn: false, run: 'Valid for 14 days' },
    low:     { k: 'low',     tab: 'Low balance',   bal: 38.4,    plan: 'Basic', free: false, bonus: 'done',  pct: 4,   warn: true,  run: '≈ 1 day left' },
    sub:     { k: 'sub',     tab: 'Subscriber',    bal: 1006.63, plan: 'Basic', free: false, bonus: 'done',  pct: 81,  warn: false, run: '≈ 16 days left' }
  };
  const fq = n => Number(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  let CUR = 'new';

  /* ---------- profile menu (web dark / IDE light) ---------- */
  function umenu(s, L) {
    const B = L ? 'zi-btn' : 'z-btn';
    const acts = s.bonus === 'ready'
      ? `<button class="${B} pri claim pulse" data-claim>${ic('gift')} Claim 200 QCC</button><button class="${B} ghost">See plans</button>`
      : s.free ? `<button class="${B} pri">${ic('zap')} Starter Kit</button><button class="${B} ghost">Plans</button>`
      : s.warn ? `<button class="${B} pri">${ic('plus')} Top up</button><button class="${B} ghost">Auto-refill</button>`
      : `<button class="${B} pri">${ic('plus')} Top up</button><button class="${B} ghost">Plans</button>`;
    const smart = {
      new: `<div class="it two hot" data-claim role="button">${ic('gift')}<span class="tx">Claim your bonus<small>200 QCC · claim within ${tt('welcome', 'dhms')}</small></span><span class="tag">+200</span></div>`,
      claimed: `<div class="it two hot">${ic('zap')}<span class="tx">Starter Kit · 1,200 QCC for $20<small>+20% credits · ends in ${tt('starter', 'hms')}</small></span><span class="ch">${ic('right')}</span></div>`,
      low: `<div class="it two hot">${ic('alert')}<span class="tx">Running low<small>Packs from $2 · or turn on auto-refill</small></span><span class="ch">${ic('right')}</span></div>`,
      sub: `<div class="it two">${wi('ticket')}<span class="tx">Invite friends<small>7 guest passes left this month</small></span><span class="tag soft">+200</span></div>`
    }[s.k];
    const it = (i, t, r) => `<div class="it">${i}<span class="tx">${t}</span>${r || ''}</div>`;
    return `<div class="umenu${L ? ' light' : ''}">
      <div class="who"><span class="av">${USER.ini}</span><div><b>${USER.name}</b><small>${USER.mail}</small></div><span class="plan${s.free ? ' free' : ''}">${s.plan}</span></div>
      <div class="bal"><div class="t"><b><i data-bal="${s.bal}">${fq(s.bal)}</i><small>QCC</small></b><span class="${s.warn ? 'warn' : ''}">${s.run}</span></div>
        <div class="z-sbar${s.warn ? ' warn' : ''}"><b style="--w:${s.pct}%"></b></div>
        <div class="acts">${acts}</div></div>
      ${smart}
      <div class="hr"></div>
      ${it(wi('grid'), 'Workspace', L ? `<span class="ch">${wi('ext')}</span>` : '<span class="k">⌘1</span>')}
      ${it(ic('chart'), 'Usage & forecast', s.warn ? '<span class="dot"></span>' : '')}
      ${it(ic('card'), 'Plans & credits', s.free ? '<span class="tag soft">Free</span>' : '')}
      ${s.k === 'sub' ? '' : it(wi('ticket'), 'Invite friends', '<span class="tag soft">7 passes</span>')}
      ${it(wi('tag'), 'Promo code')}
      ${it(ic('settings'), 'Settings', '<span class="k">⌘,</span>')}
      <div class="hr"></div>
      ${L ? it(ic('refresh'), 'Check for updates') : it(ic('download'), 'Download desktop app')}
      ${it(wi('help'), 'Help & guides', `<span class="ch">${ic('right')}</span>`)}
      <div class="hr"></div>
      ${it(wi('logout'), 'Log out')}
    </div>`;
  }

  /* ---------- sidebar name chip (web) + status-bar pill (IDE) ---------- */
  const sname = s => `<div class="z-sname${s.warn ? ' warn' : ''}"><span class="av">${USER.ini}</span><div><b>${USER.name}</b><small>${USER.mail}</small><em>Balance <b data-bal="${s.bal}">${fq(s.bal)}</b> QCC</em></div>${wi('down')}</div>`;
  const spill = s => `<span class="zi-spill"><i class="${s.warn ? 'low' : ''}"></i><b data-bal="${s.bal}">${fq(s.bal)}</b>&nbsp;QCC${s.bonus === 'ready' ? `<span class="z-chip" data-claim role="button">${ic('gift')} Claim +200</span>` : ''}</span>`;

  /* ---------- Claim your bonus ---------- */
  const MAKES = `<div class="makes"><div><b>Lumi</b><span>Images · Nano Banana, Flux</span></div><div><b>Sonic</b><span>Video &amp; music · Kling, Suno</span></div><div><b>Cody</b><span>Apps &amp; code · Claude, GPT</span></div></div>`;
  function claimWeb(s) {
    const done = s.bonus !== 'ready';
    return `<div class="z-modal flush"><button class="z-x" aria-label="Close">${ic('x')}</button>
      <div class="z-claim claimable${done ? ' claimed' : ''}">
        <div class="art" style="background-image:url(${R}banners/banner_starter_kit.jpg)"><span class="z-chip">${ic('gift')} Welcome bonus</span><div class="num">+200<small>QCC</small></div></div>
        <div class="body">
          <div class="before"><h2 class="z-h2">Your welcome bonus is ready</h2><p class="z-p">200 QCC on us — enough to try every agent before you pay anything.</p></div>
          <div class="after"><h2 class="z-h2">200 QCC added to your balance</h2><p class="z-p">Credits work with every agent and stay valid for 14 days.</p></div>
          ${MAKES}
          <div class="before"><button class="z-btn pri lg xl claim pulse" data-claim>${ic('gift')} Claim 200 QCC</button><div class="exp">${ic('clock')} Claim within ${tt('welcome', 'dhms')} · no card needed</div></div>
          <div class="after"><button class="z-btn lg xl claim">${ic('check')} Added · balance&nbsp;<b data-bal="${s.bal}">${fq(s.bal)}</b>&nbsp;QCC</button><div class="exp">${ic('zap')} Next: Starter Kit — 1,200 QCC for $20 · ends in ${tt('starter', 'hms')}</div></div>
        </div></div></div>`;
  }
  const claimExpired = () => `<div class="z-modal flush"><button class="z-x" aria-label="Close">${ic('x')}</button><div class="z-claim is-exp">
      <div class="art" style="background-image:url(${R}banners/banner_starter_kit.jpg)"><span class="z-chip">${ic('clock')} Expired</span><div class="num">+200<small>QCC</small></div></div>
      <div class="body"><h2 class="z-h2">This welcome bonus has expired</h2><p class="z-p">The bonus can be claimed for 7 days after sign-up. You can still start small — packs begin at $2.</p>
        <button class="z-btn ghost lg xl">See credit packs</button><div class="exp">${ic('info')} No re-offers: an expired bonus never comes back as a fake “last chance”.</div></div></div></div>`;
  function claimIde(s) {
    const done = s.bonus !== 'ready';
    return `<div class="zi-claim claimable${done ? ' claimed' : ''}"><span class="zi-x">${ic('x')}</span>
      <div class="art" style="background-image:url(${A}banner/bg_new_user_light.jpg)"><span class="zi-chip">${ic('gift')} Welcome bonus</span><div class="num">+200<small>QCC</small></div></div>
      <div class="body">
        <div class="before"><h4>Claim 200 QCC to start building</h4><p>Your balance is 0. Welcome credits work with every agent in the app — no card needed.</p></div>
        <div class="after"><h4>200 QCC added — you're ready</h4><p>Start your first task below. Credits stay valid for 14 days.</p></div>
        ${MAKES}
        <div class="before"><button class="zi-btn pri xl claim pulse" data-claim>${ic('gift')} Claim 200 QCC</button><div class="exp">${ic('clock')} Claim within ${tt('welcome', 'dhms')}</div></div>
        <div class="after"><button class="zi-btn xl claim">${ic('check')} Added · balance&nbsp;<b data-bal="${s.bal}">${fq(s.bal)}</b>&nbsp;QCC</button><div class="exp">${ic('sparkles')} Try: “Product shot of my sneaker on orange dust”</div></div>
      </div></div>`;
  }

  /* ---------- Guest passes ---------- */
  const TIX = `<div class="tix"><div class="tk give"><div><small>Your friend gets</small><b>+200</b><small>QCC on first top-up</small></div></div><div class="tk get"><div><small>You get</small><b>+200</b><small>QCC per friend</small></div></div></div>`;
  const INVITES = `<div class="invites">
      <div class="inv"><span class="av">AK</span><div><b>friend@example.com</b><small>Joined · first top-up Sep 21</small></div><span class="st ok">+200 QCC</span></div>
      <div class="inv"><span class="av" style="background:#7c3aed">MR</span><div><b>friend2@example.com</b><small>Joined · no purchase yet</small></div><span class="st wait">Pending</span></div>
      <div class="inv"><span class="av" style="background:#0ea5e9">JT</span><div><b>friend3@example.com</b><small>Pass sent · Sep 24</small></div><span class="st wait">Invited</span></div></div>`;
  const passes = (left) => `<div class="passes">${'<i></i>'.repeat(left)}${'<i class="used"></i>'.repeat(10 - left)}</div>`;
  function guestWeb(used) {
    return `<div class="z-modal flush"><div class="z-guest"><div class="top"><button class="z-x" aria-label="Close">${ic('x')}</button>${TIX}</div>
      <div class="body"><h2 class="z-h2">Give a friend 200 QCC</h2><p class="z-p">Send a guest pass. When your friend makes a first purchase, you both get 200 QCC.</p>
        ${used ? `${passes(0)}<div class="passes-l"><b>0 of 10</b> passes left · new passes on Oct 1</div>` : `${passes(7)}<div class="passes-l"><b>7 of 10</b> guest passes left this month</div>`}
        <div class="z-link"><span>quadcode.ai/g/drop-emil-7f3k</span><button class="z-btn pri sm"${used ? ' disabled' : ''}>${ic('copy')} Copy link</button></div>
        <div class="z-share"><button class="z-btn ghost sm">${ic('mail')} Email</button><button class="z-btn ghost sm">X</button><button class="z-btn ghost sm">Telegram</button><button class="z-btn ghost sm">${wi('send')} WhatsApp</button></div>
        ${INVITES}
        <div class="fine">Friends must be new to Quadcode. Rewards arrive after their first payment; a refund cancels the reward. Up to 10 rewards a month.</div></div></div></div>`;
  }
  const guestIde = () => `<div class="zi-guest"><div class="top"><span class="zi-x">${ic('x')}</span>${TIX}</div>
      <div class="body"><h4>Give a friend 200 QCC</h4><p>Send a guest pass — when they make a first purchase, you both get 200 QCC.</p>
        ${passes(7)}<div class="passes-l"><b>7 of 10</b> guest passes left this month</div>
        <div class="z-link"><span>quadcode.ai/g/drop-emil-7f3k</span><button class="zi-btn pri sm">${ic('copy')} Copy</button></div>
        <div class="z-share"><button class="zi-btn ghost sm">${ic('mail')} Email</button><button class="zi-btn ghost sm">X</button><button class="zi-btn ghost sm">Telegram</button><button class="zi-btn ghost sm">${wi('send')} WhatsApp</button></div>
        ${INVITES}
        <div class="fine">Rewards arrive after the friend's first payment · up to 10 a month.</div></div></div>`;

  /* ---------- workspace pages (static: real subscriber account) ---------- */
  const kpi = (k, v, d, cls) => `<div class="z-kpi"><div class="k">${k}</div><div class="v">${v}</div><div class="d ${cls || ''}">${d}</div></div>`;
  const agrow = (n, d, q, p, c) => `<div class="z-agrow"><i style="background:${c}"></i><div><b>${n}</b><small>${d}</small><div class="z-sbar"><b style="--w:${p}%;background:${c}"></b></div></div><span class="n">${q}<small>QCC · ${p}%</small></span></div>`;
  const AGENTS = agrow('Lumi', 'Images', 412, 41, '#a78bfa') + agrow('Sonic', 'Video & music', 386, 39, '#ff7a2e') + agrow('Cody', 'Apps & code', 195, 20, '#60a5fa');
  const tile = (img, t, sub, q, vid) => `<div class="z-tile" style="background-image:url(${img})"><span class="z-chip">${sub}</span>${vid ? `<span class="ply">${ic('play')}</span>` : ''}<div class="m"><b>${t}</b><span>${q} QCC</span></div></div>`;
  const learn = (img, t, sub, len) => `<div class="z-learn"><div class="th" style="background-image:url(${img})"><span class="len">${len}</span></div><div><b>${t}</b><small>${sub}</small></div></div>`;
  const HD = (eyb, h, p, r) => `<div class="hd"><div><div class="z-eyb">${eyb}</div><h2 class="z-h2">${h}</h2>${p ? `<p class="z-p">${p}</p>` : ''}</div>${r ? `<div class="r">${r}</div>` : ''}</div>`;

  const balCard = () => `<div class="z-card"><div class="ct"><h4>Balance</h4><a>Usage &amp; forecast →</a></div>
      <div class="z-bal"><div class="z-ring" style="--p:100;--p1:80"><b>1,006<small>QCC</small></b></div>
        <div class="z-balr">
          <div class="z-leg"><span><i class="l"></i>Plan credits · 806.63</span><span><i class="s"></i>Top-up · 200 (never expire)</span></div>
          <div class="z-fore okf"><span class="ic">${ic('check')}</span><div><b>Covered until renewal</b><small>≈ 62 QCC a day → lasts ≈ 16 days · plan adds 1,000 QCC on Sep 7</small></div></div>
          <div class="z-acts"><button class="z-btn pri sm">${ic('plus')} Top up</button><button class="z-btn ghost sm">Auto-refill: off</button><button class="z-btn ghost sm">${wi('tag')} Promo code</button></div>
        </div></div></div>`;
  const nbaCard = () => `<div class="z-card hot"><div class="ct"><h4>Best value for you</h4><span class="tag">Save $60 a year</span></div>
      <div class="z-nba"><div class="im" style="background-image:url(${R}banners/banner_yearly_crown.jpg)"></div>
        <b>Basic Yearly — $180 a year</b><p>The same 1,000 QCC every month for $15 instead of $20. Switch any time — the rest of this month is prorated.</p>
        <button class="z-btn pri sm block">${ic('crown')} Switch to Yearly</button></div></div>`;
  const dash = () => `<div class="z-page">
      ${HD('Workspace · Overview', 'Good evening, creator', 'Your balance, what it made this month and what to try next.', `<button class="z-btn ghost">${ic('download')} Desktop app</button><button class="z-btn pri">${ic('plus')} New task</button>`)}
      <div class="z-g21">${balCard()}${nbaCard()}</div>
      <div class="z-kpis">${kpi('Spent this month', '993 <small>QCC</small>', `${wi('trend')} +18% vs August`, 'up')}${kpi('Tasks run', '86', '11.5 QCC per task on average')}${kpi('Made', '214 <small>images</small> 12 <small>videos</small>', '9 tracks · 3 apps')}${kpi('Refunded', '42 <small>QCC</small>', `${ic('check')} 3 failed runs returned`, 'ok')}</div>
      <div class="z-g21">
        <div class="z-card"><div class="ct"><h4>Recent work</h4><a>Open gallery →</a></div>
          <div class="z-gal">${tile(A + 'c1.jpg', 'Sneaker hero', 'Lumi · Nano Banana', 24)}${tile(A + 'c2.jpg', 'Night run · 10 s', 'Sonic · Kling 2.5', 80, 1)}${tile(A + 'c4.jpg', 'Neon beat · 2 min', 'Sonic · Suno v5', 60, 1)}${tile(R + 'pricing/case-5.jpg', 'Drop landing page', 'Cody · Claude', 41)}${tile(R + 'pricing/case-2.jpg', 'Perfume ad', 'Lumi · Flux', 16)}</div></div>
        <div class="z-card"><div class="ct"><h4>Spend by agent</h4><a>30 days</a></div>${AGENTS}</div>
      </div>
      <div class="z-g3">${learn(A + 'c5.jpg', 'Make a product ad in 3 prompts', 'Lumi · about 30 QCC', '4 min')}${learn(A + 'c6.jpg', 'Turn a script into a 30-second film', 'Sonic · about 160 QCC', '6 min')}${learn(R + 'pricing/case-6.jpg', 'Score your video with an original track', 'Sonic · about 20 QCC', '3 min')}</div>
      <div class="z-fore okf"><span class="ic">${ic('download')}</span><div><b>Desktop app is connected · v2.4 on Windows</b><small>Your agents run on your computer and use the same balance. Last sync: 2 minutes ago.</small></div><div class="acts"><button class="z-btn ghost sm">macOS</button><button class="z-btn ghost sm">Linux</button><button class="z-btn ghost sm">Release notes</button></div></div>
    </div>`;

  const DAYS = [55, 62, 48, 70, 66, 40, 35, 72, 80, 58, 64, 77, 50, 45, 83, 90, 68, 61, 74, 88, 70, 94], FC = [72, 70, 75, 68, 73, 71, 76, 74];
  const col = (v, cls) => { const l = Math.round(v * .42), s = Math.round(v * .38); return `<div class="col${cls}" title="${Math.round(v * .85)} QCC"><i class="l" style="height:${l}%"></i><i class="s" style="height:${s}%"></i><i class="c" style="height:${v - l - s}%"></i></div>`; };
  const mrow = (logo, m, ag, runs, q, sh, cls) => `<tr><td><span class="mdl"><img src="${A}logos/${logo}.svg" alt=""><span class="ag"><b>${m}</b><small>${ag}</small></span></span></td><td class="num">${runs}</td><td class="num">${q}</td><td><span class="sh"><span class="z-bar ${cls}"><b style="--w:${sh * 3}%"></b></span>${sh}%</span></td></tr>`;
  const task = (th, t, sub, c, ref) => `<div class="z-task">${th}<div><b>${t}</b><small>${sub}</small></div><span class="c${ref ? ' ref' : ''}">${c}<small>QCC</small></span></div>`;
  const foreUp = () => `<div class="z-fore"><span class="ic">${wi('trend')}</span><div><b>You use about 1.9× your plan each month</b><small>Plan: 1,000 QCC a month · your pace: ≈ 1,860 QCC. Turn on auto-refill so tasks never stop, or cut the base price 25% with Yearly.</small></div><div class="acts"><button class="z-btn ghost sm">Turn on auto-refill</button><button class="z-btn pri sm">${ic('crown')} Yearly · save 25%</button></div></div>`;
  const modelTbl = () => `<div class="z-card"><div class="ct"><h4>By model</h4><a>All models &amp; prices →</a></div>
      <table class="z-tbl"><thead><tr><th>Model</th><th class="num">Runs</th><th class="num">QCC</th><th>Share</th></tr></thead><tbody>
        ${mrow('gemini', 'Nano Banana', 'Lumi · images', 142, 284, 29, 'l')}${mrow('kling', 'Kling 2.5', 'Sonic · video', 12, 240, 24, 's')}${mrow('claude', 'Claude Sonnet 4.5', 'Cody · code', 38, 195, 19, 'c')}${mrow('suno', 'Suno v5', 'Sonic · music', 21, 146, 15, 's')}${mrow('flux', 'Flux 1.1 Pro', 'Lumi · images', 54, 128, 13, 'l')}
        <tr class="tot"><td>Total · 30 days</td><td class="num">267</td><td class="num">993</td><td>100%</td></tr></tbody></table></div>`;
  const usage = () => `<div class="z-page">
      ${HD('Workspace · Usage', 'Usage &amp; forecast', 'Where your credits went, what was refunded and how long your balance lasts.', `<div class="z-seg"><span>7 days</span><span class="on">30 days</span><span>90 days</span></div><button class="z-btn ghost sm">${ic('download')} Export CSV</button>`)}
      <div class="z-kpis">${kpi('Spent · 30 days', '993 <small>QCC</small>', `${wi('trend')} +18% vs previous 30 days`, 'up')}${kpi('Average per task', '11.5 <small>QCC</small>', '86 tasks · 267 model runs')}${kpi('Refunded', '42 <small>QCC</small>', `${ic('check')} Failed runs come back automatically`, 'ok')}${kpi('Runway', '≈ 16 <small>days</small>', 'Plan adds 1,000 QCC on Sep 7')}</div>
      <div class="z-g21">
        <div class="z-card"><div class="ct"><h4>Daily spend · QCC</h4><div class="z-leg"><span><i class="l"></i>Lumi</span><span><i class="s"></i>Sonic</span><span><i class="c"></i>Cody</span><span><i class="t"></i>Forecast</span></div></div>
          <div class="z-bars">${DAYS.map((v, i) => col(v, i === DAYS.length - 1 ? ' now' : '')).join('')}${FC.map(v => col(v, ' fc')).join('')}</div>
          <div class="z-axis"><span>Aug 28</span><span>Sep 4</span><span>Sep 11</span><span>Today</span><span>Forecast →</span></div></div>
        <div class="z-card"><div class="ct"><h4>By agent</h4><a>30 days</a></div>${AGENTS}</div>
      </div>
      ${foreUp()}
      <div class="z-g21">${modelTbl()}
        <div class="z-card"><div class="ct"><h4>Biggest tasks</h4><a>All tasks →</a></div><div class="z-tasks">
          ${task(`<span class="th" style="background-image:url(${A}c2.jpg)"></span>`, 'Night run · 10 s video', 'Sonic · Kling 2.5 · Sep 24', 80)}
          ${task(`<span class="th" style="background-image:url(${A}c4.jpg)"></span>`, 'Neon beat · 2 min track', 'Sonic · Suno v5 · Sep 22', 60)}
          ${task(`<span class="th" style="background-image:url(${R}pricing/case-5.jpg)"></span>`, 'Landing page for the drop', 'Cody · Claude · Sep 20', 41)}
          ${task(`<span class="th ico o">${ic('refresh')}</span>`, 'Render failed · refunded', 'Sonic · Kling 2.5 · Sep 19', '+16', 1)}
        </div></div></div>
    </div>`;

  const off = (cls, icn, t, sub, r) => `<div class="z-offer ${cls}"><span class="ic">${icn}</span><div><b>${t}</b><small>${sub}</small></div><div class="r">${r}</div></div>`;
  const offersCard = () => `<div class="z-card"><div class="ct"><h4>Your offers</h4><a>History →</a></div>
      ${off('hot', ic('zap'), 'Starter Kit — 1,200 QCC for $20', `+20% credits · one-time · ends in ${tt('starter', 'hms')}`, '<span class="val">$20</span><button class="z-btn pri sm">Get it</button>')}
      ${off('', wi('ticket'), 'Guest passes · 7 of 10 left', 'Friend gets +200 QCC on a first top-up, you get +200 QCC', '<button class="z-btn ghost sm">Invite</button>')}
      ${off('', ic('crown'), 'Basic Yearly — save 25%', 'Always available · $180 a year instead of $240', '<button class="z-btn ghost sm">View</button>')}
      ${off('done', ic('check'), 'Welcome bonus · 200 QCC', 'Claimed Sep 20 · valid until Oct 4', '<span class="tag ok">Claimed</span>')}</div>`;
  const promoCard = () => `<div class="z-card"><div class="ct"><h4>Promo code</h4></div>
      <div class="z-inp"><span>Enter a code</span><button class="z-btn pri sm">Apply</button></div>
      <div class="z-codes"><div><b>CREATOR25</b><small>+25% on credit packs · valid until Sep 28</small><span class="tag ok">Active</span></div><div class="old"><b>LAUNCH50</b><small>50 QCC · used Sep 3</small><span class="tag soft">Used</span></div></div></div>`;
  const refillCard = () => `<div class="z-card"><div class="ct"><h4>Auto-refill</h4><span class="zi-sw"></span></div><p class="z-note">Off — tasks stop at 0 QCC. Turn on to add <b>500 QCC for $10</b> when the balance drops below <b>100 QCC</b>. Max 3 refills a month, email after each one.</p></div>`;
  const rewards = () => `<div class="z-page">
      ${HD('Workspace · Settings', 'Settings', '')}
      <div class="z-stabs"><span>Account</span><span class="on">Rewards &amp; offers <span class="z-chip">2</span></span><span>Billing</span><span>API token</span><span>Linked accounts</span></div>
      <div class="z-g21">${offersCard()}<div class="z-col">${promoCard()}${refillCard()}</div></div>
      <div class="z-g21">
        <div class="z-card"><div class="ct"><h4>Reward history</h4><a>Export →</a></div><div class="z-tasks">
          ${task(`<span class="th ico o">${ic('gift')}</span>`, 'Welcome bonus', 'Claimed in the desktop app · Sep 20', '+200')}
          ${task(`<span class="th ico o">${wi('ticket')}</span>`, 'Guest pass reward · friend@example.com', 'Friend made a first top-up · Sep 21', '+200')}
          ${task(`<span class="th ico">${wi('tag')}</span>`, 'Promo code LAUNCH50', 'Applied on the website · Sep 3', '+50')}
          ${task(`<span class="th ico">${ic('refresh')}</span>`, 'Refund · render failed', 'Sonic · Kling 2.5 · Sep 19', '+16', 1)}
        </div></div>
        <div class="z-card"><div class="ct"><h4>How offers work</h4></div><div class="z-rules">
          <div>${ic('clock')}<span><b>Timers are real.</b> Every countdown ends at a fixed server time and never restarts.</span></div>
          <div>${ic('shield')}<span><b>One urgent offer at a time.</b> Other offers wait in this list.</span></div>
          <div>${ic('check')}<span><b>No surprises.</b> Codes show a validity date; auto-refill has a monthly cap.</span></div>
        </div></div>
      </div>
    </div>`;

  /* ---------- sync helpers ---------- */
  const COMP = { umenuWeb: s => umenu(s, false), umenuIde: s => umenu(s, true), sname, spill, claimWeb, claimIde };
  const sync = n => `<div class="wsync" data-comp="${n}">${COMP[n](W[CUR])}</div>`;
  const mark = t => `<div class="newmark" style="top:2%;left:50%">${t}</div>`;
  const MAIN = 'top:0;left:13.56%;width:86.44%;height:100%;background:#000;overflow:hidden';
  const SNAME = 'top:8.3%;left:.74%;width:12.3%;height:7.9%';
  const PILL = 'top:97.75%;left:39.6%;width:13.8%;height:2.1%';
  const COMPOSER = ov('top:61.7%;left:1.15%;width:61.8%;height:28.6%;background:#e8e8e8;border-radius:.6em;overflow:hidden', C.COMPOSER || '');
  const ALL = ['new', 'claimed', 'low', 'sub'];
  const ANAT_MENU = [
    { b: 'Identity', t: 'Avatar, name, email and plan tag' },
    { b: 'Balance', t: 'Live QCC, runway, progress bar and two actions that change with the state' },
    { b: 'Smart row', t: 'One row by priority: claim bonus → Starter Kit → running low → invite friends' },
    { b: 'Navigation', t: 'Workspace, Usage, Plans, Invite, Promo code, Settings' },
    { b: 'Footer', t: 'Download app (web) / updates (IDE), help, log out' }
  ];
  const HFN = t => ({ text: t });
  const OK = t => ({ ok: true, text: t });

  /* ---------- blocks 17–24 ---------- */
  const OVERVIEW = A + 'qc/overview.png', IDE = A + 'qc/ide-po.png';
  BLOCKS_DATA.work = [
    {
      id: 'work-menu', num: '17', title: 'Profile menu with a live balance', where: 'Workspace · click on your name', opt: 'Core',
      hf: { src: 'Higgsfield · avatar menu', img: A + 'hf/43-menu.png', alt: 'Higgsfield account menu', notes: [HFN('Credits with a bar and quick “Get” buttons right in the menu'), HFN('No runway, no bonus state, no invite entry')] },
      qc: { src: 'Workspace · name chip + profile menu', bw: 1888, baseImg: OVERVIEW, dim: false,
        overlaysHtml: ov(SNAME, sync('sname')) + ov('top:8.3%;left:14%;width:18%', sync('umenuWeb')) + mark('NEW · profile menu'),
        notes: [OK('The name in the sidebar becomes a button with the balance under it'), OK('One smart row changes with the account: claim → Starter Kit → low → invite'), OK('Same component and states as the IDE menu (block 15)')] },
      impact: { metric: 'Top-ups and upgrades started from the menu', wave: 'Wave 1', target: 'All signed-in users' },
      spot: { theme: 'dark', size: 'Popover 340 px · radius 14 px · opens to the right of the name chip', items: ALL.map(k => ({ name: W[k].tab, w: 340, html: umenu(W[k], false), anat: ANAT_MENU })) },
      spec: {
        show: 'Click on the name chip in the sidebar opens the menu; Esc or a click outside closes it.',
        logic: ['Smart row priority: bonus not claimed → active Starter Kit → balance lasts < 2 days → invite (if passes left).', 'Runway = balance ÷ average daily spend over the last 14 days; hidden for new accounts.', 'Balance updates live after a claim, payment or task (push or 30 s poll).', 'Same markup in the IDE, light theme (block 15).'],
        data: ['GET /api/me → name, email, plan, balance, plan_credits, topup_credits', 'GET /api/me/offers → welcome_bonus{state, claim_until}, starter{ends_at}', 'GET /api/usage/runway → days'],
        events: ['menu_open{surface}', 'menu_click{item}', 'menu_smart_row_click{type}'],
        done: 'Each of the 4 states shows the right smart row; the balance matches the sidebar and the IDE.'
      }
    },
    {
      id: 'work-claim', num: '18', title: 'Claim your bonus — one click on the website', where: 'Workspace · first sign-in', opt: 'Core',
      hf: { src: 'Higgsfield · Gifts (live)', img: A + 'hf-live/gifts.png', alt: 'Higgsfield gifts page', notes: [HFN('Free credits come as codes and gift cards'), HFN('No moment of reward: credits appear silently')] },
      qc: { src: 'Workspace · claim modal + balance chip', bw: 1888, baseImg: OVERVIEW, dim: true,
        overlaysHtml: ov(SNAME, sync('sname')) + ov('top:9%;left:36%;width:30%', sync('claimWeb')) + mark('NEW · Claim your bonus'),
        notes: [OK('Press “Claim 200 QCC”: coins fly, the balance counts up in the sidebar'), OK('Real claim window (7 days from sign-up), no fake urgency'), OK('After the claim the next step is the Starter Kit')] },
      impact: { metric: 'Sign-up → first task (activation)', wave: 'Wave 1', target: 'New accounts' },
      spot: { theme: 'dark', size: 'Modal 520–566 px · art 190 px · one primary action', items: [
        { name: 'Ready to claim', w: 520, html: claimWeb(W.new), anat: [{ b: 'Art', t: 'banner_starter_kit.jpg + “+200 QCC” in display type' }, { b: 'Value', t: 'What 200 QCC covers: Lumi, Sonic, Cody' }, { b: 'Action', t: 'One button + real claim window' }] },
        { name: 'Claimed', w: 520, html: claimWeb(W.claimed), anat: [{ b: 'Result', t: 'Green button with the new balance' }, { b: 'Next step', t: 'Starter Kit with its own 24 h timer' }] },
        { name: 'Expired', w: 520, html: claimExpired(), anat: [{ b: 'Honest', t: 'No timer, no re-offer — packs from $2 instead' }] }
      ] },
      spec: {
        show: 'Opens once after the first sign-in if the bonus is not claimed; later from the menu smart row and the IDE.',
        logic: ['Claim window: 7 days from sign-up (server time, claim_until). Credits stay valid 14 days after the claim.', 'The claim request is idempotent — double clicks never add twice.', 'On success: coins fly to the balance chip, the number counts up, toast “+200 QCC added”, next step = Starter Kit.', 'Expired: no timer and no re-offer; show credit packs.'],
        data: ['POST /api/bonus/welcome/claim → {balance, expires_at}', 'welcome_bonus.state: ready | claimed | expired'],
        events: ['bonus_view{surface}', 'bonus_claim{surface}', 'bonus_expired_view'],
        done: 'One click adds 200 QCC exactly once and the balance updates everywhere without a reload.'
      }
    },
    {
      id: 'work-claim-ide', num: '19', title: 'Claim your bonus — inside the IDE', where: 'Desktop app · first launch', opt: 'Core',
      hf: { src: 'Higgsfield · image app (live)', img: A + 'hf-live/image-app.png', alt: 'Higgsfield image app', notes: [HFN('Inside the tool the only promo is a thin strip at the top'), HFN('No welcome reward where people actually create')] },
      qc: { src: 'Desktop app · claim card in the empty chat + status pill', bw: 1915, baseImg: IDE, dim: false,
        overlaysHtml: COMPOSER + ov('top:11%;left:19.5%;width:23%', sync('claimIde')) + ov(PILL, sync('spill')) + mark('NEW · Claim in the app'),
        notes: [OK('Balance 0 on first launch → claim card instead of an empty chat'), OK('Status-bar pill shows “Claim +200” and then the live balance'), OK('Claim here or on the website — both update everywhere')] },
      impact: { metric: 'First task in the app within 24 h', wave: 'Wave 1', target: 'New app users' },
      spot: { theme: 'light', size: 'Card 420 px · art 150 px · pill 24 px high', items: [
        { name: 'Ready to claim', w: 420, html: claimIde(W.new), anat: [{ b: 'Art', t: 'bg_new_user_light.jpg (teal gifts)' }, { b: 'Action', t: 'Same endpoint as the website' }] },
        { name: 'Claimed', w: 420, html: claimIde(W.claimed), anat: [{ b: 'Result', t: 'New balance + first-task suggestion' }] },
        { name: 'Status pill · 4 states', w: 300, html: `<div class="zi-pills">${ALL.map(k => spill(W[k])).join('')}</div>`, anat: [{ b: 'Pill', t: 'Dot turns amber when the balance lasts < 2 days' }] }
      ] },
      spec: {
        show: 'First launch with balance 0 and an unclaimed bonus: card in the empty chat; the status pill shows “Claim +200”.',
        logic: ['Uses the same claim endpoint as the website.', 'After the claim the card turns into a first-task suggestion; the pill shows the new balance.', 'Already claimed on the web → the card never appears (state from /api/me/offers).'],
        data: ['Same as block 18 + app_version, os'],
        events: ['bonus_view{surface:"ide"}', 'bonus_claim{surface:"ide"}', 'first_task_start'],
        done: 'Claim on the web → the IDE pill updates within 30 s; claim in the IDE → the web sidebar shows 200 QCC.'
      }
    },
    {
      id: 'work-guest', num: '20', title: 'Guest passes — invite friends', where: 'Workspace · menu → Invite friends', opt: 'Growth',
      hf: { src: 'Higgsfield · affiliate page', img: A + 'hf/104-affiliate-page.png', alt: 'Higgsfield affiliate page', notes: [HFN('Affiliate program for creators: link, commission, stats'), HFN('Nothing limited to “give” — no reason to share today')] },
      qc: { src: 'Workspace · guest pass modal', bw: 1888, baseImg: OVERVIEW, dim: true,
        overlaysHtml: ov('top:4.5%;left:35%;width:31%', guestWeb(false)) + mark('NEW · guest passes'),
        notes: [OK('10 passes a month make sharing feel like a gift'), OK('Both sides get 200 QCC after the friend’s first purchase'), OK('Invite list shows who joined and what you earned')] },
      impact: { metric: 'Invites sent → paying friends', wave: 'Wave 2', target: 'Paying users' },
      spot: { theme: 'dark', size: 'Modal 560 px · ticket header 175 px', items: [
        { name: 'Passes left', w: 560, html: guestWeb(false), anat: [{ b: 'Tickets', t: 'What the friend gets / what you get' }, { b: 'Passes', t: '10 per month, used ones dimmed' }, { b: 'Share', t: 'Copy link + 4 channels' }] },
        { name: 'All passes used', w: 560, html: guestWeb(true), anat: [{ b: 'Limit', t: 'Copy disabled, date of new passes' }] }
      ] },
      spec: {
        show: 'From the menu “Invite friends”, the rewards tab in Settings and the IDE menu.',
        logic: ['10 passes per calendar month; a pass is used when a new account signs up with the link.', 'Both sides get 200 QCC after the friend’s first payment; a refund within 14 days reverses it.', 'Same account, device or card as the inviter → no reward.'],
        data: ['GET /api/referral → link, passes_left, resets_at, invites[{email, state}]', 'POST /api/referral/invite {email}'],
        events: ['invite_open{surface}', 'invite_copy', 'invite_send{channel}', 'invite_reward'],
        done: 'Pass counter, copy link and invite list work; rewards follow the rules above.'
      }
    },
    {
      id: 'work-guest-ide', num: '21', title: 'Guest passes — share from the IDE', where: 'Desktop app · account menu → Invite friends', opt: 'Growth',
      hf: { src: 'Higgsfield · result screen', img: A + 'hf/35-result.png', alt: 'Higgsfield result screen', notes: [HFN('After a good result: upsell, but no “share with a friend”'), HFN('Referral lives only on a separate affiliate page')] },
      qc: { src: 'Desktop app · share sheet', bw: 1915, baseImg: IDE, dim: false,
        overlaysHtml: COMPOSER + '<div class="dim"></div>' + ov('top:7%;left:38%;width:24%', guestIde()) + mark('NEW · share from the app'),
        notes: [OK('Same passes and link as the website'), OK('Light IDE style, opens over the chat'), OK('Copy link in one click right after a good result')] },
      impact: { metric: 'Invites sent from the app', wave: 'Wave 2', target: 'Active app users' },
      spot: { theme: 'light', size: 'Sheet 440 px · ticket header 160 px', items: [{ name: 'Share sheet', w: 440, html: guestIde(), anat: [{ b: 'Same data', t: 'GET /api/referral — one source for web and IDE' }] }] },
      spec: {
        show: 'IDE account menu → Invite friends; also suggested after a successful result (max once a week).',
        logic: ['Same passes, link and rewards as block 20.', 'The post-result suggestion never shows while a paid offer is on screen.'],
        data: ['GET /api/referral'],
        events: ['invite_open{surface:"ide"}', 'invite_copy{surface:"ide"}'],
        done: 'The IDE sheet shows the same counter and link as the website.'
      }
    },
    {
      id: 'work-overview', num: '22', title: 'Workspace overview — credits at a glance', where: 'quadcode.ai/profile/overview', opt: 'Core',
      hf: { src: 'Higgsfield · home, signed in (live)', img: A + 'hf-live/home.png', alt: 'Higgsfield signed-in home', notes: [HFN('Home = showcase of models and community results'), HFN('The balance lives in a menu; no personal dashboard')] },
      qc: { src: 'Workspace · Overview (replaces the static “Install” page)', bw: 1888, baseImg: OVERVIEW, dim: false,
        overlaysHtml: ov(MAIN, dash()) + mark('NEW · overview'),
        notes: [OK('Balance split: plan credits vs top-up credits that never expire'), OK('One best offer, results with their cost, spend by agent'), OK('The install card moves to “Desktop App”')] },
      impact: { metric: 'Return visits · offer clicks', wave: 'Wave 2', target: 'All signed-in users' },
      spot: { theme: 'dark', size: 'Cards radius 14 px · 1.25 em gaps · 12-column grid', items: [
        { name: 'Balance card', w: 720, html: balCard(), anat: [{ b: 'Ring', t: 'Plan vs top-up credits' }, { b: 'Forecast', t: 'Covered / runs out before renewal' }] },
        { name: 'Best offer card', w: 380, html: nbaCard(), anat: [{ b: 'One offer', t: 'Bonus → Starter Kit → Yearly, never two urgent offers' }] }
      ] },
      spec: {
        show: 'Landing page after sign-in (quadcode.ai/profile/overview).',
        logic: ['Plan credits expire one month after renewal; top-up credits never expire — shown separately.', 'Offer card = one best offer by priority; never two urgency offers at once.', 'Recent work = last 5 results with the credits each cost.'],
        data: ['GET /api/me', 'GET /api/usage/summary?range=30d', 'GET /api/results?limit=5', 'GET /api/me/offers'],
        events: ['overview_view', 'overview_offer_click{offer}', 'overview_result_open'],
        done: 'All numbers match Usage and Billing; the page works for new, low-balance and subscriber accounts.'
      }
    },
    {
      id: 'work-usage', num: '23', title: 'Usage & forecast', where: 'quadcode.ai/profile/usage', opt: 'Quick win',
      hf: { src: 'Higgsfield · usage (live)', img: A + 'hf-live/usage.png', alt: 'Higgsfield usage page', notes: [HFN('Table of generations: date, model, credits'), HFN('No forecast, no model share, refunds not visible')] },
      qc: { src: 'Workspace · Usage', bw: 1888, baseImg: A + 'qc/usage.png', dim: false,
        overlaysHtml: ov(MAIN, usage()) + mark('NEW · usage & forecast'),
        notes: [OK('Stacked daily chart by agent + forecast to renewal'), OK('Refunds shown as positive rows'), OK('Upsell only when the pace is above the plan')] },
      impact: { metric: 'Auto-refill opt-ins · Yearly switches', wave: 'Wave 2', target: 'Heavy users' },
      spot: { theme: 'dark', size: 'Strip 72 px · table rows 40 px', items: [
        { name: 'Pace above plan', w: 900, html: foreUp(), anat: [{ b: 'Trigger', t: 'Monthly pace > plan credits' }, { b: 'Actions', t: 'Auto-refill or Yearly — no timers' }] },
        { name: 'By model', w: 620, html: modelTbl(), anat: [{ b: 'Share bar', t: 'Agent colour · % of 30-day spend' }] }
      ] },
      spec: {
        show: 'quadcode.ai/profile/usage; ranges 7 / 30 / 90 days.',
        logic: ['Forecast = 14-day average daily spend projected to the renewal date.', 'Refunds (failed runs) are listed as positive rows.', 'The upsell strip appears only when the monthly pace is above the plan credits.'],
        data: ['GET /api/usage?range=7d|30d|90d&group=day,agent,model', 'GET /api/usage/tasks?sort=cost'],
        events: ['usage_range_change', 'usage_export', 'usage_upsell_click{action}'],
        done: 'Chart, KPIs and table add up to the same total; forecast bars look clearly different.'
      }
    },
    {
      id: 'work-rewards', num: '24', title: 'Rewards & offers in Settings', where: 'quadcode.ai/profile/settings', opt: 'Quick win',
      hf: { src: 'Higgsfield · subscription (live)', img: A + 'hf-live/subscription.png', alt: 'Higgsfield subscription settings', notes: [HFN('Settings = plan, renewal date, change or cancel'), HFN('Offers and codes are scattered: strips, modals, emails')] },
      qc: { src: 'Workspace · Settings → Rewards & offers', bw: 1888, baseImg: A + 'qc/settings.png', dim: false,
        overlaysHtml: ov(MAIN, rewards()) + mark('NEW · rewards & offers'),
        notes: [OK('Every offer in one place: active, always-on, claimed'), OK('Promo codes show a validity date, not a countdown'), OK('Auto-refill with a monthly cap and email receipts')] },
      impact: { metric: 'Offer and code redemption', wave: 'Wave 2', target: 'All signed-in users' },
      spot: { theme: 'dark', size: 'List rows 64 px · card radius 14 px', items: [
        { name: 'Your offers', w: 640, html: offersCard(), anat: [{ b: 'Order', t: 'Urgent → always-on → claimed' }] },
        { name: 'Promo code', w: 420, html: promoCard(), anat: [{ b: 'Codes', t: 'Validity date, used codes dimmed' }] }
      ] },
      spec: {
        show: 'Settings → “Rewards & offers” tab (badge = number of active offers).',
        logic: ['Lists every offer the user has: active, always-on and claimed; expired ones go to History.', 'Promo codes show their own validity date — no countdowns.', 'Auto-refill: threshold + pack + monthly cap; email after every charge.'],
        data: ['GET /api/me/offers', 'GET /api/promo/codes', 'POST /api/promo/apply {code}', 'PUT /api/billing/auto-refill {enabled, threshold, pack}'],
        events: ['rewards_view', 'promo_apply{result}', 'autorefill_toggle{on}'],
        done: 'Every offer and code is findable in one place; the auto-refill toggle saves instantly.'
      }
    }
  ];

  /* ---------- block 15 (IDE menu) → same menu, light, synced ---------- */
  const m = (BLOCKS_DATA.ide || []).find(b => b.id === 'ide-menu');
  if (m) {
    m.qc.overlaysHtml = COMPOSER + ov('bottom:2.8%;left:72.4%;width:17.8%', sync('umenuIde')) + ov(PILL, sync('spill'));
    m.qc.notes = [OK('Same menu as the website (block 17), light theme'), OK('Live balance + one smart row: claim → Starter Kit → low → invite'), OK('Claim right from the menu — the pill and the web update too')];
    if (m.spot) { m.spot.size = 'Popover 341 px · radius 14 px · anchored above the name in the status bar'; m.spot.items = ALL.map(k => ({ name: W[k].tab, w: 341, html: umenu(W[k], true), anat: ANAT_MENU })); }
  }

  /* ---------- runtime: states, claim, coins, toast ---------- */
  function tween(el, a, b) {
    const t0 = performance.now(), d = 900;
    const host = el.closest('.bal, .z-sname, .zi-spill, .claim') || el;
    host.classList.remove('bump'); void host.offsetWidth; host.classList.add('bump');
    (function f(t) { const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = fq(Math.round((a + (b - a) * e) * 100) / 100); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  function setState(k, animate) {
    if (!W[k]) return;
    const from = W[CUR].bal; CUR = k;
    document.querySelectorAll('.wsync').forEach(el => { el.innerHTML = COMP[el.dataset.comp](W[k]); });
    document.querySelectorAll('.wbar [data-wset]').forEach(b => b.classList.toggle('on', b.dataset.wset === (W[k].base || k) && !b.classList.contains('rs')));
    if (animate && from !== W[k].bal) document.querySelectorAll('.wsync [data-bal]').forEach(el => tween(el, from, W[k].bal));
  }
  function burst(r, fs, light) {
    const fx = document.createElement('div'); fx.className = 'claim-fx';
    fx.style.cssText = `position:fixed;inset:auto;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;font-size:${fs}px;z-index:9999;pointer-events:none`;
    for (let i = 0; i < 18; i++) {
      const c = document.createElement('i'); c.className = 'coin';
      const a = Math.PI * (0.08 + 0.84 * Math.random()), d = 3 + Math.random() * 6;
      c.style.setProperty('--dx', (Math.cos(a) * d).toFixed(2) + 'em'); c.style.setProperty('--dy', (-Math.sin(a) * d).toFixed(2) + 'em');
      c.style.left = (20 + Math.random() * 60) + '%'; c.style.animationDelay = (Math.random() * 140) + 'ms';
      fx.appendChild(c);
    }
    document.body.appendChild(fx); setTimeout(() => fx.remove(), 1500);
    const t = document.createElement('div'); t.className = 'claim-toast' + (light ? ' light' : '');
    t.innerHTML = `<i>${ic('check')}</i><span><b>+200 QCC</b> added to your balance</span>`;
    t.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top - 10}px;bottom:auto;transform:translate(-50%,-100%);font-size:${Math.max(13, fs)}px;animation:none;z-index:10000`;
    document.body.appendChild(t);
    t.animate([{ opacity: 0, transform: 'translate(-50%,-60%)' }, { opacity: 1, transform: 'translate(-50%,-100%)' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
    setTimeout(() => { t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 }).onfinish = () => t.remove(); }, 2200);
  }
  let busy = false;
  document.addEventListener('click', e => {
    const set = e.target.closest('.wbar [data-wset]');
    if (set) { e.preventDefault(); setState(set.dataset.wset); return; }
    const btn = e.target.closest('[data-claim]');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    const box = btn.closest('.claimable');
    if ((busy && Date.now() - busy < 2500) || (box && box.classList.contains('claimed'))) return;
    busy = Date.now();
    const light = !!btn.closest('.umenu.light, .zi-claim, .zi-spill, .zi-pills');
    const r = btn.getBoundingClientRect(), fs = Math.max(11, parseFloat(getComputedStyle(btn).fontSize) || 14);
    btn.classList.add('busy');
    if (btn.tagName === 'BUTTON') btn.innerHTML = '<span class="spin"></span> Claiming…';
    setTimeout(() => {
      burst(r, fs, light);
      if (!btn.closest('.wsync') && box) {
        box.classList.add('claimed');
        box.querySelectorAll('[data-bal]').forEach(el => { el.dataset.bal = W.claimed.bal; tween(el, 0, W.claimed.bal); });
      }
      if (CUR === 'new') setState('claimed', true);
      btn.classList.remove('busy');
      busy = false;
    }, 520);
  }, true);

  /* ---------- floating state switcher ---------- */
  window.addEventListener('load', () => {
    const bar = document.createElement('div'); bar.className = 'wbar';
    bar.innerHTML = `<span class="l">${ic('user')} Demo account</span>${ALL.map(k => `<button type="button" data-wset="${k}" class="${k === CUR ? 'on' : ''}"><b>${W[k].tab}</b><small>${fq(W[k].bal)} QCC</small></button>`).join('')}<button type="button" class="rs" data-wset="new" title="Reset demo" aria-label="Reset demo">${ic('refresh')}</button>`;
    document.body.appendChild(bar);
    const seen = new Set();
    const io = new IntersectionObserver(es => { es.forEach(x => x.isIntersecting ? seen.add(x.target) : seen.delete(x.target)); bar.classList.toggle('show', seen.size > 0); }, { threshold: 0.05 });
    ['work', 'ide-menu'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  });

  window.QC_WORK = { W, COMP, setState, umenu, claimWeb, claimIde, burst, tween, fq, wi, cur: () => CUR };
})();

/* ============================================================
 * 25 · IDE model picker with prices → balance → paywall states.
 * Same wallet engine as 17–24 (QC_WORK): every .wsync re-renders on
 * setState(). Run / Top up / Fit derive a "live" wallet state, so the
 * menu, status pill and wallet switcher react to every choice.
 * ============================================================ */
(() => {
  const Q = window.QC_WORK, C = window.QC_COMPONENTS;
  if (!Q || !C || !window.BLOCKS_DATA || !Array.isArray(window.BLOCKS_DATA.work)) return;
  const { W, COMP, fq } = Q, { ov, ic } = C;
  const A = '../assets/';
  const LOW = 100;                                                  // LOW_BALANCE_THRESHOLD, QCC
  const PACKS = [[100, 2], [500, 10], [1000, 20], [4000, 80]];     // real store packs: QCC, $
  const KIT = [1200, 20];                                           // Starter Kit (+20%), free accounts, once
  const r2 = n => Math.round(n * 100) / 100;
  const CV = '<svg class="cv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  /* catalog — real prices from the IDE model cache (price_text) */
  const mk = (id, nm, lg, by, p, u, tag) => ({ id, nm, lg, by, p, u, tag });
  const M = {
    video: [
      mk('sd', 'Seedance', 'bytedance', 'ByteDance', 230, 'video', 'TOP'),
      mk('veo', 'Veo 3', 'google', 'Google', 200, 'video'),
      mk('k3', 'Kling 3', 'kling', 'Kuaishou', 60, 'video', 'NEW'),
      mk('wan', 'Wan 2.7', 'alibaba', 'Alibaba', 60, 'video'),
      mk('kl', 'Kling', 'kling', 'Kuaishou', 55, 'video'),
      mk('grokv', 'Grok Video', 'grok', 'xAI', 32, 'video'),
      mk('rw', 'Runway Gen-3', '', 'Runway', 22, 'video')
    ],
    image: [
      mk('nb', 'Nano Banana', 'gemini', 'Google', 9.2, 'image', 'TOP'),
      mk('gpti', 'GPT Image', 'openai', 'OpenAI', 4.2, 'image'),
      mk('fmax', 'Flux 2 Max', 'flux', 'Black Forest Labs', 4.2, 'image'),
      mk('fpro', 'Flux 2 Pro', 'flux', 'Black Forest Labs', 1.8, 'image'),
      mk('groki', 'Grok Image', 'grok', 'xAI', 1.2, 'image')
    ],
    audio: [
      mk('suno', 'Suno', 'suno', 'Suno', 9, 'song', 'TOP'),
      mk('el', 'ElevenLabs', 'elevenlabs', 'ElevenLabs', 1.7, 'sound'),
      mk('tts', 'Gemini TTS', 'gemini', 'Google', 1.2, 'voice clip')
    ],
    chat: [
      mk('fable', 'claude-fable-5-1', 'claude', 'Anthropic', 1200, '1M tokens', 'Current'),
      mk('opus', 'claude-opus-5-5', 'claude', 'Anthropic', 600, '1M tokens'),
      mk('sonnet', 'claude-sonnet-5', 'claude', 'Anthropic', 300, '1M tokens'),
      mk('astra', 'gpt-6-astra', 'openai', 'OpenAI', 1800, '1M tokens'),
      mk('sol', 'gpt-6-sol', 'openai', 'OpenAI', 438, '1M tokens'),
      mk('grok', 'grok-4.7', 'grok', 'xAI', 200, '1M tokens'),
      mk('gflash', 'gemini-3.8-flash', 'gemini', 'Google', 150, '1M tokens'),
      mk('dsf', 'deepseek-flash', '', 'DeepSeek', 11, '1M tokens')
    ]
  };
  const TABS = [['video', 'Video'], ['image', 'Image'], ['audio', 'Audio'], ['chat', 'Chat']];
  /* the task in the composer: 3 clips + soundtrack + 3 covers (chat tokens are billed by use) */
  const PLAN = [['video', 3, 'clips'], ['audio', 1, 'soundtrack'], ['image', 3, 'covers']];
  const HERO = { video: 'c3.jpg', image: 'c1.jpg', audio: 'c4.jpg', chat: 'c6.jpg' };
  const DEF = { chat: 'fable', image: 'nb', video: 'sd', audio: 'suno' };
  const PK = { tab: 'video', sel: Object.assign({}, DEF) };
  let REFILL = false;

  const find = (t, id) => M[t].find(m => m.id === id) || M[t][0];
  const qty = t => (PLAN.find(p => p[0] === t) || [0, 0])[1];
  const cost = sel => r2(PLAN.reduce((s, [t, n]) => s + n * find(t, sel[t]).p, 0));
  const cheapest = t => M[t].reduce((a, m) => (m.p < a.p ? m : a));
  const tok = m => (m >= 1 ? (m >= 100 ? Math.round(m) : Math.round(m * 10) / 10) + 'M' : Math.max(1, Math.round(m * 1000)) + 'K');
  const logo = (m, cls) => (m.lg ? `<img class="${cls}" src="${A}logos/${m.lg}.svg" alt="">` : `<span class="${cls} lt"><span>${m.by.slice(0, 2)}</span></span>`);
  const mark = (pos, t) => `<div class="newmark" style="${pos}">${t}</div>`;

  /* one rule for every surface: bonus › out › short › low-after › fits */
  function judge(s, sel) {
    sel = sel || PK.sel;
    const t = cost(sel), bal = s.bal, after = r2(bal - t), need = r2(Math.max(0, t - bal));
    const k = s.bonus === 'ready' ? 'bonus' : bal < 1 ? 'out' : after < 0 ? 'short' : after < LOW ? 'lowafter' : 'fits';
    const pk = PACKS.find(x => x[0] >= need) || PACKS[PACKS.length - 1];
    const offer = s.free && !s.kit ? { q: KIT[0], p: KIT[1], l: 'Starter Kit' } : { q: pk[0], p: pk[1], l: 'Top up' };
    return { t, bal, after, need, k, offer };
  }
  /* best model mix whose plan cost still fits the balance (keeps quality as high as possible) */
  function fit(bal, sel) {
    let best = null;
    M.video.forEach(v => M.audio.forEach(a => M.image.forEach(i => {
      const s2 = Object.assign({}, sel, { video: v.id, audio: a.id, image: i.id }), t = cost(s2);
      if (t <= bal && (!best || t > best.t)) best = { t, sel: s2 };
    })));
    return best;
  }
  /* wallet after a charge / top-up; keeps the demo state it came from */
  function derive(b, nb) {
    nb = Math.max(0, r2(nb));
    const s = Object.assign({}, b, { bal: nb, base: b.base || b.k, warn: nb < LOW });
    if (b.free) {
      s.k = 'claimed'; s.pct = Math.min(100, Math.round(nb / 2));
      s.run = nb < 1 ? 'Out of credits' : nb < LOW ? 'Running low' : 'Valid for 14 days';
    } else {
      const d = Math.round(nb / 62);
      s.k = nb < LOW ? 'low' : 'sub'; s.pct = Math.min(100, Math.round(nb / 12.4));
      s.run = nb < 1 ? 'Out of credits' : `\u2248 ${Math.max(1, d)} day${d > 1 ? 's' : ''} left`;
    }
    return s;
  }

  function afford(s, t, m) {
    if (s.bonus === 'ready') return (t === 'chat' || m.p * qty(t) <= 200) ? `<em class="ok">${ic('gift')} Bonus covers it</em>` : `<em class="no">${ic('lock')} Bonus + ${fq(r2(m.p * qty(t) - 200))}</em>`;
    if (t === 'chat') return s.bal >= 1 ? `<em>\u2248 ${tok(s.bal / m.p)} tokens</em>` : `<em class="no">${ic('lock')} Add 1 QCC</em>`;
    const n = Math.floor(s.bal / m.p + 1e-9);
    return n >= 1 ? `<em>${n > 999 ? '999+' : fq(n)} on balance</em>` : `<em class="no">${ic('lock')} Need ${fq(r2(m.p - s.bal))}</em>`;
  }

  /* picker popover */
  function pop(s) {
    const t = PK.tab, n = qty(t), cur = find(t, PK.sel[t]), low = cheapest(t);
    const seg = TABS.map(([k, l]) => `<span class="${k === t ? 'on' : ''}" data-pk="tab:${k}">${l}</span>`).join('');
    const hero = n
      ? `<div class="pk-hero" style="background-image:url(${A}${HERO[t]})"><div><small>In this task</small><b>${n} ${PLAN.find(p => p[0] === t)[2]} \u00d7 ${cur.nm}</b></div><div class="v"><b>${fq(r2(n * cur.p))}</b><small>QCC</small></div></div>`
      : `<div class="pk-hero" style="background-image:url(${A}${HERO[t]})"><div><small>Agent chat \u00b7 billed by use</small><b>${cur.nm}</b></div><div class="v"><b>~${fq(cur.p)}</b><small>QCC / 1M tokens</small></div></div>`;
    const rows = M[t].map(m => {
      const on = m.id === cur.id, short = s.bonus !== 'ready' && (t === 'chat' ? s.bal < 1 : s.bal < m.p);
      const badge = (m.tag ? `<span class="zi-chip">${m.tag}</span>` : '') + (m.id === low.id ? '<span class="zi-chip g">Cheapest</span>' : '');
      return `<div class="zi-mrow ${on ? 'on' : ''} ${short ? 'short' : ''}" data-pk="sel:${t}:${m.id}" role="option" aria-selected="${on}"><span class="rd"></span>${logo(m, 'lg')}<span class="nm"><b>${m.nm}${badge}</b><small>${m.by} \u00b7 per ${m.u}</small></span><span class="c"><b>${t === 'chat' ? '~' : ''}${fq(m.p)}</b><i>QCC</i>${afford(s, t, m)}</span></div>`;
    }).join('');
    return `<div class="zi-models zi-pk" role="listbox" aria-label="Choose a model"><div class="hd"><b>Choose a model</b><span class="zi-seg">${seg}</span></div>${hero}<div class="pk-list">${rows}</div><div class="ft"><span>Balance <b data-bal>${fq(s.bal)}</b> QCC \u00b7 ${s.plan}</span><span>1,000 QCC = $20</span></div></div>`;
  }

  /* composer chips + action row */
  function bar(s) {
    const e = judge(s);
    const chips = PLAN.map(([t, n]) => { const m = find(t, PK.sel[t]); return `<button type="button" class="pk-chip ${PK.tab === t ? 'on' : ''}" data-pk="tab:${t}">${logo(m, 'li')}<span>${m.nm} <i>\u00d7${n}</i></span><b>${fq(r2(m.p * n))}</b>${CV}</button>`; }).join('');
    let act;
    if (e.k === 'bonus') act = `<span class="pk-aft ok">${ic('gift')} Welcome bonus <b>200</b> QCC is ready \u00b7 this task costs <b>${fq(e.t)}</b></span><button type="button" class="zi-btn pri sm" data-claim>Claim 200 QCC</button>`;
    else if (e.k === 'fits') act = `<span class="pk-aft">Balance <b data-bal>${fq(e.bal)}</b> \u2192 <b>${fq(e.after)}</b> after this run</span><button type="button" class="zi-btn pri sm" data-pk="run">Run \u00b7 ${fq(e.t)} QCC</button>`;
    else if (e.k === 'lowafter') act = `<span class="pk-aft warn">${ic('alert')} Leaves <b>${fq(e.after)}</b> QCC (below 100) \u00b7 <a data-pk="refill">${REFILL ? 'Auto-refill is on \u2713' : 'Turn on auto-refill'}</a></span><button type="button" class="zi-btn pri sm" data-pk="run">Run \u00b7 ${fq(e.t)} QCC</button>`;
    else {
      const f = e.k === 'short' ? fit(e.bal, PK.sel) : null;
      act = `<span class="pk-aft no">${ic('alert')} ${e.k === 'out' ? 'Out of credits \u2014 nothing runs until you top up' : `Needs <b>${fq(e.t)}</b> \u00b7 you have <b data-bal>${fq(e.bal)}</b>`}</span>${f ? `<button type="button" class="zi-btn ghost sm" data-pk="fit">Fit to balance \u00b7 ${fq(f.t)}</button>` : ''}<button type="button" class="zi-btn pri sm" data-pk="top">${e.offer.l} \u00b7 ${fq(e.offer.q)} QCC \u00b7 $${e.offer.p}</button>`;
    }
    return `<div class="pk-bar">${chips}</div><div class="pk-act">${act}</div>`;
  }
  /* the real IDE LLM chip (bottom toolbar) + price per 1M tokens */
  function llmChip() {
    const m = find('chat', PK.sel.chat);
    return `<button type="button" class="pk-chip llm ${PK.tab === 'chat' ? 'on' : ''}" data-pk="tab:chat">${logo(m, 'li')}<span>${m.nm}</span><b>~${fq(m.p)}/1M</b>${CV}</button>`;
  }

  /* live inspector (handoff aid) */
  const ST = [
    ['bonus', 'Bonus ready', 'New account \u00b7 0 QCC \u00b7 200 QCC claimable', 'Run becomes \u201cClaim 200 QCC\u201d'],
    ['fits', 'Fits', 'balance \u2212 plan \u2265 100', 'Price on Run + balance after the run'],
    ['lowafter', 'Fits, leaves < 100', '0 \u2264 balance \u2212 plan < 100', 'Amber hint + auto-refill \u00b7 menu turns \u201cRunning low\u201d'],
    ['short', 'Short for this plan', '1 \u2264 balance < plan', 'Fit to balance \u00b7 smallest pack or Starter Kit \u00b7 never a 402'],
    ['out', 'Out of credits', 'balance < 1 QCC', 'Top up \u00b7 IDE banner \u201cout of credits\u201d']
  ];
  function inspect(s) {
    const e = judge(s), mx = Math.max(e.t, s.bal, LOW) * 1.12, pc = v => Math.min(100, v / mx * 100).toFixed(1) + '%';
    const cur = ST.find(x => x[0] === e.k);
    const why = e.k === 'bonus' ? 'bonus_state = ready \u2192 claim before the first run'
      : e.k === 'out' ? `balance ${fq(e.bal)} < 1 QCC`
      : e.k === 'short' ? `balance ${fq(e.bal)} < plan ${fq(e.t)} \u2192 short by ${fq(e.need)}`
      : `${fq(e.bal)} \u2212 ${fq(e.t)} = ${fq(e.after)} ${e.k === 'fits' ? '\u2265' : '<'} ${LOW}`;
    return `<div class="pk-ins"><div class="hd"><b>Paywall state \u00b7 live</b><span class="zi-chip">${cur[1]}</span></div>`
      + `<div class="kv"><div><small>Balance</small><b data-bal>${fq(s.bal)}</b></div><div><small>This run</small><b>${fq(e.t)}</b></div><div><small>After</small><b class="${e.after < 0 ? 'neg' : e.after < LOW ? 'warn' : ''}">${e.after < 0 ? '\u2212' + fq(-e.after) : fq(e.after)}</b></div></div>`
      + `<div class="mt"><i class="b" style="width:${pc(s.bal)}"></i><i class="l" style="left:${pc(LOW)}"><span>low 100</span></i><i class="t" style="left:${pc(e.t)}"><span>plan ${fq(e.t)}</span></i></div>`
      + `<ol>${ST.map((x, i) => `<li class="${x[0] === e.k ? 'on' : ''}"><i>${i + 1}</i><div><b>${x[1]}</b><small>${x[2]}</small><em>${x[3]}</em></div></li>`).join('')}</ol>`
      + `<div class="why"><b>Why:</b> ${why}</div></div>`;
  }

  /* decision table (spotlight): same judge() as the live UI */
  function table() {
    const PRE = [
      ['Seedance \u00d73 \u00b7 Suno \u00b7 Nano Banana \u00d73', { video: 'sd', audio: 'suno', image: 'nb' }],
      ['Kling 3 \u00d73 \u00b7 Suno \u00b7 Nano Banana \u00d73', { video: 'k3', audio: 'suno', image: 'nb' }],
      ['Grok Video \u00d73 \u00b7 ElevenLabs \u00b7 Grok Image \u00d73', { video: 'grokv', audio: 'el', image: 'groki' }]
    ];
    const COLS = [W.new, W.claimed, W.low, W.sub, Object.assign({}, W.low, { tab: 'Spent to zero', bal: 0 })];
    const LBL = { bonus: 'Claim first', fits: 'Fits', lowafter: 'Leaves < 100', short: 'Short', out: 'Out' };
    const head = COLS.map(s => `<th>${s.tab}<b>${fq(s.bal)}</b></th>`).join('');
    const body = PRE.map(([nm, sel]) => {
      const t = cost(sel);
      return `<tr><th>${nm}<b>${fq(t)} QCC</b></th>${COLS.map(s => {
        const j = judge(s, sel);
        const d = j.k === 'fits' || j.k === 'lowafter' ? `${fq(j.after)} left` : j.k === 'short' ? `short ${fq(j.need)}` : j.k === 'bonus' ? (t <= 200 ? 'bonus covers it' : `bonus + ${fq(r2(t - 200))}`) : `${j.offer.l.toLowerCase()} ${fq(j.offer.q)}`;
        return `<td><b class="s ${j.k}">${LBL[j.k]}</b><small>${d}</small></td>`;
      }).join('')}</tr>`;
    }).join('');
    const chat = `<tr><th>Chat only \u00b7 claude-fable-5-1<b>~1,200 / 1M tokens</b></th>${COLS.map(s => (s.bonus === 'ready' ? '<td><b class="s bonus">Claim first</b><small>then \u2248 167K tokens</small></td>' : s.bal >= 1 ? `<td><b class="s fits">Sends</b><small>\u2248 ${tok(s.bal / 1200)} tokens</small></td>` : '<td><b class="s out">Out</b><small>add at least 1 QCC</small></td>')).join('')}</tr>`;
    return `<table class="pk-dt"><thead><tr><th>Task plan<b>cost</b></th>${head}</tr></thead><tbody>${body}${chat}</tbody></table>`;
  }

  Object.assign(COMP, { pkPop: pop, pkBar: bar, pkIns: inspect, pkLlm: llmChip });
  const sync = n => `<div class="wsync" data-comp="${n}">${COMP[n](W[Q.cur()])}</div>`;
  const refresh = () => Q.setState(Q.cur());
  const ex = (s, lbl, n) => `<div class="pk-sr"><span class="lb">${n} \u00b7 ${lbl}</span><div class="pk-cb">${bar(s)}</div></div>`;

  function fx(r, txt, up) {
    const d = document.createElement('div');
    d.className = 'pk-fx' + (up ? ' up' : '');
    d.textContent = txt;
    d.style.left = (r.left + r.width / 2) + 'px';
    d.style.top = (r.top - 10) + 'px';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 1500);
  }

  document.addEventListener('click', e => {
    if (e.target.closest('.wbar .rs')) { PK.tab = 'video'; PK.sel = Object.assign({}, DEF); REFILL = false; setTimeout(refresh, 0); return; }
    const el = e.target.closest('[data-pk]');
    if (!el || !el.closest('.wsync')) return;
    e.preventDefault(); e.stopPropagation();
    const [a, t, id] = el.dataset.pk.split(':');
    const s = W[Q.cur()];
    if (a === 'tab') { PK.tab = t; refresh(); return; }
    if (a === 'sel') { PK.tab = t; PK.sel[t] = id; refresh(); return; }
    if (a === 'fit') { const f = fit(s.bal, PK.sel); if (f) PK.sel = f.sel; refresh(); return; }
    if (a === 'refill') { REFILL = !REFILL; refresh(); return; }
    if (el.disabled) return;
    const r = el.getBoundingClientRect(), j = judge(s);
    if (a === 'run') {
      if (j.k !== 'fits' && j.k !== 'lowafter') return;
      el.disabled = true; el.textContent = 'Running\u2026';
      setTimeout(() => {
        let nb = j.after, auto = false;
        if (REFILL && nb < LOW) { nb += 500; auto = true; }
        W.live = derive(s, nb); Q.setState('live', true);
        fx(r, '\u2212' + fq(j.t) + ' QCC');
        if (auto) setTimeout(() => fx(r, '+500 QCC \u00b7 auto-refill $10', true), 650);
      }, 450);
      return;
    }
    if (a === 'top') {
      el.disabled = true; el.textContent = 'Paying\u2026';
      setTimeout(() => {
        W.live = derive(s, s.bal + j.offer.q);
        if (j.offer.l === 'Starter Kit') W.live.kit = true;
        Q.setState('live', true);
        fx(r, '+' + fq(j.offer.q) + ' QCC', true);
      }, 450);
    }
  }, true);

  window.BLOCKS_DATA.work.push({
    id: 'ide-models', num: '25', title: 'Model picker with prices \u2014 and what each choice does to the balance', where: 'Desktop app \u00b7 composer', opt: 'New \u00b7 product',
    hf: {
      src: 'higgsfield.ai \u00b7 Video \u00b7 model list + Generate', img: A + 'hf/38-picker-generate.png',
      alt: 'Higgsfield video model list with TOP / NEW / FREE badges next to the composer with a struck-through price on Generate',
      notes: [
        { text: 'Model list: logo, name, TOP / NEW / FREE badges, resolution and duration chips \u2014 no prices in the list' },
        { text: 'The price lives only on Generate: \u201c\u2726 256 \u2192 192\u201d struck through (30% off), changes with duration, resolution and bitrate' },
        { text: '\u201cUnlimited mode\u201d toggle right above Generate sells a pass for the chosen model' },
        { text: 'No balance math: you find out you are short only after clicking Generate (top-up modal)' }
      ]
    },
    qc: {
      src: 'Desktop app \u00b7 composer chips + model picker + live paywall state', bw: 1915, baseImg: A + 'qc/ide-po.png', dim: false,
      overlaysHtml: ov('top:61.7%;left:1.15%;width:61.8%;height:28.6%;background:#e8e8e8;border-radius:.6em;overflow:hidden', (C.COMPOSER || '') + `<div class="pk-dock">${sync('pkBar')}</div>`)
        + ov('top:92.6%;left:47.2%;width:10.6%;height:4%;background:#e8e8e8;display:flex;align-items:center;justify-content:flex-end', sync('pkLlm'))
        + ov('bottom:39.6%;left:1.6%;width:25%', sync('pkPop'))
        + ov('top:10.2%;left:65.2%;width:32.6%', sync('pkIns'))
        + ov('top:97.7%;left:39.6%;height:2.15%;display:flex;align-items:center', sync('spill'))
        + mark('top:7.6%;left:27.5%', 'NEW \u00b7 PRICE ON EVERY MODEL'),
      notes: [
        { ok: true, text: 'Price on every row plus how many runs your balance covers; short rows show exactly how much is missing' },
        { ok: true, text: 'One chip per media step (model \u00d7 quantity + subtotal); total on Run, balance after the run right next to it' },
        { ok: true, text: 'Short \u2192 \u201cFit to balance\u201d (best mix you can afford) or the smallest pack that covers \u2014 never a 402' },
        { ok: true, text: 'Try it: switch the demo wallet, pick models, press Run / Top up \u2014 menu, status bar and inspector follow' }
      ]
    },
    impact: 'Users see the cost before they commit, then pick what fits or top up at the exact moment of need \u2014 fewer failed video runs, more pack purchases on heavy tasks.',
    spot: {
      theme: 'light', size: 'Picker 480 px \u00b7 rows 45 px \u00b7 price mono 11 px \u00b7 chips 28 px pill \u00b7 Run = primary sm \u00b7 inspector 624 px',
      items: [
        { name: 'Picker \u00b7 Subscriber \u00b7 1,006.63 QCC', w: 480, html: pop(W.sub), anat: [{ b: 'Tabs', t: 'Video \u00b7 Image \u00b7 Audio \u00b7 Chat \u2014 one list per media type' }, { b: 'Hero', t: 'What this task buys: quantity \u00d7 model = QCC' }, { b: 'Row', t: 'Logo \u00b7 name + badge \u00b7 provider / unit \u00b7 price (mono) \u00b7 runs your balance covers' }, { b: 'Footer', t: 'Live balance + plan \u00b7 1,000 QCC = $20' }] },
        { name: 'Picker \u00b7 Low balance \u00b7 38.40 QCC', w: 480, html: pop(W.low), anat: [{ b: 'Short rows', t: 'Price turns grey, lock + \u201cNeed X\u201d in amber \u2014 still clickable (no hard lock)' }, { b: 'Cheapest', t: 'Automatic badge on the lowest price in the tab' }] },
        { name: 'Run bar \u00b7 all 5 states', w: 1260, html: `<div class="pk-stack">${ex(W.new, 'Bonus ready', 1)}${ex(W.sub, 'Fits', 2)}${ex(Object.assign({}, W.sub, { bal: 780 }), 'Leaves < 100', 3)}${ex(W.claimed, 'Short \u00b7 free', 4)}${ex(Object.assign({}, W.low, { bal: 0 }), 'Out of credits', 5)}</div>`, anat: [{ b: 'Chips', t: 'One per media step: logo \u00b7 model \u00d7 qty \u00b7 subtotal \u00b7 chevron opens the picker on that tab' }, { b: 'LLM chip', t: 'The real IDE chip, price per 1M tokens (billed by use)' }, { b: 'Action row', t: 'State text left, one primary action right; secondary \u201cFit to balance\u201d only when a mix fits' }] },
        { name: 'Decision table \u00b7 plan \u00d7 wallet', w: 1120, html: table(), anat: [{ b: 'Rows', t: 'Three plan presets + chat only' }, { b: 'Columns', t: 'Demo wallets from the switcher + spent to zero' }, { b: 'Cells', t: 'Same judge() as the live UI: state + what is left or missing' }] }
      ]
    },
    spec: {
      show: 'Composer shows one chip per media step of the task plus the LLM chip. Click a chip \u2192 the picker opens on that tab. Every row has its price and how many runs the balance covers; the Run button carries the total.',
      logic: [
        'price = catalog price_text per unit (image / video / song); chat = per 1M tokens, billed by use, min 1 QCC to send',
        'plan_cost = \u03a3 qty \u00d7 price over media steps; recalculated on every model change',
        'row: runs = floor(balance / price) \u2192 \u201cN on balance\u201d; runs = 0 \u2192 lock + \u201cNeed X\u201d (row stays selectable)',
        'state = bonus (bonus ready) \u203a out (balance < 1) \u203a short (balance < plan_cost) \u203a low-after (balance \u2212 plan_cost < 100) \u203a fits',
        'short \u2192 never send (no 402). Fit to balance = model mix with the highest plan_cost \u2264 balance; Top up = smallest pack \u2265 shortfall (free accounts: Starter Kit 1,200 / $20 once)',
        'Run \u2192 charge on success, refund failed steps (block 16); the new balance re-evaluates menu, status pill and banners',
        'Remember the last model per tab; default = last used'
      ],
      data: ['catalog.models[{id, tab, provider, logo, price_qcc, unit, badges[]}]', 'wallet{balance, plan, bonus_state, starter_kit_used}', 'task.steps[{tab, qty}]', 'LOW_BALANCE_THRESHOLD = 100', 'packs 100/$2 \u00b7 500/$10 \u00b7 1,000/$20 \u00b7 4,000/$80'],
      events: ['picker_open{tab}', 'model_select{tab, model, price, runs_left}', 'run_click{plan_cost, balance}', 'run_blocked{state, shortfall}', 'fit_to_balance{from_cost, to_cost}', 'topup_from_picker{pack}'],
      done: 'Zero 402s on media steps with a known price; every price matches the catalog; all surfaces switch state in < 100 ms.'
    }
  });
})();

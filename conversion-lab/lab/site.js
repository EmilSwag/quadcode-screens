/* Part A — site & account mock with "now / after" modes, personas, popups and a guided flow. */
const SCREENS = [['home','Главная'],['signin','Sign in'],['signup','Sign up'],['pricing','/pricing'],['account','ЛК /profile/plans'],['checkout','Checkout']];
const DEF = {screen:'home', mode:'after', persona:'guest', offer:null, kitSeen:false, exitSeen:false, failed:false, flow:-1, tab:'topup', refill:LAB.cfg.refill.defaultOn};
const CFG = LAB.cfg;
let S = Object.assign({}, DEF, JSON.parse(localStorage.getItem('lab.site') || '{}'));
const save = () => localStorage.setItem('lab.site', JSON.stringify(S));
const P = () => LAB.personas[S.persona];
const AFTER = () => S.mode === 'after';
const pin = (id, st = '') => AFTER() ? `<span class="pin abs" style="${st}" title="${id}">${id}</span>` : '';
const price = (n) => S.offer ? Math.round(n * 0.8) : n;               // A8 applied → −20%
const priceHTML = (n, unit) => S.offer ? `<span class="strike">$${n}</span> $${price(n)}<small>${unit}</small>` : `$${n}<small>${unit}</small>`;
let timers = [];
const clearT = () => { timers.forEach(clearInterval); timers = []; };

/* ---------- shared pieces ---------- */
function promoBar() {
  if (!AFTER() || S.offer) return '';                                   // one urgency offer at a time
  const p = P(); let txt, cta = 'Смотреть тарифы', act = 'pricing';
  if (!p.logged) txt = 'Yearly −25%: $180 вместо $240 за 12 000 QCC';
  else if (S.persona === 'newuser') txt = 'Starter Kit для новых: первая покупка +25% QCC · до конца <b data-cd="lab.dl.kit" data-sec="252000"></b>', act = 'account';
  else if (S.persona === 'zero') txt = 'Баланс 0 QCC — пак 500 за $10 закроет и хватит ещё на ~30 запросов', cta = 'Пополнить', act = 'store';
  else txt = 'Переходи на Yearly — 3 месяца в подарок ($180 вместо $240)', act = 'account';
  return `<div class="promo-bar new soft" data-ids="A5">${pin('A5','left:8px;top:6px')}${txt} · <u style="cursor:pointer" data-go="${act}">${cta}</u><span class="x">✕</span></div>`;
}
function nav() {
  const p = P(), a = AFTER();
  const links = ['Capabilities','Dynamic UI','Features','Integrations', a ? `<span class="new" data-ids="A1" style="padding:2px 6px">Pricing <span class="badge acc" style="font-size:9px;padding:1px 5px">−25%</span>${pin('A1','right:-14px;top:-16px')}</span>` : '', 'Download'].filter(Boolean);
  const right = p.logged
    ? `<span class="badge mut" style="text-transform:none;font-size:12px">${fmt(Math.round(p.bal))} QCC</span>${a && p.plan !== 'Basic Yearly' ? `<span class="pill new" data-ids="A6" data-go="account" style="cursor:pointer">⚡ Upgrade · −25%${pin('A6','right:-10px;top:-16px')}</span>` : ''}<span class="acct-av" style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#7c5cff,#ff5ca8);display:inline-block"></span>`
    : `<button class="btn sm ghost" data-go="signin">Sign in</button><button class="btn sm pri" data-go="signup">Start for free</button>`;
  return `<div class="nav"><span class="logo">◆ Quadcode AI</span><span class="links">${links.map(l => `<span>${l}</span>`).join('')}</span><span class="grow"></span><span class="row">${right}</span></div>`;
}
function planCard(pl, opts = {}) {
  const a = AFTER(), cur = P().logged && P().plan === pl.name;
  const pr = pl.price === null ? 'Custom' : pl.price === 0 ? '$0' : priceHTML(pl.price, pl.unit);
  const was = a && pl.was && !S.offer ? `<span class="strike" style="font-size:16px;margin-right:6px">$${pl.was}</span>` : '';
  const feats = a ? pl.feats : pl.feats.slice(0, 2);
  let btn = cur ? `<button class="btn full" disabled>Current plan</button>`
    : pl.id === 'ent' ? `<button class="btn full">Contact sales</button>`
    : pl.id === 'free' ? `<button class="btn full" data-go="${P().logged ? 'promo' : 'signup'}">${P().logged ? 'Apply promo code' : 'Start for free'}</button>`
    : a && P().logged && P().plan === 'Basic Monthly' && pl.id === 'yearly' ? `<button class="btn acc full new" data-ids="A11" data-act="change">Перейти на Yearly →${pin('A11','right:-8px;top:-14px')}</button>`
    : `<button class="btn ${a && pl.hot ? 'acc' : 'pri'} full" data-go="${P().logged ? 'checkout' : 'signup'}" data-plan="${pl.id}">${P().logged ? 'Buy' : 'Start for free'}</button>`;
  return `<div class="plan ${a && pl.hot ? 'hot' : ''}">${a && pl.badge ? `<span class="badge acc top">${pl.badge}</span>` : (!a && pl.was ? `<span class="badge mut top">Save 25%</span>` : '')}
    <div class="name">${pl.name}</div><div class="price">${was}${pr}</div><div class="mut small">${pl.credits}${a && pl.id === 'yearly' ? ' · <b style="color:var(--lime)">3 месяца бесплатно</b>' : ''}</div>
    <ul>${feats.map(f => `<li>${f}</li>`).join('')}</ul>${a && pl.out.length ? `<div class="outc new soft" data-ids="A7">${pl.out.map(o => `<span>${o}</span>`).join('')}</div>` : ''}<div class="grow"></div>${btn}</div>`;
}
function plansGrid() { return `<div class="plans" style="position:relative">${pin('A7','left:-30px;top:8px')}${LAB.plans.map(planCard).join('')}</div>
  ${AFTER() ? `<div class="row" style="justify-content:center;gap:16px;margin-top:16px;flex-wrap:wrap"><button class="btn sm" data-act="quiz">🤔 Не знаешь какой план? 3 вопроса</button><span class="mut small">Нужно больше? 5 000 QCC — $100/мес · 10 000 — $200 · 15 000 — $300</span></div>
  <div class="row small mut" style="justify-content:center;gap:18px;margin-top:14px">🔒 Stripe · Visa / Mastercard${AFTER() ? ' · Apple Pay · Google Pay' : ''} · Отмена в 1 клик · Кредиты не сгорают в течение подписки</div>` : ''}`; }
function packsGrid(sel) {
  const a = AFTER();
  return `<div class="packs" style="position:relative">${pin('A10','left:-30px;top:8px')}${LAB.packs.map(k => `<div class="pack ${a && k.hot ? 'hot' : ''} ${sel === k.c ? 'sel' : ''}">${a && k.badge ? `<span class="badge ${k.hot ? 'lime' : 'acc'} top">${k.badge}</span>` : ''}<div class="n">${fmt(k.c)} QCC</div><div class="p">$${k.p}${a ? ` · ${k.rate}` : ''}</div>${a ? `<div class="xs mut" style="margin-top:4px">${k.out}</div>` : ''}<button class="btn sm ${a && k.hot ? 'lime' : 'pri'}" style="margin-top:10px;width:100%" data-go="checkout" data-pack="${k.c}">Buy</button></div>`).join('')}</div>
  ${a ? refillRow() : ''}`;
}
function refillRow() {                                                   // A10 — opt-in, off by default (accepted 25.09)
  const r = CFG.refill;
  return S.refill
    ? `<div class="card row new soft" data-ids="A10" style="margin-top:10px;padding:12px 16px;border-color:var(--ok)"><span>🔁 <b style="color:var(--ok)">Авто-пополнение включено.</b> Баланс ниже ${r.threshold} QCC → докупаем ${r.pack} QCC за $${r.price}, не чаще ${r.capPerMonth} раз в месяц. Отключить можно в любой момент.</span><span class="grow"></span><button class="btn sm ghost" data-act="refill" data-on="0">Выключить</button></div>`
    : `<div class="card row new soft" data-ids="A10" style="margin-top:10px;padding:12px 16px;border-color:#2a2a35"><span>🔁 <b>Авто-пополнение</b> <span class="badge mut">выкл</span> — когда баланс ниже ${r.threshold} QCC, докупать ${r.pack} QCC за $${r.price} (макс. ${r.capPerMonth} раза в месяц). Работа не остановится посреди задачи.</span><span class="grow"></span><button class="btn sm" data-act="refill" data-on="1">Включить</button></div>`;
}

/* ---------- screens ---------- */
function homeHTML() {
  const a = AFTER(), p = P();
  return `<div class="site">${promoBar()}${nav()}
  <div class="hero"><h1>The Solo Creator's Secret Superweapon</h1>
  <p>Desktop app for macOS and Windows · ${a ? `<span class="new soft" data-ids="A2" style="padding:2px 6px">free to start — <b style="color:#fff">200 QCC on us</b>, no card${pin('A2','right:-12px;top:-18px')}</span>` : 'free to start, no card required'}</p>
  <div class="row" style="justify-content:center">${p.logged ? `<button class="btn pri" data-go="account">Open account</button>` : `<button class="btn pri" data-go="signup">Start for free</button><button class="btn" data-go="signin">Sign in</button>`}</div></div>
  ${a ? `<div class="proof new soft" data-ids="A16" style="position:relative">${pin('A16','left:-6px;top:-10px')}<span><b>12 400</b> генераций за неделю</span><span><b>110+</b> гайдов сообщества</span><span><b>30+</b> моделей: OpenAI, Claude, Gemini, Veo, ElevenLabs…</span><span style="color:var(--lime)">● Community Challenge · Live now</span></div>` : ''}
  <div class="agents">${[['Many','Orchestrator'],['Cody','Developer'],['Lumi','Designer'],['Sonic','Video & Audio'],['+12','agents']].map(([n,d]) => `<div class="a"><b>${n}</b><span class="mut small">${d}</span></div>`).join('')}</div>
  ${a ? `<div class="sec" style="position:relative">${pin('A1','left:32px;top:36px')}<h2>Простые цены: покупаешь кредиты — все модели твои</h2><p class="sub">Никаких «Pro-моделей за доплату». 1 000 QCC ≈ 500 картинок, 40 клипов Veo 3 или 20 часов агентов.</p>${plansGrid()}</div>
  <div class="sec new soft" data-ids="A16" style="position:relative"><h2>Community Challenge · <span style="color:var(--lime)">Live now</span></h2><p class="sub">Сделай 30-секундный ролик с Sonic — призовой фонд 1 200 QCC. До конца: 4 дня.</p><div class="row" style="justify-content:center"><button class="btn lime">Участвовать</button><button class="btn">Смотреть работы</button></div></div>` : `<div class="sec"><h2>Why the app</h2><p class="sub">16 agents, 30+ models, dynamic UI, MCP integrations — one prompt away.</p></div>`}
  <div class="sec" style="text-align:center"><h2>Start Creating!</h2><p class="sub">Download for Windows · macOS</p><button class="btn pri" data-go="${p.logged ? 'account' : 'signup'}">${p.logged ? 'Open account' : 'Start for free'}</button></div></div>`;
}
function authHTML(kind) {
  const a = AFTER(), signin = kind === 'signin';
  const form = signin
    ? `<input class="inp" placeholder="Email"><input class="inp" placeholder="Password" type="password"><a class="small mut" style="text-align:right">Forgot Password?</a>`
    : a ? `<input class="inp" placeholder="Email"><input class="inp" placeholder="Password" type="password">`
        : `<div class="row"><input class="inp" placeholder="First name"><input class="inp" placeholder="Last name"></div><input class="inp" placeholder="Email"><input class="inp" placeholder="Password" type="password"><input class="inp" placeholder="Promo code (optional)">`;
  const head = signin ? `<h2>Sign In</h2><p class="mut">Welcome back!</p>`
    : a ? `<h2>Create account — <span style="color:var(--lime)">200 QCC free</span></h2><p class="mut">Без карты. Все модели сразу.</p>` : `<h2>Sign Up</h2><p class="mut">Create your account</p>`;
  const foot = signin
    ? (a ? `<div class="card new" data-ids="A3" style="padding:10px 12px;border-color:#2a2a35;position:relative">${pin('A3','right:-10px;top:-12px')}<div class="small">Нет аккаунта? <b>Зарегистрируйся — 200 QCC бесплатно</b>, карта не нужна.</div><button class="btn sm lime" style="margin-top:8px" data-go="signup">Create account</button></div>` : `<div class="small mut" style="text-align:center">Don't have an account? <u data-go="signup" style="cursor:pointer">Sign Up</u></div>`)
    : (a ? `<div class="check new soft" data-ids="A2" style="grid-template-columns:1fr;gap:4px;font-size:12.5px;position:relative">${pin('A2','right:-10px;top:-12px')}<span>Все 30+ моделей без ограничений</span><span>200 QCC сразу, ещё +100 за рабочую почту</span><span>Карта не нужна</span></div><div class="small mut" style="text-align:center">Есть промокод? <u>Ввести</u> · Already have an account? <u data-go="signin" style="cursor:pointer">Sign In</u></div>` : `<div class="small mut" style="text-align:center">Already have an account? <u data-go="signin" style="cursor:pointer">Sign In</u></div>`);
  return `<div class="site" style="min-height:900px">${homeHTML().replace('<div class="site">','<div>')}<div class="ov"><div class="modal"><span class="x" data-go="home">✕</span>${head}<div class="form" style="margin-top:14px">${form}<div class="turn"><i></i> Verifying security check…</div>
  <button class="btn ${a && !signin ? 'lime' : 'pri'}" data-act="${signin ? 'login' : 'register'}">${signin ? 'Continue' : a ? 'Create account · get 200 QCC' : 'Continue'}</button><div class="small mut" style="text-align:center">or</div><div class="row"><button class="btn grow">G  Google</button><button class="btn grow">⌥ GitHub</button></div>${foot}
  <div class="xs dim" style="text-align:center">By continuing you agree to Terms of Service and Privacy Policy</div></div></div></div></div>`;
}
function pricingHTML() {
  if (!AFTER()) return `<div class="site">${nav()}<div class="p404"><b>404</b>This page could not be found.<div class="note" style="max-width:520px;margin:20px auto 0">Так сейчас: quadcode.ai/pricing не существует, а /profile/plans без логина молча редиректит на главную. Гость не может узнать цены.</div></div></div>`;
  return `<div class="site">${promoBar()}${nav()}<div class="sec" style="border:0;position:relative">${pin('A1','left:32px;top:30px')}<h2>Простые цены: покупаешь кредиты — все модели твои</h2><p class="sub">Free — 200 QCC при регистрации · Basic — 1 000 QCC/мес · Yearly — то же за $15/мес · Enterprise — общий пул команды. 1 000 QCC ≈ 500 картинок Nano Banana Pro, 40 клипов Veo 3 или 20 часов агентов.</p>${plansGrid()}</div>
  <div class="sec"><h2>Или просто пополни баланс</h2><p class="sub">Кредиты действуют 12 месяцев. Чем больше пак — тем ниже цена за 1 000 QCC.</p><div style="max-width:1100px;margin:0 auto">${packsGrid()}</div></div>
  <div class="sec"><h2>Вопросы</h2><div class="grid3" style="max-width:1100px;margin:0 auto">${[['Нужна ли карта для старта?','Нет. 200 QCC выдаём после регистрации, ещё +100 за рабочую почту.'],['Сгорают ли кредиты?','Подписочные обновляются каждый месяц, купленные паки действуют 12 месяцев.'],['Как отменить?','В один клик в /profile/plans. Остаток кредитов доступен до конца периода.']].map(([q, a]) => `<div class="card"><b>${q}</b><p class="mut small" style="margin-top:6px">${a}</p></div>`).join('')}</div></div></div>`;
}
function accountHTML() {
  const a = AFTER(), p = P();
  if (!p.logged) return a
    ? `<div class="site" style="min-height:900px">${pricingHTML().replace('<div class="site">','<div>')}<div class="ov"><div class="modal">${pin('A1','left:-10px;top:-10px')}<h2>Войди, чтобы купить</h2><p class="mut">Цены видны и без входа — ты уже здесь. Войди или создай аккаунт (200 QCC бесплатно).</p><div class="row" style="margin-top:14px"><button class="btn grow" data-go="signin">Sign in</button><button class="btn lime grow" data-go="signup">Create account</button></div></div></div></div>`
    : `<div class="site">${homeHTML().replace('<div class="site">','<div>')}<div class="warnbar" style="position:absolute;top:0;left:0;right:0">↪ Редирект: /profile/plans → / (без логина страница тарифов недоступна, модалка входа не открывается)</div></div>`;
  const isNew = S.persona === 'newuser', isZero = S.persona === 'zero', pct = Math.min(100, Math.round(p.bal / 10));
  const side = ['Overview','Plans & Credits','Settings','Usage','Billing & Invoices','Desktop App'];
  return `<div class="site">${promoBar()}${a && S.failed ? `<div class="warnbar new" data-ids="A17">${pin('A17','left:6px;top:6px')}⚠ Списание $20 не прошло — обнови карту. Доступ сохранён до Sep 10, 2026. <button class="btn sm pri" style="margin-left:auto">Обновить карту</button></div>` : ''}
  ${S.offer ? `<div class="sticky-offer new" data-ids="A8">${pin('A8','left:6px;top:4px')}Персональная скидка −20% применена · осталось <span data-cd="lab.dl.offer" data-sec="300" class="timer" style="color:#000"></span> · цены ниже уже пересчитаны</div>` : ''}
  ${nav()}<div class="acct"><div class="sb"><div class="u"><span class="av"></span><div><b class="small">${p.name}</b><div class="xs mut">${p.plan}</div></div></div>
    <button class="btn sm pri" data-act="store">Top up balance</button><button class="btn sm" data-go="promo">Apply promo code</button>${a ? `<button class="btn sm new" data-ids="A15" data-act="ref" style="border-color:var(--lime);position:relative">${pin('A15','right:-10px;top:-12px')}🎁 Пригласить друга +300</button>` : ''}
    <div style="height:8px"></div>${side.map((s, i) => `<a class="${i === 1 ? 'on' : ''}">${s}</a>`).join('')}</div>
  <div class="main"><div class="row"><h2 style="font-size:22px">Plans & Credits</h2><span class="grow"></span>${a ? `<label class="xs mut row" style="gap:6px"><input type="checkbox" data-act="failed" ${S.failed ? 'checked' : ''}> демо: неудачное списание (A17)</label>` : ''}</div>
    <div class="bal"><div class="card"><div class="mut small">Balance</div><div style="font-size:30px;font-weight:800">${fmt(p.bal)} <small class="mut">QCC</small></div>${a ? `<div class="bar" style="margin-top:8px"><i style="width:${pct}%"></i></div><div class="xs mut" style="margin-top:4px">${isNew ? `${CFG.welcome} welcome QCC · +${CFG.workEmail} за рабочую почту` : `${pct}% от 1 000 QCC/мес · обновится ${p.next}`}${S.refill ? ' · <span style="color:var(--ok)">🔁 авто-пополнение вкл</span>' : ''}</div>` : ''}</div>
    <div class="card"><div class="mut small">Current plan</div><div style="font-size:18px;font-weight:700">${p.plan} <span class="badge ok">Active</span></div><div class="small mut" style="margin-top:4px">${isNew ? (a ? `Starter Kit активен: первая покупка +25% QCC · до конца <span class="timer" data-cd="lab.dl.kit" data-sec="252000"></span>` : 'Free plan · promo credits') : `Next billing: ${p.next} · $20`}</div>
    ${a && !isNew ? `<div class="row" style="margin-top:10px"><button class="btn sm new" data-ids="A11" data-act="change">Change plan${pin('A11','right:-10px;top:-12px')}</button><button class="btn sm ghost new" data-ids="A14" data-act="cancel" style="color:var(--mut)">Cancel${pin('A14','right:-10px;top:-12px')}</button></div>` : ''}</div></div>
    ${a && !isNew ? `<div class="card new soft" data-ids="A12" style="position:relative">${pin('A12','left:-10px;top:-10px')}<div class="row" style="margin-bottom:10px"><b>Твой Basic Monthly включает</b><span class="grow"></span><span class="small mut">продлится ${p.next}</span></div>
      <div class="check"><span>1 000 QCC каждый месяц</span><span>Все 30+ моделей и 16 агентов</span><span>Dynamic UI, MCP, CLI</span><span>Отмена в 1 клик</span><span class="x">Лучшая цена за кредит — <u data-act="change" style="cursor:pointer">перейти на Yearly, −$60/год</u></span><span class="x">Приоритетная очередь — только на Yearly</span></div>
      <div class="stat" style="margin-top:12px"><div><b>412</b>картинок сгенерировано</div><div><b>23</b>клипа Veo 3 / Sora</div><div><b>31 ч</b>работы агентов</div><div><b>$12</b>сэкономлено vs паки</div></div>
      <div class="row small" style="margin-top:12px;gap:8px;flex-wrap:wrap"><span class="mut">Ещё не пробовал:</span><button class="btn sm">🎬 Sonic — видео</button><button class="btn sm">🎨 Lumi — дизайн</button><button class="btn sm">🔌 MCP-интеграции</button></div></div>` : ''}
    <div><div class="row" style="margin-bottom:12px"><h3 style="font-size:16px">Plans</h3></div>${plansGrid()}</div>
    <div><div class="row" style="margin-bottom:12px"><h3 style="font-size:16px">Top up credits</h3><span class="grow"></span>${a ? `<span class="small mut">$1 = 50 QCC на любом паке · действуют 12 месяцев</span>` : ''}</div>${packsGrid()}</div>
    ${a ? `<div class="card row new soft" data-ids="A15" style="position:relative;border-color:#2a2a35">${pin('A15','left:-10px;top:-10px')}<div><b>🎁 Пригласи друга</b><div class="small mut">Друг получает +300 QCC при регистрации, ты — +300 после его первой покупки. Подарочные карты: $20 · $50 · $100.</div></div><span class="grow"></span><button class="btn sm" data-act="ref">Скопировать ссылку</button><button class="btn sm ghost" data-act="ref">Gift card</button></div>` : ''}
  </div></div></div>`;
}
function checkoutHTML() {
  const a = AFTER(), p = P(), isNew = S.persona === 'newuser', base = 20, pr = price(base), bonus = a && isNew ? 250 : 0;
  return `<div class="site">${S.offer ? `<div class="sticky-offer">−20% применена · осталось <span data-cd="lab.dl.offer" data-sec="300"></span></div>` : ''}${nav()}<div class="sec" style="border:0"><div class="grid2" style="max-width:900px;margin:0 auto;align-items:start">
    <div class="card"><h3 style="margin-bottom:12px">Оплата</h3>${a ? `<div class="col new soft" data-ids="A18" style="position:relative">${pin('A18','left:-10px;top:-10px')}<button class="btn pri full"> Apple Pay</button><button class="btn full">G Pay</button><button class="btn full">Link · сохранённая карта</button><div class="small mut" style="text-align:center">или картой</div></div>` : ''}
      <div class="form" style="margin-top:10px"><input class="inp" placeholder="Card number"><div class="row"><input class="inp" placeholder="MM / YY"><input class="inp" placeholder="CVC"></div><input class="inp" placeholder="Name on card"><button class="btn ${a ? 'lime' : 'pri'} full" data-act="paid">Pay $${pr}.00</button><div class="xs dim" style="text-align:center">Powered by Stripe · ${a ? 'Отмена в 1 клик · Возврат 14 дней · ' : ''}Visa / Mastercard</div></div></div>
    <div class="card"><h3 style="margin-bottom:12px">Заказ</h3><div class="row"><span>Basic Monthly · 1 000 QCC/мес</span><span class="grow"></span><span>$${base}.00</span></div>
      ${S.offer ? `<div class="row" style="color:var(--acc)"><span>Персональная скидка −20% (A8)</span><span class="grow"></span><span>−$${base - pr}.00</span></div>` : ''}
      ${bonus ? `<div class="row new soft" data-ids="A4" style="color:var(--lime);position:relative">${pin('A4','left:-10px;top:-10px')}<span>Starter Kit: +25% QCC к первой покупке</span><span class="grow"></span><span>+${bonus} QCC</span></div>` : ''}
      <div class="row" style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px;font-weight:800"><span>Итого сегодня</span><span class="grow"></span><span>$${pr}.00</span></div>
      <div class="small mut" style="margin-top:6px">Получишь ${fmt(1000 + bonus)} QCC сразу. Следующее списание через 30 дней, отмена в любой момент.</div>
      ${!a ? `<div class="note" style="margin-top:12px">Сейчас: только карта, без бонусов, без Apple/Google Pay.</div>` : ''}</div></div></div></div>`;
}

/* ---------- popups (after mode) ---------- */
function popup(html, cls = 'modal') { const d = document.createElement('div'); d.className = 'ov'; d.innerHTML = `<div class="${cls}">${html}</div>`; d.addEventListener('click', e => { if (e.target === d || e.target.dataset.close !== undefined) d.remove(); }); $('#stageInner').appendChild(d); return d; }
const kitModal = () => popup(`<span class="x" data-close>✕</span>${pin('A4','left:-10px;top:-10px')}<span class="badge lime">Только для новых</span><h2 style="margin-top:8px">Starter Kit: +25% QCC к первой покупке</h2><p class="mut">Basic Monthly за $20 даст не 1 000, а <b style="color:#fff">1 250 QCC</b>. Предложение действует 72 часа с момента регистрации — до конца <span class="timer" data-cd="lab.dl.kit" data-sec="252000"></span>.</p>
  <div class="check" style="margin:14px 0;grid-template-columns:1fr"><span>Все 30+ моделей, 16 агентов</span><span>Отмена в 1 клик</span><span>Бонус начислится сразу после оплаты</span></div>
  <div class="row"><button class="btn lime grow" data-go="checkout">Забрать +25% → $20</button><button class="btn ghost" data-close data-act="kitLater">Не сейчас</button></div><div class="xs dim" style="margin-top:8px">Честный таймер: дедлайн хранится на сервере, после истечения оффер исчезает и не выдаётся повторно.</div>`);
function offerToast() {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `${pin('A8','left:-10px;top:-10px')}<div class="row"><b>Персональное предложение</b><span class="grow"></span><span class="timer" data-cd="lab.dl.offer" data-sec="300"></span></div><div class="small mut" style="margin:6px 0 10px">−20% на первый месяц Basic: <b style="color:#fff">$16 вместо $20</b>. Действует 5 минут, выдаётся один раз.</div><div class="row"><button class="btn acc sm grow" data-act="applyOffer">Применить −20%</button><button class="btn sm ghost" data-act="dismissToast">Позже</button></div>`;
  $('#stageInner').appendChild(t); startTimers();
}
const exitModal = () => popup(`<span class="x" data-close>✕</span>${pin('A9','left:-10px;top:-10px')}<h2>Подожди — добавили +300 QCC</h2><p class="mut">К первому Basic Monthly: <b style="color:#fff">1 300 QCC за $20</b>. Бонус кредитами, цена не меняется. Показываем один раз.</p><div class="row" style="margin-top:14px"><button class="btn lime grow" data-go="checkout">Забрать 1 300 QCC</button><button class="btn ghost" data-close>Нет, спасибо</button></div>`);
function storeModal(tab = 'topup') {
  S.tab = tab; const need = S.persona === 'zero' ? 120 : 0;
  const body = tab === 'topup' ? `${need ? `<div class="note" style="margin-bottom:10px;border-color:var(--acc);color:#ffd7b3">Не хватает ~${need} QCC для следующего запроса. Пак <b>500 QCC за $10</b> закроет и хватит ещё на ~30 запросов.</div>` : ''}${packsGrid(need ? 500 : 1000)}`
    : tab === 'plans' ? plansGrid() : `<div class="form"><input class="inp" placeholder="Promo code"><div class="turn"><i></i> Verifying security check…</div><button class="btn pri">Apply</button><div class="small mut">Нет кода? <u data-go="account" data-close style="cursor:pointer">Starter Kit +25%</u> для новых аккаунтов.</div></div>`;
  popup(`<span class="x" data-close>✕</span>${pin('A13','left:-10px;top:-10px')}<h2>${need ? 'Кредиты закончились' : 'Пополнить баланс'}</h2><div class="mtabs" style="margin-top:10px">${[['plans','Plans'],['topup','Top up'],['promo','Promo code']].map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-act="storeTab" data-tab="${k}">${l}</button>`).join('')}</div>${body}`, 'modal w');
}
function changeModal() {                                                 // A11 — proration: unused QCC × $0.02 (accepted 25.09)
  const bal = Math.floor(P().bal), credit = bal * CFG.prorationRate, due = 180 - credit;
  return popup(`<span class="x" data-close>✕</span>${pin('A11','left:-10px;top:-10px')}<h2>Basic Monthly → Basic Yearly</h2><div class="col" style="margin-top:12px;gap:6px"><div class="row"><span>Basic Yearly · 12 000 QCC/год</span><span class="grow"></span><span><span class="strike">$240</span> $180.00</span></div><div class="row" style="color:var(--ok)"><span>Зачёт неиспользованных ${fmt(bal)} QCC × $${CFG.prorationRate.toFixed(2)}</span><span class="grow"></span><span>−${money(credit)}</span></div><div class="row" style="border-top:1px solid var(--line);padding-top:8px;font-weight:800"><span>К оплате сегодня</span><span class="grow"></span><span>${money(due)}</span></div></div><p class="small mut" style="margin-top:10px">Апгрейд вступает в силу сразу: 12 000 QCC на счету, следующее списание — 25.09.2027. Даунгрейд наоборот — с даты продления (сегодня $0).</p><div class="row" style="margin-top:14px"><button class="btn acc grow" data-go="checkout">Перейти на Yearly</button><button class="btn ghost" data-close>Отмена</button></div><div class="note" style="margin-top:10px">Сейчас: смена плана = отмена + покупка по полной цене, остаток не учитывается.</div>`);
}
function cancelModal() {                                                 // A14 — one honest screen with two save-options
  const bal = Math.floor(P().bal);
  return popup(`<span class="x" data-close>✕</span>${pin('A14','left:-10px;top:-10px')}<h2>Отменить Basic Monthly?</h2><p class="mut">Остаток <b style="color:#fff">${fmt(bal)} QCC (≈ ${money(bal * CFG.prorationRate)})</b> доступен до ${P().next}, потом сгорит. Один экран, без лабиринтов.</p><div class="col" style="margin-top:14px"><button class="btn full" data-act="saved" data-msg="Напомним за 3 дня до списания — подписка активна">🔔 Напомнить за 3 дня до списания</button><button class="btn full" data-act="saved" data-msg="Пауза на 1 месяц: списания нет, ${fmt(bal)} QCC сохранены">⏸ Пауза на 1 месяц (кредиты сохраняются)</button><button class="btn danger full" data-act="saved" data-msg="Подписка отменена. ${fmt(bal)} QCC доступны до ${P().next}">Отменить подписку</button></div>`);
}
function refModal() {                                                    // A15 — +300/+300, reward after friend's first purchase
  const r = CFG.referral;
  return popup(`<span class="x" data-close>✕</span>${pin('A15','left:-10px;top:-10px')}<h2>Пригласи друга</h2><p class="mut">Друг получает <b style="color:#fff">+${r.friend} QCC</b> при регистрации, ты — <b style="color:#fff">+${r.you} QCC</b> после его первой покупки. До ${r.capPerMonth} друзей в месяц.</p><div class="row" style="margin-top:12px"><input class="inp" value="https://quadcode.ai/?ref=dropemil" readonly><button class="btn pri" data-act="copy">Copy</button></div><div class="row small mut" style="margin-top:12px;gap:8px;flex-wrap:wrap">Подарочные карты:${r.gifts.map(g => `<button class="btn sm" data-act="saved" data-msg="Gift card $${g} — демо: в проде откроется Stripe Checkout">$${g}</button>`).join('')}</div><div class="stat" style="margin-top:14px;grid-template-columns:repeat(3,1fr)"><div><b>0</b>приглашено</div><div><b>0</b>купили</div><div><b>0 QCC</b>заработано</div></div>`);
}
function flash(msg) {                                                    // small in-page confirmation instead of alert()
  $$('.ov, .toast.flash').forEach(o => o.remove()); const d = document.createElement('div'); d.className = 'toast flash'; d.style.borderColor = 'var(--ok)'; d.innerHTML = `<div class="row"><b style="color:var(--ok)">✓ Готово</b><span class="grow"></span><span class="x" data-act="dismissFlash">✕</span></div><div class="small mut" style="margin-top:6px">${msg}</div>`;
  $('#stageInner').appendChild(d); setTimeout(() => d.remove(), 6000);
}
const quizModal = () => popup(`<span class="x" data-close>✕</span><h2>Какой план подойдёт?</h2><div class="col" style="margin-top:12px"><div class="card" style="padding:12px"><b>1. Что делаешь чаще?</b><div class="row wrap" style="margin-top:6px"><button class="btn sm on">Картинки</button><button class="btn sm">Видео</button><button class="btn sm">Код / агенты</button></div></div><div class="card" style="padding:12px"><b>2. Сколько работ в неделю?</b><div class="row wrap" style="margin-top:6px"><button class="btn sm">до 20</button><button class="btn sm on">20–100</button><button class="btn sm">100+</button></div></div><div class="card" style="padding:12px;border-color:var(--acc)"><b>Рекомендация: Basic Yearly</b><div class="small mut">≈ 60 картинок в неделю умещаются в 1 000 QCC/мес, а Yearly даёт 3 месяца бесплатно.</div><button class="btn acc sm" style="margin-top:8px" data-go="checkout">Выбрать</button></div></div>`);

/* ---------- render ---------- */
function startTimers() { clearT(); $$('[data-cd]').forEach(el => timers.push(countdown(el, el.dataset.cd, +el.dataset.sec, () => { if (el.dataset.cd === 'lab.dl.offer') { S.offer = null; save(); render(); } }))); }
function render() {
  const p = P();
  $('#top').innerHTML = labTop('site.html', `<div class="seg w" id="scr">${SCREENS.map(([k, l]) => `<button class="${S.screen === k ? 'on' : ''}" data-s="${k}">${l}</button>`).join('')}</div>
    <div class="seg" id="mode"><button class="${S.mode === 'now' ? 'on' : ''}" data-m="now">Сейчас</button><button class="${S.mode === 'after' ? 'on' : ''}" data-m="after">После</button></div>
    <div class="seg w" id="pers">${Object.entries(LAB.personas).map(([k, v]) => `<button class="${S.persona === k ? 'on' : ''}" data-p="${k}">${v.label}</button>`).join('')}</div>`);
  const html = {home: homeHTML, signin: () => authHTML('signin'), signup: () => authHTML('signup'), pricing: pricingHTML, account: accountHTML, checkout: checkoutHTML}[S.screen]();
  $('#stageInner').innerHTML = html; $('#stage').scrollTop = 0;
  const its = LAB.site.filter(i => i.screens.includes(S.screen));
  $('#itemsTitle').textContent = AFTER() ? `Что добавлено на этом экране (${its.length})` : 'Что здесь появится в режиме «После»';
  $('#items').innerHTML = its.map(i => itemHTML(i)).join('') || '<div class="mut small">Нет изменений на этом экране.</div>';
  // popups
  if (AFTER() && S.screen === 'account' && p.logged) {
    if (S.persona === 'newuser' && !S.kitSeen) { kitModal(); S.kitSeen = true; save(); }
    else if (S.persona === 'newuser' && S.kitSeen && !S.offer && !S.offerSeen) demoChip();
    if (S.persona === 'zero' && !S.zeroSeen) { storeModal('topup'); S.zeroSeen = true; save(); }
  }
  startTimers(); renderFlow();
}
function demoChip() { const d = document.createElement('div'); d.className = 'toast'; d.style.width = '300px'; d.style.borderColor = '#2a2a35'; d.innerHTML = `<div class="xs mut">Демо-триггер A8 (в проде: 2-й визит Plans или 45 с без клика, и только если Starter Kit не активен)</div><button class="btn sm acc" style="margin-top:8px" data-act="simOffer">Симулировать 45 с →</button>`; $('#stageInner').appendChild(d); }

/* ---------- guided flow ---------- */
const FLOW = [
  {t:'Гость на главной', d:'Видит Pricing в шапке, промо-полосу Yearly −25%, «200 QCC on us» и соцдоказательства. Раньше цен не было вообще.', s:{screen:'home', persona:'guest'}},
  {t:'Start for free → Sign up', d:'2 поля вместо 5, стимул 200 QCC, чек-лист выгод, +100 за рабочую почту.', s:{screen:'signup', persona:'guest'}},
  {t:'Первый вход в ЛК: Starter Kit', d:'Новый юзер сразу получает оффер +25% QCC к первой покупке с честным 72-часовым таймером.', s:{screen:'account', persona:'newuser', kitSeen:false}},
  {t:'Тарифы и паки', d:'Yearly выделен (BEST VALUE, 3 месяца бесплатно), кредиты переведены в исходы, лестница паков с якорями, авто-пополнение.', s:{screen:'account', persona:'newuser', kitSeen:true, offerSeen:true}},
  {t:'Персональный таймер (A8)', d:'Нажми «Симулировать 45 с» → попап −20% на 5 минут → «Применить» пересчитывает цены и вешает липкую полосу.', s:{screen:'account', persona:'newuser', kitSeen:true, offerSeen:false, offer:null}},
  {t:'Checkout', d:'Apple Pay / Google Pay / Link, бонус Starter Kit в чеке, доверие и таймер скидки.', s:{screen:'checkout', persona:'newuser'}},
  {t:'Через месяц: Monthly-подписчик', d:'Overview удержания: чек-лист с одним ✗, статистика ценности, Change plan с перерасчётом, честная отмена, реферал.', s:{screen:'account', persona:'monthly'}},
  {t:'Кредиты закончились', d:'Баланс 0 → модалка стора с предвыбранным паком под нехватку.', s:{screen:'account', persona:'zero', zeroSeen:false}}
];
function renderFlow() { const b = $('#flowBox'); if (S.flow < 0) { b.style.display = 'none'; return; } const f = FLOW[S.flow]; b.style.display = 'block'; b.innerHTML = `<div class="xs mut">Флоу · шаг ${S.flow + 1} из ${FLOW.length}</div><b>${f.t}</b><div class="small mut" style="margin:4px 0 10px">${f.d}</div><div class="row"><button class="btn sm" data-act="flowPrev" ${S.flow === 0 ? 'disabled' : ''}>←</button><button class="btn sm acc grow" data-act="flowNext">${S.flow === FLOW.length - 1 ? 'Завершить' : 'Далее →'}</button></div>`; }
function goFlow(i) { if (i >= FLOW.length) { S.flow = -1; save(); render(); return; } S.flow = i; Object.assign(S, {mode:'after'}, FLOW[i].s); save(); render(); }

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-s],[data-m],[data-p],[data-go],[data-act],.item'); if (!t) return;
  if (t.dataset.s) { S.screen = t.dataset.s; save(); return render(); }
  if (t.dataset.m) { S.mode = t.dataset.m; save(); return render(); }
  if (t.dataset.p) { S.persona = t.dataset.p; S.offer = null; save(); return render(); }
  if (t.classList.contains('item')) { $$('.item').forEach(i => i.classList.toggle('on', i === t)); const el = $(`[data-ids~="${t.dataset.id}"]`); if (el) { el.scrollIntoView({behavior:'smooth', block:'center'}); el.style.outlineColor = 'var(--lime)'; setTimeout(() => el.style.outlineColor = '', 1500); } return; }
  if (t.dataset.go) { const g = t.dataset.go; if (g === 'store') return storeModal('topup'); if (g === 'promo') return storeModal('promo'); S.screen = g; save(); return render(); }
  const a = t.dataset.act;
  if (a === 'register') { S.persona = 'newuser'; S.screen = 'account'; S.kitSeen = false; save(); return render(); }
  if (a === 'login') { S.persona = 'monthly'; S.screen = 'account'; save(); return render(); }
  if (a === 'store') return storeModal('topup');
  if (a === 'storeTab') { t.closest('.ov').remove(); return storeModal(t.dataset.tab); }
  if (a === 'change') return changeModal();
  if (a === 'cancel') return cancelModal();
  if (a === 'ref') return refModal();
  if (a === 'quiz') return quizModal();
  if (a === 'failed') { S.failed = t.checked; save(); return render(); }
  if (a === 'kitLater') { S.kitSeen = true; save(); return render(); }
  if (a === 'simOffer') { $$('.toast').forEach(x => x.remove()); localStorage.removeItem('lab.dl.offer'); return offerToast(); }
  if (a === 'applyOffer') { S.offer = 'pct20'; S.offerSeen = true; save(); return render(); }
  if (a === 'dismissToast') { S.offerSeen = true; save(); return render(); }
  if (a === 'paid') { const got = 1000 + (S.persona === 'newuser' ? Math.round(1000 * CFG.kitPct / 100) : 0); S.persona = 'monthly'; S.screen = 'account'; S.offer = null; save(); render(); return flash(`Оплата прошла (демо, в проде — Stripe Checkout). Начислено ${fmt(got)} QCC, план Basic Monthly активен.`); }
  if (a === 'refill') { S.refill = t.dataset.on === '1'; save(); render(); return flash(S.refill ? `Авто-пополнение включено: < ${CFG.refill.threshold} QCC → ${CFG.refill.pack} QCC за $${CFG.refill.price}` : 'Авто-пополнение выключено'); }
  if (a === 'copy') { const inp = t.parentElement.querySelector('input'); inp.select(); try { navigator.clipboard && navigator.clipboard.writeText(inp.value); } catch (_) {} t.textContent = 'Скопировано ✓'; t.classList.add('lime'); return; }
  if (a === 'saved') return flash(t.dataset.msg);
  if (a === 'dismissFlash') return t.closest('.toast').remove();
  if (a === 'flowNext') return goFlow(S.flow + 1);
  if (a === 'flowPrev') return goFlow(S.flow - 1);
});
$('#flowBtn').onclick = () => goFlow(0);
$('#resetBtn').onclick = () => { resetTimers(); S = Object.assign({}, DEF, {screen:S.screen, mode:S.mode, persona:S.persona}); save(); render(); };
// A9 exit-intent: cursor leaves the stage through the top edge
$('#stage').addEventListener('mouseleave', e => { if (AFTER() && S.screen === 'account' && S.persona === 'newuser' && !S.offer && !S.exitSeen && e.clientY < 80 && !$('.ov')) { S.exitSeen = true; save(); exitModal(); } });
render();

/* Part B — marketing overlays on top of a real IDE screenshot. Positions are % of the image (tuned to ide-po.png). */
/* ide-po.png: chat panel = left 0–63% (New chat row ~12%, messages from ~58%, model selector bottom-left ~94%), right panel = editors/browsers, status bar with profile bottom-right. */
const POS = {
  banner: {left:'1.5%', top:'14%', width:'60%'},
  toast:  {left:'30%',  top:'72%', width:'32%'},
  card:   {left:'3%',   top:'60%', width:'58%'},
  inline: {left:'3%',   top:'54%', width:'58%'},
  pill:   {left:'55%',  top:'1.6%'},
  menu:   {left:'44%',  top:'56%'},
  profile:{left:'66%',  top:'60%'}
};
const IDE_S = Object.assign({cur:'B1'}, JSON.parse(localStorage.getItem('lab.ide') || '{}'));
const saveI = () => localStorage.setItem('lab.ide', JSON.stringify(IDE_S));
let ideTimers = [];

function bannerHTML(it, cls, extra = '') {
  const [tt, ...rest] = it.copy.split('. ');
  const dd = rest.join('. ').replace(/До конца оффера$/, '').trim() || extra;
  return `<div class="ide-banner ${cls}"><div class="row"><div class="grow"><div class="tt">${tt.replace(/\.$/, '')}</div><div class="dd">${dd}${it.timer ? ` · до конца оффера <span class="timer" data-cd="lab.dl.ide" data-sec="252000" style="color:#ffd7b3"></span>` : ''}</div></div><button class="btn sm pri" style="white-space:nowrap">${it.cta.split('→')[0].split('·')[0].trim()}</button><span class="dim" style="margin-left:6px">✕</span></div></div>`;
}
function overlay(it) {
  const p = (k) => Object.entries(POS[k]).map(([a, b]) => `${a}:${b}`).join(';');
  switch (it.id) {
    case 'B1': return `<div class="ide-ov" style="${p('banner')}">${bannerHTML(it, '', 'Basic $20 → 1 250 QCC вместо 1 000. Только для новых аккаунтов, 72 часа.')}</div>`;
    case 'B2': return `<div class="ide-ov" style="${p('toast')}"><div class="ide-toast"><div class="row"><b>Claude Opus ≈ 40 QCC / запрос</b><span class="grow"></span><span class="xs mut">у тебя 200</span></div><div class="mut" style="margin:4px 0 8px">Starter Kit: +25% QCC к первой покупке — до конца <span class="timer" data-cd="lab.dl.ide" data-sec="252000"></span></div><div class="row"><button class="btn sm acc">Забрать +25%</button><button class="btn sm ghost">Ок, понял</button></div></div></div>`;
    case 'B3': return `<div class="ide-ov" style="${p('card')}"><div class="ide-card"><b style="color:var(--acc)">Не хватило 120 QCC для этого запроса</b><div class="mut" style="margin:4px 0 8px">Пак <b style="color:#fff">500 QCC за $10</b> закроет и хватит ещё на ~30 таких запросов. Запрос повторится автоматически после оплаты.</div><div class="row"><button class="btn sm pri">Купить 500 за $10</button><button class="btn sm">Все паки</button><span class="grow"></span><span class="xs dim">было: «balance too low»</span></div></div></div>`;
    case 'B4': return `<div class="ide-ov" style="${p('banner')}"><div class="ide-banner sub"><div class="row"><div class="grow"><div class="tt">Осталось 140 QCC из 1 000</div><div class="bar" style="margin:6px 0"><i style="width:14%"></i></div><div class="dd">Включи авто-пополнение (500 QCC за $10 при балансе ниже 100) — работа не остановится посреди задачи.</div></div><div class="col" style="gap:6px"><button class="btn sm pri">Включить</button><button class="btn sm">Докупить</button></div></div></div></div>`;
    case 'B5': return `<div class="ide-ov" style="${p('inline')}"><div class="ide-card" style="border-left-color:var(--lime)"><div class="xs mut">Готово · Nano Banana Pro · 8 QCC</div><div class="row" style="margin-top:6px;gap:6px;flex-wrap:wrap"><button class="btn sm">🎬 Оживить в видео · Veo 3 ~60 QCC</button><button class="btn sm">🖼 4 вариации · ~8 QCC</button><button class="btn sm ghost">Скачать</button></div></div></div>`;
    case 'B6': return `<div class="ide-ov" style="${p('banner')}">${bannerHTML(it, 'sub')}</div>`;
    case 'B7': return `<div class="ide-ov" style="${p('pill')}"><span class="ide-pill">−20% · <span data-cd="lab.dl.ide7" data-sec="300"></span></span></div>`;
    case 'B8': return `<div class="ide-ov" style="${p('menu')}"><div class="ide-menu"><div class="xs mut" style="padding:4px 10px">Модели</div><div><span>Claude Opus 5.5</span><span class="xs mut">40 QCC</span></div><div><span>Gemini 3 Pro</span><span class="badge lime" style="font-size:9px">−30% эта неделя</span></div><div><span>GPT-6 Astra</span><span class="xs mut">30 QCC</span></div><div><span>Nano Banana Pro</span><span class="badge lime" style="font-size:9px">−30% эта неделя</span></div><div><span>Veo 3</span><span class="xs mut">60 QCC</span></div><div class="xs dim" style="padding:4px 10px">Меню то же — добавлен только бейдж</div></div></div>`;
    case 'B9': return `<div class="ide-ov" style="${p('banner')}">${bannerHTML(it, 'promo')}</div>`;
    case 'B10': return `<div class="ide-ov" style="${p('profile')}"><div class="ide-menu" style="min-width:270px"><div><b>Drop Emil Emil</b><span class="badge ok">Basic Monthly</span></div><div style="display:block"><div class="row small"><span>766 / 1 000 QCC</span><span class="grow"></span><span class="mut xs">до Sep 7</span></div><div class="bar" style="margin-top:4px"><i style="width:77%"></i></div></div><div><span>Пополнить баланс</span><button class="btn sm pri">Top up</button></div><div><span>Yearly — 3 месяца в подарок</span><button class="btn sm acc">−25%</button></div><div><span>Пригласить друга</span><span class="badge lime" style="font-size:9px">+300 QCC</span></div><div class="mut"><span>Settings · Usage · Sign out</span></div></div></div>`;
    case 'B11': return `<div class="ide-ov" style="${p('banner')}"><div class="ide-banner dark" style="background:linear-gradient(90deg,#0f0f14 58%,rgba(15,15,20,.5)),url('../assets/c3.jpg') right/cover"><div class="row"><div class="grow"><div class="tt">Community Challenge · <span style="color:var(--lime)">Live now</span></div><div class="dd">Сделай 30-секундный ролик с Sonic — приз 1 200 QCC. До конца 4 дня.</div></div><button class="btn sm lime">Участвовать</button></div></div></div>`;
    case 'B12': return `<div class="ide-ov" style="${p('banner')}">${bannerHTML(it, '', '12 работ за 3 дня на Free. Monthly $20 = 1 000 QCC/мес — хватит на ~500 картинок. Так работают 70% активных.')}</div>`;
  }
}
function renderIde() {
  ideTimers.forEach(clearInterval); ideTimers = [];
  const it = LAB.ide.find(i => i.id === IDE_S.cur);
  $('#ov').innerHTML = it ? overlay(it) : '';
  $('#items').innerHTML = LAB.ide.map(i => itemHTML(i, i.id === IDE_S.cur)).join('');
  $$('[data-cd]').forEach(el => ideTimers.push(countdown(el, el.dataset.cd, +el.dataset.sec)));
  const on = $('.item.on'); if (on) on.scrollIntoView({block:'nearest'});
}
$('#top').innerHTML = labTop('ide.html', `<span class="small mut">Клик по триггеру справа → слой появляется на скрине IDE</span>`);
document.addEventListener('click', e => { const t = e.target.closest('.item'); if (!t) return; IDE_S.cur = t.dataset.id; saveI(); renderIde(); });
$('#noneBtn').onclick = () => { IDE_S.cur = null; saveI(); renderIde(); };
let auto = null;
$('#autoBtn').onclick = () => { if (auto) { clearInterval(auto); auto = null; $('#autoBtn').textContent = '▶ Прокликать все'; return; } let i = 0; $('#autoBtn').textContent = '⏸ Стоп'; const step = () => { IDE_S.cur = LAB.ide[i % LAB.ide.length].id; saveI(); renderIde(); i++; }; step(); auto = setInterval(step, 2500); };
renderIde();

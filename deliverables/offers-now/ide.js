/* Part 2 - real IDE screens + final offers table.
   Stage = real IDE screenshot (1919x1032). Overlays copy sizes and texts from the app layout files.
   Offer copy: real = exists today, otherwise it is our proposal. */
(() => {
  const LOGO = '../../assets/logos/';
  const svg = (p, s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const IC = {
    x: svg('<path d="M6 6l12 12M18 6L6 18"/>', 22),
    hand: svg('<circle cx="15" cy="6" r="3"/><path d="M2 14h4l3 2h5a2 2 0 0 0 0-4h-3"/><path d="M14 16l5-2.5a2 2 0 0 1 2 3.2L17 20H8"/>'),
    alert: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>', 22),
    ext: svg('<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>', 12),
    tag: svg('<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    shield: svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    key: svg('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>'),
    box: svg('<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'),
    cpu: svg('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
    repeat: svg('<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>'),
  };

  /* ---------- overlay builders (real screenshot pixels) ---------- */
  const px = (x, y, w, h) => `left:${x}px;top:${y}px` + (w ? `;width:${w}px` : '') + (h ? `;height:${h}px` : '');
  const mk = (t, x, y) => `<div class="mk ov" style="${px(x, y)}">${t}</div>`;
  const ring = (x, y, w, h, spot) => `<div class="ring${spot ? ' spot' : ''}" style="${px(x, y, w, h)}"></div>`;
  const BX = 57, BY = 158; // banner sits above the chat feed
  const banner = (art, title, sub, main, code) => `
    <div class="bn ov" style="${px(BX, BY)};background-image:url(shots/bg_${art}_light.jpg)">
      <span class="x">${IC.x}</span>
      <div class="t">${title}</div>
      <div class="s">${sub}</div>
      <div class="pill"><b>-25% discount</b>limited time offer</div>
      <div class="acts"><span class="b1">${IC.hand}${main}</span>${code ? '<span class="b2">Enter code</span>' : ''}<span class="b3">Skip</span></div>
    </div>`;
  const onMain = t => ring(BX + 48, BY + 380, 160, 44) + mk(t, BX + 48, BY + 436);  // Subscribe / Upgrade
  const onCode = t => ring(BX + 220, BY + 380, 160, 44) + mk(t, BX + 220, BY + 436); // Enter code
  const err = () => `<div class="err ov" style="${px(37, 668)}">${IC.alert}Your account balance is too low. Please add at least 1 QCC to continue.</div>`;
  const row = (logo, name, price) => `<div class="row"><img src="${LOGO}${logo}.svg" alt=""><span class="nm">${name}</span><span class="pr">${price}</span></div>`;
  const menu = () => `
    <div class="menu ov" style="${px(300, 552, 430)}">
      <div class="mh">Anthropic</div>
      ${row('anthropic', 'claude-sonnet-5', '~300 qcc/1m')}
      <div class="row deal"><img src="${LOGO}anthropic.svg" alt=""><span class="nm">claude-opus-5-5 <span class="tag">−30%</span></span><span class="pr"><s>~600</s><b>~420</b> qcc/1m</span></div>
      ${row('anthropic', 'claude-fable-5-1', '~1200 qcc/1m')}
      <div class="mh">OpenAI</div>${row('openai', 'gpt-6-astra', '~1800 qcc/1m')}
      <div class="mh">Google</div>${row('gemini', 'gemini-3.8-flash', '~150 qcc/1m')}
      <div class="mh">xAI</div>${row('grok', 'grok-4.7', '~200 qcc/1m')}
    </div>`;
  const popup = () => `
    <div class="pp ov" style="${px(1440, 836)}">
      <div class="who"><span class="av">DE</span><span class="nm">Drop Email Emil</span></div>
      <div class="bal">Balance: 25.50 QCC</div>
      <div class="bb"><span class="s2">Settings</span><span class="p1">Deposit</span></div>
    </div>`;

  /* ---------- screens, in user journey order ---------- */
  const BANNER_WHERE = 'IDE, баннер 640×480 над лентой чата';
  const PLANS = { label: 'Subscribe и Upgrade открывают сайт в браузере', url: 'quadcode.ai/profile/plans', note: 'Страница тарифов. Сюда едут офферы 4 и 5.' };
  const SCREENS = [
    { id: 'A', tab: 'Есть бесплатные кредиты', kicker: 'Баннер над чатом · состояние 4', title: 'Есть бесплатные кредиты, подписки нет',
      when: 'Баланс больше 0 и нет подписки. Состояние выбирает сервер по балансу и подписке.',
      look: 'Картинка, заголовок, текст, плашка «-25% discount · limited time offer», кнопки Subscribe и Skip',
      copy: 'Enjoying your free credits? Subscribe now to keep creating without limits in Quadcode',
      change: 'В IDE ничего. Офферы живут на странице тарифов, куда ведёт Subscribe.',
      measure: 'SUBSCRIBE_START_SHOWED → subscription_bought',
      offers: [4, 5], next: PLANS, veil: true,
      build: () => banner('new_user', 'Enjoying your free credits?', 'Subscribe now to keep creating without limits in Quadcode', 'Subscribe') + onMain('4 · 5') },
    { id: 'B', tab: 'Баланс 0', kicker: 'Баннер над чатом · состояние 1', title: 'Баланс 0, подписки нет',
      when: 'Баланс равен 0 и нет подписки. Только в этом состоянии есть кнопка Enter code.',
      look: 'Баннер с кнопками Subscribe, Enter code и Skip',
      copy: 'Have a promo code? Subscribe or enter it to get credits and start creating for free',
      change: 'В IDE ничего. Коды заводим в админке и раздаём в каналах.',
      measure: 'promo_code_activated {promo_code} → credits_added → subscription_bought',
      offers: [1, 2, 3, 8, 9, 4], veil: true,
      next: { label: 'Enter code: своего окна для кода в IDE нет', url: 'quadcode.ai/profile → Deposit', note: 'Скорее всего, откроется сайт с полем промокода. Проверить руками до запуска.', warn: true },
      build: () => banner('promo_user', 'Have a promo code?', 'Subscribe or enter it to get credits and start creating for free', 'Subscribe', true) + onMain('4') + onCode('1 · 2 · 3 · 8 · 9') },
    { id: 'C', tab: 'Кредиты кончились', kicker: 'Баннер над чатом · состояние 2', title: 'Кредиты кончились, подписки нет',
      when: 'Баланс 0 или меньше и нет подписки. Если запрос упал с ошибкой 402 «Insufficient credits», баннер показывается принудительно.',
      look: 'Баннер с кнопкой Subscribe и красная строка в чате',
      copy: "You're out of credits. Choose your subscription to keep creating in Quadcode",
      extra: 'В чате: Your account balance is too low. Please add at least 1 QCC to continue.',
      change: 'В IDE ничего.',
      measure: 'ошибка 402 → SUBSCRIBE_START_SHOWED → subscription_bought',
      offers: [4, 5], next: PLANS, veil: true,
      build: () => banner('out_of_credits', "You're out of credits", 'Choose your subscription to keep creating in Quadcode', 'Subscribe') + onMain('4 · 5') + err() },
    { id: 'D', tab: 'Кредиты кончились, есть подписка', kicker: 'Баннер над чатом · состояние 3', title: 'Кредиты кончились, подписка есть',
      when: 'Баланс 0 или меньше, подписка активна.',
      look: 'Баннер с кнопкой Upgrade. Пополнение идёт через окно профиля, кнопка Deposit.',
      copy: "You're out of credits. Upgrade your plan or top up your balance with more credits",
      change: 'В IDE ничего.',
      measure: 'subscription_bought (апгрейд), Purchase_Topup',
      offers: [5, 6], veil: true,
      next: { label: 'Upgrade открывает тарифы, Deposit открывает пополнение', url: 'quadcode.ai/profile/plans', note: 'Пополнение: окно профиля → Deposit → пакеты на сайте.' },
      build: () => banner('has_subscription', "You're out of credits", 'Upgrade your plan or top up your balance with more credits', 'Upgrade') + onMain('5') + ring(1535, 1006, 130, 24) + mk('6', 1576, 948) },
    { id: 'E', tab: 'Меню моделей', kicker: 'Композер · выбор модели', title: 'Цена модели прямо в меню',
      where: 'IDE, меню выбора модели в композере',
      when: 'Каждый раз, когда человек открывает выбор модели.',
      look: 'Список моделей с логотипом и ценой за 1 млн токенов',
      copy: 'claude-opus-5-5 · ~600 → ~420 qcc/1m', copyNew: true,
      change: 'Цена модели на сервере на 7 дней. Проверить, что меню берёт цену с сервера.',
      measure: 'доля запросов на модели, расход кредитов, пополнения',
      offers: [7], veil: false,
      next: { label: 'Всё внутри IDE', note: 'Анонс скидки: Discord и рассылка.' },
      build: () => ring(466, 956, 158, 30, true) + menu() + mk('7', 742, 622) },
    { id: 'F', tab: 'Окно профиля', kicker: 'Строка состояния · окно профиля', title: 'Баланс и кнопка Deposit',
      where: 'IDE, клик по имени в правом нижнем углу',
      when: 'Когда человек сам открывает профиль. При любом балансе, с подпиской и без.',
      look: 'Окно 320×160: имя, «Balance: 25.50 QCC», кнопки Settings и Deposit',
      copy: 'Balance: 25.50 QCC · Settings · Deposit',
      change: 'В IDE ничего. Пакет выходных и поле кода живут на сайте.',
      measure: 'Purchase_Topup, credits_added, promo_code_activated',
      offers: [6, 1, 2, 3, 8, 9], veil: false,
      next: { label: 'Deposit открывает пополнение на сайте', url: 'quadcode.ai/profile → Deposit', note: 'Пакеты «N credits · $X USD» и поле промокода.' },
      build: () => ring(1535, 1006, 130, 24, true) + popup() + ring(1662, 946, 80, 32) + mk('1 · 2 · 3 · 6 · 8 · 9', 1540, 772) },
  ];

  /* ---------- offers: where / when / format ---------- */
  const GOALS = { acq: 'Привлечение', conv: 'Покупка подписки', top: 'Пополнение', ret: 'Удержание' };
  const OFFERS = [
    { n: 1, name: 'Discord: 100 кредитов', short: '100 кредитов за вступление в Discord', goal: 'acq',
      where: 'Сайт: попап уже работает. Код вводят в IDE (баннер → Enter code) или в окне профиля → Deposit',
      when: 'Первый заход на сайт, вступление в Discord',
      look: 'Попап на сайте и код в канале Discord', real: true,
      copy: 'Discord perk · Free 100 credits for Discord members! [Claim now] [Not now]',
      setup: 'Промокод на 100 кредитов в админке, 1 раз на аккаунт',
      metric: 'promo_code_activated {promo_code}, покупка за 14 дней',
      check: 'Лимит 1 на аккаунт. Код вводят только руками (Turnstile)', screens: ['B', 'F'] },
    { n: 2, name: 'Коды креаторов: 1 000 кредитов', short: 'Личный код креатора', goal: 'acq',
      where: 'Ролики и посты креаторов → IDE: баннер «Have a promo code?» → Enter code',
      when: 'После установки. Ввод — когда баланс 0 или через Deposit',
      look: 'Личный код в описании ролика, по схеме QCWELCOME0906',
      copy: 'Get 1,000 credits in Quadcode AI with code MAYA1000',
      setup: 'Промокод на каждого креатора, 1 000 кредитов, срок 30 дней',
      metric: 'Активации по каждому коду → subscription_bought',
      check: 'Не складывается с QCWELCOME. Один код на аккаунт', screens: ['B', 'F'] },
    { n: 3, name: 'Код из эфира', short: 'Код на 48 часов со стрима', goal: 'acq',
      where: 'Стрим или вебинар → IDE: Enter code',
      when: 'Во время эфира и 48 часов после',
      look: 'Короткий код на экране эфира',
      copy: 'LIVE code: 48 hours only, first 500 people',
      setup: 'Промокод с датой окончания +48 ч и лимитом 500',
      metric: 'Активации за 48 ч, покупки за 7 дней',
      check: 'Срок и лимит реально отсекают', screens: ['B', 'F'] },
    { n: 4, name: 'Годовой: 12 месяцев по цене 9', short: 'Строка в описании годового тарифа', goal: 'conv',
      where: 'Сайт, тарифы. Открываются из баннера кнопкой Subscribe или Upgrade',
      when: 'Каждый клик Subscribe или Upgrade',
      look: 'Строка в описании тарифа рядом с плашкой «25% OFF» и зачёркнутой ценой',
      copy: '12 months for the price of 9',
      setup: 'Только текст description у годовых тарифов',
      metric: 'Доля годовых в subscription_bought',
      check: 'Годовую цену не снижаем: зачёркнутая = цена / 0.75', screens: ['A', 'B', 'C'] },
    { n: 5, name: 'Тариф Film Week: +20% кредитов', short: 'Тариф недели челленджа', goal: 'conv',
      where: 'Сайт, тарифы: отдельная строка тарифа + анонс в Discord',
      when: 'Только 7 дней челленджа, потом тариф выключаем',
      look: 'Отдельная карточка тарифа',
      copy: 'Plus · Film Week: +20% credits every month, same price',
      setup: 'Копия Plus с кредитами +20%, включить на неделю',
      metric: 'Покупки тарифа за неделю, удержание через 30 дней',
      check: 'Бонус остаётся каждый месяц. Смена тарифа = отмена «Change plan», без двойного списания', screens: ['A', 'C', 'D'] },
    { n: 6, name: 'Пакет выходных: +15%', short: 'Пакет выходных: +15% кредитов', goal: 'top',
      where: 'Сайт, пополнение. Из IDE: окно профиля → Deposit',
      when: 'Пятница — воскресенье',
      look: 'Дополнительный пакет в сетке пополнения',
      copy: '1,150 credits · Weekend +15% · price of 1,000',
      setup: 'Новый пакет: 1 150 кредитов по цене 1 000',
      metric: 'Purchase_Topup, средний чек пополнения',
      check: 'У пакетов нет флага активности: убрать руками в понедельник', screens: ['F', 'D'] },
    { n: 7, name: 'Модель недели: −30%', short: 'Скидка 30% на одну модель на неделю', goal: 'ret',
      where: 'IDE: меню моделей в композере',
      when: '7 дней, при каждом открытии меню',
      look: 'Цена у модели в меню',
      copy: 'claude-opus-5-5 · ~420 qcc/1m (было ~600)',
      setup: 'Цена модели на сервере −30% на 7 дней',
      metric: 'Доля запросов на модели, расход кредитов, пополнения',
      check: 'Цена в меню приходит с сервера, и списывается ровно она', screens: ['E'] },
    { n: 8, name: 'Возврат после отмены', short: 'Код с кредитами для тех, кто отменил', goal: 'ret',
      where: 'Реклама Meta/Instagram и почта → код в IDE',
      when: '3–14 дней после отмены подписки',
      look: 'Реклама и письмо с кодом',
      copy: 'Come back to Quadcode: credits on us, code inside',
      setup: 'Аудитория в Meta из события SubscriptionCanceled + промокод',
      metric: 'subscription_bought у вернувшихся',
      check: 'Код работает только для отменивших. Лимит и срок', screens: ['B', 'F'] },
    { n: 9, name: 'Челлендж Film Week', short: 'Челлендж в Discord, призы кодами', goal: 'ret',
      where: 'Discord и попап на сайте. Призы выдаём кодами в IDE',
      when: '7 дней челленджа',
      look: 'Бриф и приём работ в Discord',
      copy: 'Quadcode Film Week: 15-second product film, prize pool 250,000 credits',
      setup: 'Канал в Discord, бриф, призовые промокоды',
      metric: 'Участники, активации призовых кодов, покупки за неделю',
      check: 'Призовые коды одноразовые', screens: ['B', 'F'] },
  ];

  const RULES = [
    ['clock', 'Плашка «-25% · limited time offer» висит всегда', 'В макете баннера она статичная. Постоянное «ограниченное предложение» — юридический риск. Проверить с юристом до запуска.'],
    ['tag', 'Годовую цену не снижаем', 'Зачёркнутая цена на сайте считается как цена / 0.75. Меняем только текст описания, иначе «скидка» станет неправдой.'],
    ['key', 'Enter code — только при балансе 0', 'Кнопка кода есть только в состоянии 1. Остальным путь: окно профиля → Deposit → поле кода на сайте.'],
    ['shield', 'Коды: лимит, срок, один на аккаунт', 'На сайте стоит Turnstile, код вводят только руками, в ссылку его не вшить.'],
    ['box', 'Пакет выходных сам не выключится', 'У пакетов нет флага активности. Убираем руками в понедельник, ставим напоминание.'],
    ['cpu', 'Цена в меню = списание', 'Перед скидкой на модель проверить: цена приходит с сервера, и списывается ровно она.'],
    ['repeat', 'Бонус Film Week остаётся', 'Кто купил тариф с +20%, получает бонус каждый месяц. Смена тарифа = отмена «Change plan»: проверить, что нет двойного списания.'],
  ];

  /* ---------- render ---------- */
  const $ = s => document.querySelector(s);
  let cur = 'A';

  function fit() {
    const f = $('.fit'), c = $('.canvas');
    if (f && c) c.style.transform = `scale(${f.clientWidth / 1919})`;
  }

  function renderTabs() {
    $('#tabs').innerHTML = SCREENS.map(s =>
      `<button class="tab${s.id === cur ? ' on' : ''}" data-s="${s.id}"><i>${s.id}</i>${s.tab}</button>`).join('');
  }

  function renderPanel(s) {
    const kv = (k, v) => v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : '';
    const offers = s.offers.map(n => {
      const o = OFFERS[n - 1];
      return `<button class="of" data-o="${n}"><i>${n}</i><span><b>${o.name}</b><span>${o.short}</span></span></button>`;
    }).join('');
    const nx = s.next;
    $('#panel').innerHTML = `
      <div class="ph"><small>${s.kicker}</small><h3>${s.title}</h3></div>
      <dl class="kv">
        ${kv('Где', s.where || BANNER_WHERE)}
        ${kv('Когда', s.when)}
        ${kv('В каком виде', s.look)}
        ${kv(s.copyNew ? 'Как будет' : 'Текст сейчас', `<q>${s.copy}</q>` + (s.extra ? `<q style="margin-top:6px">${s.extra}</q>` : ''))}
        ${kv('Что меняем', s.change)}
        ${kv('Меряем', s.measure)}
      </dl>
      <div class="offers"><h4>Офферы на этом экране</h4>${offers}</div>
      <div class="next"><b${nx.warn ? ' class="warn"' : ''}>${nx.label}</b>${nx.url ? `<br><span class="url">${IC.ext}${nx.url}</span>` : ''}<br>${nx.note}</div>`;
  }

  function renderTable() {
    $('#tbody').innerHTML = OFFERS.map(o => `
      <tr id="of-${o.n}">
        <td><div class="of-n"><i>${o.n}</i><div><b>${o.name}</b><span class="goal ${o.goal}">${GOALS[o.goal]}</span></div></div></td>
        <td>${o.where}</td>
        <td>${o.when}</td>
        <td>${o.look}<q><small>${o.real ? 'Текст сейчас' : 'Текст, предложение'}</small>${o.copy}</q></td>
        <td>${o.setup}</td>
        <td>${o.metric}</td>
        <td class="warn">${o.check}</td>
        <td><div class="scr">${o.screens.map(id => `<button data-s="${id}" title="Показать экран ${id}">${id}</button>`).join('')}</div></td>
      </tr>`).join('');
  }

  function renderRules() {
    $('#rules-grid').innerHTML = RULES.map(([ic, t, p]) =>
      `<div class="rule"><div class="ri">${IC[ic]}</div><b>${t}</b><p>${p}</p></div>`).join('');
  }

  function show(id, scroll) {
    const s = SCREENS.find(x => x.id === id);
    if (!s) return;
    cur = id;
    renderTabs();
    $('.veil').classList.toggle('off', !s.veil);
    $('#ovl').innerHTML = s.build();
    renderPanel(s);
    if (scroll) $('#ide').scrollIntoView({ behavior: 'smooth' });
  }

  function toggleFull(force) {
    const st = $('.stage');
    const on = st.classList.toggle('full', force);
    $('#zoom').textContent = on ? 'Закрыть (Esc)' : 'На весь экран';
    document.body.style.overflow = on ? 'hidden' : '';
    requestAnimationFrame(fit);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('.stage').classList.contains('full')) toggleFull(false);
  });

  function flash(n) {
    const tr = document.getElementById('of-' + n);
    if (!tr) return;
    tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    tr.classList.add('hl');
    setTimeout(() => tr.classList.remove('hl'), 1800);
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-s],[data-o],#zoom');
    if (!t) return;
    if (t.id === 'zoom') { toggleFull(); return; }
    if (t.dataset.s) show(t.dataset.s, !!t.closest('#tbody'));
    else flash(t.dataset.o);
  });

  renderTable();
  renderRules();
  show('A');
  new ResizeObserver(fit).observe($('.fit'));
  fit();
})();

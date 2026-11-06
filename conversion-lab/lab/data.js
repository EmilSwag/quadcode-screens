/* LAB DATA — moved from ../data.js */
window.LAB = {
  plans: [
    {id:'free', name:'Free', price:0, unit:'', credits:'200 QCC welcome', feats:['Все модели без ограничений','Без карты','200 QCC при регистрации','+100 QCC за рабочую почту'], cta:'Start for free', out:['≈100 картинок','≈8 клипов Veo 3']},
    {id:'monthly', name:'Basic Monthly', price:20, unit:'/мес', credits:'1 000 QCC / мес', feats:['1 000 QCC каждый месяц','Все модели, все агенты','Отмена в 1 клик'], cta:'Buy', out:['≈500 картинок','≈40 клипов Veo 3','≈20 ч агентов']},
    {id:'yearly', name:'Basic Yearly', price:180, was:240, unit:'/год', credits:'1 000 QCC / мес', feats:['12 000 QCC в год','3 месяца бесплатно','Лучшая цена за кредит','Приоритетная очередь'], cta:'Buy', hot:true, badge:'BEST VALUE · SAVE $60', out:['≈6 000 картинок','≈480 клипов','≈240 ч агентов']},
    {id:'ent', name:'Enterprise', price:null, unit:'', credits:'от 15 000 QCC', feats:['Общий пул команды','SSO, инвойсы','Личный менеджер'], cta:'Contact sales', out:[]}
  ],
  packs: [
    {c:100, p:2, rate:'$1 = 50 QCC', out:'≈50 картинок'},
    {c:500, p:10, rate:'$1 = 50 QCC', out:'≈250 картинок / 20 клипов'},
    {c:1000, p:20, rate:'$1 = 50 QCC', out:'≈500 картинок / 40 клипов', badge:'MOST POPULAR', hot:true},
    {c:4000, p:80, rate:'$1 = 50 QCC', out:'≈2 000 картинок / 160 клипов', badge:'BEST VALUE'}
  ],
  /* Defaults accepted 25.09 (PO: «прими разумные значения по умолчанию»). Single source for texts below. */
  cfg: {
    welcome: 200, workEmail: 100,                 // QCC at sign-up, extra for a work e-mail
    kitPct: 25, kitHours: 72,                     // Starter Kit: +25% QCC to the first purchase, 72 h from created_at
    offerPct: 20, offerMin: 5, offerCooldownDays: 30, // personal timer offer
    exitBonus: 300,                               // exit-intent: +300 QCC to the first Monthly
    refill: {threshold: 100, pack: 500, price: 10, capPerMonth: 2, defaultOn: false},
    referral: {friend: 300, you: 300, capPerMonth: 10, gifts: [20, 50, 100]},
    prorationRate: 0.02                           // $ per unused QCC when changing plan (= purchase price $20 / 1 000)
  },
  decisions: [
    {q:'Welcome-кредиты', v:'200 QCC (≈ $4) + 100 за рабочую почту', why:'≈ 100 картинок или 8 клипов — хватает, чтобы дойти до «вау», но не закрывает месяц работы. HF даёт 10–50 кредитов; у нас барьер входа ниже, а стоимость ≈ $4 на регистрацию окупается при conversion ≥ 5%.', where:'A2, A3, главная, Sign up, ЛК нового'},
    {q:'Starter Kit', v:'+25% QCC к первой покупке (1 000 → 1 250), 72 ч', why:'Бонус кредитами не ломает якорь цены $20 и не учит ждать скидок. Работает и для паков. Один раз на аккаунт, дедлайн серверный.', where:'A4, B1, B2, checkout'},
    {q:'Авто-пополнение', v:'В бэклог биллинга сейчас (Волна 3). По умолчанию выключено; порог 100 QCC → пак 500 за $10, не чаще 2 раз в месяц', why:'Opt-in защищает от жалоб и чарджбэков; порог 100 QCC ≈ 2–3 запроса к дорогой модели — ровно момент, когда работа встаёт.', where:'A10, A13, B4'},
    {q:'Перерасчёт при смене плана', v:'В бэклог биллинга сейчас (Волна 3). Monthly → Yearly сразу с зачётом остатка по $0.02/QCC; даунгрейд — с даты продления, сегодня $0', why:'Сейчас смена плана = отмена + полная цена, и это главный тормоз Yearly-mix. Зачёт по цене покупки — понятная и честная формула.', where:'A11'},
    {q:'Реферал', v:'+300 QCC другу при регистрации и +300 тебе после его первой покупки; до 10 друзей в месяц; gift cards $20 / $50 / $100', why:'Награда только после покупки друга исключает фарм аккаунтов; 300 QCC ≈ $6 — дешевле любого платного канала.', where:'A15, B10'},
    {q:'Персональный таймер', v:'−20% на первый месяц, 5 минут, один раз в 30 дней; не показывается, пока активен Starter Kit', why:'Правило одного urgency-оффера (meta/rules/temporary-offers.md). Скидка только на первый месяц — не режет LTV.', where:'A8, B7'}
  ],
  personas: {
    guest:  {label:'Гость', logged:false},
    newuser:{label:'Новый юзер (Free, 200 QCC, 2 ч)', logged:true, name:'Drop Emil Emil', plan:'Free', bal:200, purchases:0, ageH:2, kitDeadlineH:70},
    monthly:{label:'Monthly (766 QCC, 2-й месяц)', logged:true, name:'Drop Emil Emil', plan:'Basic Monthly', bal:766.52, purchases:2, ageH:900, next:'Sep 7, 2026'},
    zero:   {label:'Monthly · баланс 0', logged:true, name:'Drop Emil Emil', plan:'Basic Monthly', bal:0, purchases:2, ageH:900, next:'Sep 7, 2026'}
  },
  /* Part A — site & account improvements */
  site: [
    {id:'A1', screens:['home','pricing'], t:'Pricing в навигации + публичный /pricing', d:'Сейчас: ссылки нет, /pricing = 404, /profile/plans без логина → редирект. Гость не видит цен.', trig:'Всегда', hf:'Pricing в шапке + бейдж 30% OFF', eff:'visitor→signup, SEO', need:'Фронт: роут + компонент цен; бэк: публичный GET цен', wave:1},
    {id:'A2', screens:['signup'], t:'Sign Up: 2 поля + стимул «200 QCC free»', d:'Сейчас 5 полей + промокод + Turnstile без стимула. После: Email/Password + Google/GitHub, чек-лист выгод, +100 QCC за рабочую почту.', trig:'Start for free / Sign Up', hf:'«Sign up and get your extra discount», +50 cr за рабочую почту', eff:'signup completion +15–25%', need:'Бэк: авто-промокод WELCOME; фронт: форма', wave:1},
    {id:'A3', screens:['signin'], t:'Sign In: мостик «Нет аккаунта? +200 QCC»', d:'Блок под формой для тех, кто нажал Sign in вместо Sign up.', trig:'Открытие Sign In', hf:'ссылка на выгоду регистрации', eff:'signup rate', need:'Фронт', wave:1},
    {id:'A4', screens:['account'], t:'Welcome Starter Kit (первые 72 ч)', d:'Модалка после регистрации: первая покупка +25% QCC (1 000 → 1 250), честный таймер до created_at+72h. Показ 1 раз.', trig:'Аккаунт < 24 ч, покупок нет', hf:'скидка новичку, 3-часовое окно', eff:'signup→first purchase', need:'Бэк: промокод с TTL на аккаунт', wave:2},
    {id:'A5', screens:['home','account','pricing'], t:'Site-wide промо-полоса', d:'Одна полоса над шапкой, текст по аудитории: гость — Yearly −25%; Free — Starter Kit; Monthly — «3 месяца в подарок».', trig:'Активная кампания', hf:'жёлтая полоса с ротацией и таймером', eff:'CTR в pricing, Yearly mix', need:'Бэк: GET /promo/banner?audience', wave:1},
    {id:'A6', screens:['home','account'], t:'Пилюля «Upgrade · −25%» в шапке', d:'Оранжевая пилюля рядом с балансом для Free/Monthly → /profile/plans#yearly.', trig:'Залогинен, не Yearly', hf:'Upgrade · 30% OFF', eff:'Yearly mix, ARPU', need:'Фронт', wave:1},
    {id:'A7', screens:['pricing','account'], t:'Карточки тарифов: Yearly по умолчанию, исходы, BEST VALUE', d:'Save $60 = 3 месяца бесплатно; «1 000 QCC ≈ 500 картинок / 40 клипов / 20 ч агентов»; «Не знаешь какой план?»; сравнение; доверие (Stripe, Visa/MC).', trig:'Открытие тарифов', hf:'Annual default, Save €360, =135 gens, Not sure which plan?', eff:'checkout start, Yearly mix', need:'Фронт ЛК', wave:1},
    {id:'A8', screens:['account'], t:'Персональный таймер-оффер (5 мин)', d:'Попап «−20% на первый месяц · 04:59». Дедлайн серверный, повтор не раньше чем через 30 дней. Применение пересчитывает цены на странице + липкая полоса с таймером.', trig:'Без покупок, 2-й визит Plans или >45 с без клика', hf:'exit-intent 62% OFF · 07:58 LEFT, липкий бар 05:30', eff:'purchase в сессии', need:'Бэк: выдача оффера с TTL', wave:2},
    {id:'A9', screens:['account'], t:'Exit-intent: +300 QCC к первому Monthly', d:'Оверлей при уходе курсора вверх. Бонус кредитами, не скидка — не ломает якорь цены. 1 раз в 30 дней. Не показываем, если активен A8.', trig:'mouseleave/visibilitychange, без покупок', hf:'EXTRA DISCOUNT ADDED', eff:'спасённые сессии', need:'Бэк: бонус-промокод', wave:2},
    {id:'A10', screens:['account','pricing'], t:'Паки: лестница с якорями + авто-пополнение', d:'100/$2 · 500/$10 · 1 000/$20 MOST POPULAR · 4 000/$80 BEST VALUE; «$1 = 50 QCC», исходы; баннер «Включи авто-пополнение».', trig:'Top up balance', hf:'7 паков, зачёркнутая цена, €1=N cr, слайдер, auto-refill', eff:'средний чек пака, auto-refill', need:'Фронт; бэк: auto-refill', wave:1},
    {id:'A11', screens:['account'], t:'Change plan с перерасчётом', d:'Monthly→Yearly: «Неиспользованные кредиты −$X · К оплате сегодня $Y · старт сейчас». Даунгрейд — с даты продления, сегодня $0. Сейчас: отмена + полная цена.', trig:'Change plan', hf:'Unused credits −€33.53, Due today', eff:'Yearly mix, меньше отмен', need:'Бэк: prorations (биллинг)', wave:3},
    {id:'A12', screens:['account'], t:'Overview подписки: удержание и ценность', d:'Дата продления, чек-лист с одним ✗ (лучшая цена за кредит → Yearly), кредит-бар, «сгенерировано / сэкономлено», «ещё не пробовал: Sonic, Lumi, MCP».', trig:'Overview', hf:'checklist 1 ✗, saved in total, Rewind, plan includes 1/15', eff:'retention, upgrade', need:'Бэк: агрегаты Usage', wave:4},
    {id:'A13', screens:['account'], t:'Нехватка кредитов → модалка стора', d:'3 таба Plans | Top up | Promo, предвыбран пак под нехватку: «не хватает 120 QCC → 500 за $10 закроет».', trig:'Баланс 0 / меньше цены операции', hf:'store modal, preselected Top-up', eff:'top-up rate', need:'Фронт', wave:1},
    {id:'A14', screens:['account'], t:'Отмена — 1 честный экран', d:'«Остаток 766 QCC = $15.33 сгорит {дата}» · Напомнить за 3 дня · Пауза на месяц · Отменить. Без 5-экранного лабиринта (ROSCA/DSA риск).', trig:'Cancel', hf:'5 экранов, $57.44 in money, 25% OFF 2 months', eff:'churn', need:'Бэк: пауза, напоминание', wave:3},
    {id:'A15', screens:['account'], t:'Пригласить друга + gift cards', d:'Друг +300 QCC, ты +300 после его первой покупки; подарочные карты $20/$50/$100.', trig:'ЛК, попап профиля', hf:'affiliate 25% cash, invite = Unlimited days, gifts $50–500', eff:'CAC, виральность', need:'Бэк: реф-коды', wave:3},
    {id:'A16', screens:['home'], t:'Соцдоказательство + Challenge Live', d:'«12 400 генераций за неделю», «Community Challenge · приз 1 200 QCC». Только честные счётчики.', trig:'Главная', hf:'Contests, TOP/NEW бейджи', eff:'вовлечение', need:'Контент + аналитика', wave:4},
    {id:'A17', screens:['account'], t:'Failed payment / напоминание о списании', d:'Полоса «Списание не прошло — обнови карту, доступ до {дата}» + письмо за 3 дня до списания.', trig:'Stripe webhook', hf:'notify 7 days before', eff:'invol. churn', need:'Бэк: вебхуки', wave:3},
    {id:'A18', screens:['checkout'], t:'Apple Pay / Google Pay / Link в checkout', d:'Один переключатель в Stripe. Сейчас — только карта.', trig:'Checkout', hf:'сохранённая карта, auto-refill', eff:'mobile completion', need:'Stripe настройка', wave:3}
  ],
  /* Part B — IDE marketing layers (no product changes) */
  ide: [
    {id:'B1', t:'Первый запуск → Starter Kit баннер', trig:'Аккаунт < 24 ч, покупок нет', copy:'Starter Kit для новых: первая покупка +25% QCC. До конца оффера', cta:'Забрать +25% → /profile/plans?promo=STARTER25', eff:'signup→purchase', need:'Текст баннера + дедлайн с сервера (banner config)', kind:'banner', timer:true},
    {id:'B2', t:'Первый выбор дорогой модели → тост', trig:'Новый юзер выбрал Opus / Veo / Sora', copy:'Claude Opus ≈ 40 QCC/запрос, у тебя 200. Starter Kit +25% к первой покупке — успей.', cta:'Забрать → /profile/plans', eff:'first purchase', need:'Клиент: событие выбора модели, показ 1 раз', kind:'toast'},
    {id:'B3', t:'402 «balance too low» → карточка с паком', trig:'Ошибка 402 при запросе', copy:'Не хватило 120 QCC для этого запроса. Пак 500 QCC за $10 закроет и хватит ещё на ~30 запросов.', cta:'Купить 500 за $10 · Все паки', eff:'top-up rate', need:'Клиент: 402 как карточка; сервер: рекомендация пака', kind:'card'},
    {id:'B4', t:'Низкий баланс → авто-пополнение', trig:'Баланс < 15% плана', copy:'Осталось 140 QCC из 1 000. Включи авто-пополнение — работа не остановится.', cta:'Включить · Докупить', eff:'top-up, auto-refill', need:'Сервер: порог; бэк: auto-refill', kind:'banner'},
    {id:'B5', t:'После результата → кросс-селл', trig:'Успешная генерация картинки', copy:'Оживить в видео (Veo 3, ~60 QCC) · Сделать 4 вариации (Nano Banana, ~8 QCC)', cta:'Запускает промпт Sonic/Lumi', eff:'ARPU', need:'Клиент: контекстная подсказка', kind:'inline'},
    {id:'B6', t:'Monthly → Yearly nudge', trig:'Monthly-подписчик, 2-й+ месяц', copy:'Yearly = 3 месяца в подарок: $180 вместо $240 за 12 000 QCC.', cta:'Перейти → /profile/plans#yearly', eff:'Yearly mix', need:'Текст с сервера', kind:'banner'},
    {id:'B7', t:'Активный оффер → пилюля с таймером', trig:'У юзера есть промокод с TTL', copy:'−20% · 04:59', cta:'→ /profile/plans', eff:'urgency conversion', need:'Сервер: активный оффер юзера', kind:'pill', timer:true},
    {id:'B8', t:'Model of the week — бейдж в меню моделей', trig:'Кампания', copy:'−30% эта неделя (только бейдж, меню не меняем)', cta:'—', eff:'пробы моделей', need:'Сервер: список акционных моделей', kind:'menu'},
    {id:'B9', t:'Возврат после 14+ дней → win-back', trig:'Неактивность 14+ дней', copy:'С возвращением! +200 QCC к любой покупке на этой неделе.', cta:'→ /profile/plans?promo=BACK200', eff:'win-back', need:'Сервер', kind:'banner'},
    {id:'B10', t:'Попап профиля = магазин', trig:'Клик по аватару', copy:'Баланс-бар 766/1 000 · Top up · Upgrade −25% · Пригласить друга +300', cta:'ЛК', eff:'top-up, referral', need:'Клиент', kind:'menu'},
    {id:'B11', t:'Community Challenge баннер', trig:'Кампания', copy:'Challenge · Live now: сделай ролик с Sonic — приз 1 200 QCC', cta:'Участвовать', eff:'вовлечение', need:'Контент', kind:'banner'},
    {id:'B12', t:'Free 3+ дня, 5+ генераций → социальное', trig:'Free, покупок нет, 5+ генераций', copy:'Ты уже сделал 12 работ на Free. Monthly $20 = 1 000 QCC/мес — как у 70% активных.', cta:'→ /profile/plans', eff:'free→paid', need:'Сервер: счётчики', kind:'banner'}
  ],
  compare: [
    ['Цены видны гостю','✅ Pricing в шапке + 30% OFF','❌ нет ссылки, /pricing 404, /profile/plans → редирект','критичный'],
    ['Промо-полоса','✅ жёлтая, ротация, таймер','❌','высокий'],
    ['Sign up','✅ стимул, чек-лист, +50 cr за рабочую почту','❌ 5 полей, ноль стимулов','высокий'],
    ['Welcome-оффер','✅ скидка новичку, 3-часовое окно','❌','высокий'],
    ['Страница тарифов','✅ Annual default, Save €360, =135 gens, сравнение','⚠️ карточки, Save 25%, без исходов','высокий'],
    ['Таймер / персональный оффер','✅ 62% OFF · 07:58, пересчёт цен','❌','высокий'],
    ['Паки','✅ 7 паков, якоря, €1=N, auto-refill','⚠️ 4 пака без якорей','средний'],
    ['Смена плана','✅ prorations, Due today','❌ отмена + полная цена','высокий'],
    ['Подписка (удержание)','✅ чек-лист 1 ✗, saved, Rewind, 1/15','⚠️ баланс + план','средний'],
    ['Нехватка кредитов','✅ store modal, Unlimited pass','⚠️ строка 402 + баннер','высокий'],
    ['Отмена','✅ 5 экранов (риск ROSCA/DSA)','❌','средний'],
    ['Реферал / gifts','✅ 25% cash, invite, gift cards','❌','средний'],
    ['Магазин в меню профиля','✅ бар + 3 Get','⚠️ Top up balance','средний'],
    ['Цена на кнопке / апселл после результата','✅ Generate ✦2, Turn to video','❌','средний'],
    ['Пилюля Upgrade','✅ Upgrade · 30% OFF','❌','высокий'],
    ['Оплата','✅ карта, auto-refill','⚠️ только карта','средний']
  ],
  evidence: {
    qc: [['qc/home.png','quadcode.ai — главная (гость), 25.09: нет Pricing'],['qc/signin.png','Sign In модалка'],['qc/signup.png','Sign Up — 5 полей + промокод'],['qc/plans-po.png','/profile/plans (залогинен, скрин PO)'],['qc/ide-po.png','IDE v0.17441 (скрин PO)']],
    hf: [['hf/home-guest.png','HF главная (гость) 25.09: «Sign up and get your extra discount»'],['hf/pricing-guest.png','HF /pricing (гость): баннер, Annual default, Save €360'],['hf/89-exit-intent-62pct.png','Exit-intent 62% OFF · 07:58 LEFT'],['hf/92-pricing-clean.png','Липкий бар 05:30 + пересчёт цен'],['hf/43-menu.png','Меню аватара = магазин'],['hf/06-topup.png','Паки: якоря, €1=N, MOST POPULAR'],['hf/78-change-commitment-modal.png','Change Commitment: Unused credits −€33.53'],['hf/48-subscription.png','Subscription: чек-лист, кредит-бар, auto-refill'],['hf/68-cancel-flow-screen2.png','Отмена: $57.44 in money · 718 credits · 359 gens'],['hf/74-cancel-flow-screen5.png','Отмена: 25% OFF FOR 2 MONTHS'],['hf/41-upgrade-pill.png','Пилюля Upgrade · 30% OFF'],['hf/35-result.png','Результат → Turn to video']]
  }
};
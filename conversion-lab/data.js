/* Conversion Lab — Shared Data Layer
   Single source of truth for Hub (index.html), Part A (site.html), and Part B (ide.html)
   Based on meta/docs/research/conversion-lab-spec.md and live Quadcode pricing model.
*/

window.CL_DATA = {
  specMeta: {
    title: "Conversion Lab — Quadcode vs Higgsfield",
    date: "25.09.2026",
    author: "Cody (Developer)",
    ports: {
      hub: 9995,
      offersLive: 9991,
      part1: 9973
    },
    tldr: [
      "Гостю на quadcode.ai сейчас не видно цен (в навигации нет ссылки, роут /pricing выдаёт 404, /profile/plans редиректит на логин). Мы открываем публичный роут /pricing и добавляем ссылку в навигацию (A1).",
      "Регистрация упрощается с 5 полей до 2 (email + пароль / соцсети) со стимулом «Получите 200 QCC бесплатно» (A2).",
      "Внедряем 18 конверсионных механик на сайте и в ЛК (A1–A18) и 12 продающих триггеров в IDE (B1–B12).",
      "Строго соблюдаем правило meta/rules/temporary-offers.md: не более 1 urgency-оффера одновременно, только честный серверный дедлайн без сброса по F5.",
      "Продуктовая логика Quadcode (все модели открыты всем, покупка кредитов QCC) полностью сохраняется — добавляются исключительно маркетинговые и удерживающие слои."
    ]
  },

  comparison: [
    { id: 1, name: "Цены видны гостю на сайте", hf: "Кнопка Pricing в шапке + промо-бейдж '30% OFF', публичный /pricing со сравнением", qc: "Нет ссылки в навигации, /pricing = 404, /profile/plans редиректит на Sign in", gap: "критичный", hfShot: "assets/hf/pricing-guest.png", qcShot: "assets/qc/home.png" },
    { id: 2, name: "Промо-полоса на главной", hf: "Желтая sticky-полоса с обратным отсчетом (07:58) и промокодом", qc: "Отсутствует", gap: "высокий", hfShot: "assets/hf/home-guest.png", qcShot: "assets/qc/home.png" },
    { id: 3, name: "Стимул при регистрации (Sign Up)", hf: "«Sign up & Get 50 Free Credits» + чек-лист выгод + вход через Google", qc: "Сухая форма: 5 полей (First Name, Last Name, Email, Password, Confirm), капча, 0 стимулов", gap: "высокий", hfShot: "assets/hf/pricing-guest.png", qcShot: "assets/qc/signup.png" },
    { id: 4, name: "Мостик входа (Sign In)", hf: "«New to Higgsfield? Sign up for free and get credits»", qc: "Сухая форма Sign In без стимулов перехода", gap: "средний", hfShot: "assets/hf/pricing-guest.png", qcShot: "assets/qc/signin.png" },
    { id: 5, name: "Welcome Starter Kit", hf: "Welcome-оффер на 3 часа со скидкой после первого входа", qc: "Отсутствует", gap: "высокий", hfShot: "assets/hf/pricing-guest.png", qcShot: "assets/qc/plans-po.png" },
    { id: 6, name: "Тарифы по умолчанию (Default Plan)", hf: "Annual включен по умолчанию, крупный бейдж «Save $360», показ исходов", qc: "Monthly включен по умолчанию, экономия 25% незаметна, карточки без исходов", gap: "высокий", hfShot: "assets/hf/pricing-guest.png", qcShot: "assets/qc/plans-po.png" },
    { id: 7, name: "Карточки тарифов в ЛК", hf: "«Best Value», «Most Popular», подсчет стоимости генерации, яркие акценты", qc: "Серые карточки, мелкий текст, без пересчета в генерации", gap: "высокий", hfShot: "assets/hf/pricing-guest.png", qcShot: "assets/qc/plans-po.png" },
    { id: 8, name: "Персональный оффер с таймером", hf: "Таймер 07:58 со скидкой 62%, перечеркнутые старые цены", qc: "Отсутствует", gap: "высокий", hfShot: "assets/hf/89-exit-intent-62pct.png", qcShot: "assets/qc/plans-po.png" },
    { id: 9, name: "Exit-intent спасение сессии", hf: "Попап при уходе с тарифов: доп. скидка или доп. кредиты", qc: "Отсутствует", gap: "средний", hfShot: "assets/hf/89-exit-intent-62pct.png", qcShot: "assets/qc/plans-po.png" },
    { id: 10, name: "Пакеты докупки кредитов (Top Up)", hf: "7 паков, прогрессивная шкала, бейджи «Popular», авто-пополнение", qc: "4 пака ($2, $10, $20, $80), без бейджей и авто-пополнения", gap: "средний", hfShot: "assets/hf/06-topup.png", qcShot: "assets/qc/plans-po.png" },
    { id: 11, name: "Смена тарифа (Upgrade / Change)", hf: "Мгновенный пересчет со справедливым зачетом (Prorations)", qc: "Только отмена старого и полная покупка нового тарифа", gap: "высокий", hfShot: "assets/hf/78-change-commitment-modal.png", qcShot: "assets/qc/plans-po.png" },
    { id: 12, name: "Удержание в ЛК (Dashboard ценности)", hf: "Счетчик сохраненных генераций, история расхода, напоминания", qc: "Только дата следующего списания и баланс", gap: "средний", hfShot: "assets/hf/48-subscription.png", qcShot: "assets/qc/plans-po.png" },
    { id: 13, name: "Флоу отмены (Save Flow)", hf: "1 экран: пауза, скидка 50% на 2 мес, напоминание за 3 дня", qc: "Подтверждение отмены без альтернатив", gap: "высокий", hfShot: "assets/hf/74-cancel-flow-screen5.png", qcShot: "assets/qc/plans-po.png" },
    { id: 14, name: "Реферальная программа", hf: "«Invite friend — get 200 credits both» на видных местах", qc: "Код в ЛК, но нет стимулов на главной и в IDE", gap: "средний", hfShot: "assets/hf/104-affiliate-page.png", qcShot: "assets/qc/plans-po.png" },
    { id: 15, name: "Соцдоказательства и челленджи", hf: "Счетчик генераций комьюнити, баннеры контестов с призами", qc: "Отсутствуют", gap: "средний", hfShot: "assets/hf/home-guest.png", qcShot: "assets/qc/home.png" },
    { id: 16, name: "Баннер в IDE при первом запуске", hf: "Промо-слой с таймером и предложением Starter Kit", qc: "Статический баннер 'Explore Plans' без оффера и таймера", gap: "критичный", hfShot: "assets/banner/bg_new_user_light.jpg", qcShot: "assets/qc/ide-po.png" },
    { id: 17, name: "Реакция на выбор дорогой модели в IDE", hf: "Предупреждение о стоимости + быстрый оффер докупки", qc: "Тихий выбор модели без подсказки расхода кредитов", gap: "высокий", hfShot: "assets/banner/bg_new_user_light.jpg", qcShot: "assets/qc/po-3.png" },
    { id: 18, name: "Обработка ошибки 402 в IDE", hf: "Интерактивная карточка с рекомендацией пака в 1 клик", qc: "Серая строка 'HTTP 402 Payment Required'", gap: "критичный", hfShot: "assets/banner/bg_has_subscription_light.jpg", qcShot: "assets/qc/ide-po.png" },
    { id: 19, name: "Предупреждение о низком балансе (<15%)", hf: "Тост или баннер с предложением авто-рефилла", qc: "Отсутствует до полной остановки генерации", gap: "высокий", hfShot: "assets/banner/bg_has_subscription_light.jpg", qcShot: "assets/qc/ide-po.png" },
    { id: 20, name: "Кросс-селл следующих шагов в IDE", hf: "Под готовой картинкой: «Оживить в видео в 1 клик»", qc: "Результат выдается без предложений дальнейших шагов", gap: "средний", hfShot: "assets/hf/35-result.png", qcShot: "assets/qc/ide-po.png" }
  ],

  partA: [
    { id: "A1", name: "Pricing в навигации + публичный /pricing", surface: "Шапка сайта (гость), футер, роут /pricing", sees: "Ссылка 'Pricing −25%' в навигации. Публичная страница с тарифами $0, $15, $75, $150, исходами (500 картинок / 40 видео), FAQ и Stripe-бейджами.", impact: "Конверсия гостя в регистрацию и оплату (+35%)", reqs: "FE сайта: роут /pricing; бэк: публичный GET /api/v1/plans", wave: 1 },
    { id: "A2", name: "Sign Up со стимулом +200 QCC", surface: "Модалка / страница Sign Up", sees: "Заголовок 'Create account — get 200 QCC free'. Чек-лист: все модели, без карты. 2 поля (email+пароль) + Google/GitHub. +100 QCC за рабочую почту.", impact: "Конверсия формы регистрации (+40%)", reqs: "FE: упрощение формы до 2 полей; бэк: начисление 200 trial-кредитов", wave: 1 },
    { id: "A3", name: "Sign In с мостиком на регистрацию", surface: "Модалка / страница Sign In", sees: "Под формой логина: 'Впервые в Quadcode? Зарегистрируйтесь и получите 200 QCC бесплатно'.", impact: "Уменьшение оттока случайных гостей (+15%)", reqs: "FE сайта", wave: 1 },
    { id: "A4", name: "Welcome Starter Kit (+25% QCC)", surface: "Попап после первого входа в ЛК", sees: "Попап: 'Starter Kit: первая покупка +25% QCC (1 250 вместо 1 000 за $20)'. Таймер 72 часа.", impact: "Конверсия первой оплаты в первые 3 дня (+25%)", reqs: "FE ЛК: модалка; бэк: промокод STARTER25 с TTL 72 ч", wave: 2 },
    { id: "A5", name: "Промо-полоса на главной", surface: "Верх главной страницы над шапкой", sees: "Полоса с градиентом: '🔥 Yearly −25%: 1 000 QCC/мес за $15/мес ($180/год) — 3 мес в подарок!' + таймер.", impact: "CTR в тарифы (+20%), доля Yearly (+15%)", reqs: "FE сайта; бэк: banner config", wave: 1 },
    { id: "A6", name: "Пилюля Upgrade в шапке ЛК", surface: "Шапка сайта и ЛК для авторизованных", sees: "Яркая оранжевая кнопка 'Upgrade · −25%' рядом с балансом.", impact: "Частота кликов в апгрейд (+18%)", reqs: "FE сайта и ЛК", wave: 1 },
    { id: "A7", name: "Редизайн карточек тарифов", surface: "Страница /profile/plans в ЛК", sees: "Yearly включен по умолчанию, бейдж 'MOST POPULAR · SAVE $60', исходы генераций.", impact: "Конверсия в выбор плана (+22%)", reqs: "FE ЛК", wave: 1 },
    { id: "A8", name: "Персональный таймер-оффер на 5 мин", surface: "ЛК /profile/plans при повторном визите", sees: "Попап и липкая полоса: 'Ваша персональная скидка −20% на 1-й месяц: $16 вместо $20' + таймер 04:59.", impact: "Срочная конверсия сомневающихся (+30%)", reqs: "FE ЛК; бэк: генерация персонального TTL", wave: 2 },
    { id: "A9", name: "Exit-intent оверлей", surface: "При попытке увести курсор с тарифов", sees: "Оверлей: 'Подождите! Заберите +300 бонусных QCC к любому выбранному плану'.", impact: "Спасение уходящей сессии (+12%)", reqs: "FE ЛК: детектор mouseleave", wave: 2 },
    { id: "A10", name: "Паки докупки с авто-рефиллом", surface: "Модалка Top Up Balance в ЛК", sees: "Паки 100/$2, 500/$10, 1000/$20 (POPULAR), 4000/$80 (BEST VALUE). Тоггл 'Авто-пополнение при остатке < 50 QCC'.", impact: "Средний чек докупок (+25%), LTV (+35%)", reqs: "FE ЛК; бэк: флаг auto-refill и списание Stripe", wave: 1 },
    { id: "A11", name: "Смена плана со справедливым вычетом", surface: "Модалка Change Plan в ЛК", sees: "Прозрачный расчет Prorations: 'План $180 − остаток 766 QCC ($15.33) = к доплате $164.67'.", impact: "Снижение барьера перехода на Yearly (+40%)", reqs: "FE ЛК; бэк: Stripe Prorations API", wave: 3 },
    { id: "A12", name: "Value-Realization Dashboard в ЛК", surface: "Главная страница ЛК", sees: "Метрики пользы: '142 картинки, 18 видео, сэкономлено $64 по сравнению с API'.", impact: "Снижение оттока (Retention +20%)", reqs: "FE ЛК; бэк: агрегаты активности", wave: 4 },
    { id: "A13", name: "Модалка нехватки кредитов", surface: "ЛК при попытке запуска без баланса", sees: "3 вкладки: Plans | Top up | Promo. 'Не хватает 120 QCC — пак 500 за $10 решит задачу'.", impact: "Конверсия в докупку (+30%)", reqs: "FE ЛК", wave: 1 },
    { id: "A14", name: "Честный 1-экранный Save-flow отмены", surface: "Модалка Cancel Subscription", sees: "Предупреждение о сгорании остатка + альтернативы: 'Напомнить за 3 дня' или 'Пауза на 1 месяц'.", impact: "Предотвращение 25% случайных отмен", reqs: "FE ЛК; бэк: Stripe pause subscription", wave: 3 },
    { id: "A15", name: "Реферальный блок 'Подари 300 QCC'", surface: "Боковое меню ЛК и баннер", sees: "Реферальная ссылка: 'Пригласи коллегу: ему +300 QCC, тебе +300 QCC после первой оплаты'.", impact: "Виральный органический рост (+15%)", reqs: "FE ЛК; бэк: реферальные промокоды", wave: 3 },
    { id: "A16", name: "Блок Community AI Challenge", surface: "Главная страница сайта и ЛК", sees: "Баннер: 'AI Creator Contest — призовой фонд 50 000 QCC'. Примеры работ авторов.", impact: "Вовлечение и виральность в соцсетях", reqs: "FE сайта: промо-блок", wave: 4 },
    { id: "A17", name: "Восстановление брошенной корзины", surface: "Email / CRM триггер через 2 часа", sees: "Письмо: 'Вы остановились в шаге от безлимитного творчества. +150 QCC, если завершите сегодня'.", impact: "Возврат 14% незавершенных оплат", reqs: "CRM / webhook из Stripe checkout.session.expired", wave: 3 },
    { id: "A18", name: "Экспресс-оплата Apple Pay / Google Pay", surface: "Форма Stripe Checkout", sees: "Кнопки Pay и G Pay на первом экране чекаута для оплаты в 1 касание.", impact: "Конверсия мобильного чекаута (+18%)", reqs: "Настройка Payment Request Button в Stripe", wave: 3 }
  ],

  partB: [
    { id: "B1", name: "Starter Kit для новых авторов", where: "Баннер new_user над чатом IDE", trigger: "Аккаунт < 24 часов, покупок нет", sees: "«Starter Kit: первая покупка +25% QCC (1 000 → 1 250) · таймер 71:58:32» + кнопка «Забрать +25% QCC»", cta: "/profile/plans?promo=STARTER25", impact: "Конверсия новичков в первую покупку (+30%)", reqs: "Сервер: флаг new_user + дедлайн в banner config", priority: 2 },
    { id: "B2", name: "Предупреждение при выборе дорогой модели", where: "Тост над меню выбора модели внизу чата", trigger: "Выбор Claude Opus / Veo 3 / Sora новым пользователем", sees: "«Эта модель ≈ 40 QCC/запрос. У вас 200. Starter Kit +25% — успейте до дедлайна!»", cta: "/profile/plans?promo=STARTER25", impact: "Осознанный расход и покупка до обнуления (+20%)", reqs: "Клиент: событие onChangeModel; показ 1 раз", priority: 2 },
    { id: "B3", name: "Интерактивная карточка ошибки 402 в чате", where: "Вместо серой строки ошибки прямо в ленте сообщений", trigger: "Попытка генерации при балансе < стоимости запроса", sees: "«Не хватило 120 QCC. Пак 500 за $10 закроет задачу и хватит ещё на ~30 запросов» + кнопки «Купить 500» / «Все паки»", cta: "/profile/plans#topup&pack=500", impact: "Конверсия 402 ошибок в мгновенную докупку (+45%)", reqs: "Клиент: компонент ChatCard402; бэк: расчет дельты", priority: 1 },
    { id: "B4", name: "Предупреждение о низком остатке (<15%)", where: "Баннер has_subscription над чатом", trigger: "Остаток баланса < 15% месячного плана", sees: "«Осталось 140 QCC — включите авто-пополнение, чтобы не прерывать работу агентов»", cta: "/profile/plans#autorefill", impact: "Снижение задержек в генерации, рост авто-рефилла", reqs: "Сервер: условие balance < 0.15 * plan_credits", priority: 3 },
    { id: "B5", name: "Кросс-селл следующих шагов под результатом", where: "Инлайн-подсказка под карточкой готовой генерации", trigger: "Успешная генерация изображения через Lumi / Midjourney", sees: "«🎬 Оживить в видео (Veo 3 · ~60 QCC)» / «🔍 4K Вариации» в один клик", cta: "Автозаполнение промпта в диалоге Sonic", impact: "Рост ARPU и расхода кредитов за счет смежных моделей (+25%)", reqs: "Клиент: контекстные подсказки под готовым медиа", priority: 8 },
    { id: "B6", name: "Апгрейд на Yearly для подписчиков", where: "Баннер has_subscription над чатом", trigger: "Monthly-подписчик на 2-й и последующие месяцы", sees: "«Годовой тариф = 3 месяца в подарок · $180 вместо $240 с зачетом остатка»", cta: "/profile/plans#yearly", impact: "Переход в долгосрочные подписки (+25% Yearly mix)", reqs: "Сервер: условие active_subscription_months >= 2", priority: 6 },
    { id: "B7", name: "Пилюля активного промокода в статус-баре", where: "Статус-бар IDE рядом с аватаром", trigger: "У пользователя есть активный временный промокод", sees: "«⚡ −20% скидка · 04:59» с живым таймером", cta: "/profile/plans", impact: "Постоянное напоминание без раздражающих попапов", reqs: "Клиент: статусная плашка; сервер: TTL оффера", priority: 5 },
    { id: "B8", name: "Бейдж «Модель недели» в списке моделей", where: "Выпадающее меню переключения моделей", trigger: "Маркетинговая промо-кампания определенной модели", sees: "Бейдж «−30% ЭТА НЕДЕЛЯ» напротив акционной модели (Stable Audio / Flash)", cta: "Выбор модели", impact: "Стимулирование проб новых моделей (+50% запусков)", reqs: "Сервер: promo_model_id в конфиге IDE", priority: 9 },
    { id: "B9", name: "Win-Back баннер после неактивности", where: "Баннер promo_user над чатом", trigger: "Возврат пользователя после 14+ дней отсутствия", sees: "«С возвращением! +200 бонусных QCC к любому пополнению на этой неделе»", cta: "/profile/plans?promo=BACK200", impact: "Реактивация заснувших пользователей (+18%)", reqs: "Сервер: last_active_days >= 14", priority: 4 },
    { id: "B10", name: "Магазин в меню профиля IDE", where: "Выпадающее меню по клику на аватар/баланс", trigger: "Клик на профиль в правом нижнем углу", sees: "Мини-магазин: шкала баланса, кнопки «💎 Top Up», «⭐ Upgrade», «🎁 Пригласить друга (+300 QCC)»", cta: "/profile/plans", impact: "Конверсия из регулярного интерфейса", reqs: "Клиент: верстка попапа профиля", priority: 7 },
    { id: "B11", name: "Баннер Community Contest", where: "Баннер promo_user / contest над чатом", trigger: "Запуск конкурса для комьюнити креаторов", sees: "«AI Short Film Contest — главный приз 10 000 QCC. Сделайте видео в Sonic!»", cta: "https://quadcode.ai/contest", impact: "Вовлечение авторов и создание UGC-контента", reqs: "Контент и условия конкурса", priority: 8 },
    { id: "B12", name: "Баннер перехода с Free после 5+ генераций", where: "Баннер new_user (вариант активного Free)", trigger: "Free-юзер 3+ дня, сделал 5+ генераций, покупок нет", sees: "«Вы уже создали 12 работ на Free! Переходите на Monthly $20: 1 000 QCC/мес и приоритет»", cta: "/profile/plans", impact: "Конверсия активных пользователей в платящих (+30%)", reqs: "Сервер: счетчик user_generations_count >= 5", priority: 7 }
  ],

  dependencyMatrix: [
    { item: "A1 Публичный /pricing", siteFE: true, lkFE: false, backend: true, ideClient: false, crm: false, metric: "Visitor → Sign Up (+35%)" },
    { item: "A2 Sign Up со стимулом +200 QCC", siteFE: true, lkFE: false, backend: true, ideClient: false, crm: true, metric: "Sign Up Completion (+40%)" },
    { item: "A4 / B1 Starter Kit (+25% QCC)", siteFE: false, lkFE: true, backend: true, ideClient: true, crm: true, metric: "1st Purchase Conversion (+30%)" },
    { item: "A5 Промо-полоса на главной", siteFE: true, lkFE: false, backend: true, ideClient: false, crm: false, metric: "Pricing CTR (+20%)" },
    { item: "A8 Персональный таймер 5 мин", siteFE: false, lkFE: true, backend: true, ideClient: true, crm: false, metric: "Session Urgency (+25%)" },
    { item: "A9 Exit-Intent оверлей", siteFE: false, lkFE: true, backend: true, ideClient: false, crm: false, metric: "Session Bounce Rescue (+12%)" },
    { item: "A10 Паки докупки + авто-рефилл", siteFE: false, lkFE: true, backend: true, ideClient: false, crm: true, metric: "Top-Up Volume & LTV (+35%)" },
    { item: "A11 Смена плана со справедливым зачетом", siteFE: false, lkFE: true, backend: true, ideClient: false, crm: false, metric: "Yearly Upgrade Mix (+40%)" },
    { item: "A14 Честный 1-экранный Save-flow", siteFE: false, lkFE: true, backend: true, ideClient: false, crm: true, metric: "Churn Reduction (−25%)" },
    { item: "B2 Предупреждение о дорогой модели", siteFE: false, lkFE: false, backend: false, ideClient: true, crm: false, metric: "Credit Depletion Rescue" },
    { item: "B3 Карточка 402 в чате IDE", siteFE: false, lkFE: false, backend: true, ideClient: true, crm: false, metric: "402 Error Recovery (+45%)" },
    { item: "B5 Кросс-селл под генерацией", siteFE: false, lkFE: false, backend: false, ideClient: true, crm: false, metric: "Model Cross-usage & ARPU" },
    { item: "B7 Пилюля таймера в статус-баре", siteFE: false, lkFE: false, backend: true, ideClient: true, crm: false, metric: "Desktop In-App Purchase" },
    { item: "B10 Магазин в профиле IDE", siteFE: false, lkFE: false, backend: false, ideClient: true, crm: false, metric: "Everyday Top-Up Accessibility" }
  ],

  waves: [
    {
      number: 1,
      title: "Быстрый старт: Фронтенд и Конфиги (Без правок биллинга)",
      desc: "Устраняем критический разрыв в видимости цен и форме регистрации. Включаем баннеры в IDE.",
      items: ["A1 (Публичный /pricing)", "A2 (Sign Up 200 QCC)", "A3 (Sign In мостик)", "A5 (Промо-полоса)", "A6 (Upgrade пилюля)", "A7 (Редизайн карточек)", "A10 (Паки без авто-рефилла)", "A13 (Модалка нехватки)", "B1 (Starter Kit баннер)", "B2 (Тост модели)", "B6 (Yearly баннер)", "B10 (Магазин в профиле)", "B12 (Баннер активного Free)"]
    },
    {
      number: 2,
      title: "Промокоды с серверным TTL (Urgency)",
      desc: "Внедряем честные временные офферы с серверным таймером согласно правилам temporary-offers.md.",
      items: ["A4 (Welcome Starter Kit 72 ч)", "A8 (Персональный таймер 5 мин)", "A9 (Exit-intent бонус)", "B3 (Карточка 402 в чате)", "B7 (Пилюля в статус-баре)", "B9 (Win-back баннер)"]
    },
    {
      number: 3,
      title: "Продвинутый биллинг (Stripe Prorations & Рефилл)",
      desc: "Авто-пополнение кредитов, пауза подписки, зачет неиспользованных средств и экспресс-оплата.",
      items: ["A10 (Авто-пополнение Stripe)", "A11 (Prorations при смене плана)", "A14 (Пауза подписки)", "A15 (Реферальная программа)", "A17 (CRM брошенной корзины)", "A18 (Apple Pay & Google Pay)"]
    },
    {
      number: 4,
      title: "Контент, Сообщество и Ценность",
      desc: "Долгосрочное вовлечение авторов, челленджи сообщества и дашборд сэкономленных средств.",
      items: ["A12 (Value-Realization дашборд)", "A16 / B11 (Community AI Challenge)", "B5 / B8 (Кросс-селл и Модель недели)"]
    }
  ],

  wave1Tickets: [
    {
      id: "A1",
      area: "web",
      name: "Публичный роут /pricing и кнопка Pricing в навигации",
      owner: "Web Frontend Lead",
      estimate: "2 дня",
      priority: "P0 (Блокер)",
      surface: "Шапка сайта, футер, роут /pricing (SSR)",
      goal: "Открыть доступ к ценам для гостей без логина, устранить ошибку 404 и редирект.",
      acceptance: "Гость кликает Pricing в шапке → открывается /pricing с тарифами $20/мес и $180/год (−25%). Клик Start Free открывает Sign Up с предвыбранным планом."
    },
    {
      id: "A2",
      area: "web",
      name: "Упрощение формы Sign Up со стимулом +200 QCC Free",
      owner: "Web Frontend / Backend",
      estimate: "3 дня",
      priority: "P0 (Блокер)",
      surface: "Модалка Sign Up на сайте и в ЛК",
      goal: "Снизить барьер регистрации: с 5 полей до 2 + быстрый вход через Google/GitHub + авто-начисление 200 QCC.",
      acceptance: "Регистрация за 1 клик через соцсети или 2 поля email+пароль. В профиль сразу начисляется 200 QCC (TTL 14 дней). Чек-лист: без привязки карты."
    },
    {
      id: "A3",
      area: "web",
      name: "Мостик к регистрации в форме Sign In",
      owner: "Web Frontend",
      estimate: "0.5 дня",
      priority: "P2",
      surface: "Модалка Sign In",
      goal: "Перехватывать случайных гостей, нажавших Sign In вместо Sign Up.",
      acceptance: "Под формой входа виден акцентный блок 'New to Quadcode? Create account & get 200 QCC free'. Клик переключает на форму регистрации."
    },
    {
      id: "A5",
      area: "web",
      name: "Сквозная промо-полоса сайта (Site-wide Banner Strip)",
      owner: "Web Frontend",
      estimate: "1 день",
      priority: "P1",
      surface: "Фиксированная полоса над навигацией на всех страницах",
      goal: "Информировать о ключевой акции (Yearly −25%: $180/год вместо $240).",
      acceptance: "Полоса видна на всех страницах. Кнопка × закрывает на 7 дней в localStorage. Клик ведет на /pricing."
    },
    {
      id: "A6",
      area: "web",
      name: "Оранжевая пилюля Upgrade · −25% в шапке ЛК",
      owner: "Web Frontend",
      estimate: "0.5 дня",
      priority: "P1",
      surface: "Шапка личного кабинета рядом с балансом QCC",
      goal: "Постоянное напоминание о выгоде годового плана для пользователей Free и Monthly.",
      acceptance: "Видна только пользователям без активного Yearly. Клик скроллит к карточке годового плана."
    },
    {
      id: "A7",
      area: "web",
      name: "Редизайн карточек тарифов на /profile/plans",
      owner: "Web Frontend",
      estimate: "2 дня",
      priority: "P0 (Блокер)",
      surface: "Страница /profile/plans в ЛК и /pricing",
      goal: "Фокус на годовом тарифе (Save $60), бейджи Best Value и показ осязаемых исходов генераций.",
      acceptance: "Переключатель по умолчанию на Yearly. Под тарифом: '≈ 500 картинок Nano Banana Pro или 40 видеоклипов Veo 3'. Блок FAQ и Stripe Verified."
    },
    {
      id: "A10",
      area: "web",
      name: "Лестница кредит-паков с ценовыми якорями (без авто-рефилла)",
      owner: "Web Frontend / Billing",
      estimate: "1.5 дня",
      priority: "P1",
      surface: "Модалка Top Up Balance в ЛК",
      goal: "Сдвиг среднего чека докупок кредитов с 500 на 1 000 QCC с помощью бейджей MOST POPULAR и BEST VALUE.",
      acceptance: "4 пака (100, 500, 1000, 4000 QCC). Под каждым курс $1 = 50 QCC. Клик передает ID пака в Stripe Checkout."
    },
    {
      id: "A13",
      area: "web",
      name: "Модалка нехватки кредитов в вебе с предвыбором пака",
      owner: "Web Frontend",
      estimate: "1 день",
      priority: "P1",
      surface: "ЛК / веб-редактор при попытке генерации без баланса",
      goal: "Предотвратить уход пользователя при нулевом балансе, предложив точный пак для продолжения.",
      acceptance: "Модалка рассчитывает точный дефицит (например, 'Не хватает 120 QCC') и подсвечивает пак 500 QCC ($10)."
    },
    {
      id: "B1",
      area: "ide",
      name: "Баннер Starter Kit для новых авторов в IDE",
      owner: "Desktop Lead",
      estimate: "1.5 дня",
      priority: "P0 (Блокер)",
      surface: "SubscriptionBannerWidget над чатом IDE",
      goal: "Конвертировать новичка в первую покупку в первые 72 часа жизни аккаунта.",
      acceptance: "Показывается пользователям со сроком регистрации < 72 ч. Текст: 'Starter Kit: первая покупка +25% QCC (1 000 → 1 250)'. Кнопка открывает ЛК с промокодом."
    },
    {
      id: "B2",
      area: "ide",
      name: "Тост-предупреждение при выборе тяжелой модели",
      owner: "Desktop Lead",
      estimate: "1 день",
      priority: "P1",
      surface: "Контекстный тост над селектором моделей внизу чата IDE",
      goal: "Предупредить быстрый слив 200 стартовых кредитов на Opus/Veo 3 и предложить пополнение с бонусом.",
      acceptance: "Срабатывает 1 раз при первом выборе модели с расходом > 30 QCC. Текст: 'Эта модель ≈ 40 QCC/запрос. У вас 200. Пополните с бонусом Starter Kit!'."
    },
    {
      id: "B6",
      area: "ide",
      name: "Баннер перехода на Yearly для Monthly-подписчиков в IDE",
      owner: "Desktop Lead",
      estimate: "1 день",
      priority: "P1",
      surface: "Баннер has_subscription над чатом IDE",
      goal: "Стимулировать переход активных подписчиков на годовой контракт.",
      acceptance: "Срабатывает со 2-го месяца подписки. Текст: 'Годовой тариф Creator Plus: 3 месяца в подарок · $180 вместо $240'. Клик открывает /profile/plans#yearly."
    },
    {
      id: "B10",
      area: "ide",
      name: "Мини-магазин в меню профиля статус-бара",
      owner: "Desktop Lead",
      estimate: "1.5 дня",
      priority: "P1",
      surface: "Выпадающее меню профиля в правом нижнем углу IDE",
      goal: "Сделать баланс и пополнение доступными в 1 клик из любого экрана IDE.",
      acceptance: "В меню профиля видны: баланс QCC, кнопка 'Top Up Balance', кнопка 'Upgrade to Yearly (−25%)' и реферальная ссылка."
    },
    {
      id: "B12",
      area: "ide",
      name: "Баннер перехода с Free после 10+ успешных генераций",
      owner: "Desktop Lead",
      estimate: "1 день",
      priority: "P1",
      surface: "Баннер над чатом IDE для Free-пользователей",
      goal: "Конвертировать авторов, убедившихся в ценности продукта, в платящих подписчиков.",
      acceptance: "Срабатывает при >= 10 генерациях на Free. Текст: 'Вы уже создали 12 проектов на Free! Переходите на Monthly за $20: 1 000 QCC и генерации без очередей'."
    }
  ],

  wave2Tickets: [
    {
      id: "A4",
      area: "web",
      name: "Welcome Starter Kit (+25% QCC на 72ч)",
      owner: "Web Frontend / Backend",
      estimate: "2 дня",
      priority: "P0 (Блокер)",
      surface: "Модалка при первом входе в ЛК + баннер B1 в IDE",
      goal: "Стимулировать первую оплату в первые 72 часа жизни аккаунта через честный серверный промокод.",
      acceptance: "Показывается новым авторам (< 72ч). Предлагает +25% QCC (1 250 вместо 1 000 за $20). Таймер тикает до expires_at. Клик переходит в Stripe Checkout с промокодом STARTER25."
    },
    {
      id: "A8",
      area: "web",
      name: "Персональный таймер-оффер на 5 минут (−20% на 1-й месяц)",
      owner: "Web Frontend / Backend",
      estimate: "2.5 дня",
      priority: "P0 (Блокер)",
      surface: "Карточка в правом нижнем углу /profile/plans + липкая полоса",
      goal: "Дожать сомневающихся пользователей, проводящих на странице тарифов более 45 секунд.",
      acceptance: "Таймер 05:00 с сервера. Все цены на странице пересчитываются со скидкой 20% ($16 вместо $20). Липкая полоса сохраняет таймер при скролле. По истечении 5 мин цены возвращаются."
    },
    {
      id: "A9",
      area: "web",
      name: "Exit-Intent оверлей спасения сессии (+300 бонусных QCC)",
      owner: "Web Frontend",
      estimate: "1 день",
      priority: "P1",
      surface: "Оверлей при попытке закрыть страницу тарифов",
      goal: "Перехватить уходящих пользователей бонусом кредитов, не ломая базовый ценовой якорь $20.",
      acceptance: "Срабатывает при mouseleave по верхней границе окна. Оффер: +300 QCC бонус к любому плану. Клик применяет промокод BONUS300. Не показывается чаще 1 раза в 30 дней."
    },
    {
      id: "B3",
      area: "ide",
      name: "Интерактивная карточка ошибки 402 в чате IDE",
      owner: "Desktop Lead",
      estimate: "2 дня",
      priority: "P0 (Блокер)",
      surface: "Лента чата десктопного IDE вместо серой строки ошибки",
      goal: "Превратить тупиковую ошибку 402 в быструю докупку с сохранением контекста задачи.",
      acceptance: "При нехватке кредитов в чат выводится карточка с точной дельтой (например, 'Не хватает 120 QCC'). Кнопка 'Купить 500 QCC ($10)' сразу ведёт к чекауту. Задача ставится на умную паузу и стартует сразу после оплаты."
    },
    {
      id: "B7",
      area: "ide",
      name: "Пилюля активного промокода с живым таймером в статус-баре",
      owner: "Desktop Lead",
      estimate: "1 день",
      priority: "P1",
      surface: "Статус-бар IDE рядом с аватаром профиля",
      goal: "Обеспечить постоянное ненавязчивое напоминание об активном предложении в рабочей среде.",
      acceptance: "Показывает тикающий таймер '⚡ −20% скидка · 04:52'. При клике бесшовно открывает страницу тарифов в браузере с применённым промокодом. Скрывается автоматически по истечении TTL."
    },
    {
      id: "B9",
      area: "ide",
      name: "Win-Back баннер возврата после 14+ дней неактивности",
      owner: "Desktop Lead / Backend",
      estimate: "1.5 дня",
      priority: "P2",
      surface: "Баннер promo_user над чатом IDE",
      goal: "Реактивировать заснувших пользователей предложением бонуса к ближайшему пополнению.",
      acceptance: "Срабатывает при первом входе после 14+ дней перерыва. Текст: 'С возвращением! +200 бонусных QCC к любому пополнению на этой неделе'. Кнопка активирует промокод BACK200."
    }
  ],

  wave3Tickets: [
    {
      id: "A10",
      area: "web",
      name: "Авто-пополнение баланса (Stripe Auto-Refill)",
      owner: "Billing Lead / Backend",
      estimate: "3 дня",
      priority: "P0 (Блокер)",
      surface: "Модалка Top Up Balance + карточка баланса в ЛК",
      goal: "Предотвратить внезапную остановку задач при исчерпании кредитов через автоматическую докупку пака 500 QCC ($10).",
      acceptance: "Opt-in тумблер (по умолчанию выкл). Срабатывает при балансе < 100 QCC. Списывает $10 через Stripe off-session, начисляет 500 QCC. Лимит: не более 2 раз в календарный месяц."
    },
    {
      id: "A11",
      area: "web",
      name: "Смена плана со справедливым перерасчётом (Stripe Prorations)",
      owner: "Billing Lead / Web FE",
      estimate: "2.5 дня",
      priority: "P0 (Блокер)",
      surface: "Модалка Change Plan на /profile/plans",
      goal: "Устранить барьер перехода с Monthly на Yearly план за счёт справедливого зачёта неизрасходованных QCC.",
      acceptance: "Интерактивный калькулятор вычитает остаток QCC по курсу $0.02 ($180 − 766 QCC * $0.02 = $164.68 к доплате). Апгрейд вступает в силу сразу; даунгрейд — с даты продления ($0 сегодня)."
    },
    {
      id: "A14",
      area: "web",
      name: "Честный 1-экранный Save-flow с паузой на 1 месяц",
      owner: "Web Frontend / Billing",
      estimate: "2 дня",
      priority: "P1",
      surface: "Модалка отмены подписки в ЛК",
      goal: "Предотвратить 20-25% оттока подписчиков, предложив заморозку подписки вместо полной отмены.",
      acceptance: "При попытке отмены предлагается: 1) Пауза на 1 месяц (pause_collection в Stripe, кредиты сохраняются); 2) Напоминание за 3 дня до списания. Кнопка полной отмены доступна без удержания."
    },
    {
      id: "A15",
      area: "web",
      name: "Двусторонняя реферальная программа (+300/+300 QCC)",
      owner: "Web FE / Backend",
      estimate: "3 дня",
      priority: "P1",
      surface: "Раздел 'Рефералы & Подарки' в ЛК + виджет в шапке",
      goal: "Обеспечить виральный приток авторов за счёт персональных ссылок и взаимного вознаграждения.",
      acceptance: "Друг получает +300 QCC сразу при регистрации. Пригласивший получает +300 QCC после первой успешной оплаты друга. Защита: не более 10 рефералов/мес. Подарочные карты на $20, $50, $100."
    },
    {
      id: "A17",
      area: "web",
      name: "Восстановление брошенной корзины через CRM/Email",
      owner: "Backend / CRM",
      estimate: "1.5 дня",
      priority: "P2",
      surface: "Транзакционный Email / Stripe Webhook checkout.session.expired",
      goal: "Вернуть 12-14% пользователей, покинувших Stripe Checkout на шаге ввода карты.",
      acceptance: "Через 2 часа после незавершённого чекаута отправляется письмо с бонусом +150 QCC и персональной ссылкой на завершение заказа. Срок действия промокода RECOVER150 — 24 часа."
    },
    {
      id: "A18",
      area: "web",
      name: "Экспресс-оплата Apple Pay & Google Pay в 1 касание",
      owner: "Web Frontend",
      estimate: "1 день",
      priority: "P1",
      surface: "Страница /pricing, модалка Top Up и окно оплаты Stripe",
      goal: "Ускорить чекаут и поднять мобильную конверсию за счёт нативной биометрической оплаты.",
      acceptance: "Stripe Payment Request Button отображает Apple Pay на Safari/iOS/macOS и Google Pay на Chrome/Android. Оплата списывается в 1 касание без ручного ввода реквизитов карты."
    },
    {
      id: "B4",
      area: "ide",
      name: "Предупреждение о низком остатке (< 15%) в IDE",
      owner: "Desktop Lead",
      estimate: "1.5 дня",
      priority: "P1",
      surface: "SubscriptionBannerWidget над чатом IDE",
      goal: "Предотвратить внезапный обрыв генераций агентов у активных подписчиков.",
      acceptance: "Показывается подписчикам при остатке < 15% месячного лимита (< 150 QCC). Текст: 'Осталось 140 QCC — включите авто-пополнение, чтобы не прерывать генерации агентов'. Кнопка ведёт в ЛК."
    }
  ],

  wave4Tickets: [
    {
      id: "A12",
      area: "web",
      name: "Value-Realization Dashboard & Yearly Rewind в ЛК",
      owner: "Web Frontend / Backend",
      estimate: "2.5 дня",
      priority: "P1",
      surface: "Раздел Overview на странице /profile/plans в ЛК",
      goal: "Показать осязаемую ценность подписки через объём созданного контента и расчёт сэкономленных средств по сравнению с API.",
      acceptance: "Дашборд отображает метрики: '142 картинки Lumi, 18 видео Sonic, 4.5ч Cody'. Расчёт экономии: '$64.80 сэкономлено по сравнению с прямыми API'. Чеклист неиспользованных фич с кнопкой быстрого запуска сценария."
    },
    {
      id: "A16",
      area: "web",
      name: "Community AI Challenge & Creators Showcase на сайте",
      owner: "Web Frontend / Content Lead",
      estimate: "2 дня",
      priority: "P1",
      surface: "Главная страница quadcode.ai, шапка ЛК, промо-раздел Explore",
      goal: "Вовлечь авторов в создание UGC-контента и виральный шеринг работ в соцсетях через регулярные тематические контесты.",
      acceptance: "Витрина активного конкурса с честным счётчиком работ (348 авторов) и призовым фондом (50 000 QCC). Галерея работ победителей с кнопкой 'Скопировать промпт' и запуском в Quadcode IDE."
    },
    {
      id: "B11",
      area: "ide",
      name: "Баннер Community Challenge над чатом IDE",
      owner: "Desktop Lead / Content Lead",
      estimate: "1 день",
      priority: "P2",
      surface: "SubscriptionBannerWidget над чатом десктопного IDE",
      goal: "Привлечь пользователей десктопного приложения к участию в творческом челлендже сообщества.",
      acceptance: "Показывается в период активного контеста. Текст: 'AI Short Film Contest — главный приз 10 000 QCC. Сделайте видео в Sonic до воскресенья!'. Кнопка 'Участвовать' предзаполняет стартовый промпт для Sonic."
    },
    {
      id: "B5",
      area: "ide",
      name: "Контекстный кросс-селл следующих шагов в чате IDE",
      owner: "Desktop Lead",
      estimate: "2 дня",
      priority: "P1",
      surface: "Инлайн-панель сразу под сгенерированным медиафайлом в чате",
      goal: "Стимулировать мультимодальное творчество и рост расхода кредитов за счёт бесшовного перехода от картинки к видео.",
      acceptance: "Под готовой картинкой Lumi появляются кнопки: '🎬 Оживить в видео (Veo 3 · ~60 QCC)' и '🔍 4K Вариации'. Клик переключает активного агента на Sonic и передает путь к картинке и промпт без ручного ввода."
    },
    {
      id: "B8",
      area: "ide",
      name: "Бейдж «Модель недели» в списке моделей IDE",
      owner: "Desktop Lead / Backend",
      estimate: "1 день",
      priority: "P2",
      surface: "Выпадающее меню переключения моделей в нижнем тулбаре чата IDE",
      goal: "Стимулировать пробы новых генеративных моделей и балансировать нагрузку между вычислительными кластерами.",
      acceptance: "Акционная модель недели помечается ярким бейджем '−30% ЭТА НЕДЕЛЯ'. В тултипе отображается акционный расход кредитов (например, Stable Audio 3.5 QCC вместо 5.0 QCC)."
    }
  ]
};

// Backwards compatibility alias
window.LAB = {
  compare: window.CL_DATA.comparison.map(c => [c.name, c.hf, c.qc, c.gap]),
  evidence: {
    qc: [
      ["qc/home.png", "Главная quadcode.ai — гость: нет ссылки Pricing"],
      ["qc/signup.png", "Sign Up: 5 полей, подтверждение пароля, Turnstile"],
      ["qc/signin.png", "Sign In: гость не видит офферов"],
      ["qc/plans-po.png", "ЛК /profile/plans: сухие карточки без выгод"],
      ["qc/po-3.png", "IDE: меню моделей без акционных бейджей"],
      ["qc/ide-po.png", "IDE: стандартный баннер без оффера"]
    ],
    hf: [
      ["hf/home-guest.png", "Higgsfield главная: промо-полоса с таймером"],
      ["hf/pricing-guest.png", "Higgsfield Pricing: годовой план, бейджи, сравнение"],
      ["hf/78-change-commitment-modal.png", "HF: окно подтверждения тарифа со скидкой"],
      ["hf/89-exit-intent-62pct.png", "HF: персональный таймер 07:58 на скидку 62%"],
      ["hf/06-topup.png", "HF: 7 паков докупки с авто-рефиллом"],
      ["hf/74-cancel-flow-screen5.png", "HF: 1-экранный Save-flow отмены подписки"]
    ]
  }
};

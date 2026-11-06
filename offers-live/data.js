/* Quadcode offers without product changes. All copy in quotes = real product text. */
window.QC = {
  /* Real plan rows from quadcode.ai/profile/plans (25.09). "offer" = what we set up in admin. */
  monthly: { now: [[1000, 20], [5000, 100], [10000, 200], [15000, 300]], offer: [[1000, 20], [6000, 100], [12000, 200], [18000, 300]] },
  yearly: { now: [[1000, 180]], offer: [[1000, 180], [5000, 900], [10000, 1800], [15000, 2700]] },
  /* Real top-up grid was not visible: example at $0.02 per credit. */
  packs: { now: [[500, 10], [1000, 20], [2500, 50], [5000, 100]], offer: [[575, 10], [1150, 20], [2875, 50], [5750, 100]] },

  offers: [
    { n: 1, name: 'Годовой на всех ступенях, −25%', st: 'new', where: 'Сайт → Plans & Credits → карточка Yearly, список ступеней', when: 'Всегда. Сюда ведёт каждая кнопка Subscribe и Upgrade из баннера в приложении', look: 'В списке годового строки 5,000 · $900, 10,000 · $1,800, 15,000 · $2,700. Зачёркнутая цена и «Save 25%» считаются сами', set: 'Три годовых тарифа в админке. Цена ровно 75% от 12 месяцев', kpi: 'Доля годовых в покупках, выручка на покупателя', chk: 'Сколько ступеней у годового сейчас. Если уже есть — нужен только анонс', sc: 's1' },
    { n: 2, name: 'Неделя апгрейда: +20% кредитов', st: 'new', where: 'Сайт → карточка Monthly, список ступеней', when: '7 дней раз в месяц. Анонс в Discord и письмом. Главный вход — Upgrade в баннере у подписчика без кредитов', look: 'Строки 6,000 · $100, 12,000 · $200, 18,000 · $300 вместо 5,000 / 10,000 / 15,000. Остальная карточка та же', set: 'Временные тарифы с той же ценой, включить на 7 дней, потом вернуть старые', kpi: 'Доля ступеней 5,000+, средний чек', chk: 'Прячет ли сайт выключенные тарифы. Бонус остаётся у купивших каждый месяц — решить, ок ли. Смена ступени без двойного списания', sc: 's4' },
    { n: 3, name: 'Бонус выходных на пополнение +15%', st: 'new', where: 'Окно Top Up Balance на сайте. Туда ведут Top up balance в меню сайта и Deposit в приложении', when: 'С пятницы по воскресенье', look: 'Пакеты дают больше кредитов за те же деньги: 1,150 credits · $20 USD', set: 'В пятницу поменять кредиты в пакетах, в понедельник вернуть', kpi: 'Число и сумма пополнений', chk: 'Реальную сетку пакетов (у меня её нет, цифры для примера). Открывается ли окно без подписки', sc: 's5' },
    { n: 4, name: 'Коды креаторов на 1,000 кредитов', st: 'live', where: 'Приложение: баннер «Have a promo code?» → Enter code. Сайт: Apply promo code', when: 'Человек посмотрел видео креатора, поставил приложение и вводит код', look: '«Success! 1,000 credits added to your balance.»', set: 'Свой код на каждого креатора с лимитом активаций (как QCWELCOME0906)', kpi: 'Активации по каждому коду и первая покупка за 14 дней', chk: 'Один код на аккаунт. Код вводят руками, есть проверка Cloudflare', sc: 's2' },
    { n: 5, name: 'Discord: 100 кредитов', st: 'live', where: 'Попап на сайте «Discord perk»', when: 'Визит на сайт', look: '«Free 100 credits for Discord members!» [Claim now] [Not now]', set: 'Уже работает. В Discord добавить закреп с годовым и офферами недели', kpi: 'Вход в Discord → активация → покупка', chk: 'На каких страницах и как часто выскакивает попап', sc: 's8' },
    { n: 6, name: 'Код из эфира на 48 часов', st: 'new', where: 'Enter code в приложении, Apply promo code на сайте', when: 'Во время стрима или вебинара', look: '«Success! 300 credits added to your balance.»', set: 'Код на 300 кредитов, срок 48 часов, лимит 500 активаций', kpi: 'Активации за 48 часов, покупки за 7 дней', chk: 'Умеют ли коды срок действия и лимит', sc: 's2' },
    { n: 7, name: 'Модель недели −30%', st: 'new', where: 'Приложение: меню моделей в чате', when: 'Любой открывает меню моделей. Анонс в Discord и письмом', look: 'У модели просто ниже цена: ~210 qcc/1m вместо ~300. Без плашек и зачёркиваний', set: 'Снизить цену модели на сервере на 7 дней', kpi: 'Расход кредитов на модель, пополнения за неделю', chk: 'Цена в меню приходит с сервера, списание равно показанной цене, откат по расписанию', sc: 's6' },
    { n: 8, name: 'Письмо «Задача ждёт»', st: 'new', where: 'Почта', when: 'Через час после баннера «You\'re out of credits», если не купил', look: 'Код на 100 кредитов, чтобы закончить задачу, и ссылка на годовой', set: 'Цепочка в рассылке по событию нехватки кредитов', kpi: 'Покупки за 24 часа после письма', chk: 'Доходит ли событие из приложения до рассылки', sc: 's3' },
    { n: 9, name: 'Возврат после отмены', st: 'new', where: 'Почта и реклама в Meta', when: 'Через 3 дня после отмены подписки', look: 'Персональный код на 500 кредитов на 7 дней и ссылка на годовой', set: 'Аудитория в Meta из события отмены, письмо в рассылке', kpi: 'Возвраты за 30 дней', chk: 'Коды персональные, только отменившим. Саму отмену не трогаем', sc: 's7' },
    { n: 10, name: 'Челлендж Film Week в Discord', st: 'new', where: 'Discord', when: 'Раз в месяц на 7 дней', look: 'Тема недели, призы — коды на кредиты', set: 'Анонс, правила, коды победителям', kpi: 'Участники, генерации и пополнения за неделю', chk: 'Бюджет призов в кредитах', sc: 's8' },
    { n: 11, name: 'Одна подписка на всю команду', st: 'live', where: 'Сайт: у тарифов уже написано «shared across unlimited users»', when: 'Письма и реклама на рабочие почты', look: 'Один счёт, общие кредиты на всю команду', set: 'Только текст в каналах', kpi: 'Покупки ступеней 5,000+', chk: 'Как сейчас работает доступ команды к одному балансу', sc: 's4' }
  ],

  /* w: app | site | mail | discord. v: view. mk: marks {r:[x,y,w,h]} or {q:selector}, n = offer number, p = marker side. tg: now/offer toggle. */
  scenarios: [
    { id: 's1', name: 'Новичок с бесплатными кредитами', who: 'Баланс больше 0, подписки нет', steps: [
      { w: 'app', t: 'Баннер в приложении', v: { bn: 's4' }, mk: [{ r: [105, 538, 160, 44], n: 1, p: 'b' }],
        when: 'Подписки нет, кредиты ещё есть (за установку или по коду). Баннер стоит над чатом, закрывается крестиком или Skip', see: '«Enjoying your free credits?» · «Subscribe now to keep creating without limits in Quadcode» · «-25% discount, limited time offer» · [Subscribe] [Skip]', of: [1], set: 'В приложении ничего. Subscribe открывает тарифы на сайте', chk: 'Как часто баннер возвращается после Skip' },
      { w: 'site', t: 'Тарифы: годовой', v: { u: 'free', bal: '412.40', yr: 1 }, tg: 1, mk: [{ q: '#yr-list', n: 1, p: 'r' }],
        when: 'Сразу после Subscribe из баннера', see: 'У годового открыт список: 1,000 / 5,000 / 10,000 / 15,000 кредитов в месяц. Цена за год и «Save 25%» пересчитываются сами', of: [1], set: 'Три годовых тарифа в админке', chk: 'Есть ли у годового ступени сейчас' },
      { w: 'site', t: 'Окно оплаты', v: { u: 'free', bal: '412.40', m: 'sub', amt: 900 }, mk: [{ q: '.s-pay', n: 1, p: 'r' }],
        when: 'Выбрал 5,000 в годовом и нажал Upgrade', see: '«Subscribe» · Amount $900 USD · карта · [Pay $900] · «Secured by Stripe»', of: [1], set: 'Ничего', chk: 'Годовой списывается один раз за год вперёд' }
    ] },
    { id: 's2', name: 'Кредитов нет: вводит код', who: 'Баланс 0, подписки нет', steps: [
      { w: 'app', t: 'Баннер в приложении', v: { bn: 's1' }, mk: [{ r: [277, 538, 160, 44], n: 4, p: 'b' }, { r: [105, 538, 160, 44], n: 1, p: 'b' }],
        when: 'Баланс 0, подписки нет. Например, кредиты за установку кончились', see: '«Have a promo code?» · «Subscribe or enter it to get credits and start creating for free» · [Subscribe] [Enter code] [Skip]', of: [4, 6, 1], set: 'Коды на кредиты в админке', chk: 'Открывает ли Enter code сразу окно кода или просто тарифы' },
      { w: 'site', t: 'Ввод кода на сайте', v: { u: 'free', bal: '0.00', m: 'promo', code: 'MAYA1000' }, mk: [{ q: '.s-apply', n: 4, p: 'r' }],
        when: 'Открылся сайт. Кнопка Apply promo code в меню слева', see: '«Enter your promo code below to receive credits instantly.» · проверка Cloudflare · [Cancel] [Apply Code]', of: [4, 6], set: 'Код креатора MAYA1000 на 1,000 кредитов (пример)', chk: 'Лимит активаций на код' },
      { w: 'site', t: 'Кредиты начислены', v: { u: 'free', bal: '1000.00', m: 'promo', code: 'MAYA1000', ok: 1000 }, mk: [{ q: '.s-ok', n: 4, p: 'r' }, { q: '#s-bal', p: 'r' }],
        when: 'Код принят', see: '«Success! 1,000 credits added to your balance.» Баланс в меню обновился. Дальше человек попадает в сценарий 1', of: [4], set: 'Ничего', chk: 'Покупка за 14 дней по этому коду' }
    ] },
    { id: 's3', name: 'Кредиты кончились посреди задачи', who: 'Запрос не прошёл: не хватило кредитов, подписки нет', steps: [
      { w: 'app', t: 'Ошибка и баннер', v: { bn: 's2', err: 1 }, mk: [{ r: [105, 538, 160, 44], n: 1, p: 'b' }, { r: [37, 660, 680, 52], p: 'r' }],
        when: 'Модель вернула «не хватает кредитов». Баннер открывается сам', see: 'В чате: «Your account balance is too low. Please add at least 1 QCC to continue.» Над чатом: «You\'re out of credits» · «Choose your subscription to keep creating in Quadcode» · [Subscribe]', of: [1, 2, 8], set: 'В приложении ничего', chk: 'Событие нехватки кредитов уходит в аналитику' },
      { w: 'site', t: 'Тарифы: ступени', v: { u: 'free', bal: '0.00', mo: 1 }, tg: 1, mk: [{ q: '#mo-list', n: 2, p: 'r' }],
        when: 'Нажал Subscribe. Идёт неделя апгрейда', see: 'В Monthly: 6,000 · $100, 12,000 · $200, 18,000 · $300. Цена за кредит ниже, чем на 1,000', of: [2], set: 'Временные тарифы на 7 дней', chk: 'Выключенные тарифы не видны' },
      { w: 'mail', t: 'Письмо через час', v: { from: 'Quadcode AI', subj: 'Your task is waiting in Quadcode', h: 'You ran out of credits mid-task', p: 'Here are 100 credits to finish it. Enter the code in Quadcode or on your plans page.', code: 'FINISH100', p2: 'Creating every week? Yearly is 25% cheaper on every tier.', cta: 'Open Quadcode' }, mk: [{ q: '.c-code', n: 8, p: 'r' }],
        when: 'Через час после баннера, если покупки не было', see: 'Письмо с кодом на 100 кредитов и ссылкой на годовой', of: [8, 1], set: 'Цепочка в рассылке', chk: 'Код одноразовый, на аккаунт' }
    ] },
    { id: 's4', name: 'Подписчик: кредиты кончились', who: 'Баланс 0, подписка есть', steps: [
      { w: 'app', t: 'Баннер в приложении', v: { bn: 's3' }, mk: [{ r: [105, 538, 160, 44], n: 2, p: 'b' }],
        when: 'Подписка есть, баланс ушёл в ноль', see: '«You\'re out of credits» · «Upgrade your plan or top up your balance with more credits» · [Upgrade] [Skip]', of: [2, 3], set: 'В приложении ничего', chk: 'Upgrade ведёт на тарифы' },
      { w: 'site', t: 'Тарифы: апгрейд', v: { u: 'sub', bal: '0.00', mo: 1 }, tg: 1, mk: [{ q: '#mo-list', n: 2, p: 'r' }],
        when: 'Нажал Upgrade. Идёт неделя апгрейда', see: 'Сверху текущий тариф Basic Monthly. В Monthly ступени с бонусом, кнопка Switch Plan', of: [2, 11], set: 'Временные тарифы на 7 дней', chk: 'Смена ступени без двойного списания' },
      { w: 'site', t: 'Или пополнение', v: { u: 'sub', bal: '0.00', m: 'top', pk: 1 }, tg: 1, mk: [{ q: '#pk-grid', n: 3, p: 'r' }],
        when: 'Не хочет менять тариф: Top up balance в меню слева. Выходные', see: '«Top Up Balance» · пакеты с бонусом +15% · [Pay $20] · «Secured by Stripe»', of: [3], set: 'Кредиты в пакетах на выходные', chk: 'Реальная сетка пакетов' }
    ] },
    { id: 's5', name: 'Пополнение из приложения', who: 'Любой, в любой момент', steps: [
      { w: 'app', t: 'Окно профиля', v: { pp: 1 }, mk: [{ r: [1662, 946, 80, 32], n: 3, p: 't' }, { r: [1535, 1006, 130, 24], p: 'l' }],
        when: 'Клик по имени в нижней строке приложения', see: '«Balance: 25.50 QCC» · [Settings] [Deposit]', of: [3], set: 'В приложении ничего', chk: 'Куда ведёт Deposit (ждём окно пополнения на сайте)' },
      { w: 'site', t: 'Окно пополнения', v: { u: 'sub', bal: '25.50', m: 'top', pk: 1 }, tg: 1, mk: [{ q: '#pk-grid', n: 3, p: 'r' }],
        when: 'Открылся сайт, выходные', see: 'Пакеты: 575 · $10, 1,150 · $20, 2,875 · $50, 5,750 · $100', of: [3], set: 'Кредиты в пакетах на выходные', chk: 'Реальная сетка пакетов' }
    ] },
    { id: 's6', name: 'Модель недели', who: 'Любой открывает меню моделей', steps: [
      { w: 'app', t: 'Меню моделей', v: { menu: 1 }, tg: 1, mk: [{ q: '#deal', n: 7, p: 'r' }, { r: [466, 956, 158, 30], p: 'r' }],
        when: 'Клик по модели в поле ввода', see: 'У claude-sonnet-5 цена ~210 qcc/1m вместо ~300. Больше ничего не меняется', of: [7], set: 'Цена модели на сервере на 7 дней', chk: 'Цена приходит с сервера, списание совпадает' },
      { w: 'discord', t: 'Анонс в Discord', v: { ch: 'announcements', text: 'Model of the week: Claude Sonnet 5 is 30% cheaper until Sunday.', emb: 'Claude Sonnet 5 · ~300 → ~210 qcc per 1M tokens', sub: 'Already in your model menu. No code needed.' }, mk: [{ q: '.c-emb', n: 7, p: 'r' }],
        when: 'Понедельник, старт недели', see: 'Пост в #announcements', of: [7], set: 'Пост и письмо', chk: 'Дата отката цены' }
    ] },
    { id: 's7', name: 'Отмена подписки', who: 'Подписчик нажал Cancel', steps: [
      { w: 'site', t: 'Отмена как есть', v: { u: 'sub', bal: '310.00', m: 'cancel' }, mk: [{ q: '.s-cx', p: 'r' }],
        when: 'Кнопка Cancel на странице тарифов', see: '«Are you sure you want to cancel your subscription? You will lose access to your plan\'s benefits at the end of the current billing period.» · [Keep subscription] [Yes, cancel]', of: [9], set: 'Отмену не трогаем. Событие отмены уходит в аудиторию', chk: 'Событие отмены доходит до Meta' },
      { w: 'mail', t: 'Письмо на 3-й день', v: { from: 'Quadcode AI', subj: '500 credits to pick up where you left off', h: 'Your projects are still here', p: 'Come back this week and get 500 credits on us. The code works for 7 days.', code: 'BACK-7K2Q', p2: 'Or switch to Yearly and pay 25% less on every tier.', cta: 'Open Quadcode' }, mk: [{ q: '.c-code', n: 9, p: 'r' }],
        when: 'Через 3 дня после отмены', see: 'Письмо с персональным кодом и ссылкой на годовой. Параллельно реклама в Meta на ту же аудиторию', of: [9, 1], set: 'Письмо в рассылке и аудитория в Meta', chk: 'Код персональный' },
      { w: 'site', t: 'Код применён', v: { u: 'free', bal: '500.00', m: 'promo', code: 'BACK-7K2Q', ok: 500 }, mk: [{ q: '.s-ok', n: 9, p: 'r' }],
        when: 'Вернулся по письму', see: '«Success! 500 credits added to your balance.»', of: [9], set: 'Ничего', chk: 'Возвраты за 30 дней' }
    ] },
    { id: 's8', name: 'Первый визит на сайт', who: 'Новый посетитель quadcode.ai', steps: [
      { w: 'site', t: 'Попап Discord', v: { home: 1, m: 'discord' }, mk: [{ q: '.s-claim', n: 5, p: 'r' }],
        when: 'Визит на сайт (попап уже есть)', see: '«Discord perk» · «Free 100 credits for Discord members!» · [Claim now] [Not now]. Текст с сайта, вид примерный', of: [5], set: 'Ничего', chk: 'На каких страницах и как часто показывается' },
      { w: 'discord', t: 'Челлендж в Discord', v: { ch: 'announcements', text: 'Film Week starts today. Make a 30-second film with any model in Quadcode.', emb: 'Top 10 films get 5,000 credits each', sub: 'New here? Your 100 credits code is in #perks.' }, mk: [{ q: '.c-emb', n: 10, p: 'r' }],
        when: 'Раз в месяц', see: 'Пост с темой недели и призами в кредитах', of: [10, 5], set: 'Анонс, правила, коды победителям', chk: 'Бюджет призов' }
    ] }
  ],

  rules: [
    ['Все модели доступны всем', 'Офферы только про кредиты: больше кредитов за те же деньги, коды, годовой.'],
    ['Тексты в приложении не трогаем', 'Баннер, кнопки, меню и окно профиля остаются как есть.'],
    ['Карточки тарифов не трогаем', 'Названия, подписи, «Best value» и «25% OFF» зашиты в сайт. Меняются только строки тарифов и пакеты.'],
    ['Годовой не дешевле 75%', 'Зачёркнутая цена считается как цена / 0.75. Опустим цену — «Save 25%» соврёт.'],
    ['Сроки и таймеры — только в каналах', 'В продукте нет места под таймер. Срок оффера пишем в письме, Discord и рекламе.'],
    ['Отмену не трогаем', 'Возврат — только письмом и рекламой после отмены.'],
    ['«limited time offer» висит всегда', 'Юридический риск: пометка в баннере постоянная. Решить отдельно, это уже релиз.']
  ]
};

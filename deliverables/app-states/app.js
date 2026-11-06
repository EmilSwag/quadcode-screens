/* =============================================================================
   Quadcode AI — Newcomer Sales States Prototype (0 to Paid)
   Part 1: Steps 1 to 6 (First launch, Composer, Paused Task on 0, Welcome Sheet,
           In-App 2-Click Checkout, Credits Credited & Task Unlocks, Exit-Intent)
   ============================================================================= */

const TIMER_STORAGE_KEY = 'qc_appstates_welcome_expires_at';
const EXIT_TIMER_STORAGE_KEY = 'qc_appstates_exit_expires_at';
const EXIT_SHOWN_SESSION_KEY = 'qc_appstates_exit_shown';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const EIGHT_MINUTES_MS = 8 * 60 * 1000;

const CONFIG = {
  version: 'v0.17441',
  today: 'Oct 7, 2026',
  user: {
    name: 'Emil',
    initialBalance: 0,
    currency: 'cr',
  },
  plans: {
    starter: {
      name: 'Starter',
      baseCredits: 300,
      bonusCredits: 60,
      totalCredits: 360,
      monthlyPrice: 20,
      annualMonthlyPrice: 15,
      features: [
        '360 credits immediately (300 + 60 bonus)',
        'Access to Seedance 2.5 Fast & Nanobanana 2',
        'Standard generation speed',
      ],
    },
    plus: {
      name: 'Plus',
      baseCredits: 1200,
      bonusCredits: 240,
      totalCredits: 1440,
      monthlyPrice: 59,
      annualMonthlyPrice: 47,
      recommended: true,
      features: [
        '1,440 credits immediately (1,200 + 240 bonus)',
        'Full access to Seedance 2.5 & Nanobanana Pro',
        '7 days unlimited on Nanobanana 2',
      ],
    },
    ultra: { name: 'Ultra', baseCredits: 3000, monthlyPrice: 129, annualMonthlyPrice: 99 },
  },
  welcomeOffer: {
    bonusCreditsPct: 20,
    durationDays: 7,
    plans: {
      plus: {
        name: 'Plus Plan',
        baseCredits: 1200,
        bonusCredits: 240,
        totalCredits: 1440,
        monthlyPrice: 59,
        annualMonthlyPrice: 47,
        recommended: true,
        features: [
          '1,440 credits immediately (1,200 + 240 bonus, ~120 video gens)',
          'Full access to Seedance 2.5 & Nanobanana Pro',
          '7 days unlimited on Nanobanana 2',
        ],
      },
      starter: {
        name: 'Starter Plan',
        baseCredits: 300,
        bonusCredits: 60,
        totalCredits: 360,
        monthlyPrice: 20,
        annualMonthlyPrice: 15,
        features: [
          '360 credits immediately (300 + 60 bonus, ~30 video gens)',
          'Access to Seedance 2.5 Fast & Nanobanana 2',
          'Standard generation speed queue',
        ],
      },
    },
    proposal: true,
  },
  exitIntentOffer: {
    discountPct: 62,
    plan: 'plus',
    baseCredits: 1200,
    priceFirstMonth: 22,
    regularMonthlyPrice: 59,
    durationMinutes: 8,
    proposal: true,
  },
  starterPrompts: [
    {
      id: 'video',
      title: 'Cinematic video',
      prompt: 'Neon cyberpunk city in rain, 720p, anamorphic flares, slow cinematic drone drift, 5s',
      modelId: 'sd_fast',
      modelName: 'Seedance 2.5 Fast (720p)',
      agentId: 'sonic',
      agentName: 'Sonic',
      agentRole: 'Motion & Video',
      cost: 12,
      tag: '~12 cr (Seedance 2.5 Fast)',
      buttonLabel: 'Generate · 12 cr',
    },
    {
      id: 'art',
      title: '2K Concept art',
      prompt: 'Sci-fi anime character in dynamic neon lighting, sharp rimlight, 2K render',
      modelId: 'nb_pro',
      modelName: 'Nanobanana Pro (2K)',
      agentId: 'lumi',
      agentName: 'Lumi',
      agentRole: 'Visual Design',
      cost: 2,
      tag: '2 cr (Nanobanana Pro)',
      buttonLabel: 'Send · 2 cr',
    },
    {
      id: 'code',
      title: 'Mini-application',
      prompt: 'Calorie tracker app with Next.js and Tailwind, interactive daily chart',
      modelId: 'cody',
      modelName: 'Cody Agent',
      agentId: 'cody',
      agentName: 'Cody',
      agentRole: 'Code Engineer',
      cost: 1,
      tag: '~1 cr (Cody Agent)',
      buttonLabel: 'Send · 1 cr',
    },
  ],
  models: {
    sd_fast: { id: 'sd_fast', name: 'Seedance 2.5 Fast', cost: 12, vendor: 'bytedance' },
    nb_pro: { id: 'nb_pro', name: 'Nanobanana Pro', cost: 2, vendor: 'gemini' },
    cody: { id: 'cody', name: 'Cody Agent', cost: 1, vendor: 'anthropic' },
    sonnet: { id: 'sonnet', name: 'Sonnet 5', cost: 0, vendor: 'claude' },
  },
  onboardingOptions: [
    {
      id: 'quick_prompts',
      badge: 'Quick Prompts',
      title: 'Quick prompts with exact cost',
      desc: 'Click inserts a starter prompt with chosen model and exact credit estimate.',
      cta: 'Try Quick Prompts',
    },
    {
      id: 'welcome_deal',
      badge: '+20% Gift',
      title: 'Welcome Gift: +20% extra credits',
      desc: 'Plus Plan includes 1,440 credits (1,200 + 240 bonus) on your first purchase.',
      cta: 'View Welcome Gift',
    },
    {
      id: 'cost_guide',
      badge: 'Transparent',
      title: 'Video ~12 cr · Image ~2 cr',
      desc: 'Code agent ~1 cr. Clear pricing before every run with zero surprises.',
      cta: 'Explore Rates',
    },
  ],
  steps: [
    {
      n: 1,
      id: 'step-1',
      title: '1 · First launch (0 credits)',
      shortTitle: 'First launch',
      subtitle: 'Visible Title bar meter + prominent "+ Get credits" button + onboarding welcome card',
      rationale: 'Addresses 40% initial drop-off: users previously did not know their balance or how to top up.',
    },
    {
      n: 2,
      id: 'step-2',
      title: '2 · Empty composer & Quick prompts',
      shortTitle: 'Quick prompts',
      subtitle: '3 clickable starter prompts with exact credit costs + dynamic button price preview',
      rationale: 'Overcomes blank page syndrome (~25% drop-off) and shows clear cost predictability upfront.',
    },
    {
      n: 3,
      id: 'step-3',
      title: '3 · Send with 0 (Paused task)',
      shortTitle: 'Paused on 0',
      subtitle: 'No technical 402 error; task pauses and auto-resumes after checkout',
      rationale: 'Eliminates 70% drop-off caused by low-balance errors and lost prompt input. Prompt is preserved in chat.',
    },
    {
      n: 4,
      id: 'step-4',
      title: '4 · Welcome offer sheet (+20%)',
      shortTitle: 'Welcome sheet',
      subtitle: 'In-app bottom sheet with +20% Welcome Gift on Plus/Starter & honest 7-day account timer',
      rationale: 'Smooth in-app paywall replacing browser redirects and generic banners. Honest deadline persists across reloads.',
    },
    {
      n: 5,
      id: 'step-5',
      title: '5 · In-app 2-click checkout',
      shortTitle: '2-click checkout',
      subtitle: 'Apple Pay, card and bank payment directly inside the app window (no browser redirect)',
      rationale: 'Eliminates 80–90% drop-off from browser redirection and auth drops.',
      locked: false,
    },
    {
      n: 6,
      id: 'step-6',
      title: '6 · Credits credited & task unlocks',
      shortTitle: 'Task unlocked',
      subtitle: '+1,440 cr toast, animated meter, paused task auto-runs (Paused → Running → Completed)',
      rationale: 'Drastically reduces Time-to-Value from 15+ minutes to 45 seconds.',
      locked: false,
    },
  ],
  lifecycleStates: [
    {
      id: 'state-1',
      num: 1,
      track: 'newbie',
      name: '1. Первый запуск с 0 (Новичок)',
      sub: 'Онбординг · Первое касание IDE без кредитов',
      badge: 'Онбординг · Риск оттока ~40%',
      badgeType: 'alert',
      stripe: 'orange',
      coverage: '[Сцена 14] + [Новое] (композер)',
      playStep: 1,
      titleBar: {
        meterText: '0 cr',
        meterClass: 'zero',
        btnText: 'Get credits',
        btnBadge: '+20% Gift',
        btnClass: 'orange',
        actionDesc: 'Действие: открывает нативный шит Welcome с планами +20% (Сцена 14)',
      },
      composerChat: {
        chatDesc: 'Many welcomes creator: "Welcome to Quadcode AI! You have 0 credits. Choose how to start..."',
        composerDesc: '3 Quick Prompt Cards with visible costs (~12 cr Fast Video, 2 cr Art, ~1 cr Code Agent)',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'spend',
          hint: 'Триггер: клик не блокируется, показывает цену запуска выбранной модели',
        },
      },
      modelSelector: 'Seedance 2.5 Fast selected by default (newcomer-friendly)',
      profileMenu: 'Balance: 0 credits · Get Plan (+20% bonus)',
      statusBar: '0 credits · Free Guest',
      toasts: 'No toasts on initial boot',
      settingsBilling: 'Plans showcase with Welcome Gift bonus badges',
      activeOffer: {
        name: 'Welcome Gift: +20% Extra Credits',
        isNoOffer: false,
        duration: '7 дней (168 часов)',
        offerBadge: '+20% Бонус · 7 дней',
        terms: 'Plus Plan: 1,440 cr (1,200 + 240 бонус) за $59/mo · Starter: 360 cr (300 + 60 бонус) за $20/mo.',
        countdown: '6d 23h 59m (честный таймер)',
        status: 'Active campaign',
      },
    },
    {
      id: 'state-2',
      num: 2,
      track: 'newbie',
      name: '2. Стартовые бесплатные кредиты (50 cr)',
      sub: 'Активация · Тестовый баланс для первого запуска',
      badge: 'Активация Freemium · Рост C1',
      badgeType: 'accent',
      stripe: 'neutral',
      coverage: '[Сцена 1] + [Новое]',
      playStep: null,
      titleBar: {
        meterText: '50 cr',
        meterClass: 'active',
        btnText: 'Upgrade',
        btnBadge: null,
        btnClass: 'upgrade',
        actionDesc: 'Действие: открывает витрину планов и тарифов (Сцена 1)',
      },
      composerChat: {
        chatDesc: 'Banner hint: "You have 50 complimentary test credits active for initial tests"',
        composerDesc: 'Direct prompt entry or template selection with real-time deduction preview',
        sendBtn: {
          label: 'Generate · ~12 cr',
          btnClass: 'spend',
          hint: 'Триггер: списывает 12 кредитов с активного баланса 50 cr',
        },
      },
      modelSelector: 'Basic models available (Seedance Fast, Nanobanana 2)',
      profileMenu: 'Balance: 50 cr (Free) · Upgrade Plan',
      statusBar: '50 cr · Free Tier',
      toasts: '✓ 50 free credits active',
      settingsBilling: 'Free Tier (50 credits) · Button: Upgrade to Plus',
      activeOffer: {
        name: 'No offer',
        isNoOffer: true,
        duration: 'Free Tier',
        terms: 'Без промо-оффера · базовый тариф',
        countdown: 'Active tier',
        status: 'Complimentary',
      },
    },
    {
      id: 'state-3',
      num: 3,
      track: 'newbie',
      name: '3. 0 кредитов посреди задачи (Задача на паузе)',
      sub: 'Заморозка · Задача на паузе, промпт сохранён',
      badge: 'Критическая точка оттока · Устранение 402',
      badgeType: 'alert',
      stripe: 'red',
      coverage: '[Сцена 2, 11]',
      playStep: 3,
      titleBar: {
        meterText: '0 cr',
        meterClass: 'alert',
        btnText: 'Unlock',
        btnBadge: null,
        btnClass: 'orange',
        actionDesc: 'Действие: открывает нативный шит нехватки кредитов (Сцена 2, 11)',
      },
      composerChat: {
        chatDesc: 'Task card mounted: "Sonic: Paused · Needs 12 credits to start. Task preserved."',
        composerDesc: 'Prompt preserved in chat; composer inputs smoothly cleared',
        sendBtn: {
          label: 'Generate · Needs 12 cr',
          btnClass: 'blocked',
          hint: 'Триггер: клик повторно вызывает нативный шит нехватки кредитов',
        },
      },
      modelSelector: 'Locked until credits added (preserves chosen model in memory)',
      profileMenu: 'Balance: 0 cr · Add credits to resume task',
      statusBar: '0 cr · 1 task paused (accent link opens sheet)',
      toasts: 'Task paused: Add credits to continue render',
      settingsBilling: '0 credits left · Recommended: Plus Plan or Starter Plan',
      activeOffer: {
        name: 'Welcome Gift: +20% Extra Credits',
        isNoOffer: false,
        duration: '7 дней (168 часов)',
        offerBadge: '+20% Бонус · 7 дней',
        terms: 'Plus Plan 1,440 cr ($59/mo) или Starter 360 cr ($20/mo). Задача стартует сразу после оплаты.',
        countdown: '6d 22h 58m',
        status: 'Active campaign',
      },
    },
    {
      id: 'state-4',
      num: 4,
      track: 'newbie',
      name: '4. Приветственный оффер активен (+20%, 7 дн)',
      sub: 'Окно конверсии · Таймер новичка привязан к аккаунту',
      badge: 'Приветственная кампания · Окно конверсии',
      badgeType: 'accent',
      stripe: 'orange',
      coverage: '[Сцена 14]',
      playStep: 4,
      titleBar: {
        meterText: '0 cr',
        meterClass: 'zero',
        btnText: 'Get +20%',
        btnBadge: '6d 22h',
        btnClass: 'pulse-deal',
        actionDesc: 'Действие: открывает нативный шит Welcome с сеткой планов +20% (Сцена 14)',
      },
      composerChat: {
        chatDesc: 'Banner over chat: "Welcome Offer: +20% extra credits on first purchase (6 days left)"',
        composerDesc: 'Model picker badges show "Bonus eligible" across all standard tiers',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'accent',
          hint: 'Триггер: клик открывает шит Welcome с применённым бонусом +20%',
        },
      },
      modelSelector: 'Tier models marked with "+20% Bonus eligible" badge',
      profileMenu: 'Special: +20% Welcome Gift active (6d left)',
      statusBar: 'Welcome Offer active (6 days left)',
      toasts: 'Day 6 notice: Welcome bonus expires in 24 hours',
      settingsBilling: 'Countdown timer 7 days + badge "+20% bonus" on plan cards',
      activeOffer: {
        name: 'Welcome Gift: +20% Extra Credits',
        isNoOffer: false,
        duration: '7 дней (168 часов честный таймер)',
        offerBadge: '+20% Бонус · 7 дней',
        terms: 'Plus Plan: 1,440 cr (1,200 + 240 бонус) за $59/mo · Starter: 360 cr (300 + 60 бонус) за $20/mo.',
        countdown: '6d 22h 58m',
        status: 'Active campaign',
      },
    },
    {
      id: 'state-5',
      num: 5,
      track: 'newbie',
      name: '5. Приветственный оффер истёк (Flash Sale 24h)',
      sub: 'Оффер истёк · Возврат к базовым тарифам или Flash Sale',
      badge: 'Базовый тариф после Welcome · 0 покупок',
      badgeType: 'neutral',
      stripe: 'orange',
      coverage: '[Сцена 1]',
      playStep: null,
      titleBar: {
        meterText: '0 cr',
        meterClass: 'zero',
        btnText: 'Get credits',
        btnBadge: null,
        btnClass: 'upgrade',
        actionDesc: 'Действие: открывает стандартный каталог цен без бонуса Welcome (Сцена 1)',
      },
      composerChat: {
        chatDesc: 'Chat clean; greeting prompts: "Welcome! Choose a template or describe your task..."',
        composerDesc: '3 Quick Prompt Cards with standard costs; composer clean without welcome banner',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'spend',
          hint: 'Триггер: клик открывает стандартный каталог цен ($20, $59, $129)',
        },
      },
      modelSelector: 'Standard model labels (no bonus badges)',
      profileMenu: 'Balance: 0 credits · View Plans',
      statusBar: '0 credits · Free Guest',
      toasts: 'No toasts',
      settingsBilling: 'Standard plan pricing matrix ($20, $59, $129)',
      activeOffer: {
        name: '24-Hour Flash Sale (−40% Starter)',
        isNoOffer: false,
        duration: '24 часа (день 8+, если 0 покупок и ≥3 сессий)',
        offerBadge: '−40% Скидка · 24 часа',
        terms: 'Starter Annual за $108/год ($9/мес вместо $15/мес, скидка 40%). Активируется на 8 день, не повторяется.',
        countdown: '23h 59m (честный таймер)',
        status: 'Flash sale',
      },
    },
    {
      id: 'state-6',
      num: 6,
      track: 'first_purchase',
      name: '6. Оплата не прошла / отказ банка (повтор, смена карты, промпт сохранён)',
      sub: 'Ошибка платежа · Сохранение задачи и параметров чекаута',
      badge: 'Критическое восстановление · 0 потерь данных',
      badgeType: 'alert',
      stripe: 'red',
      coverage: '[Сцена 11] + [Новое]',
      playStep: 5,
      titleBar: {
        meterText: '0 cr',
        meterClass: 'error',
        btnText: 'Retry Payment',
        btnBadge: 'Declined',
        btnClass: 'error',
        actionDesc: 'Действие: красная рамка у баланса. Клик повторно открывает чекаут с кодом ошибки банка (Сцена 11)',
      },
      composerChat: {
        chatDesc: 'Task in chat stays safely frozen: "⏸ Paused · Payment declined by bank. Retry payment or select another card to resume render". Zero prompt loss.',
        composerDesc: 'Prompt and model settings preserved in memory; banner shows decline reason and retry CTA',
        sendBtn: {
          label: 'Retry Payment',
          btnClass: 'blocked',
          hint: 'Триггер: клик перезапускает нативный чекаут для ввода новой карты',
        },
      },
      modelSelector: 'Chosen model remains locked in memory to prevent accidental parameter loss',
      profileMenu: 'Payment failed · Update payment method',
      statusBar: 'Payment error · Click to retry with another card',
      toasts: 'Payment declined by bank. Please check CVC or card',
      settingsBilling: 'Red alert: "Payment declined · Update payment method or switch to Apple Pay"',
      activeOffer: {
        name: 'No offer',
        isNoOffer: true,
        duration: 'Recovery window',
        terms: 'Без промо-оффера · базовый тариф',
        countdown: 'Immediate retry',
        status: 'Payment recovery',
      },
    },
    {
      id: 'state-7',
      num: 7,
      track: 'first_purchase',
      name: '7. Первая покупка успешна (Подписка Plus/Starter, 1,440 cr, задача пошла)',
      sub: 'Успех C1 · Баланс начислен, задача запущена',
      badge: 'Конверсия C1 · Первый Aha-момент',
      badgeType: 'success',
      stripe: 'green',
      coverage: '[Сцена 11, 10]',
      playStep: 6,
      titleBar: {
        meterText: '1,440 cr',
        meterClass: 'active',
        btnText: 'Plus Plan',
        btnBadge: 'Active',
        btnClass: 'subscriber',
        actionDesc: 'Действие: анимация счётчика 0 → 1,440 cr + бейдж активного Plus подписчика (Сцена 10)',
      },
      composerChat: {
        chatDesc: 'Task starts automatically: "Sonic: ▶ Running (00:08s)". Video renders in ~30s.',
        composerDesc: 'Composer clear; contextual hint shows 1,428 cr left with recommended next actions',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'success',
          hint: 'Триггер: зелёная кнопка готовности, 1,428 кредитов для мгновенного следующего запуска',
        },
      },
      modelSelector: 'All flagship models unlocked (Seedance 4K, Nanobanana Pro, etc.)',
      profileMenu: 'Plus Plan · 1,440 cr · Manage Subscription',
      statusBar: '1,440 cr · Plus Subscriber',
      toasts: '✓ Payment confirmed! +1,440 credits added',
      settingsBilling: 'Plus Plan active checklist · Next billing date: Nov 7, 2026 ($59.00)',
      activeOffer: {
        name: 'No offer',
        isNoOffer: true,
        duration: 'Standard subscription cycle',
        terms: 'Без промо-оффера · базовый тариф',
        countdown: 'Renews in 30 days',
        status: 'Active subscription',
      },
    },
    {
      id: 'state-8',
      num: 8,
      track: 'subscriber',
      name: '8. Подписчик близко к лимиту (> 90% израсходовано)',
      sub: 'Upsell окно · Баланс на 1-2 генерации до продления',
      badge: 'Окно допродажи · Высокий интент',
      badgeType: 'warn',
      stripe: 'orange',
      coverage: '[Сцена 10, 23]',
      playStep: null,
      titleBar: {
        meterText: '96 cr',
        meterClass: 'low',
        btnText: 'Add Credits',
        btnBadge: null,
        btnClass: 'topup',
        actionDesc: 'Действие: открывает магазин (паки 100–5,000 cr или авто-пополнение, Сцена 2, 23)',
      },
      composerChat: {
        chatDesc: 'Callout above composer: "Used 1,104 of 1,200 monthly credits. 96 credits remaining (~8 fast videos)"',
        composerDesc: 'Model selector shows remaining generation capacity for each model (e.g. 2 Seedance 4K or 8 Fast)',
        sendBtn: {
          label: 'Generate · 45 cr',
          btnClass: 'low-warn',
          dotWarn: true,
          hint: 'Триггер: предупреждающая янтарная точка, тяжелый рендер оставит 51 cr',
        },
      },
      modelSelector: 'Displays exact remaining runs count per model',
      profileMenu: '96 / 1,200 cr left · Buy Extra Pack',
      statusBar: '96 cr · Renews Oct 22',
      toasts: '10% credits remaining. Enable auto-refill to avoid pauses',
      settingsBilling: 'Credit Store button "Buy Pack (100–5,000 cr)" + Auto-refill toggle ($1 = 18 cr)',
      activeOffer: {
        name: 'Mid-Month Rescue (Auto-Refill Trial)',
        isNoOffer: false,
        duration: '48 часов (> 10 дней до продления и баланс < 10%)',
        offerBadge: '+20% Бонус · 48 часов',
        terms: '+20% бонусных кредитов на первое авто-пополнение ($1 = 22 cr вместо 18 cr) или разовый пак (+20% cr). Не суммируется.',
        countdown: '47h 58m',
        status: 'Contextual rescue',
      },
    },
    {
      id: 'state-9',
      num: 9,
      track: 'subscriber',
      name: '9. Мало кредитов (< 10% или < 50 cr, триггер спасения)',
      sub: 'Предупреждение · Запас менее 3 генераций',
      badge: 'Середина цикла · Триггер спасения',
      badgeType: 'warn',
      stripe: 'orange',
      coverage: '[Сцена 2, 23]',
      playStep: null,
      titleBar: {
        meterText: '38 cr',
        meterClass: 'low',
        btnText: 'Top up',
        btnBadge: null,
        btnClass: 'topup',
        actionDesc: 'Действие: открывает магазин (паки, авто-пополнение, пассы, Сцена 2)',
      },
      composerChat: {
        chatDesc: 'Amber callout: "Low balance warning: 38 credits remaining (~3 video gens)"',
        composerDesc: 'Flagship models display heavy consumption badges (Seedance 4K, Pro)',
        sendBtn: {
          label: 'Generate · ~12 cr',
          btnClass: 'low-warn',
          dotWarn: true,
          hint: 'Триггер: предупреждающая янтарная точка, после запуска останется 26 cr',
        },
      },
      modelSelector: 'Flagship models marked with high credit burn alert',
      profileMenu: 'Balance: 38 cr (Low) · Enable Auto-refill',
      statusBar: '38 cr · Low balance (amber alert)',
      toasts: 'Balance low: 38 cr left (triggered on < 10% dip)',
      settingsBilling: 'Auto-refill: OFF · Button: Turn on Auto-refill ($1 = 18 cr)',
      activeOffer: {
        name: 'Mid-Month Rescue (48h)',
        isNoOffer: false,
        duration: '48 часов (> 10 дней до продления)',
        offerBadge: '+20% Бонус · 48 часов',
        terms: '+20% бонусных кредитов на паки или авто-пополнение по курсу $1 = 22 cr (базовый $1 = 18 cr).',
        countdown: '47h 59m (честный таймер на 48 ч)',
        status: 'Contextual rescue offer',
      },
    },
    {
      id: 'state-10',
      num: 10,
      track: 'topup',
      name: '10. Открытие магазина токенов (3 вкладки: паки, авто-рефилл, пассы)',
      sub: 'Вход в магазин · Паки, авто-рефилл, пассы',
      badge: 'Вход в магазин · Только подписчикам',
      badgeType: 'accent',
      stripe: 'orange',
      coverage: '[Сцена 2, Разд. 10.1]',
      playStep: null,
      titleBar: {
        meterText: '38 cr',
        meterClass: 'low',
        btnText: 'Top up',
        btnBadge: null,
        btnClass: 'topup',
        actionDesc: 'Действие: клик по балансу или предупреждению открывает нативный магазин с 3 вкладками (Сцена 2)',
      },
      composerChat: {
        chatDesc: 'Store modal mounts over IDE workspace. For Free guests with 0 cr: locked with notice "Packs are available for active subscribers. Subscribe to unlock extra packs". For subscribers: preselects Top-up Packs tab.',
        composerDesc: 'Native Store Bottom Sheet with 3 tabs: Packs (preselected), Auto-refill, Unlimited Passes. Subtle escape link to Gemini Omni Flash (1 cr) preserved.',
        sendBtn: {
          label: 'Generate · ~12 cr',
          btnClass: 'low-warn',
          dotWarn: true,
          hint: 'Триггер: предупреждение о низком балансе (< 10% или < 50 cr) побуждает пополнить счет',
        },
      },
      modelSelector: 'All models selectable; flagship models display credit burn rates',
      profileMenu: 'Balance: 38 cr · Open Credit Store',
      statusBar: '38 cr · Low balance (click opens Store)',
      toasts: 'No toasts on store open',
      settingsBilling: 'Credit Store modal with 3 tabs + pack ladder',
      activeOffer: {
        name: 'Mid-Month Rescue (48h Boost)',
        isNoOffer: false,
        duration: '48 часов (> 10 дней до продления и баланс < 10%)',
        offerBadge: '+20% Бонус · 48 часов',
        terms: '+20% бонусных кредитов на покупку паков (500 cr + 100 бонус = 600 cr за $29) или авто-рефилл по $1 = 22 cr. Только для активных подписчиков.',
        countdown: '47h 58m (честный таймер)',
        status: 'Contextual rescue offer',
      },
    },
    {
      id: 'state-11',
      num: 11,
      track: 'topup',
      name: '11. Выбор кредитного пакета (7 паков, 90 дней)',
      sub: 'Выбор пака · 7 тиров от $6 до $250 на 90 дней',
      badge: 'Кредитные паки · Только к подписке',
      badgeType: 'accent',
      stripe: 'orange',
      coverage: '[Сцена 2, Pricing 8.5, Разд. 10.1]',
      playStep: null,
      titleBar: {
        meterText: '38 cr',
        meterClass: 'low',
        btnText: 'Buy pack',
        btnBadge: '90 days',
        btnClass: 'orange',
        actionDesc: 'Действие: каталог паков: 100 cr ($6), 200 cr ($12), 500 cr ($29), 1,000 cr ($56), 2,000 cr ($105), 4,000 cr ($205), 5,000 cr ($250).',
      },
      composerChat: {
        chatDesc: 'Pack card preview: "500 credits · $29 · 5.8¢/cr · ~11 videos 1080p (Nanobanana Pro ~250 imgs)". Valid for 90 days. "A plan is cheaper per credit" nudge.',
        composerDesc: 'Full-width pack strip selected. Notice: "Extra packs sold only on top of an active plan. Unused pack credits roll over and freeze if plan is cancelled".',
        sendBtn: {
          label: 'Checkout · $29',
          btnClass: 'accent',
          dotWarn: false,
          hint: 'Триггер: клик "Purchase" открывает экспресс-чекаут в приложении в 2 клика',
        },
      },
      modelSelector: 'Displays generation equivalents for selected pack across models',
      profileMenu: 'Select pack tier · 90-day pack life',
      statusBar: 'Store: 500 cr pack selected ($29)',
      toasts: 'No toasts on selection',
      settingsBilling: 'Packs catalog with unit economics and 90-day schedule',
      activeOffer: {
        name: 'Mid-Month Rescue (48h Boost)',
        isNoOffer: false,
        duration: '48 часов (> 10 дней до продления и баланс < 10%)',
        offerBadge: '+20% Бонус · 48 часов',
        terms: 'Бонус +20% к объёму пака: 500 cr даёт 600 кредитов за $29 (4.8¢/cr вместо 5.8¢/cr). Паки продаются только к активной подписке.',
        countdown: '47h 57m',
        status: 'Pack volume bonus',
      },
    },
    {
      id: 'state-12',
      num: 12,
      track: 'topup',
      name: '12. Auto-refill: настройка и срабатывание ($1 = 18 cr, порог 50 cr, +720 cr)',
      sub: 'Авто-пополнение · Бесшовное фоновое срабатывание ($1 = 18 cr, ступени $20/$40/$90)',
      badge: 'Бесшовность · 0 прерываний задачи',
      badgeType: 'success',
      stripe: 'green',
      coverage: '[Сцена 23, Разд. 10.1]',
      playStep: null,
      titleBar: {
        meterText: '758 cr',
        meterClass: 'success',
        btnText: 'Auto-refill: ON',
        btnBadge: '$40 tier',
        btnClass: 'subscriber',
        actionDesc: 'Действие: зеленая анимация прироста баланса с 38 cr до 758 cr. Ступени: $20 (360 cr), $40 (720 cr), $90 (1,620 cr) (Сцена 23)',
      },
      composerChat: {
        chatDesc: 'Preferences & execution: Auto-refill active ($40 · 720 cr). Triggers seamlessly when balance drops below 50 cr. Zero interruption: task continues without 402 error.',
        composerDesc: 'Interactive switch: ON / OFF. Rate $1 = 18 credits (or $1 = 22 cr with rescue offer). Spend order: plan quota first, then earliest expiry packs.',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'spend',
          hint: 'Триггер: фоновое пополнение разблокирует генерации без участия пользователя',
        },
      },
      modelSelector: 'All models active; creative pipeline protected by auto-refill',
      profileMenu: 'Balance: 758 cr · Auto-refill: Active ($40)',
      statusBar: 'Auto-refilled +720 cr ($40)',
      toasts: 'Green toast: Auto-refill applied: +720 credits added ($40)',
      settingsBilling: 'Transaction record: "Auto-refill $40 · 720 cr · threshold 50 cr" + toggle switch',
      activeOffer: {
        name: 'Mid-Month Rescue (Auto-Refill Trial)',
        isNoOffer: false,
        duration: '48 часов (> 10 дней до продления и баланс < 10%)',
        offerBadge: '+20% Бонус · 48 часов',
        terms: 'Льготный курс на первое авто-пополнение: $1 = 22 cr ($40 даёт 880 cr вместо 720 cr). Далее стандартный курс $1 = 18 cr. Лимит 2 списания в месяц ($80).',
        countdown: '47h 56m',
        status: 'Preferential rate bonus',
      },
    },
    {
      id: 'state-13',
      num: 13,
      track: 'topup',
      name: '13. Оплата пополнения успешна (+500 cr, задача разморожена)',
      sub: 'Успех пополнения · Мгновенное возобновление рендера',
      badge: 'Мгновенная доставка · 0 перезагрузок',
      badgeType: 'success',
      stripe: 'green',
      coverage: '[Сцена 11, Разд. 10.1]',
      playStep: null,
      titleBar: {
        meterText: '538 cr',
        meterClass: 'success',
        btnText: '+500 cr',
        btnBadge: 'Added',
        btnClass: 'subscriber',
        actionDesc: 'Действие: счётчик анимируется с 38 cr до 538 cr. Модалка магазина закрывается автоматически.',
      },
      composerChat: {
        chatDesc: 'Task in chat instantly flips status: "Sonic: ⏸ Paused ➔ ▶ Running (00:04s)". Video generation resumes in-place without re-submitting prompt.',
        composerDesc: 'Composer reflects fresh balance (538 cr). Generation proceeds seamlessly.',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'success',
          hint: 'Триггер: зелёная кнопка готовности, после генерации останется 526 кредитов',
        },
      },
      modelSelector: 'All models unlocked and active',
      profileMenu: 'Balance: 538 cr (500 pack cr expires in 90d) · View Billing',
      statusBar: '538 cr · Pack added · Task running',
      toasts: '✓ +500 credits added to your balance. Paused task auto-resumed',
      settingsBilling: 'Invoice receipt: "+500 credits Pack ($29.00) · Paid via Apple Pay"',
      activeOffer: {
        name: 'No offer',
        isNoOffer: true,
        duration: 'Transaction fulfilled',
        terms: 'Без промо-оффера · базовый тариф',
        countdown: 'Fulfilled',
        status: 'Active pack',
      },
    },
    {
      id: 'state-14',
      num: 14,
      track: 'topup',
      name: '14. Пак скоро сгорит (≤ 7 дней до 90 дн, пролонгация)',
      sub: 'Срочность · Покупка любого пака ($6+) продлевает остаток на 90 дней',
      badge: 'Срочность · Продление остатка пака',
      badgeType: 'warn',
      stripe: 'neutral',
      coverage: '[Сцена 16, Разд. 10.1]',
      playStep: null,
      titleBar: {
        meterText: '450 cr',
        meterClass: 'expiring',
        btnText: 'Use credits',
        btnBadge: '6d left',
        btnClass: 'accent',
        actionDesc: 'Действие: иконка таймера у баланса. Клик выбирает тяжелые модели или открывает магазин для продления на 90 дней (Сцена 16)',
      },
      composerChat: {
        chatDesc: 'Warning banner over chat: "Reminder: 450 pack credits expire on Oct 14 (6 days left). Use them on Seedance 4K, or extend your entire balance for another 90 days by purchasing any pack ($6+)."',
        composerDesc: 'Heavy creative models highlighted (Seedance 2.5 4K, Nanobanana Pro 2K, Topaz Video Upscale) to maximize utility before cutoff.',
        sendBtn: {
          label: 'Generate · 45 cr',
          btnClass: 'accent',
          hint: 'Триггер: списывает сначала кредиты пака с ближайшим сроком сгорания, сохраняя месячную квоту',
        },
      },
      modelSelector: 'Seedance 2.5 4K pre-highlighted with recommendation chip',
      profileMenu: '450 pack credits expire on Oct 14 · Extend balance',
      statusBar: '450 cr pack expiring in 6 days (Oct 14)',
      toasts: 'Reminder: 450 pack credits expire in 6 days. Extend with any pack',
      settingsBilling: 'Expiration schedule: 450 credits expiring Oct 14 · Button: "Extend for 90 days with any pack"',
      activeOffer: {
        name: 'No offer',
        isNoOffer: true,
        duration: 'Expires in 6 days',
        terms: 'Без промо-оффера · базовый тариф',
        countdown: '6 days left',
        status: 'Pack expiration notice',
      },
    },
    {
      id: 'state-15',
      num: 15,
      track: 'churn_return',
      name: '15. Триал заканчивается (≤ 24 часа, скидка 25% на Annual)',
      sub: 'Конверсия триала · Скидка на годовую подписку',
      badge: 'Срочность · Конверсия триала в подписку',
      badgeType: 'warn',
      stripe: 'orange',
      coverage: '[Сцена 26]',
      playStep: null,
      titleBar: {
        meterText: '120 cr',
        meterClass: 'low',
        btnText: 'Upgrade',
        btnBadge: '−25%',
        btnClass: 'orange',
        actionDesc: 'Действие: открывает модалку конверсии триала с 25% скидкой на годовой план (Сцена 26)',
      },
      composerChat: {
        chatDesc: 'Chat header live countdown: "Trial ends in 18:42:10. Lock in your workflow."',
        composerDesc: 'Notice: workspace reverts to Free guest limits with watermarks once timer reaches 00:00',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'spend',
          hint: 'Триггер: активен, расходует остаток триального баланса',
        },
      },
      modelSelector: 'Warning on Pro models: reverts to Free tier on trial expiration',
      profileMenu: 'Trial ends in 18h · Choose Plan',
      statusBar: 'Trial: 18h left',
      toasts: 'Your trial expires tomorrow. Save 25% on annual plan',
      settingsBilling: 'Modal: Choose permanent plan with 25% annual discount',
      activeOffer: {
        name: 'Trial Conversion Discount (−25% Annual)',
        isNoOffer: false,
        duration: '24 часа таймер до окончания триала',
        offerBadge: '−25% Скидка · 24 часа',
        terms: 'Скидка 25% на годовой план (Plus Annual $423/год или Starter Annual $135/год) до сброса на Free-аккаунт.',
        countdown: '18h 42m',
        status: 'Trial cutoff window',
      },
    },
    {
      id: 'state-16',
      num: 16,
      track: 'churn_return',
      name: '16. Подписка отменена (Grace period до конца цикла, оффер 25% на 2 мес)',
      sub: 'Удержание оттока · Доступ до даты продления',
      badge: 'Удержание оттока · 1 экран по закону',
      badgeType: 'alert',
      stripe: 'red',
      coverage: '[Сцена 8, 20]',
      playStep: null,
      titleBar: {
        meterText: '718 cr',
        meterClass: 'gray',
        btnText: 'Keep Plan',
        btnBadge: '−25%',
        btnClass: 'pulse-deal',
        actionDesc: 'Действие: открывает 1-экранный оффер: 25% OFF на 2 месяца ($44.25/mo) (Сцена 8, 20)',
      },
      composerChat: {
        chatDesc: 'Notice above chat: "Plus Plan active until Oct 22. Unused rollover credits will expire after cutoff."',
        composerDesc: 'Warning badge on flagship models: "Seedance 2.5 4K access turns off on Oct 22"',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'spend',
          hint: 'Триггер: активен до конца оплаченного периода (22 октября)',
        },
      },
      modelSelector: 'Flagship models marked: access ends on renewal date',
      profileMenu: 'Cancels Oct 22 · Reactivate with 25% OFF',
      statusBar: 'Cancels on Oct 22 · Grace period',
      toasts: 'Day -3 notice: Your subscription ends in 3 days. Reactivate now',
      settingsBilling: 'Cancellation banner + "Reactivate Subscription (25% OFF for 2 months)" + optional survey',
      activeOffer: {
        name: 'Churn Save-Flow (25% OFF for 2 Months)',
        isNoOffer: false,
        duration: '1 экран удержания (1 раз в 6 месяцев)',
        offerBadge: '−25% Скидка · 2 месяца',
        terms: 'Plus за $44.25/мес вместо $59/мес (экономия $29.50 за 2 мес). Полноразмерная кнопка отмены на том же экране; опрос строго после отмены.',
        countdown: 'Cycle ends Oct 22',
        status: 'Save-flow offer',
      },
    },
    {
      id: 'state-17',
      num: 17,
      track: 'churn_return',
      name: '17. Возврат после паузы (14+ дней неактивности, +30% бонус)',
      sub: 'Реактивация · Обзор обновлений и сохранённый баланс',
      badge: 'Реактивация · Обзор новых фич',
      badgeType: 'accent',
      stripe: 'orange',
      coverage: '[Сцена 18]',
      playStep: null,
      titleBar: {
        meterText: '718 cr',
        meterClass: 'active',
        btnText: 'Resume Work',
        btnBadge: '3 new',
        btnClass: 'resume',
        actionDesc: 'Действие: открывает модалку новинок Quadcode AI и свежих моделей (Сцена 18)',
      },
      composerChat: {
        chatDesc: 'Warm welcome banner: "Welcome back! We saved your 718 credits and project sneaker-launch."',
        composerDesc: 'New models marked with bright "NEW" badges (Wan 2.7, Seedance 2.5 Pro)',
        sendBtn: {
          label: 'Generate · 12 cr',
          btnClass: 'spend',
          hint: 'Триггер: готов к запуску, баланс полностью сохранён',
        },
      },
      modelSelector: 'Badges "NEW" on recently added models since last user session',
      profileMenu: 'Plus Subscriber · Explore New Models',
      statusBar: 'Active · 718 cr',
      toasts: 'Welcome back! 3 new models added since your last visit',
      settingsBilling: 'Billing history for inactive period + invoice receipts',
      activeOffer: {
        name: 'Win-Back Inactive (+30% Credits)',
        isNoOffer: false,
        duration: '72 часа (возврат после 14+ дней неактивности)',
        offerBadge: '+30% Бонус · 72 часа',
        terms: '+30% бонусных кредитов на следующее продление или реактивацию плана (максимум 1 раз в квартал).',
        countdown: '71h 59m',
        status: 'Reactivation bonus',
      },
    },
  ],
  topupPacks: [
    { cr: 100, pr: 6, rate: '6.0¢ / cr', off: '−29%', imgs: 50, vids: 2 },
    { cr: 200, pr: 12, rate: '6.0¢ / cr', off: '−29%', imgs: 100, vids: 4 },
    { cr: 500, pr: 29, rate: '5.8¢ / cr', off: '−32%', imgs: 250, vids: 11 },
    { cr: 1000, pr: 56, rate: '5.6¢ / cr', off: '−34%', imgs: 500, vids: 22 },
    { cr: 2000, pr: 105, rate: '5.3¢ / cr', off: '−38%', imgs: 1000, vids: 44 },
    { cr: 4000, pr: 205, rate: '5.1¢ / cr', off: '−40%', badge: 'MOST POPULAR', imgs: 2000, vids: 88 },
    { cr: 5000, pr: 250, rate: '5.0¢ / cr', off: '−41%', badge: 'BEST VALUE', imgs: 2500, vids: 111 },
  ],
};

/* State */
let state = {
  currentMode: 'newbie', // 'newbie' or 'all-states'
  currentStep: 1,
  hasPausedTask: false,
  selectedPromptId: 'video',
  activeModelId: 'sd_fast',
  composerText: '',
  showProposalNotes: false,
  selectedPlanForCheckout: 'plus', // 'plus' or 'starter'
  sheetBilling: 'monthly', // 'monthly' or 'annual'
  selectedBilling: 'monthly', // 'monthly' or 'annual'
  isExitDiscountApplied: false,
  exitIntentOpen: false,
  isSubscriber: false,
  userBalance: 0,
  toastVisible: false,
};

/* Timer helpers complying with meta/rules/temporary-offers.md */
function getWelcomeDeadline() {
  let expires = localStorage.getItem(TIMER_STORAGE_KEY);
  if (!expires) {
    expires = String(Date.now() + SEVEN_DAYS_MS);
    localStorage.setItem(TIMER_STORAGE_KEY, expires);
  }
  return parseInt(expires, 10);
}

function getCountdownState() {
  const deadline = getWelcomeDeadline();
  const diff = deadline - Date.now();
  if (diff <= 0) {
    return {
      expired: true,
      text: 'Offer expired. Standard rates now apply.',
    };
  }
  const d = Math.floor(diff / (24 * 3600 * 1000));
  const h = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
  const m = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
  const s = Math.floor((diff % (60 * 1000)) / 1000);
  return {
    expired: false,
    text: `Offer expires in: ${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`,
  };
}

function getExitDeadline() {
  let expires = localStorage.getItem(EXIT_TIMER_STORAGE_KEY);
  if (!expires) {
    expires = String(Date.now() + EIGHT_MINUTES_MS);
    localStorage.setItem(EXIT_TIMER_STORAGE_KEY, expires);
  }
  return parseInt(expires, 10);
}

function getExitCountdownState() {
  const deadline = getExitDeadline();
  const diff = deadline - Date.now();
  if (diff <= 0) {
    return {
      expired: true,
      text: 'Offer expired. Standard rates now apply.',
    };
  }
  const m = Math.floor(diff / (60 * 1000));
  const s = Math.floor((diff % (60 * 1000)) / 1000);
  return {
    expired: false,
    text: `Introductory offer ends in ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`,
  };
}

/* SVG Icons — Strictly NO Unicode symbols */
function svg(name, size = 12) {
  const icons = {
    sparkle: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.8 6.7 6.7 2.8-6.7 2.8L12 21.5l-2.8-6.7-6.7-2.8 6.7-2.8L12 2.5z"/></svg>`,
    down: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    caretUp: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
    plus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    play: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    pause: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
    rocket: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
    git: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`,
    settings: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    send: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    bot: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`,
    check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    clock: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    mic: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    rewind: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/></svg>`,
    users: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    shieldCheck: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    winMin: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    winMax: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
    winClose: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    lock: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    card: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  };
  return icons[name] || '';
}

function vendorLogo(vendor) {
  const logos = {
    gemini: '../../assets/logos/gemini.svg',
    bytedance: '../../assets/logos/bytedance.svg',
    anthropic: '../../assets/logos/anthropic.svg',
    claude: '../../assets/logos/claude.svg',
  };
  const src = logos[vendor] || '../../assets/logos/quadcode.svg';
  return `<img class="lg" src="${src}" alt="${vendor}">`;
}

/* ---------- RENDER STEPPER ---------- */
function renderStepper() {
  const container = document.getElementById('stepperContainer');
  container.innerHTML = CONFIG.steps.map(s => {
    const isCurrent = s.n === state.currentStep;
    const isDone = s.n < state.currentStep;
    const isLocked = s.locked;
    return `
      <div class="step-tab ${isCurrent ? 'on' : ''} ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}" data-step="${s.n}">
        <span class="step-num">${isDone ? svg('check', 10) : s.n}</span>
        <span class="step-label" title="${s.title}">${s.shortTitle || s.title}</span>
      </div>
    `;
  }).join('');

  // Wire click handlers for steps (1 through 6)
  container.querySelectorAll('.step-tab').forEach(el => {
    el.addEventListener('click', () => {
      const step = parseInt(el.dataset.step, 10);
      goToStep(step);
    });
  });

  // Prev / Next button state
  document.getElementById('btnPrev').disabled = state.currentStep <= 1;
  document.getElementById('btnPrev').style.opacity = state.currentStep <= 1 ? '0.4' : '1';
  document.getElementById('btnNext').disabled = state.currentStep >= 6;
  document.getElementById('btnNext').style.opacity = state.currentStep >= 6 ? '0.5' : '1';
}

function goToStep(step) {
  state.currentStep = step;
  if (step === 3) {
    state.hasPausedTask = true;
  }
  if (step >= 2 && !state.composerText && step < 3) {
    const defaultPrompt = CONFIG.starterPrompts.find(p => p.id === state.selectedPromptId) || CONFIG.starterPrompts[0];
    state.composerText = defaultPrompt.prompt;
    state.selectedPromptId = defaultPrompt.id;
    state.activeModelId = defaultPrompt.modelId;
  }
  if (step === 6) {
    state.isSubscriber = true;
    if (state.isExitDiscountApplied) {
      state.userBalance = 1188; // 1,200 base - 12 cr spent on task
    } else if (state.selectedPlanForCheckout === 'starter') {
      state.userBalance = 348; // 360 - 12 cr spent on task
    } else {
      state.userBalance = 1428; // 1,440 - 12 cr spent on task
    }
    state.toastVisible = true;
  } else if (step < 6) {
    state.isSubscriber = false;
    state.userBalance = 0;
    state.toastVisible = false;
  }
  state.exitIntentOpen = false;
  renderAll();
}

/* ---------- RENDER RATIONALE STRIP ---------- */
function renderRationale() {
  const strip = document.getElementById('rationaleStrip');
  const stepInfo = CONFIG.steps.find(s => s.n === state.currentStep) || CONFIG.steps[0];
  strip.innerHTML = `
    <div class="rat-left">
      <span class="rat-pill">Active UX State</span>
      <div>
        <div class="rat-title">${stepInfo.title}</div>
        <div class="rat-sub">${stepInfo.subtitle}</div>
      </div>
    </div>
    <div class="rat-why">
      <b>Why:</b> ${stepInfo.rationale}
    </div>
  `;
}

/* ---------- RENDER IDE MOCKUP PIECES ---------- */
function renderTitleBar() {
  const isPaid = state.currentStep === 6;
  const balanceDisplay = isPaid ? `${state.userBalance.toLocaleString('en-US')} credits` : '0 cr';

  return `
    <div class="tb">
      <span class="tb-logo">
        <svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" opacity=".85"/><rect x="1" y="9" width="6" height="6" rx="1.5" opacity=".85"/><rect x="9" y="9" width="6" height="6" rx="1.5" opacity=".6"/></svg>
      </span>
      <span class="proj">sneaker-launch ${svg('down', 10)}</span>
      <span class="tbi">${svg('plus', 12)}</span>
      <span class="ver">Quadcode AI ${CONFIG.version}</span>

      <div class="tb-right">
        <span class="tbi">${svg('play', 12)}</span>
        <span class="tbi">${svg('rocket', 12)}</span>
        <span class="tbi">${svg('git', 12)}</span>
        <span class="tbi">${svg('settings', 12)}</span>
        <span class="toggles"><i></i><i class="on"></i><i class="on"></i><i></i></span>

        <!-- High-visibility balance meter block -->
        <div class="tb-balance-group" title="Current balance & quick top-up">
          <span class="tb-meter-pill ${isPaid ? 'active' : 'zero'}">
            <span class="sparkle">${svg('sparkle', 12)}</span>
            <b id="tbBalanceValue">${balanceDisplay}</b>
          </span>
          ${isPaid ? `
            <span class="badge-subscriber">
              ${svg('check', 10)}
              ${state.selectedPlanForCheckout === 'starter' ? 'Starter Subscriber' : 'Plus Subscriber'}
            </span>
          ` : `
            <button class="btn-get-credits" id="tbBtnGetCredits">
              ${svg('plus', 10)}
              Get credits
              <span class="badge-deal">+20% Gift</span>
            </button>
          `}
        </div>

        <span class="win">
          <i>${svg('winMin', 11)}</i>
          <i>${svg('winMax', 10)}</i>
          <i>${svg('winClose', 11)}</i>
        </span>
      </div>
    </div>
  `;
}

function renderChatFeed() {
  if (state.currentStep === 1) {
    // Step 1: Welcome message from Many with 3 clear starter choices
    return `
      <div class="chat-feed">
        <div class="msg">
          <span class="avatar many">M</span>
          <div class="bub">
            <div class="who">
              <b>Many</b> Team Leader
              <span class="mb">claude-sonnet-5</span>
              <span class="ts">14:00</span>
            </div>
            <p>Welcome to Quadcode AI! You currently have <b>0 credits</b> on your account. Choose how you would like to start:</p>

            <div class="onboard-card">
              <div class="onboard-title">
                <span>Start your first generation</span>
                <span class="badge">Initial balance: 0 cr</span>
              </div>
              <p class="onboard-p">Pick an option below to test the workspace, or describe your prompt directly:</p>

              <div class="onboard-grid">
                ${CONFIG.onboardingOptions.map(opt => `
                  <div class="onboard-item" data-action="${opt.id}">
                    <span class="onboard-item-badge">${opt.badge}</span>
                    <span class="onboard-item-title">${opt.title}</span>
                    <span class="onboard-item-desc">${opt.desc}</span>
                    <span class="btn-onboard-cta">${opt.cta}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (state.currentStep === 2) {
    // Step 2: Empty composer with quick prompt cards selected
    return `
      <div class="chat-feed">
        <div class="msg">
          <span class="avatar many">M</span>
          <div class="bub">
            <div class="who">
              <b>Many</b> Team Leader
              <span class="mb">claude-sonnet-5</span>
              <span class="ts">14:01</span>
            </div>
            <p>Select any quick prompt card below or type your own request into the composer. The cost in credits is shown transparently before sending.</p>
          </div>
        </div>
      </div>
    `;
  }

  // Steps 3, 4, 5: Prompt submitted with 0 credits -> Paused Task preserved in chat
  const activePromptObj = CONFIG.starterPrompts.find(p => p.id === state.selectedPromptId) || CONFIG.starterPrompts[0];
  const userText = state.composerText || activePromptObj.prompt;

  if (state.currentStep <= 5) {
    return `
      <div class="chat-feed">
        <div class="msg">
          <span class="avatar many">M</span>
          <div class="bub">
            <div class="who">
              <b>Many</b> Team Leader
              <span class="mb">claude-sonnet-5</span>
              <span class="ts">14:01</span>
            </div>
            <p>Select any quick prompt card below or type your own request into the composer. The cost in credits is shown transparently before sending.</p>
          </div>
        </div>

        <!-- User prompt message (NOT lost, preserved in history) -->
        <div class="msg user">
          <span class="avatar user">E</span>
          <div class="bub">
            <div class="who">
              <b>${CONFIG.user.name}</b> You
              <span class="ts">14:02</span>
            </div>
            <p>${userText}</p>
          </div>
        </div>

        <!-- Sonic / Lumi / Cody Paused Task Card -->
        <div class="task-card-paused">
          <div class="tcp-header">
            <div class="tcp-agent">
              <span class="tcp-avatar ${activePromptObj.agentId}">${activePromptObj.agentName[0]}</span>
              <span class="tcp-title">${activePromptObj.agentName}: Generating ${activePromptObj.id === 'video' ? 'video' : activePromptObj.id === 'art' ? 'artwork' : 'task'} (${activePromptObj.modelName})</span>
            </div>
            <span class="tcp-status-pill">
              ${svg('pause', 10)}
              Paused · Needs ${activePromptObj.cost} credits to start
            </span>
          </div>

          <div class="tcp-progress-track">
            <div class="tcp-progress-fill"></div>
          </div>

          <div class="tcp-body">
            <div class="tcp-hint">
              <b>Task preserved.</b> It will start automatically once credits are added to your balance.
            </div>
            <button class="tcp-btn-resume" id="btnResumeTask">
              ${svg('plus', 11)}
              Top up credits to resume
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Step 6: Task completed! Render the finished artifact
  return `
    <div class="chat-feed">
      <div class="msg">
        <span class="avatar many">M</span>
        <div class="bub">
          <div class="who">
            <b>Many</b> Team Leader
            <span class="mb">claude-sonnet-5</span>
            <span class="ts">14:01</span>
          </div>
          <p>Select any quick prompt card below or type your own request into the composer. The cost in credits is shown transparently before sending.</p>
        </div>
      </div>

      <!-- User prompt message -->
      <div class="msg user">
        <span class="avatar user">E</span>
        <div class="bub">
          <div class="who">
            <b>${CONFIG.user.name}</b> You
            <span class="ts">14:02</span>
          </div>
          <p>${userText}</p>
        </div>
      </div>

      <!-- Completed Task Card with Output Video Player -->
      <div class="task-card-completed">
        <div class="tcp-header">
          <div class="tcp-agent">
            <span class="tcp-avatar ${activePromptObj.agentId}">${activePromptObj.agentName[0]}</span>
            <span class="tcp-title">${activePromptObj.agentName}: Generated video (${activePromptObj.modelName})</span>
          </div>
          <span class="tcp-status-pill done">
            ${svg('check', 10)}
            Completed · ${activePromptObj.cost} cr spent
          </span>
        </div>

        <!-- Video Player Card -->
        <div class="result-video-card">
          <div class="rv-thumb-wrap">
            <img src="../../assets/content/c1.jpg" alt="Generated neon cyberpunk video">
            <div class="rv-badge-top">720p · Seedance 2.5 Fast</div>
            <button class="rv-play-btn" title="Play preview">${svg('play', 18)}</button>
            <div class="rv-duration">00:05</div>
          </div>
          <div class="rv-info-row">
            <div class="rv-info-left">
              ${svg('check', 11)}
              <span>cyberpunk-neon-drift-720p.mp4</span>
            </div>
            <span class="rv-info-right">Done in 3.8s</span>
          </div>
          <div class="rv-actions-row">
            <button class="btn-rv primary" id="btnPlayVideo">${svg('play', 10)} Play video</button>
            <button class="btn-rv">${svg('send', 10)} Download MP4</button>
            <button class="btn-rv">${svg('rocket', 10)} Upscale 4K</button>
            <button class="btn-rv">${svg('plus', 10)} Extend +5s</button>
          </div>
        </div>

        <!-- Next Steps Card -->
        <div class="next-steps-card">
          <div class="ns-lead">
            <b>Many:</b> Your 5s video rendered cleanly! You have <b>${state.userBalance.toLocaleString('en-US')} credits</b> remaining. Choose your next action:
          </div>
          <div class="ns-chips">
            <span class="ns-chip">${svg('mic', 11)} Add Soundtrack with Sonic <span class="cost">1 cr</span></span>
            <span class="ns-chip">${svg('sparkle', 11)} Character Stills with Nanobanana Pro <span class="cost">2 cr</span></span>
            <span class="ns-chip">${svg('bot', 11)} Write Next Scene with Cody <span class="cost">1 cr</span></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderComposer() {
  const isStep2 = state.currentStep === 2;
  const isStep3to5 = state.currentStep >= 3 && state.currentStep <= 5;
  const isStep6 = state.currentStep === 6;
  const activePromptObj = CONFIG.starterPrompts.find(p => p.id === state.selectedPromptId) || CONFIG.starterPrompts[0];

  let sendCostText = `${activePromptObj.cost} cr`;
  let sendLabelText = 'Generate ·';
  let btnClasses = 'send-btn';

  if (state.currentStep === 1) {
    sendCostText = `${activePromptObj.cost} cr`;
    sendLabelText = 'Generate ·';
  } else if (isStep2) {
    sendCostText = `${activePromptObj.cost} cr`;
    sendLabelText = activePromptObj.id === 'video' ? 'Generate ·' : 'Send ·';
    btnClasses += ' warn';
  } else if (isStep3to5) {
    sendCostText = `Needs ${activePromptObj.cost} cr`;
    sendLabelText = 'Generate ·';
  } else if (isStep6) {
    sendCostText = '12 cr';
    sendLabelText = 'Generate ·';
  }

  return `
    <div class="composer">
      <!-- Quick Prompt Cards (Visible in Step 2) -->
      ${isStep2 ? `
        <div class="quick-cards-row">
          ${CONFIG.starterPrompts.map(p => `
            <div class="qcard ${state.selectedPromptId === p.id ? 'active' : ''}" data-qid="${p.id}">
              <div class="qcard-top">
                <span class="qcard-title">${p.title}</span>
                <span class="qcard-cost">${p.tag}</span>
              </div>
              <span class="qcard-prompt">${p.prompt}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="c-top">
        <span class="agent-chip">
          <span class="avatar">M</span>
          <span class="an">
            <b>Many</b>
            <small>Team Leader</small>
          </span>
          ${svg('caretUp', 9)}
        </span>

        <span class="c-media">
          <span class="chip ${state.activeModelId === 'sd_fast' ? 'on' : ''}">
            ${vendorLogo('bytedance')}
            <span>Seedance 2.5 Fast</span>
            <small>720p</small>
            ${svg('down', 9)}
          </span>
          <span class="chip ${state.activeModelId === 'nb_pro' ? 'on' : ''}">
            ${vendorLogo('gemini')}
            <span>Nanobanana Pro</span>
            <small>2K</small>
            ${svg('down', 9)}
          </span>
          <span class="ico-b">${svg('users', 12)}</span>
        </span>
      </div>

      <div class="text-input ${isStep2 && state.composerText ? '' : 'placeholder'}" id="composerInputArea" contenteditable="true">
        ${isStep2 && state.composerText ? state.composerText : isStep3to5 ? 'Describe a video, artwork or code task...' : 'Describe a video, artwork or code task... (or choose a template above)'}
      </div>

      <div class="crow">
        <span class="ico-b">${svg('plus', 12)}</span>
        <span class="ico-b">${svg('rewind', 12)}</span>
        <span class="tgl">Explore<i class="sw"></i></span>

        <span class="chip">
          ${vendorLogo('claude')}
          <span>Sonnet 5</span>
          ${svg('down', 9)}
        </span>

        <span class="sp"></span>

        <span class="ico-b sq">${svg('mic', 12)}</span>

        <button class="${btnClasses}" id="btnComposerSend">
          <span>${sendLabelText}</span>
          <span class="cost-pill">${sendCostText}</span>
          ${isStep3to5 ? svg('pause', 10) : svg('send', 10)}
        </button>
      </div>
    </div>
  `;
}

function renderActionsPanel() {
  const isStep3to5 = state.currentStep >= 3 && state.currentStep <= 5;
  const isStep6 = state.currentStep === 6;
  const activePromptObj = CONFIG.starterPrompts.find(p => p.id === state.selectedPromptId) || CONFIG.starterPrompts[0];

  const sonicPaused = isStep3to5 && activePromptObj.agentId === 'sonic';
  const lumiPaused = isStep3to5 && activePromptObj.agentId === 'lumi';
  const codyPaused = isStep3to5 && activePromptObj.agentId === 'cody';

  return `
    <div class="subreq">
      <b>Sub-agent Requests</b>
      <span class="mchip">${vendorLogo('gemini')} gemini-3.8-flash ${svg('down', 8)}</span>
      <span class="mchip">${vendorLogo('claude')} Claude Code ${svg('down', 8)}</span>
    </div>

    <div class="actions-feed">
      <div class="acard ${sonicPaused ? 'paused' : isStep6 ? 'idle' : 'idle'}">
        <span class="ac-av sonic">S</span>
        <div class="acard-info">
          <b>Sonic</b> · Motion &amp; Video
          <small>${sonicPaused ? `Paused · Waiting for ${activePromptObj.cost} credits` : isStep6 ? 'Completed · 12 cr spent' : 'Waiting for prompt or template'}</small>
        </div>
        <span class="acard-status ${sonicPaused ? 'paused' : ''}">
          ${sonicPaused ? svg('pause', 10) + ' Paused' : isStep6 ? svg('check', 10) + ' Done' : 'Idle'}
        </span>
      </div>

      <div class="acard ${lumiPaused ? 'paused' : 'idle'}">
        <span class="ac-av lumi">L</span>
        <div class="acard-info">
          <b>Lumi</b> · Visual Design
          <small>${lumiPaused ? `Paused · Waiting for ${activePromptObj.cost} credits` : 'Waiting for prompt or template'}</small>
        </div>
        <span class="acard-status ${lumiPaused ? 'paused' : ''}">
          ${lumiPaused ? svg('pause', 10) + ' Paused' : 'Idle'}
        </span>
      </div>

      <div class="acard ${codyPaused ? 'paused' : 'idle'}">
        <span class="ac-av cody">C</span>
        <div class="acard-info">
          <b>Cody</b> · Code Engineer
          <small>${codyPaused ? `Paused · Waiting for ${activePromptObj.cost} credits` : 'Ready to build'}</small>
        </div>
        <span class="acard-status ${codyPaused ? 'paused' : ''}">
          ${codyPaused ? svg('pause', 10) + ' Paused' : 'Idle'}
        </span>
      </div>
    </div>
  `;
}

function renderStatusBar() {
  const isStep3to5 = state.currentStep >= 3 && state.currentStep <= 5;
  const isStep6 = state.currentStep === 6;

  let statusText = 'IDE Workspace Ready';
  if (isStep3to5) statusText = '1 task paused · Waiting for balance';
  if (isStep6) statusText = `Active · ${state.userBalance} cr · Plus Subscriber`;

  return `
    <div class="sb">
      <span class="dot ${isStep3to5 ? 'idle' : ''}"></span>
      <span>${statusText}</span>
      <span>·</span>
      <span>Preset: Creator (White)</span>
      <span class="sb-right">
        <span>Contact us ${svg('caretUp', 8)}</span>
        <span class="user-pill">
          <span class="av-sm">E</span>
          <span>${CONFIG.user.name}</span>
          <span class="cr-badge" style="${isStep6 ? 'background:#ecfdf5;color:#047857' : ''}">${isStep6 ? `${state.userBalance} cr` : '0 cr'}</span>
          ${svg('caretUp', 8)}
        </span>
      </span>
    </div>
  `;
}

/* ---------- STEP 4: WELCOME SHEET ---------- */
function renderWelcomeSheet() {
  if (state.currentStep !== 4) return '';

  const countdown = getCountdownState();
  const activePromptObj = CONFIG.starterPrompts.find(p => p.id === state.selectedPromptId) || CONFIG.starterPrompts[0];
  const userText = state.composerText || activePromptObj.prompt;
  const hasPausedTask = state.hasPausedTask;

  const plusPlan = CONFIG.welcomeOffer.plans.plus;
  const starterPlan = CONFIG.welcomeOffer.plans.starter;

  const isAnnual = state.sheetBilling === 'annual';
  const plusMonthlyRate = isAnnual ? plusPlan.annualMonthlyPrice : plusPlan.monthlyPrice; // 47 vs 59
  const plusDueToday = isAnnual ? 564 : 59;
  const starterMonthlyRate = isAnnual ? starterPlan.annualMonthlyPrice : starterPlan.monthlyPrice; // 15 vs 20
  const starterDueToday = isAnnual ? 180 : 20;

  return `
    <div class="sheet-backdrop" id="welcomeSheetBackdrop">
      <div class="sheet-panel">
        <div class="sheet-inner">
          <div class="sheet-header">
            <div class="sheet-title-group">
              <span class="sheet-sparkle-mark">${svg('sparkle', 14)}</span>
              <div class="sheet-title">
                <span>${hasPausedTask ? 'Unlock your generation' : 'Welcome to Quadcode AI'}</span>
                <span class="sheet-title-badge">${hasPausedTask ? 'Welcome Gift: +20% Extra Credits' : 'Choose your plan with +20% Welcome Gift'}</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px">
              <span class="sheet-timer-badge" id="sheetTimerBadge">
                ${svg('clock', 12)}
                <span id="sheetTimerText">${countdown.text}</span>
              </span>
              <button class="sheet-close-btn" id="btnSheetClose" title="Close sheet">
                ${svg('winClose', 12)}
              </button>
            </div>
          </div>

          <!-- Task Teaser -->
          <div class="sheet-teaser">
            <div class="sheet-teaser-left">
              ${hasPausedTask ? `
                <span class="sheet-shortfall-pill">Task paused · Needs ${activePromptObj.cost} cr</span>
                <span class="sheet-prompt-snippet"><b>${activePromptObj.modelName}:</b> "${userText}"</span>
              ` : `
                <span class="sheet-shortfall-pill" style="background:#fff7ed;color:#c2410c;border-color:#fed7aa">Welcome Offer</span>
                <span class="sheet-prompt-snippet">Choose your plan with +20% Welcome Gift · Fast video, concept art and code agents ready</span>
              `}
            </div>
            <span style="font-family:var(--mono);font-size:11px;color:#6b7280">Current balance: <b>0 cr</b></span>
          </div>

          <!-- Billing Period Switcher (Monthly | Annual) -->
          <div class="sheet-billing-row">
            <div class="sheet-billing-toggle">
              <button class="sheet-bill-btn ${!isAnnual ? 'on' : ''}" id="btnBillMonthly">
                Monthly
              </button>
              <button class="sheet-bill-btn ${isAnnual ? 'on' : ''}" id="btnBillAnnual">
                Annual
                <span class="sheet-bill-save-badge">Up to 25% OFF</span>
              </button>
            </div>
            <div class="sheet-billing-summary-hint">
              ${isAnnual
                ? `<b>Annual billing:</b> Plus $564/yr ($47/mo) · Starter $180/yr ($15/mo) · billed today`
                : `<b>Monthly billing:</b> Plus $59/mo · Starter $20/mo · cancel anytime`}
            </div>
          </div>

          <!-- 2 Plans Grid -->
          <div class="sheet-plans-grid">
            <!-- Plus Plan (Recommended) -->
            <div class="sheet-plan-card rec">
              <span class="sheet-plan-rec-badge">Recommended · Best Value</span>
              <div class="sheet-plan-head">
                <span class="sheet-plan-name">${plusPlan.name}</span>
                <span class="sheet-plan-credits">${countdown.expired ? '1,200 credits' : `${plusPlan.totalCredits.toLocaleString('en-US')} credits`} <small style="font-size:10px;color:#6b7280">${countdown.expired ? '(standard)' : `(${plusPlan.baseCredits.toLocaleString('en-US')} + ${plusPlan.bonusCredits} bonus)`}</small></span>
              </div>
              <div class="sheet-plan-price-wrap">
                <span class="sheet-plan-price">$${plusMonthlyRate}</span>
                <span class="sheet-plan-price-sub">/ month · <b>$${plusDueToday} billed today</b> ${isAnnual ? '<span class="sheet-plan-save-tag">save $144</span>' : ''}</span>
              </div>
              <ul class="sheet-plan-perks">
                <li>${svg('check', 12)} ${countdown.expired ? '1,200 credits monthly' : '1,440 credits immediately (~120 video gens)'}</li>
                <li>${svg('check', 12)} Full access to Seedance 2.5 &amp; Nanobanana Pro</li>
                <li>${svg('check', 12)} 7 days unlimited on Nanobanana 2</li>
              </ul>
              <button class="btn-sheet-checkout primary" id="btnChoosePlus">
                ${countdown.expired
                  ? (isAnnual ? 'Get Plus Annual · $564/yr' : 'Get Plus Plan · $59/mo')
                  : (isAnnual ? 'Get Plus with +20% Bonus · $564/yr' : 'Get Plus with +20% Bonus · $59/mo')}
                ${svg('send', 10)}
              </button>
            </div>

            <!-- Starter Plan -->
            <div class="sheet-plan-card">
              <div class="sheet-plan-head">
                <span class="sheet-plan-name">${starterPlan.name}</span>
                <span class="sheet-plan-credits">${countdown.expired ? '300 credits' : `${starterPlan.totalCredits} credits`} <small style="font-size:10px;color:#6b7280">${countdown.expired ? '(standard)' : `(${starterPlan.baseCredits} + ${starterPlan.bonusCredits} bonus)`}</small></span>
              </div>
              <div class="sheet-plan-price-wrap">
                <span class="sheet-plan-price">$${starterMonthlyRate}</span>
                <span class="sheet-plan-price-sub">/ month · <b>$${starterDueToday} billed today</b> ${isAnnual ? '<span class="sheet-plan-save-tag">save $60</span>' : ''}</span>
              </div>
              <ul class="sheet-plan-perks">
                <li>${svg('check', 12)} ${countdown.expired ? '300 credits monthly' : '360 credits immediately (~30 video gens)'}</li>
                <li>${svg('check', 12)} Access to Seedance 2.5 Fast &amp; Nanobanana 2</li>
                <li>${svg('check', 12)} Standard generation speed queue</li>
              </ul>
              <button class="btn-sheet-checkout secondary" id="btnChooseStarter">
                ${countdown.expired
                  ? (isAnnual ? 'Get Starter Annual · $180/yr' : 'Get Starter Plan · $20/mo')
                  : (isAnnual ? 'Get Starter with +20% Bonus · $180/yr' : 'Get Starter with +20% Bonus · $20/mo')}
                ${svg('send', 10)}
              </button>
            </div>
          </div>

          <!-- Trust Row -->
          <div class="sheet-trust-row">
            <div class="sheet-trust-left">
              ${svg('shieldCheck', 12)}
              <span>Secure checkout powered by Stripe · Cancel anytime in Settings in 1 click · No hidden fees</span>
            </div>
            <div class="sheet-trust-badges">
              <span>Apple Pay</span>
              <span>Bank payment</span>
              <span>Cards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- STEP 5: IN-APP CHECKOUT MODAL (SCENE 11) ---------- */
function renderCheckoutModal() {
  if (state.currentStep !== 5) return '';

  const isPlus = state.selectedPlanForCheckout === 'plus';
  const isAnnual = state.selectedBilling === 'annual';
  const exitCd = getExitCountdownState();
  const isExit = isPlus && state.isExitDiscountApplied && !exitCd.expired;

  let planTitle = isAnnual ? 'Upgrade to Plus Plan (Annual)' : 'Upgrade to Plus Plan';
  let planCredits = 1440;
  let dueToday = isAnnual ? 564 : 59;
  let renewalText = isAnnual
    ? 'Renews at $564/year until you cancel. Cancel anytime in Settings.'
    : 'Renews at $59/mo until you cancel. Cancel anytime in Settings.';
  let payCtaText = `Pay $${dueToday}.00`;
  let renewDate = isAnnual ? 'Oct 7, 2027' : 'Nov 7, 2026';

  if (!isPlus) {
    planTitle = isAnnual ? 'Upgrade to Starter Plan (Annual)' : 'Upgrade to Starter Plan';
    planCredits = 360;
    dueToday = isAnnual ? 180 : 20;
    renewalText = isAnnual
      ? 'Renews at $180/year until you cancel. Cancel anytime in Settings.'
      : 'Renews at $20/mo until you cancel. Cancel anytime in Settings.';
    payCtaText = `Pay $${dueToday}.00`;
  } else if (isExit) {
    planTitle = 'Upgrade to Plus (Introductory Deal)';
    planCredits = 1200;
    dueToday = 22;
    renewalText = '$22 for the first month, then $59/mo · Cancel anytime in Settings.';
    payCtaText = 'Pay $22.00';
    renewDate = 'Nov 7, 2026';
  }

  return `
    <div class="checkout-sheet-backdrop" id="checkoutBackdrop">
      <div class="checkout-modal-card">
        <div class="ck-head">
          <div class="ck-kick">
            <span class="mk">Q</span>
            <span>Checkout</span>
            <span class="tm">${svg('lock', 10)} Stripe</span>
          </div>
          <button class="sheet-close-btn" id="btnCheckoutClose" title="Close checkout">
            ${svg('winClose', 12)}
          </button>
        </div>

        <div class="ck-title">${planTitle}</div>

        <!-- Summary Box -->
        <div class="ck-sum">
          <div class="row">
            <span>${isPlus ? 'Plus' : 'Starter'} · ${isAnnual && !isExit ? 'annual (12 months)' : 'monthly'} · ${planCredits.toLocaleString('en-US')} credits</span>
            <b>$${isAnnual && !isExit ? (isPlus ? '564.00' : '180.00') : (isPlus ? '59.00' : '20.00')}</b>
          </div>
          ${isExit ? `
            <div class="row bonus">
              <span>First month introductory discount (−62%)</span>
              <b>−$37.00</b>
            </div>
          ` : `
            <div class="row bonus">
              <span>Welcome Gift: +20% bonus credits</span>
              <b>Included</b>
            </div>
          `}
          <div class="row tot">
            <span>Total due today</span>
            <b>$${dueToday}.00</b>
          </div>
          <div class="row dim">
            <span>New cycle starts today · Renews on ${renewDate}</span>
            <span>cancel anytime</span>
          </div>
        </div>

        <div class="ck-keep">
          ${svg('check', 12)}
          <span>+${planCredits.toLocaleString('en-US')} credits immediately · ${state.hasPausedTask ? 'your paused task runs on payment' : 'start creating right away'}</span>
        </div>

        <!-- Wallets row 1:1 like Scene 11 -->
        <div class="ck-wallets">
          <button class="w ap" id="btnApplePay">Apple Pay</button>
          <button class="w bk" id="btnBankPay">Bank payment</button>
        </div>

        <div class="ck-or">or pay by card</div>

        <!-- Stripe Card Element -->
        <div class="ck-card">
          <span>${svg('card', 12)} 4242 ···· ···· 4242</span>
          <span>12 / 28</span>
          <span>CVC</span>
        </div>

        <div class="ck-opt">
          <i class="sw"></i>
          <span>${isPlus ? 'Auto-refill 720 credits ($40) under 10% · off' : 'Auto-refill 360 credits ($20) under 10% · off'}</span>
        </div>

        <!-- Explicit renewal terms directly above payment button -->
        <div class="ck-renewal-terms">${renewalText}</div>

        <button class="btn-pay-now" id="btnExecutePayment">
          ${payCtaText}
          ${svg('lock', 11)}
        </button>

        <div class="ck-legal">
          USD incl. VAT · cancel anytime in Settings → My Subscription · <u>Pay in browser</u>
        </div>
      </div>
    </div>
  `;
}

/* ---------- ITEM 7: EXIT-INTENT MODAL (-62% OFFER) ---------- */
function renderExitIntentModal() {
  if (!state.exitIntentOpen) return '';

  const exitCd = getExitCountdownState();
  if (exitCd.expired) return '';

  const exitOffer = CONFIG.exitIntentOffer;

  return `
    <div class="exit-modal-backdrop" id="exitModalBackdrop">
      <div class="exit-modal-panel">
        <div class="exit-eyebrow-row">
          <span class="exit-badge">Special Welcome Deal · Limited Window</span>
          <span class="exit-timer-pill" id="exitTimerText">
            ${svg('clock', 12)}
            <span>${exitCd.text}</span>
          </span>
        </div>

        <div class="exit-headline">Don't leave your generation paused</div>
        <p class="exit-lead">
          Unlock your task right now with 62% OFF your first month of Plus. Keep your prompt, skip the wait.
        </p>

        <div class="exit-offer-box">
          <div class="exit-price-main">$${exitOffer.priceFirstMonth} for your first month <s>$${exitOffer.regularMonthlyPrice}</s> · ${exitOffer.discountPct}% off, then $${exitOffer.regularMonthlyPrice}/mo</div>
          <div class="exit-price-sub">Save $37 on month 1 (regular price $59/mo) · 1,200 cr immediately</div>
        </div>

        <div class="exit-actions">
          <button class="btn-claim-exit" id="btnClaimExit">
            Claim 62% OFF & Unlock Generation · $${exitOffer.priceFirstMonth}
            ${svg('send', 10)}
          </button>
          <button class="btn-dismiss-exit" id="btnDismissExit">
            No thanks, return to workspace
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---------- STEP 6: SUCCESS TOAST ---------- */
function renderSuccessToast() {
  if (state.currentStep !== 6 || !state.toastVisible) return '';
  const isPlus = state.selectedPlanForCheckout === 'plus';
  const isExit = state.isExitDiscountApplied;
  const creditsAdded = isExit ? '1,200' : (isPlus ? '1,440' : '360');

  return `
    <div class="qc-toast-wrap">
      <div class="qc-toast">
        <span class="qc-toast-icon">${svg('check', 14)}</span>
        <div class="qc-toast-body">
          <b>+${creditsAdded} credits added to your account</b>
          <span>${isExit ? 'Introductory offer applied (−62% first month · 1,200 credits)' : 'Welcome bonus applied (+20% bonus credits credited)'}</span>
        </div>
      </div>
    </div>
  `;
}

function renderAppMockup() {
  const frame = document.getElementById('appFrame');
  frame.innerHTML = `
    <div class="app">
      ${renderTitleBar()}
      <div class="body">
        <div class="left">
          <div class="ptabs">
            <span class="on">${svg('bot', 11)} Chat</span>
            <span>History</span>
            <span>Console</span>
            <span>Files</span>
          </div>
          ${renderChatFeed()}
          ${renderComposer()}
        </div>
        <div class="center">
          <div class="ptabs">
            <span class="on">Actions</span>
            <span>File editors</span>
            <span>Meta editors</span>
            <span>App Builder</span>
          </div>
          ${renderActionsPanel()}
        </div>
      </div>
      ${renderStatusBar()}
      ${renderWelcomeSheet()}
      ${renderCheckoutModal()}
      ${renderExitIntentModal()}
      ${renderSuccessToast()}
    </div>
  `;

  wireMockupEvents();
}

/* ---------- WIRE INTERACTIVE EVENTS ---------- */
function handleCloseWelcomeSheet() {
  const exitCd = getExitCountdownState();
  const alreadyShown = sessionStorage.getItem(EXIT_SHOWN_SESSION_KEY);
  if (!alreadyShown && !exitCd.expired && state.hasPausedTask) {
    sessionStorage.setItem(EXIT_SHOWN_SESSION_KEY, 'true');
    state.exitIntentOpen = true;
    renderAll();
  } else {
    state.exitIntentOpen = false;
    goToStep(state.hasPausedTask ? 3 : 1);
  }
}

function wireMockupEvents() {
  // "+ Get credits" in Title bar
  const btnGetCr = document.getElementById('tbBtnGetCredits');
  if (btnGetCr) {
    btnGetCr.addEventListener('click', () => {
      goToStep(4);
    });
  }

  // Onboarding action cards in Chat (Step 1)
  document.querySelectorAll('.onboard-item').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.dataset.action;
      if (action === 'welcome_deal') {
        goToStep(4);
      } else {
        state.selectedPromptId = 'video';
        const pObj = CONFIG.starterPrompts[0];
        state.composerText = pObj.prompt;
        state.activeModelId = pObj.modelId;
        goToStep(2);
      }
    });
  });

  // Quick prompt cards in Composer (Step 2)
  document.querySelectorAll('.qcard').forEach(el => {
    el.addEventListener('click', () => {
      const qid = el.dataset.qid;
      const promptObj = CONFIG.starterPrompts.find(p => p.id === qid);
      if (promptObj) {
        state.selectedPromptId = qid;
        state.composerText = promptObj.prompt;
        state.activeModelId = promptObj.modelId;
        renderAll();
      }
    });
  });

  // Composer send button
  const btnSend = document.getElementById('btnComposerSend');
  if (btnSend) {
    btnSend.addEventListener('click', () => {
      state.hasPausedTask = true;
      if (state.currentStep === 1) {
        const pObj = CONFIG.starterPrompts[0];
        state.composerText = pObj.prompt;
        state.selectedPromptId = pObj.id;
        state.activeModelId = pObj.modelId;
        goToStep(3);
      } else if (state.currentStep === 2) {
        if (!state.composerText) {
          const pObj = CONFIG.starterPrompts.find(p => p.id === state.selectedPromptId) || CONFIG.starterPrompts[0];
          state.composerText = pObj.prompt;
        }
        goToStep(3);
      } else if (state.currentStep >= 3 && state.currentStep <= 5) {
        goToStep(4);
      }
    });
  }

  // Resume / Top-up button in paused chat task card
  const btnResume = document.getElementById('btnResumeTask');
  if (btnResume) {
    btnResume.addEventListener('click', () => {
      goToStep(4);
    });
  }

  // Sheet close button (Step 4 -> Item 7: Exit Intent on first close)
  const btnSheetClose = document.getElementById('btnSheetClose');
  if (btnSheetClose) {
    btnSheetClose.addEventListener('click', () => {
      handleCloseWelcomeSheet();
    });
  }

  const welcomeSheetBackdrop = document.getElementById('welcomeSheetBackdrop');
  if (welcomeSheetBackdrop) {
    welcomeSheetBackdrop.addEventListener('click', (e) => {
      if (e.target === welcomeSheetBackdrop) {
        handleCloseWelcomeSheet();
      }
    });
  }

  // Sheet billing switcher (Monthly | Annual)
  const btnBillMonthly = document.getElementById('btnBillMonthly');
  if (btnBillMonthly) {
    btnBillMonthly.addEventListener('click', () => {
      state.sheetBilling = 'monthly';
      renderAll();
    });
  }

  const btnBillAnnual = document.getElementById('btnBillAnnual');
  if (btnBillAnnual) {
    btnBillAnnual.addEventListener('click', () => {
      state.sheetBilling = 'annual';
      renderAll();
    });
  }

  // Sheet checkout CTA buttons (Step 4 -> Step 5)
  const btnPlus = document.getElementById('btnChoosePlus');
  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      state.selectedPlanForCheckout = 'plus';
      state.selectedBilling = state.sheetBilling;
      state.isExitDiscountApplied = false;
      goToStep(5);
    });
  }

  const btnStarter = document.getElementById('btnChooseStarter');
  if (btnStarter) {
    btnStarter.addEventListener('click', () => {
      state.selectedPlanForCheckout = 'starter';
      state.selectedBilling = state.sheetBilling;
      state.isExitDiscountApplied = false;
      goToStep(5);
    });
  }

  // Exit-Intent Modal Actions
  const btnClaimExit = document.getElementById('btnClaimExit');
  if (btnClaimExit) {
    btnClaimExit.addEventListener('click', () => {
      state.selectedPlanForCheckout = 'plus';
      state.isExitDiscountApplied = true;
      state.exitIntentOpen = false;
      goToStep(5);
    });
  }

  const btnDismissExit = document.getElementById('btnDismissExit');
  if (btnDismissExit) {
    btnDismissExit.addEventListener('click', () => {
      state.exitIntentOpen = false;
      goToStep(3);
    });
  }

  const exitModalBackdrop = document.getElementById('exitModalBackdrop');
  if (exitModalBackdrop) {
    exitModalBackdrop.addEventListener('click', (e) => {
      if (e.target === exitModalBackdrop) {
        state.exitIntentOpen = false;
        goToStep(3);
      }
    });
  }

  // In-App Checkout Modal Actions (Step 5 -> Step 6)
  const btnExecutePayment = document.getElementById('btnExecutePayment');
  if (btnExecutePayment) {
    btnExecutePayment.addEventListener('click', () => {
      goToStep(6);
    });
  }

  const btnApplePay = document.getElementById('btnApplePay');
  if (btnApplePay) {
    btnApplePay.addEventListener('click', () => {
      goToStep(6);
    });
  }

  const btnBankPay = document.getElementById('btnBankPay');
  if (btnBankPay) {
    btnBankPay.addEventListener('click', () => {
      goToStep(6);
    });
  }

  const btnCheckoutClose = document.getElementById('btnCheckoutClose');
  if (btnCheckoutClose) {
    btnCheckoutClose.addEventListener('click', () => {
      goToStep(4);
    });
  }

  // Video play button feedback in Step 6
  const btnPlayVideo = document.getElementById('btnPlayVideo');
  if (btnPlayVideo) {
    btnPlayVideo.addEventListener('click', () => {
      alert('Playing 720p cyberpunk video preview generated by Sonic with Seedance 2.5 Fast!');
    });
  }
}

/* ---------- ALL STATES AUDIT BOARD (20 STATES: 14 LIFECYCLE + 6 TOP-UP) ---------- */
function renderStateCard(st) {
  const hasPlay = st.playStep !== null;
  const stripeClass = `stripe-${st.stripe || 'orange'}`;
  return `
    <div class="state-card ${stripeClass}" data-state-id="${st.id}">
      <!-- Head: Russian PO Analytics -->
      <div class="state-card-head">
        <div class="state-card-title-group">
          <div class="state-card-num-title">${st.name}</div>
          <div class="state-card-sub">${st.sub || ''}</div>
        </div>
        <span class="state-card-badge ${st.badgeType}">${st.badge}</span>
      </div>

      <!-- Section 1: Title Bar Appearance (Preview EN, Action RU) -->
      <div class="state-section">
        <span class="state-sec-label">${svg('settings', 10)} Интерфейс: шапка и баланс</span>
        <div class="state-mini-tb">
          <div class="state-mini-tb-left">
            <span class="mini-meter ${st.titleBar.meterClass}">
              <span style="color:#f59e0b">${svg('sparkle', 11)}</span>
              <b>${st.titleBar.meterText}</b>
            </span>
          </div>
          <div class="state-mini-tb-right">
            <span class="mini-tb-btn ${st.titleBar.btnClass}">
              ${svg('plus', 9)}
              ${st.titleBar.btnText}
              ${st.titleBar.btnBadge ? `<span class="mini-tb-badge">${st.titleBar.btnBadge}</span>` : ''}
            </span>
          </div>
        </div>
        <small class="state-desc-line">${st.titleBar.actionDesc}</small>
      </div>

      <!-- Section 2: Main UI & Action Button (Preview EN, Trigger RU) -->
      <div class="state-section">
        <span class="state-sec-label">${svg('send', 10)} Интерфейс: чат и кнопка запуска</span>
        <div class="state-mini-action-row">
          <div class="state-action-desc">
            <div><b>Composer:</b> ${st.composerChat.composerDesc}</div>
          </div>
          <span class="state-mini-btn-preview ${st.composerChat.sendBtn.btnClass}">
            ${st.composerChat.sendBtn.dotWarn ? '<span class="dot-amber"></span>' : ''}
            ${st.composerChat.sendBtn.label}
            ${svg('send', 9)}
          </span>
        </div>
        <small class="state-desc-line"><b>Триггер:</b> ${st.composerChat.sendBtn.hint.replace(/^Триггер:\s*/, '')}</small>
      </div>

      <!-- Section 3: Active Promotional Offer (Warm Box vs Compact No-Offer Strip) -->
      <div class="state-section">
        <span class="state-sec-label">${svg('clock', 10)} Активный оффер и окно действия</span>
        ${st.activeOffer.isNoOffer ? `
          <div class="state-no-offer-strip">
            <span class="no-offer-ico">${svg('shieldCheck', 12)}</span>
            <span class="no-offer-txt">Без промо-оффера · базовый тариф</span>
          </div>
        ` : `
          <div class="state-offer-box">
            <div class="state-offer-head">
              <span class="state-offer-name">${svg('sparkle', 11)} <b>${st.activeOffer.name}</b></span>
              <span class="state-offer-timer">${svg('clock', 10)} ${st.activeOffer.offerBadge || st.activeOffer.duration}</span>
            </div>
            <div class="state-offer-terms">${st.activeOffer.terms}</div>
          </div>
        `}
      </div>

      <!-- Card Footer: Unified Height & Alignment -->
      <div class="state-card-footer">
        <span class="state-coverage-pill"><b>Покрытие:</b> ${st.coverage}</span>
        ${hasPlay ? `
          <button class="btn-play-state" data-play-step="${st.playStep}">
            ${svg('play', 10)}
            Play (Шаг ${st.playStep})
          </button>
        ` : `
          <span class="state-ref-only">Сценарий вне потока</span>
        `}
      </div>
    </div>
  `;
}

const TRACKS = [
  {
    id: 'newbie',
    title: 'Дорожка 1: Новичок с 0 (онбординг и барьер оплаты)',
    badge: 'Состояния 1–5 · Онбординг и первый запуск',
    icon: 'bot',
    borderColor: 'var(--orange)',
  },
  {
    id: 'first_purchase',
    title: 'Дорожка 2: Первая покупка (C1, чекаут и ошибки)',
    badge: 'Состояния 6–7 · Конверсия в оплату и восстановление',
    icon: 'shieldCheck',
    borderColor: '#10b981',
  },
  {
    id: 'subscriber',
    title: 'Дорожка 3: Подписчик (ретеншен и пороги баланса)',
    badge: 'Состояния 8–9 · Жизненный цикл и предупреждения',
    icon: 'clock',
    borderColor: '#f59e0b',
  },
  {
    id: 'topup',
    title: 'Дорожка 4: Пополнение токенов (паки, авто-рефилл, 90 дней)',
    badge: 'Состояния 10–14 · Магазин и допродажи (только для подписчиков)',
    icon: 'card',
    borderColor: '#2563eb',
  },
  {
    id: 'churn_return',
    title: 'Дорожка 5: Уход и возврат (триал, отмена подписки, реактивация)',
    badge: 'Состояния 15–17 · Удержание оттока и реактивация',
    icon: 'rewind',
    borderColor: '#8b5cf6',
  },
];

function renderStatesBoard() {
  const container = document.getElementById('statesGrid');
  if (!container) return;

  let html = '';
  TRACKS.forEach((track, idx) => {
    const statesInTrack = CONFIG.lifecycleStates.filter(st => st.track === track.id);
    const marginTopStyle = idx > 0 ? 'margin-top:24px;' : '';
    html += `
      <div class="states-group-header" style="${marginTopStyle}border-left-color:${track.borderColor}">
        <div class="states-group-title">
          ${svg(track.icon, 14)}
          <span>${track.title}</span>
        </div>
        <span class="states-group-badge">${track.badge}</span>
      </div>
    `;
    html += statesInTrack.map(renderStateCard).join('');
  });

  container.innerHTML = html;

  // Wire Play buttons on cards
  container.querySelectorAll('.btn-play-state').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.playStep, 10);
      switchMode('newbie');
      goToStep(step);
    });
  });

  renderOffersLadder();
}

const OFFERS_LADDER = [
  {
    step: 'День 0–7 · Онбординг',
    name: '1. Welcome Gift (+20% Extra Credits)',
    target: 'Новые пользователи с 0 покупок',
    trigger: 'Первый запуск IDE / попытка генерации с 0 cr',
    duration: '7 суток (168 часов)',
    discount: '+20% кредитов на первую покупку (Plus 1,440 cr за $59, Starter 360 cr за $20)',
    afterExpire: 'Базовые условия без бонуса (Plus = 1,200 cr)',
    frequency: 'Постоянный бейдж в Title bar 7 дней (честный таймер)',
    sceneId: 'welcome',
    sceneName: 'Сцена 14: Welcome Gift',
    playStep: 4,
    badgeColor: 'var(--orange)',
  },
  {
    step: 'День 0–7 · Чекаут',
    name: '2. Exit-Intent Abandoned Checkout (−62%)',
    target: 'Новички, закрывшие чекаут без оплаты',
    trigger: 'Клик на крестик или закрытие шита чекаута',
    duration: '8 минут (синхронный обратный отсчет)',
    discount: 'Скидка −62% на первый месяц ($22 вместо $59 на Plus)',
    afterExpire: 'Блокируется навсегда; возврат к Welcome Gift',
    frequency: '1 раз на аккаунт; не повторяется',
    sceneId: 'personal-offer',
    sceneName: 'Сцена 5: Exit-Intent 62%',
    playStep: 5,
    badgeColor: '#ef4444',
  },
  {
    step: 'День 8+ · Без покупок',
    name: '3. 24-Hour Flash Sale (−40% Starter)',
    target: 'Установили 8+ дней назад, 0 покупок, ≥3 сессий',
    trigger: 'Начало 8-х суток с момента первого запуска (Welcome истёк)',
    duration: '24 часа (честный таймер)',
    discount: 'Starter Annual за $108/год ($9/мес вместо $15/мес, скидка 40%)',
    afterExpire: 'Стандартная цена Starter Annual ($180/год)',
    frequency: '1 раз за всё время жизни аккаунта',
    sceneId: 'model-gate',
    sceneName: 'Сцена 1: Каталог цен',
    playStep: null,
    badgeColor: '#f59e0b',
  },
  {
    step: 'День 10–25 · Подписчик',
    name: '4. Mid-Month Rescue (Auto-Refill Trial)',
    target: 'Активные подписчики с балансом < 10% (>10 дней до продления)',
    trigger: 'Баланс упал ниже 10% (или < 50 cr)',
    duration: '48 часов',
    discount: '+20% бонусных кредитов к первому авто-пополнению ($1 = 22 cr вместо 18 cr) или паку (+20% cr)',
    afterExpire: 'Стандартный курс авто-рефилла ($1 = 18 cr)',
    frequency: 'Не чаще 1 раза за расчетный месяц',
    sceneId: 'out-of-credits',
    sceneName: 'Сцена 2 & 23: Нехватка кредитов / Auto-refill',
    playStep: 3,
    badgeColor: '#10b981',
  },
  {
    step: 'При отмене · Отток',
    name: '5. Churn Save-Flow (25% OFF на 2 мес)',
    target: 'Подписчики, нажавшие «Cancel Subscription»',
    trigger: 'Клик «Cancel Subscription» в Settings → My Subscription (1 экран по закону)',
    duration: 'До закрытия модалки удержания',
    discount: 'Скидка 25% на 2 месяца (Plus за $44.25/mo вместо $59/mo, экономия $29.50)',
    afterExpire: 'Подписка отменяется со списанием в конце оплаченного срока',
    frequency: 'Не чаще 1 раза в 6 месяцев',
    sceneId: 'win-back',
    sceneName: 'Сцена 8 & 20: 1-экранный Save-flow',
    playStep: null,
    badgeColor: '#8b5cf6',
  },
  {
    step: 'День 14+ паузы · Возврат',
    name: '6. Win-Back Inactive (+30% Credits)',
    target: 'Пользователи без сессий 14+ дней',
    trigger: 'Запуск приложения после длительного отсутствия',
    duration: '72 часа (честный таймер)',
    discount: 'Бонус +30% кредитов на первый месяц при реактивации подписки',
    afterExpire: 'Стандартные тарифные сетки без бонусов',
    frequency: 'Не чаще 1 раза в квартал',
    sceneId: 'reactivation',
    sceneName: 'Сцена 18: Реактивация',
    playStep: null,
    badgeColor: '#0ea5e9',
  },
];

function renderOffersLadder() {
  const container = document.getElementById('offersLadderGrid');
  if (!container) return;

  container.innerHTML = OFFERS_LADDER.map(o => `
    <div class="offer-ladder-card" style="border-left-color:${o.badgeColor}">
      <div class="olc-head">
        <span class="olc-step-badge" style="color:${o.badgeColor};background:${o.badgeColor}18">${o.step}</span>
        <span class="olc-dur-badge">${svg('clock', 11)} ${o.duration}</span>
      </div>
      <div class="olc-name">${o.name}</div>
      <div class="olc-discount">${o.discount}</div>
      <div class="olc-details">
        <div><dt>Кому:</dt> <dd>${o.target}</dd></div>
        <div><dt>Триггер:</dt> <dd>${o.trigger}</dd></div>
        <div><dt>После истечения:</dt> <dd>${o.afterExpire}</dd></div>
        <div><dt>Частота:</dt> <dd>${o.frequency}</dd></div>
      </div>
      <div class="olc-actions">
        <a class="olc-scene-link" href="../in-app-offers/index.html#s-${o.sceneId}" target="_blank">
          ${svg('link', 11)} ${o.sceneName}
        </a>
        ${o.playStep !== null ? `
          <button class="olc-play-btn" data-play-step="${o.playStep}">
            ${svg('play', 10)} Шаг ${o.playStep}
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.olc-play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.playStep, 10);
      switchMode('newbie');
      goToStep(step);
    });
  });
}

function switchMode(mode) {
  state.currentMode = mode;
  const isNewbie = mode === 'newbie';

  const btnNewbie = document.getElementById('modeBtnNewbie');
  const btnAllStates = document.getElementById('modeBtnAllStates');
  const appFrame = document.getElementById('appFrame');
  const statesBoardWrap = document.getElementById('statesBoardWrap');
  const rationaleStrip = document.getElementById('rationaleStrip');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnRestart = document.getElementById('btnRestart');
  const brandSub = document.getElementById('brandSub');
  const brandBadge = document.getElementById('brandBadge');

  if (btnNewbie) btnNewbie.classList.toggle('on', isNewbie);
  if (btnAllStates) btnAllStates.classList.toggle('on', !isNewbie);

  if (appFrame) appFrame.style.display = isNewbie ? 'block' : 'none';
  if (statesBoardWrap) statesBoardWrap.style.display = isNewbie ? 'none' : 'flex';
  if (rationaleStrip) rationaleStrip.style.display = isNewbie ? 'flex' : 'none';

  if (btnPrev) btnPrev.style.display = isNewbie ? 'inline-flex' : 'none';
  if (btnNext) btnNext.style.display = isNewbie ? 'inline-flex' : 'none';
  if (btnRestart) btnRestart.style.display = isNewbie ? 'inline-flex' : 'none';

  if (brandSub) {
    brandSub.textContent = isNewbie ? '/ Play as Newcomer' : '/ All States Audit';
  }
  if (brandBadge) {
    brandBadge.textContent = isNewbie ? 'Onboarding Prototype · Part 1' : 'States Matrix (17 States · 5 Tracks)';
  }

  if (!isNewbie) {
    renderStatesBoard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    renderStepper();
    renderRationale();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ---------- GLOBAL CONTROLS ---------- */
function wireGlobalControls() {
  const modeBtnNewbie = document.getElementById('modeBtnNewbie');
  if (modeBtnNewbie) {
    modeBtnNewbie.addEventListener('click', () => switchMode('newbie'));
  }

  const modeBtnAllStates = document.getElementById('modeBtnAllStates');
  if (modeBtnAllStates) {
    modeBtnAllStates.addEventListener('click', () => switchMode('all-states'));
  }

  const btnBackToNewbie = document.getElementById('btnBackToNewbie');
  if (btnBackToNewbie) {
    btnBackToNewbie.addEventListener('click', () => switchMode('newbie'));
  }

  document.getElementById('btnPrev').addEventListener('click', () => {
    if (state.currentStep > 1) {
      goToStep(state.currentStep - 1);
    }
  });

  document.getElementById('btnNext').addEventListener('click', () => {
    if (state.currentStep < 6) {
      goToStep(state.currentStep + 1);
    }
  });

  document.getElementById('btnRestart').addEventListener('click', () => {
    sessionStorage.removeItem(EXIT_SHOWN_SESSION_KEY);
    localStorage.removeItem(EXIT_TIMER_STORAGE_KEY);
    state.currentStep = 1;
    state.hasPausedTask = false;
    state.selectedPromptId = 'video';
    state.composerText = '';
    state.activeModelId = 'sd_fast';
    state.selectedPlanForCheckout = 'plus';
    state.sheetBilling = 'monthly';
    state.selectedBilling = 'monthly';
    state.isExitDiscountApplied = false;
    state.exitIntentOpen = false;
    state.isSubscriber = false;
    state.userBalance = 0;
    state.toastVisible = false;
    renderAll();
  });

  const toggleProposal = document.getElementById('toggleProposal');
  toggleProposal.addEventListener('change', (e) => {
    state.showProposalNotes = e.target.checked;
    const box = document.getElementById('proposalNotesBox');
    if (box) {
      box.classList.toggle('show', state.showProposalNotes);
    }
  });
}

function renderAll() {
  renderStepper();
  renderRationale();
  renderAppMockup();
  if (state.currentMode === 'all-states') {
    renderStatesBoard();
  }
}

// Global live countdown ticker
setInterval(() => {
  const timerTextEl = document.getElementById('sheetTimerText');
  if (timerTextEl) {
    const cd = getCountdownState();
    timerTextEl.textContent = cd.text;
  }
  const exitTimerTextEl = document.getElementById('exitTimerText');
  if (exitTimerTextEl) {
    const exitCd = getExitCountdownState();
    const span = exitTimerTextEl.querySelector('span');
    if (span) {
      span.textContent = exitCd.text;
    }
  }
}, 1000);

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  wireGlobalControls();
  renderAll();
});

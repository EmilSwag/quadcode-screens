/* Workspace v2 — data layer. All copy English. Prices = real Quadcode prices (meta/facts/quadcode-pricing-model.md). */
window.WS = window.WS || {};
WS.DATA = {
  user: { name: 'Alex Creator', email: 'creator@example.com', ini: 'AC', since: 'Jul 3, 2026' },
  today: '2026-09-27',
  states: {
    sub: { label: 'Subscriber', sub: 'Basic · 1,006.63 QCC', plan: 'Basic Monthly', price: 20, credits: 1000, bal: 1006.63, planCredits: 756.63, topupCredits: 250.00, renew: 'Oct 7, 2026', renewIn: 10, bonus: 'claimed', spent: 797.10, perDay: 39.86 },
    low: { label: 'Low balance', sub: 'Basic · 38.40 QCC', plan: 'Basic Monthly', price: 20, credits: 1000, bal: 38.40, planCredits: 0.00, topupCredits: 38.40, renew: 'Oct 7, 2026', renewIn: 10, bonus: 'claimed', spent: 961.60, perDay: 48.08, warn: true },
    new: { label: 'New user', sub: 'Free · 0 QCC', plan: 'Free', price: 0, credits: 0, bal: 0, planCredits: 0.00, topupCredits: 0.00, renew: null, renewIn: 0, bonus: 'ready', spent: 0, perDay: 0 },
    claimed: { label: 'Bonus claimed', sub: 'Free · 200 QCC', plan: 'Free', price: 0, credits: 0, bal: 200.00, planCredits: 0.00, topupCredits: 0.00, bonusCredits: 200.00, renew: null, renewIn: 0, bonus: 'claimed', spent: 0, perDay: 0 }
  },
  packs: [
    { q: 100, p: 2 }, { q: 500, p: 10 }, { q: 1000, p: 20, best: true }, { q: 4000, p: 80 }
  ],
  starterKit: { q: 1200, p: 20, bonus: '+20%', expiresAt: null },
  yearly: { p: 180, was: 240, save: 25, credits: 12000 },
  cases: [
    { id: 'app', img: '../assets/cases/case_app.jpg', title: 'Momentum · habit tracker app', kind: 'App', agent: 'Cody', model: 'claude-sonnet-5', logo: 'claude', cost: 1240, unit: 'QCC · full build', time: '38 min', tokens: '4.1M tokens', prompt: 'Build Momentum, an iOS/Android habit tracker: daily activity rings, streak cards, personal routines, reminders, progress analytics, dark charcoal UI with vivid orange accent. React Native + Expo, accessible controls and offline-friendly state.' },
    { id: 'game', img: '../assets/cases/case_game.jpg', title: 'Neon Circuit · arcade game', kind: 'Game', agent: 'Cody', model: 'claude-fable-5-1', logo: 'claude', cost: 980, unit: 'QCC · full build', time: '27 min', tokens: '820K tokens', prompt: 'Make Neon Circuit, a top-down arcade track game in Phaser 3: glowing looped circuit, hover racers, wave counters, coins, energy towers, power-up shields and a local leaderboard. Responsive controls, 60 fps.' },
    { id: 'site', img: '../assets/cases/case_site.jpg', title: 'Night Roasts · coffee storefront', kind: 'Website', agent: 'Cody', model: 'gpt-6-sol', logo: 'openai', cost: 620, unit: 'QCC · full build', time: '19 min', tokens: '1.4M tokens', prompt: 'Create a responsive specialty-coffee storefront: dark editorial hero with steaming cup and headline Handcrafted Brews for the Curious, featured roasts, coffee tasting notes, accessible cart, simple checkout review and mobile-friendly product photography.' },
    { id: 'film', img: '../assets/cases/case_film.jpg', title: 'Nightfall · 30-second film', kind: 'Video', agent: 'Sonic', model: 'Seedance 2.5', logo: null, cost: 230, unit: 'QCC · per video', time: '4 min', tokens: '1 × 30s 1080p', prompt: 'Cinematic 30s short: a courier crosses a rain-soaked neon city at night, handheld camera, anamorphic flares, orange sodium lights, sound design with distant thunder.', video: true },
    { id: 'product', img: '../assets/cases/case_product.jpg', title: 'Amber · fragrance campaign', kind: 'Image', agent: 'Lumi', model: 'Nanobanana', logo: 'gemini', cost: 9.2, unit: 'QCC · per image', time: '14 s', tokens: '1 × 2048px', prompt: 'Luxury fragrance campaign: sculptural crystal perfume bottle filled with warm amber liquid, dynamic amber splash wrapping around the bottle, deep black studio backdrop, warm focused backlight and glossy black reflection. Premium editorial product photography.' },
    { id: 'music', img: '../assets/cases/case_music.jpg', title: 'Orange Hour · full track', kind: 'Music', agent: 'Sonic', model: 'Suno v5', logo: 'suno', cost: 9, unit: 'QCC · per song', time: '48 s', tokens: '1 × 2:40 stereo', prompt: 'Warm synth-pop track, 110 bpm, female vocal, chorus about a city at golden hour, radio-ready mix, 2:40.', video: true }
  ],
  models: {
    llm: [
      { n: 'claude-sonnet-5', v: 'Anthropic', logo: 'claude', p: 300, tag: 'Recommended' },
      { n: 'claude-opus-5-5', v: 'Anthropic', logo: 'claude', p: 600 },
      { n: 'claude-fable-5-1', v: 'Anthropic', logo: 'claude', p: 1200, tag: 'New' },
      { n: 'gpt-6-astra', v: 'OpenAI', logo: 'openai', p: 1800 },
      { n: 'gpt-6-sol', v: 'OpenAI', logo: 'openai', p: 438 },
      { n: 'gpt-6-luna', v: 'OpenAI', logo: 'openai', p: 21, tag: 'Cheapest' },
      { n: 'gemini-3.8-flash', v: 'Google', logo: 'gemini', p: 150 },
      { n: 'grok-4.7', v: 'xAI', logo: 'grok', p: 200 },
      { n: 'kimi-k3', v: 'Moonshot', logo: 'kimi', p: 630 },
      { n: 'deepseek-flash', v: 'DeepSeek', logo: 'deepseek', p: 11 }
    ],
    image: [
      { n: 'Nanobanana', v: 'Google', logo: 'gemini', p: 9.2 }, { n: 'Flux2 Pro', v: 'BFL', logo: 'flux', p: 1.8 }, { n: 'Flux2 Max', v: 'BFL', logo: 'flux', p: 4.2 },
      { n: 'GPT Image', v: 'OpenAI', logo: 'openai', p: 4.2 }, { n: 'Grok Image', v: 'xAI', logo: 'grok', p: 1.2 }
    ],
    video: [
      { n: 'Seedance 2.5', v: 'ByteDance', logo: 'kling', p: 230, tag: 'Top' }, { n: 'Veo 3', v: 'Google', logo: 'gemini', p: 200 }, { n: 'Kling 3', v: 'Kuaishou', logo: 'kling', p: 60 },
      { n: 'Wan 2.7', v: 'Alibaba', logo: 'kling', p: 60 }, { n: 'Grok Video', v: 'xAI', logo: 'grok', p: 32 }, { n: 'Runway Gen3', v: 'Runway', logo: 'stability', p: 22 }
    ],
    audio: [
      { n: 'Suno v5', v: 'Suno', logo: 'suno', p: 9 }, { n: 'ElevenLabs v3', v: 'ElevenLabs', logo: 'elevenlabs', p: 1.7 }, { n: 'Gemini TTS', v: 'Google', logo: 'gemini', p: 1.2 }
    ]
  },
  /* usage this cycle (Sep 7 → Sep 27) — rows sum to 797.10 for the subscriber state */
  usageRows: [
    { n: 'claude-sonnet-5', logo: 'claude', kind: 'LLM', runs: '1.34M tokens', q: 402.40 },
    { n: 'Seedance 2.5', logo: 'kling', kind: 'Video', runs: '1 video · 30s', q: 230.00 },
    { n: 'claude-fable-5-1', logo: 'claude', kind: 'LLM', runs: '101K tokens', q: 121.20 },
    { n: 'Nanobanana', logo: 'gemini', kind: 'Image', runs: '3 images', q: 27.60 },
    { n: 'Suno v5', logo: 'suno', kind: 'Audio', runs: '1 song', q: 9.00 },
    { n: 'Flux2 Max', logo: 'flux', kind: 'Image', runs: '1 image', q: 4.20 },
    { n: 'gemini-3.8-flash', logo: 'gemini', kind: 'LLM', runs: '18K tokens', q: 2.70 }
  ],
  /* 21 days: 20 actual + today; per-day stack [llm, image, video, audio] in QCC */
  usageDays: [
    [12, 0, 0, 0], [31, 9.2, 0, 0], [44, 0, 0, 0], [0, 0, 0, 0], [58, 0, 0, 0], [22, 0, 0, 9], [70, 4.2, 0, 0],
    [39, 0, 0, 0], [61, 9.2, 0, 0], [15, 0, 230, 0], [0, 0, 0, 0], [48, 0, 0, 0], [26, 9.2, 0, 0], [37, 0, 0, 0],
    [12, 0, 0, 0], [9, 0, 0, 0], [8.3, 0, 0, 0], [16, 0, 0, 0], [0, 0, 0, 0], [7, 0, 0, 0], [11, 0, 0, 0]
  ],
  invoices: [
    { d: 'Sep 7, 2026', what: 'Basic Monthly · 1,000 QCC', amt: '$20.00', st: 'Paid', pdf: true },
    { d: 'Aug 7, 2026', what: 'Basic Monthly · 1,000 QCC', amt: '$20.00', st: 'Paid', pdf: true },
    { d: 'Jul 7, 2026', what: 'Basic Monthly · 1,000 QCC', amt: '$20.00', st: 'Paid', pdf: true },
    { d: 'Jul 3, 2026', what: 'Welcome bonus · +200 QCC', amt: '$0.00', st: 'Promo', pdf: false }
  ],
  invites: [
    { n: 'Anna K.', ini: 'AK', st: 'Purchased · +200 QCC', ok: true }, { n: 'Marco R.', ini: 'MR', st: 'Signed up · waiting for 1st purchase' }, { n: 'lee.dev', ini: 'LD', st: 'Invited · Sep 25' }
  ],
  filmWeekEnd: '2026-10-04T23:59:00+03:00',
  /* ---- per route: what the live page does today, what Higgsfield does, what we ship ---- */
  compare: {
    home: {
      title: 'Overview', hf: '../assets/hf-live/home.png', hfCap: 'Higgsfield · home (logged in): personal offer strip, creative feed, price on the Generate button', qc: '../assets/ws/live-home.jpg',
      bugs: ['Page is only an "Install" card + generic feature grid — zero context about my plan, balance or offers', 'Balance is a plain text line in the sidebar, no plan status, no renewal date', 'Nothing to click that leads to a purchase — no packs, no upgrade, no promo'],
      took: ['Account-state offer hero; no countdown until a real server expiry is supplied', 'Creative case briefs with model, illustrative QCC cost and prompt; link to companion IDE flow (no deep-link or live generation in this preview)', 'Wallet card: balance, plan, renewal, runway, Top up + Promo one tap away'],
      spec: '<b>GET</b> /api/me/wallet → {balance, plan, renewAt, spentCycle, perDay}\n<b>GET</b> /api/offers?surface=web-home → [{id, kind, title, cta, endsAt}] (max 1 urgency offer)\n<b>GET</b> /api/cases?limit=6 → cases with {model, costQcc, prompt, deepLink}\n<b>event</b> ws_home_view · offer_view · offer_click · case_recreate_click\ndeepLink: quadcode://new?agent=cody&prompt=…&model=…'
    },
    plans: {
      title: 'Plans & Credits', hf: '../assets/hf-live/subscription.png', hfCap: 'Higgsfield · subscription page: plan card, credits used, "Join our Discord", change commitment', qc: '../assets/ws/live-plans.jpg',
      bugs: ['"Next billing Sep 7 2026" is in the past (today is Sep 27) — stale date', 'Red "Cancel Subscription" is the loudest button on the page', 'Tier select "1,000 credits/month $20" has no explanation; Free plan says "credits via promo code" only', 'No credit packs on the page — top-up lives in a broken modal'],
      took: ['Current plan card with credits ring + renewal date + "what happens at 0"', 'Yearly upsell as the primary action (real −25%), cancel demoted to a text link → save-offer modal', 'Top-up pack comparison and first-purchase Starter Kit (1,000 paid + 200 bonus); countdown only when a server expiry exists'],
      spec: '<b>GET</b> /api/plans → [{id, price, credits, interval, badge}]\n<b>POST</b> /api/subscription/switch {planId} → Stripe proration preview first\n<b>POST</b> /api/subscription/cancel → returns saveOffer {kind:"25%×2", expiresAt}; cancel only after decline\n<b>rule</b> renewAt must be > now; show "Renews in N days"\n<b>event</b> plans_view · switch_yearly_click · cancel_click · save_offer_accept/decline'
    },
    usage: {
      title: 'Usage', hf: '../assets/hf-live/usage.png', hfCap: 'Higgsfield · usage: credits by model, period switch, clean totals', qc: '../assets/ws/live-usage.jpg',
      bugs: ['Unit bug: table shows "23,243.03 QCC" per LLM day while balance is 210 QCC — raw token counts labelled as QCC', '48 raw rows, no totals, no per-model view, no forecast', 'Nothing connects usage to a purchase decision'],
      took: ['Per-model table in real QCC with share bars and totals', 'Stacked daily chart by category (LLM / image / video / audio) + 5-day forecast', 'Runway card: "at this pace you run out Oct 2, 5 days before renewal" → Top up / Go Yearly'],
      spec: '<b>GET</b> /api/usage?from&to&groupBy=model|day → rows in QCC (convert tokens→QCC server-side: tokens/1e6 × modelPrice)\n<b>calc</b> runwayDays = balance / avg(last7d spend); alert if runwayDays < daysToRenew\n<b>event</b> usage_view · runway_alert_view · runway_topup_click'
    },
    billing: {
      title: 'Billing & Invoices', hf: '../assets/hf-live/store-topup.png', hfCap: 'Higgsfield · store → Top-up: packs with price, bonus and clear CTA', qc: '../assets/ws/live-billing.jpg',
      bugs: ['"Showing 100 payments", every row "Internal · $20.00 · 1000 · completed" — duplicated internal records', 'No invoice PDFs, no card on file, no next charge, no tax/VAT details', 'Top up modal: "Failed to load credit packages" → only a bare Stripe card form'],
      took: ['Payment-method placeholder and auto-refill preview (threshold + pack); next charge and card require the billing provider', 'Illustrative invoice rows with details modal; real PDF receipts are not generated here', 'Top-up modal previews 4 packs and price per 100 QCC; real checkout still needs integration'],
      spec: '<b>GET</b> /api/billing/invoices → [{id, date, desc, amount, status, pdfUrl}]\n<b>GET</b> /api/billing/payment-method → {brand, last4, exp}\n<b>PUT</b> /api/billing/auto-refill {enabled, thresholdQcc, packId}\n<b>fix</b> dedupe "Internal" ledger rows; group by Stripe paymentIntent'
    },
    rewards: {
      title: 'Rewards & Offers', hf: '../assets/hf-live/gifts.png', hf2: '../assets/hf/104-affiliate-page.png', hfCap: 'Higgsfield · gifts hub + affiliate program page', qc: '../assets/ws/live-settings.jpg',
      bugs: ['Category does not exist — promo codes are a bare modal, no place to see active offers', 'No Discord perk, no referral program, no challenges', 'Welcome credits are never surfaced after sign-up'],
      took: ['One hub: welcome bonus (claim), Discord 100 QCC, referral 200/200, promo code, Film Week challenge', 'Each reward has a state (ready / pending / done) and exact conditions', 'Companion IDE banner + account menu visualized in the full-funnel demo; shared server-side reward status still to implement'],
      spec: '<b>GET</b> /api/rewards → [{id, kind, valueQcc, state, conditions, endsAt}]\n<b>POST</b> /api/rewards/claim {id} → wallet delta + ledger row "promo"\n<b>POST</b> /api/discord/verify (OAuth) → grants 100 QCC once per account\n<b>GET</b> /api/referral → {link, invites[], earnedQcc, capLeft}\n<b>rule</b> 1 urgency offer per surface; timers are server-side endsAt'
    },
    settings: {
      title: 'Settings', hf: '../assets/hf-live/account-menu.png', hfCap: 'Higgsfield · account menu: plan, credits, boost, referral links', qc: '../assets/ws/live-settings.jpg',
      bugs: ['Only "Linked accounts" + masked API token — no profile, no notifications, no preferences', 'No low-balance alert setting, no auto-refill, no default model'],
      took: ['Profile + linked accounts + API token kept', 'Notifications: low-balance alert (threshold), weekly digest, offers', 'Default models per agent; Billing shows auto-refill concept; monthly spending cap requires implementation'],
      spec: '<b>PUT</b> /api/settings {lowBalanceAlertQcc, digestWeekly, offersEmail, autoRefill, monthlyCapQcc, defaultModels}\n<b>event</b> settings_autorefill_on · lowbalance_threshold_set'
    },
    desktop: {
      title: 'Desktop App', hf: '../assets/hf-live/video-composer.png', hfCap: 'Higgsfield web editor only — NOT a desktop app. Our advantage: one wallet across web + IDE', qc: '../assets/ws/live-desktop.jpg',
      bugs: ['Nav item "Desktop App ›" leads to a 404 (/profile/desktop-app)', 'Download card lives on Overview instead — duplicated, no version, no changelog'],
      took: ['Dedicated OS download concept and implementation checklist; version, size, verified installers and changelog require release API', 'Same balance/offers sync banner as in the IDE'],
      spec: '<b>GET</b> /api/desktop/releases → {version, notes[], builds:{mac, win, linux}}\n<b>route</b> /profile/desktop-app must resolve (currently 404)'
    }
  }
};

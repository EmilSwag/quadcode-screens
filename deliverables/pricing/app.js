/* ============================================================
   Quadcode AI — Pricing page logic
   ALL NUMBERS LIVE IN `CONFIG` BELOW. Replace with real prices.
   Structure mirrors higgsfield.ai/pricing (plans → finder → compare → FAQ).
   ============================================================ */

const CONFIG = {
  currency: '$',
  discountBadge: 'Up to 25% OFF',        // compare-table header; real yearly discount is 25% (header "30% OFF" pill = new-account promo)
  promoHours: 24,                        // honest countdown for new-account offer
  // credit cost used for "= N images / ~N videos" on plan cards
  unit: { imageModel: 'Nanobanana Pro', imageCost: 2, videoModel: 'Seedance 2.5', videoCost: 22 },

  // REAL live prices for Starter (quadcode.ai/profile/plans, 23.09.2026): $20 monthly, $180 yearly = $15/mo, 25% OFF
  // Plus ($59/mo, $47/mo annual) and Ultra ($129/mo, $99/mo annual) are proposal mirrors of Higgsfield pricing structure
  plans: [
    {
      id: 'starter', name: 'Starter', tagline: 'For first-time AI creators',
      credits: 300, monthly: 20, annual: 15, discount: '25% OFF', // REAL live prices
      unit: { videoModel: 'Seedance 2.5 Fast', videoCost: 12 },   // Starter has no Seedance 2.5 — the card counts the model it actually includes
      unlimited: [
        { m: 'Gemini Omni 1.1 Flash', c: '#a78bfa', res: '720p', st: 'No free gens', k: 'no' },
        { m: 'Nanobanana Pro',        c: '#f59e0b', res: '',      st: 'No unlimited',  k: 'no' },
        { m: 'Nanobanana 2',          c: '#fbbf24', res: '',      st: 'No unlimited',  k: 'no' },
        { m: 'WAN 2.7',               c: '#34d399', res: '',      st: 'No unlimited',  k: 'no' },
      ],
      unlimitedCount: 'Upgrade to Plus for 7 unlimited & free models',
      access: [
        { m: 'Seedance 2.5', c: '#60a5fa', res: '', st: 'No access — from Plus', k: 'no' },
        { m: 'Seedance 2.5 Fast', c: '#93c5fd', res: '720p', st: 'Included', k: 'ok' },
      ],
      accessTitle: 'No access to Seedance 2.5',
      features: [
        [1, 'Parallel generations: up to 2 videos, 4 images'],
        [1, 'All 16 specialized agents (Many, Cody, Lumi…)'],
        [1, 'MCP servers & agentic CLIs'],
        [0, 'Access to selected models only'],
        [1, 'Unused credits roll over for 1 month'],
        [0, 'Custom agents & skills'],
        [0, 'Lowest cost per credit'],
      ],
    },
    {
      id: 'plus', name: 'Plus', tagline: 'For everyday AI creation', badge: 'Most popular', discount: '20% OFF',
      credits: 1200, monthly: 59, annual: 47, featured: true, // proposal (Higgsfield mirror)
      unlimited: [
        { m: 'Gemini Omni 1.1 Flash', c: '#a78bfa', res: '720p', st: '3 free gens / day', k: 'ok' },
        { m: 'Nanobanana Pro',        c: '#f59e0b', res: '',     st: 'No unlimited',     k: 'no' },
        { m: 'Nanobanana 2',          c: '#fbbf24', res: '2K',   st: '7-day unlimited',  k: 'hot' },
        { m: 'WAN 2.7',               c: '#34d399', res: '720p', st: '7-day unlimited',  k: 'hot' },
      ],
      unlimitedCount: '7 unlimited & free generation models',
      access: [
        { m: 'Seedance 2.5', c: '#60a5fa', res: '1080p', st: 'Full access', k: 'ok' },
        { m: 'Seedance 2.5 Fast', c: '#93c5fd', res: '4K', st: 'Full access', k: 'ok' },
      ],
      accessTitle: 'Access to Seedance models — full line-up',
      features: [
        [1, 'Unlimited paid parallel generations', 'NEW'],
        [1, 'All 16 agents + custom agents & skills'],
        [1, 'All Seedance, Veo, Sora & Kling models'],
        [1, 'Access to all models & features'],
        [1, 'Early access to advanced AI features'],
        [1, 'Unused credits roll over for 1 month'],
        [0, 'Lowest cost per credit'],
      ],
    },
    {
      id: 'ultra', name: 'Ultra', tagline: 'For ambitious AI projects', badge: 'Best value', discount: '23% OFF',
      credits: 3000, monthly: 129, annual: 99, creditOptions: [3000, 6000, 9000], cheaper: '34% cheaper per credit', // proposal (Higgsfield mirror)
      unlimited: [
        { m: 'Gemini Omni 1.1 Flash', c: '#a78bfa', res: '1080p', st: '3 free gens / day', k: 'ok' },
        { m: 'Nanobanana Pro',        c: '#f59e0b', res: '2K',    st: '7-day unlimited',  k: 'hot' },
        { m: 'Nanobanana 2',          c: '#fbbf24', res: '2K',    st: '7-day unlimited',  k: 'hot' },
        { m: 'WAN 2.7',               c: '#34d399', res: '1080p', st: '7-day unlimited',  k: 'hot' },
      ],
      unlimitedCount: '7 unlimited & free generation models',
      access: [
        { m: 'Seedance 2.5', c: '#60a5fa', res: '4K', st: 'Full access', k: 'ok' },
        { m: 'Seedance 2.5 Fast', c: '#93c5fd', res: '4K', st: 'Full access', k: 'ok' },
      ],
      accessTitle: 'Access to Seedance models — full line-up',
      features: [
        [1, 'Unlimited paid parallel generations', 'NEW'],
        [1, 'All 16 agents + custom agents & skills'],
        [1, 'All Seedance, Veo, Sora & Kling models'],
        [1, 'Access to all models & features'],
        [1, 'Early access to advanced AI features'],
        [1, 'Unused credits roll over for 1 month'],
        [1, 'Lowest cost per credit'],
      ],
    },
  ],

  // Step 9.2 & 9.5: Exit-intent 62% offer (Higgsfield mirror)
  // Sage audit rule: -62% from base price of chosen cycle.
  // Price = floor(base * 0.38) rounded DOWN to whole dollar.
  // monthly = floor(base monthly * 0.38)
  // annual monthly = floor(base annual monthly * 0.38), annual total = monthly * 12
  // Real discount is always >= 62%, so badge "62% OFF" is strictly honest and never overstated.
  // annual monthly equivalent <= monthly, annual savings is strictly positive!
  exitOffer: {
    discountPercent: 62, // proposal
    timerDurationSec: 8 * 60, // 8 minutes countdown window
    storageEndKey: 'qc_exit_62_end',
    storageActiveKey: 'qc_exit_62_active',
    storageExpiredKey: 'qc_exit_62_expired',
    bannerText: 'EXTRA DISCOUNT APPLIED · 62% OFF · Nano Banana Pro, Nano Banana 2 & Kling 3.0 Unlimited on Ultra for 7 days',
    // Card prices when 62% exit offer is active:
    plans: {
      starter: { monthly: 20, annual: 15, discount: '25% OFF', note: 'Base price · promo not applied to Starter' },
      plus: {
        monthly: 22, // floor(59 * 0.38) = 22. Real deduction: (59 - 22) / 59 = 62.7% -> 62% OFF (-$37)
        annual: 17,  // floor(47 * 0.38) = 17 ($204/yr). Real deduction: (564 - 204) / 564 = 63.8% -> 62% OFF (-$360)
        discountMonthly: '62% OFF',
        discountAnnual: '62% OFF',
        wasMonthly: 59,
        wasAnnual: 47,
        note: 'Special 62% exit discount applied'
      },
      ultra: {
        monthly: 49, // floor(129 * 0.38) = 49. Real deduction: (129 - 49) / 129 = 62.0% -> 62% OFF (-$80)
        annual: 37,  // floor(99 * 0.38) = 37 ($444/yr). Real deduction: (1188 - 444) / 1188 = 62.6% -> 62% OFF (-$744)
        discountMonthly: '62% OFF',
        discountAnnual: '62% OFF',
        wasMonthly: 129,
        wasAnnual: 99,
        note: 'Special 62% exit discount applied'
      },
    }
  },

  // Sage audit: Proration & timeline dates synchronized with in-app UX
  // Today: Oct 7, 2026. Renewal: Oct 22, 2026. Annual cycle: Oct 7, 2027. Immediate upgrade reset: Nov 7, 2026.
  proration: {
    todayDateStr: 'Oct 7, 2026',
    renewalDateStr: 'Oct 22, 2026',
    annualRenewalDateStr: 'Oct 7, 2027',
    immediateUpgradeRenewalDateStr: 'Nov 7, 2026',
    // Unused credits deduction rule: (unused credits / total plan credits) * monthly plan price
    unusedCredits: {
      starter: 150, // 150 of 300 credits remaining -> (150 / 300) * $20 = $10.00
      plus: 718,    // 718 of 1,200 credits remaining -> (718 / 1,200) * $59 = $35.30
      ultra: 1705   // 1,705 of 3,000 credits remaining -> (1,705 / 3,000) * $129 = $73.32
    }
  },

  // Auto-refill, 1:1 with the Higgsfield help center (checked 24.09):
  // off by default, Plus and Ultra only (not on the entry plan), fixed amounts $20 / $40 / $90 / $150 / $300 at $1 = 18 credits,
  // fires when the balance drops below the plan threshold, charges the saved payment method, credits valid 90 days,
  // separate "Auto-refill credits" counter, no monthly cap, a failed charge adds nothing, stops when the plan is cancelled.
  autoRefill: {
    ratePerCredit: '5.6¢ / cr',
    dollarRate: 18,
    thresholdPercent: 10,
    thresholds: { plus: 120, ultra: 300 },   // 10% of the monthly plan credits
    plans: ['plus', 'ultra'],
    tiers: [
      { id: 't20', usd: 20, credits: 360 },
      { id: 't40', usd: 40, credits: 720, default: true },
      { id: 't90', usd: 90, credits: 1620 },
      { id: 't150', usd: 150, credits: 2700 },
      { id: 't300', usd: 300, credits: 5400 }
    ]
  },

  // Sage audit: Top-up packs (4,000 cr at $205 cheaper per cr than 2,000 cr; 5,000 cr up to 111 videos)
  topup: {
    baseRate: 0.085, // 8.5¢ / cr base
    unitModels: {
      image: 'Nanobanana Pro (2K)',
      imageCost: 2,
      video: 'Seedance 2.5 (1080p)',
      videoCost: 45
    },
    tiers: [
      { cr: 100, pr: 6, was: 8.5, rate: '6.0¢ / cr', off: '−29%', images: 50, videos: 2 },
      { cr: 200, pr: 12, was: 17, rate: '6.0¢ / cr', off: '−29%', images: 100, videos: 4 },
      { cr: 500, pr: 29, was: 42.5, rate: '5.8¢ / cr', off: '−32%', images: 250, videos: 11 },
      { cr: 1000, pr: 56, was: 85, rate: '5.6¢ / cr', off: '−34%', images: 500, videos: 22 },
      { cr: 2000, pr: 105, was: 170, rate: '5.3¢ / cr', off: '−38%', images: 1000, videos: 44 },
      { cr: 4000, pr: 205, was: 340, rate: '5.1¢ / cr', off: '−40%', badge: 'MOST POPULAR', hi: true, images: 2000, videos: 88 },
      // 5,000+ is the adjustable 7th row (slider 5,000–25,000, step 1,000, $0.05/cr), 1:1 with Higgsfield
    ],
    custom: { min: 5000, max: 25000, step: 1000, default: 5000, rate: 0.05, baseRate: 0.085 }
  },

  // Business tab, 1:1 with Higgsfield business plans (live 24.09): price per seat, each seat's credits pool into one
  // shared balance, seat stepper, "Save $X compared to monthly". Team 2–9 seats, Scale 5–15, Enterprise custom.
  business: [
    { id: 'team', name: 'Team', tagline: 'For agencies and small teams to create faster', perSeat: true,
      creditsPerSeat: 1000, monthly: 79, annual: 65, discount: '18% OFF', seatsMin: 2, seatsMax: 9, seatsDefault: 5,
      features: [[1,'Access to all features & models'],[1,'Shared workspace & credit pool'],[1,'All 16 agents: Cody, Lumi, Sonic and more'],[1,'Early access to advanced AI features'],[1,'Basic analytics & priority support'],[1,'VAT invoices for the company'],[0,'Unlimited models'],[0,'Admin spend control'],[0,'Priority queue'],[0,'SSO']] },
    { id: 'scale', name: 'Scale', tagline: 'Designed for growing creative teams', perSeat: true, badge: 'Best value',
      creditsPerSeat: 2500, monthly: 169, annual: 150, strike: 215, discount: '30% OFF', seatsMin: 5, seatsMax: 15, seatsDefault: 5,
      features: [[1,'Everything in Team'],[1,'7-day unlimited: Nanobanana Pro 2K, Kling 3.0'],[1,'Detailed analytics'],[1,'Admin spend control: pause a member'],[1,'Priority queue for faster task processing'],[1,'Basic SSO (Google Workspace, Okta)'],[0,'Per-member spend caps'],[0,'No training on your data']] },
    { id: 'enterprise', name: 'Enterprise', tagline: 'For organizations needing personalisation & security', custom: true, badge: "Experts' choice",
      features: [[1,'Custom credits per seat, unlimited seats'],[1,'Volume rollover credits'],[1,'Custom model access & private routing'],[1,'Dedicated capacity with SLA'],[1,'Volume discounts per model'],[1,'Custom SSO, per-member caps & reports'],[1,'No training on your data, SOC 2'],[1,'Dedicated account manager']] },
  ],

  cases: [
    { t: 'Brand film', s: '0:15 · Seedance 2.5', a: 'Sonic', img: 'case-1.jpg', g: 'linear-gradient(135deg,#3b1d0e,#0f0f12)' },
    { t: 'Product key art', s: '4K · Nanobanana Pro', a: 'Lumi', img: 'case-2.jpg', g: 'linear-gradient(135deg,#0e2a3b,#0f0f12)' },
    { t: 'Playable RPG world', s: 'WebGL · 182 meshes', a: 'Cody', img: 'case-3.jpg', g: 'linear-gradient(135deg,#1d0e3b,#0f0f12)' },
    { t: 'Game character', s: 'Rigged · PBR', a: 'Lumi', img: 'case-4.jpg', g: 'linear-gradient(135deg,#0e3b2a,#0f0f12)' },
    { t: 'Storefront + checkout', s: 'Next.js · Stripe', a: 'Cody', img: 'case-5.jpg', g: 'linear-gradient(135deg,#3b0e2a,#0f0f12)' },
    { t: 'Trailer score', s: 'Suno v5 · −14 LUFS', a: 'Sonic', img: 'case-6.jpg', g: 'linear-gradient(135deg,#3b2f0e,#0f0f12)' },
  ],

  finder: {
    goals: ['Social media videos', 'Talking-avatar videos', 'UGC & product video ads', 'Marketing product photos', 'Cinematic videos', 'Game assets & 3D', 'Apps & websites', 'Music & voice-over', 'Personal use'],
    features: [
      { n: 'AI image generation', add: 0 }, { n: 'AI video generation', add: 0 },
      { n: 'Audio, music & voice', add: 60 }, { n: 'Code agents & app builder', add: 120 },
      { n: 'MCP & agentic CLIs', add: 40 }, { n: '4K upscaling (Topaz)', add: 150 },
    ],
  },

  // Compare table. Order: Free, Starter, Plus, Ultra.
  compare: [
    { cat: 'Video', icon: 'video', rows: [
      { n: 'Concurrent jobs', v: ['1 concurrent job', '2 concurrent jobs', '6 concurrent jobs', '8 concurrent jobs'] },
      { n: 'Seedance 2.5 720p', cost: '~22 credits/5s', per: 22, v: [false, false, 'calc', 'calc'] },
      { n: 'Seedance 2.5 1080p', cost: '~45 credits/5s', per: 45, v: [false, false, 'calc', 'calc'] },
      { n: 'Seedance 2.5 4K', cost: '~110 credits/5s', per: 110, v: [false, false, false, 'calc'] },
      { n: 'Seedance 2.5 Fast 720p', cost: '~12 credits/5s', per: 12, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'Gemini Omni 1.1 Flash 720p', cost: '~8 credits/5s', per: 8, v: ['3 videos', 'calc', 'calc', 'calc'] },
      { n: 'Gemini Omni 1.1 Flash 1080p', cost: '~16 credits/5s', per: 16, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'WAN 2.7 720p', cost: '~13 credits/5s', per: 13, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'WAN 2.7 1080p', cost: '~20 credits/5s', per: 20, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Google Veo 3.1 Fast 720p', cost: '~16 credits/4s', per: 16, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Google Veo 3.1 1080p', cost: '~40 credits/4s', per: 40, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Sora 2 720p', cost: '~10 credits/4s', per: 10, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Sora 2 Pro 1080p', cost: '~50 credits/4s', per: 50, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Kling 3.0 720p', cost: '~7 credits/5s', per: 7, v: [false, 'calc', 'calc', 'calc'], more: true },
      { n: 'Kling 3.0 1080p', cost: '~8 credits/5s', per: 8, v: [false, 'calc', 'calc', 'calc'], more: true },
      { n: 'Topaz video upscale → 4K', cost: '~30 credits/5s', per: 30, v: [false, false, 'calc', 'calc'], more: true },
    ]},
    { cat: 'Image', icon: 'image', rows: [
      { n: 'Concurrent jobs', v: ['1 concurrent job', '4 concurrent jobs', '8 concurrent jobs', '8 concurrent jobs'] },
      { n: 'Nanobanana Pro', cost: '2 credits/image', per: 2, v: ['10 images', 'calc', 'calc', 'calc'] },
      { n: 'Nanobanana Pro 4K', cost: '4 credits/image', per: 4, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'Nanobanana 2 (Flash)', cost: '1 credit/image', per: 1, v: ['20 images', 'calc', 'calc', 'calc'] },
      { n: 'GPT Image', cost: '1 credit/image', per: 1, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'FLUX.2 Pro', cost: '1 credit/image', per: 1, v: [false, 'calc', 'calc', 'calc'], more: true },
      { n: 'FLUX.2 Max', cost: '4 credits/image', per: 4, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Seedream 4', cost: '1 credit/image', per: 1, v: [false, 'calc', 'calc', 'calc'], more: true },
      { n: 'Ideogram 3 (text in image)', cost: '1 credit/image', per: 1, v: [false, 'calc', 'calc', 'calc'], more: true },
      { n: 'Topaz image upscale → 8K', cost: '3 credits/image', per: 3, v: [false, false, 'calc', 'calc'], more: true },
    ]},
    { cat: 'Audio', icon: 'audio', rows: [
      { n: 'Suno v5 — full song with vocals', cost: '~6 credits/track', per: 6, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'Stable Audio — SFX & instrumental', cost: '~1 credit/10s', per: 1, v: ['5 clips', 'calc', 'calc', 'calc'] },
      { n: 'ElevenLabs v3 — voice-over', cost: '~1 credit/500 chars', per: 1, v: [false, 'calc', 'calc', 'calc'] },
      { n: 'Gemini TTS', cost: '~0.5 credit/500 chars', per: 0.5, v: ['10 clips', 'calc', 'calc', 'calc'] },
      { n: 'Voice cloning', cost: '~10 credits/voice', per: 10, v: [false, false, 'calc', 'calc'], more: true },
      { n: 'Audio editing & stems', cost: '~2 credits/track', per: 2, v: [false, false, 'calc', 'calc'], more: true },
    ]},
    { cat: 'Agents & code', icon: 'bot', rows: [
      { n: 'Specialized agents (Many, Cody, Lumi, Sonic + 12)', v: [true, true, true, true] },
      { n: 'Parallel sub-agents', v: ['1', '2', '6', '8'] },
      { n: 'Claude Sonnet 5 · Gemini 3.8 Flash', cost: '~1 credit/turn', v: ['Limited', true, true, true] },
      { n: 'Grok 4.7', v: [false, true, true, true] },
      { n: 'Claude Opus 5.5', v: [false, false, true, true] },
      { n: 'GPT-6 Astra · Claude Fable 5.1', v: [false, false, false, true] },
      { n: 'DeepSeek, Qwen, Llama, Mistral', cost: '~0.2 credit/turn', v: [true, true, true, true] },
      { n: 'Bring your own Claude Code / Codex CLI subscription', v: [true, true, true, true] },
      { n: 'Custom agents & skills', v: [false, false, true, true] },
      { n: 'Quick App Builder & deploy', v: ['Preview only', true, true, true], more: true },
      { n: 'MCP servers & agentic CLIs', v: [false, true, true, true], more: true },
    ]},
    { cat: 'Credits & usage', icon: 'zap', rows: [
      { n: 'Credits', v: ['50 starter credits', '300 / mo', '1,200 / mo', '3,000 / mo'] },
      { n: 'Daily free credits', v: ['10 / day', false, false, false] },
      { n: 'Credit rollover', v: [false, '1 month', '1 month', '1 month'] },
      { n: 'Buy extra credit packs', v: [false, true, true, true] },
      { n: 'Auto-refill when credits run low', v: [false, false, true, true] },
      { n: 'Unlimited passes (1–7 days, pay once)', v: [false, true, true, true] },
      { n: 'Boost speed (+4 to +16 parallel jobs)', v: [false, true, true, true] },
      { n: 'Lowest cost per credit', v: [false, false, false, true] },
      { n: 'Cost preview before every generation', v: [true, true, true, true] },
    ]},
    { cat: 'Access & features', icon: 'key', rows: [
      { n: 'Commercial use', v: [false, true, true, true] },
      { n: 'Fast-track generation queue', v: [false, true, true, true] },
      { n: 'Start & end frame control', v: [false, false, true, true] },
      { n: 'Project memory & plan mode', v: [true, true, true, true] },
      { n: '110+ step-by-step guides & skills', v: [true, true, true, true] },
      { n: 'Priority access to new models', v: [false, false, true, true] },
      { n: 'Priority access to new features', v: [false, false, true, true] },
      { n: 'Team seats & shared pool (Team and Scale plans)', v: [false, false, false, false], more: true },
    ]},
  ],

  faq: [
    ['How do credits work?', `<p>Credits are the main cost unit for generating media and running agents. Each model uses a specific number of credits per generation depending on type, duration and resolution — the exact cost is shown on the Generate button <b>before</b> you run it.</p><p>Subscription credits refresh at the start of each billing cycle. On every paid plan unused credits roll over for one month, so nothing is wasted if you skip a week.</p>`],
    ['Is my subscription automatically renewed?', `<p>Yes. Your subscription renews automatically at the end of each billing cycle. You can cancel anytime from Settings → My Subscription — your plan stays active until the end of the current period. No emails, no support tickets.</p>`],
    ['Which payment methods do you accept?', `<p>Visa, Mastercard, American Express and JCB cards, plus Apple Pay and bank payments. PayPal and crypto are not accepted. <span class="proposal-note">Today the live Quadcode checkout takes cards only; Apple Pay and bank payments are part of this proposal.</span> Payments are processed by Stripe, so Quadcode never stores your full card number. VAT and local taxes are calculated at checkout, and every payment comes with an invoice in Settings → My Subscription.</p>`],
    ['What happens if a payment fails?', `<p>We retry the card automatically and email you a link to complete the payment. Your plan is marked Past due but stays active for a 14-day grace period: update the card or switch to Apple Pay or a bank payment in one screen. If the payment still doesn't go through, the plan pauses instead of being deleted, and your projects and files stay safe.</p>`],
    ['How many images or videos can I generate?', `<p>It depends on your plan and the models you use. Each plan card shows an approximate number of generations per month; the Compare table lists model-specific numbers.</p>`],
    ['How can I purchase extra credits?', `<p>Upgrade your plan for a higher monthly limit, or buy a credit pack on top of your current subscription: 100 to 5,000 credits from $6, or any custom amount up to 25,000. Purchased credits are added instantly, stay valid for 90 days and work with every model. Need more speed instead? Boost speed adds +4 to +16 parallel jobs.</p>`],
    ['Which credits are spent first?', `<p>Plan credits first. After that, pack and auto-refill credits are used in the order they expire, so nothing you bought runs out while other credits sit unused.</p>`],
    ['How does auto-refill work?', `<p>Auto-refill is off until you turn it on in Settings → My Subscription. It works on Plus and Ultra. Pick an amount: $20, $40, $90, $150 or $300, at $1 = 18 credits. When your balance drops below your plan's threshold (120 credits on Plus, 300 on Ultra), we charge your saved payment method and add the credits to a separate Auto-refill counter, so no render stops halfway. Refill credits are valid for 90 days. If the charge fails, nothing is added. Auto-refill stops when you cancel your plan.</p>`],
    ['Do I need a plan to buy credit packs?', `<p>Yes. Packs are a one-time purchase on top of an active plan: 100 to 4,000 credits, or any amount from 5,000 to 25,000 in steps of 1,000. They don't change your plan or renewal date and stay valid for 90 days. After a cancel you can still spend them on Free plan models.</p>`],
    ['Do Unlimited models need a plan?', `<p>Yes. Unlimited works only while a plan is active and only in the desktop app, not via MCP, CLI or API. Turn on the Unlimited switch in the model menu, otherwise the job is paid in credits. Unlimited jobs run in the standard queue, one video and two images at a time. Credit jobs keep priority.</p>`],
    ['Is there a free trial?', `<p>There's no standing trial: the Free plan gives 50 credits and 10 more every day. New accounts can start a 24-hour Unlimited trial: add a card, pick Plus monthly or annual, and generate without credits on Seedance 2.5, Kling 3.0 and Nanobanana Pro at entry resolution, one job at a time. Cancel in one click within 24 hours and pay nothing. Otherwise the plan you picked starts. One trial per person and card.</p>`],
    ['Can I get a refund?', `<p>Within 7 days of your first purchase, if no credits were used. Renewals are not refunded. Unspent pack and auto-refill credits can be refunded within 7 days. Unlimited passes and Boost speed are not refundable. A processing fee of up to 6% may apply, and a refund cancels the plan right away. In the EEA and UK you also have a 14-day right of withdrawal.</p>`],
    ['How do Team and Scale seats work?', `<p>You pay per seat. Each seat adds its monthly credits to one shared pool: Team gives 1,000 credits per seat for 2 to 9 members, Scale gives 2,500 per seat for 5 to 15. Admins invite members, Scale admins can pause a member's spending, and invoices carry your VAT ID. Seats can be reduced at renewal.</p>`],
    ['How does inviting a friend work?', `<p>On Plus and higher, create an invite link in the app. It stays open for 24 hours. A friend who joins through it gets up to 60% off their first plan. When they buy Plus monthly or higher and run one credit-paid generation, you get Unlimited Seedance 2.5 at 720p: 3 days for one friend, 5 for two, 7 for three. Creators with an audience can join the <a href="../affiliate/index.html">Affiliate program</a> instead: up to 25% commission for 12 months.</p>`],
    ['How does Unlimited work?', `<p>Unlimited lets you generate on the listed models without spending credits: 7 days included on Plus and Ultra, or a pass you buy once for 1, 3 or 7 days. Unlimited jobs run in the standard queue, one video and two images at a time, and only while a plan is active; credit-based jobs always run in the priority queue. Fair use: personal, human use only — automation or credential sharing is prohibited.</p>`],
    ['Can I change my subscription after purchase?', `<p>Yes. Upgrade instantly at any time — the new plan's credits are added right away, your current credits stay, and the unused days of your current plan are credited against the price. If you downgrade, the change applies at the end of the current period.</p>`],
    ['Do agents cost credits too?', `<p>Yes — agent turns are metered by the model you pick (frontier models ~1 credit per turn, open models ~0.2). Bring your own Claude Code or Codex CLI subscription and those turns cost 0 credits.</p>`],
  ],
};

/* ---------- state & subscriber view setup ---------- */
const urlParams = new URLSearchParams(window.location.search);
const asParam = (urlParams.get('as') || 'visitor').toLowerCase();
const validUserPlan = ['visitor', 'starter', 'plus'].includes(asParam) ? asParam : 'visitor';

// Exit intent 62% stored state
const exitActiveKey = CONFIG.exitOffer.storageActiveKey;
const exitEndKey = CONFIG.exitOffer.storageEndKey;
const exitExpiredKey = CONFIG.exitOffer.storageExpiredKey;

const isExitExpired = localStorage.getItem(exitExpiredKey) === '1';
let storedExitEnd = +localStorage.getItem(exitEndKey) || 0;
const isExitActive = !isExitExpired && localStorage.getItem(exitActiveKey) === '1' && storedExitEnd > Date.now();

const state = {
  billing: 'annual',
  audience: 'individual',
  ultraCredits: 3000,
  goals: new Set(),
  features: new Set(['AI image generation', 'AI video generation']),
  userPlan: validUserPlan,
  exitActive: isExitActive,
  exitEnd: storedExitEnd
};
window.state = state;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => CONFIG.currency + n.toLocaleString('en-US');
const fmt = (n) => n.toLocaleString('en-US');
const ic = (ok) => ok
  ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`
  : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

const ICONS = {
  video: '<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  audio: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
  infinity: '<path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sparkle: '<path d="M12 3.5 14 10l6.5 2-6.5 2-2 6.5-2-6.5L3.5 12 10 10Z"/>',
  lock: '<rect width="16" height="11" x="4" y="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  up: '<path d="m18 15-6-6-6 6"/>',
};
const svg = (name, size = 16, sw = 2) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

window.CONFIG = CONFIG;

// Sage audit: Calculate unused credits deduction
// Formula: (unused credits / total plan credits) * monthly plan price
function getPlanProration(planId) {
  const plan = CONFIG.plans.find(p => p.id === planId) || CONFIG.plans[0];
  const unusedCr = (CONFIG.proration.unusedCredits && CONFIG.proration.unusedCredits[planId]) !== undefined
    ? CONFIG.proration.unusedCredits[planId]
    : (plan.credits * 0.5);
  const deduction = (unusedCr / plan.credits) * plan.monthly;
  return {
    unusedCredits: unusedCr,
    totalCredits: plan.credits,
    deduction: Math.round(deduction * 100) / 100
  };
}
window.getPlanProration = getPlanProration;

/* ---------- plan cards ---------- */
function planPrice(p) {
  const factor = p.creditOptions ? state.ultraCredits / p.credits : 1;
  let m = Math.round(p.monthly * factor);
  let a = Math.round(p.annual * factor);
  let was = null;
  let discountBadge = p.discount;

  // 62% exit promo is strictly for new purchases in visitor/free view
  const isExitApplicable = state.exitActive && state.userPlan === 'visitor';

  if (isExitApplicable && CONFIG.exitOffer.plans[p.id]) {
    const ep = CONFIG.exitOffer.plans[p.id];
    m = Math.round(ep.monthly * factor);
    a = Math.round(ep.annual * factor);
    if (p.id !== 'starter') {
      const baseMonthly = Math.round(ep.wasMonthly * factor);
      const baseAnnual = Math.round(ep.wasAnnual * factor);
      was = state.billing === 'annual' ? baseAnnual : baseMonthly;
      const nowVal = state.billing === 'annual' ? a : m;
      const pct = Math.floor(((was - nowVal) / was) * 100);
      discountBadge = state.billing === 'annual' ? (ep.discountAnnual || `${pct}% OFF`) : (ep.discountMonthly || `${pct}% OFF`);
    } else {
      was = state.billing === 'annual' && a < m ? m : null;
    }
  } else {
    was = state.billing === 'annual' && a < m ? m : null;
  }

  const now = state.billing === 'annual' ? a : m;
  const save = Math.max(0, (m - a) * 12);
  return { m, a, now, was, save, discountBadge };
}

function renderPlans() {
  const el = $('#planCards');
  el.classList.toggle('biz', state.audience === 'business');
  if (state.audience === 'business') {
    el.innerHTML = CONFIG.business.map(bizCard).join('');
    // Seat stepper: each seat adds its credits to the shared pool (Team 2–9, Scale 5–15)
    $$('[data-seats] button', el).forEach(b => b.onclick = () => {
      const p = CONFIG.business.find(x => x.id === b.closest('[data-seats]').dataset.seats);
      state.seats = state.seats || {};
      const cur = state.seats[p.id] || p.seatsDefault;
      state.seats[p.id] = Math.min(p.seatsMax, Math.max(p.seatsMin, cur + Number(b.dataset.d)));
      renderPlans();
    });
    return;
  }

  // Subscriber view: if user is Plus subscriber, hide Starter from the top hero grid (Higgsfield mirror)
  el.classList.toggle('as-plus', state.userPlan === 'plus');

  el.innerHTML = CONFIG.plans.map(p => {
    const { imageModel, imageCost, videoModel, videoCost } = { ...CONFIG.unit, ...p.unit };
    const credits = p.creditOptions ? state.ultraCredits : p.credits;
    const pr = planPrice(p);
    const tile = (r) => window.QC_TILE ? window.QC_TILE(r.m) : `<span class="dot" style="background:${r.c}">${r.m[0]}</span>`;
    const rows = (arr) => arr.map(r => `<div class="mrow">${tile(r)}<span class="name">${r.m}</span>${r.res ? `<span class="res">${r.res}</span>` : ''}<span class="st ${r.k}">${r.st}</span></div>`).join('');

    // Button label & action depending on subscriber view (Higgsfield mirror)
    let btnText = `Get ${p.name}`;
    let btnAction = 'checkout';
    let btnClass = p.featured ? 'btn-grad' : 'btn-primary';

    if (state.userPlan === 'starter') {
      if (p.id === 'starter') {
        btnText = 'Change Commitment';
        btnAction = 'change-commitment';
        btnClass = 'btn-ghost';
      } else {
        btnText = 'Upgrade Plan';
        btnAction = 'upgrade';
        btnClass = p.featured ? 'btn-grad' : 'btn-primary';
      }
    } else if (state.userPlan === 'plus') {
      if (p.id === 'plus') {
        btnText = 'Change Commitment';
        btnAction = 'change-commitment';
        btnClass = 'btn-ghost';
      } else if (p.id === 'ultra') {
        btnText = 'Upgrade Plan';
        btnAction = 'upgrade';
        btnClass = 'btn-grad';
      }
    }

    return `
    <article class="plan ${p.featured ? 'featured' : ''}" id="plan-${p.id}">
      ${p.cheaper ? `<span class="cheaper">${p.cheaper}</span>` : ''}
      <div class="top">
        <h3>${p.name}</h3>
        ${pr.discountBadge && (state.billing === 'annual' || (state.exitActive && state.userPlan === 'visitor' && p.id !== 'starter')) ? `<span class="badge ${state.exitActive && state.userPlan === 'visitor' && p.id !== 'starter' ? 'red' : ''}">${pr.discountBadge}</span>` : ''}
        ${p.badge ? `<span class="badge outline">${p.badge}</span>` : ''}
      </div>
      <div class="tagline">${p.tagline}</div>
      <div class="cbox">
        <div class="credits"><span class="spark">${svg('sparkle', 15, 2)}</span><b data-roll="cr-${p.id}" data-val="${fmt(credits)}">${fmt(credits)}</b><span>credits / mo.</span></div>
        <div class="equiv">= <b data-roll="im-${p.id}" data-val="${fmt(Math.floor(credits / imageCost))}">${fmt(Math.floor(credits / imageCost))}</b> ${imageModel} generations<br>~ <b data-roll="vd-${p.id}" data-val="${fmt(Math.floor(credits / videoCost))}">${fmt(Math.floor(credits / videoCost))}</b> ${videoModel} videos</div>
        ${p.creditOptions ? `<div class="seg" data-seg="${p.id}">${p.creditOptions.map(c => `<button class="${c === state.ultraCredits ? 'active' : ''}" data-credits="${c}">${fmt(c)}</button>`).join('')}</div>` : `<div class="fixed">${svg('check', 12, 3)}Fixed amount of ${fmt(credits)} credits / mo.</div>`}
      </div>
      <div class="price">${pr.was ? `<span class="was">${money(pr.was)}</span>` : ''}<span class="now"><small>${CONFIG.currency}</small><span data-roll="pr-${p.id}" data-val="${fmt(pr.now)}">${fmt(pr.now)}</span></span></div>
      <div class="price-note">per month, ${state.billing === 'annual' ? 'billed annually' : 'billed monthly'}</div>
      <button class="btn ${btnClass} btn-block btn-lg" data-action="${btnAction}" data-plan="${p.id}">${btnText}</button>
      ${pr.save > 0 && state.billing === 'annual' ? `<div class="save">Save ${money(pr.save)} compared to monthly</div>` : `<div class="save neutral">${p.note || (state.billing === 'monthly' ? `Switch to annual and save ${money(pr.save)}` : '')}</div>`}
      <hr>
      <div class="sect">${svg('lock', 12, 2.2)}Unlimited &amp; free gens</div>
      ${rows(p.unlimited)}
      <div class="count"><span class="badge green">${svg('infinity', 12, 2.5)}</span><b>${p.unlimitedCount}</b></div>
      <hr>
      <div class="sect">${p.accessTitle}</div>
      ${rows(p.access)}
      <hr>
      <ul class="feat">${p.features.map(f => `<li class="${f[0] ? 'ok' : 'no'}"><span class="ic">${ic(f[0])}</span>${f[1]}${f[2] ? `<span class="new">${f[2]}</span>` : ''}</li>`).join('')}</ul>
    </article>`;
  }).join('');

  $$('.seg button', el).forEach(b => b.onclick = () => { state.ultraCredits = +b.dataset.credits; renderPlans(); renderCompare(); });
  
  // Wire plan action buttons
  $$('[data-action]', el).forEach(b => {
    b.onclick = () => handlePlanAction(b.dataset.action, b.dataset.plan);
  });

  if (window.animateRollingDigits) window.animateRollingDigits();
}

// Business card, 1:1 with Higgsfield: credits per seat pooled into one balance, seat stepper, price per seat,
// "Get Team Annual", "Save $X compared to monthly" for the chosen number of seats.
function bizCard(p) {
  const feats = `<ul class="feat">${p.features.map(f => `<li class="${f[0] ? 'ok' : 'no'}"><span class="ic">${ic(f[0])}</span>${f[1]}</li>`).join('')}</ul>`;
  if (p.custom) {
    return `
  <article class="plan biz-ent" id="plan-${p.id}">
    <div class="top"><h3>${p.name}</h3>${p.badge ? `<span class="badge outline">${p.badge}</span>` : ''}</div>
    <div class="tagline">${p.tagline}</div>
    <div class="cbox">
      <div class="credits"><span class="spark">${svg('sparkle', 15, 2)}</span><b>Custom</b><span>credits per seat</span></div>
      <div class="equiv">Unlimited seats in one workspace<br>Volume rollover credits</div>
      <div class="fixed">${svg('check', 12, 3)}Priced per model and volume</div>
    </div>
    <div class="price"><span class="now biz-talk">Let's talk</span></div>
    <div class="price-note">Annual contract, volume pricing</div>
    <a class="btn btn-primary btn-block btn-lg" href="mailto:sales@quadcode.ai">Contact sales</a>
    <div class="save neutral">Security review, DPA and SLA on request</div>
    <hr>
    ${feats}
  </article>`;
  }
  state.seats = state.seats || {};
  const seats = state.seats[p.id] || p.seatsDefault;
  const annual = state.billing === 'annual';
  const per = annual ? p.annual : p.monthly;
  const pool = p.creditsPerSeat * seats;
  const save = (p.monthly - p.annual) * 12;   // per seat, as Higgsfield shows it ("Save €168" on Team = €14 × 12)
  return `
  <article class="plan ${p.id === 'team' ? 'featured' : ''}" id="plan-${p.id}">
    <div class="top"><h3>${p.name}</h3>${annual ? `<span class="badge">${p.discount}</span>` : ''}${p.badge ? `<span class="badge outline">${p.badge}</span>` : ''}</div>
    <div class="tagline">${p.tagline}</div>
    <div class="cbox">
      <div class="credits"><span class="spark">${svg('sparkle', 15, 2)}</span><b>${fmt(p.creditsPerSeat)}</b><span>credits per seat / mo.</span></div>
      <div class="equiv">${seats} seats = <b>${fmt(pool)}</b> credits in one shared pool<br>= ${fmt(Math.floor(pool / 2))} Nanobanana Pro images ~ ${fmt(Math.floor(pool / 8))} Kling 3.0 videos</div>
      <div class="seats" data-seats="${p.id}">
        <button type="button" data-d="-1" ${seats <= p.seatsMin ? 'disabled' : ''} aria-label="Remove a seat">−</button>
        <b>${seats} seats</b>
        <button type="button" data-d="1" ${seats >= p.seatsMax ? 'disabled' : ''} aria-label="Add a seat">+</button>
        <span>${p.seatsMin} to ${p.seatsMax} members in one shared workspace</span>
      </div>
    </div>
    <div class="price">${annual ? `<span class="was">${money(p.strike || p.monthly)}</span>` : ''}<span class="now"><small>${CONFIG.currency}</small>${fmt(per)}</span></div>
    <div class="price-note">per seat / month, ${annual ? 'billed annually' : 'billed monthly'} · ${money(per * seats)} a month for ${seats} seats</div>
    <a class="btn ${p.id === 'team' ? 'btn-grad' : 'btn-primary'} btn-block btn-lg" href="https://quadcode.ai/#download">Get ${p.name} ${annual ? 'Annual' : 'Monthly'}</a>
    ${annual ? `<div class="save">Save ${money(save)} per seat compared to monthly</div>` : `<div class="save neutral">Switch to annual and save ${money(save)} per seat</div>`}
    <hr>
    ${feats}
  </article>`;
}

/* ---------- cases ---------- */
function renderCases() {
  if (window.renderCasesMarquee) { window.renderCasesMarquee(); return; }
  const cEl = $('#casesTrack') || $('#cases');
  if (!cEl) return;
  cEl.innerHTML = CONFIG.cases.map(c => `
    <figure class="case" style="--g:${c.g}">
      <div class="ph"></div>
      <img src="../../assets/pricing/${c.img}" alt="${c.t}" loading="lazy" onerror="this.remove()">
      <span class="agent">${c.a}</span>
      <figcaption class="lbl">${c.t}<span>${c.s}</span></figcaption>
    </figure>`).join('');
}

/* ---------- plan finder ---------- */
function renderFinder() {
  $('#goals').innerHTML = CONFIG.finder.goals.map(g => `<button class="${state.goals.has(g) ? 'on' : ''}" data-g="${g}">${g}</button>`).join('');
  $('#features').innerHTML = CONFIG.finder.features.map(f => `<button class="${state.features.has(f.n) ? 'on' : ''}" data-f="${f.n}">${state.features.has(f.n) ? svg('check', 13, 2.5) : svg('plus', 13, 2.5)}${f.n}</button>`).join('');
  $$('#goals button').forEach(b => b.onclick = () => { state.goals.has(b.dataset.g) ? state.goals.delete(b.dataset.g) : state.goals.add(b.dataset.g); renderFinder(); });
  $$('#features button').forEach(b => b.onclick = () => { state.features.has(b.dataset.f) ? state.features.delete(b.dataset.f) : state.features.add(b.dataset.f); renderFinder(); });
  if (window.renderSliderTicks) window.renderSliderTicks();
  updateReco();
}

function updateReco() {
  const vids = +$('#vidRange').value, imgs = +$('#imgRange').value;
  const { imageCost, videoCost } = CONFIG.unit;
  let need = vids * videoCost + imgs * imageCost;
  CONFIG.finder.features.forEach(f => { if (state.features.has(f.n)) need += f.add; });
  if (state.goals.has('Cinematic videos')) need = Math.round(need * 1.3);
  if (state.goals.has('Game assets & 3D') || state.goals.has('Apps & websites')) need += 150;
  $('#vidVal').textContent = `~${vids}${vids >= 200 ? '+' : ''} videos`; $('#vidCost').textContent = `~${fmt(vids * videoCost)} credits`;
  $('#imgVal').textContent = `~${imgs}${imgs >= 500 ? '+' : ''} images`; $('#imgCost').textContent = `${fmt(imgs * imageCost)} credits`;
  if (window.updateSliderTicks) window.updateSliderTicks();
  const plans = CONFIG.plans;
  let p = plans.find(x => need <= x.credits * 0.9) || plans[plans.length - 1];
  let cap = p.creditOptions ? p.creditOptions.find(c => need <= c * 0.9) || p.creditOptions.at(-1) : p.credits;
  const factor = cap / p.credits, now = Math.round((state.billing === 'annual' ? p.annual : p.monthly) * factor), was = Math.round(p.monthly * factor);
  const pct = Math.min(100, Math.round(need / cap * 100));
  const bullets = p.id === 'starter'
    ? [`${fmt(cap)} credits / mo — enough for your volume`, 'All 16 agents, MCP & CLIs', 'Fast-track queue, commercial use']
    : [`Fixed ${fmt(cap)} credits / mo, unused roll over 1 month`, `Unlimited Nanobanana 2 & WAN 2.7 for 7 days`, `Access to every model, all features & ${p.id === 'ultra' ? '4K' : '1080p'} quality`];
  $('#reco').innerHTML = `
    <div class="head"><small>We recommend</small>${p.badge ? `<span class="badge outline">${p.badge}</span>` : ''}</div>
    <h3>${p.name} plan ${p.discount && state.billing === 'annual' ? `<span class="badge">${p.discount}</span>` : ''}</h3>
    <div class="why">${p.tagline}. Based on your selection you'll need about <b class="hl">${fmt(need)} credits</b> a month.</div>
    <div class="bar-lbl"><span>Expected monthly usage</span><b>${fmt(need)} / ${fmt(cap)} credits</b></div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <ul>${bullets.map(b => `<li>${svg('check', 14, 3)}${b}</li>`).join('')}</ul>
    <div class="price">${was > now ? `<span class="was">${money(was)}</span>` : ''}<span class="now"><small>${CONFIG.currency}</small>${fmt(now)}</span></div>
    <div class="price-note">/ month, ${state.billing === 'annual' ? 'billed annually' : 'billed monthly'}</div>
    <button class="btn btn-grad btn-block btn-lg" data-action="checkout" data-plan="${p.id}">Get ${p.name}</button>
    ${was > now ? `<div class="save">Save ${money((was - now) * 12)} compared to monthly</div>` : ''}
    <div class="save neutral" style="margin-top:6px">Premium quality · cancel anytime</div>`;

  const rBtn = $('#reco [data-action]');
  if (rBtn) rBtn.onclick = () => handlePlanAction('checkout', p.id);
}

/* ---------- compare table ---------- */
function renderCompare() {
  const cols = [{ name: 'Free', price: '$0', sub: 'Limited generations', cta: 'Start free', action: 'free', credits: 50 }, ...CONFIG.plans.map(p => {
    const credits = p.creditOptions ? state.ultraCredits : p.credits;
    const pr = planPrice(p);

    // Subscriber view buttons in Compare Table (Higgsfield mirror, screen 93)
    let cta = 'Get plan';
    let action = 'checkout';
    let btnCls = p.featured ? 'btn-grad' : 'btn-ghost';

    if (state.userPlan === 'starter') {
      if (p.id === 'starter') {
        cta = 'Change Commitment';
        action = 'change-commitment';
      } else {
        cta = 'Upgrade Plan';
        action = 'upgrade';
      }
    } else if (state.userPlan === 'plus') {
      if (p.id === 'starter') {
        cta = 'Downgrade Plan';
        action = 'downgrade';
        btnCls = 'btn-downgrade';
      } else if (p.id === 'plus') {
        cta = 'Change Commitment';
        action = 'change-commitment';
      } else if (p.id === 'ultra') {
        cta = 'Upgrade Plan';
        action = 'upgrade';
      }
    }

    return { id: p.id, name: p.name, badge: p.badge, price: money(pr.now) + '/month', sub: state.billing === 'annual' ? 'Billed annually' : 'Billed monthly', cta, action, btnCls, credits, hi: p.featured };
  })];

  const cell = (v, per, credits, hi) => {
    const cls = hi ? ' class="hi"' : '';
    if (v === true) return `<td${hi ? ' class="hi ok"' : ' class="ok"'}>Included</td>`;
    if (v === false) return `<td${hi ? ' class="hi no"' : ' class="no"'}>Not included</td>`;
    if (v === 'calc') { const n = Math.floor(credits / per); return `<td${cls}>${fmt(n)} ${per >= 5 ? 'videos' : 'images'}</td>`; }
    return `<td${cls}>${v}</td>`;
  };

  let html = `<thead><tr><th><div class="cmp-head-title">Features &amp; models</div></th>${cols.map(c => `
    <th class="${c.hi ? 'hi' : ''}">
      <div class="pn">${c.name}${c.badge ? `<span class="badge outline">${c.badge}</span>` : ''}</div>
      <div class="pp"><b>${c.price}</b><br>${c.sub}</div>
      <button class="btn ${c.btnCls || (c.hi ? 'btn-grad' : 'btn-ghost')} btn-sm" data-action="${c.action}" data-plan="${c.id || ''}">${c.cta}</button>
    </th>`).join('')}</tr></thead><tbody>`;

  CONFIG.compare.forEach((g, gi) => {
    html += `<tr class="cat"><td colspan="5"><span class="ic">${svg(g.icon, 14)}</span>${g.cat}</td></tr>`;
    let hasMore = false;
    g.rows.forEach(r => {
      if (r.more) hasMore = true;
      const isVideo = g.cat === 'Video';
      html += `<tr class="${r.more ? 'hidden more-' + gi : ''}"><td><span class="rn">${window.QC_TILES ? window.QC_TILES(r.n) : ''}${r.n}</span>${r.cost ? `<span class="cost">${r.cost}</span>` : ''}</td>${r.v.map((v, i) => {
        if (v === 'calc') { const n = Math.floor(cols[i].credits / r.per); return `<td${cols[i].hi ? ' class="hi"' : ''}>${fmt(n)} ${isVideo ? 'videos' : g.cat === 'Audio' ? 'clips' : 'images'}</td>`; }
        return cell(v, r.per, cols[i].credits, cols[i].hi);
      }).join('')}</tr>`;
    });
    if (hasMore) html += `<tr class="more"><td colspan="5"><button data-more="${gi}">View more ${svg('down', 14)}</button></td></tr>`;
  });
  html += '</tbody>';
  $('#cmpTable').innerHTML = html;

  $$('#cmpTable [data-action]').forEach(b => {
    b.onclick = () => handlePlanAction(b.dataset.action, b.dataset.plan);
  });

  $$('[data-more]').forEach(b => b.onclick = () => {
    const rows = $$('.more-' + b.dataset.more);
    const open = rows[0].classList.contains('hidden');
    rows.forEach(r => r.classList.toggle('hidden', !open));
    b.innerHTML = open ? `View less ${svg('up', 14)}` : `View more ${svg('down', 14)}`;
  });
}

/* ---------- FAQ ---------- */
function renderFaq() {
  $('#faqList').innerHTML = CONFIG.faq.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}</summary><div class="a">${a}</div></details>`).join('');
}

/* ---------- Billing, Toggles & Sticky bar ---------- */
function setBilling(b) {
  state.billing = b;
  $$('[data-bill]').forEach(x => x.classList.toggle('active', x.dataset.bill === b));
  renderPlans();
  renderCompare();
  updateReco();
  renderSticky();
  if (window.animateRollingDigits) window.animateRollingDigits();
}

function renderSticky() {
  const p = CONFIG.plans.find(x => x.featured);
  const pr = planPrice(p);
  $('#stickyCta').innerHTML = `
    <div class="wrap">
      <div><b>${p.name}</b> · ${money(pr.now)}/mo <span class="dim">${state.billing === 'annual' ? 'billed annually' : ''}</span></div>
      <button class="btn btn-primary btn-sm" data-action="checkout" data-plan="${p.id}">Get ${p.name}</button>
    </div>`;
  const btn = $('#stickyCta [data-action]');
  if (btn) btn.onclick = () => handlePlanAction('checkout', p.id);
}

// 24h Promo Timer
(function promoTimer() {
  const key = 'qc_promo_end';
  let end = +localStorage.getItem(key);
  if (!end || end < Date.now()) {
    end = Date.now() + CONFIG.promoHours * 3600e3;
    localStorage.setItem(key, end);
  }
  const el = $('#promoTimer');
  if (!el) return;
  const tick = () => {
    const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    el.textContent = [s / 3600, s % 3600 / 60, s % 60].map(n => String(Math.floor(n)).padStart(2, '0')).join(':');
  };
  tick();
  setInterval(tick, 1000);
})();

/* ============================================================
   STEP 9.2: SUBSCRIBER VIEW SWITCHER (?as=visitor | starter | plus)
   ============================================================ */
function setUserPlan(plan) {
  if (!['visitor', 'starter', 'plus'].includes(plan)) plan = 'visitor';
  state.userPlan = plan;

  // Update pills UI
  $$('#previewPills .pb-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.as === plan);
  });

  // Update info label
  const infoEl = $('#previewInfo');
  if (infoEl) {
    if (plan === 'visitor') infoEl.textContent = 'Viewing as guest · all plans visible';
    if (plan === 'starter') infoEl.textContent = 'Viewing as Starter subscriber ($20/mo) · change commitment or upgrade';
    if (plan === 'plus') infoEl.textContent = 'Viewing as Plus subscriber ($59/mo) · Starter hidden from top, downgrade in table';
  }

  // Update URL parameter without reload
  const url = new URL(window.location.href);
  url.searchParams.set('as', plan);
  window.history.replaceState({}, '', url.toString());

  // Rule: Exit offer and sticky bar are strictly for Visitor/Free mode new purchases
  const isVisitor = plan === 'visitor';
  document.body.classList.toggle('exit-active', isVisitor && state.exitActive);

  const sticky = $('#exitSticky');
  if (sticky) {
    if (isVisitor && state.exitActive) {
      sticky.classList.add('active');
    } else {
      sticky.classList.remove('active');
    }
  }

  const modal = $('#exitModal');
  if (modal && !isVisitor) {
    modal.classList.remove('open');
  }

  const navPill = $('nav.main .pill');
  if (navPill) {
    navPill.textContent = (isVisitor && state.exitActive) ? '62% OFF' : CONFIG.discountBadge;
  }

  renderPlans();
  renderCompare();
  renderSticky();
  if (window.renderTopupSection) window.renderTopupSection();
}
window.setUserPlan = setUserPlan;

// Wire Preview Bar buttons
$$('#previewPills .pb-pill').forEach(btn => {
  btn.onclick = () => setUserPlan(btn.dataset.as);
});

/* ============================================================
   STEP 9.2: EXIT-INTENT 62% OFFER & HONEST COUNTDOWN
   ============================================================ */
let exitTimerInterval = null;

function formatTimerMMSS(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startExitCountdown() {
  if (exitTimerInterval) clearInterval(exitTimerInterval);

  const tick = () => {
    const remaining = Math.max(0, Math.floor((state.exitEnd - Date.now()) / 1000));
    const timeStr = formatTimerMMSS(remaining);

    const mTimer = $('#exitTimer');
    const sTimer = $('#exitStickyTimer');
    const cTimer = $('#exitCouponTimer');
    if (mTimer) mTimer.textContent = timeStr;
    if (sTimer) sTimer.textContent = timeStr;
    if (cTimer) {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      cTimer.textContent = `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
    }

    if (remaining <= 0) {
      clearInterval(exitTimerInterval);
      expireExitOffer();
    }
  };

  tick();
  exitTimerInterval = setInterval(tick, 1000);
}

function activateExitOffer(openCheckoutImmediately) {
  if (!state.exitEnd || state.exitEnd <= Date.now()) {
    state.exitEnd = Date.now() + CONFIG.exitOffer.timerDurationSec * 1000;
    localStorage.setItem(exitEndKey, state.exitEnd);
  }

  state.exitActive = true;
  localStorage.setItem(exitActiveKey, '1');

  const isVisitor = state.userPlan === 'visitor';
  document.body.classList.toggle('exit-active', isVisitor);

  const sticky = $('#exitSticky');
  if (sticky) {
    if (isVisitor) {
      sticky.classList.add('active');
    } else {
      sticky.classList.remove('active');
    }
  }

  // Update nav pill to 62% OFF only for visitor
  const navPill = $('nav.main .pill');
  if (navPill) {
    navPill.textContent = isVisitor ? '62% OFF' : CONFIG.discountBadge;
  }

  renderPlans();
  renderCompare();
  renderSticky();
  startExitCountdown();

  if (openCheckoutImmediately && isVisitor) {
    openCheckoutSheet({
      planId: 'plus',
      billing: 'annual',
      discountNote: '62% Exit-Intent Discount applied'
    });
  }
}

function expireExitOffer() {
  state.exitActive = false;
  localStorage.removeItem(exitActiveKey);
  localStorage.setItem(exitExpiredKey, '1');

  document.body.classList.remove('exit-active');
  const sticky = $('#exitSticky');
  if (sticky) sticky.classList.remove('active');

  const navPill = $('nav.main .pill');
  if (navPill) navPill.textContent = CONFIG.discountBadge;

  renderPlans();
  renderCompare();
  renderSticky();
}

function openExitModal() {
  // 62% promo is strictly for Visitor/Free mode — never for existing subscribers
  if (state.userPlan !== 'visitor') {
    return;
  }
  if (state.exitActive || localStorage.getItem(exitExpiredKey) === '1' || sessionStorage.getItem('qc_exit_dismissed') === '1') {
    return;
  }
  // Setup honest timer timestamp
  if (!state.exitEnd || state.exitEnd <= Date.now()) {
    state.exitEnd = Date.now() + CONFIG.exitOffer.timerDurationSec * 1000;
    localStorage.setItem(exitEndKey, state.exitEnd);
  }
  startExitCountdown();
  $('#exitModal').classList.add('open');
}

// Exit-intent trigger on mouseleave top of viewport
let exitTriggered = false;
document.addEventListener('mouseout', e => {
  if (state.userPlan !== 'visitor') return;
  if (!exitTriggered && !e.relatedTarget && e.clientY <= 0) {
    exitTriggered = true;
    openExitModal();
  }
});

// Exit Modal buttons:
// 1. Claim button (if present)
const exitClaimBtn = $('#exitClaimBtn');
if (exitClaimBtn) {
  exitClaimBtn.onclick = () => {
    $('#exitModal').classList.remove('open');
    activateExitOffer(true);
  };
}

// 2. Continue with 62% OFF -> activates 62% offer and closes modal, leaves sticky banner running
const exitContinueBtn = $('#exitContinueBtn');
if (exitContinueBtn) {
  exitContinueBtn.onclick = () => {
    $('#exitModal').classList.remove('open');
    activateExitOffer(false);
  };
}

// 3. Close 'X' button
$('#exitCloseX').onclick = () => {
  $('#exitModal').classList.remove('open');
  sessionStorage.setItem('qc_exit_dismissed', '1');
  activateExitOffer(false);
};

$('#exitModal').addEventListener('click', e => {
  if (e.target.id === 'exitModal') {
    $('#exitModal').classList.remove('open');
    sessionStorage.setItem('qc_exit_dismissed', '1');
    activateExitOffer(false);
  }
});

// Exit sticky banner close
const exitStickyClose = $('#exitStickyClose');
if (exitStickyClose) {
  exitStickyClose.onclick = () => {
    $('#exitSticky').classList.remove('active');
  };
}

/* ============================================================
   STEP 9.2: PLAN ACTIONS ROUTER & MODALS (Higgsfield mirrors)
   ============================================================ */
function handlePlanAction(action, planId) {
  if (action === 'free') {
    $('#modal').classList.add('open');
    return;
  }
  if (action === 'change-commitment') {
    openChangeCommitmentModal(planId || state.userPlan);
    return;
  }
  if (action === 'upgrade') {
    openUpgradeModal(planId || 'ultra');
    return;
  }
  if (action === 'downgrade') {
    openDowngradeModal();
    return;
  }
  // Default: open Checkout Sheet
  openCheckoutSheet({ planId: planId || 'plus', billing: state.billing });
}

// Close helper for action modals
$$('[data-close-action-modal]').forEach(btn => {
  btn.onclick = () => {
    $('#changeCommitmentModal').classList.remove('open');
    $('#upgradePlanModal').classList.remove('open');
    $('#downgradePlanModal').classList.remove('open');
  };
});
['changeCommitmentModal', 'upgradePlanModal', 'downgradePlanModal'].forEach(id => {
  const el = $('#' + id);
  if (el) {
    el.addEventListener('click', e => {
      if (e.target.id === id) el.classList.remove('open');
    });
  }
});

/* 1. Change Commitment Modal (screen 78) */
function openChangeCommitmentModal(planId) {
  const targetId = planId === 'starter' ? 'starter' : (planId === 'ultra' ? 'ultra' : 'plus');
  const plan = CONFIG.plans.find(p => p.id === targetId) || CONFIG.plans[1];

  const monthlyPrice = plan.monthly;
  // Rule: Change Commitment always calculated without exit promo (subscribers only)
  const annualMonthly = plan.annual;
  const fullAnnual = annualMonthly * 12;
  const oldAnnual = plan.monthly * 12;

  // Sage audit: (unused credits / total credits) * monthly plan price
  const prorationInfo = getPlanProration(targetId);
  const deduction = prorationInfo.deduction;
  const dueToday = Math.max(0, fullAnnual - deduction);

  const discountText = plan.discount;

  $('#ccCurrentPlan').textContent = `${plan.name} — Monthly ($${monthlyPrice}/mo)`;
  $('#ccNewPlan').textContent = `${plan.name} — Annual`;
  $('#ccCredits').textContent = `${fmt(plan.credits)} credits / mo · ${discountText}`;
  $('#ccOldAnnual').textContent = `$${fmt(oldAnnual)}`;
  $('#ccNewAnnual').textContent = `$${fmt(fullAnnual)}`;
  $('#ccCreditDeduction').textContent = `−$${deduction.toFixed(2)}`;
  $('#ccDueToday').textContent = `$${dueToday.toFixed(2)}`;
  $('#ccRenewVal').textContent = `$${fmt(fullAnnual)}`;
  const renewDateEl = $('#ccRenewDate');
  if (renewDateEl) renewDateEl.textContent = CONFIG.proration.annualRenewalDateStr;

  $('#ccConfirmBtn').onclick = () => {
    $('#changeCommitmentModal').classList.remove('open');
    openCheckoutSheet({
      planId: targetId,
      billing: 'annual',
      proration: deduction,
      titleOverride: `${plan.name} Plan · Commitment Change`,
      priceOverride: fullAnnual,
      totalDueOverride: dueToday,
      disableExitPromo: true
    });
  };

  $('#changeCommitmentModal').classList.add('open');
}

/* 2. Upgrade Plan Modal (screen 96) */
function openUpgradeModal(targetPlanId) {
  const currentId = state.userPlan === 'visitor' ? 'starter' : state.userPlan;
  const currentPlan = CONFIG.plans.find(p => p.id === currentId) || CONFIG.plans[0];
  const targetId = targetPlanId || (currentId === 'starter' ? 'plus' : 'ultra');
  const targetPlan = CONFIG.plans.find(p => p.id === targetId) || CONFIG.plans[2];

  const currentMonthly = currentPlan.monthly;
  // Rule: Upgrade always calculated without exit promo
  const annualMonthly = targetPlan.annual;
  const fullAnnual = annualMonthly * 12;
  const oldAnnual = targetPlan.monthly * 12;

  // Sage audit: Proration from CURRENT plan: (unused credits / current plan credits) * current plan monthly
  const prorationInfo = getPlanProration(currentId);
  const deduction = prorationInfo.deduction;
  const dueToday = Math.max(0, fullAnnual - deduction);

  $('#upCurrentPlan').textContent = `${currentPlan.name} — Monthly ($${currentMonthly}/mo)`;
  $('#upNewPlan').textContent = `${targetPlan.name} — Annual`;
  $('#upCredits').textContent = `${fmt(targetPlan.credits)} credits / mo · Full model line-up`;
  $('#upOldPrice').textContent = `$${fmt(oldAnnual)}`;
  $('#upNewPrice').textContent = `$${fmt(fullAnnual)}`;
  $('#upCreditDeduction').textContent = `−$${deduction.toFixed(2)}`;
  $('#upDueToday').textContent = `$${dueToday.toFixed(2)}`;
  const upRenewDate = $('#upRenewDate');
  if (upRenewDate) upRenewDate.textContent = CONFIG.proration.immediateUpgradeRenewalDateStr;

  $('#upConfirmBtn').onclick = () => {
    $('#upgradePlanModal').classList.remove('open');
    openCheckoutSheet({
      planId: targetId,
      billing: 'annual',
      proration: deduction,
      titleOverride: `${targetPlan.name} Plan Upgrade`,
      priceOverride: fullAnnual,
      totalDueOverride: dueToday,
      disableExitPromo: true
    });
  };

  $('#upgradePlanModal').classList.add('open');
}

/* 3. Downgrade Plan Modal (screen 94) */
function openDowngradeModal() {
  const renewDate = CONFIG.proration.renewalDateStr;
  const todayDate = CONFIG.proration.todayDateStr;

  $('#dwCurrentPlan').textContent = 'Plus — Monthly ($59/mo)';
  $('#dwNewPlan').textContent = 'Starter — Annual';
  $('#dwCredits').textContent = '300 credits / mo · 25% OFF';
  $('#dwPrice').textContent = '$180 / yr ($15/mo)';
  $('#dwTodayDate').textContent = todayDate;
  $('#dwRenewDate').textContent = renewDate;
  $('#dwKeepUntil').textContent = renewDate;
  $('#dwNextCharge').textContent = '$180';

  const dwKeepPlanBtn = $('#dwKeepPlanBtn');
  if (dwKeepPlanBtn) {
    dwKeepPlanBtn.onclick = () => {
      $('#downgradePlanModal').classList.remove('open');
    };
  }

  $('#dwConfirmBtn').onclick = () => {
    $('#downgradePlanModal').classList.remove('open');
    setUserPlan('starter');
    alert(`Downgrade confirmed. Your Plus plan remains active until ${renewDate}. On ${renewDate}, your account will switch to Starter ($180/yr).`);
  };

  $('#downgradePlanModal').classList.add('open');
}

/* ============================================================
   STEP 9.2: CHECKOUT SHEET (Wallets first, Card form, renewal terms)
   ============================================================ */
function openCheckoutSheet(opts = {}) {
  const isPack = opts.type === 'pack' || opts.type === 'refill';
  const isRefill = opts.type === 'refill';
  let title = opts.title || '';
  let interval = opts.interval || '';
  let basePrice = opts.basePrice || 0;
  let totalDue = opts.totalDue || 0;
  let proration = opts.proration || 0;
  let exitDiscount = 0;
  let monthlyRenews = 0;
  let is62 = false;
  let isAnnual = false;

  if (!isPack) {
    const planId = opts.planId || 'plus';
    const plan = CONFIG.plans.find(p => p.id === planId) || CONFIG.plans[1];
    isAnnual = (opts.billing || state.billing) === 'annual';
    // Rule: 62% exit promo is strictly for Visitor/Free mode new purchases
    is62 = !opts.disableExitPromo && (state.userPlan === 'visitor') && state.exitActive && CONFIG.exitOffer.plans[planId] && planId !== 'starter';

    title = opts.titleOverride || `${plan.name} Plan`;
    const credits = plan.creditOptions ? state.ultraCredits : plan.credits;
    interval = isAnnual ? `Annual billing · ${fmt(credits)} credits / mo` : `Monthly billing · ${fmt(credits)} credits / mo`;

    const standardMonthly = plan.monthly;
    const standardAnnual = plan.annual;

    if (isAnnual) {
      if (is62) {
        const promoAnnualMonthly = CONFIG.exitOffer.plans[planId].annual;
        basePrice = opts.priceOverride || standardAnnual * 12;
        totalDue = promoAnnualMonthly * 12;
        exitDiscount = basePrice - totalDue;
        monthlyRenews = promoAnnualMonthly;
      } else {
        basePrice = opts.priceOverride || standardAnnual * 12;
        totalDue = opts.totalDueOverride !== undefined ? opts.totalDueOverride : basePrice;
        monthlyRenews = standardAnnual;
      }
    } else {
      if (is62) {
        const promoMonthly = CONFIG.exitOffer.plans[planId].monthly;
        basePrice = standardMonthly;
        totalDue = promoMonthly;
        exitDiscount = basePrice - totalDue;
        monthlyRenews = promoMonthly;
      } else {
        basePrice = opts.priceOverride || standardMonthly;
        totalDue = opts.totalDueOverride !== undefined ? opts.totalDueOverride : basePrice;
        monthlyRenews = standardMonthly;
      }
    }

    if (proration > 0 && opts.totalDueOverride === undefined) {
      totalDue = Math.max(0, totalDue - proration);
    }
  }

  // Populate Order Summary
  $('#chItemTitle').textContent = title;
  $('#chItemInterval').textContent = interval;
  $('#chItemPrice').textContent = `$${basePrice.toFixed(2)}`;

  const discountLine = $('#chDiscountLine');
  if (exitDiscount > 0) {
    discountLine.style.display = 'flex';
    const discountPct = is62 ? CONFIG.exitOffer.discountPercent : Math.floor((exitDiscount / basePrice) * 100);
    const discLabel = $('#chDiscountLabel');
    if (discLabel) discLabel.textContent = `Promotional discount (${discountPct}% OFF)`;
    $('#chDiscountVal').textContent = `−$${exitDiscount.toFixed(2)}`;
  } else {
    discountLine.style.display = 'none';
  }

  const prorationLine = $('#chProrationLine');
  if (proration > 0) {
    prorationLine.style.display = 'flex';
    $('#chProrationVal').textContent = `−$${proration.toFixed(2)}`;
  } else {
    prorationLine.style.display = 'none';
  }

  $('#chTotalDue').textContent = `$${totalDue.toFixed(2)}`;
  $('#chBtnAmount').textContent = `$${totalDue.toFixed(2)}`;

  // Renewal terms next to button
  const renewTermsEl = $('#chRenewTerms');
  if (renewTermsEl) {
    if (isRefill) {
      renewTermsEl.textContent = 'Automated trigger when balance < 10%. Stop or adjust anytime in Settings.';
    } else if (isPack) {
      renewTermsEl.textContent = 'One-time charge. No recurring fee. Extra credits stay valid for 90 days.';
    } else {
      renewTermsEl.textContent = isAnnual
        ? `Renews at $${monthlyRenews}/mo ($${fmt(monthlyRenews * 12)} billed annually) until you cancel. Cancel anytime in Settings.`
        : `Renews at $${monthlyRenews}/mo until you cancel. Cancel anytime in Settings.`;
    }
  }

  // Handle wallet express buttons (proposal demonstration)
  ['btnApplePay', 'btnBankPay'].forEach(id => {
    const btn = $('#' + id);
    if (btn) {
      btn.onclick = () => {
        const walletName = id === 'btnApplePay' ? 'Apple Pay' : 'bank payment';
        alert(`Express checkout with ${walletName} successful!\n\nAmount: $${totalDue.toFixed(2)}\nItem: ${title}`);
        $('#checkoutModal').classList.remove('open');
      };
    }
  });

  // Card pay button
  const submitBtn = $('#chSubmitBtn');
  if (submitBtn) {
    submitBtn.onclick = () => {
      alert(`Payment of $${totalDue.toFixed(2)} confirmed!\nYour purchase of ${title} is active.`);
      $('#checkoutModal').classList.remove('open');
    };
  }

  $('#checkoutModal').classList.add('open');
}
window.openCheckoutSheet = openCheckoutSheet;

// Close checkout modal
$$('[data-close-checkout]').forEach(btn => {
  btn.onclick = () => $('#checkoutModal').classList.remove('open');
});
$('#checkoutModal').addEventListener('click', e => {
  if (e.target.id === 'checkoutModal') $('#checkoutModal').classList.remove('open');
});

// Standard modal triggers & helpers
$$('[data-bill]').forEach(x => x.onclick = () => setBilling(x.dataset.bill));
$$('#audienceTabs button').forEach(x => x.onclick = () => {
  state.audience = x.dataset.aud;
  $$('#audienceTabs button').forEach(y => y.classList.toggle('active', y === x));
  renderPlans();
});
$$('[data-open-modal]').forEach(x => x.onclick = () => $('#modal').classList.add('open'));
$$('[data-close-modal]').forEach(x => x.onclick = () => $('#modal').classList.remove('open'));
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') e.currentTarget.classList.remove('open'); });
$('#promoClose').onclick = () => { $('#promo').remove(); document.body.classList.add('promo-hidden'); };
['vidRange', 'imgRange'].forEach(id => $('#' + id).oninput = updateReco);

/* ---------- init ---------- */
setUserPlan(validUserPlan);
renderCases();
renderFinder();
renderCompare();
renderFaq();
renderSticky();

const toggleProposalNotes = $('#toggleProposalNotes');
if (toggleProposalNotes) {
  toggleProposalNotes.checked = false;
  toggleProposalNotes.onchange = () => {
    document.body.classList.toggle('show-proposal-notes', toggleProposalNotes.checked);
  };
}

if (state.exitActive) {
  activateExitOffer(false);
}


// Invite link copy. Demo link: the real one is created in the app on Plus and higher and stays open 24 hours.
(() => {
  const b = document.getElementById('copyInvite');
  if (!b) return;
  b.addEventListener('click', () => {
    const url = (document.querySelector('.refer-url') || {}).textContent || '';
    const done = () => { b.textContent = 'Copied'; setTimeout(() => { b.textContent = 'Copy link'; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText('https://' + url.trim()).then(done, done); else done();
  });
})();

/* Dev handoff specs per case. t=trigger/rules, c=copy, s=states, d=data/API, e=analytics, q=acceptance.
   Unified events: paywall_viewed / paywall_cta_clicked / paywall_dismissed {placement, offer_id, balance_qcc, plan, surface}
   then checkout_started / purchase_completed {placement, sku, amount_usd, promo_code}. Prices & codes = placeholders for PO. */
var P = function (pl) { return [
  ['paywall_viewed', 'Component is 50% visible for 1s', 'placement=' + pl + ', offer_id, balance_qcc, plan, surface'],
  ['paywall_cta_clicked', 'Primary or secondary CTA clicked', 'placement=' + pl + ', cta=primary|secondary, sku'],
  ['paywall_dismissed', 'Close / Esc / outside click / "Not now"', 'placement=' + pl + ', method=x|esc|outside|later']]; };
window.SPEC = {
s1: {
  t: [['Trigger', 'Any public page (quadcode.ai/*) while a site-wide campaign is active (GET /api/offers/public returns one).'], ['Placement', 'Promo bar 48px, fixed above the header (header moves down 48px). Header gets a new "Pricing" item with a NEW badge for 14 days. Offer toast bottom-left after 8s on page.'], ['Frequency', 'Bar: every visit until dismissed (then hidden 7 days, cookie qc_pb_dismissed). Toast: once per session.'], ['Priority', 'P1 · acquisition'], ['Mobile', 'Bar text collapses to "−30% Yearly · 47:12:09 · Claim"; toast becomes bottom sheet.']],
  c: [['Bar', 'LAUNCH WEEK — Yearly plan −30% with code LAUNCH30 · ends in 47:12:09 · Claim offer →'], ['Nav', 'Pricing (NEW)'], ['Toast title', 'Build more for less'], ['Toast body', 'Yearly plan $126 instead of $180 — only this week.'], ['Toast CTA', 'See pricing']],
  s: ['Default: bar + nav badge', 'Countdown < 1h: timer turns white-on-red, copy "Last hour"', 'Campaign ended: bar is not rendered (no empty 48px gap)', 'Logged-in user: CTA opens /profile/plans?promo=LAUNCH30 instead of /pricing'],
  d: ['GET /api/offers/public → {id, code, headline, ends_at, cta_url}', 'Countdown is derived from ends_at (server time), never from client start time', 'Dismiss stored in cookie; no backend call'],
  e: P('site_promo_bar').concat([['nav_pricing_clicked', 'Click on header Pricing', 'from_page, has_badge']]),
  q: ['Bar never shifts layout after first paint (reserve 48px server-side)', 'Timer matches ends_at ±1s across two tabs', 'Dismiss hides bar on all pages for 7 days', 'Pricing link present on every public page']
},
s2: {
  t: [['Trigger', 'New route quadcode.ai/pricing (today returns 404). Linked from header, promo bar, footer, docs, IDE "Upgrade".'], ['Placement', 'Full page: promo bar → header → title + Monthly/Yearly toggle → 4 plan cards (Yearly highlighted) → credit packs row → "Made with Quadcode" marquee → FAQ.'], ['Default toggle', 'Yearly selected when a Yearly promo is live, otherwise Monthly'], ['Priority', 'P0 · no pricing page = lost intent']],
  c: [['Title', 'PICK YOUR PLAN'], ['Subtitle', 'Every model in one place. Credits roll over for a month. Cancel anytime.'], ['Toggle', 'Monthly | Yearly (−25%)'], ['Promo line', 'LAUNCH30 applied: extra −30% on Yearly · ends in 47:12:09'], ['Free', '$0 · credits via promo code · Start free'], ['Basic', '$20/mo · 1,000 QCC every month · Get Basic'], ['Yearly', '$126 first year (was $180) · 12,000 QCC · Claim −30%'], ['Enterprise', 'Custom · SSO, invoicing, pooled credits · Contact sales'], ['Packs', 'Need a one-off boost? 500 · 1,200 (+20%) · 3,500 (+40%) · 8,000 (+60%)']],
  s: ['Logged out: CTAs go to sign-up modal with plan preselected (?plan=yearly)', 'Logged in: CTAs go straight to Stripe checkout', 'Current plan card shows "Your plan" and disabled CTA', 'No promo: strike-through prices and promo line hidden'],
  d: ['GET /api/plans → [{id, price, interval, credits, features[]}]', 'GET /api/packs → [{id, credits, bonus_pct, price}]', 'GET /api/offers/public for promo line', 'POST /api/checkout {sku, promo_code} → stripe_url'],
  e: P('pricing_page').concat([['pricing_toggle_changed', 'Monthly/Yearly switched', 'to=monthly|yearly']]),
  q: ['/pricing returns 200 and is indexable (title, meta, OG image)', 'Prices come from API, not hardcoded', 'Yearly card visually dominant (scale + glow) and first in tab order on mobile', 'Lighthouse perf ≥ 90 on desktop']
},
s3: {
  t: [['Trigger', 'Click "Start for free" / "Sign in" on site, or any gated action while logged out.'], ['Placement', 'Centered modal 1000×620 over dimmed page (replaces the current full-page 5-field form). Left 430px creative carousel, right auth panel — same structure as Higgsfield.'], ['Carousel', '4 slides × 4s, crossfade + slow zoom, segmented progress bar with labels Video / Apps / Games / Audio. Pauses on hover.'], ['Incentive', 'Work email (non-gmail/outlook/yahoo domain) → +200 QCC on first login'], ['Priority', 'P1 · activation']],
  c: [['Title', 'Welcome to Quadcode AI'], ['Subtitle', 'Build apps, films, games and music with 40+ AI models.'], ['Incentive bar', 'Sign up with a work email and get 200 free QCC'], ['Buttons', 'Continue with Google · Continue with GitHub · Continue with Apple'], ['Divider', 'OR'], ['Email', 'Continue with email'], ['Terms', 'I agree to the Terms of Service and Privacy Policy (checked by default)'], ['Footer', 'Enterprise? Log in with SSO'], ['Slide 1', 'VIDEO · SHOOT A SNEAKER FILM · Veo 3.1 + Kling in one chat'], ['Slide 2', 'APPS · SHIP A STORE TODAY · From prompt to live app'], ['Slide 3', 'GAMES · BUILD A GAME WORLD · Characters, levels, 3D'], ['Slide 4', 'AUDIO · SCORE YOUR TRAILER · Music & voice by ElevenLabs']],
  s: ['Default', 'Hover on provider button: orange ring', 'Terms unchecked: all buttons disabled + hint', 'Email path: single email field → magic link / password step', 'Error: inline red text under buttons, modal stays open'],
  d: ['OAuth: Google, GitHub (exist), Apple (new)', 'POST /api/auth/email {email} → magic link', 'Work-email check server-side on first login → grant 200 QCC (idempotent)'],
  e: [['signup_modal_viewed', 'Modal opened', 'source=header|gate|pricing, plan_intent'], ['signup_provider_clicked', 'Provider button', 'provider=google|github|apple|email'], ['signup_completed', 'Account created', 'provider, work_email=bool, bonus_qcc'], ['signup_carousel_slide', 'Slide shown', 'index 1-4']],
  q: ['3 provider buttons + email button are identical size (52px, full width)', 'Modal opens < 150ms, carousel images lazy-loaded', 'Esc / X closes and returns to page', 'Plan intent (?plan=) survives OAuth redirect']
},
w1: {
  t: [['Trigger', 'User opens /profile/overview and has an active personal offer (GET /api/offers/me).'], ['Placement', 'Offer strip 48px on top of main area + hero carousel 1551×280 above "Install Quadcode.ai" (content pushed down) + Starter card in empty sidebar space under nav.'], ['Rotation', 'Hero: up to 3 slides × 5s (offer, yearly, new model). Progress dashes bottom-right.'], ['Priority', 'P1']],
  c: [['Strip', 'Welcome offer · Basic plan $14 for your first month with WELCOME30 · 23:59:41 · Claim'], ['Slide 1', 'STARTER KIT · 1,200 QCC for $20 · +200 bonus credits on your first plan'], ['Slide 2', 'YEARLY −30% · $126 instead of $180 · Best value for builders'], ['Slide 3', 'NEW: VEO 3.1 · Cinematic video with sound — now in Quadcode'], ['Sidebar card', 'Starter Kit · +200 bonus QCC · ends in 23:59:41 · Claim']],
  s: ['Active offer: all 3 blocks', 'No offer: strip hidden, hero shows product news only, sidebar card hidden', 'Paid user: slides switch to Yearly upgrade / packs'],
  d: ['GET /api/offers/me → [{id, type, code, ends_at, sku, creative}]', 'Creatives from CMS (image 1376×768, text never baked into image)'],
  e: P('overview_strip').concat(P('overview_hero').slice(0, 2)),
  q: ['No layout jump: strip + hero space reserved while offers load (skeleton)', 'Carousel pauses on hover and respects prefers-reduced-motion', 'Countdown identical in strip and sidebar card']
},
w2: {
  t: [['Trigger', 'Login or page load with balance = 0 QCC (and no active top-up in progress).'], ['Placement', 'Blocking modal 860×690 over Overview; dimmed + blurred background.'], ['Frequency', 'Once per session; afterwards the red "0 QCC" balance chip in sidebar opens it again.'], ['Default selection', '1,200 QCC pack (Most popular)'], ['Priority', 'P0 · today a 0-balance user sees no CTA at all']],
  c: [['Chip', 'BALANCE · 0 QCC'], ['Title', 'YOU’RE OUT OF CREDITS'], ['Body', 'Your projects are saved. Pick a pack and keep building in seconds.'], ['Packs', '500 · $10 | 1,200 · $20 (+20%) | 3,500 · $50 (+40%) | 8,000 · $100 (+60%)'], ['Primary', 'Top up 1,200 QCC — $20'], ['Secondary', 'Or get Basic: 1,000 QCC every month for $20'], ['Links', 'Have a promo code?']],
  s: ['Pack hover / selected ring', 'Paying: button spinner, modal locked', 'Success: confetti + "1,200 QCC added" then auto-close 2s', 'Payment failed: inline error + retry'],
  d: ['GET /api/balance', 'GET /api/packs', 'POST /api/checkout {sku} → Stripe Checkout (Apple Pay / Google Pay enabled)', 'Webhook credits balance; UI polls /api/balance every 2s up to 30s'],
  e: P('zero_balance_modal').concat([['checkout_started', 'Stripe opened', 'sku, amount_usd'], ['purchase_completed', 'Webhook confirmed', 'sku, amount_usd, qcc_added']]),
  q: ['Shown on every surface where balance = 0 is detected first (web or IDE), never twice in one session', 'Balance updates without reload after payment', 'Close returns user to page; red chip stays visible']
},
w3: {
  t: [['Trigger', 'Sidebar "Top up balance" button, balance chip, or any "Top up" CTA.'], ['Placement', 'Modal 820×720 (replaces broken "Failed to load credit packages" + raw card form).'], ['Default selection', '1,200 QCC'], ['Priority', 'P0 · current modal is broken']],
  c: [['Title', 'TOP UP CREDITS'], ['Sub', 'Credits never expire while your plan is active. Bigger packs = bigger bonus.'], ['Packs', '500 QCC $10 · 1,200 QCC $20 +20% · 3,500 QCC $50 +40% · 8,000 QCC $100 +60%'], ['Bonus meter', 'Bar under each pack shows bonus size'], ['Custom', 'Custom amount (min $5)'], ['Auto-refill', 'Auto-refill 1,200 QCC when balance drops below 100'], ['Payment', 'Card · Apple Pay · Google Pay'], ['Primary', 'Pay $20 — get 1,200 QCC']],
  s: ['Loading: 4 skeleton tiles (never an error text as the only content)', 'API error: fallback to cached pack list + retry link', 'Promo applied: price strike-through + green "WELCOME30 applied"'],
  d: ['GET /api/packs (cache 1h, fallback JSON bundled)', 'POST /api/checkout {sku, auto_refill:bool}', 'POST /api/auto-refill {threshold, sku}'],
  e: P('topup_modal').concat([['auto_refill_toggled', 'Checkbox changed', 'on, threshold, sku']]),
  q: ['Modal never shows "Failed to load" without packs', 'Selected pack reflected in button label', 'Keyboard: arrows move selection, Enter pays']
},
w4: {
  t: [['Trigger', 'First click on any plan CTA (Plans & Credits or /pricing) by a user who never had a paid plan.'], ['Placement', 'Modal 900×760 over Plans page, before Stripe opens. Hero image top, value tiles, price, 24h countdown.'], ['Frequency', 'Once per account; offer lives 24h from first view (ends_at stored server-side).'], ['Priority', 'P1 · first-purchase conversion']],
  c: [['Chip', 'ONE-TIME · NEW MEMBERS'], ['Title', 'STARTER KIT'], ['Sub', 'Your first month, supercharged.'], ['Tiles', '1,000 QCC monthly · +200 bonus QCC · 40+ models incl. Veo 3.1, Kling, Claude'], ['Price', '$20 first month · value $24'], ['Timer', 'Offer ends in 23:59:41'], ['Primary', 'Claim Starter Kit — $20'], ['Secondary', 'No thanks, show all plans'], ['Trust', 'Cancel anytime · Secure checkout by Stripe · Credits roll over 1 month']],
  s: ['Default', 'Expired: modal not shown, plan CTA goes straight to checkout', 'Already claimed: not shown'],
  d: ['POST /api/offers/starter-kit/view → {ends_at} (idempotent)', 'POST /api/checkout {sku:"basic_monthly", offer:"starter_kit"}'],
  e: P('starter_kit_modal'),
  q: ['Timer continues across devices (server ends_at)', 'Secondary CTA does not re-trigger the modal', 'Bonus 200 QCC credited with first invoice']
},
w5: {
  t: [['Trigger', 'Plans & Credits page while a timed promo code is live for the user.'], ['Placement', 'Top strip 48px (content pushed down) + popover card anchored top-right of main with crown creative.'], ['Priority', 'P1']],
  c: [['Strip', 'LAUNCH WEEK · Yearly −30% · code LAUNCH30 · 47:12:09'], ['Popover title', 'YEARLY −30%'], ['Popover body', '$126 for your first year instead of $180. 12,000 QCC upfront.'], ['Code', 'LAUNCH30 — auto-applied at checkout'], ['Primary', 'Claim yearly −30%'], ['Secondary', 'Maybe later']],
  s: ['Popover dismissed → collapses into strip only', 'Code expired → strip removed, prices normal'],
  d: ['GET /api/offers/me (type=promo_code)', 'Checkout link carries promo_code'],
  e: P('plans_timed_promo'),
  q: ['Promo auto-applied (user never types the code)', 'Strip + popover countdown in sync', 'Popover never covers plan CTAs on 1280px width']
},
w6: {
  t: [['Trigger', 'Settings page (today only Linked accounts + API token).'], ['Placement', 'New sections on top: "Your offers", "Auto-refill", "Promo code", "Invite friends"; existing sections stay below.'], ['Priority', 'P1']],
  c: [['Offers', 'Starter Kit · +200 bonus QCC · ends in 23:59:41 | Yearly −30% · LAUNCH30 · 2 days left'], ['Auto-refill', 'When balance falls below [100 QCC] add [1,200 QCC — $20]'], ['Promo', 'Enter code · Apply'], ['Invite', 'Give 300 QCC, get 300 QCC · quadcode.ai/r/emil · Copy link']],
  s: ['No offers: section shows "No active offers — invite friends to earn QCC"', 'Auto-refill off / on / card missing (CTA "Add card")'],
  d: ['GET /api/offers/me', 'GET/POST /api/auto-refill', 'POST /api/promo/apply', 'GET /api/referral'],
  e: P('settings_offers').concat([['auto_refill_toggled', 'Toggle changed', 'on, threshold, sku'], ['referral_link_copied', 'Copy clicked', '']]),
  q: ['Offer cards identical to other surfaces (same data, same timer)', 'Auto-refill requires saved card; state persists']
},
w7: {
  t: [['Trigger', 'Usage page when projected runway < 7 days (avg daily spend of last 7 days vs balance).'], ['Placement', 'Card 520px bottom-right over the usage table + 7-day forecast bars.'], ['Priority', 'P1']],
  c: [['Title', 'Credits run out in ~4 days'], ['Body', 'At your current pace (≈250 QCC/day) your balance lasts until Friday.'], ['Primary', 'Top up 1,200 QCC — $20'], ['Secondary', 'Turn on auto-refill']],
  s: ['Runway ≥ 7 days: not shown', 'Runway < 2 days: red accent + "Credits run out tomorrow"'],
  d: ['GET /api/usage/forecast → {daily_avg, runway_days}'],
  e: P('usage_runway'),
  q: ['Forecast updates daily', 'Card dismiss hides it for 48h']
},
w8: {
  t: [['Trigger', 'User clicks "Cancel subscription".'], ['Placement', 'Modal 820×700 before cancellation is confirmed.'], ['Frequency', 'Once per subscription; if already accepted, go straight to confirm.'], ['Priority', 'P2 · retention']],
  c: [['Title', 'WAIT — 50% OFF'], ['Body', 'Stay on Basic for $10/month for the next 3 months.'], ['You lose', '1,000 QCC every month · rollover credits (840 QCC) · priority queue'], ['Primary', 'Keep my plan at 50% off'], ['Secondary', 'Continue canceling']],
  s: ['Accepted: success toast "50% off applied to next 3 invoices"', 'Declined: standard confirm step'],
  d: ['POST /api/subscription/retention-offer {accept} → Stripe coupon 50% × 3'],
  e: P('cancel_save').concat([['subscription_canceled', 'Cancel confirmed', 'reason, offer_seen=bool']]),
  q: ['Coupon applied to next 3 invoices only', 'Rollover credits number is real (from API)']
},
i1: {
  t: [['Trigger', 'First IDE launch after sign-in when balance = 0 (desktop app, all OS).'], ['Placement', 'Blocking modal 1080×680 centered over the IDE; left 430px auto-scrolling creative wall, right offers.'], ['Frequency', 'Once per account. After close: red "0 QCC" pill + composer lock hint keep the path visible.'], ['Priority', 'P0 · today user lands with 0 tokens and no CTA']],
  c: [['Chip', 'BALANCE · 0 QCC'], ['Title', 'WELCOME TO QUADCODE AI'], ['Sub', 'Pick how you want to start — everything you build stays yours.'], ['Offer A (hot)', 'Try free · 50 QCC on us · No card needed · Claim free credits'], ['Offer B', 'Basic · $14 first month with WELCOME30 · 1,000 QCC/mo · ends in 23:59:41'], ['Offer C', 'Just need a boost? Packs from $10'], ['Wall caption', 'MADE IN QUADCODE']],
  s: ['Free credits claimed: modal closes, pill animates 0 → 50', 'Offline: modal shows cached offers, CTA opens browser checkout when online'],
  d: ['POST /api/offers/trial-credits/claim (once per account/device fingerprint)', 'Checkout opens system browser with deep link back quadcode://billing/success'],
  e: P('ide_first_launch').concat([['trial_credits_claimed', 'Free credits claimed', 'amount=50']]),
  q: ['Never shown to users with balance > 0', 'Deep link returns focus to IDE and refreshes balance', 'Creative wall GPU-friendly (transform only)']
},
i2: {
  t: [['Trigger', 'Agent run fails with insufficient credits mid-task.'], ['Placement', 'Inline card inside chat, right under the paused step; composer locked with "Top up to continue"; title pill red.'], ['Priority', 'P0 · today the run just stops']],
  c: [['Chip', 'PAUSED AT 62%'], ['Title', 'OUT OF CREDITS'], ['Body', 'Your prompt, files and progress are saved. Resume right after top-up.'], ['Packs', '500 · $10 | 1,200 · $20 (Popular, +20%) | 3,500 · $50 (+40%)'], ['Primary', 'Resume with 1,200 QCC — $20'], ['Checkbox', 'Auto-refill next time'], ['Composer lock', 'Top up to continue · Top up']],
  s: ['After payment: card collapses to "✓ 1,200 QCC added · resuming…" and run continues automatically', 'Payment pending: card shows spinner, composer stays locked'],
  d: ['Agent returns error code INSUFFICIENT_CREDITS {needed, run_id}', 'POST /api/runs/{id}/resume after balance webhook'],
  e: P('ide_out_of_credits').concat([['run_resumed_after_topup', 'Run resumed', 'run_id, waited_sec']]),
  q: ['No work lost: run resumes from the paused step', 'Card appears < 500ms after failure', 'Only one card per run']
},
i3: {
  t: [['Trigger', 'Balance < 15% of last top-up/plan allowance OR < estimated cost of 5 typical runs.'], ['Placement', 'Toast pinned above composer + amber title pill + cost preview chip in composer.'], ['Frequency', 'Once per day; dismiss = 24h.'], ['Priority', 'P0']],
  c: [['Toast title', '118 QCC left · about 5 runs'], ['Toast body', 'Top up now so your next build doesn’t stop halfway.'], ['Buttons', 'Top up · Auto-refill'], ['Composer', '≈ 24 QCC per run']],
  s: ['Amber (<15%)', 'Red (<5%) with copy "Almost out"'],
  d: ['GET /api/balance + /api/usage/estimate {model}'],
  e: P('ide_low_balance'),
  q: ['Toast never covers typed text', 'Cost chip reflects selected model']
},
i4: {
  t: [['Trigger', 'Timed promo live for the user (same offer source as web).'], ['Placement', 'Upgrade pill in title bar gets "−30%" badge + shine; click opens 460px popover. Promo card also pinned at top of chat once per day.'], ['Priority', 'P1']],
  c: [['Pill', '⚡ Upgrade −30%'], ['Popover chip', 'LAUNCH WEEK · 47:12:09'], ['Popover title', 'YEARLY −30%'], ['Popover body', '$126 first year instead of $180 · 12,000 QCC upfront'], ['Primary', 'Claim −30%'], ['Chat card', 'Launch week: Yearly −30% · ends in 47:12:09 · View']],
  s: ['No promo: pill "⚡ Upgrade" without badge', 'Paid yearly: pill hidden'],
  d: ['GET /api/offers/me (polled on app focus, max every 10 min)'],
  e: P('ide_timed_promo'),
  q: ['Popover closes on outside click / Esc', 'Countdown equals web']
},
i5: {
  t: [['Trigger', 'Upgrade pill, Settings → Billing, any IDE "See plans".'], ['Placement', 'Store modal 1260×800: left hero with offer + timer, right tabs Plans | Credit packs | Promo code.'], ['Priority', 'P1']],
  c: [['Hero', 'STARTER KIT · +200 bonus QCC · ends in 23:59:41'], ['Tabs', 'Plans · Credit packs · Promo code'], ['Plans', 'Basic $20/mo · Yearly $126 (was $180) BEST VALUE · Enterprise Contact'], ['Primary', 'Continue to checkout']],
  s: ['Tab Credit packs = same packs component as web top-up', 'Tab Promo code = input + Apply with inline validation'],
  d: ['Same endpoints as web (/api/plans, /api/packs, /api/checkout)'],
  e: P('ide_store').concat([['store_tab_changed', 'Tab switched', 'tab']]),
  q: ['Opens < 200ms (data prefetched on app start)', 'Checkout opens system browser; modal shows "Waiting for payment…"']
},
i6: {
  t: [['Trigger', 'IDE Settings → Billing (new tab).'], ['Placement', 'Replaces right panel: Plan card, Balance + runway, Auto-refill, Offers list, Promo code, Invoices link.'], ['Priority', 'P1']],
  c: [['Plan', 'Basic · $20/mo · renews Sep 7 · Change plan'], ['Balance', '1,006 QCC · lasts ~12 days at your pace'], ['Auto-refill', 'Below 100 QCC add 1,200 QCC — $20'], ['Offers', 'Yearly −30% (LAUNCH30) · Refer a friend +300 QCC'], ['Promo', 'Enter code · Apply']],
  s: ['Free user: plan card becomes upsell "Get Basic — $14 first month"'],
  d: ['Same as web Settings/Billing'],
  e: P('ide_settings_billing'),
  q: ['All values identical to web workspace', 'Changes sync both ways within 5s']
}
};

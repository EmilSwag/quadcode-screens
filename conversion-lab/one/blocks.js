/* ==========================================================================
   BLOCKS_DATA — Quadcode conversion blocks (Higgsfield benchmark → Quadcode build)
   Every QC overlay is real HTML/CSS (em-based) composited on a real screenshot.
   The same component HTML is reused in the Spotlight canvas at 1em = 14px.
   ========================================================================== */
(function () {
  'use strict';
  const A = '../assets/';            // conversion-lab/assets
  const R = '../../assets/';         // project-root assets (pricing cases, banners)
  const L = A + 'logos/';

  /* ---------- icons (lucide, stroke) ---------- */
  const P = {
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C9.5 3 11 5 12 8c1-3 2.5-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    zap: '<path d="M13 2 4.1 13.2a.6.6 0 0 0 .5 1H11l-1 8 9.1-11.2a.6.6 0 0 0-.5-1H13z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    crown: '<path d="M11.6 3.7a.5.5 0 0 1 .8 0l2.8 5.2 4.4-3.1a.5.5 0 0 1 .8.5L18.5 17H5.5L3.6 6.3a.5.5 0 0 1 .8-.5l4.4 3.1z"/><path d="M5 21h14"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    sparkles: '<path d="M9.9 2.1 11.5 6.7 16 8.3l-4.5 1.6-1.6 4.6-1.6-4.6L3.8 8.3l4.5-1.6z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a.6.6 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.1 9.9A6 6 0 1 1 9.9 18.1"/><path d="M7 6h1v4"/>',
    play: '<path d="M6 4l14 8-14 8z"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    video: '<path d="m16 13 5.2 3.1a.5.5 0 0 0 .8-.4V8.3a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-9 5.7a1.9 1.9 0 0 1-2 0L2 7"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11v2"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>',
  };
  const ic = (n, cls) => `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const zx = () => `<button class="z-x" aria-label="Close">${ic('x')}</button>`;
  const zix = () => `<button class="zi-x" aria-label="Close">${ic('x')}</button>`;

  /* ---------- positioned overlay wrapper ---------- */
  const ov = (pos, html, extra) => `<div class="ov ${extra || ''}" style="${pos}">${html}</div>`;

  /* ---------- timers (real, persistent; see studio.js) ---------- */
  const tt = (name, f, cls) => `<span class="z-tt ${cls || ''}" data-tt="${name}" data-fmt="${f || 'hms'}">00:00:00</span>`;
  const itt = (name, f, cls) => `<span class="zi-tt ${cls || ''}" data-tt="${name}" data-fmt="${f || 'hms'}">00:00:00</span>`;
  const cd = (name, f, cls) => {
    const labs = f === 'dhms' ? ['days', 'hrs', 'min', 'sec'] : f === 'ms' ? ['min', 'sec'] : ['hrs', 'min', 'sec'];
    return `<span class="z-cd ${cls || ''}" data-cd="${name}" data-fmt="${f || 'hms'}">${labs.map(l => `<b data-l="${l}">00</b>`).join('<i>:</i>')}</span>`;
  };

  /* ---------- creative carousel (Higgsfield-style story) ---------- */
  const SLIDES = [
    { img: R + 'pricing/case-1.jpg', chip: 'Lumi · Nano Banana Pro', big: 'Product<br>shots <em>in 4K</em>', sm: 'One prompt, ten angles. Ad-ready stills for every marketplace.', lab: 'Images' },
    { img: A + 'c2.jpg', chip: 'Sonic · Veo 3.1', big: 'Video ads<br><em>that move</em>', sm: 'Cinematic 15-second spots with native sound, no editor needed.', lab: 'Video' },
    { img: R + 'pricing/case-6.jpg', chip: 'Sonic · Suno v5', big: 'Music &amp;<br><em>voice-over</em>', sm: 'Full tracks, jingles and narration in your brand voice.', lab: 'Music' },
    { img: R + 'pricing/case-5.jpg', chip: 'Cody · Claude Opus', big: 'Apps &amp;<br><em>landing pages</em>', sm: 'Ship the product page, the app and the campaign from one chat.', lab: 'Apps' },
  ];
  function car(slides, opts) {
    const o = opts || {}; const s = slides || SLIDES;
    return `<div class="z-car" data-dur="${o.dur || 4600}" style="${o.style || ''}">
      ${s.map((x, i) => `<div class="z-sl ${i === 0 ? 'on' : ''}" style="background-image:url('${x.img}')"></div>`).join('')}
      <div class="tp">${s.map((x, i) => `<span class="sl-txt ${i === 0 ? 'on' : ''}"><span class="z-chip glass">${x.chip}</span></span>`).join('')}</div>
      ${o.cap ? `<div class="cap">${o.cap}</div>` : ''}
      <div class="txt">
        ${s.map((x, i) => `<div class="sl-txt ${i === 0 ? 'on' : ''}"><h4 class="big">${x.big}</h4><p class="sm">${x.sm}</p></div>`).join('')}
        <div class="z-segs">${s.map(() => '<span><i></i></span>').join('')}</div>
        <div class="z-segl">${s.map(x => `<span>${x.lab}</span>`).join('')}</div>
      </div>
    </div>`;
  }

  /* ========================================================================
     COMPONENTS — web (dark)
     ======================================================================== */

  /* 02 · site promo strip + header "Pricing" link */
  const STRIP = `<div class="z-strip">
      <span class="gift">${ic('gift')}</span>
      <span class="t"><b>New here?</b> Get <b>200 QCC free</b> at sign-up (valid 14 days) · Starter Kit <b>+20%</b> on your first plan</span>
      <span class="sep"></span>
      <span class="t">Launch offer ends in ${tt('home', 'hms', 'pill')}</span>
      <a class="go">Start for free ${ic('arrow')}</a>
      <span class="x">${ic('x')}</span>
    </div>`;
  const NAVLINK = `<span class="z-navlink">Pricing <span class="z-chip solid">New</span></span>`;

  /* 03 / 04 · one-screen auth modal (1:1 Higgsfield layout, Quadcode style) */
  function auth(mode) {
    const signup = mode !== 'signin';
    return `<div class="z-modal" style="height:100%">${zx()}
      <div class="z-auth" style="height:100%">
        <div class="left">${car(SLIDES, { cap: `<span class="z-chip glass mono">${signup ? '200 QCC · FREE' : 'WELCOME BACK'}</span>` })}</div>
        <div class="right">
          <div class="z-mark"><img src="${L}quadcode.svg" alt="Quadcode"></div>
          <h3>${signup ? 'Welcome to Quadcode' : 'Welcome back'}</h3>
          <p class="z-p">${signup ? '200 QCC free on sign-up · valid 14 days · no card required' : 'Sign in to continue where you left off'}</p>
          <div class="btns">
            <button class="z-social tint"><img src="${L}google.svg" alt=""><span>${signup ? 'Sign up with Google &amp; <b>get 200 QCC</b>' : 'Continue with Google'}</span><span class="gift">${signup ? ic('gift') : ''}</span></button>
            <button class="z-social">${ic('github')}<span>Continue with GitHub</span><span></span></button>
            <button class="z-social"><img src="${L}apple.svg" alt="" style="filter:invert(1)"><span>Continue with Apple</span><span></span></button>
            <button class="z-social"><img src="${L}microsoft.svg" alt=""><span>Continue with Microsoft</span><span></span></button>
            <div class="z-orline">OR</div>
            <button class="z-social">${ic('mail')}<span>Continue with Email</span><span></span></button>
          </div>
          ${signup
            ? `<label class="z-check"><i></i><span>I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a> and confirm I am 18 or older. Product updates are optional.</span></label>`
            : `<label class="z-check"><i></i><span>Keep me signed in on this device</span></label>`}
          <div class="z-sso">SSO available on the <a>Enterprise</a> plan · Any provider gives the same account</div>
        </div>
      </div>
    </div>`;
  }

  /* 05 · Starter Kit store modal (Higgsfield store layout, Quadcode content) */
  const STORE_TABS = (on) => `<div class="z-row" style="justify-content:center;padding:1.2em 0 1em"><div class="z-tabs">
      <span class="${on === 0 ? 'on' : ''}">Starter Kit <span class="z-chip solid">+20%</span></span>
      <span class="${on === 1 ? 'on' : ''}">Plans</span>
      <span class="${on === 2 ? 'on' : ''}">Top-up credits</span>
    </div></div>`;
  const MAKES = [
    { img: R + 'pricing/case-1.jpg', t: 'Product<br>shots', s: 'Lumi · ~40 images', chip: 'Images', cost: '5 QCC each' },
    { img: A + 'c2.jpg', t: 'Video<br>ads', s: 'Sonic · ~12 clips', chip: 'Video', cost: '~90 QCC each' },
    { img: R + 'pricing/case-6.jpg', t: 'Music &amp;<br>voice', s: 'Sonic · ~25 tracks', chip: 'Audio', cost: '~15 QCC each' },
    { img: R + 'pricing/case-5.jpg', t: 'Apps &amp;<br>sites', s: 'Cody · ~10 builds', chip: 'Apps', cost: 'from 60 QCC' },
  ];
  const STARTER = `<div class="z-modal">${zx()}
      ${STORE_TABS(0)}
      <div class="z-hero" style="background-image:url('${R}banners/banner_starter_kit.jpg');margin:0 1.2em;border-radius:1.1em;border:1px solid rgba(255,255,255,.08)">
        <div class="in">
          <span class="z-kick">First plan · one-time bonus</span>
          <h2 class="z-h1 up"><span class="grad">Starter</span> Kit</h2>
          <p class="z-p" style="max-width:34em">Pay <b>$20</b> for Basic and start with <b>1,200 QCC</b> instead of 1,000. The bonus lands together with your first month — same price, 20% more to create with.</p>
          <div class="chips"><span class="z-chip o">${ic('gift')} +200 QCC bonus</span><span class="z-chip">${ic('refresh')} Rolls over 1 month</span><span class="z-chip">${ic('shield')} Cancel anytime</span></div>
          <div class="acts">
            <button class="z-btn pri lg">Get Starter Kit <span class="pr">· $20</span></button>
            <button class="z-btn ghost lg">Compare plans</button>
            <span class="z-row" style="gap:.6em;margin-left:.4em"><span class="z-fine" style="text-transform:uppercase;letter-spacing:.1em">Ends in</span>${cd('starter', 'hms', 'hot')}</span>
          </div>
        </div>
      </div>
      <div style="padding:1.3em 1.2em .4em"><div class="z-row sb"><span class="z-h3">What 1,200 QCC makes</span><span class="z-fine">Estimates at today's model prices · failed steps are refunded</span></div></div>
      <div class="z-cards" style="padding:0 1.2em">
        ${MAKES.map(m => `<div class="z-cc" style="background-image:url('${m.img}')"><span class="z-chip glass">${m.chip}</span><span class="cost">${m.cost}</span><b>${m.t}<em>${m.s}</em></b></div>`).join('')}
      </div>
      <div class="z-row sb" style="padding:1.1em 1.4em 1.3em">
        <span class="z-fine">One bonus per account · Basic renews at $20/month · Yearly ($180) gets the same +20% on the first year</span>
        <button class="z-btn link">Maybe later</button>
      </div>
    </div>`;

  /* 06 · exit-intent offer (replaces Starter Kit for 5 minutes, never stacks) */
  const EXIT = `<div class="z-modal">${zx()}
      <div class="z-car" data-dur="5200" style="height:11.5em">
        <div class="z-sl on" style="background-image:url('${A}c1.jpg')"></div><div class="z-sl" style="background-image:url('${A}c5.jpg')"></div>
        <div class="tp"><span class="z-chip glass mono">Before you go</span></div>
      </div>
      <div style="padding:1.5em 1.8em 1.6em;text-align:center">
        <h2 class="z-h1" style="font-size:2.1em">Take <span class="grad">+30%</span> instead of +20%</h2>
        <p class="z-p">A bigger Starter Kit for the next five minutes: <b>1,300 QCC for $20</b>. Replaces the +20% bonus — offers never stack.</p>
        <div class="z-row" style="justify-content:center;margin:1.3em 0 1.1em">${cd('exit', 'ms', 'lg lab hot')}</div>
        <div class="z-bar thin" data-prog="exit" style="margin:0 3em 1.4em"><i></i></div>
        <div class="z-stack">
          <button class="z-btn pri lg block">Claim +30% <span class="pr">· $20 / month</span></button>
          <button class="z-btn ghost block">No thanks, keep browsing</button>
        </div>
        <p class="z-fine" style="margin-top:1em">Shown once · expires for real · your 200 free QCC stay either way</p>
      </div>
    </div>`;

  /* 07 · top-up store: packs + auto-refill */
  const PACKS = [
    { amt: '100', bonus: '', price: '$2', rate: '$1 = 50 QCC', on: false },
    { amt: '500', bonus: '', price: '$10', rate: '$1 = 50 QCC', tag: 'Popular', on: true },
    { amt: '1,000', bonus: '+50 bonus (5%)', price: '$20', rate: '$1 = 52.5 QCC', on: false },
    { amt: '4,000', bonus: '+400 bonus (10%)', price: '$80', rate: '$1 = 55 QCC', tag: 'Best value', on: false },
  ];
  const pack = p => `<div class="z-pack ${p.on ? 'on' : ''}">${p.tag ? `<span class="z-chip ${p.tag === 'Popular' ? 'solid' : 'g'} tag">${p.tag}</span>` : ''}<span class="rd"></span>
      <div class="amt">${p.amt}<small>QCC</small></div><div class="bns ${p.bonus ? '' : 'none'}">${p.bonus || 'No bonus'}</div><div class="prc">${p.price}</div><div class="rate">${p.rate}</div></div>`;
  const TOPUP = `<div class="z-modal">${zx()}
      ${STORE_TABS(2)}
      <div style="display:grid;grid-template-columns:1.55fr 1fr;gap:1.4em;padding:0 1.4em 1.4em">
        <div>
          <h2 class="z-h2">Top up credits</h2>
          <p class="z-p" style="margin-bottom:1.4em">Credits never expire on a paid plan. Pick a pack — the bigger, the cheaper per credit.</p>
          <div class="z-packs">${PACKS.map(pack).join('')}</div>
          <div class="z-row sb" style="margin-top:1.2em;padding:1em 1.1em;border:1px solid var(--z-line);border-radius:1em;background:rgba(255,255,255,.025)">
            <div><b style="font-size:.95em">Auto-refill</b><div class="z-fine">When balance drops below <b>100 QCC</b>, add <b>500 QCC ($10)</b>. Monthly cap <b>$50</b>. Off by default.</div></div>
            <span class="z-sw"></span>
          </div>
        </div>
        <div style="padding:1.2em;border-radius:1.1em;background:rgba(255,255,255,.03);border:1px solid var(--z-line);display:grid;align-content:start;gap:1em">
          <span class="z-kick">Summary</span>
          <div class="z-sum">
            <div class="r"><span>Pack</span><span>500 QCC</span></div>
            <div class="r"><span>Bonus</span><span class="z-dim">—</span></div>
            <div class="r"><span>Balance after</span><span class="z-ok">766 → 1,266 QCC</span></div>
            <div class="r tot"><span>Due today</span><span>$10.00</span></div>
          </div>
          <div class="z-row sb" style="padding:.7em .8em;border-radius:.7em;background:rgba(255,255,255,.04);font-size:.9em"><span class="z-row" style="gap:.5em">${ic('card')}<span style="white-space:nowrap">Visa •••• 4242</span></span><span class="z-dim">Change</span></div>
          <button class="z-btn pri lg block">${ic('lock')} Pay $10.00</button>
          <div class="z-row" style="justify-content:center;gap:.6em;opacity:.8"><img src="${L}applepay.svg" style="height:1.4em" alt="Apple Pay"><img src="${L}visa.svg" style="height:1.1em" alt="Visa"><img src="${L}mastercard.svg" style="height:1.3em" alt="Mastercard"><img src="${L}stripe.svg" style="height:1.2em" alt="Stripe"></div>
          <p class="z-fine" style="text-align:center">Credits land instantly · invoice by email · refunds on failed steps</p>
        </div>
      </div>
    </div>`;

  /* 08 · current-plan card (replaces the flat card on /profile/plans) */
  const PLAN = `<div class="z-plan">
      <div class="z-row" style="gap:1em">
        <span class="ic">${ic('check')}</span>
        <div><div class="k"><span class="dot"></span>Current plan · Active</div><div class="nm">Basic Monthly</div><div class="z-fine">1,000 QCC / month · $20 · renews <b style="color:#fff">Sep 7, 2026</b></div></div>
      </div>
      <div class="mid">
        <div class="bal"><b>766<small>/ 1,000 QCC</small></b><span class="z-fine">12 days left in cycle</span></div>
        <div class="z-bar split"><i style="--w:76.6%"></i><i class="pro" style="--w:18%"></i></div>
        <div class="leg"><span><i></i>Plan credits 586</span><span><i class="pro"></i>Top-ups 180</span><span class="z-dim">Unused plan credits roll over 1 month</span></div>
      </div>
      <div class="right">
        <span class="save">${ic('crown')} Yearly saves <b>$60</b> · switch, keep your balance</span>
        <div class="acts"><button class="z-btn pri sm">Switch to Yearly · $180</button><button class="z-btn ghost sm">Top up</button></div>
      </div>
      <div class="more">
        <span class="z-row" style="gap:.5em;font-size:.82em;color:var(--z-mut)">Auto-refill <span class="z-sw"></span></span>
        <a class="cancel">Pause or cancel</a>
      </div>
    </div>`;

  /* 09 · switch commitment (transparent proration) */
  const SWITCH = `<div class="z-modal pad">${zx()}
      <span class="z-kick">Change plan</span>
      <h2 class="z-h1" style="font-size:2em">Switch to <span class="grad">Yearly</span></h2>
      <p class="z-p">Same 1,000 QCC every month, billed once a year. You keep your current balance and your renewal date moves to today.</p>
      <div class="z-sum" style="margin:1.3em 0 1.2em;padding:1.1em 1.2em;border-radius:1em;background:rgba(255,255,255,.03);border:1px solid var(--z-line)">
        <div class="r"><span>Yearly plan</span><span>$180.00 <span class="z-strike">$240</span></span></div>
        <div class="r"><span>Unused 12 days on Basic Monthly</span><span class="z-ok">− $8.00</span></div>
        <div class="r"><span>Yearly bonus (first year, +20%)</span><span class="z-ok">+ 2,400 QCC</span></div>
        <div class="r"><span>Balance today</span><span>766 QCC · stays</span></div>
        <div class="r tot"><span>Due today</span><span>$172.00</span></div>
      </div>
      <div class="z-row" style="gap:.7em"><button class="z-btn pri lg" style="flex:1">${ic('lock')} Switch and pay $172.00</button><button class="z-btn ghost lg">Keep monthly</button></div>
      <p class="z-fine" style="margin-top:1em">Next renewal Sep 25, 2027 · Visa •••• 4242 · Downgrades apply at the end of the period — you never lose paid time.</p>
    </div>`;

  /* 10 · one-screen cancel with save offer */
  const CANCEL = `<div class="z-modal pad">${zx()}
      <span class="z-kick">Basic Monthly · renews Sep 7</span>
      <h2 class="z-h1" style="font-size:2em">Cancel your plan?</h2>
      <p class="z-p">You keep <b>766 QCC</b> and full access until <b>Sep 7, 2026</b>. Nothing is charged after that. One screen, no survey — but here are two ways to keep creating for less:</p>
      <div class="z-stack" style="margin:1.3em 0">
        <div class="z-opt hot"><span class="ic">${ic('percent')}</span><div><b>Stay for 25% off — 2 months</b><small>$15/month instead of $20. Applied instantly, ends automatically. Available once per year.</small></div><span class="go">Apply →</span></div>
        <div class="z-opt"><span class="ic">${ic('pause')}</span><div><b>Pause for 1 month</b><small>No charge next cycle. Credits and projects wait for you; the plan resumes on Oct 7.</small></div><span class="go">Pause →</span></div>
      </div>
      <div class="z-row" style="gap:.7em"><button class="z-btn ghost lg" style="flex:1">Keep my plan</button><button class="z-btn soft lg" style="flex:1">Cancel at period end</button></div>
      <p class="z-fine" style="margin-top:1em">Cancelling takes one click — no confirmation chains. Your 766 QCC stay usable for 30 days after the plan ends.</p>
    </div>`;

  /* 11 · referral card in the sidebar */
  const REFER = `<div class="z-side"><span class="art"></span>
      <span class="ic">${ic('users')}</span>
      <b>Invite a friend,<br>you both get 200 QCC</b>
      <p>Credited after their first purchase. Up to 10 friends a month.</p>
      <button class="z-btn w sm block">${ic('copy')} Copy invite link</button>
      <div class="z-bar thin" style="margin-top:.8em"><i style="--w:30%"></i></div>
      <div class="prog"><span>3 / 10 rewarded</span><span>+600 QCC</span></div>
    </div>`;

  /* ========================================================================
     COMPONENTS — IDE (light)
     ======================================================================== */
  const ART = { new: A + 'banner/bg_new_user_light.jpg', promo: A + 'banner/bg_promo_user_light.jpg', sub: A + 'banner/bg_has_subscription_light.jpg', out: A + 'banner/bg_out_of_credits_light.jpg' };

  /* 12 · IDE banner — one layout, four states */
  function ideBanner(state) {
    const S = {
      new: { tint: 'rgba(20,184,166,.22)', chip: `<span class="zi-chip teal">${ic('gift')} Starter Kit · first plan</span>`, t: 'Get <em>1,200 QCC</em> for $20', s: `+20% on your first Basic month · one-time · cancel anytime`, cd: `<span class="cd">${ic('clock')} ${itt('starter')}</span>`, pri: 'Get Starter Kit · $20', sec: 'See plans' },
      promo: { tint: 'rgba(124,58,237,.2)', chip: `<span class="zi-chip violet">${ic('ticket')} Code SPRING20 applied</span>`, t: '20% off Basic — <em>$16</em> first month', s: `Promo is attached to your account · pays out at checkout`, cd: `<span class="cd">${ic('clock')} ${itt('promo', 'dhms')}</span>`, pri: 'Redeem at checkout', sec: 'Details' },
      sub: { tint: 'rgba(245,158,11,.22)', chip: `<span class="zi-chip gold">${ic('crown')} Basic Monthly · 766 QCC</span>`, t: 'Yearly saves <em>$60</em> — keep your balance', s: `$180/yr instead of $240 · same 1,000 QCC every month · pro-rated today`, cd: `<span class="price"><b>$180</b><s>$240</s></span>`, pri: 'Switch to Yearly', sec: 'Compare' },
      out: { tint: 'rgba(239,68,68,.2)', chip: `<span class="zi-chip red">${ic('battery')} Balance 0 QCC</span>`, t: 'Out of credits — <em>top up</em> to continue', s: `Your prompt is saved · 500 QCC for $10 covers ~12 video clips`, cd: `<span class="cd exp">${ic('card')} Visa •••• 4242</span>`, pri: 'Top up · 500 QCC / $10', sec: 'Other packs' },
    }[state];
    return `<div class="zi zi-banner" style="--tint:${S.tint}">
      <span class="art" style="background-image:url('${ART[state]}')"></span><span class="glow"></span>
      <div class="body">
        <div class="row">${S.chip}${S.cd}</div>
        <h4 class="zi-t">${S.t}</h4>
        <p class="zi-s">${S.s}</p>
      </div>
      <div class="acts"><button class="zi-btn pri">${S.pri}</button><button class="zi-btn ghost">${S.sec}</button></div>
      ${zix()}
    </div>`;
  }

  /* 13 · error 402 inside the chat: agent message + pay card, composer locked */
  const MSG402 = `<div class="zi zi-msg">
      <span class="av">S</span>
      <div>
        <div class="who"><b>Sonic</b><span>Video &amp; audio · just now</span></div>
        <p>Rendered 2 of 3 clips for the sneaker teaser. I need <b>~120 QCC</b> more to finish the last clip and the 3 cover images.</p>
        <div class="zi-steps">
          <div class="ok">${ic('check')} Clip 1 · Veo 3.1 · 15s — 88 QCC</div>
          <div class="ok">${ic('check')} Clip 2 · Veo 3.1 · 15s — 88 QCC</div>
          <div class="stop">${ic('alert')} Clip 3 · paused — balance 0 QCC</div>
          <div class="wait">${ic('clock')} 3 cover images · Lumi — ~15 QCC</div>
        </div>
        <div class="zi-card zi-pay">
          <div class="head"><span class="art" style="background-image:url('${ART.out}')"></span>
            <div><span class="zi-chip red">${ic('battery')} Out of credits</span><div class="bal" style="margin-top:.5em"><b>0</b><span>QCC left · 766 used this cycle</span></div></div>
            <div class="need"><span class="zi-kick">Needed to finish</span><div style="font:800 1.4em/1 var(--disp);margin-top:.3em">≈ 120 QCC</div></div>
          </div>
          <div class="body">
            <div class="zi-packs">
              <div class="zi-pack on"><span class="zi-chip solid tag">Covers this task</span><span class="rd"></span><div class="amt">500<small>QCC</small></div><div class="b none">No bonus</div><div class="pr">$10</div></div>
              <div class="zi-pack"><span class="rd"></span><div class="amt">1,000<small>QCC</small></div><div class="b">+50 bonus</div><div class="pr">$20</div></div>
              <div class="zi-pack"><span class="rd"></span><div class="amt">4,000<small>QCC</small></div><div class="b">+400 bonus</div><div class="pr">$80<small>$1 = 55 QCC</small></div></div>
            </div>
            <div class="cta"><button class="zi-btn pri block">${ic('lock')} Pay $10 with Visa •••• 4242</button><button class="zi-btn ghost">Plans</button></div>
            <div class="fine">${ic('check')} Task resumes automatically after payment ${ic('check')} Unused credits stay ${ic('check')} Failed steps refunded</div>
          </div>
        </div>
      </div>
    </div>`;
  const LOCK = `<div class="zi zi-lock"><div class="in"><span class="ic">${ic('lock')}</span><div><b>Composer paused — 0 QCC</b><small>Your prompt and attachments are kept. Top up above to continue.</small></div><button class="zi-btn pri sm">Top up</button></div></div>`;

  /* 14 · status-bar pill */
  const PILL = `<span class="zi zi-pill">${ic('gift')} Starter Kit +20% <span class="sep"></span> ${itt('starter')} <span class="sep"></span> Get it</span>`;
  const PILL_Q = `<span class="zi zi-pill quiet">${ic('coins')} 766 QCC <span class="sep" style="background:#e5e7eb"></span> <span class="zi-tt">≈ 12 days</span></span>`;
  const PILL_LOW = `<span class="zi zi-pill low">${ic('battery')} 38 QCC left <span class="sep"></span> Top up</span>`;

  /* 15 · account popover */
  const MENU = `<div class="zi zi-card zi-menu">
      <div class="usr"><span class="av">AC</span><div><b>Alex Creator</b><small>creator@example.com</small></div><span class="zi-chip gold">Basic</span></div>
      <div class="balbox">
        <div class="bt"><b>766<small>QCC</small></b><span>renews Sep 7 · 1,000 QCC</span></div>
        <div class="zi-bar split"><i style="--w:76.6%"></i><i class="pro" style="--w:18%"></i></div>
        <div class="leg"><span><i></i>Plan 586</span><span><i class="pro"></i>Top-ups 180</span><span style="margin-left:auto">≈ 12 days at current pace</span></div>
      </div>
      <div class="acts"><button class="zi-btn pri">${ic('plus')} Top up</button><button class="zi-btn ghost">Plans &amp; credits</button></div>
      <div class="offer"><span class="ic">${ic('crown')}</span><div><b>Yearly saves $60 · +2,400 bonus QCC</b><small>Same 1,000 QCC / month · pro-rated today · balance stays</small></div>${ic('right')}</div>
      <div class="list">
        <div>${ic('ticket')} Apply promo code</div>
        <div>${ic('chart')} Usage &amp; forecast</div>
        <div>${ic('receipt')} Billing &amp; invoices</div>
        <div>${ic('settings')} Settings <span class="kbd">⌘ ,</span></div>
      </div>
      <div class="out">${ic('logout')} Sign out</div>
    </div>`;

  /* 16 · cost estimate + refund toast */
  const COST = `<span class="zi zi-cost">${ic('zap')} ≈ 12 QCC</span>`;
  const TIP = `<div class="zi zi-tip"><b>Estimated cost of this run</b>
      <div class="rows"><div><span>Sonic · Veo 3.1 · 15s</span><b>~88 QCC</b></div><div><span>Lumi · 3 covers</span><b>~15 QCC</b></div><div><span>Cody · page edit</span><b>~6 QCC</b></div></div>
      <small>Charged per step as it completes. Failed or cancelled steps are refunded automatically.</small></div>`;
  const TOAST = `<div class="zi zi-toast"><span class="ic">${ic('check')}</span><div><b>4.5 QCC refunded</b><small>Veo timed out on clip 2 — retried with Kling 3.0 at no extra cost</small></div><span style="font:600 .78em/1 var(--mono);color:#9ca3af">now</span></div>`;

  /* composer cover (English prompt over the original Russian one) */
  const COMPOSER = `<div class="zi zi-composer"><span class="att">${ic('image')} sneaker-ref.png · 1.2 MB</span><br>Make a 15-second launch teaser for the "Bean &amp; Brew" sneaker drop: three cinematic clips (studio spin, dust close-up, night run), synth soundtrack, end card with the price. Then generate 3 cover images for the store page.</div>`;

  window.QC_COMPONENTS = { STRIP, NAVLINK, auth, STARTER, EXIT, TOPUP, PLAN, SWITCH, CANCEL, REFER, ideBanner, MSG402, LOCK, PILL, PILL_Q, PILL_LOW, MENU, COST, TIP, TOAST, COMPOSER, car, ov, cd, tt, ic };
  /* ========================================================================
     STAGES — geometry of the real screenshots (percent of the base image)
     ======================================================================== */
  const HOME = { bw: 1366, baseImg: A + 'qc/home.png' };
  const SIGNIN = { bw: 1366, baseImg: A + 'qc/signin.png' };
  const PLANS = { bw: 1847, baseImg: A + 'qc/plans-po.png' };
  const IDE = { bw: 1915, baseImg: A + 'qc/ide-po.png' };
  const COMPOSER_OV = ov('top:61.7%;left:1.15%;width:61.8%;height:28.6%;background:#e8e8e8;border-radius:.6em;overflow:hidden', COMPOSER);
  const AUTH_BOX = 'top:11%;left:20%;width:60%;height:78%';
  const mark = (pos, text) => `<div class="newmark" style="${pos}">${text}</div>`;

  const anat = (...rows) => rows.map(r => ({ b: r[0], t: r[1] }));

  /* ========================================================================
     BLOCKS
     ======================================================================== */
  const BLOCKS_DATA = {
    site: [
      {
        id: 'site-strip', num: '02', title: 'Pricing link + one honest offer strip on the landing', where: 'quadcode.ai · every visitor', opt: 'Quick win',
        hf: { src: 'Live · 25 Sep · logged in', img: A + 'hf-live/pricing-logged.png', alt: 'Higgsfield pricing with promo banner',
          notes: [{ text: 'Pricing is one click away in the header, with a "30% OFF" badge' }, { text: 'A promo banner sits on top of the plans: "SPECIAL 30% OFF … Get unlimited access"' }, { text: 'Every plan card shows its discount and the yearly saving ("Save €360")' }] },
        qc: { ...HOME, src: 'quadcode.ai home · new strip under the header + Pricing in the nav',
          overlaysHtml: ov('top:8.2%;left:4.7%;width:90.6%;height:5.6%', STRIP) + ov('top:3.2%;left:67.6%;height:3.2%;display:flex;align-items:center', NAVLINK) + mark('top:16.5%;left:50%', 'NEW · OFFER STRIP + PRICING LINK'),
          notes: [{ ok: true, text: 'Today there is no Pricing link and /pricing is a 404 — add "Pricing" to the header and make /pricing public' }, { ok: true, text: 'The strip shows the one active offer with a real server-side deadline (no reset on reload)' }, { ok: true, text: 'Signed-out visitors see "200 QCC free at sign-up"; signed-in users see their personal offer' }] },
        impact: { metric: 'Landing → sign-up rate, /pricing views', wave: 'Wave 1', target: 'All visitors' },
        spot: { theme: 'dark', size: 'Strip 1238×46 px (100% of container, 46 px tall) · nav link 15 px Outfit 500', items: [
          { name: 'Signed out', w: 1238, html: `<div style="height:3.3em">${STRIP}</div>`, anat: anat(['Gift icon', 'Rounded 26 px square, white 18%'], ['Message', 'Geist 600 14 px, bold values'], ['Live timer', 'Geist Mono 800, tabular, black 30% pill'], ['CTA', 'White pill 30 px, "Start for free →"'], ['Dismiss', '×, remembers for 7 days']) },
          { name: 'Signed in · Starter Kit', w: 1238, html: `<div style="height:3.3em"><div class="z-strip"><span class="gift">${ic('gift')}</span><span class="t"><b>Your Starter Kit:</b> 1,200 QCC for $20 on your first plan</span><span class="sep"></span><span class="t">Ends in ${tt('starter', 'hms', 'pill')}</span><a class="go">Get Starter Kit ${ic('arrow')}</a><span class="x">${ic('x')}</span></div></div>`, anat: anat(['Personal offer', 'Text comes from /offers/active'], ['Same deadline', 'Identical to the IDE banner and the account page'], ['CTA', 'Deep-links to /profile/plans?offer=starter']) },
          { name: 'Nav link', w: 420, html: `<div style="display:flex;gap:2.2em;align-items:center;height:48px;padding:0 1.4em;border-radius:.8em;background:#000;border:1px solid rgba(255,255,255,.08)"><span class="z-navlink" style="font-weight:400;color:#a3abbd">Integrations</span><span class="z-navlink" style="font-weight:400;color:#a3abbd">Download</span>${NAVLINK}</div>`, anat: anat(['"Pricing"', 'Same type as the other nav items'], ['"New" chip', 'Gradient, 8 px uppercase, drops after 30 days']) },
        ] },
        spec: { show: 'Strip: every visitor while an offer is active; hidden after purchase or dismiss (7 days). Nav link: always.', logic: ['Offer object comes from <code>GET /offers/active</code> (server time, deadline ISO)', 'Countdown counts down to <code>deadline</code>; at zero the strip unmounts', 'Signed-out copy = welcome credits; signed-in copy = personal offer', 'Dismiss stores <code>strip_dismissed_until</code> per offer id'], data: ['offer.id, offer.kind, offer.deadline, offer.bonus_pct', 'Route <code>/pricing</code> returns 200 (public plans page)'], done: 'Strip renders in < 100 ms after first paint, no layout shift (reserve 46 px). Timer never resets on reload.', events: ['strip_view', 'strip_click', 'strip_dismiss', 'nav_pricing_click'] }
      },
      {
        id: 'site-signup', num: '03', title: 'One-screen sign-up with welcome credits', where: 'quadcode.ai · "Start for free"', opt: 'Quick win',
        hf: { src: 'Live · 25 Sep · signed out → Sign up', img: A + 'hf-live/signup-modal.png', alt: 'Higgsfield sign-up modal',
          notes: [{ text: 'One screen: creative carousel on the left, providers on the right' }, { text: 'Incentive inside the modal: "Sign in with business email & Get 50 credits"' }, { text: 'Google, Apple, Microsoft or Email — no name or password fields' }] },
        qc: { ...HOME, dim: true, src: 'quadcode.ai · sign-up modal (1:1 layout, Quadcode style)',
          overlaysHtml: ov(AUTH_BOX, auth('signup')) + mark('top:6.5%;left:50%', 'NEW · REPLACES THE 5-FIELD FORM'),
          notes: [{ ok: true, text: 'Today: 5 fields (first name, last name, email, password, promo code) and no reason to finish' }, { ok: true, text: 'New: same two-column modal as Higgsfield — creative story left, equal-size provider buttons right' }, { ok: true, text: 'Google is the incentivised button (+200 QCC); GitHub, Apple, Microsoft and Email are equal-height outlines' }, { ok: true, text: 'Promo code moves to Plans & Credits → "Apply promo code"; consent checkbox is unchecked by default' }] },
        impact: { metric: 'Sign-up completion rate', wave: 'Wave 1', target: 'New visitors' },
        spot: { theme: 'dark', size: 'Modal 820×640 px at 1366 wide (60% × 78%) · left column 46% · buttons 42 px tall, radius 11 px · logo mark 48 px', items: [
          { name: 'Sign up', w: 820, html: `<div style="height:45.7em">${auth('signup')}</div>`, anat: anat(['Creative carousel', '4 slides, 4.6 s each, Ken Burns zoom, story segments with labels'], ['Logo mark', '48 px rounded square, gradient tint'], ['Title + sub', 'Outfit 800 22 px / Geist 13 px muted'], ['Incentive button', 'Tinted gradient outline, gift icon, "+200 QCC"'], ['Providers', '4 equal outline buttons 42 px, 14 px logos'], ['Consent', 'Unchecked checkbox, Terms / Privacy / 18+'], ['SSO line', 'Enterprise SSO hint, 11 px']) },
          { name: 'Sign in', w: 820, html: `<div style="height:45.7em">${auth('signin')}</div>`, anat: anat(['Same shell', 'Only copy changes: "Welcome back"'], ['No incentive', 'Google button keeps the tint but no gift'], ['Remember me', 'Replaces the consent line']) },
        ] },
        spec: { show: 'Any "Start for free" / "Sign in" click and any protected route while signed out. Return to the requested page after auth.', logic: ['Providers: Google, GitHub, Apple, Microsoft, Email (magic link) — no password field', 'Welcome credits: 200 QCC granted once per verified account (device + email dedupe)', 'Carousel autoplays; pauses on hover; click a segment to jump', 'Turnstile runs invisibly; consent checkbox must be checked to continue (signup only)'], data: ['auth.provider, auth.redirect_to, welcome_credits_granted', 'Slides: 4 images 3:4 ≥ 900 px, chip label, title, subtitle'], done: 'Modal opens < 150 ms, all 5 buttons the same height, keyboard-navigable, focus trapped, Esc closes. Lighthouse a11y ≥ 95.', events: ['auth_open', 'auth_provider_click', 'auth_success', 'welcome_credits_granted'] }
      },
      {
        id: 'site-signin', num: '04', title: 'Sign-in that brings you back to the page you opened', where: 'quadcode.ai · "Sign in" + protected pages', opt: 'Quick win',
        hf: { src: 'Live · 25 Sep · signed out → Login', img: A + 'hf-live/login-modal.png', alt: 'Higgsfield login modal',
          notes: [{ text: 'Login opens the same one-screen modal as sign-up' }, { text: 'The 50-credit incentive is shown to returning visitors too' }, { text: 'We signed back in with Google in 2 clicks' }] },
        qc: { ...SIGNIN, dim: true, src: 'quadcode.ai · sign-in modal over the old form',
          overlaysHtml: ov(AUTH_BOX, auth('signin')) + ov('top:91.5%;left:30%;width:40%', `<div class="z-toast"><span class="ic o">${ic('gift')}</span><div><b>Welcome back, Emil</b><small>Your Starter Kit (+20%) is still available for ${tt('starter', 'human')}</small></div><span class="z-btn sm pri">Open</span></div>`) + mark('top:6.5%;left:50%', 'NEW · RETURNS YOU TO THE PAGE YOU ASKED FOR'),
          notes: [{ ok: true, text: 'Today: opening /profile/plans while signed out silently drops you on the home page' }, { ok: true, text: 'New: show this modal instead and return to the requested page after sign-in' }, { ok: true, text: 'If an offer is running, a toast after sign-in shows how long is left' }] },
        impact: { metric: 'Sign-in → Plans & Credits reach', wave: 'Wave 1', target: 'Returning users' },
        spot: { theme: 'dark', size: 'Toast 520×64 px, bottom-center, 6 s auto-hide', items: [
          { name: 'Post sign-in toast', w: 520, html: `<div class="z-toast"><span class="ic o">${ic('gift')}</span><div><b>Welcome back, Emil</b><small>Your Starter Kit (+20%) is still available for ${tt('starter', 'human')}</small></div><span class="z-btn sm pri">Open</span></div>`, anat: anat(['Icon', 'Orange tint, gift'], ['Copy', 'Name + remaining time in human format'], ['Action', 'Small primary → Plans & Credits with offer preselected']) },
        ] },
        spec: { show: 'Protected route while signed out → modal. After success → redirect to the original URL. Toast only if an offer is active.', logic: ['Store <code>redirect_to</code> in the auth state param', 'Toast appears 400 ms after redirect, once per session'], data: ['session.redirect_to, offer.deadline'], done: 'No user ever lands on the home page after sign-in from a deep link.', events: ['auth_redirect_back', 'offer_toast_view', 'offer_toast_click'] }
      },
    ],

    account: [
      {
        id: 'acc-starter', num: '05', title: 'Starter Kit pops up on the first plan click', where: 'Plans & Credits · new user, no purchase yet', opt: 'Core',
        hf: { src: 'Live · 25 Sep · logged in', img: A + 'hf-live/store-unlimited.png', alt: 'Higgsfield store modal with hero offer',
          notes: [{ text: 'Clicking a promo opens a store modal with the offer as a full-bleed cinematic hero' }, { text: 'Three tabs in one place: Upgrade Plan · Top-up Credits · Unlimited Models' }, { text: 'Row of creative cards with huge display titles under the hero' }] },
        qc: { ...PLANS, dim: true, src: 'Plans & Credits · Starter Kit store modal',
          overlaysHtml: ov('top:5%;left:22%;width:56%', STARTER) + mark('top:2%;left:50%', 'NEW · FIRST CLICK ON ANY PLAN BUTTON'),
          notes: [{ ok: true, text: 'Shown once, on the first click on any plan button, to users without a purchase' }, { ok: true, text: 'Hero art + "What 1,200 QCC makes" cards with real per-step prices — value, not a fake strike-through' }, { ok: true, text: '24 h deadline from the first visit, stored on the server — same deadline on the site and in the app' }, { ok: true, text: '"Maybe later" closes it; the slim strip stays until the deadline' }] },
        impact: { metric: 'First purchase within 24h', wave: 'Wave 1', target: 'New users' },
        spot: { theme: 'dark', size: 'Modal 1034 px wide · hero 294 px · cards 161 px · radius 18 px · CTA 48 px', items: [
          { name: 'Starter Kit tab', w: 1034, html: STARTER, anat: anat(['Segmented tabs', 'White pill = active; "+20%" chip on Starter Kit'], ['Hero', 'banner_starter_kit.jpg, left gradient scrim, Outfit 800 48 px uppercase title'], ['Chips', 'Bonus / rollover / cancel anytime'], ['CTAs', 'Gradient primary "Get Starter Kit · $20" + ghost "Compare plans" + live HH:MM:SS boxes'], ['Cards', '4 creative cards, agent + count + per-step cost'], ['Footer', 'One-bonus rule + neutral "Maybe later"']) },
          { name: 'Plans tab', w: 1034, html: `<div class="z-modal">${zx()}${STORE_TABS(1)}<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.9em;padding:0 1.4em 1.4em">${[['Free', '$0', 'Credits via promo code', ['Every model', 'Desktop app', 'Community'], false, 'Current'], ['Basic Monthly', '$20', '1,000 QCC / month · +200 with Starter Kit', ['Unused credits roll over 1 month', 'Priority queue', 'Cancel anytime'], true, 'Get Starter Kit · $20'], ['Basic Yearly', '$180', '12,000 QCC / year · <span class="z-strike">$240</span> · Save 25%', ['Same +20% on the first year', 'Best value', 'Invoice on request'], false, 'Choose Yearly']].map(p => `<div style="padding:1.3em;border-radius:1em;border:1px solid ${p[4] ? 'var(--g1)' : 'var(--z-line)'};background:${p[4] ? 'linear-gradient(180deg,rgba(255,106,0,.1),transparent)' : 'rgba(255,255,255,.02)'}"><div class="z-row sb"><b>${p[0]}</b>${p[4] ? '<span class="z-chip solid">Starter Kit +20%</span>' : ''}</div><div class="z-h1" style="font-size:2.2em;margin:.3em 0 .1em">${p[1]}</div><div class="z-fine" style="margin-bottom:1em">${p[2]}</div><div class="z-stack" style="gap:.4em;margin-bottom:1.2em">${p[3].map(f => `<div class="z-row" style="gap:.5em;font-size:.88em;color:var(--z-mut)">${ic('check')} ${f}</div>`).join('')}</div><button class="z-btn block ${p[4] ? 'pri' : 'ghost'}">${p[5]}</button></div>`).join('')}</div></div>`, anat: anat(['3 real plans', 'Free / Monthly $20 / Yearly $180 — same numbers as today'], ['Bonus shown on the plan', 'No anchor prices; bonus credits instead'], ['One primary', 'Only the recommended plan uses the gradient button']) },
        ] },
        spec: { show: 'First click on any plan CTA by a user with 0 purchases → open store modal on the Starter Kit tab. Once per account.', logic: ['Deadline = <code>first_seen_at + 24h</code>, server-side, shared by site + IDE', 'Bonus +20% applied to the first Basic charge (monthly or yearly) via checkout metadata', 'Never stacks with the exit offer (06) — the exit offer replaces it for 5 min', 'Cards use live price table: image 5 QCC, video ~90 QCC, track ~15 QCC, build from 60 QCC'], data: ['offer{id:"starter", bonus_pct:20, deadline}', 'price_table (per-step estimates), hero + 4 card images'], done: 'Deadline identical across surfaces (±1 s). After expiry the tab shows regular Plans with no bonus. Modal is scrollable below 800 px height.', events: ['store_open{tab}', 'store_tab_change', 'starter_cta_click', 'starter_dismiss', 'checkout_start{offer}'] }
      },
      {
        id: 'acc-exit', num: '06', title: '"5 minutes left" bonus when leaving without buying', where: 'Plans & Credits · exit intent', opt: 'Core',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/89-exit-intent-62pct.png', alt: 'Higgsfield exit-intent discount',
          notes: [{ text: 'Moving to close the tab triggers "EXTRA DISCOUNT ADDED · 62% OFF · 07:58 LEFT"' }, { text: 'After closing it, a sticky bar keeps the countdown and all prices are recalculated' }, { text: 'Plus €47 → €32, Ultra €99 → €63 while the timer runs' }] },
        qc: { ...PLANS, dim: true, src: 'Plans & Credits · exit popup',
          overlaysHtml: ov('top:9%;left:33%;width:34%', EXIT) + mark('top:5.5%;left:50%', 'NEW · ONCE PER ACCOUNT · REAL 5 MIN'),
          notes: [{ ok: true, text: 'Fires once per account when the cursor leaves the page and there is no purchase yet' }, { ok: true, text: 'Real 5-minute server deadline with a draining progress bar; when it ends the bonus falls back to +20%' }, { ok: true, text: 'Replaces the Starter Kit bonus (+20% → +30%), never stacks with it; decline button is neutral' }] },
        impact: { metric: 'Checkouts started from the popup', wave: 'Wave 2', target: 'Hesitating new users' },
        spot: { theme: 'dark', size: 'Modal 628 px wide · art 161 px · MM:SS boxes 45 px · CTA 48 px', items: [
          { name: 'Exit offer', w: 628, html: EXIT, anat: anat(['Art', '2-slide crossfade, "Before you go" chip'], ['Headline', 'Outfit 800 29 px, gradient on "+30%"'], ['Countdown', 'MM:SS boxes + progress bar draining in real time'], ['Buttons', 'Gradient primary / ghost "No thanks, keep browsing"'], ['Fine print', '"Shown once · expires for real"']) },
        ] },
        spec: { show: 'Desktop: mouse leaves viewport at the top. Mobile: back gesture / tab hide. Only on Plans & Credits, only if purchases = 0 and not shown before.', logic: ['Server creates <code>offer{id:"exit", bonus_pct:30, deadline:+5m}</code>; client only renders', 'While active, Starter Kit (05) copy switches to +30% everywhere', 'After expiry: fall back to +20% silently, no second exit offer ever'], data: ['offer.exit.shown_at, offer.exit.deadline'], done: 'Fires exactly once per account. Timer is server time. Closing with × or ghost never re-triggers.', events: ['exit_offer_view', 'exit_offer_claim', 'exit_offer_decline', 'exit_offer_expire'] }
      },
      {
        id: 'acc-topup', num: '07', title: 'Top-up store with bonus packs and auto-refill', where: 'Plans & Credits · "Top up balance"', opt: 'Core',
        hf: { src: 'Live · 25 Sep · logged in', img: A + 'hf-live/store-topup.png', alt: 'Higgsfield top-up store',
          notes: [{ text: '7 packs from 100 to 5,000 credits (slider up to 25k), each with a strike price' }, { text: '"Most popular" and "Best value" tags, "€1 = N credits", "valid 90 days"' }, { text: 'Auto-refill banner at the top with a "Set up" button' }] },
        qc: { ...PLANS, dim: true, src: 'Plans & Credits · top-up store (fixes the broken "Failed to load credit packages" modal)',
          overlaysHtml: ov('top:12%;left:22%;width:56%', TOPUP) + mark('top:8.5%;left:50%', 'NEW · BONUS PACKS + AUTO-REFILL + SUMMARY'),
          notes: [{ ok: true, text: 'Today: modal fails to load packs and shows only a raw Stripe card form' }, { ok: true, text: 'New: 4 real packs with bonus credits on the bigger ones (+5% / +10%), tags and a "$1 = N QCC" line' }, { ok: true, text: 'Order summary with balance after purchase, saved card, wallets; auto-refill off by default, capped, one switch' }] },
        impact: { metric: 'Average top-up size, top-ups per payer', wave: 'Wave 2', target: 'Paying users' },
        spot: { theme: 'dark', size: 'Modal 1034 px · pack cards 4-up, radius 14 px · summary column 36%', items: [
          { name: 'Top-up tab', w: 1034, html: TOPUP, anat: anat(['Packs', '100 / 500 / 1,000 (+50) / 4,000 (+400) — real prices'], ['Selected state', 'Orange border + glow + radio'], ['Auto-refill', 'Threshold 100 → add 500 ($10), cap $50/mo, off by default'], ['Summary', 'Pack, bonus, balance after, due today'], ['Pay', 'Gradient with lock icon; wallets row below']) },
          { name: 'Pack card states', w: 700, html: `<div class="z-packs" style="grid-template-columns:repeat(3,1fr)">${pack({ amt: '500', bonus: '', price: '$10', rate: '$1 = 50 QCC' })}${pack({ amt: '1,000', bonus: '+50 bonus (5%)', price: '$20', rate: '$1 = 52.5 QCC', on: true })}${pack({ amt: '4,000', bonus: '+400 bonus (10%)', price: '$80', rate: '$1 = 55 QCC', tag: 'Best value' })}</div>`, anat: anat(['Default', '1 px white 10% border'], ['Selected', 'Orange border, inner ring, soft glow'], ['Tag', 'Floats over the top edge: solid = popular, green = best value']) },
        ] },
        spec: { show: '"Top up balance" anywhere (sidebar, plan card, IDE) → store modal on the Top-up tab with the 500 pack preselected.', logic: ['Packs from <code>GET /credits/packs</code>; fix the current 500 on that endpoint', 'Bonus credits granted server-side on payment success', 'Auto-refill = Stripe off-session charge; threshold, amount, monthly cap stored per user; toggle off in one click'], data: ['pack{qcc, bonus_qcc, price_usd}', 'user.auto_refill{enabled, threshold, pack_id, cap_usd}'], done: 'Packs render even when Stripe is slow (skeleton). Summary math always equals the Stripe charge. Refill never exceeds the cap.', events: ['topup_open', 'topup_pack_select', 'topup_pay', 'autorefill_toggle'] }
      },
      {
        id: 'acc-plan-card', num: '08', title: 'Current plan card that shows value, not just a Cancel button', where: 'Plans & Credits · paying user', opt: 'Quick win',
        hf: { src: 'Live · 25 Sep · logged in', img: A + 'hf-live/subscription.png', alt: 'Higgsfield subscription page',
          notes: [{ text: '"Your plan renews October 15, 2026" with an "Upgrade plan" button next to it' }, { text: 'Credits block: monthly credits left, auto-refill credits, "Buy credits"' }, { text: '"Saved in total", "Your plan includes"; cancellation is at the very bottom' }] },
        qc: { ...PLANS, src: 'Plans & Credits · current plan card',
          overlaysHtml: ov('top:16.9%;left:15.5%;width:84.1%;height:12.9%', PLAN) + mark('top:31.2%;left:57%', 'NEW · VALUE AT A GLANCE'),
          notes: [{ ok: true, text: 'Today: plan name, next billing date and a big Cancel button — nothing about what you get' }, { ok: true, text: 'New: balance split (plan vs top-ups), days left, renewal, yearly saving, auto-refill switch — one row' }, { ok: true, text: 'Cancel stays visible as a small link — we do not bury it the way Higgsfield does' }] },
        impact: { metric: 'Monthly → Yearly switches, top-ups from this page', wave: 'Wave 1', target: 'Paying users' },
        spot: { theme: 'dark', size: 'Card 1553×126 px · 4 columns 1.05 / 1.25 / 1.45 / .7 fr · radius 14 px', items: [
          { name: 'Active · Basic Monthly', w: 1553, html: `<div style="height:9em">${PLAN}</div>`, anat: anat(['Status', 'Green dot + "Current plan · Active"'], ['Balance', '766 / 1,000 with split bar (plan vs top-ups)'], ['Save hint', 'Crown chip "Yearly saves $60"'], ['Actions', 'Primary switch, ghost top-up, auto-refill switch'], ['Cancel', 'Underlined small link, always visible']) },
          { name: 'Low balance', w: 1553, html: `<div style="height:9em">${PLAN.replace('766<small>/ 1,000 QCC</small>', '38<small>/ 1,000 QCC</small>').replace('--w:76.6%', '--w:3.8%').replace('--w:18%', '--w:0%').replace('12 days left in cycle', '<span class="z-or">≈ 1 day at current pace</span>').replace('Switch to Yearly · $180', 'Top up 500 QCC · $10').replace('Yearly saves <b>$60</b> · switch, keep your balance', 'Running low · auto-refill keeps tasks going')}</div>`, anat: anat(['Bar', 'Turns orange under 10%'], ['Primary', 'Becomes "Top up 500 QCC · $10"'], ['Hint', 'Runway estimate replaces the yearly saving']) },
        ] },
        spec: { show: 'Replaces the flat plan card on /profile/plans for any user with a subscription.', logic: ['Runway = balance / 7-day average daily spend', 'Primary CTA: Yearly switch if monthly; Top up if balance < 10%', 'Auto-refill switch mirrors the store setting'], data: ['sub{plan, status, renews_at}, balance{plan_qcc, topup_qcc}, usage_7d'], done: 'One row at ≥ 1280 px; stacks to 2 rows below. Cancel link visible without scrolling.', events: ['plan_card_view', 'plan_switch_click', 'plan_topup_click', 'plan_cancel_click'] }
      },
      {
        id: 'acc-switch', num: '09', title: 'Fair plan switch: pay only the difference', where: 'Plans & Credits · "Switch to Yearly"', opt: 'Needs billing work',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/78-change-commitment-modal.png', alt: 'Higgsfield change commitment modal',
          notes: [{ text: '"Change commitment" shows the new price, "Unused credits −€33.53" and "Amount due today"' }, { text: 'Upgrades apply at once; downgrades at the next renewal with "Due today €0"' }] },
        qc: { ...PLANS, dim: true, src: 'Plans & Credits · switch modal',
          overlaysHtml: ov('top:16%;left:33%;width:34%', SWITCH) + mark('top:12.5%;left:50%', 'NEW · PRORATION INSTEAD OF CANCEL + FULL PRICE'),
          notes: [{ ok: true, text: 'Today: changing a plan means cancelling and paying the full new price' }, { ok: true, text: 'New: Stripe proration — unused days are credited, balance is kept, bonus carried over' }, { ok: true, text: 'Example: 12 of 30 days left on a $20 plan = −$8.00' }] },
        impact: { metric: 'Monthly → Yearly switch rate', wave: 'Wave 3', target: 'Paying users' },
        spot: { theme: 'dark', size: 'Modal 628 px · summary box radius 14 px · total 17 px', items: [{ name: 'Switch to Yearly', w: 628, html: SWITCH, anat: anat(['Kicker', '"Change plan"'], ['Lines', 'Plan, proration credit (green), bonus, balance'], ['Total', 'Dashed divider, 17 px bold'], ['Buttons', 'Primary with lock / ghost "Keep monthly"']) }] },
        spec: { show: '"Switch to Yearly" from the plan card, banner or menu.', logic: ['Preview via <code>stripe.invoices.retrieveUpcoming</code> with proration_behavior=always_invoice', 'Downgrade → schedule at period end, due today $0', 'Bonus offers apply to the first yearly charge if still active'], data: ['proration_credit, due_today, next_renewal'], done: 'Numbers in the modal match the Stripe invoice to the cent.', events: ['switch_open', 'switch_confirm', 'switch_keep'] }
      },
      {
        id: 'acc-cancel', num: '10', title: 'One-screen cancel with one honest save offer', where: 'Plans & Credits · "Pause or cancel"', opt: 'Retention',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/74-cancel-flow-screen5.png', alt: 'Higgsfield cancel flow, last screen',
          notes: [{ text: '5 screens before you can cancel: timeline, loss calculator, reasons, feedback, then "25% OFF for 2 months"' }, { text: 'Checked live on 25 Sep: "Subscription cancellation settings" sits at the very bottom of the page' }] },
        qc: { ...PLANS, dim: true, src: 'Plans & Credits · cancel modal',
          overlaysHtml: ov('top:13%;left:32%;width:36%', CANCEL) + mark('top:9.5%;left:50%', 'NEW · 1 SCREEN · NO GUILT TRIP'),
          notes: [{ ok: true, text: 'One screen; "Keep" and "Cancel" have the same size and weight' }, { ok: true, text: 'Two options: 25% off for 2 months (once a year) or pause for 1 month' }, { ok: true, text: 'Credits stay usable 30 days after the plan ends' }] },
        impact: { metric: 'Save-offer acceptance, churn', wave: 'Wave 3', target: 'Cancelling users' },
        spot: { theme: 'dark', size: 'Modal 665 px · option rows 64 px · two equal 48 px buttons', items: [{ name: 'Cancel modal', w: 665, html: CANCEL, anat: anat(['Context', 'Plan + renewal date in the kicker'], ['Options', 'Highlighted 25% row, neutral pause row'], ['Buttons', 'Equal ghost / soft — no dark pattern'], ['Fine print', 'Credits usable 30 days after']) }] },
        spec: { show: '"Pause or cancel" link on the plan card. One screen, no survey.', logic: ['Save offer: Stripe coupon 25% × 2 invoices, once per 12 months', 'Pause: pause_collection for 1 cycle', 'Cancel: cancel_at_period_end=true; access until renewal date'], data: ['sub.cancel_at, coupon_used_at, paused_until'], done: 'Cancel reachable in ≤ 2 clicks from the plan page. No repeat prompts after decline.', events: ['cancel_open', 'cancel_save_apply', 'cancel_pause', 'cancel_confirm', 'cancel_keep'] }
      },
      {
        id: 'acc-referral', num: '11', title: '"Invite a friend" card in the sidebar', where: 'Plans & Credits · sidebar', opt: 'Growth',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/104-affiliate-page.png', alt: 'Higgsfield affiliate page',
          notes: [{ text: 'Affiliate program: up to 25% cash for 12 months' }, { text: 'Friend invites give Unlimited days of a top model (3 / 5 / 7 days)' }, { text: 'Gift cards from $50 to $500' }] },
        qc: { ...PLANS, src: 'Plans & Credits · sidebar card',
          overlaysHtml: ov('top:56%;left:.8%;width:11.6%', REFER) + mark('top:88%;left:6.6%', 'NEW'),
          notes: [{ ok: true, text: 'Uses the empty space under "Desktop App"; always visible, never a popup' }, { ok: true, text: 'Credits for both sides, paid only after the friend’s first purchase (no farming)' }, { ok: true, text: 'Progress: 3 / 10 rewarded this month' }] },
        impact: { metric: 'Invites sent, referred first purchases', wave: 'Wave 3', target: 'Active users' },
        spot: { theme: 'dark', size: 'Card 214 px wide · radius 14 px · white button 33 px', items: [{ name: 'Referral card', w: 214, html: REFER, anat: anat(['Art', 'Soft orange glow, no image'], ['Icon', 'Gradient 31 px square'], ['Copy', 'Outfit 700 14 px, 2 lines'], ['Button', 'White "Copy invite link"'], ['Progress', 'Thin bar + "3 / 10 rewarded"']) }] },
        spec: { show: 'Sidebar of /profile/*, below the nav, for every signed-in user.', logic: ['Reward 200 QCC to both after referee’s first purchase; cap 10/month', 'Link <code>quadcode.ai/r/{code}</code>; copy → toast'], data: ['referral.code, rewarded_count, rewarded_qcc'], done: 'Card never overlaps the nav at 768 px height; hides below 700 px.', events: ['ref_copy', 'ref_signup', 'ref_reward'] }
      },
    ],

    ide: [
      {
        id: 'ide-banner', num: '12', title: 'Offer banner above the chat — one layout, four states', where: 'Desktop app · chat', opt: 'Marketing only',
        hf: { src: 'Live · 25 Sep · logged in', img: A + 'hf-live/image-app.png', alt: 'Higgsfield image app with special offer bar',
          notes: [{ text: 'Inside the app, a top bar: "Special offer · Unlimited Seedance 2.5 at 1080p for 7 days · 30% OFF"' }, { text: 'Header pill "Upgrade 30% OFF" is always visible' }, { text: 'The Generate button shows the price with a strike-through (8.5 → 6.5 credits)' }] },
        qc: { ...IDE, src: 'Desktop app · banner in the chat panel (state: new user)',
          overlaysHtml: COMPOSER_OV + ov('top:10.6%;left:1.2%;width:61.6%;height:10.4%', ideBanner('new')) + mark('top:22%;left:32%', 'NEW · SAME OFFER + DEADLINE AS THE SITE'),
          notes: [{ ok: true, text: 'Extends the existing 4-state subscription banner: new user / promo / subscriber / out of credits' }, { ok: true, text: 'Art from the IDE banner set (bg_*_light), white scrim on the left so text always passes AA' }, { ok: true, text: 'Chip + live timer, Outfit headline with one gradient accent word, gradient primary + ghost secondary' }, { ok: true, text: 'Same offer object and deadline as the site (one source of truth); "×" hides for 24 h' }] },
        impact: { metric: 'Banner click → purchase', wave: 'Wave 1', target: 'Desktop users without a plan' },
        spot: { theme: 'light', size: 'Banner 1180×106 px (61.6% × 10.4% of a 1915 window) · radius 15 px · buttons 37 px · min width 720 px (buttons wrap under text)', items: [
          { name: 'New user · Starter Kit', w: 1180, html: `<div style="height:7.6em">${ideBanner('new')}</div>`, anat: anat(['Art', 'bg_new_user_light.jpg, right-aligned, 300% height crop'], ['Scrim', 'White → transparent 46–82%'], ['Chip + timer', 'Teal chip, black mono timer pill'], ['Headline', 'Outfit 800 18.5 px, italic gradient "1,200 QCC"'], ['Sub', 'Geist 12.6 px muted'], ['Buttons', 'Gradient primary + ghost, 37 px'], ['Close', '27 px circle, top-right']) },
          { name: 'Promo code active', w: 1180, html: `<div style="height:7.6em">${ideBanner('promo')}</div>`, anat: anat(['Art', 'bg_promo_user_light.jpg (violet)'], ['Chip', 'Violet "Code SPRING20 applied"'], ['Timer', 'D HH:MM:SS format for multi-day codes'], ['Primary', '"Redeem at checkout"']) },
          { name: 'Subscriber · Yearly upsell', w: 1180, html: `<div style="height:7.6em">${ideBanner('sub')}</div>`, anat: anat(['Art', 'bg_has_subscription_light.jpg (gold)'], ['Chip', 'Gold crown + plan + balance'], ['Price', '$180 with struck $240 (real list price)'], ['Primary', '"Switch to Yearly" → proration modal (09)']) },
          { name: 'Out of credits', w: 1180, html: `<div style="height:7.6em">${ideBanner('out')}</div>`, anat: anat(['Art', 'bg_out_of_credits_light.jpg (red)'], ['Chip', 'Red battery "Balance 0 QCC"'], ['Card pill', 'Saved card shown instead of a timer'], ['Primary', 'One-click "Top up · 500 QCC / $10"']) },
        ] },
        spec: { show: 'Top of the chat panel. State priority: out > promo > new > sub. Hidden while a task is streaming.', logic: ['State resolver: balance ≤ 0 → out; active promo → promo; purchases = 0 → new; subscribed monthly → sub; else none', 'Timer reads <code>offer.deadline</code>; at zero the banner swaps state or unmounts', '× hides the state for 24 h (per state id); "out" cannot be dismissed while balance is 0', 'Buttons deep-link into the store modal (05/07) or proration modal (09)'], data: ['offer.active, balance.qcc, sub.plan, promo.code/expires_at, payment_method.last4'], done: 'All four states share one component and one height (106 px). Text contrast ≥ 4.5:1 over the scrim. No layout shift when the state changes.', events: ['ide_banner_view{state}', 'ide_banner_click{state,btn}', 'ide_banner_dismiss{state}'] }
      },
      {
        id: 'ide-402', num: '13', title: 'Out-of-credits card inside the chat, task resumes after payment', where: 'Desktop app · balance too low (HTTP 402)', opt: 'Core',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/06-topup.png', alt: 'Higgsfield top-up store',
          notes: [{ text: 'Out of credits → the store opens right on the Top-up tab, packs with strike prices' }, { text: 'Prompt and settings stay in place; you continue right after buying' }] },
        qc: { ...IDE, src: 'Desktop app · agent message + pay card + locked composer',
          overlaysHtml: ov('top:10.6%;left:1.6%;width:56%', MSG402) + ov('top:61.7%;left:1.15%;width:61.8%;height:28.6%;background:#e8e8e8;border-radius:.6em;overflow:hidden', COMPOSER + LOCK) + mark('top:7.8%;left:30%', 'NEW · REPLACES "BALANCE TOO LOW"'),
          notes: [{ ok: true, text: 'Today: one line "balance too low" (402) and the task just stops' }, { ok: true, text: 'New: the agent explains what is done, what is paused and how much is needed; pay card with 3 real packs' }, { ok: true, text: 'Composer is locked with the prompt kept; one-click pay with the saved card; task resumes automatically' }] },
        impact: { metric: 'Recovery after 402, time to resume', wave: 'Wave 1', target: 'Users who ran out' },
        spot: { theme: 'light', size: 'Message 1072 px wide · pay card radius 15 px · packs 3-up · CTA 37 px · lock overlay covers the composer', items: [
          { name: 'Agent message + pay card', w: 1072, html: MSG402, anat: anat(['Agent header', 'Sonic avatar, name, timestamp'], ['Step list', 'Done ✓ / paused ⚠ / waiting ○ with per-step costs'], ['Pay card head', 'Red chip, big "0 QCC", "Needed ≈ 120 QCC", art from bg_out_of_credits'], ['Packs', 'First pack tagged "Covers this task" and preselected'], ['CTA', '"Pay $10 with Visa •••• 4242" + ghost "Plans"'], ['Trust line', 'Resumes automatically · credits stay · refunds']) },
          { name: 'Locked composer', w: 1180, html: `<div style="position:relative;height:200px;background:#e8e8e8;border-radius:.6em;overflow:hidden">${COMPOSER}${LOCK}</div>`, anat: anat(['Blur', 'Composer content stays visible behind 72% white'], ['Card', 'Lock icon, "Composer paused — 0 QCC", small primary']) },
        ] },
        spec: { show: 'Any 402 from the agent runtime → append this message to the chat, lock the composer, keep the queued steps.', logic: ['needed_qcc = sum(remaining step estimates) × 1.1', 'Preselect the smallest pack ≥ needed_qcc and tag it "Covers this task"', 'On payment success → unlock composer, resume from the paused step, toast "Resumed"', 'If no saved card → CTA opens checkout in the store modal'], data: ['task.steps[{name, model, cost, status}], balance.qcc, packs, payment_method'], done: 'From 402 to resumed task in ≤ 2 clicks with a saved card. Prompt/attachments never lost. Works offline-tolerant (retry).', events: ['ide_402_view', 'ide_402_pack_select', 'ide_402_pay', 'ide_task_resumed'] }
      },
      {
        id: 'ide-pill', num: '14', title: 'Offer / balance pill in the status bar', where: 'Desktop app · bottom bar', opt: 'Marketing only',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/41-upgrade-pill.png', alt: 'Higgsfield upgrade pill',
          notes: [{ text: '"Upgrade · 30% OFF" pill next to the avatar on every page (still there on 25 Sep)' }] },
        qc: { ...IDE, src: 'Desktop app · status bar pill',
          overlaysHtml: COMPOSER_OV + ov('top:97.7%;left:39.6%;height:2.15%;display:flex;align-items:center', PILL) + mark('top:93%;left:47%', 'NEW · STATUS BAR'),
          notes: [{ ok: true, text: 'Uses free space in the existing status bar, between the job indicator and File Sync' }, { ok: true, text: 'Three states: offer (gradient) → balance (quiet) → low balance (red)' }, { ok: true, text: 'Click opens the store modal on the matching tab' }] },
        impact: { metric: 'Pill clicks, passive conversion', wave: 'Wave 1', target: 'All desktop users' },
        spot: { theme: 'light', size: 'Pill 22 px tall · 11.5 px text · gradient / white / red variants', items: [
          { name: 'Offer active', w: 320, html: `<div style="height:22px;display:flex">${PILL}</div>`, anat: anat(['Gift + name', '"Starter Kit +20%"'], ['Timer', 'HH:MM:SS mono'], ['Action', '"Get it" after a divider']) },
          { name: 'Balance (quiet)', w: 320, html: `<div style="height:22px;display:flex">${PILL_Q}</div>`, anat: anat(['Coins icon', 'Orange'], ['Balance', '766 QCC'], ['Runway', '"≈ 12 days" in orange mono']) },
          { name: 'Low balance', w: 320, html: `<div style="height:22px;display:flex">${PILL_LOW}</div>`, anat: anat(['Red gradient', 'Under 10% of the monthly amount'], ['Battery icon', 'Lucide battery-low'], ['Action', '"Top up"']) },
        ] },
        spec: { show: 'Always: offer pill while an offer is active and unpurchased; otherwise balance; red under 10%.', logic: ['Updates every 60 s and after each task step', 'Click → store modal (05/07) on the relevant tab'], data: ['offer.deadline, balance.qcc, usage_7d'], done: 'Never wider than 260 px; truncates the name first, never the timer.', events: ['ide_pill_view{state}', 'ide_pill_click{state}'] }
      },
      {
        id: 'ide-menu', num: '15', title: 'Account menu turns into a mini store', where: 'Desktop app · click on your name', opt: 'Core',
        hf: { src: 'Logged in · 24 Sep', img: A + 'hf/43-menu.png', alt: 'Higgsfield avatar menu',
          notes: [{ text: 'The avatar menu shows credits left with a bar and "Get" buttons: Top-up, Boost speed, Unlimited models' }] },
        qc: { ...IDE, src: 'Desktop app · account popover above the status bar',
          overlaysHtml: COMPOSER_OV + ov('bottom:2.8%;left:72.4%;width:17.8%', MENU) + mark('top:16%;left:81.3%', 'NEW · MINI STORE'),
          notes: [{ ok: true, text: 'Balance with plan / top-up split, runway, renewal — without leaving the app' }, { ok: true, text: 'Two primary actions (Top up, Plans & credits) + the active personal offer row' }, { ok: true, text: 'Promo code, usage, billing and settings stay one click away' }] },
        impact: { metric: 'Top-ups started in the app', wave: 'Wave 2', target: 'Paying users' },
        spot: { theme: 'light', size: 'Popover 341 px wide · radius 15 px · anchored to the name in the status bar', items: [{ name: 'Account popover', w: 341, html: MENU, anat: anat(['User row', 'Avatar initials, name, email, plan chip'], ['Balance box', '766 QCC, split bar, runway'], ['Actions', 'Gradient "Top up" + ghost "Plans & credits"'], ['Offer row', 'Tinted, gift icon, live timer, chevron'], ['List', 'Promo · Usage · Billing · Settings'], ['Sign out', 'Muted, separated']) }] },
        spec: { show: 'Click on the user name in the status bar; Esc / outside click closes.', logic: ['Same data source as Plans & Credits (react-query cache shared)', 'Offer row hidden when no offer is active'], data: ['user, balance{plan_qcc, topup_qcc}, sub, offer, usage_7d'], done: 'Opens in < 100 ms with cached data, refreshes in background.', events: ['ide_menu_open', 'ide_menu_topup', 'ide_menu_plans', 'ide_menu_offer'] }
      },
      {
        id: 'ide-cost', num: '16', title: 'Cost preview on Send + automatic refunds', where: 'Desktop app · composer', opt: 'Optional · product',
        hf: { src: 'Live · 25 Sep · logged in', img: A + 'hf-live/account-menu.png', alt: 'Higgsfield: price on Generate, credits refunded',
          notes: [{ text: 'The Generate button shows the cost before you click: "Generate 8.5 → 6.5"' }, { text: 'Failed generations are labelled "Credits refunded"' }] },
        qc: { ...IDE, src: 'Desktop app · cost chip near Send, breakdown tooltip, refund toast',
          overlaysHtml: COMPOSER_OV + ov('top:90.4%;left:54.8%;height:2.6%;display:flex', COST) + ov('bottom:12.6%;left:46.5%;width:19%', TIP) + ov('top:9%;left:66.5%;width:28%', TOAST) + mark('top:86.5%;left:60%', 'NEW'),
          notes: [{ ok: true, text: 'Answers "how much will this cost?" before Send — per-agent breakdown on hover' }, { ok: true, text: 'Charged per step as it completes; failed or cancelled steps are refunded and announced' }, { ok: true, text: 'Makes topping up feel safe — the main objection to prepaid credits' }] },
        impact: { metric: 'Sends per payer, refund tickets', wave: 'Wave 3', target: 'All users' },
        spot: { theme: 'light', size: 'Chip 26 px · tooltip 364 px dark · toast 536 px', items: [
          { name: 'Cost chip + tooltip', w: 364, html: `<div style="display:grid;gap:.8em;justify-items:start">${TIP}<div style="height:26px;display:flex">${COST}</div></div>`, anat: anat(['Chip', 'Zap icon + "≈ 12 QCC", mono'], ['Tooltip', 'Dark, per-agent rows, mono values'], ['Note', '"Charged per step … refunded automatically"']) },
          { name: 'Refund toast', w: 536, html: TOAST, anat: anat(['Icon', 'Green check'], ['Title', '"4.5 QCC refunded"'], ['Reason', 'Model + automatic retry at no cost']) },
        ] },
        spec: { show: 'Chip whenever the composer has text; tooltip on hover/focus; toast on any refunded step.', logic: ['Estimate = Σ agent estimates from the planner dry-run (cached 5 s)', 'Refund on step failure/cancel → ledger entry + toast'], data: ['estimate.steps[{agent, model, qcc}], ledger.refunds'], done: 'Estimate within ±20% of the actual charge for 90% of runs.', events: ['cost_chip_view', 'cost_tip_open', 'refund_toast_view'] }
      },
    ],
  };

  window.BLOCKS_DATA = BLOCKS_DATA;
})();

/* ============================================================
   Quadcode AI — Pricing page extras (white theme + vendor logos + motion)
   Implements Sub-steps 8.3 & 8.5:
   - Rolling digits (NumberFlow feel)
   - Rotating promo banner (3 offers) & banner model rotator
   - Marquee of generated content (c1..c6 + case-1..6)
   - Gentle breathing ticks on finder sliders
   - Top-up packs (7 tiers, 90 days, pack->plan nudge, custom pack, auto-refill)
   - Unlimited passes (1, 3, 7 days)
   - Boost speed add-on
   - Model shelf with TOP / NEW / -25% tags and crossed cost
   - Film Week challenge card & floating promo
   - Payment trust row with proposal note
   ============================================================ */

(function () {
  'use strict';

  // Vendor logo mappings for all models available in Quadcode AI
  const MODEL_LOGOS = [
    { match: ['seedance', 'seedream'], logo: 'bytedance' },
    { match: ['nanobanana', 'gemini'], logo: 'gemini' },
    { match: ['wan'], logo: 'alibaba' },
    { match: ['veo', 'google'], logo: 'google' },
    { match: ['sora', 'gpt'], logo: 'openai' },
    { match: ['kling'], logo: 'kling' },
    { match: ['flux'], logo: 'flux' },
    { match: ['suno'], logo: 'suno' },
    { match: ['stable audio', 'stability'], logo: 'stability' },
    { match: ['elevenlabs'], logo: 'elevenlabs' },
    { match: ['claude', 'sonnet', 'opus', 'fable', 'anthropic'], logo: 'claude' },
    { match: ['grok'], logo: 'grok' }
  ];

  function getLogo(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const entry of MODEL_LOGOS) {
      if (entry.match.some(m => lower.includes(m))) {
        return entry.logo;
      }
    }
    return null;
  }

  // Hook for plan cards: replace letter dots with real vendor logos
  window.QC_TILE = function (modelName) {
    const lg = getLogo(modelName);
    if (lg) {
      return `<span class="mk-tile" title="${modelName}"><img class="mk-lg" src="../../assets/logos/${lg}.svg" alt="${modelName}"></span>`;
    }
    return `<span class="mk-tile fallback">${modelName ? modelName[0] : '•'}</span>`;
  };

  // Hook for compare table rows: prefix model name with real vendor logo(s)
  window.QC_TILES = function (rowName) {
    if (!rowName) return '';
    const lower = rowName.toLowerCase();
    const found = [];
    for (const entry of MODEL_LOGOS) {
      if (entry.match.some(m => lower.includes(m))) {
        if (!found.includes(entry.logo)) found.push(entry.logo);
      }
    }
    if (found.length > 0) {
      return found.map(l => `<img class="cmp-logo" src="../../assets/logos/${l}.svg" alt="">`).join('');
    }
    return '';
  };

  /* ============================================================
     8.3 MOTION: ROLLING DIGITS (NumberFlow-like smooth transition)
     ============================================================ */
  const lastRollValues = {};

  function buildRollHTML(valStr, prevStr) {
    const chars = String(valStr).split('');
    const prevChars = prevStr ? String(prevStr).split('') : [];
    
    return chars.map((ch, idx) => {
      if (ch >= '0' && ch <= '9') {
        const targetDigit = parseInt(ch, 10);
        const prevDigit = (prevChars.length === chars.length && prevChars[idx] >= '0' && prevChars[idx] <= '9')
          ? parseInt(prevChars[idx], 10)
          : targetDigit;
        
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        return `<span class="roll-col" data-target="${targetDigit}">` +
          `<span class="roll-ribbon" style="transform:translateY(-${prevDigit * 10}%)">` +
          digits.map(d => `<span>${d}</span>`).join('') +
          `</span></span>`;
      }
      return `<span class="roll-col char">${ch}</span>`;
    }).join('');
  }

  window.animateRollingDigits = function () {
    const rollEls = document.querySelectorAll('[data-roll]');
    rollEls.forEach(el => {
      const key = el.dataset.roll;
      // Use explicit data-val or sanitize text (never read ribbons as currentVal)
      let currentVal = el.dataset.val;
      if (!currentVal) {
        currentVal = el.textContent.trim();
        // If ribbons were already rendered, strip
        if (currentVal.length > 10 && currentVal.includes('0123456789')) {
          currentVal = lastRollValues[key] || '0';
        }
      }
      el.dataset.val = currentVal;
      el.setAttribute('aria-label', currentVal);
      const prevVal = lastRollValues[key];

      if (prevVal !== undefined && prevVal !== currentVal) {
        // Mount roll ribbons with prev position
        el.innerHTML = buildRollHTML(currentVal, prevVal);
        lastRollValues[key] = currentVal;
        
        // Trigger CSS transition to target position on next animation frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.querySelectorAll('.roll-col[data-target]').forEach(col => {
              const target = parseInt(col.dataset.target, 10);
              const ribbon = col.querySelector('.roll-ribbon');
              if (ribbon) {
                ribbon.style.transform = `translateY(-${target * 10}%)`;
              }
            });
          });
        });
      } else {
        lastRollValues[key] = currentVal;
        el.innerHTML = buildRollHTML(currentVal, currentVal);
      }
    });
  };

  /* ============================================================
     8.3 MOTION: PROMO BAR & BANNER ROTATION
     ============================================================ */
  function initPromoRotator() {
    const items = document.querySelectorAll('.promo-item');
    if (items.length > 1) {
      let activeIdx = 0;
      setInterval(() => {
        items[activeIdx].classList.remove('active');
        activeIdx = (activeIdx + 1) % items.length;
        items[activeIdx].classList.add('active');
      }, 4500);
    }

    // Hero banner model rotator with vertical slide in fixed-width slot
    const rotSlot = document.getElementById('rotSlot') || document.getElementById('rotModel');
    if (rotSlot) {
      const models = ['Nanobanana Pro', 'Seedance 2.5', 'Google Veo 3.1', 'Gemini Omni 1.1'];
      let modelIdx = 0;
      rotSlot.innerHTML = `<span class="rot-item active">${models[0]}</span>`;

      setInterval(() => {
        const nextIdx = (modelIdx + 1) % models.length;
        const currentEl = rotSlot.querySelector('.rot-item.active');
        const nextEl = document.createElement('span');
        nextEl.className = 'rot-item enter';
        nextEl.textContent = models[nextIdx];
        rotSlot.appendChild(nextEl);

        // Force reflow
        void nextEl.offsetWidth;

        if (currentEl) {
          currentEl.className = 'rot-item exit';
          setTimeout(() => { if (currentEl.parentNode) currentEl.remove(); }, 450);
        }
        nextEl.className = 'rot-item active';
        modelIdx = nextIdx;
      }, 3500);
    }
  }

  /* ============================================================
     8.3 MOTION: CASES MARQUEE (assets/content/c1..c6 + case-1..6)
     ============================================================ */
  const ALL_CASES = [
    { t: 'AeroKnit hero shot', s: 'Nanobanana Pro · 2K', a: 'Lumi', img: '../../assets/content/c1.jpg' },
    { t: 'Brand film', s: '0:15 · Seedance 2.5', a: 'Sonic', img: '../../assets/pricing/case-1.jpg' },
    { t: 'Neon sole keyframe', s: 'Nanobanana Pro · 4K', a: 'Lumi', img: '../../assets/content/c2.jpg' },
    { t: 'Product key art', s: '4K · Nanobanana Pro', a: 'Lumi', img: '../../assets/pricing/case-2.jpg' },
    { t: 'Slow-mo flares', s: 'Seedance 2.5 · 1080p', a: 'Sonic', img: '../../assets/content/c3.jpg' },
    { t: 'Playable RPG world', s: 'WebGL · 182 meshes', a: 'Cody', img: '../../assets/pricing/case-3.jpg' },
    { t: 'Cinematic dust drift', s: 'Nanobanana 2 · Flash', a: 'Lumi', img: '../../assets/content/c4.jpg' },
    { t: 'Game character', s: 'Rigged · PBR', a: 'Lumi', img: '../../assets/pricing/case-4.jpg' },
    { t: 'Dynamic camera move', s: 'WAN 2.7 · 720p', a: 'Sonic', img: '../../assets/content/c5.jpg' },
    { t: 'Storefront + checkout', s: 'Next.js · Stripe', a: 'Cody', img: '../../assets/pricing/case-5.jpg' },
    { t: 'Film Week finale', s: 'Seedance 2.5 · 1080p', a: 'Sonic', img: '../../assets/content/c6.jpg' },
    { t: 'Trailer score', s: 'Suno v5 · −14 LUFS', a: 'Sonic', img: '../../assets/pricing/case-6.jpg' }
  ];

  window.renderCasesMarquee = function () {
    const track = document.getElementById('casesTrack') || document.getElementById('cases');
    if (!track) return;

    // Render 12 cases duplicated for seamless continuous marquee loop
    const doubled = [...ALL_CASES, ...ALL_CASES];
    track.innerHTML = doubled.map(c => `
      <figure class="case-card">
        <img src="${c.img}" alt="${c.t}">
        <span class="agent">${c.a}</span>
        <figcaption class="lbl">${c.t}<span>${c.s}</span></figcaption>
      </figure>
    `).join('');
  };

  /* ============================================================
     8.3 MOTION: SLIDER BREATHING TICKS
     ============================================================ */
  window.renderSliderTicks = function () {
    const vidTicks = document.getElementById('vidTicks');
    const imgTicks = document.getElementById('imgTicks');
    const vidRange = document.getElementById('vidRange');
    const imgRange = document.getElementById('imgRange');

    if (vidTicks && vidRange && vidTicks.children.length === 0) {
      const count = 21; // 0 to 200 step 10
      for (let i = 0; i < count; i++) {
        const tick = document.createElement('span');
        tick.className = 'sl-tick';
        vidTicks.appendChild(tick);
      }
    }

    if (imgTicks && imgRange && imgTicks.children.length === 0) {
      const count = 26; // 0 to 500 step 20
      for (let i = 0; i < count; i++) {
        const tick = document.createElement('span');
        tick.className = 'sl-tick';
        imgTicks.appendChild(tick);
      }
    }

    window.updateSliderTicks();
  };

  window.updateSliderTicks = function () {
    const vidRange = document.getElementById('vidRange');
    const vidTicks = document.getElementById('vidTicks');
    if (vidRange && vidTicks) {
      const pct = (+vidRange.value - +vidRange.min) / (+vidRange.max - +vidRange.min);
      const ticks = vidTicks.children;
      const activeCount = Math.round(pct * ticks.length);
      for (let i = 0; i < ticks.length; i++) {
        ticks[i].classList.toggle('active', i <= activeCount);
      }
    }

    const imgRange = document.getElementById('imgRange');
    const imgTicks = document.getElementById('imgTicks');
    if (imgRange && imgTicks) {
      const pct = (+imgRange.value - +imgRange.min) / (+imgRange.max - +imgRange.min);
      const ticks = imgTicks.children;
      const activeCount = Math.round(pct * ticks.length);
      for (let i = 0; i < ticks.length; i++) {
        ticks[i].classList.toggle('active', i <= activeCount);
      }
    }
  };

  /* ============================================================
     8.3 & 8.5: VENDOR MODELS MARQUEE
     ============================================================ */
  function renderModelsMarquee() {
    const track = document.getElementById('marqueeTrack') || document.getElementById('marquee');
    if (!track) return;

    const models = [
      { n: 'Seedance 2.5', lg: 'bytedance', cost: '45 cr', res: '1080p' },
      { n: 'Nanobanana Pro', lg: 'gemini', cost: '2 cr', res: '2K' },
      { n: 'Google Veo 3.1', lg: 'google', cost: '30 cr', res: '1080p', sale: true },
      { n: 'Kling 3.0', lg: 'kling', cost: '6 cr', res: '4K', sale: true },
      { n: 'Sora 2 Pro', lg: 'openai', cost: '50 cr', res: '1080p' },
      { n: 'WAN 2.7', lg: 'alibaba', cost: '13 cr', res: '720p' },
      { n: 'FLUX.2 Pro', lg: 'flux', cost: '1 cr', res: 'Full' },
      { n: 'Suno v5', lg: 'suno', cost: '6 cr / track', res: 'Audio' },
      { n: 'ElevenLabs v3', lg: 'elevenlabs', cost: '1 cr / 500ch', res: 'Voice' },
      { n: 'Claude Sonnet 5', lg: 'claude', cost: '~1 cr / turn', res: 'Code' },
      { n: 'Claude Opus 5.5', lg: 'claude', cost: 'Plus tier', res: 'Reasoning' },
      { n: 'GPT-6 Astra', lg: 'openai', cost: 'Ultra tier', res: 'Frontier' },
      { n: 'Grok 4.7', lg: 'grok', cost: 'Starter tier', res: 'xAI' }
    ];

    const doubled = [...models, ...models];
    track.innerHTML = doubled.map(m => `
      <span class="model-pill">
        <img class="mp-logo" src="../../assets/logos/${m.lg}.svg" alt="">
        <span>${m.n}</span>
        <span class="mp-cost ${m.sale ? 'sale' : ''}">${m.cost}</span>
      </span>
    `).join('');
  }

  /* ============================================================
     8.5 NEW SECTION: TOP-UP PACKS (Higgsfield 06-topup mirror)
     Full-width strip list:
     - Left: credits & outcomes checklist (images / videos)
     - Center: prices (crossed base + new) & compact rate badge
     - Right: buy button
     - 8th strip: custom slider up to 25,000 credits
     ============================================================ */
  const TOPUP_TIERS = (window.CONFIG && window.CONFIG.topup && window.CONFIG.topup.tiers) || [
    { cr: 100, pr: 6, was: 8.5, rate: '6.0¢ / cr', off: '−29%', images: 50, videos: 2 },
    { cr: 200, pr: 12, was: 17, rate: '6.0¢ / cr', off: '−29%', images: 100, videos: 4 },
    { cr: 500, pr: 29, was: 42.5, rate: '5.8¢ / cr', off: '−32%', images: 250, videos: 11 },
    { cr: 1000, pr: 56, was: 85, rate: '5.6¢ / cr', off: '−34%', images: 500, videos: 22 },
    { cr: 2000, pr: 105, was: 170, rate: '5.3¢ / cr', off: '−38%', images: 1000, videos: 44 },
    { cr: 4000, pr: 205, was: 340, rate: '5.1¢ / cr', off: '−40%', badge: 'MOST POPULAR', hi: true, images: 2000, videos: 88 },
    // 5,000+ is the adjustable 7th row below (slider 5,000–25,000), 1:1 with Higgsfield
  ];

  function renderTopupSection() {
    const isVisitor = !window.state || window.state.userPlan === 'visitor';
    const fmt = (n) => n.toLocaleString('en-US');

    const packsEl = document.getElementById('packs');
    if (!packsEl) return;

    const tiers = (window.CONFIG && window.CONFIG.topup && window.CONFIG.topup.tiers) || TOPUP_TIERS;

    // Build the 7 fixed strips + 1 custom slider strip
    let html = tiers.map(p => {
      const wasStr = p.was % 1 === 0 ? p.was.toString() : p.was.toFixed(2);
      const perDollar = (p.cr / p.pr).toFixed(1);
      const btnHtml = isVisitor
        ? `<button class="btn btn-locked btn-md" data-pack-locked="true" data-cr="${p.cr}">Upgrade to buy</button>`
        : `<button class="btn ${p.hi ? 'btn-primary' : 'btn-ghost'} btn-md" data-pack-buy="${p.cr}" data-pr="${p.pr}">Buy pack</button>`;

      return `
      <div class="pack-strip ${p.hi ? 'hi' : ''}">
        <div class="pack-strip-left">
          <div class="pack-strip-cr-row">
            <span class="pack-strip-cr">${fmt(p.cr)}</span>
            <span class="pack-strip-unit">credits</span>
            ${p.badge ? `<span class="pack-badge ${p.green ? 'green' : ''}">${p.badge}</span>` : ''}
          </div>
          <ul class="pack-strip-perks">
            <li><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Up to ${fmt(p.images)} Nanobanana Pro (2K) images</li>
            <li><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Up to ${p.videos} Seedance 2.5 (1080p) videos</li>
            <li class="pack-strip-valid-li"><span class="pack-valid-tag">Valid 90 days</span></li>
          </ul>
        </div>
        <div class="pack-strip-center">
          <div class="pack-strip-prices">
            <s class="pack-was">$${wasStr}</s>
            <b class="pack-now">$${fmt(p.pr)}</b>
            <span class="pack-rate-badge">${p.rate}</span>
          </div>
          <div class="pack-unit-rate">$1 = ${perDollar} credits · ${p.off}</div>
        </div>
        <div class="pack-strip-right">
          ${btnHtml}
        </div>
      </div>`;
    }).join('');

    // Append 8th strip: Custom slider up to 25,000 credits
    const customDefaultCr = 5000;
    const customDefaultCost = Math.round(customDefaultCr * 0.05);
    const customDefaultWas = Math.round(customDefaultCr * 0.085);
    const customBtnHtml = isVisitor
      ? `<button class="btn btn-locked btn-md" id="customBuyBtn">Upgrade to buy</button>`
      : `<button class="btn btn-primary btn-md" id="customBuyBtn">Buy ${fmt(customDefaultCr)} credits</button>`;

    html += `
    <div class="pack-strip custom-strip hi">
      <div class="pack-strip-left">
        <div class="pack-strip-cr-row">
          <span class="pack-strip-cr" id="customCrVal">${fmt(customDefaultCr)}</span>
          <span class="pack-strip-unit">credits</span>
          <span class="pack-badge green">BEST VALUE</span>
        </div>
        <div class="custom-slider-wrap">
          <input type="range" id="customCrRange" min="5000" max="25000" step="1000" value="${customDefaultCr}">
          <div class="custom-slider-ticks">
            <span>5,000</span>
            <span>10,000</span>
            <span>15,000</span>
            <span>20,000</span>
            <span>25,000 max</span>
          </div>
        </div>
        <ul class="pack-strip-perks">
          <li><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Up to <span id="customImagesVal">2,500</span> Nanobanana Pro (2K) images</li>
          <li><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Up to <span id="customVideosVal">111</span> Seedance 2.5 (1080p) videos</li>
          <li class="pack-strip-valid-li"><span class="pack-valid-tag">Valid 90 days</span></li>
        </ul>
      </div>
      <div class="pack-strip-center">
        <div class="pack-strip-prices">
          <s class="pack-was" id="customWasVal">$${customDefaultWas}</s>
          <b class="pack-now" id="customCostVal">$${customDefaultCost}</b>
          <span class="pack-rate-badge">5.0¢ / cr</span>
        </div>
        <div class="pack-unit-rate" id="customUnitRate">$1 = 20.0 credits · −41%</div>
      </div>
      <div class="pack-strip-right">
        ${customBtnHtml}
      </div>
    </div>`;

    packsEl.innerHTML = html;

    // Wire buttons on fixed strips
    packsEl.querySelectorAll('[data-pack-locked]').forEach(b => {
      b.onclick = () => {
        const plansEl = document.getElementById('plans');
        if (plansEl) plansEl.scrollIntoView({ behavior: 'smooth' });
        if (window.showPreviewBarNotification) {
          window.showPreviewBarNotification('Credit packs are available exclusively with an active subscription. Choose a plan to top up extra credits.');
        }
      };
    });

    packsEl.querySelectorAll('[data-pack-buy]').forEach(b => {
      b.onclick = () => {
        const cr = +b.dataset.packBuy;
        const pr = +b.dataset.pr;
        if (window.openCheckoutSheet) {
          window.openCheckoutSheet({
            type: 'pack',
            title: `${fmt(cr)} Credits Pack`,
            interval: 'One-time top-up · Valid 90 days',
            basePrice: pr,
            totalDue: pr,
            isSubscription: false
          });
        }
      };
    });

    // Wire custom slider
    const customRange = document.getElementById('customCrRange');
    const customBuyBtn = document.getElementById('customBuyBtn');
    if (customRange) {
      customRange.oninput = function () {
        const val = +customRange.value;
        const cost = Math.round(val * 0.05);
        const was = Math.round(val * 0.085);
        const imgs = Math.floor(val / 2);
        const vids = Math.floor(val / 45);

        document.getElementById('customCrVal').textContent = fmt(val);
        document.getElementById('customWasVal').textContent = `$${fmt(was)}`;
        document.getElementById('customCostVal').textContent = `$${fmt(cost)}`;
        document.getElementById('customImagesVal').textContent = fmt(imgs);
        document.getElementById('customVideosVal').textContent = fmt(vids);

        if (!isVisitor && customBuyBtn) {
          customBuyBtn.textContent = `Buy ${fmt(val)} credits`;
        }
      };
    }

    if (customBuyBtn) {
      customBuyBtn.onclick = function () {
        if (isVisitor) {
          const plansEl = document.getElementById('plans');
          if (plansEl) plansEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          const val = customRange ? +customRange.value : customDefaultCr;
          const cost = Math.round(val * 0.05);
          if (window.openCheckoutSheet) {
            window.openCheckoutSheet({
              type: 'pack',
              title: `${fmt(val)} Custom Credits Pack`,
              interval: 'One-time bulk top-up · Valid 90 days',
              basePrice: cost,
              totalDue: cost,
              isSubscription: false
            });
          }
        }
      };
    }

    // Auto-refill card, 1:1 Higgsfield help center: off by default, Plus and Ultra only, $20/$40/$90/$150/$300 at $1 = 18 cr,
    // fires below the plan threshold, separate counter, 90 days, no monthly cap, a failed charge adds nothing
    const autoRefillEl = document.getElementById('autoRefill');
    if (autoRefillEl) {
      const cfg = (window.CONFIG && window.CONFIG.autoRefill) || {
        dollarRate: 18,
        tiers: [
          { id: 't20', usd: 20, credits: 360 },
          { id: 't40', usd: 40, credits: 720, default: true },
          { id: 't90', usd: 90, credits: 1620 },
          { id: 't150', usd: 150, credits: 2700 },
          { id: 't300', usd: 300, credits: 5400 }
        ]
      };

      let selectedRefillIdx = 1; // Default to $40 = 720 credits

      function updateRefillCard() {
        const cur = cfg.tiers[selectedRefillIdx];
        const plan = window.state && window.state.userPlan;
        const canRefill = (cfg.plans || ['plus', 'ultra']).includes(plan);
        const th = cfg.thresholds || { plus: 120, ultra: 300 };
        autoRefillEl.innerHTML = `
          <div class="refill-card">
            <h4><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg> Credits auto-refill <span class="refill-state">Disabled</span><span class="refill-rate-tag">$1 = ${cfg.dollarRate} cr</span></h4>
            <p>Off by default. Enable it to top up automatically when credits run low, so no render stops halfway. On Plus and Ultra.</p>
            
            <div class="refill-tier-selector">
              <span class="refill-tier-lbl">Refill amount:</span>
              <div class="refill-tier-pills" id="refillPills">
                ${cfg.tiers.map((t, idx) => `
                  <button class="refill-pill ${idx === selectedRefillIdx ? 'active' : ''}" data-refill-idx="${idx}" type="button">
                    <b>$${t.usd}</b> <span>${fmt(t.credits)} cr</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="refill-perks">
              <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Adds ${fmt(cur.credits)} credits for $${cur.usd} when your balance drops below the plan threshold: ${fmt(th.plus)} credits on Plus, ${fmt(th.ultra)} on Ultra</span>
              <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Charged to your saved payment method into a separate Auto-refill counter. No monthly cap; a failed charge adds nothing</span>
              <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Valid 90 days, spent after plan credits. Turn off anytime; stops when you cancel your plan</span>
            </div>
            <button class="btn btn-ghost" id="autoRefillBtn" style="margin-top:auto">
              ${canRefill ? 'Set-up &amp; Enable' : 'Available on Plus and Ultra · See plans'}
            </button>
          </div>
        `;

        autoRefillEl.querySelectorAll('#refillPills .refill-pill').forEach(btn => {
          btn.onclick = () => {
            selectedRefillIdx = +btn.dataset.refillIdx;
            updateRefillCard();
          };
        });

        const autoRefillBtn = document.getElementById('autoRefillBtn');
        if (autoRefillBtn) {
          autoRefillBtn.onclick = function () {
            if (!canRefill) {
              const plansEl = document.getElementById('plans');
              if (plansEl) plansEl.scrollIntoView({ behavior: 'smooth' });
            } else if (window.openCheckoutSheet) {
              window.openCheckoutSheet({
                type: 'refill',
                title: `Auto-Refill: ${fmt(cur.credits)} Credits ($${cur.usd})`,
                interval: `Charged only when your balance drops below ${fmt(plan === 'ultra' ? th.ultra : th.plus)} credits · no monthly cap · credits valid 90 days`,
                basePrice: cur.usd,
                totalDue: 0,
                isSubscription: false
              });
            }
          };
        }
      }

      updateRefillCard();
    }

    // Pack to plan nudge
    const nudgeEl = document.getElementById('packNudge');
    if (nudgeEl) {
      nudgeEl.innerHTML = `
        <div class="nudge-text">
          <b>A plan is cheaper per credit:</b> Plus is 3.9¢/credit ($47/mo) and Ultra is 3.3¢/credit ($99/mo). Every pack costs 5.0¢–6.0¢/credit, so packs are designed as a bridge between cycles, not a substitute for a plan.
        </div>
        <a class="btn btn-sm btn-primary" href="#plans">Compare plans</a>
      `;
    }
  }
  window.renderTopupSection = renderTopupSection;

  /* ============================================================
     8.5 NEW SECTION: UNLIMITED PASSES & BOOST SPEED
     ============================================================ */
  function renderUnlimitedSection() {
    // 1. Unlimited passes
    const passesEl = document.getElementById('passes');
    if (passesEl) {
      passesEl.innerHTML = `
        <h3>Unlimited passes · 1, 3 or 7 days</h3>
        <p class="xc-sub">Generate on one model without spending credits. Pay once on top of an active plan; each pass runs on its own clock.</p>
        <div class="passes-list">
          <div class="pass-item">
            <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/gemini.svg" alt=""></span>
            <div class="pass-info">
              <div class="pass-name">Nanobanana Pro · 2K</div>
              <div class="pass-sub">Shared queue · 1-day pass</div>
            </div>
            <div class="pass-pr">$5<small>one-time</small></div>
            <a class="btn btn-ghost btn-sm" href="https://quadcode.ai/#download">Buy pass</a>
          </div>

          <div class="pass-item hi">
            <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/gemini.svg" alt=""></span>
            <div class="pass-info">
              <div class="pass-name">Nanobanana Pro · 2K <span class="badge" style="background:var(--orange)">Popular</span></div>
              <div class="pass-sub">Shared queue · 7-day pass</div>
            </div>
            <div class="pass-pr">$23<small>one-time</small></div>
            <a class="btn btn-primary btn-sm" href="https://quadcode.ai/#download">Buy pass</a>
          </div>

          <div class="pass-item">
            <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/alibaba.svg" alt=""></span>
            <div class="pass-info">
              <div class="pass-name">Wan 2.7 · 720p</div>
              <div class="pass-sub">Shared queue · 7-day pass</div>
            </div>
            <div class="pass-pr">$29<small>one-time</small></div>
            <a class="btn btn-ghost btn-sm" href="https://quadcode.ai/#download">Buy pass</a>
          </div>

          <div class="pass-item">
            <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/bytedance.svg" alt=""></span>
            <div class="pass-info">
              <div class="pass-name">Seedance 2.5 · 1080p</div>
              <div class="pass-sub">Shared queue · 3-day pass (was $45)</div>
            </div>
            <div class="pass-pr"><s>$45</s> $35<small>one-time (−22%)</small></div>
            <a class="btn btn-ghost btn-sm" href="https://quadcode.ai/#download">Buy pass</a>
          </div>

          <div class="pass-item hi">
            <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/bytedance.svg" alt=""></span>
            <div class="pass-info">
              <div class="pass-name">Seedance 2.5 · 1080p <span class="badge" style="background:#10b981">Best value</span></div>
              <div class="pass-sub">Shared queue · 7-day pass (was $105)</div>
            </div>
            <div class="pass-pr"><s>$105</s> $65<small>one-time (−38%)</small></div>
            <a class="btn btn-primary btn-sm" href="https://quadcode.ai/#download">Buy pass</a>
          </div>
        </div>
        <div style="font-size:12px;color:var(--dim);line-height:1.45;">
          Standard modes, no 4K · 1 video and 2 images at a time in the standard queue · credit jobs keep priority · desktop app only, not MCP or API · works while a plan is active. Personal use only.
        </div>
      `;
    }

    // 2. Boost speed
    const boostEl = document.getElementById('boost');
    if (boostEl) {
      boostEl.innerHTML = `
        <h3>Boost speed: parallel jobs add-on</h3>
        <p class="xc-sub">Generate up to 3× faster with more parallel jobs across all 16 media models.</p>
        
        <div class="boost-stats">
          <div><b>6 → 14</b><span>Video jobs at once</span></div>
          <div><b>8 → 16</b><span>Image jobs at once</span></div>
          <div><b>+8 jobs</b><span>Parallel boost</span></div>
        </div>

        <div class="boost-models">
          <span class="bm-lbl">Active on:</span>
          <span class="bm-tile" title="ByteDance Seedance"><img src="../../assets/logos/bytedance.svg" alt="Seedance"></span>
          <span class="bm-tile" title="Google Gemini"><img src="../../assets/logos/gemini.svg" alt="Gemini"></span>
          <span class="bm-tile" title="Google Veo"><img src="../../assets/logos/google.svg" alt="Veo"></span>
          <span class="bm-tile" title="OpenAI Sora"><img src="../../assets/logos/openai.svg" alt="Sora"></span>
          <span class="bm-tile" title="Kling"><img src="../../assets/logos/kling.svg" alt="Kling"></span>
          <span class="bm-tile" title="Alibaba Wan"><img src="../../assets/logos/alibaba.svg" alt="Wan"></span>
          <span class="bm-tile" title="FLUX"><img src="../../assets/logos/flux.svg" alt="Flux"></span>
        </div>

        <div class="boost-seg-lbl">Parallel jobs capacity:</div>
        <div class="boost-segs" id="boostConcSegs">
          <button data-c="4">+4 jobs</button>
          <button class="active" data-c="8">+8 jobs</button>
          <button data-c="12">+12 jobs</button>
          <button data-c="16">+16 jobs</button>
        </div>

        <div class="boost-seg-lbl">Boost credits bundle:</div>
        <div class="boost-segs" id="boostCrSegs">
          <button data-cr="500">500 cr</button>
          <button class="active" data-cr="1000">1,000 cr</button>
          <button data-cr="1500">1,500 cr</button>
          <button data-cr="2000">2,000 cr</button>
              <button data-cr="3000">3,000 cr</button>
        </div>

        <div class="boost-foot">
          <div>
            <div class="b-pr">$97 <s>$134</s></div>
            <div style="font-size:12px;color:rgba(255,255,255,0.65);">Save 28% on 1,000 boost credits</div>
          </div>
          <a class="btn btn-primary" href="https://quadcode.ai/#download">Buy Boost speed</a>
        </div>
        <div style="font-size:11.5px;color:rgba(255,255,255,0.45);margin-top:12px;">
          Boost credits are spent only on jobs above your plan limit. Jobs within the limit keep using plan credits. Non-refundable.
        </div>
      `;

      // Interactive segs inside boost
      const cButtons = boostEl.querySelectorAll('#boostConcSegs button');
      cButtons.forEach(btn => btn.onclick = () => {
        cButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });

      const crButtons = boostEl.querySelectorAll('#boostCrSegs button');
      crButtons.forEach(btn => btn.onclick = () => {
        crButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    }
  }

  /* ============================================================
     8.5 NEW SECTION: MODEL SHELF (TOP / NEW / -25% tags & crossed cost)
     ============================================================ */
  function renderShelfSection() {
    const shelfGrid = document.getElementById('shelfGrid');
    if (!shelfGrid) return;

    shelfGrid.innerHTML = `
      <div class="shelf-wrap">
        <div class="shelf-panel">
          <div class="shelf-cat-title">Featured Video &amp; Image Models</div>
          <div class="shelf-rows">
            <div class="shelf-item sel">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/bytedance.svg" alt=""></span>
              <div class="s-name"><b>Seedance 2.5</b> · 1080p <span class="badge" style="background:#f97316;margin-left:6px;">TOP</span></div>
              <div class="s-cost">45 credits</div>
              <span class="badge outline">Plus</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/kling.svg" alt=""></span>
              <div class="s-name"><b>Kling 3.0</b> · 4K <span class="badge red" style="margin-left:6px;">−25% SALE</span></div>
              <div class="s-cost sale"><s class="cost-struck">8</s> → 6 credits</div>
              <span class="badge outline">Starter</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/bytedance.svg" alt=""></span>
              <div class="s-name"><b>Seedance 2.5 Fast</b> · 720p <span class="badge" style="background:#64748b;margin-left:6px;">DRAFT</span></div>
              <div class="s-cost">12 credits</div>
              <span class="badge outline">Starter</span>
            </div>
          </div>

          <div class="shelf-cat-title">Top Frontier &amp; Multimodal Models</div>
          <div class="shelf-rows">
            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/google.svg" alt=""></span>
              <div class="s-name"><b>Google Veo 3.1</b> · 1080p <span class="badge" style="background:#3b82f6;margin-left:6px;">NEW</span></div>
              <div class="s-cost sale"><s class="cost-struck">40</s> → 30 credits</div>
              <span class="badge outline">Plus</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/gemini.svg" alt=""></span>
              <div class="s-name"><b>Nanobanana Pro</b> · 2K</div>
              <div class="s-cost">2 credits</div>
              <span class="badge green">Free tier</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/gemini.svg" alt=""></span>
              <div class="s-name"><b>Nanobanana 2 (Flash)</b></div>
              <div class="s-cost">1 credit</div>
              <span class="badge green">Free tier</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/openai.svg" alt=""></span>
              <div class="s-name"><b>Sora 2 Pro</b> · 1080p</div>
              <div class="s-cost">50 credits</div>
              <span class="badge outline">Plus</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/flux.svg" alt=""></span>
              <div class="s-name"><b>FLUX.2 Pro</b> · Image</div>
              <div class="s-cost">1 credit</div>
              <span class="badge outline">Starter</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/alibaba.svg" alt=""></span>
              <div class="s-name"><b>WAN 2.7</b> · 720p</div>
              <div class="s-cost">13 credits</div>
              <span class="badge outline">Starter</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/suno.svg" alt=""></span>
              <div class="s-name"><b>Suno v5</b> · Full track with vocals</div>
              <div class="s-cost">6 credits</div>
              <span class="badge outline">Starter</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/elevenlabs.svg" alt=""></span>
              <div class="s-name"><b>ElevenLabs v3</b> · Pro voice-over</div>
              <div class="s-cost">1 credit / 500 ch</div>
              <span class="badge outline">Starter</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/claude.svg" alt=""></span>
              <div class="s-name"><b>Claude Sonnet 5</b> · Coding &amp; reasoning</div>
              <div class="s-cost">~1 credit / turn</div>
              <span class="badge green">Free tier</span>
            </div>

            <div class="shelf-item">
              <span class="mk-tile"><img class="mk-lg" src="../../assets/logos/openai.svg" alt=""></span>
              <div class="s-name"><b>GPT-6 Astra</b> · Autonomous agent flow</div>
              <div class="s-cost">Ultra tier</div>
              <span class="badge" style="background:#111">Ultra</span>
            </div>
          </div>
        </div>

        <div class="shelf-side">
          <div class="kick">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3.5 14 10l6.5 2-6.5 2-2 6.5-2-6.5L3.5 12 10 10Z"/></svg>
            Plus plan unlock
          </div>
          <h3>Seedance 2.5 is on Plus</h3>
          <p>Starter includes 4 of 7 video models. Plus unlocks Seedance 2.5, Google Veo 3.1 and Sora 2 Pro with 1,200 monthly credits and 6 parallel jobs for $47/mo.</p>

          <ul class="shelf-side-perks">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Full access to Seedance 2.5, Veo 3.1 &amp; Sora 2</li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> 1,200 monthly credits with 1-month rollover</li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> 6 parallel jobs in fast priority queue</li>
          </ul>
          
          <div class="sale-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span><b>Limited-time promo:</b> Kling 3.0 is 6 credits instead of 8 until Sunday.</span>
          </div>

          <a class="btn btn-grad btn-block btn-lg" href="https://quadcode.ai/#download" style="margin-bottom:14px;">
            Generate · <s class="cost-struck">8</s> → 6 credits
          </a>
          <a class="btn btn-white btn-block" href="#plans">
            Upgrade to Plus · $47/mo
          </a>

          <div style="font-size:12px;color:var(--dim);margin-top:16px;text-align:center;">
            Credits are deducted only upon successful generation. Unused plan credits roll over.
          </div>
        </div>
      </div>
    `;
  }

  /* ============================================================
     8.5 NEW SECTION: FILM WEEK CHALLENGE CARD & PROMO
     ============================================================ */
  function renderChallengeSection() {
    const filmWeekEl = document.getElementById('filmWeek');
    if (filmWeekEl) {
      filmWeekEl.innerHTML = `
        <div class="film-card">
          <div class="film-art">
            <img src="../../assets/content/c6.jpg" alt="Quadcode Film Week hero scene">
            <span class="film-live"><i></i>Live now · 4 days left</span>
          </div>
          <div class="film-info">
            <span class="kicker">Creative challenge · 250,000 Credits</span>
            <h3>Quadcode Film Week</h3>
            <p>Brief: create a 15-second product or narrative film using the AeroKnit sneaker or original 3D IP. 1st place wins 100,000 credits, and the top 20 films get featured in the global in-app gallery.</p>
            
            <div class="film-prizes">
              <div><b>100,000 cr</b><span>1st Place</span></div>
              <div><b>50,000 cr</b><span>2nd Place</span></div>
              <div><b>25,000 cr</b><span>3rd Place</span></div>
            </div>

            <div class="film-progress">
              <div class="f-bar-lbl">
                <span>Challenge submissions</span>
                <b>2 of 3 shots done</b>
              </div>
              <div class="bar"><i style="width:66%"></i></div>
            </div>

            <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:10px 14px;font-size:12.5px;color:#9a3412;margin-bottom:20px;">
              <b>Entrant perk:</b> All participants receive <b>30% off Plus</b> during challenge week ($33/mo).
            </div>

            <div class="film-actions">
              <a class="btn btn-ghost" href="https://quadcode.ai/#download">Open challenge brief</a>
              <a class="btn btn-primary" href="https://quadcode.ai/#download">Enter challenge</a>
            </div>
          </div>
        </div>
      `;
    }
  }

  /* ============================================================
     8.5 PAYMENT TRUST ROW & PROPOSAL NOTE
     ============================================================ */
  function updateTrustRow() {
    const payRow = document.getElementById('payRow');
    if (payRow) {
      payRow.innerHTML = `
        <div class="pay-trust">
          <span class="pay-lbl">Guaranteed safe &amp; instant checkout</span>
          <div class="pay-badges">
            <span class="pay-badge"><img src="../../assets/logos/stripe.svg" alt="Stripe"></span>
            <span class="pay-badge"><img src="../../assets/logos/applepay.svg" alt="Apple Pay"></span>
            <span class="pay-badge pay-bank"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9.5 12 4l9 5.5H3zM5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18"/></svg>Bank</span>
        <span class="proposal-note">Live checkout today: cards only</span>
            <span class="pay-badge"><img src="../../assets/logos/visa.svg" alt="Visa"></span>
            <span class="pay-badge"><img src="../../assets/logos/mastercard.svg" alt="Mastercard"></span>
            <span class="pay-badge"><img src="../../assets/logos/amex.svg" alt="Amex"></span>
            <span class="pay-badge"><img src="../../assets/logos/jcb.svg" alt="JCB"></span>
          </div>
          <p class="pay-trust-note">
            Guaranteed safe checkout · payments encrypted and powered by Stripe
          </p>
        </div>
      `;
    }

    const footPay = document.getElementById('footPay');
    if (footPay) {
      footPay.innerHTML = `
        <div class="f-cards">
          <img src="../../assets/logos/visa.svg" alt="Visa">
          <img src="../../assets/logos/mastercard.svg" alt="Mastercard">
          <img src="../../assets/logos/amex.svg" alt="Amex">
          <img src="../../assets/logos/jcb.svg" alt="JCB">
          <img src="../../assets/logos/applepay.svg" alt="Apple Pay">
          <span class="f-bank"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9.5 12 4l9 5.5H3zM5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18"/></svg>Bank payment</span>
          <img src="../../assets/logos/stripe.svg" alt="Stripe">
        </div>
      `;
    }
  }

  function initExtras() {
    // Extra discount banner models & art
    const xpModels = document.getElementById('xpModels');
    if (xpModels) {
      const bannerModels = [
        { name: 'Nanobanana Pro · 2K', logo: 'gemini' },
        { name: 'Seedance 2.5 · 1080p', logo: 'bytedance' },
        { name: 'Gemini Omni 1.1 Flash', logo: 'gemini' },
        { name: 'WAN 2.7', logo: 'alibaba' }
      ];
      xpModels.innerHTML = bannerModels.map(m => `
        <span class="chip"><img class="chip-lg" src="../../assets/logos/${m.logo}.svg" alt="">${m.name}</span>
      `).join('');
    }

    const xpArt = document.getElementById('xpArt');
    if (xpArt) {
      xpArt.innerHTML = `
        <div class="xp-preview">
          <img src="../../assets/content/c1.jpg" alt="AeroKnit hero render">
          <span class="xp-badge">7-Day Unlimited</span>
        </div>
      `;
    }

    // Initialize all sections and motion features
    updateTrustRow();
    initPromoRotator();
    window.renderCasesMarquee();
    renderModelsMarquee();
    renderShelfSection();
    renderTopupSection();
    renderUnlimitedSection();
    renderChallengeSection();
    window.renderSliderTicks();
    window.animateRollingDigits();

    // Floating challenge close & visibility handler:
    // Only shows after scrolling past the plan cards section so it never overlaps plan cards or tags.
    // Also hides when viewing the challenge section itself.
    const liveCard = document.getElementById('liveCard');
    const liveClose = document.getElementById('liveClose');
    if (liveClose && liveCard) {
      liveClose.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.setItem('qc_challenge_dismissed', '1');
        liveCard.classList.remove('visible');
      };
    }

    function checkLiveCardVisibility() {
      if (!liveCard) return;
      // Hide at widths where floating card would intrude into the 1240px content column (including 1440px desktop)
      if (window.innerWidth <= 1800 || sessionStorage.getItem('qc_challenge_dismissed') === '1') {
        liveCard.classList.remove('visible');
        return;
      }
      const planCards = document.getElementById('planCards');
      const challengeSection = document.getElementById('challenge');
      if (!planCards) return;

      const pcRect = planCards.getBoundingClientRect();
      // Show only after scrolling past the plan cards so it never overlaps plan cards or tags
      const scrolledPastPlans = pcRect.bottom <= 300;

      // Hide if user is currently looking at the challenge section itself
      let nearChallenge = false;
      if (challengeSection) {
        const cRect = challengeSection.getBoundingClientRect();
        nearChallenge = cRect.top < window.innerHeight && cRect.bottom > 0;
      }

      if (scrolledPastPlans && !nearChallenge) {
        liveCard.classList.add('visible');
      } else {
        liveCard.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', checkLiveCardVisibility, { passive: true });
    checkLiveCardVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtras);
  } else {
    initExtras();
  }
})();

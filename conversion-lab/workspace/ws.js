/**
 * Quadcode AI Workspace v2 — Complete SPA Implementation
 * 7 Categories: Overview, Plans & Credits, Usage & Forecast, Billing & Invoices,
 * Rewards & Offers, Settings, Desktop App.
 * Full reactive wallet states (new, claimed, low, sub), interactive perks,
 * Higgsfield side-by-side comparisons, case study modal, and dev handoff specs.
 */

(function () {
  'use strict';

  const D = window.WS && window.WS.DATA ? window.WS.DATA : null;
  if (!D) {
    console.error('WS.DATA not loaded');
    return;
  }

  // --- Reactive Application State ---
  const state = {
    tab: 'home',
    walletMode: 'sub', // 'sub' | 'low' | 'new' | 'claimed'
    billingCycle: 'yearly', // 'monthly' | 'yearly'
    autoRefill: false,
    autoRefillThreshold: 100,
    autoRefillPack: 500,
    notifications: { low: true, digest: true, product: true },
    defaultModels: { lumi: 'Nanobanana (~9.2 QCC · Recommended)', sonic: 'Seedance 2.5 (~230 QCC · Cinematic)' },
    discordClaimed: false,
    bonusClaimed: false,
    promoApplied: null,
    starterUsed: false,
    usageRange: 21,
    planPreview: 'monthly',
    retentionPreview: false,
    cancelPreview: false,
    drawerOpen: false,
    activeCase: null,
    guestPassesLeft: 7,
    balances: {
      sub: { bal: 1006.63, planCredits: 756.63, topupCredits: 250.00, label: 'Basic Subscriber', planType: 'Basic Monthly · Demo account', warn: false, renew: 'Oct 7, 2026', renewIn: 10, spent: 797.10, perDay: 39.86 },
      low: { bal: 38.40, planCredits: 0.00, topupCredits: 38.40, label: 'Low Balance', planType: 'Basic Monthly (Renewing)', warn: true, renew: 'Oct 7, 2026', renewIn: 10, spent: 961.60, perDay: 48.08 },
      new: { bal: 0.00, planCredits: 0.00, topupCredits: 0.00, label: 'New Explorer', planType: 'Free Tier · Demo account', warn: false, renew: null, renewIn: 0, spent: 0, perDay: 0 },
      claimed: { bal: 200.00, planCredits: 0.00, topupCredits: 0.00, bonusCredits: 200.00, label: 'Explorer + Bonus', planType: 'Free Tier (Bonus active)', warn: false, renew: null, renewIn: 14, spent: 0, perDay: 0 }
    }
  };

  // --- SVG Icons ---
  const icons = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>'
  };

  // --- Formatting Helpers ---
  function fq(n) {
    return Number(n).toLocaleString('en-US', {
      minimumFractionDigits: n % 1 ? 2 : 0,
      maximumFractionDigits: 2
    });
  }

  function showToast(message, ok = true) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerHTML = `${ok ? icons.check : icons.alert} <span>${message}</span>`;
    t.classList.add('on');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('on'), 3400);
  }

  // --- Wallet Renderer ---
  function renderWallet() {
    const el = document.getElementById('wallet');
    const planNameEl = document.getElementById('plan-name');
    if (!el) return;

    const cur = state.balances[state.walletMode];
    if (planNameEl) planNameEl.textContent = cur.planType;

    const total = cur.bal;
    const planCredits = cur.planCredits || 0;
    const topupCredits = cur.topupCredits || 0;
    const bonusCredits = cur.bonusCredits || 0;

    const pPct = total > 0 ? Math.max(0, (planCredits / total) * 100) : 0;
    const tPct = total > 0 ? Math.max(0, (topupCredits / total) * 100) : 0;
    const bPct = total > 0 ? Math.max(0, (bonusCredits / total) * 100) : 0;
    const rewardBadge = document.querySelector('a[data-tab="rewards"] .pill');
    if (rewardBadge) { rewardBadge.textContent = state.discordClaimed ? 'Claimed' : '+100'; rewardBadge.classList.toggle('g', !state.discordClaimed); }

    el.innerHTML = `
      <div class="l">
        <span>Balance</span>
        <span class="chip ${cur.warn && total < 100 ? 'y' : (total > 0 ? 'o' : '')}">${cur.warn && total >= 100 ? 'Balance restored' : cur.label}</span>
      </div>
      <div class="bal">${fq(total)} <small>QCC</small></div>
      <div class="split" title="Plan, top-up and earned reward credits">
        <i class="p" style="width:${pPct}%"></i>
        <i class="t" style="width:${tPct}%"></i>
        <i class="b" style="width:${bPct}%"></i>
      </div>
      <div class="leg">
        <span><i style="background:var(--acc)"></i>Plan: ${fq(planCredits)}</span>
        <span><i style="background:#22c55e"></i>Top-up: ${fq(topupCredits)}</span>
        ${bonusCredits ? `<span><i style="background:#9295ff"></i>Earned: ${fq(bonusCredits)}</span>` : ''}
      </div>
      ${cur.warn && total < 100 ? `<div class="warn">${icons.alert} <span>Running low: ≈ ${Math.max(1, Math.ceil(total / Math.max(cur.perDay || 1, 1)))} day(s) left</span></div>` : ''}
      ${cur.bal === 0 && !state.bonusClaimed ? `<button class="btn pri sm block" data-action="claim-welcome" style="margin-top:10px">${icons.gift} Claim 200 QCC Bonus</button>` : ''}
      <div class="row">
        <button class="btn pri sm" data-action="topup">${icons.zap} Top up</button>
        <button class="btn ghost sm" data-action="promo">${icons.tag} Promo</button>
      </div>
    `;

    // Update top bar preview buttons
    document.querySelectorAll('.lab .sw button').forEach(btn => {
      btn.classList.toggle('on', btn.dataset.state === state.walletMode);
    });
  }

  // --- Dynamic Tab View Renderers ---

  // 1. Overview (Home)
  function renderHome() {
    const cur = state.balances[state.walletMode];
    const isNew = state.walletMode === 'new' && !state.bonusClaimed;
    const isLow = state.walletMode === 'low' && cur.bal < 100;
    const agentMix = { Lumi: 0, Sonic: 0, Cody: 0 };
    for (const row of D.usageRows) agentMix[row.kind === 'Image' ? 'Lumi' : (row.kind === 'LLM' ? 'Cody' : 'Sonic')] += row.q;
    const mixTotal = Object.values(agentMix).reduce((sum, value) => sum + value, 0);
    const mixPct = agent => mixTotal ? Math.round(agentMix[agent] / mixTotal * 100) : 0;

    let heroHtml = '';
    if (isNew) {
      heroHtml = `
        <div class="offer" style="background-image:url(../assets/affiliate/hero_world.jpg)">
          <div>
            <div class="k"><span class="chip o">${icons.gift} Welcome Bonus</span><span class="chip g">Free Explorer</span></div>
            <h2>Claim <em>200 QCC</em> to start building</h2>
            <p>Your wallet is ready. Try Lumi for images, Sonic for video & music, and Cody for full-stack apps — no credit card required.</p>
            <div class="row">
              <button class="btn pri lg" data-action="claim-welcome">${icons.gift} Claim 200 QCC Now</button>
              <span class="chip o">Available once per eligible account</span>
            </div>
            <div class="fine">Expires 14 days after activation. One per account.</div>
          </div>
        </div>
      `;
    } else if (isLow) {
      heroHtml = `
        <div class="offer" style="background-image:url(../assets/cases/case_film.jpg);border-color:#fbbf24">
          <div>
            <div class="k"><span class="chip y">${icons.alert} Low Balance Warning</span><span class="chip o">${fq(cur.bal)} QCC left</span></div>
            <h2>Running low on credits</h2>
            <p>Your agents will pause when balance reaches zero. Top up instantly or turn on auto-refill to keep pipelines uninterrupted.</p>
            <div class="row">
              <button class="btn pri lg" data-action="topup">${icons.zap} Top Up Credits</button>
              <button class="btn ghost lg" data-tab-nav="plans">View Yearly (Save 25%)</button>
            </div>
            <div class="fine">At your current pace of ≈ 48 QCC/day, credits will run out tomorrow.</div>
          </div>
        </div>
      `;
    } else if (state.walletMode === 'claimed' && state.starterUsed) {
      heroHtml = `<div class="offer" style="background-image:url(../assets/cases/case_site.jpg)"><div><div class="k"><span class="chip g">${icons.check} Starter explored</span><span class="chip o">Your balance is ready</span></div><h2>Turn credits into <em>what's next.</em></h2><p>Preview your remaining QCC across Lumi, Sonic and Cody; compare model costs before starting a task.</p><div class="row"><button class="btn pri lg" data-tab-nav="usage">${icons.zap} View your runway</button><button class="btn ghost lg" data-tab-nav="plans">Compare plans</button></div><div class="fine">Demo balance only. No card charged or real QCC granted.</div></div></div>`;
    } else if (state.walletMode === 'claimed') {
      heroHtml = `
        <div class="offer" style="background-image:url(../assets/cases/case_product.jpg)">
          <div>
            <div class="k"><span class="chip o">${icons.gift} First purchase · concept</span><span class="chip g">Welcome credit claimed</span></div>
            <h2>Meet the <em>Starter Kit</em></h2>
            <p>Preview your first paid pack: 1,200 QCC for $20, including a proposed +200 QCC first-purchase bonus. No rush timer or hidden renewal.</p>
            <div class="row"><button class="btn pri lg" data-action="topup">${icons.zap} Explore Starter Kit · $20</button><button class="btn ghost lg" data-tab-nav="plans">Compare plans</button></div>
            <div class="fine">Offer and eligibility require approval before launch. This is a payment-free preview.</div>
          </div>
        </div>`;
    } else {
      heroHtml = `
        <div class="offer" style="background-image:url(../assets/affiliate/hero_world.jpg)">
          <div>
            <div class="k"><span class="chip o">${icons.crown} Creator Special</span><span class="chip b">Yearly Discount</span></div>
            <h2>Upgrade to Basic Yearly — <em>Save $60</em></h2>
            <p>Get 1,000 QCC each month on the $180/year Basic plan. Any proration and renewal terms must be shown before a confirmed change.</p>
            <div class="row">
              <button class="btn pri lg" data-tab-nav="plans">${icons.crown} Switch to Yearly · $180/yr</button>
              <span class="chip o">Standard yearly saving — no countdown</span>
            </div>
            <div class="fine">Billed annually at $180 (effective $15/mo) versus $240 for 12 monthly payments. Check model availability at checkout.</div>
          </div>
        </div>
      `;
    }

    return `
      <div class="hd">
        <div>
          <h1>Good evening, creator</h1>
          <p>Your balance runway, what your agents created this cycle, and recreation-ready cases.</p>
        </div>
        <div class="act">
          <button class="btn ghost" data-tab-nav="desktop">${icons.download} Desktop app</button>
          <a class="btn pri" href="../one/index.html#ide" target="_blank" rel="noopener noreferrer">${icons.zap} Explore IDE prototype ↗</a>
        </div>
      </div>

      <div class="g g12">
        <div class="c12">${heroHtml}</div>

        <div class="c12">
          <div class="kpi">
            <div>
              <small>Sample cycle spend</small>
              <b>${fq(cur.spent)} <span class="sm muted">QCC</span></b>
              <em>Illustrative data · connect verified ledger</em>
            </div>
            <div>
              <small>Creative case briefs</small>
              <b>${D.cases.length}</b>
              <em>Open to explore model and sample prompt</em>
            </div>
            <div>
              <small>Model categories</small>
              <b>${Object.keys(D.models).length}</b>
              <em>LLM · image · video · audio</em>
            </div>
            <div>
              <small>Estimated runway</small>
              <b style="color:var(--ok)">${cur.perDay > 0 ? (cur.bal / cur.perDay < 1 ? '&lt;1 day' : Math.floor(cur.bal / cur.perDay) + ' days') : '—'}</b>
              <em>${cur.perDay > 0 ? 'At sample usage pace · estimate only' : 'Start creating to see an estimate'}</em>
            </div>
          </div>
        </div>

        <div class="c8">
          <div class="card">
            <div class="ct">
              <h3>Creative concepts · six case briefs</h3>
              <a href="#" data-action="compare" class="btn link">Inspect benchmarks →</a>
            </div>
            <div class="cases">
              ${D.cases.map(c => `
                <button type="button" class="case" data-case="${c.id}" aria-label="${c.title}">
                  <img src="${c.img}" alt="${c.title}" loading="lazy">
                  <span class="chip o tag">${c.kind}</span>
                  <span class="cost">≈ ${c.cost} QCC · example</span>
                  <div class="cap">
                    <b>${c.title}</b>
                    <small>${c.logo ? `<img src="../assets/logos/${c.logo}.svg" alt="">` : `<span class="model-mark" aria-hidden="true">S</span>`} ${c.agent} · ${c.model}</small>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="c4">
          <div class="card">
            <div class="ct">
              <h3>Example spend by agent</h3>
              <span class="chip o">Sample model mix</span>
            </div>
            <div style="display:grid;gap:14px;margin-top:8px">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                  <b>Lumi <span class="muted">· Images</span></b>
                  <span class="mono">${fq(agentMix.Lumi)} QCC (${mixPct('Lumi')}%)</span>
                </div>
                <div class="bar"><i style="width:${mixPct('Lumi')}%;background:linear-gradient(90deg,#a78bfa,#c084fc)"></i></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                  <b>Sonic <span class="muted">· Video & Music</span></b>
                  <span class="mono">${fq(agentMix.Sonic)} QCC (${mixPct('Sonic')}%)</span>
                </div>
                <div class="bar"><i style="width:${mixPct('Sonic')}%;background:linear-gradient(90deg,#ff7a2e,#fb923c)"></i></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                  <b>Cody <span class="muted">· Apps & Code</span></b>
                  <span class="mono">${fq(agentMix.Cody)} QCC (${mixPct('Cody')}%)</span>
                </div>
                <div class="bar"><i style="width:${mixPct('Cody')}%;background:linear-gradient(90deg,#60a5fa,#93c5fd)"></i></div>
              </div>
            </div>

            <div class="hr" style="border-top:1px solid var(--line);margin:18px 0 14px"></div>

            <div style="font-size:12.5px;color:var(--muted)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <span style="color:var(--ok)">●</span> <b>Shared wallet · design goal</b>
              </div>
              <p>One server balance should power both the website and IDE. Live device status and version must come from the actual app.</p>
              <button class="btn ghost sm block mt-2" data-tab-nav="desktop" style="margin-top:10px">Manage Desktop Studio</button>
            </div>
          </div>
        </div>
        <div class="c12 comparison-section">
          <div class="section-cap"><div><span class="eyebrow">BEFORE / AFTER · 07 FLOWS</span><h2>Nothing left behind<span class="orange-dot">.</span></h2><p>Every key Higgsfield pattern traced to a deliberate Quadcode experience. Open a section for the original reference, proposed screen and implementation notes.</p></div><span class="mini-index">HIGGSFIELD <b>→</b> QUADCODE AI</span></div>
          <div class="bench-grid">
            ${[
              ['home','Overview','A reason to return'],['plans','Plans & credits','The first purchase moment'],['usage','Usage','Clarity on every QCC'],['billing','Billing','No payment dead ends'],['rewards','Rewards','Earn before you buy'],['settings','Settings','Stay in control'],['desktop','Desktop app','From site to IDE']
            ].map(([id,label,why],n)=>`<button class="bench-tile" type="button" data-compare-tab="${id}" aria-label="Compare ${label} with Higgsfield">
              <span class="bench-shot"><img src="${D.compare[id].hf || '../assets/hf-live/video-composer.png'}" alt="${id === 'desktop' ? 'Higgsfield web editor reference; not a desktop app screenshot' : `Higgsfield ${label} reference screenshot`}" loading="lazy"><span class="bench-source">HIGGSFIELD REFERENCE</span></span>
              <span class="bench-meta"><small>0${n+1} / ${label.toUpperCase()}</small><strong>${why}</strong><em>${D.compare[id].took[0]}</em><span class="bench-go">See the before / after <b>↗</b></span></span>
            </button>`).join('')}
          </div>
          <p class="comparison-note">These are researched design references and an interactive proposal, not production features. Eligibility, prices and payment logic must be verified before launch.</p>
        </div>
      </div>
    `;
  }

  // 2. Plans & Credits
  function renderPlans() {
    const isYearly = state.billingCycle === 'yearly';

    return `
      <div class="hd">
        <div>
          <h1>Plans & credits</h1>
          <p>Transparent pricing with real QCC credits. All 24 AI models available on every tier.</p>
        </div>
        <div class="act">
          <span class="chip o">Public Quadcode plans · preview pricing</span>
        </div>
      </div>

      <div class="plans">
        <!-- Free Tier -->
        <div class="plan">
          <h3>Free Explorer</h3>
          <div class="pr">$0 <small>/ month</small></div>
          <p class="muted sm">Try every agent and model with promo codes or rewards.</p>
          <ul>
            <li>${icons.check} 24 AI models included</li>
            <li>${icons.check} Web & Desktop IDE access</li>
            <li>${icons.check} Credits via promo codes</li>
            <li>${icons.check} Standard generation queue</li>
          </ul>
          <div class="foot">
            <button class="btn ghost block" data-action="promo">Enter promo code</button>
          </div>
        </div>

        <!-- Actual current account plan shown in the Zen capture. -->
        <div class="plan ${(state.walletMode === 'sub' || state.walletMode === 'low') && state.planPreview === 'monthly' ? 'best' : ''}">
          ${(state.walletMode === 'sub' || state.walletMode === 'low') && state.planPreview === 'monthly' ? '<div class="rib">Current demo plan</div>' : ''}
          <h3>Basic Monthly</h3>
          <div class="pr">$20 <small>/ month</small></div>
          <p class="muted sm">1,000 QCC added every month · $20 billed monthly</p>
          <ul>
            <li>${icons.check} <b>1,000 QCC</b> added each month</li>
            <li>${icons.check} 30-day unused credit rollover</li>
            <li>${icons.check} Access to supported models</li>
            <li>${icons.check} Web and desktop workspace</li>
          </ul>
          <div class="foot">${(state.walletMode === 'sub' || state.walletMode === 'low') && state.planPreview === 'monthly' ? `<div class="cur">${icons.check} ${state.cancelPreview ? 'Cancellation requested · preview' : state.retentionPreview ? '25% save offer · preview' : 'Basic Monthly in this preview'}</div>` : `<button class="btn ghost block" data-action="review-monthly">Review Basic Monthly</button>`}</div>
        </div>

        <!-- Real Basic Yearly plan: $180 paid annually, 1,000 QCC each month. -->
        <div class="plan ${state.planPreview === 'yearly' ? 'best' : ''}">
          <div class="rib">Save 25%</div>
          <h3>Basic Yearly</h3>
          <div class="pr">$180 <small>/ year</small></div>
          <p class="muted sm"><s>$240 / yr</s> · effective $15 / month</p>
          <ul>
            <li>${icons.check} <b>1,000 QCC</b> credited each month</li>
            <li>${icons.check} Same models as monthly</li>
            <li>${icons.check} 30-day credit rollover</li>
            <li>${icons.check} Review terms before any change</li>
          </ul>
          <div class="foot"><button class="btn pri block" data-action="switch-yearly">${state.planPreview === 'yearly' ? 'Yearly chosen for preview · review again' : 'Review switch to yearly'}</button></div>
        </div>

        <!-- Enterprise is a contact-sales tier, never a made-up price. -->
        <div class="plan">
          <h3>Enterprise</h3>
          <div class="pr">Custom <small>quote</small></div>
          <p class="muted sm">Dedicated setup for teams and larger deployments.</p>
          <ul>
            <li>${icons.check} Tailored credit package</li>
            <li>${icons.check} Team access and controls</li>
            <li>${icons.check} Custom onboarding</li>
            <li>${icons.check} Talk through your requirements</li>
          </ul>
          <div class="foot"><button class="btn ghost block" data-action="contact-sales">Contact sales</button></div>
        </div>
      </div>

      <div class="card" style="margin-top:24px">
        <div class="ct">
          <div>
            <h3>Top Up Balance · Permanent Credit Packs</h3>
            <p class="muted sm">Top-up credits never expire. Use them anytime when plan credits run out.</p>
          </div>
          <span class="chip g">${icons.check} No expiration</span>
        </div>

        <div class="packs">
          ${D.packs.map(p => `
            <div class="pack ${p.best ? 'on' : ''}" data-pack="${p.q}" data-price="${p.p}">
              ${p.best ? '<span class="bn">Best Value</span>' : ''}
              <b>${fq(p.q)} <small>QCC</small></b>
              <small>$${(p.p / p.q * 100).toFixed(1)} / 100 QCC</small>
              <div class="pr">$${p.p}.00</div>
              <button class="btn ${p.best ? 'pri' : 'ghost'} sm block" style="margin-top:10px">Buy Pack</button>
            </div>
          `).join('')}
        </div>

        ${(state.walletMode === 'new' || state.walletMode === 'claimed') && !state.starterUsed ? `<div class="offer" style="margin-top:18px;min-height:160px;background-image:url(../assets/cases/case_game.jpg)">
          <div>
            <div class="k"><span class="chip o">${icons.zap} Starter Kit · First Top-Up Only</span></div>
            <h3 style="font-size:22px;margin:4px 0">Get 1,200 QCC for $20 <span style="color:var(--ok)">(+20% extra)</span></h3>
            <p style="font-size:12.5px;max-width:70%;margin:4px 0 12px">Prototype offer for eligible first-time buyers. Extra 200 demo QCC shown after a simulated purchase.</p>
            <div class="row">
              <button class="btn pri" data-action="topup" data-pack="1200" data-price="20">${icons.zap} Preview Starter Kit ($20)</button>
              <span class="chip o">Eligibility must be checked server-side</span>
            </div>
          </div>
        </div>` : ''}
      </div>

      <div class="card" style="margin-top:20px">
        <div class="ct">
          <h3>Subscription Management</h3>
          <button class="btn link danger sm" data-action="cancel-sub">Cancel subscription</button>
        </div>
        <p class="muted sm">You can cancel or switch tiers anytime. Confirm the last day of access and remaining credit rules from your account's billing data before cancelling.</p>
      </div>

      <div class="card faq" style="margin-top:20px">
        <div class="ct"><h3>Frequently Asked Questions</h3></div>
        <details open>
          <summary>Do unused credits expire at the end of the month?</summary>
          <p>Plan credits rollover for 30 days so you never lose what you paid for. Top-up credit packs never expire under any circumstances.</p>
        </details>
        <details>
          <summary>Can I use any model on any tier?</summary>
          <p>Yes. All 24 LLM nodes (Claude 5.1, GPT-6, DeepSeek) and all media models (Seedance 2.5, Nanobanana, Suno v5) are unlocked on every tier with transparent QCC pricing.</p>
        </details>
        <details>
          <summary>How do automatic refunds work?</summary>
          <p>Proposed: failed runs should produce a verified refund event in the same credit ledger. Timing and eligibility must follow production billing policy.</p>
        </details>
      </div>
    `;
  }

  // 3. Usage & Forecast
  function renderUsage() {
    const cur = state.balances[state.walletMode];
    const days = D.usageDays.slice(-state.usageRange);
    const maxVal = Math.max(...days.map(d => d.reduce((a, b) => a + b, 0)), 80);
    const spentInRange = days.reduce((a, d) => a + d.reduce((x, y) => x + y, 0), 0);
    const daily = days.length ? spentInRange / days.length : 0;
    const runway = daily > 0 ? Math.floor(cur.bal / daily) : null;
    const modelTotal = D.usageRows.reduce((sum, row) => sum + row.q, 0);

    return `
      <div class="hd">
        <div>
          <h1>Usage & forecast</h1>
          <p>Granular ledger of credits spent per model, agent attribution, and predictive runway.</p>
        </div>
        <div class="act">
          <div class="sw" role="group">
            <button type="button" data-action="usage-range" data-days="7" class="${state.usageRange === 7 ? 'on' : ''}">7 days</button>
            <button type="button" data-action="usage-range" data-days="21" class="${state.usageRange === 21 ? 'on' : ''}">21 days</button>
          </div>
          <button class="btn ghost sm" data-action="export-csv">${icons.download} Export CSV</button>
        </div>
      </div>

      <div class="kpi">
        <div>
          <small>Total Spent</small>
          <b>${fq(spentInRange)} <span class="sm muted">QCC</span></b>
          <em>Sample total for ${days.length} days</em>
        </div>
        <div>
          <small>Daily Run Rate</small>
          <b>${fq(daily)} <span class="sm muted">QCC / day</span></b>
          <em>Average across ${days.length} sample days</em>
        </div>
        <div>
          <small>Runway</small>
          <b style="color:${runway !== null && runway < 3 ? 'var(--warn)' : 'var(--text)'}">${runway === null ? '—' : `≈ ${runway} day${runway === 1 ? '' : 's'}`}</b>
          <em>Balance ÷ ${days.length}-day average · illustration</em>
        </div>
        <div>
          <small>Automated Refunds</small>
          <b style="color:var(--ok)">—</b>
          <em>Display verified refund ledger only</em>
        </div>
      </div>

      <div class="card" style="margin-top:20px">
        <div class="ct">
          <div>
            <h3>Daily Spend & 5-Day Predictive Forecast</h3>
            <p class="muted sm">Color segmented: LLM (Orange), Images (Amber), Video (Purple), Audio (Green). Dotted columns = projection.</p>
          </div>
          <div class="leg">
            <span><i style="background:#ff6a00"></i>LLM</span>
            <span><i style="background:#ffb36b"></i>Images</span>
            <span><i style="background:#8b5cf6"></i>Video</span>
            <span><i style="background:#22c55e"></i>Audio</span>
            <span><i style="background:#4b5563"></i>Forecast</span>
          </div>
        </div>

        <div class="chart">
          ${days.map((day, idx) => {
            const [llm, img, vid, aud] = day;
            const isToday = idx === days.length - 1;
            const total = llm + img + vid + aud;
            const h = (total / maxVal) * 120;
            return `
              <div class="col ${isToday ? 'today' : ''}" title="Day ${idx + 1}: ${total.toFixed(1)} QCC">
                <i class="a" style="height:${(aud / maxVal) * 120}px"></i>
                <i class="v" style="height:${(vid / maxVal) * 120}px"></i>
                <i class="im" style="height:${(img / maxVal) * 120}px"></i>
                <i class="l" style="height:${(llm / maxVal) * 120}px"></i>
                <small>${idx === 0 ? 'Start' : (isToday ? 'Now' : '')}</small>
              </div>
            `;
          }).join('')}
          <!-- 5 Forecast columns -->
          ${[42, 45, 40, 48, 44].map((f, i) => `
            <div class="col fc" title="Forecast Day +${i + 1}: ${f} QCC">
              <i class="l" style="height:${(f / maxVal) * 120}px"></i>
              <small>+${i + 1}d</small>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="g g12" style="margin-top:20px">
        <div class="c8">
          <div class="card">
            <div class="ct">
              <h3>Model spend · full 21-day example</h3>
              <span class="chip o">Example model mix · ${fq(modelTotal)} QCC</span>
            </div>
            <table class="tbl">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Kind</th>
                  <th class="n">Volume</th>
                  <th class="n">Spent (QCC)</th>
                  <th style="width:120px">Share</th>
                </tr>
              </thead>
              <tbody>
                ${D.usageRows.map(r => {
                  const pct = modelTotal > 0 ? ((r.q / modelTotal) * 100).toFixed(1) : '0.0';
                  return `
                    <tr>
                      <td>
                        <div class="m">
                          <img src="../assets/logos/${r.logo}.svg" alt="">
                          <div><b>${r.n}</b></div>
                        </div>
                      </td>
                      <td><span class="chip sm">${r.kind}</span></td>
                      <td class="n">${r.runs}</td>
                      <td class="n"><b>${fq(r.q)}</b></td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div class="bar" style="flex:1"><i style="width:${pct}%"></i></div>
                          <span class="sm muted mono">${pct}%</span>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="c4">
          <div class="card">
            <div class="ct">
              <h3>Sample cycle audit</h3>
              <button type="button" class="btn link" data-action="usage-range" data-days="21">21-day chart →</button>
            </div>
            <div style="display:grid;gap:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px;padding-bottom:10px;border-bottom:1px solid var(--line)">
                <div><b>Night run · 30s film</b><small class="muted block">Sonic · Seedance 2.5</small></div>
                <span class="mono" style="color:var(--acc3)">230.00 QCC</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px;padding-bottom:10px;border-bottom:1px solid var(--line)">
                <div><b>Ride-share app refactor</b><small class="muted block">Cody · Claude 5.1 Fable</small></div>
                <span class="mono" style="color:var(--acc3)">121.20 QCC</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px;padding-bottom:10px;border-bottom:1px solid var(--line)">
                <div><b>Earbuds studio render</b><small class="muted block">Lumi · Nanobanana</small></div>
                <span class="mono" style="color:var(--acc3)">9.20 QCC</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px">
                <div><b>Refund ledger example</b><small class="muted block">Requires verified failed-run event</small></div>
                <span class="mono" style="color:var(--ok)">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. Billing & Invoices
  function renderBilling() {
    return `
      <div class="hd">
        <div>
          <h1>Billing & invoices</h1>
          <p>Payment-method and invoice layout preview. No card details or real receipts are connected to this prototype.</p>
        </div>
        <div class="act">
          <button class="btn pri sm" data-action="topup">${icons.zap} Top up balance</button>
        </div>
      </div>

      <div class="g g12">
        <div class="c6">
          <div class="card">
            <div class="ct">
              <h3>Payment Method</h3>
              <span class="chip o">Example layout</span>
            </div>
            <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--card2);border:1px solid var(--line2);border-radius:12px">
              <img src="../assets/logos/visa.svg" alt="Visa" style="width:44px;height:auto">
              <div style="flex:1">
                <b>Card on file ·•••• (example)</b>
                <small class="muted block">Payment method fetched securely in production · no card stored in this demo</small>
              </div>
              <button class="btn ghost sm" data-action="update-card">Update</button>
            </div>
            <div style="margin-top:14px;font-size:12.5px;color:var(--muted)">
              Next charge date and payment method must be returned by the billing provider. Illustrative Basic Monthly is <b style="color:var(--text)">$20 / month</b>.
            </div>
          </div>

          <div class="card" style="margin-top:16px">
            <div class="ct">
              <div>
                <h3>Auto-Refill Safeguard</h3>
                <p class="muted sm">Automatically top up credits before long tasks fail.</p>
              </div>
              <button type="button" role="switch" aria-checked="${state.autoRefill}" class="sw2 ${state.autoRefill ? 'on' : ''}" data-action="toggle-autorefill" aria-label="Preview auto-refill"></button>
            </div>
            <div style="display:grid;gap:12px;margin-top:10px">
              <div class="fld">
                <label>Threshold trigger</label>
                <select id="sel-threshold">
                  <option value="50">When balance drops below 50 QCC</option>
                  <option value="100" selected>When balance drops below 100 QCC (Recommended)</option>
                  <option value="200">When balance drops below 200 QCC</option>
                </select>
              </div>
              <div class="fld">
                <label>Top-up pack amount</label>
                <select id="sel-pack">
                  <option value="100">100 QCC for $2.00</option>
                  <option value="500" selected>500 QCC for $10.00</option>
                  <option value="1000">1,000 QCC for $20.00</option>
                </select>
              </div>
              <p class="muted sm">Concept only. Production requires a verified payment method, explicit price/threshold consent, monthly cap (e.g. three refills), receipt emails and failure handling. No charges can occur here.</p>
            </div>
          </div>
        </div>

        <div class="c6">
          <div class="card">
            <div class="ct">
              <h3>Invoices & Receipts</h3>
              <span class="chip sm">Sample rows · no live receipts</span>
            </div>
            <table class="tbl">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th class="n">Amount</th>
                  <th class="n">Receipt</th>
                </tr>
              </thead>
              <tbody>
                ${D.invoices.map(inv => `
                  <tr>
                    <td>${inv.d}</td>
                    <td><b>${inv.what}</b></td>
                    <td class="n">${inv.amt}</td>
                    <td class="n">
                      ${inv.pdf
                        ? `<button class="btn ghost sm" data-action="download-invoice" data-invoice="${inv.d}">${icons.download} Sample</button>`
                        : `<span class="chip sm">${inv.st}</span>`
                      }
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="card" style="margin-top:16px">
            <div class="ct">
              <h3>Business Tax & VAT Details</h3>
            </div>
            <div class="fld2">
              <div class="fld">
                <label for="billing-company">Company Legal Name</label>
                <input id="billing-company" type="text" value="" placeholder="Company name · sample only" autocomplete="off">
              </div>
              <div class="fld">
                <label for="billing-vat">VAT / Tax ID</label>
                <input id="billing-vat" type="text" value="" placeholder="Tax ID · sample only" autocomplete="off">
              </div>
            </div>
            <button class="btn ghost sm mt-2" data-action="save-vat" style="margin-top:12px">Review invoice setup · preview</button>
          </div>
        </div>
      </div>
    `;
  }

  // 5. Rewards & Offers
  function renderRewards() {
    return `
      <div class="hd">
        <div>
          <h1>Rewards & offers</h1>
          <p>Preview verified member perks, first-purchase referrals and promo grants. Check credit expiry for each offer.</p>
        </div>
        <div class="act">
          <span class="chip o">${icons.tag} Verification required in production</span>
        </div>
      </div>

      <div class="g g12">
        <div class="c12">
          <button type="button" class="rewards-art" data-case="film" aria-label="Explore a cinematic creative case and the model behind it">
            <img src="../assets/affiliate/creator_reel.jpg" alt="Cinematic AI-generated film concept with lavender, cobalt and warm orange light" loading="lazy">
            <span class="rewards-art-body"><span class="eyebrow">CREATE · SHARE · UNLOCK</span><strong>Your next idea could<br><em>open every door.</em></strong><small>Open a film case → model, example spend, prompt and workflow.</small><span class="btn pri sm">Explore the case ↗</span></span>
            <span class="art-counter" aria-hidden="true">REWARDS / 01</span>
          </button>
        </div>
        <!-- Discord Community Perk -->
        <div class="c12">
          <div class="card hot">
            <div class="rw">
              <div class="ic d">${icons.discord}</div>
              <div class="tx">
                <b>Discord Community Member Perk · 100 QCC</b>
                <small>Verify membership once per account to receive +100 QCC. Production flow must verify Discord user ID server-side.</small>
              </div>
              <div class="val">+100 QCC</div>
              <button class="btn ${state.discordClaimed ? 'ghost' : 'disc'}" data-action="claim-discord" ${state.discordClaimed ? 'disabled' : ''}>
                ${state.discordClaimed ? `${icons.check} Claimed in preview` : 'Verify & claim · preview'}
              </button>
            </div>
          </div>
        </div>

        <!-- Guest Passes -->
        <div class="c7">
          <div class="card">
            <div class="ct">
              <div>
                <h3>Creator Guest Passes</h3>
                <p class="muted sm">Give a friend 200 QCC on their first top-up, and you get 200 QCC.</p>
              </div>
              <span class="chip o">Concept · up to 10 verified referrals / month</span>
            </div>

            <div class="steps">
              <div class="now"><i>1</i><span>Share pass after activation</span></div>
              <div><i>2</i><span>Friend buys eligible pack</span></div>
              <div><i>3</i><span>Both get +200 QCC</span></div>
            </div>

            <div class="link">
              <span>Personal referral URL appears here after launch</span>
              <button class="btn pri sm" data-action="referral-details">${icons.gift} How it works</button>
            </div>

            <div class="hr" style="border-top:1px solid var(--line);margin:18px 0 14px"></div>

            <h4 style="margin-bottom:10px">Example invitation states · no real invites</h4>
            <div class="inv">
              ${D.invites.map(inv => `
                <div>
                  <span class="av">${inv.ini}</span>
                  <b>${inv.n}</b>
                  <small style="color:${inv.ok ? 'var(--ok)' : 'var(--muted)'}">${inv.st}</small>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Promo Code & Film Week -->
        <div class="c5">
          <div class="card">
            <div class="ct">
              <h3>Redeem Promo Code</h3>
            </div>
            <div class="inp">
              <input type="text" id="promo-code-input" aria-label="Promo code" autocomplete="off" placeholder="Try DEMO200 (prototype only)">
              <button class="btn pri sm" data-action="apply-promo">Apply</button>
            </div>
            <div style="margin-top:12px;font-size:12px;color:var(--muted)">
              Use <code class="mono" style="color:var(--acc3)">DEMO200</code> to preview one eligible +200 QCC grant. Real promo codes must be validated server-side; no live credits are issued here.
            </div>
          </div>

          <div class="card" style="margin-top:16px">
            <div class="hero-img">
              <img src="../assets/cases/case_film.jpg" alt="Film Challenge">
              <div class="ov">
                <h3>Film Week Challenge</h3>
                <p>Imagine a 30-second AI film made with your favorite video model. Entry dates and prizes require approval.</p>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span class="chip o">Example campaign · launch date to be confirmed</span>
              <button class="btn ghost sm" data-action="film-details">View brief</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 6. Settings
  function renderSettings() {
    return `
      <div class="hd">
        <div>
          <h1>Settings</h1>
          <p>Account identity, notifications, spending caps, and developer API keys.</p>
        </div>
      </div>

      <div class="g g12">
        <div class="c8">
          <div class="card">
            <div class="ct"><h3>Profile Identity</h3></div>
            <div class="row2">
              <div class="lft">
                <div class="who" style="gap:12px">
                  <div class="av" style="width:48px;height:48px;font-size:18px">DE</div>
                  <div>
                    <b style="font-size:15px">${D.user.name}</b>
                    <small>${D.user.email} · Member since ${D.user.since}</small>
                  </div>
                </div>
              </div>
              <div class="rgt">
                <span class="chip o">Creator Studio · sample</span>
              </div>
            </div>
          </div>

          <div class="card" style="margin-top:16px">
            <div class="ct"><h3>Notification & Alert Thresholds</h3></div>
            <div class="row2">
              <div class="lft">
                <div>
                  <b>Low-Balance Email Alert</b>
                  <small>Receive an immediate warning when credits drop below threshold</small>
                </div>
              </div>
              <div class="rgt">
                <button type="button" role="switch" aria-checked="${state.notifications.low}" class="sw2 ${state.notifications.low ? 'on' : ''}" data-notify="low" aria-label="Preview low balance alert"></button>
              </div>
            </div>
            <div class="row2">
              <div class="lft">
                <div>
                  <b>Weekly Spend & Generation Digest</b>
                  <small>Summary email every Monday with models used and tokens spent</small>
                </div>
              </div>
              <div class="rgt">
                <button type="button" role="switch" aria-checked="${state.notifications.digest}" class="sw2 ${state.notifications.digest ? 'on' : ''}" data-notify="digest" aria-label="Preview weekly digest"></button>
              </div>
            </div>
            <div class="row2">
              <div class="lft">
                <div>
                  <b>Product & New Model Announcements</b>
                  <small>Be notified when new models (e.g. Seedance 3, Claude Opus 5.5) release</small>
                </div>
              </div>
              <div class="rgt">
                <button type="button" role="switch" aria-checked="${state.notifications.product}" class="sw2 ${state.notifications.product ? 'on' : ''}" data-notify="product" aria-label="Preview product announcements"></button>
              </div>
            </div>
          </div>

          <div class="card" style="margin-top:16px">
            <div class="ct"><h3>Default Model Preferences</h3></div>
            <div class="fld2">
              <div class="fld">
                <label>Lumi (Images)</label>
                <select data-pref="lumi" aria-label="Preview preferred Lumi image model">
                  ${['Nanobanana (~9.2 QCC · Recommended)', 'Flux 2 Max (~4.2 QCC)', 'Flux 2 Pro (~1.8 QCC)'].map(name => `<option ${state.defaultModels.lumi === name ? 'selected' : ''}>${name}</option>`).join('')}
                </select>
              </div>
              <div class="fld">
                <label>Sonic (Video)</label>
                <select data-pref="sonic" aria-label="Preview preferred Sonic video model">
                  ${['Seedance 2.5 (~230 QCC · Cinematic)', 'Veo 3 (~200 QCC)', 'Kling 3 (~60 QCC)'].map(name => `<option ${state.defaultModels.sonic === name ? 'selected' : ''}>${name}</option>`).join('')}
                </select>
              </div>
            </div>
            <p class="muted sm" style="margin:12px 0 0">Preview only. IDE shows confirmed costs before each run; saved model defaults need account sync before launch.</p>
          </div>
        </div>

        <div class="c4">
          <div class="card">
            <div class="ct"><h3>Developer API Key</h3></div>
            <p class="muted sm">Use your API key to access Quadcode agents programmatically from CLI or SDK.</p>
            <div class="link" style="margin:12px 0">
              <span>Preview only · no API token in this prototype</span>
              <button class="btn ghost sm" data-action="preview-token">See requirements</button>
            </div>
            <button class="btn ghost sm block" data-action="preview-token">API token requirements</button>
          </div>

          <div class="card" style="margin-top:16px">
            <div class="ct"><h3>Linked Accounts</h3></div>
            <div style="display:grid;gap:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px">
                <div style="display:flex;align-items:center;gap:8px">
                  <img src="../assets/logos/google.svg" alt="" style="width:18px;height:18px">
                  <span>Google</span>
                </div>
                <span class="chip g sm">${icons.check} Connected</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span aria-hidden="true" class="mono" style="font-size:11px;line-height:18px">GH</span>
                  <span>GitHub</span>
                </div>
                <span class="chip sm">Not connected (observed)</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="color:#5865f2">${icons.discord}</span>
                  <span>Discord</span>
                </div>
                ${state.discordClaimed ? `<span class="chip g sm">${icons.check} Claimed in preview</span>` : `<button class="btn ghost sm" data-action="claim-discord">Preview verification</button>`}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 7. Desktop App
  function renderDesktop() {
    return `
      <div class="hd">
        <div>
          <h1>Desktop app</h1>
          <p>Download Quadcode AI for macOS, Windows, or Linux. Proposed Workspace integration: one sign-in and a shared credit balance.</p>
        </div>
        <div class="act">
          <span class="chip o">Concept: download flows &amp; shared wallet</span>
        </div>
      </div>

      <div class="dlc">
        <div>
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1 .08 2.01-.48 2.63-1.23z"/></svg>
          <b>macOS Studio</b>
          <small>Apple Silicon (M1/M2/M3/M4) & Intel</small>
          <div class="mono sm muted">Prototype CTA · verify official installer URL before launch</div>
          <button class="btn pri sm" data-action="download-mac">${icons.download} Download DMG</button>
        </div>

        <div>
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8"/></svg>
          <b>Windows Studio</b>
          <small>64-bit Installer with CUDA acceleration</small>
          <div class="mono sm muted">Prototype CTA · verify official installer URL before launch</div>
          <button class="btn pri sm" data-action="download-win">${icons.download} Download EXE</button>
        </div>

        <div>
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px"><path d="M12.003 2c-5.523 0-10 4.477-10 10 0 4.42 2.865 8.17 6.839 9.49.5.09.682-.22.682-.48 0-.24-.009-.87-.014-1.71-2.782.6-3.369-1.34-3.369-1.34-.455-1.16-1.11-1.47-1.11-1.47-.908-.62.069-.61.069-.61 1.004.07 1.532 1.03 1.532 1.03.892 1.53 2.341 1.09 2.91.83.091-.65.351-1.09.639-1.34-2.22-.25-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.03-2.68-.103-.25-.447-1.27.098-2.65 0 0 .84-.27 2.75 1.02.798-.22 1.653-.33 2.503-.33.85 0 1.705.11 2.504.33 1.909-1.29 2.747-1.02 2.747-1.02.548 1.38.204 2.4.101 2.65.64.7 1.028 1.59 1.028 2.68 0 3.84-2.339 4.69-4.566 4.93.359.31.678.92.678 1.85 0 1.34-.012 2.42-.012 2.75 0 .27.18.58.688.48A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z"/></svg>
          <b>Linux AppImage</b>
          <small>Ubuntu, Debian, Fedora & Arch</small>
          <div class="mono sm muted">Prototype CTA · verify official installer URL before launch</div>
          <button class="btn pri sm" data-action="download-linux">${icons.download} Download AppImage</button>
        </div>
      </div>

      <div class="card" style="margin-top:24px">
        <div class="ct">
          <h3>Why use the Native Desktop Studio?</h3>
          <span class="chip b">Creator Advantage</span>
        </div>
        <div class="feat">
          <div>
            <img src="../assets/cases/case_app.jpg" alt="Agent Studio">
            <b>Multi-Agent Orchestration</b>
            <small>Cody, Lumi, and Sonic collaborate on the same task tree in real time.</small>
          </div>
          <div>
            <img src="../assets/cases/case_film.jpg" alt="Model Cache">
            <b>One shared wallet</b>
            <small>Keep the same QCC balance and model-cost checks when moving between Workspace and IDE.</small>
          </div>
          <div>
            <img src="../assets/cases/case_music.jpg" alt="Sync">
            <b>Universal Cloud Sync</b>
            <small>Single wallet, shared prompt history, and seamless handoff to the web workspace.</small>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:20px">
        <div class="ct"><h3>Desktop handoff</h3><span class="chip o">Implementation required</span></div>
        <div class="log">
          <div><time>01 · DOWNLOAD</time><div><b>Use verified installers</b> — read live platform download endpoints. This concept does not host binaries.</div></div>
          <div><time>02 · AUTH</time><div><b>One account</b> — sign-in and session recovery shared by website and native IDE.</div></div>
          <div><time>03 · WALLET</time><div><b>One credit ledger</b> — display the same spend, rewards, top-ups and low-credit status in both surfaces.</div></div>
        </div>
      </div>
    `;
  }

  // --- Main View Dispatcher ---
  function renderView() {
    const main = document.getElementById('view');
    if (!main) return;

    // Update active nav class
    document.querySelectorAll('#nav a').forEach(a => {
      a.classList.toggle('on', a.dataset.tab === state.tab);
    });

    switch (state.tab) {
      case 'home':
        main.innerHTML = renderHome();
        break;
      case 'plans':
        main.innerHTML = renderPlans();
        break;
      case 'usage':
        main.innerHTML = renderUsage();
        break;
      case 'billing':
        main.innerHTML = renderBilling();
        break;
      case 'rewards':
        main.innerHTML = renderRewards();
        break;
      case 'settings':
        main.innerHTML = renderSettings();
        break;
      case 'desktop':
        main.innerHTML = renderDesktop();
        break;
      default:
        main.innerHTML = renderHome();
    }

    if (state.drawerOpen) {
      renderDrawer();
    }
  }

  // --- Higgsfield Comparison Drawer ---
  function renderDrawer() {
    const dr = document.getElementById('drawer');
    if (!dr) return;

    const ctx = D.compare[state.tab] || D.compare.home;

    dr.innerHTML = `
      <button type="button" class="x" data-action="close-drawer" aria-label="Close drawer">${icons.x}</button>
      <h3>
        ${ctx.title}
        <span class="tag-hf">HF Benchmark</span>
        <span class="tag-qc">QC V2</span>
      </h3>
      <p class="sub">${ctx.hfCap}</p>

      ${ctx.hf ? `
        <figure>
          <img src="${ctx.hf}" alt="${ctx.title} Benchmark" data-action="zoom-hf" data-src="${ctx.hf}">
          <figcaption>
            <span>Live Higgsfield Reference</span>
            <span class="mono">Click to enlarge</span>
          </figcaption>
        </figure>
      ` : ''}

      <h5>Current Live Quadcode Issues</h5>
      <ul>
        ${ctx.bugs.map(b => `<li class="bug">${icons.alert} <span>${b}</span></li>`).join('')}
      </ul>

      <h5>What This V2 Prototype Adds</h5>
      <ul>
        ${ctx.took.map(t => `<li class="ok">${icons.check} <span>${t}</span></li>`).join('')}
      </ul>

      <h5>Developer Handoff Specification</h5>
      <div class="spec">${ctx.spec}</div>
    `;

    dr.classList.add('on');
    dr.setAttribute('aria-hidden', 'false');
    dr.focus();
    state.drawerOpen = true;
  }

  function closeDrawer() {
    const dr = document.getElementById('drawer');
    if (dr) { dr.classList.remove('on'); dr.setAttribute('aria-hidden', 'true'); }
    state.drawerOpen = false;
  }

  // --- Modals Engine ---
  let dialogRestoreFocus = null;
  function openModal(html) {
    const m = document.getElementById('modal');
    if (!m) return;
    dialogRestoreFocus = document.activeElement;
    m.innerHTML = `<div class="bx">${html}</div>`;
    m.classList.add('on');
    m.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => m.querySelector('button:not(:disabled),input,a')?.focus());
  }

  function closeModal() {
    const m = document.getElementById('modal');
    if (m) { m.classList.remove('on'); m.setAttribute('aria-hidden', 'true'); }
    if (dialogRestoreFocus?.isConnected) dialogRestoreFocus.focus({ preventScroll: true });
    dialogRestoreFocus = null;
  }

  function applyDemoPromo(code) {
    if (!code) { showToast('Enter a promo code first.', false); return false; }
    if (code !== 'DEMO200') { showToast('Code not recognized in this preview. Only DEMO200 is enabled.', false); return false; }
    if (state.promoApplied === code) { showToast('This promo was already used in this preview.', false); return false; }
    state.promoApplied = code;
    state.balances[state.walletMode].bal += 200;
    state.balances[state.walletMode].bonusCredits = (Number(state.balances[state.walletMode].bonusCredits) || 0) + 200;
    renderWallet(); renderView();
    showToast('Demo: +200 QCC added once. No live promo redeemed.');
    return true;
  }

  // Case Study Details Modal
  function openCaseModal(id) {
    const c = D.cases.find(x => x.id === id);
    if (!c) return;

    openModal(`
      <button type="button" class="x" data-action="close-modal" aria-label="Close modal">${icons.x}</button>
      <div class="hero" style="background-image:url(${c.img})">
        <div>
          <span class="chip o" style="margin-bottom:8px">${c.kind} · Illustrative case brief</span>
          <h2>${c.title}</h2>
        </div>
      </div>
      <div class="in">
        <div class="meta">
          <div>
            <small>Agent & Model</small>
            <b>${c.logo ? `<img src="../assets/logos/${c.logo}.svg" alt="">` : `<span class="model-mark" aria-hidden="true">S</span>`} ${c.agent} · ${c.model}</b>
          </div>
          <div>
            <small>Illustrative cost</small>
            <b class="mono" style="color:var(--acc3)">${c.cost} ${c.unit}</b>
          </div>
          <div>
            <small>Example output / time</small>
            <b class="mono">${c.time} · ${c.tokens}</b>
          </div>
        </div>

        <h4 style="margin:12px 0 6px">Generation Prompt</h4>
        <div class="prompt">${c.prompt}</div>

        <div class="foot">
          <div class="l">Design brief · not an account generation. Final QCC is model-calculated at run time.</div>
          <button class="btn ghost sm" data-action="copy-prompt" data-prompt="${encodeURIComponent(c.prompt)}">${icons.copy} Copy Prompt</button>
          <a class="btn pri sm" href="../one/index.html#ide">${icons.zap} Explore IDE flow ↗</a>
        </div>
      </div>
    `);
  }

  function openPlanReview(which) {
    const yearly = which === 'yearly';
    openModal(`<button class="x" data-action="close-modal" aria-label="Close">${icons.x}</button><div class="in"><span class="chip o">Design preview · not a checkout</span><h2>${yearly ? 'Basic Yearly' : 'Basic Monthly'}</h2><p>${yearly ? '$180 paid once per year; 1,000 QCC added each month.' : '$20 billed each month; 1,000 QCC added each month.'}</p><p class="muted sm">No real subscription changes here. Production must display taxes, next charge and any proration before confirmation.</p><div class="foot"><button class="btn ghost" data-action="close-modal">Not now</button><button class="btn pri" data-action="preview-plan" data-plan="${which}">Select in demo only</button></div></div>`);
  }

  // Top Up Modal
  function openTopupModal(initial = 1000) {
    const first = (state.walletMode === 'new' || state.walletMode === 'claimed') && !state.starterUsed;
    const selected = first && (initial === 1000 || initial === 1200) ? 1200 : (initial === 1200 ? 1000 : initial);
    const packs = first ? D.packs.map(p => p.q === 1000 ? {...p, q: 1200} : p) : D.packs;
    openModal(`
      <button type="button" class="x" data-action="close-modal" aria-label="Close modal">${icons.x}</button>
      <div class="in">
        <h2>${first ? 'Starter Kit · first purchase' : 'Top up credits'}</h2>
        <p class="muted sm" style="margin-bottom:16px">Purchased QCC never expire. ${first ? 'Starter pack includes 1,000 purchased QCC + 200 proposed bonus QCC; bonus expires 14 days after grant. ' : ''}Credits work with all models shown in the IDE.</p>

        <div class="packs">
          ${packs.map(p => `
            <div class="pack ${selected === p.q ? 'on' : ''}" data-action="confirm-pack" data-q="${p.q}" data-p="${p.p}">
              ${p.best ? `<span class="bn">${first ? '+20% starter bonus' : 'Popular'}</span>` : ''}
              <b>${fq(p.q)} <small>QCC</small></b>
              ${first && p.q === 1200 ? '<small class="muted">1,000 paid + 200 reward</small>' : ''}
              <div class="pr">$${p.p}.00</div>
              <small class="muted">$${(p.p / p.q * 100).toFixed(1)} / 100 QCC</small>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:20px;padding:14px;background:var(--card2);border:1px solid var(--line2);border-radius:12px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <b>Payment preview · no card charged</b>
            <small class="muted block">Production: secure checkout, real amount, confirmation and receipt before granting QCC.</small>
          </div>
          <button class="btn pri" data-action="buy-selected">${icons.check} Preview add credits</button>
        </div>
      </div>
    `);
  }

  // Promo Code Modal
  function openPromoModal() {
    openModal(`
      <button type="button" class="x" data-action="close-modal" aria-label="Close modal">${icons.x}</button>
      <div class="in">
        <h2>Redeem Promo Code</h2>
        <p class="muted sm" style="margin-bottom:16px">Enter your promo code to add bonus credits to your wallet.</p>
        <div class="inp">
          <input type="text" id="modal-promo-input" aria-label="Promo code" autocomplete="off" placeholder="DEMO200 (prototype only)">
          <button class="btn pri" data-action="modal-apply-promo">Apply Code</button>
        </div>
        <div style="margin-top:14px;font-size:12px;color:var(--muted)">
          Only DEMO200 works in this preview (+200 QCC, once). Production validates every promo server-side; no real balance changes here.
        </div>
      </div>
    `);
  }

  // Cancel Subscription Modal
  function openCancelModal() {
    openModal(`
      <button type="button" class="x" data-action="close-modal" aria-label="Close modal">${icons.x}</button>
      <div class="in">
        <h2>Before you cancel…</h2>
        <p class="muted sm" style="margin-bottom:14px">Retention concept for review — this discount is not active in your live account:</p>

        <div class="card hot" style="margin-bottom:18px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <b style="font-size:16px;color:var(--acc3)">Stay for $15/mo for 2 months</b>
              <p class="muted sm" style="margin-top:4px">Keep your 1,000 QCC/mo and priority queue with a 25% discount.</p>
            </div>
            <button class="btn pri" data-action="accept-retention">${icons.crown} Preview save offer</button>
          </div>
        </div>

        <p class="sm muted" style="margin-bottom:16px">Before a real cancellation, show the exact end date, credit policy and any pending charge from billing; this preview does not cancel anything.</p>

        <div class="foot">
          <button class="btn ghost sm" data-action="close-modal">Keep My Subscription</button>
          <button class="btn danger sm" data-action="confirm-cancel">Preview cancellation</button>
        </div>
      </div>
    `);
  }

  // Lightbox
  function openLightbox(src, alt) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.innerHTML = `<img src="${src}" alt="${alt || 'Reference screenshot'}">`;
    lb.classList.add('on');
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('on');
  }

  // --- Real Countdown Engine ---
  function startTimers() {
    setInterval(() => {
      document.querySelectorAll('.cd span').forEach(el => {
        let val = parseInt(el.textContent, 10);
        if (isNaN(val)) return;
        // subtle animation tick
      });
    }, 1000);
  }

  // --- Event Handling Delegation ---
  function initEvents() {
    // Consistent line icons replace fragile system glyphs in all seven categories.
    const navArt = {
      home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
      plans:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/>',
      usage:'<path d="M4 20V11M10 20V4M16 20v-8M22 20v-6M2 20h22"/>',
      billing:'<path d="M5 3h14v18l-3-2-4 2-4-2-3 2zM8 8h8M8 12h8"/>',
      rewards:'<path d="M12 3v18M3 9h18v12H3z"/><path d="M2 5h20v4H2zM12 5c-6 0-7-6-3-6 3 0 3 6 3 6zm0 0c6 0 7-6 3-6-3 0-3 6-3 6z"/>',
      settings:'<circle cx="12" cy="12" r="3"/><path d="M10 2h4l.6 2.1 1.4.6 2-.9 2.8 2.8-.9 2 .6 1.4L22 11v4l-2.1.6-.6 1.4.9 2-2.8 2.8-2-.9-1.4.6L14 24h-4l-.6-2.1-1.4-.6-2 .9-2.8-2.8.9-2-.6-1.4L2 15v-4l2.1-.6.6-1.4-.9-2 2.8-2.8 2 .9 1.4-.6z" transform="translate(0 -1) scale(1 .94)"/>',
      desktop:'<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8M12 18v4"/>'
    };
    document.querySelectorAll('#nav a[data-tab]').forEach(a => {
      const tab = a.dataset.tab;
      const labels = [...a.querySelectorAll(':scope > span')].map(s => s.outerHTML).join('');
      const glyph = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navArt[tab]}</svg>`;
      a.innerHTML = `<i class="navico" aria-hidden="true">${glyph}</i>${labels}`;
    });
    // Navigation Clicks
    document.getElementById('nav')?.addEventListener('click', e => {
      const a = e.target.closest('a[data-tab]');
      if (!a) return;
      e.preventDefault();
      const tabId = a.dataset.tab;
      state.tab = tabId;
      window.location.hash = '#' + tabId;
      renderView();
    });

    // Preview Wallet Mode Switcher
    document.querySelectorAll('.lab .sw button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.state;
        if (!state.balances[mode]) return;
        state.walletMode = mode;
        renderWallet();
        renderView();
        showToast(`Switched preview state to: ${state.balances[mode].label}`);
      });
    });

    // Hashchange listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'plans', 'usage', 'billing', 'rewards', 'settings', 'desktop'].includes(hash)) {
        state.tab = hash;
        renderView();
      }
    });

    // Workspace-only preferences preview. Production requires a persisted account API.
    document.addEventListener('change', e => {
      const model = e.target.closest('select[data-pref]');
      if (!model || !['lumi', 'sonic'].includes(model.dataset.pref)) return;
      state.defaultModels[model.dataset.pref] = model.value;
      showToast(`Preview model: ${model.value}. No IDE account setting was changed.`);
    });

    // Global Click Handler Delegation
    document.addEventListener('click', e => {
      const notify = e.target.closest('[data-notify]');
      if (notify && Object.prototype.hasOwnProperty.call(state.notifications, notify.dataset.notify)) {
        const key = notify.dataset.notify;
        state.notifications[key] = !state.notifications[key];
        notify.classList.toggle('on', state.notifications[key]);
        notify.setAttribute('aria-checked', String(state.notifications[key]));
        showToast(`Preview: ${key} notifications ${state.notifications[key] ? 'on' : 'off'}. No email preferences changed.`);
        return;
      }
      // Open the matching Workspace category and its researched Higgsfield comparison.
      const benchmark = e.target.closest('[data-compare-tab]');
      if (benchmark) {
        e.preventDefault();
        const tab = benchmark.dataset.compareTab;
        if (!D.compare[tab]) return;
        state.tab = tab;
        window.location.hash = '#' + tab;
        renderView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderDrawer();
        return;
      }
      // Internal tab navigation button
      const navBtn = e.target.closest('[data-tab-nav]');
      if (navBtn) {
        e.preventDefault();
        state.tab = navBtn.dataset.tabNav;
        window.location.hash = '#' + state.tab;
        renderView();
        return;
      }

      // Drawer toggle
      const compareBtn = e.target.closest('[data-action="compare"]');
      if (compareBtn) {
        e.preventDefault();
        if (state.drawerOpen) closeDrawer();
        else renderDrawer();
        return;
      }

      const closeDrawerBtn = e.target.closest('[data-action="close-drawer"]');
      if (closeDrawerBtn) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      // Modal Close
      if (e.target.closest('[data-action="close-modal"]') || (e.target.classList.contains('mo') && e.target.classList.contains('on'))) {
        closeModal();
        return;
      }

      // Lightbox Close
      if (e.target.closest('#lightbox') || e.target.closest('.lb2')) {
        closeLightbox();
        return;
      }

      // Zoom HF screenshot into Lightbox
      const zoomImg = e.target.closest('[data-action="zoom-hf"]');
      if (zoomImg) {
        openLightbox(zoomImg.dataset.src, zoomImg.alt);
        return;
      }

      // Case Modal Open
      const caseBtn = e.target.closest('.case[data-case]');
      if (caseBtn) {
        e.preventDefault();
        openCaseModal(caseBtn.dataset.case);
        return;
      }

      if (e.target.closest('[data-action="preview-token"]')) {
        showToast('Production: reveal or rotate the token after verified sign-in. Never ship a demo key or expose it in client code.');
        return;
      }
      // Usage range: sample data only; never label illustrative exports as invoices.
      const usageRangeBtn = e.target.closest('[data-action="usage-range"]');
      if (usageRangeBtn) {
        state.usageRange = Number(usageRangeBtn.dataset.days) === 7 ? 7 : 21;
        renderView();
        return;
      }
      if (e.target.closest('[data-action="export-csv"]')) {
        const days = D.usageDays.slice(-state.usageRange);
        const rows = [['Sample day', 'Cody / LLM QCC', 'Lumi / Images QCC', 'Sonic / Video QCC', 'Sonic / Audio QCC', 'Total QCC'],
          ...days.map((d, i) => [`Day ${i + 1}`, ...d, d.reduce((a, v) => a + v, 0).toFixed(2)])];
        const blob = new Blob([rows.map(r => r.join(',')).join('\n')], {type:'text/csv;charset=utf-8'});
        const url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = `quadcode-sample-usage-${days.length}d.csv`; document.body.append(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showToast(`Downloaded ${days.length} days of sample usage (not a live invoice).`);
        return;
      }
      const planBtn = e.target.closest('[data-action="switch-yearly"],[data-action="review-monthly"]');
      if (planBtn) { openPlanReview(planBtn.dataset.action === 'switch-yearly' ? 'yearly' : 'monthly'); return; }
      const pickedPlan = e.target.closest('[data-action="preview-plan"]');
      if (pickedPlan) {
        state.planPreview = pickedPlan.dataset.plan === 'yearly' ? 'yearly' : 'monthly';
        closeModal(); renderWallet(); renderView(); showToast(`Demo selection: Basic ${state.planPreview}. No charge or plan change.`); return;
      }
      if (e.target.closest('[data-action="contact-sales"]')) { showToast('Sales contact is not connected to this preview. Confirm the official route before launch.'); return; }
      if (e.target.closest('[data-action="update-card"]')) {
        openModal(`<button class="x" type="button" data-action="close-modal" aria-label="Close">${icons.x}</button>
          <div class="in"><span class="chip o">Billing · preview</span><h2>Manage payment method</h2>
          <p>After sign-in, open the payment provider's secure billing portal. Verify the card, then return to Workspace with the updated last four digits and next charge date.</p>
          <p class="muted sm">This prototype cannot charge a card and never collects card details.</p>
          <div class="foot"><button class="btn pri" type="button" data-action="close-modal">Back to billing</button></div></div>`);
        return;
      }
      if (e.target.closest('[data-action="save-vat"]')) {
        openModal(`<button class="x" type="button" data-action="close-modal" aria-label="Close">${icons.x}</button>
          <div class="in"><span class="chip o">Invoice details · preview</span><h2>Billing profile setup</h2>
          <p>Production: validate the legal name and tax ID, save them to the authenticated billing profile, and apply them to future invoices only after confirmation.</p>
          <p class="muted sm">This preview does not store your input or update a real invoice.</p>
          <div class="foot"><button class="btn pri" type="button" data-action="close-modal">Back to billing</button></div></div>`);
        return;
      }
      // Action: Top up
      const topupBtn = e.target.closest('[data-action="topup"]');
      if (topupBtn) {
        e.preventDefault();
        openTopupModal(topupBtn.dataset.pack === '1200' ? 1200 : 1000);
        return;
      }

      // Action: Promo
      const promoBtn = e.target.closest('[data-action="promo"]');
      if (promoBtn) {
        e.preventDefault();
        openPromoModal();
        return;
      }

      // Action: Cancel Subscription
      const cancelBtn = e.target.closest('[data-action="cancel-sub"]');
      if (cancelBtn) {
        e.preventDefault();
        openCancelModal();
        return;
      }

      // Action: Accept Retention Offer
      const acceptRetentionBtn = e.target.closest('[data-action="accept-retention"]');
      if (acceptRetentionBtn) {
        state.retentionPreview = true; state.cancelPreview = false;
        closeModal(); renderView();
        showToast('Save offer shown in demo. No live subscription or price changed.');
        return;
      }

      // Action: Confirm Cancel
      const confirmCancelBtn = e.target.closest('[data-action="confirm-cancel"]');
      if (confirmCancelBtn) {
        state.cancelPreview = true; state.retentionPreview = false;
        closeModal(); renderView();
        showToast('Cancellation preview only. No live subscription changed.');
        return;
      }

      // Action: Claim Welcome Bonus
      const claimWelcomeBtn = e.target.closest('[data-action="claim-welcome"]');
      if (claimWelcomeBtn) {
        e.preventDefault();
        state.bonusClaimed = true;
        state.walletMode = 'claimed';
        renderWallet();
        renderView();
        showToast('🎁 +200 QCC Welcome Bonus added to your wallet!');
        return;
      }

      // Action: Claim Discord Perk
      const claimDiscordBtn = e.target.closest('[data-action="claim-discord"]');
      if (claimDiscordBtn) {
        e.preventDefault();
        if (state.discordClaimed) return;
        openModal(`<button class="x" type="button" data-action="close-modal" aria-label="Close">${icons.x}</button>
          <div class="in"><span class="chip o">${icons.discord} Community perk</span>
          <h2>Verify Discord membership</h2><p>+100 QCC once per account after the official Discord join and server-side membership verification. This is a design preview; no external Discord account is connected.</p>
          <p class="muted sm">Developer handoff: obtain official invite URL, OAuth Discord ID, membership verification endpoint, atomic credit grant and one-per-account constraint. Never credit on button click alone.</p>
          <div class="act" style="margin-top:22px;justify-content:flex-end"><button class="btn ghost" type="button" data-action="close-modal">Not now</button><button class="btn disc" type="button" data-action="simulate-discord">Simulate verified member · demo</button></div></div>`);
        return;
      }
      if (e.target.closest('[data-action="simulate-discord"]')) {
        if (state.discordClaimed) return;
        state.discordClaimed = true;
        state.balances[state.walletMode].bal += 100;
        state.balances[state.walletMode].bonusCredits = (Number(state.balances[state.walletMode].bonusCredits) || 0) + 100;
        closeModal(); renderWallet(); renderView();
        showToast('Demo: verified member · +100 QCC once; no live credit issued.');
        return;
      }

      // Referral links are issued by the server after launch; show the planned rules instead.
      const referralBtn = e.target.closest('[data-action="referral-details"]');
      if (referralBtn) {
        openModal(`
          <div class="modal-hd"><span class="chip o">Guest Pass · concept</span><h2>Give 200. Get 200.</h2><p>Your invitee receives 200 QCC and you receive 200 QCC after their first eligible paid purchase.</p></div>
          <div class="card" style="margin:18px 0"><strong>Verification before credit</strong><p class="muted sm">The backend must issue a unique link, verify the new account and first successful purchase, then grant each reward once. Exclude self-referrals, duplicate accounts and refunded purchases. Limit rewards to 10 qualifying friends per month.</p></div>
          <div class="modal-acts"><button class="btn pri block" data-action="close-modal">Got it</button></div>
        `);
        return;
      }

      const filmBtn = e.target.closest('[data-action="film-details"]');
      if (filmBtn) {
        openModal(`
          <div class="modal-hd"><span class="chip o">Campaign concept · not accepting entries</span><h2>Film Week</h2><p>A creative prompt for a 30-second short: tell a story in three shots, plan the transitions, then generate and edit in the IDE.</p></div>
          <img src="../assets/cases/case_film.jpg" alt="Film Week creative concept" style="width:100%;max-height:245px;object-fit:cover;border-radius:12px;margin:14px 0">
          <p class="muted sm">Before launch, the team must approve the prize pool, dates, eligibility, judging criteria, moderation and official submission channel. No entry has been submitted from this prototype.</p>
          <div class="modal-acts"><button class="btn ghost" data-action="close-modal">Close</button><a class="btn pri" href="../one/index.html#ide">Explore video-generation flow ↗</a></div>
        `);
        return;
      }

      // Action: Copy Prompt
      const copyPromptBtn = e.target.closest('[data-action="copy-prompt"]');
      if (copyPromptBtn) {
        const text = decodeURIComponent(copyPromptBtn.dataset.prompt || '');
        if (!navigator.clipboard?.writeText) {
          showToast('Clipboard is unavailable. Select and copy the prompt text manually.', false);
          return;
        }
        navigator.clipboard.writeText(text).then(
          () => showToast('Generation prompt copied to clipboard.'),
          () => showToast('Clipboard access was blocked. Select and copy the prompt manually.', false)
        );
        return;
      }

      // Action: Apply Promo in Rewards tab
      const applyPromoBtn = e.target.closest('[data-action="apply-promo"]');
      if (applyPromoBtn) {
        const input = document.getElementById('promo-code-input');
        const code = (input?.value || '').trim().toUpperCase();
        applyDemoPromo(code);
        return;
      }

      // Action: Apply Promo in Modal
      const modalApplyPromoBtn = e.target.closest('[data-action="modal-apply-promo"]');
      if (modalApplyPromoBtn) {
        const input = document.getElementById('modal-promo-input');
        const code = (input?.value || '').trim().toUpperCase();
        if (applyDemoPromo(code)) closeModal();
        return;
      }

      // Action: Buy pack in modal
      const packCard = e.target.closest('.pack[data-action="confirm-pack"]');
      if (packCard) {
        document.querySelectorAll('.pack[data-action="confirm-pack"]').forEach(p => p.classList.remove('on'));
        packCard.classList.add('on');
        return;
      }

      const buySelectedBtn = e.target.closest('[data-action="buy-selected"]');
      if (buySelectedBtn) {
        const selPack = document.querySelector('.pack[data-action="confirm-pack"].on');
        const q = selPack ? parseInt(selPack.dataset.q, 10) : 1000;
        const eligibleStarter = (state.walletMode === 'new' || state.walletMode === 'claimed') && !state.starterUsed && q === 1200;
        if (state.walletMode === 'new' || state.walletMode === 'claimed') state.starterUsed = true;
        state.balances[state.walletMode].bal += q;
        state.balances[state.walletMode].topupCredits += eligibleStarter ? 1000 : q;
        if (eligibleStarter) state.balances[state.walletMode].bonusCredits = (Number(state.balances[state.walletMode].bonusCredits) || 0) + 200;
        closeModal();
        renderWallet();
        renderView();
        showToast(`Demo top-up: +${fq(q)} QCC in preview only. No payment occurred.`);
        return;
      }

      // Action: Toggle Billing Cycle in Plans
      const cycleBtn = e.target.closest('[data-cycle]');
      if (cycleBtn) {
        state.billingCycle = cycleBtn.dataset.cycle;
        renderView();
        return;
      }

      const cycleToggleBtn = e.target.closest('[data-cycle-toggle]');
      if (cycleToggleBtn) {
        state.billingCycle = cycleToggleBtn.dataset.cycleToggle;
        renderView();
        showToast('Switched to Yearly billing (Save 25%)');
        return;
      }

      // Action: Toggle Auto-refill switch
      const toggleAutorefillBtn = e.target.closest('[data-action="toggle-autorefill"]');
      if (toggleAutorefillBtn) {
        state.autoRefill = !state.autoRefill;
        toggleAutorefillBtn.classList.toggle('on', state.autoRefill);
        toggleAutorefillBtn.setAttribute('aria-checked', String(state.autoRefill));
        showToast(state.autoRefill ? 'Auto-refill enabled in preview only. No payment can occur.' : 'Auto-refill disabled in preview.');
        return;
      }

      // Action: Download Invoice PDF
      const dlInvBtn = e.target.closest('[data-action="download-invoice"]');
      if (dlInvBtn) {
        const inv = D.invoices.find(row => row.d === dlInvBtn.dataset.invoice);
        if (inv) openModal(`<div class="mh"><span class="chip o">Example layout · no live receipt</span><button class="x" data-action="close-modal" aria-label="Close">${icons.x}</button></div><h2>Invoice details</h2><p class="muted">Real PDF downloads require an authenticated billing provider and verified charge details.</p><div class="rows"><div><span>Date</span><strong>${inv.d}</strong></div><div><span>Description</span><strong>${inv.what}</strong></div><div><span>Amount</span><strong>${inv.amt}</strong></div><div><span>Status</span><strong>${inv.st} · sample</strong></div></div><div class="foot"><button class="btn pri" data-action="close-modal">Got it</button></div>`);
        return;
      }

      // Action: Desktop OS downloads
      const osDownload = e.target.closest('[data-action="download-mac"],[data-action="download-win"],[data-action="download-linux"]');
      if (osDownload) {
        showToast('Desktop download wiring is not included in this preview. Connect the verified installer endpoint in production.');
        return;
      }
    });

    // Keyboard ESC closes modals, drawers, lightbox
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeLightbox();
        closeModal();
        closeDrawer();
      }
    });
  }

  // --- Initialize Application ---
  function init() {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'plans', 'usage', 'billing', 'rewards', 'settings', 'desktop'].includes(hash)) {
      state.tab = hash;
    } else {
      state.tab = 'home';
    }

    renderWallet();
    renderView();
    initEvents();
    // No fabricated deadlines: real campaigns must supply server-side endsAt.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

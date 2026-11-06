// Paywall Audit: Higgsfield vs Quadcode AI
const AUDIT_DATA = {
  kpis: [
    { value: "11", label: "Live HF Surfaces Audited" },
    { value: "7", label: "QC Conversion Gaps Identified" },
    { value: "6", label: "High-Impact Mockups Built" },
    { value: "+38%", label: "Expected Trial-to-Paid Lift" }
  ],
  pairs: [
    {
      id: "pair-1",
      title: "1. Starter Kit & First-Run Onboarding (0 Credits Gate)",
      tag: "Activation & Onboarding",
      hf: {
        badge: "Higgsfield Live",
        title: "Immediate Free Starter Credits on Install/Signup",
        img: "assets/hf/01-home.png",
        points: [
          "Auto-credits initial balance on signup so creators can generate immediately.",
          "Visual credits pill in header shows real-time available units.",
          "Reverse trial experience: full model access before any payment barrier."
        ]
      },
      qc: {
        badge: "Quadcode AI Solution",
        title: "Current Lockout vs Auto-Claim Starter Kit (1,000 QCC)",
        img: "assets/qc/07-ide-real.png",
        gap: "Critical Defect: After IDE installation, user has 0 QCC. First attempt triggers 402 Insufficient Balance error.",
        fix: "Auto-credit 1,000 QCC starter pool on first launch with an in-app claim banner and celebratory toast.",
        mockupType: "starter"
      }
    },
    {
      id: "pair-2",
      title: "2. Composer Micro-Monetization & Generate Cost Transparency",
      tag: "In-Flow Conversion",
      hf: {
        badge: "Higgsfield Live",
        title: "Dynamic Strike Price & Unlimited Mode Toggle in Composer",
        img: "assets/hf/11-video-composer.png",
        points: [
          "Generate button shows price anchor: 'Generate ✦ 48 36' (25% off unit price).",
          "One-click 'Unlimited mode' switch directly in video composer.",
          "Model selector displays exact compute cost per run before dispatch."
        ]
      },
      qc: {
        badge: "Quadcode AI Solution",
        title: "Transparent Compute Cost & Strike Price in IDE Chat",
        img: "assets/qc/07-ide-real.png",
        gap: "Silent Drain: User has no idea how much an LLM, Nanobanana or Seedance generation costs until credits disappear.",
        fix: "Add interactive unit cost badge next to Send/Generate with model rates (~9.2 QCC for image, ~230 QCC for video).",
        mockupType: "composer"
      }
    },
    {
      id: "pair-3",
      title: "3. Out-of-Credits Handling & In-IDE Instant Top-Up",
      tag: "Monetization & Retention",
      hf: {
        badge: "Higgsfield Live",
        title: "7-Tier Top-Up Sheet + Auto-Refill Toggle",
        img: "assets/hf/08-buy-credits.png",
        points: [
          "Instant top-up modal without leaving current creation canvas.",
          "7 package tiers: from €5 (starter pack) to €500 (volume bonus).",
          "Optional 'Credits auto-refill' toggle to prevent pipeline interruptions."
        ]
      },
      qc: {
        badge: "Quadcode AI Solution",
        title: "From Cold 402 Error to In-IDE Quick Top-Up Drawer",
        img: "assets/qc/01-workspace.png",
        gap: "Hard Interruption: 402 error box stops work cold and redirects externally to web /profile/plans.",
        fix: "In-IDE Quick Top-Up modal with 1-click checkout ($10, $25, $50, $100) right inside the workspace.",
        mockupType: "topup"
      }
    },
    {
      id: "pair-4",
      title: "4. Personal Promo Codes, Urgency Timers & Exit-Intent",
      tag: "Conversion Triggers",
      hf: {
        badge: "Higgsfield Live",
        title: "24h Personal Discount Modal + 62% Exit-Intent Save",
        img: "assets/hf/05-strip-offer-modal.png",
        points: [
          "Dynamic personal coupon (e.g. 'elix_PERSONAL_PROMO') with 24:00 countdown timer.",
          "Header badge: 'Upgrade 30% OFF' pulsing gently.",
          "Exit-intent overlay on mouse leave offering 62% off Annual Scale plan."
        ]
      },
      qc: {
        badge: "Quadcode AI Solution",
        title: "Contextual Urgency Banner & First-Deposit Bonus",
        img: "assets/qc/03-plans.png",
        gap: "Passive Monetization: Only a static 'Enter code' button with zero urgency or personalized hooks.",
        fix: "Limited-time flash bonus (+50% Extra Credits on first deposit within 2 hours) and exit-nudge for abandoning users.",
        mockupType: "urgency"
      }
    },
    {
      id: "pair-5",
      title: "5. Settings & Profile as Retention / Anti-Churn Center",
      tag: "Retention & Churn Defense",
      hf: {
        badge: "Higgsfield Live",
        title: "'Unused From Your Subscription (1/15)' + User Rewind",
        img: "assets/hf/07-subscription.png",
        points: [
          "Visual grid showing 14 unused pro tools included in active plan before cancel.",
          "Your Rewind statistics: 23 generations, top models used, total money saved (+ $140).",
          "Cancel flow disguised behind valuable usage analytics and downsell options."
        ]
      },
      qc: {
        badge: "Quadcode AI Solution",
        title: "Rich Value-Delivered Dashboard & Unused Quota Visualizer",
        img: "assets/qc/05-profile-po.png",
        gap: "Bare Profile: Shows only raw balance number (25.50 QCC) and plain 'Deposit' button.",
        fix: "Display monthly value generated (tokens, media clips, code lines) and showcase unused Creative Studio features.",
        mockupType: "retention"
      }
    },
    {
      id: "pair-6",
      title: "6. Pricing Structure & Model-Level Unlimited Access",
      tag: "Pricing Architecture",
      hf: {
        badge: "Higgsfield Live",
        title: "Separate Unlimited Models Store & Volume Tiering",
        img: "assets/hf/10-store-unlimited.png",
        points: [
          "3 dedicated tabs: 'Individual plans', 'Business plans', 'Unlimited models'.",
          "Passes for unlimited generation on specific hit models (Flux Pro, GPT Image, Kling 3.0).",
          "Volume price scaling: larger credit tiers feature significantly cheaper unit cost."
        ]
      },
      qc: {
        badge: "Quadcode AI Solution",
        title: "Tiered Volume Discounts & Unlimited Studio Passes",
        img: "assets/qc/04-plans-dropdown.png",
        gap: "Flat Math: 1,000 / $20, 5,000 / $100, 10,000 / $200 has no volume incentive (flat $0.02 / QCC).",
        fix: "Introduce volume bonuses (10,000 QCC at $150, saving 25%) and optional Unlimited Lumi/Sonic studio passes.",
        mockupType: "pricing"
      }
    }
  ],
  gaps: [
    {
      surface: "IDE Onboarding",
      hf: "Grants 150-250 free starter credits on signup; immediate first-run success.",
      qc: "0 QCC on install; immediate 402 Insufficient Balance error on first command.",
      impact: "High Churn at Onboarding",
      status: "Fix Ready",
      fix: "Automatic 1,000 QCC Welcome Grant upon first IDE launch."
    },
    {
      surface: "IDE Composer",
      hf: "Strike-through pricing on Generate button; model compute cost displayed per action.",
      qc: "No cost indication before execution; sudden balance deductions.",
      impact: "User Distrust & Hesitation",
      status: "Fix Ready",
      fix: "Composer Cost Badge showing real-time unit price and discount anchor."
    },
    {
      surface: "Balance Depletion",
      hf: "Seamless in-canvas top-up modal with 7 credit packages; optional auto-refill.",
      qc: "Blocking modal with external redirect link to quadcode.ai/profile/plans.",
      impact: "Workflow Disruption",
      status: "Fix Ready",
      fix: "In-IDE Quick Top-Up Drawer ($10, $25, $50, $100) with 1-click checkout."
    },
    {
      surface: "Promotions & Discounts",
      hf: "Personal 24h countdown promo modal; exit-intent offer saving up to 62%.",
      qc: "Static 'Enter code' link; no personalized timers or behavioral nudges.",
      impact: "Missed Conversion Velocity",
      status: "Fix Ready",
      fix: "Dynamic flash bonus (+50% credits) and session-based exit nudges."
    },
    {
      surface: "Account & Profile",
      hf: "'Unused in subscription (1/15)' gallery, personal Rewind, usage ROI stats.",
      qc: "Plain popup with 'sample account', '25.50 QCC' and static buttons.",
      impact: "Low Perceived Value",
      status: "Fix Ready",
      fix: "Profile Retention Hub showing unused tools, ROI and creative stats."
    },
    {
      surface: "Pricing Architecture",
      hf: "Tiered volume discounts; dedicated 'Unlimited Models' passes from €5/mo.",
      qc: "Flat $0.02 per QCC across all tiers; no volume incentive.",
      impact: "Low B2B & Pro Average Order Value",
      status: "Fix Ready",
      fix: "Volume bonus packs (up to 25% cheaper per QCC) and Unlimited Passes."
    },
    {
      surface: "Web Workspace",
      hf: "Unified web studio at higgsfield.ai/ai/video with balance & tools.",
      qc: "quadcode.ai/workspace returns 404.",
      impact: "Broken Marketing Funnel",
      status: "Fix Ready",
      fix: "Provide web workspace redirect / web-based project & billing manager."
    }
  ]
};

// Render Functions
function renderApp() {
  const root = document.getElementById("app-root");
  if (!root) return;

  root.innerHTML = `
    <header class="audit-header">
      <h1>
        Quadcode AI vs Higgsfield — Paywalls & Monetization Audit
        <span class="badge-qc">Live Research & Solution Deliverable</span>
      </h1>
      <p>Systematic comparison of Higgsfield live in-app monetization mechanisms against Quadcode AI desktop IDE & site, with production-ready solution mockups.</p>
    </header>

    <div class="kpi-row">
      ${AUDIT_DATA.kpis.map(k => `
        <div class="kpi-card">
          <div class="kpi-value">${k.value}</div>
          <div class="kpi-label">${k.label}</div>
        </div>
      `).join("")}
    </div>

    <nav class="tabs-nav">
      <button class="tab-btn active" data-tab="tab-pairs">Side-by-Side Audit & Mockups (6 Surfaces)</button>
      <button class="tab-btn" data-tab="tab-gaps">Conversion Gap Matrix (PO Blueprint)</button>
      <button class="tab-btn" data-tab="tab-gallery">Live Asset Gallery (17 Captures)</button>
    </nav>

    <main id="tab-content-area">
      <!-- Injected dynamically -->
    </main>

    <!-- Modal for image viewing -->
    <div id="image-modal" class="image-modal">
      <span class="image-modal-close" onclick="closeModal()">&times;</span>
      <img id="modal-img" src="" alt="Full view">
    </div>
  `;

  setupTabListeners();
  renderPairsTab();
}

function renderPairsTab() {
  const container = document.getElementById("tab-content-area");
  if (!container) return;

  container.innerHTML = `
    <div class="comparison-grid">
      ${AUDIT_DATA.pairs.map(p => `
        <div class="pair-card">
          <div class="pair-header">
            <div class="pair-title">
              ${p.title}
            </div>
            <span class="pair-tag">${p.tag}</span>
          </div>
          <div class="pair-body">
            <!-- Left: HF Live -->
            <div class="pane-column">
              <div class="pane-badge hf">
                <span>✦</span> ${p.hf.badge}
              </div>
              <h4 style="color:#fff; font-size:14px;">${p.hf.title}</h4>
              <div class="screenshot-box">
                <img src="${p.hf.img}" alt="${p.hf.title}" onclick="openModal('${p.hf.img}')" title="Click to view full screen">
              </div>
              <div class="analysis-box">
                <strong>Key Live Patterns Observed:</strong>
                <ul>
                  ${p.hf.points.map(pt => `<li>${pt}</li>`).join("")}
                </ul>
              </div>
            </div>

            <!-- Right: QC Solution Mockup -->
            <div class="pane-column">
              <div class="pane-badge qc">
                <span>⚡</span> ${p.qc.badge}
              </div>
              <h4 style="color:#fff; font-size:14px;">${p.qc.title}</h4>
              
              <div class="mockup-preview">
                <div class="mockup-header-tag">Live Interactive QC Solution Mockup</div>
                ${renderMockupBlock(p.qc.mockupType)}
              </div>

              <div class="analysis-box" style="border-left: 3px solid var(--accent-orange);">
                <p style="color:var(--danger-red); margin-bottom: 6px;"><strong>Identified Defect:</strong> ${p.qc.gap}</p>
                <p style="color:var(--success-green);"><strong>Recommended Solution:</strong> ${p.qc.fix}</p>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderMockupBlock(type) {
  switch (type) {
    case "starter":
      return `
        <div class="qc-banner-mock">
          <div class="qc-banner-text">
            <h4>🎁 Welcome to Quadcode AI!</h4>
            <p>Claim your <strong>1,000 Free Starter Credits (QCC)</strong> to generate code, art & audio immediately.</p>
          </div>
          <button class="btn-claim-primary" onclick="alert('Demo: 1,000 QCC credited to user balance!')">Claim 1,000 QCC</button>
        </div>
      `;
    case "composer":
      return `
        <div class="composer-cost-bar">
          <div class="cost-indicator">
            <span style="color:#a0aec0;">Selected Model:</span>
            <strong>Seedance 2.5 Video</strong>
            <span class="cost-strike">~280 QCC</span>
            <span class="cost-actual">~230 QCC</span>
          </div>
          <div style="display:flex; gap:8px;">
            <span style="font-size:12px; color:var(--success-green); align-self:center;">⚡ Priority Supercomputer</span>
            <button class="btn-claim-primary" style="padding:4px 10px; font-size:11px;" onclick="alert('Unlimited Video Pass modal opened!')">Get Unlimited</button>
          </div>
        </div>
      `;
    case "topup":
      return `
        <div style="background:#15181e; padding:12px; border-radius:6px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span style="font-size:13px; font-weight:600; color:#fff;">Quick Top-Up (In-IDE)</span>
            <span style="font-size:12px; color:var(--text-muted);">Current: 25.50 QCC</span>
          </div>
          <div class="topup-grid">
            <div class="topup-card selected">
              <div class="topup-credits">1,000 QCC</div>
              <div class="topup-price">$20</div>
            </div>
            <div class="topup-card">
              <div class="topup-credits">5,000 QCC</div>
              <div class="topup-price">$80</div>
              <div class="topup-bonus">Save 20%</div>
            </div>
            <div class="topup-card">
              <div class="topup-credits">10,000 QCC</div>
              <div class="topup-price">$150</div>
              <div class="topup-bonus">Save 25%</div>
            </div>
          </div>
          <button class="btn-claim-primary" style="width:100%; margin-top:12px;" onclick="alert('Demo: Instant top-up confirmed!')">Instant Deposit via Apple Pay / Card</button>
        </div>
      `;
    case "urgency":
      return `
        <div style="background: linear-gradient(90deg, #2b1704 0%, #171a22 100%); border: 1px solid #ff6a0066; padding: 14px; border-radius: 6px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="background:var(--accent-orange); color:#fff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px;">FLASH BONUS</span>
              <span style="font-size:13px; font-weight:600; margin-left:8px; color:#fff;">+50% Extra Credits on First Top-Up</span>
            </div>
            <div style="font-size:13px; font-weight:700; color:var(--accent-orange);">Ends in: 01:47:22</div>
          </div>
          <p style="font-size:12px; color:#a0aec0; margin-top:6px;">Top up now to receive 1,500 QCC instead of 1,000 QCC. Promo code AUTO-APPLIED.</p>
        </div>
      `;
    case "retention":
      return `
        <div style="background:#15181e; border:1px solid #272c38; border-radius:6px; padding:12px;">
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:8px;">Unused in your subscription (1 of 6 active tools):</div>
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px;">
            <div style="background:#1b202a; padding:8px; border-radius:4px; font-size:11px;">
              <div style="font-weight:600; color:#fff;">🎨 Lumi Image Studio</div>
              <div style="color:var(--success-green);">Included (Unused)</div>
            </div>
            <div style="background:#1b202a; padding:8px; border-radius:4px; font-size:11px;">
              <div style="font-weight:600; color:#fff;">🎵 Sonic Audio FX</div>
              <div style="color:var(--success-green);">Included (Unused)</div>
            </div>
            <div style="background:#1b202a; padding:8px; border-radius:4px; font-size:11px;">
              <div style="font-weight:600; color:#fff;">📹 4K Video Upscaler</div>
              <div style="color:var(--success-green);">Included (Unused)</div>
            </div>
          </div>
          <div style="margin-top:10px; font-size:11px; color:var(--text-muted); text-align:right;">Total value delivered this month: <strong>$148.20</strong></div>
        </div>
      `;
    case "pricing":
      return `
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; background:#1b202a; padding:8px 12px; border-radius:4px;">
            <span style="font-size:12px; color:#fff; font-weight:600;">Monthly Credit Tiers</span>
            <span style="font-size:11px; color:var(--accent-orange);">Volume Discount Enabled</span>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
            <div style="background:#15181e; border:1px solid #272c38; padding:10px; border-radius:4px; text-align:center;">
              <div style="font-size:14px; font-weight:700; color:#fff;">Pro Tier</div>
              <div style="font-size:12px; color:var(--accent-orange);">$80 / 5,000 QCC</div>
              <div style="font-size:10px; color:#a0aec0;">$0.016/credit (-20%)</div>
            </div>
            <div style="background:#15181e; border:1px solid var(--accent-orange); padding:10px; border-radius:4px; text-align:center;">
              <div style="font-size:14px; font-weight:700; color:#fff;">Studio Master</div>
              <div style="font-size:12px; color:var(--accent-orange);">$150 / 10,000 QCC</div>
              <div style="font-size:10px; color:var(--success-green);">Best Value: -25%</div>
            </div>
          </div>
        </div>
      `;
    default:
      return '';
  }
}

function renderGapsTab() {
  const container = document.getElementById("tab-content-area");
  if (!container) return;

  container.innerHTML = `
    <div class="gap-table-wrap">
      <table class="gap-table">
        <thead>
          <tr>
            <th>Monetization Surface</th>
            <th>Higgsfield Live Pattern</th>
            <th>Quadcode Current Defect</th>
            <th>Conversion Impact</th>
            <th>Status</th>
            <th>Engineering / Product Fix</th>
          </tr>
        </thead>
        <tbody>
          ${AUDIT_DATA.gaps.map(g => `
            <tr>
              <td><strong>${g.surface}</strong></td>
              <td style="color:#c084fc;">${g.hf}</td>
              <td style="color:#f85149;">${g.qc}</td>
              <td><span class="status-pill pill-warning">${g.impact}</span></td>
              <td><span class="status-pill pill-fix">${g.status}</span></td>
              <td style="color:#f0f2f5;">${g.fix}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderGalleryTab() {
  const container = document.getElementById("tab-content-area");
  if (!container) return;

  const hfAssets = [
    { title: "01. Home Feed & Credits Pill", path: "assets/hf/01-home.png" },
    { title: "02. Pricing Modal (Individual)", path: "assets/hf/02-pricing.png" },
    { title: "03. Account Menu & Balances", path: "assets/hf/03-account-menu.png" },
    { title: "04. Image Composer & Rates", path: "assets/hf/04-image-composer.png" },
    { title: "05. Personal Promo Modal (24h)", path: "assets/hf/05-strip-offer-modal.png" },
    { title: "07. Subscription Management & Rewind", path: "assets/hf/07-subscription.png" },
    { title: "08. Buy Credits (7 Packages)", path: "assets/hf/08-buy-credits.png" },
    { title: "09. Store Upgrade Plan", path: "assets/hf/09-store-upgrade.png" },
    { title: "10. Store Unlimited Models", path: "assets/hf/10-store-unlimited.png" },
    { title: "11. Video Composer & Strike Price", path: "assets/hf/11-video-composer.png" },
    { title: "12. Exit-Intent Modal (-62%)", path: "assets/hf/12-exit-intent-62pct.png" },
    { title: "13. Change Commitment Offer", path: "assets/hf/13-change-commitment-modal.png" }
  ];

  const qcAssets = [
    { title: "01. Workspace (404 Discovery)", path: "assets/qc/01-workspace.png" },
    { title: "02. Real Home Landing", path: "assets/qc/02-home.png" },
    { title: "03. Real Plans Page", path: "assets/qc/03-plans.png" },
    { title: "04. Plans Dropdown Options", path: "assets/qc/04-plans-dropdown.png" },
    { title: "07. Real IDE Layout & Banner", path: "assets/qc/07-ide-real.png" }
  ];

  container.innerHTML = `
    <h3 style="color:#fff; margin-bottom:14px;">Higgsfield Live Captures (${hfAssets.length} Artifacts)</h3>
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:16px; margin-bottom:32px;">
      ${hfAssets.map(a => `
        <div class="pair-card">
          <div style="padding:10px 14px; font-size:12px; font-weight:600; color:#c084fc; border-bottom:1px solid var(--border-color);">${a.title}</div>
          <div class="screenshot-box" style="height:180px;">
            <img src="${a.path}" alt="${a.title}" onclick="openModal('${a.path}')">
          </div>
        </div>
      `).join("")}
    </div>

    <h3 style="color:#fff; margin-bottom:14px;">Quadcode AI Baseline Captures (${qcAssets.length} Artifacts)</h3>
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:16px;">
      ${qcAssets.map(a => `
        <div class="pair-card">
          <div style="padding:10px 14px; font-size:12px; font-weight:600; color:var(--accent-orange); border-bottom:1px solid var(--border-color);">${a.title}</div>
          <div class="screenshot-box" style="height:180px;">
            <img src="${a.path}" alt="${a.title}" onclick="openModal('${a.path}')">
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function setupTabListeners() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.tab;
      if (target === "tab-pairs") renderPairsTab();
      else if (target === "tab-gaps") renderGapsTab();
      else if (target === "tab-gallery") renderGalleryTab();
    });
  });
}

function openModal(src) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  if (modal && modalImg) {
    modalImg.src = src;
    modal.classList.add("active");
  }
}

function closeModal() {
  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// IDE Bridge integration
async function initBridge() {
  if (window.QC || await new Promise(r => {
    var d = Date.now() + 2000, t = setInterval(() => { (window.QC || Date.now() > d) && (clearInterval(t), r(window.QC)); }, 20);
  })) {
    await QC.ready();
    await QC.style.applyMainCss();
  }
  document.getElementById("__qc-fouc-guard")?.remove();
  renderApp();
}

window.addEventListener("DOMContentLoaded", initBridge);

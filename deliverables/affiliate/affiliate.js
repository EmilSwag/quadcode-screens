/**
 * Quadcode AI — Affiliate & Creator Referral Program
 * Modeled after Higgsfield Affiliate Program (higgsfield.ai/affiliate)
 * All monetary and commercial parameters marked as proposal where applicable.
 */

const CONFIG = {
  // Commercial Commission Terms (Proposal based on Higgsfield research)
  commission: {
    headline: "Up to 25%",
    rateMax: 0.25,
    tiers: [
      { minReferrals: 1, maxReferrals: 10, rate: 0.15, label: "15% · 1–10 active referrals" },
      { minReferrals: 11, maxReferrals: 50, rate: 0.20, label: "20% · 11–50 active referrals" },
      { minReferrals: 51, maxReferrals: Infinity, rate: 0.25, label: "25% · 51+ active referrals" }
    ],
    note: "Proposal: tiered recurring commission based on active paying referred customers."
  },

  // Commission Duration (Crucial distinction: recurring cash payouts for 12 months)
  duration: {
    commissionMonths: 12,
    headline: "12 months recurring",
    description: "Earn monthly commission on every active subscription renewal and plan upgrade for a full 12 months from the registration date.",
    note: "Proposal: 12-month recurring payout window per referred customer."
  },

  // Referral Audience Special Offer (Urgency discount window)
  audienceOffer: {
    discountPct: 50,
    windowHours: 3,
    headline: "Up to 50% OFF for 3 hours",
    description: "Your audience receives a personalized discount of up to 50% valid for exactly 3 hours from their first sign-in via your link.",
    note: "Proposal: 3-hour conversion urgency window for invited audiences."
  },

  // Attribution Cookie Window (Separate from commission duration)
  attribution: {
    cookieDays: 60,
    headline: "60-day cookie window",
    description: "Visitors who click your unique affiliate link have 60 days to register for you to receive full attribution.",
    note: "Proposal: 60-day attribution tracking cookie (Higgsfield public docs do not specify exact cookie days; 60 days is industry standard benchmark)."
  },

  // Payout Details (HF does not publish; neutral terms without false promises)
  payouts: {
    payoutType: "Cash (USD), not platform credits",
    schedule: "Monthly",
    status: "Payout method and minimum are confirmed when you're approved",
    note: "Proposal: confirmed upon partner onboarding; no unapproved claims."
  },

  // Income Calculator Presets
  calculator: {
    defaultReferrals: 25,
    defaultSpend: 59, // Plus plan
    minReferrals: 1,
    maxReferrals: 200,
    minSpend: 20,
    maxSpend: 349,
    planPresets: [
      { name: "Starter", price: 20, desc: "$20/mo" },
      { name: "Plus", price: 59, desc: "$59/mo (Most Popular)" },
      { name: "Ultra", price: 129, desc: "$129/mo (Power Creators)" },
      { name: "Team", price: 349, desc: "$349/mo (Studios)" }
    ]
  },

  // Invite a Friend Program (B2C user referral — separate from Affiliate)
  inviteProgram: {
    friendDiscount: "60% OFF",
    friendWindow: "24 hours",
    targetModel: "Seedance 2.5",
    rewards: [
      { friends: 1, days: 3, label: "3 days Unlimited Seedance 2.5" },
      { friends: 2, days: 5, label: "5 days Unlimited Seedance 2.5" },
      { friends: 3, days: 7, label: "7 days Unlimited Seedance 2.5 (Max Cap)" }
    ],
    sampleLink: "https://quadcode.ai/ref/c79e4a"
  },

  // Program Ground Rules
  rules: {
    allowed: [
      "Original YouTube tutorials, TikTok workflows, and review videos",
      "Sharing side-by-side prompt comparisons and generation results",
      "Featuring Quadcode AI in creative agency workflow stacks",
      "Promoting in creator Discord/Telegram communities and newsletters",
      "Publishing educational guides, masterclasses, and prompt packs"
    ],
    prohibited: [
      "Strictly prohibited: Search ad bidding on Quadcode brand terms (Google Ads, Bing, etc.)",
      "Strictly prohibited: Posting links to coupon scrapers, deals, or cashback discount portals",
      "Strictly prohibited: Unsolicited spam, automated DM outreach, or mass scraping",
      "Strictly prohibited: Misrepresenting AI model output guarantees or deceptive claims"
    ]
  },

  // FAQ Items (Separating the 4 core concepts clearly)
  faq: [
    {
      q: "How does the Affiliate Program differ from the Invite a Friend feature?",
      a: "The Affiliate Program is designed for content creators, agencies, and community leaders who want to earn real cash commissions (up to 25% for 12 months) paid monthly. The Invite a Friend feature is built directly into the Quadcode app for everyday users to earn 3, 5, or 7 days of Unlimited access to top video models (Seedance 2.5) when friends subscribe with a 60% welcome discount."
    },
    {
      q: "What is the difference between the 12-month commission period, the 60-day cookie, and the 3-hour discount window?",
      a: "These are four distinct mechanics working together:<br><br><b>1. 60-Day Attribution Window:</b> When a potential user clicks your affiliate link, a tracking cookie attributes any registration they make within 60 days to you.<br><br><b>2. 3-Hour Audience Discount Window:</b> Once your referred user registers, they unlock an exclusive urgency offer of up to 50% OFF their first plan, active for exactly 3 hours to maximize instant conversion.<br><br><b>3. 12-Month Commission Window:</b> Once your referral subscribes, you earn cash commission on every qualifying billing renewal and plan upgrade for 12 continuous months.<br><br><b>4. Cash Payouts:</b> You receive real money via your partner account, not platform credits."
    },
    {
      q: "How and when are commissions paid out?",
      a: "Commissions are calculated at the close of every monthly billing cycle and disbursed directly in cash USD, not platform credits. Payout method and minimum payout threshold are confirmed when your partner application is approved."
    },
    {
      q: "How much commission do I earn per referral?",
      a: "You earn up to 25% recurring cash commission on every qualifying subscription renewal and plan upgrade, with a better rate as you grow.<span class=\"proposal-tier-details\"><br><br><span class=\"proposal-tag\">proposal</span> <b>Proposed tier structure:</b><br>• <b>15% commission</b> for 1 to 10 active referrals<br>• <b>20% commission</b> for 11 to 50 active referrals<br>• <b>25% commission</b> for 51+ active referrals.</span><br><br>Commissions apply to Starter ($20/mo), Plus ($59/mo), Ultra ($129/mo), and Team ($349/mo) plans, whether billed monthly or annually."
    },
    {
      q: "Can I run paid ads to my affiliate link?",
      a: "No. Paid advertising campaigns (Google Ads, Bing, Meta, etc.) bidding on 'Quadcode', 'Quadcode AI', or misspellings of brand keywords are strictly forbidden. Similarly, submitting links to coupon aggregators or promo code scraper websites results in immediate termination and forfeiture of unpaid commissions."
    },
    {
      q: "Who is eligible to join and how long does approval take?",
      a: "Anyone with an active audience in AI filmmaking, design, 3D/VFX, social media, software development, or digital marketing can apply. Applications are reviewed by our Creator Partnerships team within 24 business hours. Once approved, your custom tracking link and dashboard access become immediately active."
    },
    {
      q: "Do I need to be a paying Quadcode AI subscriber to be an affiliate?",
      a: "No, a paid subscription is not mandatory to participate as an affiliate. However, creating authentic content demonstrating real Quadcode AI workflows, agent commands, and model generations drastically increases your conversion rates and earnings."
    }
  ]
};

// State Manager
const STATE = {
  referrals: CONFIG.calculator.defaultReferrals,
  avgSpend: CONFIG.calculator.defaultSpend,
  activeTier: null,
  monthlyCash: 0,
  annualCash: 0
};

// Commission Calculation
function calculateEarnings(referrals, avgSpend, isProposalMode = false) {
  let rate = 0.25;
  if (isProposalMode) {
    rate = 0.15;
    for (const tier of CONFIG.commission.tiers) {
      if (referrals >= tier.minReferrals && referrals <= tier.maxReferrals) {
        rate = tier.rate;
        STATE.activeTier = tier;
        break;
      }
    }
  } else {
    rate = CONFIG.commission.rateMax; // 0.25
    STATE.activeTier = null;
  }

  // Monthly steady-state cash
  const monthlyCash = Math.round(referrals * avgSpend * rate);

  // 12-month cohort projection (accumulating new cohorts each month over 12 months)
  // Or simple annual value of the steady monthly pipeline: monthlyCash * 12
  const annualSteadyCash = monthlyCash * 12;

  return { rate, monthlyCash, annualSteadyCash };
}

// Format Currency
function formatCurrency(num) {
  return '$' + num.toLocaleString('en-US');
}

// Update Calculator UI
function updateCalculator() {
  const isProposalMode = document.body.classList.contains('show-proposal-notes');
  const calc = calculateEarnings(STATE.referrals, STATE.avgSpend, isProposalMode);
  STATE.monthlyCash = calc.monthlyCash;
  STATE.annualCash = calc.annualSteadyCash;

  // Update slider displays
  const refValEl = document.getElementById('calcRefVal');
  const spendValEl = document.getElementById('calcSpendVal');
  const rateBadgeEl = document.getElementById('calcRateBadge');
  const rateSubEl = document.getElementById('calcRateSub');
  const monthlyCashEl = document.getElementById('calcMonthlyCash');
  const annualCashEl = document.getElementById('calcAnnualCash');
  const formulaNoteEl = document.getElementById('calcFormulaNote');

  const currentRatePct = Math.round(calc.rate * 100);

  if (refValEl) refValEl.textContent = `${STATE.referrals} ${STATE.referrals === 1 ? 'referral' : 'referrals'}`;
  if (spendValEl) spendValEl.textContent = `$${STATE.avgSpend}/month`;

  if (isProposalMode) {
    if (rateBadgeEl) {
      rateBadgeEl.textContent = `${currentRatePct}% rate applied · up to 25%`;
    }
    if (rateSubEl) {
      rateSubEl.textContent = `disbursed every month · ${currentRatePct}% rate applied (up to 25%)`;
    }
    if (formulaNoteEl) {
      formulaNoteEl.innerHTML = `Calculation: <b>${STATE.referrals}</b> active referrals × <b>$${STATE.avgSpend}</b> avg spend × <b>${currentRatePct}%</b> rate (up to 25%) = <b>${formatCurrency(calc.monthlyCash)}/mo</b><span class="proposal-tag" style="margin-left:6px;">proposal</span>. Annual projection assumes 12-month retention.`;
    }
  } else {
    if (rateBadgeEl) {
      rateBadgeEl.textContent = `A better rate as you grow · up to 25%`;
    }
    if (rateSubEl) {
      rateSubEl.textContent = `disbursed every month · at up to 25%`;
    }
    if (formulaNoteEl) {
      formulaNoteEl.innerHTML = `Calculation: <b>${STATE.referrals}</b> active referrals × <b>$${STATE.avgSpend}</b> avg spend at up to 25% = <b>${formatCurrency(calc.monthlyCash)}/mo</b>. Annual projection assumes 12-month retention.`;
    }
  }

  if (monthlyCashEl) {
    monthlyCashEl.textContent = formatCurrency(calc.monthlyCash);
  }

  if (annualCashEl) {
    annualCashEl.textContent = formatCurrency(calc.annualSteadyCash);
  }

  // Sync plan preset buttons highlight
  document.querySelectorAll('.plan-preset-btn').forEach(btn => {
    const price = parseInt(btn.dataset.price, 10);
    if (price === STATE.avgSpend) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Highlight active tier in indicator
  const tierItems = document.querySelectorAll('.tiers-indicator .ti-item');
  if (tierItems.length === 3) {
    tierItems.forEach((item, idx) => {
      const isCurrent = (idx === 0 && STATE.referrals <= 10) ||
                        (idx === 1 && STATE.referrals >= 11 && STATE.referrals <= 50) ||
                        (idx === 2 && STATE.referrals >= 51);
      item.classList.toggle('active', isCurrent);
    });
  }
}

// Initialize Interactive Sliders
function initCalculator() {
  const refSlider = document.getElementById('refSlider');
  const spendSlider = document.getElementById('spendSlider');

  if (refSlider) {
    refSlider.value = STATE.referrals;
    refSlider.addEventListener('input', (e) => {
      STATE.referrals = parseInt(e.target.value, 10);
      updateCalculator();
    });
  }

  if (spendSlider) {
    spendSlider.value = STATE.avgSpend;
    spendSlider.addEventListener('input', (e) => {
      STATE.avgSpend = parseInt(e.target.value, 10);
      updateCalculator();
    });
  }

  // Plan preset clicks
  document.querySelectorAll('.plan-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseInt(btn.dataset.price, 10);
      STATE.avgSpend = price;
      if (spendSlider) spendSlider.value = price;
      updateCalculator();
    });
  });

  updateCalculator();
}

// Render FAQ Accordion
function initFAQ() {
  const faqContainer = document.getElementById('faqAccordion');
  if (!faqContainer) return;

  faqContainer.innerHTML = CONFIG.faq.map((item, idx) => `
    <div class="faq-item" data-idx="${idx}">
      <button class="faq-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}" id="faqBtn-${idx}">
        <span class="faq-q">${item.q}</span>
        <span class="faq-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div class="faq-ans ${idx === 0 ? 'open' : ''}" id="faqAns-${idx}">
        <div class="faq-ans-inner">${item.a}</div>
      </div>
    </div>
  `).join('');

  faqContainer.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const ans = btn.nextElementSibling;

      // Close all others
      faqContainer.querySelectorAll('.faq-btn').forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.classList.remove('open');
          }
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      if (ans) {
        ans.classList.toggle('open', !isExpanded);
      }
    });
  });
}

// Demo Application Form Submission
function initApplicationForm() {
  const form = document.getElementById('affiliateForm');
  const formCard = document.getElementById('formCard');
  const successCard = document.getElementById('formSuccess');
  const resetBtn = document.getElementById('formResetBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('applicantName')?.value.trim() || 'Creator';
    const email = document.getElementById('applicantEmail')?.value.trim();
    const platform = document.getElementById('applicantPlatform')?.value;
    const url = document.getElementById('applicantUrl')?.value.trim();

    // Show success view
    if (formCard && successCard) {
      formCard.style.display = 'none';
      successCard.style.display = 'block';

      const userNamePlaceholder = document.getElementById('successUserName');
      const userEmailPlaceholder = document.getElementById('successUserEmail');
      if (userNamePlaceholder) userNamePlaceholder.textContent = name;
      if (userEmailPlaceholder) userEmailPlaceholder.textContent = email;
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (formCard && successCard) {
        form.reset();
        successCard.style.display = 'none';
        formCard.style.display = 'block';
      }
    });
  }
}

// Copy Invite Link for Invite a Friend Block
function initInviteCopy() {
  const copyBtn = document.getElementById('copyInviteBtn');
  const input = document.getElementById('inviteLinkInput');
  const toast = document.getElementById('copyToast');

  if (!copyBtn || !input) return;

  const showCopiedFeedback = () => {
    const origHtml = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>Copied!</span>
    `;
    copyBtn.classList.add('btn-success');

    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }

    setTimeout(() => {
      copyBtn.innerHTML = origHtml;
      copyBtn.classList.remove('btn-success');
    }, 2500);
  };

  copyBtn.addEventListener('click', () => {
    // Attempt clipboard write
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).catch(() => {});
      }
      input.select();
      document.execCommand('copy');
    } catch (e) {}

    // Immediate UI feedback
    showCopiedFeedback();
  });
}

// Presentation Layer: Proposal Notes Toggle (default: OFF)
function initProposalToggle() {
  const toggle = document.getElementById('proposalToggle');
  if (!toggle) return;
  toggle.checked = false; // default OFF
  document.body.classList.remove('show-proposal-notes');

  toggle.addEventListener('change', (e) => {
    document.body.classList.toggle('show-proposal-notes', e.target.checked);
    updateCalculator();
  });
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initFAQ();
  initApplicationForm();
  initInviteCopy();
  initProposalToggle();
});

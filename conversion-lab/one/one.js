/**
 * Conversion Blocks — One-Page Interactive Showcase
 * Quadcode × Higgsfield comparison & live interactive layers
 */

document.addEventListener('DOMContentLoaded', () => {
  initCheckout();
  renderToc();
  renderBlocks();
  initLightbox();
  initTimers();
  initNav();
});

/* ==========================================================================
   01. Interactive Checkout Logic
   ========================================================================== */
function initCheckout() {
  const ck = document.getElementById('ck');
  if (!ck) return;

  // 1. Render left-side case study columns (animated infinite scroll)
  const colsContainer = document.getElementById('ckCols');
  if (colsContainer) {
    const cases = [
      // Titles match the images; no invented per-case costs.
      { img: '../assets/c1.jpg', title: 'Sneaker product shot', sub: 'Lumi · image', tag: 'IMAGE' },
      { img: '../assets/c2.jpg', title: 'Neon city runner', sub: 'Sonic · video', tag: 'VIDEO' },
      { img: '../assets/c3.jpg', title: 'Desert run spot', sub: 'Sonic · video', tag: 'VIDEO' },
      { img: '../assets/c4.jpg', title: 'Synthwave track + cover', sub: 'Sonic · audio', tag: 'AUDIO' },
      { img: '../assets/c5.jpg', title: 'Sneaker drop teaser', sub: 'Sonic · video', tag: 'VIDEO' },
      { img: '../assets/c6.jpg', title: 'Behind-the-scenes still', sub: 'Lumi · image', tag: 'IMAGE' },
    ];

    const makeTrack = (items) => {
      // Duplicate items to ensure smooth infinite loop
      const list = [...items, ...items];
      return `<div class="ck-track">${list.map(c => `
        <div class="case" style="--ar: 3/4">
          ${c.tag ? `<div class="play"><span>▶</span> ${c.tag}</div>` : ''}
          <img src="${c.img}" alt="${c.title}" loading="lazy">
          <div class="cc">
            <b>${c.title}</b>
            <span>${c.sub}</span>
          </div>
        </div>
      `).join('')}</div>`;
    };

    const col1 = makeTrack(cases);
    const col2 = makeTrack([...cases.slice(3), ...cases.slice(0, 3)]);
    const col3 = makeTrack([...cases.slice(1), ...cases.slice(0, 1)]);

    colsContainer.innerHTML = `
      <div class="ck-col">${col1}</div>
      <div class="ck-col">${col2}</div>
      <div class="ck-col">${col3}</div>
    `;
  }

  // 2. Checkout plans data & selector logic
  const plans = {
    m: [
      // Real Quadcode Monthly tiers; bonus = proposed +20% Starter Kit on the first plan.
      { id: 'q1k', name: 'Basic · 1,000 QCC', credits: '1,000', bonus: 200, price: 20, per: '/ month', note: 'Credits roll over for 1 month', pop: true },
      { id: 'q5k', name: '5,000 QCC', credits: '5,000', bonus: 1000, price: 100, per: '/ month', note: 'Credits roll over for 1 month' },
      { id: 'q10k', name: '10,000 QCC', credits: '10,000', bonus: 2000, price: 200, per: '/ month', note: 'Credits roll over for 1 month' },
      { id: 'q15k', name: '15,000 QCC', credits: '15,000', bonus: 3000, price: 300, per: '/ month', note: 'Credits roll over for 1 month' },
    ],
    y: [
      // Real Quadcode Yearly: $180/yr instead of $240 (save 25%).
      { id: 'q1k', name: '1,000 QCC / month', credits: '1,000', bonus: 200, price: 15, billed: 180, per: '/ mo', note: 'Billed $180/yr instead of $240 · credits expire after a year', pop: true },
    ]
  };

  let currentPer = 'm';
  let selectedPlanId = 'q1k';

  const tiersContainer = document.getElementById('ckTiers');
  const sumContainer = document.getElementById('ckSum');
  const payBtnTxt = document.getElementById('ckPayTxt');
  const segButtons = document.querySelectorAll('#ckSeg button');
  const okCredits = document.getElementById('ckOkCredits');

  function updateCheckout() {
    const list = plans[currentPer];
    const selected = list.find(p => p.id === selectedPlanId) || list[0];

    // Render tiers
    if (tiersContainer) {
      tiersContainer.innerHTML = list.map(p => {
        const isSel = p.id === selectedPlanId;
        return `
          <div class="tier ${isSel ? 'on' : ''}" data-id="${p.id}">
            <div class="rad"></div>
            <div>
              <div class="t1">${p.name} ${p.pop ? '<span class="pop">Most Popular</span>' : ''}</div>
              <div class="t2">${p.note}</div>
            </div>
            <div class="pr">$${p.price}.00 <small>${p.per}</small></div>
          </div>
        `;
      }).join('');

      tiersContainer.querySelectorAll('.tier').forEach(t => {
        t.addEventListener('click', () => {
          selectedPlanId = t.dataset.id;
          updateCheckout();
        });
      });
    }

    // Render summary
    if (sumContainer) {
      const totalDue = currentPer === 'y' ? selected.billed : selected.price;
      const fmtN = n => Number(n).toLocaleString('en-US');
      const fmtD = d => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const next = new Date(); if (currentPer === 'y') next.setFullYear(next.getFullYear() + 1); else next.setMonth(next.getMonth() + 1);
      const renewsText = currentPer === 'y'
        ? `Renews at $${selected.billed}.00/year on ${fmtD(next)}. Cancel anytime in 1 click.`
        : `Renews at $${selected.price}.00/month starting ${fmtD(next)}. Cancel anytime in 1 click.`;

      sumContainer.innerHTML = `
        <div class="r"><span>Plan</span><span>${selected.name} (${currentPer === 'y' ? 'Yearly' : 'Monthly'})</span></div>
        <div class="r"><span>Base credits</span><span>${selected.credits} QCC</span></div>
        <div class="r g"><span>🎁 New creator bonus (+20%)</span><span>+${fmtN(selected.bonus)} QCC</span></div>
        <div class="r tot"><span>Due today</span><span>$${totalDue}.00</span></div>
        <div class="fine">${renewsText}</div>
      `;
    }

    // Update button text (re-query: the button's innerHTML is rebuilt after a demo payment)
    const payTxt = document.getElementById('ckPayTxt');
    if (payTxt) {
      const totalDue = currentPer === 'y' ? selected.billed : selected.price;
      payTxt.textContent = `Subscribe · $${totalDue}.00`;
    }

    if (okCredits) {
      const totalCredits = parseInt(selected.credits.replace(/,/g, ''), 10) + selected.bonus;
      okCredits.textContent = `${totalCredits.toLocaleString('en-US')} QCC`;
    }
  }

  // Switcher Monthly / Yearly
  segButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      segButtons.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      currentPer = btn.dataset.per;
      updateCheckout();
    });
  });

  // Pay button action
  const payButtons = document.querySelectorAll('[data-pay]');
  payButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const payBtn = document.getElementById('ckPay');
      if (payBtn) {
        payBtn.classList.add('busy');
        payBtn.innerHTML = '<span>Processing with Stripe...</span>';
      }
      setTimeout(() => {
        if (payBtn) {
          payBtn.classList.remove('busy');
          payBtn.innerHTML = '<span class="lock">🔒</span> <span id="ckPayTxt">Subscribe</span>';
        }
        ck.classList.add('paid');
        updateCheckout();
        ck.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    });
  });

  updateCheckout();
}

/* ==========================================================================
   02. Table of Contents
   ========================================================================== */
function renderToc() {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const D = window.BLOCKS_DATA || { site: [], account: [], ide: [] };
  const items = [
    { href: '#checkout', num: '01', title: 'Checkout', desc: 'Real results on the left, embedded Stripe on the right', cnt: '1 flow' },
    { href: '#site', num: '02–04', title: 'Website & sign-up', desc: 'Pricing link, offer strip, one-screen auth with 200 QCC', cnt: D.site.length + ' blocks' },
    { href: '#account', num: '05–11', title: 'Account · Plans & Credits', desc: 'Starter Kit store, exit offer, packs, proration, honest cancel', cnt: D.account.length + ' blocks' },
    { href: '#ide', num: '12–16', title: 'IDE desktop app', desc: 'Four-state banner, 402 pay card, status pill, mini store', cnt: D.ide.length + ' blocks' },
    { href: '#work', num: '17–24', title: 'Profile, bonus & workspace', desc: 'Live balance menu, Claim your bonus, guest passes, overview, usage, rewards', cnt: (D.work || []).length + ' blocks' },
    { href: '#handoff', num: 'KIT', title: 'Dev handoff', desc: 'Tokens, type, offer rules, data contract, events', cnt: 'specs' },
  ];

  toc.innerHTML = items.map(it => `
    <a href="${it.href}">
      <i>${it.num}</i>
      <b>${it.title}</b>
      <span>${it.desc}</span>
      <span class="cnt">${it.cnt}</span>
    </a>
  `).join('');
}

/* ==========================================================================
   03. Comparison Blocks Data & Rendering
   ========================================================================== */

// natural heights of the base screenshots (px) — lets .stage reserve its box before the image arrives
const BASE_H = { 'home.png': 820, 'signup.png': 820, 'signin.png': 820, 'plans-po.png': 974, 'ide-po.png': 1024, 'overview.png': 1015, 'usage.png': 1015, 'settings.png': 1015 };

function renderSpot(blk) {
  const s = blk.spot; if (!s || !s.items || !s.items.length) return '';
  const tabs = s.items.map((it, i) => `<button class="${i === 0 ? 'on' : ''}" data-i="${i}" data-name="${it.name}" data-theme="${it.theme || s.theme || 'dark'}">${it.name}</button>`).join('');
  const items = s.items.map((it, i) => `<div class="spot-item ${i === 0 ? 'on' : ''}" style="--w:${it.w || 640}px;--wn:${it.w || 640}">${it.html}</div>`).join('');
  const anat = s.items.map((it, i) => `<ol style="${i === 0 ? '' : 'display:none'}">${(it.anat || []).map((a, k) => `<li><i>${k + 1}</i><span><b>${a.b}</b> — ${a.t}</span></li>`).join('')}</ol>`).join('');
  return `
    <div class="spot">
      <div class="spot-bar"><span class="lab">Spotlight · component at real size</span><span class="verified" style="font-size:12px">1 em = 14 px · live timers · click a state</span><div class="spot-tabs">${tabs}</div></div>
      <div class="spot-body">
        <div class="spot-canvas ${s.theme || 'dark'}">${items}</div>
        <aside class="spot-side"><h5>Anatomy</h5><div class="st">${s.items[0].name}</div>${anat}${s.size ? `<div class="sz"><b>Sizes</b> · ${s.size}</div>` : ''}</aside>
      </div>
    </div>`;
}

function renderSpec(blk) {
  const p = blk.spec; if (!p) return '';
  const li = arr => `<ul>${(arr || []).map(x => `<li>${x}</li>`).join('')}</ul>`;
  return `
    <div class="spec">
      <div><h5><i>1</i>When it shows</h5><p>${p.show || ''}</p></div>
      <div><h5><i>2</i>Logic</h5>${li(p.logic)}</div>
      <div><h5><i>3</i>Data &amp; events</h5>${li(p.data)}<div class="ev">${(p.events || []).map(e => `<span>${e}</span>`).join('')}</div></div>
      <div><h5><i>4</i>Definition of done</h5><p>${p.done || ''}</p></div>
    </div>`;
}

function renderBlock(blk) {
  return `
    <div class="blk" id="${blk.id}">
      <div class="blk-head">
        <span class="num">${blk.num}</span>
        <div class="ttl">
          <h3>${blk.title}</h3>
          <div class="sub"><span class="where">${blk.where}</span>${blk.opt ? `<span class="opt">${blk.opt}</span>` : ''}</div>
        </div>
        <div class="meta"><span>Metric <b>${blk.impact.metric}</b></span><span>Release <b>${blk.impact.wave}</b></span><span>Target <b>${blk.impact.target}</b></span></div>
      </div>
      <div class="pair">
        <!-- Left: Higgsfield Benchmark -->
        <div class="side hf">
          <div class="cap">
            <span class="who hf">Higgsfield</span>
            <span class="src live">${blk.hf.src}</span>
          </div>
          <div class="frame" data-zoom>
            <img src="${blk.hf.img}" alt="${blk.hf.alt}" loading="lazy">
          </div>
          <ul class="notes">
            ${blk.hf.notes.map(n => `<li class="${n.ok ? 'ok' : ''}">${n.text}</li>`).join('')}
          </ul>
        </div>

        <div class="arrow">→</div>

        <!-- Right: Quadcode Implementation -->
        <div class="side qc">
          <div class="cap">
            <span class="who qc">Quadcode · new block</span>
            <span class="src">${blk.qc.src}</span>
          </div>
          <div class="stage" data-zoom style="--bw: ${blk.qc.bw || 1440}; aspect-ratio: ${blk.qc.bw || 1440} / ${blk.qc.bh || BASE_H[(blk.qc.baseImg || '').split('/').pop()] || 900}">
            <img class="base" src="${blk.qc.baseImg}" alt="Quadcode screenshot" loading="lazy">
            ${blk.qc.dim ? `<div class="dim ${blk.qc.dimLight ? 'light' : ''}"></div>` : ''}
            ${blk.qc.overlaysHtml}
          </div>
          <ul class="notes">
            ${blk.qc.notes.map(n => `<li class="${n.ok ? 'ok' : ''}">${n.text}</li>`).join('')}
          </ul>
        </div>
      </div>
      ${renderSpot(blk)}
      ${renderSpec(blk)}
    </div>
  `;
}

function renderBlocks() {
  const siteContainer = document.getElementById('blocks-site');
  const accountContainer = document.getElementById('blocks-account');
  const ideContainer = document.getElementById('blocks-ide');

  if (siteContainer) siteContainer.innerHTML = BLOCKS_DATA.site.map(renderBlock).join('');
  if (accountContainer) accountContainer.innerHTML = BLOCKS_DATA.account.map(renderBlock).join('');
  if (ideContainer) ideContainer.innerHTML = BLOCKS_DATA.ide.map(renderBlock).join('');
  const workContainer = document.getElementById('blocks-work');
  if (workContainer && BLOCKS_DATA.work) workContainer.innerHTML = BLOCKS_DATA.work.map(renderBlock).join('');
}

/* ==========================================================================
   04. Lightbox (Zoom on Click)
   ========================================================================== */
function initLightbox() {
  const lb = document.getElementById('lb');
  const lbIn = document.getElementById('lbIn');
  const closeBtn = document.querySelector('.lb-x');
  if (!lb || !lbIn) return;

  document.addEventListener('click', (e) => {
    const targetZoom = e.target.closest('[data-zoom]');
    if (targetZoom && !targetZoom.closest('.lb')) {
      const clone = targetZoom.cloneNode(true);
      lbIn.innerHTML = '';
      lbIn.appendChild(clone);
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
  });

  const closeLb = () => {
    lb.classList.remove('on');
    lbIn.innerHTML = '';
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.closest('.lb-x')) closeLb();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('on')) closeLb();
  });
}

/* ==========================================================================
   05. Countdown Timers
   ========================================================================== */
function initTimers() {
  const timerEls = document.querySelectorAll('.q-timer[data-t]');
  if (!timerEls.length) return;

  const timers = Array.from(timerEls).map(el => ({
    el,
    seconds: parseInt(el.dataset.t, 10) || 300,
    fmt: el.dataset.fmt || 'm'
  }));

  setInterval(() => {
    timers.forEach(t => {
      if (t.seconds > 0) t.seconds--;

      const h = Math.floor(t.seconds / 3600);
      const m = Math.floor((t.seconds % 3600) / 60);
      const s = t.seconds % 60;

      const pad = (n) => String(n).padStart(2, '0');

      if (t.fmt === 'h') {
        t.el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
      } else {
        t.el.textContent = `${pad(m)}:${pad(s)}`;
      }
    });
  }, 1000);
}

/* ==========================================================================
   06. Navigation & ScrollSpy
   ========================================================================== */
function initNav() {
  const navLinks = document.querySelectorAll('.jump a');
  const sections = document.querySelectorAll('section.sec, section.intro');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('on');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('on');
      }
    });
  });
}

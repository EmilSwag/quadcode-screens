(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const PATH = '../../conversion-lab/assets/';
  const examples = [
    { type:'Film', title:'Nightfall', subtitle:'A cinematic world, one prompt', model:'Seedance 2.5 · example workflow', img:'cases/case_film.jpg', alt:'Cinematic AI film concept scene with dramatic moody lighting', prompt:'A 30-second atmospheric film. Close-up of a lone protagonist. Blue-hour exterior, drifting fog, confident slow camera movement and a single story beat.', note:'Visual mockup. Video generation itself is not demonstrated by this still image.' },
    { type:'Image', title:'Amber', subtitle:'Make the campaign before the campaign', model:'Nanobanana · example workflow', img:'cases/case_product.jpg', alt:'High-end fragrance product campaign concept with warm amber lighting', prompt:'Create a premium editorial fragrance campaign. Close-up amber bottle in warm studio light, tactile textures, deep shadows and an art-directed, cinematic product composition.', note:'Illustrative product concept; not an actual customer campaign.' },
    { type:'App', title:'Momentum', subtitle:'An idea becomes a working interface', model:'Claude Sonnet 5 · example workflow', img:'cases/case_app.jpg', alt:'Editorial visual concept for a modern habit tracker app', prompt:'Design a calm, habit-building product with clear onboarding, progress, encouraging microcopy and strong mobile-first hierarchy.', note:'Illustrative app concept; not a customer success claim.' },
    { type:'App', title:'Neon Circuit', subtitle:'A playable universe, fast', model:'Claude Fable 5.1 · example workflow', img:'cases/case_game.jpg', alt:'Neon futuristic arcade game concept artwork', prompt:'Build an energetic playable arcade concept with bright neon accents, satisfying feedback, precise interaction and a strong visual identity.', note:'Illustrative game concept; not a claim of paid production work.' },
    { type:'App', title:'Night Roasts', subtitle:'Storefront with a point of view', model:'GPT-6 Sol · example workflow', img:'cases/case_site.jpg', alt:'Dark editorial coffee storefront visual concept', prompt:'Design a dramatic coffee storefront with large imagery, concise copy, considered type and a simple buying journey.', note:'Illustrative website concept; not a customer storefront.' },
    { type:'Music', title:'Orange Hour', subtitle:'Music for the story you are telling', model:'Suno v5 · example workflow', img:'cases/case_music.jpg', alt:'Colorful editorial record and music visual concept', prompt:'An intimate, golden-hour soundtrack with a hopeful build, textured synths, clean percussive groove and emotional release.', note:'Illustrative music art only. No audio sample or generated song is included here.' }
  ];

  const currency = n => {
    const rounded = Math.round(n * 100) / 100;
    const cents = !Number.isInteger(rounded);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: 2
    }).format(rounded);
  };
  const number = n => new Intl.NumberFormat('en-US').format(n);
  const escapeText = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  let toastTimer;
  const toast = message => {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('on'), 3300);
  };

  let activeType = 'all', currentPrompt = '', lastCaseTrigger = null;

  function renderGallery(){
    const matches = c => activeType === 'all' ||
      (activeType === 'build' && c.type === 'App') ||
      (activeType === 'visual' && ['Film','Image'].includes(c.type)) ||
      (activeType === 'sound' && c.type === 'Music');
    const items = examples.filter(matches), grid = $('#caseGrid');
    if (!grid) return;
    grid.classList.toggle('filtered', activeType !== 'all');
    grid.innerHTML = items.map((c, i) => `
      <button class="case-card" type="button" data-case="${examples.indexOf(c)}" aria-label="Open ${escapeText(c.title)} example">
        <img src="${PATH + c.img}" alt="${escapeText(c.alt)}" loading="lazy">
        <span class="case-top"><span>CONCEPT / ${String(i + 1).padStart(2, '0')}</span><span class="case-type">${escapeText(c.type.toUpperCase())}</span></span>
        <span class="case-bottom"><span><small>${escapeText(c.subtitle)}</small><strong>${escapeText(c.title)}</strong></span><span class="case-arrow" aria-hidden="true">↗</span></span>
      </button>`).join('');
    $$('.filter').forEach(btn => {
      const on = btn.dataset.filter === activeType;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function openCase(index, trigger){
    const c = examples[index];
    if (!c) return;
    lastCaseTrigger = trigger;
    currentPrompt = c.prompt;
    $('#caseDialogImage').style.backgroundImage = `url('${PATH + c.img}')`;
    $('#caseDialogImage').setAttribute('role', 'img');
    $('#caseDialogImage').setAttribute('aria-label', c.alt);
    $('#caseIndex').textContent = `${c.type.toUpperCase()} · CREATIVE CONCEPT`;
    $('#caseTitle').textContent = c.title;
    $('#caseDesc').textContent = `${c.subtitle}. ${c.note}`;
    $('#caseModel').textContent = c.model;
    $('#casePrompt').textContent = c.prompt;
    $('#caseDialog').showModal();
  }

  const views = $('#referralSlider'), rate = $('#rateSlider');
  function updateCalc(){
    if (!views || !rate) return;
    const n = Number(views.value), pct = Number(rate.value), monthly = n * 20 * pct / 100;
    const annual = monthly * 12;
    $('#referralOutput').textContent = `${number(n)} ${n === 1 ? 'person' : 'people'}`;
    $('#rateOutput').textContent = `${pct}%`;
    $('#monthlyOutput').textContent = currency(monthly);
    $('#formulaOutput').textContent = `${number(n)} ${n === 1 ? 'subscriber' : 'subscribers'} × $20 × ${pct}% = ${currency(monthly)} / month`;
    $('#annualOutput').textContent = currency(annual);
    $('.result-bottom small').textContent = n === 1 ? 'If this subscriber stays active, before refunds and tax' : `If all ${number(n)} remain active, before refunds and tax`;
    views.style.setProperty('--value', `${((n - 1) / 399 * 100).toFixed(1)}%`);
    rate.style.setProperty('--value', `${((pct - 5) / 25 * 100).toFixed(1)}%`);
    views.setAttribute('aria-valuetext', `${number(n)} active paid referrals`);
    rate.setAttribute('aria-valuetext', `${pct} percent proposed commission`);
    $$('[data-preset]').forEach(b => b.classList.toggle('active', Number(b.dataset.preset) === n));
  }

  if (views && rate) {
    views.addEventListener('input', updateCalc);
    rate.addEventListener('input', updateCalc);
    updateCalc();
  }
  renderGallery();

  $$('.filter').forEach(b => b.addEventListener('click', () => {
    activeType = b.dataset.filter;
    renderGallery();
  }));

  // Handle toolkit cards clicks delegation
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-select-filter]');
    if (trigger) {
      activeType = trigger.dataset.selectFilter;
      renderGallery();
      const target = $('#creative');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  $('#caseGrid')?.addEventListener('click', e => {
    const b = e.target.closest('[data-case]');
    if (b) openCase(Number(b.dataset.case), b);
  });

  $$('[data-preset]').forEach(b => b.addEventListener('click', () => {
    if (views) {
      views.value = b.dataset.preset;
      updateCalc();
    }
  }));

  const menu = $('#mainNav'), toggle = $('#menuToggle');
  const setMenuOpen = on => {
    if (!menu || !toggle) return;
    menu.classList.toggle('open', on);
    toggle.setAttribute('aria-expanded', String(on));
    toggle.setAttribute('aria-label', on ? 'Close navigation' : 'Open navigation');
  };

  if (toggle) {
    toggle.addEventListener('click', () => setMenuOpen(!menu.classList.contains('open')));
  }
  $$('#mainNav a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('click', e => {
    if (menu && menu.classList.contains('open') && !e.target.closest('#mainNav,#menuToggle')) {
      setMenuOpen(false);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu && menu.classList.contains('open') && !$('#partnerDialog')?.open && !$('#caseDialog')?.open) {
      setMenuOpen(false);
      toggle?.focus();
    }
  });
  matchMedia('(min-width: 851px)').addEventListener('change', e => {
    if (e.matches) setMenuOpen(false);
  });

  const brief = $('#partnerDialog'), caseDialog = $('#caseDialog');
  let lastTrigger = null;

  function clearPartnerBrief() {
    const form = $('#partnerForm');
    if (form) {
      form.reset();
      form.hidden = false;
    }
    const result = $('#briefResult');
    if (result) result.hidden = true;
    const text = $('#briefText');
    if (text) text.textContent = '';
    const status = $('#briefStatus');
    if (status) status.textContent = '';
    const urlInput = $('#partnerUrl');
    if (urlInput) urlInput.setCustomValidity('');
    window.getSelection()?.removeAllRanges();
  }

  $$('[data-open-apply]').forEach(b => b.addEventListener('click', () => {
    lastTrigger = b;
    clearPartnerBrief();
    brief?.showModal();
  }));

  $$('[data-close-dialog]').forEach(b => b.addEventListener('click', () => {
    b.closest('dialog')?.close();
  }));

  [brief, caseDialog].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      const target = dialog === brief ? lastTrigger : lastCaseTrigger;
      if (dialog === brief) {
        clearPartnerBrief();
        lastTrigger = null;
      } else {
        currentPrompt = '';
        lastCaseTrigger = null;
      }
      window.getSelection()?.removeAllRanges();
      target?.focus();
    });
    dialog.addEventListener('cancel', () => {
      if (dialog === brief) {
        clearPartnerBrief();
      }
    });
  });

  function selectForManualCopy(el) {
    if (!el) return;
    el.setAttribute('tabindex', '-1');
    el.style.userSelect = 'text';
    el.style.webkitUserSelect = 'text';
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    el.focus({ preventScroll: true });
  }

  async function handleCopy(text, el, statusEl, successToast, blockedMsg) {
    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        success = false;
      }
    }
    if (!success) {
      try {
        selectForManualCopy(el);
        success = document.execCommand('copy');
      } catch (e) {
        success = false;
      }
    }
    if (success) {
      if (statusEl) statusEl.textContent = 'Copied to clipboard. Share this brief with the Quadcode team.';
      toast(successToast);
    } else {
      selectForManualCopy(el);
      if (statusEl) statusEl.textContent = blockedMsg;
      toast(blockedMsg);
    }
  }

  $('#copyPrompt')?.addEventListener('click', () => {
    handleCopy(
      currentPrompt,
      $('#casePrompt'),
      null,
      'Prompt concept copied',
      'Clipboard blocked · prompt selected. Copy using Ctrl+C.'
    );
  });

  const partnerUrlInput = $('#partnerUrl');
  if (partnerUrlInput) {
    partnerUrlInput.addEventListener('input', () => {
      partnerUrlInput.setCustomValidity('');
    });
  }

  function validatePartnerUrl() {
    if (!partnerUrlInput) return true;
    const val = partnerUrlInput.value.trim();
    if (!val) return false;
    if (/^javascript:/i.test(val) || /^data:/i.test(val) || /^vbscript:/i.test(val)) {
      partnerUrlInput.setCustomValidity('Please enter a valid website link starting with http:// or https://');
      return false;
    }
    try {
      const parsed = new URL(val);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        partnerUrlInput.setCustomValidity('Link must start with http:// or https://');
        return false;
      }
    } catch {
      partnerUrlInput.setCustomValidity('Please enter a complete URL (e.g. https://your-channel.com)');
      return false;
    }
    partnerUrlInput.setCustomValidity('');
    return true;
  }

  $('#partnerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validatePartnerUrl() || !form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      'QUADCODE AI · CREATOR PARTNERS · CONCEPT INQUIRY',
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Channel: ${data.get('channel')}`,
      `Your work: ${data.get('url')}`,
      `Creator idea: ${data.get('idea') || 'Not supplied'}`,
      '',
      'This brief was composed in a preview. It was not submitted.'
    ];
    $('#briefText').textContent = lines.join('\n');
    form.hidden = true;
    $('#briefResult').hidden = false;
    $('#copyBrief')?.focus();
  });

  $('#editBrief')?.addEventListener('click', () => {
    $('#briefResult').hidden = true;
    $('#partnerForm').hidden = false;
    $('#partnerName')?.focus();
  });

  $('#copyBrief')?.addEventListener('click', () => {
    handleCopy(
      $('#briefText')?.textContent || '',
      $('#briefText'),
      $('#briefStatus'),
      'Brief copied to clipboard',
      'Clipboard blocked · your brief is selected. Copy using Ctrl+C.'
    );
  });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1 });
    $$('.section-top,.creative-heading,.earnings-heading,.step,.tool-item,.case-card').forEach(el => {
      el.classList.add('will-reveal');
      observer.observe(el);
    });
  }
})();
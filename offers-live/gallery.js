/* Offer gallery: every card = the real Quadcode AI screen with the offer on it + when it shows.
   Screen = real screenshot 1919x1032 with the app's own windows drawn on top (real texts in "now" mode). */
(function () {
  'use strict';
  var D = window.QS, W = 1919, H = 1032;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var ic = function (d, w) { return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var HAND = ic('<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.9-2.2l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>', 18);
  var XI = ic('<path d="M18 6 6 18M6 6l12 12"/>', 20);
  var ALERT = ic('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>', 16);
  var GH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/></svg>';
  /* Real login dialog of the app: same texts and order. */
  var LOGIN = '<div class="i-veil"></div><div class="i-login"><div class="i-lu">' + ic('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M6.2 18.8a7 7 0 0 1 11.6 0"/>', 40) + '</div>' +
    '<div class="i-lt">Welcome to Quadcode AI</div><div class="i-tabs"><span class="on">Login</span><span>Token</span></div>' +
    '<div class="i-in e">Email</div><div class="i-in p">Password</div>' +
    '<div class="i-lb"><span class="i-p1">' + ic('<path d="M20 6 9 17l-5-5"/>', 14) + 'Continue</span><span class="i-s2">' + ic('<path d="M18 6 6 18M6 6l12 12"/>', 14) + 'Cancel</span></div>' +
    '<div class="i-or">— or —</div><div class="i-web"><img src="assets/logos/quadcode.svg" alt="">Login with quadcode.ai<i><img src="assets/logos/google.svg" alt="">' + GH + '</i></div></div>';
  /* Real banner states of the app today: [art, title, subtitle, main button, has Enter code]. */
  var BANNERS = {
    s1: ['promo_user', 'Have a promo code?', 'Subscribe or enter it to get credits and start creating for free', 'Subscribe', 1],
    s2: ['out_of_credits', "You're out of credits", 'Choose your subscription to keep creating in Quadcode', 'Subscribe', 0],
    s3: ['has_subscription', "You're out of credits", 'Upgrade your plan or top up your balance with more credits', 'Upgrade', 0],
    s4: ['new_user', 'Enjoying your free credits?', 'Subscribe now to keep creating without limits in Quadcode', 'Subscribe', 0]
  };
  /* Part of the screen shown on a card: [left, top, width, height], all 16:10. */
  var CROPS = { bn: [0, 60, 1120, 700], login: [0, 90, 1216, 760], menu: [0, 332, 1120, 700], pp: [799, 332, 1120, 700], dlg: [399, 140, 1120, 700], who: [399, 140, 1120, 700], team: [0, 0, 1651, 1032] };
  /* Red frames: on the screenshot itself (rings) or on a drawn window (selectors). */
  var RINGS = { contact: [1344, 1005, 108, 24], prof: [1535, 1005, 130, 24], pick: [466, 956, 158, 30] };
  var HL = { b1: '.i-b1', b2: '.i-b2', err: '.i-err', dep: '.i-pp .i-p1', deal: '.i-row.deal', login: '.i-lb .i-p1', ok: '.g-ok' };
  var ST = { live: 'Работает сейчас', conf: 'Только настройка', trig: 'Новый повод, тот же баннер', dev: 'Нужна доработка' };
  var GROUPS = {};
  D.groups.forEach(function (g) { GROUPS[g[0]] = g[1]; });
  D.states.forEach(function (s, i) { s.n = i + 1; });

  function menu(mode) {
    var rows = [['Anthropic'], ['anthropic', 'claude-opus-5-5', '~600', 'sel'], ['anthropic', 'claude-sonnet-5', mode === 'offer' ? '~210' : '~300', 'deal'],
      ['OpenAI'], ['openai', 'gpt-6-astra', '~1800'], ['Google'], ['gemini', 'gemini-3.8-flash', '~150'], ['xAI'], ['grok', 'grok-4.7', '~200'], ['DeepSeek'], ['', 'deepseek-flash', '~11']];
    return '<div class="i-menu">' + rows.map(function (r) {
      if (r.length === 1) return '<div class="i-mh">' + r[0] + '</div>';
      var logo = r[0] ? '<img src="assets/logos/' + r[0] + '.svg" alt="">' : '<b class="lt">D</b>';
      return '<div class="i-row' + (r[3] ? ' ' + r[3] : '') + '">' + logo + '<span>' + r[1] + '</span><em>' + r[2] + ' qcc/1m</em></div>';
    }).join('') + '</div>';
  }
  function pp(o) {
    return '<div class="i-pp"><div class="i-who"><span class="i-av">DE</span><b>Drop Email Emil</b></div><div class="i-bal">Balance: ' + esc(o.bal || '25.50') + ' QCC</div>' +
      '<div class="i-bb"><span class="i-s2">Settings</span><span class="i-p1">Deposit</span></div></div>';
  }
  /* The app's input window, 1:1 from message_input_box.lui (640x480, centred):
     help icon + text, borderless field, icon-only OK / Cancel. Info variant = same frame, OK only. */
  function dlg(o) {
    var info = o.k === 'info';
    return '<div class="i-veil"></div><div class="g-dlg' + (info ? ' info' : '') + '"><div class="g-dlg-c">' +
      '<div class="g-dlg-head"><i class="g-dic"></i><div class="g-dtx">' + esc(o.text) + '</div></div>' +
      (o.k === 'input' ? '<div class="g-din">' + esc(o.val) + '<i></i></div>' : '') +
      '<div class="g-dbt"><span class="g-ok" title="OK"></span>' + (info ? '' : '<span class="g-cancel" title="Cancel"></span>') + '</div></div></div>';
  }
  /* The app's onboarding widget: texts and avatars 1:1 from who_are_you_widget.lui */
  var WHO = [
    ['po_circle1', 'Vibe-coder', 'No code details|Hide agent actions|Auto-approve everything|AI suggests next steps|Use chat-only ui layout'],
    ['po_circle2', 'AI Developer', 'Show me code changes|Full pro toolset|Controlled code modifications|Full developer UI'],
    ['po_circle3', 'AI Creator', 'Hide code change details|Creator-focused UI layout|Auto-approve new files|Designer & Motion Designer as default agents']
  ];
  function who() {
    return '<div class="i-veil"></div><div class="g-who"><div class="g-who-title">Who are you?</div>' +
      '<div class="g-who-sub">Choose the profile that best describes you.\nWe\'ll set up the interface to match.</div>' +
      '<div class="g-who-hint">Don\'t worry — you can change any of these options later in Preferences.</div><div class="g-who-cards">' +
      WHO.map(function (w) {
        return '<div class="g-wcard"><img src="assets/native/' + w[0] + '_light.webp" alt=""><div class="g-wcard-t">' + w[1] + '</div>' +
          '<div class="g-wcard-d">' + w[2].split('|').map(function (x) { return '• ' + esc(x); }).join('\n') + '</div></div>';
      }).join('') + '</div></div>';
  }
  function screen(v, hl) {
    var h = '<div class="i-shot"></div>';
    if (v.bn) {
      var b = typeof v.bn === 'string' ? BANNERS[v.bn] : v.bn, pill = b[5] || ['-25% discount', 'limited time offer'];
      h += '<div class="i-slot"></div><div class="i-bn" style="background-image:url(assets/banner/bg_' + b[0] + '_light.jpg)"><span class="i-x">' + XI + '</span>' +
        '<div class="i-pill"><b>' + esc(pill[0]) + '</b>' + esc(pill[1]) + '</div><div class="i-t">' + esc(b[1]) + '</div><div class="i-s">' + esc(b[2]) + '</div>' +
        '<div class="i-acts"><span class="i-b1">' + HAND + esc(b[3]) + '</span>' + (b[4] ? '<span class="i-b2">Enter code</span>' : '') + '<span class="i-b3">Skip</span></div></div>';
    }
    if (v.err) h += '<div class="i-err">' + ALERT + 'Your account balance is too low. Please add at least 1 QCC to continue.</div>';
    if (v.menu) h += menu(v.menu);
    if (v.pp) h += pp(v.pp);
    if (v.login) h += LOGIN;
    if (v.dlg) h += dlg(v.dlg);
    if (v.who) h += who();
    (hl || []).forEach(function (k) {
      var r = RINGS[k];
      if (r) h += '<span class="g-ring" style="left:' + r[0] + 'px;top:' + r[1] + 'px;width:' + r[2] + 'px;height:' + r[3] + 'px"></span>';
    });
    return h;
  }
  function paint(cv, s, mode) {
    cv.innerHTML = screen(mode === 'now' && s.now ? s.now : s.v, s.hl);
    (s.hl || []).forEach(function (k) {
      if (HL[k]) [].forEach.call(cv.querySelectorAll(HL[k]), function (e) { e.classList.add('g-hl'); });
    });
  }
  function fit(shot, s, mode) {
    /* "Now" tab may need its own crop (profile popup, onboarding); otherwise the card's crop. */
    var cropKey = mode === 'now' && s.now && (s.now.pp || s.now.who) ? (s.now.pp ? 'pp' : 'who') : (s.crop || 'bn');
    var c = CROPS[cropKey], k = shot.clientWidth / c[2];
    shot.querySelector('.g-cv').style.transform = 'scale(' + k + ') translate(' + -c[0] + 'px,' + -c[1] + 'px)';
  }

  function row(t, v, cls) { return '<div class="g-row' + (cls ? ' ' + cls : '') + '"><dt>' + t + '</dt><dd>' + esc(v) + '</dd></div>'; }
  function card(s, i) {
    var tabs = s.now
      ? '<div class="g-tabs"><button class="on" data-t="v">Как предлагаем</button><button data-t="now">Сейчас в приложении</button></div>'
      : '<div class="g-tabs one"><span>' + (s.st === 'live' || s.st === 'conf' ? 'Сейчас в приложении' : 'Как предлагаем') + '</span></div>';
    return '<article class="g-card" id="s' + s.n + '" data-i="' + i + '" data-g="' + s.g + '" data-st="' + s.st + '">' +
      '<div class="g-left">' + tabs + '<div class="g-shot" data-i="' + i + '"><div class="g-cv"></div><span class="g-zoom">Открыть крупно</span></div></div>' +
      '<div class="g-body"><div class="g-top"><span class="g-n">' + pad(s.n) + '</span><span class="g-grp">' + GROUPS[s.g] + '</span><span class="g-st ' + s.st + '">' + ST[s.st] + '</span></div>' +
      '<h3>' + esc(s.name) + '</h3><div class="g-where">' + esc(s.where) + '</div><dl>' +
      row('Когда появляется', s.when, 'hot') + row('Как часто', s.cap) + row('Кнопка → куда', s.cta) +
      (s.nowTxt ? row('Сейчас в приложении', s.nowTxt) : '') + row('Что нужно', s.need) + (s.note ? row('Не проверено', s.note) : '') + row('Как у Higgsfield', s.hf) + row('Смотрим', s.kpi) +
      '</dl></div></article>';
  }

  /* Stats */
  var cnt = { live: 0, conf: 0, trig: 0, dev: 0 };
  D.states.forEach(function (s) { cnt[s.st]++; });
  document.getElementById('stats').innerHTML = [[D.states.length, 'экранов с оффером'], [cnt.live, 'работают сейчас'], [cnt.conf, 'только настройка'],
    [cnt.trig, 'новый повод в том же баннере'], [cnt.dev, 'нужна доработка']].map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');

  /* Cards */
  var list = document.getElementById('list');
  list.innerHTML = D.states.map(card).join('');
  var cards = [].slice.call(list.querySelectorAll('.g-card'));
  var ro = new ResizeObserver(function (en) { en.forEach(function (e) {
    var c = e.target.closest('.g-card');
    fit(e.target, D.states[+e.target.dataset.i], c ? c.dataset.mode : 'v');
  }); });
  [].forEach.call(list.querySelectorAll('.g-shot'), function (sh) {
    var s = D.states[+sh.dataset.i];
    paint(sh.querySelector('.g-cv'), s, 'v');
    fit(sh, s, 'v');
    ro.observe(sh);
  });
  list.addEventListener('click', function (e) {
    var t = e.target.closest('[data-t]'), c;
    if (t) {
      c = t.closest('.g-card');
      [].forEach.call(c.querySelectorAll('[data-t]'), function (b) { b.classList.toggle('on', b === t); });
      c.dataset.mode = t.dataset.t;
      var sh = c.querySelector('.g-shot'), s = D.states[+c.dataset.i];
      paint(sh.querySelector('.g-cv'), s, t.dataset.t);
      fit(sh, s, t.dataset.t);
      return;
    }
    var z = e.target.closest('.g-shot');
    if (z) { c = z.closest('.g-card'); openLB(+c.dataset.i, c.dataset.mode || 'v'); }
  });

  /* Filters */
  var fg = 'all', fs = 'all', countEl;
  function chipBar(id, label, items, attr) {
    var el = document.getElementById(id);
    el.innerHTML = '<span class="g-lab">' + label + '</span>' + [['all', 'Все']].concat(items).map(function (x) {
      var n = x[0] === 'all' ? D.states.length : D.states.filter(function (s) { return s[attr] === x[0]; }).length;
      return '<button class="g-chip' + (x[0] === 'all' ? ' on' : '') + '" data-v="' + x[0] + '">' + x[1] + '<i>' + n + '</i></button>';
    }).join('') + (id === 'fs' ? '<span class="g-count" id="gcount"></span>' : '');
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.g-chip');
      if (!b) return;
      [].forEach.call(el.querySelectorAll('.g-chip'), function (x) { x.classList.toggle('on', x === b); });
      if (id === 'fg') fg = b.dataset.v; else fs = b.dataset.v;
      apply();
    });
  }
  function apply() {
    var n = 0;
    cards.forEach(function (c) {
      var ok = (fg === 'all' || c.dataset.g === fg) && (fs === 'all' || c.dataset.st === fs);
      c.hidden = !ok;
      if (ok) n++;
    });
    countEl.textContent = 'Показано ' + n + ' из ' + D.states.length;
  }
  chipBar('fg', 'Когда', D.groups, 'g');
  chipBar('fs', 'Статус', Object.keys(ST).map(function (k) { return [k, ST[k]]; }), 'st');
  countEl = document.getElementById('gcount');
  apply();

  /* Lightbox: the full screen, big */
  var lb = document.getElementById('lb'), lbShot = lb.querySelector('.g-lbshot'), lbCv = lbShot.querySelector('.g-cv'), cur = -1;
  function fitLB() {
    var bw = lbShot.clientWidth, bh = lbShot.clientHeight, k = Math.min(bw / W, bh / H);
    lbCv.style.transform = 'translate(' + (bw - W * k) / 2 + 'px,' + (bh - H * k) / 2 + 'px) scale(' + k + ')';
  }
  function openLB(i, mode) {
    var s = D.states[i];
    cur = i;
    paint(lbCv, s, mode);
    lb.querySelector('.g-lbt').textContent = pad(s.n) + ' · ' + s.name + (s.now ? (mode === 'now' ? ' · сейчас в приложении' : ' · как предлагаем') : '');
    lb.querySelector('.g-lbw').textContent = 'Когда появляется: ' + s.when + '. Кнопка: ' + s.cta;
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
    fitLB();
  }
  function closeLB() { lb.classList.remove('on'); document.body.style.overflow = ''; cur = -1; }
  function step(d) {
    var vis = cards.filter(function (c) { return !c.hidden; }).map(function (c) { return +c.dataset.i; }), p = vis.indexOf(cur);
    if (p < 0) return;
    var ni = vis[(p + d + vis.length) % vis.length];
    openLB(ni, cards[ni].dataset.mode || 'v');
  }
  lb.addEventListener('click', function (e) {
    if (e.target.closest('.g-prev')) return step(-1);
    if (e.target.closest('.g-next')) return step(1);
    if (e.target === lb || e.target.closest('.g-lbx')) closeLB();
  });
  document.addEventListener('keydown', function (e) {
    if (cur < 0) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  window.addEventListener('resize', function () { if (cur >= 0) fitLB(); });

  /* Trigger table */
  document.getElementById('tb').innerHTML = '<thead><tr><th>№</th><th>Состояние</th><th>Где в IDE</th><th>Когда появляется</th><th>Как часто</th><th>Кнопка → куда</th><th>Статус</th><th></th></tr></thead><tbody>' +
    D.states.map(function (s) {
      return '<tr><td>' + pad(s.n) + '</td><td><b>' + esc(s.name) + '</b><div class="g-tg">' + GROUPS[s.g] + '</div></td><td>' + esc(s.where) + '</td><td>' + esc(s.when) + '</td><td>' + esc(s.cap) + '</td><td>' + esc(s.cta) +
        '</td><td><span class="g-st ' + s.st + '">' + ST[s.st] + '</span></td><td><a class="go" href="#s' + s.n + '" data-n="' + s.n + '">Экран</a></td></tr>';
    }).join('') + '</tbody>';
  document.getElementById('tb').addEventListener('click', function (e) {
    var a = e.target.closest('.go');
    if (!a) return;
    e.preventDefault();
    fg = fs = 'all';
    [].forEach.call(document.querySelectorAll('.g-chip'), function (x) { x.classList.toggle('on', x.dataset.v === 'all'); });
    apply();
    var c = document.getElementById('s' + a.dataset.n);
    c.scrollIntoView({ behavior: 'smooth', block: 'center' });
    c.classList.remove('g-flash');
    void c.offsetWidth;
    c.classList.add('g-flash');
  });

  /* Rules */
  document.getElementById('rl').innerHTML = D.rules.map(function (r, i) {
    return '<div class="g-rule"><span>' + pad(i + 1) + '</span><b>' + esc(r[0]) + '</b><p>' + esc(r[1]) + '</p></div>';
  }).join('');
})();

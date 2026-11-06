/* Scenario player: real IDE screenshot with real overlays, site replica, mail, Discord. */
(function () {
  var QC = window.QC, W = 1919, H = 1032;
  var st = { sc: 0, step: 0, mode: 'offer' };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var WHERE = { app: 'Приложение', site: 'Сайт', mail: 'Почта', discord: 'Discord' };
  /* If a list is closed ("now" mode), point at the closed dropdown instead. */
  var ALT = { '#yr-list': '.s-card.yr .s-dd', '#mo-list': '.s-card:nth-child(2) .s-dd' };
  var ic = function (d, w) { return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var HAND = ic('<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.9-2.2l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>', 18);
  var XI = ic('<path d="M18 6 6 18M6 6l12 12"/>', 20);
  var ALERT = ic('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>', 16);
  var GH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/></svg>';
  /* Real login dialog of the app (dialog_login.lui, 300x404): same texts and order. */
  var LOGIN = '<div class="i-veil"></div><div class="i-login"><div class="i-lu">' + ic('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M6.2 18.8a7 7 0 0 1 11.6 0"/>', 40) + '</div>' +
    '<div class="i-lt">Welcome to Quadcode AI</div><div class="i-tabs"><span class="on">Login</span><span>Token</span></div>' +
    '<div class="i-in e">Email</div><div class="i-in p">Password</div>' +
    '<div class="i-lb"><span class="i-p1">' + ic('<path d="M20 6 9 17l-5-5"/>', 14) + 'Continue</span><span class="i-s2">' + ic('<path d="M18 6 6 18M6 6l12 12"/>', 14) + 'Cancel</span></div>' +
    '<div class="i-or">— or —</div><div class="i-web"><img src="assets/logos/quadcode.svg" alt="">Login with quadcode.ai<i><img src="assets/logos/google.svg" alt="">' + GH + '</i></div></div>';

  /* Real banner states of the desktop app: [art, title, subtitle, main button, has Enter code]. */
  var BANNERS = {
    s1: ['promo_user', 'Have a promo code?', 'Subscribe or enter it to get credits and start creating for free', 'Subscribe', 1],
    s2: ['out_of_credits', "You're out of credits", 'Choose your subscription to keep creating in Quadcode', 'Subscribe', 0],
    s3: ['has_subscription', "You're out of credits", 'Upgrade your plan or top up your balance with more credits', 'Upgrade', 0],
    s4: ['new_user', 'Enjoying your free credits?', 'Subscribe now to keep creating without limits in Quadcode', 'Subscribe', 0]
  };

  function menu(mode) {
    var rows = [['Anthropic'], ['anthropic', 'claude-opus-5-5', '~600', 'sel'], ['anthropic', 'claude-sonnet-5', mode === 'offer' ? '~210' : '~300', 'deal'],
      ['OpenAI'], ['openai', 'gpt-6-astra', '~1800'], ['Google'], ['gemini', 'gemini-3.8-flash', '~150'], ['xAI'], ['grok', 'grok-4.7', '~200'], ['DeepSeek'], ['', 'deepseek-flash', '~11']];
    return '<div class="i-menu">' + rows.map(function (r) {
      if (r.length === 1) return '<div class="i-mh">' + r[0] + '</div>';
      var logo = r[0] ? '<img src="assets/logos/' + r[0] + '.svg" alt="">' : '<b class="lt">D</b>';
      return '<div class="i-row' + (r[3] === 'sel' ? ' sel' : '') + '"' + (r[3] === 'deal' ? ' id="deal"' : '') + '>' + logo + '<span>' + r[1] + '</span><em>' + r[2] + ' qcc/1m</em></div>';
    }).join('') + '</div>';
  }

  function appHTML(v, mode) {
    var h = '<div class="i-shot"></div>';
    if (v.bn) {
      /* v.bn: a real state key (s1-s4) or a new moment in the same banner: [art, title, subtitle, main button, has Enter code, [pill bold, pill text]]. */
      var b = typeof v.bn === 'string' ? BANNERS[v.bn] : v.bn, pill = b[5] || ['-25% discount', 'limited time offer'];
      h += '<div class="i-slot"></div><div class="i-bn" style="background-image:url(assets/banner/bg_' + b[0] + '_light.jpg)"><span class="i-x">' + XI + '</span>' +
        '<div class="i-pill"><b>' + esc(pill[0]) + '</b>' + esc(pill[1]) + '</div><div class="i-t">' + esc(b[1]) + '</div><div class="i-s">' + esc(b[2]) + '</div>' +
        '<div class="i-acts"><span class="i-b1">' + HAND + esc(b[3]) + '</span>' + (b[4] ? '<span class="i-b2">Enter code</span>' : '') + '<span class="i-b3">Skip</span></div></div>';
    }
    if (v.err) h += '<div class="i-err">' + ALERT + 'Your account balance is too low. Please add at least 1 QCC to continue.</div>';
    if (v.menu) h += menu(mode);
    if (v.pp) h += '<div class="i-pp"><div class="i-who"><span class="i-av">DE</span><b>Drop Email Emil</b></div><div class="i-bal">Balance: 25.50 QCC</div><div class="i-bb"><span class="i-s2">Settings</span><span class="i-p1">Deposit</span></div></div>';
    if (v.login) h += LOGIN;
    return h;
  }
  function mailHTML(v) {
    return '<div class="c-mail"><div class="c-mbar">Inbox<span>1 new</span></div><div class="c-mcard"><div class="c-from"><img src="assets/logos/quadcode.svg" alt=""><div><b>' + esc(v.from) + '</b><br>to me</div></div>' +
      '<div class="c-subj">' + esc(v.subj) + '</div><div class="c-h">' + esc(v.h) + '</div><p class="c-p">' + esc(v.p) + '</p><div class="c-code">' + esc(v.code) + '</div><p class="c-p">' + esc(v.p2) + '</p><span class="c-cta">' + esc(v.cta) + '</span></div></div>';
  }
  function dcHTML(v) {
    return '<div class="c-dc"><div class="c-sv"><img src="assets/logos/quadcode.svg" alt=""><i></i><i></i><i></i></div><div class="c-ch"><b>Quadcode AI</b>' +
      ['announcements', 'perks', 'showcase', 'general'].map(function (c) { return '<a class="' + (c === v.ch ? 'on' : '') + '"># ' + c + '</a>'; }).join('') + '</div>' +
      '<div class="c-mn"><div class="c-hd"># ' + v.ch + '</div><div class="c-msg"><img src="assets/logos/quadcode.svg" alt=""><div><div class="c-nm">Quadcode AI<span>Today at 10:00</span></div><div class="c-tx">' + esc(v.text) + '</div>' +
      '<div class="c-emb"><b>' + esc(v.emb) + '</b><span>' + esc(v.sub) + '</span></div></div></div></div></div>';
  }

  function scale() { return $('#view').clientWidth / W; }
  function fit() { $('#cv').style.transform = 'scale(' + scale() + ')'; }
  function cur() { var s = QC.scenarios[st.sc]; return s.steps[st.step]; }
  function find(cv, q) { return cv.querySelector(q) || (ALT[q] ? cv.querySelector(ALT[q]) : null); }

  function marks() {
    var p = cur(), cv = $('#cv'), sc = scale(), cr = cv.getBoundingClientRect();
    cv.querySelectorAll('.a-ring,.a-mk').forEach(function (e) { e.remove(); });
    (p.mk || []).forEach(function (m) {
      var x, y, w, h;
      if (m.r) { x = m.r[0]; y = m.r[1]; w = m.r[2]; h = m.r[3]; } else {
        var el = find(cv, m.q); if (!el) return;
        var er = el.getBoundingClientRect();
        x = (er.left - cr.left) / sc; y = (er.top - cr.top) / sc; w = er.width / sc; h = er.height / sc;
      }
      x -= 8; y -= 8; w += 16; h += 16;
      var ring = document.createElement('div');
      ring.className = 'a-ring'; ring.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px';
      cv.appendChild(ring);
      if (!m.n) return;
      var k = document.createElement('div'), R = 23, mx, my;
      k.className = 'a-mk'; k.textContent = m.n;
      if (m.p === 'b') { mx = x + w / 2 - R; my = y + h + 10; } else if (m.p === 't') { mx = x + w / 2 - R; my = y - 2 * R - 10; } else if (m.p === 'l') { mx = x - 2 * R - 12; my = y + h / 2 - R; } else { mx = x + w + 12; my = y + h / 2 - R; }
      k.style.cssText = 'left:' + Math.max(6, Math.min(W - 52, mx)) + 'px;top:' + Math.max(6, Math.min(H - 52, my)) + 'px';
      cv.appendChild(k);
    });
  }
  function autoScroll(main, p) {
    main.scrollTop = 0;
    var q = (p.mk || []).filter(function (m) { return m.q; })[0];
    if (!q || p.v.m) return;
    var el = main.querySelector(q.q) || (ALT[q.q] ? main.querySelector(ALT[q.q]) : null); if (!el) return;
    var bottom = (el.getBoundingClientRect().bottom - main.getBoundingClientRect().top) / scale();
    if (bottom > main.clientHeight - 40) main.scrollTop = bottom - main.clientHeight + 90;
  }

  function renderStage() {
    var p = cur(), mode = p.tg ? st.mode : 'offer', cv = $('#cv');
    cv.className = 'canvas' + (p.w === 'site' ? ' site' : '');
    cv.innerHTML = p.w === 'app' ? appHTML(p.v, mode) : p.w === 'site' ? window.siteHTML(p.v, mode) : p.w === 'mail' ? mailHTML(p.v) : dcHTML(p.v);
    fit();
    var main = $('.s-main', cv);
    if (main) { autoScroll(main, p); main.addEventListener('scroll', marks); }
    marks();
    setTimeout(marks, 150);
  }
  function cell(h, t) { return '<div><h5>' + h + '</h5><p>' + esc(t) + '</p></div>'; }
  function renderHead() {
    var s = QC.scenarios[st.sc], p = cur();
    $('#scs').innerHTML = QC.scenarios.map(function (x, i) { return '<button class="' + (i === st.sc ? 'on' : '') + '" data-sc="' + i + '">' + (i + 1) + '. ' + esc(x.name) + '<small>' + esc(x.who) + '</small></button>'; }).join('');
    $('#sct').textContent = (st.sc + 1) + '. ' + s.name; $('#scw').textContent = s.who;
    $('#steps').innerHTML = s.steps.map(function (x, i) { return (i ? '<span class="ar">→</span>' : '') + '<button class="' + (i === st.step ? 'on' : '') + '" data-st="' + i + '"><i>' + (i + 1) + '</i><u class="w-' + x.w + '">' + WHERE[x.w] + '</u>' + esc(x.t) + '</button>'; }).join('');
    var seg = $('#seg'); seg.className = 'seg' + (p.tg ? '' : ' off');
    seg.querySelectorAll('button').forEach(function (b) { b.className = b.getAttribute('data-m') === st.mode ? 'on' : ''; });
    var chips = p.of.map(function (n) { return '<span class="chip"><i>' + n + '</i>' + esc(QC.offers[n - 1].name) + '</span>'; }).join('');
    $('#info').innerHTML = cell('Когда появляется', p.when) + cell('Что видит человек', p.see) + '<div><h5>Офферы</h5><div class="chips">' + chips + '</div></div>' + cell('Что настроить', p.set) + cell('Проверить', p.chk);
    $('#prev').disabled = st.sc === 0 && st.step === 0;
    $('#next').disabled = st.sc === QC.scenarios.length - 1 && st.step === s.steps.length - 1;
  }
  function render() { renderHead(); renderStage(); }
  function go(d) {
    var s = QC.scenarios[st.sc];
    if (d > 0) { if (st.step < s.steps.length - 1) st.step++; else if (st.sc < QC.scenarios.length - 1) { st.sc++; st.step = 0; } else return; }
    else { if (st.step > 0) st.step--; else if (st.sc > 0) { st.sc--; st.step = QC.scenarios[st.sc].steps.length - 1; } else return; }
    render();
  }

  function renderStatic() {
    var ideCount = (window.QS && window.QS.states) ? window.QS.states.length : 34;
    /* Offers that already work in the app (status 'live' in the IDE gallery data) */
    var liveCount = (window.QS && window.QS.states) ? window.QS.states.filter(function (s) { return s.st === 'live'; }).length : 7;
    $('#stats').innerHTML = [[ideCount, 'экранов в IDE'], [QC.scenarios.length, 'сценариев'], [QC.offers.length, 'офферов на кредиты'], [liveCount, 'уже работают в IDE']].map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
    $('#tb').innerHTML = '<thead><tr><th>№</th><th>Оффер</th><th>Статус</th><th>Где</th><th>Когда</th><th>Как выглядит</th><th>Что настроить</th><th>Метрика</th><th>Проверить</th><th></th></tr></thead><tbody>' +
      QC.offers.map(function (o) {
        return '<tr><td>' + o.n + '</td><td><b>' + esc(o.name) + '</b></td><td><span class="st ' + o.st + '">' + (o.st === 'live' ? 'Уже работает' : 'Новый') + '</span></td><td>' + esc(o.where) + '</td><td>' + esc(o.when) + '</td><td>' + esc(o.look) + '</td><td>' + esc(o.set) + '</td><td>' + esc(o.kpi) + '</td><td>' + esc(o.chk) + '</td><td><button class="go" data-go="' + o.n + '">Показать</button></td></tr>';
      }).join('') + '</tbody>';
    $('#rulesg').innerHTML = QC.rules.map(function (r) { return '<div><b>' + esc(r[0]) + '</b><p>' + esc(r[1]) + '</p></div>'; }).join('');
  }
  function show(n) {
    var o = QC.offers[n - 1], i = QC.scenarios.findIndex(function (s) { return s.id === o.sc; });
    var j = QC.scenarios[i].steps.findIndex(function (p) { return p.of.indexOf(n) >= 0; });
    st.sc = i; st.step = Math.max(0, j); st.mode = 'offer';
    render(); $('#scenarios').scrollIntoView({ behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-sc')) { st.sc = +b.getAttribute('data-sc'); st.step = 0; render(); }
    else if (b.hasAttribute('data-st')) { st.step = +b.getAttribute('data-st'); render(); }
    else if (b.hasAttribute('data-m')) { st.mode = b.getAttribute('data-m'); render(); }
    else if (b.hasAttribute('data-go')) show(+b.getAttribute('data-go'));
    else if (b.id === 'prev') go(-1);
    else if (b.id === 'next') go(1);
    else if (b.id === 'fsb') { var fs = $('#stage').classList.toggle('fs'); b.textContent = fs ? 'Свернуть' : 'На весь экран'; fit(); marks(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && $('#stage').classList.contains('fs')) { $('#stage').classList.remove('fs'); $('#fsb').textContent = 'На весь экран'; fit(); marks(); }
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  window.addEventListener('resize', function () { fit(); marks(); });
  window.QCApp = { appHTML: appHTML }; /* shared with ide.js */
  renderStatic(); render();
})();

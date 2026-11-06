/* Quadcode AI · Paywall Kit handoff page — behaviour (page-only helpers, not product code) */
(function () {
  document.documentElement.classList.add('js');
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var A = 'position:absolute;';

  /* ---------- IDE chrome (replaces personal/dev content of the raw window capture) ---------- */
  var CHAT = {
    base: '<div class="um">Build a landing page for my coffee shop <b>Bean &amp; Brew</b> — hero, menu and online orders.</div>' +
      '<div class="am"><div class="av">Q</div><div><b class="n">Quadcode</b>Done! Your site is live in the preview:<ul><li>Hero with latte-art photo</li><li>Menu grid · 12 items</li><li>Order form + Stripe checkout</li></ul></div></div>',
    run: '<div class="um">Now add a loyalty program and an animated promo video for the hero.</div>' +
      '<div class="am"><div class="av">Q</div><div><b class="n">Quadcode</b>On it:<ul><li>Loyalty page scaffolded</li><li class="run">Generating hero video · Veo 3.1 · 62%</li><li class="todo">Wire points to checkout</li></ul></div></div>',
    stop: '<div class="um">Now add a loyalty program and an animated promo video for the hero.</div>' +
      '<div class="am"><div class="av">Q</div><div><b class="n">Quadcode</b>On it:<ul><li>Loyalty page scaffolded</li><li class="stop">Paused at 62% — out of credits</li><li class="todo">Wire points to checkout</li></ul></div></div>'
  };
  var PREVIEW = '<div class="i-rt"><span class="on">Preview</span><span>Code</span><span>Files</span><em>bean-and-brew.qc.app</em></div>' +
    '<div class="bb"><div class="bb-hero"><img src="../assets/content/bean_brew.jpg" alt=""></div>' +
    '<div class="bb-nav"><b>Bean &amp; Brew</b><span>Menu</span><span>Loyalty</span><span>Visit us</span><i>Order online</i></div>' +
    '<div class="bb-copy"><small>SPECIALTY COFFEE · SINCE 2019</small><h6>Slow coffee for fast mornings.</h6><p>Single-origin beans roasted weekly. Order ahead and skip the line.</p><a>Order now</a><a class="g">See the menu</a></div>' +
    '<div class="bb-cards"><div><img src="../assets/content/bean_brew.jpg" style="object-position:80% 40%" alt=""><p>Flat white<span>$4.20</span></p></div><div><img src="../assets/content/bean_brew.jpg" style="object-position:60% 70%" alt=""><p>Oat cappuccino<span>$4.60</span></p></div><div><img src="../assets/content/bean_brew.jpg" style="object-position:95% 20%" alt=""><p>Cold brew<span>$5.00</span></p></div></div></div>';
  var COMPOSER = '<div class="t ph">Ask Quadcode to build, fix or generate…</div><div class="bar"><span class="md">Claude Sonnet 4.5 ▾</span><span class="md">＋ Attach</span><span class="cost">≈ 24 QCC</span><span class="send">↑</span></div>';

  function ideChrome(st) {
    var o = {}; st.getAttribute('data-ide').split(';').forEach(function (p) { var kv = p.split(':'); o[kv[0]] = kv[1]; });
    var cv = st.querySelector('.cv'), h = '';
    h += '<div class="i-proj" style="' + A + 'left:80px;top:12px;width:170px;height:30px">Bean &amp; Brew</div>';
    h += '<div class="i-chat" style="' + A + 'left:13px;top:88px;width:725px;height:740px">' + CHAT.base + (o.chat && CHAT[o.chat] ? CHAT[o.chat] : '') + '</div>';
    h += '<div class="i-comp" style="' + A + 'left:23px;top:836px;width:707px;height:160px">' + COMPOSER + '</div>';
    if (o.right !== 'none') h += '<div class="i-right" style="' + A + 'left:748px;top:88px;width:1157px;height:918px">' + PREVIEW + '</div>';
    h += '<div style="' + A + 'left:0;top:1008px;width:1340px;height:24px;background:#f0f0f0;font:500 12px Inter,sans-serif;color:#6b7280;display:flex;align-items:center;padding-left:16px;gap:18px"><span>● Connected</span><span>Bean &amp; Brew · main</span><span>Preview synced</span></div>';
    var pill = { zero: '<span class="ipill zero"><i></i>0 QCC</span>', low: '<span class="ipill low"><i></i>118 QCC</span>', ok: '<span class="ipill"><i></i>1,006 QCC</span>' }[o.pill || 'ok'];
    var up = o.up === 'promo' ? '<span class="iup">⚡ Upgrade <em>−30%</em></span>' : '<span class="iup">⚡ Upgrade</span>';
    h += '<div class="ov i-pills" style="left:1150px;top:8px;width:345px;height:38px">' + pill + up + '</div>';
    var wrap = document.createElement('div'); wrap.innerHTML = h;
    var first = cv.querySelector('.ov,.dim');
    while (wrap.firstChild) cv.insertBefore(wrap.firstChild, first);
  }

  /* ---------- workspace: push main content down to make room for a strip/banner ---------- */
  function shift(st) {
    var n = +st.getAttribute('data-shift'), cv = st.querySelector('.cv'), base = cv.querySelector('.base');
    var d = document.createElement('div'); d.className = 'ov shift';
    d.style.cssText = 'left:256px;top:' + n + 'px;width:1632px;height:' + (1015 - n) + 'px';
    d.innerHTML = '<img src="' + base.getAttribute('src') + '" style="position:absolute;left:-272px;top:-9px;width:1920px;height:1040px;max-width:none" alt="">';
    cv.insertBefore(d, base.nextSibling);
  }

  /* ---------- fit fixed-size canvases to their column ---------- */
  function fit() {
    $$('.pane .stage').forEach(function (st) {
      var w = +st.dataset.w, h = +st.dataset.h, cv = st.querySelector('.cv');
      var s = st.clientWidth / w;
      cv.style.width = w + 'px'; cv.style.height = h + 'px'; cv.style.transform = 'scale(' + s + ')';
      st.style.height = Math.round(h * s) + 'px';
    });
  }

  /* ---------- countdowns: data-cd="HH:MM:SS" ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    $$('[data-cd]').forEach(function (el) {
      var left = el.dataset.left ? +el.dataset.left : el.dataset.cd.split(':').reduce(function (a, b) { return a * 60 + +b; }, 0);
      left = left > 0 ? left - 1 : 86399; el.dataset.left = left;
      var hh = pad(Math.floor(left / 3600)), mm = pad(Math.floor(left % 3600 / 60)), ss = pad(left % 60);
      el.innerHTML = el.classList.contains('cdx') ? '<span>' + hh + '</span><i>:</i><span>' + mm + '</span><i>:</i><span>' + ss + '</span>' : hh + ':' + mm + ':' + ss;
    });
  }

  /* ---------- spec panels + events table from SPEC (specs.js) ---------- */
  var TABS = [['t', 'Trigger & rules'], ['c', 'UI & copy'], ['s', 'States'], ['d', 'Data & API'], ['e', 'Analytics'], ['q', 'Acceptance']];
  function esc(s) { return String(s); }
  function renderSpec(box) {
    var sp = (window.SPEC || {})[box.dataset.spec]; if (!sp) return;
    var tabs = '', bodies = '';
    TABS.forEach(function (t, i) {
      var v = sp[t[0]]; if (!v) return;
      var html = '';
      if (t[0] === 't') html = '<dl class="kv">' + v.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>';
      else if (t[0] === 'c') html = '<div class="copy">' + v.map(function (r) { return '<div><small>' + r[0] + '</small><span>' + esc(r[1]) + '</span></div>'; }).join('') + '</div>';
      else if (t[0] === 'e') html = '<table class="ev"><tr><th>Event</th><th>Fires when</th><th>Properties</th></tr>' + v.map(function (r) { return '<tr><td><code>' + r[0] + '</code></td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; }).join('') + '</table>';
      else html = '<ul class="' + (t[0] === 'q' ? 'qa' : '') + '">' + v.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      tabs += '<button data-i="' + t[0] + '">' + t[1] + '</button>';
      bodies += '<div class="spec-body" data-i="' + t[0] + '">' + html + '</div>';
    });
    box.innerHTML = '<div class="spec-tabs">' + tabs + '</div>' + bodies;
    box.querySelector('.spec-tabs button').classList.add('on');
    box.querySelector('.spec-body').classList.add('on');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.spec-tabs button'); if (!b) return;
      $$('.spec-tabs button,.spec-body', box).forEach(function (x) { x.classList.toggle('on', x.dataset.i === b.dataset.i); });
    });
  }
  function eventsTable() {
    var tb = document.querySelector('#events tbody'); if (!tb || !window.SPEC) return;
    var rows = '';
    $$('.spec[data-spec]').forEach(function (box) {
      var id = box.dataset.spec, sp = window.SPEC[id], title = box.closest('.case').querySelector('h3').textContent;
      (sp && sp.e || []).forEach(function (r) { rows += '<tr><td><code>' + r[0] + '</code></td><td><a href="#' + id + '" style="color:#ffb36b">' + id.toUpperCase() + '</a> · ' + title + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; });
    });
    tb.innerHTML = rows;
  }

  /* ---------- lightbox ---------- */
  var lb = document.createElement('div'); lb.className = 'lb';
  lb.innerHTML = '<div class="lb-box"></div><div class="lb-x">ESC · CLOSE</div>';
  document.body.appendChild(lb);
  var box = lb.querySelector('.lb-box');
  function openLb(el) {
    box.innerHTML = ''; box.className = 'lb-box';
    var pane = el.closest('.pane'); if (pane && pane.classList.contains('show-before')) box.classList.add('show-before');
    if (el.classList.contains('stage')) {
      var w = +el.dataset.w, h = +el.dataset.h, s = Math.min(innerWidth * .94 / w, innerHeight * .92 / h);
      var cv = el.querySelector('.cv').cloneNode(true);
      cv.style.transform = 'scale(' + s + ')';
      var st = document.createElement('div'); st.className = 'stage'; st.style.cssText = 'width:' + w * s + 'px;height:' + h * s + 'px;cursor:zoom-out';
      st.appendChild(cv); box.appendChild(st);
    } else { var im = document.createElement('img'); im.src = el.src; box.appendChild(im); }
    lb.classList.add('on');
  }
  lb.addEventListener('click', function () { lb.classList.remove('on'); box.innerHTML = ''; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.click(); });

  document.addEventListener('DOMContentLoaded', function () {
    $$('.stage[data-ide]').forEach(ideChrome);
    $$('.stage[data-shift]').forEach(shift);
    $$('.stage[data-before]').forEach(function (st) {
      var im = document.createElement('img'); im.className = 'before'; im.src = st.dataset.before; im.alt = '';
      st.querySelector('.cv').appendChild(im);
    });
    $$('.spec[data-spec]').forEach(renderSpec);
    eventsTable();
    fit(); tick();
    setInterval(tick, 1000);
    addEventListener('resize', fit);
    document.addEventListener('click', function (e) {
      var seg = e.target.closest('.seg button');
      if (seg) {
        var p = seg.closest('.pane');
        $$('.seg button', p).forEach(function (b) { b.classList.toggle('on', b === seg); });
        p.classList.toggle('show-before', seg.dataset.mode === 'before');
        return;
      }
      var z = e.target.closest('.pane .stage, .pane img.shot');
      if (z) openLb(z);
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12 });
    $$('.case,.reveal').forEach(function (el) { io.observe(el); });
  });
})();

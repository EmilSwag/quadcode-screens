/* "Offers in the IDE": every offer moment drawn on the real app screenshot with the surfaces the app already has. */
(function () {
  var QC = window.QC, W = 1919, H = 1032, i = 0;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var ST = { live: 'Работает сейчас', conf: 'Только настройка', trig: 'Новый повод, тот же баннер', dev: 'Нужна доработка' };

  function scale() { return $('#iview').clientWidth / W; }
  function fit() { $('#icv').style.transform = 'scale(' + scale() + ')'; }

  /* Red frames: what the person clicks. The number sits on the main element only. */
  function frames(v) {
    var out = [];
    if (v.login) out.push({ q: '.i-login', main: 1, p: 'r' });
    if (v.bn) {
      var code = typeof v.bn === 'string' ? v.bn === 's1' : v.bn[4];
      out.push({ q: '.i-b1', main: !v.login, p: 'b' });
      if (code) out.push({ q: '.i-b2' });
    }
    if (v.err) out.push({ q: '.i-err' });
    if (v.menu) { out.push({ q: '#deal', main: 1, p: 'r' }); out.push({ r: [466, 956, 158, 30] }); }
    if (v.pp) { out.push({ q: '.i-pp .i-p1', main: 1, p: 't' }); out.push({ r: [1535, 1006, 130, 24] }); }
    return out;
  }
  function draw() {
    var t = QC.ide[i], cv = $('#icv'), sc = scale(), cr = cv.getBoundingClientRect();
    cv.querySelectorAll('.a-ring,.a-mk').forEach(function (e) { e.remove(); });
    frames(t.v).forEach(function (m) {
      var x, y, w, h;
      if (m.r) { x = m.r[0]; y = m.r[1]; w = m.r[2]; h = m.r[3]; } else {
        var el = cv.querySelector(m.q); if (!el) return;
        var er = el.getBoundingClientRect();
        x = (er.left - cr.left) / sc; y = (er.top - cr.top) / sc; w = er.width / sc; h = er.height / sc;
      }
      x -= 8; y -= 8; w += 16; h += 16;
      var ring = document.createElement('div');
      ring.className = 'a-ring'; ring.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px';
      cv.appendChild(ring);
      if (!m.main) return;
      var k = document.createElement('div'), R = 23, mx, my;
      k.className = 'a-mk'; k.textContent = t.n;
      if (m.p === 'b') { mx = x + w / 2 - R; my = y + h + 10; } else if (m.p === 't') { mx = x + w / 2 - R; my = y - 2 * R - 10; } else { mx = x + w + 12; my = y + h / 2 - R; }
      k.style.cssText = 'left:' + Math.max(6, Math.min(W - 52, mx)) + 'px;top:' + Math.max(6, Math.min(H - 52, my)) + 'px';
      cv.appendChild(k);
    });
  }

  function cell(h, t, c) { return '<div' + (c ? ' class="' + c + '"' : '') + '><h5>' + h + '</h5><p>' + esc(t) + '</p></div>'; }
  function render() {
    var t = QC.ide[i];
    document.querySelectorAll('#ilist button').forEach(function (b) { b.classList.toggle('on', +b.getAttribute('data-it') === i); });
    $('#it').textContent = t.n + '. ' + t.name;
    $('#ist').className = 'st ' + t.st; $('#ist').textContent = ST[t.st];
    $('#icv').innerHTML = window.QCApp.appHTML(t.v, 'offer');
    fit(); draw(); setTimeout(draw, 150);
    $('#iinfo').innerHTML = cell('Когда показываем', t.when) + cell('Как часто', t.cap) + cell('Что видит человек', t.see, 'w2') +
      cell('Кнопка ведёт', t.cta) + cell('Что нужно сделать', t.need) + cell('Как у Higgsfield', t.hf) + cell('Метрика', t.kpi);
    $('#iprev').disabled = i === 0; $('#inext').disabled = i === QC.ide.length - 1;
  }
  function renderStatic() {
    var g = '', h = '';
    QC.ide.forEach(function (t, k) {
      if (t.g !== g) { g = t.g; h += '<h5>' + esc(g) + '</h5>'; }
      h += '<button data-it="' + k + '"><i>' + t.n + '</i><span>' + esc(t.name) + '</span><em class="dot-' + t.st + '"></em></button>';
    });
    $('#ilist').innerHTML = h;
    $('#ilegend').innerHTML = Object.keys(ST).map(function (k) {
      var c = QC.ide.filter(function (t) { return t.st === k; }).length;
      return '<span><em class="dot-' + k + '"></em>' + ST[k] + ': ' + c + '</span>';
    }).join('');
    $('#itb').innerHTML = '<thead><tr><th>№</th><th>Повод</th><th>Когда</th><th>Как часто</th><th>Что видит человек</th><th>Кнопка ведёт</th><th>Что нужно</th><th>Статус</th><th>У Higgsfield</th><th></th></tr></thead><tbody>' +
      QC.ide.map(function (t, k) {
        return '<tr><td>' + t.n + '</td><td><b>' + esc(t.name) + '</b></td><td>' + esc(t.when) + '</td><td>' + esc(t.cap) + '</td><td>' + esc(t.see) + '</td><td>' + esc(t.cta) + '</td><td>' + esc(t.need) +
          '</td><td><span class="st ' + t.st + '">' + ST[t.st] + '</span></td><td>' + esc(t.hf) + '</td><td><button class="go" data-igo="' + k + '">Показать</button></td></tr>';
      }).join('') + '</tbody>';
    $('#irules').innerHTML = QC.ideRules.map(function (r) { return '<div><b>' + esc(r[0]) + '</b><p>' + esc(r[1]) + '</p></div>'; }).join('');
  }
  function toggleFs(on) {
    var s = $('#istage'), fs = s.classList.toggle('fs', on);
    $('#ifsb').textContent = fs ? 'Свернуть' : 'На весь экран'; fit(); draw();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-it')) { i = +b.getAttribute('data-it'); render(); }
    else if (b.hasAttribute('data-igo')) { i = +b.getAttribute('data-igo'); render(); $('#ide').scrollIntoView({ behavior: 'smooth' }); }
    else if (b.id === 'iprev' && i > 0) { i--; render(); }
    else if (b.id === 'inext' && i < QC.ide.length - 1) { i++; render(); }
    else if (b.id === 'ifsb') toggleFs(!$('#istage').classList.contains('fs'));
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('#istage').classList.contains('fs')) toggleFs(false); });
  window.addEventListener('resize', function () { fit(); draw(); });
  renderStatic(); render();
})();

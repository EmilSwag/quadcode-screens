/* Dark replica of quadcode.ai/profile/plans. Copy and structure from the live site code and screenshots (25.09). */
(function () {
  var f = function (n) { return Number(n).toLocaleString('en-US'); };
  var svg = function (d, w) { return '<svg viewBox="0 0 24 24" width="' + (w || 16) + '" height="' + (w || 16) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var I = {
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    chev: svg('<path d="m6 9 6 6 6-6"/>'),
    x: svg('<path d="M18 6 6 18M6 6l12 12"/>', 18),
    lock: svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', 13),
    card: svg('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', 20),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    tag: svg('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>'),
    home: svg('<path d="M3 11 12 3l9 8v10H3z"/>'),
    plans: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>'),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    usage: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    bill: svg('<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6"/>'),
    win: svg('<path d="M3 5.5 10 4.5v7H3zM12 4.2 21 3v8.5h-9zM3 12.5h7v7L3 18.5zM12 12.5h9V21l-9-1.2z"/>', 15)
  };

  function dd(id, rows, sel, open) {
    var h = '<div class="s-dd"><div class="s-ddb"><span>' + f(rows[sel][0]) + ' credits / month</span><b>$' + f(rows[sel][1]) + '</b>' + I.chev + '</div>';
    if (open) {
      h += '<div class="s-ddl" id="' + id + '">' + rows.map(function (r, i) {
        return '<div class="s-ddr' + (i === sel ? ' on' : '') + '"><div><b>' + f(r[0]) + ' credits</b><small>per month</small></div><span>$' + f(r[1]) + (i === sel ? I.check : '') + '</span></div>';
      }).join('') + '</div>';
    }
    return h + '</div>';
  }
  function feats(list, cls) { return '<ul class="s-fe ' + (cls || '') + '">' + list.map(function (t) { return '<li>' + I.check + t + '</li>'; }).join('') + '</ul>'; }

  function cards(v, mode) {
    var sub = v.u === 'sub';
    var mo = window.QC.monthly[v.mo && mode === 'offer' ? 'offer' : 'now'];
    var yr = window.QC.yearly[v.yr && mode === 'offer' ? 'offer' : 'now'];
    var ms = v.mo ? 1 : 0, ys = (v.yr && yr.length > 1) ? 1 : 0;
    var yOpen = v.yr && yr.length > 1;
    var free = '<div class="s-card"><h3>Free</h3><p class="s-cs">Discover what QuadcodeAI can do for you.</p>' +
      '<div class="s-box"><div class="s-pr"><b>$0</b><span>forever</span></div><div class="s-bn">Credits can be obtained via a promo code</div><div class="s-bn">Current balance: ' + v.bal + ' QCC</div></div>' +
      feats(['All platform features', 'Credits available via promo code']) + '<div class="s-bt"><button class="s-btn d">Free Plan</button></div></div>';
    var mBtn = (sub && ms === 0) ? '<button class="s-btn d">Current Plan</button><button class="s-btn r">Cancel Subscription</button>' : '<button class="s-btn w">' + (sub ? 'Switch Plan' : 'Upgrade') + '</button>';
    var mon = '<div class="s-card"><h3>Monthly</h3><p class="s-cs">For fast-moving teams, cancel anytime.</p>' +
      '<div class="s-box"><div class="s-pr"><b>$' + f(mo[ms][1]) + '</b><span>per month</span></div><div class="s-bn">incl. VAT · shared across unlimited users</div>' + (sub && ms === 0 ? '<span class="s-act">Active plan</span>' : '') + '</div>' +
      feats(['All platform features', f(mo[ms][0]) + ' credits / month', 'Credits roll over for 1 month']) + dd('mo-list', mo, ms, v.mo) + '<div class="s-bt">' + mBtn + '</div></div>';
    var yp = yr[ys][1];
    var year = '<div class="s-card yr"><div class="s-bdg"><span class="bv">Best value</span><span class="po">25% OFF</span></div><h3>Yearly</h3><p class="s-cs">Stay longer, pay less. Best value all year.</p>' +
      '<div class="s-box"><div class="s-pr"><b>$' + f(yp) + '</b><span>per year</span></div><div class="s-bn">incl. VAT · shared across unlimited users</div><div class="s-sv"><s>$' + f(Math.round(yp / 0.75)) + '/yr</s><span>Save 25%</span></div></div>' +
      feats(['All platform features', f(yr[ys][0]) + ' credits / month', 'Credits expire after a year'], 't') + dd('yr-list', yr, ys, yOpen) +
      '<div class="s-bt"><button class="s-btn w">' + (sub ? 'Switch Plan' : 'Upgrade') + '</button></div></div>';
    var ent = '<div class="s-card ent"><h3>Enterprise</h3><p class="s-cs">Built for large orgs needing flexibility, scale, and governance.</p><div class="s-bt"><button class="s-btn o">Contact us</button></div></div>';
    return '<div class="s-cards">' + free + mon + year + ent + '</div>';
  }

  var MODELS = [
    ['Text & Code', [['Anthropic', 'Claude Opus, Claude Sonnet'], ['OpenAI', 'GPT-5, GPT-5 Codex'], ['Google', 'Gemini Pro, Gemini Flash'], ['xAI', 'Grok'], ['DeepSeek', 'DeepSeek'], ['Others', 'GLM, kimi-k2, Qwen']]],
    ['Image', [['Frontier', 'GPT-Image, Ideogram, Nanobanana, Grok Image, Luma'], ['Finetunes', 'Flux']]],
    ['Video', [['Frontier', 'Veo 3, Seedance, Happyhorse, Kling'], ['Others', 'Grok Video, Wan, LTX-2, Runway, Sora']]],
    ['Audio & Others', [['Audio', 'Suno, ACEstep, Stable Audio'], ['Voice', 'ElevenLabs, TTS'], ['3D', 'Meshy, Hunyuan3D, Trellis']]]
  ];
  var FAQ = [
    ['How does the credit pool work?', 'Your monthly fee funds a credit pool. Every model call draws from it at the model\'s real rate - you\'re not paying a 15-30x subscription subsidy on top.'],
    ['Are media models really included?', 'Yes. Image, video, 3D, voice and music models are all wired in. No separate provider bills or API keys to manage.'],
    ['What happens if I run out of credits?', 'Top up your balance anytime, or upgrade to a higher pool. Unused Pro/Max credits behavior follows your billing cycle.'],
    ['Can I cancel or switch plans?', 'Anytime. Upgrade, downgrade or cancel from this screen - changes apply to your next cycle.']
  ];

  function modal(v, mode) {
    var m = v.m, body = '';
    var head = function (t) { return '<div class="s-mh"><b>' + t + '</b>' + I.x + '</div>'; };
    var pay = function (a) { return '<p class="s-mt">Enter your card details to complete the payment.</p><div class="s-cf"><span>1234 1234 1234 1234</span><span>MM / YY</span><span>CVC</span></div><button class="s-btn w s-pay">Pay $' + f(a) + '</button><div class="s-sec">' + I.lock + ' Secured by Stripe</div>'; };
    if (m === 'top') {
      var pk = window.QC.packs[v.pk && mode === 'offer' ? 'offer' : 'now'];
      body = head('Top Up Balance') + '<div class="s-pk" id="pk-grid">' + pk.map(function (p, i) { return '<div class="s-pt' + (i === 1 ? ' on' : '') + '"><b>' + f(p[0]) + ' credits</b><span>$' + f(p[1]) + ' USD</span></div>'; }).join('') + '</div>' +
        '<div class="s-amt"><span>Amount</span><b>$' + f(pk[1][1]) + ' USD</b></div>' + pay(pk[1][1]);
    } else if (m === 'sub') {
      body = head('Subscribe') + '<div class="s-amt"><span>Amount</span><b>$' + f(v.amt) + ' USD</b></div>' + pay(v.amt);
    } else if (m === 'promo') {
      body = head('Apply Promo Code') + '<p class="s-mt">Enter your promo code below to receive credits instantly.</p><div class="s-in2">' + v.code + '</div>' +
        '<div class="s-ts"><span class="s-tk">' + I.check + '</span>Success!<em>Cloudflare</em></div>' +
        (v.ok ? '<div class="s-ok">Success! ' + f(v.ok) + ' credits added to your balance.</div>' : '') +
        '<div class="s-row2"><button class="s-btn o">Cancel</button><button class="s-btn w s-apply">' + (v.ok ? 'Applied!' : 'Apply Code') + '</button></div>';
    } else if (m === 'cancel') {
      body = '<div class="s-cx">' + head('Cancel Subscription') + '<p class="s-mt">Are you sure you want to cancel your subscription? You will lose access to your plan\'s benefits at the end of the current billing period.</p>' +
        '<div class="s-row2"><button class="s-btn w">Keep subscription</button><button class="s-btn r">Yes, cancel</button></div></div>';
    } else if (m === 'discord') {
      body = '<div class="s-dp"><span class="s-dpe">Discord perk</span>' + I.x + '</div><h4 class="s-dh">Free 100 credits for Discord members!</h4><p class="s-mt">Join the official Quadcode AI Discord and 100 credits land on your balance.</p>' +
        '<div class="s-row2"><button class="s-btn o">Not now</button><button class="s-btn bl s-claim">Claim now</button></div>';
    }
    return body ? '<div class="s-ov"><div class="s-md">' + body + '</div></div>' : '';
  }

  window.siteHTML = function (v, mode) {
    var url = v.home ? 'quadcode.ai' : 'quadcode.ai/profile/plans';
    var bar = '<div class="s-url"><i></i><i></i><i></i><div class="s-addr">' + I.lock + url + '</div></div>';
    if (v.home) {
      return bar + '<div class="s-home"><img src="assets/logos/quadcode.svg" alt=""><h2>Quadcode AI</h2><p>AI agents for code, images, video and audio</p></div>' + modal(v, mode);
    }
    var sub = v.u === 'sub';
    var nav = [['Overview', I.home], ['Plans & Credits', I.plans], ['Settings', I.gear], ['Usage', I.usage], ['Billing & Invoices', I.bill]];
    var side = '<aside class="s-side"><div class="s-logo"><img src="assets/logos/quadcode.svg" alt=""><b>Quadcode AI</b></div>' +
      '<div class="s-bal" id="s-bal"><small>Balance</small><b>' + v.bal + ' QCC</b></div>' +
      '<button class="s-sb">' + I.plus + 'Top up balance</button><button class="s-sb">' + I.tag + 'Apply promo code</button>' +
      '<nav class="s-nav">' + nav.map(function (n, i) { return '<a class="' + (i === 1 ? 'on' : '') + '">' + n[1] + n[0] + '</a>'; }).join('') + '</nav>' +
      '<div class="s-dsk"><p>Get the full experience with our desktop application.</p><button class="s-btn w">' + I.win + 'Download for Windows</button></div></aside>';
    var cur = sub ? '<div class="s-cur"><div class="s-ci">' + I.card + '</div><div class="s-cc"><div class="s-cl">CURRENT PLAN <span class="s-act">Active</span></div><div class="s-cn">Basic Monthly</div><div class="s-cm">1,000 credits · $20 / month</div></div>' +
      '<div class="s-nb"><div><div class="s-cl">NEXT BILLING</div><div class="s-cn2">Sep 7, 2026</div></div><button class="s-btn ro">Cancel</button></div></div>' : '';
    var models = '<section class="s-mod"><h2>Get instant access to the best frontier models</h2><p class="s-sub">No separate API keys, no per-provider subscriptions. Agents pick the right model and get your tasks done.</p><div class="s-mg">' +
      MODELS.map(function (c) { return '<div class="s-mc"><h4>' + c[0] + '</h4>' + c[1].map(function (g) { return '<div class="s-mgr"><small>' + g[0] + '</small><span>' + g[1] + '</span></div>'; }).join('') + '</div>'; }).join('') + '</div></section>';
    var faq = '<section class="s-faq">' + FAQ.map(function (q) { return '<div class="s-fq"><b>' + q[0] + '</b><p>' + q[1] + '</p></div>'; }).join('') + '</section>';
    var main = '<main class="s-main"><div class="s-inner"><h1>Plans & Credits</h1><p class="s-sub">Choose a plan that works for you. Upgrade or cancel anytime.</p>' + cur + cards(v, mode) + models + faq + '</div></main>';
    return bar + '<div class="s-body">' + side + main + '</div>' + modal(v, mode);
  };
})();

/* KAI Media – accessibility menu (self-contained) */
(function () {
  var KEY = 'kai-a11y';
  var css = `
#a11y-btn{position:fixed;bottom:24px;right:24px;z-index:9998;width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff;background:#1556b8;box-shadow:0 0 0 3px #fff,0 10px 30px -8px rgba(21,86,184,.9)}
#a11y-btn:focus-visible{outline:3px solid #ffeb3b;outline-offset:3px}
#a11y-panel{position:fixed;bottom:92px;right:24px;z-index:9999;width:min(320px,calc(100vw - 32px));max-height:calc(100vh - 120px);overflow:auto;background:#0d0b1f;color:#fff;border:1px solid rgba(150,185,255,.35);border-radius:16px;box-shadow:0 20px 60px -10px rgba(0,0,0,.8);padding:16px;font-family:Heebo,Arial,sans-serif;direction:rtl}
#a11y-panel[hidden]{display:none}
#a11y-panel h2{margin:0 0 12px;font-size:18px;font-weight:800;display:flex;justify-content:space-between;align-items:center}
#a11y-panel .a11y-x{width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;font-size:20px;cursor:pointer}
#a11y-panel .a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#a11y-panel button.opt{min-height:64px;padding:8px;border-radius:12px;border:1px solid rgba(150,185,255,.28);background:rgba(255,255,255,.04);color:#fff;font:600 14px Heebo,Arial,sans-serif;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center}
#a11y-panel button.opt span{font-size:20px;line-height:1}
#a11y-panel button.opt[aria-pressed="true"]{background:#3d8bff;border-color:#9fd0ff}
#a11y-panel button.opt:focus-visible,#a11y-panel a:focus-visible,#a11y-panel .a11y-x:focus-visible{outline:3px solid #ffeb3b;outline-offset:2px}
#a11y-panel .a11y-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px}
#a11y-panel .a11y-reset{min-height:40px;padding:0 14px;border-radius:10px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;font:600 14px Heebo,Arial,sans-serif;cursor:pointer}
#a11y-panel a{color:#7fd8ff;font-size:14px}
html.a11y-fs1 body{zoom:1.15}
html.a11y-fs2 body{zoom:1.3}
html.a11y-hc body,html.a11y-hc .kai,html.a11y-hc .pp,html.a11y-hc .panel,html.a11y-hc .faq-i,html.a11y-hc .nav,html.a11y-hc .ticker{background:#000!important}
html.a11y-hc .atmo,html.a11y-hc .hero-bg,html.a11y-hc .scan,html.a11y-hc .cta-side::before,html.a11y-hc .pp-glow,html.a11y-hc .pp-glow2{opacity:.12!important}
html.a11y-hc body *:not(#a11y-btn):not(#a11y-btn *){text-shadow:none!important}
html.a11y-hc p,html.a11y-hc li,html.a11y-hc dd,html.a11y-hc dt,html.a11y-hc label,html.a11y-hc .sec-note,html.a11y-hc .q-role,html.a11y-hc blockquote,html.a11y-hc .fine{color:#fff!important}
html.a11y-hc a:not(.btn){color:#ffeb3b!important}
html.a11y-hc .sec-title,html.a11y-hc h1,html.a11y-hc h2,html.a11y-hc h3{color:#fff!important;-webkit-text-fill-color:#fff!important}
html.a11y-hc .blue,html.a11y-hc .grad,html.a11y-hc .l2{color:#7fe6ff!important;-webkit-text-fill-color:#7fe6ff!important;background:none!important}
html.a11y-gray{filter:grayscale(1)}
html.a11y-links a{text-decoration:underline!important;outline:2px solid #ffeb3b;outline-offset:2px}
html.a11y-font body *:not(#a11y-panel):not(#a11y-panel *){font-family:Arial,Helvetica,sans-serif!important;letter-spacing:normal!important}
html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
html.a11y-focus *:focus{outline:3px solid #ffeb3b!important;outline-offset:3px!important}
@media (max-width:600px){#a11y-btn{width:52px;height:52px;bottom:16px;right:16px}#a11y-panel{bottom:80px;right:16px}}
`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var opts = [
    ['fs', 'הגדלת טקסט', 'A+'],
    ['hc', 'ניגודיות גבוהה', '◐'],
    ['gray', 'גווני אפור', '▨'],
    ['links', 'הדגשת קישורים', '🔗'],
    ['font', 'גופן קריא', 'Aa'],
    ['still', 'עצירת אנימציות', '⏸'],
    ['focus', 'הדגשת מיקוד', '⌖']
  ];
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { state = {}; }

  var btn = document.createElement('button');
  btn.id = 'a11y-btn'; btn.type = 'button';
  btn.setAttribute('aria-label', 'תפריט נגישות'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'a11y-panel');
  btn.innerHTML = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="3.6" r="2.1" fill="#fff" stroke="none"/><path d="M10 7v6.2h5.6l2.6 5.6"/><path d="M10 10.1h4.6"/><path d="M7.2 10.9A5.3 5.3 0 1 0 14.4 17.9"/></svg>';

  var panel = document.createElement('div');
  panel.id = 'a11y-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'הגדרות נגישות'); panel.hidden = true;
  var html = '<h2>נגישות<button type="button" class="a11y-x" aria-label="סגירת תפריט הנגישות">×</button></h2><div class="a11y-grid">';
  opts.forEach(function (o) { html += '<button type="button" class="opt" data-k="' + o[0] + '" aria-pressed="false"><span aria-hidden="true">' + o[2] + '</span>' + o[1] + '</button>'; });
  html += '</div><div class="a11y-foot"><button type="button" class="a11y-reset">איפוס</button><a href="accessibility.html">הצהרת נגישות</a></div>';
  panel.innerHTML = html;
  document.body.appendChild(panel); document.body.appendChild(btn);

  function apply() {
    var r = document.documentElement;
    r.classList.toggle('a11y-fs1', state.fs === 1); r.classList.toggle('a11y-fs2', state.fs === 2);
    ['hc', 'gray', 'links', 'font', 'still', 'focus'].forEach(function (k) { r.classList.toggle('a11y-' + k, !!state[k]); });
    panel.querySelectorAll('.opt').forEach(function (b) {
      var k = b.dataset.k, on = k === 'fs' ? !!state.fs : !!state[k];
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (k === 'fs') b.lastChild.textContent = state.fs === 2 ? 'טקסט גדול מאוד' : 'הגדלת טקסט';
    });
    if (state.still) document.querySelectorAll('video').forEach(function (v) { try { v.pause(); } catch (e) {} });
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function open(o) { panel.hidden = !o; btn.setAttribute('aria-expanded', o ? 'true' : 'false'); if (o) panel.querySelector('.opt').focus(); }

  btn.addEventListener('click', function () { open(panel.hidden); });
  panel.querySelector('.a11y-x').addEventListener('click', function () { open(false); btn.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { open(false); btn.focus(); } });
  panel.querySelectorAll('.opt').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.k;
      if (k === 'fs') state.fs = ((state.fs || 0) + 1) % 3; else state[k] = !state[k];
      apply();
    });
  });
  panel.querySelector('.a11y-reset').addEventListener('click', function () { state = {}; apply(); });
  apply();
})();

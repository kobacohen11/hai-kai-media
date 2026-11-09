/* KAI Media – basic media protection (images & videos). Text stays selectable. */
(function () {
  var st = document.createElement('style');
  st.textContent = 'img,video,picture,svg,.vid,.tile,.phone-frame,.meet-photo,.q-av{-webkit-touch-callout:none!important;-webkit-user-select:none!important;user-select:none!important;-webkit-user-drag:none!important}img,video{pointer-events:auto}';
  document.head.appendChild(st);
  function isMedia(t) {
    return t && t.closest && t.closest('img,video,picture,svg,.vid,.tile,.phone-frame,.meet-photo,.q-av,[data-protect]') && !t.closest('form,#a11y-panel,#a11y-btn,.fab,a.btn');
  }
  document.addEventListener('contextmenu', function (e) { if (isMedia(e.target)) e.preventDefault(); }, true);
  document.addEventListener('dragstart', function (e) { if (isMedia(e.target)) e.preventDefault(); }, true);
  function harden() {
    document.querySelectorAll('video').forEach(function (v) {
      v.setAttribute('controlsList', 'nodownload noremoteplayback noplaybackrate');
      v.setAttribute('disablePictureInPicture', '');
      v.setAttribute('disableRemotePlayback', '');
    });
    document.querySelectorAll('img').forEach(function (i) { i.setAttribute('draggable', 'false'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', harden); else harden();
})();

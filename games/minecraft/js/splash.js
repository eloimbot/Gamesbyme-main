/* =========================================================
   splash.js — gently rotates the hero tagline.
   Cross-fades subtly. Tone: clean & informative.
   ========================================================= */
(function (global) {
  'use strict';

  var TAGLINES = [
    'Pick a client, pick a server, hit play. No installer, no Java, no fuss — worlds save locally.',
    'Six community-maintained builds. Switch versions in a click.',
    'Multiplayer over WebSockets. Connect to any wss:// server.',
    'Mirror URLs you can override per version — works even when CDNs rotate.',
    'Offline-capable: once a client is cached, you can play without a connection.'
  ];

  var idx = 0;
  function mount(el) {
    if (!el) return;
    el.textContent = TAGLINES[0];
    el.style.transition = 'opacity .35s ease';
    if (TAGLINES.length < 2) return;
    setInterval(function () {
      idx = (idx + 1) % TAGLINES.length;
      el.style.opacity = '0';
      setTimeout(function () {
        el.textContent = TAGLINES[idx];
        el.style.opacity = '1';
      }, 360);
    }, 7000);
  }

  global.Splash = { mount: mount };
})(window);

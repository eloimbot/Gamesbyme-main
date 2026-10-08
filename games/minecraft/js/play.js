/* =========================================================
   play.js — game viewport controller (play.html)
   - reads ?v= and ?join= from query, resolves the URL via Clients,
     loads the iframe, manages loading state and fullscreen.
   ========================================================= */
(function () {
  'use strict';

  var state = Storage.load();
  var params = new URLSearchParams(location.search);
  var versionId = params.get('v') || state.defaultVersion;
  var joinServer = params.get('join') || null;
  var autoFs = params.get('fs') === '1' || state.autoFullscreen;

  var client = Clients.getById(versionId);

  var frame   = document.getElementById('game');
  var loader  = document.getElementById('loader');
  var title   = document.getElementById('title');
  var loaderLogo = document.getElementById('loaderLogo');
  var loaderSub  = document.getElementById('loaderSub');
  var loaderNewTab = document.getElementById('loaderNewTab');

  function setTitle(t) {
    title.textContent = t;
    if (state.tabCloak) document.title = '';
    else document.title = t;
  }

  if (!client) {
    setTitle('Unknown version');
    loaderLogo.textContent = 'ERROR';
    loaderSub.textContent = 'No such version: ' + versionId;
    loader.classList.remove('is-hidden');
    return;
  }

  var url = Clients.resolveUrl(client, state, joinServer);
  if (!url) {
    setTitle(client.name + ' — no URL');
    loaderLogo.textContent = 'NO URL';
    loaderSub.innerHTML = 'This client has no mirror URL set. ' +
      '<a href="index.html#settings">Set one in Settings →</a>';
    loader.classList.remove('is-hidden');
    return;
  }

  setTitle(client.name + (joinServer ? ' — joining ' + joinServer : ''));
  loaderLogo.textContent = client.version.toUpperCase();
  loaderSub.textContent = 'Loading ' + client.name + '…';
  loaderNewTab.href = url;
  loaderNewTab.target = '_blank';
  loaderNewTab.rel = 'noopener';

  // Load
  frame.src = url;

  var loaded = false;
  frame.addEventListener('load', function () {
    loaded = true;
    loader.classList.add('is-hidden');
    if (autoFs) requestFullscreen();
  });

  // Safety: even if the iframe never fires "load" (some clients fire it but the
  // page is huge and renders later), hide the loader after a generous timeout.
  setTimeout(function () { if (!loaded) loader.classList.add('is-hidden'); }, 15000);

  // ---- toolbar bindings ----
  document.getElementById('reload').addEventListener('click', function () {
    loaded = false;
    loader.classList.remove('is-hidden');
    // Reassigning src forces a reload even cross-origin (we can't access contentWindow).
    var u = frame.src; frame.src = 'about:blank'; setTimeout(function(){ frame.src = u; }, 30);
  });

  document.getElementById('fullscreen').addEventListener('click', requestFullscreen);
  document.getElementById('newtab').addEventListener('click', function () {
    window.open(url, '_blank', 'noopener');
  });

  function requestFullscreen() {
    var target = document.documentElement;
    var fn = target.requestFullscreen || target.webkitRequestFullscreen || target.mozRequestFullScreen;
    if (fn) fn.call(target);
  }

  // ESC handling: when leaving fullscreen, keep the toolbar visible (default).
  // Provide F11 shortcut.
  window.addEventListener('keydown', function (e) {
    if (e.key === 'F11') { e.preventDefault(); requestFullscreen(); }
  });

})();

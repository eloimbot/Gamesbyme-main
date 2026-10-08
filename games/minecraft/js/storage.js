/* =========================================================
   storage.js — versioned localStorage wrapper
   ========================================================= */
(function (global) {
  'use strict';

  var KEY = 'eaglercraft-launcher@v1';

  var DEFAULTS = {
    username: 'Steve',
    defaultVersion: 'eaglercraftx-1.8.8',
    autoFullscreen: false,
    newTab: false,
    tabCloak: false,
    showExperimental: false, // hides online-only versions in catalog by default
    skinColor: '#7c4f2a',
    capeColor: '#aa1f1f',
    skinNote: '',
    mirrors: {},          // versionId -> override URL
    customServers: [],    // { name, url, addedAt }
    recentServer: null,   // { name, url }
    lastVersion: null     // last played versionId
  };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULTS);
      var parsed = JSON.parse(raw);
      // shallow merge so new defaults appear after launcher updates
      var merged = clone(DEFAULTS);
      Object.keys(parsed || {}).forEach(function (k) { merged[k] = parsed[k]; });
      return merged;
    } catch (e) {
      console.warn('[storage] load failed, resetting', e);
      return clone(DEFAULTS);
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[storage] save failed', e);
    }
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  global.Storage = { load: load, save: save, reset: reset, DEFAULTS: DEFAULTS };

})(window);

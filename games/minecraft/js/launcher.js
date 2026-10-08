/* =========================================================
   launcher.js — main SPA controller for index.html
   ========================================================= */
(function () {
  'use strict';

  // ---------- state ----------
  var state = Storage.load();

  // ---------- helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) for (var k in props) {
      if (k === 'class') node.className = props[k];
      else if (k === 'html') node.innerHTML = props[k];
      else if (k === 'text') node.textContent = props[k];
      else if (k === 'on') for (var ev in props[k]) node.addEventListener(ev, props[k][ev]);
      else if (k.indexOf('data-') === 0 || k === 'role' || k === 'aria-label') node.setAttribute(k, props[k]);
      else node[k] = props[k];
    }
    if (children) (Array.isArray(children) ? children : [children]).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }
  function persist() { Storage.save(state); }

  var toastTimer = null;
  function toast(msg, kind) {
    var t = $('#toast');
    if (!t) return;
    t.className = 'toast is-show' + (kind ? ' toast--' + kind : '');
    t.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = 'toast'; }, 2400);
  }

  // ---------- routing (hash-based) ----------
  function showView(name) {
    if (!name) name = 'play';
    $$('.view').forEach(function (v) { v.classList.toggle('is-active', v.dataset.view === name); });
    $$('.nav-item').forEach(function (n) { n.classList.toggle('is-active', n.dataset.view === name); });
    // re-render the active view in case state changed
    if (name === 'versions') renderVersionGrid();
    if (name === 'servers')  renderServerList();
    if (name === 'settings') renderSettings();
  }
  function readHash() {
    var h = (location.hash || '').replace(/^#/, '');
    return h || 'play';
  }
  window.addEventListener('hashchange', function () { showView(readHash()); });

  // ---------- header / brand ----------
  function applyTabCloak() {
    if (state.tabCloak) {
      document.title = '';
      var f = document.querySelector('link[rel="icon"]');
      if (f) f.href = 'data:,';
    }
  }

  // ---------- Play view ----------
  function buildVersionSelect(selectEl, includeAll) {
    selectEl.innerHTML = '';
    var groups = Clients.getByCategory(state);
    groups.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g.category.label;
      g.clients.forEach(function (c) {
        if (c.id === 'custom' && !state.mirrors.custom) return;
        var opt = el('option', { value: c.id, text: c.name });
        og.appendChild(opt);
      });
      if (og.children.length) selectEl.appendChild(og);
    });
  }
  function renderPlayDeck() {
    var sel = $('#versionSelect');
    buildVersionSelect(sel);
    sel.value = state.defaultVersion;
    if (!sel.value && sel.options.length) sel.value = sel.options[0].value;
    updateVersionHint();

    $('#optFullscreen').checked = !!state.autoFullscreen;
    $('#optNewTab').checked = !!state.newTab;

    var recent = state.recentServer;
    var rEl = $('#recentServer');
    if (recent) {
      rEl.classList.remove('muted');
      rEl.innerHTML = '<strong>' + escapeHtml(recent.name) + '</strong><br><code style="font-size:11px">' + escapeHtml(recent.url) + '</code>';
    } else {
      rEl.classList.add('muted');
      rEl.textContent = 'No server joined yet.';
    }
  }
  function updateVersionHint() {
    var id = $('#versionSelect').value;
    var c = Clients.getById(id);
    if (!c) { $('#versionHint').textContent = '—'; return; }
    var hint = c.version + ' · by ' + c.author;
    if (c.bundled) hint += ' · bundled, runs offline';
    else if (c.id !== 'custom') hint += ' · online';
    if (state.mirrors[c.id]) hint += ' · custom mirror';
    $('#versionHint').textContent = hint;
  }

  function launchGame(joinUrl) {
    var versionId = $('#versionSelect').value || state.defaultVersion;
    var client = Clients.getById(versionId);
    if (!client) { toast('Pick a version first', 'err'); return; }
    var url = Clients.resolveUrl(client, state, joinUrl);
    if (!url) {
      toast('No URL configured for this version. Set one in Settings.', 'err');
      location.hash = '#settings';
      return;
    }
    state.lastVersion = versionId;
    if (joinUrl) state.recentServer = state.recentServer || null; // recentServer set by caller normally
    persist();

    if (state.newTab) {
      window.open(url, '_blank', 'noopener');
      return;
    }

    var params = new URLSearchParams();
    params.set('v', versionId);
    if (joinUrl) params.set('join', joinUrl);
    if (state.autoFullscreen) params.set('fs', '1');
    location.href = 'play.html?' + params.toString();
  }

  // ---------- Versions grid (grouped by category) ----------
  function renderVersionGrid() {
    var host = $('#versionGrid');
    host.innerHTML = '';
    host.classList.add('version-host'); // overrides default grid layout

    var groups = Clients.getByCategory(state);
    groups.forEach(function (g) {
      var section = el('section', { class: 'version-section' });
      var head = el('header', { class: 'version-section__head' });
      head.appendChild(el('h3', { class: 'version-section__title', text: g.category.label }));
      head.appendChild(el('p',  { class: 'version-section__sub muted', text: g.category.sub }));
      section.appendChild(head);

      var grid = el('div', { class: 'version-grid version-grid--inline' });
      g.clients.forEach(function (c) { grid.appendChild(renderVersionCard(c)); });
      section.appendChild(grid);
      host.appendChild(section);
    });

    // If experimental versions are hidden, add a subtle hint at the bottom.
    if (!state.showExperimental) {
      host.appendChild(el('p', {
        class: 'muted version-host__hint',
        html: 'Online-only / experimental versions are hidden. <a href="#settings">Show them in Settings →</a>'
      }));
    }
  }

  function renderVersionCard(c) {
    var isDefault = (c.id === state.defaultVersion);
    var card = el('article', { class: 'version-card' + (isDefault ? ' is-default' : '') + (c.experimental ? ' is-experimental' : '') });
    var art = el('div', { class: 'version-card__art' }, [
      el('div', { class: 'version-card__art-num', text: c.version === 'any' ? '★' : c.version })
    ]);
    var body = el('div', { class: 'version-card__body' });
    body.appendChild(el('h3', { class: 'version-card__name', text: c.name }));
    body.appendChild(el('div', { class: 'version-card__author', text: 'by ' + c.author }));
    body.appendChild(el('p', { class: 'version-card__desc', text: c.desc }));

    var tags = el('div', { class: 'version-card__tags' });
    c.tags.forEach(function (t) {
      var cls = 'tag';
      if (/recommended/i.test(t)) cls += ' tag--gold';
      else if (/wasm/i.test(t)) cls += ' tag--blue';
      else if (/offline/i.test(t)) cls += ' tag--green';
      else if (/online|experimental/i.test(t)) cls += ' tag--red';
      else if (/classic|fallback|js|beta|custom|touch|mcpe/i.test(t)) cls += ' tag--muted';
      tags.appendChild(el('span', { class: cls, text: t }));
    });
    body.appendChild(tags);

    if (c.experimental) {
      body.appendChild(el('p', {
        class: 'version-card__warn',
        text: '⚠ Online — probably refuses to embed. Toggle "Open in new tab" first.'
      }));
    }

    var actions = el('div', { class: 'version-card__actions' });
    var hasUrl = !!(state.mirrors[c.id] || c.defaultUrl);
    actions.appendChild(el('button', {
      class: 'mc-button mc-button--primary',
      text: hasUrl ? 'Play' : 'Set URL',
      on: { click: function () {
        if (!hasUrl) { location.hash = '#settings'; return; }
        $('#versionSelect').value = c.id;
        updateVersionHint();
        launchGame();
      } }
    }));
    actions.appendChild(el('button', {
      class: 'mc-button mc-button--ghost',
      text: isDefault ? 'Default ★' : 'Set default',
      on: { click: function () {
        state.defaultVersion = c.id;
        persist();
        $('#versionSelect').value = c.id;
        updateVersionHint();
        renderVersionGrid();
        toast('Default set to ' + c.name, 'ok');
      } }
    }));
    body.appendChild(actions);
    card.appendChild(art);
    card.appendChild(body);
    return card;
  }

  // ---------- Servers ----------
  function renderServerList() {
    var list = $('#serverList');
    list.innerHTML = '';
    var customStart = Servers.getBuiltin().length;
    Servers.getAll(state).forEach(function (s, idx) {
      var isCustom = idx >= customStart;
      var li = el('li', { class: 'server-item' + (isCustom ? ' server-item--custom' : '') });
      var initial = s.name ? s.name.charAt(0).toUpperCase() : '?';
      li.appendChild(el('div', { class: 'server-item__icon', text: initial }));
      var info = el('div');
      info.appendChild(el('p', { class: 'server-item__name', text: s.name }));
      info.appendChild(el('div', { class: 'server-item__url', text: s.url }));
      var meta = el('div', { class: 'server-item__meta' });
      if (s.version) meta.appendChild(el('span', { text: 'MC ' + s.version }));
      if (s.modes && s.modes.length) meta.appendChild(el('span', { text: s.modes.join(' · ') }));
      if (s.desc) meta.appendChild(el('span', { text: s.desc }));
      info.appendChild(meta);
      li.appendChild(info);
      var actions = el('div', { class: 'server-item__actions' });
      actions.appendChild(el('button', {
        class: 'mc-button mc-button--primary',
        text: 'Join',
        on: { click: function () {
          state.recentServer = { name: s.name, url: s.url };
          persist();
          launchGame(s.url);
        } }
      }));
      actions.appendChild(el('button', {
        class: 'mc-button mc-button--ghost',
        text: 'Copy',
        on: { click: function () {
          navigator.clipboard.writeText(s.url).then(function () {
            toast('Address copied', 'ok');
          }, function () { toast('Copy failed', 'err'); });
        } }
      }));
      if (isCustom) {
        actions.appendChild(el('button', {
          class: 'mc-button mc-button--danger',
          text: 'Remove',
          on: { click: function () {
            var customIdx = idx - customStart;
            state.customServers.splice(customIdx, 1);
            persist();
            renderServerList();
            toast('Server removed', 'ok');
          } }
        }));
      }
      li.appendChild(actions);
      list.appendChild(li);
    });
  }
  function bindServerForm() {
    var form = $('#serverAddForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#serverAddName').value.trim();
      var url  = $('#serverAddUrl').value.trim();
      if (!name) { toast('Name required', 'err'); return; }
      var bad = Servers.validateUrl(url);
      if (bad) { toast(bad, 'err'); return; }
      state.customServers.push({ name: name, url: url, addedAt: Date.now() });
      persist();
      form.reset();
      renderServerList();
      toast('Added ' + name, 'ok');
    });
  }

  // ---------- Skins ----------
  function bindSkins() {
    var fig = $('#skinFigure');
    var color = $('#skinColor');
    var cape  = $('#capeColor');
    var note  = $('#skinNote');

    color.value = state.skinColor;
    cape.value  = state.capeColor;
    note.value  = state.skinNote || '';
    apply();

    color.addEventListener('input', function () { state.skinColor = color.value; persist(); apply(); });
    cape .addEventListener('input', function () { state.capeColor  = cape.value;  persist(); apply(); });
    note .addEventListener('input', function () { state.skinNote   = note.value;  persist(); });

    function apply() {
      fig.style.setProperty('--skin', state.skinColor);
      // recolour the torso to "cape" so the user sees their colour pick
      var torso = fig.querySelector('.skin-figure__torso');
      if (torso) torso.style.background = state.capeColor;
    }
  }

  // ---------- News (static for now; could be wired to a feed later) ----------
  var NEWS = [
    { date: '2026-05-16', title: 'WASM-GC build is now the default', body: 'EaglercraftX 1.8.8 WASM-GC (Jul 2025 build) is bundled and set as default — significantly faster than the JS build on modern browsers. The classic JS build remains as a fallback for older browsers.' },
    { date: '2026-05-16', title: 'Now bundles game files locally', body: 'EaglercraftX 1.8.8 and Eaglercraft 1.5.2 ship inside the launcher (games/ folder). They run same-origin, so no more iframe-blocking from eaglercraft.com. Works offline once loaded.' },
    { date: '2026-05-12', title: 'Launcher v1 released', body: 'First public build: version catalog, server browser, mirror overrides, tab cloak, mobile-optimized layout. Settings persist to localStorage.' },
    { date: '2026-04-09', title: '1.12.2 still online-only', body: 'PeytonPlayz585’s 1.12.2 port is not bundled — it streams from eaglercraft.com. If it refuses to embed, toggle "Open in new tab" in Settings.' }
  ];
  function renderNews() {
    var feed = $('#newsFeed');
    feed.innerHTML = '';
    NEWS.forEach(function (n) {
      var li = el('li');
      li.appendChild(el('time', { text: n.date }));
      li.appendChild(el('h4', { text: n.title }));
      li.appendChild(el('p', { text: n.body }));
      feed.appendChild(li);
    });
  }

  // ---------- Settings ----------
  function renderSettings() {
    $('#setUsername').value = state.username || '';
    $('#setAutoFullscreen').checked = !!state.autoFullscreen;
    $('#setNewTab').checked = !!state.newTab;
    $('#setTabCloak').checked = !!state.tabCloak;

    var def = $('#setDefaultVersion');
    def.innerHTML = '';
    Clients.getByCategory(state).forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g.category.label;
      g.clients.forEach(function (c) {
        og.appendChild(el('option', { value: c.id, text: c.name }));
      });
      def.appendChild(og);
    });
    def.value = state.defaultVersion;

    var showExp = $('#setShowExperimental');
    if (showExp) showExp.checked = !!state.showExperimental;

    var mirrors = $('#mirrorList');
    mirrors.innerHTML = '';
    Clients.getAll().forEach(function (c) {
      var row = el('div', { class: 'mirror-row' });
      row.appendChild(el('label', { class: 'mirror-row__label', text: c.name, htmlFor: 'mirror-' + c.id }));
      var input = el('input', {
        class: 'mc-input',
        id: 'mirror-' + c.id,
        type: 'text',
        placeholder: c.defaultUrl || 'https://… (Eaglercraft HTML)',
        value: state.mirrors[c.id] || ''
      });
      input.addEventListener('change', function () {
        var v = input.value.trim();
        if (v) state.mirrors[c.id] = v;
        else delete state.mirrors[c.id];
        persist();
        toast('Mirror saved', 'ok');
        renderPlayDeck();
      });
      row.appendChild(input);
      mirrors.appendChild(row);
    });
  }
  function bindSettings() {
    $('#setUsername').addEventListener('input', function (e) {
      state.username = e.target.value.slice(0, 16);
      updateUserChip();
      persist();
    });
    $('#setDefaultVersion').addEventListener('change', function (e) {
      state.defaultVersion = e.target.value;
      persist();
      $('#versionSelect').value = state.defaultVersion;
      updateVersionHint();
    });
    function bindBool(id, key) {
      $(id).addEventListener('change', function (e) {
        state[key] = e.target.checked;
        persist();
        // mirror to the play deck where applicable
        if (key === 'autoFullscreen') $('#optFullscreen').checked = e.target.checked;
        if (key === 'newTab')         $('#optNewTab').checked = e.target.checked;
        if (key === 'tabCloak')       applyTabCloak();
      });
    }
    bindBool('#setAutoFullscreen', 'autoFullscreen');
    bindBool('#setNewTab', 'newTab');
    bindBool('#setTabCloak', 'tabCloak');

    var exp = $('#setShowExperimental');
    if (exp) {
      exp.addEventListener('change', function (e) {
        state.showExperimental = e.target.checked;
        persist();
        renderPlayDeck();
        renderVersionGrid();
        renderSettings();
        toast(e.target.checked ? 'Showing experimental versions' : 'Hiding experimental versions', 'ok');
      });
    }

    $('#resetBtn').addEventListener('click', function () {
      if (!confirm('Reset all launcher settings? Custom servers, mirrors and your username will be cleared.')) return;
      Storage.reset();
      state = Storage.load();
      updateUserChip();
      renderPlayDeck();
      renderSettings();
      renderServerList();
      renderVersionGrid();
      toast('Settings reset', 'ok');
    });
  }

  // ---------- play deck bindings ----------
  function bindPlayDeck() {
    $('#versionSelect').addEventListener('change', function () {
      updateVersionHint();
    });
    $('#optFullscreen').addEventListener('change', function (e) {
      state.autoFullscreen = e.target.checked; persist();
      $('#setAutoFullscreen').checked = e.target.checked;
    });
    $('#optNewTab').addEventListener('change', function (e) {
      state.newTab = e.target.checked; persist();
      $('#setNewTab').checked = e.target.checked;
    });
    $('#playBtn').addEventListener('click', function () { launchGame(); });
    $('#goServers').addEventListener('click', function () { location.hash = '#servers'; });
  }

  function updateUserChip() {
    var name = state.username || 'Steve';
    $('#userName').textContent = name;
    var av = $('#userAvatar');
    if (av) av.textContent = name.charAt(0).toUpperCase();
  }

  // ---------- boot ----------
  function init() {
    updateUserChip();

    // tagline (replaces old MC splash rotator)
    Splash.mount($('#splash'));

    // tab cloak
    applyTabCloak();

    // bind everything
    bindPlayDeck();
    bindServerForm();
    bindSkins();
    bindSettings();
    renderPlayDeck();
    renderVersionGrid();
    renderServerList();
    renderNews();
    renderSettings();

    // routing
    showView(readHash());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();

/* =========================================================
   clients.js — catalog of Eaglercraft builds the launcher knows about.

   Each entry:
     id           - stable slug used in storage + URLs
     name         - display name
     version      - the MC version string this build maps to
     author       - original author / maintainer
     desc         - one-line blurb
     tags         - small badge labels
     defaultUrl   - the URL the iframe / new-tab points to
     altMirrors   - other known mirrors users can swap to
     supportsJoin - true if the URL supports ?joinServer=wss://... param
     joinParam    - query / hash key used for direct-join
   ========================================================= */
(function (global) {
  'use strict';

  // Category metadata is rendered as section headers in the Versions view.
  var CATEGORIES = [
    {
      id: 'eaglercraft',
      label: 'Eaglercraft',
      sub: 'Browser ports of Minecraft Java Edition. Connect to any wss:// server.'
    },
    {
      id: 'mcpe',
      label: 'Minecraft Pocket Edition',
      sub: 'Community web ports of MCPE / Bedrock-flavoured Minecraft. Touch-friendly, no multiplayer.'
    }
  ];

  var CLIENTS = [
    /* ============== Eaglercraft (Java Edition ports) ============== */
    {
      id: 'eaglercraftx-1.8.8',
      category: 'eaglercraft',
      name: 'EaglercraftX 1.8.8 (WASM-GC)',
      version: '1.8.8',
      author: 'lax1dude',
      desc: 'The latest WebAssembly-GC build (July 2025). Significantly faster than the JS version on modern browsers — recommended. Requires Chrome 119+, Firefox 120+ or Safari 18+. Bundled offline.',
      tags: ['Recommended', '1.8.8', 'WASM', 'Offline'],
      defaultUrl: 'games/1.8.8-wasm/index.html',
      bundled: true,
      experimental: false,
      altMirrors: [
        'games/1.8.8-wasm/index.html',
        'https://eaglercraft.com/play?version=wasm'
      ],
      supportsJoin: false,
      joinParam: null
    },
    {
      id: 'eaglecraft 26.2',
      category: 'eaglercraft',          // or 'mcpe'
      name: '26.2',
      version: '2.2',
      author: 'lax1dude',
      desc: 'algo',
      tags: ['Recommended', 'Offline'],
      defaultUrl: 'games/26.2/index.html',
      bundled: true,
      experimental: false,
      altMirrors: ['games/26.2/index.html'],
      supportsJoin: false,
      joinParam: null
    },
    {
      id: 'eaglercraftx-1.8.8-js',
      category: 'eaglercraft',
      name: 'EaglercraftX 1.8.8 (Classic JS)',
      version: '1.8.8',
      author: 'lax1dude',
      desc: 'The original JavaScript build. Slower than WASM-GC but compatible with every browser — fall back to this if the WASM version misbehaves on yours. Bundled offline.',
      tags: ['1.8.8', 'JS', 'Fallback', 'Offline'],
      defaultUrl: 'games/1.8.8/index.html',
      bundled: true,
      experimental: false,
      altMirrors: [
        'games/1.8.8/index.html',
        'https://eaglercraft.com/play'
      ],
      supportsJoin: false,
      joinParam: null
    },
    {
      id: 'eaglercraft-1.5.2',
      category: 'eaglercraft',
      name: 'Eaglercraft 1.5.2',
      version: '1.5.2',
      author: 'lax1dude',
      desc: "The original. Smaller, lighter, the way Eaglercraft started. Best for low-end devices and classic-feel servers. Bundled offline.",
      tags: ['1.5.2', 'Classic', 'Offline'],
      defaultUrl: 'games/1.5.2/index.html',
      bundled: true,
      experimental: false,
      altMirrors: [
        'games/1.5.2/index.html',
        'https://g.deev.is/eaglercraft/'
      ],
      supportsJoin: false,
      joinParam: null
    },
    /* ============== Minecraft Pocket Edition ============== */
    {
      id: 'mcpe-0.6.1',
      category: 'mcpe',
      name: 'Minecraft Pocket Edition 0.6.1',
      version: '0.6.1',
      author: 'genizy / sangraphic',
      desc: 'Community port of MCPE 0.6.1 alpha (2013) to the browser via Emscripten. Full multi-touch, keyboard & mouse, local-storage map saves, audio, PWA support. Bundled offline.',
      tags: ['Recommended', 'MCPE', '0.6.1', 'Touch', 'Offline'],
      defaultUrl: 'games/mcpe-0.6.1/index.html',
      bundled: true,
      experimental: false,
      altMirrors: [
        'games/mcpe-0.6.1/index.html',
        'https://sangraphic.github.io/MCPEweb/'
      ],
      supportsJoin: false,
      joinParam: null
    },
    /* ============== Experimental (online — hidden unless toggle on) ============== */
    {
      id: 'eaglercraft-1.12.2',
      category: 'eaglercraft',
      name: 'Eaglercraft 1.12.2 (Online)',
      version: '1.12.2',
      author: 'PeytonPlayz585',
      desc: '1.12 features, larger world, more blocks. Loaded from eaglercraft.com — probably refuses to embed because of frame restrictions; use "Open in new tab".',
      tags: ['1.12.2', 'Online', 'Experimental'],
      defaultUrl: 'https://eaglercraft.com/play?version=1.12',
      bundled: false,
      experimental: true,
      altMirrors: ['https://eaglercraft.com/play?version=1.12'],
      supportsJoin: false,
      joinParam: null
    },
    {
      id: 'eaglercraft-modpack',
      category: 'eaglercraft',
      name: 'EaglercraftX Modpack Ultimate (Online)',
      version: '1.8.8',
      author: 'community',
      desc: 'Modded Eaglercraft with the Ultimate modpack pre-loaded. Hosted on eaglercraft.com — probably refuses to embed; use "Open in new tab".',
      tags: ['Modded', 'Online', 'Experimental'],
      defaultUrl: 'https://eaglercraft.com/play?version=modpack-ultimate-wasm',
      bundled: false,
      experimental: true,
      altMirrors: ['https://eaglercraft.com/play?version=modpack-ultimate-wasm'],
      supportsJoin: true,
      joinParam: 'joinServer'
    },
    {
      id: 'custom',
      category: 'eaglercraft',
      name: 'Custom URL',
      version: 'any',
      author: 'You',
      desc: 'Point the launcher at any Eaglercraft / MCPE HTML you self-host or trust. Set the URL in Settings → Mirror URLs.',
      tags: ['Custom'],
      defaultUrl: '',
      bundled: false,
      experimental: true,
      altMirrors: [],
      supportsJoin: false,
      joinParam: null
    }
  ];

  function getCategories() { return CATEGORIES.slice(); }

  function getAll() { return CLIENTS.slice(); }

  /** Visible clients = all non-experimental + experimental ones if the toggle is on */
  function getVisible(settings) {
    var show = !!(settings && settings.showExperimental);
    return CLIENTS.filter(function (c) {
      return !c.experimental || show;
    });
  }

  /** Group by category. Returns [{ category, clients[] }]. */
  function getByCategory(settings) {
    var visible = getVisible(settings);
    return CATEGORIES.map(function (cat) {
      return {
        category: cat,
        clients: visible.filter(function (c) { return c.category === cat.id; })
      };
    }).filter(function (g) { return g.clients.length > 0; });
  }

  function getById(id) {
    for (var i = 0; i < CLIENTS.length; i++) if (CLIENTS[i].id === id) return CLIENTS[i];
    return null;
  }

  /** Resolve the actual URL to load for a client, honouring user mirror overrides */
  function resolveUrl(client, settings, joinServer) {
    var url = (settings && settings.mirrors && settings.mirrors[client.id]) || client.defaultUrl;
    if (!url) return null;
    if (joinServer && client.supportsJoin && client.joinParam) {
      try {
        var u = new URL(url, window.location.href);
        u.searchParams.set(client.joinParam, joinServer);
        return u.toString();
      } catch (_) { /* fall through */ }
    }
    return url;
  }

  global.Clients = {
    getAll: getAll,
    getVisible: getVisible,
    getByCategory: getByCategory,
    getCategories: getCategories,
    getById: getById,
    resolveUrl: resolveUrl
  };

})(window);

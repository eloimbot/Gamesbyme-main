/* =========================================================
   servers.js — curated public Eaglercraft servers.
   These are community servers; addresses can rotate over time
   and are user-overridable via the "Add server" form.
   ========================================================= */
(function (global) {
  'use strict';

  // Curated from public Eaglercraft server lists (servers.eaglercraft.com,
  // topeaglerservers.com). Users can add their own; deletions persist.
  var BUILTIN = [
    {
      id: 'krypticmc',
      name: 'KrypticMC',
      url: 'wss://mc.krypticmc.net',
      version: '1.8.8',
      modes: ['Survival', 'PvP', 'Hub'],
      desc: 'One of the biggest and oldest Eaglercraft networks. Multiple game modes, generally always populated.'
    },
    {
      id: 'heartsmp',
      name: 'HeartSMP',
      url: 'wss://play.heartsmp.net',
      version: '1.8.8',
      modes: ['SMP', 'Survival'],
      desc: 'Vanilla-feel survival SMP with light QoL plugins.'
    },
    {
      id: 'ricenetwork',
      name: 'Rice Network',
      url: 'wss://server.ricenetwork.xyz',
      version: '1.8.8',
      modes: ['Lobby', 'Minigames', 'PvP'],
      desc: 'Minigame network with hub, bedwars and skywars rotations.'
    },
    {
      id: 'lampnetwork',
      name: 'Lamp Network',
      url: 'wss://lampnetwork.eaglercraft.com',
      version: '1.8.8',
      modes: ['Lobby', 'Survival'],
      desc: 'Cozy network with survival worlds and creative.'
    },
    {
      id: 'vanillamc',
      name: 'VanillaMC',
      url: 'wss://vanillamc.me',
      version: '1.8.8',
      modes: ['Vanilla', 'Survival'],
      desc: 'As close to vanilla 1.8 as Eaglercraft gets. No anti-cheat fuss, no economy.'
    },
    {
      id: 'chillmc',
      name: 'ChillMC',
      url: 'wss://chillmc.eaglercraft.com',
      version: '1.8.8',
      modes: ['Survival', 'Creative'],
      desc: 'Laid-back community server. New-player friendly.'
    }
  ];

  function getBuiltin() { return BUILTIN.slice(); }

  /** Returns combined builtin + user-added servers, in display order */
  function getAll(settings) {
    var custom = (settings && settings.customServers) || [];
    return BUILTIN.concat(custom);
  }

  /** Validate that the URL looks like an Eaglercraft server address */
  function validateUrl(url) {
    if (!url) return 'URL is required';
    var s = String(url).trim();
    if (!/^wss?:\/\//i.test(s)) return 'Must start with wss:// or ws://';
    try { new URL(s); } catch (e) { return 'Not a valid URL'; }
    return null;
  }

  global.Servers = { getBuiltin: getBuiltin, getAll: getAll, validateUrl: validateUrl };

})(window);

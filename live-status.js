(() => {
  const API = 'https://4jeo6afdee.apps.bot-hosting.cloud/api/health';
  const $ = id => document.getElementById(id);
  const set = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  let uptimeBase = null;
  let uptimeFetchedAt = null;

  function formatUptime(total) {
    total = Math.max(0, Math.floor(total || 0));
    const d = Math.floor(total / 86400); total %= 86400;
    const h = Math.floor(total / 3600); total %= 3600;
    const m = Math.floor(total / 60); const s = total % 60;
    if (d) return `${d}d ${h}h ${m}m`;
    if (h) return `${h}h ${m}m ${s}s`;
    if (m) return `${m}m ${s}s`;
    return `${s}s`;
  }

  function setState(state, label) {
    const badge = $('liveStatusBadge');
    if (!badge) return;
    badge.dataset.state = state;
    badge.innerHTML = `<span class="pulse"></span>${label}`;
  }

  function flashTelemetry() {
    const live = document.getElementById('live');
    if (!live) return;
    live.classList.remove('telemetry-flash');
    requestAnimationFrame(() => live.classList.add('telemetry-flash'));
    setTimeout(() => live.classList.remove('telemetry-flash'), 850);
  }

  function syncDemo(data) {
    const demo = document.querySelector('.x-demo');
    if (!demo) return;
    const active = demo.querySelector('[data-demo].active')?.dataset.demo;
    const screen = demo.querySelector('.x-demo-screen');
    if (!screen || active !== 'members') return;
    const title = screen.querySelector('b');
    const text = screen.querySelector('span');
    if (title && Number.isFinite(data.members)) title.textContent = `${data.members} members visible`;
    if (text) text.textContent = 'Live member count synced from Xenoxy. Search, inspect and run permission-aware member actions.';
  }

  async function refreshStatus() {
    setState('loading', 'SYNCING');
    try {
      const response = await fetch(API, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.ok !== true) throw new Error('Invalid status payload');

      const online = data.bot_ready === true;
      const version = data.version || '9.3';
      setState(online ? 'online' : 'starting', online ? 'BOT ONLINE' : 'BOT STARTING');
      set('liveVersion', `V${version}`);
      set('liveLatency', Number.isFinite(data.latency_ms) ? `${data.latency_ms} ms` : '—');
      set('liveGuilds', Number.isFinite(data.guilds) ? String(data.guilds) : '—');
      set('liveMembers', Number.isFinite(data.members) ? String(data.members) : '—');
      set('liveCommands', Number.isFinite(data.commands) ? String(data.commands) : '—');
      set('liveUpdated', data.updated_at ? new Date(data.updated_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}) : 'just now');

      uptimeBase = Number.isFinite(data.uptime_seconds) ? data.uptime_seconds : null;
      uptimeFetchedAt = performance.now();
      set('liveUptime', uptimeBase !== null ? formatUptime(uptimeBase) : (data.uptime || '—'));

      const heroStatus = document.querySelector('.hero .status');
      if (heroStatus) heroStatus.innerHTML = `<span class="pulse"></span> V${version} MEMBER OPS <b>// ${online ? 'ONLINE' : 'STARTING'}</b>`;
      const heroOnline = document.querySelector('.trust-row span:first-child');
      if (heroOnline) heroOnline.innerHTML = `<i></i> ${online ? 'BOT ONLINE' : 'BOT STARTING'}`;
      const heroCore = document.querySelector('.console-grid article:first-child b');
      if (heroCore) heroCore.textContent = `V${version}`;
      const heroCommands = document.querySelector('.console-grid article:nth-child(2) b');
      if (heroCommands && Number.isFinite(data.commands)) heroCommands.textContent = data.commands;
      const heroMembers = document.querySelector('.hero-console .x-demo-screen b');
      if (heroMembers && Number.isFinite(data.members)) heroMembers.textContent = `${data.members} members visible`;
      syncDemo(data);
      flashTelemetry();
    } catch (error) {
      setState('offline', 'STATUS UNAVAILABLE');
      set('liveLatency', '—');
      set('liveUptime', '—');
      set('liveGuilds', '—');
      set('liveMembers', '—');
      set('liveCommands', '—');
      set('liveUpdated', 'waiting for bot API');
      uptimeBase = null;
      uptimeFetchedAt = null;
      console.warn('Xenoxy live status unavailable:', error);
    }
  }

  setInterval(() => {
    if (uptimeBase === null || uptimeFetchedAt === null) return;
    const elapsed = (performance.now() - uptimeFetchedAt) / 1000;
    set('liveUptime', formatUptime(uptimeBase + elapsed));
  }, 1000);

  refreshStatus();
  setInterval(refreshStatus, 30000);
})();

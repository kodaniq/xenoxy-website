(() => {
  const API = 'https://4jeo6afdee.apps.bot-hosting.cloud/api/health';
  const FALLBACK_VERSION = '10.0';
  const FALLBACK_CORE = 'CONTROL PLATFORM';
  const $ = id => document.getElementById(id);
  const set = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  const finite = value => Number.isFinite(value);

  let uptimeBase = null;
  let uptimeFetchedAt = null;
  let lastData = null;

  const normalizeCore = value => String(value || FALLBACK_CORE).trim().toUpperCase();

  function formatUptime(total) {
    total = Math.max(0, Math.floor(total || 0));
    const d = Math.floor(total / 86400); total %= 86400;
    const h = Math.floor(total / 3600); total %= 3600;
    const m = Math.floor(total / 60), s = total % 60;
    if (d) return `${d}d ${h}h ${m}m`;
    if (h) return `${h}h ${m}m ${s}s`;
    if (m) return `${m}m ${s}s`;
    return `${s}s`;
  }

  function syncPageIdentity(version = FALLBACK_VERSION, core = FALLBACK_CORE) {
    const cleanCore = normalizeCore(core);
    document.title = `Xenoxy V${version} // ${cleanCore}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = `Xenoxy V${version} ${cleanCore} — 100 Discord commands, persistent OAuth, SQLite, Automod, Incident Center, server analytics and live platform telemetry.`;
  }

  function setState(state, label) {
    const badge = $('liveStatusBadge');
    if (!badge) return;
    badge.dataset.state = state;
    badge.innerHTML = `<span class="pulse"></span>${label}`;
  }

  function flashTelemetry() {
    const live = $('live');
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
    if (!screen) return;
    const title = screen.querySelector('b');
    const text = screen.querySelector('span');
    const core = normalizeCore(data.core);

    if (active === 'members') {
      if (title && finite(data.members)) title.textContent = `${data.members} members visible`;
      if (text) text.textContent = `${finite(data.guilds) ? data.guilds : '—'} guilds • ${finite(data.latency_ms) ? data.latency_ms + ' ms' : 'latency —'} • permission-aware member operations.`;
    } else if (active === 'moderation') {
      if (title) title.textContent = data.bot_ready === true ? 'Moderation + Automod online' : 'Moderation node starting';
      if (text) text.textContent = 'Member Ops, Automod Engine, Incident Center and role-hierarchy protection run through the same control platform.';
    } else if (active === 'settings') {
      if (title) title.textContent = `V${data.version || FALLBACK_VERSION} ${core}`;
      if (text) text.textContent = `${finite(data.commands) ? data.commands : '—'} commands • SQLite persistence • restart-safe OAuth • runtime diagnostics.`;
    }
  }

  function syncHero(data) {
    const version = data.version || FALLBACK_VERSION;
    const core = normalizeCore(data.core);
    const online = data.bot_ready === true;
    syncPageIdentity(version, core);

    const heroStatus = document.querySelector('.hero .status');
    if (heroStatus) heroStatus.innerHTML = `<span class="pulse"></span> V${version} ${core} <b>// ${online ? 'ONLINE' : 'STARTING'}</b>`;

    const heroOnline = document.querySelector('.trust-row span:first-child');
    if (heroOnline) heroOnline.innerHTML = `<i></i> ${online ? 'CONTROL PLATFORM ONLINE' : 'CONTROL PLATFORM STARTING'}`;

    const cards = document.querySelectorAll('.console-grid article');
    if (cards[0]?.querySelector('b')) cards[0].querySelector('b').textContent = `V${version}`;
    if (cards[1]?.querySelector('b') && finite(data.commands)) cards[1].querySelector('b').textContent = data.commands;
    if (cards[2]?.querySelector('b') && finite(data.latency_ms)) cards[2].querySelector('b').textContent = `${data.latency_ms} ms`;
    if (cards[3]?.querySelector('b')) cards[3].querySelector('b').textContent = uptimeBase !== null ? formatUptime(uptimeBase) : (data.uptime || '—');

    document.querySelectorAll('[data-xenoxy-core]').forEach(el => { el.textContent = core; });
    syncDemo(data);
  }

  async function refreshStatus() {
    setState('loading', 'SYNCING CONTROL PLATFORM');
    try {
      const response = await fetch(API, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.ok !== true) throw new Error('Invalid status payload');

      lastData = data;
      const online = data.bot_ready === true;
      const version = data.version || FALLBACK_VERSION;
      const core = normalizeCore(data.core);

      setState(online ? 'online' : 'starting', online ? `${core} ONLINE` : `${core} STARTING`);
      set('liveVersion', `V${version}`);
      set('liveLatency', finite(data.latency_ms) ? `${data.latency_ms} ms` : '—');
      set('liveGuilds', finite(data.guilds) ? String(data.guilds) : '—');
      set('liveMembers', finite(data.members) ? String(data.members) : '—');
      set('liveCommands', finite(data.commands) ? String(data.commands) : '—');
      set('liveUpdated', data.updated_at ? new Date(data.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'just now');

      uptimeBase = finite(data.uptime_seconds) ? data.uptime_seconds : null;
      uptimeFetchedAt = performance.now();
      set('liveUptime', uptimeBase !== null ? formatUptime(uptimeBase) : (data.uptime || '—'));

      syncHero(data);
      flashTelemetry();
      document.documentElement.dataset.xenoxyState = online ? 'online' : 'starting';
    } catch (error) {
      lastData = null;
      syncPageIdentity();
      setState('offline', 'CONTROL PLATFORM OFFLINE • RETRYING');
      ['liveLatency', 'liveUptime', 'liveGuilds', 'liveMembers', 'liveCommands'].forEach(id => set(id, '—'));
      set('liveVersion', `V${FALLBACK_VERSION}`);
      set('liveUpdated', 'retrying automatically');
      uptimeBase = uptimeFetchedAt = null;
      document.documentElement.dataset.xenoxyState = 'offline';

      const heroStatus = document.querySelector('.hero .status');
      if (heroStatus) heroStatus.innerHTML = `<span class="pulse"></span> V${FALLBACK_VERSION} ${FALLBACK_CORE} <b>// RETRYING</b>`;
      const heroOnline = document.querySelector('.trust-row span:first-child');
      if (heroOnline) heroOnline.innerHTML = '<i></i> CONTROL PLATFORM RETRYING';
      console.warn('Xenoxy live status unavailable:', error);
    }
  }

  window.addEventListener('xenoxy-demo-tab', () => { if (lastData) syncDemo(lastData); });

  setInterval(() => {
    if (uptimeBase === null || uptimeFetchedAt === null) return;
    const current = uptimeBase + (performance.now() - uptimeFetchedAt) / 1000;
    set('liveUptime', formatUptime(current));
    const cards = document.querySelectorAll('.console-grid article');
    if (cards[3]?.querySelector('b')) cards[3].querySelector('b').textContent = formatUptime(current);
  }, 1000);

  syncPageIdentity();
  refreshStatus();
  setInterval(refreshStatus, 30000);
})();
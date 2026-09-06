(() => {
  const API = 'https://4jeo6afdee.apps.bot-hosting.cloud/api/health';
  const FALLBACK_VERSION = '11.0';
  const FALLBACK_CORE = 'NEXUS';
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

  function syncStaticCopy() {
    const text = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };
    text('.hero .kicker', 'DISCORD CONTROL PLATFORM');
    text('.console-brand', 'XENOXY NEXUS');
    text('.console-grid article:first-child span', 'Nexus Core');
    text('main > .metric-strip article:first-child span', 'Nexus Core');
    text('#systems .eyebrow', '// NEXUS SYSTEMS');
    text('#architecture .eyebrow', '// V11.0 NEXUS ARCHITECTURE');
    text('footer span:first-child', 'XENOXY // V11.0 // NEXUS');
    set('liveVersion', 'V11.0');

    const architectureTitle = document.querySelector('#architecture h2');
    if (architectureTitle) architectureTitle.innerHTML = 'Discord → Nexus → <span>Xenoxy.</span>';

    const lead = document.querySelector('.hero .lead');
    if (lead) lead.textContent = '100 verified slash commands, Discord OAuth, restart-safe SQLite, Security Guard, Smart Automod and V11 Nexus runtime intelligence — unified in Xenoxy.';

    const systems = document.querySelector('#systems .sectionhead .muted');
    if (systems) systems.textContent = 'Xenoxy Nexus unifies Security & Permissions, Smart Automod, Member Ops, incident workflows, analytics, health scoring and persistent platform state in one hosted control surface.';
  }

  function syncPageIdentity(version = FALLBACK_VERSION, core = FALLBACK_CORE) {
    const cleanCore = normalizeCore(core);
    document.title = `Xenoxy V${version} // ${cleanCore}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = `Xenoxy V${version} ${cleanCore} — 100 verified Discord commands, Security Guard, Smart Automod, OAuth, SQLite, Nexus health intelligence and live platform telemetry.`;
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
    const body = screen.querySelector('span');
    const core = normalizeCore(data.core);

    if (active === 'members') {
      if (title && finite(data.members)) title.textContent = `${data.members} members visible`;
      if (body) body.textContent = `${finite(data.guilds) ? data.guilds : '—'} guilds • ${finite(data.latency_ms) ? data.latency_ms + ' ms' : 'latency —'} • permission-aware member operations.`;
    } else if (active === 'moderation') {
      if (title) title.textContent = data.bot_ready === true ? 'Security + Smart Automod online' : 'Moderation node starting';
      if (body) body.textContent = 'Security Guard, Member Ops, Smart Automod and Incident Center run through the Nexus control layer.';
    } else if (active === 'settings') {
      if (title) title.textContent = `V${data.version || FALLBACK_VERSION} ${core}`;
      const health = finite(data.health_score) ? ` • Nexus ${data.health_score}/100 ${String(data.health_state || '').toUpperCase()}` : '';
      if (body) body.textContent = `${finite(data.commands) ? data.commands : '—'} commands • SQLite persistence • restart-safe OAuth • runtime diagnostics${health}.`;
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
    if (heroOnline) {
      const health = finite(data.health_score) ? ` • NEXUS ${data.health_score}/100` : '';
      heroOnline.innerHTML = `<i></i> ${online ? 'CONTROL PLATFORM ONLINE' : 'CONTROL PLATFORM STARTING'}${health}`;
    }

    const cards = document.querySelectorAll('.console-grid article');
    if (cards[0]?.querySelector('b')) cards[0].querySelector('b').textContent = `V${version}`;
    if (cards[1]?.querySelector('b') && finite(data.commands)) cards[1].querySelector('b').textContent = data.commands;
    if (cards[2]?.querySelector('b') && finite(data.latency_ms)) cards[2].querySelector('b').textContent = `${data.latency_ms} ms`;
    if (cards[3]?.querySelector('b')) cards[3].querySelector('b').textContent = uptimeBase !== null ? formatUptime(uptimeBase) : (data.uptime || '—');

    const topMetric = document.querySelector('main > .metric-strip article:first-child b');
    if (topMetric) topMetric.textContent = `V${version}`;
    set('liveVersion', `V${version}`);
    syncDemo(data);
  }

  async function refreshStatus() {
    setState('loading', 'SYNCING NEXUS');
    try {
      const response = await fetch(API, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.ok !== true) throw new Error('Invalid status payload');

      lastData = data;
      const online = data.bot_ready === true;
      const version = data.version || FALLBACK_VERSION;
      const core = normalizeCore(data.core);
      const healthSuffix = finite(data.health_score) ? ` • ${data.health_score}/100 ${String(data.health_state || '').toUpperCase()}` : '';

      setState(online ? 'online' : 'starting', online ? `${core} ONLINE${healthSuffix}` : `${core} STARTING`);
      set('liveVersion', `V${version}`);
      set('liveLatency', finite(data.latency_ms) ? `${data.latency_ms} ms` : '—');
      set('liveGuilds', finite(data.guilds) ? String(data.guilds) : '—');
      set('liveMembers', finite(data.members) ? String(data.members) : '—');
      set('liveCommands', finite(data.commands) ? String(data.commands) : '—');
      set('liveUpdated', data.updated_at ? new Date(data.updated_at).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' }) : 'just now');

      uptimeBase = finite(data.uptime_seconds) ? data.uptime_seconds : null;
      uptimeFetchedAt = performance.now();
      set('liveUptime', uptimeBase !== null ? formatUptime(uptimeBase) : (data.uptime || '—'));

      syncHero(data);
      flashTelemetry();
      document.documentElement.dataset.xenoxyState = online ? 'online' : 'starting';
      if (data.health_state) document.documentElement.dataset.nexusHealth = String(data.health_state).toLowerCase();
    } catch (error) {
      lastData = null;
      syncPageIdentity();
      setState('offline', 'NEXUS OFFLINE • RETRYING');
      ['liveLatency','liveUptime','liveGuilds','liveMembers','liveCommands'].forEach(id => set(id, '—'));
      set('liveVersion', `V${FALLBACK_VERSION}`);
      set('liveUpdated', 'retrying automatically');
      uptimeBase = uptimeFetchedAt = null;
      document.documentElement.dataset.xenoxyState = 'offline';

      const heroStatus = document.querySelector('.hero .status');
      if (heroStatus) heroStatus.innerHTML = `<span class="pulse"></span> V${FALLBACK_VERSION} ${FALLBACK_CORE} <b>// RETRYING</b>`;
      const heroOnline = document.querySelector('.trust-row span:first-child');
      if (heroOnline) heroOnline.innerHTML = '<i></i> NEXUS RETRYING';
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

  syncStaticCopy();
  syncPageIdentity();
  refreshStatus();
  setInterval(refreshStatus, 30000);
})();
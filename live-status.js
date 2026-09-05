(() => {
  const API = 'https://4jeo6afdee.apps.bot-hosting.cloud/api/health';
  const $ = id => document.getElementById(id);
  const set = (id, value) => { const el = $(id); if (el) el.textContent = value; };

  function setState(state, label) {
    const badge = $('liveStatusBadge');
    if (!badge) return;
    badge.dataset.state = state;
    badge.innerHTML = `<span class="pulse"></span>${label}`;
  }

  async function refreshStatus() {
    setState('loading', 'CONNECTING');
    try {
      const response = await fetch(API, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.ok !== true) throw new Error('Invalid status payload');

      const online = data.bot_ready === true;
      setState(online ? 'online' : 'starting', online ? 'BOT ONLINE' : 'BOT STARTING');
      set('liveVersion', `V${data.version || '9.3'}`);
      set('liveLatency', Number.isFinite(data.latency_ms) ? `${data.latency_ms} ms` : '—');
      set('liveUptime', data.uptime || '—');
      set('liveGuilds', Number.isFinite(data.guilds) ? String(data.guilds) : '—');
      set('liveMembers', Number.isFinite(data.members) ? String(data.members) : '—');
      set('liveCommands', Number.isFinite(data.commands) ? String(data.commands) : '—');
      set('liveUpdated', data.updated_at ? new Date(data.updated_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}) : 'just now');

      const heroStatus = document.querySelector('.hero .status');
      if (heroStatus) heroStatus.innerHTML = `<span class="pulse"></span> V${data.version || '9.3'} MEMBER OPS <b>// ${online ? 'ONLINE' : 'STARTING'}</b>`;
      const heroOnline = document.querySelector('.trust-row span:first-child');
      if (heroOnline) heroOnline.innerHTML = `<i></i> ${online ? 'BOT ONLINE' : 'BOT STARTING'}`;
      const heroCore = document.querySelector('.console-grid article:first-child b');
      if (heroCore) heroCore.textContent = `V${data.version || '9.3'}`;
      const heroCommands = document.querySelector('.console-grid article:nth-child(2) b');
      if (heroCommands && Number.isFinite(data.commands)) heroCommands.textContent = data.commands;
    } catch (error) {
      setState('offline', 'STATUS UNAVAILABLE');
      set('liveLatency', '—');
      set('liveUptime', '—');
      set('liveGuilds', '—');
      set('liveMembers', '—');
      set('liveCommands', '—');
      set('liveUpdated', 'waiting for bot API');
      console.warn('Xenoxy live status unavailable:', error);
    }
  }

  refreshStatus();
  setInterval(refreshStatus, 30000);
})();

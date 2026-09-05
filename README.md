# XENOXY V8.5 // NEXUS INTERFACE

Xenoxy on Pythoni ja `discord.py` peal ehitatud Discord management bot/platform.

Praegune build: **V8.5 // NEXUS INTERFACE**  
Slash commande: **100 / 100**  
Persistence: **SQLite (`xenoxy.db`)**  
Dashboard: **Discord OAuth + public hosted control center**  
Login: **30-day persistent SQLite sessions**

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## Mis V8.5-s uut on?

V8.5 teeb Xenoxy web layeri palju rohkem päris control-center feeliga süsteemiks.

```text
Browser
    ↓
Public Xenoxy HTTPS domain
    ↓
Discord OAuth2
    ↓
Persistent SQLite session
    ↓
Server select
    ↓
Xenoxy V8.5 Nexus Interface
    ↓
Xenoxy bot.py
    ↓
xenoxy.db
    ↓
Discord server behavior changes
```

### V8.5 upgrades

- 30-day persistent login sessions
- sessions survive bot restarts
- new Xenoxy Nexus logo
- improved dashboard UI
- visible `Changes saved successfully` confirmation banner + toast
- hosted public dashboard, no localhost needed
- Suggestions + Confessions dashboard controls
- Sticky Messages dashboard controls
- Birthdays overview/removal
- Activity rankings
- Welcome / Goodbye / Welcome DM controls
- Autorole + Verification controls
- Logs + Rules + moderation toggles
- SQLite remains the live source of truth

---

## Architecture

`bot.py` runs:

- 100 slash commands
- Discord events
- persistent Discord UI
- SQLite storage
- authenticated API
- public dashboard web server
- Discord OAuth callback flow
- persistent web sessions

```text
Discord → OAuth → Nexus Dashboard → Xenoxy → SQLite → Discord
```

API endpoints remain protected by Bearer auth. Public dashboard routes use Discord OAuth sessions and only show servers where the user has Owner, Administrator or Manage Server permission and where Xenoxy is installed.

### Bot-host environment variables

```env
DISCORD_TOKEN=...
GUILD_ID=...
XENOXY_API_HOST=0.0.0.0
XENOXY_API_PORT=25931
XENOXY_API_SECRET=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=https://4jeo6afdee.apps.bot-hosting.cloud/callback
```

Discord Developer Portal OAuth2 Redirects must contain:

```text
https://4jeo6afdee.apps.bot-hosting.cloud/callback
```

Never commit the bot token, Discord Client Secret or Xenoxy API Secret to GitHub.

---

## Xenoxy systems

V8.5 includes moderation, welcome/goodbye, welcome DMs, suggestions, suggestion management, anonymous confessions, birthdays, activity/member stats, server health/age, role menu, reaction/button roles, verification, sticky messages, embed builder, backups, autorole, logs, polls/utilities, SQLite persistence, Discord OAuth dashboard and authenticated control API.

Website command database contains all **100 slash commands**.

---

## Xenoxy progression

```text
V1       Basic Slash Commands
V3       Welcome / Logs / XP
V5       83 Commands
V6       98 Commands
V7       100 Commands
V7.5     DM Configurator
V7.8     Community Core
V8.0     SQLite Database Core
V8.1     Full Control Core
V8.2     Dashboard Expansion
V8.3     Public Dashboard
V8.4     Session Fortress
V8.5     Nexus Interface
```

## Tech

- Python
- discord.py
- aiohttp
- Discord OAuth2
- SQLite
- Discord Interactions / Slash Commands
- Discord UI Views
- GitHub Pages

Built by **@kodaniq**.

# XENOXY V9.0 // CONTROL OS

Xenoxy on Pythoni ja `discord.py` peal ehitatud Discord management bot/platform.

Praegune build: **V9.0 // CONTROL OS**  
Slash commande: **100 / 100**  
Persistence: **SQLite (`xenoxy.db`)**  
Dashboard: **Discord OAuth + public hosted Control OS**  
Login: **30-day persistent SQLite sessions**

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V9.0 Control OS

V9 ühendab Xenoxy boti, OAuth dashboardi ja SQLite persistence'i üheks control surface'iks.

```text
Discord
  ↓
Discord OAuth2
  ↓
30-day persistent session
  ↓
Xenoxy Control OS
  ↓
bot.py + 100 slash commands
  ↓
xenoxy.db
  ↓
Live Discord server behavior
```

### V9 upgrades

- Control OS branding and dashboard interface
- 100 slash commands preserved
- working Save Changes flow preserved
- visible Saving / successful-sync feedback
- unsaved-changes dashboard state
- 30-day persistent OAuth sessions
- sessions survive bot restarts
- hosted HTTPS dashboard; no localhost required
- Suggestions + Confessions controls
- Sticky Messages controls
- Birthdays overview/removal
- Activity rankings
- Welcome / Goodbye / Welcome DM controls
- Autorole + Verification controls
- Logs + Rules + moderation toggles
- SQLite remains the live source of truth
- refreshed Xenoxy website and Control OS branding

---

## Architecture

`bot.py` runs the Discord bot and hosted control layer in the same process:

- 100 slash commands
- Discord events
- persistent Discord UI
- SQLite storage
- authenticated API
- public dashboard web server
- Discord OAuth callback flow
- persistent web sessions

API endpoints remain protected by Bearer auth. Public dashboard routes use Discord OAuth sessions and expose only servers where the user has Owner, Administrator or Manage Server permission and Xenoxy is installed.

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

Never commit bot tokens, Discord Client Secrets or Xenoxy API Secrets to GitHub.

---

## Progression

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
V9.0     Control OS
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

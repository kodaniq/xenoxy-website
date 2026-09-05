# XENOXY V9.2 // MEMBER CONTROL

Xenoxy is a Discord management bot/platform built with Python and `discord.py`, combining a 100-command Discord layer, hosted web control, Discord OAuth and SQLite persistence into one control surface.

**Current build:** V9.2 // MEMBER CONTROL  
**Slash commands:** 100 / 100  
**Persistence:** SQLite (`xenoxy.db`)  
**Dashboard:** hosted Xenoxy Member Control  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Hosting:** public HTTPS dashboard + 24/7 bot hosting

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V9.2 Member Control

V9.2 expands Xenoxy from a command bot into a proper server control platform. Discord commands, member actions, server configuration, OAuth sessions and persisted settings all work through the same Xenoxy stack.

```text
Discord
  ↓
Discord OAuth2
  ↓
30-day restart-safe session
  ↓
Xenoxy Member Control
  ↓
bot.py + 100 slash commands
  ↓
SQLite / xenoxy.db
  ↓
Live Discord server behavior
```

### Current V9.2 systems

- 100 global slash commands
- hosted Xenoxy Member Control dashboard
- Discord OAuth2 login
- restart-safe rolling 30-day web sessions
- SQLite-backed guild settings and session persistence
- permission-aware member search and actions
- timeout, nickname, kick and ban controls
- Welcome / Goodbye / Welcome DM configuration
- Autorole and Verification controls
- Logs, Rules and moderation settings
- Suggestions and Confessions systems
- Sticky Messages
- Birthdays overview and removal tools
- Activity rankings and member stats
- community and server-management controls
- visible save/sync feedback in the dashboard
- public HTTPS control surface; localhost is not required
- GitHub Pages product website

---

## Member Control

The hosted dashboard only exposes servers the signed-in Discord user is allowed to manage and where Xenoxy is installed.

Main control areas include:

- guild configuration
- member lookup
- permission-aware moderation actions
- community systems
- verification and autorole
- welcome/goodbye flows
- logs and moderation toggles
- persisted settings
- dashboard audit/state data

The live dashboard target shown on the public website is **Mustikavesi**.

---

## Architecture

`bot.py` runs Xenoxy's Discord and control layers around the same persisted data model:

- Discord slash commands and events
- persistent Discord UI
- SQLite storage
- authenticated API
- hosted dashboard server
- Discord OAuth callback flow
- persistent web sessions
- permission-aware live member control

API endpoints remain protected by authentication. Public dashboard routes use Discord OAuth sessions and expose only manageable Discord servers.

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

Never commit bot tokens, Discord client secrets, OAuth secrets or Xenoxy API secrets to GitHub.

---

## Command layer

The website currently exposes the full **100-command** Xenoxy command database with searchable/copyable slash-command names.

Examples of the command systems represented in the current build include:

- utility and information commands
- fun/social commands
- moderation
- roles and channels
- welcome/goodbye setup
- autorole
- suggestions
- confessions
- birthdays
- sticky messages
- verification
- activity and member stats
- server health and server-management tools

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
V9.1     Control Expansion
V9.2     Member Control
```

---

## Website

The public Xenoxy site is the product/feature surface for V9.2. It includes:

- V9.2 Member Control hero/dashboard preview
- live feature overview
- 100-command searchable database
- architecture overview
- creator/contact section
- direct hosted-dashboard access
- responsive luxury cyber UI

Website source lives in this repository and is deployed with GitHub Pages.

---

## Tech

- Python
- discord.py
- aiohttp
- Discord OAuth2
- SQLite
- Discord Interactions / Slash Commands
- Discord UI Views
- HTML / CSS / JavaScript
- GitHub Pages

Built by **@kodaniq**.

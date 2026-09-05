# XENOXY V9.3 // MEMBER OPS

Xenoxy is a Discord server operating system built with Python and `discord.py`, combining a 100-command Discord layer, hosted web control, Discord OAuth, persistent SQLite state and permission-aware member operations in one control surface.

**Current build:** V9.3 // MEMBER OPS  
**Slash commands:** 100 / 100  
**Persistence:** SQLite (`xenoxy.db`)  
**Dashboard:** hosted Xenoxy Member Ops  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Hosting:** public HTTPS dashboard + 24/7 bot hosting

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V9.3 Member Ops

V9.3 upgrades Xenoxy's member-control layer into a fuller moderation and member-operations system while preserving the V8/V9 dashboard, OAuth and SQLite stack.

```text
Discord
  ↓
Discord OAuth2
  ↓
30-day restart-safe session
  ↓
Xenoxy Member Ops dashboard
  ↓
Permission + role hierarchy checks
  ↓
bot.py + 100 slash commands
  ↓
SQLite / xenoxy.db
  ↓
Live Discord server behavior
```

### Current V9.3 systems

- 100 global slash commands
- hosted Xenoxy Member Ops dashboard
- Discord OAuth2 login
- restart-safe rolling 30-day web sessions
- SQLite-backed guild settings and session persistence
- member search by username, display name or Discord ID
- expandable member profile panel
- account-created and server-joined information
- timeout state and role count
- timeout presets: 5m / 10m / 1h / 6h / 1d / 7d
- untimeout control
- nickname edit / clear
- role add and role remove
- kick and ban controls
- optional moderation reason
- Discord permission checks
- Discord role-hierarchy checks
- server-owner and Xenoxy self-protection
- SQLite moderation case history
- recent moderation case feed
- up to 250 moderation cases retained per server
- Welcome / Goodbye / Welcome DM configuration
- Autorole and Verification controls
- Logs, Rules and moderation settings
- Suggestions and Confessions systems
- Sticky Messages
- Birthdays with optional birth year
- Activity rankings and member stats
- visible save/sync feedback in the dashboard
- public HTTPS control surface; localhost is not required
- GitHub Pages product website with live bot telemetry

---

## Member Ops

The hosted dashboard only exposes servers the signed-in Discord user is allowed to manage and where Xenoxy is installed.

Member actions are checked server-side. The dashboard does not rely on the browser alone for moderation safety. Xenoxy verifies the acting user, the target member, Discord permissions and role hierarchy before applying supported actions.

Current member operations include:

- search and inspect members
- timeout / untimeout
- nickname changes
- role add / remove
- kick
- ban
- moderation reasons
- moderation case logging

---

## Dashboard architecture

`bot.py` runs Xenoxy's Discord, API and dashboard layers around the same persisted data model:

- Discord slash commands and events
- persistent Discord UI
- SQLite state storage
- authenticated control API
- hosted aiohttp dashboard
- Discord OAuth callback flow
- persistent web sessions
- permission-aware live member control
- moderation case storage and recent-case feed

The public product website reads Xenoxy's read-only `/api/health` endpoint for live runtime telemetry such as version, latency, uptime, server count, member count and loaded commands.

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

Xenoxy currently uses the full **100-command** global slash-command ceiling. New systems are therefore primarily added through dashboard controls, buttons, modals and existing command structures instead of casually adding more top-level commands.

The current command layer includes:

- utility and information
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

## Persistence

Xenoxy's main state lives in SQLite. Web login sessions are also stored in SQLite and use a rolling 30-day lifetime, so ordinary bot restarts do not log users out.

V9.3 also stores moderation cases in `xenoxy_mod_cases`, including the guild, target, actor, action, reason and timestamp. Recent cases are displayed in the dashboard Moderation tab.

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
V9.1     Audit / Control Expansion
V9.2     Member Control
V9.3     Member Ops
```

---

## Website

The public Xenoxy site is the product/feature surface for V9.3. It includes:

- V9.3 Member Ops hero/dashboard preview
- live runtime telemetry
- 100-command searchable database
- interactive local demo shell
- architecture overview
- creator/contact section
- direct hosted-dashboard access
- responsive dark neon cyber UI

### Contact

- Discord: `@kodaniq`
- Instagram: `@kodaniq` — Photos and random stuff
- GitHub: `kodaniq`

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

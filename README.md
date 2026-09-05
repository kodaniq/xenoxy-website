# XENOXY V10.0 // CONTROL PLATFORM

Xenoxy is a Discord server control platform built with Python and `discord.py`. It combines a full 100-command Discord layer, hosted OAuth dashboard, persistent SQLite state, live member operations, Automod, incident workflows, server analytics and platform diagnostics in one control surface.

**Current build:** V10.0 // CONTROL PLATFORM  
**Slash commands:** 100 / 100  
**Persistence:** SQLite (`xenoxy.db`)  
**Dashboard:** hosted Xenoxy Control Platform  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Hosting:** public HTTPS dashboard + 24/7 bot hosting

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V10.0 Control Platform

V10.0 turns Xenoxy from a feature-rich Discord bot into a unified control platform. The Discord bot, hosted dashboard, OAuth layer, SQLite data model, Automod, Incident Center, analytics and runtime diagnostics now operate as one system.

```text
Discord
  ↓
Discord OAuth2
  ↓
30-day restart-safe session
  ↓
Xenoxy Control Platform
  ├─ Member Ops
  ├─ Automod Engine
  ├─ Incident Center
  ├─ Server Analytics
  ├─ Ops Intelligence
  └─ System / Runtime Diagnostics
  ↓
Permission + role hierarchy checks
  ↓
bot.py + 100 slash commands
  ↓
SQLite / xenoxy.db
  ↓
Live Discord server behavior
```

### Current systems

- 100 global slash commands
- hosted Xenoxy Control Platform dashboard
- Discord OAuth2 login
- restart-safe rolling 30-day web sessions
- SQLite-backed guild settings and session persistence
- live public runtime telemetry
- permission-aware Member Ops
- member search by username, display name or Discord ID
- timeout / untimeout controls and presets
- nickname edit / clear
- role add / remove
- kick and ban controls
- moderation reasons and case history
- Discord permission and role-hierarchy checks
- Automod Engine with spam, repeat, mention, link/invite and caps detection
- LOW / MEDIUM / HIGH Automod sensitivity
- delete or delete + timeout Automod actions
- trusted role/channel bypass
- Incident Center with OPEN / ESCALATED / RESOLVED / IGNORED workflow
- incident severity and repeat-offender counts
- Ops Intelligence moderation counters and filtered audit feed
- Server Analytics with 24h / 7d / 30d activity
- joins, leaves and net growth
- activity trend, top channels and peak activity window
- Automod triggered-rule analytics
- System tab with platform health score
- latency, uptime, server, member and command telemetry
- SQLite health, database size and row counts
- runtime diagnostics stored in SQLite
- global slash-command error logging
- Welcome / Goodbye / Welcome DM configuration
- Autorole and Verification controls
- Logs, Rules and moderation settings
- Suggestions and Confessions systems
- Sticky Messages
- Birthdays with optional birth year
- Activity rankings and member stats
- public HTTPS control surface; localhost is not required
- GitHub Pages product website with live bot telemetry

---

## Control Platform

The hosted dashboard only exposes servers the signed-in Discord user is allowed to manage and where Xenoxy is installed.

Member and moderation actions are checked server-side. Xenoxy verifies the acting user, target member, Discord permissions and role hierarchy before supported actions are applied.

The platform is organized around five operational layers:

1. **Member Ops** — direct member search and moderation controls.
2. **Automod Engine** — automatic server protection and rule enforcement.
3. **Incident Center** — review, resolve, ignore and escalate Automod incidents.
4. **Server Analytics** — persistent activity, growth and moderation intelligence.
5. **System Core** — Xenoxy runtime, database and control-plane health.

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
- moderation case storage
- Automod incident storage
- persistent activity analytics
- runtime event diagnostics

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

Xenoxy uses the full **100-command** global slash-command ceiling. New systems therefore live primarily in the dashboard, buttons, modals and existing command structures instead of adding more top-level commands.

The command layer covers utility, information, fun/social commands, moderation, roles and channels, welcome/goodbye setup, autorole, suggestions, confessions, birthdays, sticky messages, verification, activity/member stats and server-management tools.

---

## Persistence

Xenoxy's main state lives in SQLite. Web login sessions are also stored in SQLite and use a rolling 30-day lifetime, so ordinary bot restarts do not log users out.

Operational data includes:

- `xenoxy_mod_cases` — moderation case history
- `xenoxy_automod_incidents` — Automod incidents and workflow state
- `xenoxy_activity_events` — persistent server activity analytics
- `xenoxy_member_events` — join/leave analytics
- `xenoxy_runtime_events` — platform/runtime diagnostics

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
V8.3     Public Dashboard
V8.4     Session Fortress
V8.5     Nexus Interface
V9.0     Control OS
V9.1     Audit / Control Expansion
V9.2     Member Control
V9.3     Member Ops
V9.4     Ops Intelligence
V9.5     Automod Engine
V9.6     Incident Center
V9.7     Server Analytics
V9.7.5   Control Panel Polish
V10.0    Control Platform
```

---

## Website

The public Xenoxy site is the product surface for V10.0. It includes:

- V10.0 Control Platform identity
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

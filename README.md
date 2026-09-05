# XENOXY V10.1 // COMMAND QA ENGINE

Xenoxy is a Discord server control platform built with Python and `discord.py`. It combines a full 100-command Discord layer, hosted OAuth dashboard, persistent SQLite state, Member Ops, Automod, Incident Center, Server Analytics, runtime diagnostics and a shared command-response system in one control surface.

**Current build:** V10.1 // COMMAND QA ENGINE  
**Slash commands:** 100 / 100 verified  
**Persistence:** SQLite (`xenoxy.db`)  
**Dashboard:** hosted Xenoxy Control Platform  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Hosting:** public HTTPS dashboard + 24/7 bot hosting

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V10.1 Command QA Engine

V10.1 is Xenoxy's command-quality release. It keeps the V10 Control Platform architecture and adds a shared response layer plus a full static audit of the command registry and user-facing command output.

### V10.1 QA results

- 100 / 100 direct slash commands verified
- 100 unique command names verified
- zero literal `\\n` sequences left in slash-command output blocks
- zero suspicious undefined ALL-CAPS constants found by the V10.1 static audit
- internal Python exception names are no longer intentionally exposed to users by the global command error handler
- shared `xenoxy_embed()` response layer
- shared `xenoxy_reply()` interaction-response layer
- consistent success / warning / error / info / brand colors
- permission, role-hierarchy, Discord API, missing-target and cooldown errors get user-readable responses
- original command exceptions are retained in runtime diagnostics instead of being dumped into the user-facing message

---

## Control Platform

```text
Discord
  ↓
Discord OAuth2
  ↓
30-day restart-safe session
  ↓
Xenoxy Control Platform
  ├─ Command QA Engine
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
- shared V10.1 command response system
- permission-aware Member Ops
- timeout / untimeout, nickname, role, kick and ban controls
- Discord permission and role-hierarchy checks
- Automod Engine with spam, repeat, mention, link/invite and caps detection
- Incident Center with OPEN / ESCALATED / RESOLVED / IGNORED workflow
- moderation case history and Ops Intelligence
- Server Analytics with 24h / 7d / 30d activity
- joins, leaves, net growth, top channels and peak activity
- System tab with platform health telemetry
- SQLite/runtime diagnostics and command error logging
- Welcome / Goodbye / Welcome DM configuration
- Autorole and Verification controls
- Suggestions, Confessions, Sticky Messages and Birthdays
- public HTTPS control surface; localhost is not required
- GitHub Pages product website with live bot telemetry

---

## Command layer

Xenoxy uses the full **100-command** global slash-command ceiling. V10.1 verified all 100 direct command names as unique and keeps future expansion focused on dashboard controls, existing command structures, buttons and modals rather than casually exceeding the top-level command ceiling.

The command layer covers utilities, information, fun/social commands, moderation, roles and channels, welcome/goodbye setup, autorole, suggestions, confessions, birthdays, sticky messages, verification, activity/member stats and server-management tools.

---

## Persistence

Xenoxy's main state lives in SQLite. Web sessions use a rolling 30-day lifetime so ordinary bot restarts do not log users out.

Operational tables include:

- `xenoxy_mod_cases` — moderation case history
- `xenoxy_automod_incidents` — Automod incidents and workflow state
- `xenoxy_activity_events` — persistent server activity analytics
- `xenoxy_member_events` — join/leave analytics
- `xenoxy_runtime_events` — platform/runtime diagnostics

Never commit bot tokens, Discord client secrets, OAuth secrets or Xenoxy API secrets to GitHub.

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
V10.0.1  Command Output Sanity Fix
V10.0.2  Command Error Hotfix
V10.1    Command QA Engine
```

---

## Website

The public Xenoxy site is the product surface for V10.1. It includes live runtime telemetry, a 100-command searchable database, interactive local terminal, architecture overview, creator/contact section, direct hosted-dashboard access and the existing responsive dark-neon Control Platform interface.

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

# XENOXY V10.3 // SMART AUTOMOD

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. It combines a verified 100-command Discord layer, Discord OAuth2 dashboard, persistent SQLite state, Member Ops, Security & Permissions, Smart Automod, Incident Center, Server Analytics, runtime diagnostics and live public telemetry in one control surface.

**Current build:** V10.3 // SMART AUTOMOD  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Dashboard:** hosted Xenoxy Control Platform  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** centralized permission + role-hierarchy preflight  
**Automod:** risk scoring + repeat-offender memory + proportional escalation  
**Hosting:** public HTTPS dashboard + 24/7 bot hosting

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V10.3 Smart Automod

V10.3 builds on the production-tested V10.2 Security & Permissions layer and upgrades Xenoxy's existing Automod from individual threshold checks into a risk-aware moderation system.

### Smart Automod core

- per-member runtime risk score
- risk decay over time so old behavior gradually matters less
- repeat-offender memory with recent rule history
- weighted rules for spam, repeated messages, mass mentions, links/invites and excessive caps
- repeated violations of the same rule receive an additional risk bonus
- risk levels: LOW / MEDIUM / HIGH / CRITICAL
- proportional escalation from delete-only behavior toward 10-minute and 1-hour timeouts at higher risk
- human-readable Smart Automod explanations containing rule, risk score, level and strike count
- Smart Automod runtime events for diagnostics
- existing trusted-role / trusted-channel behavior remains part of the Automod system
- existing Incident Center and legacy Automod enforcement remain available instead of being replaced by a separate command system

Smart Automod is intentionally implemented as a platform layer. Xenoxy stays at **100 top-level slash commands** rather than adding command spam for every new subsystem.

---

## V10.2 Security & Permissions

V10.2 introduced the centralized Security Guard that now sits underneath moderation operations.

### Security Guard

- actor permission preflight
- Xenoxy/bot permission preflight
- server-owner protection
- self-target protection where applicable
- target role-hierarchy checks
- Xenoxy role-hierarchy checks
- role safety for managed roles and `@everyone`
- clean ephemeral security responses instead of exposing Discord/Python internals
- security allow/deny events in runtime diagnostics

Production tests confirmed that owner and higher-role `/ban` attempts are rejected by Xenoxy before the Discord API call, preventing the old raw `403 Missing Permissions` workflow.

---

## V10.1 Command QA foundation

The V10.1 command-quality layer is still part of the current platform:

- 100 / 100 direct slash commands verified
- 100 unique command names
- shared `xenoxy_embed()` response layer
- shared `xenoxy_reply()` interaction-response layer
- consistent success / warning / error / info / brand responses
- user-readable permission, hierarchy, Discord API, missing-target and cooldown errors
- original exceptions retained in runtime diagnostics rather than intentionally exposed to users
- command-output sanity cleanup

---

## Control Platform architecture

```text
Discord users / moderators
          ↓
100 slash commands + Discord interactions
          ↓
V10.2 Security & Permissions preflight
          ↓
V10.3 Smart Automod / Member Ops / Server Systems
          ↓
Incident Center + Ops Intelligence + Server Analytics
          ↓
SQLite persistence + runtime diagnostics
          ↓
Authenticated aiohttp Control API
          ↓
Discord OAuth2 + restart-safe 30-day web sessions
          ↓
Hosted Xenoxy Control Platform dashboard
          ↓
Public GitHub Pages product site + live telemetry
```

### Current systems

- 100 global slash commands
- shared command-response system
- Security Guard and role-hierarchy protection
- Smart Automod risk engine
- spam / repeat / mass mention / link-invite / caps detection
- repeat-offender memory and risk decay
- proportional Automod escalation
- Incident Center with OPEN / ESCALATED / RESOLVED / IGNORED workflow
- Member Ops with timeout, untimeout, nickname, role, kick and ban controls
- moderation case history and Ops Intelligence
- Server Analytics with 24h / 7d / 30d activity
- joins, leaves, net growth, top channels and peak activity
- hosted OAuth dashboard
- restart-safe rolling 30-day web sessions
- SQLite-backed guild settings and persistence
- live public runtime telemetry
- authenticated Control API
- Welcome / Goodbye / Welcome DM configuration
- Autorole and Verification controls
- Suggestions, Confessions, Sticky Messages and Birthdays
- public HTTPS control surface; localhost is not required
- interactive website terminal with safe local/demo commands

---

## Command layer

Xenoxy intentionally uses the full **100-command** top-level slash-command set. Future platform expansion is focused on smarter internals, dashboard controls, buttons, modals and existing command structures instead of casually exceeding the global command registry design.

The command layer covers information, utilities, fun/social features, moderation, roles, channels, server setup, welcome/goodbye, autorole, suggestions, confessions, birthdays, sticky messages, verification, activity/member statistics and server-management tools.

Moderation actions are protected by Xenoxy's own preflight layer before Discord API execution whenever supported by the action.

---

## Persistence and data

Xenoxy's main state lives in SQLite. The original compatibility state store preserves guild configuration while newer platform systems use dedicated operational tables.

Operational data includes:

- `xenoxy_state` — primary compatibility state
- `xenoxy_meta` — database metadata
- `xenoxy_web_sessions` — persistent OAuth web sessions
- `xenoxy_mod_cases` — moderation case history
- `xenoxy_automod_incidents` — Automod incidents and workflow state
- `xenoxy_activity_events` — persistent server message/activity analytics
- `xenoxy_member_events` — join/leave analytics
- `xenoxy_runtime_events` — runtime/platform diagnostics

Web sessions use a rolling 30-day lifetime so ordinary bot restarts and redeploys do not automatically log users out while the database persists.

---

## API and live telemetry

The bot hosts its own `aiohttp` web/API layer. The public health endpoint powers the GitHub Pages live status UI and exposes non-secret runtime health information such as:

- current Xenoxy version and core
- bot-ready state
- guild count
- visible member count
- slash-command count
- Discord gateway latency
- runtime uptime
- dashboard availability

Authenticated control routes remain separate from the public health endpoint.

The GitHub Pages frontend is static HTML/CSS/JavaScript; live backend behavior comes from the hosted Xenoxy API rather than putting secrets or server-side bot logic into GitHub Pages.

---

## Website

The public Xenoxy website is the product surface for the Control Platform. It includes:

- live bot/API telemetry
- searchable 100-command database
- interactive local terminal with autocomplete/history
- safe demo commands for health, latency, guilds, members, version/core, security, Automod, incidents, analytics and architecture
- moderation commands intentionally blocked from execution in the public terminal
- architecture and systems overview
- direct hosted-dashboard access
- creator/contact section
- responsive dark/neon purple interface

GitHub Pages publishes the static website from this repository; the Xenoxy bot/API itself is hosted separately.

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
V10.1.1  Telemetry Recovery
V10.1.2  Startup Hotfix
V10.2    Security & Permissions
V10.3    Smart Automod
```

---

## Tech stack

- Python 3.14
- discord.py
- aiohttp
- Discord Interactions / Slash Commands
- Discord UI Views
- Discord OAuth2
- SQLite
- HTML
- CSS
- JavaScript
- GitHub Pages

---

## Security notes

Never commit or expose:

- Discord bot tokens
- Discord OAuth client secrets
- Xenoxy API secrets
- session secrets
- private environment values

The public website should consume only intentionally public API data. Sensitive moderation/control operations belong behind authenticated backend routes.

---

## Contact

- Discord: `@kodaniq`
- Instagram: `@kodaniq` — Photos and random stuff
- GitHub: `kodaniq`

Built by **@kodaniq**.
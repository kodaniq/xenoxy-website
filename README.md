# XENOXY V11.3 // DASHBOARD 2.0

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. V11.3 makes the Nexus Intelligence + Automation stack directly controllable from the OAuth dashboard while preserving the verified 100-command Discord layer.

**Current build:** V11.3 // DASHBOARD 2.0  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** Security Guard + OAuth guild authorization  
**Automod:** Smart Automod risk engine + escalation  
**Intelligence:** health history + 24h trends + risk overview + recommendations  
**Automation:** guild-scoped rules + cooldowns + SQLite audit trail + safe default OFF  
**Dashboard 2.0:** Automation Center + live Intelligence + audit view

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V11.3 Dashboard 2.0

V11.3 exposes the V11.1/V11.2 systems through a new Nexus Automation Center in the hosted OAuth dashboard.

### Nexus Automation Center

- Master Automation ON/OFF
- configurable Nexus health threshold
- configurable gateway-latency threshold
- configurable automation cooldown
- Critical Risk Incident toggle
- live Nexus health/intelligence summary
- 24-hour health and latency deltas
- Smart Automod critical-risk overview
- Nexus recommendations
- recent Automation Audit events
- Save Automation directly into SQLite-backed guild configuration
- OAuth session required
- guild must be manageable by the authenticated Discord user
- no nested form regression: Dashboard 2.0 saves through dedicated fetch/PUT flow
- no new top-level slash commands; Xenoxy remains 100 / 100

### Dashboard 2.0 routes

```text
GET /dashboard2/{guild_id}
PUT /dashboard2/{guild_id}/automation
```

Both routes require an authenticated Xenoxy web session and verify that the selected guild is manageable by the current Discord user.

---

## V11.2 Nexus Automation

V11.2 introduced guild-scoped automation configuration, safe default OFF, low-health/high-latency/critical-risk triggers, cooldown protection and persistent automation audit events.

Default policy:

```text
Automation enabled       false
Health alert below       70
Latency alert above      500 ms
Critical-risk incident   true
Cooldown                 900 seconds
```

## V11.1 Nexus Intelligence

Persistent Nexus health snapshots, 24-hour trends, Smart Automod server-wide risk overview and recommendations.

## V11.0 Nexus

Unified runtime snapshot, weighted 0–100 platform health, subsystem readiness and Smart Automod risk bridge.

## V10 foundations

V10.3 Smart Automod provides weighted risk, decay, repeat-offender memory and proportional escalation. V10.2 Security Guard provides owner protection, permission preflight and role-hierarchy safety. V10.1 Command QA keeps the complete 100/100 command layer verified.

---

## Architecture

```text
Discord users / moderators
          ↓
100 slash commands + interactions
          ↓
Security Guard
          ↓
Smart Automod + Member Ops + Server Systems
          ↓
Incident Center + Ops Intelligence + Server Analytics
          ↓
Nexus Runtime
          ↓
Nexus Intelligence
          ├─ health history
          ├─ 24h trends
          ├─ risk overview
          └─ recommendations
          ↓
Nexus Automation
          ├─ guild policy
          ├─ safe triggers
          ├─ cooldowns
          └─ audit events
          ↓
V11.3 Dashboard 2.0
          ├─ Automation Center
          ├─ live Intelligence
          ├─ recommendations
          └─ Automation Audit
          ↓
SQLite + aiohttp Control API
          ↓
Discord OAuth2 + persistent sessions
          ↓
Hosted dashboard + GitHub Pages telemetry
```

---

## SQLite

Operational data includes state/meta, OAuth sessions, moderation cases, Automod incidents, analytics events, runtime events, Nexus snapshots, `xenoxy_automation_rules` and `xenoxy_automation_events`.

Dashboard 2.0 writes automation policy through the existing SQLite-backed V11.2 automation layer rather than introducing a second configuration source.

---

## Public telemetry

`/api/health` continues to power the public product website with intentionally public version/core/readiness/count/latency/uptime, Nexus Intelligence and compact automation state. Private dashboard configuration remains behind OAuth authorization.

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
V9.2     Member Control
V9.3     Member Ops
V9.4     Ops Intelligence
V9.5     Automod Engine
V9.6     Incident Center
V9.7     Server Analytics
V10.0    Control Platform
V10.1    Command QA Engine
V10.1.1  Telemetry Recovery
V10.1.2  Startup Hotfix
V10.2    Security & Permissions
V10.3    Smart Automod
V11.0    Nexus
V11.1    Nexus Intelligence
V11.2    Nexus Automation
V11.3    Dashboard 2.0
```

## Tech stack

Python 3.14 • discord.py • aiohttp • Discord Interactions • Discord OAuth2 • SQLite • HTML • CSS • JavaScript • GitHub Pages

## Security

Never expose Discord bot tokens, OAuth client secrets, Xenoxy API secrets, session secrets or private environment values. Public frontend code consumes only intentionally public telemetry.

## Contact

- Discord: `@kodaniq`
- Instagram: `@kodaniq` — Photos and random stuff
- GitHub: `kodaniq`

Built by **@kodaniq**.
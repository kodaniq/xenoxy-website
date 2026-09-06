# XENOXY V11.2 // NEXUS AUTOMATION

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. V11.2 adds a safe, auditable automation layer on top of Nexus Intelligence, Security Guard, Smart Automod, OAuth, SQLite, Member Ops, Incident Center, Server Analytics and the verified 100-command Discord layer.

**Current build:** V11.2 // NEXUS AUTOMATION  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** centralized permission + role-hierarchy preflight  
**Automod:** risk scoring + repeat-offender memory + proportional escalation  
**Intelligence:** persistent health history + 24h trends + risk overview + recommendations  
**Automation:** guild-scoped rules + cooldowns + SQLite audit trail + safe default OFF

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V11.2 Nexus Automation

V11.2 connects the intelligence layer to a controlled automation engine. Automation is deliberately opt-in: every guild starts with the master automation switch disabled.

### Automation engine

- guild-scoped automation configuration
- master enable/disable state
- safe default: OFF
- low Nexus-health trigger
- high gateway-latency trigger
- critical Smart Automod risk trigger
- configurable health and latency thresholds
- configurable cooldowns to prevent repeated alert spam
- persistent automation event/audit history
- 30-day automation-event retention
- runtime diagnostic events for automation triggers/errors
- public telemetry exposes only a compact non-secret automation summary
- no new top-level slash commands; Xenoxy remains 100 / 100

### Default policy

```text
Automation enabled       false
Health alert below       70
Latency alert above      500 ms
Critical-risk incident   true
Cooldown                 900 seconds
```

The engine does not blindly perform destructive moderation actions. V11.2 focuses on safe triggers, alert/incident workflow foundations, auditability and admin-controlled configuration.

---

## V11.1 Nexus Intelligence

V11.1 introduced persistent Nexus health snapshots, 30-day retention, 24-hour health/latency/member trends, Smart Automod server-wide risk overview and a recommendation engine.

## V11.0 Nexus

V11.0 introduced the unified runtime snapshot, weighted 0–100 health score, capability checks, Security Guard readiness, Smart Automod readiness and the member-risk bridge.

## V10 foundations

V10.3 Smart Automod provides weighted risk, decay, repeat-offender memory and proportional escalation. V10.2 Security Guard provides owner protection, actor/bot permission preflight and role-hierarchy safety. V10.1 Command QA keeps the full 100/100 command layer verified and consistent.

---

## Architecture

```text
Discord users / moderators
          ↓
100 slash commands + Discord interactions
          ↓
Security Guard / role-hierarchy preflight
          ↓
Smart Automod + Member Ops + Server Systems
          ↓
Incident Center + Ops Intelligence + Server Analytics
          ↓
Nexus runtime health
          ↓
Nexus Intelligence
          ├─ persistent health history
          ├─ 24h trends
          ├─ risk overview
          └─ recommendations
          ↓
V11.2 Nexus Automation
          ├─ guild rules
          ├─ safe triggers
          ├─ cooldowns
          └─ audit events
          ↓
SQLite persistence + runtime diagnostics
          ↓
Authenticated aiohttp Control API
          ↓
Discord OAuth2 + restart-safe sessions
          ↓
Hosted dashboard + GitHub Pages telemetry
```

---

## SQLite data

Core operational tables include `xenoxy_state`, `xenoxy_meta`, `xenoxy_web_sessions`, `xenoxy_mod_cases`, `xenoxy_automod_incidents`, `xenoxy_activity_events`, `xenoxy_member_events`, `xenoxy_runtime_events`, `xenoxy_nexus_snapshots`, plus V11.2 `xenoxy_automation_rules` and `xenoxy_automation_events`.

---

## Public telemetry

`/api/health` powers the product website and exposes intentionally public runtime data such as version/core, readiness, counts, latency, uptime, Nexus health, Intelligence trends/risk/recommendations and the compact `nexus_automation` summary. Automation configuration details and authenticated control operations remain server-side.

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
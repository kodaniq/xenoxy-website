# XENOXY V11.4 // RULE BUILDER + ANALYTICS

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. V11.4 adds a no-code Rule Builder plus persistent message and voice analytics while preserving the verified 100-command Discord layer.

**Current build:** V11.4 // RULE BUILDER + ANALYTICS  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** Security Guard + OAuth guild authorization  
**Automod:** Smart Automod risk engine + escalation  
**Intelligence:** health history + 24h trends + risk overview + recommendations  
**Automation:** guild-scoped policies + custom safe rules + cooldowns + SQLite audit trail  
**Analytics:** message counts + top message members + persistent voice-time tracking  
**Dashboard:** Dashboard 2.0 + Rule Builder + Analytics

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V11.4 Rule Builder + Analytics

V11.4 turns the V11.2/V11.3 automation foundation into a running automation system and expands server analytics with message and voice activity.

### Rule Builder

Custom OAuth-protected rules can use these triggers:

- Nexus health below threshold
- gateway latency above threshold
- critical Smart Automod risk count
- messages in five minutes above threshold

Safe actions currently include `audit_alert` and `incident_alert`. Rules have configurable thresholds, cooldowns and priorities, are stored in SQLite, and execution history is persisted. The background automation cycle runs every 60 seconds.

### Message analytics

- existing 24h / 7d / 30d message totals
- top channels and peak activity
- top message members over 7 days
- five-minute message volume available to Rule Builder

### Voice analytics

- voice join / leave / channel-move tracking
- persistent voice sessions in SQLite
- 24h / 7d / 30d voice-time totals
- currently active voice users
- unique voice users over 7 days
- top voice members
- top voice channels
- active sessions reconciled when Xenoxy starts

Voice history begins collecting from the V11.4 deployment; earlier voice activity is not backfilled.

### V11.4 authenticated routes

```text
GET    /v114/{guild_id}/rules
POST   /v114/{guild_id}/rules
DELETE /v114/{guild_id}/rules/{rule_id}
GET    /v114/{guild_id}/analytics
```

These routes require the persistent OAuth web session and verify that the selected guild is manageable by the authenticated Discord user.

---

## V11.3 Dashboard 2.0

Dashboard 2.0 exposes Nexus Intelligence and guild automation policy through the hosted OAuth dashboard. The V11.4 build also fixes Dashboard 2.0 session authorization to use the persistent session implementation and keeps guild-specific panels out of the pre-selection server screen.

## V11.2 Nexus Automation

Guild-scoped automation configuration, safe default OFF, low-health/high-latency/critical-risk triggers, cooldown protection and persistent audit events.

## V11.1 Nexus Intelligence

Persistent Nexus health snapshots, 24-hour trends, Smart Automod server-wide risk overview and recommendations.

## V11.0 Nexus

Unified runtime snapshot, weighted 0–100 platform health, subsystem readiness and Smart Automod risk bridge.

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
Incident Center + Ops Intelligence
          ↓
Message Analytics + Voice Analytics
          ↓
Nexus Runtime + Nexus Intelligence
          ↓
Nexus Automation
          ├─ guild policy
          ├─ 60s automation cycle
          ├─ custom Rule Builder
          ├─ cooldowns
          └─ audit / execution history
          ↓
Dashboard 2.0 + Rule Builder + Analytics
          ↓
SQLite + aiohttp Control API
          ↓
Discord OAuth2 + persistent sessions
          ↓
Hosted dashboard + GitHub Pages telemetry
```

---

## SQLite

Operational data includes state/meta, OAuth sessions, moderation cases, Automod incidents, message/member analytics events, runtime events, Nexus snapshots, automation policies/events and V11.4 tables:

- `xenoxy_automation_custom_rules`
- `xenoxy_rule_executions`
- `xenoxy_voice_events`

## Public telemetry

`/api/health` powers the public website with intentionally public version/core/readiness/count/latency/uptime, Nexus Intelligence and compact automation state. Guild configuration, custom rules and detailed analytics remain behind OAuth authorization.

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
V11.4    Rule Builder + Analytics
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
# XENOXY V11.5 // MEMBER INTELLIGENCE

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. V11.5 turns the V11.4 message + voice analytics foundation into per-member intelligence profiles, activity heatmaps and leaderboards while preserving the verified 100-command Discord layer.

**Current build:** V11.5 // MEMBER INTELLIGENCE  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** Security Guard + OAuth guild authorization  
**Automod:** Smart Automod risk engine + escalation  
**Intelligence:** Nexus health + member-level activity intelligence  
**Automation:** Rule Builder + safe guild automation + cooldowns + audit history  
**Analytics:** message + persistent voice-time tracking  
**Member Intelligence:** per-member profiles + activity score + heatmap + leaderboards

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V11.5 Member Intelligence

V11.5 builds member-level intelligence on top of Xenoxy's existing analytics data.

### Member profiles

Each dashboard member profile can expose:

- messages in the last 24h / 7d / 30d
- voice time in the last 24h / 7d / 30d
- top text channel
- top voice channel
- current Smart Automod risk
- moderation case count
- activity score from message + voice engagement
- 30-day message activity heatmap by weekday/hour (UTC)

The activity score is an engagement metric only; moderation risk is displayed separately rather than being mixed into the activity score.

### Leaderboards

- Top Texters • 7D
- Top Voice • 7D
- Overall Activity
- bot accounts excluded

### V11.5 authenticated routes

```text
GET /v115/{guild_id}/members/{user_id}
GET /v115/{guild_id}/leaderboards
```

Both routes require the persistent OAuth web session and verify that the selected guild is manageable by the authenticated Discord user.

---

## V11.4 Rule Builder + Analytics

V11.4 introduced custom safe automation rules, a running 60-second automation cycle, message analytics and persistent voice join/leave/channel-move tracking.

Voice history begins collecting from the V11.4 deployment; earlier voice activity is not backfilled.

## V11.3 Dashboard 2.0

Dashboard 2.0 exposes Nexus Intelligence and guild automation policy through the hosted OAuth dashboard.

## V11.2 Nexus Automation

Guild-scoped automation configuration, safe default OFF, health/latency/risk triggers, cooldown protection and persistent audit events.

## V11.1 Nexus Intelligence

Persistent Nexus health snapshots, 24-hour trends, Smart Automod server-wide risk overview and recommendations.

---

## Architecture

```text
Discord users / moderators
          ↓
100 slash commands + interactions
          ↓
Security Guard
          ↓
Smart Automod + Member Ops
          ↓
Message Analytics + Voice Analytics
          ↓
V11.5 Member Intelligence
          ├─ member profiles
          ├─ activity score
          ├─ 30d heatmap
          └─ leaderboards
          ↓
Nexus Intelligence + Rule Builder
          ↓
Dashboard 2.0
          ↓
SQLite + aiohttp Control API
          ↓
Discord OAuth2 + persistent sessions
          ↓
Hosted dashboard + GitHub Pages telemetry
```

---

## SQLite

Operational data includes state/meta, OAuth sessions, moderation cases, Automod incidents, message/member analytics events, runtime events, Nexus snapshots, automation policies/events, custom rules, rule executions and voice sessions.

V11.5 derives member intelligence from the existing message and voice analytics stores rather than creating duplicate activity storage.

## Public telemetry

`/api/health` powers the public website with intentionally public version/core/readiness/count/latency/uptime plus Nexus/automation summaries. Detailed member intelligence remains behind OAuth authorization.

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
V11.5    Member Intelligence
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
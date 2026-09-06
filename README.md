# XENOXY V11.6 // ADVANCED ANALYTICS

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. V11.6 upgrades the analytics stack into full server intelligence while preserving Member Intelligence, Rule Builder, Security Guard and the verified 100-command Discord layer.

**Current build:** V11.6 // ADVANCED ANALYTICS  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** Security Guard + OAuth guild authorization  
**Automod:** Smart Automod risk engine + escalation  
**Automation:** Nexus Automation + Rule Builder + cooldowns + SQLite audit history  
**Member Intelligence:** message/voice profiles + activity score + per-member heatmaps + leaderboards  
**Advanced Analytics:** server heatmap + daily trends + engagement + growth + retention + Server Activity Score

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V11.6 Advanced Analytics

V11.6 builds a server-wide intelligence layer on top of the message, member and persistent voice data already collected by Xenoxy.

### Server activity heatmap

- 7 weekdays × 24 hours
- rolling 30-day message activity
- UTC-based hourly distribution
- shows when the server is actually active

### Message + voice trends

- 14-day daily message series
- 14-day daily voice-time series
- rolling 7-day engagement comparisons
- current 7 days vs previous 7 days
- automatic `GROWING`, `STABLE` or `DECLINING` state

### Member engagement

- active members over the last 7 days
- inactive members over the last 7 days
- active-member percentage
- bots excluded
- activity can come from text or voice

### New-member retention

- members who joined during the last 30 days
- how many were active during the recent activity window
- retention percentage

### Server Activity Score

A 0–100 engagement score combines:

- active-member rate
- message growth
- voice growth
- recent-member retention

The score measures activity and engagement, not moderation quality.

### V11.6 authenticated route

```text
GET /v116/{guild_id}/analytics
```

The route requires a persistent OAuth web session and verifies that the selected guild is manageable by the authenticated Discord user.

---

## V11.5 Member Intelligence

Per-member message + voice profiles, 24h/7d/30d activity, top channels, Smart Automod risk, moderation case count, activity scores, 30-day member heatmaps and leaderboards.

## V11.4 Rule Builder + Analytics

Custom safe automation rules, a running automation cycle, message analytics and persistent voice join/leave/channel-move tracking.

Voice history begins collecting from the V11.4 deployment; activity before that point is not backfilled.

## V11.3 Dashboard 2.0

OAuth control surface for Nexus Intelligence and guild automation configuration.

---

## Architecture

```text
Discord users / moderators
          ↓
100 slash commands + interactions
          ↓
Security Guard + Smart Automod
          ↓
Message Analytics + Voice Analytics
          ↓
Member Intelligence
          ├─ member profiles
          ├─ member heatmaps
          ├─ activity scores
          └─ leaderboards
          ↓
V11.6 Advanced Analytics
          ├─ server 7×24 heatmap
          ├─ 14d message trend
          ├─ 14d voice trend
          ├─ active / inactive members
          ├─ 7d growth comparison
          ├─ new-member retention
          └─ Server Activity Score
          ↓
Nexus Intelligence + Automation + Rule Builder
          ↓
Dashboard 2.0
          ↓
SQLite + aiohttp Control API
          ↓
Discord OAuth2 + persistent sessions
```

---

## SQLite

Xenoxy keeps state, OAuth sessions, moderation cases, Automod incidents, message/member activity events, voice sessions, Nexus snapshots, automation rules and execution history in SQLite.

V11.6 derives its Advanced Analytics from the existing event stores instead of duplicating activity data.

## Public telemetry

`/api/health` powers the public website with intentionally public runtime/version/health information. Detailed guild analytics, Member Intelligence and custom automation configuration remain behind OAuth authorization.

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
V11.6    Advanced Analytics
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
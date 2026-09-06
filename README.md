# XENOXY V11.1 // NEXUS INTELLIGENCE

Xenoxy is a hosted Discord server control platform built with Python and `discord.py`. V11.1 adds a persistent intelligence layer on top of the 100-command Discord system, Security Guard, Smart Automod, OAuth dashboard, SQLite persistence, Member Ops, Incident Center, Server Analytics and live telemetry.

**Current build:** V11.1 // NEXUS INTELLIGENCE  
**Slash commands:** 100 / 100 verified and unique  
**Persistence:** SQLite (`xenoxy.db`)  
**Authentication:** Discord OAuth2  
**Web sessions:** restart-safe rolling 30-day SQLite sessions  
**Security:** centralized permission + role-hierarchy preflight  
**Automod:** risk scoring + repeat-offender memory + proportional escalation  
**Nexus Intelligence:** persistent health history + 24h trends + risk overview + recommendations  

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## V11.1 Nexus Intelligence

V11.1 turns the V11 Nexus runtime layer into a persistent intelligence system instead of only reporting the current state.

### Intelligence layer

- persistent Nexus health snapshots in SQLite
- snapshot throttling: maximum one intelligence snapshot every 5 minutes
- 30-day snapshot retention
- 24-hour health history
- health-score delta analysis
- gateway-latency delta analysis
- visible-member delta analysis
- Smart Automod server-wide risk overview
- tracked-member count
- average runtime risk
- HIGH and CRITICAL risk counts
- recommendation engine for command-registry integrity, gateway latency, database state, Security Guard, Smart Automod, critical member risk and health degradation
- compact Nexus Intelligence payload in the public health telemetry
- no new top-level slash commands; Xenoxy remains 100 / 100

### Nexus health model

```text
Discord readiness      30 points
SQLite readiness       25 points
100-command integrity  20 points
Gateway latency        15 points
Smart Automod loaded   10 points
                       ---------
                       100 total
```

Health states remain `EXCELLENT`, `HEALTHY`, `DEGRADED` and `CRITICAL`.

---

## Platform foundations

### V11.0 Nexus

V11.0 introduced the unified runtime snapshot, weighted platform health score, Discord/SQLite/command/latency capability checks, Security Guard readiness, Smart Automod readiness and member-risk bridge.

### V10.3 Smart Automod

- per-member runtime risk score
- risk decay over time
- repeat-offender memory and recent rule history
- weighted spam, repeat, mention, link/invite and caps rules
- LOW / MEDIUM / HIGH / CRITICAL risk levels
- proportional escalation toward 10-minute and 1-hour timeouts
- Smart Automod runtime events
- trusted roles/channels and Incident Center compatibility

### V10.2 Security & Permissions

- actor and Xenoxy permission preflight
- server-owner protection
- self-target protection where applicable
- role-hierarchy checks
- managed-role and `@everyone` safety
- clean ephemeral denial responses
- security allow/deny runtime diagnostics

Production tests confirmed owner and higher-role `/ban` attempts are blocked before Discord returns raw permission failures.

### V10.1 Command QA

- 100 / 100 direct slash commands verified
- 100 unique command names
- shared `xenoxy_embed()` / `xenoxy_reply()` response layer
- consistent user-readable errors
- original exceptions retained in diagnostics
- command-output sanity cleanup

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
V11 Nexus runtime health layer
          ↓
V11.1 Nexus Intelligence
          ├─ persistent health snapshots
          ├─ 24h trends
          ├─ server-wide risk overview
          └─ recommendations
          ↓
SQLite persistence + runtime diagnostics
          ↓
Authenticated aiohttp Control API
          ↓
Discord OAuth2 + restart-safe web sessions
          ↓
Hosted Xenoxy dashboard
          ↓
GitHub Pages product site + public live telemetry
```

---

## Persistence

Operational SQLite data includes:

- `xenoxy_state` — compatibility state and guild configuration
- `xenoxy_meta` — database metadata
- `xenoxy_web_sessions` — persistent OAuth sessions
- `xenoxy_mod_cases` — moderation case history
- `xenoxy_automod_incidents` — Automod incidents/workflow state
- `xenoxy_activity_events` — message/activity analytics
- `xenoxy_member_events` — join/leave analytics
- `xenoxy_runtime_events` — runtime diagnostics
- `xenoxy_nexus_snapshots` — V11.1 health/intelligence history

---

## API and telemetry

The bot hosts its own `aiohttp` API. The public health endpoint powers the GitHub Pages telemetry and can expose intentionally public runtime data including version/core, readiness, guild/member/command counts, latency, uptime, Nexus health score/state, subsystem readiness and V11.1 Nexus Intelligence trends/risk/recommendations.

Authenticated control routes remain separate. Bot tokens, OAuth client secrets, API secrets and session secrets must never be exposed to the static frontend.

---

## Website terminal

The public terminal is a safe local/demo shell. It can inspect public telemetry and explain Xenoxy systems, but moderation/destructive commands are intentionally blocked from execution.

V11.1 terminal coverage includes Nexus Intelligence, health score, trends, recommendations, risk, telemetry, Security Guard, Smart Automod, incidents, analytics, OAuth, SQLite and architecture information.

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
```

---

## Tech stack

Python 3.14 • discord.py • aiohttp • Discord Interactions • Discord OAuth2 • SQLite • HTML • CSS • JavaScript • GitHub Pages

## Contact

- Discord: `@kodaniq`
- Instagram: `@kodaniq` — Photos and random stuff
- GitHub: `kodaniq`

Built by **@kodaniq**.
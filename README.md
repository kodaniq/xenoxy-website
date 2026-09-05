# XENOXY V8.3 // PUBLIC DASHBOARD

Xenoxy on Pythoni ja `discord.py` peal ehitatud Discord management bot/platform.

Praegune build: **V8.3 // PUBLIC DASHBOARD**  
Slash commande: **100 / 100**  
Persistence: **SQLite (`xenoxy.db`)**  
Dashboard: **Discord OAuth + public hosted control center**

Website: https://kodaniq.github.io/xenoxy-website/

Public dashboard: https://4jeo6afdee.apps.bot-hosting.cloud/

---

## Mis V8.3-s uut on?

V8.3 eemaldab localhost-only dashboard workflow.

Dashboard jookseb nüüd samas hostitud Xenoxy protsessis, kus bot ja control API. See tähendab, et eraldi `py dashboard.py` protsessi pole enam vaja.

```text
Browser
    ↓
Public Xenoxy HTTPS domain
    ↓
Discord OAuth2
    ↓
Server select
    ↓
Xenoxy V8.3 Public Dashboard
    ↓
Xenoxy bot.py
    ↓
xenoxy.db
    ↓
Discord server behavior changes
```

Dashboard näitab ainult servereid, kus kasutajal on Owner, Administrator või Manage Server õigus ja kus Xenoxy bot on olemas.

### Dashboard controls

- Welcome channel + ON/OFF
- Welcome message
- Welcome thumbnail: Xenoxy / Server Icon / Off
- Welcome DM + message
- Goodbye channel + ON/OFF
- Goodbye message
- Suggestion channel
- Confession channel
- Autorole
- Verification channel + role
- Log channel
- Rules channel
- Anti-spam toggle
- Anti-links toggle
- Premium custom toggle UI
- Public Discord OAuth login
- Public server selector

---

## V8.3 architecture

`bot.py` jooksutab nüüd korraga:

- 100 slash-commandi
- Discord evente
- persistent UI-d
- SQLite storage'i
- authenticated API-t
- public dashboard web serverit
- Discord OAuth callback flow'd

```text
Discord → OAuth → Hosted Dashboard → Xenoxy → SQLite → Discord
```

API endpointid jäävad Bearer secretiga kaitstuks. Public web routes kasutavad Discord OAuth sessionit.

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
XENOXY_WEB_SESSION_SECRET=...
```

`XENOXY_WEB_SESSION_SECRET` võib olla suvaline pikk random secret. Seda ei tohi frontendile ega GitHubi commitida.

Discord Developer Portal OAuth2 Redirects peab sisaldama täpselt:

```text
https://4jeo6afdee.apps.bot-hosting.cloud/callback
```

---

## Xenoxy systems

V8.3 sisaldab muu hulgas moderationit, welcome/goodbye süsteemi, welcome DM configuratorit, suggestions + managementi, anonymous confessions süsteemi, birthdays, activity/member stats, server health/age, role menu, reaction/button roles, verification, sticky messages, embed builderit, backups, autorole'i, logs, polls/utilities, SQLite persistence'i, Discord OAuth dashboardi ja authenticated control API-t.

Website'i command database sisaldab kõiki **100 slash-commandi**.

---

## Xenoxy progression

```text
V1       basic slash commands
V3       welcome / logs / XP
V5       83 commands
V6       98 commands
V7       100 commands
V7.5     DM configurator
V7.8     Community Core
V8.0     SQLite Database Core
V8.1     Full Control Core
V8.2     Dashboard Expansion
V8.3     Public Dashboard
```

## Tech

- Python
- discord.py
- aiohttp
- Discord OAuth2
- SQLite
- Discord Interactions / Slash Commands
- Discord UI Views
- GitHub Pages

Built by **@kodaniq**.

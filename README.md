# XENOXY V8.2 // DASHBOARD EXPANSION

Xenoxy on Pythoni ja `discord.py` peal ehitatud Discord management bot/platform.

Praegune build: **V8.2 // DASHBOARD EXPANSION**  
Slash commande: **100 / 100**  
Persistence: **SQLite (`xenoxy.db`)**  
Dashboard: **Discord OAuth + authenticated live control API**

Website: https://kodaniq.github.io/xenoxy-website/

---

## Mis V8.2-s uut on?

V8.2 laiendab V8.1 Full Control Core'i dashboardi päris server control centeriks.

```text
Discord admin
    ↓
Login with Discord (OAuth2)
    ↓
Server select
    ↓
Xenoxy V8.2 Web Dashboard
    ↓
Authenticated Control API
    ↓
Xenoxy bot.py
    ↓
xenoxy.db
    ↓
Discord server behavior changes
```

Dashboard kasutab päris Discord serveri channel'e, role'e ja live Xenoxy settinguid. Save muudatused liiguvad bot API kaudu samasse SQLite datasüsteemi, mida bot ise kasutab.

### Dashboard controls

- Welcome channel + ON/OFF
- Welcome message
- Welcome DM + message
- Goodbye channel + ON/OFF
- Goodbye message
- Suggestion channel
- Confession channel
- Autorole
- Verification channel + role
- Log channel
- Rules channel
- Server systems overview
- Discord OAuth server selector
- Premium dashboard toggle UI

---

## Kuidas Xenoxy töötab?

`bot.py` jooksutab 100 slash-commandi, Discord evente, persistent UI-d ja authenticated control API-t. `xenoxy.db` hoiab persistent guild configuration'it. Dashboard logib admini Discord OAuth2 kaudu sisse ning näitab ainult servereid, mida kasutajal on õigus hallata.

```text
Discord → OAuth → Dashboard → Control API → bot.py → SQLite → Discord
```

### Security

Secretid peavad jääma environment variable'itesse. Bot tokenit, Discord Client Secreti ega Xenoxy API Secreti ei tohi frontendile ega GitHubi commitida.

Bot env kasutab näiteks `DISCORD_TOKEN`, `XENOXY_API_HOST`, `XENOXY_API_PORT` ja `XENOXY_API_SECRET`. Dashboard kasutab Discord OAuth Client ID/Secretit, redirect URI-d, session secretit ning sama Xenoxy API secretit.

---

## Xenoxy systems

V8.2 sisaldab muu hulgas moderationit, welcome/goodbye süsteemi, welcome DM configuratorit, suggestions + managementi, anonymous confessions süsteemi, birthdays, activity/member stats, server health/age, role menu, reaction/button roles, verification, sticky messages, embed builderit, backups, autorole'i, logs, polls/utilities, SQLite persistence'i, Discord OAuth dashboardi ja authenticated control API-t.

Website'i command database sisaldab kõiki **100 slash-commandi**.

---

## Beginner: enda Discord bot

1. Installi Python ja kontrolli `py --version`.
2. Discord Developer Portal → New Application → Bot.
3. Hoia `DISCORD_TOKEN` `.env` failis ja lisa `.env` `.gitignore` faili.
4. Installi `py -m pip install discord.py python-dotenv`.
5. Tee `bot.py`, loo `discord.Client`, `app_commands.CommandTree` ja sync'i slash-commandod.
6. Käivita `py bot.py`.

Ära kunagi commiti Discord bot tokenit või muid secrete GitHubi.

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
```

## Tech

- Python
- discord.py
- aiohttp
- Flask
- Discord OAuth2
- SQLite
- Discord Interactions / Slash Commands
- Discord UI Views
- GitHub Pages

Built by **@kodaniq**.

# XENOXY V8.1 // FULL CONTROL CORE

Xenoxy on Pythoni ja `discord.py` peal ehitatud Discord management bot/platform.

Praegune build: **V8.1 // FULL CONTROL CORE**  
Slash commande: **100 / 100**  
Persistence: **SQLite (`xenoxy.db`)**  
Dashboard: **Discord OAuth + authenticated control API**

Website: https://kodaniq.github.io/xenoxy-website/

---

## Mis V8.1-s uut on?

V8.1 ühendab Discord boti ja web dashboardi üheks süsteemiks.

```text
Discord admin
    ↓
Login with Discord (OAuth2)
    ↓
Server select
    ↓
Xenoxy Web Dashboard
    ↓
Authenticated Control API
    ↓
Xenoxy bot.py
    ↓
xenoxy.db
    ↓
Discord server behavior changes
```

Dashboard saab V8.1 bot API-st päris serveri channelid, role'id, settingsid ja server-health info. Kui admin vajutab **Save Changes**, saadab dashboard uued settingud tagasi botile ning bot salvestab need samasse `xenoxy.db` faili, mida Discord eventid ja slash-commandod kasutavad.

### V8.1 dashboard controls

- Welcome channel
- Welcome system ON/OFF
- Welcome message
- Welcome DM ON/OFF
- Welcome DM message
- Goodbye channel
- Goodbye system ON/OFF
- Goodbye message
- Suggestion channel
- Confession channel
- Autorole
- Verification channel
- Verification role
- Log channel
- Rules channel
- Server-health overview

---

# Kuidas Xenoxy töötab?

## 1. Discord bot

`bot.py` kasutab `discord.py`-d ning sisaldab Xenoxy 100 slash-commandi, evente, persistent Discord UI-d ja guild-põhiseid settinguid.

Presence V8.1-s:

```text
Watching /help • Xenoxy V8.1
```

## 2. SQLite database

V8.0-st alates kasutab Xenoxy persistent data jaoks SQLite'i:

```text
xenoxy.db
```

Esimesel launchil saab vana `xenoxy_data.json` olemasolul data automaatselt SQLite'i migreerida. Vana JSON fail jäetakse fallbackiks alles.

Database'is säilivad näiteks:

- guild settings
- birthdays
- reaction-role mappings
- activity stats
- server backup data
- community-system config

## 3. Discord OAuth dashboard

Dashboard kasutab OAuth2 scope'e:

```text
identify
guilds
```

See tähendab, et dashboard saab teada, kes sisse logis ja milliseid servereid kasutaja haldab. Dashboard näitab ainult servereid, kus kasutajal on Owner, Administrator või Manage Server õigus.

## 4. V8.1 Control API

Bot sisaldab authenticated API-t:

```text
GET /api/health
GET /api/guilds/<guild_id>
PUT /api/guilds/<guild_id>/settings
```

API secret peab olema environment variable'is ja seda ei tohi frontendile ega GitHubi panna.

Bot env:

```env
DISCORD_TOKEN=...
GUILD_ID=148532329956326440
XENOXY_API_HOST=0.0.0.0
XENOXY_API_PORT=8080
XENOXY_API_SECRET=LONG_RANDOM_SECRET
```

Dashboard env:

```env
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=http://localhost:8000/callback
SESSION_SECRET=LONG_RANDOM_SESSION_SECRET
XENOXY_API_URL=https://YOUR-BOT-API-ADDRESS
XENOXY_API_SECRET=SAME_SECRET_AS_BOT
```

**Bot tokenit, Discord Client Secreti ega Xenoxy API Secreti ei tohi GitHubi commitida.**

---

# Xenoxy V8.1 süsteemid

Praeguses buildis on muu hulgas:

- moderation
- welcome / goodbye system
- welcome DM configurator
- suggestions + suggestion management
- anonymous confessions
- birthdays
- activity stats
- member stats
- server health
- server age
- role menu
- reaction roles
- button roles
- verification
- sticky messages
- embed builder
- server backups
- autorole
- logs
- polls ja utility commands
- SQLite persistence
- Discord OAuth dashboard
- authenticated web control API

Website'i command database sisaldab kõiki **100 slash-commandi**.

---

# Beginner: kuidas teha enda Discord bot?

## 1. Installi Python

```powershell
py --version
```

## 2. Tee Discord application

Discord Developer Portal → New Application → Bot.

Slash-commandidega bot vajab installimisel vähemalt:

```text
bot
applications.commands
```

## 3. Hoia token `.env` failis

```env
DISCORD_TOKEN=SINU_TOKEN
```

`.gitignore`:

```gitignore
.env
__pycache__/
*.pyc
*.db
```

## 4. Installi package'id

```powershell
py -m pip install discord.py python-dotenv
```

## 5. Minimal bot

```python
import os
import discord
from discord import app_commands
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

class MyBot(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()

bot = MyBot()

@bot.tree.command(name="ping")
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message("Pong! 🏓")

bot.run(TOKEN)
```

Käivita:

```powershell
py bot.py
```

---

# Xenoxy progression

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
```

V8.1 eesmärk on teha Xenoxy server settings hallatavaks nii Discordis kui ka web dashboardis, kasutades sama live konfiguratsiooni.

---

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

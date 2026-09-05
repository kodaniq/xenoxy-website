# XENOXY V7.8 // COMMUNITY CORE

Xenoxy on Pythoni ja `discord.py` peal ehitatud Discord bot, mille eesmärk on ühendada moderation, community tools, welcome süsteemid, role'id, activity stats ja server control üheks botiks.

Praegune build: **V7.8 // COMMUNITY CORE**  
Slash commande: **100 / 100**

Website: https://kodaniq.github.io/xenoxy-website/

---

## Kuidas Xenoxy töötab?

Kõige lihtsamalt:

```text
Discord user
    ↓
Slash command / button / reaction / event
    ↓
discord.py
    ↓
Xenoxy bot.py
    ↓
permission check + server settings + command logic
    ↓
Discord response
    ↓
xenoxy_data.json salvestab vajaliku persistent data
```

### 1. Discord saadab interactioni

Näiteks kasutaja kirjutab:

```text
/server-health
```

Discord saadab selle Xenoxy protsessile interactionina.

### 2. `discord.py` leiab õige commandi

Xenoxy kasutab slash-commandide jaoks `app_commands.CommandTree` süsteemi.

Näiteks lihtsustatud command näeb välja nii:

```python
@tree.command(name="ping", description="Kontrollib kas bot töötab.")
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message("Pong!")
```

### 3. Xenoxy kontrollib õigusi

Admin-commandidele saab lisada permission checki:

```python
@app_commands.checks.has_permissions(manage_guild=True)
```

See tähendab, et tavaline member ei saa serveri setupi muuta.

### 4. Igal serveril on eraldi settings

Xenoxy ei kasuta kõigi serverite jaoks samu channel ID-sid või role ID-sid.

Settings hoitakse serveri ID järgi, näiteks:

```json
{
  "settings": {
    "123456789": {
      "welcome_channel": 111111111,
      "suggestion_channel": 222222222,
      "verification_role": 333333333
    }
  }
}
```

Seega võib Xenoxy olla mitmes Discord serveris ja iga server saab enda setupi.

### 5. Persistent data

Xenoxy salvestab vajaliku data faili:

```text
xenoxy_data.json
```

Seal võivad olla näiteks:

- server settings
- birthdays
- reaction-role mappings
- activity stats
- server backup data
- community-system config

See tähendab, et bot ei unusta kõike kohe pärast restarti.

### 6. Events töötavad taustal

Kõik ei ole slash-command.

Xenoxy kuulab ka Discord evente, näiteks:

```python
@bot.event
async def on_member_join(member):
    ...
```

või:

```python
@bot.event
async def on_message(message):
    ...
```

Nii saavad töötada welcome message'id, activity tracking, sticky messages ja muud automaatsed süsteemid.

### 7. Persistent Discord UI

Xenoxy kasutab ka:

- Buttons
- Select menus
- Modals
- Embeds

Näiteks verification ja role-menu saavad töötada UI kaudu ilma, et kasutaja peaks iga kord uut slash-commandi kirjutama.

---

# Xenoxy V7.8 süsteemid

Praeguses V7.8 buildis on muu hulgas:

- moderation
- welcome / goodbye system
- private DM Configurator
- suggestions + suggestion management
- anonymous confessions + confession channel setup
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

Website'i command database sisaldab kõiki **100 praegust slash-commandi**.

---

# Kuidas teha enda Discord bot?

Allpool on beginner setup Windowsi jaoks.

## 1. Installi Python

Installi Python ja kontrolli terminalis:

```powershell
py --version
```

Kui saad Python versioni tagasi, oled valmis.

---

## 2. Tee Discord application

Mine Discord Developer Portalisse:

https://discord.com/developers/applications

Seejärel:

1. Vajuta **New Application**.
2. Pane botile nimi.
3. Ava vasakult **Bot**.
4. Loo bot user.
5. Vajadusel lülita sisse vajalikud Gateway Intents.

Ära lülita kõiki intents lihtsalt igaks juhuks sisse. Kasuta ainult neid, mida sinu bot päriselt vajab.

---

## 3. ÄRA jaga bot tokenit

Bot token on sisuliselt boti parool.

Ära:

- saada seda Discordi
- pane screenshotile
- commit'i GitHubi
- kirjuta seda otse public source code'i

Kasuta `.env` faili.

Loo projekti kausta:

```text
.env
```

ja pane sinna:

```env
DISCORD_TOKEN=SIIA_SINU_TOKEN
```

---

## 4. Tee `.gitignore`

Loo fail:

```text
.gitignore
```

ja pane sinna vähemalt:

```gitignore
.env
__pycache__/
*.pyc
```

Nii ei lähe token kogemata GitHubi.

---

## 5. Installi vajalikud package'id

VS Code terminalis:

```powershell
py -m pip install discord.py python-dotenv
```

Soovi korral tee ka `requirements.txt`:

```txt
discord.py>=2.5.0
python-dotenv>=1.0.0
```

---

## 6. Tee esimene `bot.py`

```python
import os
import discord
from discord import app_commands
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")


class MyBot(discord.Client):
    def __init__(self):
        intents = discord.Intents.default()
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()


bot = MyBot()


@bot.event
async def on_ready():
    print(f"Online: {bot.user}")


@bot.tree.command(name="ping", description="Test command")
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message("Pong! 🏓")


bot.run(TOKEN)
```

---

## 7. Käivita bot

Windowsis:

```powershell
py bot.py
```

Kui terminalis on Python prompt:

```text
>>>
```

siis oled kogemata Python REPL-is.

Kirjuta:

```python
exit()
```

ja alles tavalises terminalis käivita:

```powershell
py bot.py
```

---

## 8. Invite bot serverisse

Discord Developer Portal -> sinu application -> **Installation** või OAuth2.

Slash-commandidega bot vajab vähemalt scope'e:

```text
bot
applications.commands
```

Vali ainult vajalikud permissions.

Beginner testserveris võib alguses olla lihtsam anda rohkem õigusi, aga päris public botis tasub permissions võimalikult täpselt paika panna.

---

## 9. Miks slash-command kohe ei ilmu?

Global command sync võib mõnikord aega võtta.

Arendamisel saad syncida commandi kindlasse testserverisse, et muudatused kiiremini ilmuksid.

Näiteks:

```python
GUILD_ID = 123456789012345678

async def setup_hook(self):
    await self.tree.sync()

    guild = discord.Object(id=GUILD_ID)
    self.tree.copy_global_to(guild=guild)
    await self.tree.sync(guild=guild)
```

Asenda ID enda testserveri ID-ga.

---

# Kuidas minna ühest `/ping` commandist Xenoxy-tüüpi botini?

Ära proovi kohe teha 100 commandi.

Hea järjekord on:

### Stage 1 — basics

```text
/ping
/userinfo
/serverinfo
```

Õpi:

- interactions
- embeds
- command parameters

### Stage 2 — moderation

```text
/clear
/kick
/ban
/timeout
```

Õpi:

- Discord permissions
- Member objektid
- error handling

### Stage 3 — settings

Lisa serveripõhine config:

```text
welcome_channel
log_channel
autorole
```

Alguses sobib JSON.

Suurema boti puhul tasub hiljem minna SQLite või muu database'i peale.

### Stage 4 — events

Lisa:

```python
on_member_join
on_member_remove
on_message
```

Nüüd saab bot teha asju automaatselt.

### Stage 5 — Discord UI

Õpi:

```text
Buttons
Views
Select menus
Modals
```

Siit hakkavad tulema verification, role-menu ja configurator tüüpi süsteemid.

### Stage 6 — persistence

Veendu, et:

- settings säilivad restartide vahel
- UI töötab pärast restarti
- vanad channel/role ID-d ei crash'i botti
- deleted roles/channels on turvaliselt handled

### Stage 7 — hosting

Kui bot töötab lokaalselt, saad selle hostida serveris või Discord-boti hostingus.

Host vajab tavaliselt:

```text
bot.py
requirements.txt
.env või hosting environment variables
```

Hostingus pane token environment variable'iks, mitte source code'i.

---

# Projekti soovituslik struktuur

Väikese boti jaoks:

```text
my-discord-bot/
├── bot.py
├── requirements.txt
├── .env
└── .gitignore
```

Kui projekt kasvab:

```text
my-discord-bot/
├── bot.py
├── cogs/
│   ├── moderation.py
│   ├── community.py
│   └── utility.py
├── data/
├── requirements.txt
├── .env
└── .gitignore
```

Xenoxy-suuruse projekti puhul on commandide jagamine eraldi failidesse või cogs'idesse tulevikus palju lihtsam hallata kui üks hiiglaslik fail.

---

# Levinud vead

## `ModuleNotFoundError: No module named 'discord'`

Installi package:

```powershell
py -m pip install discord.py
```

## Bot on online, aga slash-command puudub

Kontrolli:

- kas command sync toimus
- kas bot invite sisaldab `applications.commands`
- kas käivitad õiget `bot.py` faili
- kas hostis on uusim build

## `PrivilegedIntentsRequired`

Sinu kood kasutab intenti, mida Developer Portalis pole botile lubatud.

## `Missing Permissions`

Bot proovib teha midagi, mille jaoks tal puudub Discord permission või tema role on target role'ist madalam.

Näiteks role'i andmiseks peab boti enda role olema sellest role'ist kõrgemal.

## Token leaked

Kui token kunagi avalikuks läheb, ära lihtsalt kustuta seda GitHubist ja looda parimat.

Developer Portalis **reset/regenerate token** ja uuenda `.env` / hosting environment variable.

---

# GitHub workflow beginnerile

Repo loomisel pane source code GitHubi, aga mitte `.env` faili.

Tavaline workflow:

```powershell
git add .
git commit -m "Add new bot feature"
git push
```

Enne push'i kontrolli alati:

```powershell
git status
```

ja veendu, et `.env` ei oleks commititavate failide seas.

---

# Kõige olulisem lesson Xenoxy tegemisest

Töötav suur bot ei sünni ühe korraga.

Ehita üks töötav süsteem korraga:

```text
command
→ test
→ error
→ fix
→ test again
→ alles siis järgmine feature
```

100 katkist commandi on palju kehvem kui 10 commandi, mis töötavad korralikult.

Xenoxy V7.8 enda cleanup läks sama põhimõtte järgi: vähem filler-command'e ja rohkem päriselt kasutatavaid community süsteeme.

---

## Tech

- Python
- discord.py
- python-dotenv
- Discord Interactions / Slash Commands
- Discord UI Views
- JSON persistence
- GitHub Pages website

Built by **@kodaniq**.

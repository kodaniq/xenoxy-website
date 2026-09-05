const commands=['ping','help','userinfo','avatar','joined','serverinfo','membercount','servericon','roleinfo','channelinfo','botinfo','uptime','roles','emojis','boosts','permissions','8ball','coinflip','roll','dice','choose','randomnumber','rate','ship','rps','reverse','mock','joke','fact','truth','dare','wouldyourather','compliment','roast','vibecheck','iq','howgay','slots','rockpaperscissors','say','poll','announce','timestamp','calc','afk','quote-add','quote','remindme','password','color','countdown','embed','uppercase','lowercase','length','randomletter','randomemoji','choose-number','clear','kick','ban','unban','timeout','untimeout','slowmode','nickname','warn','warnings','clearwarnings','lock','unlock','purge-user','role-add','role-remove','move','channel-create','channel-delete','role-create','role-delete','server-stats','bot-stats','invite','rules','setup','welcome-channel','welcome-toggle','goodbye-channel','goodbye-toggle','log-channel','autorole','autorole-off','ticket-setup','ticket-panel','ticket-add','ticket-remove','ticket-rename','button-role','setup-reset','about','command-count'];
const grid=document.getElementById('commandGrid');
const search=document.getElementById('search');
function render(q=''){
  const query=q.toLowerCase().replace('/','').trim();
  const matches=commands.filter(c=>c.includes(query));
  grid.innerHTML='';
  matches.forEach(c=>{
    const b=document.createElement('button');
    b.className='cmd';
    b.innerHTML=`<span>/${c}</span><small>COPY</small>`;
    b.onclick=()=>copyCmd('/'+c);
    grid.appendChild(b);
  });
  if(!matches.length){grid.innerHTML='<p class="muted">No command found. Xenoxy is powerful, not psychic 😭</p>'}
}
function copyCmd(cmd){
  navigator.clipboard.writeText(cmd);
  const t=document.getElementById('toast');
  t.textContent=`Copied ${cmd}`;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1200);
}
search.addEventListener('input',e=>render(e.target.value));
render();

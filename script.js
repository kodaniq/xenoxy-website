const commands=['ping','help','userinfo','avatar','joined','serverinfo','servericon','roleinfo','channelinfo','botinfo','uptime','roles','permissions','8ball','coinflip','roll','dice','choose','randomnumber','rate','ship','rps','joke','fact','truth','dare','wouldyourather','compliment','roast','vibecheck','iq','howgay','slots','say','poll','announce','timestamp','calc','remindme','password','color','countdown','embed','length','choose-number','clear','kick','ban','unban','timeout','untimeout','slowmode','nickname','lock','unlock','purge-user','role-add','role-remove','move','channel-create','channel-delete','role-create','role-delete','server-stats','bot-stats','invite','rules','setup','welcome-channel','welcome-toggle','goodbye-channel','goodbye-toggle','log-channel','autorole','autorole-off','suggestion-setup','suggestion','report','server-backup','reaction-role','button-role','setup-reset','birthday','confess','server-health','role-menu','welcome-preview','activity','sticky','embed-builder','verification-setup','suggestion-manage','birthday-list','birthday-remove','sticky-off','confess-setup','member-stats','verification-off','server-age','about'];
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

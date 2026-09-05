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

// XENOXY // unified neon brand mark
const xenoxyMark=`<svg viewBox="0 0 64 64" aria-hidden="true" class="xenoxy-mark"><defs><linearGradient id="xenoCore" x1="10" y1="8" x2="54" y2="56"><stop stop-color="#ffffff"/><stop offset=".28" stop-color="#d8b4fe"/><stop offset=".62" stop-color="#a855f7"/><stop offset="1" stop-color="#ff4fd8"/></linearGradient><linearGradient id="xenoOrbit" x1="8" y1="54" x2="56" y2="10"><stop stop-color="#7c3aed"/><stop offset=".52" stop-color="#c084fc"/><stop offset="1" stop-color="#ff4fd8"/></linearGradient><filter id="xenoGlow"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="32" cy="32" r="27" fill="url(#xenoCore)" opacity=".06"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(-24 32 32)" fill="none" stroke="url(#xenoOrbit)" stroke-width="1.8" stroke-linecap="round" opacity=".88"/><ellipse cx="32" cy="32" rx="24" ry="8.3" transform="rotate(-24 32 32)" fill="none" stroke="#ff8be8" stroke-width=".7" opacity=".38"/><path d="M15.5 12.8 32 28.1l16.5-15.3 5 5.3L37.6 32.6 53.5 47.4l-5 5.3L32 37.3 15.5 52.7l-5-5.3 15.9-14.8L10.5 18.1l5-5.3Z" fill="url(#xenoCore)" filter="url(#xenoGlow)"/><path d="M18.2 16.8 31.9 29.6 45.8 16.7" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".5"/><circle cx="50.7" cy="18.8" r="2.25" fill="#fff"/><circle cx="50.7" cy="18.8" r="5.4" fill="#ff4fd8" opacity=".18"/></svg>`;

document.querySelectorAll('.logo').forEach(el=>{el.innerHTML=xenoxyMark;el.classList.add('xenoxy-logo-upgraded')});
document.querySelectorAll('.mini-x').forEach(el=>{el.innerHTML=xenoxyMark;el.classList.add('xenoxy-mini-upgraded')});

const xenoxyLogoStyle=document.createElement('style');
xenoxyLogoStyle.textContent=`
.logo.xenoxy-logo-upgraded{position:relative;width:46px!important;height:46px!important;border-radius:15px!important;background:radial-gradient(circle at 42% 35%,#28133d 0,#11081b 45%,#08050d 100%)!important;border:1px solid #ff79e54d!important;box-shadow:0 0 0 1px #8b5cf61c,0 0 18px #8b5cf653,0 0 38px #ff4fd82b,inset 0 1px 0 #ffffff24!important;overflow:visible!important;isolation:isolate;transition:transform .22s ease,box-shadow .22s ease}
.logo.xenoxy-logo-upgraded:before{content:"";position:absolute;inset:-5px;border-radius:19px;background:conic-gradient(from 35deg,transparent 0 18%,#8b5cf64d 25%,transparent 34% 58%,#ff4fd84a 66%,transparent 76%);filter:blur(8px);opacity:.55;z-index:-1}
.logo.xenoxy-logo-upgraded:after{content:"";position:absolute;inset:4px;border-radius:11px;border:1px solid #ffffff0c;pointer-events:none}
.logo.xenoxy-logo-upgraded svg{width:40px!important;height:40px!important;filter:drop-shadow(0 0 7px #a855f788) drop-shadow(0 0 13px #ff4fd844)!important;overflow:visible}
.brand:hover .logo.xenoxy-logo-upgraded,.dash-brand:hover .logo.xenoxy-logo-upgraded{transform:rotate(-4deg) scale(1.06);box-shadow:0 0 0 1px #8b5cf626,0 0 25px #8b5cf66e,0 0 52px #ff4fd840,inset 0 1px 0 #ffffff30!important}
.brand>span:last-child{letter-spacing:.17em;font-weight:950;text-shadow:0 0 18px #a855f72c}
.dash-brand .logo.xenoxy-logo-upgraded{width:43px!important;height:43px!important;border-radius:14px!important}
.dash-brand .logo.xenoxy-logo-upgraded svg{width:37px!important;height:37px!important}
.mini-x.xenoxy-mini-upgraded{display:grid;place-items:center;width:31px;height:31px;border-radius:10px;background:radial-gradient(circle at 40% 30%,#2e1645,#0d0714 70%);border:1px solid #ff79e53d;box-shadow:0 0 18px #8b5cf63a,0 0 26px #ff4fd818;overflow:visible;color:transparent}
.mini-x.xenoxy-mini-upgraded svg{width:27px;height:27px;filter:drop-shadow(0 0 5px #c084fc77)}
@keyframes xenoLogoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
.brand .logo.xenoxy-logo-upgraded{animation:xenoLogoFloat 4s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){.brand .logo.xenoxy-logo-upgraded{animation:none}.logo.xenoxy-logo-upgraded{transition:none}}
`;
document.head.appendChild(xenoxyLogoStyle);

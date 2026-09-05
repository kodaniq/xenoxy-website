(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const style=document.createElement('style');
  style.textContent=`
  .x-terminal-section{padding-top:40px!important}.x-terminal-shell{border:1px solid #e8c7ff2b;border-radius:32px;background:radial-gradient(circle at 92% 0,#b661ff20,transparent 34%),linear-gradient(145deg,#0e0816,#050208);box-shadow:0 55px 160px #0008;overflow:hidden}.x-terminal-top{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 18px;border-bottom:1px solid #ffffff0d}.x-terminal-brand{display:flex;align-items:center;gap:10px;color:#ede4f4;font:850 11px/1 Inter,system-ui;letter-spacing:.11em}.x-terminal-dots{display:flex;gap:6px}.x-terminal-dots i{width:7px;height:7px;border-radius:50%;background:#ffffff22}.x-terminal-badge{color:#8f8299;font:800 9px/1 Inter,system-ui;letter-spacing:.12em}.x-terminal-output{height:330px;overflow:auto;padding:24px;font:500 13px/1.8 ui-monospace,SFMono-Regular,Consolas,monospace;color:#a99db3;scrollbar-width:thin}.x-line{margin-bottom:9px}.x-line.command{color:#f2e9f8}.x-line.ok{color:#9ce5bd}.x-line.dim{color:#756a7e}.x-terminal-inputrow{display:flex;align-items:center;gap:10px;padding:16px 18px;border-top:1px solid #ffffff0d;background:#ffffff03}.x-terminal-prompt{color:#c78cff;font:800 13px ui-monospace,monospace}.x-terminal-input{flex:1;border:0!important;outline:0!important;background:transparent!important;color:#fff!important;font:600 13px ui-monospace,monospace!important;padding:0!important;box-shadow:none!important}.x-terminal-input::placeholder{color:#655b6e}.x-sound-toggle{position:fixed;right:18px;bottom:18px;z-index:11000;display:flex;align-items:center;gap:9px;padding:11px 14px;border:1px solid #e7c5ff24;border-radius:999px;background:#08040dd9;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);color:#a89ab1;font:850 10px/1 Inter,system-ui;letter-spacing:.08em;cursor:pointer;box-shadow:0 18px 60px #0007;transition:.16s}.x-sound-toggle:hover{transform:translateY(-2px);color:#fff;border-color:#c88dff55}.x-sound-toggle.on{color:#fff;background:linear-gradient(110deg,#8f4fe72b,#ff70d51a),#08040dd9}.x-sound-dot{width:7px;height:7px;border-radius:50%;background:#6c6372}.x-sound-toggle.on .x-sound-dot{background:#8ff0bf;box-shadow:0 0 12px #7deeb3}.x-terminal-flash{animation:xTerminalFlash .24s ease}@keyframes xTerminalFlash{50%{background:#b869ff0d}}@media(max-width:760px){.x-terminal-output{height:270px;padding:18px}.x-terminal-shell{border-radius:24px}.x-sound-toggle{right:10px;bottom:10px}}
  `;document.head.appendChild(style);

  const commandsSection=document.getElementById('commands');
  if(commandsSection){
    const section=document.createElement('section');
    section.id='terminal';
    section.className='x-terminal-section';
    section.innerHTML=`<div class="sectionhead"><p class="eyebrow">// LOCAL CONTROL TERMINAL</p><h2>Talk to Xenoxy.<br><span>Try the runtime shell.</span></h2><p class="muted">A safe local demo terminal. Status commands read the telemetry already loaded on this page; moderation commands are never executed from the public website.</p></div><div class="x-terminal-shell"><div class="x-terminal-top"><div class="x-terminal-brand"><span class="x-terminal-dots"><i></i><i></i><i></i></span>XENOXY // LOCAL SHELL</div><span class="x-terminal-badge">SAFE DEMO</span></div><div class="x-terminal-output" id="xTerminalOutput"></div><div class="x-terminal-inputrow"><span class="x-terminal-prompt">xenoxy@web:~$</span><input class="x-terminal-input" id="xTerminalInput" autocomplete="off" spellcheck="false" placeholder="type help and press Enter"></div></div>`;
    commandsSection.insertAdjacentElement('afterend',section);
  }

  let soundOn=localStorage.getItem('xenoxySound')==='on';
  let audioCtx=null;
  const sound=document.createElement('button');sound.className='x-sound-toggle';sound.type='button';document.body.appendChild(sound);
  const syncSound=()=>{sound.classList.toggle('on',soundOn);sound.innerHTML=`<span class="x-sound-dot"></span>${soundOn?'SOUND ON':'SOUND OFF'}`};syncSound();
  function tone(type='click'){
    if(!soundOn)return;
    audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    const now=audioCtx.currentTime, map={click:[420,.025,.035],ok:[720,.04,.05],term:[560,.02,.028]};
    const [freq,dur,vol]=map[type]||map.click;o.type='sine';o.frequency.setValueAtTime(freq,now);g.gain.setValueAtTime(vol,now);g.gain.exponentialRampToValueAtTime(.0001,now+dur);o.connect(g);g.connect(audioCtx.destination);o.start(now);o.stop(now+dur);
  }
  sound.onclick=()=>{soundOn=!soundOn;localStorage.setItem('xenoxySound',soundOn?'on':'off');syncSound();if(soundOn)tone('ok')};
  document.addEventListener('click',e=>{if(soundOn&&e.target.closest('button,a'))tone('click')},{passive:true});

  const out=document.getElementById('xTerminalOutput'),input=document.getElementById('xTerminalInput');
  if(!out||!input)return;
  const history=[];let h=-1;
  const print=(text,cls='')=>{const div=document.createElement('div');div.className=`x-line ${cls}`;div.textContent=text;out.appendChild(div);out.scrollTop=out.scrollHeight};
  const val=id=>document.getElementById(id)?.textContent?.trim()||'—';
  const boot=()=>{print('Xenoxy V9.3 local shell initialized.','ok');print('Type help to see available commands.','dim')};boot();
  const run=raw=>{
    const cmd=raw.trim().replace(/^\//,'').toLowerCase();if(!cmd)return;
    print(`xenoxy@web:~$ ${raw}`,'command');tone('term');
    const replies={
      help:'help, status, ping, uptime, servers, members, commands, version, about, clear',
      status:()=>`status: ${document.getElementById('liveStatusBadge')?.textContent?.trim()||'unknown'} | ping ${val('liveLatency')} | uptime ${val('liveUptime')}`,
      ping:()=>`Discord latency: ${val('liveLatency')}`,
      uptime:()=>`Current uptime: ${val('liveUptime')}`,
      servers:()=>`Connected servers: ${val('liveGuilds')}`,
      members:()=>`Visible members: ${val('liveMembers')}`,
      commands:()=>`Loaded commands: ${val('liveCommands')}`,
      version:()=>`Running ${val('liveVersion')} // Member Ops`,
      about:'Xenoxy is a Discord server operating system with 100 slash commands, OAuth, SQLite persistence and hosted control.'
    };
    if(cmd==='clear'){out.innerHTML='';return;}
    if(/^ban\b|^kick\b|^timeout\b|^clear\b/.test(cmd)){print('Blocked in public terminal: moderation actions only run inside authenticated Xenoxy control surfaces.','dim');return;}
    const r=replies[cmd];print(typeof r==='function'?r():r||`Unknown command: ${cmd}. Try help.`,r?'ok':'dim');
    if(!reduceMotion){out.classList.remove('x-terminal-flash');requestAnimationFrame(()=>out.classList.add('x-terminal-flash'))}
  };
  input.addEventListener('keydown',e=>{
    if(e.key==='Enter'){const v=input.value;if(v.trim()){history.unshift(v);h=-1;run(v)}input.value='';}
    if(e.key==='ArrowUp'){e.preventDefault();if(history.length){h=Math.min(history.length-1,h+1);input.value=history[h]}}
    if(e.key==='ArrowDown'){e.preventDefault();h=Math.max(-1,h-1);input.value=h===-1?'':history[h]}
  });
})();

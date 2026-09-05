(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const hero = document.querySelector('.hero.nexus-hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navLinks = [...nav.querySelectorAll('.navlinks a[href^="#"]')];
  const allHashLinks = [...document.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute('href') !== '#');
  const sections = navLinks.map(link => {
    const hash = link.getAttribute('href');
    return { hash, link, el: document.querySelector(hash) };
  }).filter(item => item.el);

  const style = document.createElement('style');
  style.textContent = `
    nav,nav.nav-docked,nav.nav-fading,nav.nav-hidden{
      position:fixed!important;top:var(--nav-top,24px)!important;left:50%!important;
      width:min(var(--nav-width,1180px),calc(100% - 28px))!important;height:var(--nav-height,72px)!important;
      margin:0!important;padding:7px 8px 7px 14px!important;
      transform:translateX(-50%) scale(var(--nav-scale,1))!important;transform-origin:top center!important;
      opacity:1!important;visibility:visible!important;filter:none!important;pointer-events:auto!important;z-index:15000!important;
      border:1px solid rgba(238,205,255,var(--nav-border-alpha,.09))!important;border-radius:var(--nav-radius,28px)!important;
      background:rgba(7,4,12,var(--nav-bg-alpha,.28))!important;background-image:none!important;
      backdrop-filter:blur(var(--nav-blur,14px)) saturate(150%)!important;-webkit-backdrop-filter:blur(var(--nav-blur,14px)) saturate(150%)!important;
      box-shadow:0 var(--nav-shadow-y,12px) var(--nav-shadow-blur,48px) rgba(0,0,0,var(--nav-shadow-alpha,.20)),inset 0 1px rgba(255,255,255,.06)!important;
      transition:none!important;will-change:width,top,height,transform,background,border-radius,box-shadow,backdrop-filter!important;
    }
    nav .navlinks{background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    nav .navlinks a.section-active:not(.nav-cta){color:#fff!important;background:linear-gradient(110deg,rgba(160,95,255,.18),rgba(255,112,219,.08))!important;box-shadow:inset 0 0 0 1px rgba(218,181,255,.14)!important}
    nav::before,nav::after{content:none!important;display:none!important}
    .hero.nexus-hero .hero-copy{transform:translate3d(0,var(--hero-shift,0px),0) scale(var(--hero-copy-scale,1))!important;opacity:var(--hero-fade,1)!important;filter:blur(var(--hero-blur,0px))!important;transform-origin:left center;will-change:transform,opacity,filter}
    .hero.nexus-hero .hero-console{opacity:var(--console-fade,1)!important;filter:blur(var(--console-blur,0px))!important;will-change:transform,opacity,filter}
    @media(max-width:760px){nav,nav.nav-docked,nav.nav-fading,nav.nav-hidden{top:8px!important;height:58px!important;border-radius:19px!important;padding:5px 8px!important;width:calc(100% - 16px)!important;transform:translateX(-50%)!important}.hero.nexus-hero .hero-copy,.hero.nexus-hero .hero-console{filter:none!important;opacity:1!important}}
  `;
  document.head.appendChild(style);

  const clamp01=v=>Math.max(0,Math.min(1,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=t=>t*t*(3-2*t);

  function sanitizeNav(){nav.classList.remove('nav-fading','nav-hidden');nav.classList.add('nav-docked')}
  function setActive(hash){navLinks.forEach(link=>link.classList.toggle('section-active',link.getAttribute('href')===hash))}

  function applyScrollMorph(){
    sanitizeNav();
    if(window.innerWidth<=760||reduceMotion)return;
    const p=ease(clamp01(window.scrollY/220));
    nav.style.setProperty('--nav-width',`${lerp(1180,920,p)}px`);
    nav.style.setProperty('--nav-top',`${lerp(24,14,p)}px`);
    nav.style.setProperty('--nav-height',`${lerp(72,66,p)}px`);
    nav.style.setProperty('--nav-radius',`${lerp(28,23,p)}px`);
    nav.style.setProperty('--nav-bg-alpha',lerp(.22,.76,p).toFixed(3));
    nav.style.setProperty('--nav-border-alpha',lerp(.08,.14,p).toFixed(3));
    nav.style.setProperty('--nav-blur',`${lerp(12,26,p)}px`);
    nav.style.setProperty('--nav-shadow-y',`${lerp(10,22,p)}px`);
    nav.style.setProperty('--nav-shadow-blur',`${lerp(36,70,p)}px`);
    nav.style.setProperty('--nav-shadow-alpha',lerp(.16,.48,p).toFixed(3));
    nav.style.setProperty('--nav-scale',lerp(1,.985,p).toFixed(4));
    if(hero){
      const he=ease(clamp01(window.scrollY/520));
      hero.style.setProperty('--hero-shift',`${lerp(0,-34,he)}px`);
      hero.style.setProperty('--hero-copy-scale',lerp(1,.985,he).toFixed(4));
      hero.style.setProperty('--hero-fade',lerp(1,.88,he).toFixed(3));
      hero.style.setProperty('--hero-blur',`${lerp(0,1.2,he)}px`);
      hero.style.setProperty('--console-fade',lerp(1,.92,he).toFixed(3));
      hero.style.setProperty('--console-blur',`${lerp(0,.6,he)}px`);
    }
  }

  let lockedHash=null,lockTimer=0,raf=0;
  function scrollActive(){
    if(lockedHash)return;
    const nearBottom=innerHeight+scrollY>=document.documentElement.scrollHeight-100;
    if(nearBottom)return setActive('#contact');
    const probe=scrollY+Math.min(260,innerHeight*.34);
    let current=sections[0]?.hash||null;
    for(const item of sections)if(item.el.offsetTop<=probe)current=item.hash;
    if(current)setActive(current);
  }

  function goTo(target,hash){
    cancelAnimationFrame(raf);lockedHash=hash;setActive(hash);clearTimeout(lockTimer);
    const start=scrollY,maxY=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    const desired=target===document.getElementById('top')?0:target.getBoundingClientRect().top+start-92;
    const end=Math.max(0,Math.min(maxY,desired)),distance=end-start;
    if(reduceMotion||Math.abs(distance)<6){scrollTo(0,end);history.replaceState(null,'',hash);lockedHash=null;applyScrollMorph();scrollActive();return}
    const duration=Math.min(420,Math.max(190,Math.abs(distance)*.12)),began=performance.now(),scrollEase=t=>1-Math.pow(1-t,3);
    const tick=now=>{const p=Math.min(1,(now-began)/duration);scrollTo(0,start+distance*scrollEase(p));applyScrollMorph();setActive(hash);if(p<1)raf=requestAnimationFrame(tick);else{history.replaceState(null,'',hash);lockTimer=setTimeout(()=>{lockedHash=null;scrollActive()},180)}};
    raf=requestAnimationFrame(tick);
  }

  allHashLinks.forEach(link=>link.addEventListener('click',event=>{const hash=link.getAttribute('href'),target=hash==='#top'?document.getElementById('top'):document.querySelector(hash);if(!target)return;event.preventDefault();goTo(target,hash)},true));

  const guard=new MutationObserver(()=>sanitizeNav());guard.observe(nav,{attributes:true,attributeFilter:['class']});
  let ticking=false;
  addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{applyScrollMorph();scrollActive();ticking=false})},{passive:true});
  addEventListener('resize',applyScrollMorph,{passive:true});
  sanitizeNav();applyScrollMorph();scrollActive();
})();
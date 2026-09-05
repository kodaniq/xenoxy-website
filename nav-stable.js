(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  /* One position from the first pixel to the bottom of the page. No dock jump. */
  const style = document.createElement('style');
  style.textContent = `
    nav, nav.nav-docked, nav.nav-fading, nav.nav-hidden{
      position:fixed!important;
      top:14px!important;
      left:50%!important;
      width:min(920px,calc(100% - 28px))!important;
      max-width:none!important;
      height:66px!important;
      margin:0!important;
      padding:7px 8px 7px 14px!important;
      transform:translateX(-50%)!important;
      opacity:1!important;
      filter:none!important;
      pointer-events:auto!important;
      border:1px solid rgba(238,205,255,.14)!important;
      border-radius:23px!important;
      background:rgba(7,4,12,.76)!important;
      backdrop-filter:blur(26px) saturate(150%)!important;
      -webkit-backdrop-filter:blur(26px) saturate(150%)!important;
      box-shadow:0 22px 70px rgba(0,0,0,.48),inset 0 1px 0 rgba(255,255,255,.06)!important;
      transition:border-color .16s ease,box-shadow .16s ease!important;
    }
    nav .navlinks{background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    @media(max-width:760px){nav,nav.nav-docked,nav.nav-fading,nav.nav-hidden{top:8px!important;height:58px!important;border-radius:19px!important;padding:5px 8px!important}}
  `;
  document.head.appendChild(style);

  const navLinks = [...nav.querySelectorAll('.navlinks a[href^="#"]')];
  const sections = navLinks.map(a => ({link:a,hash:a.getAttribute('href'),el:document.querySelector(a.getAttribute('href'))})).filter(x => x.el);
  let clickLock = null;
  let unlockTimer = 0;

  const scrubClasses = () => nav.classList.remove('nav-fading','nav-hidden','nav-docked');
  const setActive = hash => navLinks.forEach(a => a.classList.toggle('section-active', a.getAttribute('href') === hash));

  function updateActiveFromScroll(){
    scrubClasses();
    if(clickLock) return;
    const nearBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 120;
    if(nearBottom){setActive('#contact');return;}
    const probe = scrollY + Math.min(220,innerHeight*.3);
    let current = null;
    for(const item of sections) if(item.el.offsetTop <= probe) current = item.hash;
    if(current) setActive(current);
  }

  navLinks.forEach(link => link.addEventListener('click',()=>{
    const hash=link.getAttribute('href');
    clickLock=hash; setActive(hash); clearTimeout(unlockTimer);
    unlockTimer=setTimeout(()=>{clickLock=null;updateActiveFromScroll()},900);
  },true));

  addEventListener('scroll',updateActiveFromScroll,{passive:true});
  addEventListener('resize',updateActiveFromScroll,{passive:true});
  scrubClasses();
  updateActiveFromScroll();
})();

(() => {
  if (window.innerWidth < 1000) return;
  const nav = document.querySelector('nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll('.navlinks a[href^="#"]')];
  const sections = links.map(link => ({link, hash: link.getAttribute('href'), el: document.querySelector(link.getAttribute('href'))})).filter(x => x.el);

  const style = document.createElement('style');
  style.textContent = `
    nav{position:fixed!important;top:14px!important;left:50%!important;width:min(920px,calc(100% - 28px))!important;height:66px!important;margin:0!important;padding:7px 8px 7px 14px!important;transform:translateX(-50%)!important;opacity:1!important;visibility:visible!important;filter:none!important;pointer-events:auto!important;z-index:15000!important;border:1px solid rgba(238,205,255,.14)!important;border-radius:23px!important;background:rgba(7,4,12,.76)!important;backdrop-filter:blur(26px) saturate(150%)!important;-webkit-backdrop-filter:blur(26px) saturate(150%)!important;box-shadow:0 22px 70px rgba(0,0,0,.48),inset 0 1px rgba(255,255,255,.06)!important}
    nav .navlinks{background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    nav .navlinks a.section-active:not(.nav-cta){color:#fff!important;background:linear-gradient(110deg,rgba(160,95,255,.18),rgba(255,112,219,.08))!important;box-shadow:inset 0 0 0 1px rgba(218,181,255,.14)!important}
    nav.nav-fading,nav.nav-hidden,nav.nav-docked{opacity:1!important;visibility:visible!important;filter:none!important;transform:translateX(-50%)!important;pointer-events:auto!important}
  `;
  document.head.appendChild(style);

  const setActive = hash => links.forEach(a => a.classList.toggle('section-active', a.getAttribute('href') === hash));
  const updateActive = () => {
    const nearBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 120;
    if (nearBottom) return setActive('#contact');
    const probe = scrollY + 160;
    let current = sections[0]?.hash || null;
    for (const item of sections) if (item.el.offsetTop <= probe) current = item.hash;
    if (current) setActive(current);
  };

  links.forEach(link => link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    setActive(hash);
    const y = target.getBoundingClientRect().top + scrollY - 92;
    window.scrollTo({top: Math.max(0, y), behavior: 'smooth'});
    history.replaceState(null, '', hash);
  }));

  addEventListener('scroll', updateActive, {passive:true});
  addEventListener('resize', updateActive, {passive:true});
  updateActive();
})();
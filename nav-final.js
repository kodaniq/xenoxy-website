(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navLinks = [...nav.querySelectorAll('.navlinks a[href^="#"]')];
  const allHashLinks = [...document.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute('href') !== '#');
  const sections = navLinks.map(link => {
    const hash = link.getAttribute('href');
    return { hash, link, el: document.querySelector(hash) };
  }).filter(item => item.el);

  const style = document.createElement('style');
  style.textContent = `
    nav,
    nav.nav-docked,
    nav.nav-fading,
    nav.nav-hidden {
      position: fixed !important;
      top: 14px !important;
      left: 50% !important;
      width: min(920px, calc(100% - 28px)) !important;
      height: 66px !important;
      margin: 0 !important;
      padding: 7px 8px 7px 14px !important;
      transform: translateX(-50%) !important;
      opacity: 1 !important;
      visibility: visible !important;
      filter: none !important;
      pointer-events: auto !important;
      z-index: 15000 !important;
      border: 1px solid rgba(238,205,255,.14) !important;
      border-radius: 23px !important;
      background: rgba(7,4,12,.76) !important;
      background-image: none !important;
      backdrop-filter: blur(26px) saturate(150%) !important;
      -webkit-backdrop-filter: blur(26px) saturate(150%) !important;
      box-shadow: 0 22px 70px rgba(0,0,0,.48), inset 0 1px rgba(255,255,255,.06) !important;
      transition: box-shadow .16s ease, border-color .16s ease !important;
    }
    nav .navlinks { background: transparent !important; border: 0 !important; box-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
    nav .navlinks a.section-active:not(.nav-cta) { color:#fff !important; background:linear-gradient(110deg,rgba(160,95,255,.18),rgba(255,112,219,.08)) !important; box-shadow:inset 0 0 0 1px rgba(218,181,255,.14) !important; }
    nav::before, nav::after { content:none !important; display:none !important; }
    @media(max-width:760px){nav,nav.nav-docked,nav.nav-fading,nav.nav-hidden{top:8px!important;height:58px!important;border-radius:19px!important;padding:5px 8px!important;width:calc(100% - 16px)!important}}
  `;
  document.head.appendChild(style);

  function sanitizeNav() {
    nav.classList.remove('nav-fading', 'nav-hidden');
    nav.classList.add('nav-docked');
  }

  function setActive(hash) {
    navLinks.forEach(link => link.classList.toggle('section-active', link.getAttribute('href') === hash));
  }

  let lockedHash = null;
  let lockTimer = 0;
  let raf = 0;

  function scrollActive() {
    if (lockedHash) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom) return setActive('#contact');

    const probe = window.scrollY + Math.min(260, window.innerHeight * .34);
    let current = sections[0]?.hash || null;
    for (const item of sections) {
      if (item.el.offsetTop <= probe) current = item.hash;
    }
    if (current) setActive(current);
  }

  function goTo(target, hash) {
    cancelAnimationFrame(raf);
    lockedHash = hash;
    setActive(hash);
    clearTimeout(lockTimer);

    const start = window.scrollY;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const desired = target === document.getElementById('top') ? 0 : target.getBoundingClientRect().top + start - 92;
    const end = Math.max(0, Math.min(maxY, desired));
    const distance = end - start;

    if (reduceMotion || Math.abs(distance) < 6) {
      window.scrollTo(0, end);
      history.replaceState(null, '', hash);
      lockedHash = null;
      scrollActive();
      return;
    }

    const duration = Math.min(420, Math.max(190, Math.abs(distance) * .12));
    const began = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);

    const tick = now => {
      const p = Math.min(1, (now - began) / duration);
      window.scrollTo(0, start + distance * ease(p));
      sanitizeNav();
      setActive(hash);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        history.replaceState(null, '', hash);
        lockTimer = setTimeout(() => {
          lockedHash = null;
          scrollActive();
        }, 180);
      }
    };
    raf = requestAnimationFrame(tick);
  }

  allHashLinks.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const target = hash === '#top' ? document.getElementById('top') : document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      goTo(target, hash);
    }, true);
  });

  const guard = new MutationObserver(() => sanitizeNav());
  guard.observe(nav, { attributes:true, attributeFilter:['class','style'] });

  window.addEventListener('scroll', () => {
    sanitizeNav();
    scrollActive();
  }, { passive:true });
  window.addEventListener('resize', sanitizeNav, { passive:true });

  sanitizeNav();
  scrollActive();
})();
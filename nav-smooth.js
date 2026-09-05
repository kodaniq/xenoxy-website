(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('nav');
  const links = [...document.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute('href') !== '#');
  let animationFrame = 0;
  let activeLock = null;
  let unlockTimer = 0;
  let enforcing = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function setActive(hash) {
    if (!nav) return;
    nav.querySelectorAll('.navlinks a[href^="#"]').forEach(a => {
      a.classList.toggle('section-active', a.getAttribute('href') === hash);
    });
  }

  function lockActive(hash, ms = 800) {
    activeLock = hash;
    setActive(hash);
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => {
      activeLock = null;
      setActive(hash);
    }, ms);
  }

  if (nav && 'MutationObserver' in window) {
    const activeGuard = new MutationObserver(() => {
      if (!activeLock || enforcing) return;
      const expected = nav.querySelector(`.navlinks a[href="${activeLock}"]`);
      if (!expected || expected.classList.contains('section-active')) return;
      enforcing = true;
      setActive(activeLock);
      enforcing = false;
    });
    activeGuard.observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  function scrollToTarget(target, hash) {
    if (!target) return;
    cancelAnimationFrame(animationFrame);

    lockActive(hash, 950);

    const navOffset = nav?.classList.contains('nav-docked') ? 92 : 28;
    const startY = window.scrollY;
    const rawTargetY = target.getBoundingClientRect().top + startY - navOffset;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetY = Math.max(0, Math.min(maxY, rawTargetY));
    const distance = targetY - startY;

    if (reduceMotion || Math.abs(distance) < 8) {
      window.scrollTo(0, targetY);
      history.replaceState(null, '', hash);
      setActive(hash);
      return;
    }

    const duration = Math.min(430, Math.max(210, Math.abs(distance) * 0.135));
    const start = performance.now();

    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + distance * easeOutCubic(progress));
      setActive(hash);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        history.replaceState(null, '', hash);
        lockActive(hash, 550);
      }
    };

    animationFrame = requestAnimationFrame(tick);
  }

  links.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (!hash || !hash.startsWith('#')) return;
      const target = hash === '#top' ? document.getElementById('top') : document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      setActive(hash);
      scrollToTarget(target, hash);
    });
  });

  if (nav) {
    nav.style.transition = 'opacity .18s ease, transform .22s cubic-bezier(.2,.8,.2,1), filter .18s ease';
    nav.querySelectorAll('.navlinks a').forEach(a => {
      a.style.transition = 'background .12s ease, color .12s ease, box-shadow .12s ease, transform .12s ease';
    });
  }
})();

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('nav');
  const links = [...document.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute('href') !== '#');
  let animationFrame = 0;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function scrollToTarget(target, hash) {
    if (!target) return;
    cancelAnimationFrame(animationFrame);

    const navOffset = nav?.classList.contains('nav-docked') ? 92 : 28;
    const startY = window.scrollY;
    const targetY = Math.max(0, target.getBoundingClientRect().top + startY - navOffset);
    const distance = targetY - startY;

    if (reduceMotion || Math.abs(distance) < 8) {
      window.scrollTo(0, targetY);
      history.replaceState(null, '', hash);
      return;
    }

    const duration = Math.min(520, Math.max(260, Math.abs(distance) * 0.18));
    const start = performance.now();

    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + distance * easeOutCubic(progress));
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
      else history.replaceState(null, '', hash);
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
      scrollToTarget(target, hash);
    });
  });

  if (nav) {
    nav.style.transition = 'opacity .22s ease, transform .28s cubic-bezier(.2,.8,.2,1), filter .22s ease';
    nav.querySelectorAll('.navlinks a').forEach(a => {
      a.style.transition = 'background .14s ease, color .14s ease, box-shadow .14s ease, transform .14s ease';
    });
  }
})();

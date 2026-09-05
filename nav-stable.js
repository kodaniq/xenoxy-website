(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const navLinks = [...nav.querySelectorAll('.navlinks a[href^="#"]')];
  const sections = navLinks
    .map(a => ({ link: a, hash: a.getAttribute('href'), el: document.querySelector(a.getAttribute('href')) }))
    .filter(x => x.el);

  let clickLock = null;
  let unlockTimer = 0;

  function setActive(hash) {
    navLinks.forEach(a => a.classList.toggle('section-active', a.getAttribute('href') === hash));
  }

  function keepStable() {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.remove('nav-fading', 'nav-hidden');
    nav.classList.toggle('nav-docked', y > 110);
    nav.style.opacity = '1';
    nav.style.filter = 'none';
    nav.style.pointerEvents = 'auto';

    if (nav.classList.contains('nav-docked')) {
      nav.style.top = '14px';
      nav.style.transform = 'translateX(-50%)';
    } else {
      nav.style.top = '0px';
      nav.style.transform = 'none';
    }
  }

  function updateActiveFromScroll() {
    if (clickLock) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 90;
    if (nearBottom) {
      setActive('#contact');
      return;
    }

    const probe = window.scrollY + Math.min(220, window.innerHeight * 0.3);
    let current = null;
    for (const item of sections) {
      if (item.el.offsetTop <= probe) current = item.hash;
    }
    if (current) setActive(current);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const hash = link.getAttribute('href');
      clickLock = hash;
      setActive(hash);
      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => {
        clickLock = null;
        updateActiveFromScroll();
      }, 900);
    }, true);
  });

  window.addEventListener('scroll', () => {
    keepStable();
    updateActiveFromScroll();
  }, { passive: true });

  window.addEventListener('resize', keepStable, { passive: true });
  keepStable();
  updateActiveFromScroll();
})();

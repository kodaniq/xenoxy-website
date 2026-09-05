(() => {
  if (window.innerWidth < 1000) return;

  const nav = document.querySelector('nav');
  if (!nav) return;

  const links = [...nav.querySelectorAll('.navlinks a[href^="#"]')];
  const sections = links
    .map(link => ({
      link,
      hash: link.getAttribute('href'),
      el: document.querySelector(link.getAttribute('href'))
    }))
    .filter(x => x.el);

  const anchorFor = item => {
    if (!item?.el) return null;
    if (item.hash === '#contact') return item.el.querySelector('.contact-shell') || item.el;
    return item.el.querySelector('.sectionhead') || item.el;
  };

  const setActive = hash => {
    links.forEach(link => {
      link.classList.toggle('section-active', link.getAttribute('href') === hash);
    });
  };

  const yFor = item => {
    const anchor = anchorFor(item);
    if (!anchor) return 0;
    const finalTop = item.hash === '#contact' ? 96 : 104;
    return Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - finalTop);
  };

  const updateActive = () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom) {
      setActive('#contact');
      return;
    }

    const probe = window.scrollY + 130;
    let current = sections[0]?.hash || null;
    for (const item of sections) {
      const anchor = anchorFor(item);
      if (anchor && anchor.getBoundingClientRect().top + window.scrollY <= probe) current = item.hash;
    }
    if (current) setActive(current);
  };

  links.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const item = sections.find(section => section.hash === hash);
      if (!item) return;

      event.preventDefault();
      setActive(hash);
      window.scrollTo({ top: yFor(item), behavior: 'smooth' });
      history.replaceState(null, '', hash);
    });
  });

  const correctInitialHash = () => {
    const item = sections.find(section => section.hash === window.location.hash);
    if (!item) return;
    setActive(item.hash);
    window.scrollTo({ top: yFor(item), behavior: 'auto' });
  };

  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive, { passive: true });

  requestAnimationFrame(() => requestAnimationFrame(correctInitialHash));
  updateActive();
})();
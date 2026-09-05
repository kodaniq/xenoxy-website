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

  const setActive = hash => {
    links.forEach(link => {
      link.classList.toggle('section-active', link.getAttribute('href') === hash);
    });
  };

  const updateActive = () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
    if (nearBottom) {
      setActive('#contact');
      return;
    }

    const probe = window.scrollY + 150;
    let current = sections[0]?.hash || null;
    for (const item of sections) {
      if (item.el.offsetTop <= probe) current = item.hash;
    }
    if (current) setActive(current);
  };

  links.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      setActive(hash);

      const targetY = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      history.replaceState(null, '', hash);
    });
  });

  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive, { passive: true });
  updateActive();
})();
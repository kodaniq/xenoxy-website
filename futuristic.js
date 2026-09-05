// XENOXY // FUTURE INTERACTION LAYER
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor-reactive ambient lighting.
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'x-cursor-glow';
    document.body.appendChild(glow);

    let tx = -500, ty = -500, cx = -500, cy = -500, raf = 0;
    const animate = () => {
      cx += (tx - cx) * .16;
      cy += (ty - cy) * .16;
      root.style.setProperty('--cx', `${cx}px`);
      root.style.setProperty('--cy', `${cy}px`);
      root.style.setProperty('--mx', `${cx}px`);
      root.style.setProperty('--my', `${cy}px`);
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, {passive:true});
    window.addEventListener('blur', () => { tx = -500; ty = -500; });
    raf = requestAnimationFrame(animate);
  }

  // Section reveal system.
  const revealTargets = [
    ...document.querySelectorAll('.sectionhead'),
    ...document.querySelectorAll('.metric-strip article'),
    ...document.querySelectorAll('.cards article'),
    ...document.querySelectorAll('.guide-grid article'),
    ...document.querySelectorAll('.contact-card'),
    ...document.querySelectorAll('.searchwrap'),
    ...document.querySelectorAll('.command-grid')
  ];

  revealTargets.forEach(el => el.classList.add('x-reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -7% 0px'});
    revealTargets.forEach(el => io.observe(el));
  }

  // Gentle 3D hologram tilt for the hero console.
  const consoleEl = document.querySelector('.hero-console');
  if (consoleEl && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    consoleEl.addEventListener('pointermove', e => {
      const r = consoleEl.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      consoleEl.style.setProperty('--tilt-x', `${x * 5.5}deg`);
      consoleEl.style.setProperty('--tilt-y', `${y * -4.5}deg`);
    });
    consoleEl.addEventListener('pointerleave', () => {
      consoleEl.style.setProperty('--tilt-x', '0deg');
      consoleEl.style.setProperty('--tilt-y', '0deg');
    });
  }

  // Animate numeric telemetry once when it becomes visible.
  const telemetry = [...document.querySelectorAll('.metric-strip b')];
  telemetry.forEach(el => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match || reduceMotion) return;
    const target = Number(match[1]);
    const suffix = match[2];
    if (!Number.isFinite(target) || target > 9999) return;
    el.dataset.target = String(target);
    el.textContent = `0${suffix}`;
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const metricObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target);
        if (!target) { metricObserver.unobserve(el); return; }
        const suffix = el.textContent.replace(/^\d+/, '');
        const start = performance.now();
        const duration = 750;
        const tick = now => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = `${target}${suffix}`;
        };
        requestAnimationFrame(tick);
        metricObserver.unobserve(el);
      });
    }, {threshold:.4});
    telemetry.filter(el => el.dataset.target).forEach(el => metricObserver.observe(el));
  }
})();

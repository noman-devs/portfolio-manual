document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     Footer year
  ------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------
     Mobile nav toggle
  ------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav after a link is tapped
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------
     Active nav link on scroll
  ------------------------------------------ */
  const navLinks = document.querySelectorAll('.site-nav a[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ------------------------------------------
     Work grid: filter by swatch / category
  ------------------------------------------ */
  const swatchButtons = document.querySelectorAll('.swatch');
  const plates = document.querySelectorAll('.plate');
  const gridEmpty = document.getElementById('gridEmpty');

  function applyFilter(filter) {
    let visibleCount = 0;

    plates.forEach(plate => {
      const cats = (plate.dataset.cat || '').split(' ');
      const matches = filter === 'all' || cats.includes(filter);
      plate.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });

    if (gridEmpty) gridEmpty.hidden = visibleCount !== 0;
  }

  swatchButtons.forEach(button => {
    button.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('is-active'));
      button.classList.add('is-active');
      applyFilter(button.dataset.filter);
    });
  });

  /* ------------------------------------------
     Scroll-reveal for work plates
  ------------------------------------------ */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // small stagger so a row doesn't pop in all at once
          setTimeout(() => entry.target.classList.add('is-visible'), index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    plates.forEach(plate => revealObserver.observe(plate));
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    plates.forEach(plate => plate.classList.add('is-visible'));
  }

  /* ------------------------------------------
     Back to top
  ------------------------------------------ */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

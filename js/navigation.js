/**
 * NAVIGATION.JS
 * Handles: sticky header shrink/border-on-scroll, mobile menu drawer,
 * active-link "scrollspy", and closing the mobile menu on link click or
 * Escape. No external dependencies — vanilla DOM APIs only.
 */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  /* ---- Sticky header border once the page has scrolled a little ---- */
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  document.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---- Mobile menu toggle ---- */
  function closeMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
    navLinkItems.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---- Scrollspy: highlight the nav link for the section in view ----
     Uses IntersectionObserver rather than scroll-position math for
     performance (no layout thrashing on scroll). */
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinkItems.forEach((l) => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }
})();

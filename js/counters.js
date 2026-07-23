/**
 * COUNTERS.JS
 * Animates the numbers in the About section's stat cards from 0 up to
 * their target value once they scroll into view.
 *
 * Important: every number this animates onto the page must be an honest,
 * countable fact (e.g. "3 languages spoken", "5 academic projects") —
 * never a fabricated metric like "years of experience" or "clients served".
 * Set the true target value via data-target on the element in index.html.
 */
(function () {
  'use strict';

  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => observer.observe(el));
  } else {
    counters.forEach(animateCounter); // fallback: no IO support, just fill in
  }
})();

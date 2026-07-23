/**
 * ANIMATIONS.JS
 * Three independent, self-contained effects:
 *   1. Scroll-reveal — fades/slides [data-reveal] elements in on scroll.
 *   2. Hero typing effect — cycles through role titles in the hero.
 *   3. Mouse glow — a soft light that follows the cursor in the hero.
 * All three respect prefers-reduced-motion.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- */
  /* 1. Scroll reveal                                                  */
  /* ---------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      // Stagger siblings inside the same group by their index
      const groups = {};
      revealEls.forEach((el) => {
        const group = el.getAttribute('data-reveal-group') || 'default';
        groups[group] = groups[group] || 0;
        el.style.setProperty('--reveal-delay', `${Math.min(groups[group] * 70, 420)}ms`);
        groups[group] += 1;
      });

      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }
  }

  /* ---------------------------------------------------------------- */
  /* 2. Hero typing effect                                              */
  /* ---------------------------------------------------------------- */
  const roleEl = document.querySelector('[data-typing-target]');
  if (roleEl) {
    let roles = [];
    try {
      roles = JSON.parse(roleEl.getAttribute('data-typing-target'));
    } catch (e) {
      roles = [roleEl.textContent.trim()];
    }

    if (prefersReducedMotion || roles.length <= 1) {
      roleEl.textContent = roles[0] || roleEl.textContent;
    } else {
      const textNode = document.createElement('span');
      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.setAttribute('aria-hidden', 'true');
      roleEl.textContent = '';
      roleEl.appendChild(textNode);
      roleEl.appendChild(caret);
      roleEl.setAttribute('role', 'text');

      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function tick() {
        const current = roles[roleIndex];
        if (!deleting) {
          charIndex += 1;
          textNode.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1600); // pause on full word
            return;
          }
        } else {
          charIndex -= 1;
          textNode.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(tick, deleting ? 35 : 55);
      }
      setTimeout(tick, 400);
    }
  }

  /* ---------------------------------------------------------------- */
  /* 3. Mouse glow (hero only, desktop pointer devices only)            */
  /* ---------------------------------------------------------------- */
  const glow = document.querySelector('.hero__glow');
  const hero = document.querySelector('.hero');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (glow && hero && isFinePointer && !prefersReducedMotion) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', `${x}%`);
      hero.style.setProperty('--my', `${y}%`);
    });
  } else if (glow) {
    glow.style.display = 'none'; // no glow on touch devices or reduced motion
  }
})();

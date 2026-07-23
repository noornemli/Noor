/**
 * MAIN.JS
 * Everything that isn't navigation, theming, counters, or ambient
 * animation: recruiter mode modal, filter chips (skills + projects),
 * copy-email button, back-to-top button, resume version switcher, and
 * client-side contact form validation.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Footer copyright year — keeps itself current automatically          */
  /* ------------------------------------------------------------------ */
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* Toast helper (used by the copy-email button)                        */
  /* ------------------------------------------------------------------ */
  let toastTimer = null;
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  /* ------------------------------------------------------------------ */
  /* Copy email button                                                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email');
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied');
      } catch (e) {
        // Clipboard API can be unavailable (older browsers, insecure
        // context) — fall back to letting the person select it manually.
        showToast('Copy failed — the address is ' + email);
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* Back-to-top button                                                   */
  /* ------------------------------------------------------------------ */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    document.addEventListener(
      'scroll',
      () => backToTop.classList.toggle('is-visible', window.scrollY > 640),
      { passive: true }
    );
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Generic filter chips (reused for Skills and Projects)                */
  /* Markup contract: a container with [data-filter-group] holding
     .chip buttons (data-filter="category" or "all"), plus a sibling
     [data-filter-target] grid whose direct children carry
     data-category="...". */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const targetSelector = group.getAttribute('data-filter-group');
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const cards = Array.from(target.children);
    const chips = group.querySelectorAll('.chip');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        chips.forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');

        const filter = chip.getAttribute('data-filter');
        cards.forEach((card) => {
          const matches = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = matches ? '' : 'none';
        });
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Resume version switcher                                              */
  /* ------------------------------------------------------------------ */
  const resumeSelect = document.querySelector('#resume-version');
  const resumeFrame = document.querySelector('#resume-frame');
  const resumeDownload = document.querySelector('#resume-download');
  if (resumeSelect && resumeFrame && resumeDownload) {
    resumeSelect.addEventListener('change', () => {
      const selected = resumeSelect.selectedOptions[0];
      const path = selected.value;
      const label = selected.textContent.trim();
      resumeFrame.setAttribute('src', path);
      resumeDownload.setAttribute('href', path);
      resumeDownload.setAttribute('download', label.replace(/\s+/g, '_') + '.pdf');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Recruiter Mode modal                                                 */
  /* ------------------------------------------------------------------ */
  const recruiterFab = document.querySelector('.recruiter-fab');
  const recruiterModal = document.querySelector('#recruiter-modal');

  if (recruiterFab && recruiterModal) {
    const closeBtn = recruiterModal.querySelector('.modal-close');
    let lastFocused = null;

    function getFocusable() {
      return recruiterModal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    }

    function openModal() {
      lastFocused = document.activeElement;
      recruiterModal.classList.add('is-open');
      recruiterModal.setAttribute('aria-hidden', 'false');
      const focusable = getFocusable();
      if (focusable.length) focusable[0].focus();
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      recruiterModal.classList.remove('is-open');
      recruiterModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    recruiterFab.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    recruiterModal.addEventListener('click', (e) => {
      if (e.target === recruiterModal) closeModal(); // click on backdrop
    });

    document.addEventListener('keydown', (e) => {
      if (!recruiterModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeModal();

      // Basic focus trap: keep Tab cycling within the modal.
      if (e.key === 'Tab') {
        const focusable = Array.from(getFocusable());
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form — client-side validation only.                         */
  /* IMPORTANT: this is a static site with no backend. Submitting this
     form currently only validates input and shows a status message —
     it does NOT send an email. Wire it up to a form backend (e.g. a
     serverless form service, or your own endpoint) and POST the
     FormData there before relying on it for real submissions. */
  /* ------------------------------------------------------------------ */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const statusEl = contactForm.querySelector('.form-status');

    function setFieldError(field, message) {
      const group = field.closest('.form-group');
      if (!group) return;
      group.classList.add('has-error');
      const errorMsg = group.querySelector('.error-msg');
      if (errorMsg) errorMsg.textContent = message;
    }
    function clearFieldError(field) {
      const group = field.closest('.form-group');
      if (group) group.classList.remove('has-error');
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;
      const name = contactForm.querySelector('#contact-name');
      const email = contactForm.querySelector('#contact-email');
      const message = contactForm.querySelector('#contact-message');

      [name, email, message].forEach((f) => f && clearFieldError(f));

      if (!name.value.trim()) {
        setFieldError(name, 'Please enter your name.');
        hasError = true;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        setFieldError(email, 'Please enter a valid email address.');
        hasError = true;
      }
      if (!message.value.trim()) {
        setFieldError(message, 'Please enter a message.');
        hasError = true;
      }

      if (hasError) {
        if (statusEl) {
          statusEl.textContent = 'Please fix the highlighted fields.';
          statusEl.className = 'form-status is-visible is-error';
        }
        return;
      }

      // No backend is wired up yet (see comment above this block) — this
      // is where a real submission (fetch/POST) would go. For now, fall
      // back to opening the person's email client with a pre-filled draft
      // so the form is still functionally useful out of the box.
      const subject = encodeURIComponent('Portfolio contact from ' + name.value.trim());
      const body = encodeURIComponent(message.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')');
      const mailtoLink = contactForm.getAttribute('data-mailto');
      if (mailtoLink) {
        window.location.href = `mailto:${mailtoLink}?subject=${subject}&body=${body}`;
      }

      if (statusEl) {
        statusEl.textContent = 'Thanks! Your email client should now open with your message pre-filled.';
        statusEl.className = 'form-status is-visible is-success';
      }
      contactForm.reset();
    });
  }
})();

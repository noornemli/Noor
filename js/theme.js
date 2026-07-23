/**
 * THEME.JS
 * Light/dark mode. Priority order for the initial theme:
 *   1. A choice the person already made on this site (localStorage)
 *   2. Their OS-level preference (prefers-color-scheme)
 *   3. Light (the default the brief was designed around)
 *
 * Applied as data-theme="dark" on <html> so main.css's [data-theme='dark']
 * rules take over. This file is intentionally tiny and dependency-free.
 * Note: localStorage is safe and appropriate here because this is a
 * standalone static site the person hosts themselves (not an in-chat
 * preview sandbox), so persisted preferences behave as expected.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // Storage can be blocked (private browsing, some browser settings) —
      // fail silently and fall back to system preference each load.
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* no-op if storage is unavailable */
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  function updateToggleLabel(btn) {
    if (!btn) return;
    btn.setAttribute(
      'aria-label',
      root.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  const stored = getStoredTheme();
  const systemPrefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply immediately (this file is loaded un-deferred, early in <head>,
  // specifically so this line runs before first paint and there is no
  // flash of the wrong theme).
  applyTheme(stored || (systemPrefersDark ? 'dark' : 'light'));

  // Button wiring has to wait until the DOM exists.
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      updateToggleLabel(btn);
      btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        storeTheme(next);
        updateToggleLabel(btn);
      });
    }

    // If the person never explicitly chose a theme, keep following the OS
    // setting live (e.g. their system switches to dark mode at sunset).
    if (!stored && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  });
})();

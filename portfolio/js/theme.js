/**
 * theme.js - mauLportofolio.dev 2.0
 * Theme_Manager: Dark Mode / Light Mode toggle
 * Loaded before DOMContentLoaded to prevent FOUC.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'maul_theme';
  var DEFAULT     = 'dark';

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT; }
    catch (_) { return DEFAULT; }
  }

  function applyTheme(theme) {
    var html   = document.documentElement;
    var toggle = document.getElementById('themeToggle');

    if (theme === 'light') {
      html.classList.add('light-mode');
    } else {
      html.classList.remove('light-mode');
    }

    if (!toggle) return;

    var icon = toggle.querySelector('i');
    if (!icon) return;

    if (theme === 'light') {
      icon.className = 'fa-solid fa-moon';
      toggle.setAttribute('aria-label', 'Aktifkan Dark Mode');
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      icon.className = 'fa-solid fa-sun';
      toggle.setAttribute('aria-label', 'Aktifkan Light Mode');
      toggle.setAttribute('aria-pressed', 'false');
    }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); }
    catch (_) { /* storage tidak tersedia */ }
  }

  var _current = getSaved();

  /* FOUC Prevention: apply class to <html> immediately */
  if (_current === 'light') {
    document.documentElement.classList.add('light-mode');
  }

  window.themeManager = {
    getTheme: function () { return _current; },
    setTheme: function (value) {
      _current = value;
      applyTheme(_current);
      saveTheme(_current);
    },
    toggle: function () {
      this.setTheme(_current === 'light' ? 'dark' : 'light');
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    /* Re-apply now that toggle button exists in DOM */
    applyTheme(_current);

    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        window.themeManager.toggle();
      });
    }
  });
})();

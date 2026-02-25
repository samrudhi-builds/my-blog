/* Samrudhi Builds — Theme Switcher & Nav */
(function () {
  var THEMES = [
    { id: 'dark',   label: 'Dark',   dot: '#58a6ff', icon: '🌙' },
    { id: 'light',  label: 'Light',  dot: '#0969da', icon: '☀️' },
    { id: 'coffee', label: 'Coffee', dot: '#d4854a', icon: '☕' },
    { id: 'cyber',  label: 'Cyber',  dot: '#00f5ff', icon: '⚡' },
  ];

  // Apply saved theme immediately (prevent flash)
  var currentTheme = localStorage.getItem('sb-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  document.addEventListener('DOMContentLoaded', function () {
    var btn       = document.getElementById('theme-btn');
    var popup     = document.getElementById('theme-popup');
    var indicator = document.getElementById('theme-indicator');
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks  = document.getElementById('nav-links');

    // ── Indicator ──────────────────────────────────────────────
    function setIndicator(id) {
      if (indicator) indicator.textContent = id;
    }
    setIndicator(currentTheme);

    // ── Build popup options ─────────────────────────────────────
    if (popup) {
      THEMES.forEach(function (theme) {
        var opt = document.createElement('button');
        opt.className = 'theme-option' + (theme.id === currentTheme ? ' active' : '');
        opt.innerHTML =
          '<span class="theme-dot" style="background:' + theme.dot + '"></span>' +
          theme.label;

        opt.addEventListener('click', function () {
          currentTheme = theme.id;
          document.documentElement.setAttribute('data-theme', currentTheme);
          localStorage.setItem('sb-theme', currentTheme);
          setIndicator(currentTheme);
          popup.querySelectorAll('.theme-option').forEach(function (o) {
            o.classList.remove('active');
          });
          opt.classList.add('active');
          popup.classList.remove('open');
        });

        popup.appendChild(opt);
      });
    }

    // ── Toggle popup ────────────────────────────────────────────
    if (btn && popup) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        popup.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        popup.classList.remove('open');
      });
      popup.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    // ── Mobile hamburger ────────────────────────────────────────
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
      // Close nav on link click
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
        });
      });
    }

    // ── Active nav link highlight ───────────────────────────────
    var path = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && path.endsWith(href.replace(/\/$/, ''))) {
        link.classList.add('active');
      }
    });
  });
})();

/* Samrudhi Builds — Theme Switcher, Nav & Scroll-Spy */
(function () {
  var THEME_GROUPS = [
    {
      label: 'Light Themes',
      themes: [
        { id: 'punchy', label: 'Bold & Punchy',  icon: 'bi-lightning-charge-fill', dot: '#4f46e5' },
        { id: 'fresh',  label: 'Fresh & Modern', icon: 'bi-droplet-half',          dot: '#0d9488' },
      ]
    },
    {
      label: 'Dark Themes',
      themes: [
        { id: 'dark',   label: 'Dark',    icon: 'bi-moon-stars-fill', dot: '#58a6ff' },
        { id: 'coffee', label: 'Coffee',  icon: 'bi-cup-hot-fill',    dot: '#d4854a' },
        { id: 'cyber',  label: 'Cyber_',  icon: 'bi-cpu-fill',        dot: '#830bf4' },
      ]
    }
  ];

  // Flat list for lookups
  var ALL_THEMES = THEME_GROUPS.reduce(function (acc, g) {
    return acc.concat(g.themes);
  }, []);

  // Apply saved theme immediately (prevent flash)
  var currentTheme = localStorage.getItem('sb-theme') || 'punchy';
  // Migrate removed theme keys
  if (currentTheme === 'soft' || currentTheme === 'light') { currentTheme = 'punchy'; }
  if (currentTheme === 'earthy') { currentTheme = 'fresh'; }
  document.documentElement.setAttribute('data-theme', currentTheme);

  document.addEventListener('DOMContentLoaded', function () {
    var btn       = document.getElementById('theme-btn');
    var popup     = document.getElementById('theme-popup');
    var indicator = document.getElementById('theme-indicator');
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks  = document.getElementById('nav-links');
    var nav       = document.querySelector('.site-nav');

    // ── Indicator ──────────────────────────────────────────────
    var logoSep = document.querySelector('.nav-logo span');

    function setIndicator() {
      if (currentTheme === 'cyber') {
        if (indicator) indicator.textContent = '// cyber.mode';
        if (logoSep) logoSep.textContent = '://';
      } else {
        if (indicator) indicator.textContent = 'theme';
        if (logoSep) logoSep.textContent = '.';
      }
    }
    setIndicator();

    // ── Build popup options ─────────────────────────────────────
    if (popup) {
      THEME_GROUPS.forEach(function (group) {
        var groupHeader = document.createElement('div');
        groupHeader.className = 'theme-popup-header';
        groupHeader.textContent = group.label;
        popup.appendChild(groupHeader);

        group.themes.forEach(function (theme) {
          var opt = document.createElement('button');
          opt.className = 'theme-option' + (theme.id === currentTheme ? ' active' : '');
          opt.innerHTML =
            '<span class="theme-dot" style="background:' + theme.dot + '"></span>' +
            '<i class="bi ' + theme.icon + ' theme-opt-icon"></i>' +
            theme.label;

          opt.addEventListener('click', function () {
            currentTheme = theme.id;
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('sb-theme', currentTheme);
            setIndicator();
            // re-query logoSep in case DOM changed
            var sep = document.querySelector('.nav-logo span');
            if (sep) sep.textContent = (currentTheme === 'cyber') ? '://' : '.';
            popup.querySelectorAll('.theme-option').forEach(function (o) {
              o.classList.remove('active');
            });
            opt.classList.add('active');
            popup.classList.remove('open');
          });

          popup.appendChild(opt);
        });
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
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
        });
      });
    }

    // ── Smooth scroll for anchor links ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          var navHeight = document.querySelector('.site-nav')
            ? document.querySelector('.site-nav').offsetHeight
            : 64;
          var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // ── Scroll-spy — highlight active section in nav ─────────────
    var sections = [];
    document.querySelectorAll('section[id]').forEach(function (s) {
      sections.push(s);
    });

    function getNavAnchorLinks() {
      return document.querySelectorAll('.nav-links a[data-anchor]');
    }

    function setActiveLink(id) {
      getNavAnchorLinks().forEach(function (link) {
        var anchor = link.getAttribute('data-anchor');
        if (anchor === '#' + id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    function setActiveDot(id) {
      document.querySelectorAll('.dot-nav-item').forEach(function (item) {
        if (item.getAttribute('data-dotid') === id) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    if ('IntersectionObserver' in window && sections.length > 0) {
      var navHeight = document.querySelector('.site-nav')
        ? document.querySelector('.site-nav').offsetHeight
        : 64;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
            setActiveDot(entry.target.id);
          }
        });
      }, {
        rootMargin: '-' + navHeight + 'px 0px -60% 0px',
        threshold: 0
      });

      sections.forEach(function (s) { observer.observe(s); });
    }

    // ── Transparent nav → solid on scroll ──────────────────────
    if (nav) {
      function updateNav() {
        if (window.scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      updateNav();
      window.addEventListener('scroll', updateNav, { passive: true });
    }

    // ── Section collapse / expand ─────────────────────────────
    // Dynamically wrap everything after .section-header in a collapsible body
    document.querySelectorAll('section.section').forEach(function (section) {
      var container = section.querySelector('.container');
      var header    = section.querySelector('.section-header');
      if (!container || !header) return;

      var siblings = [];
      var node = header.nextElementSibling;
      while (node) { siblings.push(node); node = node.nextElementSibling; }
      if (siblings.length === 0) return;

      var body  = document.createElement('div');
      body.className = 'section-body';
      var inner = document.createElement('div');
      inner.className = 'section-body-inner';
      body.appendChild(inner);
      siblings.forEach(function (s) { inner.appendChild(s); });
      container.appendChild(body);
    });

    // Accordion collapse / expand — only ONE section expanded at a time
    // Whichever section has ≥35% of itself visible AND has the most visible
    // pixels wins; all others collapse.
    var collapseSections = Array.prototype.slice.call(
      document.querySelectorAll('section.section')
    );

    function updateExpanded() {
      var vp     = window.innerHeight;
      var winner = null;
      var best   = -1;

      collapseSections.forEach(function (s) {
        var r       = s.getBoundingClientRect();
        var visible = Math.min(r.bottom, vp) - Math.max(r.top, 0);
        if (visible <= 0) return;

        var ratio   = visible / r.height;
        var thresh  = r.height > vp * 0.65 ? 0.10 : 0.35;
        if (ratio >= thresh && visible > best) {
          best   = visible;
          winner = s;
        }
      });

      collapseSections.forEach(function (s) {
        if (s === winner) {
          s.classList.add('expanded');
        } else {
          s.classList.remove('expanded');
        }
      });

      // sync dot nav + top nav with accordion winner
      if (winner && winner.id) {
        setActiveLink(winner.id);
        setActiveDot(winner.id);
      }
    }

    updateExpanded();
    window.addEventListener('scroll', updateExpanded, { passive: true });
    window.addEventListener('resize', updateExpanded, { passive: true });
  });
})();


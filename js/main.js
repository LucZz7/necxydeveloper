/* ============================================================
   NECXY DEVELOPER — Portfolio Interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Custom cursor ---------- */
  var cursor = document.getElementById('cursor');
  var cursorDot = document.getElementById('cursorDot');
  var lerp = { x: 0, y: 0 };

  if (cursor && cursorDot && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      lerp.x = e.clientX;
      lerp.y = e.clientY;
    });

    // Trailing ring cursor
    var t = { x: 0, y: 0 };
    (function trail() {
      t.x += (lerp.x - t.x) * 0.12;
      t.y += (lerp.y - t.y) * 0.12;
      cursor.style.left = t.x + 'px';
      cursor.style.top = t.y + 'px';
      requestAnimationFrame(trail);
    })();

    // Hover grow on interactive elements
    var hoverables = 'a, button, .contact-card, .floating-chip';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverables)) cursor.classList.add('hovered');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverables)) cursor.classList.remove('hovered');
    });
  }

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Burger menu ---------- */
  var burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    // close on link tap
    document.querySelectorAll('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Skill bars ---------- */
  var bars = document.querySelectorAll('.bar span');
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-w') + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(function (b) { barObserver.observe(b); });

  /* ---------- Counter numbers ---------- */
  var counters = document.querySelectorAll('[data-count]');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (c) { counterObserver.observe(c); });

  /* ---------- Tilt effect on cards ---------- */
  var cards = document.querySelectorAll('.glass-card');
  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'translateY(-6px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

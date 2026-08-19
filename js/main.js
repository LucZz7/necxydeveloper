/* ============================================================
   NECXY DEVELOPER — Portfolio Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Profile image (base64 injected via profile.js) ---------- */
  if (window.PROFILE_IMG) {
    var img = document.getElementById('profileImg');
    if (img) img.src = window.PROFILE_IMG;
  }

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    setTimeout(function () {
      pre.classList.add('hide');
      initReveal();
    }, 600);
  });

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll ---------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    updateActiveLink();
    initReveal();
    animateBars();
    animateCounters();
  });

  /* ---------- Hamburger ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active link on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    var current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ---------- Custom cursor ---------- */
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (matchMedia('(hover: hover)').matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.top = my + 'px'; dot.style.left = mx + 'px';
    });
    function follow() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.top = ry + 'px'; ring.style.left = rx + 'px';
      requestAnimationFrame(follow);
    }
    follow();
    document.querySelectorAll('a, button, .glass-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('grow'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('grow'); });
    });
  }

  /* ---------- Typing effect ---------- */
  var typed = document.getElementById('typed');
  if (typed) {
    var words = ['Full-Stack Developer', 'Android Developer', 'Creative Technologist', 'UI Enthusiast', 'Problem Solver'];
    var wi = 0, ci = 0, deleting = false;
    function type() {
      var word = words[wi];
      if (!deleting) {
        ci++;
        typed.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        ci--;
        typed.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, deleting ? 40 : 90);
    }
    type();
  }

  /* ---------- 3D Tilt on profile ---------- */
  var tiltEl = document.querySelector('[data-tilt]');
  if (tiltEl && matchMedia('(hover: hover)').matches) {
    tiltEl.addEventListener('mousemove', function (e) {
      var r = tiltEl.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tiltEl.style.transform = 'rotateY(' + (px * 18) + 'deg) rotateX(' + (-py * 18) + 'deg)';
    });
    tiltEl.addEventListener('mouseleave', function () {
      tiltEl.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealed = false;
  function initReveal() {
    var els = document.querySelectorAll('.glass-card, .section-head, .floating-tag, .contact-item, .tool-chip');
    els.forEach(function (el) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add('visible');
    });
  }

  /* ---------- Skill bars ---------- */
  var barsDone = false;
  function animateBars() {
    document.querySelectorAll('.bar i').forEach(function (bar) {
      var r = bar.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        bar.style.width = (bar.getAttribute('data-w') || 0) + '%';
      }
    });
  }

  /* ---------- Counters ---------- */
  var countersDone = {};
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && !countersDone[target]) {
        countersDone[target] = true;
        var start = 0, dur = 1400, t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          el.textContent = Math.floor(p * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      }
    });
  }


  /* ---------- Terminal auto-typing (hacker corner) ---------- */
  var termBody = document.getElementById('termBody');
  if (termBody) {
    var lines = [
      ['$', 'whoami', 'necxy'],
      ['$', 'uname -r', '6.1.0-kali'],
      ['$', 'ls -la', 'projects/  tools/  secrets.sh'],
      ['$', 'cat skills.txt', 'web dev, android, automation'],
      ['$', 'sudo apt install skills', '[done] loaded'],
      ['$', './run --project necstore', 'deploying... 200 OK']
    ];
    var li = 0, ci2 = 0, state = 'cmd'; // 'cmd' | 'out'
    var pre = document.createElement('pre');
    pre.className = 'term-pre';
    termBody.appendChild(pre);
    var curCmd = null, curPrompt = null;

    function newLine() {
      curPrompt = document.createElement('span');
      curPrompt.className = 'term-prompt';
      curPrompt.textContent = '$';
      pre.appendChild(curPrompt);
      curCmd = document.createElement('span');
      curCmd.className = 'term-cmd';
      pre.appendChild(curCmd);
      pre.appendChild(document.createElement('br'));
    }

    function outLine(text) {
      var s = document.createElement('span');
      s.className = 'term-out';
      s.textContent = text;
      pre.appendChild(s);
      pre.appendChild(document.createElement('br'));
    }

    var cursor = document.createElement('span');
    cursor.className = 'term-cursor';
    pre.appendChild(cursor);

    newLine();
    var cmdText = lines[0][1];
    var outText = lines[0][2];

    setInterval(function () {
      if (state === 'cmd') {
        ci2++;
        curCmd.textContent = cmdText.slice(0, ci2);
        if (ci2 >= cmdText.length) {
          state = 'out';
          // move cursor to new line
          pre.insertBefore(document.createElement('br'), cursor);
          outLine(outText);
        }
      } else {
        state = 'cmd';
        li = (li + 1) % lines.length;
        cmdText = lines[li][1];
        outText = lines[li][2];
        ci2 = 0;
        newLine();
      }
      termBody.scrollTop = termBody.scrollHeight;
    }, 90);
  }

  /* ---------- Particles canvas ---------- */
  var canvas = document.getElementById('bg-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var colors = ['124,92,255', '0,212,255', '255,79,216'];
    for (var i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.4 + 0.1,
        angle: Math.random() * Math.PI * 2,
        c: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',0.55)';
        ctx.fill();
      });

      // connect close particles
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = 'rgba(124,92,255,' + (0.12 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Initial reveal on load ---------- */
  if (document.readyState === 'complete') {
    initReveal(); animateBars(); animateCounters();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initReveal(); animateBars(); animateCounters();
    });
  }
})();

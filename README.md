# NECXY DEVELOPER — Portfolio Website

A premium, fully responsive portfolio website built with pure HTML, CSS and JavaScript.
Features a dark **Glassmorphism** UI with animated particles, 3D tilt profile, typing
effect, scroll reveals, animated counters and a custom cursor.

## Structure
```
necxy-portfolio/
├── index.html        # Main page (all sections)
├── css/
│   └── style.css     # Glassmorphism theme + animations
├── js/
│   ├── profile.js    # Profile image (embedded base64 — no external image needed)
│   └── main.js       # Particles, typing, tilt, scroll, counters, cursor
└── assets/           # Assets folder (profile pic source kept here too)
```

## Sections
- **Home** — Hero with animated profile, typing roles, social links
- **About** — Who I am & what I do
- **Skills** — Tech stack with animated bars + tool chips
- **Dev Zone** — Animated hacker terminal + dev icons (Terminal, Termux, Linux, Kali, SSH, Git)
- **Projects** — NECSTORE, NEXA, Automation Toolkit
- **Stats** — Animated counters
- **Contact** — Telegram, Instagram, GitHub, WhatsApp + channel CTA

## How to Run
Just open `index.html` in any browser — no build step, no server required.

To deploy online, drag the folder to **Netlify** / **Vercel** or push to **GitHub Pages**.

## Customize
- Edit text in `index.html`
- Change colors in `css/style.css` (look for `:root` variables)
- Profile image is embedded in `js/profile.js` (base64). To swap it, replace the
  `window.PROFILE_IMG` value with a new base64 image string.

---
Built by **NECXY DEVELOPER**

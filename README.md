
<br />

```
  ███████╗ █████╗ ██╗
  ██╔════╝██╔══██╗██║
  ███████╗███████║██║
  ╚════██║██╔══██║██║
  ███████║██║  ██║██║
  ╚══════╝╚═╝  ╚═╝╚═╝
```

### **Sai Gawand — Portfolio**

*Designer. Developer. Builder.*

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=flat-square&logo=framer&logoColor=white)](https://framer.com/motion)

<br />

</div>

---

## Overview

Personal portfolio for **Sai Gawand** — BSc (Hons) Computer Science student at RV University, Bangalore. Built to showcase engineering projects, design work, and a web-first CV.

The site features a **sticky-stack scroll** architecture where each section slides over the previous one, a **grayscale-to-color cursor reveal** on the hero photo, animated page transitions, and a fully responsive layout.

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 11 |
| Icons | react-icons |
| Fonts | Playfair Display · Instrument Serif |
| Deployment | Vercel |

---

## ✦ Site Structure

```
/                          → Hero · Projects · About · Contact
/cv                        → Web resume (+ PDF download)
/projects/[slug]           → Project detail pages
/projects/ondc-discovery-engine  → ONDC case study
```

---

## ✦ Features

- **Sticky stack scroll** — Hero pins, Projects slides over it, About slides over Projects, Contact closes the stack
- **Cursor color reveal** — Hero photo is grayscale; hovering over the face reveals color in a radial spotlight
- **Page transitions** — Black slab animation between routes
- **Splash screen** — Animated loading screen with counter, word ticker, and progress bar
- **Scroll animations** — `FadeUp`, `SlideLeft`, `ScaleUp`, `StaggerChildren` utilities via `ScrollReveal.tsx`
- **Skills marquee** — Continuous icon ticker with react-icons SVGs
- **Lightbox** — Click-to-expand images on project pages
- **Web CV** — Styled `/cv` route with PDF download

---

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
# Production build
npm run build
npm start
```

---

## ✦ Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── Hero.tsx              # Hero section with reveal effect
│   │   ├── Navbar.tsx            # Floating pill navbar
│   │   ├── Projects.tsx          # Project list with hover states
│   │   ├── About.tsx             # Bento grid + timeline
│   │   ├── Contact.tsx           # Contact cards + social links
│   │   ├── LoadingScreen.tsx     # Splash screen
│   │   ├── ScrollReveal.tsx      # Scroll animation utilities
│   │   ├── SkillsMarquee.tsx     # Icon marquee
│   │   ├── AppWrapper.tsx        # Loading state wrapper
│   │   └── ui/
│   │       └── text-marque.tsx   # Text marquee primitive
│   ├── projects/
│   │   ├── [slug]/               # Generic project template
│   │   └── ondc-discovery-engine/  # ONDC case study
│   ├── cv/                       # Web resume
│   ├── globals.css
│   └── layout.tsx
├── public/
│   ├── sai.png                   # Profile photo (bg removed)
│   ├── sai-cv.pdf                # Resume PDF
│   └── ondc/                     # Project screenshots
│       ├── baseline.png
│       ├── cache.png
│       ├── circuit.png
│       └── final.png
└── lib/
    └── utils.ts                  # cn() utility
```

---

## ✦ Required Assets

Before deploying, add these to `public/`:

| File | Description |
|---|---|
| `sai.png` | Profile photo with background removed — use [remove.bg](https://remove.bg) |
| `sai-cv.pdf` | Resume / CV in PDF format |
| `ondc/*.png` | ONDC project screenshots (baseline, cache, circuit, final) |

---

## ✦ Deploy

Connect to [Vercel](https://vercel.com) — push to GitHub and it deploys automatically.

```bash
npm run build   # verify build passes locally first
```

---

<div align="center">

<br />

Made with care by **[Sai Gawand](https://github.com/SaiGawand12)**

*Bangalore, India · 2025*

</div>

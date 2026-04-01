<div align="cent23:32:34.434 Running build in Washington, D.C., USA (East) – iad1
23:32:34.435 Build machine configuration: 2 cores, 8 GB
23:32:34.634 Cloning github.com/SaiGawand12/sai-portfolio (Branch: main, Commit: 76fd7da)
23:32:34.636 Previous build caches not available.
23:32:35.098 Cloning completed: 463.000ms
23:32:35.464 Running "vercel build"
23:32:36.149 Vercel CLI 50.38.1
23:32:36.482 Installing dependencies...
23:32:50.239 
23:32:50.240 added 377 packages in 14s
23:32:50.240 
23:32:50.241 148 packages are looking for funding
23:32:50.241   run `npm fund` for details
23:32:50.295 Detected Next.js version: 16.2.2
23:32:50.301 Running "npm run build"
23:32:50.412 
23:32:50.412 > portfolio@0.1.0 build
23:32:50.412 > next build
23:32:50.412 
23:32:50.970 Attention: Next.js now collects completely anonymous telemetry regarding usage.
23:32:50.972 This information is used to shape Next.js' roadmap and prioritize features.
23:32:50.972 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
23:32:50.973 https://nextjs.org/telemetry
23:32:50.973 
23:32:50.998 ▲ Next.js 16.2.2 (Turbopack)
23:32:50.999 
23:32:51.031   Creating an optimized production build ...
23:33:04.100 ✓ Compiled successfully in 12.7s
23:33:04.103   Running TypeScript ...
23:33:08.545 Failed to type check.
23:33:08.546 
23:33:08.546 ./app/cv/page.tsx:73:10
23:33:08.547 Type error: Type '{ children: Element; initial: { opacity: number; y: number; }; animate: { opacity: number; y: number; }; transition: { duration: number; delay: number; ease: number[]; }; className: string; }' is not assignable to type 'Omit<HTMLMotionProps<"div">, "ref">'.
23:33:08.547   Types of property 'transition' are incompatible.
23:33:08.547     Type '{ duration: number; delay: number; ease: number[]; }' is not assignable to type 'Transition<any> | undefined'.
23:33:08.547       Type '{ duration: number; delay: number; ease: number[]; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
23:33:08.548         Type '{ duration: number; delay: number; ease: number[]; }' is not assignable to type 'ValueAnimationTransition<any>'.
23:33:08.548           Types of property 'ease' are incompatible.
23:33:08.548             Type 'number[]' is not assignable to type 'Easing | Easing[] | undefined'.
23:33:08.548               Type 'number[]' is not assignable to type 'EasingFunction | Easing[]'.
23:33:08.548                 Type 'number[]' is not assignable to type 'Easing[]'.
23:33:08.549                   Type 'number' is not assignable to type 'Easing'.
23:33:08.550 
23:33:08.552   [90m71 |[0m
23:33:08.552   [90m72 |[0m         {[90m/* Header */[0m}
23:33:08.552 [31m[1m>[0m [90m73 |[0m         <motion.div className=[32m"mb-16 pb-12 border-b border-gray-100"[0m {...fade([35m0[0m)}>
23:33:08.553   [90m   |[0m          [31m[1m^[0m
23:33:08.553   [90m74 |[0m           <div className=[32m"flex flex-col md:flex-row md:items-end md:justify-between gap-6"[0m>
23:33:08.553   [90m75 |[0m             <div>
23:33:08.554   [90m76 |[0m               <h1 className=[32m"font-serif text-5xl md:text-7xl font-bold text-gray-900 leadi...[0m
23:33:08.583 Next.js build worker exited with code: 1 and signal: null
23:33:08.642 Error: Command "npm run build" exited with 1er">

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

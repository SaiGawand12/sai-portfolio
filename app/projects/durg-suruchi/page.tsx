"use client";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

function RevealWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function LineReveal({ delay = 0, className = "bg-gray-200" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`w-full h-px ${className}`}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

const sections = [
  {
    num: "01", label: "Hero",
    title: "Animated Landing Section",
    caption: "Full-screen hero with marquee text, location badge, and a bold Konkan identity. Sets the tone immediately — warm, coastal, authentic.",
    bg: "#fdf6ee",
    img: "/durg-suruchi/Hero.png",
  },
  {
    num: "02", label: "Menu",
    title: "Categorised Menu Display",
    caption: "Dishes organised by category with badges like 'Best Seller' and 'Chef's Pick'. Butter Chicken, Seafood Platter, Maharashtrian Thali — all scannable at a glance.",
    bg: "#fef3e2",
    img: "/durg-suruchi/menu.png",
  },
  {
    num: "03", label: "Gallery",
    title: "Photo Gallery",
    caption: "A visual showcase of the dining space, ambience, and exterior — giving visitors a feel of the place before they arrive.",
    bg: "#fde8d8",
    img: "/durg-suruchi/Gallery.png",
  },
  {
    num: "04", label: "Info",
    title: "Location & Contact",
    caption: "Address, hours, parking info, and direct call/directions CTAs. Everything a visitor needs to find and visit the restaurant.",
    bg: "#fef9e7",
    img: "/durg-suruchi/contact.png",
  },
];

const deliverables = [
  { num: "01", title: "Brand Identity", desc: "Warm earthy palette, Konkan-inspired typography, and a visual language that feels local and premium." },
  { num: "02", title: "Menu Architecture", desc: "Category-first layout with dish badges (Best Seller, Chef's Pick) for instant scannability." },
  { num: "03", title: "Social Proof", desc: "Six real customer testimonials woven into the layout — not a separate section, part of the flow." },
  { num: "04", title: "Conversion CTAs", desc: "Direct call and Google Maps directions buttons above the fold on mobile. Zero friction to visit." },
];

const stack = ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel", "TypeScript"];

export default function DurgSuruchiPage() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Back */}
      <motion.div
        className="fixed top-6 left-8 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm"
        >
          ← Back
        </Link>
      </motion.div>

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#fdf0dc", minHeight: "92vh" }}>
        {/* Vertical grid lines */}
        {[20, 40, 60, 80].map((p, i) => (
          <motion.div key={p} className="absolute top-0 bottom-0 w-px bg-black/[0.06]" style={{ left: `${p}%` }}
            initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
        ))}

        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif font-bold text-black/[0.04] whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 22vw, 22vw)", letterSpacing: "-0.02em" }}>
            KONKAN
          </span>
        </div>

        <div className="relative px-8 md:px-20 pt-40 pb-28 flex flex-col justify-between min-h-[92vh]">
          {/* Eyebrow */}
          <motion.div className="flex items-center gap-6"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">2025</span>
            <motion.span className="h-px bg-gray-400" initial={{ width: 0 }} animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.5 }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">Restaurant · Web Design</span>
          </motion.div>

          {/* Main title */}
          <div className="mt-auto pt-16">
            <h1 className="font-serif font-bold text-gray-900 leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
              <RevealWords text="Durg Suruchi" delay={0.3} />
              <RevealWords text="Wada" className="text-gray-400" delay={0.45} />
            </h1>

            <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="flex flex-col gap-4">
                <motion.p className="text-base md:text-lg text-gray-500 max-w-md leading-relaxed"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}>
                  A digital presence for an authentic Maharashtrian restaurant in Gondhalpada, Alibag — built to convert visitors into guests.
                </motion.p>
                <motion.div className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  {["React", "Next.js", "Web Design", "Konkan"].map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-orange-300/70 text-orange-700 font-mono tracking-wide bg-orange-50/50">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.div className="flex flex-col gap-3 md:items-end"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}>
                <a href="https://durg-suruchi.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3.5 rounded-full text-sm font-medium transition-all hover:shadow-xl group">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  View Live Site
                  <motion.span className="inline-block" whileHover={{ x: 3, y: -3 }}>↗</motion.span>
                </a>
                <span className="font-mono text-xs text-gray-400 tracking-widest">Gondhalpada · Alibag, MH</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FULL-WIDTH HERO SCREENSHOT ── */}
      <motion.div
        className="w-full overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/durg-suruchi/Hero.png"
          alt="Durg Suruchi Wada — Hero Section"
          className="w-full h-auto object-cover cursor-zoom-in"
          onClick={() => setLightbox({ src: "/durg-suruchi/Hero.png", title: "Hero Section" })}
        />
      </motion.div>

      {/* ── OVERVIEW ── */}
      <div className="px-8 md:px-20 py-28 border-b border-gray-100">
        <div className="max-w-5xl grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-4">The Brief</p>
            <motion.div className="h-px bg-gray-300" initial={{ width: 0 }} whileInView={{ width: 32 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
          </motion.div>
          <div>
            <RevealWords
              text="Durg Suruchi Wada needed more than a website — they needed a digital experience that felt as warm as their food."
              className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 font-light"
              delay={0.1}
            />
            <motion.p className="text-base text-gray-500 leading-relaxed"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
              A beloved family restaurant in Gondhalpada, just minutes from Alibag, serving fresh Konkan seafood, bold chicken dishes, and traditional Maharashtrian thalis. The goal was a single-page site that communicates authenticity, drives footfall, and works flawlessly on mobile — where most of their customers discover them.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── DELIVERABLES ── */}
      <div className="px-8 md:px-20 py-28 border-b border-gray-100 bg-[#fdf8f2]">
        <div className="max-w-5xl mx-auto">
          <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            What I Built
          </motion.p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none mb-12">
            <RevealWords text="Four Design" delay={0} />
            <RevealWords text="Decisions" delay={0.1} />
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-gray-200">
            {deliverables.map((d, i) => (
              <motion.div key={i}
                className="bg-[#fdf8f2] p-8 md:p-10 group hover:bg-white transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs tracking-widest text-gray-300">{d.num}</span>
                  <motion.span className="text-gray-200 group-hover:text-gray-400 transition-colors text-lg"
                    whileHover={{ x: 3, y: -3 }}>↗</motion.span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {d.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCREENS ── */}
      <div className="px-8 md:px-20 py-28 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Page Sections
              </motion.p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                <RevealWords text="Every Screen" delay={0} />
                <RevealWords text="Considered" delay={0.1} />
              </h2>
            </div>
            <motion.a href="https://durg-suruchi.vercel.app" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 4 }}>
              Live site →
            </motion.a>
          </div>

          <LineReveal delay={0.2} />

          {/* Alternating layout */}
          <div className="mt-16 flex flex-col gap-24">
            {sections.map((s, i) => (
              <motion.div key={i}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                {/* Image */}
                <div className="group relative rounded-2xl overflow-hidden cursor-zoom-in shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  onClick={() => setLightbox({ src: s.img, title: s.title })}>
                  <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: s.bg }}>
                    <img src={s.img} alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-end p-4">
                    <span className="font-mono text-[10px] text-white/0 group-hover:text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full transition-all duration-300">
                      Click to expand
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-gray-300">{s.num}</span>
                    <span className="w-6 h-px bg-gray-200" />
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-orange-500">{s.label}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{s.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{s.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STACK ── */}
      <div className="px-8 md:px-20 py-28">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-6"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Built With
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {stack.map((s, i) => (
                <motion.span key={s}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50 transition-all cursor-default"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: "backOut" }}
                  whileHover={{ scale: 1.05 }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.a href="https://durg-suruchi.vercel.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white px-7 py-4 rounded-full text-sm font-medium transition-all hover:shadow-xl whitespace-nowrap self-start md:self-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ scale: 1.03, x: 4 }}>
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Visit the Site ↗
          </motion.a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}>
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div className="relative z-10 max-w-6xl w-full"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto rounded-2xl shadow-2xl" />
              <div className="flex items-center justify-between mt-4 px-1">
                <p className="font-mono text-sm text-white/50">{lightbox.title}</p>
                <button onClick={() => setLightbox(null)}
                  className="font-mono text-xs text-white/40 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-full">
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

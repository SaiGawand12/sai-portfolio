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

function LineReveal({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="w-full h-px bg-gray-200"
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

const highlights = [
  { metric: "Pages",      result: "1",          decision: "Single-page, scroll-based UX",          delta: "Fast" },
  { metric: "Dishes",     result: "6+",          decision: "Menu with category badges",              delta: "✓" },
  { metric: "Reviews",    result: "6",           decision: "Real customer testimonials",             delta: "Social proof" },
  { metric: "Deploy",     result: "Vercel",      decision: "Zero-config, instant global CDN",        delta: "Live ↗" },
];

const stack = ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel", "TypeScript"];

export default function DurgSuruchiPage() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

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
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200"
        >
          ← Back
        </Link>
      </motion.div>

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#fdf6ee" }}>
        {[20, 40, 60, 80].map((p, i) => (
          <motion.div
            key={p}
            className="absolute top-0 bottom-0 w-px bg-black/5"
            style={{ left: `${p}%` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        <div className="relative px-8 md:px-20 pt-36 pb-24">
          <motion.div
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">2025</span>
            <motion.span className="h-px bg-gray-400" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.8, delay: 0.4 }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">Restaurant Website</span>
          </motion.div>

          <h1 className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight mb-6" style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}>
            <RevealWords text="Durg Suruchi" delay={0.15} />
            <RevealWords text="Wada" className="text-gray-400" delay={0.25} />
          </h1>

          <motion.p
            className="text-sm font-mono tracking-[0.2em] uppercase text-gray-500 mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          >
            Gondhalpada · Alibag, Maharashtra — Authentic Maharashtrian Flavors
          </motion.p>

          <div className="flex flex-wrap gap-2 mb-12">
            {["React", "Next.js", "Web Design", "Konkan"].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs px-4 py-2 rounded-full border border-orange-300/60 text-orange-700 font-medium tracking-wide"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.08, ease: "backOut" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Live link CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}>
            <a
              href="https://durg-suruchi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              View Live Site ↗
            </a>
          </motion.div>
        </div>
      </div>

      {/* Overview */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-4">Overview</p>
            <motion.div className="h-px bg-gray-300" initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
          </motion.div>
          <div>
            <RevealWords
              text="A full restaurant website for Durg Suruchi Wada — a beloved family eatery in Gondhalpada, Alibag serving authentic Maharashtrian cuisine."
              className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 font-light"
              delay={0.1}
            />
            <motion.p
              className="text-base text-gray-500 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Built to give the restaurant a strong digital presence — showcasing their menu of fresh seafood, chicken specialties, and traditional thalis. The site features a scroll-based single-page layout with animated sections, a categorised menu with dish badges, customer testimonials, a photo gallery, and a location/contact section with direct call and directions CTAs.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                What&apos;s Inside
              </motion.p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                <RevealWords text="Page Sections" delay={0} />
              </h2>
            </div>
            <motion.a
              href="https://durg-suruchi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-xs font-mono text-gray-400 hover:text-gray-900 tracking-widest transition-colors"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Live site ↗
            </motion.a>
          </div>

          <LineReveal delay={0.2} />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                className="group rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="aspect-[16/9] relative flex items-center justify-center overflow-hidden cursor-zoom-in"
                  style={{ backgroundColor: s.bg }}
                  onClick={() => s.img && setLightbox({ src: s.img, title: s.title })}
                >
                  {s.img ? (
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <span className="font-serif text-5xl font-bold text-black/5 select-none">{s.label}</span>
                  )}
                  <motion.span
                    className="absolute top-4 left-4 font-mono text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {s.num} — {s.label}
                  </motion.span>
                  {s.img && (
                    <span className="absolute bottom-4 right-4 font-mono text-[10px] text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to expand
                    </span>
                  )}
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights table */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Project Highlights
          </motion.p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none mb-10">
            <RevealWords text="By the Numbers" delay={0} />
          </h2>
          <LineReveal />

          <div className="mt-2">
            <motion.div className="grid grid-cols-12 py-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <span className="col-span-1 text-xs font-mono uppercase tracking-widest text-gray-300">#</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Area</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Value</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Detail</span>
              <span className="col-span-2 text-xs font-mono uppercase tracking-widest text-gray-400 text-right">Signal</span>
            </motion.div>

            {highlights.map((row, i) => (
              <div key={i}>
                <LineReveal delay={i * 0.05} />
                <motion.div
                  className="grid grid-cols-12 py-7 items-center group hover:bg-orange-50/50 -mx-4 px-4 rounded-xl transition-colors cursor-default"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="col-span-1 text-xs font-mono text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-3 text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{row.metric}</span>
                  <span className="col-span-3 font-serif text-2xl md:text-3xl font-bold text-gray-900">{row.result}</span>
                  <span className="col-span-3 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">{row.decision}</span>
                  <motion.span
                    className="col-span-2 text-right text-sm font-mono font-bold text-orange-600"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200 }}
                  >
                    {row.delta}
                  </motion.span>
                </motion.div>
              </div>
            ))}
            <LineReveal delay={0.3} />
          </div>
        </div>
      </div>

      {/* Stack */}
      <div className="px-8 md:px-20 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Core Stack
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {stack.map((s, i) => (
              <motion.span
                key={s}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50 transition-all cursor-default"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "backOut" }}
                whileHover={{ scale: 1.05 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 max-w-6xl w-full"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto rounded-2xl shadow-2xl" />
              <div className="flex items-center justify-between mt-4 px-1">
                <p className="font-mono text-sm text-white/60">{lightbox.title}</p>
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

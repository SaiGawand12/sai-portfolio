"use client";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, raw, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ── Word-by-word reveal ───────────────────────────────────────────────────────
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

// ── Horizontal line reveal ────────────────────────────────────────────────────
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

const metrics = [
  { metric: "P99 Latency",         result: "475", suffix: "ms",  decision: "Speculative Hedged Requests",  delta: "↓ 36%" },
  { metric: "AI Inference Cost",   result: "0",   suffix: "%",   decision: "Semantic Redis Caching",       delta: "↓ 60%" },
  { metric: "Internal Throughput", result: "161", suffix: " QPS",decision: "Golang Goroutines",            delta: "↑ 54%" },
  { metric: "Uptime",              result: "100", suffix: "%",   decision: "Heartbeats & Circuit Breaker", delta: "✓" },
];

const journey = [
  { num: "01", label: "Baseline",       title: "Identifying the Bottleneck",  caption: "P99 = 747ms. Provider mfine clocking 625ms was dragging the entire network's tail latency.", bg: "#e4ede4", img: "/ondc/baseline.png" },
  { num: "02", label: "AI Optimization",title: "Semantic Caching Layer",      caption: "99.9% cache hit rate in Redis. Deduplicated LLM calls, pushing throughput to 247 req/s.",    bg: "#e8f0e4", img: "/ondc/cache.png" },
  { num: "03", label: "Resilience",     title: "Circuit Breaker Proof",       caption: "Simulated 30+ QPS until the breaker tripped at state=1, proving self-healing under stress.",  bg: "#f5ede4", img: "/ondc/circuit.png" },
  { num: "04", label: "Breakthrough",   title: "Breaking the 500ms Wall",     caption: "Hedged Requests fire speculative backup calls to beat slow nodes. P99 stabilised at 475ms.",  bg: "#e4eaf5", img: "/ondc/final.png" },
];

const stack = ["Golang", "Redis", "gRPC", "Grafana", "k6", "Docker", "ONDC Protocol", "LLM Scoring"];

const heroStats = [
  { v: 475, suffix: "ms", l: "P99 Latency" },
  { v: 100, suffix: "+",  l: "Providers" },
  { v: 161, suffix: "",   l: "QPS Internal" },
  { v: 99,  suffix: ".9%",l: "Cache Hit Rate" },
];

export default function OndcPage() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Back ── */}
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

      {/* ── HERO BAND ── */}
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#e4ede4" }}>
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
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">2025</span>
            <motion.span
              className="h-px bg-gray-400"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">Distributed Systems</span>
          </motion.div>

          {/* Title — word by word */}
          <h1
            className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
          >
            <RevealWords text="High-Scale" delay={0.15} />
            <RevealWords text="Interoperable" className="text-gray-400" delay={0.25} />
            <RevealWords text="Discovery Engine" delay={0.35} />
          </h1>

          {/* Sub-label */}
          <motion.p
            className="text-sm font-mono tracking-[0.2em] uppercase text-gray-500 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            ONDC / UHI — India&apos;s Digital Public Infrastructure
          </motion.p>

          {/* Tags stagger */}
          <div className="flex flex-wrap gap-2 mb-12">
            {["Distributed Systems", "Golang", "AI Orchestration", "Observability"].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs px-4 py-2 rounded-full border border-gray-400/60 text-gray-600 font-medium tracking-wide"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.08, ease: "backOut" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Stat strip with animated counters */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {heroStats.map(({ v, suffix, l }) => (
              <div key={l} className="bg-white/80 px-6 py-5">
                <p className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-none mb-1">
                  <Counter to={v} suffix={suffix} />
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-4">Overview</p>
            <motion.div
              className="h-px bg-gray-300"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>
          <div>
            <RevealWords
              text='I engineered a discovery engine for India&apos;s Digital Public Infrastructure to solve the "Tail Latency" problem inherent in decentralized networks.'
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
              Unlike Amazon, which hits a single internal database, ONDC requires fanning out queries to 100+ external providers simultaneously. My implementation ensures the user experience never suffers from a single slow provider — using speculative Hedged Requests and Semantic Caching to stabilise P99 at{" "}
              <strong className="text-gray-800">475ms</strong> while handling{" "}
              <strong className="text-gray-800">160+ QPS</strong>.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── JOURNEY ── */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <motion.p
                className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              >
                Optimization Journey
              </motion.p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                <RevealWords text="Four Steps" delay={0} />
                <RevealWords text="to 475ms" delay={0.1} />
              </h2>
            </div>
            <motion.span
              className="hidden md:block text-xs font-mono text-gray-300 tracking-widest"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              P99: 747ms → 475ms
            </motion.span>
          </div>

          <LineReveal delay={0.2} />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {journey.map((step, i) => (
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
                  style={{ backgroundColor: step.bg }}
                  onClick={() => step.img && setLightbox({ src: step.img, title: step.title })}
                >
                  {step.img && (
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                  <motion.span
                    className="absolute top-4 left-4 font-mono text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {step.num} — {step.label}
                  </motion.span>
                  {/* Click hint */}
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand
                  </span>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── METRICS TABLE ── */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Proof of Work
          </motion.p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none mb-10">
            <RevealWords text="Performance Metrics" delay={0} />
          </h2>
          <LineReveal />

          <div className="mt-2">
            {/* Header */}
            <motion.div
              className="grid grid-cols-12 py-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="col-span-1 text-xs font-mono uppercase tracking-widest text-gray-300">#</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Metric</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Result</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Decision</span>
              <span className="col-span-2 text-xs font-mono uppercase tracking-widest text-gray-400 text-right">Δ</span>
            </motion.div>

            {metrics.map((row, i) => (
              <div key={i}>
                <LineReveal delay={i * 0.05} />
                <motion.div
                  className="grid grid-cols-12 py-7 items-center group hover:bg-gray-50/80 -mx-4 px-4 rounded-xl transition-colors cursor-default"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="col-span-1 text-xs font-mono text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-3 text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{row.metric}</span>
                  <span className="col-span-3 font-serif text-2xl md:text-3xl font-bold text-gray-900">
                    <Counter to={Number(row.result)} suffix={row.suffix} />
                  </span>
                  <span className="col-span-3 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">{row.decision}</span>
                  <motion.span
                    className="col-span-2 text-right text-sm font-mono font-bold text-emerald-600"
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

      {/* ── STACK ── */}
      <div className="px-8 md:px-20 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Core Stack
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {stack.map((s, i) => (
              <motion.span
                key={s}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all cursor-default"
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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-6xl w-full"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title}
                className="w-full h-auto rounded-2xl shadow-2xl" />
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

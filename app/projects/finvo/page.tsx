"use client";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => { if (inView) raw.set(to); }, [inView, raw, to]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

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

const heroStats = [
  { v: 100, suffix: "%", l: "GST-Ready Invoices" },
  { v: 5,   suffix: "x",  l: "Faster Collections" },
  { v: 360, suffix: "°",  l: "Finance Workflow" },
  { v: 0,   suffix: " deps", l: "External Auth" },
];

const features = [
  {
    num: "01", label: "Payments",
    title: "Razorpay Inline Checkout",
    caption: "Milestone-triggered invoices with Razorpay inline payments. Clients pay without leaving the portal — no redirects, no friction.",
    bg: "#fef3e2",
    img: "/finvo/Razorpay.png",
  },
  {
    num: "02", label: "AI",
    title: "Claude Negotiation Assistant",
    caption: "Live Anthropic Claude API calls generate professional dispute responses in real time. Not pre-written templates — actual context-aware reasoning.",
    bg: "#fde8d8",
    img: "/finvo/claude.png",
  },
  {
    num: "03", label: "Forecasting",
    title: "Weighted Cash Flow Models",
    caption: "Per-client forecasting built on weighted payment behaviour history. Predicts runway and flags at-risk invoices before they go overdue.",
    bg: "#fef9e7",
    img: "/finvo/forecasting.png",
  },
  {
    num: "04", label: "Portal",
    title: "White-Label Client Portal",
    caption: "Magic link authentication — no passwords, no OAuth dependencies. Clients get a branded self-service portal scoped to their data via Supabase RLS.",
    bg: "#fde8f0",
    img: "/finvo/client portal.png",
  },
];

const stack = [
  "Next.js 14", "Supabase", "Row-Level Security", "Razorpay",
  "Anthropic Claude", "EmailJS", "TypeScript", "Tailwind CSS",
];

const metrics = [
  { metric: "Invoice Generation",  result: "GST",   suffix: "-Ready", decision: "Indian tax compliance built-in",       delta: "✓" },
  { metric: "Auth Method",         result: "Magic", suffix: " Link",  decision: "Zero-password client onboarding",      delta: "↑ UX" },
  { metric: "Data Isolation",      result: "RLS",   suffix: "",       decision: "Supabase Row-Level Security",          delta: "✓ Multi-tenant" },
  { metric: "AI Response",         result: "Live",  suffix: " API",   decision: "Real-time Claude inference, no cache", delta: "Real-time" },
];

export default function FinvoPage() {
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
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#fef3e2" }}>
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
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-500">Billing &amp; Finance SaaS</span>
          </motion.div>

          <h1 className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight mb-6" style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}>
            <RevealWords text="Finvo" delay={0.15} />
            <RevealWords text="Billing Intelligence" className="text-gray-400" delay={0.25} />
            <RevealWords text="for Freelancers" delay={0.35} />
          </h1>

          <motion.p
            className="text-sm font-mono tracking-[0.2em] uppercase text-gray-500 mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          >
            Next.js · Supabase · Razorpay · Anthropic Claude — India
          </motion.p>

          <div className="flex flex-wrap gap-2 mb-12">
            {["Full Stack", "SaaS", "AI", "Fintech", "India"].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs px-4 py-2 rounded-full border border-amber-400/60 text-amber-700 font-medium tracking-wide"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.08, ease: "backOut" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {heroStats.map(({ v, suffix, l }) => (
              <div key={l} className="bg-white/60 backdrop-blur-sm px-6 py-5">
                <p className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-none mb-1">
                  <Counter to={v} suffix={suffix} />
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{l}</p>
              </div>
            ))}
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
              text="A full-stack billing SaaS built for the Indian freelance market — covering the entire finance workflow from contract to collection."
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
              Finvo handles contract and milestone management with auto-invoice triggers, Razorpay inline payments, per-client cash flow forecasting using{" "}
              <strong className="text-gray-800">weighted payment behaviour models</strong>, and an AI negotiation assistant powered by the{" "}
              <strong className="text-gray-800">Anthropic Claude API</strong> that generates professional dispute responses in real time. Includes a white-labelled client self-service portal with magic link authentication, automated overdue reminders via EmailJS, client health scoring, a freelancer runway calculator, and GST-ready invoice generation.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Core Features
              </motion.p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                <RevealWords text="Built for the" delay={0} />
                <RevealWords text="Indian Freelancer" delay={0.1} />
              </h2>
            </div>
          </div>

          <LineReveal delay={0.2} />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="group rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[16/9] relative flex items-center justify-center overflow-hidden cursor-zoom-in" style={{ backgroundColor: f.bg }}
                  onClick={() => f.img && setLightbox({ src: f.img, title: f.title })}>
                  {f.img && (
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                  <motion.span
                    className="absolute top-4 left-4 font-mono text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {f.num} — {f.label}
                  </motion.span>
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand
                  </span>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-8 md:px-20 py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Technical Decisions
          </motion.p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-none mb-10">
            <RevealWords text="What Makes It Different" delay={0} />
          </h2>
          <LineReveal />

          <div className="mt-2">
            <motion.div className="grid grid-cols-12 py-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <span className="col-span-1 text-xs font-mono uppercase tracking-widest text-gray-300">#</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Area</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Approach</span>
              <span className="col-span-3 text-xs font-mono uppercase tracking-widest text-gray-400">Rationale</span>
              <span className="col-span-2 text-xs font-mono uppercase tracking-widest text-gray-400 text-right">Signal</span>
            </motion.div>

            {metrics.map((row, i) => (
              <div key={i}>
                <LineReveal delay={i * 0.05} />
                <motion.div
                  className="grid grid-cols-12 py-7 items-center group hover:bg-amber-50/60 -mx-4 px-4 rounded-xl transition-colors cursor-default"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="col-span-1 text-xs font-mono text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-3 text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{row.metric}</span>
                  <span className="col-span-3 font-serif text-2xl md:text-3xl font-bold text-gray-900">{row.result}<span className="text-lg">{row.suffix}</span></span>
                  <span className="col-span-3 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">{row.decision}</span>
                  <motion.span
                    className="col-span-2 text-right text-sm font-mono font-bold text-amber-600"
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
                className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all cursor-default"
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

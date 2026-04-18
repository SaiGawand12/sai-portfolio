"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SkillsMarquee from "./SkillsMarquee";

function RevealWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em", paddingBottom: "0.15em" }}>
          <motion.span style={{ display: "inline-block" }}
            initial={{ y: "110%" }} animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const timeline = [
  { year: "2022", title: "RV University",         sub: "BSc (Hons) CS begins. First line of code meets first pixel.", tag: "Education" },
  { year: "2023", title: "First Shipped Product",  sub: "End-to-end e-commerce — designed, built, deployed solo.", tag: "Milestone" },
  { year: "2024", title: "ONDC Discovery Engine",  sub: "Distributed systems. 100+ providers. P99 < 500ms.", tag: "Engineering" },
  { year: "Mar 2026", title: "Budhi Trade",         sub: "Software Engineering internship — building real-world products.", tag: "Internship" },
];

const stats = [
  { value: "3+",   label: "Years building" },
  { value: "10+",  label: "Projects shipped" },
  { value: "160+", label: "QPS handled" },
  { value: "100%", label: "Passion" },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="about" className="bg-white overflow-hidden">

      {/* ══════════════════════════════════════════
          SECTION 1 — CINEMATIC OPENER
      ══════════════════════════════════════════ */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col bg-gray-950" style={{ overflow: "clip" }}>

        {/* Parallax background text */}
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ y: bgY }}>
          <span className="font-serif font-bold text-white/[0.03] leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 25vw, 25rem)" }}>
            SAI
          </span>
        </motion.div>

        {/* Grid lines */}
        {[25, 50, 75].map((p, i) => (
          <motion.div key={p} className="absolute top-0 bottom-0 w-px bg-white/5" style={{ left: `${p}%` }}
            initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.1 }} />
        ))}

        {/* Top meta */}
        <div className="relative flex items-start justify-between px-8 md:px-16 pt-16 md:pt-20">
          <motion.div initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/30">About</p>
          </motion.div>
          <motion.div className="hidden md:flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">Open to work</span>
          </motion.div>
        </div>

        {/* Giant headline */}
        <div className="relative flex-1 flex flex-col justify-center px-8 md:px-16 py-16 pb-20">
          <h2 className="font-serif font-bold leading-[0.85] tracking-tight text-white overflow-visible"
            style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}>
            <RevealWords text="Designer." delay={0} />
            <RevealWords text="Developer." className="text-white/20" delay={0.12} />
            <RevealWords text="Builder." delay={0.24} />
          </h2>
        </div>

        {/* Bottom strip */}
        <div className="relative px-8 md:px-16 pb-16 grid md:grid-cols-2 gap-8 items-end">
          <motion.p className="text-base md:text-lg text-white/50 leading-relaxed max-w-md font-light"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            I&apos;m Sai — living at the intersection of aesthetics and engineering. I care about how things{" "}
            <span className="text-white font-medium">look</span> just as much as how they{" "}
            <span className="text-white font-medium">work</span>.
          </motion.p>
          {/* Stat row */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5 }}>
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08 }}>
                <p className="font-serif text-2xl md:text-3xl font-bold text-white leading-none mb-1">{s.value}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/30">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — BENTO GRID
      ══════════════════════════════════════════ */}
      <div className="px-6 md:px-16 py-16 md:py-24 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">

          {/* Bio — large */}
          <motion.div className="col-span-12 md:col-span-8 bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[260px]"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-6">Who I am</p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mb-4">
              I&apos;m <span className="text-gray-900 font-semibold">Sai Gawand</span> — a BSc (Hons) Computer Science student at{" "}
              <span className="text-gray-900 font-semibold">RV University</span> (2022–2026), living at the intersection of design and engineering.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              Currently interning at <span className="text-gray-800 font-medium">Budhi Trade</span> (March 2026), where I work on real-world software. I&apos;ve spent the last few years shipping products end-to-end — from brand identities and UI systems to distributed backends handling{" "}
              <span className="text-gray-800 font-medium">160+ QPS</span>. I&apos;m targeting roles in <span className="text-gray-800 font-medium">SDE, Frontend, UI/UX, and Backend</span>.
            </p>
          </motion.div>

          {/* Location card */}
          <motion.div className="col-span-12 md:col-span-4 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between min-h-[160px] bg-white"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="font-mono text-[11px] tracking-widest uppercase text-gray-400">Location</p>
            <div>
              <p className="font-serif text-3xl font-bold text-gray-900 leading-none mb-1">Bangalore</p>
              <p className="font-mono text-xs text-gray-400">India · UTC+5:30</p>
            </div>
          </motion.div>

          {/* Internship card */}
          <motion.div className="col-span-12 md:col-span-4 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between min-h-[160px]"
            style={{ backgroundColor: "#e4ede4" }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}>
            <p className="font-mono text-[11px] tracking-widest uppercase text-gray-500">Internship</p>
            <div>
              <p className="font-serif text-2xl font-bold text-gray-900 leading-none mb-1">Budhi Trade</p>
              <p className="font-mono text-xs text-gray-500">March 2026 · Present</p>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div className="col-span-12 md:col-span-3 rounded-3xl p-8 md:p-10 border border-gray-100 flex flex-col justify-between min-h-[200px]"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-4">Philosophy</p>
            <p className="text-base text-gray-600 leading-relaxed font-light italic">
              &ldquo;The best engineers understand design. The best designers understand systems.&rdquo;
            </p>
          </motion.div>

          {/* Roles targeting */}
          <motion.div className="col-span-12 md:col-span-5 rounded-3xl p-8 border border-gray-100 flex flex-col gap-4 bg-white"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}>
            <p className="font-mono text-[11px] tracking-widest uppercase text-gray-400">Open to roles</p>
            <div className="flex flex-wrap gap-2">
              {["SDE", "Frontend Engineer", "UI/UX Designer", "Backend Engineer", "Full-Stack"].map((role) => (
                <span key={role} className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 font-medium">
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Currently — dark */}
          <motion.div className="col-span-12 bg-gray-950 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-white/30 mb-3">Education</p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-white leading-none mb-1">RV University</p>
              <p className="text-white/40 text-sm">BSc (Hons) Computer Science · 2022 — 2026 · Bangalore</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.a href="/cv"
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/60 hover:text-white px-5 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                whileHover={{ scale: 1.04 }}>
                View CV ↗
              </motion.a>
              <motion.a href="mailto:saigawand90@gmail.com"
                className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-gray-900 px-6 py-3 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.04 }}>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900/40 animate-pulse" />
                Hire Me
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3 — TIMELINE
      ══════════════════════════════════════════ */}
      <div className="px-6 md:px-16 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <motion.p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-3"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Journey
              </motion.p>
              <h3 className="font-serif font-bold text-gray-900 leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
                <RevealWords text="The Story" />
                <RevealWords text="So Far" className="text-gray-200" delay={0.1} />
              </h3>
            </div>
            <motion.span className="hidden md:block font-mono text-xs text-gray-200 tracking-widest"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}>
              2022 → Present
            </motion.span>
          </div>

          <div>
            {timeline.map((item, i) => (
              <div key={i}>
                <motion.div className="w-full h-px bg-gray-100"
                  initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05 }} />
                <motion.div
                  className="py-6 md:py-8 grid grid-cols-12 gap-4 items-center group cursor-default hover:bg-gray-50/60 -mx-4 px-4 rounded-2xl transition-colors"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="col-span-2 font-mono text-xs tracking-widest text-gray-300">{item.year}</span>
                  <span className="col-span-1 font-serif text-4xl md:text-5xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors hidden md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-7 md:col-span-5">
                    <p className="font-serif text-lg md:text-2xl font-bold text-gray-900 group-hover:translate-x-1 transition-transform duration-300 mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed md:hidden">{item.sub}</p>
                  </div>
                  <p className="col-span-3 text-sm text-gray-400 leading-relaxed hidden md:block">{item.sub}</p>
                  <div className="col-span-3 md:col-span-1 flex justify-end">
                    <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-gray-100 text-gray-400">
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
            <motion.div className="w-full h-px bg-gray-100"
              initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 4 — SKILLS MARQUEE
      ══════════════════════════════════════════ */}
      <div className="py-10 border-b border-gray-100 bg-gray-50/50">
        <div className="px-6 md:px-16 max-w-6xl mx-auto mb-6">
          <motion.p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Skills
          </motion.p>
        </div>
        <div className="border-t border-gray-100 py-4">
          <SkillsMarquee />
        </div>
        <div className="border-t border-gray-100" />
      </div>


    </section>
  );
}

"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const experience = [
  {
    role: "Software Engineering Intern",
    company: "Budhi Trade",
    period: "March 2026 — Present",
    desc: "Building real-world software products. Working across frontend and backend systems.",
  },
];

const projects = [
  {
    title: "ONDC Discovery Engine",
    tags: ["Golang", "Distributed Systems", "AI Orchestration"],
    desc: "Production-grade search orchestrator achieving sub-500ms P99 latency across 100+ decentralized providers using Hedged Requests and Semantic Caching.",
    stat: "P99: 475ms · 161 QPS",
  },
  {
    title: "E-Commerce Platform",
    tags: ["React", "Node.js", "PostgreSQL"],
    desc: "End-to-end shopping experience with real-time inventory, Stripe payments, and a custom CMS.",
    stat: "Full-Stack",
  },
  {
    title: "SaaS Dashboard",
    tags: ["Next.js", "UI/UX"],
    desc: "Analytics dashboard with live charts, role-based access control, and a dark/light design system.",
    stat: "Design System",
  },
];

const skills = {
  "Frontend":    ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  "Backend":     ["Golang", "Node.js", "gRPC", "REST APIs", "PostgreSQL", "Redis"],
  "Design":      ["Figma", "UI/UX Design", "Prototyping", "Design Systems"],
  "Infra":       ["Docker", "Grafana", "k6", "Git", "Linux"],
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function CVPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-16 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to Portfolio
        </Link>
        <div className="flex items-center gap-3">
          <a href="/sai-cv.pdf" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-all">
            View PDF ↗
          </a>
          <a href="/sai-cv.pdf" download="Sai-Gawand-CV.pdf"
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
            <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center text-[9px]">↓</span>
            Download CV
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Header */}
        <motion.div className="mb-16 pb-12 border-b border-gray-100" {...fade(0)}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 leading-none mb-3">
                Sai Gawand
              </h1>
              <p className="text-lg text-gray-500 font-light">Designer & Developer · Bangalore, India</p>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-400 md:text-right font-mono">
              <a href="mailto:saigawand90@gmail.com" className="hover:text-gray-700 transition-colors">saigawand90@gmail.com</a>
              <a href="https://github.com/SaiGawand12" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">github.com/SaiGawand12</a>
              <a href="https://linkedin.com/in/sai-gawand-aa719025b/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">linkedin.com/in/sai-gawand</a>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.section className="mb-14" {...fade(0.1)}>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">Summary</p>
          <p className="text-lg text-gray-600 leading-relaxed font-light max-w-2xl">
            BSc (Hons) Computer Science student at RV University (2022–2026) with hands-on experience building production systems. I work across the full stack — from pixel-perfect UI to distributed backends. Currently interning at Budhi Trade. Open to SDE, Frontend, UI/UX, and Backend roles.
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section className="mb-14" {...fade(0.15)}>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-6">Experience</p>
          {experience.map((e, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-6 border-t border-gray-100">
              <div className="md:w-48 flex-shrink-0">
                <p className="font-mono text-xs text-gray-400">{e.period}</p>
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-gray-900 mb-0.5">{e.role}</p>
                <p className="text-sm font-medium text-emerald-600 mb-2">{e.company}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-100" />
        </motion.section>

        {/* Education */}
        <motion.section className="mb-14" {...fade(0.2)}>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-6">Education</p>
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-6 border-t border-gray-100">
            <div className="md:w-48 flex-shrink-0">
              <p className="font-mono text-xs text-gray-400">2022 — 2026</p>
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-gray-900 mb-0.5">BSc (Hons) Computer Science</p>
              <p className="text-sm font-medium text-emerald-600 mb-2">RV University, Bangalore</p>
              <p className="text-sm text-gray-500">Full-stack development, distributed systems, UI/UX design.</p>
            </div>
          </div>
          <div className="border-t border-gray-100" />
        </motion.section>

        {/* Projects */}
        <motion.section className="mb-14" {...fade(0.25)}>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-6">Projects</p>
          <div className="flex flex-col">
            {projects.map((p, i) => (
              <div key={i} className="py-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                  <p className="font-serif text-xl font-bold text-gray-900">{p.title}</p>
                  <span className="font-mono text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full self-start">{p.stat}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-500 font-mono">{t}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
            <div className="border-t border-gray-100" />
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section className="mb-14" {...fade(0.3)}>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-6">Skills</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-3 pb-2 border-b border-gray-100">{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => (
                    <span key={s} className="text-sm px-3 py-1 rounded-full border border-gray-200 text-gray-600">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div className="pt-8 border-t border-gray-100 flex items-center justify-between" {...fade(0.35)}>
          <p className="font-mono text-[11px] tracking-widest uppercase text-gray-300">© 2025 Sai Gawand</p>
          <a href="/sai-cv.pdf" download="Sai-Gawand-CV.pdf"
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all">
            Download PDF
          </a>
        </motion.div>

      </div>
    </main>
  );
}

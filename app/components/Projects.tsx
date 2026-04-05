"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TransitionLink from "./TransitionLink";
import { FadeUp, SlideLeft, StaggerChildren, StaggerItem } from "./ScrollReveal";

const projects = [
  {
    num: "01",
    title: "ONDC Discovery Engine",
    slug: "ondc-discovery-engine",
    tags: ["Distributed Systems", "Golang", "AI Orchestration"],
    desc: "Production-grade search orchestrator. Sub-500ms P99 across 100+ providers.",
    year: "2025",
    color: "#e4ede4",
    stat: "475ms P99",
    live: "",
    github: "https://github.com/saigawand/ondc-discovery-engine",
  },
  {
    num: "02",
    title: "Finvo",
    slug: "finvo",
    tags: ["Full Stack", "SaaS", "AI", "Fintech"],
    desc: "AI-powered billing SaaS for Indian freelancers. Cash flow forecasting, Razorpay payments, and a Claude-powered negotiation assistant.",
    year: "2025",
    color: "#fef3e2",
    stat: "AI · Fintech",
    live: "https://finvo-web.vercel.app/",
    github: "https://github.com/SaiGawand12/InvoiceOS",
  },
  {
    num: "03",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    tags: ["Full-Stack", "React", "Node.js"],
    desc: "End-to-end shopping with real-time inventory, Stripe payments, and custom CMS.",
    year: "2025",
    color: "#e8e4f5",
    stat: "Full-Stack",
    live: "",
    github: "https://github.com/saigawand/e-commerce-platform",
  },
  {
    num: "04",
    title: "Durg Suruchi Wada",
    slug: "durg-suruchi",
    tags: ["React", "Next.js", "Web Design"],
    desc: "Restaurant website for an authentic Maharashtrian eatery in Alibag — menu, gallery, and location.",
    year: "2025",
    color: "#fdf0e0",
    stat: "Web Design",
    live: "https://durg-suruchi.vercel.app",
    github: "",
  },
];

function ExternalLinks({ project, className }: { project: typeof projects[0]; className?: string }) {
  if (!project.live && !project.github) return null;
  return (
    <div className={className}>
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer"
          className="font-mono text-[10px] tracking-widest uppercase text-gray-400 hover:text-gray-900 border border-gray-200 hover:border-gray-900 px-2 py-0.5 rounded-full transition-colors">
          Live ↗
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="font-mono text-[10px] tracking-widest uppercase text-gray-400 hover:text-gray-900 border border-gray-200 hover:border-gray-900 px-2 py-0.5 rounded-full transition-colors">
          GH ↗
        </a>
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top border line — draws in */}
      <motion.div className="w-full h-px bg-gray-200"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08 }} />

      {/* Wrapper: relative so external links can sit on top of the TransitionLink */}
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover bg */}
        <motion.div className="absolute inset-0 rounded-2xl -z-10"
          style={{ backgroundColor: project.color }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.98 }}
          transition={{ duration: 0.25 }} />

        <TransitionLink href={`/projects/${project.slug}`} className="block">
          <div className="py-6 md:py-8 px-2 md:px-4 grid grid-cols-12 gap-4 items-center">

            {/* Number */}
            <div className="col-span-2 md:col-span-1">
              <motion.span
                className="font-mono text-xs tracking-widest text-gray-300"
                animate={{ color: hovered ? "#6b7280" : "#d1d5db" }}
                transition={{ duration: 0.2 }}>
                {project.num}
              </motion.span>
            </div>

            {/* Title + tags */}
            <div className="col-span-10 md:col-span-5 flex flex-col gap-2">
              <motion.h3
                className="font-serif font-bold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
                animate={{ x: hovered ? 6 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                {project.title}
              </motion.h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag}
                    className="text-[11px] md:text-xs px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-400 font-mono tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Desc — desktop only */}
            <div className="hidden md:block md:col-span-4">
              <p className="text-sm text-gray-400 leading-relaxed">{project.desc}</p>
            </div>

            {/* Year + stat — desktop */}
            <div className="hidden md:flex md:col-span-2 flex-col items-end gap-2">
              <motion.span
                className="font-mono text-xs font-bold tracking-wide px-2.5 py-1 rounded-full"
                style={{ backgroundColor: project.color, color: "#374151" }}
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}>
                {project.stat}
              </motion.span>
              <span className="font-mono text-xs text-gray-300">{project.year}</span>
            </div>

            {/* Mobile: year */}
            <div className="col-span-12 md:hidden flex items-center justify-between mt-1">
              <span className="font-mono text-xs text-gray-300">{project.year}</span>
            </div>
          </div>
        </TransitionLink>

        {/* External links — outside TransitionLink to avoid nested <a> */}
        <ExternalLinks project={project} className="absolute bottom-4 right-14 hidden md:flex items-center gap-2 z-10" />
        <ExternalLinks project={project} className="absolute bottom-3 right-2 flex md:hidden items-center gap-2 z-10" />

        {/* Hover arrow — desktop */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white text-sm pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 12, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.25 }}>
          →
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="relative bg-white overflow-hidden">

      {/* Grid lines */}
      {[18, 36, 54, 72].map(pos => (
        <div key={pos} className="absolute top-0 bottom-0 w-px bg-gray-100/80" style={{ left: `${pos}%` }} />
      ))}

      <div className="relative max-w-6xl mx-auto px-5 md:px-12 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="mb-12 md:mb-20">
          {/* Top row */}
          <motion.div className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-emerald-400" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-500">Selected Work</span>
            </div>
            <motion.a href="#contact"
              className="hidden md:flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-gray-400 hover:text-gray-700 transition-colors"
              whileHover={{ x: 4 }}>
              All work →
            </motion.a>
          </motion.div>

          {/* Giant heading split layout */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              className="font-serif font-bold text-gray-900 leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}>
              Projects
            </motion.h2>
            <motion.p
              className="text-sm text-gray-400 max-w-[220px] leading-relaxed md:pb-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}>
              A selection of work across engineering, design, and product.
            </motion.p>
          </div>

          {/* Count badge */}
          <motion.div className="mt-6 flex items-center gap-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}>
            <span className="font-mono text-[11px] tracking-widest uppercase text-gray-300">
              {projects.length} projects
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-200" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-gray-300">2024 — 2025</span>
          </motion.div>
        </div>

        {/* ── PROJECT LIST ── */}
        <div>
          {projects.map((p, i) => <ProjectRow key={p.num} project={p} index={i} />)}
          <motion.div className="w-full h-px bg-gray-200"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }} />
        </div>

        {/* ── CTA ── */}
        <motion.div className="mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}>
          <div>
            <p className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-1">Have a project in mind?</p>
            <p className="text-sm text-gray-400">Let&apos;s build something great together.</p>
          </div>
          <motion.a href="mailto:saigawand90@gmail.com"
            className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white px-7 py-4 rounded-full text-sm font-medium transition-all hover:shadow-lg whitespace-nowrap"
            whileHover={{ scale: 1.03, x: 4 }}>
            <span className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-[10px]">✦</span>
            Start a Project
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}

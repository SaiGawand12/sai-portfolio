"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FadeUp, SlideLeft, SlideRight, StaggerChildren, StaggerItem, ScaleUp } from "./ScrollReveal";

function RevealWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
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

const socials = [
  { label: "Email",     value: "saigawand90@gmail.com",  href: "mailto:saigawand90@gmail.com",                  icon: MdEmail },
  { label: "LinkedIn",  value: "/in/sai-gawand",          href: "https://linkedin.com/in/sai-gawand-aa719025b/", icon: FaLinkedin },
  { label: "GitHub",    value: "SaiGawand12",              href: "https://github.com/SaiGawand12",                icon: SiGithub },
  { label: "Instagram", value: "@sai.gawand.3",            href: "https://instagram.com/sai.gawand.3",            icon: SiInstagram },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("saigawand90@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-white overflow-hidden">

      {/* Vertical grid lines */}
      {[18, 36, 54, 72].map((pos, i) => (
        <motion.div key={pos} className="absolute top-0 bottom-0 w-px bg-gray-100" style={{ left: `${pos}%` }}
          initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.08 }} />
      ))}

      <div className="relative max-w-6xl mx-auto px-6 md:px-16 pt-20 md:pt-32 pb-16 md:pb-24">

        {/* ── HEADER ── */}
        <div className="mb-16 md:mb-24">
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="w-6 h-px bg-emerald-400" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-emerald-500">Contact</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif font-bold text-gray-900 leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
              <RevealWords text="Let's work" delay={0} />
              <RevealWords text="together." className="text-gray-200" delay={0.12} />
            </h2>
            <motion.p className="text-sm text-gray-400 max-w-[220px] leading-relaxed md:pb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}>
              Open to full-time roles, freelance projects &amp; interesting collabs.
            </motion.p>
          </div>
        </div>

        {/* ── EMAIL CARD ── */}
        <ScaleUp className="mb-6">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-3">Primary contact</p>
            <p className="font-serif text-2xl md:text-4xl font-bold text-gray-900">saigawand90@gmail.com</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <motion.a href="mailto:saigawand90@gmail.com"
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
              whileHover={{ scale: 1.04 }}>
              <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center text-[9px]">✉</span>
              Send Email
            </motion.a>
            <motion.button onClick={copyEmail}
              className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-800 px-5 py-3 rounded-full text-sm font-medium transition-all bg-white"
              whileHover={{ scale: 1.04 }}>
              {copied ? "✓ Copied" : "Copy"}
            </motion.button>
          </div>
          </div>
        </ScaleUp>

        {/* ── INFO CARDS ── */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16" staggerDelay={0.1}>
          {[
            { label: "Status",        value: "Available for work",  sub: "Full-time · Freelance · Collab", dot: true },
            { label: "Location",      value: "Bangalore, India",    sub: "UTC +5:30 · IST" },
            { label: "Response time", value: "Within 12 hours",     sub: "Usually much faster" },
          ].map((card) => (
            <StaggerItem key={card.label}>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col gap-1">
                <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">{card.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  {card.dot && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />}
                  <p className="font-serif text-lg font-bold text-gray-900">{card.value}</p>
                </div>
                <p className="text-xs text-gray-400">{card.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* ── SOCIAL LINKS ── */}
        <motion.div className="w-full h-px bg-gray-100"
          initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }} />

        <div className="grid grid-cols-2 md:grid-cols-4">
          {socials.map((s, i) => (
            <div key={s.label}>
              <motion.a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 py-6 px-2 hover:bg-gray-50 transition-colors rounded-xl"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -2 }}>
                <div className="flex items-center gap-2">
                  <s.icon className="text-gray-400 group-hover:text-gray-700 transition-colors" size={18} />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 group-hover:text-gray-600 transition-colors">
                    {s.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium truncate pr-2">
                    {s.value}
                  </span>
                  <motion.span className="text-gray-300 group-hover:text-gray-600 transition-colors text-xs flex-shrink-0"
                    whileHover={{ x: 2, y: -2 }}>↗</motion.span>
                </div>
              </motion.a>
              <motion.div className="w-full h-px bg-gray-100"
                initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }} />
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <motion.div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="font-serif text-white text-xs font-bold">S</span>
            </div>
            <span className="font-serif text-gray-900 font-bold tracking-tight">Sai Gawand</span>
          </div>
          <p className="font-mono text-[11px] tracking-widest uppercase text-gray-300">
            © 2025 · Designed &amp; Built by Sai
          </p>
          <div className="flex items-center gap-3">
            <a href="/cv"
              className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-all">
              View CV ↗
            </a>
            <a href="/sai-cv.pdf" download="Sai-Gawand-CV.pdf"
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
              Download CV
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

// ── Sparkle ──────────────────────────────────────────────────────────────────
function Sparkle({ className, delay = 1.2 }: { className?: string; delay?: number }) {
  return (
    <motion.svg className={className} width="14" height="14" viewBox="0 0 20 20" fill="none"
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "backOut", delay }}>
      <path d="M10 0 L11.2 8.8 L20 10 L11.2 11.2 L10 20 L8.8 11.2 L0 10 L8.8 8.8 Z" fill="#1a1a1a" opacity="0.25" />
    </motion.svg>
  );
}

// ── Color reveal canvas ───────────────────────────────────────────────────────
function RevealLayer({ containerRef, graySrc }: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  graySrc: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.src = graySrc;
    let mouse = { x: -999, y: -999 };
    let isOver = false;
    let raf: number;
    let dirty = false;

    const resize = () => { canvas.width = container.offsetWidth; canvas.height = container.offsetHeight; dirty = true; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!isOver) { isOver = true; dirty = true; }
      dirty = true;
    };
    const onLeave = () => {
      if (isOver) { isOver = false; dirty = true; }
    };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!dirty) return;
      dirty = false;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isOver && img.complete && img.naturalWidth > 0) {
        const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
        const dx = (canvas.width - dw) / 2, dy = canvas.height - dh;
        const faceX = dx + dw * 0.35, faceY = dy + dh * 0.02;
        const faceW = dw * 0.30, faceH = dh * 0.38;
        const faceCX = faceX + faceW / 2, faceCY = faceY + faceH / 2;
        const nx = (mouse.x - faceCX) / (faceW / 2);
        const ny = (mouse.y - faceCY) / (faceH / 2);
        if (nx * nx + ny * ny <= 1) {
          ctx.save(); ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(img, dx, dy, dw, dh); ctx.restore();
          ctx.save(); ctx.globalCompositeOperation = "destination-in";
          const g = ctx.createRadialGradient(faceCX, faceCY, 0, faceCX, faceCY, Math.max(faceW, faceH) / 2);
          g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.6, "rgba(255,255,255,0.95)");
          g.addColorStop(0.85, "rgba(255,255,255,0.4)"); g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.ellipse(faceCX, faceCY, faceW / 2 + 20, faceH / 2 + 20, 0, 0, Math.PI * 2);
          ctx.fill(); ctx.restore();
        }
      }
    };
    img.onload = () => { dirty = true; raf = requestAnimationFrame(draw); };
    if (img.complete) { dirty = true; raf = requestAnimationFrame(draw); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); container.removeEventListener("mousemove", onMove); container.removeEventListener("mouseleave", onLeave); };
  }, [containerRef, graySrc]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }} />;
}

// ── Cycling role ticker ───────────────────────────────────────────────────────
const ROLES = ["Designer", "Developer", "Builder", "Engineer"];
function RoleTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-block overflow-hidden align-bottom" style={{ height: "1.1em" }}>
      <AnimatePresence mode="wait">
        <motion.span key={idx} className="block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const blurRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!blurRef.current) return;
      blurRef.current.style.transform =
        `translate(${(e.clientX / window.innerWidth - 0.5) * 12}px, ${(e.clientY / window.innerHeight - 0.5) * 8}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const socials = [
    { label: "Github",    icon: SiGithub,    href: "https://github.com/SaiGawand12" },
    { label: "Instagram", icon: SiInstagram, href: "https://instagram.com/sai.gawand.3" },
    { label: "LinkedIn",  icon: FaLinkedin,  href: "https://linkedin.com/in/sai-gawand-aa719025b/" },
  ];

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{
      height: "100%",
      background: "linear-gradient(135deg, #d4ede4 0%, #e8f5ef 30%, #f0f8f4 55%, #f7f7f7 100%)",
    }}>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

      {/* Grid lines */}
      {[18, 36, 54, 72].map((pos, i) => (
        <motion.div key={pos} className="absolute top-0 bottom-0 w-px bg-gray-400/20" style={{ left: `${pos}%` }}
          initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: i * 0.08 }} />
      ))}

      {/* Sparkles */}
      <Sparkle className="absolute top-[22%] left-[32%] z-[5]" delay={1.3} />
      <Sparkle className="absolute top-[55%] right-[22%] z-[5]" delay={1.5} />
      <Sparkle className="absolute bottom-[30%] left-[16%] z-[5]" delay={1.7} />
      <Sparkle className="absolute top-[38%] left-[8%] z-[5]" delay={1.9} />

      {/* ── TOP META ROW ── */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-5 md:px-10 pt-[4.5rem] md:pt-24 z-20 pointer-events-none">
        <motion.div className="flex flex-col gap-0.5"
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}>
          <span className="font-mono text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-gray-500">© 2025</span>
          <span className="font-mono text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-gray-400">Bangalore, India</span>
        </motion.div>
        <motion.div className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-full px-3 py-1.5 pointer-events-auto"
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-gray-500">Available for work</span>
        </motion.div>
      </div>

      {/* ── GIANT HEADLINE — desktop only (single line, nowrap) ── */}
      <div className="absolute left-0 right-0 px-5 md:px-10 select-none hidden md:block" style={{ top: "13%", zIndex: 1 }}>
        <h1 className="font-serif font-bold text-gray-900 leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 16vw, 16vw)" }}>
          <motion.span className="inline-block"
            initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            Sai
          </motion.span>
          {" "}
          <motion.span ref={blurRef} className="text-gray-600 inline-block transition-transform duration-75 ease-out"
            style={{ filter: "blur(7px)", opacity: 0.6 }}
            initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            Portfolio
          </motion.span>
        </h1>
      </div>

      {/* ── GIANT HEADLINE — mobile only (stacked, no overflow) ── */}
      <div className="absolute left-0 right-0 px-5 select-none md:hidden" style={{ top: "13%", zIndex: 1 }}>
        <h1 className="font-serif font-bold text-gray-900 leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 18vw, 18vw)" }}>
          <motion.span className="block"
            initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            Sai
          </motion.span>
          <motion.span className="block text-gray-500"
            style={{ filter: "blur(4px)", opacity: 0.6 }}
            initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            Portfolio
          </motion.span>
        </h1>
      </div>

      {/* ── ROLE TICKER — desktop only, below headline ── */}
      <motion.div
        className="absolute hidden md:flex items-center gap-3 px-10 select-none"
        style={{ top: "calc(13% + clamp(3rem,16vw,16vw) + 0.5rem)", zIndex: 2 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}>
        <span className="w-6 h-px bg-gray-400" />
        <span className="font-mono text-[13px] tracking-[0.2em] uppercase text-gray-500">
          <RoleTicker />
        </span>
      </motion.div>

      {/* ── PHOTO — desktop uses 94% height, mobile uses 55% ── */}
      <motion.div ref={containerRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88vw] h-[52%] md:w-[62vw] md:h-[94%]"
        style={{ zIndex: 10 }}
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
        <div className="relative w-full h-full" style={{
          maskImage: "linear-gradient(to top, transparent 0%, black 15%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%)",
        }}>
          <Image src="/sai.png" alt="Sai" fill className="object-contain object-bottom"
            style={{ filter: "grayscale(100%)" }} priority />
          <RevealLayer containerRef={containerRef} graySrc="/sai.png" />
        </div>
      </motion.div>
      <motion.div className="absolute hidden md:flex flex-col gap-2 z-20"
        style={{ bottom: "7%", left: "3%" }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-px bg-gray-500" />
          <span className="font-mono text-[13px] tracking-[0.2em] uppercase text-gray-700 font-semibold">
            Designer &amp; Developer
          </span>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-[200px] pl-10">
          Building products where aesthetics meets engineering.
        </p>
      </motion.div>

      {/* ── BOTTOM RIGHT: social pills (desktop) ── */}
      <div className="absolute hidden md:flex flex-col gap-2 z-20" style={{ bottom: "7%", right: "3%" }}>
        {socials.map(({ label, icon: Icon, href }, i) => (
          <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white/90 border border-gray-200 rounded-full font-medium text-gray-700 hover:bg-white hover:border-gray-300 hover:text-gray-900 hover:shadow-lg transition-all"
            style={{ height: "50px", padding: "0 18px 0 14px", fontSize: "14px", minWidth: "158px" }}
            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: -5, scale: 1.03 }}>
            <Icon className="text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0" size={18} />
            <span className="flex-1">{label}</span>
            <motion.span className="text-gray-300 group-hover:text-gray-500 text-xs"
              whileHover={{ x: 2, y: -2 }}>↗</motion.span>
          </motion.a>
        ))}
      </div>

      {/* ── SCROLL INDICATOR (desktop) ── */}
      <motion.div className="absolute hidden md:flex flex-col items-center gap-2 z-20"
        style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">Scroll</span>
        <motion.div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden absolute left-0 right-0 px-5 flex flex-col gap-2.5 z-[15]" style={{ bottom: "52%" }}>
        <motion.div className="flex items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-400">Available for work</span>
        </motion.div>
        <motion.p className="text-sm text-gray-600 leading-relaxed max-w-[260px] font-light"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          Designer &amp; Developer building digital experiences people love.
        </motion.p>
        <motion.div className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          {["UI/UX", "React", "Golang", "Open to work"].map(tag => (
            <span key={tag} className="text-[11px] px-3 py-1 rounded-full border border-gray-300/70 text-gray-500 bg-white/70">{tag}</span>
          ))}
        </motion.div>
        {/* Mobile socials */}
        <motion.div className="flex gap-2 mt-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          {socials.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/90 border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-gray-800 transition-colors">
              <Icon size={14} />
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

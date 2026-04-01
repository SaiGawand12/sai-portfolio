"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home",     href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "About",    href: "#about" },
    { label: "Contact",  href: "#contact" },
  ];

  useEffect(() => {
    const sectionMap: Record<string, string> = {
      home: "Home", projects: "Projects", about: "About", contact: "Contact",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            const label = sectionMap[entry.target.id];
            if (label) setActive(label);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-60px 0px -40% 0px" }
    );

    // Observe main sections
    const targets = [
      document.getElementById("home"),
      document.getElementById("projects"),
      document.getElementById("about"),
      document.getElementById("contact"),
    ].filter(Boolean);

    targets.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setActive(label);
    setMenuOpen(false);
    if (href === "#") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.history.pushState(null, "", href);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border border-gray-200/80 rounded-2xl px-5 py-3 shadow-sm"
            : "bg-transparent px-0 py-0"
        }`}>

          {/* Logo */}
          <motion.a href="#" onClick={(e) => handleClick(e, "#", "Home")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-white text-sm font-bold">S</span>
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-gray-900">Sai</span>
          </motion.a>

          {/* Desktop center — pill nav */}
          <nav className="hidden md:flex items-center bg-white/70 backdrop-blur-md border border-gray-200/70 rounded-full px-2 py-1.5 gap-0.5">
            {links.map(({ label, href }, i) => (
              <motion.div key={label} className="relative"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}>
                <a href={href} onClick={(e) => handleClick(e, href, label)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors block ${
                    active === label ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
                  }`}>
                  {active === label && (
                    <motion.div
                      className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {label}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Desktop right CTAs */}
          <motion.div className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <a href="mailto:saigawand90@gmail.com"
              className="group flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all tracking-wide shadow-sm hover:shadow-emerald-200 hover:shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              Hire Me
            </a>
            <a href="#contact" onClick={(e) => handleClick(e, "#contact", "Contact")}
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-full transition-all border border-gray-700 shadow-sm">
              <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center text-[9px] font-bold flex-shrink-0 shadow-sm">S</span>
              Contact
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <motion.span className="block w-4 h-0.5 bg-gray-700 rounded-full"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-4 h-0.5 bg-gray-700 rounded-full"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-4 h-0.5 bg-gray-700 rounded-full"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.2 }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-4 top-20 z-40 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-5 flex flex-col gap-1">
              {links.map(({ label, href }, i) => (
                <motion.a key={label} href={href}
                  onClick={(e) => handleClick(e, href, label)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-medium transition-colors ${
                    active === label ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <span>{label}</span>
                  {active === label && <span className="text-gray-400 text-sm">✦</span>}
                </motion.a>
              ))}
              <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-2">
                <a href="mailto:saigawand90@gmail.com"
                  className="flex items-center justify-center gap-2 bg-emerald-400 text-white text-sm font-semibold px-4 py-3.5 rounded-2xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

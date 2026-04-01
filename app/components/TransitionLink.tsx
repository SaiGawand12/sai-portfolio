"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Global overlay — rendered once, controlled via custom event
export function TransitionOverlay() {
  const [visible, setVisible] = useState(false);

  if (typeof window !== "undefined") {
    // Listen for trigger
    window.__startTransition = () => setVisible(true);
    window.__endTransition   = () => setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#fff" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {/* Top black slab */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-black"
            initial={{ height: 0 }}
            animate={{ height: "50%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom black slab */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black"
            initial={{ height: 0 }}
            animate={{ height: "50%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Name */}
          <motion.span
            className="relative z-10 font-serif text-4xl font-bold text-white tracking-widest"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Sai
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Drop-in replacement for <Link> that plays the transition
export default function TransitionLink({
  href,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.__startTransition?.();
    setTimeout(() => {
      router.push(href);
      setTimeout(() => window.__endTransition?.(), 600);
    }, 500);
  };

  return (
    <a href={href} onClick={handleClick} className={className}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
}

// Extend window type
declare global {
  interface Window {
    __startTransition?: () => void;
    __endTransition?: () => void;
  }
}

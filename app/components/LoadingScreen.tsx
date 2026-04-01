"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Design", "Build", "Inspire"];
const DURATION = 2700;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Cycle words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => {
        if (i >= WORDS.length - 1) { clearInterval(interval); return i; }
        return i + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Counter via rAF
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onCompleteRef.current(), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Top-left label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-xs md:text-sm uppercase tracking-[0.3em]"
          style={{ color: "#888888" }}
        >
          Sai · Portfolio
        </span>
      </motion.div>

      {/* Top-right — role */}
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span
          className="text-xs md:text-sm uppercase tracking-[0.3em]"
          style={{ color: "#888888" }}
        >
          Designer & Developer
        </span>
      </motion.div>

      {/* Center — rotating words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl italic"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: "rgba(245,245,245,0.8)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right — counter */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-6xl md:text-8xl lg:text-9xl tabular-nums"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: "#f5f5f5",
          }}
        >
          {Math.round(progress).toString().padStart(3, "0")}
        </span>
      </motion.div>

      {/* Bottom-left — tagline */}
      <motion.div
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span
          className="text-xs md:text-sm uppercase tracking-[0.2em]"
          style={{ color: "#888888" }}
        >
          Crafting digital experiences
        </span>
      </motion.div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "3px", backgroundColor: "rgba(31,31,31,0.5)" }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            boxShadow: "0 0 8px rgba(137,170,204,0.35)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

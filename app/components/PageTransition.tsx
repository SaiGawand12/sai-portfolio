"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, [pathname]); // eslint-disable-line

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Black sliding bar */}
            <motion.div
              className="absolute left-0 right-0 bg-black"
              initial={{ height: 0, top: "50%" }}
              animate={{ height: "100%", top: 0 }}
              exit={{ height: 0, top: "50%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Logo / name in center */}
            <motion.span
              className="relative z-10 font-serif text-3xl font-bold text-white tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Sai
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      {displayChildren}
    </>
  );
}

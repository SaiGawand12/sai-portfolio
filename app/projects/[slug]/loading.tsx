"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] bg-white flex items-center justify-center overflow-hidden">
      {/* Top black panel */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black"
        initial={{ height: "50%" }}
        animate={{ height: "50%" }}
      />
      {/* Bottom black panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black"
        initial={{ height: "50%" }}
        animate={{ height: "50%" }}
      />
      {/* Name in center white gap */}
      <motion.span
        className="relative z-10 font-serif text-4xl font-bold text-black tracking-widest"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        Sai
      </motion.span>
    </div>
  );
}

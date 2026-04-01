"use client";
import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiGo, SiNodedotjs, SiPostgresql, SiRedis,
  SiDocker, SiGrafana, SiFigma, SiFramer,
  SiGit,
} from "react-icons/si";

const skills = [
  { icon: SiReact,       name: "React" },
  { icon: SiNextdotjs,   name: "Next.js" },
  { icon: SiTypescript,  name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiGo,          name: "Golang" },
  { icon: SiNodedotjs,   name: "Node.js" },
  { icon: SiPostgresql,  name: "PostgreSQL" },
  { icon: SiRedis,       name: "Redis" },
  { icon: SiDocker,      name: "Docker" },
  { icon: SiGrafana,     name: "Grafana" },
  { icon: SiFigma,       name: "Figma" },
  { icon: SiFramer,      name: "Framer" },
  { icon: SiGit,         name: "Git" },
];

// Duplicate for seamless loop
const items = [...skills, ...skills];

export default function SkillsMarquee() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const current = x.get();
    const containerWidth = containerRef.current ? containerRef.current.scrollWidth / 2 : 1000;
    const next = current - (delta / 1000) * 60; // 60px/s
    x.set(next <= -containerWidth ? 0 : next);
  });

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex items-center gap-8 w-max"
        style={{ x }}
      >
        {items.map(({ icon: Icon, name }, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 px-5 py-3.5 rounded-full border border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm transition-all cursor-default group flex-shrink-0"
            whileHover={{ y: -2, scale: 1.04 }}
          >
            <Icon className="text-gray-400 group-hover:text-gray-700 transition-colors" size={24} />
            <span className="font-mono text-sm tracking-wide text-gray-500 group-hover:text-gray-800 transition-colors whitespace-nowrap">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

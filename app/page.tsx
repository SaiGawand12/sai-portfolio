"use client";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";

/**
 * StickyStack wraps a section so it:
 * 1. Sticks to top while the user scrolls through it
 * 2. Gets pushed off by the next section naturally
 * 3. Never clips its own content
 */
function StickyStack({
  children,
  zIndex,
}: {
  children: React.ReactNode;
  zIndex: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);

  // Dynamically set the wrapper height = sticky child height
  // so the pin spacer is exactly as tall as the content
  useEffect(() => {
    const update = () => {
      if (wrapperRef.current && stickyRef.current) {
        wrapperRef.current.style.height = `${stickyRef.current.scrollHeight}px`;
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (stickyRef.current) ro.observe(stickyRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex,
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.08)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main>
      <Navbar />

      {/* Hero — full viewport, pinned at z:0 */}
      <div style={{ position: "sticky", top: 0, zIndex: 0, height: "100vh" }}>
        <Hero />
      </div>

      {/* Projects — stacks over hero, pins while scrolling through its content */}
      <StickyStack zIndex={10}>
        <Projects />
      </StickyStack>

      {/* About — stacks over projects */}
      <StickyStack zIndex={20}>
        <About />
      </StickyStack>

      {/* Contact — stacks over about */}
      <StickyStack zIndex={30}>
        <Contact />
      </StickyStack>
    </main>
  );
}

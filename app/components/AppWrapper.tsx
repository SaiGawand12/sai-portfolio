"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease-out" }}>
        {children}
      </div>
    </>
  );
}

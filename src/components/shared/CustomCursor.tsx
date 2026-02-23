"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringX = useSpring(cursorX, { damping: 32, stiffness: 600, mass: 0.3 });
  const ringY = useSpring(cursorY, { damping: 32, stiffness: 600, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as Element;
      const interactive = target.closest(
        "a, button, [role='button'], label, select, input, textarea, [tabindex]:not([tabindex='-1'])"
      );
      setIsPointer(!!interactive);
    };

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring — lags slightly for elegance */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", zIndex: 10000 }}
        animate={{
          scale: isPointer ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.32)",
          backgroundColor: isPointer ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0)",
        }}
        transition={{
          scale: { type: "spring", damping: 22, stiffness: 280 },
          opacity: { duration: 0.18 },
          borderColor: { duration: 0.22 },
          backgroundColor: { duration: 0.22 },
        }}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border pointer-events-none"
        aria-hidden
      />
      {/* Inner dot — locked to cursor, zero lag */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", zIndex: 10000 }}
        animate={{
          scale: isPointer ? 0.35 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,1)",
        }}
        transition={{
          scale: { type: "spring", damping: 32, stiffness: 600 },
          opacity: { duration: 0.18 },
          backgroundColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none"
        aria-hidden
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // Detect coarse-pointer (touch) devices — skip the custom cursor entirely
  const [isTouch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : true
  );
  const lagX = useSpring(cursorX, { damping: 30, stiffness: 450, mass: 0.4 });
  const lagY = useSpring(cursorY, { damping: 30, stiffness: 450, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const el = e.target as Element;
      setIsPointer(!!el.closest('a, button, [role=button], input, textarea, select, label, [tabindex]:not([tabindex="-1"])'));
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

  const color = isPointer ? "rgba(0,204,68,0.9)" : "rgba(0,204,68,0.5)";
  const size  = isPointer ? 32 : 24;

  if (isTouch) return null;

  return (
    <>
      {/* Lagging crosshair outer */}
      <motion.div
        style={{ x: lagX, y: lagY, translateX: "-50%", translateY: "-50%", zIndex: 10000 }}
        animate={{ opacity: isVisible ? 1 : 0, width: size, height: size }}
        transition={{ opacity: { duration: 0.18 }, width: { type: "spring", damping: 20, stiffness: 280 }, height: { type: "spring", damping: 20, stiffness: 280 } }}
        className="fixed top-0 left-0 pointer-events-none"
        aria-hidden
      >
        {/* horizontal arm */}
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: color, transform: "translateY(-50%)" }} />
        {/* vertical arm */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: color, transform: "translateX(-50%)" }} />
        {/* corner brackets */}
        {isPointer && (<>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l" style={{ borderColor: color }} />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r" style={{ borderColor: color }} />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l" style={{ borderColor: color }} />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r" style={{ borderColor: color }} />
        </>)}
      </motion.div>

      {/* Exact-position center dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", zIndex: 10001 }}
        animate={{ opacity: isVisible ? 1 : 0, backgroundColor: color }}
        transition={{ opacity: { duration: 0.15 }, backgroundColor: { duration: 0.2 } }}
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none"
        aria-hidden
      />
    </>
  );
}

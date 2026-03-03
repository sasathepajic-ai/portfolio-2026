"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Returns scroll-linked motion values for Apple-style reveal effects.
 * Attach `ref` to the container, then bind the returned values to
 * `motion.div` style props (opacity, y, scale, etc.).
 *
 * `offset` controls when the animation starts/ends relative to the viewport.
 */
export function useScrollReveal(
  offset: [string, string] = ["start end", "end start"],
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  return { ref, scrollYProgress };
}

/**
 * Fade-in as element enters viewport, fade-out as it leaves.
 * Returns { ref, opacity, y }
 */
export function useScrollFade(
  yDistance = 80,
  offset: [string, string] = ["start end", "end start"],
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [yDistance, 0, 0, -yDistance],
  );

  return { ref, opacity, y };
}

/**
 * Parallax — element moves at a different rate compared to scroll.
 * `speed`: 0 = no movement, 1 = full movement (like scroll), negative = reverse
 */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return { ref, y };
}

/**
 * Line-by-line text reveal with staggered opacity
 */
export function useTextReveal(
  offset: [string, string] = ["start 0.85", "start 0.35"],
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  return { ref, scrollYProgress };
}

/**
 * Creates a progress value mapped from a specific sub-range of a broader scrollYProgress
 */
export function useScrollRange(
  scrollYProgress: MotionValue<number>,
  inputRange: [number, number],
  outputRange: [number, number] = [0, 1],
) {
  return useTransform(scrollYProgress, inputRange, outputRange);
}

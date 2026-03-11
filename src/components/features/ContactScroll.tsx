"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ContactProps {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  email: string;
  location?: string;
  phone?: string;
}

function TypewriterEmail({ email }: { email: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    let i = 0;
    const typeNext = () => {
      i++;
      setDisplayed(email.slice(0, i));
      if (i >= email.length) return;
      const ch = email[i] ?? "";
      const isPause = ch === "@" || ch === "." || ch === "_";
      const jitter = Math.random() * 60;
      const base = isPause ? 180 : 70;
      const burst = Math.random() < 0.15 ? -40 : 0;
      setTimeout(typeNext, Math.max(25, base + jitter + burst));
    };
    const startDelay = setTimeout(typeNext, 600);
    return () => clearTimeout(startDelay);
  }, [inView, email]);

  return (
    <div ref={ref}>
      <a
        href={"mailto:" + email}
        className="group inline-flex items-baseline gap-3 hover:text-primary transition-colors duration-200 max-w-full min-w-0"
      >
        <span
          className="font-display font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-tight break-all"
          style={{ fontSize: "clamp(1rem, 3.5vw, 3rem)" }}
        >
          {displayed}
          {displayed.length < email.length && (
            <span className="inline-block w-[0.5em] h-[0.85em] bg-primary/70 align-middle ml-0.5 cursor-blink" />
          )}
        </span>
      </a>
    </div>
  );
}

export default function ContactScroll({ title, subtitle, email }: ContactProps) {
  return (
    <section id="contact" className="min-h-[60vh] flex flex-col">
      {/* Section header */}
      <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-4 border-b border-primary/8 bg-surface/50">
        <span className="text-[11px] font-mono font-semibold text-secondary/70 tracking-[0.2em] uppercase">Contact</span>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-3">
            {title.replace(/\.$/, "").split(" ").map((word, i, arr) => {
              const colors = [
                "var(--nav-about)",
                "var(--mondrian-blue)",
                "var(--mondrian-yellow)",
                "var(--accent)",
              ];
              return (
                <span key={i} style={{ color: colors[i % colors.length] }}>
                  {word}{i < arr.length - 1 ? " " : ""}
                </span>
              );
            })}<span className="text-foreground/85">.</span>
          </h2>
          {subtitle && (
            <p className="text-sm text-secondary/55 leading-relaxed mb-8">{subtitle}</p>
          )}

          <TypewriterEmail email={email} />
        </motion.div>
      </div>
    </section>
  );
}

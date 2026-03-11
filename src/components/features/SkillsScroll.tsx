"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  icon?: string;
  items: string[];
}

interface SkillsProps {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  categories: SkillCategory[];
}

// Use the same Mondrian palette as the navbar
const TAB_COLORS = [
  { tab: "var(--nav-about)",       text: "#001a06" }, // green
  { tab: "var(--mondrian-blue)",   text: "#ffffff" }, // blue
  { tab: "var(--mondrian-yellow)", text: "#1a0600" }, // yellow/amber
  { tab: "var(--accent)",          text: "#ffffff" }, // red
  { tab: "var(--mondrian-white)",  text: "#1a1917" }, // white/dark
];

export default function SkillsScroll({ title, subtitle, categories }: SkillsProps) {
  return (
    <section id="skills" className="border-b border-primary/10">
      {/* Section header */}
      <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-4 border-b border-primary/8 bg-surface/50">
        <span className="text-[11px] font-mono font-semibold text-secondary/70 tracking-[0.2em] uppercase">{title}</span>
        {subtitle && <span className="text-[9px] font-mono text-secondary/35 hidden sm:inline"> {subtitle}</span>}
      </div>

      <div className="px-6 sm:px-12 lg:px-16 py-8 sm:py-10">
        {/* pt-6 gives headroom for the folder tabs that poke up above each card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 max-w-5xl pt-6">
          {categories.map((cat, i) => {
            const color = TAB_COLORS[i % TAB_COLORS.length];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                {/* Folder tab — sits above the card */}
                <div
                  className="absolute -top-6 left-0 h-6 px-3 flex items-center text-[9px] font-mono tracking-widest uppercase font-semibold select-none"
                  style={{ background: color.tab, color: color.text }}
                >
                  {cat.name}
                </div>

                {/* Card body */}
                <div
                  className="p-5 h-full border border-primary/12 hover:border-primary/25 transition-colors"
                  style={{
                    background: `color-mix(in srgb, ${color.tab} 5%, var(--surface))`,
                    borderTop: `2px solid ${color.tab}`,
                  }}
                >
                  <div className="space-y-2">
                    {cat.items.map((skill) => (
                      <div key={skill} className="flex items-baseline gap-2">
                        <span
                          className="text-[8px] shrink-0"
                          style={{ color: `color-mix(in srgb, ${color.tab} 70%, transparent)` }}
                        >
                          ▸
                        </span>
                        <span className="text-[11px] text-foreground/60 leading-relaxed">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

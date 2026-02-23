"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type SkillCategoryType } from "@/core/config/schema";
import {
  SiPython, SiFastapi, SiReact, SiTypescript, SiHtml5, SiAngular,
  SiMysql, SiDocker, SiNginx, SiFigma, SiOpenai, SiAmazonwebservices,
  SiNextdotjs, SiTailwindcss, SiLangchain, SiAnthropic, SiStreamlit, SiGit,
} from "react-icons/si";

interface SkillsProps {
  title: string;
  subtitle?: string;
  categories: SkillCategoryType[];
}

const SKILL_ICONS: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  "Python":      { icon: SiPython,           color: "#3776AB" },
  "FastAPI":     { icon: SiFastapi,           color: "#009688" },
  "React":       { icon: SiReact,             color: "#61DAFB" },
  "TypeScript":  { icon: SiTypescript,        color: "#3178C6" },
  "HTML/CSS":    { icon: SiHtml5,             color: "#E34F26" },
  "Angular":     { icon: SiAngular,           color: "#DD0031" },
  "MySQL 8":     { icon: SiMysql,             color: "#4479A1" },
  "Docker":      { icon: SiDocker,            color: "#2496ED" },
  "Nginx":       { icon: SiNginx,             color: "#009639" },
  "Figma":       { icon: SiFigma,             color: "#F24E1E" },
  "OpenAI GPT":  { icon: SiOpenai,            color: "#10a37f" },
  "AWS EC2":        { icon: SiAmazonwebservices, color: "#FF9900" },
  "AWS RDS":        { icon: SiAmazonwebservices, color: "#FF9900" },
  "AWS Bedrock":    { icon: SiAmazonwebservices, color: "#FF9900" },
  "Next.js":        { icon: SiNextdotjs,         color: "#ffffff" },
  "Tailwind CSS":   { icon: SiTailwindcss,        color: "#06B6D4" },
  "LangChain":      { icon: SiLangchain,          color: "#1C3C3C" },
  "Anthropic Claude": { icon: SiAnthropic,        color: "#D4A27F" },
  "Streamlit":      { icon: SiStreamlit,          color: "#FF4B4B" },
  "Git":            { icon: SiGit,                color: "#F05032" },
};

const CATEGORY_ACCENT: Record<string, string> = {
  Backend:          "var(--primary)",
  Frontend:         "var(--primary)",
  "AI / LLM":       "var(--primary)",
  Database:         "var(--primary)",
  "DevOps & Cloud": "var(--primary)",
  "Design & UX":    "var(--primary)",
};

export default function Skills({ title, subtitle, categories }: SkillsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />

      <div className="mx-auto max-w-6xl px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 flex items-center gap-3">
            {title}
            <span className="text-primary/40 font-mono text-2xl leading-none select-none font-normal translate-y-0.5">[ ]</span>
          </h2>
          {subtitle && <p className="text-secondary max-w-xl">{subtitle}</p>}
        </motion.div>

        {/* Rows */}
        <div className="relative border border-white/8 rounded-sm">
          {/* Vertical rule separating label from skills */}
          <div className="absolute left-67.25 top-0 bottom-0 w-px bg-white/6 hidden sm:block" />

          <div className="divide-y divide-white/8">
            {categories.map((cat, catIndex) => {
              const accent = CATEGORY_ACCENT[cat.name] ?? "var(--primary)";
              const isHovered = hovered === cat.name;

              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: catIndex * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(cat.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative py-6 px-6 sm:px-8 grid sm:grid-cols-[220px_1fr] gap-4 sm:gap-8 items-start cursor-default transition-colors duration-200"
                  style={{ background: isHovered ? "rgba(5,150,105,0.04)" : "transparent" }}
                >
                  {/* Category label */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-300"
                      style={{ color: isHovered ? accent : "rgba(156,163,175,0.5)" }}
                    >
                      {cat.name}
                    </span>
                    <div className="flex-1 h-px bg-white/5 sm:hidden" />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: catIndex * 0.07 + si * 0.03, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md border transition-all duration-300 cursor-default"
                        style={{
                          background: isHovered ? `color-mix(in srgb, ${accent} 10%, transparent)` : "rgba(255,255,255,0.03)",
                          borderColor: isHovered ? `color-mix(in srgb, ${accent} 40%, transparent)` : "rgba(255,255,255,0.12)",
                          color: isHovered ? "rgba(232,232,237,0.9)" : "rgba(156,163,175,0.7)",
                        }}
                      >
                        {(() => {
                          const info = SKILL_ICONS[skill];
                          if (!info) return null;
                          const Icon = info.icon;
                          return <Icon className="w-3 h-3 shrink-0" style={{ color: info.color }} />;
                        })()}
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

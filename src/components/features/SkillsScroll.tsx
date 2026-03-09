"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { type SkillCategoryType } from "@/core/config/schema";
import { SiPython, SiFastapi, SiReact, SiTypescript, SiHtml5, SiAngular, SiMysql, SiDocker, SiNginx, SiFigma, SiOpenai, SiAmazonwebservices, SiNextdotjs, SiTailwindcss, SiLangchain, SiAnthropic, SiStreamlit, SiGit } from "react-icons/si";

const ICONS: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; ver: string }> = {
  "Python":           { icon: SiPython,           color: "#3776AB", ver: "3.12.x"     },
  "FastAPI":          { icon: SiFastapi,           color: "#009688", ver: "0.110.x"   },
  "React":            { icon: SiReact,             color: "#61DAFB", ver: "18.x"      },
  "TypeScript":       { icon: SiTypescript,        color: "#3178C6", ver: "5.x"       },
  "HTML/CSS":         { icon: SiHtml5,             color: "#E34F26", ver: "—"         },
  "Angular":          { icon: SiAngular,           color: "#DD0031", ver: "17.x"      },
  "MySQL 8":          { icon: SiMysql,             color: "#4479A1", ver: "8.x"       },
  "Docker":           { icon: SiDocker,            color: "#2496ED", ver: "26.x"      },
  "Nginx":            { icon: SiNginx,             color: "#009639", ver: "1.26.x"    },
  "Figma":            { icon: SiFigma,             color: "#F24E1E", ver: "latest"    },
  "OpenAI GPT":       { icon: SiOpenai,            color: "#10a37f", ver: "gpt-4o"    },
  "AWS EC2":          { icon: SiAmazonwebservices, color: "#FF9900", ver: "—"         },
  "AWS RDS":          { icon: SiAmazonwebservices, color: "#FF9900", ver: "—"         },
  "AWS Bedrock":      { icon: SiAmazonwebservices, color: "#FF9900", ver: "—"         },
  "Next.js":          { icon: SiNextdotjs,         color: "#ffffff", ver: "15.x"      },
  "Tailwind CSS":     { icon: SiTailwindcss,       color: "#06B6D4", ver: "4.x"       },
  "LangChain":        { icon: SiLangchain,         color: "#1C3C3C", ver: "0.2.x"     },
  "Anthropic Claude": { icon: SiAnthropic,         color: "#D4A27F", ver: "claude-3.5"},
  "Streamlit":        { icon: SiStreamlit,         color: "#FF4B4B", ver: "1.x"       },
  "Git":              { icon: SiGit,               color: "#F05032", ver: "2.x"       },
};

type InstallPhase = "idle" | "collecting" | "running" | "done";

interface SkillsProps { title: string; subtitle?: string; sectionLabel?: string; categories: SkillCategoryType[]; }

export default function SkillsScroll({ title, sectionLabel = "04", categories }: SkillsProps) {
  const allSkills = categories.flatMap((cat) => cat.items.map((name) => ({ name, category: cat.name })));

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [installPhase, setInstallPhase] = useState<InstallPhase>("idle");
  const [installingIndex, setInstallingIndex] = useState(-1);
  const [blinkOn, setBlinkOn] = useState(true);

  // Blinking cursor for the "collecting" indicator
  useEffect(() => {
    const id = setInterval(() => setBlinkOn((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Trigger install sequence when section enters view
  useEffect(() => {
    if (!isInView || installPhase !== "idle") return;
    const t = setTimeout(() => {
      setInstallPhase("collecting");
      setTimeout(() => {
        setInstallPhase("running");
        setInstallingIndex(0);
      }, 750);
    }, 0);
    return () => clearTimeout(t);
  }, [isInView, installPhase]);

  // Advance through packages with slight variance per row (feels authentic)
  useEffect(() => {
    if (installPhase !== "running" || installingIndex < 0) return;
    if (installingIndex >= allSkills.length) {
      const t = setTimeout(() => setInstallPhase("done"), 0);
      return () => clearTimeout(t);
    }
    const r = Math.random();
    // ~15% chance of a "heavy" package (200–500ms), rest are 30–140ms
    const delay = r < 0.15
      ? 200 + Math.floor(Math.random() * 300)
      : 30 + Math.floor(Math.random() * 110);
    const t = setTimeout(() => setInstallingIndex((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [installPhase, installingIndex, allSkills.length]);

  const getRowPhase = (i: number): "pending" | "installing" | "done" => {
    if (installPhase === "idle" || installPhase === "collecting") return "pending";
    if (i < installingIndex) return "done";
    if (i === installingIndex) return "installing";
    return "pending";
  };

  const COL = "grid grid-cols-[1fr_100px] sm:grid-cols-[1fr_160px_160px] gap-2 px-6 sm:px-12 lg:px-16";

  return (
    <section ref={sectionRef} id="skills" className="border-b border-primary/10">

      {/* Command header */}
      <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-5 border-b border-primary/8 bg-surface/50">
        <span className="text-primary/50 font-mono text-[11px]">$</span>
        <span className="text-[11px] font-mono text-foreground/65 tracking-widest">pip install --upgrade --all</span>
        <span className="ml-auto text-[9px] font-mono text-secondary/45 uppercase tracking-[0.15em]">
          {`// ${sectionLabel} / ${title.toUpperCase()}`}
        </span>
      </div>

      {/* "Collecting packages..." status line — visible during collecting phase */}
      {installPhase !== "done" && (
      <div
        className="px-6 sm:px-12 lg:px-16 py-2 border-b border-primary/6 bg-primary/2.5 overflow-hidden transition-all duration-300"
        style={{ maxHeight: "36px", opacity: 1 }}
      >
        {installPhase === "idle" && (
          <span className="text-[10px] font-mono text-secondary/40 tracking-widest">
            Waiting for scroll...
          </span>
        )}
        {installPhase === "collecting" && (
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">
            Collecting {allSkills.length} packages from PyPI...{" "}
            <span style={{ opacity: blinkOn ? 1 : 0 }}>▌</span>
          </span>
        )}
        {installPhase === "running" && (
          <span className="text-[10px] font-mono text-secondary/50 tracking-widest">
            Installing...{" "}
            <span className="text-primary/60">{Math.min(installingIndex + 1, allSkills.length)}/{allSkills.length}</span>
            {"  "}
            <span style={{ opacity: blinkOn ? 1 : 0 }}>▌</span>
          </span>
        )}
      </div>
      )}

      {/* Table header */}
      <div className={`${COL} py-3 border-b border-primary/6 bg-primary/2`}>
        <span className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase">Package</span>
        <span className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase hidden sm:block">Version</span>
        <span className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase">Category</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-primary/5">
        {allSkills.map((skill, i) => {
          const info = ICONS[skill.name];
          const rowPhase = getRowPhase(i);

          /* ── PENDING: dim placeholder ── */
          if (rowPhase === "pending") {
            return (
              <div key={skill.name} className={`${COL} py-3 select-none`}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3 h-3 shrink-0 rounded-sm bg-secondary/10" />
        <span className="text-[11px] font-mono text-secondary/20 truncate">{skill.name}</span>
                </div>
                <span className="text-[10px] font-mono text-secondary/15 hidden sm:block">{info?.ver ?? "—"}</span>
                <span className="text-[10px] font-mono text-secondary/15 truncate">{skill.category}</span>
              </div>
            );
          }

          /* ── INSTALLING: highlighted + "Collecting [name]..." ── */
          if (rowPhase === "installing") {
            return (
              <div
                key={skill.name}
                className={`${COL} py-3 bg-primary/4 border-l border-primary/50`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {info && (
                    <info.icon
                      className="w-3 h-3 shrink-0"
                      style={{ color: info.color, opacity: 0.5 }}
                    />
                  )}
                  <span className="text-[11px] font-mono text-primary/75 truncate">
                    Collecting {skill.name}...
                  </span>
                  <span className="text-primary/55 font-mono text-[10px] ml-1" style={{ opacity: blinkOn ? 1 : 0 }}>▌</span>
                </div>
                <span className="text-[10px] font-mono text-secondary/30 hidden sm:block">—</span>
                <span className="text-[10px] font-mono text-secondary/30 truncate">...</span>
              </div>
            );
          }

          /* ── DONE: normal row ── */
          return (
            <div
              key={skill.name}
              className={`${COL} py-3 hover:bg-primary/2 transition-colors group cursor-default`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {info && (
                  <info.icon
                    className="w-3 h-3 shrink-0 opacity-50 group-hover:opacity-80 transition-opacity"
                    style={{ color: info.color }}
                  />
                )}
                <span className="text-[11px] font-mono text-foreground/60 group-hover:text-foreground/85 transition-colors truncate">
                  {skill.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-secondary/50 hidden sm:block">
                {info?.ver ?? "—"}
              </span>
              <span className="text-[10px] font-mono text-secondary/45 truncate">
                {skill.category}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-12 lg:px-16 py-3 border-t border-primary/6">
        <span className="text-[9px] font-mono text-secondary/45 transition-all duration-300">
          {installPhase === "done"
            ? `Successfully installed ${allSkills.length} packages.`
            : `${allSkills.length} packages`}
        </span>
      </div>
    </section>
  );
}

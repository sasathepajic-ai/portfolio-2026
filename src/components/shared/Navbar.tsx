"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

interface NavItem { label: string; href: string; }
interface Social  { platform: string; url: string; label?: string; }

// Description per nav section — designer-focused
const DESC_MAP: Record<string, string> = {
  About:        "Introduction",
  Work:         "Case Studies",
  Process:      "Design Approach",
  Experience:   "Background",
  Contact:      "Get in Touch",
};

// Mondrian control-panel color per section
const MONDRIAN: string[] = [
  "var(--nav-about)",
  "var(--mondrian-blue)",
  "var(--mondrian-yellow)",
  "var(--accent)",
  "var(--mondrian-white)",
];

export default function Navbar({
  name,
  items,
  socials = [],
}: {
  name: string;
  items: NavItem[];
  socials?: Social[];
  handle?: string;
}) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sections = items.map((it) => it.href.replace("#", ""));
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let cur = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) cur = i;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <>
      {/* MOBILE OPEN BUTTON */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-5 z-9999 lg:hidden flex items-center text-[10px] font-mono text-primary/60 hover:text-primary transition-colors px-2.5 py-1 border border-primary/30 bg-background/90 backdrop-blur-sm"
        >
          <span>[ MENU ]</span>
        </button>
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 h-screen w-65 z-9998
        border-r border-primary/15 bg-background
        flex flex-col
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* MOBILE CLOSE BUTTON */}
        <div className="lg:hidden flex justify-start px-5 py-4 shrink-0">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[10px] font-mono text-primary/60 hover:text-primary transition-colors px-2.5 py-1 border border-primary/30 bg-background/90"
          >
            [ CLOSE ]
          </button>
        </div>

        {/* TOP: identity header */}
        <div className="border-b border-primary/15 px-5 shrink-0">
          {/* Name row + theme toggle */}
          <div className="flex items-center justify-between gap-2 py-4 lg:pt-4">
            <div className="text-[12px] font-mono text-foreground/80 tracking-wide">
              {name}
            </div>
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="shrink-0 relative flex items-center gap-1 px-1 py-0.5 border border-primary/20 hover:border-primary/50 transition-all duration-200 group"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              <span className={`text-[10px] transition-all duration-200 ${
                theme === "dark" ? "opacity-100" : "opacity-30"
              }`}>☾</span>
              <span className={`relative inline-block w-6 h-3 mx-0.5 transition-colors duration-300 ${
                theme === "light" ? "bg-primary/25" : "bg-primary/15"
              }`}>
                <span className={`absolute top-0.5 w-2 h-2 transition-all duration-300 ${
                  theme === "light"
                    ? "left-[calc(100%-10px)] bg-primary"
                    : "left-0.5 bg-primary/60"
                }`} />
              </span>
              <span className={`text-[10px] transition-all duration-200 ${
                theme === "light" ? "opacity-100" : "opacity-30"
              }`}>☀</span>
            </button>
          </div>
        </div>
        {/* MID: navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="text-[8px] font-mono text-secondary/40 tracking-[0.25em] uppercase mb-5 px-1">
            Navigation
          </div>
          <ul className="space-y-1">
            {items.map((item, i) => {
              const isActive = active === i;
              const desc = DESC_MAP[item.label] ?? item.label;
              const color = MONDRIAN[i % MONDRIAN.length];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => { setActive(i); setMobileOpen(false); }}
                    className={`group flex items-center gap-3 px-3 py-3 transition-all duration-150 ${
                      isActive ? "bg-primary/5" : "hover:bg-primary/3"
                    }`}
                  >
                    {/* Mondrian color square */}
                    <span
                      className="shrink-0 w-2.5 h-2.5 transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? color : "transparent",
                        border: `1px solid ${color}`,
                        opacity: isActive ? 1 : 0.4,
                        boxShadow: isActive
                          ? theme === "light"
                            ? `0 0 3px ${color}33`
                            : `0 0 8px ${color}55`
                          : "none",
                      }}
                    />
                    {/* Number + label */}
                    <span className="flex flex-col gap-0.5 min-w-0">
                      <span className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono tabular-nums"
                          style={{ color: isActive ? color : undefined }}
                        >
                          {isActive
                            ? String(i + 1).padStart(2, "0")
                            : <span className="text-secondary/35">{String(i + 1).padStart(2, "0")}</span>
                          }
                        </span>
                        <span className={`text-[11px] font-mono uppercase tracking-[0.15em] transition-colors ${
                          isActive ? "text-foreground/90" : "text-foreground/65 group-hover:text-foreground/85"
                        }`}>
                          {item.label}
                        </span>
                      </span>
                      <span className={`text-[9px] font-mono pl-7 transition-colors ${
                        isActive ? "text-secondary/55" : "text-secondary/45"
                      }`}>
                        {desc}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Date + time row */}
          <div className=" px-4 border-t border-primary/10 py-2 flex items-center justify-center gap-2 text-[9px] font-mono text-secondary/45 tracking-widest">
            <span>{date}</span>
            <span className="text-secondary/25">·</span>
            <span>{time}</span>
          </div>

        {/* BOTTOM: Mondrian color strip + info + socials */}
        <div className="border-t border-primary/15 px-5 py-4 shrink-0 space-y-4">
          {/* Mini Mondrian color strip */}
          <div className="flex gap-1 items-center">
            {MONDRIAN.map((color, i) => (
              <span
                key={i}
                className="flex-1 h-1.5"
                style={{ backgroundColor: color, opacity: theme === "light" ? 0.9 : 0.8 }}
              />
            ))}
          </div>

          {/* Built-with info */}
          <div className="space-y-1.5">
            <div className="text-[8px] font-mono text-secondary/40 tracking-[0.2em] uppercase">Built with</div>
            {["Next.js", "React", "TypeScript"].map((pkg) => (
              <div key={pkg} className="flex items-center gap-2">
                <span className="text-primary/30 font-mono text-[9px]">•</span>
                <span className="text-[9px] font-mono text-secondary/50">{pkg}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div className="flex gap-1.5">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-[9px] font-mono text-secondary/50 hover:text-primary/80 transition-colors uppercase tracking-widest border border-primary/15 px-2 py-0.5 hover:border-primary/40"
                >
                  {s.label ?? s.platform}
                </a>
              ))}
            </div>
          )}

          <div className="text-[9px] font-mono text-secondary/35 pt-1">
            © 2026 {name}
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

interface NavItem { label: string; href: string; }
interface Social  { platform: string; url: string; label?: string; }

const CMD_MAP: Record<string, string> = {
  About:      "cat about.txt",
  Work:       "ls work/",
  Experience: "ls experience/",
  Skills:     "pip list",
  Contact:    "mail -s contact",
};

// Mondrian control-panel color per section — mirrors the image's button row
const MONDRIAN: string[] = [
  "var(--nav-about)",        // 01 — green (About only, stays green in light theme)
  "var(--mondrian-blue)",    // 02 — cobalt blue
  "var(--mondrian-yellow)",  // 03 — golden yellow
  "var(--accent)",           // 04 — signal red
  "var(--mondrian-white)",   // 05 — panel white / black in light
];

export default function Navbar({
  name,
  items,
  socials = [],
  handle = "sasa",
}: {
  name: string;
  items: NavItem[];
  socials?: Social[];
  handle?: string;
}) {
  const [time, setTime] = useState("");
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().slice(11, 19) + " UTC");
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
      {/* MOBILE OPEN BUTTON — hidden while sidebar is open */}
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
        {/* MOBILE CLOSE BUTTON — full-width row at very top of sidebar */}
        <div className="lg:hidden flex justify-start px-5 py-4 shrink-0">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[10px] font-mono text-primary/60 hover:text-primary transition-colors px-2.5 py-1 border border-primary/30 bg-background/90"
          >
            [ CLOSE ]
          </button>
        </div>

        {/* TOP: session header */}
        <div className="border-b border-primary/15 px-5 py-4 lg:pt-4 shrink-0">
          <div className="text-[9px] font-mono text-secondary/50 mb-2 tracking-widest uppercase">
            SSH session :: {new Date().toISOString().slice(0, 10)}
          </div>
          <div className="text-[12px] font-mono flex items-center gap-1">
            <span className="text-primary/40">$</span>
            <span className="text-foreground/80">{handle}</span>
            <span className="text-primary/35">@portfolio:~</span>
            <span className="inline-block w-1.5 h-3.5 bg-primary/70 cursor-blink ml-0.5 shrink-0" />
          </div>
          <div className="text-[9px] font-mono text-secondary/45 mt-2 tracking-widest">
            {time}
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" style={{ marginTop: '-1px' }} />
            <span className="text-[9px] font-mono text-primary/55 tracking-widest uppercase" style={{ lineHeight: 1 }}>ONLINE</span>
          </div>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="mt-2 self-start relative flex items-center gap-1 px-1 py-0.5 border border-primary/20 hover:border-primary/50 transition-all duration-200 group"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            <span className={`text-[10px] transition-all duration-200 ${
              theme === 'dark' ? 'opacity-100' : 'opacity-30'
            }`}>☾</span>
            <span className={`relative inline-block w-6 h-3 mx-0.5 transition-colors duration-300 ${
              theme === 'light' ? 'bg-primary/25' : 'bg-primary/15'
            }`}>
              <span className={`absolute top-0.5 w-2 h-2 transition-all duration-300 ${
                theme === 'light'
                  ? 'left-[calc(100%-10px)] bg-primary'
                  : 'left-0.5 bg-primary/60'
              }`} />
            </span>
            <span className={`text-[10px] transition-all duration-200 ${
              theme === 'light' ? 'opacity-100' : 'opacity-30'
            }`}>☀</span>
          </button>
        </div>

        {/* MID: navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="text-[8px] font-mono text-secondary/40 tracking-[0.25em] uppercase mb-5 px-1">
            {`// NAVIGATION`}
          </div>
          <ul className="space-y-0.5">
            {items.map((item, i) => {
              const isActive = active === i;
              const cmd = CMD_MAP[item.label] ?? `cd ${item.label.toLowerCase()}`;
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
                    {/* Mondrian color square â€” control panel button */}
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
                        &gt; {cmd}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* BOTTOM: Mondrian color strip + sys info + socials */}
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

          {/* Stack info */}
          <div className="space-y-1.5">
            <div className="text-[8px] font-mono text-secondary/40 tracking-[0.2em] uppercase">{`// SYS_INFO`}</div>
            {['Next.js 15', 'React 18', 'TypeScript'].map((pkg) => (
              <div key={pkg} className="flex items-center gap-2">
                <span className="text-primary/30 font-mono text-[9px]">&gt;</span>
                <span className="text-[9px] font-mono text-secondary/50">{pkg}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-mono text-secondary/50 hover:text-primary/80 transition-colors uppercase tracking-widest border border-primary/15 px-2 py-0.5 hover:border-primary/40"
                >
                  {s.label ?? s.platform}
                </a>
              ))}
            </div>
          )}

          <div className="text-[9px] font-mono text-secondary/35 pt-1">
            &copy; 2026 {name}
          </div>
        </div>
      </aside>
    </>
  );
}


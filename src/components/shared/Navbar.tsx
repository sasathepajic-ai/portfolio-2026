"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  name: string;
  items: NavItem[];
}

export default function Navbar({ name, items }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via scroll position
  useEffect(() => {
    const sectionIds = items.map((item) => item.href.replace("#", ""));

    const detect = () => {
      // At the very top — nothing active
      if (window.scrollY < 80) {
        setActiveSection("");
        return;
      }

      const mid = window.innerHeight * 0.35;
      let current = "";
      let closest = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        // Distance from "active detection line" — prefer sections whose top just passed it
        const dist = Math.abs(top - mid);
        if (top <= mid + 10 && dist < closest) {
          closest = dist;
          current = id;
        }
      });

      setActiveSection(current);
    };

    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, [items]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-2">
          <span className="text-primary/60 font-mono text-sm">&#47;&#47;</span>
          <span className="text-foreground font-semibold text-base tracking-tight font-mono">
            {name.split(" ")[0].toLowerCase()}
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            className="w-px h-4 bg-primary/50"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item, i) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium group transition-colors duration-200"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-secondary group-hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-xs mr-1.5 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-primary/30 group-hover:text-primary/60"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {item.label}
                </span>
                {/* Active underline */}
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute bottom-0 left-4 right-4 h-px bg-primary origin-left`}
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 text-secondary hover:text-foreground transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {items.map((item, i) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 transition-colors text-base font-medium py-3 border-b border-white/4 ${
                      isActive ? "text-foreground" : "text-secondary hover:text-foreground"
                    }`}
                  >
                    <span className={`font-mono text-xs ${isActive ? "text-primary" : "text-primary/40"}`}>
                      0{i + 1}
                    </span>
                    {item.label}
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}



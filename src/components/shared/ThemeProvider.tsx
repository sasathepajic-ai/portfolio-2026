"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeCtx>({ theme: "dark", toggle: () => {}, mounted: false });

export function useTheme() {
  return useContext(ThemeContext);
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}
function getSnapshot(): Theme {
  return (localStorage.getItem("theme") as Theme | null) ?? "dark";
}
function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore: server renders "dark", client reads localStorage after hydration.
  // React handles the mismatch gracefully — no hydration error, correct value after mount.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    // Notify useSyncExternalStore subscribers (same-tab update)
    window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: next }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

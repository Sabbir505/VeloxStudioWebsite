"use client";

import { createContext, useContext, useCallback, useMemo, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Store for theme state
let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

function getThemeSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribeToTheme(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setTheme(newTheme: Theme) {
  currentTheme = newTheme;
  listeners.forEach((listener) => listener());
}

// Initialize theme from localStorage (runs once on client)
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    currentTheme = "light";
  }
  document.documentElement.setAttribute("data-theme", currentTheme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

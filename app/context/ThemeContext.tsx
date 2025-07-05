"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// ThemeContext.tsx includes (this is all about remembering):
// - what the user selected ("light", "dark", or "system")
// - what’s actually applied ("light" or "dark")
// - a function to change the preference

type ThemeMode = "light" | "dark" | "system";

// Context holds the active theme, users selected choice, and function to update it
const ThemeContext = createContext<{
  mode: "light" | "dark"; // the currently active theme
  setThemeMode: (mode: ThemeMode) => void; // function to update what the user selected
  rawMode: ThemeMode; // rawMode must be either "light", "dark", or "system"
}>({
  mode: "light",
  setThemeMode: () => {},
  rawMode: "light",
});

// React component: provides theme context and applies active theme
export function ThemeProviderCustom({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load selected choice of user from localStorage or default to "system"
  const [rawMode, setRawMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme-mode");
      if (stored === "light" || stored === "dark" || stored === "system")
        return stored;
    }
    return "system";
  });
  // active theme currently applied
  const [mode, setMode] = useState<"light" | "dark">("light");

  // save the selected choice of user and update rawMode
  const setThemeMode = (mode: ThemeMode) => {
    setRawMode(mode);
    // store immediately to prevent flash on reload
    localStorage.setItem("theme-mode", mode);
  };

  // update active theme whenever users selected choice or system setting changes
  useEffect(() => {
    if (rawMode === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      setMode(mql.matches ? "dark" : "light");
      // look for system theme changes
      const listener = (e: MediaQueryListEvent) =>
        setMode(e.matches ? "dark" : "light");
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    } else {
      setMode(rawMode);
    }
  }, [rawMode]);

  // apply active theme to <html> element for CSS
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", mode);
    }
  }, [mode]);

  // set initial theme to prevent flash of incorrect theme
  useEffect(() => {
    if (typeof document !== "undefined") {
      const stored = localStorage.getItem("theme-mode");
      let initialMode: "light" | "dark" = "light";

      if (stored === "dark") {
        initialMode = "dark";
      } else if (stored === "system") {
        initialMode = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      document.documentElement.setAttribute("data-theme", initialMode);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode, rawMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access theme context in components
export function useThemeMode() {
  return useContext(ThemeContext);
}

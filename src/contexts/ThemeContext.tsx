import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "zenvio-theme";

const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme());
  const [hasStoredPreference, setHasStoredPreference] = useState(() => getStoredTheme() !== null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }
  }, [theme]);

  useEffect(() => {
    try {
      if (hasStoredPreference) {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, [theme, hasStoredPreference]);

  // Listen for OS preference changes until the user explicitly picks a theme.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      if (!hasStoredPreference) {
        setThemeState(e.matches ? "light" : "dark");
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [hasStoredPreference]);

  const setTheme = useCallback((t: Theme) => {
    setHasStoredPreference(true);
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setHasStoredPreference(true);
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

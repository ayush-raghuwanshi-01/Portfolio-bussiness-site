import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group relative grid h-10 w-10 place-items-center rounded-full border transition-all duration-300",
        "border-border/60 text-foreground/80 hover:text-foreground",
        "hover:border-emerald-400/60 hover:shadow-[0_0_20px_-4px_hsl(158_72%_50%/0.6)]",
        className,
      )}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-500",
          isDark ? "rotate-0 scale-100 text-ember" : "rotate-90 scale-0 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          !isDark ? "rotate-0 scale-100 text-primary" : "-rotate-90 scale-0 opacity-0",
        )}
      />
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
};

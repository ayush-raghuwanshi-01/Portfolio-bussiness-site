import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4">
      <nav
        className={cn(
          "flex w-full max-w-[1240px] items-center justify-between rounded-full px-3 py-2 transition-shadow sm:px-4",
          "glass-strong",
          scrolled && "shadow-elegant",
        )}
      >
        <Link to="/" aria-label="ZenVioLabs home" className="pl-1" onClick={() => setOpen(false)}>
          <Logo wordmark className="[&>span:last-child]:hidden sm:[&>span:last-child]:inline" />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  "text-foreground/70 hover:text-foreground",
                  isActive && "bg-secondary/80 text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <StartProjectButton source="navbar" size="sm" className="hidden sm:inline-flex">
            Start a Project
          </StartProjectButton>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[-1] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            className="glass-strong absolute left-3 right-3 top-[4.6rem] flex flex-col gap-1 rounded-3xl p-4 md:hidden shadow-elegant"
          >
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-secondary/60 active:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <StartProjectButton
              source="navbar-mobile"
              size="sm"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Start a Project
            </StartProjectButton>
          </div>
        </>
      )}
    </header>
  );
};

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lightNav = location.pathname === "/" && !scrolled && !open;

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4">
      <nav
        className={cn(
          "flex w-full max-w-[1240px] items-center justify-between rounded-full px-3 py-2 transition-shadow sm:px-4",
          lightNav ? "nav-light" : "glass-strong",
          scrolled && "shadow-elegant",
        )}
      >
        <Link to="/" aria-label="Zenvio Labs home" className="pl-1">
          <Logo
            wordmark
            className={cn(
              "[&>span:last-child]:hidden sm:[&>span:last-child]:inline",
              lightNav && "[&>span:last-child]:text-[hsl(230_25%_10%)]",
            )}
          />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  lightNav
                    ? "text-[hsl(230_25%_12%/0.72)] hover:text-[hsl(230_25%_10%)]"
                    : "text-foreground/70 hover:text-foreground",
                  isActive && (lightNav ? "bg-black/5 text-[hsl(230_25%_10%)]" : "bg-secondary/80 text-foreground"),
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border md:hidden",
              lightNav ? "border-black/10 text-[hsl(230_25%_10%)]" : "border-border/60 text-foreground",
            )}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong absolute left-3 right-3 top-[4.6rem] flex flex-col gap-1 rounded-3xl p-4 md:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-secondary/60"
            >
              {item.label}
            </Link>
          ))}
          <StartProjectButton source="navbar-mobile" size="sm" className="mt-2">
            Start a Project
          </StartProjectButton>
        </div>
      )}
    </header>
  );
};

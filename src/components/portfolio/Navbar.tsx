import { Github, Linkedin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className={cn(
      "relative text-sm text-muted-foreground transition-colors hover:text-foreground",
      "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
    )}
  >
    {children}
  </a>
);

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(1180px,94%)]">
      <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-display text-base font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span>Ayush<span className="text-primary">.</span></span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="#work">Work</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Hire Me</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

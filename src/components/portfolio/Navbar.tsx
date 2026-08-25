import { Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const COMPANY_NAME = "ZenWebStudio";

const SOCIAL_LINKS = {
  github: "https://github.com/zenwebstudio",
  linkedin: "https://linkedin.com/company/zenwebstudio",
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className={cn(
      "relative px-3 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground",
    )}
  >
    {children}
  </a>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleCTAClick = () => {
    trackEvent(AnalyticsEvents.NAV_CTA_CLICKED, { location: "navbar" });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(1240px,94%)]">
      <nav className="glass-strong flex items-center justify-between rounded-full px-3 py-2 sm:px-4">
        <a href="#home" className="flex items-center gap-2 pl-1">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white shadow-glass">
            <img src={logo} alt={COMPANY_NAME} width={40} height={40} className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            {COMPANY_NAME}<span className="text-ember">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/#work">Work</NavLink>
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/#team">Team</NavLink>
          <NavLink href="/#testimonials">Testimonials</NavLink>
          <NavLink href="/#booking">Book a Call</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 place-items-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:border-ember/50 hover:text-ember sm:grid"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 place-items-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:border-ember/50 hover:text-ember sm:grid"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Button asChild variant="ember" size="sm" className="hidden rounded-full sm:inline-flex">
            <a href="#booking" onClick={handleCTAClick}>Start a Project →</a>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong mt-2 flex flex-col gap-1 rounded-3xl p-4 md:hidden">
          {[
            { h: "/#work", l: "Work" },
            { h: "/#services", l: "Services" },
            { h: "/#team", l: "Team" },
            { h: "/#testimonials", l: "Testimonials" },
            { h: "/#booking", l: "Book a Call" },
          ].map((i) => (
            <a
              key={i.h}
              href={i.h}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/50"
            >
              {i.l}
            </a>
          ))}
          <Button asChild variant="ember" size="sm" className="mt-2 rounded-full">
            <a href="#booking" onClick={() => { setOpen(false); handleCTAClick(); }}>Start a Project →</a>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

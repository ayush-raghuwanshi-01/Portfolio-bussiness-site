import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { services } from "@/data/services";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark relative border-t border-border/50">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/65">
              A product studio for web apps, mobile apps, SaaS platforms, and cloud management. We
              scope honestly, ship weekly, and stay on the line after launch.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="ZenWebStudio on GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-colors hover:border-ember/50 hover:text-ember"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="ZenWebStudio on Linkedin"
                className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-colors hover:border-ember/50 hover:text-ember"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/65">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`} className="transition-colors hover:text-foreground">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services#offers" className="transition-colors hover:text-foreground">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold">Studio</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/65">
              <li>
                <Link to="/work" className="transition-colors hover:text-foreground">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about#process" className="transition-colors hover:text-foreground">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/65">
              <li>
                <Link to="/privacy" className="transition-colors hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/65">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-start gap-2 hover:text-foreground">
                  <Mail className="mt-0.5 h-4 w-4 text-ember" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneTel}`} className="inline-flex items-start gap-2 hover:text-foreground">
                  <Phone className="mt-0.5 h-4 w-4 text-ember" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-ember" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/50 pt-6 text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Web · Mobile · SaaS · Cloud · Reply within {site.responseTime}.</p>
        </div>
      </div>
    </footer>
  );
};

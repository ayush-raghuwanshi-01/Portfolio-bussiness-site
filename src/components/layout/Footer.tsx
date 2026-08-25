import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
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
              A studio for websites and business software. {site.startingPriceNote} You own the domain
              and the code.
            </p>
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
            © {year} {site.legalName}. {site.location}.
          </p>
          <p>Websites from {site.startingPrice} · Reply within {site.responseTime}.</p>
        </div>
      </div>
    </footer>
  );
};

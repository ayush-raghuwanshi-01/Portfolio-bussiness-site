import { Link } from "react-router-dom";
import { AppWindow, Cloud, Layers, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { Magnetic } from "@/components/site/Magnetic";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";
import heroLight from "@/assets/brand/hero-light.jpg";

const pills = [
  { icon: AppWindow, label: "Web Apps" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Layers, label: "Software as a Service (SaaS)" },
  { icon: Cloud, label: "Cloud Management" },
];

const stats = [
  { k: site.offer, v: "First engagement", note: site.offerLabel },
  { k: "You", v: "Own the product", note: "Repos, domains, and cloud stay in your name" },
  { k: "Wk", v: "Weekly progress", note: "Working software you can click" },
  { k: "24h", v: "Human reply", note: "A founder or lead engineer" },
];

export const Hero = () => (
  <section className="surface-paper relative isolate overflow-hidden pb-20 pt-32 sm:pt-36">
    <div className="pointer-events-none absolute inset-0">
      <img
        src={heroLight}
        alt=""
        className="h-full w-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(36_32%_97%/0.96)] via-[hsl(36_28%_97%/0.88)] to-[hsl(36_28%_97%/0.55)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(36_22%_94%)] via-transparent to-[hsl(36_32%_97%/0.35)]" />
    </div>

    <div className="container relative">
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-success/35 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {site.availability}
        </span>
        <span className="rounded-full bg-gradient-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-ember">
          {site.offer} {site.offerLabel}
        </span>
      </div>

      <div className="max-w-3xl animate-fade-up">
        <span className="eyebrow">Studio for growing businesses</span>
        <h1 className="mt-6 font-serif-display text-[40px] leading-[1.05] text-foreground sm:text-6xl lg:text-[72px]">
          Software that makes your company look as good as it <em className="hl-ember not-italic">works.</em>
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground/75">
          {site.name} designs and ships <span className="hl-soft">Web Apps</span>,{" "}
          <span className="hl-soft">Mobile Apps</span>,{" "}
          <span className="hl-soft">SaaS</span>, and{" "}
          <span className="hl-soft">Cloud Management</span> for founders who need a product
          customers can find, use, and trust.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground/75 shadow-sm"
            >
              <pill.icon className="h-3.5 w-3.5 text-ember" />
              {pill.label}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <StartProjectButton source="hero" size="xl">
              Start a Project
            </StartProjectButton>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="glass" size="xl">
              <Link
                to="/work"
                onClick={() => trackEvent(AnalyticsEvents.HERO_SECONDARY_CLICKED, { cta: "See our work" })}
              >
                See our work
              </Link>
            </Button>
          </Magnetic>
        </div>
        <p className="mt-3 text-xs text-foreground/55">
          One short form. We reply within {site.responseTime} with a clear next step.
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.v} className="glass-strong hover-lift rounded-[24px] p-5">
            <div className="font-serif-display text-4xl text-foreground">{stat.k}</div>
            <div className="mt-3 font-display text-sm font-semibold">{stat.v}</div>
            <div className="mt-1 text-xs text-foreground/55">{stat.note}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

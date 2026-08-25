import { Link } from "react-router-dom";
import { ArrowRight, Cloud, Smartphone, AppWindow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceStack } from "@/components/site/DeviceStack";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

const pills = [
  { icon: Cloud, label: "SaaS Engineering" },
  { icon: AppWindow, label: "Web App Dev" },
  { icon: Smartphone, label: "Mobile App Dev" },
];

const stats = [
  { k: "3", v: "Product surfaces", note: "SaaS, web, and mobile as one system" },
  { k: "Wk", v: "Weekly demos", note: "Working software, not status slides" },
  { k: "₹", v: "Published starting points", note: "No agency markup to decode" },
  { k: "24h", v: "Human reply", note: "A founder or lead engineer" },
];

export const Hero = () => (
  <section className="surface-dark relative isolate overflow-hidden pb-20 pt-32 sm:pt-36">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl animate-float" />
      <div className="absolute -right-16 top-10 h-80 w-80 rounded-full bg-ember/20 blur-3xl animate-float [animation-delay:-3s]" />
      <div className="absolute inset-x-0 bottom-0 h-56 overflow-hidden opacity-50">
        <div className="perspective-grid h-[420px] w-full" />
      </div>
    </div>

    <div className="container relative">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <span className="eyebrow">Product engineering studio</span>
          <h1 className="mt-6 font-serif-display text-[42px] leading-[1.02] text-foreground sm:text-6xl lg:text-[76px]">
            We engineer the <em className="hl-ember not-italic">software</em> your business{" "}
            <em className="italic text-foreground/80">runs on.</em>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-foreground/70">
            {site.name} designs and ships <span className="hl-soft">SaaS platforms</span>,{" "}
            <span className="hl-soft">web applications</span>, and{" "}
            <span className="hl-soft">mobile apps</span> for founders who want a product team — not
            an agency queue.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur"
              >
                <pill.icon className="h-3.5 w-3.5 text-ember" />
                {pill.label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="ember" size="xl">
              <Link
                to="/contact#book"
                onClick={() => trackEvent(AnalyticsEvents.HERO_CTA_CLICKED, { cta: "Book a consultation" })}
              >
                Book a consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link
                to="/work"
                onClick={() => trackEvent(AnalyticsEvents.HERO_SECONDARY_CLICKED, { cta: "View work" })}
              >
                View our work
              </Link>
            </Button>
          </div>
        </div>

        <DeviceStack />
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

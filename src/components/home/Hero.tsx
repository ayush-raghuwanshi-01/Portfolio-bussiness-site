import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AppWindow, Cloud, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceStack } from "@/components/site/DeviceStack";
import { Magnetic } from "@/components/site/Magnetic";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";
import { trustBadges } from "@/data/process";

const HeroCanvas = lazy(() => import("@/components/site/HeroCanvas").then((m) => ({ default: m.HeroCanvas })));

const pills = [
  { icon: AppWindow, label: "Web Apps" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Sparkles, label: "AI Engineering" },
  { icon: Cloud, label: "Cloud Architecture" },
];

const stats = [
  { k: "Prod", v: "Built for production", note: "Observability and rollback on day one" },
  { k: "Wk", v: "Weekly demos", note: "Working software, not status slides" },
  { k: "₹", v: "Published starting points", note: "No agency markup to decode" },
  { k: "24h", v: "Human reply", note: "A founder or lead engineer" },
];

export const Hero = () => (
  <section className="surface-dark relative isolate overflow-hidden pb-20 pt-32 sm:pt-36">
    <div className="pointer-events-none absolute inset-0 opacity-50">
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>
    </div>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-x-0 bottom-0 h-56 overflow-hidden opacity-40">
        <div className="perspective-grid h-[420px] w-full" />
      </div>
    </div>

    <div className="container relative">
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {site.availability}
        </span>
        {trustBadges
          .filter((b) => b.tone === "neutral")
          .map((badge) => (
            <span
              key={badge.label}
              className="rounded-full border border-border/70 bg-card/50 px-3 py-1 text-[11px] text-foreground/65 backdrop-blur"
            >
              {badge.label}
            </span>
          ))}
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <span className="eyebrow">IT & product engineering studio</span>
          <h1 className="mt-6 font-serif-display text-[40px] leading-[1.02] text-foreground sm:text-6xl lg:text-[72px]">
            Software engineered to <em className="hl-ember not-italic">ship</em> — and stay in{" "}
            <em className="italic text-foreground/80">production.</em>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-foreground/70">
            {site.name} designs and builds <span className="hl-soft">custom software</span>,{" "}
            <span className="hl-soft">web and mobile products</span>,{" "}
            <span className="hl-soft">applied AI</span>, and the{" "}
            <span className="hl-soft">cloud path</span> they run on. A named lead. A written scope.
            Weekly software you can click.
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

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild variant="ember" size="xl">
                <Link
                  to="/contact#book"
                  onClick={() => trackEvent(AnalyticsEvents.HERO_CTA_CLICKED, { cta: "Start Your Project" })}
                >
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="glass" size="xl">
                <Link
                  to="/work"
                  onClick={() => trackEvent(AnalyticsEvents.HERO_SECONDARY_CLICKED, { cta: "View Live Demos" })}
                >
                  View Live Demos
                </Link>
              </Button>
            </Magnetic>
          </div>
          <p className="mt-3 text-xs text-foreground/50">
            Twenty minutes. No deck theatre. You leave with a next step — even if that step is “not yet.”
          </p>
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

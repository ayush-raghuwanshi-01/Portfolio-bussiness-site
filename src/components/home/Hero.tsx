import { Link } from "react-router-dom";
import { AppWindow, ArrowRight, CheckCircle2, Smartphone, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { Magnetic } from "@/components/site/Magnetic";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";
import { HeroVisual } from "@/components/home/HeroVisual";

const pills = [
  { icon: AppWindow, label: "Websites" },
  { icon: Workflow, label: "Business software" },
  { icon: Smartphone, label: "Mobile apps" },
];

const trustPoints = [
  "Domain, code & accounts in your name",
  "Reply within 24h on WhatsApp",
  "No hidden costs — written quote",
];

export const Hero = () => (
  <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-26">
    {/* Decorative background (theme-adaptive) */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 grid-bg hero-grid-bg" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full hero-primary-glow blur-[120px]" />
      <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full hero-green-glow blur-[110px]" />
      {/* Light mode: subtle decorative dots top-right instead of a murky blob */}
      <div aria-hidden className="hero-dots absolute"><span /></div>
      {/* Dark mode: ember accent bottom-right */}
      <div className="dark-ember-glow absolute -right-24 bottom-10 hidden h-[280px] w-[280px] rounded-full blur-[110px] md:block" />
    </div>

    <div className="container relative">
    
      {/* Two-column split */}
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="animate-fade-up lg:col-span-7">
          <h1 className="mt-6 font-serif-display text-[42px] leading-[1.02] text-foreground sm:text-6xl lg:text-[65px]">
            Websites that <em className="hl-ember not-italic">convert</em>.
            <br />
            Software that <em className="hl-green not-italic">scales</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-foreground/75">
            {site.name} is a small engineering team building,
            <span className="hl-green-soft">websites</span>, 
            <span className="hl-green-soft">mobile apps</span>,  <span className="hl-green-soft">Software Solutions</span> for shops, institutes, clinics,
            and growing companies across India.
          </p>

          {/* Trust bullets */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {trustPoints.map((t) => (
              <li key={t} className="flex items-start gap-2 text-[13px] text-foreground/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-foreground/85 shadow-sm backdrop-blur-md"
              >
                <pill.icon className="h-3.5 w-3.5 text-ember" />
                {pill.label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <StartProjectButton source="hero" size="xl" className="group">
                Start a project
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </StartProjectButton>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="glass" size="xl" className="backdrop-blur-md">
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
            One short form → lands on our WhatsApp + email. Reply within{" "}
            <span className="font-semibold text-emerald-500">{site.responseTime}</span>.
            No spam, no newsletter.
          </p>

          {/* Micro proof row */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-foreground/55">
            <span className="flex items-center gap-1.5">
              <span className="flex -space-x-2">
                {["#22c55e", "#f97316", "#7C6BFF", "#06b6d4"].map((c) => (
                  <span
                    key={c}
                    className="inline-block h-5 w-5 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </span>
              Trusted by 40+ Indian businesses
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">★★★★★</span> 5.0 average rating
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Starts at {site.startingPrice}
            </span>
          </div>
        </div>

        {/* Right column */}
        <div className="relative lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </div>
  </section>
);

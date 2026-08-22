import { ArrowRight, Github, Linkedin, Sparkles, Bot, Code2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const COMPANY_NAME = "ZenWebStudio";

const SOCIAL_LINKS = {
  github: "https://github.com/zenwebstudio",
  linkedin: "https://linkedin.com/company/zenwebstudio",
};

// No client logos URLs yet — row will be hidden. Add real URLs when you have clients.
const CLIENT_LOGOS: { src: string; alt: string }[] = [];

const Hero = () => {
  const handlePrimaryCTA = () => {
    trackEvent(AnalyticsEvents.HERO_CTA_CLICKED, { cta: "Get a Free Consultation" });
  };

  const handleSecondaryCTA = () => {
    trackEvent(AnalyticsEvents.HERO_SECONDARY_CLICKED, { cta: "See Our Work" });
  };

  return (
    <section
      id="home"
      className="surface-light relative isolate flex min-h-screen items-center overflow-hidden pt-32 pb-20 sm:pt-36"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-ember/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float [animation-delay:-3s]" />

      <div className="container relative">
        <div className="mx-auto max-w-5xl text-center animate-fade-up">
          <span className="eyebrow justify-center">Build · Launch · Scale</span>

          <h1 className="mt-7 font-serif-display text-[44px] leading-[1.02] text-foreground sm:text-[72px] lg:text-[96px]">
            We build the <em className="hl-ember not-italic font-serif-display">software</em>
            <br className="hidden sm:block" />
            <span className="font-serif-display"> your business </span>
            <em className="font-serif-display italic text-foreground/85">runs on.</em>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-[17px]">
            {COMPANY_NAME} is a young, focused tech studio. We design, build, and <span className="hl-soft">manage</span> business websites,
            custom software & SaaS for founders — at <span className="hl-soft">honest, startup-friendly prices</span>.
            A small team that ships faster than any legacy agency.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { icon: Code2, label: "Business Websites" },
              { icon: Rocket, label: "Custom SaaS" },
              { icon: Bot, label: "AI Automations" },
              { icon: Sparkles, label: "Brand & Growth" },
            ].map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur"
              >
                <c.icon className="h-3.5 w-3.5 text-ember" /> {c.label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="ember" size="xl">
              <a href="#booking" onClick={handlePrimaryCTA}>
                Get a Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#work" onClick={handleSecondaryCTA}>See Our Work</a>
            </Button>
          </div>

          {CLIENT_LOGOS.length > 0 && (
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="flex -space-x-3">
                {CLIENT_LOGOS.map((l) => (
                  <img
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    className="h-9 w-9 rounded-full border-2 border-background object-cover shadow-sm"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/70">
                Trusted by <span className="font-semibold text-ember">{CLIENT_LOGOS.length}+ businesses</span> to ship their software
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-foreground/60">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span className="h-4 w-px bg-border" />
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          <div className="glass-strong relative overflow-hidden rounded-[32px] p-5">
            <div className="absolute inset-0 bg-gradient-aurora opacity-50" />
            <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-ember/15 to-primary/10 p-8 text-center">
              <span className="font-serif-display text-6xl sm:text-7xl text-foreground">ZWS</span>
              <span className="mt-2 font-display text-sm font-semibold text-foreground/80">ZenWebStudio</span>
              <div className="glass absolute left-4 top-4 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs animate-float">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-ember">
                  <Bot className="h-4 w-4 text-white" />
                </span>
                <div className="text-left">
                  <div className="font-display text-sm font-semibold leading-tight">AI-powered builds</div>
                  <div className="text-[10px] text-foreground/60">Ship 5× faster</div>
                </div>
              </div>
              <div className="glass absolute -right-1 bottom-6 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs animate-float [animation-delay:-2s]">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <div className="text-left">
                  <div className="font-display text-sm font-semibold leading-tight">Startup-friendly</div>
                  <div className="text-[10px] text-foreground/60">Transparent pricing</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { k: "→", v: "Full-stack team", note: "Design, code, growth — in-house" },
              { k: "5×", v: "Faster with AI", note: "From spec to deploy" },
              { k: "₹", v: "Founder-friendly", note: "Transparent, no agency markup" },
              { k: "24h", v: "Response time", note: "We pick up the phone" },
            ].map((s) => (
              <div
                key={s.v}
                className="glass-strong group relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-transform hover-lift"
              >
                <div className="font-serif-display text-5xl text-foreground sm:text-6xl">{s.k}</div>
                <div className="mt-6">
                  <div className="font-display text-sm font-semibold text-foreground">{s.v}</div>
                  <div className="mt-1 text-xs text-foreground/60">{s.note}</div>
                </div>
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-ember/10 blur-2xl transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

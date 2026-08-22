import { ArrowUpRight, CheckCircle2, Megaphone, Rocket, Wand2, Zap, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const pillars = [
  {
    icon: Wand2,
    title: "Business Websites & Digital Identity",
    desc: "Conversion-ready websites, brand kits, and digital presence that makes people stop scrolling and start buying.",
  },
  {
    icon: Rocket,
    title: "Custom Software & SaaS Development",
    desc: "Full-stack web apps, dashboards, and SaaS products — engineered to scale with your business from day one.",
  },
  {
    icon: Megaphone,
    title: "Growth, Automation & AI Integration",
    desc: "AI workflows, marketing funnels, ops automation, and performance marketing that pays for itself.",
  },
];

const deliverables = [
  "Business websites & landing pages",
  "Custom SaaS & web apps with AI built-in",
  "AI agents that run your ops & support",
  "Performance marketing & SEO with ROI",
  "Done-for-you brand kits & social content",
  "Monthly retainer — we manage it all for you",
];

const tiers = [
  {
    icon: Zap,
    name: "Starter",
    price: "₹9,999 / $199",
    period: "one-time",
    tagline: "Perfect for getting online",
    features: [
      "5-page business website",
      "Mobile-responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 month of support",
    ],
    cta: "Get Started",
    accent: false,
  },
  {
    icon: Rocket,
    name: "Growth",
    price: "₹49,999 / $799",
    period: "one-time + optional retainer",
    tagline: "For businesses ready to scale",
    features: [
      "Custom web app or SaaS MVP",
      "AI-powered features",
      "Stripe/payment integration",
      "Analytics & conversion tracking",
      "3 months of support & iterations",
    ],
    cta: "Most Popular",
    accent: true,
  },
  {
    icon: Crown,
    name: "Custom",
    price: "Let's talk",
    period: "tailored to your scope",
    tagline: "For complex, multi-phase builds",
    features: [
      "Full product design & development",
      "Dedicated team allocation",
      "AI ops & automation suite",
      "Ongoing growth & marketing",
      "Priority Slack/WhatsApp support",
    ],
    cta: "Talk to Us",
    accent: false,
  },
];

const Services = () => {
  const handleCTA = () => {
    trackEvent(AnalyticsEvents.SERVICES_CTA_CLICKED, { location: "services" });
  };

  return (
    <section id="services" className="surface-blue relative py-28">
      <div className="container">
        <div className="glass-strong relative overflow-hidden rounded-[32px] p-8 sm:p-14">
          {/* aurora */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-60" />
          <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="eyebrow">Our Services · Startup Rates</span>
              <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[80px]">
                Hire a <em className="hl-ember not-italic">focused team</em>,
                <br /> not a slow, expensive agency.
              </h2>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-foreground/85">
                We build <span className="hl-soft">business websites</span>, <span className="hl-soft">custom software</span> and
                <span className="hl-soft"> SaaS</span> — then use <span className="hl-soft">AI</span> to run your operations alongside you. A young, skilled team,
                startup-friendly pricing, and partners who actually pick up the phone.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {deliverables.map((d) => (
                  <div key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {d}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="ember" size="lg">
                  <a href="#booking" onClick={handleCTA}>
                    Get a free consultation <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <a href="#work">View case studies</a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                      <p.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <div>
                      <div className="font-display text-lg font-semibold">{p.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-tier pricing */}
        <div className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Pricing · Transparent packages</span>
            <h2 className="mt-5 font-serif-display text-4xl text-foreground sm:text-5xl">
              Pay as you <em className="hl-ember not-italic">grow.</em>
            </h2>
            <p className="mt-4 text-[15px] text-foreground/70">
              No agency markup. No hidden fees. Pick a package or talk to us about a custom build.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`glass relative overflow-hidden rounded-2xl p-7 transition-transform hover-lift ${
                  tier.accent ? "ring-2 ring-ember/60" : ""
                }`}
              >
                {tier.accent && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-ember px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </div>
                )}
                <tier.icon className={`h-7 w-7 ${tier.accent ? "text-ember-glow" : "text-primary"}`} />
                <div className="mt-4 font-display text-xl font-semibold text-foreground">{tier.name}</div>
                <div className="mt-1 text-xs text-foreground/60">{tier.tagline}</div>
                <div className="mt-4">
                  <span className="font-serif-display text-3xl text-foreground">{tier.price}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{tier.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.accent ? "ember" : "glass"}
                  size="sm"
                  className="mt-6 w-full rounded-full"
                >
                  <a
                    href="#booking"
                    onClick={() => {
                      trackEvent(AnalyticsEvents.PRICING_TIER_CLICKED, { tier: tier.name });
                    }}
                  >
                    {tier.cta}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

import { ArrowUpRight, CheckCircle2, Megaphone, Rocket, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Wand2,
    title: "Websites & Brand Design",
    desc: "Stunning, conversion-ready sites and identities that make people stop scrolling.",
  },
  {
    icon: Rocket,
    title: "Software & SaaS Builds",
    desc: "Custom web apps, dashboards and full SaaS products — engineered to scale with you.",
  },
  {
    icon: Megaphone,
    title: "AI-Managed Growth",
    desc: "I run your business on autopilot — AI workflows, marketing funnels and ops, hands-on.",
  },
];

const deliverables = [
  "Websites & landing pages from ₹999 / $49",
  "Custom SaaS & web apps with AI built-in",
  "AI agents that run your ops & support",
  "Performance marketing & SEO that pays back",
  "Done-for-you brand kits & social content",
  "Monthly retainer — I manage it all for you",
];

const Services = () => (
  <section id="services" className="surface-blue relative py-28">
    <div className="container">
      <div className="glass-strong relative overflow-hidden rounded-[32px] p-8 sm:p-14">
        {/* aurora */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-60" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Hire me · Affordable founder rates
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Hire a young founder, <br />
              <span className="text-gradient">not a slow, expensive agency.</span>
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              I build <span className="text-foreground">websites, software and SaaS</span> — then use{" "}
              <span className="text-foreground">AI to run your business</span> alongside you. One obsessive operator,
              startup-friendly pricing, and a partner who actually picks up the phone.
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
              <Button asChild variant="hero" size="lg">
                <a href="#contact">
                  Get a free quote <ArrowUpRight className="h-4 w-4" />
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
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Pricing</div>
              <div className="mt-2 font-display text-2xl font-semibold">
                Starting at <span className="text-gradient">₹999 / $49</span> — pay as you grow.
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Transparent packages. No agency markup. Built and managed by me, scaled by AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;

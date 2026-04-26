import { ArrowUpRight, CheckCircle2, Megaphone, Rocket, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Wand2,
    title: "Brand-First Design",
    desc: "Identity, art direction, and a website that makes people stop scrolling.",
  },
  {
    icon: Rocket,
    title: "Engineered for Speed",
    desc: "Modern stacks, sub-second loads, and a foundation built to scale with you.",
  },
  {
    icon: Megaphone,
    title: "Growth Engine",
    desc: "Funnels, content, and paid loops wired into the product from day one.",
  },
];

const deliverables = [
  "Full brand & website redesign",
  "Custom web apps with AI integrations",
  "Conversion-led landing pages",
  "Performance marketing playbooks",
  "Founder-led 1:1 strategy calls",
  "Ongoing growth retainers",
];

const Services = () => (
  <section id="services" className="relative py-28">
    <div className="container">
      <div className="glass-strong relative overflow-hidden rounded-[32px] p-8 sm:p-14">
        {/* aurora */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-60" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Freelance · Now booking
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Work With Me — <br />
              <span className="text-gradient">brands that punch above their weight.</span>
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              I don't just build websites. I build <span className="text-foreground">unfair advantages</span>:
              a fused offering of design, engineering, and growth marketing — delivered by one obsessive operator
              instead of a 10-person agency.
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
                  Book a discovery call <ArrowUpRight className="h-4 w-4" />
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
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Engagement</div>
              <div className="mt-2 font-display text-2xl font-semibold">
                From <span className="text-gradient">$2k sprints</span> to long-term partnerships.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;

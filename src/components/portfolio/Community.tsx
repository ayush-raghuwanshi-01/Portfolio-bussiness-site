import { ArrowUpRight, Shield, Clock, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Community section — rebuilt as "Why Choose Us" without any fabricated stats.
 * No fake likes, comments, follower counts, or stock photos.
 * All claims must be true and verifiable.
 */

const reasons = [
  {
    icon: Zap,
    title: "We ship fast",
    desc: "A focused, small team means no bureaucracy. From spec to deploy in days, not months.",
  },
  {
    icon: Shield,
    title: "Real accountability",
    desc: "Every project has a dedicated lead who picks up the phone. No ticket queues, no account managers.",
  },
  {
    icon: Clock,
    title: "Founder-friendly pricing",
    desc: "Transparent packages with no agency markup. Pay for what you need, scale when you're ready.",
  },
  {
    icon: Users,
    title: "Full-stack, in-house",
    desc: "Design, code, AI, growth — all under one roof. No subcontractors, no hand-offs.",
  },
];

const Community = () => {
  return (
    <section id="why-us" className="surface-dark relative py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-blob" />
      </div>

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* LEFT — copy + CTA */}
          <div className="animate-fade-up">
            <span className="eyebrow">Why ZenWebStudio</span>
            <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[68px]">
              A young team that <em className="hl not-italic">ships like a startup.</em>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/80">
              We're not a bloated agency with overhead and hand-offs. We're a <span className="hl-soft">small, skilled team</span> where every person is an owner.
              That means faster builds, direct communication, and results you can measure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ember" size="xl">
                <a href="#booking">
                  Start Your Project <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#work">See Our Work</a>
              </Button>
            </div>
          </div>

          {/* RIGHT — reason cards */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-aurora opacity-40 blur-2xl animate-tilt" />
            <div className="glass-strong relative space-y-4 rounded-[32px] p-5 sm:p-6">
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="font-display text-sm font-semibold">Why teams choose us</div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Real</span>
              </div>

              {reasons.map((r, i) => (
                <article
                  key={r.title}
                  className="glass hover-lift group relative overflow-hidden rounded-2xl p-5 animate-fade-up"
                  style={{ animationDelay: `${i * 140}ms` }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary to-accent" />
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                      <r.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-base font-semibold text-foreground">{r.title}</div>
                      <p className="mt-1 text-sm text-foreground/80">{r.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;

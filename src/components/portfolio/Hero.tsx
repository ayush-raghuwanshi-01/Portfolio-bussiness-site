import { ArrowDown, Github, Linkedin, Sparkles, Bot, Code2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import ayushCutout from "@/assets/ayush-main.png";

const Hero = () => {
  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden pt-32 pb-16">
      {/* Video background placeholder */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Floating glass orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-float [animation-delay:-3s]" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT — copy */}
          <div className="animate-fade-up text-center lg:text-left">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Young founder · Booking projects this month
            </span>

            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[62px]">
              I build <span className="hl">websites, software & SaaS</span> — and run your business with <span className="hl">AI</span>.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg lg:mx-0">
              Hey, I'm <span className="hl">Ayush</span> — a young entrepreneur, full-stack developer
              and growth marketer. I design, build and <span className="hl-soft">manage</span> digital products for
              founders & brands at <span className="hl-soft">honest, affordable prices</span>. One operator. Agency-grade output. AI-powered speed.
            </p>

            {/* offer chips */}
            <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {[
                { icon: Code2, label: "Websites & Web Apps" },
                { icon: Rocket, label: "Custom SaaS" },
                { icon: Bot, label: "AI Automations" },
                { icon: Sparkles, label: "Brand & Marketing" },
              ].map((c) => (
                <span key={c.label} className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
                  <c.icon className="h-3.5 w-3.5 text-primary" /> {c.label}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button asChild variant="hero" size="xl">
                <a href="#contact">
                  <Sparkles className="h-4 w-4" /> Hire Me — Let's Talk
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#work">
                  See my work <ArrowDown className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5 text-sm text-muted-foreground lg:justify-start">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span className="h-4 w-px bg-border" />
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>

          {/* RIGHT — cutout photo */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[5/5]">
              {/* halo */}
              <div className="absolute inset-x-6 bottom-0 top-12 rounded-[40px] bg-gradient-primary opacity-30 blur-3xl" />
              <div className="absolute inset-0 rounded-[36px] bg-gradient-aurora opacity-40 blur-2xl" />

              {/* glass frame */}
              <div className="glass-strong absolute inset-0 overflow-hidden rounded-[36px]" />

              {/* cutout */}
              <img
                src={ayushCutout}
                alt="Ayush — young entrepreneur, developer & marketer"
                width={896}
                height={1216}
                className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_hsl(var(--primary)/0.35)]"
              />

              {/* floating tag — top */}
              <div className="glass absolute left-2 top-6 z-20 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs animate-float">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </span>
                <div className="text-left">
                  <div className="font-display text-sm font-semibold leading-tight">AI-powered build</div>
                  <div className="text-[10px] text-muted-foreground">Ship 5× faster</div>
                </div>
              </div>

              {/* floating tag — bottom */}
              <div className="glass absolute -right-2 bottom-10 z-20 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs animate-float [animation-delay:-2s]">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/80">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </span>
                <div className="text-left">
                  <div className="font-display text-sm font-semibold leading-tight">From ₹999 / $49</div>
                  <div className="text-[10px] text-muted-foreground">Affordable, founder-friendly</div>
                </div>
              </div>

              {/* price chip */}
              <div className="glass-strong absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-full px-4 py-2 text-center">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Founder rate</div>
                <div className="font-display text-sm font-semibold text-gradient">Built by me · Managed by AI</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats glass row */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: "10+", v: "Projects shipped" },
            { k: "5", v: "Brands served" },
            { k: "5×", v: "Faster with AI" },
            { k: "100%", v: "Client retention" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl px-4 py-5 text-center">
              <div className="font-display text-2xl font-semibold text-gradient">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

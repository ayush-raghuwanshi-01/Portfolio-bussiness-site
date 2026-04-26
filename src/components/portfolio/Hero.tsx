import { ArrowDown, Github, Linkedin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden pt-32">
      {/* Video background placeholder */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        {/* Future <video autoplay loop muted playsinline> can replace the img */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Floating glass orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-float [animation-delay:-3s]" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for select freelance projects · Q3
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
            Building <span className="text-gradient">bold digital</span>
            <br className="hidden sm:block" /> products that move brands forward.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            I'm <span className="text-foreground">Ayush</span> — a young, full-stack developer & freelance marketer.
            Founder of <span className="text-foreground">Asklytics.in</span>, building tech for{" "}
            <span className="text-foreground">Prabha Foundation</span>, and shipping growth for ambitious brands.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#contact">
                <Play className="h-4 w-4" /> Work With Me
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#work">
                See projects <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5 text-sm text-muted-foreground">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span className="h-4 w-px bg-border" />
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Stats glass row */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: "30+", v: "Projects shipped" },
            { k: "12", v: "Brands served" },
            { k: "2", v: "Flagship ventures" },
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

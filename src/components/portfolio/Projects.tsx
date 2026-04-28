import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, ShoppingBag, Dumbbell, Sparkles } from "lucide-react";
import asklytics from "@/assets/asklytics-project.png";
import ecommerce from "@/assets/Ecommerse-project.png";
import gym from "@/assets/gym-project.png";
import prabha from "@/assets/project-prabha.jpg";
import three from "@/assets/project-three.jpg";
import heroBg from "@/assets/hero-bg.jpg";

type Project = {
  tag: string;
  title: string;
  desc: string;
  icon: typeof BarChart3;
  images: string[];
  link: string;
  stack: string[];
  accent: string; // tailwind gradient classes
};

const projects: Project[] = [
  {
    tag: "Tech Lead · Co-Founder",
    title: "Asklytics.in",
    desc: "AI-driven analytics platform giving business users instant data insights — no SQL, no waiting on engineers.",
    icon: BarChart3,
    images: [asklytics, prabha, three, heroBg],
    link: "https://asklytics.in",
    stack: ["React", "FastAPI", "AI", "Cloud"],
    accent: "from-indigo-500/40 via-violet-500/30 to-fuchsia-500/30",
  },
  {
    tag: "Tech Lead",
    title: "Ecommerce Storefront",
    desc: "A high-performance, modular commerce engine with seamless API integrations and a lightning-fast checkout.",
    icon: ShoppingBag,
    images: [ecommerce, three, prabha, asklytics],
    link: "#",
    stack: ["React", "UI/UX", "SEO", "Stripe"],
    accent: "from-sky-500/40 via-cyan-500/30 to-indigo-500/30",
  },
  {
    tag: "Founder · SaaS",
    title: "AI Gym Management SaaS",
    desc: "An AI-powered platform for gym owners to manage members, payments and retention — at a founder-friendly price.",
    icon: Dumbbell,
    images: [gym, asklytics, heroBg, ecommerce],
    link: "#",
    stack: ["FastAPI", "React", "AI", "Postgres"],
    accent: "from-emerald-500/40 via-teal-500/30 to-indigo-500/30",
  },
  {
    tag: "Brand · Product",
    title: "Prabha Foundation",
    desc: "A purpose-driven nonprofit experience — storytelling, donations and member onboarding crafted with care.",
    icon: Sparkles,
    images: [prabha, three, ecommerce, gym],
    link: "#",
    stack: ["Next.js", "Tailwind", "CMS", "Motion"],
    accent: "from-rose-500/40 via-pink-500/30 to-violet-500/30",
  },
];

const Projects = () => {
  return (
    <section id="work" className="relative py-28">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Selected Work
            </span>
            <h2 className="mt-4 text-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
              Products built with <span className="text-gradient">intent.</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Four flagship builds — every project is a craft of code, design, and growth strategy.
            Hover to pause the reel.
          </p>
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const Icon = project.icon;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % project.images.length);
    }, 2600 + index * 250); // slight stagger so cards don't switch in unison
    return () => clearInterval(id);
  }, [paused, project.images.length, index]);

  return (
    <a
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group glass hover-lift relative block overflow-hidden rounded-3xl p-5 sm:p-6"
    >
      {/* Accent glow */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${project.accent} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
      />

      {/* Image stage */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 aspect-[16/10]">
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.title} preview ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i === active
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.06]"
            }`}
          />
        ))}

        {/* Gradient veil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${project.accent} mix-blend-overlay opacity-60`}
        />

        {/* Floating tag */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
          <Icon className="h-3 w-3 text-primary-glow" />
          {project.tag}
        </span>

        {/* Counter */}
        <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-md">
          {String(active + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
        </span>

        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {project.images.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-6 bg-primary-glow" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-display text-2xl font-semibold sm:text-[26px]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            {project.desc}
          </p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/60 bg-secondary/40 text-muted-foreground transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/15 group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10.5px] tracking-tight text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </a>
  );
};

export default Projects;

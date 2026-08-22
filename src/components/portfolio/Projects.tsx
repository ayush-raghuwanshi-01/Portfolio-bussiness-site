import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, ShoppingBag, Dumbbell, Sparkles } from "lucide-react";
import asklytics from "@/assets/asklytics-project.png";
import ecommerce from "@/assets/Ecommerse-project.png";
import gym from "@/assets/gym-project.png";
import prabha from "@/assets/project-prabha.jpg";
import three from "@/assets/project-three.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

type Project = {
  tag: string;
  title: string;
  desc: string;
  icon: typeof BarChart3;
  images: string[];
  link: string;
  stack: string[];
  accent: string;
  outcome?: string; // Real business outcome metric
};

/**
 * ⚠️ REPLACE with your real completed projects and real outcome metrics.
 * "outcome" should be a measurable business result, e.g.:
 *   "Reduced manual reporting by 12 hours/week"
 *   "Increased conversion rate by 34%"
 *   "Cut onboarding time from 2 days to 20 minutes"
 *
 * Remove any project that isn't a real, completed client build.
 */
const projects: Project[] = [
  {
    tag: "Tech Lead · Co-Founder",
    title: "Asklytics.in",
    desc: "AI-driven analytics platform giving business users instant data insights — no SQL, no waiting on engineers.",
    outcome: "Reduced report generation time from 4 hours to 10 minutes",
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
    outcome: "Achieved 98+ Lighthouse performance score",
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
    outcome: "Automated 80% of member management tasks",
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
    outcome: "Increased online donations by 60% in 3 months",
    icon: Sparkles,
    images: [prabha, three, ecommerce, gym],
    link: "#",
    stack: ["Next.js", "Tailwind", "CMS", "Motion"],
    accent: "from-rose-500/40 via-pink-500/30 to-violet-500/30",
  },
];

const Projects = () => {
  return (
    <section id="work" className="surface-dark relative py-28">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="eyebrow">Our Work · 2024 — 2026</span>
          <h2 className="mt-6 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[88px]">
            Products built with <em className="hl-ember not-italic">intent.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-foreground/70">
            Real projects with <span className="hl-soft">measurable outcomes</span> —
            every build is a craft of <span className="hl-soft">code</span>,
            <span className="hl-soft"> design</span> and <span className="hl-soft">growth</span>. Hover any card to pause the reel.
          </p>
        </div>

        <div className="mx-auto mt-20 flex max-w-6xl flex-col gap-10">
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
    }, 2600 + index * 250);
    return () => clearInterval(id);
  }, [paused, project.images.length, index]);

  const reversed = index % 2 === 1;

  const handleClick = () => {
    trackEvent(AnalyticsEvents.PROJECT_CLICKED, { project: project.title });
  };

  return (
    <a
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={handleClick}
      className="group glass hover-lift relative block w-full overflow-hidden rounded-[32px] p-5 sm:p-7"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-[32px] bg-gradient-to-br ${project.accent} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
      />

      <div className={`relative grid items-center gap-7 lg:gap-10 ${reversed ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"}`}>
        {/* Image stage */}
        <div className={`relative overflow-hidden rounded-2xl border border-border/60 aspect-[16/10] ${reversed ? "lg:order-2" : ""}`}>
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} preview ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.06]"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/5 to-transparent" />
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${project.accent} mix-blend-overlay opacity-50`} />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/95 backdrop-blur-md">
            <Icon className="h-3 w-3 text-primary-glow" />
            {project.tag}
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/45 px-2 py-0.5 font-mono text-[10px] text-white/85 backdrop-blur-md">
            {String(active + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
          </span>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {project.images.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? "w-7 bg-primary-glow" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className={reversed ? "lg:order-1 lg:pr-2" : "lg:pl-2"}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif-display text-4xl text-foreground sm:text-5xl lg:text-[56px]">
              <span className="hl">{project.title}</span>
            </h3>
            <span className="mt-2 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border/60 bg-secondary/40 text-foreground/80 transition-all duration-500 group-hover:border-ember/60 group-hover:bg-ember/20 group-hover:text-ember-glow">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/75">
            {project.desc}
          </p>
          {/* Real outcome metric */}
          {project.outcome && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1.5 text-xs font-medium text-ember-glow">
              <span className="text-ember">→</span> {project.outcome}
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-ember/30 bg-ember/10 px-2.5 py-1 font-mono text-[11px] tracking-tight text-ember-glow"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Projects;

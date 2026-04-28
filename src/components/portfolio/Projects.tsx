import { ArrowUpRight, BarChart3, HeartHandshake, ShoppingBag } from "lucide-react";
import asklytics from "@/assets/asklytics-project.png";
import prabha from "@/assets/Ecommerse-project.png";
import three from "@/assets/gym-project.png";

const projects = [
  {
    tag: "Tech lead and Co-Founder",
    title: "Asklytics.in",
    desc: "An AI-driven data analytics platform that Perfect for business users who need instant data insights without waiting for technical teams or learning complex tools.",
    icon: BarChart3,
    image: asklytics,
    link: "https://asklytics.in",
    stack: ["React.js", "Python Fast API", "AI", "Cloud"],
    featured: true,
  },
  {
    tag: "Tech Lead",
    title: "Ecommerse Store",
    desc: "A high-performance, modular e-commerce engine designed to scale your storefront with seamless API integrations and lightning-fast checkout experiences.",
    icon: HeartHandshake,
    image: prabha,
    link: "#",
    stack: ["React", "UI/UX", "Responsive", "SEO"],
    featured: true,
  },
  {
    tag: "Gym Management Software",
    title: "AI Gym Management Software (Saas)",
    desc: "Our team is now working on a Saas (Software as a service) product soon launch in the market. This product is specially for Gym  Owner who want's to  manage their members by this software in very affordable price.",
    icon: ShoppingBag,
    image: three,
    link: "#",
    stack: ["Python Fast API", "React", "AI"],
    featured: false,
  },
];

const Projects = () => {
  return (
    <section id="work" className="relative py-28">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Selected Work</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Products built with <span className="text-gradient">intent.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            From flagship ventures to brand collaborations — every project is a craft of code, design, and growth strategy.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.filter((p) => p.featured).map((p) => (
            <ProjectCard key={p.title} project={p} large />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {projects.filter((p) => !p.featured).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
          <ProjectCallout />
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, large = false }: { project: typeof projects[number]; large?: boolean }) => {
  const Icon = project.icon;
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group glass relative block overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <Icon className="h-3.5 w-3.5 text-primary" />
          {project.tag}
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {project.title}
      </h3>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">{project.desc}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {s}
          </span>
        ))}
      </div>

      <div className={`relative mt-6 overflow-hidden rounded-2xl border border-border/60 ${large ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
        <img
          src={project.image}
          alt={`${project.title} mockup`}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/0 transition-all duration-500 group-hover:ring-primary/40" />
      </div>
    </a>
  );
};

const ProjectCallout = () => (
  <div className="glass-strong relative flex flex-col justify-between overflow-hidden rounded-3xl p-8">
    <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
    <div>
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">+ Many more</span>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
        Got a wild idea?
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        I take on a handful of projects each quarter. If you've got a brand worth building, let's talk.
      </p>
    </div>
    <a
      href="#contact"
      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
    >
      Start a project <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
);

export default Projects;

import { Code2, Rocket, Sparkles } from "lucide-react";
import portrait from "@/assets/ayush-portrait.jpg";

const traits = [
  { icon: Code2, title: "Engineer-first", desc: "Type-safe, performant, beautifully crafted code that scales." },
  { icon: Sparkles, title: "Design-led", desc: "Pixel-perfect interfaces with motion that feels alive." },
  { icon: Rocket, title: "Growth-minded", desc: "Every product I ship is wired for measurable outcomes." },
];

const About = () => (
  <section id="about" className="relative py-28">
    <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="relative">
        <div className="glass relative overflow-hidden rounded-3xl p-3">
          <img
            src={portrait}
            alt="Portrait of Ayush"
            loading="lazy"
            width={896}
            height={1152}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="glass absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl p-4 sm:-right-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </span>
            <div>
              <div className="text-sm font-semibold">Founder · Asklytics</div>
              <div className="text-xs text-muted-foreground">Independent freelancer</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">About</span>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          A young builder with the playbook of a <span className="text-gradient">veteran</span>.
        </h2>
        <p className="mt-5 text-muted-foreground">
          I started shipping the web before I could legally sign contracts — and haven't stopped since. Today I run
          <span className="text-foreground"> Asklytics.in</span>, lead tech for the
          <span className="text-foreground"> Prabha Foundation</span>, and partner with a tight roster of brands as a
          freelance developer & marketer. My obsession: turning ambitious ideas into products that look unreal, load
          instantly, and actually convert.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {traits.map((t) => (
            <div key={t.title} className="glass rounded-2xl p-5">
              <t.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-display text-base font-semibold">{t.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;

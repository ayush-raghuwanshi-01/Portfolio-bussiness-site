import { Code2, Rocket, Sparkles, Zap, Terminal, Layers } from "lucide-react";
import teamPhoto from "@/assets/team-photo.png";
import logo from "@/assets/logo.png";

const traits = [
  { 
    icon: Zap, 
    title: "Fast Shipping", 
    desc: "Rapid deployment from concept to MVP without compromising quality." 
  },
  { 
    icon: Terminal, 
    title: "AI & ML Focused", 
    desc: "Integrating intelligent models into scalable, real-world applications." 
  },
  { 
    icon: Layers, 
    title: "Full-Stack & DevOps", 
    desc: "Robust architecture, automated workflows, and seamless cloud scaling." 
  },
];

const About = () => (
  <section id="about" className="surface-light relative py-28">
    <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="relative">
        <div className="glass relative overflow-hidden rounded-3xl p-3">
          <img
            src={teamPhoto}
            alt="Our Engineering Team"
            loading="lazy"
            width={896}
            height={1152}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="glass absolute -bottom-6 -right-4 max-w-[240px] rounded-2xl p-4 sm:-right-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <img 
                src={logo} 
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </span>
            <div>
              <div className="text-sm font-semibold">3+ Years Experience</div>
              <div className="text-xs text-muted-foreground">Expert Solutions Team</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="eyebrow">About · The Collective</span>

        <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[72px]">
          We build <em className="hl not-italic">Intelligent</em> software for the modern era.
        </h2>
<p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
  We are a team of engineers and developers specializing in building software, 
  modern websites, and scalable digital products. With over <span className="hl-soft">3 years of experience</span>, 
  we bridge the gap between complex <span className="hl-soft">AI/ML algorithms</span> and user-friendly interfaces.
  <br /><br />
  Our workflow is built on <span className="hl">DevOps excellence</span> and <span className="hl">fast shipping</span>, 
  ensuring our clients get high-quality MVPs in record time. Led by our founder <span className=" font-bold text-black/80">Deepak Tripathi</span> and 
  co-founder <span className=" font-bold text-black/80">Ayush Raghuwanshi</span>, we focus on partnership-driven growth, 
  helping businesses scale through automation and cutting-edge tech.
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
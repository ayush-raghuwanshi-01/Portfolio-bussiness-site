import { Code2, Rocket, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import ayushPhoto from "@/assets/ayush-main.png";
import deepakPhoto from "@/assets/team-deepak.png";

const TEAM: { name: string; role: string; specialty: string; photo?: string; }[] = [
  {
    name: "Ayush Raghuwanshi",
    role: "Co-Founder & Tech Lead",
    specialty: "Full-stack engineering, AI integrations, product architecture",
    photo: ayushPhoto,
  },
  {
    name: "Shubham Mishra",
    role: "AI & ML Engineer",
    specialty: "Machine learning models, data pipelines, AI-powered features",
    // Photo not available yet — shows initial "S" placeholder
  },
  {
    name: "Deepak Tripathi",
    role: "Co-Founder & Lead Engineer",
    specialty: "Backend systems, analytics platforms, scalable infrastructure",
    photo: deepakPhoto,
  },
];

const traits = [
  { icon: Code2, title: "Engineer-first", desc: "Type-safe, performant, beautifully crafted code that scales with your business." },
  { icon: Sparkles, title: "Design-led", desc: "Pixel-perfect interfaces with motion that feels alive. Every detail intentional." },
  { icon: Rocket, title: "Growth-minded", desc: "Every product we ship is wired for measurable outcomes and real ROI." },
];

const About = () => (
  <section id="team" className="surface-light relative py-28">
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative">
          <div className="glass relative overflow-hidden rounded-3xl p-3">
            <div className="aspect-[4/5] w-full rounded-2xl bg-gradient-to-br from-ember/15 via-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <span className="font-serif-display text-8xl text-foreground/30">ZWS</span>
                <p className="mt-2 text-sm text-foreground/50">ZenWebStudio team</p>
              </div>
            </div>
          </div>
          <div className="glass absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl p-4 sm:-right-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <img src={logo} alt="ZenWebStudio" className="h-6 w-6 object-contain" />
              </span>
              <div>
                <div className="text-sm font-semibold">ZenWebStudio</div>
                <div className="text-xs text-muted-foreground">Tech studio · Est. 2024</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">About · Our Studio</span>

          <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[72px]">
            A young, focused team that <em className="hl not-italic">ships faster</em> than any legacy agency.
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
            We're <span className="hl-soft">ZenWebStudio</span> — a small, skilled team of developers, designers, and growth marketers.
            We specialize in <span className="hl-soft">frontend</span>, <span className="hl-soft">backend</span>, and
            <span className="hl-soft"> database</span> management, building business software and SaaS that solve real-world problems.
            With deep expertise in <span className="hl-soft">AI</span> and emerging technologies, we create smarter digital solutions that drive measurable growth.
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
            Our mission: build impactful technology that helps founders and SMBs grow — efficiently, affordably, and fast.
            A young focused team ships faster than a bloated agency because every person is an owner, not a ticket-taker.
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

      {/* Team member cards */}
      <div className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">The Team</span>
          <h2 className="mt-5 font-serif-display text-4xl text-foreground sm:text-5xl">
            Meet the people <em className="hl-ember not-italic">behind the builds.</em>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="glass group hover-lift relative overflow-hidden rounded-2xl p-6 text-center"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-primary shadow-glow">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-display font-semibold text-primary-foreground">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="mt-4 font-display text-base font-semibold text-foreground">{member.name}</div>
              <div className="mt-1 text-xs font-medium text-ember">{member.role}</div>
              <div className="mt-2 text-xs text-muted-foreground">{member.specialty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;

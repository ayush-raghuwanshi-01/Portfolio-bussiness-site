import { ArrowUpRight, Heart, MessageCircle, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Post = {
  author: string;
  handle: string;
  time: string;
  body: string;
  likes: number;
  comments: number;
  tag: string;
  accent: string;
};

const POSTS: Post[] = [
  {
    author: "Ayush",
    handle: "@ayush.builds",
    time: "2h",
    body: "Shipped a full SaaS dashboard + Stripe + AI agent in 6 days for a Bangalore founder. Total invoice? ₹24k. Agencies quoted ₹4L. Speed is the new pricing.",
    likes: 312,
    comments: 41,
    tag: "Build log",
    accent: "from-primary to-accent",
  },
  {
    author: "Riya M.",
    handle: "@riya.asklytics",
    time: "1d",
    body: "Joined Ayush's community last month — already got 2 client referrals and a working AI ops template I now sell. This is the corner of the internet I needed.",
    likes: 198,
    comments: 22,
    tag: "Win",
    accent: "from-accent to-primary",
  },
  {
    author: "Ayush",
    handle: "@ayush.builds",
    time: "3d",
    body: "Drop your landing page in the thread — I'll roast 5 of them tonight live with AI-driven copy fixes, free.",
    likes: 540,
    comments: 87,
    tag: "Live event",
    accent: "from-primary-glow to-primary",
  },
];

const STATS = [
  { icon: Users, k: "1.2K+", v: "Founders inside" },
  { icon: Zap, k: "Weekly", v: "AI build drops" },
  { icon: Heart, k: "Free", v: "Forever tier" },
];

const Community = () => {
  return (
    <section id="community" className="surface-dark relative py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-blob" />
      </div>

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* LEFT — copy + CTA */}
          <div className="animate-fade-up">
            <span className="eyebrow">The inside room · Free</span>
            <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[68px]">
              Build in public with <em className="hl not-italic">other young founders.</em>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/80">
              A private community where I drop <span className="hl-soft">AI playbooks</span>, live build sessions, client roasts, and discount codes —
              before anything goes public. Free to join, no fluff, only operators.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.v} className="glass rounded-2xl p-4 text-center magnetic">
                  <s.icon className="mx-auto h-4 w-4 text-ember-glow" />
                  <div className="mt-2 font-serif-display text-3xl text-foreground">{s.k}</div>
                  <div className="text-[10px] uppercase tracking-wider text-foreground/60">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ember" size="xl">
                <a href="#booking">
                  Join the community <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#testimonials">See member wins</a>
              </Button>
            </div>

            <div className="mt-6 inline-flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
                ].map((src) => (
                  <img key={src} src={src} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <span>+1,200 founders shipping weekly</span>
            </div>
          </div>

          {/* RIGHT — feed */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-aurora opacity-40 blur-2xl animate-tilt" />
            <div className="glass-strong relative space-y-3 rounded-[32px] p-4 sm:p-5">
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="font-display text-sm font-semibold">#community-feed</div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Live</span>
              </div>

              {POSTS.map((p, i) => (
                <article
                  key={i}
                  className="glass hover-lift group relative overflow-hidden rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: `${i * 140}ms` }}
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.accent}`} />
                  <div className="flex items-start gap-3">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.accent} text-sm font-semibold text-primary-foreground shadow-glow`}>
                      {p.author[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 text-sm">
                        <span className="font-semibold">{p.author}</span>
                        <span className="text-muted-foreground">{p.handle}</span>
                        <span className="text-muted-foreground">· {p.time}</span>
                        <span className="ml-auto rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                          {p.tag}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{p.body}</p>
                      <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-primary">
                          <Heart className="h-3.5 w-3.5" /> {p.likes}
                        </span>
                        <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-primary">
                          <MessageCircle className="h-3.5 w-3.5" /> {p.comments}
                        </span>
                      </div>
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

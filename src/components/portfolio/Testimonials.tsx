import { useEffect, useRef } from "react";
import { Quote, Play, Star } from "lucide-react";
import team from "@/assets/team-deepak.png"

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  poster: string;
  videoSrc: string;
};

// Public, hotlinkable sample MP4s (placeholders) — replace with real client videos later
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Deepak Tripathi",
    role: "Founder & Lead Engineer of Asklytics.in",
    quote: "Despite facing numerous technical hurdles and research roadblocks during development, we persevered under the guidance of Deepak Sir to bring **asklytics.in** to life. Our platform breaks down the barriers of complex data science, empowering anyone to transform raw information into actionable insights with ease.",
    poster: team, // Ensure 'team' is imported correctly (e.g., import team from './assets/team.png')
    videoSrc: "https://cdn.coverr.co/videos/coverr-a-woman-typing-on-her-laptop-7766/1080p.mp4",
  },
  {
    name: "Shubham Mishra",
    role: "Machine Learning enthusiast",
    quote: "A specialist in training and deploying high-performance models, Shubham is the engine behind our AI capabilities. They played a critical role in navigating the research hurdles of the project, ensuring our models remain accurate and accessible for every user.",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=70",
    videoSrc: "https://cdn.coverr.co/videos/coverr-a-man-talking-to-the-camera-2649/1080p.mp4",
  },
  {
    name: "Ananya Verma",
    role: "Indie SaaS Builder",
    quote: "From landing page to Stripe to AI ops — Ayush handled the whole stack himself.",
    poster: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=70",
    videoSrc: "https://cdn.coverr.co/videos/coverr-a-young-woman-smiling-at-the-camera-7884/1080p.mp4",
  },
];

const TestimonialCard = ({ t, index }: { t: Testimonial; index: number }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => undefined);
    tryPlay();
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.25 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      className="glass hover-lift group relative overflow-hidden rounded-3xl p-4 animate-fade-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          src={t.videoSrc}
          poster={t.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground backdrop-blur">
          <Play className="h-3 w-3 fill-primary text-primary" /> Live
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-2 pb-2 pt-5">
        <Quote className="absolute -top-1 left-2 h-7 w-7 text-primary/30" />
        <p className="pl-8 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
          <div>
            <div className="font-display text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Verified</span>
        </div>
      </div>
    </article>
  );
};

const Testimonials = ({ compact = false }: { compact?: boolean }) => {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Our Team</span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Real Growth. <span className="text-gradient">Real wins.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
           Our team thrives on a culture of continuous learning and collaborative problem-solving, where every challenge is met with shared expertise to sharpen our individual skills and accelerate our collective growth.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(compact ? TESTIMONIALS.slice(0, 3) : TESTIMONIALS).map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

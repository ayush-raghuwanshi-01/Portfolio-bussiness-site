import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const stats = [
  { k: 100, suffix: "%", v: "Custom solutions", note: "Built for your exact needs" },
  { k: 10, suffix: "+", v: "Projects shipped", note: "Websites, apps & tools" },
  { k: 98, suffix: "%", v: "On-time delivery", note: "Against written quotes" },
  { k: 5000, prefix: "₹", suffix: "", v: "Starting price", note: "1 year online included"},
];

const testimonials = [
  {
    quote:
      "ZenVioLabs Built a Professional Modern Website for our Prabha Foundation",
    name: "Prabha Sharma",
    role: "Director, Prabha Foundation",
    initials: "PS",
    color: "from-emerald-500 to-teal-500",
    rating: 5,
  },
  {
    quote:
      "They rebuilt our gym website in a weak. Page load went from 8 seconds to under 1 second, and our form leads tripled in the first month. No jargon, no upsells.",
    name: "Annand Sharma",
    role: "Owner, Muscle Mania GYM",
    initials: "RV",
    color: "from-orange-500 to-rose-500",
    rating: 5,
  },
  {
    quote:
      "I needed a custom billing dashboard for my distribution business. They delivered a tool that saves me 15 hours a week. Best money I've spent on software.",
    name: "Ankit Mehta",
    role: "Founder, Mehta Distributors",
    initials: "AM",
    color: "from-indigo-500 to-violet-500",
    rating: 5,
  },
  {
    quote:
      "Honest, fast, and actually good at design. They told me what I didn't need — which every other agency never does. My clinic site looks cleaner than any hospital chain's.",
    name: "Dr. Nidhi Iyer",
    role: "Iyer Dental Care",
    initials: "NI",
    color: "from-cyan-500 to-blue-500",
    rating: 5,
  },
];

const logos = [
  "Muscle Mania Gym",
  "Prabha Foundation",
  "Ecommerse Store",
  "Home Shine",
  "Asklytics",
  "Employe Management",
  "School Website",
  "Contact Manager App",
];

const useCountUp = (target: number, start: boolean, duration = 1600) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
};

const StatCard = ({
  k,
  suffix,
  prefix,
  v,
  note,
  on,
}: {
  k: number;
  suffix: string;
  prefix?: string;
  v: string;
  note: string;
  on: boolean;
}) => {
  const n = useCountUp(k, on);
  const display =
    k >= 1000
      ? n.toLocaleString("en-IN")
      : n.toString();
  return (
    <div className="glass hover-lift group rounded-[24px] p-5 sm:p-6">
      <div className="font-serif-display text-4xl text-foreground sm:text-5xl">
        {prefix ?? ""}
        {display}
        <span className="text-emerald-500">{suffix}</span>
      </div>
      <div className="mt-3 font-display text-sm font-semibold">{v}</div>
      <div className="mt-1 text-xs text-foreground/70">{note}</div>
    </div>
  );
};

export const SocialProof = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section surface="mid">
      <div ref={ref}>
        <SectionHeading
          eyebrow="Numbers"
          title={
            <>
              Real work. <span className="hl-green">Real results.</span>
            </>
          }
          body={`Don't take our word for it. These are the kind of outcomes ${site.name} delivers for small and growing businesses across India.`}
          align="center"
        />

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.v} {...s} on={inView} />
          ))}
        </div>

        {/* Logo marquee */}
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-10 py-4">
            {[...logos, ...logos].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground/60 backdrop-blur-sm"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(158_72%_55%)]" />
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-center font-display text-sm font-semibold uppercase tracking-[0.28em] text-foreground/50">
            What clients say
          </h3>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={cn(
                  "glass hover-lift relative rounded-[28px] p-7",
                  i === 0 && "md:row-span-1",
                )}
              >
                <Quote
                  aria-hidden
                  className="absolute right-6 top-6 h-10 w-10 text-emerald-500/20"
                />
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-foreground/60">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

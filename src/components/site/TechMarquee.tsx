import { techStack } from "@/lib/site";

export const TechMarquee = () => (
  <div className="relative overflow-hidden border-y border-border/60 bg-card/30 py-6 backdrop-blur">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
    <div className="flex w-max animate-marquee-slow gap-10 pr-10">
      {[...techStack, ...techStack].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex items-center gap-10 font-display text-[13px] font-medium uppercase tracking-[0.22em] text-foreground/55"
        >
          {item}
          <span className="text-ember/60">✦</span>
        </span>
      ))}
    </div>
  </div>
);

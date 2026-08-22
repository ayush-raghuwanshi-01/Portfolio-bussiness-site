const items = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Supabase",
  "Python", "FastAPI", "PostgreSQL", "AWS", "Brand Strategy", "SEO",
  "AI Integrations", "Figma", "Stripe", "Growth Marketing",
];

const Marquee = () => (
  <div className="relative overflow-hidden border-y border-border/60 bg-card/30 py-7 backdrop-blur">
    <div className="flex w-max animate-marquee gap-10 pr-10">
      {[...items, ...items].map((it, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-10 font-display text-[13px] font-medium uppercase tracking-[0.22em] text-foreground/55"
        >
          {it}
          <span className="text-ember/60">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;

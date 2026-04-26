const items = [
  "React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Supabase",
  "Framer Motion", "Performance Marketing", "Brand Strategy", "SEO", "AI Integrations", "Figma",
];

const Marquee = () => (
  <div className="relative overflow-hidden border-y border-border/50 py-6">
    <div className="flex w-max animate-marquee gap-12 pr-12">
      {[...items, ...items].map((it, i) => (
        <span key={i} className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {it} <span className="ml-12 text-primary/60">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;

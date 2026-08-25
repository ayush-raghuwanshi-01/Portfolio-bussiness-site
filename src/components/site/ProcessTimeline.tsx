import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { processSteps } from "@/data/process";
import { Reveal } from "@/components/site/Reveal";

export const ProcessTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const width = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div ref={ref} className="relative">
      <div className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-1 overflow-hidden rounded-full bg-border/50 xl:block">
        <motion.div
          style={{ scaleX: width, opacity: glow }}
          className="h-full origin-left bg-gradient-to-r from-primary via-cyan to-success"
        />
      </div>
      <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step, i) => (
          <Reveal key={step.id} delay={i * 0.08}>
            <article className="glass hover-lift relative h-full rounded-[28px] p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-serif-display text-4xl text-ember">{step.n}</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{step.body}</p>
              <ul className="mt-5 space-y-2">
                {step.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-foreground/65">
                    <span className="h-1 w-1 rounded-full bg-ember" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

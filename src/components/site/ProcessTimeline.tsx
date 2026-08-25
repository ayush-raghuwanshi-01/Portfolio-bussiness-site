import { processSteps } from "@/data/process";
import { Reveal } from "@/components/site/Reveal";

export const ProcessTimeline = () => (
  <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent xl:block" />
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
);

import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";

export const PageHero = ({
  eyebrow,
  title,
  body,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
}) => (
  <section className="surface-dark relative overflow-hidden pb-16 pt-36 sm:pt-40">
    <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
    <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
    <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-ember/15 blur-3xl" />
    <div className="container relative">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[80px]">
          {title}
        </h1>
        {body && (
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-foreground/70">{body}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </Reveal>
    </div>
  </section>
);

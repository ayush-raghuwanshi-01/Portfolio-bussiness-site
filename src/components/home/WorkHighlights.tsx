import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { featuredWork } from "@/data/work";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export const WorkHighlights = () => (
  <Section id="work" surface="dark">
    <SectionHeading
      eyebrow="Selected work"
      title={
        <>
          Products built with <em className="hl-ember not-italic">intent.</em>
        </>
      }
      body="A short set of shipped surfaces — SaaS workspaces, commerce, operations platforms, and the mobile clients that sit beside them. Outcomes are described as we can stand behind them."
    />

    <div className="mt-14 grid gap-6 lg:grid-cols-2">
      {featuredWork.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.06}>
          <article className="glass group overflow-hidden rounded-[28px]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.cover}
                alt={`${item.title} preview`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {item.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif-display text-3xl">{item.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-foreground/50">{item.client}</p>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent(AnalyticsEvents.PROJECT_CLICKED, { project: item.title })}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-colors hover:border-ember/50 hover:text-ember"
                    aria-label={`Open ${item.title}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">{item.solution}</p>
              <p className="mt-4 text-sm text-ember-glow">{item.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-ember/25 bg-ember/10 px-2 py-1 font-mono text-[11px] text-ember-glow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <div className="mt-10 flex justify-center">
      <Button asChild variant="glass" size="lg" className="rounded-full">
        <Link to="/work">Browse the full grid</Link>
      </Button>
    </div>
  </Section>
);

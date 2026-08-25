import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, featuredWork, workFilters } from "@/data/work";
import type { ServiceId } from "@/data/services";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const WorkHighlights = () => {
  const [filter, setFilter] = useState<"all" | ServiceId>("all");
  const items = (filter === "all" ? featuredWork : caseStudies.filter((item) => item.types.includes(filter))).slice(
    0,
    4,
  );

  return (
    <Section id="work" surface="dark">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Live products, not <em className="hl-ember not-italic">mood boards.</em>
          </>
        }
        body="Filter by surface. Outcomes are written as we can stand behind them — no vanity founder counts."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {workFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === item.id
                ? "border-ember/50 bg-ember/15 text-ember-glow"
                : "border-border/70 text-foreground/70 hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28 }}
              className="glass group overflow-hidden rounded-[28px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.cover}
                  alt={`${item.title} preview`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {item.live && (
                    <span className="rounded-full border border-success/40 bg-success/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-success backdrop-blur">
                      Live demo
                    </span>
                  )}
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
                      aria-label={`Open live demo: ${item.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">{item.solution}</p>
                <p className="mt-4 text-sm text-ember-glow">{item.outcome}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <p className="mt-10 text-sm text-foreground/60">No shipped case study in that filter yet.</p>
      )}

      <Reveal>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="glass" size="lg" className="rounded-full">
            <Link to="/work">Browse the full grid</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
};

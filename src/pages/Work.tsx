import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { caseStudies, workFilters } from "@/data/work";
import type { ServiceId } from "@/data/services";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WorkPage = () => {
  const [filter, setFilter] = useState<"all" | ServiceId>("all");
  const items = useMemo(
    () => (filter === "all" ? caseStudies : caseStudies.filter((item) => item.types.includes(filter))),
    [filter],
  );

  return (
    <>
      <Seo
        title="Work"
        description="Case studies from ZenWebStudio — web apps, mobile apps, applied AI, and cloud. Problem, solution, stack, and outcome."
        path="/work"
      />
      <PageHero
        eyebrow="Work"
        title={
          <>
            A tabbed record of <em className="hl-ember not-italic">what we have shipped.</em>
          </>
        }
        body="Real products from the studio. Filter by surface. Outcomes are limited to what we can stand behind."
      />

      <Section surface="mid">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
          {workFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass overflow-hidden rounded-[28px]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={item.cover} alt={`${item.title} cover`} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {item.live && (
                      <span className="rounded-full border border-success/40 bg-success/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-success backdrop-blur">
                        Live demo
                      </span>
                    )}
                    {item.types.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-serif-display text-3xl">{item.title}</h2>
                      <p className="mt-1 text-xs uppercase tracking-wider text-foreground/50">{item.client}</p>
                    </div>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent(AnalyticsEvents.PROJECT_CLICKED, { project: item.title })}
                        className="grid h-10 w-10 place-items-center rounded-full border border-border/70 hover:border-ember/50 hover:text-ember"
                        aria-label={`Open live demo: ${item.title}`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <dl className="mt-5 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="font-display text-xs uppercase tracking-wider text-ember">Problem</dt>
                      <dd className="mt-1 text-foreground/75">{item.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-display text-xs uppercase tracking-wider text-ember">Solution</dt>
                      <dd className="mt-1 text-foreground/75">{item.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-display text-xs uppercase tracking-wider text-ember">Outcome</dt>
                      <dd className="mt-1 text-ember-glow">{item.outcome}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
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
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </Section>
      <CtaBand title="Have a product in the same shape?" />
    </>
  );
};

export default WorkPage;

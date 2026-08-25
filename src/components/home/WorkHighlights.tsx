import { Link } from "react-router-dom";
import { featuredWork } from "@/data/work";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { serviceLabels } from "@/data/services";

export const WorkHighlights = () => (
  <Section id="work" surface="dark">
    <SectionHeading
      eyebrow="Selected work"
      title={
        <>
          Products we have <em className="hl-ember not-italic">put in front of people.</em>
        </>
      }
      body="Hardcoded case notes from the studio. Images and copy only — there are no live preview links."
    />

    <div className="mt-8">
      <span className="inline-flex rounded-full border border-ember/50 bg-ember/15 px-4 py-2 text-sm font-medium text-ember-glow">
        All Work
      </span>
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {featuredWork.map((item) => (
        <article key={item.id} className="glass group overflow-hidden rounded-[28px]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={item.cover}
              alt={`${item.title} preview`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {item.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur"
                >
                  {serviceLabels[type]}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-serif-display text-3xl">{item.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-wider text-foreground/50">{item.client}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">{item.solution}</p>
            <p className="mt-4 text-sm text-ember-glow">{item.outcome}</p>
          </div>
        </article>
      ))}
    </div>

    <Reveal>
      <div className="mt-10 flex justify-center">
        <Button asChild variant="glass" size="lg" className="rounded-full">
          <Link to="/work">Browse the full grid</Link>
        </Button>
      </div>
    </Reveal>
  </Section>
);

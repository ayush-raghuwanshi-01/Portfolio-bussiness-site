import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { caseStudies } from "@/data/work";
import { serviceLabels } from "@/data/services";

const WorkPage = () => (
  <>
    <Seo
      title="Work"
      description="Case studies from ZenWebStudio — web apps, mobile apps, SaaS platforms, and cloud management. Problem, solution, stack, and outcome."
      path="/work"
    />
    <PageHero
      eyebrow="Work"
      title={
        <>
          A record of <em className="hl-ember not-italic">what we have shipped.</em>
        </>
      }
      body="Real products from the studio. Images and written case notes — no live preview buttons."
    />

    <Section surface="mid">
      <div className="flex flex-wrap gap-2" aria-label="Work collection">
        <span className="inline-flex rounded-full border border-ember/50 bg-ember/15 px-4 py-2 text-sm font-medium text-ember-glow">
          All Work
        </span>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <article key={item.id} className="glass overflow-hidden rounded-[28px]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={item.cover} alt={`${item.title} cover`} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {item.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur"
                  >
                    {serviceLabels[type]}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-serif-display text-3xl">{item.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-wider text-foreground/50">{item.client}</p>
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
          </article>
        ))}
      </div>
    </Section>
    <CtaBand title="Have a product in the same shape?" />
  </>
);

export default WorkPage;

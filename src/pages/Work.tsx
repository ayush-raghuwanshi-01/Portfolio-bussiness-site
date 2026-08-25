import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { WorkCard } from "@/components/site/WorkCard";
import { caseStudies } from "@/data/work";

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

    <Section surface="paper">
      <div className="flex flex-wrap gap-2" aria-label="Work collection">
        <span className="inline-flex rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-sm font-medium text-ember">
          All Work
        </span>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <WorkCard key={item.id} item={item} detailed />
        ))}
      </div>
    </Section>
    <CtaBand title="Have a product in the same shape?" />
  </>
);

export default WorkPage;

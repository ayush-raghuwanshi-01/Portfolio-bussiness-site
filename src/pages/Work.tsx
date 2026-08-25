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
      description="Studio builds from Zenvio Labs — websites, business software, and mobile. Honest labels. No fake live-client metrics."
      path="/work"
    />
    <PageHero
      eyebrow="Work"
      title={
        <>
          A record of <em className="hl-ember not-italic">what we have shipped.</em>
        </>
      }
      body="These are studio builds we use to show how we work. Paid client projects will be marked as client work when we can name them."
    />

    <Section surface="paper">
      <div className="mt-2 grid gap-6 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <WorkCard key={item.id} item={item} detailed />
        ))}
      </div>
    </Section>
    <CtaBand title="Have something in the same shape?" />
  </>
);

export default WorkPage;

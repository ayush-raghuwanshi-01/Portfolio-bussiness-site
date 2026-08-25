import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WorkHighlights } from "@/components/home/WorkHighlights";
import { WhyUs } from "@/components/home/WhyUs";
import { TechMarquee } from "@/components/site/TechMarquee";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, SectionHeading } from "@/components/site/Section";
import { site } from "@/lib/site";

const Index = () => (
  <>
    <Seo path="/" />
    <Hero />
    <TechMarquee />
    <ServicesOverview />
    <WorkHighlights />
    <Section surface="paper">
      <SectionHeading
        align="center"
        eyebrow="How we engage"
        title={
          <>
            Discovery → Design → Build → <em className="hl-ember not-italic">Launch.</em>
          </>
        }
        body="A four-step path we use on every SaaS, web, and mobile engagement. You always know what week you are in."
      />
      <div className="mt-14">
        <ProcessTimeline />
      </div>
    </Section>
    <WhyUs />
    <CtaBand
      title="Book a technical consultation."
      body={`${site.name} will review the product, recommend a stack, and send a written scope. Twenty minutes. No deck theatre.`}
    />
  </>
);

export default Index;

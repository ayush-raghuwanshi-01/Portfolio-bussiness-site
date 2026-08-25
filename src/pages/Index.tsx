import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WorkHighlights } from "@/components/home/WorkHighlights";
import { WhyUs } from "@/components/home/WhyUs";
import { TechMarquee } from "@/components/site/TechMarquee";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { Estimator } from "@/components/site/Estimator";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadForm } from "@/components/site/LeadForm";
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
            Discovery → Architecture → Development → <em className="hl-ember not-italic">Deployment.</em>
          </>
        }
        body="A four-step path on every engagement. Scroll the row — the bar fills as you move through the work."
      />
      <div className="mt-14">
        <ProcessTimeline />
      </div>
    </Section>
    <WhyUs />
    <Section id="estimate" surface="dark">
      <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Estimate + book"
            title="Price the shape. Then talk to a human."
            body="Use the estimator for a planning range, then send a 20-minute consultation request. Both are stored for the studio — nothing disappears into a toast."
          />
          <div className="glass-strong mt-8 rounded-[28px] p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold">Book the consultation</h3>
            <p className="mt-2 text-sm text-foreground/65">
              No auto-responder. A founder or lead engineer replies within {site.responseTime}.
            </p>
            <div className="mt-6">
              <LeadForm mode="booking" />
            </div>
          </div>
        </div>
        <Estimator />
      </div>
    </Section>
    <CtaBand
      title="Ready when you are."
      body={`${site.name} will review the product, recommend a stack, and send a written scope. Twenty minutes. No deck theatre.`}
    />
  </>
);

export default Index;

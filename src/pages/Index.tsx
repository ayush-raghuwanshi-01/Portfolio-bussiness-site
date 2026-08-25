import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WorkHighlights } from "@/components/home/WorkHighlights";
import { WhyUs } from "@/components/home/WhyUs";
import { BusinessValue } from "@/components/home/BusinessValue";
import { TechMarquee } from "@/components/site/TechMarquee";
import { CtaBand } from "@/components/site/CtaBand";
import { site } from "@/lib/site";

const Index = () => (
  <>
    <Seo path="/" />
    <Hero />
    <TechMarquee />
    <ServicesOverview />
    <WorkHighlights />
    <BusinessValue />
    <WhyUs />
    <CtaBand
      title="Ready when you are."
      body={`${site.name} will review what you need, recommend a surface, and send a written next step. One form. ${site.offer} ${site.offerLabel}.`}
    />
  </>
);

export default Index;

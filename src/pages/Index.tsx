import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WorkHighlights } from "@/components/home/WorkHighlights";
import { WhyUs } from "@/components/home/WhyUs";
import { BusinessValue } from "@/components/home/BusinessValue";
import { SocialProof } from "@/components/home/SocialProof";
import { TechMarquee } from "@/components/site/TechMarquee";
import { ProjectMarquee } from "@/components/site/ProjectMarquee";
import { CtaBand } from "@/components/site/CtaBand";
import { site } from "@/lib/site";

const Index = () => (
  <>
    <Seo path="/" />
    <Hero />
    <TechMarquee />
    <ProjectMarquee />
    <SocialProof />
    <ServicesOverview />
    <WorkHighlights />
    <BusinessValue />
    <WhyUs />
    <CtaBand
      title="Ready when you are."
      body={`${site.name} will read what you need and reply within ${site.responseTime}. Websites start at ${site.startingPrice}.`}
    />
  </>
);

export default Index;

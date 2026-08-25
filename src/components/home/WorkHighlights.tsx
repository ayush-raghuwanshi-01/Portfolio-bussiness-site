import { Link } from "react-router-dom";
import { featuredWork } from "@/data/work";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { WorkCard } from "@/components/site/WorkCard";
import { Button } from "@/components/ui/button";

export const WorkHighlights = () => (
  <Section id="work" surface="paper">
    <SectionHeading
      eyebrow="Selected work"
      title={
        <>
          What we have <em className="hl-ember not-italic">built so far.</em>
        </>
      }
      body="Studio builds we use to show craft. Paid client work will be labelled as such when we can name it."
    />

    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {featuredWork.map((item) => (
        <WorkCard key={item.id} item={item} />
      ))}
    </div>

    <Reveal>
      <div className="mt-10 flex justify-center">
        <Button asChild variant="glass" size="lg" className="rounded-full">
          <Link to="/work">All work</Link>
        </Button>
      </div>
    </Reveal>
  </Section>
);

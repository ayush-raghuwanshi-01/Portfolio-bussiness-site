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
          Products we have <em className="hl-ember not-italic">put in front of people.</em>
        </>
      }
      body="A look at products we have designed and built — problem, solution, and what shipped."
    />

    <div className="mt-8">
      <span className="inline-flex rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-sm font-medium text-ember">
        All Work
      </span>
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {featuredWork.map((item) => (
        <WorkCard key={item.id} item={item} />
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

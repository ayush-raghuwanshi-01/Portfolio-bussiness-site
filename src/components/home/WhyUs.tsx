import { differentiators } from "@/data/process";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";

export const WhyUs = () => (
  <Section surface="mid">
    <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <SectionHeading
        eyebrow="The studio"
        title={
          <>
            A young team that <em className="hl not-italic">answers the phone.</em>
          </>
        }
        body="We are not a large agency and we are not a rotating bench of freelancers. You get a named person, a written scope for software, and work you can click."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {differentiators.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <article className="glass h-full rounded-[24px] p-6">
              <div className="font-mono text-[11px] text-ember">0{i + 1}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

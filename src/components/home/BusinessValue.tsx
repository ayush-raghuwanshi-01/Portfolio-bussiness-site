import { Building2, KeyRound, Megaphone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { site } from "@/lib/site";

const cards = [
  {
    icon: Megaphone,
    title: "A brand customers can trust",
    body: "Sites, apps, and product UI that look like the company you are becoming — not a template with your logo dropped in.",
  },
  {
    icon: Building2,
    title: "One studio, four surfaces",
    body: "Web Apps, Mobile Apps, SaaS, and Cloud Management designed as one system, so your customer never feels the seams.",
  },
  {
    icon: KeyRound,
    title: "You keep the keys",
    body: "Repositories, domains, store listings, and cloud accounts stay in your name. We work inside them.",
  },
  {
    icon: ShieldCheck,
    title: "A named lead after launch",
    body: "Weekly working software while we build. A human reply within 24 hours after you go live.",
  },
];

export const BusinessValue = () => (
  <Section id="partnership" surface="paper">
    <SectionHeading
      align="center"
      eyebrow="Why businesses book us"
      title={
        <>
          Built for companies that need software they can <em className="hl-ember not-italic">show.</em>
        </>
      }
      body="You are not buying tickets. You are hiring a product team that will put your business on the web, in the pocket, and on a cloud you can actually run."
    />

    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 0.05}>
          <article className="glass-strong h-full rounded-[24px] p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-ember text-white shadow-ember">
              <card.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">{card.body}</p>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="glass-strong mt-8 flex flex-col items-start justify-between gap-5 rounded-[28px] p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="font-serif-display text-4xl text-ember">{site.offer}</div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70">
            {site.offerLabel}. A written scope, a named lead, and a first slice you can put in front of
            customers.
          </p>
        </div>
        <StartProjectButton source="business-value" size="xl">
          Start a Project
        </StartProjectButton>
      </div>
    </Reveal>
  </Section>
);

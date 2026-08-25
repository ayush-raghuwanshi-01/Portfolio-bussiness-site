import { Building2, IndianRupee, KeyRound, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { site } from "@/lib/site";

const cards = [
  {
    icon: IndianRupee,
    title: "A starting price, in rupees",
    body: "Websites start at ₹5,000. Software is quoted after a short call. You always know what you are paying for before we start.",
  },
  {
    icon: Building2,
    title: "Built for real businesses",
    body: "Shops, coaching institutes, clinics, gyms, and growing companies — not a template with a logo dropped in.",
  },
  {
    icon: KeyRound,
    title: "You keep the keys",
    body: "Domain, code, and accounts stay in your name. After a year you can renew with us or take the files.",
  },
  {
    icon: MapPin,
    title: "Easy to reach",
    body: "A small team you can WhatsApp. We work with clients across India.",
  },
];

export const BusinessValue = () => (
  <Section id="partnership" surface="paper">
    <SectionHeading
      align="center"
      eyebrow="Why people book us"
      title={
        <>
          Software you can <em className="hl-ember not-italic">show a customer.</em>
        </>
      }
      body="You are hiring three engineers — not an account team. Written scope, a named person, a link you can open on your phone."
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
          <div className="font-serif-display text-4xl text-ember">{site.startingPrice}</div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70">{site.startingPriceNote}</p>
        </div>
        <StartProjectButton source="business-value" size="xl">
          Start a project
        </StartProjectButton>
      </div>
    </Reveal>
  </Section>
);

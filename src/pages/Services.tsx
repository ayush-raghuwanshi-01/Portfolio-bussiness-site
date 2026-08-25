import { CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { offerTiers, services } from "@/data/services";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { serviceOptionById, site } from "@/lib/site";

const ServicesPage = () => (
  <>
    <Seo
      title="Services"
      description="Web apps, mobile apps, SaaS platforms, and cloud management from ZenWebStudio. Deliverables, stack, and a 30% OFF first-engagement offer."
      path="/services"
    />
    <PageHero
      eyebrow="Services"
      title={
        <>
          Four ways we put your business <em className="hl-ember not-italic">in front of customers.</em>
        </>
      }
      body="Web Apps, Mobile Apps, Software as a Service, and Cloud Management. Each engagement includes a written scope, a named lead, and weekly staging demos."
    />

    {services.map((service, index) => (
      <Section key={service.id} id={service.id} surface={index % 2 === 0 ? "mid" : "dark"}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{service.name}</span>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl">{service.short}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/72">{service.description}</p>
            <p className="mt-4 text-sm font-medium text-ember">{service.offer}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/70 bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-foreground/75"
                >
                  {tech}
                </span>
              ))}
            </div>
            <StartProjectButton
              className="mt-8"
              source={`service-${service.id}`}
              service={serviceOptionById[service.id]}
            >
              Start this build
            </StartProjectButton>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[28px] border border-border/60">
              <img src={service.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-[24px] p-6">
            <h3 className="font-display text-lg font-semibold">Deliverables</h3>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-[24px] p-6">
            <h3 className="font-display text-lg font-semibold">Where it shows up</h3>
            <ul className="mt-4 space-y-3">
              {service.deepDive.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    ))}

    <Section id="offers" surface="paper">
      <SectionHeading
        align="center"
        eyebrow="This quarter"
        title={
          <>
            {site.offer} on your first engagement — <em className="hl-ember not-italic">not a rate card.</em>
          </>
        }
        body="Pick the surface you need. We send a written scope. No sticker prices on this site."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-4">
        {offerTiers.map((tier) => (
          <article
            key={tier.id}
            className={`glass relative flex h-full flex-col rounded-[24px] p-6 ${
              tier.featured ? "ring-2 ring-ember/60" : ""
            }`}
          >
            {tier.featured && (
              <span className="absolute right-4 top-4 rounded-full bg-gradient-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Most requested
              </span>
            )}
            <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
            <p className="mt-1 text-xs text-foreground/55">{tier.tagline}</p>
            <div className="mt-5 font-serif-display text-3xl text-ember">{tier.offer}</div>
            <div className="text-xs text-muted-foreground">First engagement this quarter</div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <StartProjectButton
              className="mt-6 w-full"
              variant={tier.featured ? "ember" : "glass"}
              source={`offer-${tier.id}`}
              service={tier.service === "custom" ? undefined : serviceOptionById[tier.service]}
              onClick={() => trackEvent(AnalyticsEvents.PRICING_TIER_CLICKED, { tier: tier.name })}
            >
              {tier.cta}
            </StartProjectButton>
          </article>
        ))}
      </div>
    </Section>

    <Section surface="dark">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions about working with the studio."
        body="Engagement model, ownership, timelines, and what happens after launch."
      />
      <div className="mt-8 max-w-3xl">
        <FaqList />
      </div>
    </Section>

    <CtaBand />
  </>
);

export default ServicesPage;

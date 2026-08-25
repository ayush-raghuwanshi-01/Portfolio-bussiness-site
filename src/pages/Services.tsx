import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { pricingTiers, services } from "@/data/services";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

const ServicesPage = () => (
  <>
    <Seo
      title="Services"
      description="SaaS engineering, custom web application development, and mobile app development from ZenWebStudio. Deliverables, stack, process, and transparent starting prices."
      path="/services"
    />
    <PageHero
      eyebrow="Services"
      title={
        <>
          Three pillars. <em className="hl-ember not-italic">Shipped as products.</em>
        </>
      }
      body="SaaS engineering, web application development, and mobile app development. Each engagement includes a written scope, a named lead, and weekly staging demos."
    />

    {services.map((service, index) => (
      <Section
        key={service.id}
        id={service.id}
        surface={index % 2 === 0 ? "mid" : "dark"}
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{service.name}</span>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl">{service.short}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/72">{service.description}</p>
            <p className="mt-4 text-sm font-medium text-ember">Starting from {service.startingFrom}</p>
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
            <Button asChild variant="ember" className="mt-8 rounded-full">
              <Link to="/contact#book">Scope this build</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[28px] border border-border/60">
              <img src={service.image} alt="" className="aspect-[16/10] w-full object-cover" />
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
            <h3 className="font-display text-lg font-semibold">How we run it</h3>
            <ol className="mt-4 space-y-3">
              {service.process.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/75">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    ))}

    <Section id="pricing" surface="paper">
      <SectionHeading
        align="center"
        eyebrow="Pricing"
        title={
          <>
            Starting points, <em className="hl-ember not-italic">not a mystery rate card.</em>
          </>
        }
        body="These are entry prices for a well-bounded first version. Complex billing, native modules, or multi-product roadmaps are scoped as a studio pod."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-4">
        {pricingTiers.map((tier) => (
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
            <div className="mt-5 font-serif-display text-3xl">{tier.price}</div>
            <div className="text-xs text-muted-foreground">{tier.period}</div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={tier.featured ? "ember" : "glass"}
              className="mt-6 w-full rounded-full"
            >
              <Link
                to="/contact#book"
                onClick={() => trackEvent(AnalyticsEvents.PRICING_TIER_CLICKED, { tier: tier.name })}
              >
                {tier.cta}
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </Section>

    <Section surface="dark">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions about working with the studio."
          body="Engagement model, ownership, timelines, and what happens after launch."
        />
        <FaqList />
      </div>
    </Section>

    <CtaBand />
  </>
);

export default ServicesPage;

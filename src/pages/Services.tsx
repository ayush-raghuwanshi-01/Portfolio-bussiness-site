import { CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { services } from "@/data/services";
import { serviceOptionById, site } from "@/lib/site";

const ServicesPage = () => (
  <>
    <Seo
      title="Services"
      description={`Websites from ${site.startingPrice}, business software, and mobile apps from Zenvio Labs. Clear scope. You own the work.`}
      path="/services"
    />
    <PageHero
      eyebrow="Services"
      title={
        <>
          What we build — <em className="hl-ember not-italic">said simply.</em>
        </>
      }
      body="Websites for businesses that need to be found. Software when WhatsApp and Excel are not enough. Mobile apps only when they belong on the home screen."
    />

    {services.map((service, index) => (
      <Section key={service.id} id={service.id} surface={index % 2 === 0 ? "mid" : "dark"}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{service.name}</span>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl">{service.short}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/72">{service.description}</p>
            <p className="mt-4 text-sm font-medium text-ember">{service.priceNote}</p>
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
              Ask about this
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
            <h3 className="font-display text-lg font-semibold">What you get</h3>
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
            <h3 className="font-display text-lg font-semibold">Typical jobs</h3>
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

    <Section id="pricing" surface="paper">
      <SectionHeading
        align="center"
        eyebrow="Price"
        title={
          <>
            Websites start at <em className="hl-ember not-italic">{site.startingPrice}.</em>
          </>
        }
        body="That is a 4–6 page mobile site, WhatsApp button, contact form, domain in your name, and one year online. Software and apps are quoted after a 30-minute call — in writing, before we start."
      />
      <div className="mt-10 flex justify-center">
        <StartProjectButton source="services-price" size="xl">
          Start a project
        </StartProjectButton>
      </div>
    </Section>

    <Section surface="dark">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions."
        body="Price, ownership, timelines, and where we work."
      />
      <div className="mt-8 max-w-3xl">
        <FaqList />
      </div>
    </Section>

    <CtaBand />
  </>
);

export default ServicesPage;

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { TiltCard } from "@/components/site/TiltCard";
import { Button } from "@/components/ui/button";

export const ServicesOverview = () => (
  <Section id="services" surface="mid">
    <SectionHeading
      eyebrow="What we build"
      title={
        <>
          Three pillars. <em className="hl-ember not-italic">One product studio.</em>
        </>
      }
      body="We do not sell growth retainers or generic AI packages. We engineer the three surfaces a modern company actually ships: the SaaS platform, the web app, and the mobile client."
    />

    <div className="mt-14 grid gap-6 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.id} delay={i * 0.08}>
          <TiltCard className="h-full">
            <Link
              to={`/services#${service.id}`}
              className="glass-strong group relative flex h-full flex-col overflow-hidden rounded-[28px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <service.icon className="h-5 w-5 text-primary-foreground" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold">{service.name}</h3>
                  <ArrowUpRight className="mt-1 h-4 w-4 text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{service.summary}</p>
                <div className="mt-5 text-xs font-medium text-ember">From {service.startingFrom}</div>
              </div>
            </Link>
          </TiltCard>
        </Reveal>
      ))}
    </div>

    <div className="mt-10 flex justify-center">
      <Button asChild variant="glass" size="lg" className="rounded-full">
        <Link to="/services">See deliverables & pricing</Link>
      </Button>
    </div>
  </Section>
);

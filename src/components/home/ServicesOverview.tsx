import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/services";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { TiltCard } from "@/components/site/TiltCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ServicesOverview = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="services" surface="mid">
      <SectionHeading
        eyebrow="What we build"
        title={
          <>
            Four surfaces. <em className="hl-ember not-italic">One engineering studio.</em>
          </>
        }
        body="Custom software on the web, mobile clients, applied AI inside those products, and the cloud they run on. Hover a card. Open a drawer. Every stack tag is something we actually ship."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {services.map((service, i) => {
          const expanded = open === service.id;
          return (
            <Reveal key={service.id} delay={i * 0.06}>
              <TiltCard className="h-full">
                <article className="glass-strong flex h-full flex-col overflow-hidden rounded-[28px]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                      <service.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl font-semibold">{service.name}</h3>
                      <Link
                        to={`/services#${service.id}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-foreground/60 hover:border-ember/50 hover:text-ember"
                        aria-label={`${service.name} details`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">{service.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-xs font-medium text-ember">From {service.startingFrom}</div>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : service.id)}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/80"
                      aria-expanded={expanded}
                    >
                      {expanded ? "Hide deep-dive" : "Open deep-dive"}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-3">
                            {service.deepDive.map((item) => (
                              <li key={item} className="flex list-none items-start gap-2 text-sm text-foreground/70">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                                {item}
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="glass" size="lg" className="rounded-full">
          <Link to="/services">See deliverables & pricing</Link>
        </Button>
      </div>
    </Section>
  );
};

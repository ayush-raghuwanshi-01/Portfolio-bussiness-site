import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { StartProjectButton } from "@/components/site/StartProjectButton";
import { site } from "@/lib/site";

export const CtaBand = ({
  title = "Tell us what you need.",
  body = `One form. It reaches our WhatsApp and email. Websites start at ${site.startingPrice}. We reply within ${site.responseTime}.`,
}: {
  title?: string;
  body?: string;
}) => (
  <section className="surface-mid relative py-20">
    <div className="container">
      <Reveal>
        <div className="glass-strong noise relative overflow-hidden rounded-[32px] px-8 py-12 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-70" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="eyebrow">Next step</span>
              <h2 className="mt-5 font-serif-display text-4xl text-foreground sm:text-5xl lg:text-6xl">{title}</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/75">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <StartProjectButton source="cta-band" size="xl">
                Start a project
              </StartProjectButton>
              <Button asChild variant="glass" size="xl">
                <Link to="/work">See our work</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

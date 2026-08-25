import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

export const CtaBand = ({
  title = "Ready to scope the build?",
  body = "Book a 20-minute technical consultation. We will come back with a stack, a timeline, and an honest price — or tell you it is too early.",
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
              <h2 className="mt-5 font-serif-display text-4xl text-foreground sm:text-5xl lg:text-6xl">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/75">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild variant="ember" size="xl">
                <Link to="/contact#book">
                  Book a consultation <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/work">View work</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

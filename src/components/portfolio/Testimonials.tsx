import { Quote, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company?: string;
  quote: string;
  photo?: string;
};

/**
 * No real testimonials yet — section will be hidden.
 * Add real client quotes here when you have them:
 *
 * const TESTIMONIALS: Testimonial[] = [
 *   {
 *     name: "Client Name",
 *     role: "CEO",
 *     company: "Company",
 *     quote: "Actual verified quote from the client.",
 *     photo: "/clients/photo.jpg",
 *   },
 * ];
 */
const TESTIMONIALS: Testimonial[] = [];

const TestimonialCard = ({ t, index }: { t: Testimonial; index: number }) => {
  return (
    <article
      className="glass hover-lift group relative overflow-hidden rounded-3xl p-6 animate-fade-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-primary shadow-glow">
          {t.photo ? (
            <img src={t.photo} alt={t.name} className="h-14 w-14 rounded-full object-cover" />
          ) : (
            <span className="text-lg font-display font-semibold text-primary-foreground">{t.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <Quote className="mt-3 h-6 w-6 text-primary/30" />
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
          <div className="mt-4 border-t border-border/50 pt-3">
            <div className="font-display text-sm font-semibold"><span className="hl">{t.name}</span></div>
            <div className="text-xs text-muted-foreground">
              {t.role}{t.company ? ` · ${t.company}` : ""}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Testimonials = ({ compact = false }: { compact?: boolean }) => {
  const displayed = compact ? TESTIMONIALS.slice(0, 3) : TESTIMONIALS;

  // No testimonials yet — don't render the section
  if (displayed.length === 0) return null;

  return (
    <section id="testimonials" className="surface-light relative py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="eyebrow justify-center">Client Testimonials</span>
          <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[72px]">
            Real results. <em className="hl-ember not-italic">Real clients.</em>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground/75">
            Don't take our word for it — hear from the founders and businesses we've worked with.
          </p>
        </div>

        <div className={`mt-14 grid gap-6 ${displayed.length === 1 ? "max-w-lg mx-auto" : displayed.length === 2 ? "sm:grid-cols-2 max-w-4xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {displayed.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

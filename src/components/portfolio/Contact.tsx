import { useState } from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, Send, Phone, Building2, Briefcase, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitLead } from "@/lib/supabase";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const SOCIAL_LINKS = {
  github: "https://github.com/zenwebstudio",
  linkedin: "https://linkedin.com/company/zenwebstudio",
  email: "ayushtechguide@gmail.com",
  whatsapp: "919584559972",
  phone: "+91 95845 5972",
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  company: z.string().trim().max(100).optional().default(""),
  service: z.string().min(1, "Pick a service"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
});

type ContactValues = z.infer<typeof contactSchema>;

const SERVICES = ["Business Website", "Custom Software / SaaS", "AI Automation", "Brand & Marketing", "Growth Retainer", "Other"];

const Contact = () => {
  const [values, setValues] = useState<ContactValues>({
    name: "", email: "", phone: "", company: "", service: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof ContactValues>(k: K, v: ContactValues[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof ContactValues, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof ContactValues;
        if (!next[k]) next[k] = iss.message;
      });
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);

    const result = await submitLead({
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company || undefined,
      service: values.service,
      message: values.message,
      source: "contact-form",
    });

    setSubmitting(false);

    if (result.success) {
      trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMITTED, { service: values.service });
      setSubmitted(true);
      toast.success("Message sent — our team will reply within 24h ⚡");
      setValues({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="surface-dark relative py-28">
      <div className="container">
        <div className="glass relative overflow-hidden rounded-[32px] p-10 sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-50" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Let's build · Reply in 24h</span>
              <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[72px]">
                Have a project worth <em className="hl-ember not-italic">building?</em>
              </h2>
              <p className="mt-6 max-w-md text-foreground/70">
                Talk to our team. We reply to every message personally — usually within 24 hours.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`https://wa.me/${SOCIAL_LINKS.whatsapp}?text=Hi%20ZenWebStudio%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(AnalyticsEvents.WHATSAPP_CLICKED, { source: "contact-section" })}
                  className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-display text-base font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.05-.669.15-.197.199-.888.911-1.088 1.106-.2.195-.395.257-.592.15-.297-.15-1.264-.693-2.391-1.706-.883-.788-1.48-1.752-1.654-2.049-.174-.297-.019-.458.13-.606.299-.292.888-.912 1.088-1.106.2-.195.2-.502.024-.752-.174-.249-.69-1.655-1.612-2.297-.882-.617-1.678-.816-1.938-.858-.259-.043-.471-.005-.669.15l-.003.002c-.297.15-1.758.867-2.03.967-.273.1-.471.05-.669-.15-.197-.199-.888-.911-1.088-1.106-.2-.195-.395-.257-.592-.15-.297.15-1.264.693-2.391 1.706-.883.788-1.48 1.752-1.654 2.049-.174.297-.019.458.13.606.299.292.888.912 1.088 1.106.2.195.2.502.024.752-.174.249-.69 1.655-1.612 2.297-.882.617-1.678.816-1.938.858-.259.043-.471.005-.669-.15z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214L4 20l1.214-3.757A8 8 0 0112 4c4.411 0 8 3.589 8 8s-3.589 8-8 8z"/>
                  </svg>
                  WhatsApp Us
                </a>

                <a
                  href={`tel:${SOCIAL_LINKS.phone.replace(/\s/g, "")}`}
                  onClick={() => trackEvent(AnalyticsEvents.CALL_CLICKED, { source: "contact-section" })}
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-ember px-7 py-4 font-display text-base font-semibold text-white shadow-ember transition-transform hover:scale-[1.02]"
                >
                  <Phone className="h-5 w-5" />
                  Call Us
                </a>

                <a
                  href={`mailto:${SOCIAL_LINKS.email}?subject=Project Inquiry — ZenWebStudio`}
                  className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-7 py-4 font-display text-base font-semibold text-foreground backdrop-blur transition-transform hover:scale-[1.02]"
                >
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <SocialLink href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={Linkedin} />
                <SocialLink href={SOCIAL_LINKS.github} label="GitHub" icon={Github} />
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex h-full items-center justify-center text-center animate-fade-up">
                  <div>
                    <CheckCircle2 className="mx-auto h-14 w-14 text-ember-glow" />
                    <h3 className="mt-4 font-display text-xl font-semibold">Message sent!</h3>
                    <p className="mt-2 text-sm text-foreground/70">Our team will get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <h3 className="font-display text-lg font-semibold">Quick message</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" icon={User} error={errors.name}>
                      <Input value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" maxLength={80} />
                    </Field>
                    <Field label="Email" icon={Mail} error={errors.email}>
                      <Input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@brand.com" maxLength={160} />
                    </Field>
                    <Field label="Phone (WhatsApp)" icon={Phone} error={errors.phone}>
                      <Input type="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" maxLength={20} />
                    </Field>
                    <Field label="Company" icon={Building2} error={errors.company}>
                      <Input value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Inc. (optional)" maxLength={100} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Service" icon={Briefcase} error={errors.service}>
                        <select
                          value={values.service}
                          onChange={(e) => set("service", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a service</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Message" icon={MessageSquare} error={errors.message}>
                        <Textarea
                          value={values.message}
                          onChange={(e) => set("message", e.target.value)}
                          placeholder="Tell us about your project, goals, and timeline…"
                          maxLength={1000}
                          className="min-h-[100px]"
                        />
                      </Field>
                    </div>
                  </div>

                  <Button type="submit" variant="ember" size="lg" disabled={submitting} className="w-full rounded-full">
                    <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} ZenWebStudio. Crafted with intent.</div>
        </footer>
      </div>
    </section>
  );
};

const Field = ({
  label, icon: Icon, error, children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" /> {label}
    </Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const SocialLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: typeof Github }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors hover:text-foreground"
  >
    <Icon className="h-4 w-4" /> {label}
  </a>
);

export default Contact;

import { useState } from "react";
import { z } from "zod";
import { CalendarDays, Clock, Mail, MessageSquare, Send, Sparkles, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(160),
  service: z.string().min(1, "Pick a service"),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  budget: z.string().min(1, "Pick a budget"),
  message: z.string().trim().min(10, "Tell me a bit more (10+ chars)").max(1000, "Too long"),
});

type BookingValues = z.infer<typeof bookingSchema>;

const SERVICES = ["Website", "SaaS / Web App", "AI Automation", "Brand & Marketing", "Other"];
const BUDGETS = ["₹999 – ₹10k", "₹10k – ₹50k", "₹50k – ₹2L", "₹2L+"];
const TIMES = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

const today = new Date().toISOString().split("T")[0];

const Booking = () => {
  const [values, setValues] = useState<BookingValues>({
    name: "", email: "", service: "", date: "", time: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof BookingValues>(k: K, v: BookingValues[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = bookingSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof BookingValues, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof BookingValues;
        if (!next[k]) next[k] = iss.message;
      });
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Booking request sent — I'll reply within 24h ⚡");
      setValues({ name: "", email: "", service: "", date: "", time: "", budget: "", message: "" });
    }, 900);
  };

  return (
    <section id="booking" className="surface-light relative py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="eyebrow justify-center">Book a free call · 20 min</span>
          <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-6xl lg:text-[72px]">
            Let's <em className="hl-ember not-italic">map your build</em> in 20 minutes.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
            Pick a slot, tell me about the project, and I'll come prepared with a <span className="hl-soft">scope</span>, <span className="hl-soft">timeline</span> and an <span className="hl-soft">honest price</span>.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* FORM */}
          <form onSubmit={onSubmit} className="glass-strong relative overflow-hidden rounded-[32px] p-6 sm:p-8 animate-fade-up">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />

            <div className="relative grid gap-5 sm:grid-cols-2">
              <Field label="Your name" icon={User} error={errors.name}>
                <Input value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Riya Malhotra" maxLength={80} />
              </Field>
              <Field label="Email" icon={Mail} error={errors.email}>
                <Input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@brand.com" maxLength={160} />
              </Field>

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
              <Field label="Budget" icon={Sparkles} error={errors.budget}>
                <select
                  value={values.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select budget</option>
                  {BUDGETS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Preferred date" icon={CalendarDays} error={errors.date}>
                <Input type="date" min={today} value={values.date} onChange={(e) => set("date", e.target.value)} />
              </Field>
              <Field label="Preferred time (IST)" icon={Clock} error={errors.time}>
                <select
                  value={values.time}
                  onChange={(e) => set("time", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Pick a slot</option>
                  {TIMES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="What are you building?" icon={MessageSquare} error={errors.message}>
                  <Textarea
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Quick context about goals, stack, timeline…"
                    maxLength={1000}
                    className="min-h-[120px]"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-muted-foreground">No spam. No auto-responders. Replied to personally.</p>
                <Button type="submit" variant="ember" size="lg" disabled={submitting}>
                  <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Book my slot"}
                </Button>
              </div>
            </div>
          </form>

          {/* SIDE — perks */}
          <aside className="relative animate-fade-up [animation-delay:120ms]">
            <div className="glass relative overflow-hidden rounded-[32px] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-40 animate-tilt" />
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold">What you get on the call</h3>
                <ul className="mt-6 space-y-4 text-sm">
                  {[
                    "A clear scope + tech stack recommendation",
                    "Honest timeline and founder-friendly pricing",
                    "An AI workflow plan to cut your ops in half",
                    "A free Loom walkthrough after the call",
                  ].map((b, i) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-primary text-[11px] font-semibold text-primary-foreground shadow-glow">
                        {i + 1}
                      </span>
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-4">
                  <div className="font-display text-sm font-semibold text-foreground">Prefer a quick DM?</div>
     <p className="mt-1 text-xs text-muted-foreground">
  Email{" "}
  <a 
    href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushtechguide@gmail.com&su=Let's Talk: AI, Business & Modern Tech&body=Hi Ayush,%0D%0A%0D%0AI'd like to chat about AI, business, and modern tech. Specifically, my query regarding the new tech world is:%0D%0A%0D%0A[Enter your query here]%0D%0A%0D%0ABest regards,"
    target="_blank" 
    rel="noopener noreferrer"
    className="text-primary underline-offset-4 hover:underline"
  >
    ayushtechguide@gmail.com
  </a> 
  — usually replies in &lt; 6h.
</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
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

export default Booking;

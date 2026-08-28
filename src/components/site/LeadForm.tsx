import { useId, useState, type ReactNode } from "react";
import { Briefcase, CheckCircle2, Loader2, Mail, MapPin, MessageSquare, Phone, Send, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { leadSchema, submitLead, valuesToLead, type LeadValues } from "@/lib/leads";
import { mailHref, serviceOptions, site, whatsappHref, type ServiceOption } from "@/lib/site";
import { cn } from "@/lib/utils";

const emptyLead = (service: ServiceOption = serviceOptions[0]): LeadValues => ({
  name: "",
  email: "",
  phone: "",
  city: "",
  service,
  message: "",
  website: "",
});

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const phoneOk = (value: string) => value.trim().replace(/[^\d+]/g, "").length >= 7;

const fieldCls = (hasError?: boolean, isValid?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-background/60 px-4 text-sm transition-all duration-200",
    "placeholder:text-muted-foreground/70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
    "backdrop-blur-sm",
    hasError
      ? "border-destructive/60 focus-visible:ring-destructive/50 focus-visible:border-destructive"
      : isValid
        ? "border-emerald-500/50 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/70"
        : "border-border/70 focus-visible:border-ember/60 focus-visible:ring-ember/25 hover:border-border",
  );

const textareaCls = (hasError?: boolean, isValid?: boolean) =>
  cn(
    "w-full rounded-xl border bg-background/60 px-4 py-3 text-sm leading-relaxed transition-all duration-200",
    "placeholder:text-muted-foreground/70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
    "backdrop-blur-sm resize-none min-h-[110px]",
    hasError
      ? "border-destructive/60 focus-visible:ring-destructive/50 focus-visible:border-destructive"
      : isValid
        ? "border-emerald-500/50 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/70"
        : "border-border/70 focus-visible:border-ember/60 focus-visible:ring-ember/25 hover:border-border",
  );

const selectCls = (hasError?: boolean) =>
  cn(
    "h-12 w-full appearance-none rounded-xl border bg-background/60 px-4 pr-10 text-sm transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
    "backdrop-blur-sm bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22hsl(252%2030%25%2055%25)%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat",
    hasError
      ? "border-destructive/60 focus-visible:ring-destructive/50"
      : "border-border/70 focus-visible:border-ember/60 focus-visible:ring-ember/25 hover:border-border",
  );

export const LeadForm = ({
  defaultService,
  className,
  onSuccess,
}: {
  defaultService?: ServiceOption;
  className?: string;
  onSuccess?: () => void;
}) => {
  const [values, setValues] = useState<LeadValues>(() => emptyLead(defaultService));
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const phoneId = `${baseId}-phone`;
  const cityId = `${baseId}-city`;
  const serviceId = `${baseId}-service`;
  const messageId = `${baseId}-message`;

  const mark = (key: string, message?: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: message }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);
    const result = await submitLead(valuesToLead(parsed.data));
    setSubmitting(false);

    if (result.success) {
      trackEvent(AnalyticsEvents.LEAD_FORM_SUBMITTED, { service: parsed.data.service });
      setSubmitted(true);
      toast.success(`Received. We reply within ${site.responseTime}.`);
      setValues(emptyLead(defaultService));
      onSuccess?.();
    } else {
      toast.error(result.error);
    }
  };

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center justify-center rounded-[24px] py-8 text-center", className)}>
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/25" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold">We have your request</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/70">
          It has reached our WhatsApp and email. We reply within {site.responseTime}. If your enquiry is urgent,
          message us now.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="ember" size="sm" className="rounded-full">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </Button>
          <Button asChild variant="glass" size="sm" className="rounded-full">
            <a href={mailHref()}>Email {site.email}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={nameId}
          label="Your name"
          icon={User}
          error={errors.name}
          valid={touched.name && !errors.name && values.name.trim().length >= 2}
        >
          <Input
            id={nameId}
            value={values.name}
            disabled={submitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            onChange={(e) => {
              const value = e.target.value;
              setValues((v) => ({ ...v, name: value }));
              if (touched.name) mark("name", value.trim().length >= 2 ? undefined : "Name is too short");
            }}
            onBlur={() => mark("name", values.name.trim().length >= 2 ? undefined : "Name is too short")}
            placeholder="e.g. Aarav Sharma"
            autoComplete="name"
            className={fieldCls(!!errors.name, touched.name && !errors.name && values.name.trim().length >= 2)}
            required
          />
        </Field>

        <Field
          id={emailId}
          label="Work email"
          icon={Mail}
          error={errors.email}
          valid={touched.email && !errors.email && emailOk(values.email)}
        >
          <Input
            id={emailId}
            type="email"
            value={values.email}
            disabled={submitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            onChange={(e) => {
              const value = e.target.value;
              setValues((v) => ({ ...v, email: value }));
              if (touched.email) mark("email", emailOk(value) ? undefined : "Enter a valid email");
            }}
            onBlur={() => mark("email", emailOk(values.email) ? undefined : "Enter a valid email")}
            placeholder="you@business.com"
            autoComplete="email"
            className={fieldCls(!!errors.email, touched.email && !errors.email && emailOk(values.email))}
            required
          />
        </Field>
      </div>

      {/* Phone + City */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={phoneId}
          label="WhatsApp / phone"
          icon={Phone}
          error={errors.phone}
          valid={touched.phone && !errors.phone && phoneOk(values.phone)}
        >
          <Input
            id={phoneId}
            type="tel"
            value={values.phone}
            disabled={submitting}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
            onChange={(e) => {
              const value = e.target.value;
              setValues((v) => ({ ...v, phone: value }));
              if (touched.phone) mark("phone", phoneOk(value) ? undefined : "Enter a valid contact number");
            }}
            onBlur={() => mark("phone", phoneOk(values.phone) ? undefined : "Enter a valid contact number")}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            className={fieldCls(!!errors.phone, touched.phone && !errors.phone && phoneOk(values.phone))}
            required
          />
        </Field>

        <Field
          id={cityId}
          label="City"
          icon={MapPin}
          error={errors.city}
          valid={touched.city && !errors.city && values.city.trim().length >= 2}
        >
          <Input
            id={cityId}
            value={values.city}
            disabled={submitting}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? `${cityId}-error` : undefined}
            onChange={(e) => {
              const value = e.target.value;
              setValues((v) => ({ ...v, city: value }));
              if (touched.city) mark("city", value.trim().length >= 2 ? undefined : "Enter your city");
            }}
            onBlur={() => mark("city", values.city.trim().length >= 2 ? undefined : "Enter your city")}
            placeholder="e.g. Indore"
            autoComplete="address-level2"
            className={fieldCls(!!errors.city, touched.city && !errors.city && values.city.trim().length >= 2)}
            required
          />
        </Field>
      </div>

      <Field id={serviceId} label="What do you need?" icon={Briefcase} error={errors.service}>
        <div className="relative">
          <select
            id={serviceId}
            value={values.service}
            disabled={submitting}
            onChange={(e) => setValues((v) => ({ ...v, service: e.target.value as ServiceOption }))}
            className={selectCls(!!errors.service)}
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <Field
        id={messageId}
        label="Tell us about the work"
        icon={MessageSquare}
        error={errors.message}
        valid={touched.message && !errors.message && values.message.trim().length >= 8}
      >
        <textarea
          id={messageId}
          value={values.message}
          disabled={submitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          onChange={(e) => {
            const value = e.target.value;
            setValues((v) => ({ ...v, message: value }));
            if (touched.message) mark("message", value.trim().length >= 8 ? undefined : "A little more detail, please");
          }}
          onBlur={() =>
            mark("message", values.message.trim().length >= 8 ? undefined : "A little more detail, please")
          }
          placeholder="Example: coaching institute in Indore, need a 5-page site with admissions form this month"
          rows={4}
          className={textareaCls(
            !!errors.message,
            touched.message && !errors.message && values.message.trim().length >= 8,
          )}
          required
        />
      </Field>

      <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
        <label htmlFor={`${baseId}-hp`}>Leave this field blank</label>
        <input
          id={`${baseId}-hp`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
        />
      </div>

      {/* Privacy line — neutral on light, green-tinted on dark */}
      <div className="form-trust flex items-start gap-2 rounded-xl p-3 text-xs text-foreground/65">
        <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
        <span>
          Goes to our WhatsApp and {site.email}. Reply within {site.responseTime}. No newsletter.
        </span>
      </div>

      <Button
        type="submit"
        variant="ember"
        size="lg"
        disabled={submitting}
        className="group h-12 w-full rounded-full text-[15px] font-semibold shadow-ember transition-transform hover:scale-[1.01]"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-muted-foreground">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(158_72%_55%)]" />
        Usually replies in under 2 hours during business hours
      </div>
    </form>
  );
};

const Field = ({
  id,
  label,
  icon: Icon,
  error,
  valid,
  children,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  valid?: boolean;
  children: ReactNode;
}) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
        error ? "text-destructive" : valid ? "text-emerald-500" : "text-muted-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
      {valid && <CheckCircle2 className="h-3.5 w-3.5" />}
    </Label>
    {children}
    {error && (
      <p id={`${id}-error`} className="flex items-center gap-1 text-xs text-destructive" role="alert">
        {error}
      </p>
    )}
  </div>
);

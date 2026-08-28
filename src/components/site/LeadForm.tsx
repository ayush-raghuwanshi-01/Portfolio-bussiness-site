import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Briefcase, CheckCircle2, Loader2, Mail, MapPin, MessageSquare, Phone, Send, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { leadSchema, submitLead, valuesToLead, type LeadValues } from "@/lib/leads";
import { mailHref, serviceOptions, site, whatsappHref, type ServiceOption } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Build an empty LeadValues shape, defaulting to the first service option. */
const emptyLead = (service: ServiceOption = serviceOptions[0]): LeadValues => ({
  name: "",
  email: "",
  phone: "",
  city: "",
  service,
  message: "",
  website: "",
});

/**
 * Single source of truth for field state. Returns the Tailwind class string
 * and the ARIA validity flags for a given field key. The zod schema is the
 * only validator — no parallel regexes to drift.
 */
const getFieldState = (
  key: keyof LeadValues,
  values: LeadValues,
  errors: Record<string, string | undefined>,
  touched: Record<string, boolean>,
) => {
  const hasError = Boolean(errors[key]);
  const value = values[key];
  const isTouched = touched[key];

  // Run the field-level zod parse so valid states stay in lockstep with the
  // submit-time validation.
  const result = leadSchema.shape[key].safeParse(value);
  const isValid = isTouched && !hasError && result.success;

  const base =
    "h-12 w-full rounded-xl border bg-background/60 px-4 text-sm transition-all duration-200 " +
    "placeholder:text-muted-foreground/70 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 backdrop-blur-sm ";

  const state = hasError
    ? "border-destructive/60 focus-visible:ring-destructive/50 focus-visible:border-destructive"
    : isValid
      ? "border-emerald-500/50 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/70"
      : "border-border/70 focus-visible:border-ember/60 focus-visible:ring-ember/25 hover:border-border";

  return { className: base + state, hasError, isValid };
};

const getTextareaState = (
  values: LeadValues,
  errors: Record<string, string | undefined>,
  touched: Record<string, boolean>,
) => {
  const result = leadSchema.shape.message.safeParse(values.message);
  const hasError = Boolean(errors.message);
  const isValid = touched.message && !hasError && result.success;
  const base =
    "w-full rounded-xl border bg-background/60 px-4 py-3 text-sm leading-relaxed transition-all duration-200 " +
    "placeholder:text-muted-foreground/70 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 backdrop-blur-sm resize-none min-h-[110px] ";
  const state = hasError
    ? "border-destructive/60 focus-visible:ring-destructive/50 focus-visible:border-destructive"
    : isValid
      ? "border-emerald-500/50 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/70"
      : "border-border/70 focus-visible:border-ember/60 focus-visible:ring-ember/25 hover:border-border";
  return { className: base + state, hasError, isValid };
};

const SELECT_CHEVRON_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(252 30% 55%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
);

const getSelectState = (hasError?: boolean) =>
  cn(
    "h-12 w-full appearance-none rounded-xl border bg-background/60 px-4 pr-10 text-sm transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 backdrop-blur-sm",
    `bg-[url('data:image/svg+xml;utf8,${SELECT_CHEVRON_SVG}')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat`,
    hasError
      ? "border-destructive/60 focus-visible:ring-destructive/50"
      : "border-border/70 focus-visible:border-ember/60 focus-visible:ring-ember/25 hover:border-border",
  );

type LeadFormProps = {
  defaultService?: ServiceOption;
  className?: string;
  onSuccess?: () => void;
};

export const LeadForm = ({ defaultService, className, onSuccess }: LeadFormProps) => {
  const [values, setValues] = useState<LeadValues>(() => emptyLead(defaultService));
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const baseId = useId();
  const fieldIds = useMemo(
    () => ({
      name: `${baseId}-name`,
      email: `${baseId}-email`,
      phone: `${baseId}-phone`,
      city: `${baseId}-city`,
      service: `${baseId}-service`,
      message: `${baseId}-message`,
      honeypot: `${baseId}-hp`,
    }),
    [baseId],
  );

  /** Mark a field touched and set/clear its error message. */
  const mark = (key: keyof LeadValues, message?: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: message }));
  };

  /** Validate a single field against zod on blur/change. */
  const validateField = (key: keyof LeadValues, value: unknown) => {
    const res = leadSchema.shape[key].safeParse(value);
    mark(key, res.success ? undefined : res.error.issues[0]?.message);
  };

  const update = <K extends keyof LeadValues>(key: K, value: LeadValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) validateField(key, value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      const allTouched: Record<string, boolean> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]) as keyof LeadValues;
        if (!next[key]) next[key] = issue.message;
        allTouched[key] = true;
      });
      setErrors(next);
      setTouched((prev) => ({ ...prev, ...allTouched }));
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
      setErrors({});
      setTouched({});
      onSuccess?.();
    } else {
      toast.error(result.error ?? "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div
        className={cn("flex flex-col items-center justify-center rounded-[24px] py-8 text-center", className)}
        role="status"
        aria-live="polite"
      >
        <div className="relative" aria-hidden="true">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/25" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold">We have your request</h2>
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

  const nameField = getFieldState("name", values, errors, touched);
  const emailField = getFieldState("email", values, errors, touched);
  const phoneField = getFieldState("phone", values, errors, touched);
  const cityField = getFieldState("city", values, errors, touched);
  const messageField = getTextareaState(values, errors, touched);

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={fieldIds.name} label="Your name" icon={User} error={errors.name} valid={nameField.isValid}>
          <Input
            id={fieldIds.name}
            value={values.name}
            disabled={submitting}
            aria-invalid={nameField.hasError}
            aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => validateField("name", values.name)}
            placeholder="e.g. Aarav Sharma"
            autoComplete="name"
            className={nameField.className}
            required
          />
        </Field>

        <Field id={fieldIds.email} label="Work email" icon={Mail} error={errors.email} valid={emailField.isValid}>
          <Input
            id={fieldIds.email}
            type="email"
            value={values.email}
            disabled={submitting}
            aria-invalid={emailField.hasError}
            aria-describedby={errors.email ? `${fieldIds.email}-error` : undefined}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => validateField("email", values.email)}
            placeholder="you@business.com"
            autoComplete="email"
            className={emailField.className}
            required
          />
        </Field>
      </div>

      {/* Phone + City */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={fieldIds.phone}
          label="WhatsApp / phone"
          icon={Phone}
          error={errors.phone}
          valid={phoneField.isValid}
        >
          <Input
            id={fieldIds.phone}
            type="tel"
            value={values.phone}
            disabled={submitting}
            aria-invalid={phoneField.hasError}
            aria-describedby={errors.phone ? `${fieldIds.phone}-error` : undefined}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => validateField("phone", values.phone)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            className={phoneField.className}
            required
          />
        </Field>

        <Field id={fieldIds.city} label="City" icon={MapPin} error={errors.city} valid={cityField.isValid}>
          <Input
            id={fieldIds.city}
            value={values.city}
            disabled={submitting}
            aria-invalid={cityField.hasError}
            aria-describedby={errors.city ? `${fieldIds.city}-error` : undefined}
            onChange={(e) => update("city", e.target.value)}
            onBlur={() => validateField("city", values.city)}
            placeholder="e.g. Indore"
            autoComplete="address-level2"
            className={cityField.className}
            required
          />
        </Field>
      </div>

      <Field id={fieldIds.service} label="What do you need?" icon={Briefcase} error={errors.service}>
        <div className="relative">
          <select
            id={fieldIds.service}
            value={values.service}
            disabled={submitting}
            onChange={(e) => setValues((v) => ({ ...v, service: e.target.value as ServiceOption }))}
            className={getSelectState(Boolean(errors.service))}
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
        id={fieldIds.message}
        label="Tell us about the work"
        icon={MessageSquare}
        error={errors.message}
        valid={messageField.isValid}
      >
        <textarea
          id={fieldIds.message}
          value={values.message}
          disabled={submitting}
          aria-invalid={messageField.hasError}
          aria-describedby={errors.message ? `${fieldIds.message}-error` : undefined}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => validateField("message", values.message)}
          placeholder="Example: coaching institute in Indore, need a 5-page site with admissions form this month"
          rows={4}
          className={messageField.className}
          required
        />
      </Field>

      {/* Honeypot — hidden from AT via sr-only + tabIndex -1, not display:none so bots fill it */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={fieldIds.honeypot}>Leave this field blank</label>
        <input
          id={fieldIds.honeypot}
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

      <p className="flex items-center justify-center gap-3 pt-1 text-[11px] text-muted-foreground">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(158_72%_55%)]" />
        Usually replies in under 2 hours during business hours
      </p>
    </form>
  );
};

type FieldProps = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  valid?: boolean;
  children: ReactNode;
};

const Field = ({ id, label, icon: Icon, error, valid, children }: FieldProps) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
        error ? "text-destructive" : valid ? "text-emerald-500" : "text-muted-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
      {valid && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
    </Label>
    {children}
    {error && (
      <p id={`${id}-error`} className="flex items-center gap-1 text-xs text-destructive" role="alert">
        {error}
      </p>
    )}
  </div>
);

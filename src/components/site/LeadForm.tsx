import { useId, useState, type ReactNode } from "react";
import { Briefcase, CheckCircle2, Loader2, Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
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
      <div className={cn("flex flex-col items-center justify-center rounded-[24px] py-6 text-center", className)}>
        <CheckCircle2 className="h-14 w-14 text-success" />
        <h3 className="mt-5 font-display text-2xl font-semibold">We have your request</h3>
        <p className="mt-3 max-w-sm text-sm text-foreground/70">
          It has gone to our WhatsApp and email. We reply within {site.responseTime}. If it is urgent, message us
          now.
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
      <Field
        id={nameId}
        label="Name"
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
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </Field>

      <Field
        id={emailId}
        label="Email"
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
          required
        />
      </Field>

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
          placeholder="Your city"
          autoComplete="address-level2"
          required
        />
      </Field>

      <Field id={serviceId} label="What do you need?" icon={Briefcase} error={errors.service}>
        <select
          id={serviceId}
          value={values.service}
          disabled={submitting}
          onChange={(e) => setValues((v) => ({ ...v, service: e.target.value as ServiceOption }))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={messageId}
        label="A line about the work"
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
          placeholder="Example: coaching institute, need a 5-page site this month"
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Goes to our WhatsApp and {site.email}. Reply within {site.responseTime}. No newsletter.
        </p>
        <Button type="submit" variant="ember" size="lg" disabled={submitting} className="rounded-full">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {submitting ? "Sending…" : "Send enquiry"}
        </Button>
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
  icon: React.ComponentType<{ className: string }>;
  error?: string;
  valid?: boolean;
  children: ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      {valid && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
    </Label>
    <div
      className={
        error
          ? "[&_input]:border-destructive [&_select]:border-destructive [&_textarea]:border-destructive"
          : valid
            ? "[&_input]:border-success/60 [&_select]:border-success/60 [&_textarea]:border-success/60"
            : ""
      }
    >
      {children}
    </div>
    {error && (
      <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
        {error}
      </p>
    )}
  </div>
);

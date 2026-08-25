import { useState, type ReactNode } from "react";
import { Briefcase, CheckCircle2, Mail, Phone, Send, User } from "lucide-react";
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
  service,
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
      toast.success(`Request received — we reply within ${site.responseTime}.`);
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
          A founder or lead engineer will reply within {site.responseTime}. If it is urgent, WhatsApp
          the studio directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="ember" size="sm" className="rounded-full">
            <a href={whatsappHref()} target="_blank" rel="noreferrer">
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
        label="Name"
        icon={User}
        error={errors.name}
        valid={touched.name && !errors.name && values.name.trim().length >= 2}
      >
        <Input
          value={values.name}
          onChange={(e) => {
            const value = e.target.value;
            setValues((v) => ({ ...v, name: value }));
            if (touched.name) mark("name", value.trim().length >= 2 ? undefined : "Name is too short");
          }}
          onBlur={() => mark("name", values.name.trim().length >= 2 ? undefined : "Name is too short")}
          placeholder="Jordan Patel"
          autoComplete="name"
        />
      </Field>

      <Field
        label="Email"
        icon={Mail}
        error={errors.email}
        valid={touched.email && !errors.email && emailOk(values.email)}
      >
        <Input
          type="email"
          value={values.email}
          onChange={(e) => {
            const value = e.target.value;
            setValues((v) => ({ ...v, email: value }));
            if (touched.email) mark("email", emailOk(value) ? undefined : "Enter a valid email");
          }}
          onBlur={() => mark("email", emailOk(values.email) ? undefined : "Enter a valid email")}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </Field>

      <Field
        label="Contact number"
        icon={Phone}
        error={errors.phone}
        valid={touched.phone && !errors.phone && phoneOk(values.phone)}
      >
        <Input
          type="tel"
          value={values.phone}
          onChange={(e) => {
            const value = e.target.value;
            setValues((v) => ({ ...v, phone: value }));
            if (touched.phone) mark("phone", phoneOk(value) ? undefined : "Enter a valid contact number");
          }}
          onBlur={() => mark("phone", phoneOk(values.phone) ? undefined : "Enter a valid contact number")}
          placeholder="+91 98765 43210"
          autoComplete="tel"
        />
      </Field>

      <Field label="Service" icon={Briefcase} error={errors.service}>
        <select
          value={values.service}
          onChange={(e) => setValues((v) => ({ ...v, service: e.target.value as ServiceOption }))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={values.website ?? ""}
        onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Stored for the studio team. No newsletters. Reply within {site.responseTime}.
        </p>
        <Button type="submit" variant="ember" size="lg" disabled={submitting} className="rounded-full">
          <Send className="h-4 w-4" />
          {submitting ? "Sending…" : "Start a Project"}
        </Button>
      </div>
    </form>
  );
};

const Field = ({
  label,
  icon: Icon,
  error,
  valid,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  valid?: boolean;
  children: ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      {valid && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
    </Label>
    <div
      className={
        error
          ? "[&_input]:border-destructive [&_select]:border-destructive"
          : valid
            ? "[&_input]:border-success/60 [&_select]:border-success/60"
            : ""
      }
    >
      {children}
    </div>
    {error && (
      <p className="text-xs text-destructive" role="alert">
        {error}
      </p>
    )}
  </div>
);

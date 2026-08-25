import { useMemo, useState, type ReactNode } from "react";
import {
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import {
  bookingSchema,
  bookingToLead,
  contactSchema,
  contactToLead,
  submitLead,
  type BookingValues,
  type ContactValues,
} from "@/lib/leads";
import { bookingTimes, budgetOptions, mailHref, serviceOptions, site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Mode = "contact" | "booking";

const emptyContact: ContactValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "Web App Development",
  budget: "Not sure yet",
  message: "",
  website: "",
};

const emptyBooking: BookingValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "Web App Development",
  date: "",
  time: "",
  message: "",
  website: "",
};

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const phoneOk = (value: string, required: boolean) => {
  const trimmed = value.trim();
  if (!trimmed) return !required;
  return trimmed.replace(/[^\d+]/g, "").length >= 7;
};

export const LeadForm = ({ mode, className }: { mode: Mode; className?: string }) => {
  const [contact, setContact] = useState<ContactValues>(emptyContact);
  const [booking, setBooking] = useState<BookingValues>(emptyBooking);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mark = (key: string, message?: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: message }));
  };

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === "contact") {
      const parsed = contactSchema.safeParse(contact);
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
      const result = await submitLead(contactToLead(parsed.data));
      setSubmitting(false);
      if (result.success) {
        trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMITTED, { service: parsed.data.service });
        setSubmitted(true);
        toast.success("Message received — we reply within 24 hours.");
        setContact(emptyContact);
      } else {
        toast.error(result.error);
      }
      return;
    }

    const parsed = bookingSchema.safeParse(booking);
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
    const result = await submitLead(bookingToLead(parsed.data));
    setSubmitting(false);
    if (result.success) {
      trackEvent(AnalyticsEvents.BOOKING_FORM_SUBMITTED, { service: parsed.data.service });
      setSubmitted(true);
      toast.success("Consultation request sent — we will confirm your slot.");
      setBooking(emptyBooking);
    } else {
      toast.error(result.error);
    }
  };

  if (submitted) {
    return (
      <div className={cn("glass-strong flex flex-col items-center justify-center rounded-[28px] p-10 text-center", className)}>
        <CheckCircle2 className="h-14 w-14 text-success" />
        <h3 className="mt-5 font-display text-2xl font-semibold">
          {mode === "booking" ? "Request received" : "Message sent"}
        </h3>
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
      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "contact" ? (
          <>
            <Field label="Name" icon={User} error={errors.name}>
              <Input
                value={contact.name}
                onChange={(e) => {
                  setContact((v) => ({ ...v, name: e.target.value }));
                  setErrors((err) => ({ ...err, name: undefined }));
                }}
                placeholder="Jordan Patel"
                autoComplete="name"
              />
            </Field>
            <Field label="Work email" icon={Mail} error={errors.email}>
              <Input
                type="email"
                value={contact.email}
                onChange={(e) => {
                  setContact((v) => ({ ...v, email: e.target.value }));
                  setErrors((err) => ({ ...err, email: undefined }));
                }}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Phone" icon={Phone} error={errors.phone} valid={touched.phone && !errors.phone && phoneOk(contact.phone || "", false)}>
              <Input
                type="tel"
                value={contact.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setContact((v) => ({ ...v, phone: value }));
                  if (touched.phone) mark("phone", phoneOk(value, false) ? undefined : "Enter a valid phone number");
                }}
                onBlur={() => mark("phone", phoneOk(contact.phone || "", false) ? undefined : "Enter a valid phone number")}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </Field>
            <Field label="Company" icon={Building2} error={errors.company}>
              <Input
                value={contact.company}
                onChange={(e) => setContact((v) => ({ ...v, company: e.target.value }))}
                placeholder="Optional"
                autoComplete="organization"
              />
            </Field>
            <Field label="Service" icon={Briefcase} error={errors.service}>
              <Select
                value={contact.service}
                onChange={(value) => setContact((v) => ({ ...v, service: value as ContactValues["service"] }))}
                options={serviceOptions}
              />
            </Field>
            <Field label="Budget" icon={Sparkles} error={errors.budget}>
              <Select
                value={contact.budget}
                onChange={(value) => setContact((v) => ({ ...v, budget: value as ContactValues["budget"] }))}
                options={budgetOptions}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Project notes" icon={MessageSquare} error={errors.message}>
                <Textarea
                  value={contact.message}
                  onChange={(e) => {
                    setContact((v) => ({ ...v, message: e.target.value }));
                    setErrors((err) => ({ ...err, message: undefined }));
                  }}
                  placeholder="What are you building, who is it for, and when do you need a first version?"
                  className="min-h-[120px]"
                />
              </Field>
            </div>
            <input
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              value={contact.website}
              onChange={(e) => setContact((v) => ({ ...v, website: e.target.value }))}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <Field label="Name" icon={User} error={errors.name} valid={touched.name && !errors.name && booking.name.trim().length >= 2}>
              <Input
                value={booking.name}
                onChange={(e) => {
                  const value = e.target.value;
                  setBooking((v) => ({ ...v, name: value }));
                  if (touched.name) mark("name", value.trim().length >= 2 ? undefined : "Name is too short");
                }}
                onBlur={() => mark("name", booking.name.trim().length >= 2 ? undefined : "Name is too short")}
                placeholder="Jordan Patel"
                autoComplete="name"
              />
            </Field>
            <Field label="Work email" icon={Mail} error={errors.email} valid={touched.email && !errors.email && emailOk(booking.email)}>
              <Input
                type="email"
                value={booking.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setBooking((v) => ({ ...v, email: value }));
                  if (touched.email) mark("email", emailOk(value) ? undefined : "Enter a valid email");
                }}
                onBlur={() => mark("email", emailOk(booking.email) ? undefined : "Enter a valid email")}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Phone / WhatsApp" icon={Phone} error={errors.phone} valid={touched.phone && !errors.phone && phoneOk(booking.phone, true)}>
              <Input
                type="tel"
                value={booking.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setBooking((v) => ({ ...v, phone: value }));
                  if (touched.phone) mark("phone", phoneOk(value, true) ? undefined : "Enter a valid phone number");
                }}
                onBlur={() => mark("phone", phoneOk(booking.phone, true) ? undefined : "Enter a valid phone number")}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </Field>
            <Field label="Company" icon={Building2} error={errors.company}>
              <Input
                value={booking.company}
                onChange={(e) => setBooking((v) => ({ ...v, company: e.target.value }))}
                placeholder="Optional"
                autoComplete="organization"
              />
            </Field>
            <Field label="Service" icon={Briefcase} error={errors.service}>
              <Select
                value={booking.service}
                onChange={(value) => setBooking((v) => ({ ...v, service: value as BookingValues["service"] }))}
                options={serviceOptions}
              />
            </Field>
            <Field label="Preferred date" icon={CalendarDays} error={errors.date}>
              <Input
                type="date"
                min={today}
                value={booking.date}
                onChange={(e) => {
                  setBooking((v) => ({ ...v, date: e.target.value }));
                  setErrors((err) => ({ ...err, date: undefined }));
                }}
              />
            </Field>
            <Field label="Preferred time (IST)" icon={Clock} error={errors.time}>
              <Select
                value={booking.time}
                onChange={(value) => {
                  setBooking((v) => ({ ...v, time: value }));
                  setErrors((err) => ({ ...err, time: undefined }));
                }}
                options={bookingTimes}
                placeholder="Pick a slot"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="What should we prepare?" icon={MessageSquare} error={errors.message}>
                <Textarea
                  value={booking.message}
                  onChange={(e) => {
                    setBooking((v) => ({ ...v, message: e.target.value }));
                    setErrors((err) => ({ ...err, message: undefined }));
                  }}
                  placeholder="Goals, current stack, deadline, and anything we should look at before the call."
                  className="min-h-[120px]"
                />
              </Field>
            </div>
            <input
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              value={booking.website}
              onChange={(e) => setBooking((v) => ({ ...v, website: e.target.value }))}
              aria-hidden="true"
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Stored securely for the studio team. No newsletters. Reply within {site.responseTime}.
        </p>
        <Button type="submit" variant="ember" size="lg" disabled={submitting} className="rounded-full">
          <Send className="h-4 w-4" />
          {submitting ? "Sending…" : mode === "booking" ? "Request the slot" : "Send message"}
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
    <div className={error ? "[&_input]:border-destructive [&_textarea]:border-destructive [&_select]:border-destructive" : valid ? "[&_input]:border-success/60 [&_textarea]:border-success/60" : ""}>
      {children}
    </div>
    {error && (
      <p className="text-xs text-destructive" role="alert">
        {error}
      </p>
    )}
  </div>
);

const Select = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

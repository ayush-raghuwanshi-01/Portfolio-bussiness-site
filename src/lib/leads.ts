import { z } from "zod";
import { supabase, type LeadInsert } from "@/lib/supabase";
import { serviceOptions, site } from "@/lib/site";

const serviceEnum = z.enum(serviceOptions);

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid contact number").max(24),
  city: z.string().trim().min(2, "Enter your city").max(80),
  service: serviceEnum,
  message: z.string().trim().min(8, "Tell us what you need in a line or two").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadValues = z.infer<typeof leadSchema>;
export type LeadResult = { success: boolean; error?: string };

const persistViaApi = async (lead: LeadInsert): Promise<boolean> => {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
};

const persistViaSupabase = async (lead: LeadInsert): Promise<boolean> => {
  if (!supabase) return false;
  const { website: _honeypot, city, ...record } = lead;
  const { error } = await supabase.from("leads").insert([
    {
      ...record,
      company: city || record.company,
      source: lead.source || "website",
    },
  ]);
  if (error) {
    console.error("[Zenvio Labs] Supabase insert error:", error.message);
    return false;
  }
  return true;
};

const persistViaFormSubmit = async (lead: LeadInsert): Promise<boolean> => {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        city: lead.city,
        service: lead.service,
        _subject: `Zenvio Labs enquiry — ${lead.name}`,
        _template: "table",
        _replyto: lead.email,
        message: [
          `Name: ${lead.name}`,
          `Phone: ${lead.phone || "—"}`,
          `Email: ${lead.email}`,
          `City: ${lead.city || "—"}`,
          `Need: ${lead.service || "—"}`,
          lead.message ? `Details: ${lead.message}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const submitLead = async (lead: LeadInsert): Promise<LeadResult> => {
  if (lead.website) {
    return { success: true };
  }

  const payload: LeadInsert = {
    ...lead,
    company: lead.city || lead.company,
    source: lead.source || "website",
  };

  const [apiOk, dbOk] = await Promise.all([persistViaApi(payload), persistViaSupabase(payload)]);

  if (apiOk || dbOk) return { success: true };

  const emailOk = await persistViaFormSubmit(payload);
  if (emailOk) return { success: true };

  return {
    success: false,
    error: `We could not send that just now. Email ${site.email} or message us on WhatsApp.`,
  };
};

export const valuesToLead = (values: LeadValues): LeadInsert => ({
  name: values.name,
  email: values.email,
  phone: values.phone,
  city: values.city,
  company: values.city,
  service: values.service,
  message: values.message,
  source: "start-project",
});

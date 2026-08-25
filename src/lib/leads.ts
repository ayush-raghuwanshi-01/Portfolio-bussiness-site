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

const enquiryBody = (lead: LeadInsert) =>
  [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone || "—"}`,
    `Email: ${lead.email}`,
    `City: ${lead.city || "—"}`,
    `Need: ${lead.service || "—"}`,
    lead.message ? `Details: ${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

/** Direct to zenwebstudio.in@gmail.com via Web3Forms. */
const sendToBusinessEmail = async (lead: LeadInsert): Promise<boolean> => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Zenvio Labs enquiry — ${lead.name}`,
        from_name: "Zenvio Labs website",
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        city: lead.city,
        service: lead.service,
        message: enquiryBody(lead),
      }),
    });
    const body = await res.json().catch(() => ({}));
    return Boolean(res.ok && body.success);
  } catch {
    return false;
  }
};

const persistViaApi = async (lead: LeadInsert): Promise<boolean> => {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) return false;
    const body = await res.json().catch(() => ({}));
    return Boolean(body.notified?.email);
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

export const submitLead = async (lead: LeadInsert): Promise<LeadResult> => {
  if (lead.website) {
    return { success: true };
  }

  const payload: LeadInsert = {
    ...lead,
    company: lead.city || lead.company,
    source: lead.source || "website",
  };

  const [emailOk, apiOk] = await Promise.all([sendToBusinessEmail(payload), persistViaApi(payload)]);
  void persistViaSupabase(payload);

  if (emailOk || apiOk) return { success: true };

  return {
    success: false,
    error: `Could not email ${site.email}. Add VITE_WEB3FORMS_ACCESS_KEY (see SETUP.md) or WhatsApp us.`,
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
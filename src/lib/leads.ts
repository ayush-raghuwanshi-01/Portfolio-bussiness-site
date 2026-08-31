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

/** Direct to zenwebstudio.in@gmail.com via FormSubmit.co (no API key needed, works on static hosting). */
const sendViaFormSubmit = async (lead: LeadInsert): Promise<boolean> => {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `ZenVioLabs enquiry — ${lead.name}`,
        _template: "table",
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "—",
        city: lead.city || "—",
        service: lead.service || "—",
        message: lead.message || "—",
        source: lead.source || "website",
      }),
    });
    const body = await res.json().catch(() => ({}));
    return Boolean(res.ok && body.success);
  } catch {
    return false;
  }
};

/**
 * Direct to zenwebstudio.in@gmail.com via Web3Forms.
 *
 * The access key is intentionally hardcoded here. Web3Forms access keys are
 * PUBLIC (safe to ship in browser JS) — they only identify the target inbox
 * and cannot be used to read email. Using a constant instead of
 * import.meta.env guarantees this works the same way locally (`npm run dev`,
 * `npm run preview`) AND after any static deployment (Wasmer, Vercel static,
 * Netlify, GitHub Pages, etc.) where a Node `/api/leads` server is absent.
 */
const WEB3FORMS_ACCESS_KEY = "90750c4e-16c9-4ebc-b45f-eb16789b6b5d";

const sendViaWeb3Forms = async (lead: LeadInsert): Promise<boolean> => {
  try {
    // Using FormData (per Web3Forms docs / the snippet you shared) keeps
    // things simple and avoids any JSON CORS/preflight surprises on hosts
    // that are aggressive with static deployments.
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `ZenVioLabs enquiry — ${lead.name}`);
    formData.append("from_name", "ZenVioLabs website");
    formData.append("name", lead.name);
    formData.append("email", lead.email);
    if (lead.phone) formData.append("phone", lead.phone);
    if (lead.city) formData.append("city", lead.city);
    if (lead.service) formData.append("service", lead.service);
    formData.append("message", enquiryBody(lead));
    // Reply-to so when you hit "reply" in Gmail it goes to the lead, not Web3Forms
    formData.append("replyto", lead.email);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    const body = await res.json().catch(() => ({}));
    return Boolean(res.ok && body.success);
  } catch (err) {
    console.error("[ZenVioLabs] Web3Forms failed:", err);
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
    return Boolean(body.ok || body.success || body.notified?.email);
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
    console.error("[ZenVioLabs] Supabase insert error:", error.message);
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

  // PRIMARY: Web3Forms — hardcoded key, works from browser on any host
  // (local dev, Vercel, Wasmer static hosting, Netlify, GitHub Pages, etc.).
  const web3Ok = await sendViaWeb3Forms(payload);
  if (web3Ok) {
    // Best-effort fallbacks in parallel (don't await — fire and forget)
    void sendViaFormSubmit(payload).catch(() => false);
    void persistViaApi(payload).catch(() => false);
    void persistViaSupabase(payload);
    return { success: true };
  }

  // FALLBACK 1: FormSubmit.co (no key, but requires one-time email activation)
  const formSubmitOk = await sendViaFormSubmit(payload);
  if (formSubmitOk) {
    void persistViaSupabase(payload);
    return { success: true };
  }

  // FALLBACK 2: /api/leads (only works when a server exists — Vercel, local vite dev)
  const apiOk = await persistViaApi(payload).catch(() => false);
  void persistViaSupabase(payload);

  if (apiOk) return { success: true };

  return {
    success: false,
    error: `Could not send enquiry. Please WhatsApp or email ${site.email} directly.`,
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
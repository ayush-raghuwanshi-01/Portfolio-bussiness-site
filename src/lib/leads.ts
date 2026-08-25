import { z } from "zod";
import { supabase, type LeadInsert } from "@/lib/supabase";
import { serviceOptions } from "@/lib/site";

const serviceEnum = z.enum(serviceOptions);

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid contact number").max(24),
  service: serviceEnum,
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
  const { website: _honeypot, ...record } = lead;
  const { error } = await supabase.from("leads").insert([
    {
      ...record,
      source: lead.source || "website",
    },
  ]);
  if (error) {
    console.error("[ZenWebStudio] Supabase insert error:", error.message);
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
    source: lead.source || "website",
  };

  const [apiOk, dbOk] = await Promise.all([persistViaApi(payload), persistViaSupabase(payload)]);

  if (apiOk || dbOk) return { success: true };

  return {
    success: false,
    error: "We could not save that just now. Email hello@zenwebstudio.com or message us on WhatsApp.",
  };
};

export const valuesToLead = (values: LeadValues): LeadInsert => ({
  name: values.name,
  email: values.email,
  phone: values.phone,
  service: values.service,
  source: "start-project",
});

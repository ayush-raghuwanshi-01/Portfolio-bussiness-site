import { z } from "zod";
import { supabase, type LeadInsert } from "@/lib/supabase";
import { budgetOptions, serviceOptions } from "@/lib/site";

const serviceEnum = z.enum(serviceOptions);
const budgetEnum = z.enum(budgetOptions);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(24).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  service: serviceEnum,
  budget: budgetEnum,
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(24),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  service: serviceEnum,
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type BookingValues = z.infer<typeof bookingSchema>;

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

export const contactToLead = (values: ContactValues): LeadInsert => ({
  name: values.name,
  email: values.email,
  phone: values.phone || undefined,
  company: values.company || undefined,
  service: values.service,
  budget: values.budget,
  message: values.message,
  source: "contact-form",
});

export const bookingToLead = (values: BookingValues): LeadInsert => ({
  name: values.name,
  email: values.email,
  phone: values.phone,
  company: values.company || undefined,
  service: values.service,
  message: values.message,
  preferred_date: values.date,
  preferred_time: values.time,
  source: "booking-form",
});

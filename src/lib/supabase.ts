import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for lead storage.
 *
 * Set these environment variables (or replace with your project values):
 *   VITE_SUPABASE_URL       — your Supabase project URL
 *   VITE_SUPABASE_ANON_KEY  — your Supabase anon/public key
 *
 * Create a "leads" table in Supabase with this schema:
 *
 *   CREATE TABLE leads (
 *     id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *     name        TEXT NOT NULL,
 *     email       TEXT NOT NULL,
 *     phone       TEXT,
 *     company     TEXT,
 *     service     TEXT,
 *     budget      TEXT,
 *     message     TEXT,
 *     preferred_date TEXT,
 *     preferred_time TEXT,
 *     source      TEXT NOT NULL DEFAULT 'website',
 *     created_at  TIMESTAMPTZ DEFAULT now()
 *   );
 *
 * Enable Row Level Security. For public inserts, add a policy:
 *   CREATE POLICY "Allow public inserts" ON leads
 *     FOR INSERT WITH CHECK (true);
 *
 * Optionally add a Supabase Edge Function or Database Webhook
 * to send email notifications on insert (via Resend, SendGrid, etc.).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export type LeadInsert = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  preferred_date?: string;
  preferred_time?: string;
  source?: string;
};

/**
 * Submit a lead to Supabase.
 * Returns { success: true } or { success: false, error: string }.
 */
export const submitLead = async (lead: LeadInsert): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) {
    console.warn("[ZenWebStudio] Supabase not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
    return { success: false, error: "Form backend not configured. Please contact us directly." };
  }

  const { error } = await supabase.from("leads").insert([
    {
      ...lead,
      source: lead.source || "website",
    },
  ]);

  if (error) {
    console.error("[ZenWebStudio] Supabase insert error:", error.message);
    return { success: false, error: "Something went wrong. Please try again or contact us directly." };
  }

  return { success: true };
};

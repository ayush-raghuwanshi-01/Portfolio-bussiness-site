import { createClient } from "@supabase/supabase-js";

/**
 * Production lead store (Supabase / Postgres).
 *
 * Env:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 *
 * Schema lives in supabase/migrations/001_leads.sql
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

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
  website?: string;
};

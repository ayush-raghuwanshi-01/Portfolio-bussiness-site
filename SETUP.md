# ZenWebStudio — Site Setup Guide

## ✅ What's Already Configured

| Setting | Value |
|---------|-------|
| Company name | ZenWebStudio |
| Supabase URL | `https://ijrcydayfrjgjbsxccqq.supabase.co` |
| WhatsApp | +91 95845 5972 |
| Phone | +91 95845 5972 |
| Email | ayushtechguide@gmail.com |
| GA4 | Placeholder `G-XXXXXXXXXX` (you don't have this yet — see below) |
| GitHub | `https://github.com/zenwebstudio` (placeholder — update when real) |
| LinkedIn | `https://linkedin.com/company/zenwebstudio` (placeholder — update when real) |

---

## 🔴 ONE CRITICAL STEP — Supabase Anon Key

Your Supabase URL is set, but the **anon/public key** is missing. The forms will show an error message until you add it.

The anon key is a JWT token (looks like `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`), NOT the database password.

### How to get it:
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Open your project
3. Go to **Settings → API**
4. Under **Project API keys**, copy the **anon** (public) key
5. Open `.env` in the project root and replace `PASTE_YOUR_ANON_KEY_HERE`:
   ```
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Then create the leads table:
Run this SQL in Supabase → SQL Editor:

```sql
CREATE TABLE leads (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  company       TEXT,
  service       TEXT,
  budget        TEXT,
  message       TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  source        TEXT NOT NULL DEFAULT 'website',
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT WITH CHECK (true);
```

**Optional but recommended** — Add a Supabase Edge Function or Database Webhook to email your team when a new lead arrives (via Resend, SendGrid, or Slack webhook).

---

## 🟡 When You're Ready — Get a GA4 Measurement ID

Since you don't have one yet, the analytics script won't track events. When you're ready:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new GA4 property
3. Get the Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace `G-XXXXXXXXXX` in `index.html` (there are 2 places: the script src and the config line)

---

## 🟡 When You're Ready — Update These

| What | Where | Current | Replace With |
|------|-------|---------|-------------|
| GitHub org URL | Navbar.tsx, Hero.tsx, Contact.tsx | `https://github.com/zenwebstudio` | Your real company GitHub |
| LinkedIn URL | Navbar.tsx, Hero.tsx, Contact.tsx | `https://linkedin.com/company/zenwebstudio` | Your real company LinkedIn |
| Client logos | Hero.tsx → `CLIENT_LOGOS` | `[]` (hidden) | Add real client logo URLs |
| Testimonials | Testimonials.tsx → `TESTIMONIALS` | `[]` (hidden) | Add real client quotes |
| Team photos | About.tsx | Shubham shows "S" initial | Add Shubham's real photo to `src/assets/` |
| Domain | index.html, sitemap.xml | `zenwebstudio.com` | Your real domain |
| OG image | index.html | `zenwebstudio.com/og-image.png` | Create a 1200×630px image at `/public/og-image.png` |
| Favicon | index.html | (none set) | Add `/public/favicon.ico` |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env` | Supabase URL + anon key (⚠️ don't commit this to git) |
| `.env.example` | Template for env vars |
| `src/lib/supabase.ts` | Supabase client + `submitLead()` |
| `src/lib/analytics.ts` | GA4 event tracking |
| `public/sitemap.xml` | SEO sitemap |
| `public/robots.txt` | SEO robots |

---

## 📊 Analytics Events Being Tracked

Once you set up GA4, these events will appear in your dashboard:

- `hero_cta_click` — primary CTA
- `hero_secondary_click` — "See Our Work"
- `services_cta_click` — services CTA
- `booking_form_submit` — booking form (with service + budget params)
- `contact_form_submit` — contact form (with service param)
- `whatsapp_click` — WhatsApp button (with source location)
- `call_click` — Call button
- `nav_cta_click` — navbar CTA
- `project_click` — project card (with project name)
- `pricing_tier_click` — pricing tier (with tier name)

---

## 🧑‍💻 Team Members Currently Shown

1. **Ayush Raghuwanshi** — Co-Founder & Tech Lead (photo: ayush-main.png ✅)
2. **Shubham Mishra** — AI & ML Engineer (photo: placeholder initial "S" — add real photo)
3. **Deepak Tripathi** — Co-Founder & Lead Engineer (photo: team-deepak.png ✅)

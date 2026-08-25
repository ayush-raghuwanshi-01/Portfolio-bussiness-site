# ZenWebStudio — launch setup

## Brand (already on the site)

| Setting | Value |
| --- | --- |
| Company | ZenWebStudio |
| Public email | hello@zenwebstudio.com |
| WhatsApp / phone | +91 95845 59972 |
| Pillars | SaaS Engineering · Web App Dev · Mobile App Dev |
| Domain used in SEO | https://zenwebstudio.com |

Connect `hello@zenwebstudio.com` on your domain (forwarding is fine). Do not publish a personal Gmail on the site.

## Lead persistence

Forms always try `POST /api/leads` (works in `npm run dev` and `npm run preview`; writes `data/leads.json`).

For production, also configure Supabase:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Then run `supabase/migrations/001_leads.sql`. That table has RLS: public insert only, no public reads.

Optional: add a database webhook or Edge Function to email / Slack the team on insert.

## Analytics

Replace `G-XXXXXXXXXX` in `index.html` (script src + config) when you have a GA4 measurement ID.

## Still placeholders (update when real)

| Item | Where |
| --- | --- |
| GitHub / LinkedIn org URLs | `src/lib/site.ts` |
| Domain if not zenwebstudio.com | `src/lib/site.ts`, `index.html`, `public/sitemap.xml`, `public/robots.txt` |
| Team photographs | About page currently uses initials + the studio photo |

## Verify before launch

```bash
npm test
npm run build
```

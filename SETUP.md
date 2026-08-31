# Zenvio Labs — production setup

## Brand (on the site)

| Setting | Value |
| --- | --- |
| Company | Zenvio Labs |
| Email | zenwebstudio.in@gmail.com |
| WhatsApp | +91 95845 59972 |
| Location | India |
| Offer | Websites start at ₹5,000 (one year online) |
| Domain | https://zenwebstudio.com |

Enquiries go to `zenwebstudio.in@gmail.com`. The browser form uses Web3Forms (primary, built in) then FormSubmit.co (fallback) — confirm the first FormSubmit mail in that inbox if Web3Forms is ever unavailable.

## Enquiries → WhatsApp + email

The home / contact form calls Web3Forms from the browser using the public key in `src/lib/leads.ts`. On success it also best-effort posts to `/api/leads` for record keeping/WhatsApp. If Web3Forms fails, FormSubmit.co is used, then `/api/leads`.

On Vercel/local, `/api/leads` emails **zenwebstudio.in@gmail.com** (via Gmail app password or Web3Forms) and, if configured, WhatsApps **+91 95845 59972**. The browser path works without these env vars; set them only if you also want the server route to deliver.

### Email (optional server route)

For the `/api/leads` route, set either:

```
GMAIL_APP_PASSWORD=your-16-char-gmail-app-password
# OR
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

Web3Forms sends the first enquiry to `zenwebstudio.in@gmail.com` with a **confirm this address** link. Open that mail once. After that, every form lands in the inbox.

### WhatsApp (2 minutes, free)

Without this, email still works. With it, the same enquiry arrives as a WhatsApp text.

1. Save **+34 644 64 24 24** in your phone as CallMeBot.
2. WhatsApp that number: `I allow callmebot to send me messages`
3. It replies with an **apikey**.
4. Put it in `.env` (local) and in Vercel → Settings → Environment Variables:

```
CALLMEBOT_APIKEY=your-key
LEAD_EMAIL=zenwebstudio.in@gmail.com
WHATSAPP_PHONE=919584559972
```

Redeploy. Send a test form from your phone on 4G. You should get email + WhatsApp.

Alternatives if you already have them: `WHATSAPP_CLOUD_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID`, or `LEAD_WEBHOOK_URL` (Make / n8n / Interakt).

## Optional

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GA_MEASUREMENT_ID=
```

Run `supabase/migrations/001_leads.sql` only if you use Supabase. Analytics loads only when `VITE_GA_MEASUREMENT_ID` is a real `G-` id.

## Verify

```bash
npm test
npm run build
```

Open the live domain, submit the form, check WhatsApp and email.

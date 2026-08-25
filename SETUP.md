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

Enquiries go to `zenwebstudio.in@gmail.com`. Confirm the first FormSubmit mail in that inbox.

## Enquiries → WhatsApp + email

The project form posts to `/api/leads`. That route emails **zenwebstudio.in@gmail.com** and, if configured, WhatsApps **+91 95845 59972**. You then close the deal yourself.

### Email (required once)

FormSubmit sends the first enquiry to `zenwebstudio.in@gmail.com` with a **confirm this address** link. Open that mail once. After that, every form lands in the inbox.

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

# Zenvio Labs

Marketing site for **Zenvio Labs** — a studio for websites and business software. Websites start at ₹5,000.

## Pages

- `/` — home
- `/services` — websites, business software, mobile apps, FAQ
- `/work` — studio builds
- `/about` — team and process
- `/contact` — WhatsApp, email, form
- `/privacy`, `/terms`

## Develop

```bash
npm install
npm run dev
```

The app binds to `0.0.0.0:8080`. Enquiries `POST /api/leads` and are sent to WhatsApp + `zenwebstudio.in@gmail.com`. See `SETUP.md`.

## Scripts

- `npm run dev` — development
- `npm run build` — production bundle
- `npm run preview` — preview the bundle
- `npm test` — Vitest
- `npm run lint` — ESLint

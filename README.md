# ZenVioLabs

Marketing site for **ZenVioLabs** — a studio for websites and business software. Websites start at ₹5,000.

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

## Deploy

Static host + client-side routing needs a fallback rewrite or every deep link 404s on refresh.
`Staticfile` + `settings/config.toml` (`page-fallback`) configure the Wasmer Edge server that
serves `zenviolabs.wasmer.app`; `public/_redirects` covers Netlify and `vercel.json` covers
Vercel, and the build emits `dist/404.html` as a host-agnostic safety net.

```bash
npm run verify:deploy   # build + cold-load every route against Wasmer's own resolution order
wasmer deploy           # from the repo root, publishes dist/ with settings/config.toml
```

Details, verification commands and the fallback options: [`docs/SPA-ROUTING-HOSTING.md`](docs/SPA-ROUTING-HOSTING.md).

## Scripts

- `npm run dev` — development
- `npm run build` — production bundle
- `npm run preview` — preview the bundle
- `npm run verify:deploy` — build, then check deep links + host fallback config
- `npm test` — Vitest
- `npm run lint` — ESLint

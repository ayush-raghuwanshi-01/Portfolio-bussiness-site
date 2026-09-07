# Deep links, refreshes and the static host

**Symptom:** the site is fine while you click around, but pressing refresh on
`/services`, `/about` or `/contact` gives a bare `404 Not Found`, and pasting the link into
WhatsApp or Google leads to the same page.

## Why it happens

This is a single-page app: `dist/index.html` is the only real HTML file on the server, and
`/services`, `/work`, `/about`, `/contact`, `/privacy`, `/terms` are React Router routes that
exist only in JavaScript.

- Clicking a link never talks to the server, so it always works.
- A refresh (or any cold load) sends `GET /services` to the host. The host looks for a file
  named `services`, finds none, and answers **404 before React ever loads**. `src/pages/NotFound.tsx`
  cannot help — your code is not running yet.

Every dev server hides this: `npm run dev` and `npm run preview` ship with the fallback on.
So the bug only appears in production.

The fix is always the same, and it is a **rewrite, not a redirect**: the host must answer any
unmatched path with the contents of `index.html` **and status 200**, leaving the URL alone so
the router can read `location.pathname` and render the right page. A 301/302 would destroy the
path and send everyone to the home page.

## What this repo already does

| Layer | File | Host |
| --- | --- | --- |
| Primary | `settings/config.toml` → `page-fallback = "/public/index.html"` | **Wasmer Edge** (`zenviolabs.wasmer.app`) — Static Web Server serves the app shell with 200 for any missing path |
| Primary | `Staticfile` → `root: dist` | Wasmer Edge — publish the Vite build, not the repo root |
| Safety net | `dist/404.html` (generated at build time by `vite-plugin-spa-fallback.ts`) | Hosts that only offer a custom error page: GitHub Pages, nginx `error_page`, S3/CloudFront, and Wasmer via `page404` |
| Netlify | `public/_redirects` → `/* /index.html 200` | Netlify |
| Vercel | `vercel.json` → rewrite to `/index.html`, `/api/*` untouched | Vercel (also keeps the optional `/api/leads` function working) |

`src/lib/routes.ts` is the single source of truth for which paths are pages. `App.tsx` renders
its `<Route>`s from it, and `src/test/routing.test.ts` fails if the navbar or `public/sitemap.xml`
advertises a path that the router does not know — the second way a refresh can 404.

**Note:** `public/_redirects` is a Netlify feature. Wasmer Edge and most plain static hosts read
it as an ordinary text file (you can literally fetch `zenviolabs.wasmer.app/_redirects` and get
its contents back). A `_redirects` file alone never fixes Wasmer — `settings/config.toml` does.

## Before every deploy

```bash
npm run verify:deploy
```

That builds, then serves `dist/` with the same resolution order Wasmer uses (real file →
`page-fallback` → `page404`) and requests every route cold. Expect one `✓ … app shell, HTTP 200`
line per route. It exits non-zero if any path 404s, if `404.html` is missing, or if a fallback
config got deleted.

## Deploying to Wasmer Edge

Wasmer serves the directory named in `Staticfile` (`dist`) and reads `settings/config.toml`.
Run this from the **repository root**, after `npm run build`:

```bash
wasmer deploy            # publishes dist + settings/config.toml to the existing app
```

If your app was created without the static-website template wiring, recreate the config in the
same place:

```bash
wasmer app create --template static-website   # answers: don't deploy yet
# keep Staticfile -> root: dist and settings/config.toml as committed
npm run build && wasmer deploy
```

### Verifying the fix

```bash
curl -o /dev/null -w "%{http_code}\n" https://zenviolabs.wasmer.app/services   # want 200
```

Also check it in a browser: open `/contact`, refresh, and confirm the contact page is still
there. Then check a genuinely bad path — `https://zenviolabs.wasmer.app/nope` should now show
the branded in-app 404 view (with "Back home" / "Contact" buttons) instead of the host's page.

## If you cannot redeploy the config

Two options, in order of preference:

1. **Move the site to a host whose SPA fallback is a file in the repo** (Netlify or Vercel — the
   configs here already work). Set the domain and done.
2. Last resort: hash routing (`createHashRouter`), giving `/#/services`. It survives any host,
   but it changes every published URL, breaks the existing sitemap and share links, and is a
   step back for SEO on a site whose whole job is being found on Google. Not recommended.

Do **not** "fix" it by pointing `/services` at `index.html` with a redirect (301/302) — visitors
land on the home page and lose the link they clicked.

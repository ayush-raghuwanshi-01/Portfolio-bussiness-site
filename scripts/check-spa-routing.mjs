#!/usr/bin/env node
/**
 * Pre-deploy check for the "refresh on a sub-page gives 404" bug.
 *
 * It builds nothing — run `npm run build` first (or use `npm run verify:deploy`).
 * What it does:
 *   1. dist/404.html must exist and be a real app shell (see vite-plugin-spa-fallback.ts).
 *   2. Every asset the shell references must exist, otherwise a fallback page would boot
 *      to a blank screen instead of the router.
 *   3. Serves dist/ over HTTP using the same resolution order as Wasmer's
 *      `wasmer/static-web-server` (real file -> page-fallback with 200 -> page404) and
 *      requests every route in src/lib/routes.ts. Each must return 200 + the shell.
 *   4. Confirms the host fallback configs in the repo still declare an SPA rewrite.
 *
 * Exit code is non-zero on the first failure so it can gate a deploy.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const failures = [];
const ok = (msg) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
const fail = (msg) => {
  failures.push(msg);
  console.log(`  \x1b[31m✗\x1b[0m ${msg}`);
};
const assert = (cond, msg) => (cond ? ok(msg) : fail(msg));

/* ---------------------------------------------------------------- 1 + 2. artifacts */

console.log("\nBuild output");
if (!fs.existsSync(path.join(dist, "index.html"))) {
  fail(`dist/index.html missing — run \`npm run build\` first`);
  console.log(`\n\x1b[31m${failures.length} problem(s)\x1b[0m\n`);
  process.exit(1);
}

const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const fallback404 = path.join(dist, "404.html");
assert(fs.existsSync(fallback404), "dist/404.html exists (custom error page for hosts without page-fallback)");
if (fs.existsSync(fallback404)) {
  const body = fs.readFileSync(fallback404, "utf8");
  assert(/<div id="root">/.test(body), "dist/404.html is an app shell, not a stub");
  assert(body.includes("assets/index-"), "dist/404.html references the built bundle");
}

const referenced = [...shell.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]);
assert(referenced.length > 0, `shell references ${referenced.length} bundled asset(s)`);
for (const ref of referenced) {
  assert(fs.existsSync(path.join(dist, ref)), `asset resolves: ${ref}`);
}

/* ------------------------------------------------------------------- 3. serve + probe */

const configToml = fs.readFileSync(path.join(root, "settings/config.toml"), "utf8");
const pageFallback = /^\s*page-fallback\s*=\s*"([^"]+)"/m.exec(configToml)?.[1];
const page404 = /^\s*page404\s*=\s*"([^"]+)"/m.exec(configToml)?.[1];
assert(Boolean(pageFallback), `settings/config.toml sets page-fallback (${pageFallback ?? "nothing"})`);

// Wasmer mounts the Staticfile root at /public, so translate the config path into dist/.
const toDist = (p) => path.join(dist, p.replace(/^\/public\/?/, "").replace(/^\.\/?/, ""));

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0].split("#")[0]);
  const target = path.join(dist, url);
  const isFile = fs.existsSync(target) && fs.statSync(target).isFile();
  const wantsHtml = (req.headers.accept ?? "").includes("text/html") || req.method === "GET";

  const send = (file, status) => {
    res.writeHead(status, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  };

  if (isFile) return send(target, 200);
  if (url.endsWith("/")) {
    const index = path.join(target, "index.html");
    if (fs.existsSync(index)) return send(index, 200);
  }
  // static-web-server: page-fallback only rewrites 404s for HTML-ish GET requests.
  if (pageFallback && req.method === "GET" && wantsHtml) {
    const fb = toDist(pageFallback);
    if (fs.existsSync(fb)) return send(fb, 200);
  }
  if (page404) {
    const fb = toDist(page404);
    if (fs.existsSync(fb)) return send(fb, 404);
  }
  res.writeHead(404, { "content-type": "text/plain" });
  res.end("404 Not Found");
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const routePaths = [...fs.readFileSync(path.join(root, "src/lib/routes.ts"), "utf8")
  .matchAll(/\{\s*path:\s*"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "*"); // "*" is the in-app catch-all, not a URL

console.log("\nCold loads through the host fallback (what a refresh does)");
for (const route of routePaths) {
  const res = await fetch(base + route, { headers: { accept: "text/html,application/xhtml+xml" } });
  const text = await res.text();
  const shellServed = text.includes('<div id="root">') && text.includes("assets/index-");
  const verdict = shellServed
    ? res.status === 200
      ? "app shell, HTTP 200"
      : `app shell but HTTP ${res.status} — soft 404, search engines will drop the page`
    : "server error page, not the app — the router never boots";
  assert(res.status === 200 && shellServed, `${route} -> ${verdict}`);
}

const bogus = await fetch(base + "/definitely-not-a-page", { headers: { accept: "text/html" } });
assert(bogus.status === 200, `/definitely-not-a-page -> HTTP ${bogus.status} (in-app 404 view takes over)`);
await bogus.text();

const api = await fetch(base + "/api/leads", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "probe" }),
});
assert(api.status === 404 || api.status === 405, `POST /api/leads -> HTTP ${api.status} (not swallowed as HTML)`);

/* ------------------------------------------------------------------- 4. host configs */

console.log("\nHost fallback configuration");
assert(/\/\*\s+\/index\.html\s+200/.test(fs.readFileSync(path.join(root, "public/_redirects"), "utf8")), "Netlify: public/_redirects rewrites with 200");
const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
const spa = (vercel.rewrites ?? []).find((r) => r.destination === "/index.html");
assert(Boolean(spa), `Vercel: vercel.json rewrites ${spa ? spa.source : "(missing)"} -> /index.html`);
assert(/^\s*root:\s*dist\s*$/m.test(fs.readFileSync(path.join(root, "Staticfile"), "utf8")), "Wasmer: Staticfile publishes dist/");

server.close();
console.log(
  failures.length
    ? `\n\x1b[31m${failures.length} problem(s) found — do not deploy.\x1b[0m\n`
    : `\n\x1b[32mAll deep links serve the app shell. Safe to deploy.\x1b[0m\n`,
);
process.exit(failures.length ? 1 : 0);

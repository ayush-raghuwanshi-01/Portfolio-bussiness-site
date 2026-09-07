import { readFileSync } from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { LeadDialogProvider } from "@/components/site/LeadDialog";
import { appRoutePaths, appRoutes, lazyRoutes } from "@/lib/routes";
import { navLinks } from "@/lib/site";

const repoFile = (relative: string) => readFileSync(path.resolve(process.cwd(), relative), "utf8");

/**
 * A marketing site only works on refresh if two halves agree: the router must know the
 * path, and the static host must hand out index.html for it. These tests pin both halves
 * so a deep link cannot silently regress into "404 Not found" again.
 */
describe("SPA deep links — route table", () => {
  it("routes every link the navbar offers", () => {
    for (const link of navLinks) {
      expect(appRoutePaths, `${link.to} is not routable — a refresh on it shows the 404 page`).toContain(link.to);
    }
  });

  it("routes every URL declared in the sitemap", () => {
    const locs = [...repoFile("public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      new URL(m[1]).pathname,
    );
    expect(locs.length).toBeGreaterThan(0);
    for (const loc of locs) {
      expect(appRoutePaths, `sitemap advertises ${loc} but the router has no such route`).toContain(loc);
    }
  });

  it("has no duplicate or malformed route paths", () => {
    expect(new Set(appRoutePaths).size).toBe(appRoutePaths.length);
    for (const route of appRoutes) {
      expect(route.path.startsWith("/"), `${route.path} must start with /`).toBe(true);
      // No trailing slash anywhere except the index: "/about/" would not match "/about".
      if (route.path !== "/") expect(route.path).not.toMatch(/\/$/);
    }
  });

  it("declares an index.html fallback on every host the site is deployed to", () => {
    // Wasmer Edge — Static Web Server serves dist and ignores _redirects/vercel.json.
    const wasmer = repoFile("settings/config.toml");
    expect(wasmer).toMatch(/^\s*page-fallback\s*=\s*"\/public\/index\.html"/m);
    expect(wasmer).toMatch(/^\s*page404\s*=\s*"\.\/404\.html"/m);
    expect(repoFile("Staticfile")).toMatch(/^\s*root:\s*dist\s*$/m);

    // Each page also needs an explicit rewrite, or the server answers 404 before React
    // loads. Adding a route to src/lib/routes.ts without one fails here.
    const advanced = wasmer.slice(wasmer.indexOf("[advanced]"));
    const rewritten = new Set(
      [...advanced.matchAll(/source\s*=\s*"([^"]+)"\s*\n\s*destination\s*=\s*"\/index\.html"/g)].map((m) => m[1]),
    );
    for (const route of appRoutePaths) {
      expect(rewritten, `${route} has no rewrite in settings/config.toml`).toContain(route);
    }

    // Vercel — rewrite to the app shell, but keep /api/leads on the serverless function.
    const vercel = JSON.parse(repoFile("vercel.json")) as { rewrites?: { source: string; destination: string }[] };
    const spa = vercel.rewrites?.find((rule) => rule.destination === "/index.html");
    expect(spa?.source, "vercel.json needs a catch-all rewrite to /index.html").toBeTruthy();
    expect(spa?.source).not.toMatch(/\*\*/);

    // Netlify — `200` is a rewrite (a 301 would drop the path the router needs).
    expect(repoFile("public/_redirects")).toMatch(/\/\*\s+\/index\.html\s+200/);
  });
});

/** The same route tree App.tsx renders, minus the BrowserRouter it hardcodes. */
const Shell = ({ initialPath }: { initialPath: string }) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <LeadDialogProvider>
      <Suspense fallback={<div>loading…</div>}>
        <Routes>
          {lazyRoutes.map(({ path: routePath, Component }) => (
            <Route key={routePath} path={routePath} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </LeadDialogProvider>
  </MemoryRouter>
);

describe("SPA deep links — cold load", () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => consoleError.mockClear());

  it.each([
    ["/services", /What we build/, "Services"],
    ["/work", /what we have shipped/i, "Work"],
    ["/about", /No account layer/, "About"],
    ["/contact", /Send the project form below/, "Contact"],
  ])("renders the page for %s — the URL a refresh asks for", async (route, text, title) => {
    render(<Shell initialPath={route} />);
    expect(await screen.findByText(text)).toBeInTheDocument();
    // The route also drives its own <title> + canonical, which only happens if the right
    // page really rendered.
    await waitFor(() => expect(document.title).toContain(title));
  });

  it("renders the in-app 404 view for an unknown path instead of a blank page", async () => {
    render(<Shell initialPath="/not-a-real-page" />);
    expect(await screen.findByText(/This page is not here\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back home" })).toBeInTheDocument();
  });
});

import { lazy, type ComponentType } from "react";

export type AppRoute = {
  /** URL path the browser shows — must exist on the host's SPA fallback list. */
  path: string;
  /** Human label, used by tests and the sitemap check. */
  label: string;
  /** Lazy page module, so every route stays its own chunk. */
  load: () => Promise<{ default: ComponentType }>;
};

/**
 * Every URL a visitor can land on directly (refresh, shared link, Google).
 *
 * This is the one place that decides which paths are real pages: `App.tsx` renders its
 * `<Route>`s from this list, `src/test/routing.test.ts` asserts that everything the nav
 * offers and everything `public/sitemap.xml` tells search engines appears here, and the
 * host fallback rules (`settings/config.toml`, `vercel.json`, `public/_redirects`) serve
 * `index.html` for exactly these paths. Add a page here and it is deep-linkable; forget
 * it and a refresh shows the 404 screen.
 */
export const appRoutes: readonly AppRoute[] = [
  { path: "/", label: "Home", load: () => import("@/pages/Index.tsx") },
  { path: "/services", label: "Services", load: () => import("@/pages/Services.tsx") },
  { path: "/work", label: "Work", load: () => import("@/pages/Work.tsx") },
  { path: "/about", label: "About", load: () => import("@/pages/About.tsx") },
  { path: "/contact", label: "Contact", load: () => import("@/pages/Contact.tsx") },
  { path: "/privacy", label: "Privacy Policy", load: () => import("@/pages/Privacy.tsx") },
  { path: "/terms", label: "Terms of Use", load: () => import("@/pages/Terms.tsx") },
];

export const appRoutePaths: readonly string[] = appRoutes.map((route) => route.path);

/** Catch-all so unknown paths render the in-app 404 view instead of a blank page. */
export const notFoundRoute: AppRoute = {
  path: "*",
  label: "Not found",
  load: () => import("@/pages/NotFound.tsx"),
};

export const lazyRoutes = [...appRoutes, notFoundRoute].map((route) => ({
  path: route.path,
  Component: lazy(route.load),
}));

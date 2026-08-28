import { useEffect, useMemo } from "react";
import { absoluteUrl, pageTitle, site } from "@/lib/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string;
  /** Optional JSON-LD @type override; defaults to WebPage. */
  jsonLdType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage";
};

/** Create-or-get a named meta/link tag and return it for attribute updates. */
const upsert = (selector: string, create: () => HTMLElement) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const upsertJsonLd = (id: string, data: object) => {
  const selector = `script[data-ld-json="${id}"]`;
  let el = document.head.querySelector(selector) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-ld-json", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

export const Seo = ({
  title,
  description = site.description,
  path = "/",
  image,
  keywords,
  jsonLdType = "WebPage",
}: SeoProps) => {
  const fullTitle = useMemo(() => pageTitle(title), [title]);
  const url = useMemo(() => absoluteUrl(path), [path]);
  const ogImage = useMemo(() => image || `${site.url}/og-image.jpg`, [image]);

  useEffect(() => {
    document.title = fullTitle;

    // Description
    upsert('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    }).setAttribute("content", description);

    // Keywords (optional)
    if (keywords) {
      upsert('meta[name="keywords"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "keywords");
        return m;
      }).setAttribute("content", keywords);
    }

    // Robots — index/follow by default; let crawlers follow large previews
    upsert('meta[name="robots"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "robots");
      return m;
    }).setAttribute("content", "index, follow, max-image-preview:large");

    // Open Graph + Twitter
    const pairs: Array<[string, string, string]> = [
      ["property", "og:title", fullTitle],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:image", ogImage],
      ["property", "og:type", "website"],
      ["property", "og:site_name", site.name],
      ["property", "og:locale", "en_IN"],
      ["property", "og:image:alt", fullTitle],
      ["name", "twitter:title", fullTitle],
      ["name", "twitter:description", description],
      ["name", "twitter:image", ogImage],
      ["name", "twitter:image:alt", fullTitle],
      ["name", "twitter:card", "summary_large_image"],
    ];

    pairs.forEach(([attr, key, value]) => {
      const el = upsert(`meta[${attr}="${key}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute(attr, key);
        return m;
      });
      el.setAttribute("content", value);
    });

    // Canonical
    const canonical = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }) as HTMLLinkElement;
    canonical.href = url;

    // Per-page JSON-LD: WebPage (or specialized variant) linking to the
    // Organization already declared statically in index.html.
    upsertJsonLd("page", {
      "@context": "https://schema.org",
      "@type": jsonLdType,
      "@id": `${url}#page`,
      url,
      name: fullTitle,
      description,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${site.url}/#website` },
      publisher: { "@id": `${site.url}/#organization` },
      image: ogImage,
    });
  }, [fullTitle, description, url, ogImage, keywords, jsonLdType]);

  return null;
};

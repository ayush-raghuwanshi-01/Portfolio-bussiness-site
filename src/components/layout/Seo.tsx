import { useEffect } from "react";
import { absoluteUrl, pageTitle, site } from "@/lib/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

const upsert = (selector: string, create: () => HTMLElement) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

export const Seo = ({ title, description = site.description, path = "/", image }: SeoProps) => {
  const fullTitle = pageTitle(title);
  const url = absoluteUrl(path);
  const ogImage = image || `${site.url}/og-image.jpg`;

  useEffect(() => {
    document.title = fullTitle;

    const desc = upsert('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    desc.setAttribute("content", description);

    const pairs: Array<[string, string, string]> = [
      ["property", "og:title", fullTitle],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:image", ogImage],
      ["property", "og:type", "website"],
      ["property", "og:site_name", site.name],
      ["name", "twitter:title", fullTitle],
      ["name", "twitter:description", description],
      ["name", "twitter:image", ogImage],
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

    const canonical = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }) as HTMLLinkElement;
    canonical.href = url;
  }, [fullTitle, description, url, ogImage]);

  return null;
};

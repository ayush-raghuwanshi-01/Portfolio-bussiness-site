import { describe, expect, it } from "vitest";
import { navLinks, site } from "@/lib/site";

describe("Site navigation and metadata", () => {
  it("has the core navigation links", () => {
    const paths = navLinks.map((l) => l.to);
    expect(paths).toContain("/services");
    expect(paths).toContain("/work");
    expect(paths).toContain("/about");
    expect(paths).toContain("/contact");
  });

  it("has valid contact details", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(site.phoneTel).toMatch(/^\+?\d{10,15}$/);
    expect(site.whatsapp).toMatch(/^\d{10,15}$/);
    expect(site.url).toMatch(/^https?:\/\//);
  });
});

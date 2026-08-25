import { describe, expect, it } from "vitest";
import { pageTitle, serviceOptions, site } from "@/lib/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { leadSchema } from "@/lib/leads";

describe("ZenWebStudio brand", () => {
  it("uses company identity, not a personal portfolio", () => {
    expect(site.name).toBe("ZenWebStudio");
    expect(site.email).toBe("hello@zenwebstudio.com");
    expect(site.email).not.toMatch(/gmail\.com/i);
    expect(site.tagline.toLowerCase()).not.toContain("hire me");
    expect(JSON.stringify(site)).not.toContain("CompanyName");
  });

  it("titles pages with the studio name", () => {
    expect(pageTitle("Services")).toBe("Services — ZenWebStudio");
  });
});

describe("service matrix", () => {
  it("exposes the four product surfaces", () => {
    expect(services.map((s) => s.id)).toEqual(["web", "mobile", "saas", "cloud"]);
    expect(services.map((s) => s.name)).toEqual([
      "Web Apps",
      "Mobile Apps",
      "Software as a Service (SaaS)",
      "Cloud Management",
    ]);
    expect(serviceOptions).toEqual([
      "Web Apps",
      "Mobile Apps",
      "Software as a Service (SaaS)",
      "Cloud Management",
    ]);
  });

  it("does not advertise AI-managed growth or rupee sticker prices", () => {
    const blob = services.map((s) => `${s.name} ${s.short} ${s.offer}`).join(" ").toLowerCase();
    expect(blob).not.toContain("ai-managed growth");
    expect(blob).not.toContain("ai engineering");
    expect(JSON.stringify(services)).not.toMatch(/₹|49999/);
  });

  it("lists case studies without live preview links", () => {
    expect(caseStudies.some((c) => c.types.includes("saas"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("web"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("mobile"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("cloud"))).toBe(true);
    expect(caseStudies.every((c) => !("href" in c) && !("live" in c))).toBe(true);
  });
});

describe("lead form", () => {
  it("accepts a complete start-a-project brief", () => {
    const parsed = leadSchema.safeParse({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      service: serviceOptions[0],
      website: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects an incomplete request", () => {
    const parsed = leadSchema.safeParse({
      name: "Jo",
      email: "not-an-email",
      phone: "",
      service: serviceOptions[1],
    });
    expect(parsed.success).toBe(false);
  });

  it("treats a filled honeypot as invalid for humans", () => {
    const parsed = leadSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      phone: "+919876543210",
      service: serviceOptions[0],
      website: "https://spam.test",
    });
    expect(parsed.success).toBe(false);
  });

  it("does not collect a budget field", () => {
    const parsed = leadSchema.safeParse({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      service: serviceOptions[2],
      budget: "do-not-accept",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect("budget" in parsed.data).toBe(false);
    }
  });
});

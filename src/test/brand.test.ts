import { describe, expect, it } from "vitest";
import { budgetOptions, pageTitle, serviceOptions, site } from "@/lib/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { bookingSchema, contactSchema } from "@/lib/leads";

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
  it("exposes the three product pillars", () => {
    expect(services.map((s) => s.id)).toEqual(["saas", "web", "mobile"]);
    expect(services.map((s) => s.name)).toEqual([
      "SaaS Engineering",
      "Web App Development",
      "Mobile App Development",
    ]);
  });

  it("does not advertise AI-managed growth as a pillar", () => {
    const blob = services.map((s) => `${s.name} ${s.short}`).join(" ").toLowerCase();
    expect(blob).not.toContain("ai-managed growth");
  });

  it("can filter case studies by each pillar", () => {
    expect(caseStudies.some((c) => c.types.includes("saas"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("web"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("mobile"))).toBe(true);
  });
});

describe("lead forms", () => {
  it("accepts a complete contact brief", () => {
    const parsed = contactSchema.safeParse({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      company: "Acme",
      service: serviceOptions[0],
      budget: budgetOptions[2],
      message: "Need a multi-tenant billing workspace for Q4.",
      website: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects an incomplete booking", () => {
    const parsed = bookingSchema.safeParse({
      name: "Jo",
      email: "not-an-email",
      phone: "",
      service: serviceOptions[1],
      date: "",
      time: "",
      message: "Hi",
    });
    expect(parsed.success).toBe(false);
  });

  it("treats a filled honeypot as invalid for humans", () => {
    const parsed = contactSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      service: serviceOptions[0],
      budget: budgetOptions[0],
      message: "This is a sufficiently long spam payload.",
      website: "https://spam.test",
    });
    expect(parsed.success).toBe(false);
  });
});

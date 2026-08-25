import { describe, expect, it } from "vitest";
import { pageTitle, serviceOptions, site } from "@/lib/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { leadSchema } from "@/lib/leads";

describe("Zenvio Labs brand", () => {
  it("uses company identity, not a personal portfolio", () => {
    expect(site.name).toBe("Zenvio Labs");
    expect(site.email).toBe("zenwebstudio.in@gmail.com");
    expect(site.tagline.toLowerCase()).not.toContain("hire me");
    expect(site.location).toMatch(/India/);
    expect(JSON.stringify(site)).not.toMatch(/Bhopal/i);
    expect(JSON.stringify(site)).not.toContain("CompanyName");
    expect(JSON.stringify(site)).not.toMatch(/30%\s*OFF/i);
  });

  it("titles pages with the studio name", () => {
    expect(pageTitle("Services")).toBe("Services — Zenvio Labs");
  });
});

describe("service matrix", () => {
  it("leads with websites and business software", () => {
    expect(services.map((s) => s.id)).toEqual(["web", "software", "mobile"]);
    expect(services.map((s) => s.name)).toEqual(["Websites", "Business software", "Mobile apps"]);
    expect(serviceOptions).toEqual(["Website", "Business software", "Mobile app", "Not sure"]);
  });

  it("states a starting website price in rupees and does not advertise a blanket discount", () => {
    const web = services.find((s) => s.id === "web");
    expect(web?.priceNote).toMatch(/₹5,000/);
    const blob = services.map((s) => `${s.name} ${s.short} ${s.priceNote}`).join(" ");
    expect(blob).not.toMatch(/30%\s*OFF/i);
    expect(blob.toLowerCase()).not.toContain("ai-managed growth");
  });

  it("lists studio builds without live preview links", () => {
    expect(caseStudies.some((c) => c.types.includes("software"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("web"))).toBe(true);
    expect(caseStudies.some((c) => c.types.includes("mobile"))).toBe(true);
    expect(caseStudies.every((c) => c.kind === "studio" || c.kind === "client")).toBe(true);
    expect(caseStudies.every((c) => !("href" in c) && !("live" in c))).toBe(true);
  });
});

describe("lead form", () => {
  it("accepts a complete enquiry", () => {
    const parsed = leadSchema.safeParse({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      city: "Pune",
      service: serviceOptions[0],
      message: "Need a 5-page site for our coaching institute",
      website: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects an incomplete request", () => {
    const parsed = leadSchema.safeParse({
      name: "Jo",
      email: "not-an-email",
      phone: "",
      city: "",
      service: serviceOptions[1],
      message: "Hi",
    });
    expect(parsed.success).toBe(false);
  });

  it("treats a filled honeypot as invalid for humans", () => {
    const parsed = leadSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      phone: "+919876543210",
      city: "Pune",
      service: serviceOptions[0],
      message: "Need a website for my shop",
      website: "https://spam.test",
    });
    expect(parsed.success).toBe(false);
  });

  it("does not collect a budget field", () => {
    const parsed = leadSchema.safeParse({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      city: "Indore",
      service: serviceOptions[2],
      message: "Want a member app for our gym",
      budget: "do-not-accept",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect("budget" in parsed.data).toBe(false);
    }
  });
});

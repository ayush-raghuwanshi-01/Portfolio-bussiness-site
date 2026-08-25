import { beforeEach, describe, expect, it, vi } from "vitest";
import { bookingToLead, contactToLead, submitLead } from "@/lib/leads";

describe("submitLead", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("maps contact values into a persistable lead", () => {
    const lead = contactToLead({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      company: "Acme",
      service: "SaaS Engineering",
      budget: "₹2L – ₹8L / $2.4k–$10k",
      message: "Need a multi-tenant billing workspace.",
      website: "",
    });
    expect(lead.source).toBe("contact-form");
    expect(lead.service).toBe("SaaS Engineering");
    expect(lead.website).toBeUndefined();
  });

  it("maps booking values including the requested slot", () => {
    const lead = bookingToLead({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      company: "",
      service: "Mobile App Development",
      date: "2026-09-01",
      time: "14:00",
      message: "Want to scope an iOS + Android companion app.",
      website: "",
    });
    expect(lead.source).toBe("booking-form");
    expect(lead.preferred_date).toBe("2026-09-01");
    expect(lead.preferred_time).toBe("14:00");
  });

  it("silently accepts honeypot submissions", async () => {
    const result = await submitLead({
      name: "Bot",
      email: "bot@example.com",
      website: "https://spam.test",
      source: "contact-form",
    });
    expect(result.success).toBe(true);
  });

  it("succeeds when the local leads API responds ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
    );
    const result = await submitLead({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      service: "Web App Development",
      message: "Need a customer portal.",
      source: "contact-form",
    });
    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalled();
  });
});

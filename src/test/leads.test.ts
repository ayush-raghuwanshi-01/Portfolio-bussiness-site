import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitLead, valuesToLead } from "@/lib/leads";

describe("submitLead", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("maps start-a-project values into a persistable lead", () => {
    const lead = valuesToLead({
      name: "Jordan Patel",
      email: "jordan@acme.dev",
      phone: "+919876543210",
      service: "Software as a Service (SaaS)",
      website: "",
    });
    expect(lead.source).toBe("start-project");
    expect(lead.service).toBe("Software as a Service (SaaS)");
    expect(lead.budget).toBeUndefined();
    expect(lead.website).toBeUndefined();
  });

  it("silently accepts honeypot submissions", async () => {
    const result = await submitLead({
      name: "Bot",
      email: "bot@example.com",
      website: "https://spam.test",
      source: "start-project",
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
      phone: "+919876543210",
      service: "Web Apps",
      source: "start-project",
    });
    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalled();
  });
});

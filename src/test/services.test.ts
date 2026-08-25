import { describe, expect, it } from "vitest";
import { services, getService, serviceLabels } from "@/data/services";
import { serviceOptions, serviceOptionById } from "@/lib/site";

describe("Services data integrity", () => {
  it("defines all 3 core service pillars", () => {
    expect(services).toHaveLength(3);
    const ids = services.map((s) => s.id);
    expect(ids).toEqual(["web", "software", "mobile"]);
  });

  it("ensures each service has required fields and deliverables", () => {
    services.forEach((service) => {
      expect(service.id).toBeTruthy();
      expect(service.name).toBeTruthy();
      expect(service.short).toBeTruthy();
      expect(service.summary).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.priceNote).toBeTruthy();
      expect(service.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(service.stack.length).toBeGreaterThanOrEqual(2);
      expect(service.deepDive.length).toBeGreaterThanOrEqual(2);
      expect(service.image).toBeTruthy();
      expect(service.icon).toBeTruthy();
    });
  });

  it("retrieves a service by id correctly", () => {
    expect(getService("web")?.name).toBe("Websites");
    expect(getService("software")?.name).toBe("Business software");
    expect(getService("mobile")?.name).toBe("Mobile apps");
    expect(getService("non-existent")).toBeUndefined();
  });

  it("has consistent service labels and option mappings", () => {
    expect(serviceLabels.web).toBe("Website");
    expect(serviceLabels.software).toBe("Software");
    expect(serviceLabels.mobile).toBe("Mobile");

    expect(serviceOptionById.web).toBe("Website");
    expect(serviceOptionById.software).toBe("Business software");
    expect(serviceOptionById.mobile).toBe("Mobile app");
    expect(serviceOptions).toContain("Website");
    expect(serviceOptions).toContain("Business software");
    expect(serviceOptions).toContain("Mobile app");
    expect(serviceOptions).toContain("Not sure");
  });
});

import { describe, expect, it } from "vitest";
import { caseStudies, featuredWork } from "@/data/work";

describe("Work and Case Studies", () => {
  it("contains valid case studies with proper structure", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    caseStudies.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.client).toBeTruthy();
      expect(item.types.length).toBeGreaterThan(0);
      expect(item.problem).toBeTruthy();
      expect(item.solution).toBeTruthy();
      expect(item.outcome).toBeTruthy();
      expect(item.stack.length).toBeGreaterThan(0);
      expect(item.cover).toBeTruthy();
      expect(["studio", "client"]).toContain(item.kind);
    });
  });

  it("identifies featured work correctly", () => {
    expect(featuredWork.length).toBeGreaterThan(0);
    expect(featuredWork.length).toBeLessThanOrEqual(caseStudies.length);
    featuredWork.forEach((item) => {
      expect(item.featured).toBe(true);
    });
  });
});

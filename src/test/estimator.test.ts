import { describe, expect, it } from "vitest";
import { estimateProject } from "@/lib/estimator";

describe("estimateProject", () => {
  it("returns a range above the published web starting point", () => {
    const result = estimateProject({ service: "web", scale: "starter", timeline: "standard" });
    expect(result.lowInr).toBeGreaterThan(40000);
    expect(result.highInr).toBeGreaterThan(result.lowInr);
    expect(result.weeksHigh).toBeGreaterThanOrEqual(result.weeksLow);
  });

  it("prices a multi-phase SaaS higher than a starter web slice", () => {
    const web = estimateProject({ service: "web", scale: "starter", timeline: "flexible" });
    const saas = estimateProject({ service: "saas", scale: "enterprise", timeline: "rush" });
    expect(saas.lowInr).toBeGreaterThan(web.highInr);
  });
});

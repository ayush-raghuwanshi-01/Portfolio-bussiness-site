import { describe, expect, it } from "vitest";
import { principles, team, values } from "@/data/team";
import { differentiators, processSteps, trustBadges } from "@/data/process";

describe("Team and Process Data", () => {
  it("defines team members with names, roles, and focus areas", () => {
    expect(team.length).toBeGreaterThanOrEqual(3);
    team.forEach((member) => {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.focus).toBeTruthy();
      expect(member.initials).toMatch(/^[A-Z]{2}$/);
    });
  });

  it("defines studio values and operational principles", () => {
    expect(values.length).toBeGreaterThanOrEqual(3);
    values.forEach((val) => {
      expect(val.title).toBeTruthy();
      expect(val.body).toBeTruthy();
    });

    expect(principles.length).toBeGreaterThanOrEqual(3);
    principles.forEach((p) => {
      expect(typeof p).toBe("string");
      expect(p.length).toBeGreaterThan(5);
    });
  });

  it("defines the 4-step delivery process", () => {
    expect(processSteps).toHaveLength(4);
    processSteps.forEach((step, idx) => {
      expect(step.n).toBe(`0${idx + 1}`);
      expect(step.title).toBeTruthy();
      expect(step.duration).toBeTruthy();
      expect(step.body).toBeTruthy();
      expect(step.points.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("provides differentiators and trust badges", () => {
    expect(differentiators.length).toBeGreaterThanOrEqual(3);
    expect(trustBadges.length).toBeGreaterThanOrEqual(3);
  });
});

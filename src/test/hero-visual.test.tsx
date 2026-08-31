import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { HeroVisual } from "@/components/home/HeroVisual";

// jsdom does not provide a real requestAnimationFrame animation loop.
// Schedule nothing so the component renders once without the infinite loop.
beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", () => 0);
  vi.stubGlobal("cancelAnimationFrame", () => {});
});

describe("HeroVisual", () => {
  it("renders the Z logo scene without throwing", () => {
    const { container } = render(<HeroVisual />);

    // The old Z logo mark scene is back: the hero shows the brand tagline chip
    // ("Design · Develop · Grow") and the "Live" badge on the logo cube.
    expect(screen.getByText("Design · Develop · Grow")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();

    // The animated scene is built from the logo cube plate and its orbital rings.
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });
});

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
  it("renders the focus brand and does not throw for missing time state", () => {
    render(<HeroVisual />);

    // "ZenVioLabs" is split into individual letters, so check a sample of it.
    expect(screen.getAllByText("Z").length).toBeGreaterThan(0);
    expect(screen.getByText("Live Studio")).toBeInTheDocument();
  });
});

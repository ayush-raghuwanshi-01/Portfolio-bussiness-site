import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BackButtonToHome } from "@/components/layout/BackButtonToHome";
import { LeadDialogProvider, useLeadDialog } from "@/components/site/LeadDialog";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

type MatchMediaListener = (event: MediaQueryListEvent) => void;

const createMatchMediaController = (initialMatches = false) => {
  let matches = initialMatches;
  const listeners = new Set<MatchMediaListener>();

  const matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addListener: (listener: MatchMediaListener) => listeners.add(listener),
    removeListener: (listener: MatchMediaListener) => listeners.delete(listener),
    addEventListener: (_type: string, listener: MatchMediaListener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: MatchMediaListener) => listeners.delete(listener),
    dispatchEvent: () => true,
  }));

  return {
    matchMedia,
    setMatches(next: boolean) {
      matches = next;
      const event = { matches: next } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
};

describe("targeted regressions", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("light-theme");
  });

  it("leaves browser history untouched on inner pages", () => {
    const pushSpy = vi.spyOn(window.history, "pushState");
    const backSpy = vi.spyOn(window.history, "back");

    const { unmount } = render(
      <MemoryRouter initialEntries={["/about"]}>
        <BackButtonToHome />
      </MemoryRouter>,
    );

    unmount();

    expect(pushSpy).not.toHaveBeenCalled();
    expect(backSpy).not.toHaveBeenCalled();
  });

  it("follows system theme changes until the user explicitly chooses a theme", () => {
    const media = createMatchMediaController(false);
    window.matchMedia = media.matchMedia as typeof window.matchMedia;

    const ThemeProbe = () => {
      const { theme } = useTheme();
      return <span>{theme}</span>;
    };

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(window.localStorage.getItem("zenvio-theme")).toBeNull();

    act(() => {
      media.setMatches(true);
    });

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("light-theme");
    expect(window.localStorage.getItem("zenvio-theme")).toBeNull();
  });

  it("stores an explicit theme choice and ignores later system changes", () => {
    const media = createMatchMediaController(false);
    window.matchMedia = media.matchMedia as typeof window.matchMedia;

    const ThemeProbe = () => {
      const { theme, toggleTheme } = useTheme();
      return <button onClick={toggleTheme}>{theme}</button>;
    };

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    act(() => {
      screen.getByRole("button").click();
    });

    expect(screen.getByRole("button")).toHaveTextContent("light");
    expect(window.localStorage.getItem("zenvio-theme")).toBe("light");

    act(() => {
      media.setMatches(false);
    });

    expect(screen.getByRole("button")).toHaveTextContent("light");
  });

  it("resets the lead dialog service to the default on generic opens", async () => {
    let openLeadDialog: ReturnType<typeof useLeadDialog>["openLeadDialog"] | undefined;

    const Harness = () => {
      const dialog = useLeadDialog();
      openLeadDialog = dialog.openLeadDialog;
      return null;
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <LeadDialogProvider>
          <Harness />
        </LeadDialogProvider>
      </MemoryRouter>,
    );

    act(() => {
      openLeadDialog?.("Mobile app");
    });

    expect((await screen.findByLabelText("What do you need?") as HTMLSelectElement).value).toBe("Mobile app");

    act(() => {
      openLeadDialog?.();
    });

    expect((await screen.findByLabelText("What do you need?") as HTMLSelectElement).value).toBe("Website");
  });
});

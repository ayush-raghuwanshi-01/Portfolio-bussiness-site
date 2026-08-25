import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const CursorGlow = () => {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor-glow");
    const onMove = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.body.classList.remove("has-cursor-glow");
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 bg-primary/10 mix-blend-screen shadow-[0_0_24px_hsl(248_86%_66%/0.45)] md:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)` }}
    />
  );
};

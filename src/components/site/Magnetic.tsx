import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Higher = weaker pull. 18 is a pleasant default. */
  strength?: number;
};

/**
 * Gently pulls the wrapped element toward the cursor within its parent.
 * Auto-disables on touch devices, reduced-motion users, and small screens to
 * avoid sticky "hover" states from broken :hover emulation.
 */
export const Magnetic = ({ children, className, strength = 18 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reduced || isMobile;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={disabled ? undefined : onMove}
      onMouseLeave={disabled ? undefined : onLeave}
      className={cn(
        "inline-flex will-change-transform transition-transform duration-200 ease-out",
        disabled && "transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

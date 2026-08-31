import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

// Try the user-provided logo PNG; if it fails to load (file not present),
// gracefully fall back to the SVG ZVL mark below.
const LOGO_PNG = "/zenvio-logo.png";

const SVGMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={cn(
      "h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_hsl(248_86%_66%/0.7)]",
      className,
    )}
    role="img"
    aria-label={site.name}
  >
    <defs>
      <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6D5EF5" />
        <stop offset="50%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="lg-zvl-z" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="lg-zvl-v" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
      <linearGradient id="lg-zvl-l" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C6BFF" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="11" fill="url(#lg-bg)" />
    {/* Z letter */}
    <path d="M8 12 L15 12 L15 17 L12 17 L17 28 L14 28 L9 17 L12 17 L12 12 Z" fill="url(#lg-zvl-z)" />
    {/* V letter */}
    <path d="M18 12 L21 12 L24 22 L27 12 L30 12 L25 28 L23 28 L18 12 Z" fill="url(#lg-zvl-v)" />
    {/* L letter */}
    <path d="M31 12 L34 12 L34 24 L37 24 L37 28 L31 28 Z" fill="url(#lg-zvl-l)" />
  </svg>
);

export const Logo = ({ className, markClassName, wordmark = true }: LogoProps) => {
  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative shrink-0">
        <img
          src={LOGO_PNG}
          alt=""
          aria-hidden="true"
          onError={(e) => {
            // PNG not uploaded yet — hide the <img> and reveal the SVG fallback
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const fallback = (e.currentTarget.parentElement as HTMLElement | null)?.querySelector(
              "[data-logo-fallback]",
            ) as HTMLElement | null;
            if (fallback) fallback.style.display = "";
          }}
          className={cn(
            "h-9 w-9 rounded-lg object-contain transition-transform duration-300 group-hover:scale-110",
            markClassName,
          )}
        />
        <span data-logo-fallback style={{ display: "none" }}>
          <SVGMark className={markClassName} />
        </span>
      </span>
      {wordmark && (
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
          {site.name}
          <span className="text-ember">.</span>
        </span>
      )}
    </span>
  );
};

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

// Try the user-provided logo PNG; if it fails to load (file not present),
// gracefully fall back to the SVG Z mark below.
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
        <stop offset="55%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3D2BBF" />
      </linearGradient>
      <linearGradient id="lg-z" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F4F1FF" />
        <stop offset="100%" stopColor="#B8A9FF" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="11" fill="url(#lg-bg)" />
    <path d="M11 11.5h18l-9.4 8.1H29V28.5H11l9.4-8.1H11V11.5z" fill="url(#lg-z)" />
    <path d="M9.2 30.4L30.8 9.6" stroke="#FF6A3D" strokeWidth="2.1" strokeLinecap="round" />
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

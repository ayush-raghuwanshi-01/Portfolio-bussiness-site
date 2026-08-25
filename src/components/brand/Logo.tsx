import { useId } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export const Logo = ({ className, markClassName, wordmark = true }: LogoProps) => {
  const gid = useId();

  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className={cn(
          "h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_hsl(248_86%_66%/0.7)]",
          markClassName,
        )}
        role="img"
        aria-label={site.name}
      >
        <defs>
          <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6D5EF5" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3D2BBF" />
          </linearGradient>
          <linearGradient id={`${gid}-z`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F4F1FF" />
            <stop offset="100%" stopColor="#B8A9FF" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill={`url(#${gid}-bg)`} />
        <path d="M11 11.5h18l-9.4 8.1H29V28.5H11l9.4-8.1H11V11.5z" fill={`url(#${gid}-z)`} />
        <path d="M9.2 30.4L30.8 9.6" stroke="#FF6A3D" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
      {wordmark && (
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
          {site.name}
          <span className="text-ember">.</span>
        </span>
      )}
    </span>
  );
};

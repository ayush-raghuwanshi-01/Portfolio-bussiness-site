import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import logoMark from "@/assets/brand/logo-mark.png";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export const Logo = ({ className, markClassName, wordmark = true }: LogoProps) => (
  <span className={cn("group inline-flex items-center gap-2.5", className)}>
    <img
      src={logoMark}
      alt=""
      aria-hidden="true"
      width={36}
      height={36}
      decoding="async"
      className={cn(
        "h-9 w-9 shrink-0 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_hsl(248_86%_66%/0.7)]",
        markClassName,
      )}
    />
    {wordmark && (
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        {site.name}
        <span className="text-ember">.</span>
      </span>
    )}
  </span>
);

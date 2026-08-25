import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  surface?: "dark" | "mid" | "paper";
  contained?: boolean;
};

export const Section = ({
  id,
  children,
  className,
  surface = "dark",
  contained = true,
}: SectionProps) => {
  const surfaceClass =
    surface === "paper" ? "surface-paper" : surface === "mid" ? "surface-mid" : "surface-dark";

  return (
    <section id={id} className={cn("relative py-24 sm:py-28", surfaceClass, className)}>
      {contained ? <div className="container">{children}</div> : children}
    </section>
  );
};

export const SectionHeading = ({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}) => (
  <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
    <span className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>
    <h2 className="mt-5 font-serif-display text-4xl text-foreground sm:text-5xl lg:text-[64px]">{title}</h2>
    {body && (
      <p
        className={cn(
          "mt-5 text-[15px] leading-relaxed text-foreground/72",
          align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
        )}
      >
        {body}
      </p>
    )}
  </div>
);

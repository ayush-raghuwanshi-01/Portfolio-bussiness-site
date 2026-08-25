import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLeadDialog } from "@/components/site/LeadDialog";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import type { ServiceOption } from "@/lib/site";
import { cn } from "@/lib/utils";

export const StartProjectButton = ({
  service,
  source = "start-project",
  children = (
    <>
      Start a Project <ArrowRight className="h-4 w-4" />
    </>
  ),
  className,
  variant = "ember",
  size = "lg",
  onClick,
  ...props
}: ButtonProps & {
  service?: ServiceOption;
  source?: string;
}) => {
  const { openLeadDialog } = useLeadDialog();

  return (
    <Button
      {...props}
      type="button"
      variant={variant}
      size={size}
      className={cn("rounded-full", className)}
      onClick={(event) => {
        trackEvent(AnalyticsEvents.NAV_CTA_CLICKED, { location: source });
        onClick?.(event);
        openLeadDialog(service);
      }}
    >
      {children}
    </Button>
  );
};

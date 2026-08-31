import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/site/LeadForm";
import { serviceOptions, site, type ServiceOption } from "@/lib/site";
import { LeadDialogContext, useLeadDialog } from "@/contexts/LeadDialogContext";

export { useLeadDialog };

const OPEN_HASHES = new Set(["#book", "#start", "#project"]);

export const LeadDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceOption>(serviceOptions[0]);
  const location = useLocation();
  const navigate = useNavigate();

  const openLeadDialog = useCallback((next?: ServiceOption) => {
    setService(next ?? serviceOptions[0]);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (OPEN_HASHES.has(location.hash)) {
      setOpen(true);
    }
  }, [location.hash, location.pathname]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next && OPEN_HASHES.has(location.hash)) {
      navigate({ pathname: location.pathname, search: location.search, hash: "" }, { replace: true });
    }
  };

  const value = useMemo(() => ({ openLeadDialog }), [openLeadDialog]);

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass-strong no-scrollbar max-h-[92vh] max-w-lg overflow-y-auto rounded-[28px] border-border/70 p-6 shadow-elegant sm:rounded-[32px] sm:p-8">
          <DialogHeader className="pb-1">
            <DialogTitle className="font-serif-display text-3xl font-normal tracking-tight">
              Start a project
            </DialogTitle>
            <DialogDescription className="text-[14px] leading-relaxed text-foreground/70">
              Name, phone, city, and what you need. It goes to our WhatsApp and email. We reply within{" "}
              {site.responseTime}.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <LeadForm key={`${open}-${service}`} defaultService={service} />
          </div>
        </DialogContent>
      </Dialog>
    </LeadDialogContext.Provider>
  );
};

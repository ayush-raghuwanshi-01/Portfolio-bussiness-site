import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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

type LeadDialogContextValue = {
  openLeadDialog: (service?: ServiceOption) => void;
};

const LeadDialogContext = createContext<LeadDialogContextValue | null>(null);

const OPEN_HASHES = new Set(["#book", "#start", "#project"]);

export const useLeadDialog = () => {
  const ctx = useContext(LeadDialogContext);
  if (!ctx) {
    throw new Error("useLeadDialog must be used within LeadDialogProvider");
  }
  return ctx;
};

export const LeadDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceOption>(serviceOptions[0]);
  const location = useLocation();
  const navigate = useNavigate();

  const openLeadDialog = useCallback((next?: ServiceOption) => {
    if (next) setService(next);
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
        <DialogContent className="surface-paper max-h-[90vh] max-w-lg overflow-y-auto rounded-[28px] border-border p-6 sm:rounded-[28px] sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-3xl font-normal tracking-tight">
              Start a project
            </DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed text-foreground/70">
              Name, phone, city, and what you need. It goes to our WhatsApp and email. We reply within{" "}
              {site.responseTime}.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <LeadForm key={`${open}-${service}`} defaultService={service} />
          </div>
        </DialogContent>
      </Dialog>
    </LeadDialogContext.Provider>
  );
};

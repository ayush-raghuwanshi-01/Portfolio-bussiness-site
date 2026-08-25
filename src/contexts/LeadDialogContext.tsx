import { createContext, useContext } from "react";
import type { ServiceOption } from "@/lib/site";

export type LeadDialogContextValue = {
  openLeadDialog: (service?: ServiceOption) => void;
};

export const LeadDialogContext = createContext<LeadDialogContextValue | null>(null);

export const useLeadDialog = () => {
  const ctx = useContext(LeadDialogContext);
  if (!ctx) {
    throw new Error("useLeadDialog must be used within LeadDialogProvider");
  }
  return ctx;
};

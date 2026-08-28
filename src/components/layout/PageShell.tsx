import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CursorGlow } from "@/components/site/CursorGlow";
import { LeadDialogProvider } from "@/components/site/LeadDialog";
import { SocialRail } from "@/components/site/SocialRail";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <LeadDialogProvider>
    <div className="relative min-h-screen overflow-x-clip">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <SocialRail />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  </LeadDialogProvider>
);

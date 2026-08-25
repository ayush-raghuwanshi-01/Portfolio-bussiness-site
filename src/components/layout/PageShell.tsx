import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen overflow-x-clip">
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <ScrollProgress />
    <Navbar />
    <main id="main">{children}</main>
    <Footer />
    <WhatsAppFab />
  </div>
);

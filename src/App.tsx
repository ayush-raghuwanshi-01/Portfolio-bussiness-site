import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const Index = lazy(() => import("./pages/Index.tsx"));
const ServicesPage = lazy(() => import("./pages/Services.tsx"));
const WorkPage = lazy(() => import("./pages/Work.tsx"));
const AboutPage = lazy(() => import("./pages/About.tsx"));
const ContactPage = lazy(() => import("./pages/Contact.tsx"));
const PrivacyPage = lazy(() => import("./pages/Privacy.tsx"));
const TermsPage = lazy(() => import("./pages/Terms.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center pt-28" role="status" aria-live="polite">
    <span className="text-sm text-foreground/50">Loading…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageShell>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

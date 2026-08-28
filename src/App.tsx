import { lazy, Suspense, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackButtonToHome } from "@/components/layout/BackButtonToHome";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = lazy(() => import("./pages/Index.tsx"));
const ServicesPage = lazy(() => import("./pages/Services.tsx"));
const WorkPage = lazy(() => import("./pages/Work.tsx"));
const AboutPage = lazy(() => import("./pages/About.tsx"));
const ContactPage = lazy(() => import("./pages/Contact.tsx"));
const PrivacyPage = lazy(() => import("./pages/Privacy.tsx"));
const TermsPage = lazy(() => import("./pages/Terms.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const RouteFallback = () => (
  <div
    className="flex min-h-[50vh] items-center justify-center pt-28"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <span className="text-sm text-foreground/50">Loading…</span>
  </div>
);

const App = () => {
  // Stable QueryClient — avoids re-creating on HMR/rerenders (pattern from
  // TanStack docs). Production-safe defaults: no window refocus refetch
  // (keeps the lead form state stable), capped retries.
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
    [],
  );

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider delayDuration={200}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <BackButtonToHome />
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
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

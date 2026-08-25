const isRealGaId = (id: string | undefined) =>
  Boolean(id && /^G-[A-Z0-9]+$/i.test(id) && !id.includes("XXXX"));

export const initAnalytics = () => {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (typeof window === "undefined" || !isRealGaId(id)) return;

  const existing = document.querySelector(`script[src*="gtag/js?id=${id}"]`);
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

export const AnalyticsEvents = {
  HERO_CTA_CLICKED: "hero_cta_click",
  HERO_SECONDARY_CLICKED: "hero_secondary_click",
  SERVICES_CTA_CLICKED: "services_cta_click",
  BOOKING_FORM_SUBMITTED: "booking_form_submit",
  CONTACT_FORM_SUBMITTED: "contact_form_submit",
  LEAD_FORM_SUBMITTED: "lead_form_submit",
  WHATSAPP_CLICKED: "whatsapp_click",
  CALL_CLICKED: "call_click",
  NAV_CTA_CLICKED: "nav_cta_click",
  PROJECT_CLICKED: "project_click",
  PRICING_TIER_CLICKED: "pricing_tier_click",
} as const;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

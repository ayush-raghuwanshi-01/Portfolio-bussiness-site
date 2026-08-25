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

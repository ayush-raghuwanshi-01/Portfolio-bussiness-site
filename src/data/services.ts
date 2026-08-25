import type { LucideIcon } from "lucide-react";
import { AppWindow, Cloud, Smartphone } from "lucide-react";
import visualSaas from "@/assets/brand/visual-saas.jpg";
import visualWeb from "@/assets/brand/visual-web.jpg";
import visualMobile from "@/assets/brand/visual-mobile.jpg";

export type ServiceId = "saas" | "web" | "mobile";

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  featured?: boolean;
  features: string[];
  cta: string;
  service: ServiceId | "custom";
};

export type ServicePillar = {
  id: ServiceId;
  icon: LucideIcon;
  name: string;
  short: string;
  summary: string;
  description: string;
  image: string;
  startingFrom: string;
  deliverables: string[];
  stack: string[];
  process: string[];
};

export const services: ServicePillar[] = [
  {
    id: "saas",
    icon: Cloud,
    name: "SaaS Engineering",
    short: "Multi-tenant products that bill, onboard, and scale.",
    summary:
      "From first paying customer to a durable platform — auth, billing, admin, APIs, and the cloud path to grow.",
    description:
      "We design and engineer SaaS products the way a founding product team would: multi-tenant from day one, metered or seat-based billing, role-aware admin, and a release cadence you can demo every week. No throwaway MVPs that have to be rewritten after the first ten customers.",
    image: visualSaas,
    startingFrom: "₹1,49,999 / $2,499",
    deliverables: [
      "Product architecture & domain model",
      "Multi-tenant auth, orgs, and roles",
      "Stripe billing, plans, and invoices",
      "Admin + customer dashboards",
      "Public or private API",
      "Observability, staging, and launch",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    process: [
      "Map the tenant model and monetization",
      "Ship a thin vertical slice to staging",
      "Harden billing, roles, and audit trails",
      "Launch with analytics and runbooks",
    ],
  },
  {
    id: "web",
    icon: AppWindow,
    name: "Web App Development",
    short: "Custom web apps and high-converting product sites.",
    summary:
      "Dashboards, internal tools, and marketing sites that feel like a product — fast, accessible, and ready to rank.",
    description:
      "We build the web surfaces your team and customers actually live in: customer portals, ops consoles, and conversion-ready product sites. Performance, SEO, and design system discipline are part of the build, not a phase after launch.",
    image: visualWeb,
    startingFrom: "₹49,999 / $799",
    deliverables: [
      "UX flows and component system",
      "Responsive production frontend",
      "CMS or admin where it earns its keep",
      "Forms, auth, and integrations",
      "Core Web Vitals and technical SEO",
      "Analytics and conversion tracking",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    process: [
      "Clarify jobs-to-be-done and sitemap",
      "Design the system, not one-off pages",
      "Build against real content and data",
      "Ship, measure, and iterate",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile App Development",
    short: "iOS and Android apps from one React Native codebase.",
    summary:
      "Store-ready mobile products — offline-tolerant, push-aware, and designed for the hand, not a shrunk website.",
    description:
      "We ship cross-platform apps with React Native and Expo when speed matters, and drop to native modules when the product needs it. Onboarding, notifications, payments, and App Store / Play launch are in the same engagement — not a surprise invoice later.",
    image: visualMobile,
    startingFrom: "₹99,999 / $1,499",
    deliverables: [
      "iOS + Android from one codebase",
      "Auth, profiles, and push notifications",
      "Offline-tolerant local state",
      "Payments and in-app purchases",
      "App Store and Play Console launch",
      "Crash reporting and a release train",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase"],
    process: [
      "Define the mobile-critical journeys",
      "Prototype on-device, not just in Figma",
      "Build, test on real hardware",
      "Submit, review, and support launch week",
    ],
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "web",
    name: "Web App",
    price: "From ₹49,999",
    period: "fixed-scope start",
    tagline: "Sites, portals, and internal tools",
    service: "web",
    features: [
      "Up to 8 production screens",
      "Design system + responsive UI",
      "CMS or admin for content",
      "SEO and analytics baseline",
      "2 weeks of launch support",
    ],
    cta: "Start a web build",
  },
  {
    id: "mobile",
    name: "Mobile App",
    price: "From ₹99,999",
    period: "iOS + Android",
    tagline: "Store-ready companion or standalone app",
    service: "mobile",
    features: [
      "React Native app, both stores",
      "Auth, push, and core flows",
      "API integration",
      "TestFlight / internal testing",
      "Store listing support",
    ],
    cta: "Start a mobile build",
  },
  {
    id: "saas",
    name: "SaaS MVP",
    price: "From ₹1,49,999",
    period: "product slice to first revenue",
    tagline: "The platform your customers log into",
    featured: true,
    service: "saas",
    features: [
      "Multi-tenant architecture",
      "Auth, roles, and admin",
      "Stripe billing",
      "Customer dashboard",
      "Staging + production launch",
    ],
    cta: "Scope a SaaS MVP",
  },
  {
    id: "custom",
    name: "Studio Pod",
    price: "Let's talk",
    period: "monthly or multi-phase",
    tagline: "A dedicated engineering pod",
    service: "custom",
    features: [
      "Named lead + weekly demos",
      "Mixed SaaS, web, and mobile",
      "Roadmap and backlog ownership",
      "Priority Slack / WhatsApp",
      "Retainer or milestone billing",
    ],
    cta: "Book a consultation",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);

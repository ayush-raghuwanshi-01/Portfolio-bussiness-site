import type { LucideIcon } from "lucide-react";
import { AppWindow, Cloud, Layers, Smartphone } from "lucide-react";
import visualWeb from "@/assets/brand/visual-web.jpg";
import visualMobile from "@/assets/brand/visual-mobile.jpg";
import visualSaas from "@/assets/brand/visual-saas.jpg";
import visualCloud from "@/assets/brand/visual-cloud.jpg";

export type ServiceId = "web" | "mobile" | "saas" | "cloud";

export const serviceLabels: Record<ServiceId, string> = {
  web: "Web",
  mobile: "Mobile",
  saas: "SaaS",
  cloud: "Cloud",
};

export type OfferTier = {
  id: string;
  name: string;
  offer: string;
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
  offer: string;
  deliverables: string[];
  stack: string[];
  deepDive: string[];
};

export const services: ServicePillar[] = [
  {
    id: "web",
    icon: AppWindow,
    name: "Web Apps",
    short: "Product sites and custom web software your customers actually use.",
    summary: "Portals, dashboards, and conversion-ready websites — fast, clear, and built to grow with you.",
    description:
      "We design and build the web surfaces your team and customers live in: customer portals, ops consoles, and marketing sites that feel like a product. Performance, SEO, and a design system are part of the build.",
    image: visualWeb,
    offer: "30% OFF first web build",
    deliverables: [
      "UX flows and a reusable component system",
      "Responsive production frontend",
      "Auth, roles, and form-heavy workflows",
      "CMS or admin where it earns its keep",
      "Technical SEO and analytics",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    deepDive: [
      "Customer portals and admin consoles",
      "Marketing sites that share the product system",
      "Internal tools that replace spreadsheet ops",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile Apps",
    short: "iOS and Android from one codebase — designed for the hand.",
    summary: "Store-ready mobile products with auth, push, and the API they need to stay useful.",
    description:
      "We ship cross-platform apps with React Native so you launch on iOS and Android together. Onboarding, notifications, payments, and store submission sit in the same engagement.",
    image: visualMobile,
    offer: "30% OFF first mobile app",
    deliverables: [
      "iOS + Android from one codebase",
      "Auth, profiles, and push notifications",
      "Payments and core product flows",
      "App Store and Play Console launch support",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Node.js"],
    deepDive: [
      "Companion apps for an existing product",
      "Standalone consumer or ops apps",
      "Store listing and launch-week support",
    ],
  },
  {
    id: "saas",
    icon: Layers,
    name: "Software as a Service (SaaS)",
    short: "Multi-tenant products that onboard, bill, and scale.",
    summary: "The platform your customers log into — auth, roles, billing, and an admin they can run.",
    description:
      "We engineer SaaS the way a founding product team would: multi-tenant from day one, seat or plan billing, role-aware admin, and a weekly release cadence you can demo.",
    image: visualSaas,
    offer: "30% OFF first SaaS slice",
    deliverables: [
      "Product architecture and tenant model",
      "Auth, organisations, and roles",
      "Billing, plans, and invoices",
      "Admin + customer dashboards",
      "Staging and production launch",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    deepDive: [
      "First paying-customer MVP",
      "Billing and plan management",
      "Admin tools your team can run",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "Cloud Management",
    short: "Cloud your small team can actually operate.",
    summary: "Environments, deploys, monitoring, and the path from staging to production — without a mystery bill.",
    description:
      "We set up and look after the cloud path your product needs: environments, secrets, deploys, logs, and rollback. You own the accounts. We keep them readable.",
    image: visualCloud,
    offer: "30% OFF first cloud setup",
    deliverables: [
      "Environment and access sketch",
      "CI/CD with staging",
      "Secrets, roles, and least privilege",
      "Logs, checks, and a rollback runbook",
    ],
    stack: ["AWS", "Docker", "GitHub Actions", "PostgreSQL"],
    deepDive: [
      "Greenfield product on AWS",
      "Rescue a fragile single-box deploy",
      "Ongoing cloud hygiene",
    ],
  },
];

export const offerTiers: OfferTier[] = [
  {
    id: "web",
    name: "Web Apps",
    offer: "30% OFF",
    tagline: "Sites, portals, and internal tools",
    service: "web",
    features: [
      "Design system + responsive UI",
      "CMS or admin for content",
      "SEO and analytics baseline",
      "Launch support window",
    ],
    cta: "Start a web project",
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    offer: "30% OFF",
    tagline: "iOS + Android, one codebase",
    service: "mobile",
    features: [
      "Core product flows",
      "Auth and push",
      "Store listing support",
      "Launch-week coverage",
    ],
    cta: "Start a mobile project",
  },
  {
    id: "saas",
    name: "SaaS",
    offer: "30% OFF",
    tagline: "The product your customers log into",
    featured: true,
    service: "saas",
    features: [
      "Multi-tenant architecture",
      "Auth, roles, and admin",
      "Billing-ready foundation",
      "Staging + production launch",
    ],
    cta: "Start a SaaS project",
  },
  {
    id: "cloud",
    name: "Cloud Management",
    offer: "30% OFF",
    tagline: "A cloud path you can run",
    service: "cloud",
    features: [
      "Environments and deploys",
      "Monitoring basics",
      "Secrets and access",
      "A written runbook",
    ],
    cta: "Start a cloud project",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);

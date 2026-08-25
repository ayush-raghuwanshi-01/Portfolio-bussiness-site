import type { LucideIcon } from "lucide-react";
import { AppWindow, Cloud, Smartphone, Sparkles } from "lucide-react";
import visualWeb from "@/assets/brand/visual-web.jpg";
import visualMobile from "@/assets/brand/visual-mobile.jpg";
import visualAi from "@/assets/brand/visual-ai.jpg";
import visualCloud from "@/assets/brand/visual-cloud.jpg";

export type ServiceId = "saas" | "web" | "mobile" | "ai" | "cloud";

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
  id: Exclude<ServiceId, "saas">;
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
  deepDive: string[];
};

export const services: ServicePillar[] = [
  {
    id: "web",
    icon: AppWindow,
    name: "Web Apps",
    short: "Custom software and product sites that feel native to the browser.",
    summary:
      "Customer portals, ops consoles, and SaaS front-ends — fast, accessible, and ready to rank.",
    description:
      "We engineer the web surfaces your team and customers live in: multi-tenant SaaS UIs, internal tools, and conversion-ready product sites. Performance, SEO, and a design system are part of the build, not a cleanup sprint after launch.",
    image: visualWeb,
    startingFrom: "₹49,999 / $799",
    deliverables: [
      "UX flows and a reusable component system",
      "Responsive production frontend",
      "Auth, roles, and form-heavy workflows",
      "CMS or admin where it earns its keep",
      "Core Web Vitals and technical SEO",
      "Analytics and conversion tracking",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    process: [
      "Clarify jobs-to-be-done and sitemap",
      "Design the system, not one-off pages",
      "Build against real content and data",
      "Ship, measure, and iterate",
    ],
    deepDive: [
      "SaaS dashboards and multi-tenant admin",
      "Marketing sites that share the product system",
      "Internal tools that replace spreadsheet ops",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile Apps",
    short: "iOS and Android from one codebase — designed for the hand.",
    summary:
      "Store-ready mobile products: offline-tolerant, push-aware, and launched with the API they need.",
    description:
      "We ship cross-platform apps with React Native and Expo when speed matters, and drop to native modules when the product needs it. Flutter is on the table when your existing app already lives there. Onboarding, notifications, payments, and store submission sit in the same engagement.",
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
    stack: ["React Native", "Expo", "TypeScript", "Flutter", "Firebase", "Node.js"],
    process: [
      "Define the mobile-critical journeys",
      "Prototype on-device, not only in Figma",
      "Build and test on real hardware",
      "Submit, review, and support launch week",
    ],
    deepDive: [
      "Companion apps for an existing SaaS",
      "Standalone consumer or ops apps",
      "Store listing, review, and launch week",
    ],
  },
  {
    id: "ai",
    icon: Sparkles,
    name: "AI Engineering",
    short: "Models inside real products — not a chatbot bolted on after.",
    summary:
      "Private-data assistants, document pipelines, and workflow agents wired into the software you already run.",
    description:
      "We put applied AI where it changes an operator’s day: retrieval over your warehouse, structured extraction, and guarded agents. Data stays in your boundary. We will also tell you when a rules engine is the better product.",
    image: visualAi,
    startingFrom: "₹99,999 / $1,499",
    deliverables: [
      "Use-case and data-boundary workshop",
      "Retrieval / extraction / agent slice",
      "Guardrails, evals, and audit logs",
      "Product UI for the human in the loop",
      "API into your existing app",
      "Cost and latency budget",
    ],
    stack: ["Python", "FastAPI", "TypeScript", "PostgreSQL", "OpenAI / open models", "AWS"],
    process: [
      "Name the job and the data you can actually use",
      "Ship a thin, measurable slice",
      "Add evals before you scale spend",
      "Harden and hand off with runbooks",
    ],
    deepDive: [
      "Private Q&A over company data",
      "Document intake and classification",
      "Ops agents with a human approval step",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "Cloud Architecture",
    short: "AWS-shaped infrastructure that a small team can actually run.",
    summary:
      "Environments, CI, observability, and the path from staging to production — without a mystery bill.",
    description:
      "We design the cloud path your product needs: environments, secrets, deploys, logs, and rollback. SaaS multi-tenant data models and Spring Boot / Node services land on the same pipeline. You own the accounts.",
    image: visualCloud,
    startingFrom: "₹79,999 / $999",
    deliverables: [
      "Environment and network sketch",
      "CI/CD with preview or staging",
      "Secrets, roles, and least privilege",
      "Logs, traces, and uptime checks",
      "Backup and rollback runbook",
      "Cost baseline you can read",
    ],
    stack: ["AWS", "Docker", "GitHub Actions", "PostgreSQL", "Node.js", "Spring Boot"],
    process: [
      "Inventory what you already run",
      "Draw the smallest reliable topology",
      "Automate the path to production",
      "Document who does what at 2am",
    ],
    deepDive: [
      "Greenfield SaaS on AWS",
      "Rescue a fragile single-box deploy",
      "Observability and incident basics",
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
    name: "SaaS + AI",
    price: "From ₹1,49,999",
    period: "product slice to first revenue",
    tagline: "The platform your customers log into",
    featured: true,
    service: "saas",
    features: [
      "Multi-tenant architecture",
      "Auth, roles, and admin",
      "Stripe billing or metered usage",
      "Optional AI slice with evals",
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
      "Web, mobile, AI, and cloud",
      "Roadmap and backlog ownership",
      "Priority Slack / WhatsApp",
      "Retainer or milestone billing",
    ],
    cta: "Book a consultation",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);

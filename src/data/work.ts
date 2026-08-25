import asklytics from "@/assets/asklytics-project.jpg";
import ecommerce from "@/assets/Ecommerse-project.jpg";
import gym from "@/assets/gym-project.jpg";
import prabha from "@/assets/project-prabha.jpg";
import mobileGym from "@/assets/brand/mobile-gym-app.jpg";
import visualSaas from "@/assets/brand/visual-saas.jpg";
import visualWeb from "@/assets/brand/visual-web.jpg";
import type { ServiceId } from "@/data/services";

export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  types: ServiceId[];
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  href?: string;
  cover: string;
  gallery: string[];
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "asklytics",
    title: "Asklytics",
    client: "Asklytics.in",
    types: ["saas"],
    problem:
      "Operators needed answers from private business data without waiting on an analyst — or sending that data to a public model.",
    solution:
      "We engineered a multi-tenant analytics SaaS: natural-language questions over connected warehouses, role-aware workspaces, and a React + FastAPI core that keeps data inside the customer's boundary.",
    outcome: "Live product at asklytics.in — from spec to a shippable SaaS workspace.",
    stack: ["React", "FastAPI", "PostgreSQL", "AI", "Cloud"],
    href: "https://asklytics.in",
    cover: asklytics,
    gallery: [asklytics, visualSaas],
    featured: true,
  },
  {
    id: "digital-lift",
    title: "YourDigitalLift",
    client: "Gym operations SaaS",
    types: ["saas", "mobile"],
    problem:
      "Independent gyms were running memberships, reminders, and attendance across spreadsheets and WhatsApp threads.",
    solution:
      "A founder-priced operations platform for billing, attendance, and retention — plus a member mobile app for check-in, classes, and QR access.",
    outcome: "Web console and member app designed as one product, not a bolted-on afterthought.",
    stack: ["React", "React Native", "FastAPI", "PostgreSQL", "Stripe"],
    cover: gym,
    gallery: [gym, mobileGym],
    featured: true,
  },
  {
    id: "commerce-engine",
    title: "Modular commerce storefront",
    client: "Direct-to-consumer brand",
    types: ["web"],
    problem:
      "The brand needed a storefront that could take new catalogs and payment rails without a full rebuild each season.",
    solution:
      "A componentized React storefront with category merchandising, a fast checkout path, and SEO-aware product pages.",
    outcome: "A maintainable commerce UI the team can extend without starting over.",
    stack: ["React", "TypeScript", "Stripe", "SEO"],
    cover: ecommerce,
    gallery: [ecommerce, visualWeb],
    featured: true,
  },
  {
    id: "prabha",
    title: "Prabha Foundation",
    client: "Nonprofit",
    types: ["web"],
    problem:
      "A purpose-driven organization needed a site that could tell the story and take action — donations and member onboarding — without agency theater.",
    solution:
      "An editorial web experience with donation-ready flows, clear information architecture, and a CMS the team can actually use.",
    outcome: "A public-facing home that supports fundraising and onboarding in one place.",
    stack: ["Next.js", "Tailwind", "CMS"],
    cover: prabha,
    gallery: [prabha, visualWeb],
  },
];

export const workFilters: { id: "all" | ServiceId; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "saas", label: "SaaS" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
];

export const featuredWork = caseStudies.filter((c) => c.featured);

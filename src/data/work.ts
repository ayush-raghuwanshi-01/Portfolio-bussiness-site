import asklytics from "@/assets/asklytics-project.jpg";
import ecommerce from "@/assets/Ecommerse-project.jpg";
import gym from "@/assets/gym-project.jpg";
import prabha from "@/assets/project-prabha.jpg";
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
  cover: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "asklytics",
    title: "Asklytics",
    client: "Analytics workspace",
    types: ["saas", "cloud"],
    problem:
      "Operators needed answers from private business data without waiting on an analyst.",
    solution:
      "A multi-tenant analytics SaaS with role-aware workspaces and a React + FastAPI core.",
    outcome: "A shippable SaaS workspace — from spec to production-ready product.",
    stack: ["React", "FastAPI", "PostgreSQL", "AWS"],
    cover: asklytics,
    featured: true,
  },
  {
    id: "digital-lift",
    title: "YourDigitalLift",
    client: "Gym operations platform",
    types: ["saas", "mobile"],
    problem:
      "Independent gyms were running memberships, reminders, and attendance across spreadsheets and WhatsApp.",
    solution:
      "An operations platform for billing, attendance, and retention — plus a member mobile app for check-in and classes.",
    outcome: "Web console and member app designed as one product.",
    stack: ["React", "React Native", "PostgreSQL", "Stripe"],
    cover: gym,
    featured: true,
  },
  {
    id: "commerce-engine",
    title: "Modular commerce storefront",
    client: "Direct-to-consumer brand",
    types: ["web"],
    problem:
      "The brand needed a storefront that could take new catalogs without a full rebuild each season.",
    solution:
      "A componentized React storefront with category merchandising and a fast checkout path.",
    outcome: "A maintainable commerce UI the team can extend.",
    stack: ["React", "TypeScript", "Stripe"],
    cover: ecommerce,
    featured: true,
  },
  {
    id: "prabha",
    title: "Prabha Foundation",
    client: "Nonprofit",
    types: ["web"],
    problem:
      "A purpose-driven organization needed a site that could tell the story and take donations.",
    solution:
      "An editorial web experience with donation-ready flows and a CMS the team can use.",
    outcome: "A public home that supports fundraising and onboarding.",
    stack: ["Next.js", "Tailwind", "CMS"],
    cover: prabha,
    featured: true,
  },
];

export const featuredWork = caseStudies.filter((c) => c.featured);

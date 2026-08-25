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
  /** Honest label: studio/spec work until a paying client is named. */
  kind: "studio" | "client";
};

export const caseStudies: CaseStudy[] = [
  {
    id: "asklytics",
    title: "Asklytics",
    client: "Studio build",
    kind: "studio",
    types: ["software"],
    problem: "Operators needed answers from private business data without waiting on an analyst.",
    solution: "A multi-tenant analytics workspace with roles, built in React and FastAPI.",
    outcome: "A working product we use to show how we design software — not a paid client case study.",
    stack: ["React", "FastAPI", "PostgreSQL"],
    cover: asklytics,
    featured: true,
  },
  {
    id: "digital-lift",
    title: "YourDigitalLift",
    client: "Studio build",
    kind: "studio",
    types: ["software", "mobile"],
    problem: "Independent gyms were running memberships, reminders, and attendance on spreadsheets and WhatsApp.",
    solution: "An operations console for billing and attendance, plus a member app for check-in and classes.",
    outcome: "Web and mobile designed as one product. Shown here as studio work.",
    stack: ["React", "React Native", "PostgreSQL"],
    cover: gym,
    featured: true,
  },
  {
    id: "commerce-engine",
    title: "Modular storefront",
    client: "Studio build",
    kind: "studio",
    types: ["web"],
    problem: "A catalogue that changes every season should not need a full rebuild.",
    solution: "A componentised React storefront with merchandising and a short checkout path.",
    outcome: "A maintainable commerce layout the team can extend.",
    stack: ["React", "TypeScript"],
    cover: ecommerce,
    featured: true,
  },
  {
    id: "prabha",
    title: "Prabha Foundation",
    client: "Studio build",
    kind: "studio",
    types: ["web"],
    problem: "A purpose-driven organisation needed a public site that could tell the story and take donations.",
    solution: "An editorial website with donation-ready flows and pages the team can update.",
    outcome: "A public home for fundraising and onboarding. Studio / spec work.",
    stack: ["Next.js", "Tailwind"],
    cover: prabha,
    featured: true,
  },
];

export const featuredWork = caseStudies.filter((c) => c.featured);

import type { LucideIcon } from "lucide-react";
import { AppWindow, Smartphone, Workflow } from "lucide-react";
import visualWeb from "@/assets/brand/visual-web.jpg";
import visualMobile from "@/assets/brand/visual-mobile.jpg";
import visualSaas from "@/assets/brand/visual-saas.jpg";

export type ServiceId = "web" | "software" | "mobile";

export const serviceLabels: Record<ServiceId, string> = {
  web: "Website",
  software: "Software",
  mobile: "Mobile",
};

export type ServicePillar = {
  id: ServiceId;
  icon: LucideIcon;
  name: string;
  short: string;
  summary: string;
  description: string;
  image: string;
  priceNote: string;
  deliverables: string[];
  stack: string[];
  deepDive: string[];
};

export const services: ServicePillar[] = [
  {
    id: "web",
    icon: AppWindow,
    name: "Websites",
    short: "A clear site that works on a phone.",
    summary: "Pages for your shop, institute, clinic, or brand — with WhatsApp and a contact form.",
    description:
      "Most businesses here still send people to WhatsApp or a broken Facebook page. We build a simple website: who you are, what you offer, how to reach you. It works on mobile. You own the domain.",
    image: visualWeb,
    priceNote: "From ₹5,000, including one year online.",
    deliverables: [
      "4–6 pages on mobile and desktop",
      "WhatsApp button and contact form",
      "Your name, address, timings, and photos",
      "Domain in your name",
      "One year of hosting included at this starting price",
    ],
    stack: ["React", "Next.js", "TypeScript"],
    deepDive: [
      "New business site",
      "Replace a site that does not work on phone",
      "Coaching, clinic, gym, shop, or office",
    ],
  },
  {
    id: "software",
    icon: Workflow,
    name: "Business software",
    short: "Tools your team can log into every day.",
    summary: "Fees, bookings, stock, members, or a customer portal — built around how you already work.",
    description:
      "If spreadsheets and WhatsApp groups are running the business, we can replace that with a small web app: login, roles, and the few screens you actually need. Price depends on the workflows. We send a written quote after a short call — not a rate card.",
    image: visualSaas,
    priceNote: "Quoted after a 30-minute call.",
    deliverables: [
      "Written scope before we start",
      "Login, roles, and the core workflows",
      "Admin screen your team can use",
      "Staging link every week while we build",
      "You own the repository and accounts",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    deepDive: [
      "Institute or gym operations",
      "Internal tools that replace Excel",
      "A first version customers can log into",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile apps",
    short: "iPhone and Android, when a website is not enough.",
    summary: "One codebase for both stores — only when the product needs to live on the home screen.",
    description:
      "We do not sell an “app” for the price of a website. If your customers need to check in, get reminders, or use the product offline, we build iOS and Android together with React Native. Store listing support is part of the work.",
    image: visualMobile,
    priceNote: "Quoted after a 30-minute call.",
    deliverables: [
      "iOS and Android from one codebase",
      "Sign-in, core screens, and notifications",
      "Help with Play Store and App Store listing",
      "Tied to a web backend you also own",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Node.js"],
    deepDive: [
      "Member or student companion app",
      "Field or shop-floor app",
      "Launch-week store support",
    ],
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);

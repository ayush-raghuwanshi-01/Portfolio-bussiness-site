export const site = {
  name: "ZenWebStudio",
  legalName: "ZenWebStudio",
  shortName: "ZWS",
  tagline: "We build the software your business runs on.",
  headline: "Web apps, mobile apps, SaaS, and cloud — built for your business.",
  description:
    "ZenWebStudio is a product studio that designs and ships web applications, mobile apps, SaaS platforms, and cloud management for founders and growing businesses.",
  url: "https://zenwebstudio.com",
  email: "hello@zenwebstudio.com",
  phoneDisplay: "+91 95845 59972",
  phoneTel: "+919584559972",
  whatsapp: "919584559972",
  location: "India · Remote-first",
  responseTime: "24 hours",
  foundedYear: 2023,
  availability: "Available for new projects",
  offer: "30% OFF",
  offerLabel: "on your first engagement this quarter",
  social: {
    github: "https://github.com/zenwebstudio",
    linkedin: "https://linkedin.com/company/zenwebstudio",
  },
} as const;

export const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const serviceOptions = [
  "Web Apps",
  "Mobile Apps",
  "Software as a Service (SaaS)",
  "Cloud Management",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const serviceOptionById = {
  web: "Web Apps",
  mobile: "Mobile Apps",
  saas: "Software as a Service (SaaS)",
  cloud: "Cloud Management",
} as const;

export const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Stripe",
  "Tailwind CSS",
  "Figma",
] as const;

export const whatsappHref = (message?: string) => {
  const text =
    message ??
    "Hi ZenWebStudio — I'd like to start a project conversation about software we're building.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
};

export const mailHref = (subject = "Project inquiry — ZenWebStudio") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "/" : normalized}`;
};

export const pageTitle = (title?: string) =>
  title ? `${title} — ${site.name}` : `${site.name} — ${site.headline}`;

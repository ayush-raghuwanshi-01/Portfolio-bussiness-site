export const site = {
  name: "ZenWebStudio",
  legalName: "ZenWebStudio",
  shortName: "ZWS",
  tagline: "We build the software your business runs on.",
  headline: "Custom software, web, mobile, and AI — engineered to ship.",
  description:
    "ZenWebStudio is a product engineering studio that designs and ships custom software, modern web applications, mobile apps, applied AI, and cloud architecture for founders and growing businesses.",
  url: "https://zenwebstudio.com",
  email: "hello@zenwebstudio.com",
  phoneDisplay: "+91 95845 59972",
  phoneTel: "+919584559972",
  whatsapp: "919584559972",
  location: "India · Remote-first",
  responseTime: "24 hours",
  foundedYear: 2023,
  availability: "Available for new projects",
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
  "Web App Development",
  "Mobile App Development",
  "AI Engineering",
  "Cloud Architecture",
  "SaaS Engineering",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under ₹50k / $600",
  "₹50k – ₹2L / $600–$2.4k",
  "₹2L – ₹8L / $2.4k–$10k",
  "₹8L+ / $10k+",
  "Not sure yet",
] as const;

export const bookingTimes = ["10:00", "12:00", "14:00", "16:00", "18:00"] as const;

export const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "Flutter",
  "Node.js",
  "Python",
  "Spring Boot",
  "PostgreSQL",
  "AWS",
  "FastAPI",
  "Stripe",
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

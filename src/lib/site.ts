export const site = {
  name: "Zenvio Labs",
  legalName: "Zenvio Labs",
  shortName: "Zenvio",
  tagline: "Websites and software for your business.",
  headline: "Websites and business software, built for growing companies.",
  description:
    "Zenvio Labs builds websites and business software for shops, institutes, clinics, and growing companies across India. Websites start at ₹5,000.",
  url: "https://zenwebstudio.com",
  email: "zenwebstudio.in@gmail.com",
  phoneDisplay: "+91 95845 59972",
  phoneTel: "+919584559972",
  whatsapp: "919584559972",
  location: "India",
  locationLine: "India · work nationwide",
  city: "India",
  region: "India",
  country: "India",
  responseTime: "24 hours",
  availability: "Taking new work",
  startingPrice: "₹5,000",
  startingPriceNote: "Websites start at ₹5,000 for one year online.",
  social: {
    github: "",
    linkedin: "",
  },
} as const;

export const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const serviceOptions = [
  "Website",
  "Business software",
  "Mobile app",
  "Not sure",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const serviceOptionById = {
  web: "Website",
  software: "Business software",
  mobile: "Mobile app",
} as const;

export const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Tailwind CSS",
] as const;

export const whatsappHref = (message?: string) => {
  const text =
    message ??
    "Hi Zenvio Labs — I would like a website / software for my business.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
};

export const mailHref = (subject = "Project enquiry — Zenvio Labs") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "/" : normalized}`;
};

export const pageTitle = (title?: string) =>
  title ? `${title} — ${site.name}` : `${site.name} — ${site.headline}`;

export const formatLeadMessage = (lead: {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  message?: string;
  source?: string;
}) =>
  [
    "New enquiry — Zenvio Labs",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone || "—"}`,
    `Email: ${lead.email || "—"}`,
    `City: ${lead.city || "—"}`,
    `Need: ${lead.service || "—"}`,
    lead.message ? `Details: ${lead.message}` : null,
    `Source: ${lead.source || "website"}`,
  ]
    .filter(Boolean)
    .join("\n");

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Ayush Raghuwanshi",
    role: "Co-founder & tech lead",
    focus: "Scope, web platforms, and delivery.",
    initials: "AR",
  },
  {
    name: "Deepak Tripathi",
    role: "Co-founder & lead engineer",
    focus: "Full-stack systems and reliability.",
    initials: "DT",
  },
  {
    name: "Shubham Mishra",
    role: "Engineer",
    focus: "Product features and practical AI inside real software.",
    initials: "SM",
  },
];

export const values = [
  {
    title: "Say the price",
    body: "If we can quote it, we do. If we cannot, we say so and book a call. We do not hide behind “get a proposal”.",
  },
  {
    title: "Ship something you can open",
    body: "You get a link, not a slide deck. Websites in days. Software in weeks, with a demo each week.",
  },
  {
    title: "Refuse the wrong job",
    body: "We will tell you when a Play Store app is the wrong spend, or when a ₹5,000 site is enough.",
  },
  {
    title: "You own the work",
    body: "Domain, code, and cloud accounts stay in your name. We work inside them.",
  },
];

export const principles = [
  "Plain language in scope and WhatsApp — no filler",
  "Mobile-first websites; software only when it earns its keep",
  "TypeScript for web, mobile, and API",
  "You own domain, repo, and accounts before we call it launched",
  "A human reply within 24 hours",
];

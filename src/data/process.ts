export const processSteps = [
  {
    id: "discovery",
    n: "01",
    title: "Discovery",
    duration: "3–5 days",
    body: "We map users, constraints, success metrics, and the thinnest product still worth shipping. You leave with a written scope, stack, and timeline — not a vague estimate.",
    points: ["Stakeholder workshop", "Technical constraints", "Written scope + price"],
  },
  {
    id: "architecture",
    n: "02",
    title: "Architecture",
    duration: "1–2 weeks",
    body: "Domain model, information architecture, and the system the build will sit on. Mobile journeys are prototyped on a device, not only in a desktop frame.",
    points: ["System + data model", "UI system", "Clickable prototype"],
  },
  {
    id: "development",
    n: "03",
    title: "Development",
    duration: "3–10 weeks",
    body: "Weekly demos on staging. You talk to the engineers. Scope changes are explicit. Tests, accessibility, and performance are part of done.",
    points: ["Weekly staging demos", "Named engineering lead", "CI on every pull request"],
  },
  {
    id: "deployment",
    n: "04",
    title: "Deployment",
    duration: "1 week + hypercare",
    body: "Production cutover, observability, store submission when it is a mobile app, and a runbook. We stay on the line through the first real users.",
    points: ["Deploy + observability", "Store / domain launch", "Handoff + support window"],
  },
] as const;

export const differentiators = [
  {
    title: "Speed without the rewrite",
    body: "We ship a vertical slice early, then harden it. Fast does not mean disposable.",
  },
  {
    title: "A lead who picks up",
    body: "WhatsApp, email, or a call — you talk to the people building the product, not a ticket queue.",
  },
  {
    title: "Founder-friendly pricing",
    body: "Published starting points. Milestone billing. No agency markup for account management you did not ask for.",
  },
  {
    title: "One studio, four surfaces",
    body: "Web, mobile, applied AI, and cloud are designed as one system so your customer does not feel the seams.",
  },
];

export const trustBadges = [
  { label: "Available for new projects", tone: "live" as const },
  { label: "Written scope before kickoff", tone: "neutral" as const },
  { label: "You own the repository", tone: "neutral" as const },
  { label: "Reply within 24 hours", tone: "neutral" as const },
];

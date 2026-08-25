export const processSteps = [
  {
    id: "discovery",
    n: "01",
    title: "Discovery",
    duration: "3–5 days",
    body: "We map users, constraints, success metrics, and the thinnest product that is still worth shipping. You leave with a written scope, stack, and timeline — not a vague estimate.",
    points: ["Stakeholder workshop", "Technical constraints", "Written scope + price"],
  },
  {
    id: "design",
    n: "02",
    title: "Design",
    duration: "1–2 weeks",
    body: "Information architecture, core flows, and a component system. Mobile journeys are prototyped on a device, not only in a desktop frame.",
    points: ["Flows & IA", "UI system", "Clickable prototype"],
  },
  {
    id: "build",
    n: "03",
    title: "Build",
    duration: "3–10 weeks",
    body: "Weekly demos on staging. You talk to the engineers. Scope changes are explicit. Quality bars — tests, a11y, performance — are part of done.",
    points: ["Weekly staging demos", "Named engineering lead", "CI on every pull request"],
  },
  {
    id: "launch",
    n: "04",
    title: "Launch",
    duration: "1 week + hypercare",
    body: "Production cutover, analytics, store submission when it is a mobile app, and a runbook. We stay on the line through the first real users.",
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
    title: "One studio, three surfaces",
    body: "SaaS, web, and mobile are designed as one system so your customer does not feel the seams.",
  },
];

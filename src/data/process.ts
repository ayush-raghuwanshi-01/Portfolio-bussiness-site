export const processSteps = [
  {
    id: "brief",
    n: "01",
    title: "Brief",
    duration: "Same day",
    body: "You tell us what the business does and what you need on the site or in the software. We reply within 24 hours with a clear next step.",
    points: ["Form or WhatsApp", "What you need, in plain words", "Price band or a call"],
  },
  {
    id: "scope",
    n: "02",
    title: "Scope",
    duration: "1–3 days",
    body: "For a simple website this is short. For software we write down screens, timeline, and price before any build. You approve in writing.",
    points: ["Written list of pages or screens", "What is not included", "Advance to start"],
  },
  {
    id: "build",
    n: "03",
    title: "Build",
    duration: "Days to weeks",
    body: "You see a link you can open on your phone. Changes are listed, not guessed. You talk to the person building it.",
    points: ["Staging link", "Named person", "No surprise features"],
  },
  {
    id: "launch",
    n: "04",
    title: "Launch",
    duration: "Go-live + 14 days",
    body: "The site or app goes live on your domain. We stay available for two weeks for small fixes. After that you can continue with a care plan or run it yourself.",
    points: ["Your domain", "WhatsApp and form tested", "14-day support window"],
  },
] as const;

export const differentiators = [
  {
    title: "A price you can say out loud",
    body: "Websites start at ₹5,000. Software is quoted in writing. No 30% theatre, no hidden retainers to begin.",
  },
  {
    title: "You talk to the builders",
    body: "WhatsApp, email, or a call — a founder or engineer, not a ticket queue.",
  },
  {
    title: "Based in India",
    body: "We work with clients anywhere in India. WhatsApp, email, or a call — you talk to the builders.",
  },
  {
    title: "You keep the keys",
    body: "Domain, code, and accounts stay in your name. We are a studio, not a lock-in.",
  },
];

export const trustBadges = [
  { label: "Taking new work", tone: "live" as const },
  { label: "Written scope before software work", tone: "neutral" as const },
  { label: "You own the domain", tone: "neutral" as const },
  { label: "Reply within 24 hours", tone: "neutral" as const },
];

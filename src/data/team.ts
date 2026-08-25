export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Ayush Raghuwanshi",
    role: "Co-Founder & Tech Lead",
    focus: "Product architecture, web platforms, and delivery.",
    initials: "AR",
  },
  {
    name: "Deepak Tripathi",
    role: "Co-Founder & Lead Engineer",
    focus: "Full-stack systems, SaaS backends, and reliability.",
    initials: "DT",
  },
  {
    name: "Shubham Mishra",
    role: "AI & Applied ML Engineer",
    focus: "Practical model integration inside real products.",
    initials: "SM",
  },
];

export const values = [
  {
    title: "Ship in weeks, not quarters",
    body: "A small studio means short feedback loops. You see working software every week — not a slide deck about software.",
  },
  {
    title: "Transparent by default",
    body: "Scope, stack, and price are written down before we start. If something changes, you hear it from the people writing the code.",
  },
  {
    title: "Product thinking, not ticket-taking",
    body: "We challenge weak requirements. The job is a product customers can use, not a backlog of disconnected tasks.",
  },
  {
    title: "You own the work",
    body: "Repos, keys, designs, and cloud accounts stay in your name. We are a studio, not a hostage situation.",
  },
];

export const principles = [
  "Type-safe TypeScript across web, mobile, and API",
  "Design systems instead of one-off screens",
  "Multi-tenant and billing considered on day one for SaaS",
  "Observability, staging, and rollbacks before launch",
  "Accessibility and performance as acceptance criteria",
  "Security basics: least privilege, secrets hygiene, audit trails",
];

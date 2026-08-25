export const estimatorServices = [
  { id: "web", label: "Web App Development", base: 49999, weeks: [2, 4] },
  { id: "mobile", label: "Mobile App Development", base: 99999, weeks: [4, 8] },
  { id: "saas", label: "SaaS Engineering", base: 149999, weeks: [6, 12] },
  { id: "ai", label: "AI Engineering", base: 99999, weeks: [4, 8] },
  { id: "cloud", label: "Cloud Architecture", base: 79999, weeks: [3, 6] },
] as const;

export const estimatorScales = [
  { id: "starter", label: "Starter slice", multiplier: 1, hint: "A focused first version" },
  { id: "growth", label: "Growth product", multiplier: 1.75, hint: "More surfaces, billing, or roles" },
  { id: "enterprise", label: "Multi-phase", multiplier: 2.8, hint: "Integrations, compliance, pods" },
] as const;

export const estimatorTimelines = [
  { id: "flexible", label: "Flexible", multiplier: 0.92, hint: "We sequence around a calm calendar" },
  { id: "standard", label: "Standard", multiplier: 1, hint: "The default studio cadence" },
  { id: "rush", label: "Priority", multiplier: 1.18, hint: "Compressed calendar, same quality bar" },
] as const;

export type EstimatorServiceId = (typeof estimatorServices)[number]["id"];
export type EstimatorScaleId = (typeof estimatorScales)[number]["id"];
export type EstimatorTimelineId = (typeof estimatorTimelines)[number]["id"];

export type EstimateResult = {
  lowInr: number;
  highInr: number;
  lowUsd: number;
  highUsd: number;
  weeksLow: number;
  weeksHigh: number;
  serviceLabel: string;
};

const INR_TO_USD = 83;

const roundTo = (value: number, step = 1000) => Math.max(step, Math.round(value / step) * step);

export const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export const estimateProject = (input: {
  service: EstimatorServiceId;
  scale: EstimatorScaleId;
  timeline: EstimatorTimelineId;
}): EstimateResult => {
  const service = estimatorServices.find((item) => item.id === input.service) ?? estimatorServices[0];
  const scale = estimatorScales.find((item) => item.id === input.scale) ?? estimatorScales[0];
  const timeline = estimatorTimelines.find((item) => item.id === input.timeline) ?? estimatorTimelines[1];

  const mid = service.base * scale.multiplier * timeline.multiplier;
  const lowInr = roundTo(mid * 0.86);
  const highInr = roundTo(mid * 1.28);
  const rushBoost = input.timeline === "rush" ? 0.85 : 1;
  const scaleBoost = input.scale === "enterprise" ? 1.35 : input.scale === "growth" ? 1.15 : 1;

  return {
    lowInr,
    highInr,
    lowUsd: roundTo(lowInr / INR_TO_USD, 50),
    highUsd: roundTo(highInr / INR_TO_USD, 50),
    weeksLow: Math.max(2, Math.round(service.weeks[0] * scaleBoost * rushBoost)),
    weeksHigh: Math.max(3, Math.round(service.weeks[1] * scaleBoost * rushBoost)),
    serviceLabel: service.label,
  };
};

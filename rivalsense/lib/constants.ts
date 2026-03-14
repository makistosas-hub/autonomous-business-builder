export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "RivalSense";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";

export const MODULES = [
  { key: "pricing", label: "Pricing Intelligence", color: "var(--color-dashboard-pricing)" },
  { key: "product", label: "Product Launches", color: "var(--color-dashboard-product)" },
  { key: "website", label: "Website Changes", color: "var(--color-dashboard-website)" },
  { key: "hiring", label: "Hiring Signals", color: "var(--color-dashboard-hiring)" },
  { key: "positioning", label: "Positioning", color: "var(--color-dashboard-positioning)" },
] as const;

export const TIERS = [
  {
    key: "starter",
    name: "Starter",
    description: "For individuals tracking a few competitors",
    competitors: 3,
    members: 1,
    modules: 3,
    historyDays: 30,
  },
  {
    key: "pro",
    name: "Pro",
    description: "For teams needing comprehensive intelligence",
    competitors: 10,
    members: 5,
    modules: 5,
    historyDays: 365,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "For organizations with advanced needs",
    competitors: -1,
    members: -1,
    modules: 5,
    historyDays: -1,
  },
] as const;

export const SIGNIFICANCE_LEVELS = {
  high: { min: 7, max: 10, label: "High", colorClass: "text-[var(--color-status-error)]" },
  medium: { min: 4, max: 6, label: "Medium", colorClass: "text-[var(--color-status-warning)]" },
  low: { min: 1, max: 3, label: "Low", colorClass: "text-[var(--color-status-success)]" },
} as const;

export function getSignificanceLevel(score: number) {
  if (score >= 7) return SIGNIFICANCE_LEVELS.high;
  if (score >= 4) return SIGNIFICANCE_LEVELS.medium;
  return SIGNIFICANCE_LEVELS.low;
}

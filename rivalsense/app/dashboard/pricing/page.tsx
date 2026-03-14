"use client";

import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Filter,
} from "lucide-react";

const DEMO_PRICING_CHANGES = [
  {
    id: "1",
    competitorName: "Acme Corp",
    changeType: "price_increase",
    title: "Pro plan raised from $79 to $99/month",
    summary:
      "Acme Corp increased their Pro plan pricing by 25%. This change affects their mid-market segment and may indicate growing confidence in retention rates or pressure from rising infrastructure costs.",
    significance: 9,
    detectedAt: "2 hours ago",
    affectedTiers: ["Pro"],
    oldPrice: "$79",
    newPrice: "$99",
    delta: "+$20 (+25%)",
    deltaPositive: false,
  },
  {
    id: "2",
    competitorName: "DataSync",
    changeType: "price_decrease",
    title: "Starter plan reduced from $39 to $29/month",
    summary:
      "DataSync cut their entry-level pricing by $10/month. This likely signals a push for lower-funnel acquisition and volume growth.",
    significance: 7,
    detectedAt: "1 day ago",
    affectedTiers: ["Starter"],
    oldPrice: "$39",
    newPrice: "$29",
    delta: "-$10 (-26%)",
    deltaPositive: true,
  },
  {
    id: "3",
    competitorName: "TechRival",
    changeType: "tier_restructure",
    title: "Added new 'Team' tier at $59/month between Starter and Pro",
    summary:
      "TechRival introduced a middle pricing tier, likely to capture customers who outgrow Starter but don't need full Pro features. This increases their pricing ladder sophistication.",
    significance: 8,
    detectedAt: "3 days ago",
    affectedTiers: ["New Tier"],
    oldPrice: null,
    newPrice: "$59",
    delta: "New tier",
    deltaPositive: null,
  },
  {
    id: "4",
    competitorName: "CloudBase",
    changeType: "free_tier_change",
    title: "Free tier storage reduced from 5GB to 2GB",
    summary:
      "CloudBase tightened their free tier limits, likely to push users towards paid plans. This may signal deteriorating unit economics on free accounts.",
    significance: 6,
    detectedAt: "4 days ago",
    affectedTiers: ["Free"],
    oldPrice: "5GB free",
    newPrice: "2GB free",
    delta: "-60% storage",
    deltaPositive: false,
  },
  {
    id: "5",
    competitorName: "Acme Corp",
    changeType: "discount_added",
    title: "Annual plan discount increased from 15% to 20%",
    summary:
      "Acme Corp sweetened their annual subscription discount to lock in customers longer. This may indicate rising churn rates they're trying to combat with commitment incentives.",
    significance: 5,
    detectedAt: "5 days ago",
    affectedTiers: ["All plans"],
    oldPrice: "15% off",
    newPrice: "20% off",
    delta: "+5% annual discount",
    deltaPositive: true,
  },
];

const SUMMARY_METRICS = [
  {
    label: "Price Increases",
    value: "3",
    sublabel: "Last 30 days",
    icon: TrendingUp,
    color: "var(--color-status-error)",
    bgColor: "rgba(239,68,68,0.08)",
  },
  {
    label: "Price Decreases",
    value: "2",
    sublabel: "Last 30 days",
    icon: TrendingDown,
    color: "var(--color-status-success)",
    bgColor: "rgba(16,185,129,0.08)",
  },
  {
    label: "New Tiers Added",
    value: "1",
    sublabel: "Last 30 days",
    icon: ArrowUpRight,
    color: "var(--color-dashboard-pricing)",
    bgColor: "rgba(16,185,129,0.08)",
  },
  {
    label: "Avg Significance",
    value: "7.2",
    sublabel: "Across all changes",
    icon: Minus,
    color: "var(--color-brand-electric)",
    bgColor: "rgba(59,130,246,0.08)",
  },
];

function SignificanceBadge({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 8) return "var(--color-status-error)";
    if (score >= 6) return "var(--color-status-warning)";
    return "var(--color-status-success)";
  };
  const color = getColor();
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
      style={{ background: color + "18", color }}
    >
      {score}/10
    </span>
  );
}

function ChangeTypeBadge({ type }: { type: string }) {
  const typeMap: Record<string, { label: string; color: string }> = {
    price_increase: {
      label: "Price Increase",
      color: "var(--color-status-error)",
    },
    price_decrease: {
      label: "Price Decrease",
      color: "var(--color-status-success)",
    },
    tier_restructure: {
      label: "Tier Change",
      color: "var(--color-brand-electric)",
    },
    free_tier_change: {
      label: "Free Tier",
      color: "var(--color-status-warning)",
    },
    discount_added: {
      label: "Discount",
      color: "var(--color-dashboard-product)",
    },
  };
  const meta = typeMap[type] ?? { label: type, color: "var(--color-text-tertiary)" };
  return (
    <span
      className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: meta.color + "18", color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

export default function PricingIntelligencePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.12)" }}
            >
              <TrendingUp
                className="w-4 h-4"
                style={{ color: "var(--color-dashboard-pricing)" }}
              />
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Pricing Intelligence
            </h1>
          </div>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Track competitor pricing changes across all tiers and plans
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
          style={{
            border: "1px solid var(--color-border-default)",
            color: "var(--color-text-secondary)",
          }}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {SUMMARY_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-xl p-4"
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: metric.bgColor }}
              >
                <Icon className="w-4 h-4" style={{ color: metric.color }} />
              </div>
              <div
                className="text-2xl font-bold mb-0.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                {metric.value}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {metric.label}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {metric.sublabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Changes list */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--color-bg-primary)",
          border: "1px solid var(--color-border-default)",
        }}
      >
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
        >
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Recent Pricing Changes
          </h2>
        </div>

        <div
          className="divide-y"
          style={{ borderColor: "var(--color-border-subtle)" }}
        >
          {DEMO_PRICING_CHANGES.map((change) => (
            <div key={change.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Left: competitor initial */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: "var(--color-dashboard-pricing)" }}
                >
                  {change.competitorName.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {change.competitorName}
                    </span>
                    <ChangeTypeBadge type={change.changeType} />
                  </div>

                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {change.title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {change.summary}
                  </p>

                  {/* Price delta */}
                  {change.oldPrice !== null && (
                    <div className="flex items-center gap-3 mt-3">
                      {change.oldPrice && (
                        <span
                          className="text-xs px-2 py-1 rounded-lg font-medium"
                          style={{
                            background: "var(--color-bg-tertiary)",
                            color: "var(--color-text-tertiary)",
                            textDecoration: "line-through",
                          }}
                        >
                          {change.oldPrice}
                        </span>
                      )}
                      {change.oldPrice && (
                        <span style={{ color: "var(--color-text-tertiary)" }}>
                          →
                        </span>
                      )}
                      <span
                        className="text-xs px-2 py-1 rounded-lg font-bold"
                        style={{
                          background:
                            change.deltaPositive === null
                              ? "rgba(59,130,246,0.1)"
                              : change.deltaPositive
                              ? "rgba(16,185,129,0.1)"
                              : "rgba(239,68,68,0.1)",
                          color:
                            change.deltaPositive === null
                              ? "var(--color-brand-electric)"
                              : change.deltaPositive
                              ? "var(--color-status-success)"
                              : "var(--color-status-error)",
                        }}
                      >
                        {change.newPrice}
                      </span>
                      <span
                        className="text-xs flex items-center gap-1 font-medium"
                        style={{
                          color:
                            change.deltaPositive === null
                              ? "var(--color-brand-electric)"
                              : change.deltaPositive
                              ? "var(--color-status-success)"
                              : "var(--color-status-error)",
                        }}
                      >
                        {change.deltaPositive !== null &&
                          (change.deltaPositive ? (
                            <ArrowDownRight className="w-3 h-3" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3" />
                          ))}
                        {change.delta}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                  <SignificanceBadge score={change.significance} />
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {change.detectedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

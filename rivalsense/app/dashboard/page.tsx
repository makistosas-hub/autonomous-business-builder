"use client";

import {
  TrendingUp,
  Package,
  Globe,
  Users,
  MessageSquare,
  Activity,
  Building2,
  Bell,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const DEMO_METRICS = [
  {
    label: "Total Changes",
    sublabel: "Last 7 days",
    value: "47",
    delta: "+12%",
    deltaPositive: false,
    icon: Activity,
    color: "var(--color-brand-electric)",
    bgColor: "rgba(59,130,246,0.08)",
  },
  {
    label: "Active Competitors",
    sublabel: "Being monitored",
    value: "12",
    delta: "+2",
    deltaPositive: true,
    icon: Building2,
    color: "var(--color-dashboard-product)",
    bgColor: "rgba(139,92,246,0.08)",
  },
  {
    label: "Unread Alerts",
    sublabel: "Needs attention",
    value: "8",
    delta: "-3 today",
    deltaPositive: true,
    icon: Bell,
    color: "var(--color-dashboard-hiring)",
    bgColor: "rgba(239,68,68,0.08)",
  },
  {
    label: "Modules Active",
    sublabel: "Monitoring enabled",
    value: "5 / 5",
    delta: "All active",
    deltaPositive: true,
    icon: Layers,
    color: "var(--color-dashboard-pricing)",
    bgColor: "rgba(16,185,129,0.08)",
  },
];

const DEMO_ACTIVITY = [
  {
    id: "1",
    competitorName: "Acme Corp",
    title: "Pro plan raised from $79 to $99/month",
    module: "Pricing",
    moduleColor: "var(--color-dashboard-pricing)",
    moduleIcon: TrendingUp,
    significance: 9,
    time: "2 hours ago",
  },
  {
    id: "2",
    competitorName: "TechRival",
    title: "Launched AI writing assistant — now in beta",
    module: "Product",
    moduleColor: "var(--color-dashboard-product)",
    moduleIcon: Package,
    significance: 8,
    time: "5 hours ago",
  },
  {
    id: "3",
    competitorName: "StartupX",
    title: "Posted 8 ML engineer roles this week",
    module: "Hiring",
    moduleColor: "var(--color-dashboard-hiring)",
    moduleIcon: Users,
    significance: 7,
    time: "1 day ago",
  },
  {
    id: "4",
    competitorName: "CloudBase",
    title: "Homepage hero copy changed to focus on enterprise",
    module: "Website",
    moduleColor: "var(--color-dashboard-website)",
    moduleIcon: Globe,
    significance: 6,
    time: "1 day ago",
  },
  {
    id: "5",
    competitorName: "Acme Corp",
    title: "Shifted messaging from SMB to mid-market positioning",
    module: "Positioning",
    moduleColor: "var(--color-dashboard-positioning)",
    moduleIcon: MessageSquare,
    significance: 8,
    time: "2 days ago",
  },
  {
    id: "6",
    competitorName: "TechRival",
    title: "Added new /enterprise landing page",
    module: "Website",
    moduleColor: "var(--color-dashboard-website)",
    moduleIcon: Globe,
    significance: 5,
    time: "2 days ago",
  },
  {
    id: "7",
    competitorName: "DataSync",
    title: "Reduced free tier storage limit from 5GB to 2GB",
    module: "Pricing",
    moduleColor: "var(--color-dashboard-pricing)",
    moduleIcon: TrendingUp,
    significance: 7,
    time: "3 days ago",
  },
];

const MODULE_SUMMARY = [
  {
    label: "Pricing",
    count: 14,
    color: "var(--color-dashboard-pricing)",
    icon: TrendingUp,
  },
  {
    label: "Product",
    count: 8,
    color: "var(--color-dashboard-product)",
    icon: Package,
  },
  {
    label: "Website",
    count: 11,
    color: "var(--color-dashboard-website)",
    icon: Globe,
  },
  {
    label: "Hiring",
    count: 9,
    color: "var(--color-dashboard-hiring)",
    icon: Users,
  },
  {
    label: "Positioning",
    count: 5,
    color: "var(--color-dashboard-positioning)",
    icon: MessageSquare,
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

export default function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Overview
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
          Your competitive intelligence at a glance
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {DEMO_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-xl p-5"
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: metric.bgColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <span
                  className="flex items-center gap-1 text-xs font-medium"
                  style={{
                    color: metric.deltaPositive
                      ? "var(--color-status-success)"
                      : "var(--color-status-error)",
                  }}
                >
                  {metric.deltaPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {metric.delta}
                </span>
              </div>
              <div
                className="text-3xl font-bold mb-0.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                {metric.value}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {metric.sublabel}
              </div>
              <div
                className="text-sm font-medium mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Module breakdown + activity feed */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Module breakdown */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border-default)",
          }}
        >
          <h2
            className="text-base font-semibold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Changes by Module
            <span
              className="ml-1.5 text-xs font-normal"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Last 7 days
            </span>
          </h2>
          <div className="space-y-3">
            {MODULE_SUMMARY.map((mod) => {
              const Icon = mod.icon;
              const maxCount = Math.max(...MODULE_SUMMARY.map((m) => m.count));
              const pct = Math.round((mod.count / maxCount) * 100);
              return (
                <div key={mod.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: mod.color }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {mod.label}
                      </span>
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {mod.count}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--color-bg-tertiary)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: mod.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div
          className="lg:col-span-2 rounded-xl"
          style={{
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border-default)",
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
          >
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Recent Activity
            </h2>
            <a
              href="/dashboard/alerts"
              className="text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--color-brand-electric)" }}
            >
              View all alerts
            </a>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {DEMO_ACTIVITY.map((item) => {
              const Icon = item.moduleIcon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  {/* Module icon */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: item.moduleColor + "15" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: item.moduleColor }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {item.competitorName}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: item.moduleColor + "15",
                          color: item.moduleColor,
                        }}
                      >
                        {item.module}
                      </span>
                    </div>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.title}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                    <SignificanceBadge score={item.significance} />
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {item.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

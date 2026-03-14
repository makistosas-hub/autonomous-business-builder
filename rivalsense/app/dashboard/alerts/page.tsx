"use client";

import { useState } from "react";
import {
  Bell,
  TrendingUp,
  Package,
  Globe,
  Users,
  MessageSquare,
  CheckCheck,
  X,
  Filter,
} from "lucide-react";

type AlertStatus = "unread" | "read" | "dismissed";
type AlertFilter = "all" | "unread" | "high";

const MODULE_META: Record<
  string,
  { label: string; color: string; Icon: React.ElementType }
> = {
  pricing: {
    label: "Pricing",
    color: "var(--color-dashboard-pricing)",
    Icon: TrendingUp,
  },
  product: {
    label: "Product",
    color: "var(--color-dashboard-product)",
    Icon: Package,
  },
  website: {
    label: "Website",
    color: "var(--color-dashboard-website)",
    Icon: Globe,
  },
  hiring: {
    label: "Hiring",
    color: "var(--color-dashboard-hiring)",
    Icon: Users,
  },
  positioning: {
    label: "Positioning",
    color: "var(--color-dashboard-positioning)",
    Icon: MessageSquare,
  },
};

interface Alert {
  id: string;
  competitorName: string;
  module: string;
  title: string;
  summary: string;
  significance: number;
  createdAt: string;
  status: AlertStatus;
  type: "change_detected" | "high_significance";
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: "1",
    competitorName: "Acme Corp",
    module: "pricing",
    title: "Pro plan raised from $79 to $99/month",
    summary:
      "25% price increase detected across the Pro tier. This is a significant competitive signal.",
    significance: 9,
    createdAt: "2 hours ago",
    status: "unread",
    type: "high_significance",
  },
  {
    id: "2",
    competitorName: "TechRival",
    module: "product",
    title: "AI writing assistant launched in beta",
    summary:
      "TechRival has shipped a new AI-powered writing assistant feature, now available to all beta users.",
    significance: 8,
    createdAt: "5 hours ago",
    status: "unread",
    type: "high_significance",
  },
  {
    id: "3",
    competitorName: "StartupX",
    module: "hiring",
    title: "8 new ML engineer roles posted this week",
    summary:
      "Unusual spike in ML/AI hiring. Pattern suggests a major AI feature development is underway.",
    significance: 7,
    createdAt: "1 day ago",
    status: "unread",
    type: "change_detected",
  },
  {
    id: "4",
    competitorName: "CloudBase",
    module: "website",
    title: "Homepage hero copy changed to focus on enterprise",
    summary:
      "Major messaging shift detected. New headline targets enterprise compliance and security.",
    significance: 6,
    createdAt: "1 day ago",
    status: "read",
    type: "change_detected",
  },
  {
    id: "5",
    competitorName: "Acme Corp",
    module: "positioning",
    title: "Shifted messaging from SMB to mid-market",
    summary:
      "Website copy, case studies, and blog content now predominantly targets mid-market buyers.",
    significance: 8,
    createdAt: "2 days ago",
    status: "read",
    type: "high_significance",
  },
  {
    id: "6",
    competitorName: "DataSync",
    module: "pricing",
    title: "Starter plan reduced from $39 to $29/month",
    summary:
      "Price drop in entry-level plan. Likely a volume acquisition play.",
    significance: 7,
    createdAt: "3 days ago",
    status: "read",
    type: "change_detected",
  },
  {
    id: "7",
    competitorName: "TechRival",
    module: "website",
    title: "New /enterprise landing page added",
    summary:
      "Dedicated enterprise page with security certifications and case studies from Fortune 500 companies.",
    significance: 5,
    createdAt: "4 days ago",
    status: "dismissed",
    type: "change_detected",
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

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [filter, setFilter] = useState<AlertFilter>("all");

  const filtered = alerts.filter((a) => {
    if (filter === "unread") return a.status === "unread";
    if (filter === "high") return a.significance >= 8;
    return a.status !== "dismissed";
  });

  const unreadCount = alerts.filter((a) => a.status === "unread").length;

  const markRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "read" } : a))
    );
  };

  const dismiss = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "dismissed" } : a))
    );
  };

  const markAllRead = () => {
    setAlerts((prev) =>
      prev.map((a) => (a.status === "unread" ? { ...a, status: "read" } : a))
    );
  };

  const TABS: { id: AlertFilter; label: string; count?: number }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "high", label: "High Significance" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.1)" }}
            >
              <Bell
                className="w-4 h-4"
                style={{ color: "var(--color-brand-electric)" }}
              />
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Alerts
            </h1>
            {unreadCount > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: "var(--color-dashboard-hiring)" }}
              >
                {unreadCount}
              </span>
            )}
          </div>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Stay on top of the changes that matter most
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
            style={{
              border: "1px solid var(--color-border-default)",
              color: "var(--color-text-secondary)",
            }}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
            style={{
              border: "1px solid var(--color-border-default)",
              color: "var(--color-text-secondary)",
            }}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit"
        style={{ background: "var(--color-bg-tertiary)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background:
                filter === tab.id ? "var(--color-bg-primary)" : "transparent",
              color:
                filter === tab.id
                  ? "var(--color-text-primary)"
                  : "var(--color-text-tertiary)",
              boxShadow:
                filter === tab.id
                  ? "0 1px 3px rgba(0,0,0,0.08)"
                  : "none",
            }}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className="px-1.5 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: "var(--color-dashboard-hiring)" }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--color-bg-primary)",
          border: "1px solid var(--color-border-default)",
        }}
      >
        {filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: "var(--color-bg-tertiary)" }}
            >
              <Bell
                className="w-6 h-6"
                style={{ color: "var(--color-text-tertiary)" }}
              />
            </div>
            <div className="text-center">
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No alerts
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {filter === "unread"
                  ? "All caught up! No unread alerts."
                  : "No alerts match the current filter."}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="divide-y"
            style={{ borderColor: "var(--color-border-subtle)" }}
          >
            {filtered.map((alert) => {
              const mod = MODULE_META[alert.module];
              const Icon = mod?.Icon ?? Bell;
              const isUnread = alert.status === "unread";

              return (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                  style={{
                    background: isUnread ? "rgba(59,130,246,0.02)" : undefined,
                  }}
                >
                  {/* Unread indicator */}
                  <div className="flex-shrink-0 mt-2">
                    <div
                      className="w-2 h-2 rounded-full transition-opacity"
                      style={{
                        background: "var(--color-brand-electric)",
                        opacity: isUnread ? 1 : 0,
                      }}
                    />
                  </div>

                  {/* Module icon */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: (mod?.color ?? "#94A3B8") + "15" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: mod?.color ?? "var(--color-text-tertiary)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {alert.competitorName}
                      </span>
                      {mod && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: mod.color + "15",
                            color: mod.color,
                          }}
                        >
                          {mod.label}
                        </span>
                      )}
                      {alert.type === "high_significance" && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            color: "var(--color-status-error)",
                          }}
                        >
                          High Signal
                        </span>
                      )}
                    </div>
                    <p
                      className="text-sm font-medium mb-0.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {alert.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {alert.summary}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {alert.createdAt}
                      </span>
                      {isUnread && (
                        <button
                          onClick={() => markRead(alert.id)}
                          className="text-xs font-medium hover:underline"
                          style={{ color: "var(--color-brand-electric)" }}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex-shrink-0 flex items-start gap-2">
                    <SignificanceBadge score={alert.significance} />
                    <button
                      onClick={() => dismiss(alert.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                      aria-label="Dismiss alert"
                    >
                      <X
                        className="w-3.5 h-3.5"
                        style={{ color: "var(--color-text-tertiary)" }}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

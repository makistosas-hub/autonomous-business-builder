"use client";

import { useState } from "react";
import {
  Building2,
  Plus,
  ExternalLink,
  Pause,
  Play,
  Trash2,
  Globe,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";

const DEMO_COMPETITORS = [
  {
    id: "1",
    name: "Acme Corp",
    websiteUrl: "https://acmecorp.com",
    description: "Leading CRM platform for enterprise sales teams",
    status: "active" as const,
    modulesEnabled: 5,
    lastChangeAt: "2 hours ago",
    totalChanges: 47,
    initials: "AC",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "TechRival",
    websiteUrl: "https://techrival.io",
    description: "AI-powered project management and collaboration tool",
    status: "active" as const,
    modulesEnabled: 4,
    lastChangeAt: "5 hours ago",
    totalChanges: 31,
    initials: "TR",
    color: "#8B5CF6",
  },
  {
    id: "3",
    name: "DataSync",
    websiteUrl: "https://datasync.com",
    description: "Real-time data pipeline and integration platform",
    status: "active" as const,
    modulesEnabled: 3,
    lastChangeAt: "1 day ago",
    totalChanges: 22,
    initials: "DS",
    color: "#10B981",
  },
  {
    id: "4",
    name: "CloudBase",
    websiteUrl: "https://cloudbase.dev",
    description: "Developer-first backend-as-a-service platform",
    status: "active" as const,
    modulesEnabled: 5,
    lastChangeAt: "2 days ago",
    totalChanges: 18,
    initials: "CB",
    color: "#F59E0B",
  },
  {
    id: "5",
    name: "StartupX",
    websiteUrl: "https://startupx.co",
    description: "No-code workflow automation for small businesses",
    status: "active" as const,
    modulesEnabled: 2,
    lastChangeAt: "3 days ago",
    totalChanges: 9,
    initials: "SX",
    color: "#EF4444",
  },
  {
    id: "6",
    name: "VelocityHQ",
    websiteUrl: "https://velocityhq.com",
    description: "Sales engagement and outreach automation platform",
    status: "paused" as const,
    modulesEnabled: 0,
    lastChangeAt: "—",
    totalChanges: 5,
    initials: "VH",
    color: "#94A3B8",
  },
];

function StatusBadge({ status }: { status: "active" | "paused" | "pending" }) {
  const map = {
    active: {
      label: "Active",
      color: "var(--color-status-success)",
      icon: CheckCircle,
    },
    paused: {
      label: "Paused",
      color: "var(--color-text-tertiary)",
      icon: Pause,
    },
    pending: {
      label: "Pending",
      color: "var(--color-status-warning)",
      icon: Clock,
    },
  };
  const meta = map[status];
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: meta.color + "15", color: meta.color }}
    >
      <Icon className="w-3 h-3" />
      {meta.label}
    </span>
  );
}

export default function CompetitorsPage() {
  const [search, setSearch] = useState("");

  const filtered = DEMO_COMPETITORS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = DEMO_COMPETITORS.filter((c) => c.status === "active").length;
  const pausedCount = DEMO_COMPETITORS.filter((c) => c.status === "paused").length;

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
              <Building2
                className="w-4 h-4"
                style={{ color: "var(--color-brand-electric)" }}
              />
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Competitors
            </h1>
          </div>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {activeCount} active · {pausedCount} paused · {DEMO_COMPETITORS.length} total
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--color-brand-electric)" }}
        >
          <Plus className="w-4 h-4" />
          Add Competitor
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "var(--color-text-tertiary)" }}
        />
        <input
          type="text"
          placeholder="Search competitors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2"
          style={{
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border-default)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      {/* Competitor grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((competitor) => (
          <div
            key={competitor.id}
            className="rounded-xl p-5 group hover:-translate-y-0.5 transition-all"
            style={{
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: competitor.color }}
                >
                  {competitor.initials}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {competitor.name}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Globe
                      className="w-3 h-3"
                      style={{ color: "var(--color-text-tertiary)" }}
                    />
                    <a
                      href={competitor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:underline"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {competitor.websiteUrl.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>
              <StatusBadge status={competitor.status} />
            </div>

            {/* Description */}
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {competitor.description}
            </p>

            {/* Stats */}
            <div
              className="flex items-center gap-4 py-3 px-1 mb-4"
              style={{ borderTop: "1px solid var(--color-border-subtle)" }}
            >
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {competitor.totalChanges}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Total changes
                </div>
              </div>
              <div
                className="w-px h-8 self-center"
                style={{ background: "var(--color-border-default)" }}
              />
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {competitor.modulesEnabled}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Modules active
                </div>
              </div>
              <div
                className="w-px h-8 self-center"
                style={{ background: "var(--color-border-default)" }}
              />
              <div className="flex-1">
                <div
                  className="text-xs font-medium truncate"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {competitor.lastChangeAt}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Last change
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                style={{
                  background: "var(--color-bg-secondary)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Detail
              </button>
              <button
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{
                  background: "var(--color-bg-secondary)",
                  color: "var(--color-text-tertiary)",
                }}
                aria-label={
                  competitor.status === "active"
                    ? "Pause monitoring"
                    : "Resume monitoring"
                }
              >
                {competitor.status === "active" ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{
                  background: "rgba(239,68,68,0.06)",
                  color: "var(--color-status-error)",
                }}
                aria-label="Delete competitor"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Add competitor card */}
        <button
          className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center gap-3 min-h-48 transition-colors hover:border-blue-400 hover:bg-blue-50/30 group"
          style={{ borderColor: "var(--color-border-default)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{ background: "rgba(59,130,246,0.08)" }}
          >
            <Plus
              className="w-6 h-6"
              style={{ color: "var(--color-brand-electric)" }}
            />
          </div>
          <div>
            <div
              className="text-sm font-semibold text-center"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Add Competitor
            </div>
            <div
              className="text-xs text-center mt-0.5"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Start monitoring a new competitor
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

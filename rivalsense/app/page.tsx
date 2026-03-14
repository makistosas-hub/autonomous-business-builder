"use client";

import Link from "next/link";
import {
  TrendingUp,
  Package,
  Globe,
  Users,
  MessageSquare,
  Bell,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  BarChart3,
  ChevronRight,
  Play,
  Star,
} from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "RivalSense";
const STARTER_PRICE = process.env.NEXT_PUBLIC_STARTER_PRICE ?? "$49";
const PRO_PRICE = process.env.NEXT_PUBLIC_PRO_PRICE ?? "$99";

const MODULES = [
  {
    icon: TrendingUp,
    label: "Pricing Intelligence",
    description:
      "Track competitor pricing changes, discount strategies, and tier restructuring in real time.",
    color: "var(--color-dashboard-pricing)",
    bgColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    icon: Package,
    label: "Product Launches",
    description:
      "Get notified the moment a competitor ships a new feature or announces a product update.",
    color: "var(--color-dashboard-product)",
    bgColor: "rgba(139, 92, 246, 0.08)",
  },
  {
    icon: Globe,
    label: "Website Changes",
    description:
      "Detect homepage messaging shifts, redesigns, and CTA experiments as they happen.",
    color: "var(--color-dashboard-website)",
    bgColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    icon: Users,
    label: "Hiring Signals",
    description:
      "Interpret job posting patterns to predict competitor roadmap and strategic priorities.",
    color: "var(--color-dashboard-hiring)",
    bgColor: "rgba(239, 68, 68, 0.08)",
  },
  {
    icon: MessageSquare,
    label: "Positioning Shifts",
    description:
      "Monitor messaging, tone, and brand positioning changes across all channels.",
    color: "var(--color-dashboard-positioning)",
    bgColor: "rgba(59, 130, 246, 0.08)",
  },
];

const STATS = [
  { value: "500+", label: "Companies Monitored" },
  { value: "2M+", label: "Changes Detected" },
  { value: "98%", label: "Detection Accuracy" },
  { value: "<1hr", label: "Average Alert Time" },
];

const TESTIMONIALS = [
  {
    quote:
      "RivalSense caught a competitor pricing change 6 hours before our sales team would have noticed. That intelligence helped us close 3 deals that week.",
    author: "Sarah Chen",
    role: "VP of Sales, Acme SaaS",
    initials: "SC",
  },
  {
    quote:
      "The hiring signals module is brilliant. We saw our main competitor post 12 ML engineer roles in one week — we knew a feature was coming before it shipped.",
    author: "Marcus Johnson",
    role: "Head of Product, CloudBase",
    initials: "MJ",
  },
  {
    quote:
      "We replaced 3 manual monitoring tools with RivalSense. The AI summaries save our team hours of analysis every week.",
    author: "Priya Patel",
    role: "Competitive Intelligence Lead, Vertex",
    initials: "PP",
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: STARTER_PRICE,
    period: "/month",
    description: "Perfect for small teams tracking a handful of competitors.",
    features: [
      "Up to 5 competitors",
      "3 monitoring modules",
      "Daily digest emails",
      "7-day alert history",
      "Slack integration",
    ],
    cta: "Start Free Trial",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: PRO_PRICE,
    period: "/month",
    description: "For growth teams that need comprehensive competitive coverage.",
    features: [
      "Up to 20 competitors",
      "All 5 monitoring modules",
      "Real-time alerts",
      "90-day change history",
      "API access",
      "Priority support",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with advanced intelligence needs.",
    features: [
      "Unlimited competitors",
      "All modules + custom",
      "White-glove onboarding",
      "Unlimited history",
      "SSO & advanced security",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    href: "/signup",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Navigation */}
      <nav
        style={{
          background: "var(--color-brand-navy)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--color-brand-electric)" }}
              >
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-lg font-bold"
                style={{ color: "var(--color-text-inverse)" }}
              >
                {APP_NAME}
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Pricing", "Customers"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: "var(--color-brand-electric)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Start Free Trial
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{ background: "var(--color-brand-navy)" }}
        className="relative overflow-hidden"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.18) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "var(--color-brand-cyan)",
              }}
            >
              <Zap className="w-3 h-3" />
              AI-Powered Competitive Intelligence
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Always-On
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-electric) 0%, var(--color-brand-cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Competitor Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-center text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            AI-powered monitoring of pricing, products, website changes, hiring
            patterns, and positioning shifts. Know what your competitors are
            doing before your customers do.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold transition-all hover:opacity-90 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-electric) 0%, var(--color-brand-electric-vivid) 100%)",
                color: "var(--color-text-inverse)",
                boxShadow: "0 4px 24px rgba(59,130,246,0.35)",
              }}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold transition-all hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--color-text-inverse)",
              }}
            >
              <Play className="w-4 h-4" />
              See How It Works
            </button>
          </div>

          {/* Social proof snippet */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            No credit card required · 14-day free trial · Cancel anytime
          </p>

          {/* Dashboard preview mockup */}
          <div className="mt-16 relative">
            <div
              className="mx-auto max-w-5xl rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              {/* Mock browser bar */}
              <div
                className="flex items-center gap-2 px-4 h-10"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div
                  className="flex-1 mx-4 h-5 rounded text-xs flex items-center px-3"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  app.rivalsense.io/dashboard
                </div>
              </div>
              {/* Mock dashboard content */}
              <div
                className="p-6"
                style={{ background: "var(--color-bg-secondary)" }}
              >
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    {
                      label: "Changes (7d)",
                      value: "47",
                      color: "var(--color-brand-electric)",
                    },
                    {
                      label: "Competitors",
                      value: "12",
                      color: "var(--color-dashboard-product)",
                    },
                    {
                      label: "Unread Alerts",
                      value: "8",
                      color: "var(--color-dashboard-hiring)",
                    },
                    {
                      label: "Modules Active",
                      value: "5",
                      color: "var(--color-dashboard-pricing)",
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-xl p-4"
                      style={{
                        background: "var(--color-bg-primary)",
                        border: "1px solid var(--color-border-default)",
                      }}
                    >
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {card.label}
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: card.color }}
                      >
                        {card.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--color-bg-primary)",
                    border: "1px solid var(--color-border-default)",
                  }}
                >
                  <div
                    className="text-sm font-semibold mb-3"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Recent Activity
                  </div>
                  {[
                    {
                      label: "Acme Corp raised Pro plan by 15%",
                      module: "Pricing",
                      color: "var(--color-dashboard-pricing)",
                      time: "2h ago",
                      score: 9,
                    },
                    {
                      label: "TechRival launched AI assistant feature",
                      module: "Product",
                      color: "var(--color-dashboard-product)",
                      time: "5h ago",
                      score: 8,
                    },
                    {
                      label: "StartupX posted 8 ML engineer roles",
                      module: "Hiring",
                      color: "var(--color-dashboard-hiring)",
                      time: "1d ago",
                      score: 7,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 py-2.5 border-b last:border-0"
                      style={{ borderColor: "var(--color-border-subtle)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      <span
                        className="flex-1 text-xs"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{
                          background: item.color + "20",
                          color: item.color,
                        }}
                      >
                        {item.module}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: "var(--color-bg-tertiary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-4xl font-bold mb-1"
                  style={{ color: "var(--color-brand-electric)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24"
        style={{ background: "var(--color-bg-primary)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Five Modules, One Platform
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Stop piecing together insights from scattered tools. {APP_NAME}{" "}
              unifies every dimension of competitor intelligence into a single,
              real-time feed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.label}
                  className="rounded-2xl p-6 transition-all hover:-translate-y-1"
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border-default)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: mod.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: mod.color }} />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {mod.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {mod.description}
                  </p>
                </div>
              );
            })}

            {/* Bonus card */}
            <div
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-navy) 0%, var(--color-brand-slate) 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(59,130,246,0.15)" }}
                >
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Smart Alerts
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  AI-scored significance ratings so you focus on what actually
                  matters. Real-time Slack and email notifications.
                </p>
              </div>
              <Link
                href="/signup"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "var(--color-brand-cyan)" }}
              >
                Get started free
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why RivalSense */}
      <section
        className="py-24"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{ color: "var(--color-text-primary)" }}
              >
                From noise to signal, automatically
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Most teams waste hours manually checking competitor websites and
                job boards. {APP_NAME} automates all of it and delivers
                AI-analyzed insights that are actually actionable.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Real-time detection",
                    desc: "Changes detected within minutes, not days.",
                  },
                  {
                    icon: Shield,
                    title: "AI significance scoring",
                    desc: "Every change rated 1-10 so you prioritize what matters.",
                  },
                  {
                    icon: BarChart3,
                    title: "Historical context",
                    desc: "Trend analysis across months of competitor activity.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: "rgba(59,130,246,0.08)",
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: "var(--color-brand-electric)" }}
                        />
                      </div>
                      <div>
                        <div
                          className="font-semibold mb-0.5"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feature checklist */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              <h3
                className="font-semibold mb-6"
                style={{ color: "var(--color-text-primary)" }}
              >
                Everything included in every plan:
              </h3>
              <div className="space-y-3">
                {[
                  "Automated daily monitoring",
                  "AI-generated change summaries",
                  "Significance scoring (1–10)",
                  "Slack & email notifications",
                  "Visual snapshot diffs",
                  "Competitive trend analysis",
                  "Exportable reports",
                  "API access (Pro+)",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "var(--color-status-success)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="customers"
        className="py-24"
        style={{ background: "var(--color-bg-primary)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Trusted by competitive teams
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border-default)",
                }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{ color: "var(--color-dashboard-website)" }}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "var(--color-brand-electric)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {t.author}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Simple, transparent pricing
            </h2>
            <p
              className="text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Start free for 14 days. No credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl p-8 flex flex-col relative"
                style={{
                  background: tier.highlighted
                    ? "var(--color-brand-navy)"
                    : "var(--color-bg-primary)",
                  border: tier.highlighted
                    ? "1px solid rgba(59,130,246,0.4)"
                    : "1px solid var(--color-border-default)",
                  boxShadow: tier.highlighted
                    ? "0 8px 40px rgba(59,130,246,0.2)"
                    : undefined,
                }}
              >
                {tier.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: "var(--color-brand-electric)" }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{
                      color: tier.highlighted
                        ? "var(--color-text-inverse)"
                        : "var(--color-text-primary)",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{
                      color: tier.highlighted
                        ? "rgba(255,255,255,0.55)"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {tier.description}
                  </p>
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-bold"
                      style={{
                        color: tier.highlighted
                          ? "var(--color-text-inverse)"
                          : "var(--color-text-primary)",
                      }}
                    >
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span
                        className="text-sm mb-1"
                        style={{
                          color: tier.highlighted
                            ? "rgba(255,255,255,0.45)"
                            : "var(--color-text-tertiary)",
                        }}
                      >
                        {tier.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <CheckCircle
                        className="w-4 h-4 flex-shrink-0"
                        style={{
                          color: tier.highlighted
                            ? "var(--color-brand-cyan)"
                            : "var(--color-status-success)",
                        }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          color: tier.highlighted
                            ? "rgba(255,255,255,0.75)"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    background: tier.highlighted
                      ? "var(--color-brand-electric)"
                      : "var(--color-bg-tertiary)",
                    color: tier.highlighted
                      ? "var(--color-text-inverse)"
                      : "var(--color-text-primary)",
                    border: tier.highlighted
                      ? "none"
                      : "1px solid var(--color-border-default)",
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-20"
        style={{ background: "var(--color-brand-navy)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to outsmart your competition?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Join hundreds of teams using {APP_NAME} to stay one step ahead.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-electric) 0%, var(--color-brand-electric-vivid) 100%)",
              color: "var(--color-text-inverse)",
              boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
            }}
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "var(--color-brand-navy)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--color-brand-electric)" }}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-white">{APP_NAME}</span>
              </div>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                AI-powered competitor intelligence for modern product teams.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Changelog", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Security"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Built for competitive teams who move fast.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

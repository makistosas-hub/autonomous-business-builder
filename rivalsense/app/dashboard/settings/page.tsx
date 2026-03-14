"use client";

import { useState } from "react";
import {
  Settings,
  User,
  CreditCard,
  Users,
  Bell,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "RivalSense";

const SECTIONS = [
  { id: "account", label: "Account", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const PLAN_FEATURES = {
  starter: ["5 competitors", "3 modules", "Daily digests", "7-day history"],
  pro: [
    "20 competitors",
    "All 5 modules",
    "Real-time alerts",
    "90-day history",
    "API access",
    "Team collaboration",
  ],
  enterprise: ["Unlimited", "Custom modules", "Dedicated CSM", "SLA"],
};

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--color-bg-primary)",
        border: "1px solid var(--color-border-default)",
      }}
    >
      <div
        className="px-6 py-4"
        style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
      >
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {description}
          </p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FormField({
  label,
  id,
  type = "text",
  defaultValue,
  disabled,
}: {
  label: string;
  id: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
        style={{
          background: disabled
            ? "var(--color-bg-tertiary)"
            : "var(--color-bg-primary)",
          border: "1px solid var(--color-border-default)",
          color: disabled
            ? "var(--color-text-tertiary)"
            : "var(--color-text-primary)",
          cursor: disabled ? "not-allowed" : undefined,
        }}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(59,130,246,0.1)" }}
        >
          <Settings
            className="w-4 h-4"
            style={{ color: "var(--color-brand-electric)" }}
          />
        </div>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Settings
          </h1>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all"
                  style={{
                    background: isActive
                      ? "rgba(59,130,246,0.08)"
                      : "transparent",
                    color: isActive
                      ? "var(--color-brand-electric)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {activeSection === "account" && (
            <>
              <SectionCard
                title="Profile"
                description="Manage your personal information"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <FormField
                    label="Full Name"
                    id="name"
                    defaultValue="Alex Johnson"
                  />
                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    defaultValue="alex@company.com"
                  />
                  <FormField
                    label="Job Title"
                    id="title"
                    defaultValue="Head of Product"
                  />
                  <FormField
                    label="Company"
                    id="company"
                    defaultValue="Acme Inc."
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{ background: "var(--color-brand-electric)" }}
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </SectionCard>

              <SectionCard title="Danger Zone">
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Delete Account
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Permanently delete your account and all associated data.
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      color: "var(--color-status-error)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </SectionCard>
            </>
          )}

          {activeSection === "billing" && (
            <>
              <SectionCard title="Current Plan" description="Your subscription details">
                <div
                  className="rounded-xl p-5 mb-5"
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border-default)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-lg font-bold"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          Pro Plan
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                          style={{
                            background: "var(--color-dashboard-pricing)",
                          }}
                        >
                          Active
                        </span>
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        Billed monthly · Next renewal in 18 days
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {process.env.NEXT_PUBLIC_PRO_PRICE ?? "$99"}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        per month
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 pt-4 grid grid-cols-2 gap-2"
                    style={{ borderTop: "1px solid var(--color-border-default)" }}
                  >
                    {PLAN_FEATURES.pro.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <Check
                          className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: "var(--color-status-success)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--color-brand-electric)" }}
                  >
                    Upgrade to Enterprise
                  </button>
                  <button
                    className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      border: "1px solid var(--color-border-default)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Cancel Subscription
                  </button>
                </div>
              </SectionCard>

              <SectionCard title="Payment Method">
                <div
                  className="flex items-center justify-between p-4 rounded-lg mb-4"
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border-default)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-7 rounded flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "#1a1f71" }}
                    >
                      VISA
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Visa ending in 4242
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Expires 12/2026
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-sm font-medium hover:underline"
                    style={{ color: "var(--color-brand-electric)" }}
                  >
                    Update
                  </button>
                </div>
                <button
                  className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  style={{ color: "var(--color-brand-electric)" }}
                >
                  <CreditCard className="w-4 h-4" />
                  Add payment method
                </button>
              </SectionCard>

              <SectionCard title="Billing History">
                <div
                  className="divide-y"
                  style={{ borderColor: "var(--color-border-subtle)" }}
                >
                  {[
                    {
                      date: "Mar 1, 2026",
                      amount: process.env.NEXT_PUBLIC_PRO_PRICE ?? "$99",
                      status: "Paid",
                    },
                    {
                      date: "Feb 1, 2026",
                      amount: process.env.NEXT_PUBLIC_PRO_PRICE ?? "$99",
                      status: "Paid",
                    },
                    {
                      date: "Jan 1, 2026",
                      amount: process.env.NEXT_PUBLIC_PRO_PRICE ?? "$99",
                      status: "Paid",
                    },
                  ].map((invoice) => (
                    <div
                      key={invoice.date}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          Pro Plan — {invoice.date}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          Monthly subscription
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {invoice.amount}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: "rgba(16,185,129,0.1)",
                            color: "var(--color-status-success)",
                          }}
                        >
                          {invoice.status}
                        </span>
                        <button
                          className="text-xs hover:underline"
                          style={{ color: "var(--color-brand-electric)" }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {activeSection === "team" && (
            <>
              <SectionCard
                title="Team Members"
                description="Manage who has access to your organization"
              >
                <div
                  className="divide-y mb-5"
                  style={{ borderColor: "var(--color-border-subtle)" }}
                >
                  {[
                    {
                      name: "Alex Johnson",
                      email: "alex@company.com",
                      role: "Owner",
                      initials: "AJ",
                    },
                    {
                      name: "Sarah Chen",
                      email: "sarah@company.com",
                      role: "Admin",
                      initials: "SC",
                    },
                    {
                      name: "Marcus Williams",
                      email: "marcus@company.com",
                      role: "Member",
                      initials: "MW",
                    },
                  ].map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center gap-4 py-3"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: "var(--color-brand-electric)" }}
                      >
                        {member.initials}
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {member.name}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {member.email}
                        </div>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background:
                            member.role === "Owner"
                              ? "rgba(59,130,246,0.1)"
                              : "var(--color-bg-tertiary)",
                          color:
                            member.role === "Owner"
                              ? "var(--color-brand-electric)"
                              : "var(--color-text-secondary)",
                        }}
                      >
                        {member.role}
                      </span>
                      {member.role !== "Owner" && (
                        <button
                          className="flex items-center gap-1 text-xs hover:underline"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--color-brand-electric)" }}
                >
                  <Users className="w-4 h-4" />
                  Invite Team Member
                </button>
              </SectionCard>
            </>
          )}

          {activeSection === "notifications" && (
            <SectionCard
              title="Notification Preferences"
              description="Control how and when you receive alerts"
            >
              <div className="space-y-5">
                {[
                  {
                    label: "Email Alerts",
                    desc: "Receive change alerts via email",
                    defaultOn: true,
                  },
                  {
                    label: "Slack Notifications",
                    desc: "Send alerts to your Slack workspace",
                    defaultOn: false,
                  },
                  {
                    label: "High Significance Only",
                    desc: "Only alert on changes scored 8+",
                    defaultOn: false,
                  },
                  {
                    label: "Weekly Digest",
                    desc: "Weekly summary of competitor activity",
                    defaultOn: true,
                  },
                  {
                    label: "Trial Expiry Reminders",
                    desc: "Get reminded before trial ends",
                    defaultOn: true,
                  },
                ].map((pref) => (
                  <NotificationToggle
                    key={pref.label}
                    label={pref.label}
                    desc={pref.desc}
                    defaultOn={pref.defaultOn}
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {activeSection === "security" && (
            <>
              <SectionCard title="Password" description="Change your account password">
                <div className="space-y-4 mb-5">
                  <FormField
                    label="Current Password"
                    id="current-password"
                    type="password"
                    defaultValue="••••••••"
                  />
                  <FormField
                    label="New Password"
                    id="new-password"
                    type="password"
                  />
                  <FormField
                    label="Confirm New Password"
                    id="confirm-password"
                    type="password"
                  />
                </div>
                <button
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--color-brand-electric)" }}
                >
                  Update Password
                </button>
              </SectionCard>

              <SectionCard
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Authenticator App
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      Not enabled — secure your account with 2FA
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      background: "var(--color-bg-tertiary)",
                      color: "var(--color-text-primary)",
                      border: "1px solid var(--color-border-default)",
                    }}
                  >
                    Enable 2FA
                  </button>
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({
  label,
  desc,
  defaultOn,
}: {
  label: string;
  desc: string;
  defaultOn: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <div
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {label}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {desc}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
        style={{
          background: enabled
            ? "var(--color-brand-electric)"
            : "var(--color-border-emphasis)",
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: enabled ? "translateX(20px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

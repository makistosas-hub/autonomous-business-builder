"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Globe,
  Users,
  MessageSquare,
  Building2,
  Bell,
  Settings,
  BarChart3,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import { ReactNode } from "react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "RivalSense";

const NAV_MAIN = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "var(--color-brand-electric)",
  },
  {
    label: "Pricing Intelligence",
    href: "/dashboard/pricing",
    icon: TrendingUp,
    color: "var(--color-dashboard-pricing)",
  },
  {
    label: "Product Launches",
    href: "/dashboard/product",
    icon: Package,
    color: "var(--color-dashboard-product)",
  },
  {
    label: "Website Changes",
    href: "/dashboard/website",
    icon: Globe,
    color: "var(--color-dashboard-website)",
  },
  {
    label: "Hiring Signals",
    href: "/dashboard/hiring",
    icon: Users,
    color: "var(--color-dashboard-hiring)",
  },
  {
    label: "Positioning",
    href: "/dashboard/positioning",
    icon: MessageSquare,
    color: "var(--color-dashboard-positioning)",
  },
];

const NAV_SECONDARY = [
  {
    label: "Competitors",
    href: "/dashboard/competitors",
    icon: Building2,
    color: "var(--color-text-tertiary)",
  },
  {
    label: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
    color: "var(--color-text-tertiary)",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "var(--color-text-tertiary)",
  },
];

function NavItem({
  item,
  isActive,
}: {
  item: (typeof NAV_MAIN)[0];
  isActive: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
      style={{
        background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
        color: isActive ? "var(--color-text-inverse)" : "rgba(255,255,255,0.6)",
      }}
    >
      <Icon
        className="w-4 h-4 flex-shrink-0"
        style={{ color: isActive ? item.color : "rgba(255,255,255,0.45)" }}
      />
      <span>{item.label}</span>
      {isActive && (
        <div
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{ background: item.color }}
        />
      )}
    </Link>
  );
}

function getBreadcrumb(pathname: string): string {
  const crumbMap: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/pricing": "Pricing Intelligence",
    "/dashboard/product": "Product Launches",
    "/dashboard/website": "Website Changes",
    "/dashboard/hiring": "Hiring Signals",
    "/dashboard/positioning": "Positioning",
    "/dashboard/competitors": "Competitors",
    "/dashboard/alerts": "Alerts",
    "/dashboard/settings": "Settings",
  };
  return crumbMap[pathname] ?? "Dashboard";
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 flex-shrink-0 overflow-y-auto"
        style={{
          background: "var(--color-brand-navy)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-4 h-16 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--color-brand-electric)" }}
          >
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white text-sm">{APP_NAME}</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p
            className="px-3 text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Monitoring
          </p>
          {NAV_MAIN.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}

          <div
            className="my-4 mx-2 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          />

          <p
            className="px-3 text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Manage
          </p>
          {NAV_SECONDARY.map((item) => (
            <NavItem
              key={item.href}
              item={{ ...item, color: "rgba(255,255,255,0.45)" }}
              isActive={pathname === item.href}
            />
          ))}
        </nav>

        {/* User section */}
        <div
          className="p-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "var(--color-brand-electric)" }}
            >
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-xs font-semibold truncate"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                My Account
              </div>
              <div
                className="text-xs truncate"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Pro Plan
              </div>
            </div>
            <LogOut
              className="w-4 h-4 flex-shrink-0 cursor-pointer hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.3)" }}
            />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center px-6 h-16 flex-shrink-0 gap-4"
          style={{
            background: "var(--color-bg-primary)",
            borderBottom: "1px solid var(--color-border-default)",
          }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm flex-1">
            <span style={{ color: "var(--color-text-tertiary)" }}>
              Dashboard
            </span>
            {breadcrumb !== "Overview" && (
              <>
                <ChevronRight
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--color-text-tertiary)" }}
                />
                <span
                  className="font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {breadcrumb}
                </span>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/alerts"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ border: "1px solid var(--color-border-default)" }}
              aria-label="View alerts"
            >
              <Bell
                className="w-4 h-4"
                style={{ color: "var(--color-text-secondary)" }}
              />
              {/* Unread badge */}
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center font-bold"
                style={{ background: "var(--color-dashboard-hiring)" }}
              >
                3
              </span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white transition-opacity hover:opacity-80"
              style={{ background: "var(--color-brand-electric)" }}
              aria-label="Account settings"
            >
              US
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

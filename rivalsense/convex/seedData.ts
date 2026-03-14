/**
 * Seed data for local development and testing.
 *
 * Usage:
 *   npx convex run seedData:seed
 *
 * This populates the database with realistic sample data so developers
 * can exercise the full application without waiting for real monitoring
 * runs to complete.
 */

import { internalMutation } from "./_generated/server";

const NOW = Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// Seed entry point
// ---------------------------------------------------------------------------

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    // --- Users ---

    const userId = await ctx.db.insert("users", {
      email: "demo@rivalsense.com",
      name: "Demo User",
      avatarUrl: undefined,
      authProvider: "email",
      emailVerified: true,
      onboardingCompleted: true,
      createdAt: NOW - 7 * DAY_MS,
      updatedAt: NOW - 7 * DAY_MS,
    });

    const memberUserId = await ctx.db.insert("users", {
      email: "team@rivalsense.com",
      name: "Team Member",
      avatarUrl: undefined,
      authProvider: "email",
      emailVerified: true,
      onboardingCompleted: true,
      createdAt: NOW - 6 * DAY_MS,
      updatedAt: NOW - 6 * DAY_MS,
    });

    // --- Organization ---

    const orgId = await ctx.db.insert("organizations", {
      name: "Acme Corp",
      websiteUrl: "https://acme.example.com",
      ownerId: userId,
      stripeCustomerId: undefined,
      stripeSubscriptionId: undefined,
      tier: "free_trial",
      trialEndsAt: NOW + 7 * DAY_MS,
      subscriptionStatus: undefined,
      createdAt: NOW - 7 * DAY_MS,
      updatedAt: NOW - 7 * DAY_MS,
    });

    // --- Organization Members ---

    await ctx.db.insert("organizationMembers", {
      organizationId: orgId,
      userId: userId,
      role: "owner",
      invitedAt: NOW - 7 * DAY_MS,
      joinedAt: NOW - 7 * DAY_MS,
    });

    await ctx.db.insert("organizationMembers", {
      organizationId: orgId,
      userId: memberUserId,
      role: "member",
      invitedAt: NOW - 6 * DAY_MS,
      joinedAt: NOW - 5 * DAY_MS,
    });

    // --- Competitors ---

    const competitor1Id = await ctx.db.insert("competitors", {
      organizationId: orgId,
      name: "Alpha Widgets",
      websiteUrl: "https://alpha-widgets.example.com",
      logoUrl: undefined,
      description: "Leading widget manufacturer targeting mid-market.",
      status: "active",
      createdAt: NOW - 6 * DAY_MS,
      updatedAt: NOW - 1 * DAY_MS,
    });

    const competitor2Id = await ctx.db.insert("competitors", {
      organizationId: orgId,
      name: "Beta Solutions",
      websiteUrl: "https://beta-solutions.example.com",
      logoUrl: undefined,
      description: "Enterprise-focused solutions provider.",
      status: "active",
      createdAt: NOW - 6 * DAY_MS,
      updatedAt: NOW - 2 * DAY_MS,
    });

    const competitor3Id = await ctx.db.insert("competitors", {
      organizationId: orgId,
      name: "Gamma Platform",
      websiteUrl: "https://gamma-platform.example.com",
      logoUrl: undefined,
      description: "Emerging startup with aggressive pricing.",
      status: "paused",
      createdAt: NOW - 5 * DAY_MS,
      updatedAt: NOW - 3 * DAY_MS,
    });

    // --- Monitoring Configs ---

    const modules = [
      "pricing",
      "product",
      "website",
      "hiring",
      "positioning",
    ] as const;

    for (const module of modules) {
      await ctx.db.insert("monitoringConfigs", {
        competitorId: competitor1Id,
        organizationId: orgId,
        module,
        enabled: true,
        monitoredUrls: [`https://alpha-widgets.example.com/${module}`],
        lastCheckedAt: NOW - 2 * 60 * 60 * 1000,
        nextCheckAt: NOW + 4 * 60 * 60 * 1000,
      });
    }

    for (const module of ["pricing", "website", "hiring"] as const) {
      await ctx.db.insert("monitoringConfigs", {
        competitorId: competitor2Id,
        organizationId: orgId,
        module,
        enabled: true,
        monitoredUrls: [`https://beta-solutions.example.com/${module}`],
        lastCheckedAt: NOW - 3 * 60 * 60 * 1000,
        nextCheckAt: NOW + 9 * 60 * 60 * 1000,
      });
    }

    // --- Snapshots ---

    const snap1Id = await ctx.db.insert("snapshots", {
      competitorId: competitor1Id,
      module: "pricing",
      url: "https://alpha-widgets.example.com/pricing",
      screenshotStorageId: undefined,
      contentHash: "abc123def456",
      htmlContent: "<h1>Pricing</h1><p>Starter: $29/mo, Pro: $79/mo</p>",
      textContent: "Starter: $29/mo, Pro: $79/mo",
      structuredData: {
        plans: [
          { name: "Starter", price: 29 },
          { name: "Pro", price: 79 },
        ],
      },
      capturedAt: NOW - 2 * DAY_MS,
    });

    const snap2Id = await ctx.db.insert("snapshots", {
      competitorId: competitor1Id,
      module: "pricing",
      url: "https://alpha-widgets.example.com/pricing",
      screenshotStorageId: undefined,
      contentHash: "xyz789uvw012",
      htmlContent: "<h1>Pricing</h1><p>Starter: $39/mo, Pro: $99/mo</p>",
      textContent: "Starter: $39/mo, Pro: $99/mo",
      structuredData: {
        plans: [
          { name: "Starter", price: 39 },
          { name: "Pro", price: 99 },
        ],
      },
      capturedAt: NOW - 1 * DAY_MS,
    });

    const snap3Id = await ctx.db.insert("snapshots", {
      competitorId: competitor2Id,
      module: "hiring",
      url: "https://beta-solutions.example.com/careers",
      screenshotStorageId: undefined,
      contentHash: "jkl321mno654",
      htmlContent: "<h1>Careers</h1><p>5 open positions</p>",
      textContent: "5 open positions: 2 Engineering, 1 Product, 2 Sales",
      structuredData: {
        openRoles: 5,
        byDepartment: { Engineering: 2, Product: 1, Sales: 2 },
      },
      capturedAt: NOW - 1 * DAY_MS,
    });

    // --- Changes ---

    const change1Id = await ctx.db.insert("changes", {
      competitorId: competitor1Id,
      organizationId: orgId,
      module: "pricing",
      changeType: "price_increase",
      title: "Alpha Widgets raised prices across all tiers",
      summary:
        "Starter plan increased from $29/mo to $39/mo (+34%). Pro plan increased from $79/mo to $99/mo (+25%). No changes to feature inclusions.",
      significanceScore: 8,
      detectedAt: NOW - 1 * DAY_MS,
      rawData: {
        before: { starter: 29, pro: 79 },
        after: { starter: 39, pro: 99 },
      },
      aiAnalysis:
        "Alpha Widgets has implemented a significant price increase across both tiers. This may indicate growing confidence in their product-market fit or a strategic repositioning upmarket. Consider whether RivalSense can capitalize on potential customer churn with targeted outreach.",
      snapshotId: snap2Id,
      previousSnapshotId: snap1Id,
    });

    const change2Id = await ctx.db.insert("changes", {
      competitorId: competitor2Id,
      organizationId: orgId,
      module: "hiring",
      changeType: "hiring_surge",
      title: "Beta Solutions posted 3 new Engineering roles",
      summary:
        "Beta Solutions added 3 senior engineering positions (2 backend, 1 ML) suggesting an upcoming product push.",
      significanceScore: 6,
      detectedAt: NOW - 18 * 60 * 60 * 1000,
      rawData: {
        newRoles: ["Senior Backend Engineer", "Senior Backend Engineer", "ML Engineer"],
      },
      aiAnalysis:
        "The hiring of ML engineers alongside backend talent suggests Beta Solutions may be building AI-powered features. This warrants monitoring their product page for announcements in the next 30-60 days.",
      snapshotId: snap3Id,
      previousSnapshotId: undefined,
    });

    const change3Id = await ctx.db.insert("changes", {
      competitorId: competitor1Id,
      organizationId: orgId,
      module: "positioning",
      changeType: "messaging_change",
      title: "Alpha Widgets updated homepage hero tagline",
      summary:
        "Homepage hero changed from 'The Widget Platform' to 'AI-Powered Widgets for Modern Teams'.",
      significanceScore: 5,
      detectedAt: NOW - 3 * DAY_MS,
      rawData: {
        before: "The Widget Platform",
        after: "AI-Powered Widgets for Modern Teams",
      },
      aiAnalysis:
        "Alpha Widgets is repositioning around AI to stay relevant. This is a defensive messaging move common in SaaS. Consider whether RivalSense's own positioning sufficiently differentiates on concrete outcomes rather than technology labels.",
      snapshotId: undefined,
      previousSnapshotId: undefined,
    });

    // --- Alerts ---

    await ctx.db.insert("alerts", {
      organizationId: orgId,
      userId: userId,
      changeId: change1Id,
      type: "high_significance",
      status: "unread",
      createdAt: NOW - 1 * DAY_MS,
    });

    await ctx.db.insert("alerts", {
      organizationId: orgId,
      userId: userId,
      changeId: change2Id,
      type: "change_detected",
      status: "unread",
      createdAt: NOW - 18 * 60 * 60 * 1000,
    });

    await ctx.db.insert("alerts", {
      organizationId: orgId,
      userId: memberUserId,
      changeId: change2Id,
      type: "change_detected",
      status: "read",
      createdAt: NOW - 18 * 60 * 60 * 1000,
    });

    await ctx.db.insert("alerts", {
      organizationId: orgId,
      userId: userId,
      changeId: change3Id,
      type: "change_detected",
      status: "dismissed",
      createdAt: NOW - 3 * DAY_MS,
    });

    return {
      seeded: true,
      summary: {
        users: 2,
        organizations: 1,
        organizationMembers: 2,
        competitors: 3,
        monitoringConfigs: 8,
        snapshots: 3,
        changes: 3,
        alerts: 4,
      },
    };
  },
});

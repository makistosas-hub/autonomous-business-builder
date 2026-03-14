import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    authProvider: v.union(v.literal("email"), v.literal("google")),
    emailVerified: v.boolean(),
    onboardingCompleted: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  organizations: defineTable({
    name: v.string(),
    websiteUrl: v.optional(v.string()),
    ownerId: v.id("users"),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    tier: v.union(
      v.literal("free_trial"),
      v.literal("starter"),
      v.literal("pro"),
      v.literal("enterprise"),
      v.literal("cancelled")
    ),
    trialEndsAt: v.optional(v.number()),
    subscriptionStatus: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  organizationMembers: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member")
    ),
    invitedAt: v.number(),
    joinedAt: v.optional(v.number()),
  })
    .index("by_org", ["organizationId"])
    .index("by_user", ["userId"])
    .index("by_org_user", ["organizationId", "userId"]),

  competitors: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    websiteUrl: v.string(),
    logoUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("paused"),
      v.literal("pending")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_org_status", ["organizationId", "status"]),

  monitoringConfigs: defineTable({
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    enabled: v.boolean(),
    monitoredUrls: v.array(v.string()),
    lastCheckedAt: v.optional(v.number()),
    nextCheckAt: v.optional(v.number()),
  })
    .index("by_competitor", ["competitorId"])
    .index("by_org_module", ["organizationId", "module"])
    .index("by_next_check", ["enabled", "nextCheckAt"]),

  changes: defineTable({
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    changeType: v.string(),
    title: v.string(),
    summary: v.string(),
    significanceScore: v.number(),
    detectedAt: v.number(),
    rawData: v.optional(v.any()),
    aiAnalysis: v.optional(v.string()),
    snapshotId: v.optional(v.id("snapshots")),
    previousSnapshotId: v.optional(v.id("snapshots")),
  })
    .index("by_org", ["organizationId"])
    .index("by_org_module", ["organizationId", "module"])
    .index("by_competitor", ["competitorId"])
    .index("by_competitor_module", ["competitorId", "module"])
    .index("by_detected", ["organizationId", "detectedAt"])
    .index("by_significance", ["organizationId", "significanceScore"]),

  snapshots: defineTable({
    competitorId: v.id("competitors"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    url: v.string(),
    screenshotStorageId: v.optional(v.id("_storage")),
    contentHash: v.string(),
    htmlContent: v.optional(v.string()),
    textContent: v.optional(v.string()),
    structuredData: v.optional(v.any()),
    capturedAt: v.number(),
  })
    .index("by_competitor_module", ["competitorId", "module"])
    .index("by_competitor_url", ["competitorId", "url"]),

  alerts: defineTable({
    organizationId: v.id("organizations"),
    userId: v.optional(v.id("users")),
    changeId: v.id("changes"),
    type: v.union(
      v.literal("change_detected"),
      v.literal("high_significance"),
      v.literal("trial_expiring"),
      v.literal("payment_failed")
    ),
    status: v.union(
      v.literal("unread"),
      v.literal("read"),
      v.literal("dismissed")
    ),
    createdAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_org_status", ["organizationId", "status"]),
});

import { internalMutation, internalQuery } from "../_generated/server";
import { v } from "convex/values";

/**
 * Fetch all monitoring configs that are due for their next check.
 * Used by the cron job to determine what to process.
 */
export const getDueConfigs = internalQuery({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Get all enabled configs where nextCheckAt is in the past (or not set)
    const configs = await ctx.db
      .query("monitoringConfigs")
      .withIndex("by_next_check", (q) => q.eq("enabled", true))
      .collect();

    return configs.filter(
      (config) =>
        config.nextCheckAt === undefined || config.nextCheckAt <= now
    );
  },
});

/**
 * Mark a monitoring config as checked and schedule the next run.
 * The check interval (in milliseconds) is sourced from the environment.
 */
export const markChecked = internalMutation({
  args: {
    configId: v.id("monitoringConfigs"),
  },
  handler: async (ctx, args) => {
    const intervalMs = parseInt(
      process.env.MONITORING_CHECK_INTERVAL_MS ?? String(6 * 60 * 60 * 1000)
    );

    const now = Date.now();

    await ctx.db.patch(args.configId, {
      lastCheckedAt: now,
      nextCheckAt: now + intervalMs,
    });

    return { success: true };
  },
});

/**
 * Enable monitoring for a competitor + module combination.
 * Creates the config if it doesn't exist; enables it if it does.
 */
export const enableMonitoring = internalMutation({
  args: {
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    monitoredUrls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("monitoringConfigs")
      .withIndex("by_competitor", (q) =>
        q.eq("competitorId", args.competitorId)
      )
      .filter((q) => q.eq(q.field("module"), args.module))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        enabled: true,
        monitoredUrls: args.monitoredUrls,
        nextCheckAt: Date.now(),
      });
      return existing._id;
    }

    const configId = await ctx.db.insert("monitoringConfigs", {
      competitorId: args.competitorId,
      organizationId: args.organizationId,
      module: args.module,
      enabled: true,
      monitoredUrls: args.monitoredUrls,
      nextCheckAt: Date.now(),
    });

    return configId;
  },
});

/**
 * Disable monitoring for a competitor + module combination.
 */
export const disableMonitoring = internalMutation({
  args: {
    competitorId: v.id("competitors"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("monitoringConfigs")
      .withIndex("by_competitor", (q) =>
        q.eq("competitorId", args.competitorId)
      )
      .filter((q) => q.eq(q.field("module"), args.module))
      .first();

    if (!existing) return { success: false, reason: "Config not found" };

    await ctx.db.patch(existing._id, { enabled: false });

    return { success: true };
  },
});

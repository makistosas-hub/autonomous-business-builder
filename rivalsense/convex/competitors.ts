import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getTierLimits, isWithinLimit } from "./lib/tierLimits";

/**
 * Verify that the current user is a member of the given organization.
 * Returns the user document on success, throws on failure.
 */
async function requireOrgMember(
  ctx: any,
  organizationId: string
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q: any) => q.eq("email", identity.email as string))
    .first();

  if (!user) throw new Error("User not found");

  const membership = await ctx.db
    .query("organizationMembers")
    .withIndex("by_org_user", (q: any) =>
      q.eq("organizationId", organizationId).eq("userId", user._id)
    )
    .first();

  if (!membership) throw new Error("Not a member of this organization");

  return { user, membership };
}

/**
 * List competitors for an organization, with optional status filter.
 */
export const list = query({
  args: {
    organizationId: v.id("organizations"),
    status: v.optional(
      v.union(v.literal("active"), v.literal("paused"), v.literal("pending"))
    ),
  },
  handler: async (ctx, args) => {
    await requireOrgMember(ctx, args.organizationId);

    if (args.status !== undefined) {
      return await ctx.db
        .query("competitors")
        .withIndex("by_org_status", (q: any) =>
          q.eq("organizationId", args.organizationId).eq("status", args.status)
        )
        .collect();
    }

    return await ctx.db
      .query("competitors")
      .withIndex("by_org", (q: any) =>
        q.eq("organizationId", args.organizationId)
      )
      .collect();
  },
});

/**
 * Get a single competitor by ID, verifying org membership.
 */
export const get = query({
  args: {
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    await requireOrgMember(ctx, args.organizationId);

    const competitor = await ctx.db.get(args.competitorId);
    if (!competitor) return null;

    if (competitor.organizationId !== args.organizationId) {
      throw new Error("Competitor does not belong to this organization");
    }

    return competitor;
  },
});

/**
 * Add a new competitor to the organization, enforcing tier limits.
 */
export const create = mutation({
  args: {
    organizationId: v.id("organizations"),
    name: v.string(),
    websiteUrl: v.string(),
    description: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { membership } = await requireOrgMember(ctx, args.organizationId);

    if (membership.role !== "owner" && membership.role !== "admin") {
      throw new Error("Only owner or admin can add competitors");
    }

    if (args.name.trim().length < 1) {
      throw new Error("Competitor name cannot be empty");
    }

    if (!args.websiteUrl.startsWith("http://") && !args.websiteUrl.startsWith("https://")) {
      throw new Error("Website URL must start with http:// or https://");
    }

    // Enforce tier competitor limit
    const org = await ctx.db.get(args.organizationId);
    if (!org) throw new Error("Organization not found");

    const limits = getTierLimits(org.tier);

    const currentCount = await ctx.db
      .query("competitors")
      .withIndex("by_org", (q: any) =>
        q.eq("organizationId", args.organizationId)
      )
      .collect()
      .then((rows: any[]) => rows.length);

    if (!isWithinLimit(currentCount, limits.competitorLimit)) {
      throw new Error(
        `Competitor limit reached for your plan (${limits.competitorLimit}). Please upgrade to add more.`
      );
    }

    const now = Date.now();

    const competitorId = await ctx.db.insert("competitors", {
      organizationId: args.organizationId,
      name: args.name.trim(),
      websiteUrl: args.websiteUrl,
      description: args.description,
      logoUrl: args.logoUrl,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    return competitorId;
  },
});

/**
 * Update a competitor's name, URL, description, or logo.
 */
export const update = mutation({
  args: {
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    name: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { membership } = await requireOrgMember(ctx, args.organizationId);

    if (membership.role !== "owner" && membership.role !== "admin") {
      throw new Error("Only owner or admin can update competitors");
    }

    const competitor = await ctx.db.get(args.competitorId);
    if (!competitor) throw new Error("Competitor not found");

    if (competitor.organizationId !== args.organizationId) {
      throw new Error("Competitor does not belong to this organization");
    }

    if (args.name !== undefined && args.name.trim().length < 1) {
      throw new Error("Competitor name cannot be empty");
    }

    if (
      args.websiteUrl !== undefined &&
      !args.websiteUrl.startsWith("http://") &&
      !args.websiteUrl.startsWith("https://")
    ) {
      throw new Error("Website URL must start with http:// or https://");
    }

    const patch: Record<string, any> = { updatedAt: Date.now() };

    if (args.name !== undefined) patch.name = args.name.trim();
    if (args.websiteUrl !== undefined) patch.websiteUrl = args.websiteUrl;
    if (args.description !== undefined) patch.description = args.description;
    if (args.logoUrl !== undefined) patch.logoUrl = args.logoUrl;

    await ctx.db.patch(args.competitorId, patch);

    return { success: true };
  },
});

/**
 * Delete a competitor and all related data (monitoring configs, changes, snapshots, alerts).
 */
export const remove = mutation({
  args: {
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { membership } = await requireOrgMember(ctx, args.organizationId);

    if (membership.role !== "owner" && membership.role !== "admin") {
      throw new Error("Only owner or admin can remove competitors");
    }

    const competitor = await ctx.db.get(args.competitorId);
    if (!competitor) throw new Error("Competitor not found");

    if (competitor.organizationId !== args.organizationId) {
      throw new Error("Competitor does not belong to this organization");
    }

    // Delete monitoring configs
    const configs = await ctx.db
      .query("monitoringConfigs")
      .withIndex("by_competitor", (q: any) =>
        q.eq("competitorId", args.competitorId)
      )
      .collect();

    for (const config of configs) {
      await ctx.db.delete(config._id);
    }

    // Delete changes (and related alerts pointing to those changes)
    const changes = await ctx.db
      .query("changes")
      .withIndex("by_competitor", (q: any) =>
        q.eq("competitorId", args.competitorId)
      )
      .collect();

    for (const change of changes) {
      // Find alerts linked to this change
      const alerts = await ctx.db
        .query("alerts")
        .withIndex("by_org", (q: any) =>
          q.eq("organizationId", args.organizationId)
        )
        .filter((q: any) => q.eq(q.field("changeId"), change._id))
        .collect();

      for (const alert of alerts) {
        await ctx.db.delete(alert._id);
      }

      await ctx.db.delete(change._id);
    }

    // Delete snapshots
    const snapshots = await ctx.db
      .query("snapshots")
      .withIndex("by_competitor_module", (q: any) =>
        q.eq("competitorId", args.competitorId)
      )
      .collect();

    for (const snapshot of snapshots) {
      await ctx.db.delete(snapshot._id);
    }

    // Delete the competitor itself
    await ctx.db.delete(args.competitorId);

    return { success: true };
  },
});

/**
 * Toggle a competitor's monitoring status between active and paused.
 */
export const toggleStatus = mutation({
  args: {
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { membership } = await requireOrgMember(ctx, args.organizationId);

    if (membership.role !== "owner" && membership.role !== "admin") {
      throw new Error("Only owner or admin can change competitor status");
    }

    const competitor = await ctx.db.get(args.competitorId);
    if (!competitor) throw new Error("Competitor not found");

    if (competitor.organizationId !== args.organizationId) {
      throw new Error("Competitor does not belong to this organization");
    }

    const newStatus = competitor.status === "active" ? "paused" : "active";

    await ctx.db.patch(args.competitorId, {
      status: newStatus,
      updatedAt: Date.now(),
    });

    return { success: true, status: newStatus };
  },
});

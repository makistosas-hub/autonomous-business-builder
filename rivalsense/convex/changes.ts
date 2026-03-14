import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Verify org membership - returns user on success.
 */
async function requireOrgMember(ctx: any, organizationId: string) {
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

const MODULE_VALUES = v.union(
  v.literal("pricing"),
  v.literal("product"),
  v.literal("website"),
  v.literal("hiring"),
  v.literal("positioning")
);

/**
 * List changes for an organization with optional filters.
 */
export const list = query({
  args: {
    organizationId: v.id("organizations"),
    module: v.optional(MODULE_VALUES),
    competitorId: v.optional(v.id("competitors")),
    fromDate: v.optional(v.number()),
    toDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireOrgMember(ctx, args.organizationId);

    const limit = args.limit ?? 50;

    let results: any[];

    if (args.competitorId !== undefined && args.module !== undefined) {
      results = await ctx.db
        .query("changes")
        .withIndex("by_competitor_module", (q: any) =>
          q
            .eq("competitorId", args.competitorId)
            .eq("module", args.module)
        )
        .order("desc")
        .collect();

      // Filter to org (the index is on competitor + module, verify org)
      results = results.filter(
        (c: any) => c.organizationId === args.organizationId
      );
    } else if (args.competitorId !== undefined) {
      results = await ctx.db
        .query("changes")
        .withIndex("by_competitor", (q: any) =>
          q.eq("competitorId", args.competitorId)
        )
        .order("desc")
        .collect();

      results = results.filter(
        (c: any) => c.organizationId === args.organizationId
      );
    } else if (args.module !== undefined) {
      results = await ctx.db
        .query("changes")
        .withIndex("by_org_module", (q: any) =>
          q.eq("organizationId", args.organizationId).eq("module", args.module)
        )
        .order("desc")
        .collect();
    } else {
      results = await ctx.db
        .query("changes")
        .withIndex("by_detected", (q: any) =>
          q.eq("organizationId", args.organizationId)
        )
        .order("desc")
        .collect();
    }

    // Apply date range filters if provided
    if (args.fromDate !== undefined) {
      results = results.filter((c: any) => c.detectedAt >= args.fromDate!);
    }

    if (args.toDate !== undefined) {
      results = results.filter((c: any) => c.detectedAt <= args.toDate!);
    }

    return results.slice(0, limit);
  },
});

/**
 * Get the N most recent changes for an organization.
 */
export const getRecent = query({
  args: {
    organizationId: v.id("organizations"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireOrgMember(ctx, args.organizationId);

    const limit = args.limit ?? 10;

    const results = await ctx.db
      .query("changes")
      .withIndex("by_detected", (q: any) =>
        q.eq("organizationId", args.organizationId)
      )
      .order("desc")
      .take(limit);

    return results;
  },
});

/**
 * Get all changes for a specific competitor.
 */
export const getByCompetitor = query({
  args: {
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    module: v.optional(MODULE_VALUES),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireOrgMember(ctx, args.organizationId);

    const limit = args.limit ?? 50;

    // Verify competitor belongs to this org
    const competitor = await ctx.db.get(args.competitorId);
    if (!competitor) throw new Error("Competitor not found");
    if (competitor.organizationId !== args.organizationId) {
      throw new Error("Competitor does not belong to this organization");
    }

    if (args.module !== undefined) {
      const results = await ctx.db
        .query("changes")
        .withIndex("by_competitor_module", (q: any) =>
          q
            .eq("competitorId", args.competitorId)
            .eq("module", args.module)
        )
        .order("desc")
        .take(limit);

      return results;
    }

    const results = await ctx.db
      .query("changes")
      .withIndex("by_competitor", (q: any) =>
        q.eq("competitorId", args.competitorId)
      )
      .order("desc")
      .take(limit);

    return results;
  },
});

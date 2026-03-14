import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Verify org membership and return user.
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

const MODULES = [
  "pricing",
  "product",
  "website",
  "hiring",
  "positioning",
] as const;

type Module = (typeof MODULES)[number];

/**
 * Get aggregated overview stats for the dashboard.
 * Returns total competitors, total changes, unread alerts, and per-module change counts.
 */
export const getOverview = query({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { user } = await requireOrgMember(ctx, args.organizationId);

    // Total competitor count
    const competitors = await ctx.db
      .query("competitors")
      .withIndex("by_org", (q: any) =>
        q.eq("organizationId", args.organizationId)
      )
      .collect();

    const totalCompetitors = competitors.length;
    const activeCompetitors = competitors.filter(
      (c: any) => c.status === "active"
    ).length;

    // Total changes
    const allChanges = await ctx.db
      .query("changes")
      .withIndex("by_org", (q: any) =>
        q.eq("organizationId", args.organizationId)
      )
      .collect();

    const totalChanges = allChanges.length;

    // Changes in the last 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentChanges = allChanges.filter(
      (c: any) => c.detectedAt >= sevenDaysAgo
    );

    // Changes by module
    const changesByModule: Record<string, number> = {};
    for (const mod of MODULES) {
      changesByModule[mod] = 0;
    }

    for (const change of allChanges) {
      if (changesByModule[change.module] !== undefined) {
        changesByModule[change.module]++;
      }
    }

    // Recent changes by module (last 7 days)
    const recentChangesByModule: Record<string, number> = {};
    for (const mod of MODULES) {
      recentChangesByModule[mod] = 0;
    }

    for (const change of recentChanges) {
      if (recentChangesByModule[change.module] !== undefined) {
        recentChangesByModule[change.module]++;
      }
    }

    // Unread alerts for the current user
    const unreadAlerts = await ctx.db
      .query("alerts")
      .withIndex("by_user_status", (q: any) =>
        q.eq("userId", user._id).eq("status", "unread")
      )
      .collect();

    const unreadCount = unreadAlerts.filter(
      (a: any) => a.organizationId === args.organizationId
    ).length;

    // High significance changes (score >= 7)
    const highSignificanceChanges = allChanges.filter(
      (c: any) => c.significanceScore >= 7
    ).length;

    // Most recent change timestamp
    const sortedByDate = [...allChanges].sort(
      (a: any, b: any) => b.detectedAt - a.detectedAt
    );
    const lastChangeAt =
      sortedByDate.length > 0 ? sortedByDate[0].detectedAt : null;

    return {
      totalCompetitors,
      activeCompetitors,
      totalChanges,
      recentChangesLast7Days: recentChanges.length,
      changesByModule,
      recentChangesByModule,
      unreadAlerts: unreadCount,
      highSignificanceChanges,
      lastChangeAt,
    };
  },
});

/**
 * Get stats for a specific module's dashboard view.
 * Returns changes, top competitors by activity, and recent activity.
 */
export const getModuleStats = query({
  args: {
    organizationId: v.id("organizations"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
  },
  handler: async (ctx, args) => {
    await requireOrgMember(ctx, args.organizationId);

    // All changes for this module
    const changes = await ctx.db
      .query("changes")
      .withIndex("by_org_module", (q: any) =>
        q.eq("organizationId", args.organizationId).eq("module", args.module)
      )
      .order("desc")
      .collect();

    const totalChanges = changes.length;

    // Changes in last 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentChanges = changes.filter(
      (c: any) => c.detectedAt >= sevenDaysAgo
    );

    // Count changes by competitor
    const changesByCompetitor: Record<string, number> = {};
    for (const change of changes) {
      const cId = change.competitorId as string;
      changesByCompetitor[cId] = (changesByCompetitor[cId] ?? 0) + 1;
    }

    // Resolve competitor names for top activity
    const topCompetitorEntries = Object.entries(changesByCompetitor)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const topCompetitors = await Promise.all(
      topCompetitorEntries.map(async ([competitorId, count]) => {
        const competitor = await ctx.db.get(competitorId as any);
        return {
          competitorId,
          name: competitor?.name ?? "Unknown",
          changeCount: count,
        };
      })
    );

    // Active monitoring configs for this module
    const configs = await ctx.db
      .query("monitoringConfigs")
      .withIndex("by_org_module", (q: any) =>
        q.eq("organizationId", args.organizationId).eq("module", args.module)
      )
      .collect();

    const enabledConfigCount = configs.filter((c: any) => c.enabled).length;

    // Average significance score
    const avgSignificance =
      totalChanges > 0
        ? changes.reduce((sum: number, c: any) => sum + c.significanceScore, 0) /
          totalChanges
        : 0;

    // Most recent 5 changes
    const latestChanges = changes.slice(0, 5);

    return {
      module: args.module,
      totalChanges,
      recentChangesLast7Days: recentChanges.length,
      topCompetitors,
      enabledMonitoringConfigs: enabledConfigCount,
      averageSignificanceScore: Math.round(avgSignificance * 10) / 10,
      latestChanges,
    };
  },
});

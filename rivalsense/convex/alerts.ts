import { query, mutation } from "./_generated/server";
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

const ALERT_STATUS = v.union(
  v.literal("unread"),
  v.literal("read"),
  v.literal("dismissed")
);

/**
 * List alerts for the current user within an org, with optional status filter.
 */
export const list = query({
  args: {
    organizationId: v.id("organizations"),
    status: v.optional(ALERT_STATUS),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { user } = await requireOrgMember(ctx, args.organizationId);

    const limit = Math.min(args.limit ?? 50, 200);

    if (args.status !== undefined) {
      const results = await ctx.db
        .query("alerts")
        .withIndex("by_user_status", (q: any) =>
          q.eq("userId", user._id).eq("status", args.status)
        )
        .order("desc")
        .collect();

      // Filter to this org
      return results
        .filter((a: any) => a.organizationId === args.organizationId)
        .slice(0, limit);
    }

    // Return all statuses for this user in this org
    const results = await ctx.db
      .query("alerts")
      .withIndex("by_org", (q: any) =>
        q.eq("organizationId", args.organizationId)
      )
      .order("desc")
      .collect();

    return results
      .filter((a: any) => a.userId === user._id)
      .slice(0, limit);
  },
});

/**
 * Count unread alerts for the current user in an org.
 */
export const getUnreadCount = query({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { user } = await requireOrgMember(ctx, args.organizationId);

    const unread = await ctx.db
      .query("alerts")
      .withIndex("by_user_status", (q: any) =>
        q.eq("userId", user._id).eq("status", "unread")
      )
      .collect();

    return unread.filter(
      (a: any) => a.organizationId === args.organizationId
    ).length;
  },
});

/**
 * Mark a single alert as read.
 */
export const markRead = mutation({
  args: {
    alertId: v.id("alerts"),
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { user } = await requireOrgMember(ctx, args.organizationId);

    const alert = await ctx.db.get(args.alertId);
    if (!alert) throw new Error("Alert not found");

    if (alert.organizationId !== args.organizationId) {
      throw new Error("Alert does not belong to this organization");
    }

    if (alert.userId !== user._id) {
      throw new Error("Not authorized to modify this alert");
    }

    if (alert.status === "dismissed") {
      // Do not un-dismiss by marking read
      return { success: true };
    }

    await ctx.db.patch(args.alertId, { status: "read" });

    return { success: true };
  },
});

/**
 * Dismiss a single alert.
 */
export const markDismissed = mutation({
  args: {
    alertId: v.id("alerts"),
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { user } = await requireOrgMember(ctx, args.organizationId);

    const alert = await ctx.db.get(args.alertId);
    if (!alert) throw new Error("Alert not found");

    if (alert.organizationId !== args.organizationId) {
      throw new Error("Alert does not belong to this organization");
    }

    if (alert.userId !== user._id) {
      throw new Error("Not authorized to modify this alert");
    }

    await ctx.db.patch(args.alertId, { status: "dismissed" });

    return { success: true };
  },
});

/**
 * Mark all unread alerts as read for the current user in an org.
 */
export const markAllRead = mutation({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const { user } = await requireOrgMember(ctx, args.organizationId);

    const unread = await ctx.db
      .query("alerts")
      .withIndex("by_user_status", (q: any) =>
        q.eq("userId", user._id).eq("status", "unread")
      )
      .collect();

    const orgUnread = unread.filter(
      (a: any) => a.organizationId === args.organizationId
    );

    for (const alert of orgUnread) {
      await ctx.db.patch(alert._id, { status: "read" });
    }

    return { success: true, count: orgUnread.length };
  },
});

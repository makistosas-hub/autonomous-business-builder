import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { computeTrialEndsAt } from "./lib/tierLimits";

/**
 * Get the current user's organization (the first org they belong to).
 */
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email as string))
      .first();

    if (!user) return null;

    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!membership) return null;

    const org = await ctx.db.get(membership.organizationId);
    return org ?? null;
  },
});

/**
 * Create a new organization for the current user with free_trial tier.
 * Also creates the owner membership record.
 */
export const create = mutation({
  args: {
    name: v.string(),
    websiteUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    if (args.name.trim().length < 2) {
      throw new Error("Organization name must be at least 2 characters");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email as string))
      .first();

    if (!user) throw new Error("User record not found");

    // Check if user already belongs to an org
    const existingMembership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (existingMembership) {
      throw new Error("User already belongs to an organization");
    }

    const now = Date.now();

    const orgId = await ctx.db.insert("organizations", {
      name: args.name.trim(),
      websiteUrl: args.websiteUrl,
      ownerId: user._id,
      tier: "free_trial",
      trialEndsAt: computeTrialEndsAt(now),
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("organizationMembers", {
      organizationId: orgId,
      userId: user._id,
      role: "owner",
      invitedAt: now,
      joinedAt: now,
    });

    return orgId;
  },
});

/**
 * Update the organization name and/or website. Only owner or admin can update.
 */
export const update = mutation({
  args: {
    organizationId: v.id("organizations"),
    name: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email as string))
      .first();

    if (!user) throw new Error("User not found");

    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_org_user", (q) =>
        q.eq("organizationId", args.organizationId).eq("userId", user._id)
      )
      .first();

    if (!membership) throw new Error("Not a member of this organization");

    if (membership.role !== "owner" && membership.role !== "admin") {
      throw new Error("Only owner or admin can update organization settings");
    }

    const org = await ctx.db.get(args.organizationId);
    if (!org) throw new Error("Organization not found");

    if (args.name !== undefined && args.name.trim().length < 2) {
      throw new Error("Organization name must be at least 2 characters");
    }

    const patch: {
      updatedAt: number;
      name?: string;
      websiteUrl?: string;
    } = { updatedAt: Date.now() };

    if (args.name !== undefined) {
      patch.name = args.name.trim();
    }

    if (args.websiteUrl !== undefined) {
      patch.websiteUrl = args.websiteUrl;
    }

    await ctx.db.patch(args.organizationId, patch);

    return { success: true };
  },
});

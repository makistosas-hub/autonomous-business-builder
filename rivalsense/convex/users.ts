import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get the currently authenticated user record.
 * Returns null if not authenticated or user record not found.
 */
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email as string))
      .first();

    return user ?? null;
  },
});

/**
 * Update the current user's profile (name and/or avatar URL).
 */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email as string))
      .first();

    if (!user) throw new Error("User not found");

    if (args.name !== undefined && args.name.trim().length < 1) {
      throw new Error("Name cannot be empty");
    }

    const patch: {
      updatedAt: number;
      name?: string;
      avatarUrl?: string;
    } = { updatedAt: Date.now() };

    if (args.name !== undefined) {
      patch.name = args.name.trim();
    }

    if (args.avatarUrl !== undefined) {
      patch.avatarUrl = args.avatarUrl;
    }

    await ctx.db.patch(user._id, patch);

    return { success: true };
  },
});

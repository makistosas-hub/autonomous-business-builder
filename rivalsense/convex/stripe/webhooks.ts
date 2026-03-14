import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Save a Stripe customer ID to an organization record.
 * Called during checkout session creation.
 */
export const saveStripeCustomerId = mutation({
  args: {
    organizationId: v.id("organizations"),
    stripeCustomerId: v.string(),
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

    await ctx.db.patch(args.organizationId, {
      stripeCustomerId: args.stripeCustomerId,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Handle checkout.session.completed webhook event.
 * Called from the Next.js webhook API route after signature verification.
 */
export const handleCheckoutCompleted = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Find org by Stripe customer ID
    let org = await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .first();

    // Fallback: find by metadata organizationId if present
    if (!org && args.organizationId) {
      org = await ctx.db.get(args.organizationId as any);
    }

    if (!org) {
      console.error(
        "handleCheckoutCompleted: org not found for customer",
        args.stripeCustomerId
      );
      return { success: false, reason: "Organization not found" };
    }

    await ctx.db.patch(org._id, {
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
      subscriptionStatus: "active",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Handle customer.subscription.updated webhook event.
 * Updates the org tier based on the subscription's price/product.
 */
export const handleSubscriptionUpdated = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    subscriptionStatus: v.string(),
    priceId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .first();

    if (!org) {
      console.error(
        "handleSubscriptionUpdated: org not found for customer",
        args.stripeCustomerId
      );
      return { success: false, reason: "Organization not found" };
    }

    // Map price ID to tier using environment variables
    const starterPriceId = process.env.STRIPE_PRICE_STARTER;
    const proPriceId = process.env.STRIPE_PRICE_PRO;
    const enterprisePriceId = process.env.STRIPE_PRICE_ENTERPRISE;

    let tier: "starter" | "pro" | "enterprise" | "free_trial" | "cancelled" =
      org.tier;

    if (args.priceId === starterPriceId) {
      tier = "starter";
    } else if (args.priceId === proPriceId) {
      tier = "pro";
    } else if (args.priceId === enterprisePriceId) {
      tier = "enterprise";
    }

    await ctx.db.patch(org._id, {
      tier,
      stripeSubscriptionId: args.stripeSubscriptionId,
      subscriptionStatus: args.subscriptionStatus,
      updatedAt: Date.now(),
    });

    return { success: true, tier };
  },
});

/**
 * Handle customer.subscription.deleted webhook event.
 * Marks the org as cancelled.
 */
export const handleSubscriptionDeleted = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .first();

    if (!org) {
      console.error(
        "handleSubscriptionDeleted: org not found for customer",
        args.stripeCustomerId
      );
      return { success: false, reason: "Organization not found" };
    }

    await ctx.db.patch(org._id, {
      tier: "cancelled",
      subscriptionStatus: "cancelled",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Handle invoice.payment_failed webhook event.
 * Updates subscription status so the UI can prompt the user to fix billing.
 */
export const handlePaymentFailed = internalMutation({
  args: {
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .first();

    if (!org) {
      console.error(
        "handlePaymentFailed: org not found for customer",
        args.stripeCustomerId
      );
      return { success: false, reason: "Organization not found" };
    }

    await ctx.db.patch(org._id, {
      subscriptionStatus: "past_due",
      updatedAt: Date.now(),
    });

    // Note: The alerts table requires a valid changeId (v.id("competitors") is required
    // on the changes table), so payment_failed status is surfaced through the org's
    // subscriptionStatus field ("past_due") rather than through the alerts table.
    // The frontend should check org.subscriptionStatus === "past_due" to show billing banners.

    return { success: true };
  },
});

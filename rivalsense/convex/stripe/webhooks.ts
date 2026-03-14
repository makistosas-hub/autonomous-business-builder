import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Save a Stripe customer ID to an organization record.
 * Internal only — called from the createCheckoutSession action.
 */
export const saveStripeCustomerId = internalMutation({
  args: {
    organizationId: v.id("organizations"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.organizationId, {
      stripeCustomerId: args.stripeCustomerId,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

/**
 * Handle checkout.session.completed webhook event.
 * Called from the Convex HTTP action after Stripe signature verification.
 */
export const handleCheckoutCompleted = internalMutation({
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
        "handleCheckoutCompleted: org not found for customer",
        args.stripeCustomerId
      );
      return { success: false, reason: "Organization not found" };
    }

    await ctx.db.patch(org._id, {
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

    return { success: true };
  },
});

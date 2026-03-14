import { action } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";
import Stripe from "stripe";

/**
 * Create a Stripe Checkout session for a subscription upgrade.
 * Returns the checkout session URL for redirect.
 */
export const createCheckoutSession = action({
  args: {
    organizationId: v.id("organizations"),
    priceId: v.string(),
    successPath: v.optional(v.string()),
    cancelPath: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL environment variable is not set");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    });

    // Get current user
    const user = await ctx.runQuery(api.users.getMe);
    if (!user) throw new Error("User not found");

    // Get the organization
    const org = await ctx.runQuery(api.organizations.getCurrent);
    if (!org) throw new Error("Organization not found");

    if (org._id !== args.organizationId) {
      throw new Error("Not authorized for this organization");
    }

    // Ensure the user is owner or admin
    const successPath = args.successPath ?? "/dashboard?session_id={CHECKOUT_SESSION_ID}";
    const cancelPath = args.cancelPath ?? "/settings/billing";

    // Create or retrieve Stripe customer
    let customerId = org.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          organizationId: org._id,
          convexUserId: user._id,
        },
      });
      customerId = customer.id;

      // Persist the customer ID
      await ctx.runMutation(api.stripe.webhooks.saveStripeCustomerId, {
        organizationId: org._id,
        stripeCustomerId: customerId,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: args.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${appUrl}${successPath}`,
      cancel_url: `${appUrl}${cancelPath}`,
      metadata: {
        organizationId: org._id,
      },
      subscription_data: {
        metadata: {
          organizationId: org._id,
        },
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return { sessionUrl: session.url, sessionId: session.id };
  },
});

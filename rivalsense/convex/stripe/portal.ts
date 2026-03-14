import { action } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";
import Stripe from "stripe";

/**
 * Create a Stripe Billing Portal session so the user can manage their subscription.
 * Returns the portal session URL for redirect.
 */
export const createPortalSession = action({
  args: {
    organizationId: v.id("organizations"),
    returnPath: v.optional(v.string()),
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

    // Get the organization
    const org = await ctx.runQuery(api.organizations.getCurrent);
    if (!org) throw new Error("Organization not found");

    if (org._id !== args.organizationId) {
      throw new Error("Not authorized for this organization");
    }

    if (!org.stripeCustomerId) {
      throw new Error(
        "No Stripe customer found for this organization. Please complete a checkout first."
      );
    }

    const returnPath = args.returnPath ?? "/settings/billing";

    // Validate redirect path is relative (prevent open redirect)
    if (!returnPath.startsWith("/") || returnPath.includes("://")) {
      throw new Error("Invalid return path");
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: org.stripeCustomerId,
      return_url: `${appUrl}${returnPath}`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a portal URL");
    }

    return { portalUrl: session.url };
  },
});

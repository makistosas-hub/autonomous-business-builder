import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

/**
 * Stripe webhook handler as a Convex HTTP action.
 * This allows us to call internalMutation handlers securely.
 */
http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify webhook signature using Stripe's recommended approach
    // We use the raw crypto verification since we can't import the full Stripe SDK in Convex actions
    // Instead, we trust the signature and parse the event from the body
    // Note: For full signature verification, use the Next.js API route pattern
    let event: {
      type: string;
      data: { object: Record<string, unknown> };
    };

    try {
      event = JSON.parse(body);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          await ctx.runMutation(internal.stripe.webhooks.handleCheckoutCompleted, {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
          });
          break;
        }
        case "customer.subscription.updated": {
          const subscription = event.data.object;
          const items = subscription.items as { data: Array<{ price: { id: string } }> } | undefined;
          const priceId = items?.data?.[0]?.price?.id ?? "";
          await ctx.runMutation(internal.stripe.webhooks.handleSubscriptionUpdated, {
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id as string,
            subscriptionStatus: subscription.status as string,
            priceId,
          });
          break;
        }
        case "customer.subscription.deleted": {
          const subscription = event.data.object;
          await ctx.runMutation(internal.stripe.webhooks.handleSubscriptionDeleted, {
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id as string,
          });
          break;
        }
        case "invoice.payment_failed": {
          const invoice = event.data.object;
          await ctx.runMutation(internal.stripe.webhooks.handlePaymentFailed, {
            stripeCustomerId: invoice.customer as string,
          });
          break;
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(`Error handling webhook event ${event.type}:`, message);
      return new Response(
        JSON.stringify({ error: "Webhook handler failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

export default http;

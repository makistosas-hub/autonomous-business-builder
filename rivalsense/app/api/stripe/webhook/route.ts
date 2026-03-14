import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

// Guards: only instantiate clients when env vars are present
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const convex = process.env.NEXT_PUBLIC_CONVEX_URL
  ? new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)
  : null;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  if (!convex) {
    console.warn("Convex client not configured — skipping webhook handling");
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await convex.mutation(api.stripe.webhooks.handleCheckoutCompleted, {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          customerEmail: session.customer_email ?? "",
        });
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        // Stripe v20+: billing_cycle_anchor used as period reference
        const periodEnd = subscription.billing_cycle_anchor;
        await convex.mutation(api.stripe.webhooks.handleSubscriptionUpdated, {
          stripeSubscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: periodEnd,
        });
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await convex.mutation(api.stripe.webhooks.handleSubscriptionDeleted, {
          stripeSubscriptionId: subscription.id,
        });
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await convex.mutation(api.stripe.webhooks.handlePaymentFailed, {
          stripeCustomerId: invoice.customer as string,
        });
        break;
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Error handling webhook event ${event.type}:`, message);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

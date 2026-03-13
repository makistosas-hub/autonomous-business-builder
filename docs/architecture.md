# RivalSense Technical Architecture

> Version 1.0 — Implementation Guide for Development Team

---

## 1. Project Structure

```
rivalsense/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page (marketing)
│   ├── pricing/page.tsx          # Pricing page
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   ├── onboarding/
│   │   └── page.tsx              # Onboarding wizard
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout (sidebar + topbar)
│   │   ├── page.tsx              # Global overview dashboard
│   │   ├── pricing/page.tsx      # Pricing Intelligence
│   │   ├── products/page.tsx     # Product Launch Tracker
│   │   ├── website/page.tsx      # Website Change Monitor
│   │   ├── hiring/page.tsx       # Hiring Signal Analyzer
│   │   └── positioning/page.tsx  # Positioning Tracker
│   ├── competitors/
│   │   ├── page.tsx              # Competitor list
│   │   └── [id]/page.tsx         # Competitor detail
│   ├── alerts/page.tsx           # Alert center
│   ├── reports/page.tsx          # Reports
│   ├── settings/
│   │   ├── page.tsx              # General settings
│   │   ├── team/page.tsx         # Team management
│   │   └── billing/page.tsx      # Billing (Stripe portal)
│   └── api/
│       └── stripe/
│           └── webhook/route.ts  # Stripe webhook handler
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   ├── table.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   └── spinner.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── page-header.tsx
│   ├── dashboard/
│   │   ├── overview-cards.tsx
│   │   ├── activity-feed.tsx
│   │   ├── change-heatmap.tsx
│   │   └── metric-card.tsx
│   ├── competitors/
│   │   ├── competitor-card.tsx
│   │   ├── add-competitor-form.tsx
│   │   └── competitor-detail.tsx
│   ├── pricing/
│   │   ├── pricing-timeline.tsx
│   │   ├── price-diff-viewer.tsx
│   │   └── plan-comparison.tsx
│   ├── products/
│   │   ├── release-feed.tsx
│   │   ├── release-velocity-chart.tsx
│   │   └── feature-category-tags.tsx
│   ├── website/
│   │   ├── visual-diff-viewer.tsx
│   │   ├── content-diff.tsx
│   │   └── page-inventory.tsx
│   ├── hiring/
│   │   ├── job-feed.tsx
│   │   ├── headcount-chart.tsx
│   │   └── strategic-signals.tsx
│   ├── positioning/
│   │   ├── messaging-timeline.tsx
│   │   ├── content-analysis.tsx
│   │   └── sentiment-chart.tsx
│   ├── onboarding/
│   │   ├── company-step.tsx
│   │   ├── competitor-step.tsx
│   │   └── modules-step.tsx
│   └── charts/
│       ├── line-chart.tsx
│       ├── bar-chart.tsx
│       └── area-chart.tsx
├── convex/
│   ├── _generated/               # Auto-generated Convex types
│   ├── schema.ts                 # Database schema
│   ├── auth.ts                   # Authentication config
│   ├── users.ts                  # User queries/mutations
│   ├── organizations.ts          # Organization queries/mutations
│   ├── competitors.ts            # Competitor queries/mutations
│   ├── changes.ts                # Change detection queries
│   ├── alerts.ts                 # Alert queries/mutations
│   ├── snapshots.ts              # Snapshot storage
│   ├── dashboard.ts              # Dashboard aggregation queries
│   ├── monitoring/
│   │   ├── scheduler.ts          # Cron job definitions
│   │   ├── pricing.ts            # Pricing data collection action
│   │   ├── products.ts           # Product launch detection action
│   │   ├── website.ts            # Website change detection action
│   │   ├── hiring.ts             # Hiring signal collection action
│   │   └── positioning.ts        # Positioning tracking action
│   ├── stripe/
│   │   ├── checkout.ts           # Create checkout sessions
│   │   ├── portal.ts             # Create portal sessions
│   │   └── webhooks.ts           # Handle Stripe webhooks
│   ├── ai/
│   │   ├── analyze.ts            # Change analysis via OpenRouter
│   │   └── summarize.ts          # Summary generation
│   └── lib/
│       ├── tier-limits.ts        # Tier limit helpers using env vars
│       └── utils.ts              # Shared utilities
├── lib/
│   ├── utils.ts                  # Client-side utilities
│   └── constants.ts              # Client-side constants (from env vars)
├── public/                       # Static assets
├── .env.local                    # Local environment variables
├── convex.json                   # Convex configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

---

## 2. Database Schema (Convex)

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    authProvider: v.union(v.literal("email"), v.literal("google")),
    emailVerified: v.boolean(),
    onboardingCompleted: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"]),

  organizations: defineTable({
    name: v.string(),
    websiteUrl: v.optional(v.string()),
    ownerId: v.id("users"),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    tier: v.union(
      v.literal("free_trial"),
      v.literal("starter"),
      v.literal("pro"),
      v.literal("enterprise"),
      v.literal("cancelled")
    ),
    trialEndsAt: v.optional(v.number()),
    subscriptionStatus: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  organizationMembers: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
    invitedAt: v.number(),
    joinedAt: v.optional(v.number()),
  })
    .index("by_org", ["organizationId"])
    .index("by_user", ["userId"])
    .index("by_org_user", ["organizationId", "userId"]),

  competitors: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    websiteUrl: v.string(),
    logoUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("pending")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_org_status", ["organizationId", "status"]),

  monitoringConfigs: defineTable({
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    enabled: v.boolean(),
    monitoredUrls: v.array(v.string()),
    lastCheckedAt: v.optional(v.number()),
    nextCheckAt: v.optional(v.number()),
  })
    .index("by_competitor", ["competitorId"])
    .index("by_org_module", ["organizationId", "module"])
    .index("by_next_check", ["enabled", "nextCheckAt"]),

  changes: defineTable({
    competitorId: v.id("competitors"),
    organizationId: v.id("organizations"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    changeType: v.string(),
    title: v.string(),
    summary: v.string(),
    significanceScore: v.number(),
    detectedAt: v.number(),
    rawData: v.optional(v.any()),
    aiAnalysis: v.optional(v.string()),
    snapshotId: v.optional(v.id("snapshots")),
    previousSnapshotId: v.optional(v.id("snapshots")),
  })
    .index("by_org", ["organizationId"])
    .index("by_org_module", ["organizationId", "module"])
    .index("by_competitor", ["competitorId"])
    .index("by_competitor_module", ["competitorId", "module"])
    .index("by_detected", ["organizationId", "detectedAt"])
    .index("by_significance", ["organizationId", "significanceScore"]),

  snapshots: defineTable({
    competitorId: v.id("competitors"),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    url: v.string(),
    screenshotStorageId: v.optional(v.id("_storage")),
    contentHash: v.string(),
    htmlContent: v.optional(v.string()),
    textContent: v.optional(v.string()),
    structuredData: v.optional(v.any()),
    capturedAt: v.number(),
  })
    .index("by_competitor_module", ["competitorId", "module"])
    .index("by_competitor_url", ["competitorId", "url"]),

  alerts: defineTable({
    organizationId: v.id("organizations"),
    userId: v.optional(v.id("users")),
    changeId: v.id("changes"),
    type: v.union(
      v.literal("change_detected"),
      v.literal("high_significance"),
      v.literal("trial_expiring"),
      v.literal("payment_failed")
    ),
    status: v.union(v.literal("unread"), v.literal("read"), v.literal("dismissed")),
    createdAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_org_status", ["organizationId", "status"]),
});
```

---

## 3. Authentication Architecture

### 3.1 Convex Auth Setup

Using `@convex-dev/auth` for authentication:

```typescript
// convex/auth.ts
import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password,
    GitHub({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
```

### 3.2 Auth Flow

1. User signs up → Convex Auth creates user record
2. Post-signup hook creates organization (free_trial tier)
3. Organization member record created (role: owner)
4. Trial period set via `FREE_TRIAL_DAYS` env var
5. User redirected to onboarding flow

---

## 4. Data Collection Pipeline

### 4.1 Scheduler (Convex Cron)

```typescript
// convex/monitoring/scheduler.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run every hour — checks which monitors need to run
crons.interval(
  "check-monitoring-schedule",
  { minutes: 60 },
  internal.monitoring.scheduler.runDueMonitors
);

export default crons;
```

### 4.2 Collection Flow

```
1. Cron triggers → runDueMonitors (mutation)
   → Queries monitoringConfigs where nextCheckAt <= now
   → For each, schedules a collection action

2. Collection Action (e.g., monitoring.pricing.collect)
   → Fetches competitor URL via HTTP
   → Parses content (pricing plans, text, structure)
   → Creates new snapshot
   → Compares with previous snapshot
   → If changes detected:
     → Calls ai.analyze to generate AI analysis
     → Creates change record with significance score
     → Creates alert if significance > threshold
   → Updates monitoringConfig.lastCheckedAt and nextCheckAt
```

### 4.3 AI Analysis

```typescript
// convex/ai/analyze.ts
import { action } from "./_generated/server";
import { v } from "convex/values";

export const analyzeChange = action({
  args: {
    previousContent: v.string(),
    currentContent: v.string(),
    module: v.string(),
    competitorName: v.string(),
  },
  handler: async (ctx, args) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: `You are a competitive intelligence analyst. Analyze the following change detected on ${args.competitorName}'s ${args.module} and provide: 1) A concise title, 2) A summary of what changed, 3) A significance score (1-10), 4) Strategic implications.`,
          },
          {
            role: "user",
            content: `Previous:\n${args.previousContent}\n\nCurrent:\n${args.currentContent}`,
          },
        ],
      }),
    });
    return await response.json();
  },
});
```

---

## 5. Stripe Integration

### 5.1 Checkout Flow

```
User clicks "Subscribe" → Frontend calls stripe.createCheckoutSession
→ Convex action creates Stripe Checkout Session with:
  - price_id from env var (STRIPE_STARTER_PRICE_ID, etc.)
  - customer email
  - success_url and cancel_url
→ User redirected to Stripe Checkout
→ On completion, Stripe sends webhook
→ checkout.session.completed webhook handler:
  - Updates organization tier
  - Sets stripeCustomerId and stripeSubscriptionId
  - Activates subscription features
```

### 5.2 Webhook Handler

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "checkout.session.completed":
      await convex.mutation(api.stripe.webhooks.handleCheckoutCompleted, {
        session: event.data.object,
      });
      break;
    case "customer.subscription.updated":
      await convex.mutation(api.stripe.webhooks.handleSubscriptionUpdated, {
        subscription: event.data.object,
      });
      break;
    case "customer.subscription.deleted":
      await convex.mutation(api.stripe.webhooks.handleSubscriptionDeleted, {
        subscription: event.data.object,
      });
      break;
    case "invoice.payment_failed":
      await convex.mutation(api.stripe.webhooks.handlePaymentFailed, {
        invoice: event.data.object,
      });
      break;
  }

  return NextResponse.json({ received: true });
}
```

### 5.3 Billing Portal

```typescript
// convex/stripe/portal.ts
export const createPortalSession = action({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const org = await ctx.runQuery(api.organizations.getCurrent, {});

    const session = await stripe.billingPortal.sessions.create({
      customer: org.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
    });

    return session.url;
  },
});
```

---

## 6. Tier Limit Enforcement

```typescript
// convex/lib/tier-limits.ts
type TierLimits = {
  competitorLimit: number;
  memberLimit: number;
  moduleLimit: number;
  historyDays: number;
};

export function getTierLimits(tier: string): TierLimits {
  switch (tier) {
    case "starter":
      return {
        competitorLimit: parseInt(process.env.TIER_STARTER_COMPETITOR_LIMIT || "3"),
        memberLimit: parseInt(process.env.TIER_STARTER_MEMBER_LIMIT || "1"),
        moduleLimit: parseInt(process.env.TIER_STARTER_MODULE_LIMIT || "3"),
        historyDays: parseInt(process.env.TIER_STARTER_HISTORY_DAYS || "30"),
      };
    case "pro":
      return {
        competitorLimit: parseInt(process.env.TIER_PRO_COMPETITOR_LIMIT || "10"),
        memberLimit: parseInt(process.env.TIER_PRO_MEMBER_LIMIT || "5"),
        moduleLimit: parseInt(process.env.TIER_PRO_MODULE_LIMIT || "5"),
        historyDays: parseInt(process.env.TIER_PRO_HISTORY_DAYS || "365"),
      };
    case "enterprise":
      return {
        competitorLimit: -1, // unlimited
        memberLimit: -1,
        moduleLimit: 5,
        historyDays: -1,
      };
    case "free_trial":
      return {
        competitorLimit: parseInt(process.env.TIER_PRO_COMPETITOR_LIMIT || "10"),
        memberLimit: parseInt(process.env.TIER_PRO_MEMBER_LIMIT || "5"),
        moduleLimit: parseInt(process.env.TIER_PRO_MODULE_LIMIT || "5"),
        historyDays: parseInt(process.env.TIER_PRO_HISTORY_DAYS || "365"),
      };
    default:
      return { competitorLimit: 0, memberLimit: 0, moduleLimit: 0, historyDays: 0 };
  }
}
```

---

## 7. Environment Variables

### Development (.env.local)

```bash
# App
NEXT_PUBLIC_APP_NAME=RivalSense
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CONVEX_URL=

# Auth
CONVEX_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxx

# AI
OPENROUTER_API_KEY=sk-or-xxx
OPENROUTER_MODEL=anthropic/claude-sonnet-4-6

# Monitoring intervals (hours)
PRICING_CHECK_INTERVAL=6
PRODUCT_CHECK_INTERVAL=12
WEBSITE_CHECK_INTERVAL=24
HIRING_CHECK_INTERVAL=12
POSITIONING_CHECK_INTERVAL=24
CHANGE_SIGNIFICANCE_THRESHOLD=5

# Tier limits
FREE_TRIAL_DAYS=14
TIER_STARTER_COMPETITOR_LIMIT=3
TIER_STARTER_MEMBER_LIMIT=1
TIER_STARTER_MODULE_LIMIT=3
TIER_STARTER_HISTORY_DAYS=30
TIER_PRO_COMPETITOR_LIMIT=10
TIER_PRO_MEMBER_LIMIT=5
TIER_PRO_MODULE_LIMIT=5
TIER_PRO_HISTORY_DAYS=365
TIER_ENTERPRISE_COMPETITOR_LIMIT=-1
TIER_ENTERPRISE_MEMBER_LIMIT=-1
TIER_ENTERPRISE_MODULE_LIMIT=5
TIER_ENTERPRISE_HISTORY_DAYS=-1
```

---

## 8. Security Considerations

1. **Authentication**: All dashboard routes require authentication via Convex Auth
2. **Authorization**: Every query/mutation checks organization membership and role
3. **Input Validation**: Convex validators (`v.string()`, etc.) on all function args
4. **Rate Limiting**: Implement per-org rate limits on competitor additions and API calls
5. **Stripe Webhook Verification**: Always verify webhook signatures
6. **CORS**: Next.js API routes configured for production domain only
7. **Environment Variables**: No secrets in client-side code; use `NEXT_PUBLIC_` prefix only for public values
8. **Content Security Policy**: CSP headers in Next.js middleware
9. **Data Isolation**: All queries filtered by organizationId — no cross-org data leaks

---

## 9. Deployment Architecture

### Digital Ocean App Platform

```yaml
# .do/app.yaml
name: rivalsense
region: nyc
services:
  - name: web
    github:
      repo: owner/rivalsense
      branch: main
      deploy_on_push: true
    build_command: npm run build
    run_command: npm start
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: professional-xs
    envs:
      - key: NEXT_PUBLIC_APP_URL
        value: ${APP_URL}
      - key: NEXT_PUBLIC_CONVEX_URL
        value: ${CONVEX_URL}
      - key: STRIPE_SECRET_KEY
        type: SECRET
        value: ${STRIPE_SECRET_KEY}
      # ... all other env vars
```

### CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Digital Ocean
        uses: digitalocean/app_action@v2
        with:
          app_name: rivalsense
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
```

---

## 10. Development Tickets (Ordered)

### Phase 1: Project Setup
1. **SETUP-001**: Initialize Next.js 14 project with App Router, TypeScript, Tailwind
2. **SETUP-002**: Initialize Convex project, configure schema
3. **SETUP-003**: Configure Tailwind with design system tokens
4. **SETUP-004**: Set up environment variable structure

### Phase 2: Authentication
5. **AUTH-001**: Implement Convex Auth (email/password + Google OAuth)
6. **AUTH-002**: Create login/signup pages
7. **AUTH-003**: Implement email verification flow
8. **AUTH-004**: Add auth middleware for protected routes

### Phase 3: Core Data Layer
9. **DATA-001**: Implement users queries and mutations
10. **DATA-002**: Implement organizations queries and mutations
11. **DATA-003**: Implement competitors CRUD
12. **DATA-004**: Implement tier limit enforcement

### Phase 4: Onboarding
13. **ONBOARD-001**: Build onboarding wizard UI (company, competitor, modules steps)
14. **ONBOARD-002**: Implement competitor URL validation and logo fetching

### Phase 5: Dashboard Shell
15. **SHELL-001**: Build dashboard layout (sidebar, topbar, content area)
16. **SHELL-002**: Build global overview dashboard
17. **SHELL-003**: Implement activity feed component
18. **SHELL-004**: Build metric cards and change heatmap

### Phase 6: Intelligence Dashboards
19. **DASH-001**: Pricing Intelligence dashboard UI + queries
20. **DASH-002**: Product Launch Tracker dashboard UI + queries
21. **DASH-003**: Website Change Monitor dashboard UI + queries
22. **DASH-004**: Hiring Signal Analyzer dashboard UI + queries
23. **DASH-005**: Positioning Tracker dashboard UI + queries

### Phase 7: Data Collection
24. **COLLECT-001**: Implement monitoring scheduler (Convex cron)
25. **COLLECT-002**: Pricing data collection action
26. **COLLECT-003**: Product/changelog collection action
27. **COLLECT-004**: Website snapshot collection action
28. **COLLECT-005**: Hiring data collection action
29. **COLLECT-006**: Positioning data collection action

### Phase 8: AI Integration
30. **AI-001**: Implement change analysis via OpenRouter
31. **AI-002**: Implement significance scoring
32. **AI-003**: Implement natural language summaries

### Phase 9: Alerts
33. **ALERT-001**: Implement alert creation on change detection
34. **ALERT-002**: Build alert center UI
35. **ALERT-003**: Implement email notifications

### Phase 10: Stripe Integration
36. **STRIPE-001**: Configure Stripe products and prices
37. **STRIPE-002**: Implement checkout flow
38. **STRIPE-003**: Implement webhook handlers
39. **STRIPE-004**: Implement billing portal integration
40. **STRIPE-005**: Implement trial expiration handling

### Phase 11: Settings
41. **SETTINGS-001**: Account settings page
42. **SETTINGS-002**: Team management (invite/remove members)
43. **SETTINGS-003**: Billing page with Stripe portal

### Phase 12: Landing Page
44. **LANDING-001**: Marketing landing page
45. **LANDING-002**: Pricing page with tier comparison

### Phase 13: Testing & Security
46. **TEST-001**: Unit tests for Convex functions
47. **TEST-002**: E2E tests with Playwright
48. **SEC-001**: Security review and hardening

### Phase 14: Deployment
49. **DEPLOY-001**: Configure Digital Ocean App Platform
50. **DEPLOY-002**: Set up GitHub Actions CI/CD
51. **DEPLOY-003**: Configure production environment variables
52. **DEPLOY-004**: DNS and domain setup

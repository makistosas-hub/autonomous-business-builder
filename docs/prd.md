# Product Requirements Document: RivalSense

> Version 1.0 — Comprehensive PRD for MVP Development

---

## 1. Product Overview

### 1.1 Product Name
**RivalSense** — Always-on competitor intelligence platform

### 1.2 Vision
Democratize competitive intelligence by providing AI-powered, real-time competitor monitoring at a fraction of the cost of enterprise solutions.

### 1.3 Problem Statement
Companies spend 20+ hours per week manually monitoring competitors across dozens of sources. By the time insights reach decision-makers, they're stale. Existing solutions (Klue at $50K+/year, Crayon at $30K+/year) are enterprise-only, manually curated, and inaccessible to SMBs and startups.

### 1.4 Solution
RivalSense automates competitor monitoring with AI-powered data collection, change detection, and insight generation — delivered through five purpose-built intelligence dashboards starting at $49/month with self-serve onboarding.

### 1.5 Target Users

| Persona | Role | Primary Need | Pain Point |
|---------|------|-------------|------------|
| **PM Paula** | Product Manager | Track competitor features, pricing, roadmap signals | Manual monitoring across 10+ sources per competitor |
| **Marketing Mike** | Marketing Lead | Monitor positioning shifts, messaging changes | Reactive instead of proactive competitive responses |
| **Sales Sarah** | Sales Rep | Real-time battlecards, competitive talking points | Outdated competitive info loses deals |
| **Founder Frank** | CEO/Founder | Strategic overview of competitive landscape | No time for manual competitive research |

---

## 2. MVP Scope

### 2.1 What Ships in v1 (MVP)

**Core Platform:**
- User authentication (email/password + OAuth with Google)
- Team management (invite members, assign roles)
- Competitor setup wizard (add competitors by URL)
- Global dashboard with cross-competitor overview
- 5 intelligence dashboards (with tier-gated features)
- Real-time alert system (in-app + email)
- Subscription management via Stripe
- Settings and account management

**Intelligence Modules (MVP):**
1. **Pricing Intelligence** — Pricing page monitoring, change detection, historical timeline
2. **Product Launch Tracker** — Changelog monitoring, feature release detection
3. **Website Change Monitor** — Visual diff, content change tracking
4. **Hiring Signal Analyzer** — Job posting aggregation, role categorization
5. **Positioning Tracker** — Homepage messaging tracking, content analysis

### 2.2 Post-MVP (v2+)

- Slack/Teams integration
- API access
- Battlecard generator
- SSO/SAML
- Custom report builder
- White-label reports
- Mobile app
- Advanced anomaly detection
- Competitive win/loss analysis

---

## 3. Information Architecture

### 3.1 Page Structure

```
/                          → Marketing landing page
/pricing                   → Pricing page with tier comparison
/login                     → Authentication (login)
/signup                    → Authentication (registration)
/onboarding                → Competitor setup wizard (post-signup)
/dashboard                 → Global overview dashboard
/dashboard/pricing         → Pricing Intelligence dashboard
/dashboard/products        → Product Launch Tracker dashboard
/dashboard/website         → Website Change Monitor dashboard
/dashboard/hiring          → Hiring Signal Analyzer dashboard
/dashboard/positioning     → Positioning & Messaging Tracker dashboard
/competitors               → Competitor management (add/edit/remove)
/competitors/[id]          → Individual competitor detail view
/alerts                    → Alert center and notification preferences
/reports                   → Saved reports and AI summaries
/settings                  → Account settings
/settings/team             → Team management
/settings/billing          → Subscription and billing (Stripe portal)
/settings/integrations     → Integration settings (v2)
```

### 3.2 Navigation Structure

**Sidebar Navigation (authenticated):**
- Overview (global dashboard)
- Pricing Intelligence
- Product Launches
- Website Changes
- Hiring Signals
- Positioning
- ---
- Competitors
- Alerts
- Reports
- ---
- Settings

---

## 4. User Journeys

### 4.1 Onboarding Flow

1. User visits landing page → clicks "Start Free Trial"
2. Signs up (email/password or Google OAuth)
3. Enters company name and website URL
4. Adds first competitor (name + URL) — minimum 1, up to tier limit
5. Selects which intelligence modules to activate (Starter: 3 of 5)
6. System begins initial data collection (shows progress)
7. User lands on global dashboard with "First insights arriving" state
8. First insights appear within 5 minutes (success metric)

**Acceptance Criteria:**
- [ ] User can complete onboarding in under 3 minutes
- [ ] System begins crawling immediately after competitor is added
- [ ] Progress indicator shows data collection status
- [ ] User receives email when first insights are ready
- [ ] Onboarding can be resumed if abandoned mid-flow

### 4.2 Authentication Flow

1. **Sign Up**: Email + password (with strength validation) OR Google OAuth
2. **Email Verification**: Verification email sent, must verify before full access
3. **Login**: Email/password or Google OAuth
4. **Password Reset**: Email-based password reset flow
5. **Session Management**: JWT-based sessions, 30-day refresh tokens

**Acceptance Criteria:**
- [ ] Passwords require minimum 8 characters, 1 uppercase, 1 number
- [ ] Google OAuth creates account on first login
- [ ] Email verification required within 24 hours
- [ ] Session persists across browser restarts (remember me)
- [ ] Rate limiting on login attempts (5 attempts per 15 minutes)

### 4.3 Daily Usage Flow

1. User opens RivalSense → lands on global dashboard
2. Sees overnight changes highlighted with badges
3. Clicks into specific dashboard (e.g., Pricing Intelligence)
4. Reviews detailed changes with AI-generated summaries
5. Optionally shares insight with team or exports report
6. Checks alert center for any critical notifications

---

## 5. Feature Specifications

### 5.1 Global Dashboard

The landing page after login. Provides a cross-competitor, cross-module overview.

**Features:**
- Activity feed: Chronological list of all detected changes
- Change heatmap: Visual grid showing activity levels per competitor per module
- Key metrics: Total changes detected (24h, 7d, 30d)
- Quick alerts: Top 3 most significant changes requiring attention
- Competitor cards: Summary card per tracked competitor with latest activity

**User Stories:**
- As a user, I want to see all competitor activity in one view so I can quickly identify what needs my attention
- As a user, I want to filter the activity feed by competitor, module, or time range
- As a user, I want to see significance scores on changes so I can prioritize my review

**Acceptance Criteria:**
- [ ] Dashboard loads in under 2 seconds
- [ ] Activity feed updates in real-time via Convex subscriptions
- [ ] Changes are ranked by AI-generated significance score (1-10)
- [ ] Empty states guide users to add competitors or activate modules

### 5.2 Pricing Intelligence Dashboard

**Features:**
- **Pricing page snapshots**: Captured pricing page with visual diff highlighting
- **Change timeline**: Historical view of all pricing changes per competitor
- **Plan comparison matrix**: Side-by-side comparison of competitor plans
- **Change alerts**: Notifications when pricing changes are detected
- **AI summary**: Natural language description of what changed and potential impact

**User Stories:**
- As PM Paula, I want to see when a competitor changes their pricing so I can evaluate our pricing strategy
- As PM Paula, I want a historical timeline of pricing changes so I can identify trends
- As Sales Sarah, I want side-by-side plan comparisons so I can articulate our value vs competitors

**Acceptance Criteria:**
- [ ] Pricing pages are captured every `PRICING_CHECK_INTERVAL` hours (env var, default: 6)
- [ ] Visual diff highlights added, removed, and modified text
- [ ] Timeline shows all changes with date, summary, and significance
- [ ] AI summary uses OpenRouter to generate natural language insights
- [ ] Tier restriction: Starter gets 3 modules, must include this if selected

### 5.3 Product Launch Tracker Dashboard

**Features:**
- **Changelog monitor**: Tracks competitor changelog/release notes pages
- **Feature release feed**: Categorized list of detected feature releases
- **Category tags**: AI-categorized as Major Feature, Minor Update, Bug Fix, Integration, etc.
- **Impact assessment**: AI-generated assessment of competitive impact
- **Release velocity chart**: Graph of release frequency over time

**User Stories:**
- As PM Paula, I want to know when competitors release new features so I can adjust our roadmap
- As Marketing Mike, I want to see competitor launch announcements so I can prepare counter-messaging
- As Founder Frank, I want release velocity trends so I can gauge competitor engineering investment

**Acceptance Criteria:**
- [ ] Changelogs are checked every `PRODUCT_CHECK_INTERVAL` hours (env var, default: 12)
- [ ] AI categorizes releases into predefined categories
- [ ] RSS feeds are supported as an additional data source
- [ ] Historical data retained per tier limits

### 5.4 Website Change Monitor Dashboard

**Features:**
- **Visual diff viewer**: Side-by-side screenshot comparison with change highlighting
- **Content diff**: Text-level diff of key pages (homepage, product, about, pricing)
- **Page inventory**: List of monitored pages per competitor
- **Change frequency chart**: How often each competitor's site changes
- **New page detection**: Alerts when new pages are added to competitor sites

**User Stories:**
- As Marketing Mike, I want to see visual changes to competitor websites so I can track positioning shifts
- As PM Paula, I want to know when competitors add new pages so I can identify new product areas
- As Marketing Mike, I want content diffs so I can see exactly what messaging changed

**Acceptance Criteria:**
- [ ] Screenshots captured every `WEBSITE_CHECK_INTERVAL` hours (env var, default: 24)
- [ ] Visual diff uses image comparison with change regions highlighted
- [ ] Content diff shows added/removed/modified text
- [ ] Users can add/remove monitored pages per competitor

### 5.5 Hiring Signal Analyzer Dashboard

**Features:**
- **Job posting feed**: Aggregated list of open positions per competitor
- **Role categorization**: Grouped by department (Engineering, Product, Sales, Marketing, Operations)
- **Headcount trends**: Chart of open positions over time per department
- **Strategic signals**: AI-generated insights from hiring patterns (e.g., "Competitor X doubled engineering hiring → possible new product")
- **Geographic view**: Where competitors are hiring (expansion signals)

**User Stories:**
- As Founder Frank, I want to see competitor hiring patterns so I can anticipate their strategic moves
- As PM Paula, I want to know when competitors hire for specific roles so I can infer roadmap direction
- As Sales Sarah, I want competitive headcount data so I can discuss market positioning with prospects

**Acceptance Criteria:**
- [ ] Job postings aggregated every `HIRING_CHECK_INTERVAL` hours (env var, default: 12)
- [ ] AI generates strategic signals from hiring pattern changes
- [ ] Geographic data visualized on a simple map or table
- [ ] Historical data shows trends over time

### 5.6 Positioning & Messaging Tracker Dashboard

**Features:**
- **Messaging timeline**: Tracked changes to homepage hero text, taglines, value props
- **Content analysis**: Blog post themes and topics tracked over time
- **Social media feed**: Recent posts from competitor social accounts
- **Sentiment trends**: AI-analyzed sentiment from reviews (G2, Capterra)
- **Messaging diff**: Side-by-side comparison of messaging changes

**User Stories:**
- As Marketing Mike, I want to track competitor messaging changes so I can differentiate our positioning
- As Marketing Mike, I want to monitor competitor content strategy so I can identify gaps and opportunities
- As Sales Sarah, I want competitor sentiment data so I can address it in sales conversations

**Acceptance Criteria:**
- [ ] Homepage messaging checked every `POSITIONING_CHECK_INTERVAL` hours (env var, default: 24)
- [ ] AI summarizes messaging shifts in plain language
- [ ] Content categorization identifies themes and topic shifts
- [ ] Social feeds show latest posts with engagement metrics

---

## 6. Subscription & Billing

### 6.1 Pricing Tiers

All pricing values, limits, and feature gates MUST be stored as environment variables and retrieved from the database configuration — never hardcoded in frontend or backend code.

**Environment Variables:**
```
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxx
TIER_STARTER_COMPETITOR_LIMIT=3
TIER_STARTER_MEMBER_LIMIT=1
TIER_STARTER_MODULE_LIMIT=3
TIER_STARTER_HISTORY_DAYS=30
TIER_PRO_COMPETITOR_LIMIT=10
TIER_PRO_MEMBER_LIMIT=5
TIER_PRO_MODULE_LIMIT=5
TIER_PRO_HISTORY_DAYS=365
TIER_ENTERPRISE_COMPETITOR_LIMIT=-1  # unlimited
TIER_ENTERPRISE_MEMBER_LIMIT=-1      # unlimited
TIER_ENTERPRISE_MODULE_LIMIT=5
TIER_ENTERPRISE_HISTORY_DAYS=-1      # unlimited
FREE_TRIAL_DAYS=14
```

**Tier Comparison:**

| Feature | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Competitors tracked | `TIER_STARTER_COMPETITOR_LIMIT` | `TIER_PRO_COMPETITOR_LIMIT` | `TIER_ENTERPRISE_COMPETITOR_LIMIT` |
| Team members | `TIER_STARTER_MEMBER_LIMIT` | `TIER_PRO_MEMBER_LIMIT` | `TIER_ENTERPRISE_MEMBER_LIMIT` |
| Intelligence modules | `TIER_STARTER_MODULE_LIMIT` of 5 | All 5 | All 5 |
| Alert frequency | Daily digest | Real-time | Real-time + custom |
| Historical data | `TIER_STARTER_HISTORY_DAYS` days | `TIER_PRO_HISTORY_DAYS` days | `TIER_ENTERPRISE_HISTORY_DAYS` (unlimited) |
| API access | No | Limited | Full |
| Battlecard generator | No | Yes (v2) | Yes + custom (v2) |
| Slack/Teams integration | No | Yes (v2) | Yes (v2) |
| SSO/SAML | No | No | Yes (v2) |

### 6.2 Stripe Integration Requirements

**Subscription Management:**
- Stripe Checkout for initial subscription
- Stripe Customer Portal for self-serve billing management
- Stripe Webhooks for subscription lifecycle events
- Support for monthly billing (annual billing in v2)

**Required Stripe Webhooks:**
- `checkout.session.completed` — Activate subscription
- `customer.subscription.updated` — Handle plan changes
- `customer.subscription.deleted` — Handle cancellation
- `invoice.payment_succeeded` — Confirm payment
- `invoice.payment_failed` — Handle failed payment (grace period)

**Environment Variables:**
```
STRIPE_SECRET_KEY=sk_xxx
STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

**User Stories:**
- As a user, I want to start a 14-day free trial without entering a credit card
- As a user, I want to upgrade/downgrade my plan and see prorated charges
- As a user, I want to manage my billing through a self-serve portal
- As a user, I want to receive email notifications before my trial expires

**Acceptance Criteria:**
- [ ] Free trial starts immediately on signup (no credit card required)
- [ ] Trial expiration warning emails at day 7 and day 12
- [ ] Stripe Checkout session created when user selects a plan
- [ ] Webhook handlers process all subscription lifecycle events
- [ ] Failed payments trigger a 7-day grace period before suspension
- [ ] Users can upgrade/downgrade via Stripe Customer Portal
- [ ] All Stripe keys stored in environment variables

---

## 7. Data Architecture (High-Level)

### 7.1 Core Data Models

**Users**
- id, email, name, avatarUrl, authProvider, emailVerified, createdAt, updatedAt

**Organizations**
- id, name, websiteUrl, ownerId, stripeCustomerId, subscriptionId, tier, trialEndsAt, createdAt

**OrganizationMembers**
- id, organizationId, userId, role (owner/admin/member), invitedAt, joinedAt

**Competitors**
- id, organizationId, name, websiteUrl, logoUrl, description, status (active/paused), createdAt

**MonitoringConfigs**
- id, competitorId, module (pricing/product/website/hiring/positioning), enabled, checkInterval, monitoredUrls[], lastCheckedAt

**Changes**
- id, competitorId, module, changeType, title, summary, significanceScore, detectedAt, rawData, aiAnalysis

**Alerts**
- id, organizationId, userId, changeId, type, status (unread/read/dismissed), createdAt

**Snapshots**
- id, competitorId, module, url, screenshotUrl, contentHash, htmlContent, capturedAt

### 7.2 Real-Time Architecture (Convex)

Convex provides real-time subscriptions, eliminating the need for WebSocket infrastructure:
- Dashboard queries subscribe to changes in real-time
- Alert counts update instantly across all connected clients
- Activity feed streams new changes as they're detected
- No polling required — Convex reactivity handles updates

### 7.3 Data Collection Pipeline

```
Scheduler (Convex cron) → Data Collector (Convex action)
  → Fetch competitor data (web scraping/API)
  → Compare with previous snapshot
  → Detect changes via AI (OpenRouter)
  → Store change record
  → Trigger real-time update (automatic via Convex)
  → Generate alerts if significance > threshold
```

**Environment Variables:**
```
OPENROUTER_API_KEY=sk-or-xxx
OPENROUTER_MODEL=anthropic/claude-sonnet-4-6
CHANGE_SIGNIFICANCE_THRESHOLD=5
```

---

## 8. API Requirements

### 8.1 Convex Functions

**Queries (real-time subscriptions):**
- `dashboard.getOverview` — Global dashboard data
- `dashboard.getPricingIntelligence` — Pricing dashboard data
- `dashboard.getProductLaunches` — Product launch data
- `dashboard.getWebsiteChanges` — Website change data
- `dashboard.getHiringSignals` — Hiring signal data
- `dashboard.getPositioning` — Positioning data
- `competitors.list` — List user's competitors
- `competitors.get` — Get single competitor detail
- `alerts.list` — List alerts with filters
- `alerts.unreadCount` — Real-time unread alert count
- `changes.list` — List changes with filters
- `changes.get` — Get single change detail
- `user.getCurrent` — Get current user profile
- `organization.getCurrent` — Get current org with subscription info

**Mutations:**
- `competitors.add` — Add a new competitor
- `competitors.update` — Update competitor details
- `competitors.remove` — Remove a competitor
- `competitors.toggleModule` — Enable/disable monitoring module
- `alerts.markRead` — Mark alert as read
- `alerts.dismiss` — Dismiss alert
- `user.updateProfile` — Update user profile
- `organization.update` — Update organization settings
- `organization.inviteMember` — Invite team member
- `organization.removeMember` — Remove team member
- `onboarding.complete` — Mark onboarding as completed

**Actions (non-deterministic, external APIs):**
- `stripe.createCheckoutSession` — Create Stripe checkout
- `stripe.createPortalSession` — Create billing portal session
- `stripe.handleWebhook` — Process Stripe webhooks
- `monitoring.collectPricingData` — Scrape pricing pages
- `monitoring.collectProductData` — Check changelogs
- `monitoring.collectWebsiteData` — Capture website snapshots
- `monitoring.collectHiringData` — Aggregate job postings
- `monitoring.collectPositioningData` — Check messaging
- `ai.analyzeChange` — Generate AI analysis of a change
- `ai.generateSummary` — Generate natural language summary

---

## 9. Non-Functional Requirements

### 9.1 Performance
- Dashboard initial load: < 2 seconds
- Real-time updates: < 500ms propagation
- Data collection cycle: Complete within configured interval
- AI analysis response: < 10 seconds per change
- Time to first insight (new user): < 5 minutes

### 9.2 Security
- All data encrypted at rest and in transit (TLS 1.3)
- Authentication via Convex Auth (JWT-based)
- Role-based access control (owner, admin, member)
- API rate limiting per organization
- Input validation and sanitization on all user inputs
- OWASP Top 10 compliance
- No secrets in client-side code
- All API keys in environment variables only
- CORS configured for production domain only
- CSP headers configured

### 9.3 Scalability
- Support 1,000+ concurrent users
- Handle 10,000+ monitored URLs
- Data collection scales horizontally via Convex actions
- Database indexes on frequently queried fields
- Pagination on all list endpoints (default 20, max 100)

### 9.4 Reliability
- 99.9% uptime target
- Graceful degradation if external APIs are unavailable
- Retry logic with exponential backoff for data collection
- Error logging and monitoring
- Data collection failures don't block user-facing features

### 9.5 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- Color contrast ratios meet AA standards
- Focus indicators on all interactive elements

---

## 10. Environment Variables Summary

All configurable values MUST be stored as environment variables. No hardcoded values in source code.

### Application Configuration
```
NEXT_PUBLIC_APP_NAME=RivalSense
NEXT_PUBLIC_APP_URL=https://rivalsense.com
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud
```

### Authentication
```
CONVEX_AUTH_SECRET=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

### Stripe
```
STRIPE_SECRET_KEY=sk_xxx
STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxx
```

### AI / OpenRouter
```
OPENROUTER_API_KEY=sk-or-xxx
OPENROUTER_MODEL=anthropic/claude-sonnet-4-6
```

### Monitoring Configuration
```
PRICING_CHECK_INTERVAL=6
PRODUCT_CHECK_INTERVAL=12
WEBSITE_CHECK_INTERVAL=24
HIRING_CHECK_INTERVAL=12
POSITIONING_CHECK_INTERVAL=24
CHANGE_SIGNIFICANCE_THRESHOLD=5
```

### Tier Limits
```
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

## 11. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Insight | < 5 minutes | From signup to first change detected |
| Onboarding Completion Rate | > 80% | Users who complete competitor setup |
| DAU/MAU Ratio | > 40% | Daily active users / monthly active users |
| MRR Growth | 15%+ MoM | Monthly recurring revenue growth in Year 1 |
| Trial-to-Paid Conversion | > 15% | Free trial users who convert to paid |
| Monthly Churn | < 5% | Percentage of paid users who cancel |
| Net Revenue Retention | > 120% | Revenue retention including expansion |
| Dashboard Load Time | < 2 seconds | P95 load time for authenticated dashboards |
| Data Freshness | Per interval config | Changes detected within configured check interval |

---

## 12. Release Plan

### MVP (v1.0) — Target: 8-week development cycle
- Complete authentication and onboarding
- All 5 intelligence dashboards (core features)
- Stripe subscription management
- Real-time alerts (in-app + email)
- Global overview dashboard
- Team management (basic)
- Competitor management

### v1.1 — Quick follow (2 weeks post-launch)
- Improved AI summaries
- Export reports as PDF
- Enhanced visual diffs
- Performance optimizations

### v2.0 — Feature expansion (8 weeks post-launch)
- Slack/Teams integration
- API access (Pro+)
- Battlecard generator
- SSO/SAML (Enterprise)
- Annual billing option
- Advanced custom alerts

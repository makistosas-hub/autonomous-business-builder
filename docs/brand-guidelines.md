# Brand Guidelines: RivalSense

> Version 1.0 — Foundation Document for UX Designer and Frontend Implementation

---

## 1. Brand Overview

### 1.1 Brand Mission

To give every product team, marketer, and founder the same competitive intelligence advantage once reserved for enterprise companies with $50,000+ budgets.

### 1.2 Brand Vision

A world where B2B companies compete on the quality of their ideas and execution — not on who can afford the best intelligence analysts. RivalSense becomes the always-on competitive radar that every product-led company runs silently in the background, surfacing signals before they become surprises.

### 1.3 Brand Values

- **Clarity**: We turn raw signals into clear decisions. No noise, no fluff — just the intelligence that matters, presented without ambiguity.
- **Speed**: Competitive advantage decays by the hour. We surface insights in minutes, not weekly digests, because timing is everything in a fast-moving market.
- **Accessibility**: Enterprise-grade intelligence should not require enterprise budgets. We build for the product manager at a 30-person startup, not just the VP of Strategy at a Fortune 500.
- **Trust**: The data we surface drives real business decisions. We hold ourselves to rigorous accuracy standards and always distinguish between observed data and AI-generated inference.
- **Autonomy**: Once configured, RivalSense runs without babysitting. Our customers gain intelligence without adding to their workload.

---

## 2. Brand Identity

### 2.1 Brand Name

**RivalSense**

**Name Rationale**: The name combines "Rival" (direct acknowledgment of competitive context) with "Sense" (dual meaning: the sensory act of detecting and monitoring, plus good judgment/intelligence). Together they communicate active, intelligent awareness of the competitive landscape. The name is memorable, domain-friendly, and says exactly what the product does without being jargon-heavy. It positions the product as a sensing organ for competitive awareness rather than a passive reporting tool.

**Pronunciation**: RY-val-SENS

**Typography Treatment**: Set as one word in title case — "RivalSense" — never split as "Rival Sense" or abbreviated as "RS" in primary brand contexts.

### 2.2 Tagline

**"Know what your competitors do before they announce it."**

**Tagline Purpose**: This tagline is deliberately provocative and benefit-specific. It speaks directly to the primary fear of the target audience — being caught off-guard by a competitor move. It implies a temporal advantage (before they announce it), which is the core emotional value of the product. It is written in second person to address the reader directly and uses plain, concrete language that avoids tech buzzwords.

**Secondary Taglines by Context**:

- **Short form (ads, badges)**: "Always-on competitor intelligence."
- **Feature context**: "Set up once. Stay ahead always."
- **Pricing page**: "Enterprise intelligence. Startup pricing."
- **Onboarding**: "Your competitive radar, configured in 5 minutes."

### 2.3 Positioning Statement

For product managers, marketing teams, sales teams, and founders at B2B SaaS companies, who lose competitive advantage because monitoring competitors manually is slow, incomplete, and unsustainable, RivalSense is an always-on competitive intelligence platform that automatically tracks pricing changes, product launches, website modifications, hiring signals, and positioning shifts across all your competitors in real time. Unlike Klue, Crayon, and Kompyte — which require $20,000–$50,000 annual commitments and dedicated analyst support — RivalSense delivers AI-powered competitive intelligence starting at $49/month with self-serve onboarding completed in under 5 minutes.

### 2.4 Brand Personality

- **Archetype**: The Sage — knowledgeable, discerning, trustworthy. RivalSense does not shout; it whispers exactly the right insight at the right time. The product feels like having a deeply informed advisor who has been watching your competitive landscape all day so you do not have to.
- **Personality Traits**: Precise, Alert, Discerning, Approachable, Efficient
- **Voice Characteristics**: Authoritative without being intimidating. Technical but not inaccessible. Data-forward but human in delivery. Confident without arrogance. Direct without being cold.

---

## 3. Visual Identity

### 3.1 Color Palette

The RivalSense color system is built around a deep navy foundation that communicates intelligence, trust, and depth — consistent with how users perceive financial terminals, security platforms, and professional analytics tools. Electric accent colors inject energy and signal urgency, distinguishing interactive elements and alert states from informational content. Each of the five intelligence dashboards carries its own dedicated accent color, enabling users to orient themselves instantly within the product.

All color values are expressed as design tokens. No hex values should be hardcoded directly in component files — they must be referenced via CSS custom properties or Tailwind configuration.

---

#### Primary Brand Colors

- **`--color-brand-navy`**: `#0F1629`
  - RGB: 15, 22, 41
  - HSL: 225, 46%, 11%
  - Usage: Primary page backgrounds (dark mode), sidebar, top navigation, logo lockup background
  - Psychology: Deep navy communicates expertise, stability, and depth of information. It anchors the interface and creates the sense of looking into a sophisticated monitoring system rather than a consumer app.

- **`--color-brand-slate`**: `#1E2D4A`
  - RGB: 30, 45, 74
  - HSL: 220, 42%, 20%
  - Usage: Card backgrounds (dark mode), secondary surfaces, elevated panels, modals
  - Psychology: Lighter than the primary navy, this creates layering depth — the visual equivalent of panels stacking on a real intelligence terminal.

- **`--color-brand-electric`**: `#3B82F6`
  - RGB: 59, 130, 246
  - HSL: 217, 91%, 60%
  - Usage: Primary CTAs, active navigation states, links, progress indicators, primary brand element in light mode headers
  - Psychology: Electric blue signals active intelligence and technology. It is the "live" color — the color that pulses when data is fresh and systems are running.

- **`--color-brand-electric-vivid`**: `#2563EB`
  - RGB: 37, 99, 235
  - HSL: 221, 83%, 53%
  - Usage: Hover states on primary CTAs, focused input rings, active button pressed states
  - Psychology: Deeper and more authoritative version of the electric primary — used when confirming user action or focus.

---

#### Secondary Brand Color

- **`--color-brand-cyan`**: `#06B6D4`
  - RGB: 6, 182, 212
  - HSL: 189, 94%, 43%
  - Usage: Real-time activity indicators, live data badges, streaming/pulse animations, "new signal" callouts
  - Psychology: Cyan reads as "live" and "transmitting" — the color of radar sweeps, satellite feeds, and active sensors. It reinforces the monitoring/sensing metaphor of the brand name.

- **`--color-brand-cyan-muted`**: `#0E7490`
  - RGB: 14, 116, 144
  - HSL: 191, 82%, 31%
  - Usage: Secondary text on dark backgrounds, subdued metadata labels, less prominent live indicators

---

#### Dashboard Accent Colors

Each of the five intelligence dashboards has a dedicated accent color. These colors are used for dashboard navigation tabs, dashboard-specific chart lines, section headers within each dashboard, and badge/tag elements. They are never used as primary CTAs — their role is categorical identification.

- **`--color-dashboard-pricing`**: `#10B981`
  - Name: Pricing Green
  - RGB: 16, 185, 129
  - HSL: 160, 84%, 39%
  - Rationale: Green universally signals money, value, and financial data. Pricing changes are immediately recognizable.
  - Light mode label color: `#065F46`
  - Dark mode label color: `#34D399`

- **`--color-dashboard-product`**: `#8B5CF6`
  - Name: Product Purple
  - RGB: 139, 92, 246
  - HSL: 258, 90%, 66%
  - Rationale: Purple signals innovation, product thinking, and creativity — the domain of product launches and feature releases.
  - Light mode label color: `#5B21B6`
  - Dark mode label color: `#A78BFA`

- **`--color-dashboard-website`**: `#F59E0B`
  - Name: Website Amber
  - RGB: 245, 158, 11
  - HSL: 38, 92%, 50%
  - Rationale: Amber signals change, caution, and attention — appropriate for visual diff alerts and page modifications. It carries the "something changed" emotional register.
  - Light mode label color: `#92400E`
  - Dark mode label color: `#FCD34D`

- **`--color-dashboard-hiring`**: `#EF4444`
  - Name: Hiring Red
  - RGB: 239, 68, 68
  - HSL: 0, 84%, 60%
  - Rationale: Red signals activity and urgency — a competitor opening 20 engineering roles is a strategic signal worth noticing immediately. The warm red also echoes talent/HR tool conventions.
  - Light mode label color: `#991B1B`
  - Dark mode label color: `#FCA5A5`

- **`--color-dashboard-positioning`**: `#3B82F6`
  - Name: Positioning Blue
  - RGB: 59, 130, 246
  - HSL: 217, 91%, 60%
  - Rationale: Blue matches the brand primary and signals communication, messaging, and language — the domain of positioning and brand monitoring. This dashboard is the most brand-aligned.
  - Light mode label color: `#1E40AF`
  - Dark mode label color: `#93C5FD`

---

#### Neutral Colors — Light Mode

- **`--color-bg-primary`**: `#FFFFFF`
  - Usage: Main page background, card surfaces, input backgrounds

- **`--color-bg-secondary`**: `#F8FAFC`
  - Usage: Subtle section backgrounds, table row alternates, sidebar background

- **`--color-bg-tertiary`**: `#F1F5F9`
  - Usage: Hover states on rows, disabled input backgrounds, skeleton screens

- **`--color-border-default`**: `#E2E8F0`
  - Usage: Card borders, dividers, input borders (resting state)

- **`--color-border-subtle`**: `#F1F5F9`
  - Usage: Very light section dividers, table cell borders

- **`--color-border-emphasis`**: `#CBD5E1`
  - Usage: Active input borders, focused element outlines (non-electric)

- **`--color-text-primary`**: `#0F172A`
  - Usage: Primary body text, headings, card titles

- **`--color-text-secondary`**: `#475569`
  - Usage: Secondary body copy, labels, supporting metadata

- **`--color-text-tertiary`**: `#94A3B8`
  - Usage: Placeholder text, disabled states, timestamps

- **`--color-text-inverse`**: `#FFFFFF`
  - Usage: Text on dark/colored backgrounds

---

#### Neutral Colors — Dark Mode

- **`--color-bg-primary-dark`**: `#0F1629`
  - Usage: Main page background (matches brand navy)

- **`--color-bg-secondary-dark`**: `#1E2D4A`
  - Usage: Card surfaces, panel backgrounds, sidebar

- **`--color-bg-tertiary-dark`**: `#253350`
  - Usage: Hover states, active table rows, elevated modals

- **`--color-bg-overlay-dark`**: `#162035`
  - Usage: Tooltip backgrounds, dropdown menus

- **`--color-border-default-dark`**: `#2D4060`
  - Usage: Card borders, dividers on dark surfaces

- **`--color-border-subtle-dark`**: `#1E3050`
  - Usage: Very subtle dividers within dark panels

- **`--color-border-emphasis-dark`**: `#3B5075`
  - Usage: Active inputs, selected state outlines

- **`--color-text-primary-dark`**: `#F1F5F9`
  - Usage: Primary headings and body text on dark backgrounds

- **`--color-text-secondary-dark`**: `#94A3B8`
  - Usage: Secondary labels, metadata, timestamps on dark

- **`--color-text-tertiary-dark`**: `#64748B`
  - Usage: Placeholder text, disabled states on dark

---

#### Semantic / Status Colors

- **`--color-success`**: `#10B981`
  - RGB: 16, 185, 129
  - Usage: Positive trend indicators, successful actions, "no change" confirmations
  - Background tint: `#D1FAE5` (light) / `#064E3B` (dark)

- **`--color-warning`**: `#F59E0B`
  - RGB: 245, 158, 11
  - Usage: Moderate change alerts, items needing attention, approaching plan limits
  - Background tint: `#FEF3C7` (light) / `#78350F` (dark)

- **`--color-danger`**: `#EF4444`
  - RGB: 239, 68, 68
  - Usage: Critical alerts, destructive actions, high-significance competitive signals
  - Background tint: `#FEE2E2` (light) / `#7F1D1D` (dark)

- **`--color-info`**: `#3B82F6`
  - RGB: 59, 130, 246
  - Usage: Informational callouts, neutral system messages, new feature hints
  - Background tint: `#DBEAFE` (light) / `#1E3A8A` (dark)

- **`--color-neutral`**: `#64748B`
  - RGB: 100, 116, 139
  - Usage: "Unchanged" state badges, unread/read state transitions, inactive items
  - Background tint: `#F1F5F9` (light) / `#1E293B` (dark)

---

#### Signal Severity Colors (Competitive Intelligence Specific)

These colors map to the significance scoring system in the change detection engine:

- **`--color-signal-critical`**: `#EF4444` — Major competitive move (price drop, major launch)
- **`--color-signal-high`**: `#F97316` — Significant change (new feature, messaging shift)
  - RGB: 249, 115, 22
- **`--color-signal-medium`**: `#F59E0B` — Notable change (job posting, minor pricing adjust)
- **`--color-signal-low`**: `#10B981` — Minor change (blog post, small UI tweak)
- **`--color-signal-none`**: `#94A3B8` — No change detected

---

#### Color Accessibility Notes

The following combinations are verified to meet **WCAG AA minimum 4.5:1 contrast ratio** for normal text:

| Foreground | Background | Ratio | Use Case |
|---|---|---|---|
| `#0F172A` | `#FFFFFF` | 18.3:1 | Primary text on white |
| `#FFFFFF` | `#0F1629` | 19.2:1 | Text on brand navy |
| `#FFFFFF` | `#3B82F6` | 3.0:1 (AA large only) | Buttons — use bold weight |
| `#FFFFFF` | `#2563EB` | 4.6:1 | Primary CTA buttons |
| `#0F172A` | `#F8FAFC` | 16.4:1 | Body text on off-white |
| `#F1F5F9` | `#0F1629` | 14.7:1 | Light text on dark navy |
| `#94A3B8` | `#0F1629` | 5.1:1 | Secondary text on dark |
| `#065F46` | `#D1FAE5` | 7.2:1 | Success badge text/bg |
| `#92400E` | `#FEF3C7` | 6.8:1 | Warning badge text/bg |
| `#991B1B` | `#FEE2E2` | 7.4:1 | Danger badge text/bg |
| `#1E40AF` | `#DBEAFE` | 6.5:1 | Info badge text/bg |

All interactive elements (buttons, links) are verified at WCAG AA. Dashboard accent colors are never used alone as text on white — always as paired badge combinations defined above.

---

### 3.2 Typography

#### Primary Display Font: Plus Jakarta Sans

**Source**: Google Fonts — `https://fonts.google.com/specimen/Plus+Jakarta+Sans`

**Usage**: Page titles, section headers, dashboard headings, marketing headlines, logo wordmark, pricing tiers, onboarding steps

**Weights Used**:
- 400 (Regular) — rarely used in display contexts
- 500 (Medium) — subheadings, card titles
- 600 (SemiBold) — section headers, feature names
- 700 (Bold) — page titles, marketing headlines
- 800 (ExtraBold) — hero headlines, pricing numbers, impactful callouts

**Rationale**: Plus Jakarta Sans has a distinct geometric warmth that balances precision with approachability. Its rounded terminals soften the data-dense nature of a monitoring dashboard without sacrificing the professional authority required for a B2B intelligence product. It distinguishes RivalSense from purely utilitarian dashboard tools that rely on system fonts, while remaining legible at small sizes in data tables.

**CSS Import**:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

**CSS Variable**: `--font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`

---

#### Secondary Body/UI Font: Inter

**Source**: Google Fonts — `https://fonts.google.com/specimen/Inter`

**Usage**: All body copy, UI labels, form inputs, table data, navigation items, tooltips, notifications, metadata timestamps, code/data strings

**Weights Used**:
- 400 (Regular) — body text, input values, table cell content
- 500 (Medium) — UI labels, navigation items, button text
- 600 (SemiBold) — emphasized data values, active navigation, column headers

**Rationale**: Inter was designed explicitly for screen readability. Its tight tracking and optimized hinting at small sizes make it ideal for data-dense dashboards where users scan dozens of rows of competitive data. Inter's neutrality ensures it never competes with the data itself — the content reads forward, the font recedes into structure. The Plus Jakarta Sans / Inter pairing creates a harmonious contrast: expressive display type for orientation and hierarchy, workhorse body type for information consumption.

**CSS Import**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
```

**CSS Variable**: `--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`

---

#### Monospace Font: JetBrains Mono

**Source**: Google Fonts — `https://fonts.google.com/specimen/JetBrains+Mono`

**Usage**: API keys displayed in UI, code snippets in documentation, webhook URLs, data values that are numeric identifiers, diff views in website change monitor

**Weights Used**:
- 400 (Regular)
- 500 (Medium)

**CSS Variable**: `--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;`

---

#### Typography Scale — Design Tokens

All sizes use `rem` units. Base font size: `16px` (1rem).

| Token | Size | Rem | Weight | Line Height | Font | Usage |
|---|---|---|---|---|---|---|
| `--text-display-2xl` | 60px | 3.75rem | 800 | 1.1 | Plus Jakarta Sans | Hero marketing headlines |
| `--text-display-xl` | 48px | 3rem | 800 | 1.15 | Plus Jakarta Sans | Major page titles |
| `--text-display-lg` | 36px | 2.25rem | 700 | 1.2 | Plus Jakarta Sans | Section heroes |
| `--text-display-md` | 30px | 1.875rem | 700 | 1.25 | Plus Jakarta Sans | Dashboard section titles |
| `--text-display-sm` | 24px | 1.5rem | 600 | 1.3 | Plus Jakarta Sans | Card headers, modal titles |
| `--text-display-xs` | 20px | 1.25rem | 600 | 1.35 | Plus Jakarta Sans | Subsection headers |
| `--text-body-xl` | 18px | 1.125rem | 400 | 1.6 | Inter | Hero subheadlines, lead copy |
| `--text-body-lg` | 16px | 1rem | 400 | 1.6 | Inter | Standard body copy |
| `--text-body-md` | 14px | 0.875rem | 400 | 1.5 | Inter | Table data, secondary body |
| `--text-body-sm` | 13px | 0.8125rem | 400 | 1.5 | Inter | Metadata, captions, help text |
| `--text-label-lg` | 14px | 0.875rem | 500 | 1.4 | Inter | Form labels, nav items |
| `--text-label-md` | 13px | 0.8125rem | 500 | 1.4 | Inter | Badges, column headers |
| `--text-label-sm` | 11px | 0.6875rem | 600 | 1.3 | Inter | Micro-labels, tags, timestamps |
| `--text-code-md` | 13px | 0.8125rem | 400 | 1.6 | JetBrains Mono | Code, API keys, diffs |
| `--text-code-sm` | 11px | 0.6875rem | 400 | 1.5 | JetBrains Mono | Inline code in docs |

**Letter Spacing Tokens**:
- `--tracking-tight`: `-0.02em` — Used for large display headings
- `--tracking-normal`: `0em` — Used for body text
- `--tracking-wide`: `0.05em` — Used for small labels and tags (ALL CAPS is never used)
- `--tracking-wider`: `0.08em` — Used for the logo wordmark sub-context

---

### 3.3 Logo Direction

**Style**: Icon + Wordmark lockup, with standalone icon variant for app icons, favicons, and compact contexts

**Wordmark Treatment**: "RivalSense" in Plus Jakarta Sans ExtraBold (800), with the "Rival" portion in `--color-text-primary` and "Sense" in `--color-brand-electric`. This split-color treatment reinforces the dual meaning of the name and provides a subtle brand distinction without requiring a separate typographic style.

**Icon Concept — Radar Pulse**: The primary icon is a stylized radar/sweep metaphor composed of three concentric arc segments (not full circles) that sweep outward from a single origin point at approximately 4 o'clock. The outermost arc is lightest in weight and uses the cyan brand color, the middle arc uses the electric blue, and the central origin point is a small filled circle. The result reads simultaneously as: a radar sweep (surveillance/monitoring), a signal pulse (live data), a lens with depth of field rings (focused intelligence), and an abstract target sight (competitive awareness).

**Icon Characteristics**:
- Geometric, not illustrative
- Works in single color (brand electric) for monochrome contexts
- Works reversed on dark backgrounds without modification
- Minimum display size: 16x16px (favicon), optimal usage 24px and above
- No drop shadows, gradients, or decorative elements in the primary mark

**Mood Board Visual References**:
- The precision of Vercel's triangular logo — clean, directional, implies speed
- The depth of Datadog's dog-monitoring metaphor — an entity that is always watching
- The intelligence of Palantir's color-ring symbol — data layers rendered as concentric forms
- The accessibility of Linear's logo — technical product that feels approachable, not intimidating
- Visual language: Think less "surveillance" (cold, clinical) and more "strategic awareness" (warm, empowering)

**Logo Clearspace**: Minimum clearspace equal to the height of the capital "R" in the wordmark on all four sides.

**Logo Don'ts**:
- Never stretch or distort the icon proportions
- Never apply the dashboard accent colors to the primary logo
- Never render the wordmark in a font other than Plus Jakarta Sans
- Never add a drop shadow to the logo in digital contexts
- Never place the light-mode logo on the brand navy background without switching to the inverse variant

---

## 4. Brand Voice and Tone

### 4.1 Voice Characteristics

RivalSense communicates like a sharp, trusted colleague who has done the research so you do not have to. The voice is always intelligent but never condescending, always direct but never cold.

**Our brand voice is**:

1. **Precise**: We state facts, not approximations. "Acme Corp added 3 engineering job postings in the last 48 hours" rather than "Acme Corp seems to be hiring more." When we use AI-generated inference, we flag it clearly. We earn trust by being specific.

2. **Alert without alarmism**: We signal importance through information, not exclamation. A major competitor pricing change is communicated with the same calm authority as a minor website tweak — the data carries the weight, not the punctuation. We avoid ALL CAPS, excessive exclamation marks, and anxiety-inducing urgency copy.

3. **Empowering**: Every message positions the reader as someone who now has an advantage. "You're the first to know" and "you're ahead of the curve" — we celebrate the intelligence, never make users feel behind.

4. **Efficient**: We respect that our users are busy. Notifications are scannable. Copy is front-loaded with the most important information. We never bury the signal in three paragraphs of context.

5. **Honest about AI**: When insights are AI-generated inferences rather than observed data, we say so. "RivalSense detected this change" vs. "AI inference: this may signal a repositioning toward enterprise." Transparency builds long-term trust.

**Our brand voice is NOT**:

1. **Sensationalist**: We do not write notification copy like tabloid headlines. "MAJOR ALERT: Competitor destroyed your pricing strategy!!!" is not how we communicate. That approach erodes trust and trains users to ignore notifications.

2. **Enterprise stiff**: Phrases like "leverage synergistic competitive intelligence to drive holistic go-to-market alignment" are forbidden. We talk like a sharp person, not a McKinsey deck.

3. **Dismissive of uncertainty**: We do not overstate confidence in AI inferences. If a signal is ambiguous, we say it is ambiguous and explain why it might matter.

4. **Cutesy or whimsical**: This is a professional B2B tool that drives real business decisions. Light warmth is appropriate in onboarding and empty states, but we never adopt a playful startup mascot voice in contexts where users are processing high-stakes competitive data.

---

### 4.2 Tone by Context

| Context | Tone | Example |
|---|---|---|
| Homepage hero | Bold, confident, provocative | "Know what your competitors do before they announce it." |
| Alert notification | Calm, precise, fact-first | "Stripe updated their pricing page. 3 plan names changed, enterprise pricing removed." |
| Onboarding step | Warm, encouraging, clear | "Great — RivalSense is now watching Acme Corp. You'll hear from us the moment anything changes." |
| Empty state | Helpful, constructive | "No signals yet — your competitors' radar is running. Check back in a few hours for your first insights." |
| Error message | Direct, solution-oriented | "We couldn't reach that URL. Check that the page is publicly accessible and try again." |
| Success confirmation | Brief, affirming | "Competitor added. Monitoring starts now." |
| Upgrade prompt | Honest, value-focused | "You've reached your 3-competitor limit on the Starter plan. Upgrade to Pro to track 10 competitors with real-time alerts." |
| Pricing page | Clear, comparative | No hidden fees. No annual lock-in required. Cancel or change plans anytime." |
| Battlecard generator | Confident, sales-enabling | "Here's your competitive edge against HubSpot — updated 2 hours ago." |
| Technical docs | Precise, educational | "The webhook payload includes a `signal_type` field that maps to one of five values: pricing, product, website, hiring, or positioning." |
| Weekly digest email | Warm, briefing-style | "Here's what moved in your competitive landscape this week — 12 signals across 4 competitors." |

---

### 4.3 Writing Guidelines

**Do**:
- Lead with the data point, not the context: "Salesforce raised Basic plan pricing by 15%" not "We noticed that Salesforce recently made some changes to..."
- Use second person ("you", "your") to make users feel the intelligence is theirs
- Front-load notifications with the signal type: "[PRICING] HubSpot | Starter plan: $45 → $55/mo"
- Be specific about timeframes: "detected 47 minutes ago" not "just now"
- Use active voice: "RivalSense detected" not "A change was detected"
- Use plain numbers: "3 new job postings" not "a number of new job postings"
- Distinguish observed data from AI inference with clear labels in the UI
- Keep CTAs to one verb + one object: "Start monitoring" "View signal" "Generate battlecard" "Upgrade plan"

**Don't**:
- Write more than two sentences in a notification or toast message
- Use exclamation marks in alert notifications (reserve for genuine celebration moments like first signal detected, first battlecard generated)
- Use "leverage," "synergy," "robust," "comprehensive," "cutting-edge," "game-changing," or "disruptive"
- Write passive-voice error messages: "An error has been encountered"
- Use vague time references: "recently," "soon," "shortly"
- Capitalize random product features as Proper Nouns unless they are formally named: write "the pricing dashboard" not "the Pricing Dashboard" in prose
- Use ellipses (...) in UI copy — they imply hesitation

---

## 5. Key Messaging

### 5.1 Core Message

RivalSense is the always-on competitive intelligence platform that automatically tracks what your competitors are doing across pricing, products, website changes, hiring, and positioning — so you can make faster, better-informed decisions without manual research.

### 5.2 Message Pillars

#### Pillar 1: Always-On Intelligence

- **Headline**: Your competitors never stop moving. Neither does RivalSense.
- **Supporting Points**:
  - Set up competitors once in under 5 minutes — RivalSense monitors continuously from that moment forward
  - Signals are detected in minutes, not days — your competitive advantage depends on timing
  - Five dimensions of monitoring run simultaneously: you never miss a move across pricing, products, websites, hiring, or messaging
  - No manual checking, no missed signals during vacations, no stale weekly summaries

#### Pillar 2: Enterprise Intelligence, Startup Pricing

- **Headline**: The intelligence your $50K competitors pay for, starting at $49/month.
- **Supporting Points**:
  - Klue and Crayon require $20,000–$50,000 annual contracts — RivalSense starts at $49/month with no sales call required
  - Self-serve onboarding: add your first competitor and start receiving signals in under 5 minutes
  - No dedicated analysts, no professional services fees, no lengthy implementation
  - Scales from solo founder to marketing team to enterprise without re-platforming

#### Pillar 3: AI That Explains, Not Just Reports

- **Headline**: Not just data — the intelligence behind the data.
- **Supporting Points**:
  - AI-generated natural language summaries explain what a change means, not just that it happened
  - Strategic signal detection identifies patterns across multiple data points: hiring + product + pricing combined tells a story
  - Auto-generated battlecards translate competitive data into sales enablement, ready to use in deals
  - Significance scoring filters out noise so your feed surfaces only the signals that matter to your decisions

---

### 5.3 Audience-Specific Messaging

#### For Product Managers

**Primary Message**: Know about competitor feature releases before your users do.

**Pain Point Addressed**: By the time competitive intel reaches the product team, it has already influenced customer conversations, churn decisions, and analyst commentary. Product managers need a proactive signal, not a reactive debrief.

**Key Benefit**: RivalSense tracks competitor changelogs, Product Hunt launches, job postings for new product roles, and hiring signals that indicate strategic pivots — synthesized into a product intelligence feed that updates the product roadmap conversation with real data.

**Resonant Copy Examples**:
- "Know when your biggest competitor ships a feature your customers have been requesting."
- "Hiring signals tell you where competitors are investing next — before they ship."
- "Turn competitive releases into roadmap decisions in the same sprint."

---

#### For Marketing Teams

**Primary Message**: Stop reacting to competitor campaigns. Start anticipating them.

**Pain Point Addressed**: Marketing teams spend enormous effort on competitive positioning while working with outdated information. By the time a positioning shift is noticed, the competitor has already run the A/B test, iterated the messaging, and moved on.

**Key Benefit**: RivalSense tracks homepage messaging, ad copy, blog themes, and social media positioning in real time. Marketing teams receive alerts when competitors change their messaging angle, enabling proactive response rather than reactive scrambling.

**Resonant Copy Examples**:
- "Get a notification the moment a competitor changes their hero headline."
- "Track which messaging angles competitors are testing — before they scale them."
- "Know about a competitor's new campaign before your sales team gets the first question about it."

---

#### For Sales Teams

**Primary Message**: Walk into every deal with better competitive intelligence than your prospects have.

**Pain Point Addressed**: Sales reps lose deals because competitive information is stale, incomplete, or inconsistent across the team. The rep who loses a deal to a competitor they did not know had just launched a new feature is working at a disadvantage that had nothing to do with their ability.

**Key Benefit**: RivalSense auto-generates battlecards from live competitive data, ensuring the entire sales team operates from current intelligence. Pricing changes, feature launches, and positioning shifts flow directly into the tools the team already uses.

**Resonant Copy Examples**:
- "Auto-generated battlecards, updated every time a competitor makes a move."
- "Every rep on your team gets the same competitive intelligence — instantly."
- "Stop losing deals because your competitive info was three months old."

---

#### For Founders and Executives

**Primary Message**: Strategic awareness of your competitive landscape, without the operational overhead.

**Pain Point Addressed**: Founders and executives need a high-level view of the competitive landscape but cannot afford to spend time on manual monitoring or wait for slow analyst workflows. The strategic cost of being surprised by a competitor move is enormous.

**Key Benefit**: RivalSense provides a weekly executive digest across all monitored competitors, with AI-synthesized strategic summaries that identify patterns and inflection points — giving leadership the awareness they need in a format that respects their time.

**Resonant Copy Examples**:
- "A five-minute weekly briefing on everything that moved in your competitive landscape."
- "Know when a competitor raises funding, hires aggressively, or changes their pricing model."
- "Strategic intelligence, without a six-figure analyst team."

---

## 6. Marketing Copy

### 6.1 Homepage Hero Section

**Primary Headline**: Know what your competitors do before they announce it.

**Subheadline**: RivalSense tracks pricing changes, product launches, website updates, hiring signals, and messaging shifts across all your competitors — automatically. Start in 5 minutes.

**Primary CTA Button**: Start Free Trial

**Secondary CTA Button**: See It in Action

**Trust Signal Below CTAs**: 14-day free trial. No credit card required. Cancel anytime.

**Supporting Social Proof Placement**: "[X] companies are monitoring [Y] competitors right now" — displayed as a live counter beneath the trust signal to reinforce the always-on monitoring narrative.

---

### 6.2 Feature Descriptions

#### Feature 1: Pricing Intelligence

**Headline**: Never be undercut again.

**Description**: RivalSense monitors competitor pricing pages continuously, detecting plan changes, price adjustments, and promotional offers the moment they appear. Historical tracking shows you exactly when changes occurred and what the shift means for your positioning.

**Key Points**:
- Automated detection of pricing page changes with visual diff
- Historical price timeline for every monitored competitor
- Promotion and discount detection (time-limited offers, hidden coupons)
- AI-generated analysis: "What does this pricing change signal about their strategy?"

---

#### Feature 2: Product Launch Tracker

**Headline**: Know what they're shipping before your customers do.

**Description**: Monitors competitor changelogs, GitHub activity, Product Hunt launches, press releases, and app store updates to surface every product move as it happens. Strategic signal detection identifies when hiring patterns correlate with upcoming launches.

**Key Points**:
- Changelog monitoring and AI-powered feature categorization
- Product Hunt and press release aggregation in real time
- Roadmap inference: connect hiring patterns to likely product investments
- Release significance scoring — major launch vs. minor UI tweak

---

#### Feature 3: Website Change Monitor

**Headline**: Catch every messaging shift the moment it happens.

**Description**: Side-by-side visual diffs show exactly what changed on competitor websites — hero copy, navigation structure, new pages, technology stack, and SEO signals. Nothing slips by undetected.

**Key Points**:
- Visual diff engine: pixel-level comparison with highlighted changes
- Content change tracking across homepage, pricing, about, and custom-tracked pages
- New page detection — know when a competitor adds a landing page targeting your customers
- Technology stack change detection (new integrations, tools, infrastructure signals)

---

#### Feature 4: Hiring Signal Analyzer

**Headline**: Their job postings tell you where they're investing next.

**Description**: Aggregates competitor job postings from LinkedIn, Indeed, Glassdoor, and career pages to identify strategic hiring patterns. A sudden surge in ML engineering roles or enterprise sales hiring tells a story — RivalSense reads it for you.

**Key Points**:
- Real-time job posting aggregation from all major sources
- Role categorization by function: Engineering, Product, Sales, Marketing, G&A
- Geographic expansion detection — new offices, new regions
- Growth trajectory tracking with trend visualization over time

---

#### Feature 5: Positioning and Messaging Tracker

**Headline**: Know when they pivot their story before it reaches your customers.

**Description**: Tracks homepage messaging, social media presence, blog content strategy, ad copy, and review sentiment to detect brand voice shifts and repositioning moves. When a competitor starts calling themselves an "enterprise platform," you know first.

**Key Points**:
- Homepage and key-page messaging change detection
- Social media monitoring across LinkedIn and X/Twitter
- Blog topic and content strategy pattern detection
- G2 and Capterra review sentiment trend tracking

---

### 6.3 Call-to-Action Variations

- **Primary CTA**: Start Free Trial
- **Secondary CTA**: See How It Works
- **Social Proof CTA**: Join [X] companies tracking their competition
- **Pricing Page CTA — Starter**: Start for Free
- **Pricing Page CTA — Pro**: Start Pro Trial
- **Pricing Page CTA — Enterprise**: Talk to Us
- **Trial Conversion CTA**: Upgrade to Keep Your Signals
- **Onboarding CTA**: Add Your First Competitor
- **Dashboard Empty State CTA**: Add Competitor to Monitor
- **Battlecard CTA**: Generate Battlecard
- **Alert Configuration CTA**: Configure Alert Preferences
- **API Docs CTA**: View API Reference

---

### 6.4 About / Mission Statement

**Paragraph 1 — The Problem**:
Competitive intelligence has always been critical to business success, but for most of the history of software, it has been either unavailable or unaffordable. The tools that exist demand five-figure annual contracts, lengthy onboarding with dedicated analysts, and enterprise procurement cycles that take longer than a competitor's product roadmap.

**Paragraph 2 — The Belief**:
We built RivalSense on a simple premise: every team building a product deserves to know what is happening in their competitive landscape in real time, not once a quarter in a deck that is already outdated. The product manager at a fifteen-person startup deserves the same quality of competitive intelligence as the VP of Strategy at a company with a full analyst team. Knowing what your competitors are doing should not be a luxury.

**Paragraph 3 — The Product**:
RivalSense is always-on competitive intelligence. It runs in the background of your work, watching five dimensions of competitor activity simultaneously — pricing, products, websites, hiring, and positioning — and surfaces exactly the signals that matter to your decisions. It is the competitive awareness layer that every product-led company should have, delivered at a price that makes it as accessible as any other essential SaaS tool in your stack.

---

### 6.5 Value Proposition Statement

RivalSense gives B2B SaaS teams real-time intelligence on competitor pricing, products, websites, hiring, and positioning — automatically tracked by AI, delivered as actionable signals, starting at $49/month.

---

## 7. Competitor Differentiation

| Aspect | RivalSense | Klue | Crayon | Kompyte/Semrush |
|---|---|---|---|---|
| Starting Price | $49/month (self-serve) | $16,000+/year | $12,500+/year | $20,000+/year |
| Onboarding | 5 minutes, no sales call | Weeks, with CSM | Weeks, with CSM | Weeks, with setup |
| Target Audience | SMBs, startups, B2B SaaS 10-500 employees | Enterprise sales orgs | Mid-market + enterprise | Enterprise |
| Intelligence Modules | 5 (pricing, product, website, hiring, positioning) | Battlecards + market intel | 360 competitive tracking | Tracking + battlecards |
| Update Frequency | Minutes (real-time) | Hours to days | Hours | Hours |
| AI Inference | Yes, with transparency labels | Yes (Compete Agent) | Yes (AI Toolkit) | Yes |
| Battlecard Generation | Yes (Pro+) | Yes (core feature) | Yes (core feature) | Yes |
| Self-Serve | Yes, fully | No | No | No |
| Free Trial | 14 days, no credit card | No public trial | No public trial | No public trial |
| Key Differentiator | Affordable, self-serve, real-time, 5-module coverage | Best-in-class battlecards for enterprise sales | Best-in-class depth for mid-market | Backed by Semrush SEO data |

---

## 8. Brand Applications

### 8.1 UI Element Styling Direction

**Buttons**:
- Primary buttons: `rounded-md` (6px border radius), solid `--color-brand-electric` fill, white text in Inter Medium, horizontal padding 16px minimum, 40px height for standard, 36px for compact contexts
- Secondary buttons: `rounded-md`, transparent background with `--color-border-default` border, `--color-text-primary` text
- Destructive buttons: `rounded-md`, `--color-danger` fill or outline variant
- Ghost buttons (used in navigation): No border, `--color-text-secondary` text, hover shows `--color-bg-tertiary` background
- Icon buttons: Square or circle, 36px or 40px target size, single icon centered

**Cards**:
- Light mode: white background, `--color-border-default` border (1px), subtle box shadow (`0 1px 3px rgba(0,0,0,0.08)`)
- Dark mode: `--color-bg-secondary-dark` background, `--color-border-default-dark` border
- Hover on interactive cards: lift with `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` and `translate-y-px`
- Border radius: `rounded-lg` (8px) for standard cards, `rounded-xl` (12px) for feature highlight cards
- Internal padding: 20px standard, 16px compact (data-dense contexts)

**Dashboard-Specific Card Accents**:
- Each dashboard's cards receive a 3px left border in the corresponding dashboard accent color
- Example: Pricing Intelligence cards — 3px left border in `--color-dashboard-pricing` (#10B981)
- This is the sole use of dashboard accent colors within card components — the rest of the card follows neutral styling

**Tables / Data Grids**:
- Sticky header with subtle background differentiation
- Row hover: `--color-bg-tertiary` (light) or `--color-bg-tertiary-dark` (dark)
- Column header text: Inter SemiBold, 13px, `--color-text-secondary` in light mode
- Cell text: Inter Regular, 14px
- Alternating row backgrounds are not used — hover states provide sufficient orientation

**Signal / Alert Badges**:
- Pill shape: `rounded-full`
- Critical: red background tint + dark red text
- High: orange background tint + dark orange text
- Medium: amber background tint + dark amber text
- Low: green background tint + dark green text
- Font: Inter SemiBold, 11px, letter-spacing 0.05em

**Navigation**:
- Sidebar: dark background (`--color-bg-primary-dark` or near-equivalent in light mode as `--color-bg-secondary`)
- Active nav item: `--color-brand-electric` left border (3px), electric background tint, electric text
- Inactive nav item: `--color-text-secondary-dark` text, hover shows subtle tint
- Dashboard module icons in sidebar: Lucide icons, 18px, colored in respective dashboard accent color

**Charts / Data Visualizations**:
- Chart primary line: `--color-brand-electric`
- Grid lines: `--color-border-subtle` (very light, barely visible)
- Axis labels: Inter, 11px, `--color-text-tertiary`
- Trend up indicators: `--color-success`
- Trend down indicators: `--color-danger`
- Area fills: 15% opacity version of line color
- Chart background: transparent on card surfaces

**Input Fields**:
- Border: `--color-border-default`, 1px
- Focus ring: `--color-brand-electric`, 2px offset, 2px width (not a border replacement — a visible ring outside the border)
- Placeholder: `--color-text-tertiary`
- Error state: `--color-danger` border with error message below in `--color-danger` text
- Border radius: `rounded-md` (6px)
- Height: 40px standard, 36px compact

**Loading / Skeleton States**:
- Use shimmer animation from `--color-bg-tertiary` to `--color-border-default` in light mode
- In dark mode: from `--color-bg-tertiary-dark` to `--color-border-default-dark`
- No spinner for inline data loading — skeleton shapes that match expected content layout

**Empty States**:
- Centered layout with Lucide icon (48px, `--color-text-tertiary`), headline in Plus Jakarta Sans SemiBold, one-line description in Inter Regular, single CTA button
- Never use placeholder data — always use genuine empty state copy

---

### 8.2 Iconography (Lucide Icons)

**Library**: Lucide React — `lucide-react` npm package

**Default Properties**:
- Stroke width: `1.5` (slightly thinner than Lucide default of 2 — creates a more refined, less heavy feel in dense dashboard contexts)
- Size: Context-dependent (see scale below)
- Color: `currentColor` (inherits from parent CSS color)

**Icon Size Scale**:
- `12px` — Inline contextual icons (next to timestamps, next to data labels)
- `16px` — Small UI icons (table row actions, compact nav, tooltip triggers)
- `18px` — Standard navigation icons in sidebar
- `20px` — Card action icons, form input icons
- `24px` — Feature icons in cards, section indicators
- `32px` — Empty state supporting icons
- `48px` — Primary empty state icons, onboarding step icons

**Icon Mapping for Dashboards**:
- Pricing Intelligence: `tag` or `dollar-sign`
- Product Launch Tracker: `rocket` or `package`
- Website Change Monitor: `globe` or `eye`
- Hiring Signal Analyzer: `users` or `briefcase`
- Positioning Tracker: `megaphone` or `message-square`
- Alerts: `bell`
- Battlecards: `shield`
- Settings: `settings`
- API: `code-2`
- Integrations: `plug`
- Report: `file-bar-chart`
- Signal / Event: `zap`
- Trend up: `trending-up`
- Trend down: `trending-down`
- Real-time / Live: `activity`
- Competitor: `building-2`

---

### 8.3 Imagery Guidelines

**Photography Style**: Not used in product interface contexts. The product is data — photography would dilute the intelligence aesthetic. On marketing pages, if photography is used, it should be: candid professional settings (team in a meeting, person reviewing a laptop), desaturated and dark-tinted to integrate with the navy color system, always serving as a background layer beneath copy — never as a hero element competing with the headline.

**Illustration Style**: Minimal, geometric, line-based. If product illustrations are needed (onboarding, empty states), they follow these rules:
- Maximum two colors: `--color-brand-electric` and one neutral
- Stroke-based, matching Lucide's aesthetic sensibility
- No gradient fills within illustrations
- Subject matter: radars, dashboards, signal waves, lens shapes, directional arrows — always tied to the intelligence/monitoring metaphor

**Data Visualization as Brand Expression**: RivalSense's most distinctive visual element is its live data. Clean, well-designed charts and timelines are the brand's primary imagery. Invest in beautiful data visualization that feels precision-built, not generic Chart.js defaults.

---

## 9. Marketing Channels

### 9.1 Launch Channels

- **Product Hunt Launch**: Primary launch vehicle. Competitive intelligence is a popular category with established audiences of PMs, founders, and marketers who are the exact ICP.
- **Content SEO**: Programmatic pages for "competitor analysis of [SaaS product name]" queries — high intent, directly relevant to the product's value proposition.
- **LinkedIn**: Organic content targeting PMs, marketing leaders, and founders — "What your competitors' hiring data tells you about their roadmap" — educational content that demonstrates the product's intelligence without requiring a demo.
- **B2B SaaS Community Channels**: Indie Hackers, SaaStr community, Slack communities for PMs and marketers (Product School, Mind the Product, Demand Gen Connect).

### 9.2 Content Pillars

1. **Intelligence Reports**: Quarterly "State of Competitive Intelligence in SaaS" reports. Category-specific competitive landscape analyses. Free tools: public competitive analysis templates, battlecard templates.
2. **Tactical Education**: "How to use hiring data to predict competitor roadmaps." "5 pricing signals that indicate a competitor is losing." "How to structure a competitive intelligence program for a 20-person startup."
3. **Product-Led Content**: Embedded competitive analyses for popular SaaS categories (CRM, project management, email marketing) — each powered by RivalSense data — demonstrating the product while generating SEO value.

---

## 10. Success Metrics

### Brand KPIs

- **Brand awareness**: Branded search volume month-over-month (Google Search Console)
- **Brand sentiment**: Net Promoter Score (in-app survey at 30 days), G2 and Capterra review sentiment ratio
- **Website engagement**: Time on page (homepage target: 90+ seconds), homepage scroll depth (target: 60% reach pricing section), bounce rate (target: under 55%)
- **Conversion rates**: Homepage to trial: target 4%+, trial to paid: target 25%+, free-to-paid upgrade: target 20% within 30 days
- **Content performance**: Organic sessions from competitive intelligence keywords, share of voice in "competitor intelligence tool" search category

---

## 11. Design Token Reference Summary

This section consolidates all design tokens for developer implementation. All tokens should be implemented as CSS custom properties on the `:root` element and as a Tailwind CSS theme extension.

### Color Tokens (abbreviated reference)

```
/* Brand Core */
--color-brand-navy: #0F1629
--color-brand-slate: #1E2D4A
--color-brand-electric: #3B82F6
--color-brand-electric-vivid: #2563EB
--color-brand-cyan: #06B6D4
--color-brand-cyan-muted: #0E7490

/* Dashboard Accents */
--color-dashboard-pricing: #10B981
--color-dashboard-product: #8B5CF6
--color-dashboard-website: #F59E0B
--color-dashboard-hiring: #EF4444
--color-dashboard-positioning: #3B82F6

/* Semantic */
--color-success: #10B981
--color-warning: #F59E0B
--color-danger: #EF4444
--color-info: #3B82F6
--color-neutral: #64748B

/* Signal Severity */
--color-signal-critical: #EF4444
--color-signal-high: #F97316
--color-signal-medium: #F59E0B
--color-signal-low: #10B981
--color-signal-none: #94A3B8

/* Light Mode Surfaces */
--color-bg-primary: #FFFFFF
--color-bg-secondary: #F8FAFC
--color-bg-tertiary: #F1F5F9
--color-border-default: #E2E8F0
--color-border-subtle: #F1F5F9
--color-border-emphasis: #CBD5E1
--color-text-primary: #0F172A
--color-text-secondary: #475569
--color-text-tertiary: #94A3B8
--color-text-inverse: #FFFFFF

/* Dark Mode Surfaces */
--color-bg-primary-dark: #0F1629
--color-bg-secondary-dark: #1E2D4A
--color-bg-tertiary-dark: #253350
--color-bg-overlay-dark: #162035
--color-border-default-dark: #2D4060
--color-border-subtle-dark: #1E3050
--color-border-emphasis-dark: #3B5075
--color-text-primary-dark: #F1F5F9
--color-text-secondary-dark: #94A3B8
--color-text-tertiary-dark: #64748B
```

### Typography Tokens (abbreviated reference)

```
/* Font Families */
--font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace

/* Type Scale */
--text-display-2xl: 3.75rem    /* 60px */
--text-display-xl: 3rem        /* 48px */
--text-display-lg: 2.25rem     /* 36px */
--text-display-md: 1.875rem    /* 30px */
--text-display-sm: 1.5rem      /* 24px */
--text-display-xs: 1.25rem     /* 20px */
--text-body-xl: 1.125rem       /* 18px */
--text-body-lg: 1rem           /* 16px */
--text-body-md: 0.875rem       /* 14px */
--text-body-sm: 0.8125rem      /* 13px */
--text-label-lg: 0.875rem      /* 14px */
--text-label-md: 0.8125rem     /* 13px */
--text-label-sm: 0.6875rem     /* 11px */
--text-code-md: 0.8125rem      /* 13px */
--text-code-sm: 0.6875rem      /* 11px */

/* Spacing */
--tracking-tight: -0.02em
--tracking-normal: 0em
--tracking-wide: 0.05em
--tracking-wider: 0.08em
```

### Spacing Tokens

```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

### Border Radius Tokens

```
--radius-sm: 4px    /* Tags, badges */
--radius-md: 6px    /* Inputs, buttons */
--radius-lg: 8px    /* Cards, standard containers */
--radius-xl: 12px   /* Feature highlight cards */
--radius-2xl: 16px  /* Modal containers */
--radius-full: 9999px /* Pills, avatars */
```

### Shadow Tokens

```
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06)
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)
--shadow-focus: 0 0 0 2px var(--color-brand-electric)
```

---

## 12. Brand Governance

### Consistency Checklist

Before publishing any design, copy, or UI change, verify:

- [ ] Does this use only approved design token colors — no hardcoded hex values?
- [ ] Is typography sourced from the approved font families (Plus Jakarta Sans, Inter, JetBrains Mono)?
- [ ] Does the tone of copy match the voice characteristics for this context?
- [ ] Is the copy specific and data-forward, not vague or sensationalist?
- [ ] Are AI-generated inferences clearly labeled as distinct from observed data?
- [ ] Do all color combinations meet WCAG AA contrast minimums?
- [ ] Are icons sourced from Lucide and sized/stroked consistently?
- [ ] Does the design work in both light and dark modes?
- [ ] Is the messaging benefit-focused for the right persona?
- [ ] Does the design reinforce intelligence, speed, and trust — not anxiety?

---

**This document governs all design, copy, and product decisions for RivalSense. The UX Designer should treat these tokens and guidelines as the source of truth for the style guide and component library.**

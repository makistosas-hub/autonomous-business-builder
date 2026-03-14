# RivalSense Design System & Style Guide

> Version 1.0 — Implementable Design System for Frontend Development

---

## 1. Design Tokens

All design tokens are defined as CSS custom properties and mapped to Tailwind CSS configuration. No raw hex values should appear in component code.

### 1.1 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "var(--color-brand-navy)",          // #0F1629
          slate: "var(--color-brand-slate)",          // #1E2D4A
          electric: "var(--color-brand-electric)",    // #3B82F6
          "electric-vivid": "var(--color-brand-electric-vivid)", // #2563EB
          cyan: "var(--color-brand-cyan)",            // #06B6D4
          "cyan-muted": "var(--color-brand-cyan-muted)", // #0E7490
        },
        dashboard: {
          pricing: "var(--color-dashboard-pricing)",       // #10B981
          product: "var(--color-dashboard-product)",       // #8B5CF6
          website: "var(--color-dashboard-website)",       // #F59E0B
          hiring: "var(--color-dashboard-hiring)",         // #EF4444
          positioning: "var(--color-dashboard-positioning)", // #3B82F6
        },
        surface: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },
        border: {
          default: "var(--color-border-default)",
          subtle: "var(--color-border-subtle)",
          emphasis: "var(--color-border-emphasis)",
        },
        content: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          inverse: "var(--color-text-inverse)",
        },
        status: {
          success: "var(--color-status-success)",     // #10B981
          warning: "var(--color-status-warning)",     // #F59E0B
          error: "var(--color-status-error)",         // #EF4444
          info: "var(--color-status-info)",           // #3B82F6
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        "caption": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        "overline": ["0.6875rem", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "0.05em" }],
      },
      spacing: {
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
        "dropdown": "0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        "modal": "0 20px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.1)",
        "glow-electric": "0 0 20px rgba(59,130,246,0.3)",
        "glow-cyan": "0 0 20px rgba(6,182,212,0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 1.2 CSS Custom Properties

```css
/* globals.css */
:root {
  /* Brand Colors */
  --color-brand-navy: #0F1629;
  --color-brand-slate: #1E2D4A;
  --color-brand-electric: #3B82F6;
  --color-brand-electric-vivid: #2563EB;
  --color-brand-cyan: #06B6D4;
  --color-brand-cyan-muted: #0E7490;

  /* Dashboard Accent Colors */
  --color-dashboard-pricing: #10B981;
  --color-dashboard-product: #8B5CF6;
  --color-dashboard-website: #F59E0B;
  --color-dashboard-hiring: #EF4444;
  --color-dashboard-positioning: #3B82F6;

  /* Status Colors */
  --color-status-success: #10B981;
  --color-status-warning: #F59E0B;
  --color-status-error: #EF4444;
  --color-status-info: #3B82F6;

  /* Light Mode Surfaces */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8FAFC;
  --color-bg-tertiary: #F1F5F9;

  /* Light Mode Borders */
  --color-border-default: #E2E8F0;
  --color-border-subtle: #F1F5F9;
  --color-border-emphasis: #CBD5E1;

  /* Light Mode Text */
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-tertiary: #94A3B8;
  --color-text-inverse: #FFFFFF;
}

.dark {
  --color-bg-primary: #0F1629;
  --color-bg-secondary: #1E2D4A;
  --color-bg-tertiary: #263554;

  --color-border-default: #2D3F5E;
  --color-border-subtle: #1E2D4A;
  --color-border-emphasis: #3D5278;

  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary: #64748B;
  --color-text-inverse: #0F172A;
}
```

---

## 2. Layout System

### 2.1 App Shell Layout

```
+-------+------------------------------------------+
| Side  |  Top Bar (breadcrumb + search + profile)  |
| bar   +------------------------------------------+
| 240px |                                          |
|       |  Main Content Area                       |
|       |  (max-width: 1280px, centered)           |
|       |  padding: 24px                           |
|       |                                          |
+-------+------------------------------------------+
```

**Sidebar:** Fixed width 240px (collapsible to 64px on mobile)
**Top Bar:** Height 64px, sticky
**Content Area:** Fluid, max-width 1280px, padding 24px

### 2.2 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet — sidebar collapses to icon-only |
| `lg` | 1024px | Desktop — full sidebar |
| `xl` | 1280px | Wide desktop — content max-width reached |
| `2xl` | 1536px | Ultra-wide — content centered with margin |

### 2.3 Grid System

- 12-column grid for dashboard layouts
- Gap: `gap-4` (16px) for cards, `gap-6` (24px) for sections
- Dashboard cards: `col-span-4` (3 per row), `col-span-6` (2 per row), `col-span-12` (full width)

### 2.4 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing within elements |
| `space-2` | 8px | Between related items (icon + label) |
| `space-3` | 12px | Between list items |
| `space-4` | 16px | Padding inside cards/inputs |
| `space-6` | 24px | Between sections, page padding |
| `space-8` | 32px | Between major sections |
| `space-12` | 48px | Page section separation |

---

## 3. Component Specifications

### 3.1 Buttons

**Primary Button:**
```html
<button class="bg-brand-electric hover:bg-brand-electric-vivid text-content-inverse
  px-4 py-2.5 rounded-md text-body font-medium
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-brand-electric focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed">
  Button Text
</button>
```

**Secondary Button:**
```html
<button class="bg-surface-primary border border-border-default text-content-primary
  hover:bg-surface-secondary px-4 py-2.5 rounded-md text-body font-medium
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-brand-electric focus:ring-offset-2">
  Button Text
</button>
```

**Ghost Button:**
```html
<button class="text-content-secondary hover:text-content-primary hover:bg-surface-tertiary
  px-3 py-2 rounded-md text-body font-medium transition-colors duration-150">
  Button Text
</button>
```

**Danger Button:**
```html
<button class="bg-status-error hover:bg-red-700 text-content-inverse
  px-4 py-2.5 rounded-md text-body font-medium transition-colors duration-150">
  Delete
</button>
```

**Button Sizes:**
| Size | Padding | Font Size |
|------|---------|-----------|
| `sm` | `px-3 py-1.5` | `text-body-sm` |
| `md` (default) | `px-4 py-2.5` | `text-body` |
| `lg` | `px-6 py-3` | `text-body-lg` |

### 3.2 Cards

**Standard Card:**
```html
<div class="bg-surface-primary border border-border-default rounded-lg shadow-card
  p-4 transition-shadow duration-200 hover:shadow-card-hover">
  <div class="flex items-center justify-between mb-3">
    <h3 class="text-heading-sm text-content-primary">Card Title</h3>
    <span class="text-caption text-content-tertiary">Metadata</span>
  </div>
  <p class="text-body text-content-secondary">Card content...</p>
</div>
```

**Metric Card:**
```html
<div class="bg-surface-primary border border-border-default rounded-lg p-4">
  <p class="text-caption text-content-tertiary uppercase tracking-wider mb-1">Metric Label</p>
  <p class="text-display-sm text-content-primary">42</p>
  <p class="text-body-sm text-dashboard-pricing flex items-center gap-1 mt-1">
    <ArrowUpIcon class="w-4 h-4" /> +12% vs last week
  </p>
</div>
```

**Dashboard Module Card:**
```html
<!-- Uses dashboard accent color as left border -->
<div class="bg-surface-primary border border-border-default rounded-lg p-4
  border-l-4 border-l-dashboard-pricing">
  <div class="flex items-center gap-2 mb-2">
    <span class="text-dashboard-pricing"><DollarIcon /></span>
    <h3 class="text-heading-sm text-content-primary">Pricing Intelligence</h3>
  </div>
  <!-- content -->
</div>
```

### 3.3 Inputs

**Text Input:**
```html
<div>
  <label class="block text-body-sm font-medium text-content-primary mb-1.5">Label</label>
  <input type="text" class="w-full bg-surface-primary border border-border-default rounded-md
    px-3 py-2.5 text-body text-content-primary placeholder:text-content-tertiary
    focus:outline-none focus:ring-2 focus:ring-brand-electric focus:border-brand-electric
    transition-colors duration-150" placeholder="Placeholder text" />
  <p class="text-body-sm text-content-tertiary mt-1">Helper text</p>
</div>
```

**Error State:**
```html
<input class="... border-status-error focus:ring-status-error" />
<p class="text-body-sm text-status-error mt-1">Error message</p>
```

**Search Input:**
```html
<div class="relative">
  <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
  <input type="search" class="w-full pl-9 pr-3 py-2 bg-surface-secondary border-0 rounded-md
    text-body text-content-primary placeholder:text-content-tertiary
    focus:ring-2 focus:ring-brand-electric" placeholder="Search..." />
</div>
```

### 3.4 Navigation

**Sidebar Navigation Item:**
```html
<!-- Active state -->
<a class="flex items-center gap-3 px-3 py-2 rounded-md
  bg-brand-electric/10 text-brand-electric font-medium text-body">
  <Icon class="w-5 h-5" />
  <span>Dashboard Name</span>
</a>

<!-- Inactive state -->
<a class="flex items-center gap-3 px-3 py-2 rounded-md
  text-content-secondary hover:text-content-primary hover:bg-surface-tertiary
  transition-colors duration-150 text-body">
  <Icon class="w-5 h-5" />
  <span>Dashboard Name</span>
</a>
```

**Dashboard Module Navigation:**
Each dashboard tab uses its accent color for the active indicator:
```html
<a class="flex items-center gap-2 px-3 py-2 rounded-md
  bg-dashboard-pricing/10 text-dashboard-pricing font-medium border-l-2 border-l-dashboard-pricing">
  <DollarIcon class="w-5 h-5" />
  <span>Pricing Intelligence</span>
</a>
```

### 3.5 Tables

```html
<div class="border border-border-default rounded-lg overflow-hidden">
  <table class="w-full">
    <thead>
      <tr class="bg-surface-secondary border-b border-border-default">
        <th class="text-left px-4 py-3 text-caption text-content-secondary font-semibold uppercase tracking-wider">
          Column Header
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-border-subtle">
      <tr class="hover:bg-surface-tertiary transition-colors duration-100">
        <td class="px-4 py-3 text-body text-content-primary">Cell content</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 3.6 Badges & Tags

**Status Badge:**
```html
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
  text-caption font-medium bg-status-success/10 text-status-success">
  <span class="w-1.5 h-1.5 rounded-full bg-status-success"></span>
  Active
</span>
```

**Dashboard Module Badge:**
```html
<span class="inline-flex items-center px-2 py-0.5 rounded-full
  text-caption font-medium bg-dashboard-pricing/10 text-dashboard-pricing">
  Pricing
</span>
```

**Significance Score Badge:**
```html
<!-- High significance (7-10): red -->
<span class="inline-flex items-center justify-center w-6 h-6 rounded-full
  bg-status-error/10 text-status-error text-caption font-bold">9</span>

<!-- Medium significance (4-6): amber -->
<span class="... bg-status-warning/10 text-status-warning ...">5</span>

<!-- Low significance (1-3): green -->
<span class="... bg-status-success/10 text-status-success ...">2</span>
```

### 3.7 Alerts & Notifications

**Toast Notification:**
```html
<div class="fixed bottom-4 right-4 z-50 animate-slide-up
  bg-surface-primary border border-border-default rounded-lg shadow-dropdown
  p-4 max-w-sm flex items-start gap-3">
  <CheckCircleIcon class="w-5 h-5 text-status-success flex-shrink-0 mt-0.5" />
  <div>
    <p class="text-body font-medium text-content-primary">Success</p>
    <p class="text-body-sm text-content-secondary mt-0.5">Your changes have been saved.</p>
  </div>
  <button class="text-content-tertiary hover:text-content-primary ml-auto">
    <XIcon class="w-4 h-4" />
  </button>
</div>
```

**Inline Alert:**
```html
<div class="rounded-md border p-4 flex items-start gap-3
  bg-status-info/5 border-status-info/20 text-content-primary">
  <InfoIcon class="w-5 h-5 text-status-info flex-shrink-0 mt-0.5" />
  <div>
    <p class="text-body font-medium">Information</p>
    <p class="text-body-sm text-content-secondary mt-1">Alert message content.</p>
  </div>
</div>
```

### 3.8 Modals

```html
<div class="fixed inset-0 z-50 flex items-center justify-center">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm animate-fade-in"></div>
  <!-- Modal -->
  <div class="relative bg-surface-primary border border-border-default rounded-xl
    shadow-modal w-full max-w-lg mx-4 animate-slide-up">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-border-default">
      <h2 class="text-heading text-content-primary">Modal Title</h2>
      <button class="text-content-tertiary hover:text-content-primary">
        <XIcon class="w-5 h-5" />
      </button>
    </div>
    <!-- Body -->
    <div class="px-6 py-4">
      <p class="text-body text-content-secondary">Modal content...</p>
    </div>
    <!-- Footer -->
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-border-default">
      <button class="...secondary-button...">Cancel</button>
      <button class="...primary-button...">Confirm</button>
    </div>
  </div>
</div>
```

### 3.9 Tooltips

```html
<div class="relative group">
  <button>Hover me</button>
  <div class="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2
    bg-brand-navy text-content-inverse text-body-sm px-3 py-1.5 rounded-md shadow-dropdown
    whitespace-nowrap animate-fade-in">
    Tooltip text
    <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1
      border-4 border-transparent border-t-brand-navy"></div>
  </div>
</div>
```

---

## 4. Dashboard-Specific Patterns

### 4.1 Dashboard Color Mapping

| Module | Color Token | Hex | Icon |
|--------|------------|-----|------|
| Pricing Intelligence | `dashboard-pricing` | #10B981 | DollarSign / CurrencyDollar |
| Product Launches | `dashboard-product` | #8B5CF6 | Rocket / Package |
| Website Changes | `dashboard-website` | #F59E0B | Globe / Monitor |
| Hiring Signals | `dashboard-hiring` | #EF4444 | Users / Briefcase |
| Positioning | `dashboard-positioning` | #3B82F6 | Megaphone / Target |

### 4.2 Dashboard Header Pattern

Each dashboard page has a colored header strip:
```html
<div class="border-b border-border-default">
  <div class="flex items-center gap-3 px-6 py-4">
    <div class="w-10 h-10 rounded-lg bg-dashboard-pricing/10 flex items-center justify-center">
      <DollarIcon class="w-5 h-5 text-dashboard-pricing" />
    </div>
    <div>
      <h1 class="text-heading-lg text-content-primary">Pricing Intelligence</h1>
      <p class="text-body-sm text-content-secondary">Track competitor pricing changes in real-time</p>
    </div>
  </div>
</div>
```

### 4.3 Change Activity Item

```html
<div class="flex items-start gap-3 px-4 py-3 hover:bg-surface-tertiary rounded-md transition-colors">
  <!-- Module indicator dot -->
  <div class="w-2 h-2 rounded-full bg-dashboard-pricing mt-2 flex-shrink-0"></div>
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-0.5">
      <span class="text-body font-medium text-content-primary truncate">Competitor raised prices 15%</span>
      <span class="inline-flex items-center justify-center w-5 h-5 rounded-full
        bg-status-error/10 text-status-error text-caption font-bold flex-shrink-0">8</span>
    </div>
    <p class="text-body-sm text-content-secondary line-clamp-2">
      AI summary of what changed and why it matters...
    </p>
    <div class="flex items-center gap-3 mt-1.5">
      <span class="text-caption text-content-tertiary">2 hours ago</span>
      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-overline
        bg-dashboard-pricing/10 text-dashboard-pricing">Pricing</span>
      <span class="text-caption text-content-tertiary">Acme Corp</span>
    </div>
  </div>
</div>
```

---

## 5. Data Visualization

### 5.1 Chart Color Palette

Charts use the dashboard accent colors as primary series colors, with lighter variants for secondary series:

```typescript
const chartColors = {
  primary: "var(--color-brand-electric)",
  secondary: "var(--color-brand-cyan)",
  series: [
    "var(--color-dashboard-pricing)",
    "var(--color-dashboard-product)",
    "var(--color-dashboard-website)",
    "var(--color-dashboard-hiring)",
    "var(--color-dashboard-positioning)",
  ],
};
```

### 5.2 Chart Styling

- Background: `bg-surface-primary`
- Grid lines: `border-border-subtle` (dashed)
- Axis labels: `text-caption text-content-tertiary`
- Axis lines: `border-border-default`
- Tooltip: `bg-brand-navy text-content-inverse shadow-dropdown rounded-md p-3`

### 5.3 Recommended Chart Library

**Recharts** — Lightweight, React-native, composable. Integrates well with Tailwind.

---

## 6. Interaction Patterns

### 6.1 Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Colors (hover/focus) | 150ms | ease |
| Shadows | 200ms | ease |
| Transforms (slide/fade) | 300ms | ease-out |
| Layout changes | 200ms | ease-in-out |

### 6.2 Loading States

**Skeleton Loader:**
```html
<div class="animate-pulse">
  <div class="h-4 bg-surface-tertiary rounded w-3/4 mb-3"></div>
  <div class="h-4 bg-surface-tertiary rounded w-1/2 mb-3"></div>
  <div class="h-32 bg-surface-tertiary rounded"></div>
</div>
```

**Spinner:**
```html
<div class="w-5 h-5 border-2 border-brand-electric/20 border-t-brand-electric rounded-full animate-spin"></div>
```

**Live Data Indicator:**
```html
<span class="flex items-center gap-1.5 text-caption text-brand-cyan">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
  </span>
  Live
</span>
```

### 6.3 Empty States

```html
<div class="flex flex-col items-center justify-center py-16 px-4 text-center">
  <div class="w-16 h-16 rounded-full bg-surface-tertiary flex items-center justify-center mb-4">
    <SearchIcon class="w-8 h-8 text-content-tertiary" />
  </div>
  <h3 class="text-heading text-content-primary mb-2">No competitors yet</h3>
  <p class="text-body text-content-secondary max-w-sm mb-6">
    Add your first competitor to start receiving intelligence insights.
  </p>
  <button class="...primary-button...">Add Competitor</button>
</div>
```

### 6.4 Error States

```html
<div class="flex flex-col items-center justify-center py-16 px-4 text-center">
  <div class="w-16 h-16 rounded-full bg-status-error/10 flex items-center justify-center mb-4">
    <AlertTriangleIcon class="w-8 h-8 text-status-error" />
  </div>
  <h3 class="text-heading text-content-primary mb-2">Something went wrong</h3>
  <p class="text-body text-content-secondary max-w-sm mb-6">
    We couldn't load this data. Please try again.
  </p>
  <button class="...secondary-button...">Retry</button>
</div>
```

---

## 7. Icon System

### 7.1 Recommended Library

**Lucide React** (`lucide-react`) — Consistent, clean line icons. MIT licensed.

### 7.2 Icon Sizes

| Context | Size | Class |
|---------|------|-------|
| Inline with text | 16px | `w-4 h-4` |
| Navigation items | 20px | `w-5 h-5` |
| Section headers | 24px | `w-6 h-6` |
| Empty states / hero | 32-48px | `w-8 h-8` to `w-12 h-12` |

### 7.3 Icon Color

Icons inherit text color by default. Use `text-content-secondary` for subtle icons, dashboard accent colors for module-specific icons.

---

## 8. Accessibility

### 8.1 Focus Indicators

All interactive elements must have visible focus rings:
```css
focus:outline-none focus:ring-2 focus:ring-brand-electric focus:ring-offset-2
```

Dark mode offset: `focus:ring-offset-brand-navy`

### 8.2 Color Contrast

- Primary text on white: #0F172A on #FFFFFF = 15.4:1 (AAA)
- Secondary text on white: #475569 on #FFFFFF = 6.1:1 (AA)
- Inverse text on navy: #F1F5F9 on #0F1629 = 14.7:1 (AAA)
- All status colors meet AA contrast against their background tints

### 8.3 Screen Reader Support

- All images have alt text
- Interactive elements have aria-labels when text is not visible
- Live regions (`aria-live="polite"`) for real-time update notifications
- Proper heading hierarchy (h1 > h2 > h3)
- Skip navigation link for keyboard users

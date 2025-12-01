# Component Interface Specifications

## Brand Components

### Monotile

**Location:** `src/components/brand/Monotile.astro`

```typescript
interface Props {
  size?: 'micro' | 'small' | 'medium' | 'large' | 'hero';
  variant?: 'stroke' | 'filled' | 'solid';
  glow?: boolean;
  class?: string;
}
```

**Usage:**
- `size`: Controls dimensions of the logo (default: 'small')
- `variant`: Visual style (stroke=outline, filled=partial, solid=full)
- `glow`: Enables drop-shadow glow effect (dark mode only)
- `class`: Additional CSS classes

### Wordmark

**Location:** `src/components/brand/Wordmark.astro`

```typescript
interface Props {
  size?: 'small' | 'medium' | 'large';
  class?: string;
}
```

### LogoLockup

**Location:** `src/components/brand/LogoLockup.astro`

```typescript
interface Props {
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  class?: string;
}
```

---

## UI Components

### Button

**Location:** `src/components/ui/Button.astro`

```typescript
interface Props {
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Usage:**
- Renders as `<a>` if `href` is provided, otherwise `<button>`
- `primary`: Solid brand-colored button with glow
- `outline`: Transparent with border
- `ghost`: Transparent, hover background only

### Card

**Location:** `src/components/ui/Card.astro`

```typescript
interface Props {
  title?: string;
  href?: string;
  variant?: 'default' | 'elevated' | 'interactive';
  class?: string;
}
```

**Usage:**
- `default`: Standard card with border
- `elevated`: Card with shadow effect
- `interactive`: Hover states for clickable cards
- Renders as `<a>` if `href` provided

### StatusBadge

**Location:** `src/components/ui/StatusBadge.astro`

```typescript
interface Props {
  status: 'nominal' | 'warning' | 'error' | 'offline';
  label?: string;
}
```

**Usage:**
- Displays status indicator with █ block character
- Auto-generates label if not provided
- Color-coded by status type

### MetricDisplay

**Location:** `src/components/ui/MetricDisplay.astro`

```typescript
interface Props {
  value: string | number;
  unit?: string;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
}
```

**Usage:**
- Displays numeric metric with optional unit
- `label`: Description shown below value
- `trend`: Future feature for trend indicators

---

## Landing Page Components

### Hero

**Location:** `src/components/landing/Hero.astro`

No props - fully self-contained hero section with:
- Logo display
- Tagline and description
- Call-to-action buttons
- Status bar with metrics

### TrustCascade

**Location:** `src/components/landing/TrustCascade.astro`

No props - displays:
- Metrics grid (uptime, latency, performance)
- Feature cards (Low Latency, Cost Optimized, Reliable)

### DemandCurves

**Location:** `src/components/landing/DemandCurves.astro`

No props - showcases:
- Use case cards (Real-time Video, Image Generation, Batch Processing)
- Throughput and latency specifications

### TechStack

**Location:** `src/components/landing/TechStack.astro`

No props - displays:
- Technology categories (Hardware, Models, Runtime, API)
- Stack items for each category

### CTA

**Location:** `src/components/landing/CTA.astro`

No props - call-to-action section with:
- Headline and description
- Action buttons
- Quick start code example

---

## SEO Components

### JsonLd

**Location:** `src/components/seo/JsonLd.astro`

```typescript
interface Props {
  schema: WithContext<Thing>;
}
```

**Usage:**
- Renders structured data as JSON-LD script tag
- Pass pre-built schema from `@lib/seo/schema.ts`

### BaseHead

**Location:** `src/layouts/BaseHead.astro`

```typescript
interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}
```

**Usage:**
- Core meta tags for all pages
- OpenGraph and Twitter Card tags
- Favicon links
- Font preconnects
- ViewTransitions support

---

## Layout Components

### Landing

**Location:** `src/layouts/Landing.astro`

No props - wraps landing page content with:
- Global styles
- HTML structure
- BaseHead integration

### Blog

**Location:** `src/layouts/Blog.astro`

```typescript
interface Props {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  tags?: string[];
  image?: { src: string; alt: string };
}
```

**Usage:**
- Dedicated layout for blog posts
- SEO optimization with JSON-LD
- Author and date metadata
- Tag display
- Prose styling for content

---

## Component Design Principles

1. **Props over configuration**: Use TypeScript interfaces for compile-time safety
2. **Slot-based composition**: Use `<slot />` for flexible content
3. **CSS custom properties**: All colors via CSS variables
4. **Conditional styling**: Use `class:list` for dynamic classes
5. **Accessibility**: Include `aria-label` and semantic HTML
6. **Theme awareness**: Support both Hypermodern (dark) and High Modernism (light)


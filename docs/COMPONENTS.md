# Component Documentation

This document provides an overview of all components in the Weyl AI website. For detailed component specifications and interfaces, see `.cursor/component-specs.md`.

## Component Organization

Components are organized by function and usage:

```
src/components/
├── analytics/       # Analytics and performance tracking
├── brand/           # Brand identity components
├── content/         # Content presentation
├── landing/         # Landing page sections
├── navigation/      # Navigation components
├── ui/              # Reusable UI primitives
├── seo/             # SEO utilities
└── overrides/       # Starlight component overrides
```

## Analytics Components

### SpeedInsights
**File**: `src/components/analytics/SpeedInsights.astro`

Vercel Speed Insights integration for real-time performance monitoring.

**Usage**:
```astro
<SpeedInsights />
```

### WebVitals
**File**: `src/components/analytics/WebVitals.astro`

Custom Web Vitals tracking component.

**Usage**:
```astro
<WebVitals />
```

**Features**:
- Tracks Core Web Vitals (CLS, FID, LCP)
- Sends metrics to analytics endpoint
- Works alongside Vercel Analytics

---

## Brand Components

### Monotile
**File**: `src/components/brand/Monotile.astro`

Logo mark (icon only).

**Props**:
- `size?: number` - Size in pixels (default: 32)
- `color?: string` - Fill color (default: current color)

**Usage**:
```astro
<Monotile size={48} />
```

### Wordmark
**File**: `src/components/brand/Wordmark.astro`

Text logo ("Weyl AI").

**Props**:
- `height?: number` - Height in pixels
- `color?: string` - Fill color

**Usage**:
```astro
<Wordmark height={32} />
```

### LogoLockup
**File**: `src/components/brand/LogoLockup.astro`

Combined monotile + wordmark.

**Props**:
- `size?: 'sm' | 'md' | 'lg'`
- `orientation?: 'horizontal' | 'vertical'`

**Usage**:
```astro
<LogoLockup size="md" orientation="horizontal" />
```

---

## Content Components

### CodeBlock
**File**: `src/components/content/CodeBlock.astro`

Syntax-highlighted code blocks with copy button.

**Props**:
- `code: string` - Code content
- `lang?: string` - Language for syntax highlighting
- `filename?: string` - Optional filename display

**Usage**:
```astro
<CodeBlock code={sourceCode} lang="typescript" filename="example.ts" />
```

### LastUpdated
**File**: `src/components/content/LastUpdated.astro`

Displays last updated timestamp for content.

**Props**:
- `date: Date` - Last updated date

**Usage**:
```astro
<LastUpdated date={entry.data.updatedDate} />
```

### ReadingTime
**File**: `src/components/content/ReadingTime.astro`

Estimated reading time for articles.

**Props**:
- `minutes: number` - Reading time in minutes

**Usage**:
```astro
<ReadingTime minutes={5} />
```

---

## Landing Page Components

### Hero
**File**: `src/components/landing/Hero.astro`

Hero section with value proposition.

**Features**:
- Animated entrance
- CTA buttons
- Responsive layout

### TrustCascade
**File**: `src/components/landing/TrustCascade.astro`

Trust signals and metrics display.

**Features**:
- Animated metric counters
- Performance stats
- Social proof indicators

### DemandCurves
**File**: `src/components/landing/DemandCurves.astro`

Use cases and value propositions.

### TechStack
**File**: `src/components/landing/TechStack.astro`

Technology overview section.

### CTA
**File**: `src/components/landing/CTA.astro`

Call-to-action section.

**Props**:
- `title: string`
- `description: string`
- `buttonText?: string`
- `buttonHref?: string`

### LandingNav
**File**: `src/components/landing/LandingNav.astro`

Landing page navigation bar.

**Features**:
- Responsive menu
- Theme toggle
- Smooth scroll links

### LandingFooter
**File**: `src/components/landing/LandingFooter.astro`

Landing page footer with links and social icons.

---

## Navigation Components

### Breadcrumbs
**File**: `src/components/navigation/Breadcrumbs.astro`

Breadcrumb navigation for deep pages.

**Props**:
- `items: Array<{label: string, href: string}>`

### DocNav
**File**: `src/components/navigation/DocNav.astro`

Documentation sidebar navigation.

**Features**:
- Auto-generated from content structure
- Collapsible sections
- Active page highlighting

### TableOfContents
**File**: `src/components/navigation/TableOfContents.astro`

In-page table of contents.

**Props**:
- `headings: Array<{depth: number, slug: string, text: string}>`

---

## UI Components

### Button
**File**: `src/components/ui/Button.astro`

Reusable button component with variants.

**Props**:
- `variant?: 'primary' | 'outline' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg'`
- `href?: string` - Makes button a link
- `disabled?: boolean`

**Usage**:
```astro
<Button variant="primary" size="md" href="/request-access">
  Get Started
</Button>
```

### Card
**File**: `src/components/ui/Card.astro`

Container component with elevation and hover states.

**Props**:
- `variant?: 'default' | 'elevated' | 'interactive'`
- `padding?: 'sm' | 'md' | 'lg'`

**Usage**:
```astro
<Card variant="elevated" padding="md">
  <slot />
</Card>
```

### StatusBadge
**File**: `src/components/ui/StatusBadge.astro`

Status indicator badges.

**Props**:
- `status: 'nominal' | 'warning' | 'error' | 'offline'`
- `label: string`

**Usage**:
```astro
<StatusBadge status="nominal" label="Operational" />
```

### MetricDisplay
**File**: `src/components/ui/MetricDisplay.astro`

Metric card for displaying numbers with labels.

**Props**:
- `value: string | number`
- `label: string`
- `trend?: 'up' | 'down' | 'neutral'`
- `change?: string` - Percentage change

**Usage**:
```astro
<MetricDisplay
  value="70%"
  label="Cost Reduction"
  trend="down"
  change="-70%"
/>
```

### CalendlyBadge
**File**: `src/components/ui/CalendlyBadge.astro`

Calendly integration badge for scheduling.

**Props**:
- `url: string` - Calendly scheduling URL

**Usage**:
```astro
<CalendlyBadge url="https://calendly.com/weyl-ai/demo" />
```

### SocialIcons
**File**: `src/components/ui/SocialIcons.astro`

Social media icon links.

**Props**:
- `links: Array<{platform: string, url: string}>`
- `size?: 'sm' | 'md' | 'lg'`

**Usage**:
```astro
<SocialIcons
  links={[
    {platform: 'twitter', url: 'https://twitter.com/weyl_ai'},
    {platform: 'github', url: 'https://github.com/weyl-ai'}
  ]}
  size="md"
/>
```

---

## SEO Components

### JsonLd
**File**: `src/components/seo/JsonLd.astro`

JSON-LD structured data component.

**Props**:
- `schema: object` - JSON-LD schema object

**Usage**:
```astro
<JsonLd schema={{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Weyl AI"
}} />
```

**Supported Schemas**:
- Organization
- Website
- Article
- Breadcrumb
- Product

---

## Starlight Overrides

Components that override default Starlight behavior.

### Banner
**File**: `src/components/overrides/Banner.astro`

Custom banner for announcements.

### Header
**File**: `src/components/overrides/Header.astro`

Custom header with brand integration.

### Footer
**File**: `src/components/overrides/Footer.astro`

Custom footer with additional links.

### Head
**File**: `src/components/overrides/Head.astro`

Custom head meta tags and SEO.

### SocialIcons (Override)
**File**: `src/components/overrides/SocialIcons.astro`

Custom social icon styling for Starlight.

### ThemeSelect
**File**: `src/components/overrides/ThemeSelect.astro`

Custom theme toggle (Hypermodern/High Modernism).

---

## Component Development Guidelines

### Creating New Components

1. **File naming**: PascalCase.astro
2. **Props**: Define TypeScript interfaces
3. **Styling**: Use Tailwind + CSS custom properties
4. **Accessibility**: Include ARIA labels and keyboard navigation
5. **Documentation**: Add to this file

### Example Component Structure

```astro
---
interface Props {
  title: string;
  description?: string;
  variant?: 'default' | 'highlighted';
}

const {
  title,
  description,
  variant = 'default'
} = Astro.props;
---

<div class={`component ${variant}`}>
  <h2>{title}</h2>
  {description && <p>{description}</p>}
  <slot />
</div>

<style>
  .component {
    /* Component styles */
  }
</style>
```

### Component Testing

- Test in both themes (Hypermodern/High Modernism)
- Verify responsive behavior
- Check accessibility with screen readers
- Test View Transitions compatibility

### Performance Considerations

- Minimize JavaScript where possible
- Use static components (Astro) over client components (React)
- Lazy load heavy components
- Optimize images and assets

---

## Related Documentation

- **Design System**: `.cursor/typography.md`
- **Brand Guidelines**: `.cursor/archive-theme.md`
- **Component Specs**: `.cursor/component-specs.md` (detailed interfaces)
- **Architecture**: `docs/ARCHITECTURE.md`

---

## Future Components

Planned components for future implementation:

- [ ] Search component (Pagefind integration)
- [ ] Newsletter signup
- [ ] Pricing table
- [ ] Testimonials carousel
- [ ] Image comparison slider
- [ ] Interactive code playground

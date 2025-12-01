# Weyl Website Project Specification
## Starlight + Astro Static Site — Cursor Implementation Guide

---

## Project Overview

**Goal:** Build a unified platform for landing pages, blog, and documentation with exceptional SEO and LLM-parseable structure.

**Reference:** https://v0-weyl-ai-website-design.vercel.app/render

**Framework:** Starlight (Astro) — chosen for static generation, content collections, and built-in docs infrastructure.

**Implementation:** Cursor with Claude Sonnet 4

---

## Cursor Configuration

### .cursorrules

```markdown
# Weyl Site Development Rules

## Stack
- Astro 5.x with Starlight
- TypeScript strict mode (no escape hatches)
- Tailwind CSS 4.x with CSS custom properties
- Bun as package manager and runtime

## Code Style
- Use Astro components (.astro) for static content
- Use React (.tsx) only for interactive islands
- All colors via CSS custom properties, never hardcoded hex values
- Font: monospace (Iosevka) for everything in dark mode
- Status indicators use █ (U+2588) block character

## Type Safety
- No `any` types
- No `// @ts-ignore`
- Use Zod for all runtime validation
- Branded types for IDs and domain primitives
- Result types over try/catch where practical

## Component Patterns
- Props interfaces defined inline in frontmatter
- Use class:list for conditional classes
- Semantic HTML with aria labels
- JSON-LD for all pages

## File Naming
- Components: PascalCase.astro
- Utilities: kebab-case.ts
- Content: kebab-case.mdx

## Brand Rules
- Dark mode (Hypermodern): border-radius 4px, glow effects
- Light mode (High Modernism): border-radius 0, no glow
- Navigation uses // delimiters: "// docs // api // blog //"
- Never mix themes within a component
```

### Context Files for Cursor

Create these files in `.cursor/` for persistent context:

```
.cursor/
├── brand-tokens.md      # Copy of CSS custom properties
├── component-specs.md   # Component interface definitions
└── architecture.md      # Project structure reference
```

---

## Tech Stack

```yaml
Framework:
  - astro: ^5.x
  - @astrojs/starlight: ^0.30.x
  - @astrojs/react: ^4.x        # for interactive components
  - @astrojs/sitemap: ^3.x
  - @astrojs/mdx: ^4.x

Styling:
  - tailwindcss: ^4.x
  - @tailwindcss/typography: ^0.5.x
  - postcss: ^8.x

Type Safety:
  - typescript: ^5.7.x
  - zod: ^3.x                   # content validation
  - neverthrow: ^8.x            # result types

Content:
  - MDX for all content
  - Shiki for syntax highlighting
  - Expressive Code for code blocks

SEO/Performance:
  - @astrojs/sitemap
  - astro-seo
  - schema-dts                  # typed JSON-LD

Fonts:
  - @fontsource/iosevka         # primary mono
  - Aldrich via Google Fonts    # display
```

---

## Project Structure

```
weyl-site/
├── .cursor/
│   ├── brand-tokens.md
│   ├── component-specs.md
│   └── architecture.md
├── .cursorrules
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── fonts/
│   │   └── iosevka/
│   ├── og/                     # generated OG images
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── monotile.svg
│   │   └── images/
│   ├── components/
│   │   ├── brand/
│   │   │   ├── Monotile.astro
│   │   │   ├── Wordmark.astro
│   │   │   └── LogoLockup.astro
│   │   ├── landing/
│   │   │   ├── Hero.astro
│   │   │   ├── TrustCascade.astro
│   │   │   ├── DemandCurves.astro
│   │   │   ├── TechStack.astro
│   │   │   └── CTA.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── StatusBadge.astro
│   │   │   └── MetricDisplay.astro
│   │   └── seo/
│   │       ├── JsonLd.astro
│   │       └── OpenGraph.astro
│   ├── content/
│   │   ├── config.ts           # content collection schemas
│   │   ├── docs/               # documentation (starlight)
│   │   │   ├── getting-started/
│   │   │   ├── api/
│   │   │   └── guides/
│   │   └── blog/
│   │       └── *.mdx
│   ├── layouts/
│   │   ├── Landing.astro
│   │   ├── Blog.astro
│   │   └── BaseHead.astro
│   ├── pages/
│   │   ├── index.astro         # landing page
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   └── api/
│   │       └── og/[...slug].ts # dynamic OG images
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css          # CSS custom properties
│   │   └── typography.css
│   └── lib/
│       ├── types/
│       │   └── branded.ts
│       ├── seo/
│       │   └── schema.ts
│       └── utils/
│           └── cn.ts
├── package.json
└── bun.lockb
```

---

## Implementation Phases

### Phase 1: Project Scaffold

```bash
# Initialize project
bun create astro@latest weyl-site -- --template starlight
cd weyl-site

# Install dependencies
bun add @astrojs/react @astrojs/sitemap @astrojs/mdx
bun add tailwindcss @tailwindcss/typography postcss autoprefixer
bun add zod neverthrow schema-dts
bun add -D @types/bun

# Initialize Tailwind
bunx tailwindcss init
```

**Cursor prompt for Phase 1:**
> "Set up the Astro config with Starlight, React, sitemap, and MDX integrations. Configure Tailwind to use CSS custom properties from tokens.css. Use strict TypeScript settings."

### Phase 2: Brand Tokens & Global Styles

Create `src/styles/tokens.css`, `global.css`, `typography.css`

**Cursor prompt for Phase 2:**
> "Create the CSS tokens file with all brand colors as custom properties. Include both Hypermodern (dark) and High Modernism (light) themes using [data-theme] selector. Reference the brand tokens in the context."

### Phase 3: Core Components

Build in this order:
1. `Monotile.astro` — logo component
2. `Button.astro` — primary interactive element
3. `Card.astro` — content container
4. `StatusBadge.astro` — status indicators
5. `MetricDisplay.astro` — data visualization

**Cursor prompt for Phase 3:**
> "Create the Monotile component with size variants (micro/small/medium/large/hero) and style variants (stroke/filled/solid). Include optional glow effect. Use the brand color tokens."

### Phase 4: Landing Page Sections

1. `Hero.astro`
2. `TrustCascade.astro`
3. `DemandCurves.astro`
4. `TechStack.astro`
5. `CTA.astro`

### Phase 5: SEO & Meta

1. `BaseHead.astro`
2. `JsonLd.astro`
3. Schema helpers in `lib/seo/schema.ts`

### Phase 6: Content Collections

1. Blog schema
2. Docs extensions
3. Sample content

---

## Brand Tokens (CSS Custom Properties)

```css
/* src/styles/tokens.css */

:root {
  /* === HYPERMODERN (Dark) — Default === */
  
  /* Backgrounds */
  --color-bg-primary: #090b0e;
  --color-bg-surface: #13161a;
  --color-bg-elevated: #1a1f24;
  --color-bg-hover: #21262d;
  
  /* Text */
  --color-text-primary: #e6f7ff;
  --color-text-secondary: #c9d1d9;
  --color-text-muted: #8b949e;
  --color-text-subtle: #484f58;
  
  /* Brand */
  --color-brand-primary: #54aeff;
  --color-brand-hover: #8ecbff;
  --color-brand-glow: rgba(84, 174, 255, 0.4);
  
  /* Semantic */
  --color-success: #3fb950;
  --color-warning: #ffa657;
  --color-error: #ff7b72;
  --color-info: #54aeff;
  
  /* Accents */
  --color-violet: #a371f7;
  --color-gold: #f0c020;
  --color-cyan: #40e0d0;
  
  /* Borders */
  --color-border-default: #21262d;
  --color-border-hover: #54aeff;
  
  /* Typography */
  --font-mono: 'Iosevka', 'Berkeley Mono', 'SF Mono', monospace;
  --font-display: 'Aldrich', 'Orbitron', sans-serif;
  
  /* Scale */
  --text-hero: 3rem;      /* 48px */
  --text-headline: 2rem;  /* 32px */
  --text-subhead: 1.5rem; /* 24px */
  --text-body: 1rem;      /* 16px */
  --text-small: 0.875rem; /* 14px */
  --text-caption: 0.75rem;/* 12px */
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  
  /* Radii */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  
  /* Effects */
  --glow-sm: 0 0 8px var(--color-brand-glow);
  --glow-md: 0 0 16px var(--color-brand-glow);
  --glow-lg: 0 0 24px var(--color-brand-glow);
}

/* === HIGH MODERNISM (Light) === */
[data-theme="light"] {
  --color-bg-primary: #f4f1eb;
  --color-bg-surface: #ffffff;
  --color-bg-elevated: #e8e4d9;
  --color-bg-hover: #ddd9ce;
  
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #484f58;
  --color-text-muted: #8b7355;
  --color-text-subtle: #c9b896;
  
  --color-brand-primary: #1a5276;
  --color-brand-hover: #143d5a;
  --color-brand-glow: none;
  
  --color-success: #2d5a27;
  --color-warning: #d4a017;
  --color-error: #c41e3a;
  --color-info: #1a5276;
  
  --color-border-default: #1a1a1a;
  --color-border-hover: #1a5276;
  
  --font-mono: 'Helvetica Neue', 'Arial', system-ui, sans-serif;
  --font-display: 'Futura', 'Century Gothic', sans-serif;
  
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  
  --glow-sm: none;
  --glow-md: none;
  --glow-lg: none;
}
```

---

## Tailwind Configuration

```javascript
// tailwind.config.mjs
import starlightPlugin from '@astrojs/starlight-tailwind';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          surface: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          hover: 'var(--color-bg-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        },
        brand: {
          primary: 'var(--color-brand-primary)',
          hover: 'var(--color-brand-hover)',
        },
        semantic: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
          info: 'var(--color-info)',
        },
        accent: {
          violet: 'var(--color-violet)',
          gold: 'var(--color-gold)',
          cyan: 'var(--color-cyan)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          hover: 'var(--color-border-hover)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        hero: 'var(--text-hero)',
        headline: 'var(--text-headline)',
        subhead: 'var(--text-subhead)',
        body: 'var(--text-body)',
        small: 'var(--text-small)',
        caption: 'var(--text-caption)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        glow: 'var(--glow-md)',
        'glow-sm': 'var(--glow-sm)',
        'glow-lg': 'var(--glow-lg)',
      },
    },
  },
  plugins: [
    starlightPlugin(),
    require('@tailwindcss/typography'),
  ],
};
```

---

## Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://weyl.ai',
  integrations: [
    starlight({
      title: 'Weyl',
      logo: {
        src: './src/assets/monotile.svg',
      },
      customCss: [
        './src/styles/tokens.css',
        './src/styles/global.css',
        './src/styles/typography.css',
      ],
      social: {
        github: 'https://github.com/weyl-ai',
        twitter: 'https://twitter.com/weyl_ai',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/docs/getting-started/' },
            { label: 'Quick Start', link: '/docs/getting-started/quick-start/' },
            { label: 'Authentication', link: '/docs/getting-started/auth/' },
          ],
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'docs/api' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'docs/guides' },
        },
      ],
      components: {
        Header: './src/components/overrides/Header.astro',
        Footer: './src/components/overrides/Footer.astro',
      },
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '4px',
          codeFontFamily: 'var(--font-mono)',
        },
      },
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#090b0e' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
      ],
    }),
    react(),
    sitemap(),
    mdx(),
    tailwind({ applyBaseStyles: false }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@lib': '/src/lib',
      },
    },
  },
});
```

---

## Component Specifications

### Monotile Logo

```astro
---
// src/components/brand/Monotile.astro
interface Props {
  size?: 'micro' | 'small' | 'medium' | 'large' | 'hero';
  variant?: 'stroke' | 'filled' | 'solid';
  glow?: boolean;
  class?: string;
}

const { 
  size = 'small', 
  variant = 'stroke',
  glow = false,
  class: className = ''
} = Astro.props;

const sizes = {
  micro: 'w-8 h-[22px]',
  small: 'w-12 h-[33px]',
  medium: 'w-16 h-[44px]',
  large: 'w-24 h-[66px]',
  hero: 'w-40 h-[110px]',
};

const variants = {
  stroke: 'fill-none stroke-brand-primary stroke-2',
  filled: 'fill-brand-primary/10 stroke-brand-primary stroke-2',
  solid: 'fill-brand-primary stroke-none',
};
---

<svg
  viewBox="0 0 96.006653 65.823639"
  class:list={[
    sizes[size],
    variants[variant],
    glow && 'drop-shadow-glow',
    className,
  ]}
  aria-label="Weyl logo"
>
  <path d="m 18.003326,18.003326 v 20 l -17.3203124,10 10.0000004,17.320312 h 40 l 10,-17.320312 17.320312,10 17.32031,-10 -9.999998,-17.320312 h -20 v -20 L 48.003326,0.6830136 l -10,17.3203124 z"/>
</svg>
```

### Button

```astro
---
// src/components/ui/Button.astro
interface Props {
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const { 
  href, 
  variant = 'primary', 
  size = 'md',
  class: className = '',
} = Astro.props;

const Tag = href ? 'a' : 'button';

const baseStyles = 'inline-flex items-center justify-center gap-2 font-mono font-semibold transition-all rounded-md';

const variants = {
  primary: 'bg-brand-primary text-bg-primary hover:brightness-110 shadow-glow-sm hover:shadow-glow',
  outline: 'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-bg-primary',
  ghost: 'bg-transparent text-brand-primary hover:bg-brand-primary/10',
};

const sizes = {
  sm: 'px-3 py-1.5 text-small',
  md: 'px-6 py-3 text-small',
  lg: 'px-8 py-4 text-body',
};
---

<Tag
  href={href}
  class:list={[baseStyles, variants[variant], sizes[size], className]}
>
  <slot />
</Tag>
```

### Status Badge

```astro
---
// src/components/ui/StatusBadge.astro
interface Props {
  status: 'nominal' | 'warning' | 'error' | 'offline';
  label?: string;
}

const { status, label } = Astro.props;

const statusConfig = {
  nominal: { color: 'text-semantic-success', bg: 'bg-semantic-success/15', text: 'NOMINAL' },
  warning: { color: 'text-semantic-warning', bg: 'bg-semantic-warning/15', text: 'WARNING' },
  error: { color: 'text-semantic-error', bg: 'bg-semantic-error/15', text: 'ERROR' },
  offline: { color: 'text-text-muted', bg: 'bg-text-muted/15', text: 'OFFLINE' },
};

const config = statusConfig[status];
---

<span class:list={[
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-caption uppercase tracking-wide',
  config.color,
  config.bg,
]}>
  <span class="text-[10px]">█</span>
  {label ?? config.text}
</span>
```

### Card

```astro
---
// src/components/ui/Card.astro
interface Props {
  title?: string;
  href?: string;
  variant?: 'default' | 'elevated' | 'interactive';
  class?: string;
}

const { 
  title, 
  href, 
  variant = 'default',
  class: className = '',
} = Astro.props;

const Tag = href ? 'a' : 'div';

const variants = {
  default: 'bg-bg-surface border border-border',
  elevated: 'bg-bg-elevated border border-border shadow-lg',
  interactive: 'bg-bg-surface border border-border hover:border-brand-primary hover:shadow-glow-sm transition-all cursor-pointer',
};
---

<Tag
  href={href}
  class:list={[
    'block p-6 rounded-md',
    variants[variant],
    className,
  ]}
>
  {title && (
    <h3 class="font-mono text-subhead font-semibold text-text-primary mb-3">
      {title}
    </h3>
  )}
  <div class="font-mono text-body text-text-secondary">
    <slot />
  </div>
</Tag>
```

### Metric Display

```astro
---
// src/components/ui/MetricDisplay.astro
interface Props {
  value: string | number;
  unit?: string;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
}

const { value, unit, label, trend } = Astro.props;
---

<div class="flex flex-col items-center p-6 bg-bg-surface border border-border rounded-md">
  <div class="flex items-baseline gap-1">
    <span class="font-mono text-headline font-bold text-brand-primary tabular-nums">
      {value}
    </span>
    {unit && (
      <span class="font-mono text-small text-text-muted">
        {unit}
      </span>
    )}
  </div>
  <span class="font-mono text-caption text-text-subtle uppercase tracking-wider mt-2">
    {label}
  </span>
</div>
```

### Hero Section

```astro
---
// src/components/landing/Hero.astro
import Monotile from '@components/brand/Monotile.astro';
import Button from '@components/ui/Button.astro';
---

<section class="relative min-h-screen flex items-center justify-center bg-bg-primary">
  <!-- Grid background -->
  <div class="absolute inset-0 bg-[linear-gradient(rgba(84,174,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(84,174,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
  
  <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <div class="flex justify-center mb-8">
      <Monotile size="hero" variant="stroke" glow />
    </div>
    
    <h1 class="font-display text-hero font-semibold tracking-widest text-brand-primary mb-4">
      WEYL
    </h1>
    
    <p class="font-mono text-subhead text-text-secondary mb-6">
      The render layer for generative media
    </p>
    
    <p class="font-mono text-body text-text-muted max-w-2xl mx-auto mb-12">
      Inference infrastructure purpose-built for diffusion models on Blackwell silicon. 
      Sub-100ms latency. NVFP4-native. Cost structures nobody else can match.
    </p>
    
    <div class="flex flex-wrap justify-center gap-4">
      <Button href="/docs/getting-started" variant="primary">
        Get Started
      </Button>
      <Button href="https://github.com/weyl-ai" variant="outline">
        View on GitHub
      </Button>
    </div>
    
    <div class="mt-16 font-mono text-caption text-text-subtle">
      <span class="text-semantic-success">█</span> OPERATIONAL
      <span class="mx-4">|</span>
      latency: <span class="text-text-muted">47ms p99</span>
      <span class="mx-4">|</span>
      <span class="text-brand-primary">1,071 TFLOPS</span> sustained
    </div>
  </div>
</section>
```

---

## Content Collection Schemas

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Weyl Team'),
    tags: z.array(z.string()).default([]),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    draft: z.boolean().default(false),
    canonicalUrl: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  schema: docsSchema({
    extend: z.object({
      apiVersion: z.string().optional(),
      deprecated: z.boolean().default(false),
      category: z.enum(['core', 'api', 'guide', 'reference']).optional(),
    }),
  }),
});

export const collections = { blog, docs };
```

---

## SEO Implementation

### JSON-LD Component

```astro
---
// src/components/seo/JsonLd.astro
import type { WithContext, Thing } from 'schema-dts';

interface Props {
  schema: WithContext<Thing>;
}

const { schema } = Astro.props;
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Schema Helpers

```typescript
// src/lib/seo/schema.ts
import type { 
  WithContext, 
  Organization, 
  WebSite, 
  Article,
} from 'schema-dts';

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Weyl AI Labs',
  url: 'https://weyl.ai',
  logo: 'https://weyl.ai/logo.svg',
  description: 'Inference infrastructure for generative media',
  sameAs: [
    'https://twitter.com/weyl_ai',
    'https://github.com/weyl-ai',
  ],
};

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Weyl',
  url: 'https://weyl.ai',
  description: 'The render layer for generative media',
  publisher: {
    '@type': 'Organization',
    name: 'Weyl AI Labs',
  },
};

export function articleSchema(props: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  image?: string;
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    datePublished: props.datePublished,
    dateModified: props.dateModified ?? props.datePublished,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Weyl AI Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://weyl.ai/logo.svg',
      },
    },
    mainEntityOfPage: props.url,
    image: props.image,
  };
}
```

### Base Head Component

```astro
---
// src/layouts/BaseHead.astro
import { ViewTransitions } from 'astro:transitions';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

const { 
  title, 
  description, 
  image = '/og/default.png',
  canonicalUrl,
  noindex = false,
  type = 'website',
} = Astro.props;

const siteUrl = 'https://weyl.ai';
const fullTitle = title === 'Weyl' ? title : `${title} | Weyl`;
const canonical = canonicalUrl ?? new URL(Astro.url.pathname, siteUrl).href;
const ogImage = new URL(image, siteUrl).href;
---

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{fullTitle}</title>
<meta name="title" content={fullTitle} />
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<meta name="theme-color" content="#090b0e" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#f4f1eb" media="(prefers-color-scheme: light)" />

<meta property="og:type" content={type} />
<meta property="og:url" content={canonical} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@weyl_ai" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Aldrich&display=swap" rel="stylesheet" />

<ViewTransitions />
```

---

## TypeScript Configuration

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@lib/*": ["src/lib/*"],
      "@content/*": ["src/content/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*", "astro.config.mjs"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Cursor Prompting Strategy

### Initial Setup Prompt

```
I'm building a website for Weyl using Astro + Starlight. 

Context files in .cursor/ contain:
- brand-tokens.md: CSS custom properties for colors, typography, spacing
- component-specs.md: Interface definitions for all UI components
- architecture.md: Project structure

Rules:
- TypeScript strict mode, no `any`
- All colors via CSS custom properties
- Monospace font (Iosevka) for body text
- Glow effects on interactive elements in dark mode
- No border-radius in light mode

Start by creating the project scaffold with all config files.
```

### Component Generation Prompt Template

```
Create the [ComponentName] component for the Weyl site.

Requirements:
- Location: src/components/[category]/[ComponentName].astro
- Props interface defined in frontmatter
- Use class:list for conditional classes
- Reference brand tokens from CSS custom properties
- Include aria-label for accessibility

Refer to component-specs.md for the interface definition.
```

### Page Generation Prompt Template

```
Create the [page name] page for the Weyl site.

Requirements:
- Import components from @components/
- Use BaseHead for meta tags
- Include JSON-LD schema
- Semantic HTML structure with aria-labelledby
- Mobile-responsive layout

Reference the design at [URL if available].
```

---

## Deployment

```yaml
# Cloudflare Pages or Vercel

Build command: bun run build
Output directory: dist
Node version: 20

# Environment variables
SITE_URL: https://weyl.ai
```

---

## Verification Checklist

After each phase, verify:

- [ ] `bun run build` succeeds with no TypeScript errors
- [ ] `bun run check` passes Astro checks
- [ ] Components render correctly in both themes
- [ ] All interactive elements have focus states
- [ ] SEO meta tags present on all pages
- [ ] JSON-LD validates at schema.org validator
- [ ] Lighthouse score > 90 on all metrics

---

*Build trust. Ship code. Arbitrage dysfunction.*

# Project Architecture

## Directory Structure

```
weyl-website/
├── .cursor/                    # Cursor IDE context files
│   ├── brand-tokens.md         # CSS custom properties reference
│   ├── component-specs.md      # Component interface definitions
│   ├── architecture.md         # This file
│   └── weyl-site-spec.md       # Original project specification
├── .cursorrules                # Development rules and conventions
├── public/                     # Static assets
│   ├── favicon.svg             # SVG favicon
│   ├── favicon-32.png          # PNG favicon (32x32)
│   ├── apple-touch-icon.png    # iOS home screen icon (180x180)
│   ├── robots.txt              # Search engine directives
│   ├── weyl-logo.svg           # Logo asset
│   └── og/                     # Open Graph images
│       └── default.png         # Default OG image (1200x630)
├── src/
│   ├── assets/                 # Processed assets (optimized by Astro)
│   │   └── monotile.svg        # Logo component asset
│   ├── components/
│   │   ├── brand/              # Brand identity components
│   │   │   ├── Monotile.astro  # Logo mark
│   │   │   ├── Wordmark.astro  # Text logo
│   │   │   └── LogoLockup.astro # Combined logo + text
│   │   ├── landing/            # Landing page sections
│   │   │   ├── Hero.astro      # Hero section
│   │   │   ├── TrustCascade.astro # Metrics and trust signals
│   │   │   ├── DemandCurves.astro # Use cases
│   │   │   ├── TechStack.astro # Technology overview
│   │   │   └── CTA.astro       # Call to action
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── Button.astro    # Button component
│   │   │   ├── Card.astro      # Card container
│   │   │   ├── StatusBadge.astro # Status indicators
│   │   │   └── MetricDisplay.astro # Metric cards
│   │   ├── seo/                # SEO utilities
│   │   │   └── JsonLd.astro    # JSON-LD structured data
│   │   └── overrides/          # Starlight component overrides
│   │       ├── Banner.astro    # Custom banner
│   │       ├── Header.astro    # Custom header
│   │       ├── Footer.astro    # Custom footer
│   │       └── ThemeSelect.astro # Theme switcher
│   ├── content/                # Content collections
│   │   ├── config.ts           # Collection schemas (Zod)
│   │   ├── blog/               # Blog posts (MDX)
│   │   │   └── *.mdx
│   │   └── docs/               # Documentation (Starlight)
│   │       ├── getting-started/
│   │       ├── api/
│   │       └── design/
│   ├── layouts/                # Page layouts
│   │   ├── BaseHead.astro      # Meta tags, SEO, ViewTransitions
│   │   ├── Landing.astro       # Landing page wrapper
│   │   └── Blog.astro          # Blog post layout
│   ├── pages/                  # Route endpoints
│   │   ├── index.astro         # Landing page (/)
│   │   ├── blog/
│   │   │   ├── index.astro     # Blog listing (/blog)
│   │   │   └── [...slug].astro # Blog post pages (/blog/*)
│   │   ├── api/
│   │   │   └── og/
│   │   │       └── [...slug].ts # Dynamic OG image generation
│   │   ├── llms.txt.ts         # LLM-parseable site info
│   │   ├── llms-full.txt.ts    # Full LLM context
│   │   └── [...slug].md.ts     # Markdown page handler
│   ├── styles/                 # Global styles
│   │   ├── tokens.css          # CSS custom properties (design tokens)
│   │   ├── global.css          # Global base styles
│   │   ├── typography.css      # Typography system
│   │   └── starlight.css       # Starlight overrides
│   └── lib/                    # Utilities and helpers
│       ├── seo/
│       │   └── schema.ts       # JSON-LD schema builders
│       ├── types/
│       │   ├── branded.ts      # Branded types
│       │   └── result.ts       # Result type utilities
│       └── utils/
│           └── cn.ts           # Class name utilities
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── bun.lockb                   # Bun lockfile

```

## Tech Stack

### Core Framework
- **Astro 5.x**: Static site generator with partial hydration
- **Starlight**: Documentation framework built on Astro
- **TypeScript 5.7**: Strict mode, no escape hatches

### Styling
- **Tailwind CSS 3.4+**: Utility-first CSS framework
- **CSS Custom Properties**: All colors and tokens via CSS variables
- **PostCSS**: CSS processing pipeline

### Content
- **MDX**: Markdown with JSX components
- **Zod**: Runtime schema validation
- **Content Collections**: Type-safe content management

### Development
- **Bun**: Package manager and runtime
- **Astro Check**: Type checking for Astro files
- **ESLint**: Code linting (if configured)

## Routing Strategy

### Static Routes
- `/` - Landing page (marketing)
- `/blog` - Blog index
- `/blog/[slug]` - Individual blog posts
- `/getting-started/*` - Docs via Starlight
- `/api/*` - Docs via Starlight

### Dynamic Routes
- `/blog/[...slug]` - Catches all blog post slugs
- `/api/og/[...slug]` - Generates OG images on-demand

### Special Routes
- `/llms.txt` - LLM-parseable site information
- `/llms-full.txt` - Full documentation for LLMs
- `/sitemap-index.xml` - Auto-generated by @astrojs/sitemap

## Build Process

1. **Content Collection**: Zod validates all MDX frontmatter
2. **Type Generation**: TypeScript types generated from collections
3. **Static Generation**: All pages pre-rendered at build time
4. **Asset Optimization**: Images optimized via Sharp
5. **CSS Processing**: Tailwind + PostCSS → minified CSS
6. **Bundle Optimization**: Vite bundles and tree-shakes JS

## SEO Architecture

### Meta Tags (BaseHead.astro)
- Standard meta tags (title, description, canonical)
- OpenGraph tags (og:title, og:image, etc.)
- Twitter Cards (twitter:card, twitter:image, etc.)
- Theme color for mobile browsers

### Structured Data (JSON-LD)
- Organization schema (site-wide)
- Website schema (site-wide)
- Article schema (blog posts)
- Breadcrumb schema (navigation)

### Sitemap
- Auto-generated by @astrojs/sitemap
- Includes all static and dynamic routes
- Submitted to search engines via robots.txt

### Open Graph Images
- Default image for pages without specific OG image
- Dynamic generation for blog posts (via API route)
- 1200x630 dimensions (recommended by OpenGraph)

## Design System

### Color System
- Dark mode (Hypermodern): Default theme
- Light mode (High Modernism): Alternate theme
- All colors via CSS custom properties
- Theme toggle via Starlight component

### Typography
- **Dark mode**: Iosevka (monospace) for all text
- **Light mode**: System fonts (Helvetica/Arial)
- **Display font**: Aldrich (both themes)
- Scale: hero (3rem) → headline → subhead → body → caption

### Spacing
- Consistent 8px-based scale
- Defined via CSS custom properties (--space-*)

### Component Variants
- Buttons: primary, outline, ghost
- Cards: default, elevated, interactive
- Status: nominal, warning, error, offline

## Data Flow

### Content Authoring
1. Write MDX in `src/content/blog/` or `src/content/docs/`
2. Frontmatter validated by Zod schema in `config.ts`
3. Content collections provide type-safe access

### Page Rendering
1. `.astro` pages fetch content via `getCollection()`
2. Props passed to components with TypeScript interfaces
3. Components render using CSS custom properties
4. ViewTransitions enable smooth navigation

### Build Output
- `dist/` - Static HTML, CSS, JS, assets
- All routes pre-rendered (no SSR)
- Ready for deployment to any static host

## Development Workflow

### Commands
- `bun dev` - Start dev server (hot reload)
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun check` - TypeScript + Astro checks

### Code Organization
- Components: PascalCase.astro
- Utilities: kebab-case.ts
- Content: kebab-case.mdx
- Strict TypeScript: No `any`, no `@ts-ignore`

### Type Safety
- Branded types for domain primitives
- Result types (neverthrow) for error handling
- Zod schemas for runtime validation
- Strict compiler options enabled

## Deployment

### Target Platforms
- Vercel (recommended)
- Cloudflare Pages
- Netlify
- Any static hosting service

### Build Configuration
- Build command: `bun run build`
- Output directory: `dist`
- Node version: 20+
- Environment: SITE_URL=https://weyl.ai

### Performance Targets
- Lighthouse score > 90 on all metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- All images optimized and lazy-loaded


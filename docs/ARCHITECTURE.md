# Project Architecture

## Directory Structure

```
weyl-website/
├── .cursor/                    # Cursor IDE context files
│   ├── archive-theme.md         # High Modernism (light theme) design spec
│   ├── component-specs.md       # Component interface definitions
│   ├── typography.md            # Typography system documentation
│   └── architecture.md         # Original architecture doc (moved to /docs)
├── public/                     # Static assets
│   ├── favicon.svg             # SVG favicon
│   ├── brand/                  # Brand assets (logos, monotiles)
│   │   └── *.svg               # SVG logo files
│   ├── blog/                   # Blog post images
│   │   └── *.png               # Blog images
│   ├── fonts/                  # Custom font files
│   │   └── *.woff2             # Web font files (tracked by git-lfs)
│   ├── og-*.png                # Open Graph images (tracked by git-lfs)
│   └── robots.txt              # Search engine directives
├── src/
│   ├── assets/                 # Processed assets (optimized by Astro)
│   │   └── monotile.svg        # Logo component asset
│   ├── components/
│   │   ├── analytics/          # Analytics and performance tracking
│   │   │   ├── SpeedInsights.astro  # Vercel Speed Insights
│   │   │   └── WebVitals.astro      # Core Web Vitals tracking
│   │   ├── brand/              # Brand identity components
│   │   │   ├── Monotile.astro  # Logo mark
│   │   │   ├── Wordmark.astro  # Text logo
│   │   │   └── LogoLockup.astro # Combined logo + text
│   │   ├── content/            # Content presentation components
│   │   │   ├── CodeBlock.astro # Syntax-highlighted code blocks
│   │   │   ├── LastUpdated.astro    # Last updated timestamp
│   │   │   └── ReadingTime.astro    # Estimated reading time
│   │   ├── landing/            # Landing page sections
│   │   │   ├── Hero.astro      # Hero section
│   │   │   ├── TrustCascade.astro # Metrics and trust signals
│   │   │   ├── DemandCurves.astro # Use cases
│   │   │   ├── TechStack.astro # Technology overview
│   │   │   ├── CTA.astro       # Call to action
│   │   │   ├── LandingNav.astro     # Landing page navigation
│   │   │   └── LandingFooter.astro  # Landing page footer
│   │   ├── navigation/         # Navigation components
│   │   │   ├── Breadcrumbs.astro    # Breadcrumb navigation
│   │   │   ├── DocNav.astro         # Documentation navigation
│   │   │   └── TableOfContents.astro # In-page TOC
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── Button.astro    # Button component
│   │   │   ├── Card.astro      # Card container
│   │   │   ├── StatusBadge.astro # Status indicators
│   │   │   ├── MetricDisplay.astro # Metric cards
│   │   │   ├── CalendlyBadge.astro # Calendly integration badge
│   │   │   └── SocialIcons.astro    # Social media icons
│   │   ├── seo/                # SEO utilities
│   │   │   └── JsonLd.astro    # JSON-LD structured data
│   │   └── overrides/          # Starlight component overrides
│   │       ├── Banner.astro    # Custom banner
│   │       ├── Header.astro    # Custom header
│   │       ├── Footer.astro    # Custom footer
│   │       ├── Head.astro      # Custom head meta tags
│   │       ├── SocialIcons.astro    # Social links override
│   │       └── ThemeSelect.astro # Theme switcher
│   ├── content/                # Content collections
│   │   ├── config.ts           # Collection schemas (Zod)
│   │   ├── blog/               # Blog posts (MDX)
│   │   │   ├── introducing-weyl-ai.mdx
│   │   │   └── *.mdx
│   │   └── docs/               # Documentation (Starlight)
│   │       ├── getting-started/
│   │       ├── api/
│   │       ├── workflows/
│   │       └── design/
│   ├── layouts/                # Page layouts
│   │   ├── BaseHead.astro      # Meta tags, SEO, ViewTransitions
│   │   ├── Landing.astro       # Landing page wrapper
│   │   └── Blog.astro          # Blog post layout
│   ├── pages/                  # Route endpoints
│   │   ├── index.astro         # Landing page (/)
│   │   ├── archive.astro       # Archive page (/archive)
│   │   ├── brand.astro         # Brand assets page (/brand)
│   │   ├── posters.astro       # Posters page (/posters)
│   │   ├── request-access.astro     # Request access page (/request-access)
│   │   ├── sitemap.astro       # Sitemap page (/sitemap)
│   │   ├── blog/
│   │   │   ├── index.astro     # Blog listing (/blog)
│   │   │   ├── [...slug].astro # Blog post pages (/blog/*)
│   │   │   └── rss.xml.ts      # RSS feed
│   │   ├── api/
│   │   │   ├── request-access.ts    # Request access API endpoint
│   │   │   └── og/
│   │   │       └── [...slug].ts # Dynamic OG image generation
│   │   ├── .well-known/
│   │   │   └── ai-plugin.json.ts    # AI plugin metadata
│   │   ├── ai-sitemap.xml.ts   # AI-specific sitemap
│   │   ├── docs.json.ts        # Documentation index JSON
│   │   ├── openapi.json.ts     # OpenAPI specification
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
├── docs/                       # Project documentation
│   ├── README.md               # Documentation index
│   ├── ARCHITECTURE.md         # This file
│   ├── ASSETS.md               # Asset generation guide
│   ├── SEO.md                  # SEO configuration
│   ├── VERCEL_DEPLOYMENT.md    # Deployment guide
│   ├── API_REQUEST_ACCESS_SETUP.md  # API access setup
│   ├── SLACK_CONNECT_SETUP.md  # Slack integration setup
│   ├── PAGES.md                # Page documentation
│   ├── API-ROUTES.md           # API routes documentation
│   ├── COMPONENTS.md           # Component documentation
│   ├── openapi.yaml            # OpenAPI specification
│   └── archive/                # Historical documentation
│       ├── PRODUCTION-READY.md
│       └── ORIGINAL-SPEC.md
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── bun.lock                    # Bun lockfile

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
- **git-lfs**: Large file storage for fonts and images

### Deployment
- **Vercel**: Hosting and deployment platform
- **Vercel Analytics**: Web analytics and performance monitoring

## Routing Strategy

### Marketing Pages
- `/` - Landing page (marketing)
- `/brand` - Brand assets and guidelines
- `/posters` - Downloadable posters
- `/archive` - Archive page (High Modernism theme)
- `/sitemap` - Human-readable sitemap

### Content Pages
- `/blog` - Blog index
- `/blog/[slug]` - Individual blog posts
- `/blog/rss.xml` - RSS feed
- `/request-access` - API access request form

### Documentation Routes (Starlight)
- `/getting-started/*` - Getting started guides
- `/api/*` - API documentation
- `/workflows/*` - Workflow guides
- `/design/*` - Design system docs

### API Endpoints
- `/api/request-access` - Form submission endpoint (Klaviyo/Slack integration)
- `/api/og/[...slug]` - Dynamic OG image generation

### SEO & Discovery Routes
- `/llms.txt` - LLM-parseable site information
- `/llms-full.txt` - Full documentation for LLMs
- `/ai-sitemap.xml` - AI-specific sitemap
- `/docs.json` - Documentation index (structured JSON)
- `/openapi.json` - OpenAPI specification
- `/.well-known/ai-plugin.json` - AI plugin metadata
- `/sitemap-index.xml` - Auto-generated by @astrojs/sitemap
- `/robots.txt` - Search engine directives

### Dynamic Routes
- `/blog/[...slug]` - Catches all blog post slugs
- `/[...slug].md` - Markdown page handler

## Build Process

1. **Content Collection**: Zod validates all MDX frontmatter
2. **Type Generation**: TypeScript types generated from collections
3. **Static Generation**: All pages pre-rendered at build time (except API routes)
4. **Asset Optimization**: Images optimized via Sharp
5. **Font Handling**: Custom Iosevka fonts via git-lfs
6. **CSS Processing**: Tailwind + PostCSS → minified CSS
7. **Bundle Optimization**: Vite bundles and tree-shakes JS

## SEO Architecture

### Meta Tags (BaseHead.astro, Head.astro)
- Standard meta tags (title, description, canonical)
- OpenGraph tags (og:title, og:image, etc.)
- Twitter Cards (twitter:card, twitter:image, etc.)
- Theme color for mobile browsers

### Structured Data (JSON-LD)
- Organization schema (site-wide)
- Website schema (site-wide)
- Article schema (blog posts)
- Breadcrumb schema (navigation)

### Sitemap Strategy
- Auto-generated by @astrojs/sitemap (sitemap-index.xml)
- AI-specific sitemap (ai-sitemap.xml)
- Human-readable sitemap page (/sitemap)
- Submitted to search engines via robots.txt

### Open Graph Images
- Static images for marketing pages (og-*.png, tracked by git-lfs)
- Dynamic generation for blog posts (via /api/og/[...slug])
- 1200x630 dimensions (OpenGraph standard)

### LLM Optimization
- `/llms.txt` - Lightweight site metadata
- `/llms-full.txt` - Complete documentation context
- `/.well-known/ai-plugin.json` - AI plugin discovery
- `/docs.json` - Structured documentation index
- `/openapi.json` - API specification

## Design System

### Color System
- **Dark mode (Hypermodern)**: Default theme for main site
- **Light mode (High Modernism)**: Alternate theme, used on /archive page
- All colors via CSS custom properties in `src/styles/tokens.css`
- Theme toggle via Starlight ThemeSelect component

### Typography
- **Dark mode (Hypermodern)**: Custom Iosevka monospace for all text
- **Light mode (High Modernism)**: System fonts (Helvetica/Arial)
- **Display font**: Aldrich (both themes)
- Custom Iosevka build with specific features (see `/fonts/README.md`)
- Scale: hero (3rem) → headline → subhead → body → caption

### Spacing
- Consistent 8px-based scale
- Defined via CSS custom properties (--space-*)
- All in `src/styles/tokens.css`

### Component Variants
- **Buttons**: primary, outline, ghost
- **Cards**: default, elevated, interactive
- **Status badges**: nominal, warning, error, offline

## Data Flow

### Content Authoring
1. Write MDX in `src/content/blog/` or `src/content/docs/`
2. Frontmatter validated by Zod schema in `config.ts`
3. Content collections provide type-safe access via `getCollection()`

### Page Rendering
1. `.astro` pages fetch content via `getCollection()`
2. Props passed to components with TypeScript interfaces
3. Components render using CSS custom properties from tokens.css
4. ViewTransitions enable smooth SPA-like navigation

### Form Submissions
1. Request access form on `/request-access` page
2. Submits to `/api/request-access` endpoint
3. Integrates with either Klaviyo or Slack Connect
4. See `API_REQUEST_ACCESS_SETUP.md` and `SLACK_CONNECT_SETUP.md`

### Build Output
- `dist/` - Static HTML, CSS, JS, assets
- Most routes pre-rendered (SSG)
- API routes run as serverless functions (Vercel)
- Ready for deployment to Vercel

## Development Workflow

### Commands
- `bun dev` - Start dev server (hot reload)
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun check` - TypeScript + Astro checks

### Code Organization
- **Components**: PascalCase.astro
- **Utilities**: kebab-case.ts
- **Content**: kebab-case.mdx
- **Strict TypeScript**: No `any`, no `@ts-ignore`

### Type Safety
- Branded types for domain primitives (`src/lib/types/branded.ts`)
- Result types (neverthrow) for error handling (`src/lib/types/result.ts`)
- Zod schemas for runtime validation
- Strict compiler options enabled in `tsconfig.json`

## Deployment

### Target Platform
- **Vercel** (primary deployment target)
- Configured with @astrojs/vercel adapter
- Server-side rendering enabled for API routes
- Static prerendering for content pages

### Build Configuration
- **Build command**: `bun run build`
- **Output directory**: `.vercel/output` (auto-configured by adapter)
- **Node version**: 22+ (Vercel uses Node 22 for functions)
- **Install command**: `bun install`

### Environment Variables
- `SITE_URL=https://weyl.ai` (production)
- See `VERCEL_DEPLOYMENT.md` for complete setup

### Performance Targets
- Lighthouse score > 90 on all metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- All images optimized and lazy-loaded
- Custom fonts preloaded for performance

## Analytics & Monitoring

### Vercel Analytics
- Web Analytics enabled via adapter configuration
- Tracks page views, Web Vitals, and performance metrics
- Configured in `astro.config.mjs`

### Custom Web Vitals
- Custom tracking via `WebVitals.astro` component
- Sends metrics to analytics endpoint
- Works alongside Vercel Analytics

### Speed Insights
- Vercel Speed Insights integration via `SpeedInsights.astro`
- Real-time performance monitoring
- Provides actionable performance recommendations

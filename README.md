# Weyl Website

A hypermodern static website built with Astro + Starlight following strict TypeScript principles.

## Project Overview

This website serves as the landing page, blog, and documentation for Weyl - inference infrastructure for generative media.

### Key Features

- **Dual Theme Support**: Hypermodern (dark) with glow effects and High Modernism (light) without
- **Strict TypeScript**: Maximum constraint mode with branded types and Result monads
- **SEO Optimized**: JSON-LD structured data, complete meta tags, automatic sitemap
- **Content Collections**: Zod-validated blog and documentation with type safety
- **Component Library**: Reusable UI components following strict design system

## Tech Stack

- **Framework**: Astro 5.x with Starlight for documentation
- **Styling**: Tailwind CSS 3.x with CSS custom properties
- **Type Safety**: TypeScript strict mode, Zod validation, neverthrow Result types
- **Content**: MDX with content collections
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Visit http://localhost:4321

### Build

```bash
bun run build
```

### Preview

```bash
bun run preview
```

## Project Structure

```
weyl-website/
├── .cursor/                    # Cursor IDE context files
│   ├── brand-tokens.md
│   ├── hypermodern.mdc
│   └── weyl-site-spec.md
├── public/                     # Static assets
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/                 # Source assets
│   │   └── monotile.svg
│   ├── components/
│   │   ├── brand/             # Logo and branding
│   │   ├── landing/           # Landing page sections
│   │   ├── overrides/         # Starlight customizations
│   │   ├── seo/               # SEO components
│   │   └── ui/                # Reusable UI components
│   ├── content/
│   │   ├── blog/              # Blog posts
│   │   ├── docs/              # Documentation
│   │   └── config.ts          # Content collection schemas
│   ├── layouts/               # Page layouts
│   ├── lib/
│   │   ├── seo/               # SEO utilities
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Utility functions
│   ├── pages/                 # Route pages
│   └── styles/                # Global styles and tokens
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## Development Rules

### Code Style

- Use Astro components (.astro) for static content
- Use React (.tsx) only for interactive islands
- All colors via CSS custom properties
- Font: Iosevka monospace for body text
- Status indicators use █ (U+2588) block character

### Type Safety

- No `any` types
- No `// @ts-ignore`
- Use Zod for all runtime validation
- Branded types for IDs and domain primitives
- Result types over try/catch where practical

### Component Patterns

- Props interfaces defined inline in frontmatter
- Use class:list for conditional classes
- Semantic HTML with aria labels
- JSON-LD for all pages

### File Naming

- Components: PascalCase.astro
- Utilities: kebab-case.ts
- Content: kebab-case.mdx

## Brand Guidelines

### Hypermodern (Dark Mode)

- Border radius: 4px
- Glow effects on interactive elements
- Monospace font: Iosevka
- Navigation uses // delimiters

### High Modernism (Light Mode)

- Border radius: 0
- No glow effects
- Sans-serif font: Helvetica Neue
- Clean, minimal aesthetic

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Run TypeScript and Astro checks

## Build Output

The build produces a static site in the `dist/` directory with:

- 7 HTML pages
- Optimized CSS and JavaScript bundles
- Sitemap and SEO files
- Pagefind search index

## SEO Features

- JSON-LD structured data (Organization, WebSite, Article)
- Open Graph meta tags
- Twitter Card support
- Automatic sitemap generation
- Canonical URLs
- robots.txt

## Performance

- Static site generation for optimal performance
- CSS custom properties for theming
- Minimal JavaScript (only for interactive components)
- Optimized images and assets

## License

All rights reserved © 2024 Weyl AI Labs

---

*Build trust. Ship code. Arbitrage dysfunction.*


# Weyl Website

A hypermodern static website built with Astro + Starlight following strict TypeScript principles.

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Overview

Landing page, blog, and documentation for Weyl - inference infrastructure for generative media.

### Key Features

- **Dual Theme Support**: Hypermodern (dark) with glow effects and High Modernism (light) without
- **Strict TypeScript**: Maximum constraint mode with branded types and Result monads
- **SEO Optimized**: JSON-LD structured data, complete meta tags, automatic sitemap
- **Content Collections**: Zod-validated blog and documentation with type safety
- **Dynamic OG Images**: Auto-generated social media previews at build time

## Tech Stack

- **Framework**: Astro 5.x with Starlight
- **Styling**: Tailwind CSS 3.x + CSS custom properties
- **Type Safety**: TypeScript strict mode, Zod validation, neverthrow
- **Content**: MDX with content collections
- **Runtime**: Bun

## Development

Visit http://localhost:4321 after running `bun run dev`

### Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run check` | TypeScript + Astro validation |

## Documentation

Detailed documentation available in [`docs/`](./docs/):

- **[Production Ready Guide](./docs/PRODUCTION-READY.md)** - Deployment checklist and completion summary
- **[Asset Generation](./docs/ASSETS.md)** - Instructions for generating favicons and OG images
- **[Architecture](./docs/README.md)** - Detailed project structure and design decisions

## Development Rules

See [`.cursorrules`](./.cursorrules) for complete development guidelines.

**Key Principles:**
- Use Astro components (.astro) for static content
- TypeScript strict mode (no `any`, no `@ts-ignore`)
- All colors via CSS custom properties
- Semantic HTML with aria labels
- JSON-LD for all pages

## Brand Guidelines

### Hypermodern (Dark Mode)
- Border radius: 4px, glow effects on interactive elements
- Monospace font: Iosevka
- Navigation uses `//` delimiters

### High Modernism (Light Mode)
- Border radius: 0, no glow effects
- Sans-serif font: Helvetica Neue
- Clean, minimal aesthetic

## Build Output

Static site in `dist/` with:
- 44+ optimized HTML pages
- Dynamic OG images
- Sitemap and robots.txt
- Pagefind search index

## SEO Features

- JSON-LD structured data (Organization, WebSite, Article)
- Open Graph + Twitter Card support
- Automatic sitemap generation
- Dynamic OG image generation
- Canonical URLs

## License

All rights reserved © 2024 Weyl AI Labs

---

*Build trust. Ship code. Arbitrage dysfunction.*

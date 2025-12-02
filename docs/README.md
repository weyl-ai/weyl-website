# Weyl Documentation

Internal documentation for development and deployment.

## Contents

- **[PRODUCTION-READY.md](./PRODUCTION-READY.md)** - Production deployment checklist and completion summary
- **[ASSETS.md](./ASSETS.md)** - Instructions for generating image assets (favicons, OG images)

## Project Documentation

### Repository Structure
```
weyl-website/
├── .cursor/              # Cursor IDE context files (brand tokens, architecture, specs)
├── .cursorrules          # Development rules and conventions
├── docs/                 # Project documentation (this folder)
├── public/               # Static assets (logos, robots.txt)
│   └── og/              # Open Graph images
├── scripts/              # Build and utility scripts
├── src/
│   ├── assets/          # Processed assets (Astro optimized)
│   ├── components/      # UI components (brand, landing, ui, seo)
│   ├── content/         # Content collections (blog, docs)
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # Routes and API endpoints
│   └── styles/          # Global CSS (tokens, typography, starlight)
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

### Key Files

- **`.cursorrules`** - Development standards and conventions
- **`.env.example`** - Environment variable template
- **`openapi.yaml`** - API specification reference

### Development

```bash
bun install         # Install dependencies
bun run dev         # Start dev server
bun run build       # Build for production
bun run preview     # Preview production build
bun run check       # TypeScript + Astro checks
```

### Stack

- **Framework**: Astro 5.x with Starlight
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.x with CSS custom properties
- **Runtime**: Bun
- **Content**: MDX with Zod validation

### SEO & Meta

- JSON-LD structured data on all pages
- Dynamic OG image generation (`/api/og/[slug]`)
- Sitemap auto-generated
- Search powered by Pagefind

See [.cursor/architecture.md](../.cursor/architecture.md) for detailed system design.


# Weyl AI Website Documentation

Comprehensive documentation for developers, maintainers, and contributors.

## Core Documentation

### Getting Started
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system architecture, directory structure, and tech stack
- **[ASSETS.md](./ASSETS.md)** - Asset generation guide (favicons, OG images)

### Features & Components
- **[PAGES.md](./PAGES.md)** - All routes and pages documentation
- **[API-ROUTES.md](./API-ROUTES.md)** - API endpoints and special routes
- **[COMPONENTS.md](./COMPONENTS.md)** - Component library and interfaces (coming soon)
- **[SEO.md](./SEO.md)** - SEO implementation and configuration

### Deployment & Integration
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Vercel deployment guide
- **[API_REQUEST_ACCESS_SETUP.md](./API_REQUEST_ACCESS_SETUP.md)** - Klaviyo integration setup
- **[SLACK_CONNECT_SETUP.md](./SLACK_CONNECT_SETUP.md)** - Slack Connect integration setup

### Reference
- **[openapi.yaml](./openapi.yaml)** - API specification in OpenAPI 3.0 format

### Archive
- **[archive/](./archive/)** - Historical documentation and original specifications

## Project Documentation

### Quick Links

- **Architecture Overview**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **All Pages**: [PAGES.md](./PAGES.md)
- **API Documentation**: [API-ROUTES.md](./API-ROUTES.md)
- **Deploy to Vercel**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **SEO Guide**: [SEO.md](./SEO.md)

### Repository Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the complete directory structure and file organization.

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

### Key Features

- **SEO**: JSON-LD structured data, dynamic OG images, XML sitemaps
- **Documentation**: Astro Starlight with search (Pagefind)
- **Analytics**: Vercel Analytics and Speed Insights
- **git-lfs**: Large file storage for fonts and images
- **TypeScript**: Strict mode, branded types, result types

## Contributing

When adding new features or making changes:

1. Update relevant documentation in `/docs`
2. Follow TypeScript strict mode (no `any`, no `@ts-ignore`)
3. Add Zod schemas for new content types
4. Include SEO metadata for new pages
5. Test locally with `bun dev` before deploying

## Documentation Organization

### Developer Docs (`/docs`)
Technical documentation for developers:
- Architecture and system design
- API references and specifications
- Deployment guides
- Integration setup

### AI Context (`/.cursor`)
Design specifications and context for AI tools:
- Design system principles
- Theme specifications (Hypermodern, High Modernism)
- Typography guidelines

## Support & Resources

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Website**: https://weyl.ai
- **API Docs**: https://weyl.ai/api


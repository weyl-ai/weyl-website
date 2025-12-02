# SEO Configuration Documentation

## Overview

This document outlines the comprehensive SEO setup for the Weyl website, covering metadata, OG images, structured data, and optimization strategies.

## Metadata Strategy

### Landing Page (/)
- **Title**: Weyl
- **Description**: The render layer for generative media. Inference infrastructure for diffusion models with sub-100ms latency.
- **OG Image**: `/og-default.png` (1200x630px)
- **Type**: website
- **Structured Data**: Organization + Website schemas

### Documentation (/getting-started/*, /api/*)
- **Title**: [Page Title] | Weyl
- **Description**: Auto-generated from page content
- **OG Image**: `/og-docs.png` (1200x630px)
- **Type**: website
- **Structured Data**: WebPage schema (via Starlight)

### Blog (/blog/*)
- **Title**: [Post Title] | Weyl
- **Description**: Post excerpt/description
- **OG Image**: Custom per post or `/og-blog.png` (1200x630px)
- **Type**: article
- **Structured Data**: TechArticle schema with author, dates, keywords

## OG Image Generation

### Automated Generation
OG images are generated at build time using the `generate-og-images.ts` script:

```bash
bun run generate:og
```

This creates three static PNG images:
- `og-default.png` - Landing page
- `og-docs.png` - Documentation pages
- `og-blog.png` - Blog posts

### Technology Stack
- **satori**: Converts React/HTML to SVG
- **@resvg/resvg-js**: Converts SVG to PNG
- **@fontsource/inter**: Clean, readable font for social cards

### Design Specs
- **Dimensions**: 1200x630px (optimal for all platforms)
- **Background**: #090b0e (Hypermodern dark)
- **Typography**: Inter font family
- **Logo**: Large "WEYL" text in brand blue (#54aeff)
- **Layout**: Title + description + footer with status indicator

## Metadata Components

### BaseHead.astro
Central component for all page metadata:
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- Favicons and app icons
- Theme colors
- Font preloading
- View transitions support

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  image?: string;           // OG image path
  canonicalUrl?: string;    // Override canonical
  noindex?: boolean;        // Prevent indexing
  type?: 'website' | 'article';
  publishedTime?: string;   // For articles
  modifiedTime?: string;    // For articles
}
```

### Head.astro (Starlight Override)
Custom head component for Starlight documentation pages:
- Injects `/og-docs.png` for all docs
- Ensures consistent OG image across documentation
- Maintains Starlight's built-in SEO features

## Structured Data (JSON-LD)

### Organization Schema
Located in all pages via Landing layout:
```json
{
  "@type": "Organization",
  "name": "Weyl",
  "url": "https://weyl.ai",
  "logo": "https://weyl.ai/weyl-logo.svg",
  "sameAs": [
    "https://github.com/weyl-ai",
    "https://twitter.com/weyl_ai"
  ]
}
```

### Website Schema
Also in Landing layout:
```json
{
  "@type": "WebSite",
  "name": "Weyl",
  "url": "https://weyl.ai",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://weyl.ai/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### TechArticle Schema
For blog posts:
```json
{
  "@type": "TechArticle",
  "headline": "Post Title",
  "description": "Post description",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-02T00:00:00Z",
  "keywords": ["tag1", "tag2"]
}
```

## Font Loading Strategy

Optimized to prevent FOUT/FOIT on navigation:

### 1. Self-Hosted Fonts
- Iosevka WOFF2 files in `/public/fonts/`
- Eliminates external font service latency
- Instant first-paint

### 2. Font Preloading
```html
<link rel="preload" href="/fonts/iosevka-regular.woff2" as="font" type="font/woff2" crossorigin />
```

### 3. font-display: optional
- Text renders immediately with fallback
- Custom font only swaps if cached
- Zero layout shift

### 4. Optimized Fallback Stack
```css
font-family: 'Iosevka Web', 'Iosevka', ui-monospace, 'SF Mono', monospace;
```

## Security Headers

Configured in `vercel.json`:

### Font-Specific
```json
{
  "source": "/fonts/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
    { "key": "Access-Control-Allow-Origin", "value": "*" }
  ]
}
```

### CSP for Fonts
```
font-src 'self' https://fonts.gstatic.com data:;
```

## AI Crawl Optimization

### /llms.txt
Concise site summary for LLM ingestion:
- Project description
- Key features
- API endpoints
- Documentation structure

### /llms-full.txt
Complete documentation export:
- All doc content
- Blog posts
- API references

### /docs.json
Structured JSON index:
```json
[
  {
    "title": "Page Title",
    "description": "Description",
    "url": "https://weyl.ai/path",
    "lastModified": "2024-01-01"
  }
]
```

### /ai-sitemap.xml
AI-optimized XML sitemap with custom tags

## Performance Optimizations

### 1. Lazy Loading
```astro
<img src="/logo.svg" loading="lazy" alt="Logo" />
```

### 2. Resource Hints
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 3. Long-Term Caching
- Fonts: 1 year immutable
- OG images: 1 year immutable
- Static assets: Vercel defaults

### 4. View Transitions
```javascript
if (document.startViewTransition) {
  document.addEventListener('astro:before-swap', (e) => {
    e.viewTransition = document.startViewTransition();
  });
}
```

## Build Process

### 1. Generate OG Images
```bash
bun run generate:og
```

### 2. Type Check
```bash
astro check
```

### 3. Build Site
```bash
astro build
```

### Combined Command
```bash
bun run build
```

## Testing

### OG Image Preview
1. Use [OpenGraph.xyz](https://www.opengraph.xyz/)
2. Enter URL: `https://weyl.ai`
3. Verify image loads and displays correctly

### Twitter Card Validator
1. Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter URL
3. Verify card type: `summary_large_image`

### Facebook Debugger
1. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter URL
3. Click "Scrape Again" to refresh cache

### Lighthouse SEO Audit
```bash
npx lighthouse https://weyl.ai --only-categories=seo
```

Target scores:
- **SEO**: 100/100
- **Performance**: >95/100
- **Accessibility**: >95/100
- **Best Practices**: 100/100

## Maintenance

### Adding New Pages
1. Use `BaseHead` component with appropriate props
2. Set `image` prop to existing OG image or create new one
3. Add structured data via `JsonLd` component

### Updating OG Images
1. Edit `scripts/generate-og-images.ts`
2. Modify image config or design
3. Run `bun run generate:og`
4. Commit updated PNG files

### Monitoring
- Google Search Console: Track indexing and queries
- Vercel Analytics: Monitor Core Web Vitals
- Twitter Analytics: Track social engagement

## Checklist

✅ All pages have unique titles
✅ All pages have meta descriptions (< 160 chars)
✅ All pages have OG images (1200x630px)
✅ All pages have canonical URLs
✅ Structured data on all page types
✅ Fonts optimized with preload + optional
✅ Security headers configured
✅ AI crawl optimization (/llms.txt, etc.)
✅ Sitemap generated (sitemap-index.xml)
✅ RSS feed for blog (rss.xml)
✅ robots.txt configured
✅ Favicons for all platforms
✅ View transitions enabled
✅ Long-term caching for static assets

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Core Web Vitals](https://web.dev/vitals/)


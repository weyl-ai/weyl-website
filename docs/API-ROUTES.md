# API Routes Documentation

This document describes all API endpoints and special routes in the Weyl AI website.

## API Endpoints

### Request Access API `/api/request-access`
**File**: `src/pages/api/request-access.ts`
**Method**: POST
**Type**: Serverless function (Vercel)

Handles API access request form submissions.

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "company": "string (optional)",
  "useCase": "string"
}
```

**Response**:
```json
{
  "success": boolean,
  "message": "string"
}
```

**Integration Options**:

1. **Klaviyo** (Email marketing platform)
   - Adds contact to Klaviyo list
   - Triggers welcome email sequence
   - See: `docs/API_REQUEST_ACCESS_SETUP.md`

2. **Slack Connect** (Direct Slack channel)
   - Sends request to Slack channel
   - Creates direct contact opportunity
   - See: `docs/SLACK_CONNECT_SETUP.md`

**Error Handling**:
- 400: Invalid request body
- 500: Integration error (Klaviyo/Slack)
- Returns appropriate HTTP status codes

**Used By**:
- `/request-access` page form

---

### Dynamic OG Image Generation `/api/og/[...slug]`
**File**: `src/pages/api/og/[...slug].ts`
**Method**: GET
**Type**: Serverless function (Vercel)

Dynamically generates Open Graph images for blog posts and pages.

**URL Pattern**:
- `/api/og/blog/[slug]` - Blog post OG image
- `/api/og/docs/[slug]` - Documentation page OG image

**Output**:
- Image format: PNG
- Dimensions: 1200x630 (OpenGraph standard)
- Content-Type: image/png

**Generation Logic**:
1. Fetches page title and metadata
2. Applies brand styling (logo, colors, typography)
3. Renders to PNG using image generation library
4. Caches result for performance

**Usage**:
Referenced in page `<meta>` tags:
```html
<meta property="og:image" content="/api/og/blog/introducing-weyl-ai" />
```

**Performance**:
- Generated on-demand
- Cached by Vercel CDN
- First request slower (generation), subsequent requests fast

---

## SEO & Discovery Routes

### LLM Context `/llms.txt`
**File**: `src/pages/llms.txt.ts`
**Method**: GET
**Type**: Static generation (prerendered)

Lightweight, parseable site metadata for LLMs and AI tools.

**Output Format**: Plain text
**Content**:
- Site overview
- Key pages and their URLs
- Content structure
- Navigation hierarchy

**Purpose**:
- Help LLMs understand site structure
- Provide quick context for AI tools
- Lightweight alternative to full sitemap

**Used By**:
- LLM crawlers
- AI dev tools
- Content aggregators

---

### Full LLM Context `/llms-full.txt`
**File**: `src/pages/llms-full.txt.ts`
**Method**: GET
**Type**: Static generation (prerendered)

Comprehensive site documentation for LLM processing.

**Output Format**: Plain text
**Content**:
- All documentation pages
- API reference
- Code examples
- Complete content context

**Purpose**:
- Full context for LLM training/processing
- Comprehensive site knowledge
- AI-powered search and Q&A

**Size**: Larger file (10s-100s of KB)

---

### AI Sitemap `/ai-sitemap.xml`
**File**: `src/pages/ai-sitemap.xml.ts`
**Method**: GET
**Type**: Static generation (prerendered)

XML sitemap optimized for AI crawlers.

**Output Format**: XML
**Content**:
- All public pages
- Priority weighting for AI tools
- Content type annotations
- Last modified dates

**Purpose**:
- Guide AI crawlers to important content
- Prioritize documentation and API pages
- Complement standard XML sitemap

**Differences from standard sitemap**:
- Different priority weighting
- Additional metadata for AI tools
- May exclude marketing pages

---

### Documentation Index `/docs.json`
**File**: `src/pages/docs.json.ts`
**Method**: GET
**Type**: Static generation (prerendered)

Structured JSON index of all documentation.

**Output Format**: JSON
**Structure**:
```json
{
  "pages": [
    {
      "title": "string",
      "description": "string",
      "path": "string",
      "category": "string",
      "lastModified": "ISO 8601 date"
    }
  ],
  "categories": ["string"],
  "version": "string"
}
```

**Purpose**:
- Power documentation search
- Navigation menu generation
- Documentation analytics
- Third-party integrations

**Used By**:
- Search implementations
- Documentation portals
- API consumers

---

### OpenAPI Specification `/openapi.json`
**File**: `src/pages/openapi.json.ts`
**Method**: GET
**Type**: Static generation (prerendered)

OpenAPI 3.0 specification for Weyl AI API.

**Output Format**: JSON (OpenAPI 3.0)
**Source**: Generated from `docs/openapi.yaml`

**Content**:
- API endpoints and methods
- Request/response schemas
- Authentication requirements
- Error codes and responses
- Example requests

**Purpose**:
- API documentation
- Client SDK generation
- API testing tools
- Integration development

**Used By**:
- Swagger UI / ReDoc
- API clients (Postman, Insomnia)
- Code generators
- Third-party developers

**Related**:
- `docs/openapi.yaml` - Source specification
- `/.well-known/ai-plugin.json` - AI plugin metadata

---

### AI Plugin Metadata `/.well-known/ai-plugin.json`
**File**: `src/pages/.well-known/ai-plugin.json.ts`
**Method**: GET
**Type**: Static generation (prerendered)

AI plugin discovery metadata following OpenAI plugin standard.

**Output Format**: JSON
**Structure**:
```json
{
  "schema_version": "v1",
  "name_for_human": "Weyl AI",
  "name_for_model": "weyl_ai",
  "description_for_human": "string",
  "description_for_model": "string",
  "auth": {
    "type": "none | user_http | service_http | oauth"
  },
  "api": {
    "type": "openapi",
    "url": "https://weyl.ai/openapi.json"
  },
  "logo_url": "https://weyl.ai/brand/monotile.svg",
  "contact_email": "string",
  "legal_info_url": "string"
}
```

**Purpose**:
- Enable AI plugin discovery
- ChatGPT plugin integration
- LangChain tool integration
- AI assistant compatibility

**Standard**: OpenAI Plugin Specification
**Discovery**: Hosted at `/.well-known/ai-plugin.json` (standard location)

---

### RSS Feed `/blog/rss.xml`
**File**: `src/pages/blog/rss.xml.ts`
**Method**: GET
**Type**: Static generation (prerendered)

RSS 2.0 feed for blog posts.

**Output Format**: XML (RSS 2.0)
**Content**:
- All published blog posts
- Title, description, publication date
- Full content or excerpt
- Author information
- Categories/tags

**Purpose**:
- RSS reader subscriptions
- Content aggregation
- Automated content distribution

**Used By**:
- RSS readers (Feedly, Inoreader, etc.)
- Podcast apps
- News aggregators
- Email newsletters

---

## Auto-Generated Routes

### XML Sitemap `/sitemap-index.xml`
**Generated by**: `@astrojs/sitemap` plugin
**Method**: GET
**Type**: Auto-generated at build time

Standard XML sitemap for search engines.

**Content**:
- All public pages
- Change frequency hints
- Priority values
- Last modification dates

**Purpose**:
- Search engine discovery
- Crawl optimization
- Index management

**Submitted to**:
- Google Search Console
- Bing Webmaster Tools
- Other search engines

**Configuration**:
In `astro.config.mjs`:
```js
integrations: [
  sitemap({
    // Configuration options
  })
]
```

---

## Route Types

### Static (Prerendered)
- `/llms.txt`
- `/llms-full.txt`
- `/ai-sitemap.xml`
- `/docs.json`
- `/openapi.json`
- `/.well-known/ai-plugin.json`
- `/blog/rss.xml`

**Characteristics**:
- Generated at build time
- Served as static files
- Fast delivery via CDN
- No server computation

### Dynamic (Serverless Functions)
- `/api/request-access` (POST)
- `/api/og/[...slug]` (GET)

**Characteristics**:
- Execute on-demand
- Run on Vercel serverless functions
- Can access databases/APIs
- Generated per request (with caching for OG images)

---

## API Integration Guides

### Setting up Request Access API
See: `docs/API_REQUEST_ACCESS_SETUP.md`
- Klaviyo integration steps
- Environment variables
- Testing procedures

### Setting up Slack Connect
See: `docs/SLACK_CONNECT_SETUP.md`
- Slack app creation
- Webhook configuration
- Channel setup

---

## Testing

### Local Development
```bash
# Start dev server
bun dev

# Test API routes
curl -X POST http://localhost:4321/api/request-access \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","useCase":"Testing"}'

# View OG image
open http://localhost:4321/api/og/blog/introducing-weyl-ai

# Check SEO routes
curl http://localhost:4321/llms.txt
curl http://localhost:4321/docs.json
curl http://localhost:4321/.well-known/ai-plugin.json
```

### Production Testing
```bash
# Test API endpoint
curl -X POST https://weyl.ai/api/request-access \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","useCase":"Testing"}'

# Verify SEO routes
curl https://weyl.ai/llms.txt
curl https://weyl.ai/ai-sitemap.xml
curl https://weyl.ai/.well-known/ai-plugin.json
```

---

## Security Considerations

### CORS
API routes should implement appropriate CORS headers:
```typescript
return new Response(JSON.stringify(data), {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Or specific origin
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
});
```

### Rate Limiting
- Implement rate limiting for API routes
- Prevent abuse and spam
- Use Vercel Edge Config or external service

### Input Validation
- Validate all POST request bodies
- Sanitize user input
- Use Zod schemas for runtime validation

### API Keys
- Store sensitive keys in environment variables
- Never commit keys to version control
- Rotate keys periodically

---

## Monitoring

### Vercel Analytics
- API route performance
- Error rates
- Response times
- Geographic distribution

### Logging
- Vercel function logs
- Error tracking
- User activity monitoring

### Alerts
- Set up alerts for API failures
- Monitor rate limit hits
- Track form submission rates

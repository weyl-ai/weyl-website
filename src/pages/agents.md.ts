// src/pages/agents.md.ts
// Agent-specific instructions and capabilities
// For AI agents, MCP servers, and automated tools

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const content = `# Weyl AI - Agent Instructions

This document provides instructions for AI agents, MCP servers, and automated tools interacting with Weyl.

## Overview

Weyl is an inference infrastructure company providing:
- **Image Generation API**: FLUX.2, FLUX.1, Z-Image Turbo models
- **Video Generation API**: WAN 2.2 video synthesis
- **Developer Tools**: AI workflow integrations for Cursor, Claude, v0, Lovable, Bolt

## Agent Capabilities

### What Agents Can Do

1. **Generate Images**: Use the Weyl API to generate images from text prompts
2. **Generate Videos**: Create video content using WAN models
3. **Access Documentation**: Retrieve API documentation and guides
4. **Check Model Availability**: Query available models and their capabilities

### API Base URL

\`\`\`
https://api.weyl.ai/v1
\`\`\`

### Authentication

All API requests require a Bearer token:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

Request API access at: https://weyl.ai/request-access/

## Quick Start for Agents

### Generate an Image

\`\`\`bash
curl -X POST https://api.weyl.ai/v1/sync/image \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A serene mountain landscape at sunset",
    "model": "flux-schnell",
    "width": 1024,
    "height": 1024
  }'
\`\`\`

### Response Format

\`\`\`json
{
  "id": "img_abc123",
  "url": "https://cdn.weyl.ai/images/...",
  "model": "flux-schnell",
  "created": 1706000000
}
\`\`\`

## Available Models

| Model | Type | Speed | Quality | Use Case |
|-------|------|-------|---------|----------|
| flux-schnell | Image | Fast | Good | Prototyping, previews |
| flux-dev | Image | Medium | High | Production images |
| flux2-kontext | Image | Medium | Highest | Context-aware generation |
| zimage-turbo | Image | Fastest | Good | Real-time applications |
| wan-2.2 | Video | Slow | High | Video content |

## Rate Limits

| Tier | Requests/min | Concurrent |
|------|--------------|------------|
| Free | 10 | 2 |
| Pro | 100 | 10 |
| Enterprise | Custom | Custom |

## Error Handling

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Check request parameters |
| 401 | Unauthorized | Verify API key |
| 429 | Rate Limited | Implement backoff |
| 503 | Capacity Full | Retry with exponential backoff |

## MCP Server Integration

For Claude and other MCP-compatible agents, use the Weyl MCP server:

\`\`\`json
{
  "mcpServers": {
    "weyl": {
      "command": "npx",
      "args": ["-y", "@weyl/mcp-server"],
      "env": {
        "WEYL_API_KEY": "your-api-key"
      }
    }
  }
}
\`\`\`

### Available MCP Tools

- \`generate_image\`: Generate an image from a text prompt
- \`generate_video\`: Generate a video from a text prompt
- \`list_models\`: List available models and capabilities
- \`check_capacity\`: Check current API capacity

## Best Practices for Agents

### Prompt Engineering

1. **Be Specific**: Include style, mood, composition details
2. **Use Negative Prompts**: Exclude unwanted elements
3. **Specify Dimensions**: Request appropriate aspect ratios

### Performance

1. **Use Appropriate Models**: flux-schnell for speed, flux-dev for quality
2. **Batch Requests**: Group related generations
3. **Cache Results**: Store generated URLs for reuse

### Error Recovery

1. **Implement Retries**: Use exponential backoff for 503 errors
2. **Validate Inputs**: Check prompts and parameters before sending
3. **Handle Timeouts**: Set appropriate timeout values (30s recommended)

## Content Endpoints for Agents

| Endpoint | Format | Content |
|----------|--------|---------|
| \`/llms.txt\` | Plain text | Site overview and links |
| \`/llms-full.txt\` | Plain text | Complete documentation |
| \`/agents.md\` | Markdown | This file |
| \`/docs.json\` | JSON | Structured content index |
| \`/ai-sitemap.xml\` | XML | AI-enhanced sitemap |
| \`/openapi.json\` | JSON | OpenAPI specification |
| \`/{any-path}.md\` | Markdown | Any page as markdown |

## Structured Data

### Get All Documentation

\`\`\`bash
curl https://weyl.ai/docs.json
\`\`\`

### Get OpenAPI Spec

\`\`\`bash
curl https://weyl.ai/openapi.json
\`\`\`

## Webhook Support

For async operations, configure webhooks:

\`\`\`json
{
  "webhook_url": "https://your-server.com/webhook",
  "webhook_events": ["job.completed", "job.failed"]
}
\`\`\`

## Contact & Support

- **Documentation**: https://weyl.ai/api/
- **GitHub**: https://github.com/weyl-ai
- **Discord**: https://discord.gg/weyl
- **Email**: info@weyl.ai

## Version

- **API Version**: v1
- **Document Updated**: ${new Date().toISOString().split('T')[0]}

---

*This document is designed for AI agents. For human-readable documentation, visit https://weyl.ai/api/*
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

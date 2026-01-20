// src/pages/llms-full.txt.ts
// Full content version of llms.txt - includes actual page content
// Spec: https://llmstxt.org/

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  // Fetch all content collections
  const docs = await getCollection('docs');
  const blog = await getCollection('blog');
  const weylStd = await getCollection('weylStd');

  let content = `# Weyl - Complete Documentation

> Weyl is purpose-built inference infrastructure for generative media. Sub-100ms latency for diffusion models on NVIDIA Blackwell with FP4 precision.

Weyl AI is a Fleek research lab building next-generation AI infrastructure. We specialize in low-latency generative media APIs, Nix-based GPU compute infrastructure, and developer tooling for AI-native workflows.

---

## Table of Contents

1. [About Weyl](#about-weyl)
2. [API Documentation](#api-documentation)
3. [AI Workflows](#ai-workflows)
4. [Weyl Standard](#weyl-standard)
5. [Blog Posts](#blog-posts)
6. [Open Source](#open-source)
7. [Research Papers](#research-papers)

---

## About Weyl

Weyl provides:

- **Sub-100ms Latency**: Optimized CUDA kernels on NVIDIA Blackwell architecture
- **FP4 Quantization**: 4x throughput improvement with maintained quality
- **Dual Tiers**: Sync for real-time applications, Async for cost optimization
- **Advanced Models**: FLUX.2, FLUX.1, Z-Image Turbo, WAN 2.2 Video

### Key Capabilities

| Feature | Description |
|---------|-------------|
| Image Generation | FLUX.2 Kontext, FLUX.1 dev/schnell, Z-Image Turbo |
| Video Generation | WAN 2.2 video synthesis |
| Real-time API | WebSocket and REST endpoints |
| AI Workflow Integration | Cursor, Claude, v0, Lovable, Bolt.new |

---

## API Documentation

`;

  // Sort docs by category and slug
  const sortedDocs = docs
    .filter((doc: CollectionEntry<'docs'>) => !doc.data.draft)
    .sort((a: CollectionEntry<'docs'>, b: CollectionEntry<'docs'>) => a.slug.localeCompare(b.slug));

  // Group docs by top-level category
  const docsByCategory: Record<string, typeof sortedDocs> = {};
  for (const doc of sortedDocs) {
    const category = doc.slug.split('/')[0] || 'general';
    if (!docsByCategory[category]) {
      docsByCategory[category] = [];
    }
    docsByCategory[category].push(doc);
  }

  // Output docs by category
  for (const [category, categoryDocs] of Object.entries(docsByCategory)) {
    content += `### ${formatCategoryName(category)}\n\n`;
    
    for (const doc of categoryDocs) {
      content += `#### ${doc.data.title}\n\n`;
      content += `**URL**: https://weyl.ai/${doc.slug}/\n`;
      content += `**Description**: ${doc.data.description}\n\n`;
      
      // Include the raw body content (MDX stripped to essential text)
      const bodyText = stripMdxToText(doc.body);
      if (bodyText.length > 100) {
        content += `${bodyText}\n\n`;
      }
      content += `---\n\n`;
    }
  }

  content += `## AI Workflows

Weyl integrates natively with modern AI development tools. Each workflow enables direct image generation within your preferred development environment.

### Supported Platforms

| Platform | Integration Type | Use Case |
|----------|-----------------|----------|
| Cursor IDE | Rules + API | Vibe coding with AI images |
| Claude | MCP Server | Conversational image generation |
| v0.dev | API Integration | Component prototyping |
| Lovable | Full-stack | AI-native applications |
| Bolt.new | Rapid prototyping | Quick experiments |

`;

  content += `## Weyl Standard

The Weyl Standard is our engineering knowledge base covering Nix, programming languages, and infrastructure best practices.

`;

  // Add Weyl Standard content
  const sortedStd = weylStd
    .filter((doc: CollectionEntry<'weylStd'>) => !doc.data.draft)
    .sort((a: CollectionEntry<'weylStd'>, b: CollectionEntry<'weylStd'>) => a.slug.localeCompare(b.slug));

  for (const doc of sortedStd.slice(0, 20)) { // Limit to prevent huge file
    content += `### ${doc.data.title}\n\n`;
    content += `**URL**: https://weyl.ai/std/${doc.slug}/\n`;
    if (doc.data.description) {
      content += `**Description**: ${doc.data.description}\n\n`;
    }
    
    const bodyText = stripMdxToText(doc.body);
    if (bodyText.length > 100) {
      // Truncate very long content
      const truncated = bodyText.length > 2000 ? bodyText.slice(0, 2000) + '\n\n[Content truncated - see full page]' : bodyText;
      content += `${truncated}\n\n`;
    }
    content += `---\n\n`;
  }

  content += `## Blog Posts

Technical articles and announcements from the Weyl team.

`;

  // Add blog posts
  const sortedBlog = blog
    .filter((post: CollectionEntry<'blog'>) => !post.data.draft)
    .sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  for (const post of sortedBlog) {
    content += `### ${post.data.title}\n\n`;
    content += `**URL**: https://weyl.ai/plan/${post.slug}/\n`;
    content += `**Published**: ${post.data.pubDate.toISOString().split('T')[0]}\n`;
    content += `**Author**: ${post.data.author}\n`;
    if (post.data.tags?.length) {
      content += `**Tags**: ${post.data.tags.join(', ')}\n`;
    }
    content += `\n${post.data.description}\n\n`;
    
    const bodyText = stripMdxToText(post.body);
    if (bodyText.length > 100) {
      const truncated = bodyText.length > 3000 ? bodyText.slice(0, 3000) + '\n\n[Content truncated - see full article]' : bodyText;
      content += `${truncated}\n\n`;
    }
    content += `---\n\n`;
  }

  content += `## Open Source

Weyl maintains several open source projects for the community.

### nix2gpu

A Nix module system that generates containers for GPU markets like vast.ai and runpod.io. Provides reproducible environments with CUDA 12.8, Tailscale networking, and modern shell tooling.

- **Repository**: https://github.com/fleek-sh/nix2gpu
- **License**: MIT
- **Status**: Active

### nimi

A lightweight process manager designed as Tini-like PID 1 for containers and NixOS modular services. Reads JSON configuration, launches services with clean environments, streams logs to console.

- **Repository**: https://github.com/weyl-ai/nimi
- **License**: MIT
- **Status**: Experimental

### hacker-flake

A Nix flake providing development environments for C++ compilation and debugging with pwndbg and memory analysis capabilities.

- **Repository**: https://github.com/weyl-ai/hacker-flake
- **License**: MIT
- **Status**: Active

---

## Research Papers

Academic papers from the Weyl research team.

### Hallway Hypothesis
- **URL**: https://weyl.ai/papers/hallway-hypothesis.pdf
- **Topic**: Distributed systems and AI infrastructure

### Landauer Hypothesis
- **URL**: https://weyl.ai/papers/landauer-hypothesis.pdf
- **Topic**: Computational limits and information theory

### Lattice Hypothesis
- **URL**: https://weyl.ai/papers/lattice-hypothesis.pdf
- **Topic**: Mathematical foundations for AI systems

---

## API Endpoints for AI Agents

| Endpoint | Format | Purpose |
|----------|--------|---------|
| /llms.txt | Plain text | Quick overview for LLMs |
| /llms-full.txt | Plain text | Complete documentation |
| /agents.md | Markdown | Agent-specific instructions |
| /docs.json | JSON | Structured content index |
| /ai-sitemap.xml | XML | AI-enhanced sitemap |
| /openapi.json | JSON | OpenAPI specification |
| /{slug}.md | Markdown | Any page as markdown |

---

## Contact & Resources

- **Website**: https://weyl.ai
- **GitHub**: https://github.com/weyl-ai
- **Twitter**: https://twitter.com/weyl_ai
- **Discord**: https://discord.gg/weyl
- **Email**: info@weyl.ai

---

*Generated: ${new Date().toISOString()}*
*This file is auto-generated from the Weyl documentation.*
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
};

function formatCategoryName(category: string): string {
  const names: Record<string, string> = {
    'api': 'API Reference',
    'getting-started': 'Getting Started',
    'workflows': 'AI Workflows',
    'design': 'Design System',
    'general': 'General',
  };
  return names[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
}

function stripMdxToText(body: string): string {
  if (!body) return '';
  
  return body
    // Remove import statements
    .replace(/^import\s+.*$/gm, '')
    // Remove export statements
    .replace(/^export\s+.*$/gm, '')
    // Remove JSX components (simplified)
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, '')
    .replace(/<[A-Z][^>]*\/>/g, '')
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove frontmatter (if any remaining)
    .replace(/^---[\s\S]*?---/m, '')
    // Remove code block language specifiers but keep content
    .replace(/```\w+\n/g, '```\n')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// src/pages/context.md.ts
// Comprehensive context file for AI systems
// Provides full background on Weyl for RAG and context injection

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const content = `# Weyl AI - Complete Context

This document provides comprehensive context about Weyl for AI systems, RAG pipelines, and context injection.

## Company Overview

**Weyl AI** is a research lab within **Fleek**, focused on building next-generation AI infrastructure. Named after mathematician Hermann Weyl, we specialize in:

1. **Inference Infrastructure**: Purpose-built systems for generative media
2. **GPU Compute**: Nix-based containers for distributed GPU workloads
3. **Developer Tools**: AI-native workflow integrations

## Core Product: Inference API

Weyl provides a high-performance inference API for generative media:

### Technical Specifications

| Metric | Value |
|--------|-------|
| Latency | Sub-100ms p99 |
| Architecture | NVIDIA Blackwell |
| Precision | FP4 quantization |
| Throughput | 4x improvement over FP16 |

### Supported Models

**Image Generation**:
- FLUX.2 Kontext - Context-aware generation
- FLUX.1 dev - High quality production
- FLUX.1 schnell - Fast prototyping
- Z-Image Turbo - Real-time applications

**Video Generation**:
- WAN 2.2 - Video synthesis

### API Tiers

1. **Sync Tier**: Real-time generation with dedicated capacity
   - Endpoint: \`POST /v1/sync/image\`
   - Use case: Interactive applications, live previews

2. **Async Tier**: Queue-backed generation for cost optimization
   - Endpoint: \`POST /v1/async/queue\`
   - Use case: Batch processing, background jobs

### Authentication

All API requests require Bearer token authentication:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

Request access at: https://weyl.ai/request-access/

## AI Workflow Integrations

Weyl integrates with modern AI development tools:

### Cursor IDE
- Native rules integration
- Direct image generation in editor
- Vibe coding support

### Claude (Anthropic)
- MCP server integration
- Conversational image generation
- Project-level context

### v0.dev (Vercel)
- Component-level integration
- Design system support

### Lovable
- Full-stack application support
- AI-native development

### Bolt.new
- Rapid prototyping
- Quick experiments

## Open Source Projects

### nix2gpu
Nix module system for GPU market containers.

- **Repository**: https://github.com/fleek-sh/nix2gpu
- **Purpose**: Reproducible GPU environments for vast.ai, runpod.io
- **Features**: CUDA 12.8, Tailscale networking, modern shell tooling
- **License**: MIT

### nimi
Lightweight PID 1 process manager.

- **Repository**: https://github.com/weyl-ai/nimi
- **Purpose**: Container init system for NixOS services
- **Features**: JSON config, clean environments, restart policies
- **License**: MIT

### hacker-flake
Nix development environments for C++.

- **Repository**: https://github.com/weyl-ai/hacker-flake
- **Purpose**: Competitive programming and systems work
- **Features**: pwndbg integration, memory analysis
- **License**: MIT

## Weyl Standard

The Weyl Standard is our engineering knowledge base:

### Topics Covered
- **Nix**: Comprehensive guides, philosophy, RFC process
- **Languages**: TypeScript, Python, Rust, Haskell, Bash, C++
- **Infrastructure**: Container patterns, GPU compute
- **Best Practices**: Code style, documentation, testing

### URL Structure
- Overview: https://weyl.ai/std/
- Nix Guides: https://weyl.ai/std/nix/guides/
- Languages: https://weyl.ai/std/languages/

## Research

Weyl publishes research papers on AI infrastructure:

1. **Hallway Hypothesis** - Distributed systems architecture
2. **Landauer Hypothesis** - Information theory and computation
3. **Lattice Hypothesis** - Mathematical foundations

Papers available at: https://weyl.ai/papers/

## Technical Blog

The Weyl blog (\`.plan\`) covers technical topics:

- Infrastructure deep-dives
- Nix and NixOS tutorials
- GPU compute patterns
- AI workflow guides

Blog URL: https://weyl.ai/plan/

## Key URLs

| Resource | URL |
|----------|-----|
| Homepage | https://weyl.ai |
| API Docs | https://weyl.ai/api/ |
| Getting Started | https://weyl.ai/getting-started/ |
| Workflows | https://weyl.ai/workflows/ |
| Blog | https://weyl.ai/plan/ |
| Open Source | https://weyl.ai/open-source/ |
| Weyl Standard | https://weyl.ai/std/ |
| Request Access | https://weyl.ai/request-access/ |

## AI-Specific Endpoints

| Endpoint | Format | Purpose |
|----------|--------|---------|
| /llms.txt | Plain text | Quick overview |
| /llms-full.txt | Plain text | Complete documentation |
| /agents.md | Markdown | Agent instructions |
| /context.md | Markdown | This file - full context |
| /docs.json | JSON | Structured index |
| /ai-sitemap.xml | XML | AI-enhanced sitemap |
| /openapi.json | JSON | API specification |
| /{path}.md | Markdown | Any page as markdown |

## Contact Information

- **Website**: https://weyl.ai
- **GitHub**: https://github.com/weyl-ai
- **Twitter**: https://twitter.com/weyl_ai
- **Discord**: https://discord.gg/weyl
- **Email**: info@weyl.ai
- **Support**: info@weyl.ai

## Parent Company

Weyl AI is a research lab within **Fleek**:
- Website: https://fleek.xyz
- Focus: Decentralized infrastructure

## Frequently Asked Questions

### What is Weyl?
Weyl is inference infrastructure for generative media, providing sub-100ms latency for diffusion models.

### How do I get API access?
Request access at https://weyl.ai/request-access/

### What models are supported?
FLUX.2 Kontext, FLUX.1 (dev/schnell), Z-Image Turbo, WAN 2.2 video.

### Is there a free tier?
Contact us for pricing and free tier availability.

### Can I use Weyl with my AI coding tool?
Yes! We support Cursor, Claude, v0, Lovable, and Bolt.new.

### Is Weyl open source?
The API is proprietary, but we maintain several open source projects including nix2gpu, nimi, and hacker-flake.

---

*This context document is designed for AI systems. Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

// src/pages/llms.txt.ts
// Standard llms.txt file for LLM discovery
// Spec: https://llmstxt.org/

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const content = `# Weyl

> Weyl is purpose-built inference infrastructure for generative media. Sub-100ms latency for diffusion models on NVIDIA Blackwell with FP4 precision.

Weyl AI is a Fleek research lab building next-generation AI infrastructure. We specialize in low-latency generative media APIs, Nix-based GPU compute infrastructure, and developer tooling for AI-native workflows.

## What We Do

- **Inference API**: Real-time image and video generation with FLUX.2, FLUX.1, Z-Image Turbo, WAN Video
- **AI Workflows**: Native integration with Cursor, Claude, v0, Lovable, and Bolt.new
- **Open Source**: nix2gpu, nimi, hacker-flake - infrastructure for modern GPU compute
- **Research**: Papers on distributed systems and AI infrastructure

## Quick Links

- Homepage: https://weyl.ai
- API Documentation: https://weyl.ai/api/
- Request Access: https://weyl.ai/request-access/
- Blog: https://weyl.ai/plan/
- Open Source: https://weyl.ai/open-source/
- Weyl Standard: https://weyl.ai/std/

## For AI Agents

- Full Content: https://weyl.ai/llms-full.txt
- Agent Instructions: https://weyl.ai/agents.md
- Structured Index: https://weyl.ai/docs.json
- AI Sitemap: https://weyl.ai/ai-sitemap.xml
- OpenAPI Spec: https://weyl.ai/openapi.json

## Documentation

### Getting Started
- [Introduction](https://weyl.ai/getting-started/): Get started with Weyl inference infrastructure
- [Quick Start](https://weyl.ai/getting-started/quick-start/): Get up and running in 5 minutes
- [Authentication](https://weyl.ai/getting-started/auth/): Set up your API keys

### AI Workflows
- [Overview](https://weyl.ai/workflows/): Generate images in Cursor, Claude, v0, Lovable, and Bolt
- [Cursor IDE](https://weyl.ai/workflows/cursor/): AI image generation for vibe coding
- [Claude Projects](https://weyl.ai/workflows/claude/): MCP integration for image generation
- [v0.dev](https://weyl.ai/workflows/v0/): AI image generation in v0 components
- [Lovable](https://weyl.ai/workflows/lovable/): Full-stack apps with AI images
- [Bolt.new](https://weyl.ai/workflows/bolt/): Rapid prototyping with AI images

### API Reference
- [API Overview](https://weyl.ai/api/): Generative media at the speed of thought
- [Core Concepts](https://weyl.ai/api/concepts/): Model families, backends, and formats
- [Sync Tier](https://weyl.ai/api/sync/): Real-time generation with dedicated capacity
- [Async Tier](https://weyl.ai/api/async/): Queue-backed generation for cost optimization
- [Models](https://weyl.ai/api/models/): FLUX, Z-Image, WAN and capabilities
- [WebSocket](https://weyl.ai/api/websocket/): Real-time bidirectional communication

### Weyl Standard
- [Overview](https://weyl.ai/std/): Engineering standards and best practices
- [Nix Guides](https://weyl.ai/std/nix/guides/): Comprehensive Nix tutorials
- [Languages](https://weyl.ai/std/languages/): TypeScript, Python, Rust, Haskell, Bash, C++

### Open Source Projects
- [nix2gpu](https://github.com/fleek-sh/nix2gpu): Nix containers for GPU markets (vast.ai, runpod)
- [nimi](https://github.com/weyl-ai/nimi): Lightweight PID 1 process manager for containers
- [hacker-flake](https://github.com/weyl-ai/hacker-flake): Nix development environments for C++

### Research Papers
- [Hallway Hypothesis](https://weyl.ai/papers/hallway-hypothesis.pdf)
- [Landauer Hypothesis](https://weyl.ai/papers/landauer-hypothesis.pdf)
- [Lattice Hypothesis](https://weyl.ai/papers/lattice-hypothesis.pdf)

## Optional

For expanded content including full page text, see: https://weyl.ai/llms-full.txt

## Contact

- GitHub: https://github.com/weyl-ai
- Twitter: https://twitter.com/weyl_ai
- Discord: https://discord.gg/weyl
- Email: info@weyl.ai
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

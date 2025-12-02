import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://weyl.ai';

  // Build structured sections based on sidebar organization
  const sections = {
    'Getting Started': [
      { slug: 'getting-started', title: 'Introduction', desc: 'Get started with Weyl inference infrastructure' },
      { slug: 'getting-started/quick-start', title: 'Quick Start', desc: 'Get up and running in 5 minutes' },
      { slug: 'getting-started/auth', title: 'Authentication', desc: 'Set up your API keys' },
    ],
    'AI Workflows': [
      { slug: 'workflows', title: 'AI Workflows Overview', desc: 'Generate images in Cursor, Claude, v0, Lovable, and Bolt' },
      { slug: 'workflows/cursor', title: 'Cursor IDE', desc: 'AI image generation in Cursor IDE for vibe coding' },
      { slug: 'workflows/claude', title: 'Claude Projects', desc: 'Claude Projects and MCP integration for image generation' },
      { slug: 'workflows/v0', title: 'v0.dev', desc: 'Add AI image generation to v0.dev components' },
      { slug: 'workflows/lovable', title: 'Lovable', desc: 'Full-stack apps with AI image generation on Lovable.dev' },
      { slug: 'workflows/bolt', title: 'Bolt.new', desc: 'Rapid prototyping with AI images in Bolt.new' },
    ],
    'API Overview': [
      { slug: 'api', title: 'API Overview', desc: 'Generative media at the speed of thought' },
      { slug: 'api/concepts', title: 'Core Concepts', desc: 'Understanding model families, backends, and formats' },
      { slug: 'api/authentication', title: 'API Authentication', desc: 'Authentication methods and best practices' },
    ],
    'Sync Tier': [
      { slug: 'api/sync', title: 'Sync Overview', desc: 'Real-time generation with dedicated capacity' },
      { slug: 'api/sync/video', title: 'Video Generation', desc: 'Sync video generation endpoints' },
      { slug: 'api/sync/image', title: 'Image Generation', desc: 'Sync image generation endpoints' },
      { slug: 'api/sync/capacity', title: 'Capacity Management', desc: 'Check capacity and handle 503 responses' },
    ],
    'Async Tier': [
      { slug: 'api/async', title: 'Async Overview', desc: 'Queue-backed generation for cost optimization' },
      { slug: 'api/async/queue', title: 'Queue Submission', desc: 'Submit jobs to the async queue' },
      { slug: 'api/async/jobs', title: 'Job Management', desc: 'Poll, cancel, and manage async jobs' },
      { slug: 'api/async/sse', title: 'Server-Sent Events', desc: 'Real-time job updates via SSE' },
    ],
    'Models': [
      { slug: 'api/models', title: 'Models Overview', desc: 'Available models and capabilities' },
      { slug: 'api/models/flux', title: 'FLUX Models', desc: 'Black Forest Labs FLUX.1 and FLUX.2' },
      { slug: 'api/models/zimage', title: 'Z-Image Turbo', desc: 'Alibaba Tongyi Z-Image models' },
      { slug: 'api/models/wan', title: 'WAN Video', desc: 'WAN 2.2 video generation' },
      { slug: 'api/models/formats', title: 'Format Reference', desc: 'Available dimensions and aspect ratios' },
      { slug: 'api/models/backends', title: 'Backend Comparison', desc: 'nunchaku, torch, and tensorrt backends' },
    ],
    'Advanced': [
      { slug: 'api/advanced/samplers', title: 'Samplers', desc: 'Sampling methods and configuration' },
      { slug: 'api/advanced/schedulers', title: 'Schedulers', desc: 'Noise scheduling strategies' },
      { slug: 'api/advanced/guidance', title: 'Guidance Tuning', desc: 'CFG and guidance scale optimization' },
      { slug: 'api/advanced/loras', title: 'LoRA Adapters', desc: 'Using LoRA for style and concept injection' },
      { slug: 'api/advanced/detail', title: 'Detail Enhancement', desc: 'Techniques for improving output quality' },
    ],
    'WebSocket': [
      { slug: 'api/websocket', title: 'WebSocket Overview', desc: 'Real-time bidirectional communication' },
      { slug: 'api/websocket/sync', title: 'Sync WebSocket', desc: 'Streaming sync tier generation' },
      { slug: 'api/websocket/async', title: 'Async WebSocket', desc: 'Job updates via WebSocket' },
      { slug: 'api/websocket/protocol', title: 'Protocol Reference', desc: 'WebSocket message format and events' },
    ],
    'Reference': [
      { slug: 'api/reference/requests', title: 'Request Schemas', desc: 'Complete request body schemas' },
      { slug: 'api/reference/responses', title: 'Response Schemas', desc: 'Response formats and CDN headers' },
      { slug: 'api/reference/types', title: 'Type Reference', desc: 'TypeScript type definitions' },
      { slug: 'api/reference/errors', title: 'Error Reference', desc: 'Error codes and troubleshooting' },
    ],
    'Infrastructure': [
      { slug: 'api/infrastructure/uploads', title: 'Image Uploads', desc: 'Upload large images for stable URLs' },
      { slug: 'api/infrastructure/discovery', title: 'Model Discovery', desc: 'List available models dynamically' },
      { slug: 'api/infrastructure/aliases', title: 'Model Aliases', desc: 'HuggingFace model ID resolution' },
    ],
  };

  // Optional sections (can be skipped for shorter context)
  const optionalSections = {
    'Optional': [
      { slug: 'api/models/backends', title: 'Backend Comparison', desc: 'Deep dive into nunchaku, torch, and tensorrt' },
      { slug: 'api/reference/errors', title: 'Error Reference', desc: 'Complete error codes and troubleshooting guide' },
      { slug: 'api/advanced/detail', title: 'Detail Enhancement', desc: 'Advanced techniques for quality optimization' },
    ],
  };

  // Build the llms-full.txt content
  let content = `# Weyl

> Weyl is purpose-built inference infrastructure for generative media. We provide sub-100ms latency for diffusion models running on Blackwell architecture with FP4 precision.

Key capabilities:
- **Low Latency**: Sub-100ms p99 latency with optimized CUDA kernels
- **Cost Optimized**: FP4 quantization delivers 4x throughput improvement
- **Dual Tiers**: Sync for real-time, Async for cost optimization
- **Advanced Models**: FLUX.2, FLUX.1, Z-Image Turbo, WAN Video

`;

  // Add main sections
  for (const [sectionTitle, items] of Object.entries(sections)) {
    content += `## ${sectionTitle}\n\n`;
    for (const item of items) {
      const url = `${baseUrl}/${item.slug}/`;
      content += `- [${item.title}](${url}): ${item.desc}\n`;
    }
    content += '\n';
  }

  // Add optional sections
  for (const [sectionTitle, items] of Object.entries(optionalSections)) {
    content += `## ${sectionTitle}\n\n`;
    for (const item of items) {
      const url = `${baseUrl}/${item.slug}/`;
      content += `- [${item.title}](${url}): ${item.desc}\n`;
    }
    content += '\n';
  }

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};




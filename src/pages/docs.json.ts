// src/pages/docs.json.ts
// Structured documentation index for AI crawlers and tools
// Enhanced with comprehensive metadata for LLM consumption

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const blog = await getCollection('blog');
  const weylStd = await getCollection('weylStd');
  
  // Build comprehensive docs index
  const docsIndex = docs.map((doc: CollectionEntry<'docs'>) => ({
    slug: doc.slug,
    title: doc.data.title,
    description: doc.data.description,
    url: `https://weyl.ai/${doc.slug}/`,
    markdown_url: `https://weyl.ai/${doc.slug}.md`,
    type: 'documentation',
    category: doc.data.category || 'general',
    api_version: doc.data.apiVersion,
    deprecated: doc.data.deprecated || false,
  }));
  
  // Build blog index with full metadata
  const blogIndex = blog
    .filter((post: CollectionEntry<'blog'>) => !post.data.draft)
    .map((post: CollectionEntry<'blog'>) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      url: `https://weyl.ai/plan/${post.slug}/`,
      markdown_url: `https://weyl.ai/plan/${post.slug}.md`,
      type: 'article',
      published: post.data.pubDate.toISOString(),
      updated: post.data.updatedDate?.toISOString(),
      author: post.data.author,
      tags: post.data.tags || [],
      canonical_url: post.data.canonicalUrl,
    }));

  // Build weylStd index
  const stdIndex = weylStd
    .filter((doc: CollectionEntry<'weylStd'>) => !doc.data.draft)
    .map((doc: CollectionEntry<'weylStd'>) => ({
      slug: doc.slug,
      title: doc.data.title,
      description: doc.data.description,
      url: `https://weyl.ai/std/${doc.slug}/`,
      markdown_url: `https://weyl.ai/std/${doc.slug}.md`,
      type: 'standard',
      category: doc.data.category || 'general',
      order: doc.data.order,
    }));

  // Open source projects
  const openSource = [
    {
      name: 'nix2gpu',
      description: 'Nix module system for GPU market containers (vast.ai, runpod)',
      url: 'https://weyl.ai/open-source/',
      repository: 'https://github.com/fleek-sh/nix2gpu',
      license: 'MIT',
      status: 'active',
      topics: ['nix', 'gpu', 'containers', 'cuda'],
    },
    {
      name: 'nimi',
      description: 'Lightweight PID 1 process manager for containers',
      url: 'https://weyl.ai/open-source/',
      repository: 'https://github.com/weyl-ai/nimi',
      license: 'MIT',
      status: 'experimental',
      topics: ['rust', 'nix', 'containers', 'init'],
    },
    {
      name: 'hacker-flake',
      description: 'Nix development environments for C++ and debugging',
      url: 'https://weyl.ai/open-source/',
      repository: 'https://github.com/weyl-ai/hacker-flake',
      license: 'MIT',
      status: 'active',
      topics: ['nix', 'cpp', 'debugging', 'pwndbg'],
    },
  ];

  // Research papers
  const papers = [
    {
      title: 'Hallway Hypothesis',
      url: 'https://weyl.ai/papers/hallway-hypothesis.pdf',
      type: 'pdf',
      topics: ['distributed-systems', 'ai-infrastructure'],
    },
    {
      title: 'Landauer Hypothesis',
      url: 'https://weyl.ai/papers/landauer-hypothesis.pdf',
      type: 'pdf',
      topics: ['information-theory', 'computation'],
    },
    {
      title: 'Lattice Hypothesis',
      url: 'https://weyl.ai/papers/lattice-hypothesis.pdf',
      type: 'pdf',
      topics: ['mathematics', 'ai-systems'],
    },
  ];
  
  const index = {
    // Site metadata
    site: {
      name: 'Weyl',
      tagline: 'Inference Infrastructure for Generative Media',
      url: 'https://weyl.ai',
      description: 'Sub-100ms latency for diffusion models on NVIDIA Blackwell with FP4 precision',
      company: 'Weyl AI Labs',
      parent: 'Fleek',
      version: '1.0.0',
      updated: new Date().toISOString(),
    },

    // AI/LLM specific endpoints
    ai_endpoints: {
      llms_txt: 'https://weyl.ai/llms.txt',
      llms_full: 'https://weyl.ai/llms-full.txt',
      agents_md: 'https://weyl.ai/agents.md',
      docs_json: 'https://weyl.ai/docs.json',
      ai_sitemap: 'https://weyl.ai/ai-sitemap.xml',
      openapi: 'https://weyl.ai/openapi.json',
      ai_plugin: 'https://weyl.ai/.well-known/ai-plugin.json',
    },

    // Standard endpoints
    endpoints: {
      sitemap: 'https://weyl.ai/sitemap.xml',
      robots: 'https://weyl.ai/robots.txt',
      humans: 'https://weyl.ai/humans.txt',
      security: 'https://weyl.ai/.well-known/security.txt',
    },

    // API information
    api: {
      base_url: 'https://api.weyl.ai/v1',
      documentation: 'https://weyl.ai/api/',
      openapi_spec: 'https://weyl.ai/openapi.json',
      authentication: 'Bearer token',
      request_access: 'https://weyl.ai/request-access/',
    },

    // Content collections
    documentation: docsIndex,
    blog: blogIndex,
    weyl_standard: stdIndex,
    open_source: openSource,
    papers: papers,

    // Key pages
    pages: {
      home: 'https://weyl.ai/',
      api_docs: 'https://weyl.ai/api/',
      getting_started: 'https://weyl.ai/getting-started/',
      workflows: 'https://weyl.ai/workflows/',
      blog: 'https://weyl.ai/plan/',
      open_source: 'https://weyl.ai/open-source/',
      weyl_standard: 'https://weyl.ai/std/',
      request_access: 'https://weyl.ai/request-access/',
      brand: 'https://weyl.ai/brand/',
    },

    // Social and contact
    social: {
      github: 'https://github.com/weyl-ai',
      twitter: 'https://twitter.com/weyl_ai',
      discord: 'https://discord.gg/weyl',
      youtube: 'https://youtube.com/@weyl-ai',
      email: 'info@weyl.ai',
    },

    // Capabilities summary for AI agents
    capabilities: {
      image_generation: {
        models: ['flux-schnell', 'flux-dev', 'flux2-kontext', 'zimage-turbo'],
        formats: ['png', 'jpeg', 'webp'],
        max_resolution: '2048x2048',
      },
      video_generation: {
        models: ['wan-2.2'],
        formats: ['mp4'],
      },
      integrations: ['cursor', 'claude', 'v0', 'lovable', 'bolt'],
    },
  };
  
  return new Response(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

// src/pages/ai-sitemap.xml.ts
// AI-optimized sitemap with enhanced metadata for LLMs and agents

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const blog = await getCollection('blog');
  const weylStd = await getCollection('weylStd');
  
  // Documentation URLs
  const docsUrls = docs.map((doc: CollectionEntry<'docs'>) => {
    const lastmod = new Date().toISOString();
    return `
  <url>
    <loc>https://weyl.ai/${doc.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <ai:metadata>
      <ai:title>${escapeXml(doc.data.title)}</ai:title>
      <ai:description>${escapeXml(doc.data.description)}</ai:description>
      <ai:type>documentation</ai:type>
      <ai:category>${doc.data.category || 'general'}</ai:category>
      <ai:markdown_url>https://weyl.ai/${doc.slug}.md</ai:markdown_url>
    </ai:metadata>
  </url>`;
  }).join('');
  
  // Blog URLs
  const blogUrls = blog
    .filter((post: CollectionEntry<'blog'>) => !post.data.draft)
    .map((post: CollectionEntry<'blog'>) => {
      const lastmod = post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString();
      return `
  <url>
    <loc>https://weyl.ai/plan/${post.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <ai:metadata>
      <ai:title>${escapeXml(post.data.title)}</ai:title>
      <ai:description>${escapeXml(post.data.description)}</ai:description>
      <ai:type>article</ai:type>
      <ai:published>${post.data.pubDate.toISOString()}</ai:published>
      <ai:author>${escapeXml(post.data.author)}</ai:author>
      ${post.data.tags?.map((tag: string) => `<ai:tag>${escapeXml(tag)}</ai:tag>`).join('') || ''}
      <ai:markdown_url>https://weyl.ai/plan/${post.slug}.md</ai:markdown_url>
    </ai:metadata>
  </url>`;
    }).join('');

  // Weyl Standard URLs
  const stdUrls = weylStd
    .filter((doc: CollectionEntry<'weylStd'>) => !doc.data.draft)
    .map((doc: CollectionEntry<'weylStd'>) => {
      const lastmod = new Date().toISOString();
      return `
  <url>
    <loc>https://weyl.ai/std/${doc.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <ai:metadata>
      <ai:title>${escapeXml(doc.data.title)}</ai:title>
      <ai:description>${escapeXml(doc.data.description || '')}</ai:description>
      <ai:type>standard</ai:type>
      <ai:category>${doc.data.category || 'general'}</ai:category>
      <ai:markdown_url>https://weyl.ai/std/${doc.slug}.md</ai:markdown_url>
    </ai:metadata>
  </url>`;
    }).join('');

  // Static pages
  const staticPages = `
  <url>
    <loc>https://weyl.ai/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <ai:metadata>
      <ai:title>Weyl - Inference Infrastructure</ai:title>
      <ai:description>Sub-100ms latency for generative media on NVIDIA Blackwell</ai:description>
      <ai:type>homepage</ai:type>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/open-source/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <ai:metadata>
      <ai:title>Open Source Projects</ai:title>
      <ai:description>Weyl open source projects: nix2gpu, nimi, hacker-flake</ai:description>
      <ai:type>page</ai:type>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/request-access/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <ai:metadata>
      <ai:title>Request API Access</ai:title>
      <ai:description>Request access to the Weyl inference API</ai:description>
      <ai:type>form</ai:type>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/brand/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
    <ai:metadata>
      <ai:title>Brand Kit</ai:title>
      <ai:description>Weyl brand assets and guidelines</ai:description>
      <ai:type>page</ai:type>
    </ai:metadata>
  </url>`;

  // AI-specific endpoints
  const aiEndpoints = `
  <url>
    <loc>https://weyl.ai/llms.txt</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <ai:metadata>
      <ai:title>LLMs.txt</ai:title>
      <ai:description>Quick overview for LLMs following llmstxt.org spec</ai:description>
      <ai:type>llm-resource</ai:type>
      <ai:format>text/plain</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/llms-full.txt</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <ai:metadata>
      <ai:title>LLMs Full</ai:title>
      <ai:description>Complete documentation for LLMs</ai:description>
      <ai:type>llm-resource</ai:type>
      <ai:format>text/plain</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/agents.md</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <ai:metadata>
      <ai:title>Agent Instructions</ai:title>
      <ai:description>Instructions for AI agents interacting with Weyl</ai:description>
      <ai:type>agent-resource</ai:type>
      <ai:format>text/markdown</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/context.md</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <ai:metadata>
      <ai:title>Full Context</ai:title>
      <ai:description>Comprehensive context about Weyl for AI systems</ai:description>
      <ai:type>context-resource</ai:type>
      <ai:format>text/markdown</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/docs.json</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <ai:metadata>
      <ai:title>Documentation Index</ai:title>
      <ai:description>Structured JSON index of all documentation</ai:description>
      <ai:type>index</ai:type>
      <ai:format>application/json</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/openapi.json</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <ai:metadata>
      <ai:title>OpenAPI Specification</ai:title>
      <ai:description>OpenAPI 3.0 specification for the Weyl API</ai:description>
      <ai:type>api-spec</ai:type>
      <ai:format>application/json</ai:format>
    </ai:metadata>
  </url>`;

  // Research papers
  const paperUrls = `
  <url>
    <loc>https://weyl.ai/papers/hallway-hypothesis.pdf</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <ai:metadata>
      <ai:title>Hallway Hypothesis</ai:title>
      <ai:description>Research paper on distributed systems</ai:description>
      <ai:type>paper</ai:type>
      <ai:format>application/pdf</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/papers/landauer-hypothesis.pdf</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <ai:metadata>
      <ai:title>Landauer Hypothesis</ai:title>
      <ai:description>Research paper on information theory</ai:description>
      <ai:type>paper</ai:type>
      <ai:format>application/pdf</ai:format>
    </ai:metadata>
  </url>
  <url>
    <loc>https://weyl.ai/papers/lattice-hypothesis.pdf</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <ai:metadata>
      <ai:title>Lattice Hypothesis</ai:title>
      <ai:description>Research paper on mathematical foundations</ai:description>
      <ai:type>paper</ai:type>
      <ai:format>application/pdf</ai:format>
    </ai:metadata>
  </url>`;
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:ai="https://weyl.ai/schemas/ai-sitemap/1.0">
  <!-- AI-Optimized Sitemap for Weyl -->
  <!-- This sitemap includes enhanced metadata for AI crawlers and agents -->
  <!-- Spec: Custom extension of sitemap.org with ai: namespace -->
  
  <!-- Static Pages -->
  ${staticPages}
  
  <!-- AI/LLM Specific Endpoints -->
  ${aiEndpoints}
  
  <!-- Documentation -->
  ${docsUrls}
  
  <!-- Blog Posts -->
  ${blogUrls}
  
  <!-- Weyl Standard -->
  ${stdUrls}
  
  <!-- Research Papers -->
  ${paperUrls}
</urlset>`;
  
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// src/pages/ai-sitemap.xml.ts
// AI-optimized sitemap with enhanced metadata

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const blog = await getCollection('blog');
  
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
    </ai:metadata>
  </url>`;
  }).join('');
  
  const blogUrls = blog.map((post: CollectionEntry<'blog'>) => {
    const lastmod = post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString();
    return `
  <url>
    <loc>https://weyl.ai/blog/${post.slug}/</loc>
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
    </ai:metadata>
  </url>`;
  }).join('');
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:ai="https://weyl.ai/schemas/ai-sitemap/1.0">
  <url>
    <loc>https://weyl.ai/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <ai:metadata>
      <ai:title>Weyl - Inference Infrastructure</ai:title>
      <ai:description>Sub-100ms latency for generative media</ai:description>
      <ai:type>homepage</ai:type>
    </ai:metadata>
  </url>${docsUrls}${blogUrls}
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
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}


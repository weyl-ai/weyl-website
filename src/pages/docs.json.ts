// src/pages/docs.json.ts
// Structured documentation index for AI crawlers and tools

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const blog = await getCollection('blog');
  
  const docsIndex = docs.map((doc: CollectionEntry<'docs'>) => ({
    slug: doc.slug,
    title: doc.data.title,
    description: doc.data.description,
    url: `https://weyl.ai/${doc.slug}/`,
    type: 'documentation',
    category: doc.data.category || 'general',
  }));
  
  const blogIndex = blog.map((post: CollectionEntry<'blog'>) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    url: `https://weyl.ai/blog/${post.slug}/`,
    type: 'article',
    published: post.data.pubDate.toISOString(),
    author: post.data.author,
    tags: post.data.tags || [],
  }));
  
  const index = {
    site: {
      name: 'Weyl',
      url: 'https://weyl.ai',
      description: 'Inference infrastructure for generative media',
      version: '1.0.0',
      updated: new Date().toISOString(),
    },
    documentation: docsIndex,
    blog: blogIndex,
    endpoints: {
      llms_txt: 'https://weyl.ai/llms.txt',
      llms_full: 'https://weyl.ai/llms-full.txt',
      sitemap: 'https://weyl.ai/sitemap-index.xml',
      rss: 'https://weyl.ai/blog/rss.xml',
      openapi: 'https://weyl.ai/openapi.json',
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


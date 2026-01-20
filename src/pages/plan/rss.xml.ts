// src/pages/plan/rss.xml.ts
// Full-content RSS feed for .plan

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const blog = await getCollection('blog');

  // Sort by date, newest first
  const sortedBlog = blog.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  // Build RSS manually since @astrojs/rss is not installed
  const items = sortedBlog.map((post: CollectionEntry<'blog'>) => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description)}</description>
      <link>https://weyl.ai/plan/${post.slug}/</link>
      <guid>https://weyl.ai/plan/${post.slug}/</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <author>${escapeXml(post.data.author)}</author>
      ${post.data.tags?.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join('\n      ') || ''}
    </item>`).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Weyl .plan</title>
    <description>Updates, insights, and technical articles from the Weyl team</description>
    <link>https://weyl.ai/plan</link>
    <atom:link href="https://weyl.ai/plan/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <copyright>Copyright 2024 Weyl AI Labs</copyright>
    <managingEditor>info@weyl.ai (Weyl Team)</managingEditor>
    <webMaster>info@weyl.ai (Weyl Team)</webMaster>
    <generator>Astro RSS</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>`;
  
  return new Response(rssXml, {
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

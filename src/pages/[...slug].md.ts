import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    return new Response('Not Found', { status: 404 });
  }

  // Get all docs
  const docs = await getCollection('docs');
  
  // Find the matching doc
  const doc = docs.find((d: CollectionEntry<'docs'>) => d.slug === slug);
  
  if (!doc) {
    return new Response('Not Found', { status: 404 });
  }

  // Strip frontmatter and return clean markdown
  const { body } = doc;
  
  // Add document header for context
  const title = doc.data.title || 'Untitled';
  const description = doc.data.description || '';
  
  let content = `# ${title}\n\n`;
  if (description) {
    content += `> ${description}\n\n`;
  }
  content += body;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex', // Don't index .md versions
    },
  });
};

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');
  
  // Generate paths that match doc URLs with .md appended
  return docs.map((doc: CollectionEntry<'docs'>) => {
    // Handle index files: getting-started/index becomes getting-started
    const slug = doc.slug.endsWith('/index') 
      ? doc.slug.slice(0, -6) || 'index'
      : doc.slug;
    
    return {
      params: { slug },
    };
  });
}) satisfies GetStaticPaths;



// src/lib/utils/generate-toc.ts
// Table of contents generator from markdown headings

export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

export function generateToc(content: string, maxDepth: number = 3): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    if (!match[1] || !match[2]) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    
    // Skip if deeper than maxDepth
    if (depth > maxDepth) continue;
    
    // Generate slug from heading text
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    toc.push({ depth, text, slug });
  }
  
  return toc;
}

export function generateTocFromHeadings(headings: Array<{ depth: number; text: string; slug: string }>): TocItem[] {
  return headings.filter((h) => h.depth <= 3);
}


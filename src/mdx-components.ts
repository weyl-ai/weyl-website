/**
 * MDX Components Configuration
 *
 * Makes custom components available in all MDX files (blog posts, etc.)
 * without needing to import them explicitly.
 */

import Callout from './components/content/Callout.astro';
import Figure from './components/content/Figure.astro';
import CodeBlock from './components/content/CodeBlock.astro';

export const components = {
  // Make custom components available in MDX
  Callout,
  Figure,
  CodeBlock,
};

// Export type for TypeScript support
export type MDXComponents = typeof components;

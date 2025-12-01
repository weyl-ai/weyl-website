// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Weyl Team'),
    tags: z.array(z.string()).default([]),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    draft: z.boolean().default(false),
    canonicalUrl: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  schema: docsSchema({
    extend: z.object({
      apiVersion: z.string().optional(),
      deprecated: z.boolean().default(false),
      category: z.enum(['core', 'api', 'guide', 'reference']).optional(),
    }),
  }),
});

export const collections = { blog, docs };


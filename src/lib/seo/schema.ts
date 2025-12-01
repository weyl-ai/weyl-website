// src/lib/seo/schema.ts
// JSON-LD schema builders for structured data

import type { 
  WithContext, 
  Organization, 
  WebSite, 
  Article,
  BreadcrumbList,
} from 'schema-dts';

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Weyl AI Labs',
  url: 'https://weyl.ai',
  logo: 'https://weyl.ai/logo.svg',
  description: 'Inference infrastructure for generative media',
  sameAs: [
    'https://twitter.com/weyl_ai',
    'https://github.com/weyl-ai',
  ],
};

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Weyl',
  url: 'https://weyl.ai',
  description: 'The render layer for generative media',
  publisher: {
    '@type': 'Organization',
    name: 'Weyl AI Labs',
  },
};

export function articleSchema(props: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string | undefined;
  author: string;
  url: string;
  image?: string | undefined;
}): WithContext<Article> {
  const schema: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    datePublished: props.datePublished,
    dateModified: props.dateModified ?? props.datePublished,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Weyl AI Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://weyl.ai/logo.svg',
      },
    },
    mainEntityOfPage: props.url,
  };
  
  if (props.image) {
    schema.image = props.image;
  }
  
  return schema;
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}


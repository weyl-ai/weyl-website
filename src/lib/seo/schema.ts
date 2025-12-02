// src/lib/seo/schema.ts
// JSON-LD schema builders for structured data

import type { 
  WithContext, 
  Organization, 
  WebSite, 
  Article,
  BreadcrumbList,
  TechArticle,
  SoftwareApplication,
  ItemList,
  Dataset,
} from 'schema-dts';

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Weyl AI Labs',
  url: 'https://weyl.ai',
  logo: 'https://weyl.ai/weyl-logo.svg',
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
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://weyl.ai/search?q={search_term_string}',
    },
  } as any,
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
        url: 'https://weyl.ai/weyl-logo.svg',
      },
    },
    mainEntityOfPage: props.url,
  };
  
  if (props.image) {
    schema.image = props.image;
  }
  
  return schema;
}

export function techArticleSchema(props: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string | undefined;
  author: string;
  url: string;
  image?: string | undefined;
  keywords?: string[];
}): WithContext<TechArticle> {
  const schema: WithContext<TechArticle> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
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
        url: 'https://weyl.ai/weyl-logo.svg',
      },
    },
    mainEntityOfPage: props.url,
    proficiencyLevel: 'Expert',
  };
  
  if (props.image) {
    schema.image = props.image;
  }
  
  if (props.keywords && props.keywords.length > 0) {
    schema.keywords = props.keywords.join(', ');
  }
  
  return schema;
}

export function softwareApplicationSchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Weyl API',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Inference API for generative media with sub-100ms latency',
    url: 'https://weyl.ai',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  };
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

export function itemListSchema(props: {
  name: string;
  description: string;
  items: Array<{ name: string; url: string; description?: string }>;
}): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: props.name,
    description: props.description,
    itemListElement: props.items.map((item, index) => {
      const listItem: any = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      };
      if (item.description) {
        listItem.description = item.description;
      }
      return listItem;
    }),
  };
}

export function datasetSchema(props: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  creator?: string;
  datePublished?: string;
  dateModified?: string;
}): WithContext<Dataset> {
  const schema: WithContext<Dataset> = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: props.name,
    description: props.description,
    url: props.url,
    license: 'https://weyl.ai/terms',
    creator: {
      '@type': 'Organization',
      name: props.creator ?? 'Weyl AI Labs',
      url: 'https://weyl.ai',
    },
  };
  
  if (props.keywords && props.keywords.length > 0) {
    schema.keywords = props.keywords;
  }
  
  if (props.datePublished) {
    schema.datePublished = props.datePublished;
  }
  
  if (props.dateModified) {
    schema.dateModified = props.dateModified;
  }
  
  return schema;
}


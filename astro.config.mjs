import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://weyl-website.vercel.app',
  output: 'server',
  trailingSlash: 'ignore',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    starlight({
      title: 'Weyl',
      logo: {
        src: './src/assets/monotile.svg',
        replacesTitle: true,
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      customCss: [
        './src/styles/tokens.css',
        './src/styles/global.css',
        './src/styles/typography.css',
        './src/styles/starlight.css',
      ],
      social: {
        github: 'https://github.com/weyl-ai',
        twitter: 'https://twitter.com/weyl_ai',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/getting-started/' },
            { label: 'Quick Start', link: '/getting-started/quick-start/' },
            { label: 'Authentication', link: '/getting-started/auth/' },
          ],
        },
        {
          label: 'API Overview',
          items: [
            { label: 'Overview', link: '/api/' },
            { label: 'Core Concepts', link: '/api/concepts/' },
            { label: 'Authentication', link: '/api/authentication/' },
          ],
        },
        {
          label: 'Sync Tier',
          items: [
            { label: 'Overview', link: '/api/sync/' },
            { label: 'Video Generation', link: '/api/sync/video/' },
            { label: 'Image Generation', link: '/api/sync/image/' },
            { label: 'Capacity Management', link: '/api/sync/capacity/' },
          ],
        },
        {
          label: 'Async Tier',
          items: [
            { label: 'Overview', link: '/api/async/' },
            { label: 'Queue Submission', link: '/api/async/queue/' },
            { label: 'Job Management', link: '/api/async/jobs/' },
            { label: 'Server-Sent Events', link: '/api/async/sse/' },
          ],
        },
        {
          label: 'Models',
          items: [
            { label: 'Overview', link: '/api/models/' },
            { label: 'FLUX Models', link: '/api/models/flux/' },
            { label: 'Z-Image Turbo', link: '/api/models/zimage/' },
            { label: 'WAN Video', link: '/api/models/wan/' },
            { label: 'Format Reference', link: '/api/models/formats/' },
            { label: 'Backend Comparison', link: '/api/models/backends/' },
          ],
        },
        {
          label: 'Advanced',
          items: [
            { label: 'Samplers', link: '/api/advanced/samplers/' },
            { label: 'Schedulers', link: '/api/advanced/schedulers/' },
            { label: 'Guidance Tuning', link: '/api/advanced/guidance/' },
            { label: 'LoRA Adapters', link: '/api/advanced/loras/' },
            { label: 'Detail Enhancement', link: '/api/advanced/detail/' },
          ],
        },
        {
          label: 'WebSocket',
          items: [
            { label: 'Overview', link: '/api/websocket/' },
            { label: 'Sync Tier', link: '/api/websocket/sync/' },
            { label: 'Async Tier', link: '/api/websocket/async/' },
            { label: 'Protocol Reference', link: '/api/websocket/protocol/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Request Schemas', link: '/api/reference/requests/' },
            { label: 'Response Schemas', link: '/api/reference/responses/' },
            { label: 'Error Reference', link: '/api/reference/errors/' },
            { label: 'Type Reference', link: '/api/reference/types/' },
          ],
        },
        {
          label: 'Infrastructure',
          items: [
            { label: 'Image Uploads', link: '/api/infrastructure/uploads/' },
            { label: 'Model Discovery', link: '/api/infrastructure/discovery/' },
            { label: 'Model Aliases', link: '/api/infrastructure/aliases/' },
          ],
        },
        {
          label: 'AI Workflows',
          items: [
            { label: 'Overview', link: '/workflows/' },
            { label: 'Cursor IDE', link: '/workflows/cursor/' },
            { label: 'Claude Projects', link: '/workflows/claude/' },
            { label: 'v0.dev', link: '/workflows/v0/' },
            { label: 'Lovable', link: '/workflows/lovable/' },
            { label: 'Bolt.new', link: '/workflows/bolt/' },
          ],
        },
      ],
      components: {
        // Custom Banner component to show llms.txt links at the top of doc pages
        Banner: './src/components/overrides/Banner.astro',
        ThemeSelect: './src/components/overrides/ThemeSelect.astro',
        SocialIcons: './src/components/overrides/SocialIcons.astro',
        Head: './src/components/overrides/Head.astro',
      },
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '4px',
          codeFontFamily: 'var(--font-mono)',
        },
      },
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#090b0e' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
      ],
    }),
    sitemap(),
    mdx(),
    tailwind({ applyBaseStyles: false }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@lib': '/src/lib',
      },
    },
  },
});


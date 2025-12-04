// Script to generate static OG images at build time
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface OGImageConfig {
  title: string;
  description: string;
  filename: string;
}

const images: OGImageConfig[] = [
  {
    title: 'Weyl',
    description: 'The render layer for generative media. Inference infrastructure for diffusion models with sub-100ms latency.',
    filename: 'og-default.png',
  },
  {
    title: 'Documentation',
    description: 'API documentation and guides for building with Weyl',
    filename: 'og-docs.png',
  },
  {
    title: 'Blog',
    description: 'Updates, insights, and announcements from the Weyl team',
    filename: 'og-blog.png',
  },
  {
    title: 'AI Workflows',
    description: 'Generate images and video in Cursor, Claude, v0, Lovable, and Bolt - vibe coding with AI',
    filename: 'og-workflows.png',
  },
  {
    title: 'Cursor AI Images',
    description: 'Generate images directly in Cursor IDE with Weyl API - perfect for vibe coding workflows',
    filename: 'og-workflows-cursor.png',
  },
  {
    title: 'Claude AI Images',
    description: 'Claude Projects and MCP integration for AI image generation - seamless workflow integration',
    filename: 'og-workflows-claude.png',
  },
  {
    title: 'v0 AI Images',
    description: 'Add dynamic AI image generation to v0.dev components - build visual UIs with AI',
    filename: 'og-workflows-v0.png',
  },
  {
    title: 'Lovable AI Images',
    description: 'Full-stack apps with AI image generation on Lovable.dev - rapid prototyping with visuals',
    filename: 'og-workflows-lovable.png',
  },
  {
    title: 'Bolt AI Images',
    description: 'Rapid prototyping with AI images in Bolt.new - instant demos with generated content',
    filename: 'og-workflows-bolt.png',
  },
  {
    title: 'Request API Access',
    description: 'Get access to sub-100ms generative media inference. Join our Slack to connect with the team.',
    filename: 'og-request-access.png',
  },
  {
    title: 'Posters',
    description: 'Hypermodern generative AI art. Downloadable posters for your space.',
    filename: 'og-posters.png',
  },
  {
    title: 'Getting Started',
    description: 'Quick start guide for the Weyl API. From zero to generating images in minutes.',
    filename: 'og-getting-started.png',
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation. Sync, async, WebSocket, models, and more.',
    filename: 'og-api.png',
  },
];

async function generateOGImage(config: OGImageConfig) {
  // Load Inter font (supports TTF which Satori needs)
  const fontRegular = readFileSync('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
  const fontBold = readFileSync('node_modules/@fontsource/inter/files/inter-latin-700-normal.woff');

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#090b0e',
          padding: '80px',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
              },
              children: [
                // Logo SVG - Embedded directly
                {
                  type: 'svg',
                  props: {
                    width: '470',
                    height: '118',
                    viewBox: '0 0 235 59',
                    fill: 'none',
                    children: [
                      {
                        type: 'path',
                        props: {
                          d: 'M15.6051 15.6325V33.6836L0 42.7091L9.00972 58.3416H45.0486L54.0583 42.7091L69.6634 51.7346L85.2685 42.7091L76.2588 27.0766H58.2394V9.02553L42.6343 0L33.6245 15.6325H15.6051Z',
                          fill: '#54AEFF',
                        },
                      },
                      {
                        type: 'path',
                        props: {
                          d: 'M106.285 54.9773L100.316 3.36475H107.058L109.726 41.0033L112.956 17.8303H118.855L122.085 41.0033L124.753 3.36475H131.495L125.526 54.9773H119.627L115.905 28.3635L112.184 54.9773H106.285Z',
                          fill: 'white',
                        },
                      },
                      {
                        type: 'path',
                        props: {
                          d: 'M138.236 54.9773V3.36475H164.358V9.54421H145.258V25.0631H160.355V31.2425H145.258V48.7978H164.358V54.9773H138.236Z',
                          fill: 'white',
                        },
                      },
                      {
                        type: 'path',
                        props: {
                          d: 'M182.616 54.9773V33.7705L171.17 3.36475H178.683L186.127 24.8524L193.57 3.36475H201.084L189.638 33.7705V54.9773H182.616Z',
                          fill: 'white',
                        },
                      },
                      {
                        type: 'path',
                        props: {
                          d: 'M210.002 54.9773V3.36475H217.024V48.7978H235.001V54.9773H210.002Z',
                          fill: 'white',
                        },
                      },
                    ],
                  },
                },
                // Title (if not default)
                config.title !== 'Weyl' ? {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 700,
                      color: '#54aeff',
                      letterSpacing: '0.02em',
                      lineHeight: 1.2,
                      marginTop: '20px',
                      fontFamily: 'Inter',
                    },
                    children: config.title,
                  },
                } : null,
                // Description
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '32px',
                      fontWeight: 400,
                      color: '#c9d1d9',
                      lineHeight: 1.5,
                      maxWidth: '900px',
                      fontFamily: 'Inter',
                    },
                    children: config.description,
                  },
                },
              ].filter(Boolean),
            },
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '28px',
                color: '#8b949e',
                fontFamily: 'Inter',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { color: '#3fb950' },
                    children: '█',
                  },
                },
                {
                  type: 'span',
                  props: {
                    children: 'weyl.ai',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}

async function main() {
  // Ensure public directory exists
  mkdirSync('public', { recursive: true });

  for (const config of images) {
    console.log(`Generating ${config.filename}...`);
    const png = await generateOGImage(config);
    writeFileSync(join('public', config.filename), png);
    console.log(`✅ Generated ${config.filename}`);
  }
}

main().catch(console.error);


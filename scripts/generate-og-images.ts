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
                // Logo
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '120px',
                      fontWeight: 700,
                      color: '#54aeff',
                      letterSpacing: '0.08em',
                      fontFamily: 'Inter',
                    },
                    children: 'WEYL',
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


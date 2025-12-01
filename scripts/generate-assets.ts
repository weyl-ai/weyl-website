// scripts/generate-assets.ts
// Run with: bun run scripts/generate-assets.ts

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';
import { ImageResponse } from '@vercel/og';

const publicDir = join(process.cwd(), 'public');

// Generate default OG image
async function generateOGImage() {
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
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '96px',
                      fontWeight: 600,
                      color: '#54aeff',
                      letterSpacing: '0.1em',
                      fontFamily: 'monospace',
                    },
                    children: 'WEYL',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '36px',
                      color: '#c9d1d9',
                      lineHeight: 1.5,
                      fontFamily: 'monospace',
                    },
                    children: 'The render layer for generative media',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '32px',
                color: '#8b949e',
                fontFamily: 'monospace',
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
                    children: 'OPERATIONAL | 47ms p99 | 1,071 TFLOPS',
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
    }
  );

  writeFileSync(join(publicDir, 'og', 'default.svg'), svg);
  console.log('✓ Generated public/og/default.svg');
}

// For PNG generation, we'd use a library like sharp
// For now, create placeholder files that users can replace
async function generateFavicons() {
  // Create placeholder text files that instruct users
  const favicon32Note = `# Favicon 32x32

This should be a 32x32 PNG version of the Weyl logo.

To generate:
1. Open public/weyl-logo.svg in an image editor
2. Export as 32x32 PNG with transparent background
3. Save as public/favicon-32.png

Or use an online tool like https://realfavicongenerator.net/
`;

  const appleTouchNote = `# Apple Touch Icon

This should be a 180x180 PNG version of the Weyl logo.

To generate:
1. Open public/weyl-logo.svg in an image editor
2. Export as 180x180 PNG
3. Add padding/background if desired
4. Save as public/apple-touch-icon.png

Or use an online tool like https://realfavicongenerator.net/
`;

  writeFileSync(join(publicDir, 'favicon-32.README.txt'), favicon32Note);
  writeFileSync(join(publicDir, 'apple-touch-icon.README.txt'), appleTouchNote);
  
  console.log('✓ Created instructions for favicon assets');
  console.log('  → public/favicon-32.README.txt');
  console.log('  → public/apple-touch-icon.README.txt');
}

// Main
async function main() {
  console.log('Generating assets...\n');
  
  await generateOGImage();
  await generateFavicons();
  
  console.log('\nDone! ✨');
  console.log('\nNext steps:');
  console.log('1. Convert public/og/default.svg to PNG using your preferred tool');
  console.log('2. Generate favicon-32.png and apple-touch-icon.png (see README files)');
}

main().catch(console.error);


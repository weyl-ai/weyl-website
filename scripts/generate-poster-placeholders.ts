// scripts/generate-poster-placeholders.ts
// Generates SVG placeholder images for propaganda posters

import { posters } from '../src/lib/posters/data';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const outputDir = join(import.meta.dir, '../public/images/posters');

// Ensure directory exists
mkdirSync(outputDir, { recursive: true });

function generateHypermodernSVG(title: string, description: string): string {
  // Hypermodern: Dark background, cyan accents, tech aesthetic
  const lines = wrapText(title, 20);
  const titleY = 400;
  const lineHeight = 60;
  
  return `<svg width="800" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hyperBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#090b0e"/>
      <stop offset="100%" style="stop-color:#13161a"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="1200" fill="url(#hyperBg)"/>
  
  <!-- Grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#21262d" stroke-width="0.5"/>
  </pattern>
  <rect width="800" height="1200" fill="url(#grid)" opacity="0.5"/>
  
  <!-- Corner brackets -->
  <path d="M 40 40 L 40 80 M 40 40 L 80 40" stroke="#54aeff" stroke-width="2" fill="none"/>
  <path d="M 760 40 L 760 80 M 760 40 L 720 40" stroke="#54aeff" stroke-width="2" fill="none"/>
  <path d="M 40 1160 L 40 1120 M 40 1160 L 80 1160" stroke="#54aeff" stroke-width="2" fill="none"/>
  <path d="M 760 1160 L 760 1120 M 760 1160 L 720 1160" stroke="#54aeff" stroke-width="2" fill="none"/>
  
  <!-- Logo placeholder -->
  <text x="400" y="120" font-family="monospace" font-size="14" fill="#54aeff" text-anchor="middle" letter-spacing="4">WEYL_AI_R&amp;D // HYPERMODERN</text>
  
  <!-- Title -->
  ${lines.map((line, i) => 
    `<text x="400" y="${titleY + i * lineHeight}" font-family="monospace" font-size="48" font-weight="bold" fill="#e6f7ff" text-anchor="middle" filter="url(#glow)">${escapeXml(line)}</text>`
  ).join('\n  ')}
  
  <!-- Description -->
  <text x="400" y="${titleY + lines.length * lineHeight + 80}" font-family="monospace" font-size="20" fill="#c9d1d9" text-anchor="middle" opacity="0.8">"${escapeXml(truncate(description, 60))}"</text>
  
  <!-- Decorative line -->
  <line x1="200" y1="1000" x2="600" y2="1000" stroke="#54aeff" stroke-width="1" opacity="0.6"/>
  
  <!-- Metrics -->
  <text x="400" y="1080" font-family="monospace" font-size="14" fill="#8b949e" text-anchor="middle">TENSOR_UTIL: 94.7% | MEM_BW: 2.1TB/s</text>
</svg>`;
}

function generateInstitutionalSVG(title: string, description: string): string {
  // Institutional: Light background, formal aesthetic, serif-like appearance
  const lines = wrapText(title, 24);
  const titleY = 400;
  const lineHeight = 55;
  
  return `<svg width="800" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="instBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f4f1eb"/>
      <stop offset="100%" style="stop-color:#e8e4d9"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="1200" fill="url(#instBg)"/>
  
  <!-- Formal border -->
  <rect x="30" y="30" width="740" height="1140" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <rect x="40" y="40" width="720" height="1120" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  
  <!-- Header decoration -->
  <line x1="100" y1="100" x2="700" y2="100" stroke="#1a5276" stroke-width="2"/>
  <circle cx="100" cy="100" r="4" fill="#1a5276"/>
  <circle cx="700" cy="100" r="4" fill="#1a5276"/>
  
  <!-- Department header -->
  <text x="400" y="150" font-family="Georgia, serif" font-size="16" fill="#8b7355" text-anchor="middle" letter-spacing="6">BUREAU OF COMPUTATIONAL STANDARDS</text>
  
  <!-- Title -->
  ${lines.map((line, i) => 
    `<text x="400" y="${titleY + i * lineHeight}" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="#1a1a1a" text-anchor="middle">${escapeXml(line)}</text>`
  ).join('\n  ')}
  
  <!-- Decorative divider -->
  <line x1="250" y1="${titleY + lines.length * lineHeight + 40}" x2="550" y2="${titleY + lines.length * lineHeight + 40}" stroke="#1a5276" stroke-width="1"/>
  
  <!-- Description -->
  <text x="400" y="${titleY + lines.length * lineHeight + 100}" font-family="Georgia, serif" font-size="18" fill="#484f58" text-anchor="middle" font-style="italic">"${escapeXml(truncate(description, 55))}"</text>
  
  <!-- Footer decoration -->
  <line x1="100" y1="1100" x2="700" y2="1100" stroke="#1a5276" stroke-width="2"/>
  
  <!-- Official notice -->
  <text x="400" y="1060" font-family="Georgia, serif" font-size="12" fill="#8b7355" text-anchor="middle">OFFICIAL DIRECTIVE — FOR AUTHORIZED DISTRIBUTION</text>
</svg>`;
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  
  return lines;
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate all posters
console.log('Generating poster placeholders...');

for (const poster of posters) {
  const svg = poster.mode === 'hypermodern' 
    ? generateHypermodernSVG(poster.title, poster.description)
    : generateInstitutionalSVG(poster.title, poster.description);
  
  const filename = `${poster.id}.svg`;
  const filepath = join(outputDir, filename);
  
  writeFileSync(filepath, svg);
  console.log(`  Created: ${filename}`);
}

console.log(`\nGenerated ${posters.length} poster placeholders in ${outputDir}`);


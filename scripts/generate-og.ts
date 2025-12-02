// Generate static OG image from dynamic API
import { writeFileSync } from 'fs';

async function generateOGImage() {
  const response = await fetch('http://localhost:4321/api/og/default');
  
  if (!response.ok) {
    throw new Error(`Failed to generate OG image: ${response.statusText}`);
  }
  
  const buffer = await response.arrayBuffer();
  writeFileSync('public/og-default.png', Buffer.from(buffer));
  console.log('✅ Generated public/og-default.png');
}

generateOGImage().catch(console.error);


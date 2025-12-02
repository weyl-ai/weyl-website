# Asset Generation Instructions

This project requires several image assets that need to be generated from the existing SVG files.

## Required Assets

### 1. Favicon PNG (32x32)
**File:** `public/favicon-32.png`
**Source:** `public/weyl-logo.svg` or `public/favicon.svg`
**Specs:** 32x32 PNG, transparent background

### 2. Apple Touch Icon (180x180)
**File:** `public/apple-touch-icon.png`
**Source:** `public/weyl-logo.svg`
**Specs:** 180x180 PNG, can have background color

### 3. Default OG Image (1200x630)
**File:** `public/og/default.png`
**Source:** `public/og/default.svg` (provided)
**Specs:** 1200x630 PNG

## Generation Options

### Option 1: Online Tools
- Use [RealFaviconGenerator](https://realfavicongenerator.net/)
- Upload `public/weyl-logo.svg`
- Download all generated assets
- Place in `public/` directory

### Option 2: ImageMagick (Command Line)
```bash
# Favicon 32x32
convert public/weyl-logo.svg -resize 32x32 -background none public/favicon-32.png

# Apple Touch Icon 180x180
convert public/weyl-logo.svg -resize 180x180 public/apple-touch-icon.png

# OG Image 1200x630
convert public/og/default.svg -resize 1200x630 public/og/default.png
```

### Option 3: Figma/Sketch/Illustrator
1. Open SVG in design tool
2. Export at required dimensions
3. Save to public/ directory

## Notes

- The site will work without these PNG files (falls back to SVG favicon)
- For production, PNG favicons provide better browser compatibility
- OG images improve social media previews

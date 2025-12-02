#!/bin/bash
# Build Iosevka Weyl AI custom font
# 
# Prerequisites:
#   - Node.js >= 18
#   - npm
#   - ttfautohint (optional, for hinting)
#
# Usage: ./scripts/build-fonts.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_DIR/.font-build"
FONTS_DIR="$PROJECT_DIR/public/fonts"

echo "// WEYL AI // Building Iosevka Weyl AI font //"
echo ""

# Create build directory
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# Clone Iosevka if not present
if [ ! -d "Iosevka" ]; then
    echo "Cloning Iosevka repository..."
    git clone --depth 1 https://github.com/be5invis/Iosevka.git
fi

cd Iosevka

# Copy build plan
echo "Copying build configuration..."
cp "$PROJECT_DIR/fonts/private-build-plans.toml" ./private-build-plans.toml

# Install dependencies
echo "Installing dependencies..."
npm install

# Build webfonts (WOFF2 format)
echo "Building webfonts..."
npm run build -- webfont::IosevkaWeylAi

# Copy generated fonts to public directory
echo "Copying fonts to public/fonts..."
mkdir -p "$FONTS_DIR"

# Find and copy WOFF2 files
find dist/IosevkaWeylAi -name "*.woff2" | while read font; do
    filename=$(basename "$font")
    # Normalize filename to lowercase with hyphens
    normalized=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    cp "$font" "$FONTS_DIR/$normalized"
    echo "  Copied: $normalized"
done

echo ""
echo "// BUILD COMPLETE //"
echo "Fonts installed to: $FONTS_DIR"
echo ""
echo "Available weights: Regular (400), Bold (700), ExtraBold (800), Heavy (900)"
echo "Available styles: Normal, Italic"
echo ""


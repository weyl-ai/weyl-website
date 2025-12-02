# Iosevka Weyl AI - Custom Font Build

Custom Iosevka font build for Weyl AI brand identity.

## Features

- **Spacing**: Terminal (fixed-width, optimized for code)
- **Serifs**: Sans-serif
- **Style Set**: SS01 (Andale Mono inspired - clean, readable)
- **Ligatures**: Discretionary ligatures for code (`dlig`)

### Weights
| Weight | Value | Use Case |
|--------|-------|----------|
| Regular | 400 | Body text |
| Bold | 700 | Emphasis, headings |
| ExtraBold | 800 | Strong emphasis |
| Heavy | 900 | Display, hero text |

### Widths
- Condensed, Semi-Condensed, Normal, Semi-Extended, Extended, Extra-Extended, Ultra-Extended

### Slopes
- Upright (normal)
- Italic (9.4° angle)

## Building the Font

### Prerequisites

- Node.js >= 18
- npm
- Git
- ~2GB disk space for build

### Quick Build

```bash
# From project root
bun run build:fonts

# Or directly
./scripts/build-fonts.sh
```

### Manual Build

```bash
# 1. Clone Iosevka
git clone --depth 1 https://github.com/be5invis/Iosevka.git
cd Iosevka

# 2. Copy build plan
cp ../fonts/private-build-plans.toml ./private-build-plans.toml

# 3. Install dependencies
npm install

# 4. Build webfonts (WOFF2)
npm run build -- webfont::IosevkaWeylAi

# 5. Copy to public/fonts
cp dist/IosevkaWeylAi/WOFF2/*.woff2 ../public/fonts/
```

## Output Files

After building, these files will be in `public/fonts/`:

```
iosevkaweylai-regular.woff2
iosevkaweylai-italic.woff2
iosevkaweylai-bold.woff2
iosevkaweylai-bolditalic.woff2
iosevkaweylai-extrabold.woff2
iosevkaweylai-heavy.woff2
```

## Fallback Strategy

The site uses a progressive font loading strategy:

1. **Primary**: `Iosevka Weyl AI` (custom build)
2. **Fallback**: `Iosevka Web` (standard Iosevka)
3. **System**: `ui-monospace`, `SF Mono`, `Consolas`, etc.

If the custom font hasn't been built yet, the site will gracefully fall back to standard Iosevka, then system monospace fonts.

## CSS Usage

The font is configured in `src/styles/fonts.css` and referenced via CSS custom property:

```css
--font-mono: 'Iosevka Weyl AI', 'Iosevka Web', 'Iosevka', ui-monospace, ...;
```

## Customization

Edit `private-build-plans.toml` to customize:

- Character variants (zero style, asterisk, at sign, etc.)
- Ligature sets
- Weight range
- Width variants

See [Iosevka Customizer](https://typeof.net/Iosevka/customizer) for visual configuration.

---

*// weyl-brand // typography is trust //*


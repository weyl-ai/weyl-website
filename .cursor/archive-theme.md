---
alwaysApply: true
---

# Archive Page - High Modernism Theme Implementation

## Overview

The `/archive/` page uses the **High Modernism (Light)** theme, representing institutional authority and bureaucratic formality. This is a deliberate contrast to the default Hypermodern (Dark) theme used throughout the rest of the site.

## Theme Characteristics

### Visual Identity
- **Background**: Warm beige (`#f4f1eb`) reminiscent of aged paper
- **Surface**: Pure white (`#ffffff`) for document cards
- **Typography**: Sans-serif (Helvetica Neue/Univers/Arial) for body, serif (Georgia/Charter) for titles
- **Borders**: Black (`#1a1a1a`), no border radius (sharp corners only)
- **No Effects**: Zero border radius, no glows, no gradients

### Philosophy
> "The institution earned trust by delivering. The stamp meant something."

High Modernism communicates:
- **Authority**: Through formal typography and rigid structure
- **Permanence**: Through serif titles and document numbering
- **Hierarchy**: Through weight and spacing (not color)
- **Formality**: Through institutional language and classification systems

## Color Palette

### Base Colors
```css
--color-bg-primary: #f4f1eb;        /* Warm beige, aged paper */
--color-bg-surface: #ffffff;        /* Pure white for cards */
--color-bg-elevated: #e8e4d9;       /* Slightly darker beige */
--color-bg-hover: #ddd9ce;          /* Hover state */

--color-text-primary: #1a1a1a;      /* Near black */
--color-text-secondary: #484f58;    /* Dark gray */
--color-text-muted: #8b7355;        /* Brown-gray */
--color-text-subtle: #c9b896;       /* Light brown */

--color-border-default: #1a1a1a;    /* Black borders */
--color-border-hover: #1a5276;      /* Dark blue on hover */
```

### Brand Colors (Light Theme)
```css
--color-brand-primary: #1a5276;     /* Dark blue (not cyan) */
--color-brand-hover: #143d5a;       /* Darker blue */
```

### Departmental Colors
These represent different institutional departments:

```css
--color-executive: #1a1a1a;         /* Authority, directive */
--color-administration: #1a5276;    /* Department headers (blue) */
--color-operations: #2d5a27;        /* Procedure, verified (green) */
--color-priority: #c41e3a;          /* Urgent, critical (red) */
--color-heritage: #8b7355;          /* Archive, historical (brown) */
--color-gilt: #d4a017;              /* Ceremony, achievement (gold) */
```

## Typography

### Font Stack
```css
/* Body text */
--font-mono: 'Helvetica Neue', 'Univers', 'Arial', 'Liberation Sans', system-ui, sans-serif;

/* Display/Headers (when sans-serif) */
--font-display: 'Futura', 'Century Gothic', sans-serif;

/* Document titles (serif) */
--font-serif: 'Georgia', 'Charter', 'Cambria', serif;
```

### Weight Hierarchy
Weight indicates **institutional rank**:
- **900 (Black)**: Executive directives, top-level headers
- **700 (Bold)**: Department heads, section titles
- **600 (Semi-bold)**: Subsection headers
- **400 (Regular)**: Body text, standard content
- **300 (Light)**: Captions, metadata

## Document Structure

### Metadata Format
```
DOCUMENT TYPE № YEAR-NUMBER
DATE: YYYY-MM-DD
CLASSIFICATION: PUBLIC/RESTRICTED/CONFIDENTIAL
DEPARTMENT: FULL DEPARTMENT NAME
```

### Document Types
- **TECHNICAL MEMORANDUM**: Research findings, technical specifications
- **RESEARCH BULLETIN**: Survey papers, state-of-the-field reviews
- **POLICY DIRECTIVE**: Mandatory protocols, operational requirements
- **EXECUTIVE ORDER**: High-level directives, strategic decisions
- **FIELD REPORT**: Operational data, deployment metrics

## Implementation Details

### Enabling Light Theme
Add `data-theme="light"` to the `<html>` tag:

```html
<html lang="en" data-theme="light">
```

### Logo Switching
The navigation automatically switches between:
- **Dark theme**: Blue logo (`/weyl-logo.svg`)
- **Light theme**: Black logo (`/brand/weyl-full-logo-black.svg`)

### Document Card Pattern
```astro
<article class="document-card">
  <div class="document-meta">
    <span class="document-type">TECHNICAL MEMORANDUM № 2024-001</span>
    <div class="document-classification">
      <span>DATE: 2024-03-15</span>
      <span class="classification-badge">PUBLIC</span>
    </div>
  </div>
  
  <h2 class="document-title">On the Symmetry-Complete Representation of Tensor Layouts</h2>
  
  <p class="document-description">
    This memorandum establishes the theoretical foundation...
  </p>
  
  <div class="document-footer">
    <span class="document-department">DEPT. OF NUMERICAL ARCHITECTURE</span>
    <svg class="document-icon">...</svg>
  </div>
</article>
```

## Design Principles

### Sharp Geometry
- Zero border radius on all elements
- Hard edges and right angles
- Borders are 1px solid, no blur or shadow

### Institutional Language
- Formal, bureaucratic tone
- Passive voice preferred
- Third person only
- No contractions or colloquialisms
- Document numbers follow strict format

### Classification System
- All documents classified: PUBLIC, RESTRICTED, CONFIDENTIAL
- Classification appears in badge format (black background, white text)
- Date format: YYYY-MM-DD (ISO 8601)
- Department names in UPPERCASE

### Typography Rules
1. **Titles**: Serif font (Georgia/Charter), larger size, normal weight
2. **Metadata**: Sans-serif, UPPERCASE, increased letter-spacing (0.08-0.15em)
3. **Body**: Sans-serif, regular weight, 1.8 line-height for readability
4. **Departments**: Sans-serif, UPPERCASE, heritage color (#8b7355)

## Contrast with Hypermodern Theme

| Aspect | Hypermodern (Dark) | High Modernism (Light) |
|--------|-------------------|------------------------|
| Background | Near-black (#090b0e) | Warm beige (#f4f1eb) |
| Text | Light cyan (#e6f7ff) | Near-black (#1a1a1a) |
| Font | Monospace (Iosevka) | Sans-serif (Helvetica) |
| Titles | Monospace | Serif (Georgia) |
| Brand | Cyan (#54aeff) | Dark blue (#1a5276) |
| Borders | Subtle (#21262d) | Strong (#1a1a1a) |
| Radius | Small (2-8px) | Zero (sharp corners) |
| Effects | Glows, shadows | None |
| Voice | Technical, direct | Formal, institutional |

## Usage Guidelines

### When to Use High Modernism
- Official documents and archives
- Historical records
- Policy statements
- Institutional announcements
- Formal communications

### When NOT to Use
- Product interfaces
- Developer documentation
- Blog posts
- Marketing pages
- Interactive tools

The High Modernism theme is deliberately constrained to archival and institutional contexts, preserving the Hypermodern aesthetic for all user-facing product interfaces.


# Typography Guide

## Dual Typography Systems

Typography is epistemology made visible. The choice of typeface communicates not just information, but how that information should be understood and trusted.

---

## Hypermodern Typography

> "The terminal doesn't lie. The terminal doesn't comfort."

### Philosophy

Monospace typography enforces data integrity. Every character occupies the same width, making columns align, diffs visible, and data scannable. This is the typography of measurement and verification.

### Font Stack

```css
font-family: 'Berkeley Mono', 'Iosevka', 'SF Mono', 'JetBrains Mono', 'Fira Code', monospace;
```

| Priority | Font | License | Notes |
|----------|------|---------|-------|
| Elite | Berkeley Mono | Paid | Exceptional weight range, perfect terminals |
| Primary | Iosevka | Free (OFL) | Best free alternative, excellent ligatures |
| System 1 | SF Mono | Apple | macOS/iOS system mono |
| System 2 | JetBrains Mono | Free | Wide platform support |
| System 3 | Fira Code | Free (OFL) | Mozilla heritage, good ligatures |
| Fallback | monospace | System | Last resort |

### Display Font

**Aldrich** — Geometric, technical, has that "kick" for headlines

```css
font-family: 'Aldrich', 'Orbitron', sans-serif;
```

Use for:
- Hero text
- Section headers in presentations
- Marketing headlines

### Corporate Alternative

**IBM Plex Mono** — When you need enterprise credibility

```css
font-family: 'IBM Plex Mono', monospace;
```

---

## High Modernism Typography

> "The institution earned trust by delivering. The stamp meant something."

### Philosophy

Sans-serif typography communicates institutional authority. Weight indicates rank, size indicates importance, spacing indicates formality. This is the typography of documents that get filed.

### Font Stack

```css
font-family: 'Helvetica Neue', 'Univers', 'Arial', 'Liberation Sans', system-ui, sans-serif;
```

| Priority | Font | License | Notes |
|----------|------|---------|-------|
| Primary | Helvetica Neue | Paid | The modernist standard |
| Alternate | Univers | Paid | Frutiger's masterwork, Swiss precision |
| System 1 | Arial | System | Universal availability |
| System 2 | Liberation Sans | Free | Metric-compatible with Arial |
| Fallback | system-ui | System | Native sans-serif |

### Display Fonts

**Futura** — Bauhaus geometry for proclamations

```css
font-family: 'Futura', 'Century Gothic', sans-serif;
```

**Trade Gothic** — Industrial strength for institutional headers

```css
font-family: 'Trade Gothic', 'Franklin Gothic', sans-serif;
```

### Serif for Quotations

**Georgia** or **Charter** — For attributed statements and emphasis

```css
font-family: 'Georgia', 'Charter', 'Cambria', serif;
```

Use italics for quotations within body text.

---

## Type Scale

Both systems use a 1.25 ratio scale:

| Name | Size | Hypermodern Weight | High Modernism Weight |
|------|------|-------------------|----------------------|
| Hero | 48px | 700-800 | 900 (Black) |
| Headline | 32px | 600 | 700 (Bold) |
| Subhead | 24px | 400, +4 tracking | 400, +4 tracking |
| Body | 16px | 400 | 400 |
| Secondary | 14px | 400 | 400 |
| Caption | 12px | 400 | 300-400 |
| Micro | 10px | 400 | 300 |

### CSS Custom Properties

```css
:root {
  /* Scale */
  --text-hero: 48px;
  --text-headline: 32px;
  --text-subhead: 24px;
  --text-body: 16px;
  --text-secondary: 14px;
  --text-caption: 12px;
  --text-micro: 10px;
  
  /* Line heights */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  
  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.04em;
  --tracking-wider: 0.08em;
}
```

---

## Weight Semantics

### Hypermodern

Weight indicates **signal strength**:

| Weight | Name | Semantic |
|--------|------|----------|
| 300 | Light | Historical, derived, context |
| 400 | Regular | Current data, standard |
| 500 | Medium | Elevated importance |
| 600 | Semibold | Key metrics |
| 700 | Bold | Primary emphasis |
| 800 | Heavy | Critical, active state |

**Glow** indicates live/active state (not weight, but filter effect)

### High Modernism

Weight indicates **institutional rank**:

| Weight | Name | Semantic |
|--------|------|----------|
| 300 | Light | Captions, footnotes |
| 400 | Regular | Body text |
| 500 | Medium | Minor emphasis |
| 700 | Bold | Section headers |
| 900 | Black | Proclamations, directives |

---

## Color in Typography

### Hypermodern Semantic Colors

```css
/* State encoding */
.text-primary { color: #54aeff; }    /* Links, interactive */
.text-success { color: #3fb950; }    /* Nominal, confirmed */
.text-warning { color: #ffa657; }    /* Caution, threshold */
.text-error { color: #ff7b72; }      /* Critical, fault */
.text-special { color: #a371f7; }    /* Highlight, annotation */
.text-accent { color: #f0c020; }     /* Feature, emphasis */

/* Grayscale hierarchy */
.text-primary-content { color: #e6f7ff; }
.text-secondary-content { color: #c9d1d9; }
.text-tertiary-content { color: #8b949e; }
.text-muted { color: #6e7681; }
.text-subtle { color: #484f58; }
.text-faint { color: #30363d; }
```

### High Modernism Departmental Colors

```css
/* Departmental */
.text-executive { color: #1a1a1a; }      /* Authority, directive */
.text-administration { color: #1a5276; } /* Department headers */
.text-operations { color: #2d5a27; }     /* Procedure, verified */
.text-priority { color: #c41e3a; }       /* Urgent, critical */
.text-heritage { color: #8b7355; }       /* Archive, historical */
.text-gilt { color: #d4a017; }           /* Ceremony, achievement */
```

---

## Usage Patterns

### Hypermodern: Data Display

```html
<div class="metric">
  <span class="metric-value">43.5</span>
  <span class="metric-unit">it/s</span>
  <span class="metric-label">throughput</span>
</div>
```

```css
.metric-value {
  font-size: var(--text-headline);
  font-weight: 700;
  color: #54aeff;
  font-variant-numeric: tabular-nums;
}

.metric-unit {
  font-size: var(--text-secondary);
  font-weight: 400;
  color: #6e7681;
}

.metric-label {
  font-size: var(--text-caption);
  color: #484f58;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}
```

### Hypermodern: Status Bar

```html
<div class="status-bar">
  <span class="status nominal">█ NOMINAL</span>
  <span class="status-item">latency: 1.2ms</span>
  <span class="status-item">state: LIVE</span>
</div>
```

### High Modernism: Document Header

```html
<header class="document-header">
  <h1 class="proclamation">QUALITY ASSURANCE</h1>
  <p class="division">STANDARDS BUREAU</p>
  <p class="document-number">Document No. 1962-QA-0042</p>
</header>
```

```css
.proclamation {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: var(--text-hero);
  font-weight: 900;
  letter-spacing: var(--tracking-wide);
  color: #1a1a1a;
}

.division {
  font-size: var(--text-subhead);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  color: #1a5276;
}

.document-number {
  font-size: var(--text-caption);
  color: #8b7355;
}
```

### High Modernism: Quotation

```html
<blockquote class="institutional-quote">
  <p>"In a well-ordered laboratory, precision is not a goal but a habit."</p>
  <cite>— Bureau of Standards, 1962</cite>
</blockquote>
```

```css
.institutional-quote p {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: var(--text-body);
  color: #1a1a1a;
}

.institutional-quote cite {
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-size: var(--text-caption);
  color: #8b7355;
}
```

---

## The `//` Convention

In hypermodern typography, double slashes `//` serve as semantic delimiters:

```
// section //
// render // weyl // ai
// status: nominal //
```

This convention:
- References C++/programming comments
- Creates visual rhythm
- Indicates machine-readable segments
- Separates navigation from content

**Do not use** in High Modernism contexts—use traditional punctuation and hierarchy.

---

## Responsive Considerations

### Mobile Scale Adjustments

```css
@media (max-width: 640px) {
  :root {
    --text-hero: 32px;
    --text-headline: 24px;
    --text-subhead: 18px;
    --text-body: 16px;  /* Maintain readability */
  }
}
```

### Print Adjustments

```css
@media print {
  body {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #000;
  }
  
  /* Always use High Modernism for print */
  .hypermodern-only { display: none; }
}
```

---

## Accessibility

### Minimum Contrast Ratios

| Context | Ratio | Standard |
|---------|-------|----------|
| Body text | 4.5:1 | WCAG AA |
| Large text (>18px) | 3:1 | WCAG AA |
| UI components | 3:1 | WCAG AA |

### Font Size Minimums

- Body text: 16px minimum
- Interactive elements: 14px minimum
- Captions: 12px minimum (sparingly)

### Line Length

Optimal: 45-75 characters per line

```css
.readable-content {
  max-width: 65ch;
}
```
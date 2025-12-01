---
alwaysApply: true
---

/* src/styles/tokens.css */

:root {
  /* === HYPERMODERN (Dark) — Default === */
  
  /* Backgrounds */
  --color-bg-primary: #090b0e;
  --color-bg-surface: #13161a;
  --color-bg-elevated: #1a1f24;
  --color-bg-hover: #21262d;
  
  /* Text */
  --color-text-primary: #e6f7ff;
  --color-text-secondary: #c9d1d9;
  --color-text-muted: #8b949e;
  --color-text-subtle: #484f58;
  
  /* Brand */
  --color-brand-primary: #54aeff;
  --color-brand-hover: #8ecbff;
  --color-brand-glow: rgba(84, 174, 255, 0.4);
  
  /* Semantic */
  --color-success: #3fb950;
  --color-warning: #ffa657;
  --color-error: #ff7b72;
  --color-info: #54aeff;
  
  /* Accents */
  --color-violet: #a371f7;
  --color-gold: #f0c020;
  --color-cyan: #40e0d0;
  
  /* Borders */
  --color-border-default: #21262d;
  --color-border-hover: #54aeff;
  
  /* Typography */
  --font-mono: 'Iosevka', 'Berkeley Mono', 'SF Mono', monospace;
  --font-display: 'Aldrich', 'Orbitron', sans-serif;
  
  /* Scale */
  --text-hero: 3rem;      /* 48px */
  --text-headline: 2rem;  /* 32px */
  --text-subhead: 1.5rem; /* 24px */
  --text-body: 1rem;      /* 16px */
  --text-small: 0.875rem; /* 14px */
  --text-caption: 0.75rem;/* 12px */
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  
  /* Radii */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  
  /* Effects */
  --glow-sm: 0 0 8px var(--color-brand-glow);
  --glow-md: 0 0 16px var(--color-brand-glow);
  --glow-lg: 0 0 24px var(--color-brand-glow);
}

/* === HIGH MODERNISM (Light) === */
[data-theme="light"] {
  --color-bg-primary: #f4f1eb;
  --color-bg-surface: #ffffff;
  --color-bg-elevated: #e8e4d9;
  --color-bg-hover: #ddd9ce;
  
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #484f58;
  --color-text-muted: #8b7355;
  --color-text-subtle: #c9b896;
  
  --color-brand-primary: #1a5276;
  --color-brand-hover: #143d5a;
  --color-brand-glow: none;
  
  --color-success: #2d5a27;
  --color-warning: #d4a017;
  --color-error: #c41e3a;
  --color-info: #1a5276;
  
  --color-border-default: #1a1a1a;
  --color-border-hover: #1a5276;
  
  --font-mono: 'Helvetica Neue', 'Arial', system-ui, sans-serif;
  --font-display: 'Futura', 'Century Gothic', sans-serif;
  
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  
  --glow-sm: none;
  --glow-md: none;
  --glow-lg: none;
}
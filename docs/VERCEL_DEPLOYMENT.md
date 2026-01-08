# Vercel Deployment Guide

## ✅ Setup Complete

Your site is now configured for Vercel deployment with:
- **Vercel adapter** installed and configured
- **Server-side rendering** enabled
- **Web Analytics** enabled
- **Security headers** configured

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Astro
   - Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your project
3. Configure settings:
   - **Framework Preset**: Astro
   - **Build Command**: `bun run build`
   - **Output Directory**: `.vercel/output` (auto-detected)
   - **Install Command**: `bun install`

## 🔧 Configuration

### Environment Variables

If you need environment variables, add them in Vercel Dashboard:
- Project Settings → Environment Variables

Common variables you might need:
```
NODE_VERSION=22
ENABLE_EXPERIMENTAL_COREPACK=1
```

### Build Settings

The build is configured in `vercel.json`:
- Build command: `bun run build`
- Framework: Astro
- Node version: 22 (Vercel will use this even though you have v23 locally)

## 🔒 Security Headers

Security headers are configured in `vercel.json`:
- ✅ CSP with Vercel Analytics allowed
- ✅ HSTS with 2-year max-age
- ✅ X-Frame-Options: DENY
- ✅ All other security headers from enterprise SEO plan

## 📊 Features Enabled

### Vercel Analytics
Web Analytics is enabled in `astro.config.mjs`:
```js
adapter: vercel({
  webAnalytics: {
    enabled: true,
  },
})
```

### Core Web Vitals
The custom Web Vitals tracking is still in place and will work alongside Vercel Analytics.

### Build Output
- **Static files**: Served from edge network
- **Server functions**: Run on Vercel Serverless
- **API routes**: Automatically deployed as serverless functions

## 🎯 What's Server-Rendered vs Static

With `output: 'server'` mode:

**Server-Rendered (SSR):**
- Dynamic API routes (e.g., `/api/request-access`)
- Pages that need real-time data

**Static (Prerendered):**
- All documentation pages
- Blog posts
- Marketing pages
- SEO endpoints (llms.txt, sitemap.xml, etc.)

To prerender specific pages in server mode, add to the page:
```js
export const prerender = true;
```

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Node Version Warning
The warning about Node 23 vs 22 is expected and harmless. Vercel uses Node 22 for serverless functions regardless of your local version.

## 📦 Post-Deployment

After successful deployment:

1. **Verify SEO endpoints:**
   - https://your-domain/sitemap-index.xml
   - https://your-domain/blog/rss.xml
   - https://your-domain/docs.json
   - https://your-domain/ai-sitemap.xml
   - https://your-domain/.well-known/ai-plugin.json

2. **Check Analytics:**
   - Vercel Dashboard → Analytics tab
   - Should see Web Vitals data within 24 hours

3. **Submit to Search Engines:**
   - Google Search Console
   - Bing Webmaster Tools
   - Submit sitemap

## 🎉 You're Ready!

Your site is configured for:
- ✅ Vercel deployment
- ✅ Enterprise SEO
- ✅ Security headers
- ✅ Web Analytics
- ✅ Core Web Vitals tracking

Deploy command:
```bash
vercel --prod
```


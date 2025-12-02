# Keystatic CMS Setup Guide

This guide will help you set up Keystatic CMS for production use on Vercel (or any other domain).

## Overview

Keystatic is configured to use GitHub as the storage backend, which means:
- ✅ Content is stored in your GitHub repository
- ✅ All changes are version-controlled via Git
- ✅ Editors create pull requests or commit directly (based on permissions)
- ✅ Works with your existing Git workflow

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name:** `Weyl CMS` (or any name you prefer)
   - **Homepage URL:** `https://weyl-website-pink.vercel.app` (or your custom domain)
   - **Application description:** `Content management for Weyl website`
   - **Authorization callback URL:** `https://weyl-website-pink.vercel.app/api/keystatic/github/oauth/callback`
4. Click **"Register application"**
5. You'll see your **Client ID** - copy this
6. Click **"Generate a new client secret"** and copy the secret (you won't see it again!)

## Step 2: Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`weyl-website`)
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `KEYSTATIC_GITHUB_CLIENT_ID` | `your_client_id_from_step_1` | Production, Preview, Development |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` | `your_client_secret_from_step_1` | Production, Preview, Development |

5. Click **"Save"**

## Step 3: Redeploy Your Site

After adding the environment variables, trigger a new deployment:
- Either push a new commit to your repository
- Or go to Vercel dashboard → Deployments → Click "..." → Redeploy

## Step 4: Access the CMS

Once deployed, you can access the CMS at:
- **Production:** `https://weyl-website-pink.vercel.app/keystatic`
- **Custom domain (when set up):** `https://yourdomain.com/keystatic`

### First Login

1. Navigate to the CMS URL
2. Click **"Sign in with GitHub"**
3. Authorize the OAuth app
4. You're in! 🎉

## Usage

### Creating a New Blog Post

1. Go to `/keystatic`
2. Click **"Blog Posts"** in the sidebar
3. Click **"Create Blog Post"**
4. Fill in the fields:
   - **Title:** Auto-generates the URL slug
   - **Description:** Short summary (max 160 chars for SEO)
   - **Publication Date:** Defaults to today
   - **Author:** Defaults to "Weyl Team"
   - **Tags:** Add relevant tags
   - **Hero Image:** Optional featured image
   - **Content:** Write your post in Markdown/MDX
5. Click **"Create"**

### Publishing Changes

Depending on your GitHub permissions:
- **Maintainers:** Changes commit directly to the repository
- **Contributors:** Changes create a pull request for review

## Local Development

For local development, Keystatic will work in "local" mode:
- Visit `http://localhost:4321/keystatic`
- No GitHub login required
- Changes are saved to your local filesystem
- Commit and push changes via git as normal

## Updating Your Custom Domain

When you set up your custom domain, update:

1. **GitHub OAuth App:**
   - Go back to [GitHub Developer Settings](https://github.com/settings/developers)
   - Edit your OAuth app
   - Update **Homepage URL** to `https://yourcustomdomain.com`
   - Update **Authorization callback URL** to `https://yourcustomdomain.com/api/keystatic/github/oauth/callback`

2. **Astro Config** (optional, for SEO):
   - Update `site` in `astro.config.mjs` to your custom domain

## Troubleshooting

### "This page isn't working" or 500 error

**Cause:** Environment variables not set or incorrect.

**Solution:**
1. Verify environment variables are set in Vercel
2. Make sure you copied the Client ID and Secret correctly
3. Redeploy after adding variables

### "Unauthorized" error when trying to log in

**Cause:** OAuth callback URL doesn't match.

**Solution:**
1. Check the callback URL in your GitHub OAuth app settings
2. It must exactly match: `https://your-domain.com/api/keystatic/github/oauth/callback`
3. No trailing slashes, must include the full path

### Can't see changes after creating content

**Cause:** Vercel needs to rebuild after content changes.

**Solution:**
- Vercel automatically rebuilds when you push to GitHub
- If using Keystatic in production, changes should trigger a rebuild
- You can manually trigger a rebuild in Vercel dashboard

### Local development wants GitHub login

**Cause:** `NODE_ENV` is set to production locally.

**Solution:**
- Make sure you're running `npm run dev` (not `npm run build`)
- Check if `NODE_ENV` environment variable is set in your terminal

## Security Notes

- ✅ Never commit `.env` files with real credentials
- ✅ Only share Client ID (secret must remain secret)
- ✅ Regularly rotate your OAuth client secret
- ✅ Review OAuth app permissions in GitHub settings
- ✅ Only give repository access to trusted team members

## Support

For more information:
- [Keystatic Documentation](https://keystatic.com/docs)
- [GitHub OAuth Apps Documentation](https://docs.github.com/en/apps/oauth-apps)


# 🔧 Keystatic Setup Guide (Developer)

## ✅ What's Been Installed

Keystatic has been completely integrated into your Astro + Starlight site.

### Files Created/Modified

1. **`keystatic.config.ts`** - Main Keystatic configuration
2. **`src/pages/keystatic/[...params].astro`** - Admin UI route
3. **`src/pages/api/keystatic/[...params].ts`** - API endpoints
4. **`astro.config.mjs`** - Updated with Keystatic integration and hybrid output
5. **`docs/KEYSTATIC_GUIDE.md`** - User guide for content writers

### Dependencies Added
- `@keystatic/core` - Core Keystatic functionality
- `@keystatic/astro` - Astro integration

---

## ⚙️ Configuration Required

### 1. Update GitHub Repository Info

Open `keystatic.config.ts` and update these lines:

```typescript
storage: {
  kind: 'github',
  repo: {
    owner: 'weyl-ai', // ← Change to your GitHub username/org
    name: 'weyl-website', // ← Change to your repo name
  },
},
```

### 2. Set Up GitHub OAuth App

Keystatic needs a GitHub OAuth app for authentication.

#### Local Development

For local development, Keystatic uses GitHub's device flow - no OAuth app needed! Just:

```bash
bun run dev
```

Navigate to `http://localhost:4321/keystatic` and sign in with GitHub.

#### Production Setup

For production (`weyl.ai`), you need to create a GitHub OAuth App:

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** `Weyl CMS`
   - **Homepage URL:** `https://weyl.ai`
   - **Authorization callback URL:** `https://weyl.ai/api/keystatic/github/oauth/callback`
4. Click **"Register application"**
5. Note the **Client ID**
6. Click **"Generate a new client secret"** and save it

#### Add Environment Variables

Create/update `.env` file:

```bash
# For production deployment
PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID=your_client_id_here
PUBLIC_KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret_here
```

Add these to your hosting platform (Vercel/Netlify/etc.):
- `PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID`
- `PUBLIC_KEYSTATIC_GITHUB_CLIENT_SECRET`

---

## 🚀 Running Keystatic

### Development

```bash
bun run dev
```

Then navigate to: **http://localhost:4321/keystatic**

### Production

Keystatic will be available at: **https://weyl.ai/keystatic**

---

## 👥 Giving Team Members Access

Users need **write access** to your GitHub repository to use Keystatic.

### Option 1: Add as Collaborator (Small Teams)

1. Go to: `https://github.com/your-org/weyl-website/settings/access`
2. Click **"Add people"**
3. Enter their GitHub username
4. Choose **"Write"** access
5. They'll receive an email invitation

### Option 2: Use a Team (Recommended for Orgs)

1. Go to your GitHub organization
2. Create a team (e.g., "Content Editors")
3. Add team members
4. Give the team **Write** access to the repository

### ⚠️ Security Note

Users with write access can:
- ✅ Create/edit/delete blog posts via Keystatic
- ✅ Commit directly to the repository
- ❌ But they can't merge to protected branches (set up branch protection!)

**Recommended:** Set up branch protection on `main` and require pull requests for changes outside `/src/content/blog/`.

---

## 🏗️ Architecture

### How It Works

1. **User visits `/keystatic`** → Sees admin UI
2. **User signs in with GitHub** → Authenticates via OAuth
3. **User creates/edits content** → Changes saved to GitHub
4. **Keystatic commits changes** → Directly to your repo (or creates PR)
5. **Site rebuilds** → New content appears live

### Storage Mode: GitHub

```typescript
storage: { kind: 'github' }
```

- ✅ **Pros:** Version control, no database needed, works with your existing workflow
- ✅ **Collaboration:** Multiple users can edit (with some caveats)
- ⚠️ **Note:** Changes commit directly to your repo

### Alternative: Local Mode

For testing or single-user setups:

```typescript
storage: { kind: 'local' }
```

Changes stay on your local filesystem. Good for development, not for production.

---

## 🔒 Security Considerations

### Branch Protection

Set up branch protection on `main`:

1. Go to: `https://github.com/your-org/weyl-website/settings/branches`
2. Add rule for `main` branch
3. Enable:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Include administrators (optional)

This ensures blog post changes go through review before going live.

### Content Validation

The Keystatic schema enforces:
- ✅ Required fields (title, description, author, content)
- ✅ Max length on description (160 chars)
- ✅ Date format validation
- ✅ Type safety on all fields

This matches your existing Zod schema in `src/content/config.ts`.

---

## 🎨 Customization

### Change Admin URL

Edit `src/pages/keystatic/[...params].astro` and move the file to a different route, e.g., `src/pages/admin/[...params].astro` → Access at `/admin`

### Add More Fields

Edit `keystatic.config.ts` and add fields to the schema:

```typescript
canonicalUrl: fields.url({
  label: 'Canonical URL',
  description: 'Optional - for republished content',
}),

noindex: fields.checkbox({
  label: 'No Index',
  description: 'Prevent search engines from indexing',
  defaultValue: false,
}),
```

### Custom Branding

Update the UI configuration in `keystatic.config.ts`:

```typescript
ui: {
  brand: { 
    name: 'Weyl CMS',
    mark: () => <img src="/logo.svg" />, // Add custom logo
  },
  navigation: {
    'Content': ['blog'],
    'Settings': ['authors', 'tags'], // Add more sections
  },
},
```

---

## 🐛 Troubleshooting

### "Cannot find module '@keystatic/astro'"

```bash
bun install
```

### "Keystatic UI not loading"

1. Check `output: 'hybrid'` is in `astro.config.mjs`
2. Check `prerender: false` is in the Keystatic routes
3. Restart dev server

### "Authentication failing"

1. Check GitHub OAuth credentials are correct
2. Check callback URL matches exactly
3. Check environment variables are set

### "Changes not appearing"

1. Check the draft checkbox is unchecked
2. Check the site has rebuilt (check deployment logs)
3. Check the file was actually committed to GitHub

### "Git conflicts"

If two people edit the same post simultaneously, Git may conflict. To resolve:

1. Tell users to work on different posts when possible
2. Use branch protection + PRs to avoid direct commits
3. Conflicts can be resolved manually via GitHub

---

## 📦 Deployment Notes

### Vercel

Keystatic works out of the box with Vercel. Just:

1. Set environment variables in Vercel dashboard
2. Deploy as usual

### Netlify

Same as Vercel - set environment variables and deploy.

### Other Platforms

Make sure the platform supports:
- ✅ SSR/Hybrid rendering
- ✅ Node.js runtime
- ✅ Environment variables

---

## 🔄 Migration from Existing Posts

Your existing blog posts in `src/content/blog/*.mdx` will work as-is! Keystatic reads and writes the same format.

**Test it:**

1. Start dev server: `bun run dev`
2. Go to: `http://localhost:4321/keystatic`
3. Click "Blog Posts" - you should see all existing posts
4. Open one and edit it
5. Save - Keystatic will commit the changes

---

## 📚 Resources

- **Keystatic Docs:** https://keystatic.com/docs
- **GitHub OAuth Setup:** https://docs.github.com/en/apps/oauth-apps
- **Astro Hybrid Rendering:** https://docs.astro.build/en/guides/server-side-rendering/

---

## 🎯 Next Steps

1. ✅ Update GitHub repo info in `keystatic.config.ts`
2. ✅ Create GitHub OAuth app (for production)
3. ✅ Add environment variables to hosting platform
4. ✅ Test locally: `bun run dev` → visit `/keystatic`
5. ✅ Add team members as GitHub collaborators
6. ✅ Share `docs/KEYSTATIC_GUIDE.md` with content team
7. ✅ Set up branch protection (recommended)
8. ✅ Deploy to production

---

**Questions?** Check the Keystatic docs or open an issue on GitHub.



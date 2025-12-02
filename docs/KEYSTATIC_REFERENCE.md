# 📋 Keystatic Quick Reference

**Admin URL (Local):** http://localhost:4321/keystatic  
**Admin URL (Production):** https://weyl.ai/keystatic

---

## 🔐 Environment Variables (Production Only)

Create these in your hosting platform (Vercel/Netlify):

```bash
PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID=your_client_id
PUBLIC_KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret
```

**Get them from:** https://github.com/settings/developers (create OAuth app)

**Callback URL:** `https://weyl.ai/api/keystatic/github/oauth/callback`

---

## 🚀 Quick Start

### Developer Setup

1. **Update repo info** in `keystatic.config.ts`:
   ```typescript
   owner: 'your-github-username',
   name: 'your-repo-name',
   ```

2. **Start dev server:**
   ```bash
   bun run dev
   ```

3. **Visit:** http://localhost:4321/keystatic

4. **Sign in with GitHub** (uses device flow, no OAuth needed locally)

### Give Team Access

1. Go to GitHub repo settings → Collaborators
2. Add their GitHub username with **Write** access
3. Share `docs/KEYSTATIC_GUIDE.md` with them

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `keystatic.config.ts` | Main configuration & schema |
| `src/pages/keystatic/[...params].astro` | Admin UI |
| `src/pages/api/keystatic/[...params].ts` | API endpoints |
| `src/content/blog/*.mdx` | Blog posts (Keystatic reads/writes here) |
| `docs/KEYSTATIC_GUIDE.md` | User guide for content team |
| `docs/KEYSTATIC_SETUP.md` | Developer setup guide |

---

## 🎯 Content Schema

```typescript
{
  title: string (required),
  description: string (required, max 160 chars),
  pubDate: date (required),
  updatedDate: date (optional),
  author: string (default: "Weyl Team"),
  tags: string[] (optional),
  draft: boolean (default: false),
  image: {
    src: string,
    alt: string
  } (optional),
  content: mdx (required)
}
```

---

## 🔧 Common Tasks

### Add a New Field

Edit `keystatic.config.ts`:

```typescript
newField: fields.text({
  label: 'New Field',
  description: 'Field description',
}),
```

### Change Admin URL

Move `src/pages/keystatic/[...params].astro` to desired route

### Customize Branding

Update `ui.brand` in `keystatic.config.ts`

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| UI not loading | Check `output: 'hybrid'` in astro.config.mjs |
| Auth failing | Verify GitHub OAuth credentials |
| Posts not showing | Uncheck "Draft" checkbox |
| Changes not live | Wait for deployment to complete |

---

## 📚 Documentation

- **User Guide:** `docs/KEYSTATIC_GUIDE.md`
- **Setup Guide:** `docs/KEYSTATIC_SETUP.md`
- **Keystatic Docs:** https://keystatic.com/docs
- **API Reference:** https://keystatic.com/docs/api

---

## ✅ Checklist

### Initial Setup
- [ ] Update repo info in `keystatic.config.ts`
- [ ] Test locally: `bun run dev` → visit `/keystatic`
- [ ] Create GitHub OAuth app (production)
- [ ] Add env vars to hosting platform
- [ ] Deploy to production

### Team Onboarding
- [ ] Add team members to GitHub repo (Write access)
- [ ] Share `docs/KEYSTATIC_GUIDE.md` with content team
- [ ] Do a quick demo/walkthrough
- [ ] Set up branch protection (recommended)

### Production Ready
- [ ] OAuth authentication working
- [ ] Content team can sign in
- [ ] Can create/edit blog posts
- [ ] Changes deploy automatically
- [ ] Branch protection enabled (optional)

---

**Last Updated:** December 2, 2025



# 📝 How to Write Blog Posts with Keystatic

**For: Marketing Team & Content Writers**  
**Last Updated:** December 2, 2025

---

## 🚀 Getting Started

### What is Keystatic?

Keystatic is our blog content management system. It's a clean, easy-to-use editor that lets you write and publish blog posts without touching any code. Think of it like a simpler, cleaner version of WordPress.

### What You'll Need

1. **GitHub Account** - You'll need a GitHub account (free to create at github.com)
2. **Permissions** - Ask the dev team to give your GitHub account write access to the repository
3. **Browser** - Works best in Chrome, Firefox, or Safari

---

## 📖 Step-by-Step: Writing a Blog Post

### 1. Access Keystatic

1. Open your browser and go to: **`https://weyl.ai/keystatic`**
   - *Note: During local development, use `http://localhost:4321/keystatic`*

2. You'll see a login screen - click **"Sign in with GitHub"**

3. Authorize the app (first time only)

### 2. Create a New Blog Post

1. Once logged in, you'll see the Keystatic dashboard
2. In the left sidebar, click on **"Blog Posts"**
3. Click the **"+ Create Entry"** button at the top right
4. You'll see a form with several fields - let's go through each one:

---

## 📋 Filling Out the Form

### **Title** (Required)
- This becomes the blog post URL and the main heading
- **Example:** `Announcing Weyl`
- **Tip:** Keep it short and descriptive (under 60 characters for SEO)

### **Description** (Required)
- Short summary of your post (max 160 characters)
- Shows up in preview cards and Google search results
- **Example:** `Introducing Weyl - inference infrastructure for generative media`
- **Tip:** Make it compelling - this is what gets people to click!

### **Publication Date** (Required)
- Defaults to today's date
- Click the calendar icon to change it
- **When to use a future date:** If you want to schedule a post (note: requires re-deploying the site)

### **Updated Date** (Optional)
- Leave blank for new posts
- Set this if you make major updates to an existing post
- Helps readers know content is fresh

### **Author** (Required)
- Defaults to "Weyl Team"
- Change it to your name if you prefer: `Jane Smith` or `Jane Smith, Product Marketing`

### **Tags** (Optional but Recommended)
- Add relevant tags to categorize your post
- Click **"+ Add Tag"** to add each one
- **Examples:** `announcement`, `infrastructure`, `AI`, `tutorial`, `case-study`
- **Tip:** Use 2-5 tags per post

### **Draft** (Checkbox)
- ☐ Unchecked = Post is **public** and visible on the blog
- ☑ Checked = Post is **hidden** (save as draft while you work)
- **Tip:** Keep checked while writing, uncheck when ready to publish

### **Hero Image** (Optional)
- Add a featured image that shows at the top of your post
- Click **"+ Add Image"** 
- Enter the image URL (ask dev team where to upload images)
- Add alt text describing the image (for accessibility)

### **Content** (Required)
This is where you write your actual blog post!

---

## ✍️ Writing Content (The Editor)

### Basic Formatting

The editor uses **Markdown** - a simple way to format text. Here's what you need to know:

#### Headings
```
# Large Heading (H1)
## Medium Heading (H2)
### Smaller Heading (H3)
```

**Tip:** Your title is already H1, so start with H2 (##) in your content

#### Text Formatting
- **Bold text**: Select text and click the **B** button, or type `**bold text**`
- *Italic text*: Select text and click the *I* button, or type `*italic text*`
- `Code`: Use the `</>` button for inline code

#### Lists

**Bullet list:**
```
- First item
- Second item
- Third item
```

**Numbered list:**
```
1. First step
2. Second step
3. Third step
```

#### Links
1. Select the text you want to link
2. Click the 🔗 link button
3. Paste the URL
4. Click "Apply"

Or type it manually: `[link text](https://example.com)`

#### Images
1. Click the 🖼️ image button
2. Upload an image or enter the URL
3. Add alt text (describe what the image shows)

#### Code Blocks
For code snippets:
1. Click the code block button
2. Choose the language (Python, JavaScript, etc.)
3. Paste your code

Or type:
````
```python
def hello():
    print("Hello, world!")
```
````

---

## 💾 Saving & Publishing

### Save as Draft
1. Make sure the **"Draft"** checkbox is ☑ **checked**
2. Click **"Save"** at the top right
3. Your post is saved but won't appear on the public blog

### Publish Your Post
1. Uncheck the **"Draft"** checkbox (☐)
2. Review everything one more time
3. Click **"Save"** at the top right
4. **That's it!** Your post will go live after the next site deploy (usually within 5-10 minutes)

---

## 🔄 Editing Existing Posts

1. Go to **`https://weyl.ai/keystatic`**
2. Click **"Blog Posts"** in the sidebar
3. Find your post in the list
4. Click on it to open
5. Make your changes
6. If it's a major update, change the **"Updated Date"** to today
7. Click **"Save"**

---

## 📸 Working with Images

### Where to Put Images

Ask your dev team about the preferred location. Two common options:

1. **Upload to `/public/images/blog/`** folder (requires GitHub or dev help)
2. **Use a CDN** like Cloudinary or Imgur
3. **Use Keystatic's built-in upload** (if configured)

### Image Best Practices

- **Size:** Optimize images before uploading (under 500KB)
- **Dimensions:** Blog images should be around 1200x630px for social sharing
- **Format:** Use JPG for photos, PNG for graphics with text
- **Alt Text:** Always describe the image (helps with accessibility and SEO)

---

## 🎯 Writing Tips

### SEO Best Practices

1. **Title:** Include your main keyword, keep under 60 characters
2. **Description:** Write compelling copy with your keyword, 150-160 characters
3. **Content:** 
   - Use headings (H2, H3) to break up text
   - Write in short paragraphs (2-3 sentences)
   - Include your main keyword naturally 2-3 times
4. **Links:** Link to relevant internal pages (other blog posts, docs)

### Content Structure

A good blog post usually follows this structure:

```
## Introduction
[Hook the reader in 2-3 sentences]

## The Problem
[Describe the challenge or pain point]

## Our Approach/Solution
[How you're solving it]

### Feature 1
[Details...]

### Feature 2
[Details...]

## Results/Benefits
[Concrete outcomes, metrics if available]

## Getting Started / Call to Action
[Tell readers what to do next]
```

---

## 🆘 Troubleshooting

### "I can't see the Keystatic admin"
- Check you're going to the right URL: `https://weyl.ai/keystatic`
- Make sure you're signed in to GitHub
- Ask dev team if the site is running

### "I get an error when saving"
- Check all required fields are filled (Title, Description, Author, Content)
- Make sure Description is under 160 characters
- Try refreshing the page and trying again

### "My post isn't showing up on the blog"
- Is the "Draft" checkbox unchecked?
- Changes need a site deploy to go live (usually automatic, takes 5-10 min)
- Ask dev team if deployments are working

### "I lost my work!"
- Keystatic saves to GitHub - your work should be there
- Check the blog post list to see if it saved
- Ask dev team to check the Git history

### "I accidentally deleted something"
- Don't panic! Everything is in Git version control
- Tell the dev team immediately - they can restore it

---

## 🤔 Need Help?

**Technical Issues:** Contact the dev team  
**Writing/Content Questions:** Ask your content lead  
**Access Problems:** Ask dev team to check GitHub permissions

---

## 📚 Quick Reference

| Action | How To |
|--------|--------|
| **Bold** | Select text → Click **B** |
| **Link** | Select text → Click 🔗 → Paste URL |
| **Image** | Click 🖼️ → Upload/paste URL |
| **Heading** | Type `## Your Heading` |
| **List** | Type `- ` at start of line |
| **Save Draft** | Check "Draft" box → Click "Save" |
| **Publish** | Uncheck "Draft" → Click "Save" |

---

## 🎓 Learning Resources

- **Markdown Guide:** https://www.markdownguide.org/basic-syntax/
- **SEO Writing:** https://moz.com/beginners-guide-to-seo
- **Keystatic Docs:** https://keystatic.com/docs

---

**Remember:** You can't break anything! Everything is saved in version control and can be restored. Experiment and have fun writing! 🎉




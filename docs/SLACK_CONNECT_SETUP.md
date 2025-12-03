# Slack Connect API Access Setup Guide

This document explains how to set up the Slack Connect integration for the API access request form.

## Overview

When a user submits the API access request form:
1. A private Slack channel is created in your workspace
2. The user's information is posted to that channel
3. A Slack Connect invitation is sent to the user's email
4. The user can join from their own Slack workspace
5. You can communicate directly with them in the shared channel

## Prerequisites

- A Slack workspace (free or paid plan)
- Admin access to create a Slack app

## Setup Instructions

### 1. Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Select **"From scratch"**
4. Name your app (e.g., "Weyl API Access")
5. Choose your workspace
6. Click **"Create App"**

### 2. Add Required Permissions

1. In the left sidebar, click **"OAuth & Permissions"**
2. Scroll down to **"Scopes" → "Bot Token Scopes"**
3. Add the following scopes:
   - `channels:manage` - Create and manage channels
   - `chat:write` - Post messages to channels
   - `conversations.connect:write` - Send Slack Connect invitations

### 3. Install App to Workspace

1. Scroll to the top of the **"OAuth & Permissions"** page
2. Click **"Install to Workspace"**
3. Review the permissions and click **"Allow"**
4. Copy the **"Bot User OAuth Token"** (starts with `xoxb-`)

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Slack Bot Token:
   ```
   SLACK_BOT_TOKEN=xoxb-your-actual-token-here
   ```

3. (Optional) Add your Klaviyo API key for backup CRM tracking:
   ```
   KLAVIYO_API_KEY=your_klaviyo_private_api_key_here
   ```

### 5. Restart Your Dev Server

```bash
bun run dev
```

## How It Works

### User Flow

1. User visits `/request-access/` and fills out the form
2. User submits their email, company, and project description
3. User sees a success message explaining they'll receive a Slack Connect invitation
4. User receives an email from Slack with the invitation
5. User accepts and joins the private channel from their own Slack workspace

### Your Team's Flow

1. A new private channel is created (e.g., `#connect-acme-inc`)
2. The user's information is posted as a formatted message
3. You can chat directly with the user in this shared channel
4. Deliver the API key and onboarding instructions in Slack
5. Provide ongoing support in the same channel

## Channel Naming

Channels are automatically named based on the company name:
- Format: `connect-{company-name}`
- Example: "Acme Inc." → `#connect-acme-inc`
- Company names are normalized (lowercase, special chars replaced with hyphens)

## Troubleshooting

### "missing_scope" Error

Make sure your Slack app has all three required scopes:
- `channels:manage`
- `chat:write`
- `conversations.connect:write`

Reinstall the app after adding scopes.

### "SLACK_BOT_TOKEN is not set" Error

1. Check that your `.env` file exists
2. Verify the token starts with `xoxb-`
3. Restart your dev server after adding the token

### Slack Connect Invitation Not Received

- Check the user's spam folder
- Verify your Slack workspace allows Slack Connect (some organizations restrict it)
- The invitation expires after 30 days

### Channel Already Exists

If a channel with the same name exists, Slack will return an error. You can either:
1. Rename or archive the existing channel
2. The code will fail gracefully and show an error to the user

## Security Notes

- Never commit `.env` to version control
- The `SLACK_BOT_TOKEN` grants access to your Slack workspace
- Rotate tokens if they're exposed
- Use environment variables in production (Vercel, Netlify, etc.)

## Alternative: Email Fallback

For users who don't use Slack, you can provide an email alternative:
- The form page includes a link to `support@weyl.ai`
- You can manually create channels for email requests
- Or provide API keys via email if preferred

## Production Deployment

When deploying to production:

1. Add `SLACK_BOT_TOKEN` to your hosting provider's environment variables:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **Cloudflare Pages**: Settings → Environment Variables

2. Make sure the token is marked as "secret" or "sensitive"

3. Test the form in production before announcing it

## Support

If you encounter issues:
1. Check Slack API logs at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Review server logs for error messages
3. Test with your own email first

## Next Steps

After a user joins your Slack channel:
1. Welcome them to the channel
2. Verify their use case
3. Generate and share their API key
4. Provide getting started resources
5. Be available for questions and support


# API Request Access Form - Setup Instructions

## Overview

A dedicated API request access page has been created at `/request-access/` that collects user information and submits it to Klaviyo for lead management.

## Files Created

### 1. `/src/pages/request-access.astro`
The main page displaying the form with branding elements matching the Weyl design system.

### 2. `/src/components/forms/RequestAccessForm.tsx`
React component with form validation, submission handling, loading states, and error handling.

### 3. `/src/pages/api/request-access.ts`
Server-side API endpoint that:
- Validates form data
- Sends contact information to Klaviyo
- Handles duplicate profiles (updates instead of fails)
- Returns appropriate success/error responses

### 4. `/.env.example`
Template for environment variables needed

## Klaviyo Setup Instructions

### Step 1: Get Your Klaviyo API Key

1. Log in to [Klaviyo](https://www.klaviyo.com/)
2. Navigate to **Settings** → **API Keys**
3. Create a new **Private API Key**
4. Give it appropriate permissions (at minimum: **Profiles - Write**)
5. Copy your API key

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```bash
KLAVIYO_API_KEY=your_klaviyo_private_api_key_here
```

### Step 3: Deploy Environment Variables

If deploying to Vercel:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add `KLAVIYO_API_KEY` with your API key

## Features

### Form Fields
- **Email Address** (required, validated)
- **Company / Project Name** (required, min 2 characters)
- **What are you building?** (required, min 10 characters, textarea)

### Validation
- Real-time validation on form submission
- Email format validation
- Minimum length requirements
- Clear error messages displayed below each field

### User Experience
- Loading state with spinner during submission
- Success message on successful submission
- Error handling for network issues and API failures
- Form fields disabled during submission
- Matches Weyl branding (dark theme, cyan accents, monospace font)

### Page Features
- Hero section with call-to-action
- Fully responsive design

## Klaviyo Data Structure

The form submits the following data to Klaviyo:

```json
{
  "data": {
    "type": "profile",
    "attributes": {
      "email": "user@example.com",
      "properties": {
        "company": "User's Company Name",
        "project_description": "What they are building",
        "source": "API Access Request Form"
      }
    }
  }
}
```

### Custom Properties in Klaviyo

The following custom properties are added to each profile:
- `company` - Company or project name
- `project_description` - Description of what they're building
- `source` - Always set to "API Access Request Form"
- `last_updated` - Timestamp (for duplicate profiles)

## Organization in Klaviyo

### Creating Segments

You can create segments in Klaviyo to organize API access requests:

1. Go to **Audience** → **Segments**
2. Create a new segment with condition:
   - `Properties about someone` → `source` → `equals` → `API Access Request Form`

### Creating Lists

You can also manually or automatically add these profiles to lists for email campaigns.

## Navigation Updates

The request access form is accessible via:
- Landing page CTA section (primary button)
- All documentation pages (Getting Started, API docs, Workflow guides)

## Testing

The form has been tested with:
- ✅ Empty form validation
- ✅ Valid form submission (shows loading state)
- ✅ Error handling (displays error messages)
- ✅ TypeScript compilation
- ✅ Responsive design

## Customization

### Update Success Message
In `/src/components/forms/RequestAccessForm.tsx`:
```typescript
message: 'Thank you! Your request has been submitted...',
```

### Update Response Time
In `/src/pages/request-access.astro`:
```typescript
We'll review your application and get back to you within 24 hours...
```

## Monitoring

Once set up, you can:
- View all submissions in your Klaviyo profiles
- Create segments to filter API access requests
- Set up email flows to respond to new requests
- Export profile data for CRM
- Track conversion rates

## Troubleshooting

### "Server configuration error"
- Ensure `KLAVIYO_API_KEY` is set in environment variables
- Check that the API key is valid in Klaviyo settings
- Verify the API key has **Profiles - Write** permission

### "Network error"
- Check that the Klaviyo API is accessible
- Verify API key permissions in Klaviyo

### Duplicate profiles
- The API automatically updates existing profiles
- Updates are handled gracefully with no user-facing errors
- Profile ID is extracted from Klaviyo's 409 error response

## API Endpoints Used

- **Create Profile**: `POST https://a.klaviyo.com/api/profiles/`
- **Update Profile**: `PATCH https://a.klaviyo.com/api/profiles/{profile_id}`

## Support

For Klaviyo API documentation: https://developers.klaviyo.com/

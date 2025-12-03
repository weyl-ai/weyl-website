// src/pages/api/request-access.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, company, description } = data;

    // Validate input
    if (!email || !company || !description) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Klaviyo API key from environment
    const klaviyoApiKey = import.meta.env['KLAVIYO_API_KEY'];
    
    if (!klaviyoApiKey) {
      console.error('KLAVIYO_API_KEY is not set');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send to Klaviyo
    const klaviyoResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            properties: {
              company,
              project_description: description,
              source: 'API Access Request Form',
            },
          },
        },
      }),
    });

    if (!klaviyoResponse.ok) {
      const errorData = await klaviyoResponse.text();
      console.error('Klaviyo API error:', errorData);
      
      // Check if profile already exists (409 conflict)
      if (klaviyoResponse.status === 409) {
        // Profile exists, we'll update it
        const errorJson = JSON.parse(errorData);
        const profileId = errorJson?.errors?.[0]?.meta?.duplicate_profile_id;
        
        if (profileId) {
          // Update the existing profile
          const updateResponse = await fetch(`https://a.klaviyo.com/api/profiles/${profileId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
              'Content-Type': 'application/json',
              'revision': '2024-10-15',
            },
            body: JSON.stringify({
              data: {
                type: 'profile',
                id: profileId,
                attributes: {
                  properties: {
                    company,
                    project_description: description,
                    source: 'API Access Request Form',
                    last_updated: new Date().toISOString(),
                  },
                },
              },
            }),
          });

          if (!updateResponse.ok) {
            throw new Error('Failed to update profile');
          }
        }
      } else {
        throw new Error(`Klaviyo API error: ${klaviyoResponse.status}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Request submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit request. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

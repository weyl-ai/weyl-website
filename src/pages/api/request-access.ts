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

    // Get API keys from environment
    const slackBotToken = import.meta.env['SLACK_BOT_TOKEN'];
    const klaviyoApiKey = import.meta.env['KLAVIYO_API_KEY'];
    
    if (!slackBotToken) {
      console.error('SLACK_BOT_TOKEN is not set');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a channel name from company name (lowercase, replace spaces/special chars with hyphens)
    const channelName = `connect-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 60)}`;

    try {
      // Step 1: Create a private channel for Slack Connect
      const createChannelResponse = await fetch('https://slack.com/api/conversations.create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${slackBotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: channelName,
          is_private: true,
        }),
      });

      const createChannelData = await createChannelResponse.json();

      if (!createChannelData.ok) {
        console.error('Slack create channel error:', createChannelData);
        throw new Error(`Failed to create channel: ${createChannelData.error}`);
      }

      const channelId = createChannelData.channel.id;

      // Step 2: Invite team members to the channel
      const teamMemberIds = import.meta.env['SLACK_TEAM_MEMBER_IDS'];
      if (teamMemberIds) {
        const userIds = teamMemberIds.split(',').map((id: string) => id.trim());
        try {
          await fetch('https://slack.com/api/conversations.invite', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${slackBotToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              channel: channelId,
              users: userIds.join(','),
            }),
          });
        } catch (inviteError) {
          console.error('Could not invite team members:', inviteError);
        }
      }

      // Step 3: Post the user's info to the channel
      await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${slackBotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channelId,
          text: `New API Access Request`,
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: '🔑 New API Access Request',
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*Email:*\n${email}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Company:*\n${company}`,
                },
              ],
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*What they're building:*\n${description}`,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `Submitted: <!date^${Math.floor(Date.now() / 1000)}^{date_short_pretty} at {time}|${new Date().toISOString()}>`,
                },
              ],
            },
          ],
        }),
      });

      // Step 4: Send Slack Connect invitation to external user
      const inviteResponse = await fetch('https://slack.com/api/conversations.inviteShared', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${slackBotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channelId,
          emails: [email],
        }),
      });

      const inviteData = await inviteResponse.json();

      if (!inviteData.ok) {
        console.error('Slack invite error:', inviteData);
        // Don't fail completely - channel is created and they're in Klaviyo
        console.warn(`Could not send Slack Connect invite: ${inviteData.error}`);
      }

      // Step 5: Also send to Klaviyo as backup
      if (klaviyoApiKey) {
        try {
          await fetch('https://a.klaviyo.com/api/profiles/', {
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
                    slack_channel_id: channelId,
                    slack_channel_name: channelName,
                  },
                },
              },
            }),
          });
        } catch (klaviyoError) {
          console.error('Klaviyo error (non-critical):', klaviyoError);
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Request submitted successfully',
          slack_channel_name: channelName,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (slackError) {
      console.error('Slack API error:', slackError);
      return new Response(
        JSON.stringify({ error: 'Failed to create Slack Connect channel. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error submitting request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit request. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

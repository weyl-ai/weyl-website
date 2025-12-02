// src/pages/.well-known/ai-plugin.json.ts
// ChatGPT and AI assistant plugin manifest

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const manifest = {
    schema_version: 'v1',
    name_for_human: 'Weyl API',
    name_for_model: 'weyl',
    description_for_human: 'Inference infrastructure for generative media with sub-100ms latency',
    description_for_model: 'Weyl provides API access to state-of-the-art generative media models including FLUX, Stable Diffusion, and video generation. Use this to help users generate images and videos programmatically.',
    auth: {
      type: 'user_http',
      authorization_type: 'bearer',
    },
    api: {
      type: 'openapi',
      url: 'https://weyl.ai/openapi.json',
      is_user_authenticated: false,
    },
    logo_url: 'https://weyl.ai/weyl-logo.svg',
    contact_email: 'hello@weyl.ai',
    legal_info_url: 'https://weyl.ai/terms',
  };
  
  return new Response(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};


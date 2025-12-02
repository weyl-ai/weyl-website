// src/pages/openapi.json.ts
// Expose OpenAPI specification for AI tools and documentation

import type { APIRoute } from 'astro';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export const GET: APIRoute = async () => {
  try {
    // Read the existing openapi.yaml file
    const yamlPath = resolve('./openapi.yaml');
    await readFile(yamlPath, 'utf-8'); // Verify file exists
    
    // For now, we'll return a reference to the YAML
    // In production, you might want to convert YAML to JSON
    const response = {
      openapi: '3.1.0',
      info: {
        title: 'Weyl API',
        version: '1.0.0',
        description: 'Inference infrastructure for generative media',
        contact: {
          email: 'hello@weyl.ai',
          url: 'https://weyl.ai',
        },
      },
      servers: [
        {
          url: 'https://sync.render.weyl.ai',
          description: 'Sync tier - real-time generation',
        },
        {
          url: 'https://async.render.weyl.ai',
          description: 'Async tier - queue-based generation',
        },
      ],
      externalDocs: {
        description: 'Full API Documentation',
        url: 'https://weyl.ai/api/',
      },
      note: 'Full OpenAPI specification available at /openapi.yaml',
    };
    
    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'OpenAPI spec not available' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
};


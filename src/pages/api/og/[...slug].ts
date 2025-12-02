// src/pages/api/og/[...slug].ts
import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';
import type { ReactElement } from 'react';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  
  // Get slug from URL path
  const slug = params['slug'] || 'default';
  
  // Define defaults based on slug
  const defaults: Record<string, { title: string; description: string }> = {
    'default': {
      title: 'Weyl',
      description: 'The render layer for generative media',
    },
    'blog': {
      title: 'Blog',
      description: 'Updates, insights, and announcements from the Weyl team',
    },
    'docs': {
      title: 'Documentation',
      description: 'API documentation and guides for building with Weyl',
    },
  };
  
  const slugDefaults = (defaults[slug] ?? defaults['default'])!;
  
  // Allow query params to override  
  const title = url.searchParams.get('title') ?? slugDefaults.title;
  const description = url.searchParams.get('description') ?? slugDefaults.description;
  
  const element = {
    type: 'div',
    key: null,
    ref: null,
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#090b0e',
        padding: '80px',
        fontFamily: 'monospace',
      },
      children: [
        {
          type: 'div',
          key: null,
          ref: null,
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            },
            children: [
              // Weyl Logo
              {
                type: 'svg',
                key: null,
                ref: null,
                props: {
                  width: '470',
                  height: '118',
                  viewBox: '0 0 235 59',
                  fill: 'none',
                  children: [
                    {
                      type: 'path',
                      key: null,
                      ref: null,
                      props: {
                        d: 'M15.6051 15.6325V33.6836L0 42.7091L9.00972 58.3416H45.0486L54.0583 42.7091L69.6634 51.7346L85.2685 42.7091L76.2588 27.0766H58.2394V9.02553L42.6343 0L33.6245 15.6325H15.6051Z',
                        fill: '#54AEFF',
                      },
                    },
                    {
                      type: 'path',
                      key: null,
                      ref: null,
                      props: {
                        d: 'M106.285 54.9773L100.316 3.36475H107.058L109.726 41.0033L112.956 17.8303H118.855L122.085 41.0033L124.753 3.36475H131.495L125.526 54.9773H119.627L115.905 28.3635L112.184 54.9773H106.285Z',
                        fill: 'white',
                      },
                    },
                    {
                      type: 'path',
                      key: null,
                      ref: null,
                      props: {
                        d: 'M138.236 54.9773V3.36475H164.358V9.54421H145.258V25.0631H160.355V31.2425H145.258V48.7978H164.358V54.9773H138.236Z',
                        fill: 'white',
                      },
                    },
                    {
                      type: 'path',
                      key: null,
                      ref: null,
                      props: {
                        d: 'M182.616 54.9773V33.7705L171.17 3.36475H178.683L186.127 24.8524L193.57 3.36475H201.084L189.638 33.7705V54.9773H182.616Z',
                        fill: 'white',
                      },
                    },
                    {
                      type: 'path',
                      key: null,
                      ref: null,
                      props: {
                        d: 'M210.002 54.9773V3.36475H217.024V48.7978H235.001V54.9773H210.002Z',
                        fill: 'white',
                      },
                    },
                  ],
                },
              },
              // Title (only show if not default)
              title !== 'Weyl' ? {
                type: 'div',
                key: null,
                ref: null,
                props: {
                  style: {
                    fontSize: '64px',
                    fontWeight: 600,
                    color: '#54aeff',
                    letterSpacing: '0.02em',
                    lineHeight: 1.2,
                    marginTop: '20px',
                  },
                  children: title,
                },
              } : null,
              // Description
              {
                type: 'div',
                key: null,
                ref: null,
                props: {
                  style: {
                    fontSize: '32px',
                    color: '#c9d1d9',
                    lineHeight: 1.5,
                    maxWidth: '900px',
                  },
                  children: description,
                },
              },
            ].filter(Boolean),
          },
        },
        {
          type: 'div',
          key: null,
          ref: null,
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '28px',
              color: '#8b949e',
            },
            children: [
              {
                type: 'span',
                key: null,
                ref: null,
                props: {
                  style: { color: '#3fb950' },
                  children: '█',
                },
              },
              {
                type: 'span',
                key: null,
                ref: null,
                props: {
                  children: 'weyl.ai',
                },
              },
            ],
          },
        },
      ],
    },
  } as ReactElement;
  
  return new ImageResponse(
    element,
    {
      width: 1200,
      height: 630,
    }
  );
};


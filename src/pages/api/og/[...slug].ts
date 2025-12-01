// src/pages/api/og/[...slug].ts
import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';
import type { ReactElement } from 'react';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Weyl';
  const description = url.searchParams.get('description') || 'The render layer for generative media';
  
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
              gap: '24px',
            },
            children: [
              {
                type: 'div',
                key: null,
                ref: null,
                props: {
                  style: {
                    fontSize: '72px',
                    fontWeight: 600,
                    color: '#54aeff',
                    letterSpacing: '0.05em',
                    lineHeight: 1.2,
                  },
                  children: title,
                },
              },
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
            ],
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

// Pre-render some common OG images at build time
export function getStaticPaths() {
  return [
    { params: { slug: 'default' } },
    { params: { slug: 'blog' } },
    { params: { slug: 'docs' } },
  ];
}


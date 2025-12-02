// src/middleware.ts
// URL normalization and redirects

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;
  
  // Normalize trailing slashes
  // Ensure all URLs end with a trailing slash (except for files)
  const pathname = url.pathname;
  const hasFileExtension = /\.[a-z0-9]+$/i.test(pathname);
  
  if (!hasFileExtension && !pathname.endsWith('/') && pathname !== '/') {
    const newUrl = new URL(url);
    newUrl.pathname = pathname + '/';
    return context.redirect(newUrl.toString(), 301);
  }
  
  // Remove duplicate slashes
  if (pathname.includes('//')) {
    const newUrl = new URL(url);
    newUrl.pathname = pathname.replace(/\/+/g, '/');
    return context.redirect(newUrl.toString(), 301);
  }
  
  // Lowercase URLs (SEO best practice)
  if (pathname !== pathname.toLowerCase()) {
    const newUrl = new URL(url);
    newUrl.pathname = pathname.toLowerCase();
    return context.redirect(newUrl.toString(), 301);
  }
  
  // Add security headers to response
  const response = await next();
  
  // Set additional cache headers for specific paths
  if (pathname.startsWith('/api/og/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  if (pathname.startsWith('/_astro/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  return response;
});


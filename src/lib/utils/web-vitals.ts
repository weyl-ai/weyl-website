// src/lib/utils/web-vitals.ts
// Web Vitals tracking utilities

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export type WebVitalsCallback = (metric: WebVitalsMetric) => void;

// Thresholds based on web.dev recommendations
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(
  name: WebVitalsMetric['name'],
  value: number
): WebVitalsMetric['rating'] {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Send metrics to analytics endpoint
export function sendToAnalytics(metric: WebVitalsMetric) {
  // Use navigator.sendBeacon if available for reliability
  const body = JSON.stringify(metric);
  
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body);
  } else {
    // Fallback to fetch
    fetch('/api/analytics/vitals', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(console.error);
  }
}

// Log to console in development
export function logMetric(metric: WebVitalsMetric) {
  const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
  console.log(
    `${emoji} ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`
  );
}

// Initialize web vitals tracking
export async function initWebVitals(callback: WebVitalsCallback) {
  try {
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
    
    const handleMetric = (metric: any) => {
      const vitalsMetric: WebVitalsMetric = {
        name: metric.name,
        value: metric.value,
        rating: getRating(metric.name, metric.value),
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType || 'navigate',
      };
      
      callback(vitalsMetric);
    };
    
    onCLS(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
    onINP(handleMetric);
  } catch (error) {
    console.error('Failed to load web-vitals:', error);
  }
}


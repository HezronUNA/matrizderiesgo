import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
      environment: process.env.SENTRY_ENVIRONMENT,
      integrations: [],
      // Performance monitoring
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
      // Session replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}

import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
      environment: process.env.SENTRY_ENVIRONMENT,
    });
  }
}

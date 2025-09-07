// next.config.js (CommonJS, como lo tenés)
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true, // útil para mejores stacktraces
};

module.exports = withSentryConfig(
  nextConfig,
  {
    org: "your-org-name",
    project: "cybersecurity-risk-dashboard",
    silent: true,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);

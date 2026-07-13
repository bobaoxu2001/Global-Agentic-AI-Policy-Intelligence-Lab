import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // BUILD_PROFILE is read server-side at build time (static shells).
  env: { BUILD_PROFILE: process.env.BUILD_PROFILE ?? 'production' },
  async redirects() {
    return [
      { source: '/calculator', destination: '/risk-score', permanent: true },
      { source: '/policies', destination: '/instruments', permanent: true },
      { source: '/brief', destination: '/executive-brief', permanent: true },
    ];
  },
};
export default nextConfig;

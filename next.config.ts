import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // BUILD_PROFILE is read server-side at build time (static shells).
  env: { BUILD_PROFILE: process.env.BUILD_PROFILE ?? 'production' },
};
export default nextConfig;

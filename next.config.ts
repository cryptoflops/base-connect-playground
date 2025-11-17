import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { turbo: false },
  webpack: (config) => {
    config.module.rules.push({
      test: /thread-stream\/test/,
      use: 'null-loader',
    });
    return config;
  }
};

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ignore optional deps from MetaMask SDK
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      "pino-pretty": false,
      "@react-native-async-storage/async-storage": false,
    };

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http:; object-src 'none'; base-uri 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
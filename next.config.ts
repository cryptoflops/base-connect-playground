// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    //
    // ⛔ Fix for Safe connector breaking Next.js (CJS require('viem'))
    //    We disable Safe modules entirely, because you do NOT use Safe.
    //
    config.resolve.alias["@safe-global/safe-apps-sdk"] = false;
config.resolve.alias["@safe-global/safe-apps-provider"] = false;
config.resolve.alias["@wagmi/connectors/safe"] = false;
config.resolve.alias["@metamask/sdk"] = false;
config.resolve.alias["pino-pretty"] = false;
    //
    // ⛔ Also disable the Safe connector inside wagmi/connectors
    //    so webpack never tries to include it.
    //
    config.resolve.alias["@wagmi/connectors/safe"] = false;

    return config;
  },
};

export default nextConfig;
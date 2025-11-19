// src/config/index.ts

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, base } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID missing in .env.local");
}

// 🔥 Final working version:
// Mutable array, satisfies type, no readonly issues
export const networks = [mainnet, base] as unknown as any[];

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false,
  networks,      // now correct type
  projectId,
});

// Export Wagmi config
export const config = wagmiAdapter.wagmiConfig;

// config/index.ts
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, base } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export const networks = [mainnet, base];

if (!projectId) throw new Error("Project ID is not defined");

// Set up the Wagmi Adapter (config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks,
  projectId,
});

// Export wagmi config (if you need it separately)
export const config = wagmiAdapter.wagmiConfig;

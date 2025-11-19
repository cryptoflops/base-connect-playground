// src/lib/wagmi.ts

import { http } from "wagmi";
import { mainnet, base } from "viem/chains";
import { injected } from "@wagmi/connectors";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Your WalletConnect / Reown projectId from env
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not set in .env.local");
}

// 1. Define the networks AppKit/Wagmi should support
//    IMPORTANT: this must be a mutable array, not a readonly tuple.
const networks = [mainnet, base]; // 👈 no `as const`

// 2. Define ONLY the connectors we want
//    -> Only injected(), no MetaMask SDK, no WalletConnect, no Safe, no Coinbase.
const connectors = [
  injected(),
];

// 3. Create WagmiAdapter with createConfig-style parameters
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks, // 👈 now a mutable array, matches expected type
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
  connectors,
});

// 4. Export wagmiConfig for <WagmiProvider> and hooks
export const wagmiConfig = wagmiAdapter.wagmiConfig;
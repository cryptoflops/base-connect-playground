import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from 'wagmi';
import { base, optimism, arbitrum, celo } from 'viem/chains';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [base, optimism, arbitrum, celo] as const;

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage as any,
  }),
  ssr: true,
  networks: [...networks],
  projectId,
});

export const config = wagmiAdapter.wagmiConfig;
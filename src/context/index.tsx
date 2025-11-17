'use client';

import { wagmiAdapter, projectId } from '../config';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, base } from '@reown/appkit/networks';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'base-connect-playground',
  description: 'Reown AppKit + Base + Builder contracts',
  url: 'https://example.com', // replace with your deployed domain later
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, base],
  metadata,
  features: {
    analytics: true,
    auth: {
      email: true,
      socials: ['google', 'x', 'farcaster', 'github'],
    },
    smartAccounts: {
      enable: true,
      sponsorGas: true,
    },
  },
  themeMode: 'dark'
});

type Props = {
  children: ReactNode;
  cookies: string | null;
};

function ContextProvider({ children, cookies }: Props) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;

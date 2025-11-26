'use client';

import React from 'react';
import { wagmiAdapter, projectId, networks } from '@/config';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'Base Connect Playground',
  description: 'Reown AppKit + Base + Multichain Builder Playground',
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://base-connect-playground.example',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [...networks],
  metadata,
  themeMode: 'dark',
  features: {
    analytics: true,
  },
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
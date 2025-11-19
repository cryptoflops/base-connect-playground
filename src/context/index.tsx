'use client';

import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { wagmiAdapter, projectId } from '@/config';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, base } from '@reown/appkit/networks';

// Initialize react-query client
const queryClient = new QueryClient();

const metadata = {
  name: 'Base Connect Playground',
  description: 'Reown AppKit + Base + Builder Contracts',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId!,
  networks: [mainnet, base],
  metadata,
  features: {
    analytics: true,
  },
  themeMode: 'dark',
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

'use client';

import { useEffect, useState } from 'react';

import { ContractCounter } from '@/components/ContractCounter';
import { ContractStorage } from '@/components/ContractStorage';
import { ContractFlag } from '@/components/ContractFlag';
import { ContractStorageLog } from '@/components/ContractStorageLog';
import { ContractTimestamp } from '@/components/ContractTimestamp';
import { ContractEventStream } from '@/components/ContractEventStream';
import { ContractScoreTracker } from '@/components/ContractScoreTracker';
import { PingAll } from '@/components/PingAll';
import { SupportBuilder } from '@/components/SupportBuilder';
import { LogPanel } from '@/components/LogPanel';

import AppKitButton from '@/components/AppKitButton';
import AppKitNetworkButton from '@/components/AppKitNetworkButton';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 bg-background selection:bg-primary selection:text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col space-y-6">
        
        {/* Header Section */}
        <header className="flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary" />
              Base Connect Playground
            </h1>
            <p className="mt-1 text-sm text-foreground/60">
              Test wallet connections and events on Base.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-4 mr-2 text-xs font-medium">
              <a href="https://docs.base.org" target="_blank" className="text-foreground/60 hover:text-foreground transition-colors">Base Docs →</a>
              <a href="https://github.com/base/account-sdk" target="_blank" className="text-foreground/60 hover:text-foreground transition-colors">SDK GitHub →</a>
            </div>
            <div className="flex items-center gap-2">
              <AppKitNetworkButton />
              <AppKitButton />
            </div>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start relative">
          
          {/* Action Column (Left) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col border border-border rounded-xl bg-background divide-y divide-border shadow-sm">
            
            <section className="p-6">
              <h2 className="action-group-label">Infrastructure</h2>
              <div className="mt-4">
                <PingAll />
              </div>
            </section>

            <section className="p-6">
              <h2 className="action-group-label">State Controls</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContractCounter />
                <ContractFlag />
              </div>
            </section>

            <section className="p-6">
              <h2 className="action-group-label">Storage & Events</h2>
              <div className="mt-4 flex flex-col gap-8">
                <ContractTimestamp />
                <ContractStorage />
                <ContractStorageLog />
                <ContractEventStream />
              </div>
            </section>

            <section className="p-6">
              <h2 className="action-group-label">Gamification</h2>
              <div className="mt-4">
                <ContractScoreTracker />
              </div>
            </section>

          </div>

          {/* State & Logs Column (Right) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky top-8">
            <div className="h-[500px] lg:h-[calc(100vh-160px)]">
              <LogPanel />
            </div>
            {/* <SupportBuilder /> => optionally added back if relevant, left aside to keep clean */}
          </div>

        </div>

        <footer className="text-center py-6 text-xs text-foreground/40">
          Test-only playground for Base-compatible wallets · Built with Next.js on Vercel
        </footer>
      </div>
    </main>
  );
}
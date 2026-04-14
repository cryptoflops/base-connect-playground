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
import { LogPanel } from '@/components/LogPanel';

import AppKitButton from '@/components/AppKitButton';
import AppKitNetworkButton from '@/components/AppKitNetworkButton';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/70 backdrop-blur-3xl flex justify-between items-center px-8 h-20 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-12">
          <span className="text-2xl font-black tracking-tighter text-on-surface uppercase">Playground</span>
          <div className="hidden md:flex items-center bg-surface-container-lowest p-1 rounded-full border border-outline-variant/15">
            <button className="px-4 py-1.5 rounded-full text-[0.875rem] font-bold bg-primary-container text-white flex items-center gap-2 transition-all">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff]"></span> Base
            </button>
            <button className="px-4 py-1.5 rounded-full text-[0.875rem] font-medium text-on-surface-variant hover:text-on-surface transition-colors">Celo</button>
            <button className="px-4 py-1.5 rounded-full text-[0.875rem] font-medium text-on-surface-variant hover:text-on-surface transition-colors">Optimism</button>
            <button className="px-4 py-1.5 rounded-full text-[0.875rem] font-medium text-on-surface-variant hover:text-on-surface transition-colors">Arbitrum</button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-8">
            <a className="text-on-surface border-b-2 border-primary-container pb-1 font-bold tracking-tight" href="#">Docs</a>
            <a className="text-[#C5C4DB] hover:text-on-surface transition-colors font-bold tracking-tight" href="#">Contracts</a>
            <a className="text-[#C5C4DB] hover:text-on-surface transition-colors font-bold tracking-tight" href="#">Security</a>
            <a className="text-[#C5C4DB] hover:text-on-surface transition-colors font-bold tracking-tight" href="#">Explorer</a>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <AppKitNetworkButton />
            <div className="scale-90 origin-right">
              <AppKitButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 min-h-screen flex">
        <section className="flex-1 px-8 pb-20 max-w-5xl">
          <div className="mb-16 mt-8 relative">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
            <h1 className="text-[3.5rem] font-bold tracking-tight leading-none mb-4">Base Network</h1>
            <p className="text-on-surface-variant text-[1.125rem] max-w-2xl leading-relaxed">
              A premium environment for multi-chain development. Execute cross-contract logic and manage state with millisecond precision.
            </p>
          </div>

          <div className="space-y-20">
            <div>
              <label className="text-[0.6875rem] tracking-[0.05em] uppercase text-on-surface-variant mb-6 block">Infrastructure</label>
              <PingAll />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ContractCounter />
              <ContractFlag />
            </div>

            <div>
              <label className="text-[0.6875rem] tracking-[0.05em] uppercase text-on-surface-variant mb-6 block">Storage & Events</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContractTimestamp />
                <ContractStorage />
                <ContractStorageLog />
                <ContractEventStream />
              </div>
            </div>

            <ContractScoreTracker />
          </div>

          <footer className="mt-32 pt-16 border-t border-outline-variant/15 flex justify-between items-center text-[0.6875rem] uppercase tracking-[0.05em]">
            <span className="text-on-surface-variant">© 2026 Multi-Chain Playground</span>
            <div className="flex gap-8">
              <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">Privacy</a>
              <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">Terms</a>
              <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">GitHub</a>
              <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">Status</a>
            </div>
          </footer>
        </section>

        <aside className="fixed right-0 top-20 flex flex-col h-[calc(100vh-80px)] border-l border-[#454558]/15 bg-surface-container-lowest w-80">
          <LogPanel />
        </aside>
      </main>

      <button className="fixed bottom-8 right-[340px] w-14 h-14 bg-primary-container text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </>
  );
}
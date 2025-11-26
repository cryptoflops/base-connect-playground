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

import AppKitButton from '@/components/AppKitButton';
import AppKitNetworkButton from '@/components/AppKitNetworkButton';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col space-y-8">
        {/* Header Section */}
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-base-blue/10 via-neon-purple/10 to-optimism-red/10 animate-pulse-slow" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="pill-label border-base-blue/30 text-base-blue bg-base-blue/10">
                  Base
                </span>
                <span className="pill-label border-optimism-red/30 text-optimism-red bg-optimism-red/10">
                  Optimism
                </span>
                <span className="pill-label border-celo-yellow/30 text-celo-yellow bg-celo-yellow/10">
                  Celo
                </span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 neon-text">
                Base Connect
              </h1>
              <p className="max-w-xl text-lg text-gray-400 font-light">
                Advanced multichain builder lab. Powered by <span className="text-white font-medium">Reown AppKit</span> & <span className="text-white font-medium">WalletConnect</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <AppKitNetworkButton />
              </div>
              <div className="p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <AppKitButton />
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Network Status Panel */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h2 className="text-xl font-bold text-white font-display">Network Status</h2>
              </div>
              <PingAll />
            </div>

            {/* Contracts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="tech-card group">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-neon-blue">
                  ↗
                </div>
                <ContractCounter />
              </div>
              <div className="tech-card group">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-neon-purple">
                  ↗
                </div>
                <ContractFlag />
              </div>
              <div className="tech-card">
                <ContractTimestamp />
              </div>
              <div className="tech-card">
                <ContractStorage />
              </div>
              <div className="tech-card md:col-span-2">
                <ContractStorageLog />
              </div>
              <div className="tech-card md:col-span-2">
                <ContractEventStream />
              </div>
              <div className="tech-card md:col-span-2">
                <ContractScoreTracker />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <SupportBuilder />

            {/* Quick Links Panel */}
            <div className="tech-card">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-celo-yellow">⚡</span> Quick Access
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Reown Documentation', url: 'https://docs.reown.com', icon: '📚' },
                  { name: 'Base Network', url: 'https://base.org', icon: '🔵' },
                  { name: 'WalletConnect GitHub', url: 'https://github.com/WalletConnect', icon: '💻' },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">{link.name}</span>
                      <span className="ml-auto text-gray-600 group-hover:text-white transition-colors">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
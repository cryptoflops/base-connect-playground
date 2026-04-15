'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAppKitNetwork } from '@reown/appkit/react';

import { ContractCounter } from '@/components/ContractCounter';
import { ContractStorage } from '@/components/ContractStorage';
import { ContractFlag } from '@/components/ContractFlag';
import { ContractStorageLog } from '@/components/ContractStorageLog';
import { ContractTimestamp } from '@/components/ContractTimestamp';
import { ContractEventStream } from '@/components/ContractEventStream';
import { ContractScoreTracker } from '@/components/ContractScoreTracker';
import { PingAll } from '@/components/PingAll';
import { LogPanel } from '@/components/LogPanel';
import { NetworkHero } from '@/components/NetworkHero';

import AppKitButton from '@/components/AppKitButton';
import AppKitNetworkButton from '@/components/AppKitNetworkButton';

import { networks } from '@/config';
import { chainThemes, defaultTheme } from '@/lib/themes';

const networkIcons: Record<number, string> = {
  8453: 'layers',
  42220: 'eco',
  10: 'rocket_launch',
  42161: 'account_tree'
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { caipNetwork, switchNetwork } = useAppKitNetwork();

  // Find active network cleanly, fallback to Base
  const activeNetworkId = caipNetwork?.id ? String(caipNetwork.id).split(':').pop() : undefined;
  const activeNet = networks.find(n => n.id.toString() === activeNetworkId) || networks[0];

  // Get the theme for the current chain
  const theme = useMemo(
    () => chainThemes[Number(activeNet.id)] || defaultTheme,
    [activeNet.id]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex flex-col font-sans" style={theme as React.CSSProperties}>
      
      {/* 1. Top Global Navigation */}
      <nav className="fixed top-0 w-full z-50 chain-bg border-b border-outline-variant/15 flex justify-between items-center px-8 h-16 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-12">
          <span className="text-xl font-black tracking-tighter text-on-surface uppercase font-['Inter']">Playground</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-8 text-sm">
            <a className="text-on-surface hover:accent-text border-b-2 border-transparent hover:accent-border pb-1 font-bold tracking-tight transition-colors" href="#">Docs</a>
            <a className="text-on-surface hover:accent-text border-b-2 border-transparent hover:accent-border pb-1 font-bold tracking-tight transition-colors" href="#">Contracts</a>
            <a className="text-on-surface hover:accent-text border-b-2 border-transparent hover:accent-border pb-1 font-bold tracking-tight transition-colors" href="#">Security</a>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <AppKitNetworkButton />
            <div className="scale-90 origin-right">
              <AppKitButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main App Container */}
      <div className="flex flex-1 pt-16 min-h-screen">
        
        {/* 2. Left Sidebar (Infrastructure Terminal) */}
        <aside className="fixed left-0 top-16 bottom-0 flex flex-col z-40 w-64 chain-surface-lowest border-r border-outline-variant/10">
          <div className="p-6 border-b border-outline-variant/10">
            <h2 className="text-white font-bold font-['Inter']">Infrastructure</h2>
            <p className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant opacity-70 mt-1">Active Terminal</p>
          </div>
          <nav className="flex-1 py-4">
            <div className="px-3 mb-2">
              <p className="px-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Mainnets</p>
              <div className="flex flex-col gap-1">
                {networks.map((net) => {
                  const isActive = activeNet.id === net.id;
                  const icon = networkIcons[net.id] || 'public';
                  
                  return (
                    <button
                      key={net.id}
                      onClick={() => switchNetwork(net as any)}
                      className={`flex items-center gap-3 px-3 py-3 w-full text-left transition-all duration-200 group rounded-md ${
                        isActive 
                          ? 'border-l-4 accent-border accent-bg accent-on-text font-bold' 
                          : 'text-on-surface-variant opacity-70 hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-xl ${isActive ? 'accent-text' : ''}`} style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>
                        {icon}
                      </span>
                      <span className="font-['Inter'] text-sm">{net.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
          
          <div className="mt-auto p-4 border-t border-outline-variant/10">
            <button className="w-full bg-surface-container-highest text-on-surface text-xs font-bold py-3 rounded-lg hover-accent-bg transition-all uppercase tracking-widest mb-4">
              View Scan
            </button>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 p-2 px-3 rounded text-on-surface-variant text-xs">
                 <div className="flex justify-between items-center w-full uppercase tracking-widest text-[10px]">
                   <span className="flex items-center gap-2 font-bold"><span className="material-symbols-outlined text-sm">sensors</span> Status</span>
                   <span className="accent-text font-bold">Online</span>
                 </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 3. Center Content Column */}
        <main className="ml-64 flex-1 flex flex-col p-8 md:p-12 overflow-y-auto custom-terminal-scrollbar h-[calc(100vh-64px)]">
          <div className="max-w-5xl mx-auto w-full">
            <NetworkHero networkId={Number(activeNet.id)} />

            {/* Bento Grid Interactive Modules */}
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12">
                <PingAll />
              </div>
              
              <div className="col-span-12 lg:col-span-8">
                <ContractCounter />
              </div>
              
              <div className="col-span-12 lg:col-span-4">
                <ContractFlag />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <ContractTimestamp />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <ContractStorage />
              </div>
              
              <div className="col-span-12 lg:col-span-4">
                <ContractStorageLog />
              </div>

              <div className="col-span-12 lg:col-span-8">
                <ContractScoreTracker />
              </div>
              
              <div className="col-span-12 lg:col-span-4">
                <ContractEventStream />
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-outline-variant/15 flex justify-between items-center text-[0.6875rem] uppercase tracking-[0.05em]">
              <span className="text-on-surface-variant">© 2026 Multi-Chain Playground</span>
              <div className="flex gap-8">
                <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">Privacy</a>
                <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">Terms</a>
                <a className="text-[#C5C4DB] hover:text-on-surface transition-colors" href="#">GitHub</a>
              </div>
            </footer>
          </div>
        </main>

        {/* 4. Right Sidebar (Terminal Logs) */}
        <aside className="fixed right-0 top-16 bottom-0 w-[400px] chain-surface-lowest border-l border-outline-variant/10 flex flex-col z-30">
          <LogPanel />
        </aside>
        
        {/* Helper spacer to allow center column to not underlap the right fixed sidebar */}
        <div className="w-[400px] shrink-0 hidden xl:block"></div>

      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-[430px] w-14 h-14 accent-bg accent-on-text rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
}
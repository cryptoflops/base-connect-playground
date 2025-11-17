// app/page.tsx
'use client';
import { ContractFlag } from "@/components/ContractFlag";
import { ContractStorageLog } from "@/components/ContractStorageLog";
import { useAccount } from 'wagmi';
import { ContractCounter } from '@/components/ContractCounter';
import { ContractStorage } from '@/components/ContractStorage';
import { ContractTimestamp } from '@/components/ContractTimestamp';
import { PingAll } from '@/components/PingAll';


export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen px-6 py-8 flex flex-col items-center gap-6 bg-black text-white">
      <header className="w-full max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Base Connect Playground</span>
          <span className="text-xs opacity-70">Reown AppKit + Builder</span>
        </div>
        {/* AppKit connect button (web component) */}
        <appkit-button />
      </header>

      <section className="w-full max-w-4xl space-y-4">
        {isConnected ? (
          <>
            <div className="border border-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Connected address</p>
                <p className="font-mono text-sm">
                  {address}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm opacity-70">Network</span>
                <appkit-network-button />
              </div>
            </div>
    
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <PingAll />
    
              <ContractCounter />
              <ContractStorage />
              <ContractTimestamp />
              <ContractFlag />
              <ContractStorageLog />
           </div>

          </>
        ) : (
          <div className="mt-10 text-center space-y-4">
            <p className="text-lg">
              Connect your wallet on <span className="font-semibold">Base</span> to start
              interacting with your verified contracts.
            </p>
            <div className="flex justify-center">
              <appkit-button />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

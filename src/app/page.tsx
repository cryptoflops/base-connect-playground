'use client';

export const dynamic = "force-dynamic";

import { useAccount } from 'wagmi';
import { ContractCounter } from '@/components/ContractCounter';

import AppKitButton from "@/components/AppKitButton";
import AppKitNetworkButton from "@/components/AppKitNetworkButton";

import { ContractStorage } from "@/components/ContractStorage";
import { ContractFlag } from "@/components/ContractFlag";
import { ContractStorageLog } from "@/components/ContractStorageLog";
import { ContractTimestamp } from "@/components/ContractTimestamp";
import { PingAll } from "@/components/PingAll";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 space-y-10">

      <header className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-tight">Base Connect Playground</h1>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <AppKitButton />
          <AppKitNetworkButton />
        </div>
      </header>

      <section className="w-full max-w-4xl space-y-6">
        <ContractCounter />
        <ContractStorage />
        <ContractFlag />
        <ContractStorageLog />
        <ContractTimestamp />
        <PingAll />
      </section>

    </main>
  );
}
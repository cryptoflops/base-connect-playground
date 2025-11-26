'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import {
  BUILDER_STORAGE_LOG_ADDRESS,
  BUILDER_STORAGE_LOG_ABI,
} from '@/lib/contracts';

export function ContractStorageLog() {
  const { isConnected } = useAccount();
  const [value, setValue] = useState('');
  const [lastTx, setLastTx] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleStore = async () => {
    if (!isConnected || !value.trim()) return;
    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: BUILDER_STORAGE_LOG_ADDRESS as `0x${string}`,
        abi: BUILDER_STORAGE_LOG_ABI,
        functionName: 'store',
        args: [value],
      });
      setLastTx(tx);
      setValue('');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-card border border-white/5 bg-[#050505] p-6 shadow-card transition">
      <h2 className="text-lg font-semibold text-offwhite">
        <span className="mr-2 text-burnt">◆</span>
        Storage + Indexed Log
      </h2>

      <p className="mt-1 text-sm text-offwhite/60">
        Store a text value & emit an indexed event. Useful for audits and analytics.
      </p>

      <div className="mt-5 space-y-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Log message…"
          className="w-full rounded-pill border border-white/10 bg-black/40 px-4 py-2 text-sm text-offwhite placeholder-offwhite/40 focus:border-burnt outline-none"
        />

        <button
          onClick={handleStore}
          disabled={!isConnected || isPending}
          className="w-full rounded-pill bg-burnt px-4 py-2 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Logging…' : 'Store & Emit'}
        </button>
      </div>

      {!isConnected && (
        <p className="mt-3 text-xs text-danger/80">
          Connect a wallet to store events.
        </p>
      )}

      {lastTx && (
        <div className="mt-5 rounded-card border border-white/10 bg-black/40 p-4 text-xs text-offwhite/80">
          <a
            href={`https://basescan.org/tx/${lastTx}`}
            target="_blank"
            className="underline decoration-burnt underline-offset-2 hover:text-burnt"
          >
            View transaction
          </a>
        </div>
      )}
    </div>
  );
}
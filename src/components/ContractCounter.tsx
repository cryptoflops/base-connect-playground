'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { BUILDER_COUNTER_ADDRESS, BUILDER_COUNTER_ABI } from '@/lib/contracts';

export function ContractCounter() {
  const { isConnected } = useAccount();

  const [lastTx, setLastTx] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleIncrement = async () => {
    if (!isConnected) return;

    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: BUILDER_COUNTER_ADDRESS as `0x${string}`,
        abi: BUILDER_COUNTER_ABI,
        functionName: 'inc',
      });
      setLastTx(tx);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-card border border-white/5 bg-[#050505] p-6 shadow-card transition">
      <h2 className="text-lg font-semibold text-offwhite">
        <span className="mr-2 text-burnt">◆</span>
        Counter
      </h2>

      <p className="mt-1 text-sm text-offwhite/60">
        Increment a simple counter onchain. Useful for tracking action frequency.
      </p>

      <button
        onClick={handleIncrement}
        disabled={!isConnected || isPending}
        className="mt-5 w-full rounded-pill bg-burnt px-4 py-2 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Incrementing…' : 'Increment Counter'}
      </button>

      {!isConnected && (
        <p className="mt-3 text-xs text-danger/80">Connect a wallet to increment.</p>
      )}

      {lastTx && (
        <div className="mt-5 rounded-card border border-white/10 bg-black/40 p-4 text-xs text-offwhite/80">
          <a
            href={`https://basescan.org/tx/${lastTx}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-burnt underline-offset-2 hover:text-burnt"
          >
            View transaction
          </a>
        </div>
      )}
    </div>
  );
}
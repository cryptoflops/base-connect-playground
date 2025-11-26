'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { BUILDER_FLAG_ADDRESS, BUILDER_FLAG_ABI } from '@/lib/contracts';

export function ContractFlag() {
  const { isConnected } = useAccount();

  const { data: flagValue } = useReadContract({
    address: BUILDER_FLAG_ADDRESS as `0x${string}`,
    abi: BUILDER_FLAG_ABI,
    functionName: 'flag',
  });

  const [lastTx, setLastTx] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleToggle = async () => {
    if (!isConnected) return;
    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: BUILDER_FLAG_ADDRESS as `0x${string}`,
        abi: BUILDER_FLAG_ABI,
        functionName: 'toggle',
      });
      setLastTx(tx);
    } finally {
      setIsPending(false);
    }
  };

  const display = flagValue ? 'On' : 'Off';

  return (
    <div className="rounded-card border border-white/5 bg-[#050505] p-6 shadow-card transition">
      <h2 className="text-lg font-semibold text-offwhite">
        <span className="mr-2 text-burnt">◆</span>
        Flag
      </h2>

      <p className="mt-1 text-sm text-offwhite/60">
        Toggle a simple onchain boolean. Useful for gating flows or marking state.
      </p>

      <div className="mt-5 flex items-center justify-between rounded-card border border-white/10 bg-black/40 px-4 py-3">
        <span className="text-sm text-offwhite/60">Current value</span>
        <span className="rounded-pill bg-[#181818] px-3 py-1 text-xs font-semibold text-offwhite">
          {display}
        </span>
      </div>

      <button
        onClick={handleToggle}
        disabled={!isConnected || isPending}
        className="mt-4 w-full rounded-pill bg-burnt px-4 py-2 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Toggling…' : 'Toggle Flag'}
      </button>

      {!isConnected && (
        <p className="mt-3 text-xs text-danger/80">Connect a wallet to toggle.</p>
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
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import {
  BUILDER_SCORE_TRACKER_ADDRESS,
  BUILDER_SCORE_TRACKER_ABI,
} from '@/lib/contracts';

export function ContractScoreTracker() {
  const { address, isConnected } = useAccount();

  const { data: score } = useReadContract({
    address: BUILDER_SCORE_TRACKER_ADDRESS as `0x${string}`,
    abi: BUILDER_SCORE_TRACKER_ABI,
    functionName: 'getScore',
    args: address ? [address] : undefined,
  });

  const [amount, setAmount] = useState('1');
  const [lastTx, setLastTx] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleIncrement = async () => {
    if (!isConnected) return;

    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return;

    setIsPending(true);

    try {
      const tx = await writeContractAsync({
        address: BUILDER_SCORE_TRACKER_ADDRESS as `0x${string}`,
        abi: BUILDER_SCORE_TRACKER_ABI,
        functionName: 'increment',
        args: [n],
      });
      setLastTx(tx);
    } finally {
      setIsPending(false);
    }
  };

  const displayScore = score ? score.toString() : '—';

  return (
    <div className="rounded-card border border-white/5 bg-[#050505] p-6 shadow-card transition">
      <h2 className="text-lg font-semibold text-offwhite">
        <span className="mr-2 text-burnt">◆</span>
        Score Tracker
      </h2>

      <p className="mt-1 text-sm text-offwhite/60">
        Increase your onchain builder score. Useful for gamification, leaderboards, and activity tracking.
      </p>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between rounded-card border border-white/10 bg-black/40 px-4 py-3">
          <span className="text-sm text-offwhite/60">Your score</span>
          <span className="font-mono text-offwhite">{displayScore}</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min={1}
            className="w-24 rounded-pill border border-white/10 bg-black/40 px-4 py-2 text-sm text-offwhite placeholder-offwhite/40 outline-none focus:border-burnt"
            placeholder="1"
          />

          <button
            onClick={handleIncrement}
            disabled={!isConnected || isPending}
            className="flex-1 rounded-pill bg-burnt px-4 py-2 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Updating…' : 'Increase Score'}
          </button>
        </div>
      </div>

      {!isConnected && (
        <p className="mt-3 text-xs text-danger/80">Connect a wallet to update your score.</p>
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
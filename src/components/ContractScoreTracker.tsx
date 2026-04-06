'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import {
  BUILDER_SCORE_TRACKER_ADDRESS,
  BUILDER_SCORE_TRACKER_ABI,
} from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractScoreTracker() {
  const { address, isConnected } = useAccount();

  const { data: score, refetch } = useReadContract({
    address: BUILDER_SCORE_TRACKER_ADDRESS as `0x${string}`,
    abi: BUILDER_SCORE_TRACKER_ABI,
    functionName: 'getScore',
    args: address ? [address] : undefined,
  });

  const [amount, setAmount] = useState('1');
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
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
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Score Incremented',
          message: `Increased score by ${n}`,
          txHash: tx
        }
      });
      // Refetch after tx to update local display
      refetch();
    } catch (err: any) {
       logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Score Increment Failed',
          message: err.message || String(err)
        }
      });
    } finally {
      setIsPending(false);
    }
  };

  const displayScore = score ? score.toString() : '—';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Score Tracker</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Increase your onchain builder score. Useful for gamification, leaderboards, and activity tracking.
      </p>

      <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 w-full sm:w-auto">
          <span className="text-xs text-foreground/60">Your score:</span>
          <span className="font-mono text-sm font-bold text-foreground">{displayScore}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min={1}
            className="input-field w-20"
            placeholder="1"
          />
          <button
            onClick={handleIncrement}
            disabled={!isConnected || isPending}
            className="button-primary flex-1 sm:flex-none whitespace-nowrap"
          >
            {isPending ? 'Updating...' : 'Increase Score'}
          </button>
        </div>
      </div>
    </div>
  );
}
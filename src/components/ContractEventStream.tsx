'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import {
  BUILDER_EVENT_STREAM_ADDRESS,
  BUILDER_EVENT_STREAM_ABI,
} from '@/lib/contracts';

export function ContractEventStream() {
  const { isConnected } = useAccount();

  const [message, setMessage] = useState('');
  const [lastTx, setLastTx] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSubmit = async () => {
    if (!isConnected || !message.trim()) return;

    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: BUILDER_EVENT_STREAM_ADDRESS as `0x${string}`,
        abi: BUILDER_EVENT_STREAM_ABI,
        functionName: 'push',
        args: [message],
      });

      setLastTx(tx);
      setMessage('');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-card border border-white/5 bg-[#050505] p-6 shadow-card transition">
      <h2 className="text-lg font-semibold text-offwhite">
        <span className="mr-2 text-burnt">◆</span>
        Event Stream
      </h2>

      <p className="mt-1 text-sm text-offwhite/60">
        Push human-readable messages into an onchain event stream. Useful for dashboards, audits,
        and multi-step flows.
      </p>

      <div className="mt-5 space-y-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message…"
          className="w-full rounded-pill border border-white/10 bg-black/40 px-4 py-2 text-sm text-offwhite placeholder-offwhite/40 focus:border-burnt outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={!isConnected || isPending}
          className="w-full rounded-pill bg-burnt px-4 py-2 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Submitting…' : 'Push Event'}
        </button>
      </div>

      {!isConnected && (
        <p className="mt-3 text-xs text-danger/80">Connect a wallet to submit events.</p>
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
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { BUILDER_TIMESTAMP_ADDRESS, BUILDER_TIMESTAMP_ABI } from '@/lib/contracts';

export function ContractTimestamp() {
  const { isConnected } = useAccount();

  const [lastTx, setLastTx] = useState<string | null>(null);
  const [localPing, setLocalPing] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handlePing = async () => {
    if (!isConnected) return;

    const stamp = new Date().toISOString();
    setLocalPing(stamp);
    setIsPending(true);

    try {
      const tx = await writeContractAsync({
        address: BUILDER_TIMESTAMP_ADDRESS as `0x${string}`,
        abi: BUILDER_TIMESTAMP_ABI,
        functionName: 'ping',
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
        Timestamp Ping
      </h2>

      <p className="mt-1 text-sm text-offwhite/60">
        Emit a timestamp event from your wallet. Useful for analytics or heartbeat signals.
      </p>

      <button
        onClick={handlePing}
        disabled={!isConnected || isPending}
        className="mt-5 w-full rounded-pill bg-burnt px-4 py-2 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Pinging…' : 'Send Ping'}
      </button>

      {!isConnected && (
        <p className="mt-3 text-xs text-danger/80">Connect a wallet to ping.</p>
      )}

      {localPing && (
        <p className="mt-4 text-xs text-offwhite/70">Last local ping: {localPing}</p>
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
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { BUILDER_TIMESTAMP_ADDRESS, BUILDER_TIMESTAMP_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractTimestamp() {
  const { isConnected } = useAccount();

  const [localPing, setLocalPing] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
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
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Timestamp Pinged',
          message: `Emitted ping with local time: ${stamp}`,
          txHash: tx
        }
      });
    } catch (err: any) {
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Ping Failed',
          message: err.message || String(err)
        }
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Timestamp Ping</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Emit a timestamp event from your wallet. Useful for analytics or heartbeat signals.
      </p>

      {localPing && (
        <div className="mt-2 flex items-center gap-4 justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
          <span className="text-xs text-foreground/60 whitespace-nowrap">Last local ping</span>
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-foreground truncate">
            {localPing}
          </span>
        </div>
      )}

      <div className="mt-2">
        <button
          onClick={handlePing}
          disabled={!isConnected || isPending}
          className="button-primary w-full"
        >
          {isPending ? 'Pinging...' : 'Send Ping'}
        </button>
      </div>
    </div>
  );
}
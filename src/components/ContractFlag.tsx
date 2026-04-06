'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { BUILDER_FLAG_ADDRESS, BUILDER_FLAG_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractFlag() {
  const { isConnected } = useAccount();

  const { data: flagValue } = useReadContract({
    address: BUILDER_FLAG_ADDRESS as `0x${string}`,
    abi: BUILDER_FLAG_ABI,
    functionName: 'flag',
  });

  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
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
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Flag Toggled',
          message: 'Execute toggle() on BuilderFlag contract',
          txHash: tx
        }
      });
    } catch (err: any) {
       logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Toggle Failed',
          message: err.message || String(err)
        }
      });
    } finally {
      setIsPending(false);
    }
  };

  const display = flagValue ? 'On' : 'Off';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Flag</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Toggle a simple onchain boolean.
      </p>

      <div className="mt-2 flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
        <span className="text-xs text-foreground/60">Current state</span>
        <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
          {display}
        </span>
      </div>

      <div className="mt-2">
        <button
          onClick={handleToggle}
          disabled={!isConnected || isPending}
          className="button-primary w-full"
        >
          {isPending ? 'Toggling...' : 'Toggle Flag'}
        </button>
      </div>
    </div>
  );
}
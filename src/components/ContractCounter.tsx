'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { BUILDER_COUNTER_ADDRESS, BUILDER_COUNTER_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractCounter() {
  const { isConnected } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const logDispatch = useLogDispatch();
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
      
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Counter Incremented',
          message: 'Execute inc() on BuilderCounter contract',
          txHash: tx
        }
      });
    } catch (err: any) {
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Increment Failed',
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
        <h3 className="text-sm font-semibold text-foreground">Counter</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Increment a simple counter onchain. Useful for tracking action frequency.
      </p>

      <div className="mt-2 flex items-center justify-between gap-4">
        <button
          onClick={handleIncrement}
          disabled={!isConnected || isPending}
          className="button-primary w-full"
        >
          {isPending ? 'Incrementing...' : 'Increment'}
        </button>
      </div>
    </div>
  );
}
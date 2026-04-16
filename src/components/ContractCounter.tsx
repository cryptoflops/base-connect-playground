'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { useBuilderAddresses, BUILDER_COUNTER_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractCounter() {
  const { isConnected } = useAccount();
  const { addresses } = useBuilderAddresses();
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
        address: addresses.counter as `0x${string}`,
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
    <div className="chain-surface-lowest p-8 rounded-xl border-l-2 accent-border h-full">
      <label className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant mb-4 block">State Controls</label>
      <h3 className="text-2xl font-bold mb-6">Counter</h3>
      <div className="flex items-center gap-6">
        <span className="text-4xl font-mono bg-surface-container px-6 py-2 rounded-lg">42</span>
        <button
          onClick={handleIncrement}
          disabled={!isConnected || isPending}
          className="flex-1 bg-surface-container-high py-4 rounded-lg font-bold hover:bg-on-surface-variant/20 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Incrementing...' : 'Increment'}
        </button>
      </div>
    </div>
  );
}
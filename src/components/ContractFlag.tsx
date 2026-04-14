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

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl border-l-2 border-primary-container h-full">
      <label className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant mb-4 block">State Controls</label>
      <h3 className="text-2xl font-bold mb-6">Flag</h3>
      <div className="flex items-center justify-between">
        <span className="text-on-surface-variant font-medium">Toggle Boolean State</span>
        <button
          onClick={handleToggle}
          disabled={!isConnected || isPending}
          className={`w-16 h-8 rounded-full relative p-1 transition-all disabled:opacity-50 ${flagValue ? 'bg-primary-container' : 'bg-surface-variant'}`}
        >
          <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${flagValue ? 'right-1' : 'left-1'}`}></span>
        </button>
      </div>
    </div>
  );
}
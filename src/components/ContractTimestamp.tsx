'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { useBuilderAddresses, BUILDER_TIMESTAMP_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractTimestamp() {
  const { isConnected } = useAccount();
  const { addresses } = useBuilderAddresses();

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
        address: addresses.timestamp as `0x${string}`,
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
    <div 
      onClick={handlePing}
      className={`bg-surface-container p-6 rounded-lg hover:bg-surface-container-high transition-all flex items-center justify-between ${isConnected && !isPending ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
    >
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined accent-text">schedule</span>
        <span className="font-bold">Timestamp Ping</span>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
    </div>
  );
}
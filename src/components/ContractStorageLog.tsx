'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import {
  BUILDER_STORAGE_LOG_ADDRESS,
  BUILDER_STORAGE_LOG_ABI,
} from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractStorageLog() {
  const { isConnected } = useAccount();
  const [value, setValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleStore = async () => {
    if (!isConnected || !value.trim()) return;
    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: BUILDER_STORAGE_LOG_ADDRESS as `0x${string}`,
        abi: BUILDER_STORAGE_LOG_ABI,
        functionName: 'store',
        args: [value],
      });
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Storage Logged',
          message: `Executed store() + event with value: "${value}"`,
          txHash: tx
        }
      });
      setValue('');
    } catch (err: any) {
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Storage Log Failed',
          message: err.message || String(err)
        }
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div 
      onClick={() => { setValue('Storage Log Test Payload'); handleStore(); }}
      className={`bg-surface-container p-6 rounded-lg hover:bg-surface-container-high transition-all flex items-center justify-between ${isConnected && !isPending ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
    >
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary-container">view_stream</span>
        <span className="font-bold">Storage + Indexed Log</span>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
    </div>
  );
}
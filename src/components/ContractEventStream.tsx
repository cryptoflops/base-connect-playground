'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { useBuilderAddresses, BUILDER_EVENT_STREAM_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractEventStream() {
  const { isConnected } = useAccount();
  const addresses = useBuilderAddresses();

  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSubmit = async () => {
    if (!isConnected || !message.trim()) return;

    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: addresses.eventStream as `0x${string}`,
        abi: BUILDER_EVENT_STREAM_ABI,
        functionName: 'push',
        args: [message],
      });

      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Event Stream Pushed',
          message: `Pushed string: "${message}"`,
          txHash: tx
        }
      });
      setMessage('');
    } catch (err: any) {
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Event Stream Failed',
          message: err.message || String(err)
        }
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div 
      onClick={() => { setMessage('Event Stream Payload'); handleSubmit(); }}
      className={`bg-surface-container p-6 rounded-lg hover:bg-surface-container-high transition-all flex items-center justify-between ${isConnected && !isPending ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
    >
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined accent-text">sensors</span>
        <span className="font-bold">Event Stream</span>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
    </div>
  );
}
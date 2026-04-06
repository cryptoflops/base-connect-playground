'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import {
  BUILDER_EVENT_STREAM_ADDRESS,
  BUILDER_EVENT_STREAM_ABI,
} from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractEventStream() {
  const { isConnected } = useAccount();

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
        address: BUILDER_EVENT_STREAM_ADDRESS as `0x${string}`,
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Event Stream</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Push human-readable messages into an onchain event stream. Useful for dashboards, audits, and multi-step flows.
      </p>

      <div className="mt-2 flex flex-col sm:flex-row gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="input-field flex-1"
        />

        <button
          onClick={handleSubmit}
          disabled={!isConnected || isPending || !message.trim()}
          className="button-primary whitespace-nowrap"
        >
          {isPending ? 'Submitting...' : 'Push Event'}
        </button>
      </div>
    </div>
  );
}
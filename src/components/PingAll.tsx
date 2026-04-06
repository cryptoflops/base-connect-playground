'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';

import {
  BUILDER_COUNTER_ADDRESS,
  BUILDER_COUNTER_ABI,
  BUILDER_FLAG_ADDRESS,
  BUILDER_FLAG_ABI,
  BUILDER_TIMESTAMP_ADDRESS,
  BUILDER_TIMESTAMP_ABI,
  BUILDER_STORAGE_ADDRESS,
  BUILDER_STORAGE_ABI,
  BUILDER_STORAGE_LOG_ADDRESS,
  BUILDER_STORAGE_LOG_ABI,
  BUILDER_EVENT_STREAM_ADDRESS,
  BUILDER_EVENT_STREAM_ABI,
  BUILDER_SCORE_TRACKER_ADDRESS,
  BUILDER_SCORE_TRACKER_ABI,
} from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function PingAll() {
  const { isConnected, address } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const run = async () => {
    if (!isConnected) return;

    setIsPending(true);

    try {
      const hashes = [];

      hashes.push(
        await writeContractAsync({
          address: BUILDER_COUNTER_ADDRESS as `0x${string}`,
          abi: BUILDER_COUNTER_ABI,
          functionName: 'inc',
        })
      );

      hashes.push(
        await writeContractAsync({
          address: BUILDER_FLAG_ADDRESS as `0x${string}`,
          abi: BUILDER_FLAG_ABI,
          functionName: 'toggle',
        })
      );

      hashes.push(
        await writeContractAsync({
          address: BUILDER_TIMESTAMP_ADDRESS as `0x${string}`,
          abi: BUILDER_TIMESTAMP_ABI,
          functionName: 'ping',
        })
      );

      hashes.push(
        await writeContractAsync({
          address: BUILDER_STORAGE_ADDRESS as `0x${string}`,
          abi: BUILDER_STORAGE_ABI,
          functionName: 'store',
          args: [`PingAll from ${address ?? 'Unknown'}`],
        })
      );

      hashes.push(
        await writeContractAsync({
          address: BUILDER_STORAGE_LOG_ADDRESS as `0x${string}`,
          abi: BUILDER_STORAGE_LOG_ABI,
          functionName: 'store',
          args: [`PingAll @ ${new Date().toISOString()}`],
        })
      );

      hashes.push(
        await writeContractAsync({
          address: BUILDER_EVENT_STREAM_ADDRESS as `0x${string}`,
          abi: BUILDER_EVENT_STREAM_ABI,
          functionName: 'push',
          args: ['PingAll multi-contract event'],
        })
      );

      hashes.push(
        await writeContractAsync({
          address: BUILDER_SCORE_TRACKER_ADDRESS as `0x${string}`,
          abi: BUILDER_SCORE_TRACKER_ABI,
          functionName: 'increment',
          args: [1],
        })
      );

      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Ping All Sequence Executed',
          message: `Successfully executed 7 contract interactions.`,
          txHash: hashes[hashes.length - 1] // just show last one as representative, or adjust LogPanel to handle multiple.
        }
      });
    } catch (err: any) {
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Ping All Failed',
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
        <h3 className="text-sm font-semibold text-foreground">Multi-Contract Orchestration (Sponsored)</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Run a complete sequence touching all 7 playground contracts.
      </p>

      <div className="mt-2 text-xs text-foreground/50 mb-2">
        Contracts: Counter, Flag, Timestamp, Storage, StorageLog, EventStream, ScoreTracker
      </div>

      <button
        onClick={run}
        disabled={!isConnected || isPending}
        className="button-primary w-full"
      >
        {isPending ? 'Executing full sequence...' : 'Run Ping All'}
      </button>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';

import {
  useBuilderAddresses,
  BUILDER_COUNTER_ABI,
  BUILDER_FLAG_ABI,
  BUILDER_TIMESTAMP_ABI,
  BUILDER_STORAGE_ABI,
  BUILDER_STORAGE_LOG_ABI,
  BUILDER_EVENT_STREAM_ABI,
  BUILDER_SCORE_TRACKER_ABI,
} from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function PingAll() {
  const { isConnected, address } = useAccount();
  const addresses = useBuilderAddresses();
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const run = async () => {
    if (!isConnected || !address) return;

    setIsPending(true);

    try {
      const hashes = [];
      const chainId = addresses === BUILDER_ADDRESSES[42220] ? 42220 : 8453;

      hashes.push(
        await writeContractAsync({
          address: addresses.counter as `0x${string}`,
          abi: BUILDER_COUNTER_ABI,
          functionName: 'inc',
          chainId,
        })
      );

      hashes.push(
        await writeContractAsync({
          address: addresses.flag as `0x${string}`,
          abi: BUILDER_FLAG_ABI,
          functionName: 'toggle',
          chainId,
        })
      );

      hashes.push(
        await writeContractAsync({
          address: addresses.timestamp as `0x${string}`,
          abi: BUILDER_TIMESTAMP_ABI,
          functionName: 'ping',
          chainId,
        })
      );

      hashes.push(
        await writeContractAsync({
          address: addresses.storage as `0x${string}`,
          abi: BUILDER_STORAGE_ABI,
          functionName: 'store',
          args: [`PingAll from ${address}`],
          chainId,
        })
      );

      hashes.push(
        await writeContractAsync({
          address: addresses.storageLog as `0x${string}`,
          abi: BUILDER_STORAGE_LOG_ABI,
          functionName: 'store',
          args: [`PingAll from ${address}`],
          chainId,
        })
      );

      hashes.push(
        await writeContractAsync({
          address: addresses.eventStream as `0x${string}`,
          abi: BUILDER_EVENT_STREAM_ABI,
          functionName: 'push',
          args: [`PingAll from ${address}`],
          chainId,
        })
      );

      hashes.push(
        await writeContractAsync({
          address: addresses.scoreTracker as `0x${string}`,
          abi: BUILDER_SCORE_TRACKER_ABI,
          functionName: 'increment',
          args: [BigInt(1)],
          chainId,
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
    <div className="bg-surface-container rounded-xl p-8 flex justify-between items-center group hover:bg-surface-container-high transition-colors">
      <div>
        <h3 className="text-xl font-bold mb-2">Multi-Contract Orchestration</h3>
        <p className="text-on-surface-variant">Sponsored execution for multi-chain ping relays.</p>
      </div>
      <button
        onClick={run}
        disabled={!isConnected || isPending}
        className="accent-bg accent-on-text px-8 py-4 rounded-lg font-bold flex items-center gap-3 hover:scale-[1.02] transition-transform disabled:opacity-50"
      >
        <span className="material-symbols-outlined">rocket_launch</span>
        {isPending ? 'Executing...' : 'Run Ping All'}
      </button>
    </div>
  );
}
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
  const { addresses, chainId } = useBuilderAddresses();
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
      const hashes: string[] = [];
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      // 1. Counter
      const h1 = await writeContractAsync({
        address: addresses.counter as `0x${string}`,
        abi: BUILDER_COUNTER_ABI,
        functionName: 'inc',
        chainId,
        gas: BigInt(150000),
      });
      hashes.push(h1);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 1/7', message: 'Counter increment sent.' } });
      await delay(2000);

      // 2. Flag
      const h2 = await writeContractAsync({
        address: addresses.flag as `0x${string}`,
        abi: BUILDER_FLAG_ABI,
        functionName: 'toggle',
        chainId,
        gas: BigInt(150000),
      });
      hashes.push(h2);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 2/7', message: 'Flag toggle sent.' } });
      await delay(2000);

      // 3. Timestamp
      const h3 = await writeContractAsync({
        address: addresses.timestamp as `0x${string}`,
        abi: BUILDER_TIMESTAMP_ABI,
        functionName: 'ping',
        chainId,
        gas: BigInt(150000),
      });
      hashes.push(h3);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 3/7', message: 'Timestamp ping sent.' } });
      await delay(2000);

      // 4. Storage
      const h4 = await writeContractAsync({
        address: addresses.storage as `0x${string}`,
        abi: BUILDER_STORAGE_ABI,
        functionName: 'store',
        args: [`PingAll from ${address}`],
        chainId,
        gas: BigInt(200000),
      });
      hashes.push(h4);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 4/7', message: 'Storage update sent.' } });
      await delay(2000);

      // 5. Storage Log
      const h5 = await writeContractAsync({
        address: addresses.storageLog as `0x${string}`,
        abi: BUILDER_STORAGE_LOG_ABI,
        functionName: 'store',
        args: [`PingAll from ${address}`],
        chainId,
        gas: BigInt(200000),
      });
      hashes.push(h5);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 5/7', message: 'Storage log sent.' } });
      await delay(2000);

      // 6. Event Stream
      const h6 = await writeContractAsync({
        address: addresses.eventStream as `0x${string}`,
        abi: BUILDER_EVENT_STREAM_ABI,
        functionName: 'push',
        args: [`PingAll from ${address}`],
        chainId,
        gas: BigInt(150000),
      });
      hashes.push(h6);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 6/7', message: 'Event stream pushed.' } });
      await delay(2000);

      // 7. Score Tracker
      const h7 = await writeContractAsync({
        address: addresses.scoreTracker as `0x${string}`,
        abi: BUILDER_SCORE_TRACKER_ABI,
        functionName: 'increment',
        args: [BigInt(1)],
        chainId,
        gas: BigInt(150000),
      });
      hashes.push(h7);
      logDispatch({ type: 'ADD_LOG', payload: { type: 'info', title: 'Transaction 7/7', message: 'Score incremented.' } });

      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Ping All Sequence Completed',
          message: `Successfully sent 7 contract interactions. Check your wallet/explorer for final status.`,
          txHash: h7
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
    <div className="bg-surface-container rounded-xl p-8 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-start md:items-center group hover:bg-surface-container-high transition-colors">
      <div>
        <h3 className="text-xl font-bold mb-2">Multi-Contract Orchestration</h3>
        <p className="text-on-surface-variant">Sponsored execution for multi-chain ping relays.</p>
      </div>
      <button
        onClick={run}
        disabled={!isConnected || isPending}
        className="w-full md:w-auto accent-bg accent-on-text px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform disabled:opacity-50"
      >
        <span className="material-symbols-outlined">rocket_launch</span>
        {isPending ? 'Processing...' : 'Run Ping All'}
      </button>
    </div>
  );
}
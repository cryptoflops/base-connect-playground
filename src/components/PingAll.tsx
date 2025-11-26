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

export function PingAll() {
  const { isConnected, address } = useAccount();
  const [txHashes, setTxHashes] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const run = async () => {
    if (!isConnected) return;

    const hashes: string[] = [];
    setIsPending(true);

    try {
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

      setTxHashes(hashes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-card border border-white/5 bg-[#050505] p-8 shadow-card transition">
      <div className="space-y-5">
        <div className="space-y-2">
          <span className="rounded-pill bg-[#111111] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-offwhite/80">
            Multi-Contract Orchestration
          </span>

          <h2 className="text-2xl font-semibold tracking-tight text-offwhite">
            Sponsored Ping All
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-offwhite/60">
            Run a complete multi-contract sequence in one click. This touches all Builder contracts:
            Counter, Flag, Timestamp, Storage, StorageLog, EventStream, and ScoreTracker. Ideal for
            demos, stress tests, dashboards, and tracking flows.
          </p>
        </div>

        <button
          onClick={run}
          disabled={!isConnected || isPending}
          className="w-full rounded-pill bg-burnt px-6 py-3 text-sm font-medium text-pitch transition hover:bg-danger disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Executing flow…' : 'Run Ping All'}
        </button>

        {!isConnected && (
          <p className="text-xs text-danger/80">Connect a wallet to execute the flow.</p>
        )}

        {txHashes.length > 0 && (
          <div className="rounded-card border border-white/10 bg-black/40 p-4 text-xs text-offwhite/80">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-offwhite/60">
              Recent transactions
            </p>

            <div className="space-y-1">
              {txHashes.map((tx, index) => (
                <p key={tx}>
                  {index + 1}.{' '}
                  <a
                    href={`https://basescan.org/tx/${tx}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-burnt underline-offset-2 hover:text-burnt"
                  >
                    View #{index + 1} on BaseScan
                  </a>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
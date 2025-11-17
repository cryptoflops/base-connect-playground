'use client';

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
  BUILDER_STORAGE_LOG_ABI
} from '@/lib/contracts';
import { useState } from 'react';

export function PingAll() {
  const { isConnected, address } = useAccount();
  const [txHashes, setTxHashes] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const handlePingAll = async () => {
    if (!isConnected) return;

    setIsPending(true);
    const newHashes: string[] = [];

    try {
      // 1. Counter: inc()
      const tx1 = await writeContractAsync({
        address: BUILDER_COUNTER_ADDRESS as `0x${string}`,
        abi: BUILDER_COUNTER_ABI,
        functionName: 'inc'
      });
      newHashes.push(tx1);

      // 2. Flag: toggle()
      const tx2 = await writeContractAsync({
        address: BUILDER_FLAG_ADDRESS as `0x${string}`,
        abi: BUILDER_FLAG_ABI,
        functionName: 'toggle'
      });
      newHashes.push(tx2);

      // 3. Timestamp: ping()
      const tx3 = await writeContractAsync({
        address: BUILDER_TIMESTAMP_ADDRESS as `0x${string}`,
        abi: BUILDER_TIMESTAMP_ABI,
        functionName: 'ping'
      });
      newHashes.push(tx3);

      // 4. StorageLog: store("PingAll <timestamp>")
      const tx4 = await writeContractAsync({
        address: BUILDER_STORAGE_LOG_ADDRESS as `0x${string}`,
        abi: BUILDER_STORAGE_LOG_ABI,
        functionName: 'store',
        args: [`PingAll triggered at ${Date.now()}`]
      });
      newHashes.push(tx4);

      // 5. Storage: store("PingAll from smart account")
      const tx5 = await writeContractAsync({
        address: BUILDER_STORAGE_ADDRESS as `0x${string}`,
        abi: BUILDER_STORAGE_ABI,
        functionName: 'store',
        args: [`PingAll from ${address}`]
      });
      newHashes.push(tx5);

      setTxHashes(newHashes);
    } catch (error) {
      console.error('PingAll failed', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-xl">🚀 Sponsored Ping All</h3>
      <p className="text-gray-400 text-sm">
        Executes all 5 verified contract actions as a single sponsored flow (no gas needed).
      </p>

      <button
        onClick={handlePingAll}
        disabled={!isConnected || isPending}
        className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white disabled:opacity-50"
      >
        {isPending ? 'Executing...' : 'Run Ping All'}
      </button>

      {txHashes.length > 0 && (
        <div className="space-y-1 text-sm">
          <p className="font-semibold mt-3">Submitted Transactions:</p>
          {txHashes.map((tx, i) => (
            <p key={i}>
              {i + 1}.{' '}
              <a
                href={`https://basescan.org/tx/${tx}`}
                target="_blank"
                className="underline text-blue-300"
              >
                View #{i + 1} on BaseScan
              </a>
            </p>
          ))}
        </div>
      )}

      {!isConnected && (
        <p className="text-xs text-red-400">
          Connect wallet first (email/social login recommended).
        </p>
      )}
    </div>
  );
}

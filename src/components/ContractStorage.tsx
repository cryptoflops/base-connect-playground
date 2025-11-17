// components/ContractStorage.tsx
'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import {
  BUILDER_STORAGE_ADDRESS,
  BUILDER_STORAGE_ABI,
} from '../lib/contracts';

export function ContractStorage() {
  const { address, isConnected } = useAccount();

  const [value, setValue] = useState('');
  const { data: stored, refetch } = useReadContract({
    address: BUILDER_STORAGE_ADDRESS as `0x${string}`,
    abi: BUILDER_STORAGE_ABI,
    functionName: 'data',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    query: { enabled: !!address },
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();

  const handleStore = async () => {
    if (!isConnected || !value.trim()) return;
    await writeContract({
      address: BUILDER_STORAGE_ADDRESS as `0x${string}`,
      abi: BUILDER_STORAGE_ABI,
      functionName: 'store',
      args: [value],
    });
    setValue('');
    setTimeout(() => {
      refetch();
    }, 5000);
  };

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-lg">BuilderStorage</h3>
      <p className="text-sm text-gray-500">
        Address: {BUILDER_STORAGE_ADDRESS}
      </p>

      <p className="mt-2 text-sm">
        Your stored value:{' '}
        <span className="font-mono">
          {stored ? String(stored) : '(none yet)'}
        </span>
      </p>

      <div className="mt-2 flex flex-col gap-2">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="New value (e.g. WCT week 2)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={handleStore}
          disabled={!isConnected || isPending || !value.trim()}
          className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
        >
          {isPending ? 'Sending…' : 'Store value'}
        </button>
      </div>

      {txHash && (
        <p className="mt-2 text-sm">
          Tx:{' '}
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-500"
          >
            View on BaseScan
          </a>
        </p>
      )}

      {!isConnected && (
        <p className="mt-2 text-xs text-red-500">
          Connect your wallet first (appkit button).
        </p>
      )}
    </div>
  );
}

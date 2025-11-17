// components/ContractCounter.tsx
'use client';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import {
  BUILDER_COUNTER_ADDRESS,
  BUILDER_COUNTER_ABI,
} from '../lib/contracts';

export function ContractCounter() {
  const { address, isConnected } = useAccount();

  const { data: count, refetch } = useReadContract({
    address: BUILDER_COUNTER_ADDRESS as `0x${string}`,
    abi: BUILDER_COUNTER_ABI,
    functionName: 'count',
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();

  const handleIncrement = async () => {
    if (!isConnected) return;
    await writeContract({
      address: BUILDER_COUNTER_ADDRESS as `0x${string}`,
      abi: BUILDER_COUNTER_ABI,
      functionName: 'inc',
    });
    // simple refresh after tx
    setTimeout(() => {
      refetch();
    }, 5000);
  };

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-lg">BuilderCounter</h3>
      <p className="text-sm text-gray-500">
        Address: {BUILDER_COUNTER_ADDRESS}
      </p>

      <p className="mt-2">
        Current count:{' '}
        <span className="font-mono">
          {count !== undefined ? count.toString() : '…'}
        </span>
      </p>

      <button
        onClick={handleIncrement}
        disabled={!isConnected || isPending}
        className="mt-3 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {isPending ? 'Sending…' : 'Increment'}
      </button>

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

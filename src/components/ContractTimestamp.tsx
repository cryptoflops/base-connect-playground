'use client';

import { useAccount, useWriteContract } from 'wagmi';
import {
  BUILDER_TIMESTAMP_ADDRESS,
  BUILDER_TIMESTAMP_ABI
} from '@/lib/contracts';

export function ContractTimestamp() {
  const { address, isConnected } = useAccount();

  const {
    writeContract,
    data: txHash,
    isPending,
  } = useWriteContract();

  async function handlePing() {
    await writeContract({
      address: BUILDER_TIMESTAMP_ADDRESS as `0x${string}`,
      abi: BUILDER_TIMESTAMP_ABI,
      functionName: 'ping',
    });
  }

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-lg">BuilderTimestamp</h3>
      <p className="text-sm text-gray-500">
        Address: {BUILDER_TIMESTAMP_ADDRESS}
      </p>

      <button
        onClick={handlePing}
        disabled={!isConnected || isPending}
        className="mt-3 px-4 py-2 rounded bg-purple-600 text-white disabled:opacity-50"
      >
        {isPending ? 'Sending…' : 'Ping (emit timestamp)'}
      </button>

      {txHash && (
        <p className="mt-2 text-sm">
          Tx:{' '}
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            className="underline text-purple-400"
          >
            View on BaseScan
          </a>
        </p>
      )}

      {!isConnected && (
        <p className="mt-2 text-xs text-red-500">
          Connect wallet first.
        </p>
      )}
    </div>
  );
}

'use client';

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {
  BUILDER_FLAG_ADDRESS,
  BUILDER_FLAG_ABI
} from "@/lib/contracts";

export function ContractFlag() {
  const { isConnected } = useAccount();

  const { data: flag, refetch } = useReadContract({
    address: BUILDER_FLAG_ADDRESS as `0x${string}`,
    abi: BUILDER_FLAG_ABI,
    functionName: "flag"
  });

  const {
    writeContract,
    data: txHash,
    isPending
  } = useWriteContract();

  async function handleToggle() {
    await writeContract({
      address: BUILDER_FLAG_ADDRESS as `0x${string}`,
      abi: BUILDER_FLAG_ABI,
      functionName: "toggle"
    });

    setTimeout(() => refetch(), 4000);
  }

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-lg">BuilderFlag</h3>
      <p className="text-sm text-gray-500">{BUILDER_FLAG_ADDRESS}</p>

      <p className="text-sm">
        Current flag value:{" "}
        <span className="font-mono">{flag?.toString()}</span>
      </p>

      <button
        onClick={handleToggle}
        disabled={!isConnected || isPending}
        className="px-4 py-2 rounded bg-red-500 text-white disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Toggle Flag"}
      </button>

      {txHash && (
        <p className="mt-2 text-sm">
          Tx:{" "}
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            className="underline text-red-300"
          >
            View on BaseScan
          </a>
        </p>
      )}
    </div>
  );
}

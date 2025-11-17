'use client';

import { useState } from "react";
import {
  useAccount,
  useWriteContract
} from "wagmi";

import {
  BUILDER_STORAGE_LOG_ADDRESS,
  BUILDER_STORAGE_LOG_ABI
} from "@/lib/contracts";

export function ContractStorageLog() {
  const { isConnected } = useAccount();
  const [value, setValue] = useState("");

  const {
    writeContract,
    data: txHash,
    isPending
  } = useWriteContract();

  async function handleStore() {
    if (!value.trim()) return;

    await writeContract({
      address: BUILDER_STORAGE_LOG_ADDRESS as `0x${string}`,
      abi: BUILDER_STORAGE_LOG_ABI,
      functionName: "store",
      args: [value]
    });

    setValue("");
  }

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-lg">BuilderStorageLog</h3>
      <p className="text-sm text-gray-500">{BUILDER_STORAGE_LOG_ADDRESS}</p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter log text..."
        className="border rounded px-2 py-1 w-full text-black"
      />

      <button
        onClick={handleStore}
        disabled={!isConnected || isPending || !value.trim()}
        className="px-4 py-2 rounded bg-yellow-500 text-white disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Store Log"}
      </button>

      {txHash && (
        <p className="mt-2 text-sm">
          Tx{" "}
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            className="underline text-yellow-400"
          >
            View on BaseScan
          </a>
        </p>
      )}
    </div>
  );
}

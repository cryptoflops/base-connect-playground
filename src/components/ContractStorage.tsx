'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { BUILDER_STORAGE_ADDRESS, BUILDER_STORAGE_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractStorage() {
  const { isConnected } = useAccount();
  const [value, setValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleStore = async () => {
    if (!isConnected || !value.trim()) return;
    setIsPending(true);
    try {
      const tx = await writeContractAsync({
        address: BUILDER_STORAGE_ADDRESS as `0x${string}`,
        abi: BUILDER_STORAGE_ABI,
        functionName: 'store',
        args: [value],
      });
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Value Stored',
          message: `Executed store() with value: "${value}"`,
          txHash: tx
        }
      });
      setValue('');
    } catch (err: any) {
       logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Store Failed',
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
        <h3 className="text-sm font-semibold text-foreground">Storage</h3>
      </div>
      <p className="text-sm text-foreground/50">
        Store a text value onchain. Useful for creating verifiable user actions.
      </p>

      <div className="mt-2 flex flex-col sm:flex-row gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Text to store..."
          className="input-field flex-1"
        />

        <button
          onClick={handleStore}
          disabled={!isConnected || isPending || !value.trim()}
          className="button-primary whitespace-nowrap"
        >
          {isPending ? 'Storing...' : 'Store Value'}
        </button>
      </div>
    </div>
  );
}
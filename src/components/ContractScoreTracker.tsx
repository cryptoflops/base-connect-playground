'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useBuilderAddresses, BUILDER_SCORE_TRACKER_ABI } from '@/lib/contracts';
import { useLogDispatch } from '@/context/LogContext';

export function ContractScoreTracker() {
  const { address, isConnected } = useAccount();
  const addresses = useBuilderAddresses();

  const { data: score, refetch } = useReadContract({
    address: addresses.scoreTracker as `0x${string}`,
    abi: BUILDER_SCORE_TRACKER_ABI,
    functionName: 'getScore',
    args: address ? [address] : undefined,
  });

  const [amount, setAmount] = useState('1');
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  const logDispatch = useLogDispatch();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleIncrement = async () => {
    if (!isConnected) return;

    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return;

    setIsPending(true);

    try {
      const tx = await writeContractAsync({
        address: addresses.scoreTracker as `0x${string}`,
        abi: BUILDER_SCORE_TRACKER_ABI,
        functionName: 'increment',
        args: [BigInt(10)],
      });
      logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'tx',
          title: 'Score Incremented',
          message: `Increased score by ${n}`,
          txHash: tx
        }
      });
      // Refetch after tx to update local display
      refetch();
    } catch (err: any) {
       logDispatch({
        type: 'ADD_LOG',
        payload: {
          type: 'error',
          title: 'Score Increment Failed',
          message: err.message || String(err)
        }
      });
    } finally {
      setIsPending(false);
    }
  };

  const displayScore = score ? score.toString() : '—';

  return (
    <div className="bg-surface-container rounded-2xl overflow-hidden relative group">
      <img 
        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" 
        alt="abstract digital waves" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuALB0h2M6zRId6aZDz1sYIx9SYdsipcI6dDS7XNVOZR9ZuhKJxyT3g02X7X7ZvjqWigbVBTRkc_bDSW34glXbmRBZ_cVeIguMvGPul84kbEyiUuhwmkUpaZVm-wS0o9ApusuiCJ1lsaalpwOP90jLE6f02W48tUGNHDSAF181A_IOT7zVBkOFK2jTDm_Ggpw3MoJiWD2TJDBUX_CZ5vUcKnR1vMTMLcOspguf_M-kqBPBGuWJ8Qfeb78jkpmSk5MoZI4rDvwUpA1do" 
      />
      <div className="relative p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <label className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary mb-4 block">Gamification</label>
          <h2 className="text-4xl font-bold mb-2">Score Tracker</h2>
          <p className="text-on-surface-variant max-w-md">Global chain leaderboard integration. Secure your rank on the decentralized ledger.</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-5xl font-black text-white mb-4">{displayScore} pts</span>
          <button 
            onClick={() => handleIncrement()}
            disabled={!isConnected || isPending}
            className="bg-white text-black px-10 py-3 rounded-full font-bold hover:scale-[1.05] transition-transform disabled:opacity-50"
          >
            {isPending ? 'Updating...' : 'Update Score'}
          </button>
        </div>
      </div>
    </div>
  );
}
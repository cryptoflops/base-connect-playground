'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { chainThemes } from '@/lib/themes';
import { CELO_APP_ADDRESSES, CUSD_ADDRESS } from '@/lib/celoContracts';
import VAULT_ABI from '@/abi/CeloSaverVault.json';
import ERC20_ABI from '@/abi/ERC20.json';
import AppKitButton from '@/components/AppKitButton';

const celoTheme = chainThemes[42220];

const PRESET_AMOUNTS = ['0.1', '0.5', '1', '5'];

export default function CeloSaverPage() {
  const [mounted, setMounted] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [txStatus, setTxStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);

  // Read user data from vault
  const { data: userData, refetch: refetchUser } = useReadContract({
    address: CELO_APP_ADDRESSES.celoSaverVault,
    abi: VAULT_ABI,
    functionName: 'users',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Read cUSD balance
  const { data: cusdBalance, refetch: refetchBalance } = useReadContract({
    address: CUSD_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const vaultBalance = userData ? formatUnits((userData as any[])[0] as bigint, 18) : '0';
  const streak = userData ? Number((userData as any[])[1]) : 0;
  const walletBalance = cusdBalance ? formatUnits(cusdBalance as bigint, 18) : '0';

  const handleDeposit = async () => {
    if (!depositAmount || !isConnected) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      const amount = parseUnits(depositAmount, 18);
      // Approve first
      await writeContractAsync({
        address: CUSD_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CELO_APP_ADDRESSES.celoSaverVault, amount],
      });
      // Then deposit
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.celoSaverVault,
        abi: VAULT_ABI,
        functionName: 'deposit',
        args: [amount],
      });
      setTxStatus({ type: 'success', message: `Saved ${depositAmount} cUSD!` });
      setDepositAmount('');
      refetchUser();
      refetchBalance();
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !isConnected) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      const amount = parseUnits(withdrawAmount, 18);
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.celoSaverVault,
        abi: VAULT_ABI,
        functionName: 'withdraw',
        args: [amount],
      });
      setTxStatus({ type: 'success', message: `Withdrew ${withdrawAmount} cUSD` });
      setWithdrawAmount('');
      refetchUser();
      refetchBalance();
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full font-sans selection:bg-[#FCFF52] selection:text-black" style={celoTheme as React.CSSProperties}>
      <div className="min-h-screen chain-bg relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FCFF52]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FCFF52]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-4 lg:px-8 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FCFF52] flex items-center justify-center">
              <span className="material-symbols-outlined text-black text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">CeloSaver</span>
          </div>
          <AppKitButton />
        </nav>

        <main className="max-w-xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCFF52]/10 border border-[#FCFF52]/20 text-[#FCFF52] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCFF52] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCFF52]"></span>
              </span>
              Proof-of-Ship Edition
            </div>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              <span className="text-white">SAVE</span><br/>
              <span className="text-[#FCFF52]">DAILY.</span>
            </h1>
            <p className="text-base text-gray-400 font-medium leading-relaxed">
              Habit-forming micro-savings on Celo. Maintain your streak and unlock prosperity milestones.
            </p>
          </div>

          {!isConnected ? (
            <div className="text-center py-16">
              <div className="glass-panel p-12 rounded-[2rem] flex flex-col items-center gap-8 shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-[#FCFF52]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Wallet Required</h2>
                  <p className="text-gray-400 text-sm">Connect your MiniPay or browser wallet to begin.</p>
                </div>
                <AppKitButton />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Stats Card */}
              <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCFF52]/5 blur-3xl rounded-full" />
                
                <div className="flex flex-col items-center text-center">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Total Savings</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-6xl font-black text-white tracking-tighter font-mono">{Number(vaultBalance).toFixed(2)}</span>
                    <span className="text-xl font-bold text-[#FCFF52]">cUSD</span>
                  </div>
                  <div className="h-1 w-12 bg-[#FCFF52] rounded-full opacity-50 mb-8" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                    <p className="text-[0.55rem] uppercase tracking-widest text-gray-500 mb-1">Current Streak</p>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#FCFF52] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      <p className="text-xl font-bold text-white font-mono">{streak} Days</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                    <p className="text-[0.55rem] uppercase tracking-widest text-gray-500 mb-1">Available</p>
                    <p className="text-xl font-bold text-white font-mono">{Number(walletBalance).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Streak Visualizer */}
              <div className="glass-panel p-6 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6 px-2">
                  <p className="text-[0.65rem] uppercase tracking-widest text-gray-400 font-bold">7-Day Habit Tracker</p>
                  <span className="text-[0.6rem] text-[#FCFF52] font-black uppercase tracking-tighter bg-[#FCFF52]/10 px-2 py-1 rounded">Next Bonus: Day 7</span>
                </div>
                <div className="flex justify-between gap-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                    const isCompleted = day <= streak;
                    const isCurrent = day === streak + 1;
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-gradient-to-br from-[#FCFF52] to-[#FFD700] shadow-[0_0_20px_rgba(252,255,82,0.3)] scale-105' 
                            : isCurrent
                            ? 'bg-white/10 border border-[#FCFF52]/30 animate-pulse'
                            : 'bg-white/5 border border-white/5 opacity-40'
                        }`}>
                          <span className={`${isCompleted ? 'text-black' : 'text-white/20'} font-black text-xs`}>
                            {isCompleted ? '✓' : day}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Deposit Interface */}
              <div className="glass-panel p-2 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
                <div className="p-6">
                  <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-3 px-2">
                    <div className="w-6 h-6 rounded-md bg-[#FCFF52]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[1rem] text-[#FCFF52]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                    </div>
                    Automated Habit Savings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setDepositAmount(amt)}
                          className={`py-3 rounded-xl text-xs font-black transition-all ${
                            depositAmount === amt
                              ? 'bg-[#FCFF52] text-black shadow-lg shadow-[#FCFF52]/20 translate-y-[-2px]'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>

                    <div className="relative group">
                      <input
                        type="number"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-mono text-white placeholder-gray-700 focus:outline-none focus:border-[#FCFF52]/50 transition-all"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm tracking-widest">cUSD</span>
                    </div>

                    <button
                      onClick={handleDeposit}
                      disabled={isPending || !depositAmount}
                      className="w-full bg-white text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 disabled:opacity-20 disabled:grayscale transition-all shadow-xl active:scale-95"
                    >
                      {isPending ? 'Propagating...' : 'Confirm Deposit'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setWithdrawAmount(vaultBalance)}
                  className="flex-1 glass-panel py-4 rounded-2xl text-xs font-bold text-gray-400 hover:text-white transition-all border border-white/5"
                >
                  Withdraw All
                </button>
                <div className="flex-[2] relative">
                  <input
                    type="number"
                    placeholder="Withdraw amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full h-full bg-white/5 border border-white/5 rounded-2xl px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-white/20"
                  />
                  <button
                    onClick={handleWithdraw}
                    disabled={isPending || !withdrawAmount}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-white/10 rounded-xl text-[0.6rem] font-bold text-white hover:bg-white/20 transition-all uppercase tracking-tighter"
                  >
                    Go
                  </button>
                </div>
              </div>

              {/* Status Toast */}
              {txStatus && (
                <div className={`p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  txStatus.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  <span className="material-symbols-outlined text-xl">
                    {txStatus.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <p className="text-xs font-bold">{txStatus.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-24 pt-12 border-t border-white/5 text-center space-y-4">
            <div className="flex justify-center gap-6">
              <div className="flex flex-col items-center gap-1 opacity-40">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                <span className="text-[0.5rem] uppercase tracking-tighter">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-40">
                <span className="material-symbols-outlined text-xl">speed</span>
                <span className="text-[0.5rem] uppercase tracking-tighter">Instant</span>
              </div>
            </div>
            <p className="text-[0.6rem] text-gray-600 font-bold uppercase tracking-[0.25em]">
              Celo &middot; MiniPay &middot; Stability
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

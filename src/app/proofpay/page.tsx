'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { chainThemes } from '@/lib/themes';
import { CELO_APP_ADDRESSES, CUSD_ADDRESS } from '@/lib/celoContracts';
import ESCROW_ABI from '@/abi/ProofPayEscrow.json';
import ERC20_ABI from '@/abi/ERC20.json';
import AppKitButton from '@/components/AppKitButton';

const celoTheme = chainThemes[42220];

type Tab = 'create' | 'manage';

export default function ProofPayPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [freelancerAddr, setFreelancerAddr] = useState('');
  const [amount, setAmount] = useState('');
  const [escrowId, setEscrowId] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [txStatus, setTxStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);

  // Read total escrow count
  const { data: escrowCount } = useReadContract({
    address: CELO_APP_ADDRESSES.proofPayEscrow,
    abi: ESCROW_ABI,
    functionName: 'escrowCounter',
    query: { enabled: true },
  });

  // Read specific escrow details
  const { data: escrowData, refetch: refetchEscrow } = useReadContract({
    address: CELO_APP_ADDRESSES.proofPayEscrow,
    abi: ESCROW_ABI,
    functionName: 'escrows',
    args: escrowId ? [BigInt(escrowId)] : undefined,
    query: { enabled: !!escrowId },
  });

  const handleCreateEscrow = async () => {
    if (!freelancerAddr || !amount || !isConnected) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      const wei = parseUnits(amount, 18);
      await writeContractAsync({
        address: CUSD_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CELO_APP_ADDRESSES.proofPayEscrow, wei],
      });
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.proofPayEscrow,
        abi: ESCROW_ABI,
        functionName: 'createEscrow',
        args: [freelancerAddr as `0x${string}`, wei],
      });
      setTxStatus({ type: 'success', message: `Escrow created for ${amount} cUSD!` });
      setFreelancerAddr('');
      setAmount('');
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  const handleRelease = async () => {
    if (!escrowId) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.proofPayEscrow,
        abi: ESCROW_ABI,
        functionName: 'releaseEscrow',
        args: [BigInt(escrowId)],
      });
      setTxStatus({ type: 'success', message: `Escrow #${escrowId} released!` });
      refetchEscrow();
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  const handleDispute = async () => {
    if (!escrowId) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.proofPayEscrow,
        abi: ESCROW_ABI,
        functionName: 'disputeEscrow',
        args: [BigInt(escrowId)],
      });
      setTxStatus({ type: 'success', message: `Escrow #${escrowId} disputed` });
      refetchEscrow();
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  if (!mounted) return null;

  const escrowDetails = escrowData as any[] | undefined;

  return (
    <div className="min-h-screen w-full font-sans selection:bg-blue-500 selection:text-white" style={celoTheme as React.CSSProperties}>
      <div className="min-h-screen chain-bg relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-4 lg:px-8 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">ProofPay</span>
          </div>
          <AppKitButton />
        </nav>

        <main className="max-w-xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[0.65rem] font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[0.8rem]">verified</span>
              Trustless MiniPay Escrow
            </div>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              <span className="text-white">SECURE</span><br/>
              <span className="text-blue-500">ESCROW.</span>
            </h1>
            <p className="text-base text-gray-400 font-medium leading-relaxed">
              Decentralized payment protection for freelancers and service providers. Funded on Celo.
            </p>
          </div>

          {!isConnected ? (
            <div className="text-center py-16">
              <div className="glass-panel p-12 rounded-[2rem] flex flex-col items-center gap-8 shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Identity Required</h2>
                  <p className="text-gray-400 text-sm">Connect wallet to create or manage escrows.</p>
                </div>
                <AppKitButton />
              </div>
            </div>
          ) : (
            <>
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                {(['create', 'manage'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 rounded-xl text-[0.65rem] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {tab === 'create' ? 'Initiate Payment' : 'Track Escrow'}
                  </button>
                ))}
              </div>

              {activeTab === 'create' ? (
                <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl border-t border-white/10">
                  <h3 className="text-white font-bold text-sm mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[1.1rem] text-blue-400">add_card</span>
                    </div>
                    New Escrow Agreement
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[0.6rem] text-gray-500 uppercase tracking-[0.2em] font-black px-1">Receiver Address</label>
                      <input
                        type="text"
                        placeholder="0x... (Freelancer or Merchant)"
                        value={freelancerAddr}
                        onChange={(e) => setFreelancerAddr(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm font-mono text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[0.6rem] text-gray-500 uppercase tracking-[0.2em] font-black px-1">Agreement Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-2xl font-mono text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-400 font-black text-xs">cUSD</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                      <span className="material-symbols-outlined text-blue-400 text-lg">info</span>
                      <p className="text-[0.7rem] leading-relaxed text-gray-400 font-medium">
                        Funds are held in smart contract custody. Release them only after service delivery. After 7 days of inactivity, the client can reclaim the funds if no dispute is raised.
                      </p>
                    </div>

                    <button
                      onClick={handleCreateEscrow}
                      disabled={isPending || !freelancerAddr || !amount}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 disabled:opacity-20 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                    >
                      {isPending ? 'Staging Escrow...' : 'Deploy & Fund'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl border-t border-white/10">
                    <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[1.1rem] text-blue-400">search</span>
                      </div>
                      Lookup Agreement
                    </h3>
                    <div className="relative group">
                      <input
                        type="number"
                        placeholder="Escrow ID (e.g. 1)"
                        value={escrowId}
                        onChange={(e) => setEscrowId(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm font-mono text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>

                  {escrowDetails && escrowDetails[0] !== '0x0000000000000000000000000000000000000000' && (
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-bold mb-1">Status</p>
                          <div className={`px-3 py-1 rounded-full text-[0.65rem] font-black uppercase ${
                            escrowDetails[4] ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400 animate-pulse'
                          }`}>
                            {escrowDetails[4] ? 'Released' : 'In Escrow'}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-bold mb-1">Amount</p>
                          <p className="text-xl font-black text-white">{formatUnits(escrowDetails[2] as bigint, 18)} <span className="text-blue-400">cUSD</span></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-[0.55rem] uppercase tracking-widest text-gray-500 mb-1">Client (Payer)</p>
                          <p className="text-[0.65rem] font-mono text-white truncate">{String(escrowDetails[0])}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-[0.55rem] uppercase tracking-widest text-gray-500 mb-1">Receiver (Payee)</p>
                          <p className="text-[0.65rem] font-mono text-white truncate">{String(escrowDetails[1])}</p>
                        </div>
                      </div>

                      {!escrowDetails[4] && (
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={handleRelease}
                            disabled={isPending}
                            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-500 transition-all shadow-lg active:scale-[0.98]"
                          >
                            Release Funds
                          </button>
                          <div className="flex gap-3">
                            <button
                              onClick={handleDispute}
                              disabled={isPending}
                              className="flex-1 bg-white/5 text-red-400 border border-red-500/20 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500/10 transition-all"
                            >
                              Dispute
                            </button>
                            <button
                              className="flex-1 bg-white/5 text-gray-500 border border-white/10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest cursor-not-allowed"
                            >
                              Refund
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Status Toast */}
              {txStatus && (
                <div className={`mt-6 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  txStatus.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-300 border border-red-500/20'
                }`}>
                  <span className="material-symbols-outlined text-xl">
                    {txStatus.type === 'success' ? 'verified' : 'report'}
                  </span>
                  <p className="text-xs font-bold leading-tight">{txStatus.message}</p>
                </div>
              )}
            </>
          )}

          <footer className="mt-24 pt-12 border-t border-white/5 text-center space-y-6">
            <div className="flex justify-center gap-10">
              <div className="flex flex-col items-center gap-1.5 opacity-30">
                <span className="material-symbols-outlined text-xl">shield_locked</span>
                <span className="text-[0.55rem] uppercase tracking-widest font-black">Escrowed</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-30">
                <span className="material-symbols-outlined text-xl">gavel</span>
                <span className="text-[0.55rem] uppercase tracking-widest font-black">Disputable</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-30">
                <span className="material-symbols-outlined text-xl">history</span>
                <span className="text-[0.55rem] uppercase tracking-widest font-black">Immutable</span>
              </div>
            </div>
            <p className="text-[0.6rem] text-gray-600 font-bold uppercase tracking-[0.3em]">
              Powered by Celo &middot; ProofPay v1.0
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { chainThemes } from '@/lib/themes';
import { CELO_APP_ADDRESSES } from '@/lib/celoContracts';
import LOYALTY_ABI from '@/abi/MarketPulseLoyalty.json';
import AppKitButton from '@/components/AppKitButton';

const celoTheme = chainThemes[42220];

type Tab = 'merchant' | 'customer';

export default function MarketPulsePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('merchant');
  const [campaignName, setCampaignName] = useState('');
  const [pointsPerVisit, setPointsPerVisit] = useState('10');
  const [campaignId, setCampaignId] = useState('');
  const [customerAddr, setCustomerAddr] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [txStatus, setTxStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => setMounted(true), []);

  // Read campaign counter
  const { data: campaignCount } = useReadContract({
    address: CELO_APP_ADDRESSES.marketPulseLoyalty,
    abi: LOYALTY_ABI,
    functionName: 'campaignCounter',
    query: { enabled: true },
  });

  // Read specific campaign
  const { data: campaignData } = useReadContract({
    address: CELO_APP_ADDRESSES.marketPulseLoyalty,
    abi: LOYALTY_ABI,
    functionName: 'campaigns',
    args: campaignId ? [BigInt(campaignId)] : undefined,
    query: { enabled: !!campaignId },
  });

  // Read user points
  const { data: userPoints, refetch: refetchPoints } = useReadContract({
    address: CELO_APP_ADDRESSES.marketPulseLoyalty,
    abi: LOYALTY_ABI,
    functionName: 'userPoints',
    args: campaignId && address ? [BigInt(campaignId), address] : undefined,
    query: { enabled: !!campaignId && !!address },
  });

  const handleCreateCampaign = async () => {
    if (!campaignName || !pointsPerVisit) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.marketPulseLoyalty,
        abi: LOYALTY_ABI,
        functionName: 'createCampaign',
        args: [campaignName, BigInt(pointsPerVisit)],
      });
      setTxStatus({ type: 'success', message: `Campaign "${campaignName}" created!` });
      setCampaignName('');
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  const handleLogVisit = async () => {
    if (!campaignId || !customerAddr) return;
    setIsPending(true);
    setTxStatus(null);
    try {
      await writeContractAsync({
        address: CELO_APP_ADDRESSES.marketPulseLoyalty,
        abi: LOYALTY_ABI,
        functionName: 'logVisit',
        args: [BigInt(campaignId), customerAddr as `0x${string}`],
      });
      setTxStatus({ type: 'success', message: `Visit logged for campaign #${campaignId}!` });
      refetchPoints();
    } catch (err: any) {
      setTxStatus({ type: 'error', message: err.shortMessage || err.message });
    } finally {
      setIsPending(false);
    }
  };

  if (!mounted) return null;

  const campaign = campaignData as any[] | undefined;

  return (
    <div className="min-h-screen w-full font-sans selection:bg-pink-500 selection:text-white" style={celoTheme as React.CSSProperties}>
      <div className="min-h-screen chain-bg relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-4 lg:px-8 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>loyalty</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">MarketPulse</span>
          </div>
          <AppKitButton />
        </nav>

        <main className="max-w-xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[0.65rem] font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[0.8rem]">redeem</span>
              Celo Merchant Earning
            </div>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              <span className="text-white">LOYALTY</span><br/>
              <span className="text-pink-500">PULSE.</span>
            </h1>
            <p className="text-base text-gray-400 font-medium leading-relaxed">
              Reward repeat customers with on-chain points. Simple, scalable, and instant for MiniPay.
            </p>
          </div>

          {!isConnected ? (
            <div className="text-center py-16">
              <div className="glass-panel p-12 rounded-[2rem] flex flex-col items-center gap-8 shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-pink-500" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Merchant Access</h2>
                  <p className="text-gray-400 text-sm">Connect wallet to manage your loyalty campaigns.</p>
                </div>
                <AppKitButton />
              </div>
            </div>
          ) : (
            <>
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                {(['merchant', 'customer'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 rounded-xl text-[0.65rem] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {tab === 'merchant' ? 'Business Portal' : 'My Earning'}
                  </button>
                ))}
              </div>

              {activeTab === 'merchant' ? (
                <div className="space-y-6">
                  {/* Create Campaign */}
                  <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl">
                    <h3 className="text-white font-bold text-sm mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[1.1rem] text-pink-400">campaign</span>
                      </div>
                      Launch New Campaign
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[0.6rem] text-gray-500 uppercase tracking-[0.2em] font-black px-1">Program Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Daily Coffee Club"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pink-500/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.6rem] text-gray-500 uppercase tracking-[0.2em] font-black px-1">Reward Points per Visit</label>
                        <input
                          type="number"
                          placeholder="10"
                          value={pointsPerVisit}
                          onChange={(e) => setPointsPerVisit(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pink-500/50"
                        />
                      </div>
                      <button
                        onClick={handleCreateCampaign}
                        disabled={isPending || !campaignName}
                        className="w-full bg-pink-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-500 transition-all shadow-xl shadow-pink-900/20 active:scale-95"
                      >
                        {isPending ? 'Deploying Program...' : 'Start Reward Loop'}
                      </button>
                    </div>
                  </div>

                  {/* Log Visit */}
                  <div className="glass-panel p-8 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent">
                    <h3 className="text-white font-bold text-sm mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[1.1rem] text-pink-400">qr_code_scanner</span>
                      </div>
                      Log Customer Visit
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[0.55rem] text-gray-500 uppercase tracking-widest font-black px-1">ID</label>
                          <input
                            type="number"
                            placeholder="1"
                            value={campaignId}
                            onChange={(e) => setCampaignId(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                        <div className="space-y-2 flex flex-col justify-end">
                          <div className="p-3 rounded-2xl bg-pink-500/5 border border-pink-500/10 text-center">
                            <p className="text-[0.45rem] uppercase text-gray-500">Active Pool</p>
                            <p className="text-xs font-bold text-white">{campaignCount ? Number(campaignCount) : 0}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.55rem] text-gray-500 uppercase tracking-widest font-black px-1">Customer Wallet</label>
                        <input
                          type="text"
                          placeholder="0x..."
                          value={customerAddr}
                          onChange={(e) => setCustomerAddr(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-xs font-mono text-white placeholder-gray-700"
                        />
                      </div>
                      <button
                        onClick={handleLogVisit}
                        disabled={isPending || !campaignId || !customerAddr}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all active:scale-95"
                      >
                        {isPending ? 'Logging Visit...' : 'Reward Customer'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Earning Dashboard */}
                  <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl border-t border-white/10">
                    <h3 className="text-white font-bold text-sm mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[1.1rem] text-pink-400">confirmation_number</span>
                      </div>
                      Earning Breakdown
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[0.6rem] text-gray-500 uppercase tracking-[0.2em] font-black px-1">Campaign ID</label>
                        <input
                          type="number"
                          placeholder="Enter Business ID"
                          value={campaignId}
                          onChange={(e) => setCampaignId(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pink-500/50"
                        />
                      </div>

                      {campaign && campaign[0] !== '0x0000000000000000000000000000000000000000' && (
                        <div className="mt-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                          <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-pink-500/20 to-purple-900/40 border border-white/10 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                              <div className={`px-2 py-0.5 rounded text-[0.5rem] font-black uppercase ${campaign[3] ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {campaign[3] ? 'Active' : 'Closed'}
                              </div>
                            </div>
                            
                            <p className="text-[0.6rem] uppercase tracking-widest text-pink-400/60 font-black mb-1">Business</p>
                            <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{String(campaign[1])}</h4>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-bold mb-1">Your Balance</p>
                                <p className="text-4xl font-black text-white font-mono leading-none">
                                  {userPoints !== undefined ? Number(userPoints) : '0'}
                                  <span className="text-xs text-pink-500 ml-2 font-bold uppercase">Points</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[0.55rem] uppercase tracking-widest text-gray-500 font-bold mb-1">Base Reward</p>
                                <p className="text-xs font-black text-white">{Number(campaign[2])} pts/visit</p>
                              </div>
                            </div>
                          </div>

                          {/* Progress Meter */}
                          <div className="space-y-4 px-2">
                            <div className="flex justify-between items-end">
                              <p className="text-[0.65rem] uppercase tracking-widest text-gray-400 font-black">Redemption Progress</p>
                              <p className="text-[0.65rem] font-black text-pink-400">100 Pts Goal</p>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-full p-1 border border-white/5 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-shimmer rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min(((userPoints ? Number(userPoints) : 0) / 100) * 100, 100)}%` }}
                              />
                            </div>
                            <p className="text-[0.55rem] text-gray-600 font-medium text-center italic">
                              {(userPoints ? Number(userPoints) : 0) >= 100 
                                ? "Reward Milestone Reached! Present this to merchant." 
                                : `${100 - (userPoints ? Number(userPoints) : 0)} points until next reward`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                    {txStatus.type === 'success' ? 'offline_pin' : 'new_releases'}
                  </span>
                  <p className="text-xs font-bold leading-tight">{txStatus.message}</p>
                </div>
              )}
            </>
          )}

          <footer className="mt-24 pt-12 border-t border-white/5 text-center space-y-8">
            <div className="flex justify-center gap-10">
              <div className="flex flex-col items-center gap-1.5 opacity-30">
                <span className="material-symbols-outlined text-xl">celebration</span>
                <span className="text-[0.55rem] uppercase tracking-widest font-black">Rewarding</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-30">
                <span className="material-symbols-outlined text-xl">group</span>
                <span className="text-[0.55rem] uppercase tracking-widest font-black">Social</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-30">
                <span className="material-symbols-outlined text-xl">bolt</span>
                <span className="text-[0.55rem] uppercase tracking-widest font-black">Instant</span>
              </div>
            </div>
            <p className="text-[0.6rem] text-gray-600 font-bold uppercase tracking-[0.3em]">
              Celo &middot; MiniPay &middot; MarketPulse
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

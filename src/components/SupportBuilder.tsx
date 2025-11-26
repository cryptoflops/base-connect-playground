'use client';

import { useSendTransaction, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { useState } from 'react';

const BUILDER_ADDRESS = '0x0cf485f4c6b2a6087b4d5d4a590cae8d22d7fa9a';

export const SupportBuilder = () => {
    const { sendTransaction, isPending } = useSendTransaction();
    const { isConnected } = useAccount();
    const [amount, setAmount] = useState('0.001');

    const handleSupport = () => {
        if (!isConnected) return;
        sendTransaction({
            to: BUILDER_ADDRESS,
            value: parseEther(amount),
        });
    };

    if (!isConnected) return null;

    return (
        <div className="tech-card group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-neon-purple">⚡</span> Support Builder
                </h3>
                <span className="pill-label border-neon-purple/30 text-neon-purple bg-neon-purple/10">
                    Tip Jar
                </span>
            </div>

            <p className="text-sm text-gray-400 mb-6">
                Fuel the development of open-source Web3 tools. Every tip helps climb the leaderboard!
            </p>

            <div className="space-y-3 mb-6">
                <div className="grid grid-cols-3 gap-3">
                    {['0.001', '0.005', '0.01'].map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val)}
                            className={`relative py-2 rounded-lg text-sm font-medium transition-all overflow-hidden ${amount === val
                                    ? 'text-white border border-neon-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                                    : 'text-gray-400 border border-white/5 hover:border-white/20 hover:bg-white/5'
                                }`}
                        >
                            {amount === val && (
                                <div className="absolute inset-0 bg-neon-blue/10 backdrop-blur-sm" />
                            )}
                            <span className="relative z-10">{val} ETH</span>
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Custom amount"
                        step="0.001"
                        min="0"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple/50 focus:shadow-[0_0_10px_rgba(188,19,254,0.2)] transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">ETH</span>
                </div>
            </div>

            <button
                onClick={handleSupport}
                disabled={isPending}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-base-blue to-neon-purple text-white font-bold shadow-lg shadow-base-blue/20 hover:shadow-neon-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group/btn"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                    {isPending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            ☕ Send {amount} ETH
                        </>
                    )}
                </span>
            </button>
        </div>
    );
};

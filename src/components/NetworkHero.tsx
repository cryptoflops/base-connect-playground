import React from 'react';

export function NetworkHero({ networkId }: { networkId: number }) {
  // Base
  if (networkId === 8453 || networkId === 84532) {
    return (
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full accent-bg shadow-[0_0_8px_var(--chain-accent)]"></div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant">Network: Live</span>
        </div>
        <h1 className="text-[5rem] font-bold tracking-tighter leading-none text-white font-['Inter']">Base Network</h1>
        <p className="mt-4 text-on-surface-variant max-w-xl text-lg leading-relaxed">
          Secure, low-cost, builder-friendly Ethereum L2. Optimized for the next billion users.
        </p>
      </header>
    );
  }

  // Celo
  if (networkId === 42220 || networkId === 44787) {
    return (
      <section className="mb-12">
        <span className="text-[11px] font-semibold tracking-wider uppercase accent-text block mb-2">Network Profile</span>
        <h1 className="text-[3.5rem] font-bold leading-none tracking-tight text-white mb-4">The Optimistic Human</h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Scaling prosperity through mobile-first infrastructure. Celo enables decentralized financial tools for everyone, everywhere.
        </p>
      </section>
    );
  }

  // Optimism
  if (networkId === 10 || networkId === 11155420) {
    return (
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="accent-text font-bold text-[11px] tracking-widest uppercase">Infrastructure Status</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>
        <h1 className="text-[3.5rem] font-extrabold leading-none tracking-tighter text-white mb-2">Optimism Mainnet</h1>
        <p className="text-on-surface-variant text-lg max-w-2xl">
          High-performance L2 infrastructure for the Ethereum ecosystem. Low latency, institutional-grade security, and extreme scalability.
        </p>
      </header>
    );
  }

  // Arbitrum
  if (networkId === 42161 || networkId === 421614) {
    return (
      <div className="mb-12 mt-4 relative">
        <div className="absolute -top-32 -left-24 w-96 h-96 accent-glow-bg blur-[120px] rounded-full pointer-events-none"></div>
        <p className="accent-text font-['Inter'] text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">Network Protocol: Layer 2</p>
        <h1 className="text-7xl font-bold tracking-tighter text-white font-headline leading-[0.9]">
          ARBITRUM <br/>
          <span className="accent-text">MONOLITH</span>
        </h1>
      </div>
    );
  }

  // Fallback
  return (
    <header className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full accent-bg shadow-[0_0_8px_var(--chain-accent)]"></div>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant">Network: Connected</span>
      </div>
      <h1 className="text-[5rem] font-bold tracking-tighter leading-none text-white font-['Inter']">Playground</h1>
    </header>
  );
}

import React from 'react';

export function NetworkHero({ networkId }: { networkId: number }) {
  const getNetworkName = () => {
    switch (networkId) {
      case 8453: case 84532: return "Base";
      case 42220: case 44787: return "Celo";
      case 10: case 11155420: return "Optimism";
      case 42161: case 421614: return "Arbitrum";
      default: return "";
    }
  };

  const getSubtext = () => {
    switch (networkId) {
      case 8453: case 84532: return "Secure, low-cost, builder-friendly Ethereum L2. Optimized for the next billion users.";
      case 42220: case 44787: return "Scaling prosperity through mobile-first infrastructure. Celo enables decentralized financial tools for everyone, everywhere.";
      case 10: case 11155420: return "High-performance L2 infrastructure for the Ethereum ecosystem. Low latency, institutional-grade security, and extreme scalability.";
      case 42161: case 421614: return "A suite of Ethereum scaling solutions that enables high-throughput, low cost smart contracts while remaining trustlessly secure.";
      default: return "";
    }
  };

  const name = getNetworkName();

  return (
    <header className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant">Network: Mainnet</span>
      </div>
      <h1 className="text-[4.5rem] font-bold tracking-tighter leading-none text-white font-['Inter'] mb-4">
        {name ? `${name} Playground` : 'Playground'}
      </h1>
      <p className="mt-4 text-on-surface-variant max-w-xl text-lg leading-relaxed">
        {getSubtext()}
      </p>
    </header>
  );
}

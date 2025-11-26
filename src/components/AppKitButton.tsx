'use client';

import { useEffect, useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export default function AppKitButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const label = isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect';

  return (
    <button onClick={() => open()} className="btn-primary">
      {label}
    </button>
  );
}
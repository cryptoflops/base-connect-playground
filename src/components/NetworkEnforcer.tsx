'use client';

import { useEffect, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { usePathname } from 'next/navigation';

export default function NetworkEnforcer() {
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const pathname = usePathname();
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum?.isMiniPay) {
      setIsMiniPay(true);
    }
  }, []);

  const requiresCelo = isMiniPay || 
                       pathname?.startsWith('/celosaver') || 
                       pathname?.startsWith('/proofpay') || 
                       pathname?.startsWith('/marketpulse');

  useEffect(() => {
    // Only attempt switch if we have an active connection and a switch function
    if (address && requiresCelo && chainId !== 42220 && switchChain) {
      try {
        switchChain({ chainId: 42220 });
      } catch (e) {
        console.error("Failed to switch to Celo network:", e);
      }
    }
  }, [address, chainId, requiresCelo, switchChain]);

  return null;
}

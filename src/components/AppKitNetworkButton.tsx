'use client';

import { useEffect, useState } from 'react';
import { useAppKit, useAppKitNetwork } from '@reown/appkit/react';

export default function AppKitNetworkButton() {
  const { open } = useAppKit();
  const { caipNetwork } = useAppKitNetwork();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const label = caipNetwork?.name ?? 'Network';

  return (
    <button
      onClick={() => open({ view: 'Networks' })}
      className="btn-secondary"
    >
      {label}
    </button>
  );
}
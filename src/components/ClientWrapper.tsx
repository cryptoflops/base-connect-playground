'use client';

import React from 'react';
import ContextProvider from '@/context';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContextProvider>{children}</ContextProvider>;
}

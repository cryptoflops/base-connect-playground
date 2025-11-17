// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { headers } from 'next/headers';
import ContextProvider from '@/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Base Connect Playground',
  description: 'Reown AppKit + Base + Builder Contracts',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie');

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}

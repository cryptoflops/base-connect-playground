import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Playground | Multi-Chain Developer Experience',
  description: 'Reown AppKit + Base + Multichain Builder Playground',
  other: {
    'talentapp:project_verification': '2a8f74653e33a535639514d4b4b623692c63085536770b7a9688392ff64bd776eef2d6c868751f3b7f7bf9a5dcc3f2b5b4313d5acba0e40a2e049dd3a8e341e5',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden no-scrollbar`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
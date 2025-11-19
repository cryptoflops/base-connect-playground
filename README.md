Base Connect Playground

A small example dApp built with Reown AppKit, Wagmi v2, and Next.js — deployed on Base.
Designed to demonstrate clean, simple on-chain interactions across multiple contracts.

✨ Live Demo

https://base-connect-playground.vercel.app/

🔧 Features

Reown AppKit wallet modal

Wagmi v2 contract interactions

Next.js App Router (client-only page)

Base Mainnet support

Five example contracts:

Counter

Storage

Storage Log (event-only)

Boolean Flag

Timestamp Ping

“Ping All” — triggers all interactions in sequence

Clean UI components with minimal dependencies

📂 Project Structure
src/
  app/
    layout.tsx
    page.tsx
  components/
    AppKitButton.tsx
    AppKitNetworkButton.tsx
    ContractCounter.tsx
    ContractStorage.tsx
    ContractStorageLog.tsx
    ContractFlag.tsx
    ContractTimestamp.tsx
    PingAll.tsx
  config/
    index.ts
  context/
    index.tsx
  lib/
    contracts.ts
  types/
    *.d.ts
public/

🚀 Getting Started
1. Install dependencies
npm install

2. Add environment variables

Create .env.local:

NEXT_PUBLIC_PROJECT_ID=your_reown_project_id


Create a project ID at
https://cloud.walletconnect.com

3. Run the app
npm run dev


Visit:

http://localhost:3000

📦 Build & Deploy
Build for production
npm run build
npm run start

Deploy to Vercel

Push the repo to GitHub

Import it into Vercel

Add:

NEXT_PUBLIC_PROJECT_ID=


Deploy with default Next.js (webpack) settings

🔗 Contracts

Contract ABIs and addresses are stored in:

src/lib/contracts.ts


The contracts are intentionally small and easy to understand, suitable for quick interactions and clear event logs.

💡 Purpose

This repo exists to provide a simple, readable example of:

integrating multiple contracts into a single dApp

structuring a Wagmi + AppKit + Next.js App Router project

using Base Mainnet for real on-chain actions

avoiding SSR pitfalls while using Wagmi hooks

testing orchestrated on-chain interactions (“Ping All”)

It’s a compact reference for developers exploring AppKit or Base.

📄 License

MIT

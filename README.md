# ⚡ Base Connect Playground

A compact example of building a multi-contract dApp on Base using Reown AppKit and Wagmi v2.
The focus is on clear on-chain interactions, simple architecture, and a setup that’s easy to extend or learn from.

🚀 Live Demo

https://base-connect-playground.vercel.app

🧩 What’s Inside

Reown AppKit wallet modal

Wagmi v2 contract interactions

Next.js App Router

Base Mainnet support

Five example contracts:

Counter

Storage

Storage Log (event only)

Boolean Flag

Timestamp Ping

Ping All — triggers all contract calls in sequence

Lightweight UI components

The repo is intended as a simple, practical reference for real on-chain actions with AppKit.

📁 Project Structure
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

🛠 Getting Started
1. Install dependencies
npm install

2. Add environment variable

Create .env.local:

NEXT_PUBLIC_PROJECT_ID=your_reown_project_id


Create a project ID at:
https://cloud.walletconnect.com

3. Run locally
npm run dev


Visit:

http://localhost:3000

📦 Build & Deploy
Production build
npm run build
npm run start

Deploy to Vercel

Push the repo to GitHub

Import it at https://vercel.com

Add:

NEXT_PUBLIC_PROJECT_ID=


Deploy using default Next.js (webpack) settings

🔗 Contracts

Contract ABIs and addresses live in:

src/lib/contracts.ts


The example contracts are intentionally small and easy to review.
They’re designed for fast interactions and clear event logs.

💡 Why This Exists

Most AppKit examples are minimal.
This repo demonstrates:

working with multiple contracts

a clean pattern for AppKit + Wagmi v2

Base Mainnet integration

real on-chain events

avoiding SSR issues in App Router

It’s meant to be a simple, functional reference.

📄 License

MIT
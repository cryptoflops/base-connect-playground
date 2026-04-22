# Base Connect Playground

<p align="center">
  <img src="./public/logos/celo-saver.png" height="80" alt="CeloSaver" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./public/logos/proof-pay.png" height="80" alt="ProofPay" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./public/logos/market-pulse.png" height="80" alt="MarketPulse" />
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-91.8%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![WalletConnect](https://img.shields.io/badge/WalletConnect-Reown_AppKit-orange)](https://reown.com/)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://base-connect-playground.vercel.app)

A multi-chain application playground built with Reown AppKit, Wagmi, and Base.

This project is a reference for building Web3 applications. It shows how to integrate wallet connections, handle multi-chain interactions, and execute smart contract transactions.

---

## Core Features

- Multi-Chain Connectivity: Switching between Base, Optimism, and Celo networks.
- Wallet Integration: Implementation of Reown AppKit for wallet connections.
- Smart Contract Interactions: Examples of reading state and recording transactions.
- Support Builder: A feature for sending tips to a specific address.

## Tech Stack

- Framework: Next.js 15
- Web3 SDK: Reown AppKit
- Ethereum Hooks: Wagmi & Viem
- Styling: Tailwind CSS
- State Management: TanStack Query

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/cryptoflops/base-connect-playground.git
    cd base-connect-playground
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    Create a `.env.local` file in the root directory and add your Reown Project ID:
    ```env
    NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
    ```

4.  Run Locally:
    ```bash
    npm run dev
    ```

## Deployment

### Deploy to Vercel

1. Push code to a repository.
2. Import the project into Vercel.
3. Add the `NEXT_PUBLIC_PROJECT_ID` environment variable.
4. Ensure the Node.js version is set to 20.x in the settings.

## Contract Examples

The playground interacts with several contracts on Base Mainnet:

- Counter: State mutation (increment/decrement).
- Storage: Reading and writing string data.
- Boolean Flag: Toggling a state.
- Timestamp: Recording block timestamps.
- Events: Monitoring contract events.

## Contributing

Contributions are welcome. Please submit a Pull Request for any enhancements.

## License

This project is available under the MIT License.
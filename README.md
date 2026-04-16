# Base Connect Playground

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cryptoflops/base-connect-playground)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-91.8%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![WalletConnect](https://img.shields.io/badge/WalletConnect-Reown_AppKit-orange)](https://reown.com/)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://base-connect-playground.vercel.app)

**A multi-chain dApp playground built with Reown AppKit, Wagmi, and Base.**

This project serves as a practical reference for building Web3 applications. It demonstrates how to integrate wallet connection, handle multi-chain interactions, and execute smart contract transactions using modern hooks and libraries.

---

## ⚡ Core Features

- **Multi-Chain Connectivity**: Seamlessly switch between **Base**, **Optimism**, and **Celo** networks.
- **Wallet Integration**: Full implementation of **Reown AppKit** for secure and easy wallet connections.
- **Smart Contract Interactions**:
    - **Read/Write**: Examples of reading state and writing transactions to contracts.
    - **Events**: Real-time event listening and display.
    - **Error Handling**: Robust handling of transaction states and errors.
- **Support Builder**: A functional feature allowing users to send ETH tips (presets or custom amounts) to a designated address.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Web3 SDK**: [Reown AppKit](https://reown.com/)
- **Ethereum Hooks**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 📦 Getting Started

### Prerequisites

- **Node.js 20+** (Required for Next.js 15)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cryptoflops/base-connect-playground.git
    cd base-connect-playground
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file in the root directory and add your Reown Project ID:
    ```env
    NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
    ```
    > You can obtain a Project ID at [cloud.reown.com](https://cloud.reown.com).

4.  **Run Locally:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

## 🚢 Deployment

### Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Import the project into [Vercel](https://vercel.com).
3.  Add the `NEXT_PUBLIC_PROJECT_ID` environment variable in the Vercel project settings.
4.  **Important**: Ensure the Node.js version is set to **20.x** in the Vercel project settings ("General" > "Node.js Version").
5.  Deploy.

## 🧩 Contract Examples

The playground interacts with several verified contracts on Base Mainnet to demonstrate different capabilities:

- **Counter**: Simple state mutation (increment/decrement).
- **Storage**: Reading and writing string data.
- **Boolean Flag**: Toggling a boolean state.
- **Timestamp**: Recording block timestamps.
- **Events**: monitoring contract events in real-time.

## 🌟 Talent App & Celo Rewards

This project is integrated with the [Talent App](https://talent.app) platform and participates in the **Celo Rewards Program**.

### Project Verification
The project's ownership is verified via a meta tag in the application's root layout.

### Celo Rewards Contracts
The following smart contracts on Celo are tracked for this project's on-chain activity and impact:

1.  **BuilderCounter**: `0x4a7c27c936d3f414f31b74023288c49110fb60bb`
2.  **BuilderFlag**: `0x1bb7b8a20b855eee4d1778195f2e44c693f0d39b`
3.  **BuilderTimestamp**: `0x5ef690b84a23d96de7c1af8d4cf2e3aa8b0ca21a`
4.  **BuilderStorage**: `0x2e5a1fe39a38dcb7631c6fba588f5cc0bb0f2e5c`
5.  **BuilderStorageLog**: `0x23d97969cc73a4a0cb0c3ac0f8e66f8a9634e3a0`

## 🤝 Contributing

Contributions are welcome. Please submit a Pull Request for any enhancements or bug fixes.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
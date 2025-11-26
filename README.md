# ⚡ Base Connect Playground

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8)
![Reown](https://img.shields.io/badge/Reown-AppKit-orange)

> **A futuristic, multi-chain builder lab powered by Reown AppKit, WalletConnect, and Base.**

This project is a high-performance playground for Web3 developers, demonstrating how to build robust, multi-chain dApps with a premium "Techno-Modular" UI. It features real on-chain interactions, a revenue-generating tip jar, and a seamless wallet connection experience.

---

## 🚀 Features

- **Futuristic UI**: A "Dark Neon" aesthetic with glassmorphism, pulse animations, and a modular grid layout.
- **Multi-Chain Support**: Built for **Base**, **Optimism**, and **Celo**, with easy network switching.
- **Reown AppKit Integration**: Full implementation of the latest AppKit for wallet connection and modal management.
- **Wagmi v2 Hooks**: Clean, modern hooks for contract interactions (Read, Write, Events).
- **Revenue Ready**: Integrated **"Support Builder"** feature allowing users to send ETH tips (presets + custom amounts).
- **Developer Friendly**: Type-safe, linted, and optimized for Next.js App Router.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Animations
- **Web3 SDK**: [Reown AppKit](https://reown.com/) (formerly WalletConnect)
- **Ethereum Hooks**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 📦 Getting Started

### Prerequisites

- Node.js 20+ (Required for Next.js 15)
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
    > Get your Project ID at [cloud.reown.com](https://cloud.reown.com).

4.  **Run Locally:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `NEXT_PUBLIC_PROJECT_ID` environment variable in the Vercel dashboard.
4.  Click **Deploy**.

> **Note:** Ensure your Vercel project is set to use Node.js 20.x in the "Settings" > "General" > "Node.js Version" section.

## 🧩 Contract Interactions

The playground includes verified contracts on Base Mainnet for testing:
- **Counter**: Increment/Decrement state.
- **Storage**: Read/Write string values.
- **Boolean Flag**: Toggle true/false state.
- **Timestamp**: Record block timestamps.
- **Events**: Listen for real-time contract events.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-26

### Added
- **Multi-chain support** for Base, Optimism, Arbitrum, and Celo networks
- **WalletConnect integration** using Reown AppKit v1.8.14
- **Contract interaction components**:
  - Read Contract component for querying blockchain state
  - Write Contract component for executing transactions
  - Events component for monitoring contract events
- **Support Builder feature** - ETH tipping functionality with preset and custom amounts
- **Futuristic UI design** with glassmorphism effects and neon accents
- **Network-specific color schemes** and gradients
- **Responsive layout** optimized for desktop and mobile
- **AppKit Network Button** for easy chain switching

### Fixed
- TypeScript module resolution issues with chain imports (resolved by defining chains inline)
- Storage type casting for Wagmi adapter compatibility
- Build compatibility with Node.js 20+
- WalletConnect origin mismatch in development environment
- Content Security Policy configuration for development
- Network switching runtime errors

### Technical Details
- **Framework**: Next.js 16.0.3 with App Router
- **React**: 19.0.0
- **TypeScript**: 91.8% of codebase
- **Styling**: Tailwind CSS 3.4.1 with custom design system
- **Web3 Stack**: Wagmi 2.19.5, Viem 2.39.3, Reown AppKit 1.8.14

### Deployed
- Live deployment at [https://base-connect-playground.vercel.app](https://base-connect-playground.vercel.app)
- Configured for Node.js 20.x on Vercel
- Environment variable configuration for WalletConnect Project ID

### Documentation
- Comprehensive README with setup instructions
- MIT License
- Deployment guide for Vercel

---

## [Unreleased]

### Planned
- Additional chain support (Polygon, Avalanche, etc.)
- Enhanced contract interaction examples
- Transaction history viewer
- Gas estimation tools
- ENS name resolution

---

[1.0.0]: https://github.com/cryptoflops/base-connect-playground/releases/tag/v1.0.0

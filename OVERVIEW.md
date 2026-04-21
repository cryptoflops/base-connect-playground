# Project Overview

This repository contains a collection of mobile-focused applications built for the Celo network. These projects demonstrate practical use cases for stablecoin payments and on-chain interactions within a mobile wallet environment.

## Applications

### 1. CeloSaver
CeloSaver is a savings application that helps users build consistent financial habits. It allows for cUSD deposits into a vault and tracks on-chain streaks to encourage regular saving.
- Vault Contract: `0x4bA6398eb0ee5fdC7b45e7DE3F042d27090FB72E`
- Features: Deposit tracking and streak monitoring.

### 2. ProofPay
ProofPay is an escrow utility for peer-to-peer services. It provides an interface for locking funds until specific service milestones are reached, including a 7-day dispute window.
- Escrow Contract: `0xc496A211dB0ef052663017aF2a3e14296F012faD`
- Features: Milestone locking and time-based dispute resolution.

### 3. MarketPulse
MarketPulse is a loyalty platform for local merchants. It enables visit logging and points tracking on-chain, providing a transparent record for repeat customers.
- Loyalty Contract: `0xc3FC22D77C77A745379A5CA7141BA50D25c93Ab1`
- Features: Merchant-signed visit logs and redemption progress.

## Technical Details
- Multi-chain context handling for network switching.
- Interface design focused on clarity and ease of use in mobile viewports.
- Fully implemented on Celo Mainnet.

## Transaction Examples
- Campaign Creation: [0xd9c0...050d](https://celoscan.io/tx/0xd9c0c900956d0e866236000cfceca7ac7d1711ccdf7f7321ac837993f2e2050d)
- Visit Logging: [0x3ddc...6be1](https://celoscan.io/tx/0x3ddc22c782fb89dfe539afdc0adc47234a80357df89559a1facf9cf3df4b6be1)

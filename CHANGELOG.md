# Changelog

## 1.0.0 (2026-06-20)


### Features

* add Celo MiniPay apps, Cloudflare config, and Stitch design assets ([b613145](https://github.com/cryptoflops/base-connect-playground/commit/b6131456dfe0f19c8405ea1dcbedc21fe73c0465))
* add minipay-contracts Foundry workspace with Celo Mainnet deployment scripts ([c6e8c61](https://github.com/cryptoflops/base-connect-playground/commit/c6e8c61b280528d3c1b2dcf721d365f5f1b5d2be))
* add Reown AppKit integration (auth, smart accounts, gas sponsorship) and Base Playground contract cards ([b5b32c0](https://github.com/cryptoflops/base-connect-playground/commit/b5b32c0889f998d95921a7f805e310337f054528))
* add Talent App verification meta tag and Celo rewards info ([7431f09](https://github.com/cryptoflops/base-connect-playground/commit/7431f0987633ad71e472fc0af26eff30bef6da4a))
* add verified Celo addresses and contract source code ([6f2dc76](https://github.com/cryptoflops/base-connect-playground/commit/6f2dc76ec2c53955e4f4f1707f56bec025699aa4))
* complete UI layout and theming components ([877843c](https://github.com/cryptoflops/base-connect-playground/commit/877843c73836057d56e3a4f0ffa1a4706f3a27ea))
* integrate playground logo into navigation ([bddbcb7](https://github.com/cryptoflops/base-connect-playground/commit/bddbcb7ef6392dd53286a3a7706f254c53f8cbe6))
* optimize UI layout for mobile and isolate logs by network ([b5bd9d5](https://github.com/cryptoflops/base-connect-playground/commit/b5bd9d5df93574900e55d35b6d1cc95a6a49d257))
* redesign UI with Material dashboard aesthetic ([1e87666](https://github.com/cryptoflops/base-connect-playground/commit/1e87666acdf7b2fe0f8301fc0dd679c216fc35d3))
* standardise headers to Playground and unify top tabs ([4ff55da](https://github.com/cryptoflops/base-connect-playground/commit/4ff55da0ab154341f089f5057cef572439432345))
* UI redesign, revenue feature, and repo polish ([0449e94](https://github.com/cryptoflops/base-connect-playground/commit/0449e94f3e0509fe2fc01c2ea9089b869d573022))
* **ui:** implement multi-chain visual skin theming via data-theme ([f45f9df](https://github.com/cryptoflops/base-connect-playground/commit/f45f9dfb11d54947dfb93e0f22add0211d4229d3))


### Bug Fixes

* add hover-accent-bg utility and fix broken pseudo-variant prefix ([8d668bd](https://github.com/cryptoflops/base-connect-playground/commit/8d668bd4ed548300c7857fd60b5df5a288a55637))
* correct scrambled Celo contract address mappings ([59f4568](https://github.com/cryptoflops/base-connect-playground/commit/59f4568ef9146b4dca9a87d229100ce8058ff380))
* define chains inline and fix storage type cast for successful build ([7fffacf](https://github.com/cryptoflops/base-connect-playground/commit/7fffacf0955c295f55202479e34d22251a8b9385))
* disable turbopack (WC test files break turbopack build) ([960df97](https://github.com/cryptoflops/base-connect-playground/commit/960df97e98d25a9a54291c6bac479ac25f204419))
* disable turbopack (WC test files break turbopack build) ([e164803](https://github.com/cryptoflops/base-connect-playground/commit/e164803e37a42116ff845721fcd5aad1b589f6d7))
* disable turbopack to resolve WalletConnect thread-stream build errors ([85a5981](https://github.com/cryptoflops/base-connect-playground/commit/85a5981c5cfe2f488e0cc0115b72c3e161dc67ae))
* implement sequential transaction submission with delays and explicit gas limits for Celo reliability ([d120104](https://github.com/cryptoflops/base-connect-playground/commit/d120104ed4ed1f6455a782670bd96b9cfdf45ee3))
* import chains from wagmi/chains instead of viem/chains ([1516dfd](https://github.com/cryptoflops/base-connect-playground/commit/1516dfd9f81e792bbc056f32fb3e3953b818b63c))
* improve multichain address switching and explicit chainId for transactions ([f001379](https://github.com/cryptoflops/base-connect-playground/commit/f001379efdb97afe7f79c714dcb099b278e6ee3a))
* resolve README conflict ([ce34c33](https://github.com/cryptoflops/base-connect-playground/commit/ce34c33610b95947f2f15f3b533ae77f93676ccf))
* resolve TypeScript errors in PingAll and refactor address hook for type safety ([19a1eee](https://github.com/cryptoflops/base-connect-playground/commit/19a1eee7e03ad670e1452e1ede08f38323fa6dd0))
* **typing:** cast caipNetwork.id to String to fix build type error ([97eb650](https://github.com/cryptoflops/base-connect-playground/commit/97eb6505311ef53883e0753651f6083ece73baa8))
* **ui:** complete rewrite of theming system — bypass Tailwind JIT compile-time resolution with runtime CSS custom properties injected via React inline styles ([1c56c95](https://github.com/cryptoflops/base-connect-playground/commit/1c56c9547797639a876682354820b19c18a23a31))
* **ui:** implement dynamic network switching and active states ([8959331](https://github.com/cryptoflops/base-connect-playground/commit/89593314a50fa75a8e85799d98b86f7f899847a8))
* **ui:** inject dynamic data-theme reactively ([e0c1f88](https://github.com/cryptoflops/base-connect-playground/commit/e0c1f88faf007ddd9e72c7e5a81155982775009d))
* **ui:** inject pure hex variables into tailwind config to avoid opacity compiler incompatibilities ([3e9faca](https://github.com/cryptoflops/base-connect-playground/commit/3e9facabd6870ab65a694691480397e340e1f600))
* **ui:** move root theme variables completely out of tailwind layer base to physically block purgecss stripping on vercel ([451162a](https://github.com/cryptoflops/base-connect-playground/commit/451162a9fbdde769a4db7f308a8da24f92e4967a))
* **ui:** refactor global css variable injection to react div wrapper ([558c270](https://github.com/cryptoflops/base-connect-playground/commit/558c2706e0c8343da8dcd3affd98db1f2879721c))
* **ui:** use appkit switchNetwork and update hero title dynamically ([6411cd0](https://github.com/cryptoflops/base-connect-playground/commit/6411cd0213428a64cf4dbe344d279091ecb4b8b6))
* **ui:** use exact tailwind class strings in themeMap and prevent PurgeCSS from stripping visual network skins out of production bundle ([8065b33](https://github.com/cryptoflops/base-connect-playground/commit/8065b33103f2f704e8c31b9cbb0aaac2672b165b))
* use named imports from viem/chains ([1c8c56b](https://github.com/cryptoflops/base-connect-playground/commit/1c8c56bddac03430d2b9786b8822c4814bf54236))
* use wagmi/chains for network imports ([d9ce0ec](https://github.com/cryptoflops/base-connect-playground/commit/d9ce0ecea1e695e26fd12c6fc59c4f338ea9cf2f))

## [Unreleased] - 2026-05-26

### Changed
- Updated dependencies to latest stable
- Reduced bundle size by tree-shaking

### Fixed
- Fixed decimal formatting for small amounts

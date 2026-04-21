/**
 * Celo MiniPay app contract addresses and constants.
 * Deployed on Celo Mainnet — blocks 64750217-64750218
 * Deployer: 0x207d064161cD85351Be21ecA570807eD8bCEe0AD
 */

// Celo Mainnet cUSD token address
export const CUSD_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a' as const;

// Deployed on Celo Mainnet
export const CELO_APP_ADDRESSES = {
  celoSaverVault: '0x4bA6398eb0ee5fdC7b45e7DE3F042d27090FB72E' as `0x${string}`,
  proofPayEscrow: '0xc496A211dB0ef052663017aF2a3e14296F012faD' as `0x${string}`,
  marketPulseLoyalty: '0xc3FC22D77C77A745379A5CA7141BA50D25c93Ab1' as `0x${string}`,
} as const;

/**
 * Multi-chain theme definitions derived from Stitch design exports.
 * These are applied as inline CSS custom properties at runtime,
 * bypassing Tailwind's JIT compile-time resolution.
 */

export interface ChainTheme {
  '--chain-accent': string;
  '--chain-accent-glow': string;
  '--chain-bg': string;
  '--chain-bg-80': string;
  '--chain-surface-lowest': string;
  '--chain-on-accent': string;
}

export const chainThemes: Record<number, ChainTheme> = {
  // Base — Monochrome + Blue
  8453: {
    '--chain-accent': '#0000FF',
    '--chain-accent-glow': 'rgba(0, 0, 255, 0.1)',
    '--chain-bg': '#050505',
    '--chain-bg-80': 'rgba(5, 5, 5, 0.8)',
    '--chain-surface-lowest': '#0c0e17',
    '--chain-on-accent': '#ffffff',
  },
  // Celo — Prosperity Yellow
  42220: {
    '--chain-accent': '#FCFF52',
    '--chain-accent-glow': 'rgba(252, 255, 82, 0.1)',
    '--chain-bg': '#11131c',
    '--chain-bg-80': 'rgba(17, 19, 28, 0.8)',
    '--chain-surface-lowest': '#0c0e17',
    '--chain-on-accent': '#1B1C1B',
  },
  // Optimism — Bold Red
  10: {
    '--chain-accent': '#FF0421',
    '--chain-accent-glow': 'rgba(255, 4, 33, 0.1)',
    '--chain-bg': '#000000',
    '--chain-bg-80': 'rgba(0, 0, 0, 0.8)',
    '--chain-surface-lowest': '#0c0e17',
    '--chain-on-accent': '#ffffff',
  },
  // Arbitrum — Navy + Teal
  42161: {
    '--chain-accent': '#12AAFF',
    '--chain-accent-glow': 'rgba(18, 170, 255, 0.1)',
    '--chain-bg': '#031429',
    '--chain-bg-80': 'rgba(3, 20, 41, 0.8)',
    '--chain-surface-lowest': '#0c0e17',
    '--chain-on-accent': '#ffffff',
  },
};

export const defaultTheme = chainThemes[8453];

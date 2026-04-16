import { default as BUILDER_COUNTER_ABI } from '@/abi/BuilderCounter.json';
import { default as BUILDER_FLAG_ABI } from '@/abi/BuilderFlag.json';
import { default as BUILDER_TIMESTAMP_ABI } from '@/abi/BuilderTimestamp.json';
import { default as BUILDER_STORAGE_ABI } from '@/abi/BuilderStorage.json';
import { default as BUILDER_STORAGE_LOG_ABI } from '@/abi/BuilderStorageLog.json';
import { default as BUILDER_EVENT_STREAM_ABI } from '@/abi/BuilderEventStream.json';
import { default as BUILDER_SCORE_TRACKER_ABI } from '@/abi/BuilderScoreTracker.json';

export {
  BUILDER_COUNTER_ABI,
  BUILDER_FLAG_ABI,
  BUILDER_TIMESTAMP_ABI,
  BUILDER_STORAGE_ABI,
  BUILDER_STORAGE_LOG_ABI,
  BUILDER_EVENT_STREAM_ABI,
  BUILDER_SCORE_TRACKER_ABI
};

export const BUILDER_ADDRESSES: Record<number, Record<string, string>> = {
  // Base Mainnet
  8453: {
    counter: '0x4a7c27c936d3f414f31b74023288c49110fb60bb',
    flag: '0x1bb7b8a20b855eee4d1778195f2e44c693f0d39b',
    timestamp: '0x5ef690b84a23d96de7c1af8d4cf2e3aa8b0ca21a',
    storage: '0x2e5a1fe39a38dcb7631c6fba588f5cc0bb0f2e5c',
    storageLog: '0x23d97969cc73a4a0cb0c3ac0f8e66f8a9634e3a0',
    eventStream: '0x43F6852EdB7f8B93637Fa76855E5Fa9993Ee9778',
    scoreTracker: '0xB7AdfC6009A0f821a670a6ec15B84c9Bc072AA01',
  },
  // Celo Mainnet
  42220: {
    counter: '0x9488E09048de032102B7a8B03ce5D33cc37ad417',
    flag: '0xF786a03048F75FE6610317c3859d9953e0C3ad50',
    timestamp: '0x88FF9f397700321F0daBA10d45CA5DCAb2A0C9BD',
    storage: '0x8128e7D06E02E2a008593Cb2Cb5D0611ea4A1d13',
    storageLog: '0x99Bd8fDbC809E4501AD6284885fBF1bE5E199fF6',
    eventStream: '0x58F281AB9a9B5510c8aF48C5B8f1c72676C3E319',
    scoreTracker: '0xC5bdD12295d95Af4c5C49dC8E24A601Ee7A93801',
  }
};

// Legacy exports for backward compatibility (defaults to Base)
export const BUILDER_COUNTER_ADDRESS = BUILDER_ADDRESSES[8453].counter;
export const BUILDER_FLAG_ADDRESS = BUILDER_ADDRESSES[8453].flag;
export const BUILDER_TIMESTAMP_ADDRESS = BUILDER_ADDRESSES[8453].timestamp;
export const BUILDER_STORAGE_ADDRESS = BUILDER_ADDRESSES[8453].storage;
export const BUILDER_STORAGE_LOG_ADDRESS = BUILDER_ADDRESSES[8453].storageLog;
export const BUILDER_EVENT_STREAM_ADDRESS = BUILDER_ADDRESSES[8453].eventStream;
export const BUILDER_SCORE_TRACKER_ADDRESS = BUILDER_ADDRESSES[8453].scoreTracker;

import { useAccount, useChainId } from 'wagmi';

export function useBuilderAddresses() {
  const { chainId: accountChainId } = useAccount();
  const activeChainId = useChainId();
  
  // Prioritize account's current chain if connected, otherwise use config chain
  const chainId = accountChainId || activeChainId || 8453;
  const isCelo = chainId === 42220;
  const finalChainId = isCelo ? 42220 : 8453;
  
  return {
    addresses: BUILDER_ADDRESSES[finalChainId],
    chainId: finalChainId
  };
}
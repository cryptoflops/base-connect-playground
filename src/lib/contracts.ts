// lib/contracts.ts

export const BUILDER_COUNTER_ADDRESS = '0xE2BE60aF8fD5A037B465e0Ea331c9C4C6979F2d1';
export const BUILDER_STORAGE_ADDRESS = '0xe6be4b30fe2b96709551e6581a4f5ab9d63682cd';

export const BUILDER_COUNTER_ABI = [
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const BUILDER_STORAGE_ABI = [
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'data',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'value', type: 'string' }],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const BUILDER_TIMESTAMP_ADDRESS = '0x537AEb3BFEA4D0003c0126680A29e4930385F8c5';

export const BUILDER_TIMESTAMP_ABI = [
  {
    "inputs": [],
    "name": "ping",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "Ping",
    "type": "event"
  }
];

export const BUILDER_FLAG_ADDRESS = "0x112d76Ee1E4905c7F1a12156CEa7a7AC19C602D1";

export const BUILDER_FLAG_ABI = [
  {
    inputs: [],
    name: "flag",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "toggle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "bool", name: "newValue", type: "bool" }
    ],
    name: "Toggled",
    type: "event"
  }
];
    
export const BUILDER_STORAGE_LOG_ADDRESS = "0xA837341F480B6c3bb98b3E7F03db3A76C700659B";

export const BUILDER_STORAGE_LOG_ABI = [
  {
    inputs: [],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ internalType: "string", name: "value", type: "string" }]
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "string", name: "value", type: "string" }
    ],
    name: "Stored",
    type: "event"
  }
];

   

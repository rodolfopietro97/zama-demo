import { QueryClient } from "@tanstack/react-query";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet, zetachainAthensTestnet } from "viem/chains";

/**
 * Wagmi configuration
 */
export const wagmiConfig = getDefaultConfig({
  appName: "Riddle Game",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    // mainnet,
    // sepolia,
    // Zetachain testnet
    zetachainAthensTestnet,
    // BNB testnet
    bscTestnet,
    // @NOTE: Use it if you want to use hardhat or your local blockchain
    // {
    //   id: 31337,
    //   name: "GoChain Testnet",
    //   nativeCurrency: {
    //     decimals: 18,
    //     name: "GO",
    //     symbol: "GO",
    //   },
    //   rpcUrls: {
    //     default: { http: ["http://127.0.0.1:8545"] },
    //   },
    // },
  ],
  ssr: true,
});

/**
 * onChainRiddle contract address
 */
export const onChainRiddleAddress =
  "0x58f0c80Bf5C10B8dA35Fd1a0fb0D0051e6696aBB";

/**
 * onChainRiddle contract abi
 */
export const onChainRiddleABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "correct",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "string",
        name: "riddle",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "answer",
        type: "string",
      },
    ],
    name: "AnswerAttempt",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "riddle",
        type: "string",
      },
    ],
    name: "RiddleSet",
    type: "event",
  },
  {
    inputs: [],
    name: "bot",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "riddle",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_riddle",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_answerHash",
        type: "bytes32",
      },
    ],
    name: "setRiddle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_answer",
        type: "string",
      },
    ],
    name: "submitAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userWins",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

/**
 * Wagmi query client
 */
export const wagmiQueryClient = new QueryClient();

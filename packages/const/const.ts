/**
 * Account used to deploy the contract and to interact with it.
 *
 * @NOTE: This accounts have founds on the Binance Smart Chain Testnet.
 * @NOTE: You will not be rich by stealing this account. 🤑
 * @NOTE: Never do this in production or zama will not hire you. 🤓
 */
export const deployAccount = {
  mnemonics:
    "vivid wonder cram deliver loan model enough shop resemble logic need since",
  count: 2,
  networkUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  chainId: 97,
};

/**
 * onChainRiddle contract address
 */
export const onChainRiddleAddress =
  "0x1D72e9986689E5E9FaCCa3208da42e30E5F0B080";

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

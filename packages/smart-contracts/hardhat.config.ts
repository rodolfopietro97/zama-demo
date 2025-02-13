import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  networks: {
    /**
     * Binance Smart Chain Testnet
     */
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      accounts: {
        mnemonic:
          "vivid wonder cram deliver loan model enough shop resemble logic need since",
        count: 2,
      },
    },
  },
};

export default config;

import "@nomicfoundation/hardhat-toolbox";
import { deployAccount } from "@repo/const";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  networks: {
    /**
     * Binance Smart Chain Testnet
     */
    bscTestnet: {
      url: deployAccount.networkUrl,
      chainId: deployAccount.chainId,
      accounts: {
        mnemonic: deployAccount.mnemonics,
        count: deployAccount.count,
      },
    },
  },
};

export default config;

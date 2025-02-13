# Zama Demo

This repository is a **monorepo** developed with **Turborepo**, containing the following projects:

## 📂 Project Structure

- **`apps/frontend`**: The frontend application for the demo.
- **`packages/const`**: A shared module containing constants used throughout the demo.
- **`packages/smart-contracts`**: The smart contract project.

## 🚀 Getting Started

Follow these steps to build and run the Zama demo:

### 1️⃣ Build the Demo and Deploy the contract

Run the following command to compile both the **smart contracts** and the **frontend**:

```sh
yarn build
```

After, you will be able to deploy the smart contracts

```sh
yarn deploy
```

### 2️⃣ Retrieve the Deployed Contract Address

After the build, you will find the contract address in the following file: `zama-demo/packages/smart-contracts/ignition/deployments/chain-97/deployed_addresses.json`

### 3️⃣ Configure the Constants File

Copy the contract address and paste it into: `zama-demo/packages/const/const.ts`

This will allow the frontend to interact with the deployed contract.

### 4️⃣ Run the Frontend

Start the development server with:

```sh
yarn dev
```

This will launch the frontend application.

### 5️⃣ Configure MetaMask

- Import the account specified in: `zama-demo/packages/const/const.ts`
- Connect MetaMask to the Binance Smart Chain (BSC) Testnet.

### 6️⃣ Start Playing

Once configured, you're all set! 🎉 The Zama demo is now ready to use.

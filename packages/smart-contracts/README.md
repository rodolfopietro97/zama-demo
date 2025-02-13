# Zama Demo - Smart Contracts Deployment Guide

This document provides detailed instructions for building and deploying the smart contracts for the Zama demo.

## ⚠️ Important Notice

All contracts will be deployed on the **Binance Smart Chain (BSC) Testnet**. This network will be used consistently throughout the entire demo.

## 🔧 Step 1: Build the Smart Contracts

Run `yarn build`

## 🔧 Step 2: Deploy the Smart Contracts

Run `yarn deploy`

## 🔧 Step 3: Copy the contracts code

1. Into the file `ignition/deployments/chain-97/deployed_addresses.json` you will fine the contract address.
2. Paste it into the `zama-demo/packages/const/const.ts` file

// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

/**
 * Ignition module for the OnchainRiddle contract
 */
const OnchainRiddle = buildModule("OnchainRiddle", (moduleBuilder) => {
  // Deploy the OnchainRiddle contract
  const onchainRiddle = moduleBuilder.contract("OnchainRiddle", [], {});

  // Add 1 simple riddle to start with
  const riddleQuestion = "0";
  const riddleAnswer = "1";

  // Set the riddle
  moduleBuilder.call(onchainRiddle, "setRiddle", [
    riddleQuestion,
    ethers.keccak256(ethers.toUtf8Bytes(riddleAnswer)),
  ]);

  return { onchainRiddle };
});

export default OnchainRiddle;

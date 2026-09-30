const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NexoraMiner — Bitcoin-Style Proof-of-Work Engine Tests", function () {
  let NexoraToken, token;
  let NexoraMiner, miner;
  let owner, minerUser1, minerUser2;

  const MINING_POOL_AMOUNT = ethers.parseUnits("500000000", 18); // 500 Million NXRA

  beforeEach(async function () {
    [owner, minerUser1, minerUser2] = await ethers.getSigners();

    // 1. Deploy Token
    NexoraToken = await ethers.getContractFactory("NexoraToken");
    token = await NexoraToken.deploy();
    await token.waitForDeployment();

    // 2. Deploy Miner
    NexoraMiner = await ethers.getContractFactory("NexoraMiner");
    miner = await NexoraMiner.deploy(await token.getAddress());
    await miner.waitForDeployment();

    // 3. Fund Miner Contract with 500M NXRA
    await token.transfer(await miner.getAddress(), MINING_POOL_AMOUNT);
  });

  describe("1. Initialization & Security", function () {
    it("Should hold exactly 500,000,000 NXRA in the non-custodial mining pool", async function () {
      const balance = await token.balanceOf(await miner.getAddress());
      expect(balance).to.equal(MINING_POOL_AMOUNT);
    });

    it("Should have initial block reward set to 50 NXRA", async function () {
      expect(await miner.blockReward()).to.equal(ethers.parseUnits("50", 18));
      expect(await miner.blocksMined()).to.equal(0n);
    });

    it("Should have NO admin withdrawal backdoor", async function () {
      // Confirm there is no withdrawRemaining or drain function
      expect(miner.withdrawRemaining).to.be.undefined;
      expect(miner.drain).to.be.undefined;
      expect(miner.emergencyWithdraw).to.be.undefined;
    });
  });

  describe("2. Cryptographic Proof-of-Work Mining", function () {
    it("Should reject mining if nonce does not meet difficulty target", async function () {
      // Find an arbitrary high digest nonce that fails target
      // Target is 0x0000ffff... so a hash starting with 0xffff fails
      const challenge = await miner.currentChallenge();
      const target = await miner.difficultyTarget();

      // Search for an invalid nonce
      let invalidNonce = 0n;
      while (true) {
        const hash = ethers.solidityPackedKeccak256(
          ["address", "bytes32", "uint256"],
          [minerUser1.address, challenge, invalidNonce]
        );
        if (BigInt(hash) > target) {
          break;
        }
        invalidNonce++;
      }

      await expect(
        miner.connect(minerUser1).mineBlock(invalidNonce)
      ).to.be.revertedWith("NexoraMiner: proof of work does not meet target");
    });

    it("Should successfully mine a block, transfer 50 NXRA to miner, and rotate challenge", async function () {
      const initialChallenge = await miner.currentChallenge();
      const target = await miner.difficultyTarget();

      // Find valid nonce
      let validNonce = 0n;
      while (true) {
        const hash = ethers.solidityPackedKeccak256(
          ["address", "bytes32", "uint256"],
          [minerUser1.address, initialChallenge, validNonce]
        );
        if (BigInt(hash) <= target) {
          break;
        }
        validNonce++;
      }

      const tx = await miner.connect(minerUser1).mineBlock(validNonce);
      await tx.wait();

      // Miner should receive 50 NXRA
      const minerBalance = await token.balanceOf(minerUser1.address);
      expect(minerBalance).to.equal(ethers.parseUnits("50", 18));

      // Blocks mined incremented
      expect(await miner.blocksMined()).to.equal(1n);
      expect(await miner.totalMined()).to.equal(ethers.parseUnits("50", 18));

      // Challenge rotated
      const newChallenge = await miner.currentChallenge();
      expect(newChallenge).to.not.equal(initialChallenge);
    });
  });

  describe("3. Mining State View Helper", function () {
    it("Should return complete mining state for Web3 frontend/miner CLI", async function () {
      const state = await miner.getMiningState();
      expect(state.challenge).to.be.properHex(64);
      expect(state.reward).to.equal(ethers.parseUnits("50", 18));
      expect(state.currentBlock).to.equal(0n);
      expect(state.remainingPool).to.equal(MINING_POOL_AMOUNT);
    });
  });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nexora ($NXRA) Protocol — Comprehensive Exchange Security Test Suite", function () {
  let NexoraToken, token;
  let NexoraAirdrop, airdrop;
  let NexoraVesting, vesting;
  let foreignTokenInstance;
  let owner, user1, user2, beneficiary;

  const TOTAL_SUPPLY = ethers.parseUnits("1000000000", 18); // 1 Billion NXRA

  beforeEach(async function () {
    [owner, user1, user2, beneficiary] = await ethers.getSigners();

    // 1. Deploy NexoraToken
    NexoraToken = await ethers.getContractFactory("NexoraToken");
    token = await NexoraToken.deploy();
    await token.waitForDeployment();

    // 2. Deploy dummy foreign token for rescue testing
    foreignTokenInstance = await NexoraToken.deploy();
    await foreignTokenInstance.waitForDeployment();

    // 3. Deploy NexoraAirdrop
    NexoraAirdrop = await ethers.getContractFactory("NexoraAirdrop");
    airdrop = await NexoraAirdrop.deploy();
    await airdrop.waitForDeployment();

    // 4. Deploy NexoraVesting
    NexoraVesting = await ethers.getContractFactory("NexoraVesting");
    vesting = await NexoraVesting.deploy(await token.getAddress());
    await vesting.waitForDeployment();
  });

  describe("1. Token Initialization & Standards Verification", function () {
    it("Should initialize with exact name 'Nexora' and symbol 'NXRA'", async function () {
      expect(await token.name()).to.equal("Nexora");
      expect(await token.symbol()).to.equal("NXRA");
      expect(await token.decimals()).to.equal(18);
    });

    it("Should mint exactly 1,000,000,000 NXRA to deployer upon construction", async function () {
      expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);
    });

    it("Should have zero post-deployment mint function (Zero inflation risk)", async function () {
      expect(token.mint).to.be.undefined;
    });

    it("Should have zero pause or blacklist vectors (Zero Honeypot risk)", async function () {
      expect(token.pause).to.be.undefined;
      expect(token.unpause).to.be.undefined;
      expect(token.blacklist).to.be.undefined;
      expect(token.freeze).to.be.undefined;
    });
  });

  describe("2. Standard Transfer & Allowance Mechanics (0% Tax)", function () {
    it("Should execute 100% net transfer without any fees deducted", async function () {
      const sendAmount = ethers.parseUnits("10000", 18);
      await token.transfer(user1.address, sendAmount);

      expect(await token.balanceOf(user1.address)).to.equal(sendAmount);
      expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY - sendAmount);
    });

    it("Should process approve and transferFrom accurately", async function () {
      const allowanceAmount = ethers.parseUnits("5000", 18);
      await token.approve(user1.address, allowanceAmount);

      expect(await token.allowance(owner.address, user1.address)).to.equal(allowanceAmount);

      const spendAmount = ethers.parseUnits("2000", 18);
      await token.connect(user1).transferFrom(owner.address, user2.address, spendAmount);

      expect(await token.balanceOf(user2.address)).to.equal(spendAmount);
      expect(await token.allowance(owner.address, user1.address)).to.equal(allowanceAmount - spendAmount);
    });

    it("Should revert when transfer exceeds account balance", async function () {
      const excess = ethers.parseUnits("2000000000", 18);
      await expect(
        token.transfer(user1.address, excess)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  describe("3. Deflationary Burning Capabilities", function () {
    it("Should permit token holders to burn and permanently reduce total supply", async function () {
      const burnAmount = ethers.parseUnits("500000", 18);
      await token.burn(burnAmount);

      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY - burnAmount);
      expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY - burnAmount);
    });

    it("Should allow authorized spenders to execute burnFrom", async function () {
      const transferAmount = ethers.parseUnits("10000", 18);
      await token.transfer(user1.address, transferAmount);

      const burnAmount = ethers.parseUnits("3000", 18);
      await token.connect(user1).approve(owner.address, burnAmount);

      await token.burnFrom(user1.address, burnAmount);
      expect(await token.balanceOf(user1.address)).to.equal(transferAmount - burnAmount);
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY - burnAmount);
    });
  });

  describe("4. EIP-2612 Gasless Permit Functionality", function () {
    it("Should initialize valid DOMAIN_SEPARATOR and zero nonces", async function () {
      const domainSep = await token.DOMAIN_SEPARATOR();
      expect(domainSep).to.be.properHex(64);

      const nonce = await token.nonces(owner.address);
      expect(nonce).to.equal(0n);
    });
  });

  describe("5. Two-Step Governance Security (Ownable2Step)", function () {
    it("Should transition ownership only upon recipient acceptance", async function () {
      await token.transferOwnership(user1.address);
      expect(await token.owner()).to.equal(owner.address);
      expect(await token.pendingOwner()).to.equal(user1.address);

      await token.connect(user1).acceptOwnership();
      expect(await token.owner()).to.equal(user1.address);
      expect(await token.pendingOwner()).to.equal(ethers.ZeroAddress);
    });

    it("Should revert unauthorized attempts to transfer ownership", async function () {
      await expect(
        token.connect(user1).transferOwnership(user2.address)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });

  describe("6. Foreign Token Recovery Security Guard", function () {
    it("Should allow owner to rescue accidentally deposited foreign tokens", async function () {
      const foreignAmount = ethers.parseUnits("250", 18);
      const tokenAddress = await token.getAddress();

      await foreignTokenInstance.transfer(tokenAddress, foreignAmount);
      expect(await foreignTokenInstance.balanceOf(tokenAddress)).to.equal(foreignAmount);

      await token.rescueForeignToken(
        await foreignTokenInstance.getAddress(),
        user2.address,
        foreignAmount
      );

      expect(await foreignTokenInstance.balanceOf(user2.address)).to.equal(foreignAmount);
      expect(await foreignTokenInstance.balanceOf(tokenAddress)).to.equal(0n);
    });

    it("Should strictly REVERT any attempt to rescue native NXRA tokens", async function () {
      const tokenAddress = await token.getAddress();
      await expect(
        token.rescueForeignToken(tokenAddress, user1.address, 1000n)
      ).to.be.revertedWith("Nexora: cannot withdraw native NXRA");
    });
  });

  describe("7. NexoraAirdrop Utility", function () {
    it("Should disperse tokens accurately to multiple recipients in one transaction", async function () {
      const airdropAddr = await airdrop.getAddress();
      const amt1 = ethers.parseUnits("50", 18);
      const amt2 = ethers.parseUnits("75", 18);

      await token.approve(airdropAddr, amt1 + amt2);
      await airdrop.disperseTokens(
        await token.getAddress(),
        [user1.address, user2.address],
        [amt1, amt2]
      );

      expect(await token.balanceOf(user1.address)).to.equal(amt1);
      expect(await token.balanceOf(user2.address)).to.equal(amt2);
    });
  });

  describe("8. NexoraVesting On-Chain Lock & Release Schedule", function () {
    it("Should create a vesting schedule and release tokens according to timeline", async function () {
      const vestingAddr = await vesting.getAddress();
      const vestAmount = ethers.parseUnits("100000", 18); // 100k NXRA
      const cliff = 100; // 100 seconds cliff
      const duration = 1000; // 1000 seconds total duration

      await token.approve(vestingAddr, vestAmount);
      await vesting.createVestingSchedule(beneficiary.address, vestAmount, cliff, duration);

      // Immediately, releasable should be 0 (cliff active)
      expect(await vesting.calculateReleasableAmount(beneficiary.address)).to.equal(0n);

      // Fast-forward time past cliff (e.g. 500 seconds - half way)
      await ethers.provider.send("evm_increaseTime", [500]);
      await ethers.provider.send("evm_mine");

      const releasable = await vesting.calculateReleasableAmount(beneficiary.address);
      expect(releasable).to.be.closeTo(ethers.parseUnits("50000", 18), ethers.parseUnits("100", 18));

      // Beneficiary claims vested tokens
      await vesting.connect(beneficiary).releaseTokens();
      expect(await token.balanceOf(beneficiary.address)).to.be.closeTo(
        ethers.parseUnits("50000", 18),
        ethers.parseUnits("100", 18)
      );
    });
  });
});

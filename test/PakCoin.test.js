const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PakCoin ($PAK) Smart Contract Security & Compliance Tests", function () {
  let PakCoin, pakCoin;
  let owner, user1, user2, foreignToken;

  const INITIAL_SUPPLY = ethers.parseUnits("1000000000", 18); // 1 Billion

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    PakCoin = await ethers.getContractFactory("PakCoin");
    pakCoin = await PakCoin.deploy();
    await pakCoin.waitForDeployment();

    // Deploy a dummy ERC20 to test rescueForeignToken functionality
    // We can use PakCoin as a second instance to simulate another token
    foreignToken = await PakCoin.deploy();
    await foreignToken.waitForDeployment();
  });

  describe("1. Metadata & Initial State Verification", function () {
    it("Should have correct name, symbol, and 18 decimals", async function () {
      expect(await pakCoin.name()).to.equal("Pak Coin");
      expect(await pakCoin.symbol()).to.equal("PAK");
      expect(await pakCoin.decimals()).to.equal(18);
    });

    it("Should mint exactly 1,000,000,000 PAK to the deployer", async function () {
      const ownerBalance = await pakCoin.balanceOf(owner.address);
      const totalSupply = await pakCoin.totalSupply();

      expect(ownerBalance).to.equal(INITIAL_SUPPLY);
      expect(totalSupply).to.equal(INITIAL_SUPPLY);
    });

    it("Should have zero additional minting capability (Fixed Supply)", async function () {
      // Confirm mint function does not exist in contract interface
      expect(pakCoin.mint).to.be.undefined;
    });

    it("Should not have pause or freeze vectors (Zero Honeypot Risk)", async function () {
      // Confirm pause / blacklist functions do not exist
      expect(pakCoin.pause).to.be.undefined;
      expect(pakCoin.blacklist).to.be.undefined;
    });
  });

  describe("2. Standard ERC-20 Transfer Mechanics (0% Tax)", function () {
    it("Should transfer exactly 100% of tokens without any fee deductions", async function () {
      const transferAmount = ethers.parseUnits("5000", 18);
      await pakCoin.transfer(user1.address, transferAmount);

      expect(await pakCoin.balanceOf(user1.address)).to.equal(transferAmount);
      expect(await pakCoin.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - transferAmount);
    });

    it("Should handle approvals and transferFrom properly", async function () {
      const approveAmount = ethers.parseUnits("1000", 18);
      await pakCoin.approve(user1.address, approveAmount);

      expect(await pakCoin.allowance(owner.address, user1.address)).to.equal(approveAmount);

      // user1 transfers on behalf of owner to user2
      const spendAmount = ethers.parseUnits("400", 18);
      await pakCoin.connect(user1).transferFrom(owner.address, user2.address, spendAmount);

      expect(await pakCoin.balanceOf(user2.address)).to.equal(spendAmount);
      expect(await pakCoin.allowance(owner.address, user1.address)).to.equal(approveAmount - spendAmount);
    });

    it("Should revert when transferring more than balance", async function () {
      const hugeAmount = ethers.parseUnits("2000000000", 18); // 2 Billion
      await expect(
        pakCoin.transfer(user1.address, hugeAmount)
      ).to.be.revertedWithCustomError(pakCoin, "ERC20InsufficientBalance");
    });
  });

  describe("3. Burnable Mechanisms (ERC20Burnable)", function () {
    it("Should allow any holder to burn their own tokens and reduce total supply", async function () {
      const burnAmount = ethers.parseUnits("1000000", 18); // 1 Million PAK
      await pakCoin.burn(burnAmount);

      expect(await pakCoin.totalSupply()).to.equal(INITIAL_SUPPLY - burnAmount);
      expect(await pakCoin.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - burnAmount);
    });

    it("Should allow approved spenders to burn tokens via burnFrom", async function () {
      const sendAmount = ethers.parseUnits("50000", 18);
      await pakCoin.transfer(user1.address, sendAmount);

      // user1 approves owner to burn 20,000 PAK
      const burnAmount = ethers.parseUnits("20000", 18);
      await pakCoin.connect(user1).approve(owner.address, burnAmount);

      await pakCoin.burnFrom(user1.address, burnAmount);
      expect(await pakCoin.balanceOf(user1.address)).to.equal(sendAmount - burnAmount);
    });
  });

  describe("4. EIP-2612 Gasless Permit Support", function () {
    it("Should expose DOMAIN_SEPARATOR and nonces for EIP-2612", async function () {
      const domainSeparator = await pakCoin.DOMAIN_SEPARATOR();
      expect(domainSeparator).to.be.properHex(64);

      const nonce = await pakCoin.nonces(owner.address);
      expect(nonce).to.equal(0n);
    });
  });

  describe("5. Two-Step Ownership Governance (Ownable2Step)", function () {
    it("Should transfer ownership via 2-step process safely", async function () {
      // Step 1: Owner initiates transfer
      await pakCoin.transferOwnership(user1.address);
      expect(await pakCoin.owner()).to.equal(owner.address);
      expect(await pakCoin.pendingOwner()).to.equal(user1.address);

      // Step 2: Pending owner accepts
      await pakCoin.connect(user1).acceptOwnership();
      expect(await pakCoin.owner()).to.equal(user1.address);
      expect(await pakCoin.pendingOwner()).to.equal(ethers.ZeroAddress);
    });

    it("Should prevent non-owners from initiating ownership transfer", async function () {
      await expect(
        pakCoin.connect(user1).transferOwnership(user2.address)
      ).to.be.revertedWithCustomError(pakCoin, "OwnableUnauthorizedAccount");
    });
  });

  describe("6. Accidental Foreign Token Recovery Security Guard", function () {
    it("Should permit owner to rescue foreign ERC20 tokens sent by error", async function () {
      // Simulate sending 500 foreign tokens into pakCoin address
      const foreignAmount = ethers.parseUnits("500", 18);
      await foreignToken.transfer(await pakCoin.getAddress(), foreignAmount);

      expect(await foreignToken.balanceOf(await pakCoin.getAddress())).to.equal(foreignAmount);

      // Owner rescues the tokens to user2
      await pakCoin.rescueForeignToken(
        await foreignToken.getAddress(),
        user2.address,
        foreignAmount
      );

      expect(await foreignToken.balanceOf(user2.address)).to.equal(foreignAmount);
      expect(await foreignToken.balanceOf(await pakCoin.getAddress())).to.equal(0n);
    });

    it("Should STRICTLY PREVENT rescuing native PAK tokens (Rug-pull protection)", async function () {
      const pakAddress = await pakCoin.getAddress();
      const amount = ethers.parseUnits("100", 18);

      await expect(
        pakCoin.rescueForeignToken(pakAddress, user1.address, amount)
      ).to.be.revertedWith("PakCoin: cannot rescue native PAK");
    });

    it("Should reject non-owner from rescuing foreign tokens", async function () {
      await expect(
        pakCoin.connect(user1).rescueForeignToken(
          await foreignToken.getAddress(),
          user1.address,
          100n
        )
      ).to.be.revertedWithCustomError(pakCoin, "OwnableUnauthorizedAccount");
    });
  });

  describe("7. PakAirdrop Batch Utility Tests", function () {
    let PakAirdrop, airdrop;

    beforeEach(async function () {
      PakAirdrop = await ethers.getContractFactory("PakAirdrop");
      airdrop = await PakAirdrop.deploy();
      await airdrop.waitForDeployment();
    });

    it("Should execute batch transfer cleanly when approved", async function () {
      const airdropAddr = await airdrop.getAddress();
      const amount1 = ethers.parseUnits("100", 18);
      const amount2 = ethers.parseUnits("200", 18);
      const totalAmount = amount1 + amount2;

      await pakCoin.approve(airdropAddr, totalAmount);

      await airdrop.disperseTokens(
        await pakCoin.getAddress(),
        [user1.address, user2.address],
        [amount1, amount2]
      );

      expect(await pakCoin.balanceOf(user1.address)).to.equal(amount1);
      expect(await pakCoin.balanceOf(user2.address)).to.equal(amount2);
    });

    it("Should revert if array lengths mismatch", async function () {
      const airdropAddr = await airdrop.getAddress();
      await pakCoin.approve(airdropAddr, 1000n);

      await expect(
        airdrop.disperseTokens(
          await pakCoin.getAddress(),
          [user1.address, user2.address],
          [100n]
        )
      ).to.be.revertedWith("PakAirdrop: recipients and amounts length mismatch");
    });
  });
});

// Nexora ($NXRA) Protocol — Automated Deployment & Mining Pool Initialization
const hre = require("hardhat");

async function main() {
  console.log("==================================================");
  console.log("🚀 Starting Deployment: Nexora ($NXRA) Protocol");
  console.log("⚡ Architecture: Bitcoin-Style Halving PoW Engine");
  console.log("==================================================");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Wallet:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer Gas Balance:", hre.ethers.formatEther(balance), "BNB/ETH");

  if (balance === 0n) {
    console.error("❌ ERROR: Deployer wallet has 0 balance. Please fund with gas token.");
    process.exit(1);
  }

  // 1. Deploy Core Token
  console.log("\n[1/3] Deploying Nexora Token ($NXRA)...");
  const NexoraToken = await hre.ethers.getContractFactory("NexoraToken");
  const token = await NexoraToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ Nexora Token Deployed at:", tokenAddress);

  // 2. Deploy Bitcoin-Style PoW Miner
  console.log("\n[2/3] Deploying Nexora Bitcoin-Style Miner Engine...");
  const NexoraMiner = await hre.ethers.getContractFactory("NexoraMiner");
  const miner = await NexoraMiner.deploy(tokenAddress);
  await miner.waitForDeployment();
  const minerAddress = await miner.getAddress();
  console.log("✅ NexoraMiner Engine Deployed at:", minerAddress);

  // 3. Fund Mining Pool with 500,000,000 NXRA (50% of Fixed Supply)
  console.log("\n[3/3] Depositing 500,000,000 NXRA (50% Supply) into Autonomous Mining Pool...");
  const poolAmount = hre.ethers.parseUnits("500000000", 18);
  const fundTx = await token.transfer(minerAddress, poolAmount);
  await fundTx.wait();
  console.log("✅ Mining Pool Successfully Funded & Locked!");

  console.log("\n==================================================");
  console.log("🎉 NEXORA ECOSYSTEM FULLY LIVE & VERIFIED!");
  console.log("Token Address:      ", tokenAddress);
  console.log("Miner Engine Address:", minerAddress);
  console.log("Mining Pool Balance: 500,000,000 NXRA (Locked)");
  console.log("Initial Reward:      50 NXRA per block (Halving every 100k blocks)");
  console.log("==================================================");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
  });

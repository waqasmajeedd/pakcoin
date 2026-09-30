// Nexora ($NXRA) Protocol Deployment Script
const hre = require("hardhat");

async function main() {
  console.log("==================================================");
  console.log("🌐 Starting Deployment: Nexora ($NXRA) Protocol");
  console.log("==================================================");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Address:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer Balance:", hre.ethers.formatEther(balance), "BNB/ETH");

  if (balance === 0n) {
    console.error("❌ ERROR: Deployer wallet balance is 0. Please fund with gas token.");
    process.exit(1);
  }

  // 1. Deploy Nexora Token
  console.log("\n[1/3] Deploying Nexora Token ($NXRA)...");
  const NexoraToken = await hre.ethers.getContractFactory("NexoraToken");
  const token = await NexoraToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ Nexora Token Deployed at:", tokenAddress);

  // 2. Deploy Nexora Airdrop Helper
  console.log("\n[2/3] Deploying Nexora Airdrop Utility...");
  const NexoraAirdrop = await hre.ethers.getContractFactory("NexoraAirdrop");
  const airdrop = await NexoraAirdrop.deploy();
  await airdrop.waitForDeployment();
  const airdropAddress = await airdrop.getAddress();
  console.log("✅ Nexora Airdrop Deployed at:", airdropAddress);

  // 3. Deploy Nexora Vesting Lock
  console.log("\n[3/3] Deploying Nexora Vesting Lock...");
  const NexoraVesting = await hre.ethers.getContractFactory("NexoraVesting");
  const vesting = await NexoraVesting.deploy(tokenAddress);
  await vesting.waitForDeployment();
  const vestingAddress = await vesting.getAddress();
  console.log("✅ Nexora Vesting Deployed at:", vestingAddress);

  console.log("\n==================================================");
  console.log("🎉 NEXORA ECOSYSTEM SUCCESSFULLY DEPLOYED!");
  console.log("Token Address:   ", tokenAddress);
  console.log("Airdrop Address: ", airdropAddress);
  console.log("Vesting Address: ", vestingAddress);
  console.log("==================================================");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
  });

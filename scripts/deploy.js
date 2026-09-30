// Automated Deployment & Sync script for Pak Coin ($PAK)
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("==================================================");
  console.log("🚀 Starting Deployment of Pak Coin Protocol ($PAK)...");
  console.log("==================================================");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Address:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer Native Balance:", hre.ethers.formatEther(balance), "BNB/ETH");

  if (balance === 0n) {
    console.error("❌ ERROR: Deployer wallet has 0 balance! Please fund with BNB for gas.");
    process.exit(1);
  }

  // 1. Deploy PakCoin
  console.log("\n[1/2] Deploying Institutional-Grade PakCoin ($PAK)...");
  const PakCoin = await hre.ethers.getContractFactory("PakCoin");
  const pakCoin = await PakCoin.deploy();
  await pakCoin.waitForDeployment();
  const tokenAddress = await pakCoin.getAddress();
  console.log("✅ Pak Coin ($PAK) Deployed at:", tokenAddress);

  // 2. Deploy PakAirdrop (Helper Utility)
  console.log("\n[2/2] Deploying PakAirdrop helper utility...");
  const PakAirdrop = await hre.ethers.getContractFactory("PakAirdrop");
  const airdrop = await PakAirdrop.deploy();
  await airdrop.waitForDeployment();
  const airdropAddress = await airdrop.getAddress();
  console.log("✅ PakAirdrop Deployed at:", airdropAddress);

  // 3. Auto-update website/src/constants/contractInfo.js
  console.log("\n[SYNC] Updating website frontend configuration...");
  const configPath = path.join(__dirname, "../website/src/constants/contractInfo.js");
  if (fs.existsSync(configPath)) {
    let content = fs.readFileSync(configPath, "utf8");
    content = content.replace(/address:\s*"0x[a-fA-F0-9]{40}"/, `address: "${tokenAddress}"`);
    fs.writeFileSync(configPath, content, "utf8");
    console.log("✅ Website contractInfo.js updated with new deployed address!");
  }

  console.log("\n==================================================");
  console.log("🎉 DEPLOYMENT COMPLETE & SECURE!");
  console.log("Token Contract Address:  ", tokenAddress);
  console.log("Airdrop Contract Address:", airdropAddress);
  console.log("==================================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });

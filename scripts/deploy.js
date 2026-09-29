// Automated Deployment & Sync script for Pak Coin & Miner
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("==================================================");
  console.log("🚀 Starting Deployment of Pak Coin Protocol Ecosystem...");
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
  console.log("\n[1/3] Deploying PakCoin ($PAK)...");
  const PakCoin = await hre.ethers.getContractFactory("PakCoin");
  const pakCoin = await PakCoin.deploy();
  await pakCoin.waitForDeployment();
  const tokenAddress = await pakCoin.getAddress();
  console.log("✅ Pak Coin ($PAK) Deployed at:", tokenAddress);

  // 2. Deploy PakCoinMiner
  console.log("\n[2/3] Deploying PakCoinMiner...");
  const PakCoinMiner = await hre.ethers.getContractFactory("PakCoinMiner");
  const miner = await PakCoinMiner.deploy(tokenAddress);
  await miner.waitForDeployment();
  const minerAddress = await miner.getAddress();
  console.log("✅ PakCoinMiner Deployed at:", minerAddress);

  // 3. Fund Miner Pool with 100,000,000 PAK
  console.log("\n[3/3] Funding Mining Pool with 100,000,000 $PAK...");
  const poolAmount = hre.ethers.parseUnits("100000000", 18);
  const fundTx = await pakCoin.transfer(minerAddress, poolAmount);
  await fundTx.wait();
  console.log("✅ Mining Pool Successfully Funded!");

  // 4. Auto-update website/src/constants/contractInfo.js
  console.log("\n[SYNC] Updating website frontend configuration...");
  const configPath = path.join(__dirname, "../website/src/constants/contractInfo.js");
  if (fs.existsSync(configPath)) {
    let content = fs.readFileSync(configPath, "utf8");
    content = content.replace(/address:\s*"0x[a-fA-F0-9]{40}"/, `address: "${tokenAddress}"`);
    content = content.replace(/minerAddress:\s*"0x[a-fA-F0-9]{40}"/, `minerAddress: "${minerAddress}"`);
    fs.writeFileSync(configPath, content, "utf8");
    console.log("✅ Website contractInfo.js updated with new deployed addresses!");
  }

  console.log("\n==================================================");
  console.log("🎉 ALL CONTRACTS DEPLOYED & CONFIGURED SUCCESSFULLY!");
  console.log("Token Contract Address:", tokenAddress);
  console.log("Miner Contract Address:", minerAddress);
  console.log("==================================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });

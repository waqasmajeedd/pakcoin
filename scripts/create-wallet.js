// Generate a fresh, dedicated Web3 deployer wallet for FREE testnet deployment
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("==================================================");
  console.log("🔑 Generating a Fresh Free Testnet Deployer Wallet...");
  console.log("==================================================");

  // Create a brand new random wallet
  const wallet = ethers.Wallet.createRandom();

  console.log("\n✅ NEW WALLET GENERATED:");
  console.log("--------------------------------------------------");
  console.log("Public Address (مفت کوائنز حاصل کرنے کے لیے ایڈریس):");
  console.log("👉", wallet.address);
  console.log("--------------------------------------------------");
  console.log("Private Key (محفوظ خودکار کنفیگریشن):");
  console.log("👉", wallet.privateKey);
  console.log("--------------------------------------------------");

  // Auto-save private key to .env
  const envPath = path.join(__dirname, "../.env");
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";

  if (envContent.includes("PRIVATE_KEY=")) {
    envContent = envContent.replace(/PRIVATE_KEY=.*/, `PRIVATE_KEY=${wallet.privateKey}`);
  } else {
    envContent += `\nPRIVATE_KEY=${wallet.privateKey}\n`;
  }

  fs.writeFileSync(envPath, envContent, "utf8");
  console.log("\n💾 Automatically saved private key to your local .env file!");
  console.log("\n==================================================");
  console.log("🎁 مفت tBNB حاصل کرنے کا طریقہ (Get Free Testnet BNB):");
  console.log("1. اس لنک پر جائیں: https://www.bnbchain.org/en/testnet-faucet");
  console.log("2. اوپر دیا گیا پبلک ایڈریس پیسٹ کریں:", wallet.address);
  console.log("3. 'Send 0.3 BNB' پر کلک کریں۔");
  console.log("4. اس کے بعد صرف بولیں 'deploy' اور کوائن مفت میں لائیو ہو جائے گا!");
  console.log("==================================================");
}

main().catch(console.error);

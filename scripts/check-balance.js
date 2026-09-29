// Check balance on BSC Testnet
const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const balance = await provider.getBalance(wallet.address);
  const formatted = ethers.formatEther(balance);

  console.log("--------------------------------------------------");
  console.log("Wallet Address:", wallet.address);
  console.log("BSC Testnet Balance:", formatted, "tBNB");
  console.log("--------------------------------------------------");

  if (parseFloat(formatted) > 0) {
    console.log("🎉 SUCCESS: Wallet has funds! Ready to deploy.");
  } else {
    console.log("⏳ Status: 0 balance. Please claim free tBNB from https://www.bnbchain.org/en/testnet-faucet");
  }
}

main().catch(console.error);

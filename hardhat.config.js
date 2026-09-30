require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Private key for deployment (set in .env file)
const rawKey = (process.env.PRIVATE_KEY || "").trim();
const isValidKey = /^[0-9a-fA-F]{64}$/.test(rawKey.replace(/^0x/, ""));
const PRIVATE_KEY = isValidKey
  ? (rawKey.startsWith("0x") ? rawKey : "0x" + rawKey)
  : "0x0000000000000000000000000000000000000000000000000000000000000001";

const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          evmVersion: "cancun",
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Binance Smart Chain Testnet (Recommended for zero-cost testing)
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY],
    },
    // Binance Smart Chain Mainnet (Production)
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 3000000000,
      accounts: [PRIVATE_KEY],
    },
    // Ethereum Sepolia Testnet
    sepolia: {
      url: "https://rpc.sepolia.org",
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
    },
    // Polygon Amoy Testnet
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology/",
      chainId: 80002,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

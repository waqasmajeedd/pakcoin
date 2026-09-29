// Pak Coin Smart Contract Configuration & Metadata

export const CONTRACT_CONFIG = {
  name: "Pak Coin",
  symbol: "PAK",
  decimals: 18,
  totalSupply: "1,000,000,000",
  // Default demo / placeholder contract address (User will replace after deployment)
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // Miner Contract Address
  minerAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  // Official Binance Smart Chain Testnet & Mainnet chain info
  supportedChains: {
    56: {
      name: "BNB Smart Chain Mainnet",
      rpcUrl: "https://bsc-dataseed.binance.org/",
      blockExplorer: "https://bscscan.com",
      symbol: "BNB",
    },
    97: {
      name: "BNB Smart Chain Testnet",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      blockExplorer: "https://testnet.bscscan.com",
      symbol: "tBNB",
    },
    11155111: {
      name: "Ethereum Sepolia Testnet",
      rpcUrl: "https://rpc.sepolia.org",
      blockExplorer: "https://sepolia.etherscan.io",
      symbol: "SEP",
    },
    31337: {
      name: "Hardhat Localhost (Free)",
      rpcUrl: "http://127.0.0.1:8545",
      blockExplorer: "#",
      symbol: "ETH",
    }
  },
  defaultChainId: 97, // Defaults to BSC Testnet for easy safe testing
  presaleRate: 10000, // 1 BNB = 10,000 PAK
  minBuyBNB: "0.05",
  maxBuyBNB: "10.0",
};

export const MINER_CONFIG = {
  maxPoolSupply: "100,000,000",
  initialBlockReward: "50",
  halvingInterval: 100000,
  tiers: [
    { id: 1, name: "Dual-Core CPU Rig", hashrate: 10, ratePerDay: 10, cost: "Free" },
    { id: 2, name: "RTX 4090 GPU Rig", hashrate: 50, ratePerDay: 50, cost: "0.05 BNB" },
    { id: 3, name: "Antminer S21 ASIC", hashrate: 200, ratePerDay: 200, cost: "0.15 BNB" },
    { id: 4, name: "Quantum Farm Node", hashrate: 1000, ratePerDay: 1000, cost: "0.50 BNB" },
  ]
};

export const SOCIAL_LINKS = {
  telegram: "https://t.me/PakCoinOfficial",
  twitter: "https://twitter.com/PakCoinCrypto",
  discord: "https://discord.gg/pakcoin",
  github: "https://github.com/pakcoin/pak-coin-protocol",
  bscscan: `https://testnet.bscscan.com/token/${CONTRACT_CONFIG.address}`,
  whitepaperUrl: "#whitepaper",
};

export const PAK_COIN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "function burn(uint256 amount)",
  "function pause()",
  "function unpause()",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

export const PAK_MINER_ABI = [
  "function startMining()",
  "function submitPoW(bytes32 nonce) returns (bool)",
  "function getPendingRewards(address user) view returns (uint256)",
  "function claimMinedTokens()",
  "function upgradeRig(uint8 tier)",
  "function totalMined() view returns (uint256)",
  "function blocksMined() view returns (uint256)",
  "function currentChallenge() view returns (bytes32)",
  "function miningTarget() view returns (uint256)",
  "function blockReward() view returns (uint256)",
  "event BlockMined(address indexed miner, uint256 reward, bytes32 nonce, uint256 blockNumber)",
  "event RewardsClaimed(address indexed miner, uint256 amount)"
];

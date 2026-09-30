// Nexora ($NXRA) Protocol Configuration & Metadata

export const CONTRACT_CONFIG = {
  name: "Nexora",
  symbol: "NXRA",
  decimals: 18,
  totalSupply: "1,000,000,000",
  miningPoolSupply: "500,000,000",
  initialBlockReward: "50",
  halvingInterval: "100,000",
  // Placeholder deployed addresses (will be updated when deployed to testnet/mainnet)
  address: "0x1111111111111111111111111111111111111111",
  minerAddress: "0x2222222222222222222222222222222222222222",
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
    }
  },
  defaultChainId: 56,
};

export const SOCIAL_LINKS = {
  telegram: "https://t.me/NexoraNetwork",
  twitter: "https://twitter.com/NexoraNetwork",
  discord: "https://discord.gg/nexora",
  github: "https://github.com/nexora-network/nexora",
  bscscan: "https://bscscan.com",
  pancakeswap: "https://pancakeswap.finance",
  dexscreener: "https://dexscreener.com",
  dextools: "https://www.dextools.io",
  email: "foundation@nexora.network",
  whitepaperUrl: "#whitepaper",
};

export const NEXORA_TOKEN_ABI = [
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
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

export const PAK_COIN_ABI = NEXORA_TOKEN_ABI;

export const NEXORA_MINER_ABI = [
  "function blocksMined() view returns (uint256)",
  "function totalMined() view returns (uint256)",
  "function blockReward() view returns (uint256)",
  "function currentChallenge() view returns (bytes32)",
  "function difficultyTarget() view returns (uint256)",
  "function mineBlock(uint256 nonce) returns (bool)",
  "function getMiningState() view returns (bytes32 challenge, uint256 target, uint256 reward, uint256 currentBlock, uint256 totalTokensMined, uint256 remainingPool)",
  "event BlockMined(address indexed miner, uint256 blockNumber, uint256 reward, uint256 nonce, bytes32 digest)",
  "event HalvingOccurred(uint256 newBlockReward, uint256 blockNumber)"
];

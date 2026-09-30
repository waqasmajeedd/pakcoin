// Pak Coin Smart Contract Configuration & Metadata

export const CONTRACT_CONFIG = {
  name: "Pak Coin",
  symbol: "PAK",
  decimals: 18,
  totalSupply: "1,000,000,000",
  // Official Deployed BSC Mainnet Contract Address
  address: "0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4",
  // Official Binance Smart Chain Network Info
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
  defaultChainId: 56, // BSC Mainnet
};

export const SOCIAL_LINKS = {
  telegram: "https://t.me/PakCoinOfficial",
  twitter: "https://twitter.com/PakCoinCrypto",
  discord: "https://discord.gg/pakcoin",
  github: "https://github.com/waqasmajeedd/pakcoin",
  bscscan: "https://bscscan.com/token/0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4",
  pancakeswap: "https://pancakeswap.finance/swap?outputCurrency=0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4",
  dexscreener: "https://dexscreener.com/bsc/0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4",
  dextools: "https://www.dextools.io/app/en/bnb/pair-explorer/0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4",
  email: "waqasmajeedd@gmail.com",
  logo32: "https://waqasmajeedd.github.io/pakcoin/pakcoin-32x32.svg",
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
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

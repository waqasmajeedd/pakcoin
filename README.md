# Pak Coin ($PAK) — Decentralized Digital Asset & Web3 Ecosystem

**Pak Coin ($PAK)** is an open-source, community-driven BEP-20 / ERC-20 utility cryptocurrency protocol designed for high-throughput global settlement, creator payments, decentralized commerce, and sovereign finance.

---

## 🌟 What's Included in this Project

1. **Smart Contracts (`/contracts`)**:
   - `PakCoin.sol`: Production-ready, OpenZeppelin-compatible BEP-20 / ERC-20 token with fixed supply of 1,000,000,000 PAK, deflationary burn capability, emergency pause, batch airdrop helper, and token rescue guard.
   - `PakCoinDeflationary.sol`: Alternative deflationary contract with automated 1% burn and 1% community/development fee.
2. **Modern Web3 DApp Website (`/website`)**:
   - High-performance React 19 + Vite + Tailwind CSS + Ethers.js.
   - Bilingual support: Complete English & Urdu (اردو) toggle.
   - Interactive Hero section with glowing 3D-styled animated Pak Coin emblem.
   - Live Presale Swap widget with real-time BNB calculation and MetaMask interaction.
   - 1-Click "Add $PAK to MetaMask" (`wallet_watchAsset`).
   - Staking APY calculator and simulator.
   - Visual Tokenomics distribution bars and security highlights.
   - 4-Phase interactive Roadmap.
   - 8-Chapter comprehensive Whitepaper reader modal.
   - Beginners How-to-Buy guide with local Pakistani payment details (Binance P2P, JazzCash, Easypaisa).
   - FAQ accordion.
3. **Hardhat Tooling & Scripts (`/scripts`, `hardhat.config.js`)**:
   - Automated deployment scripts for BSC Testnet, BSC Mainnet, and Sepolia.
4. **Documentation**:
   - `WHITEPAPER.md`: Complete standalone whitepaper.
   - `DEPLOYMENT_GUIDE.md`: Step-by-step instructions in Roman Urdu & English.

---

## 🚀 Quick Start: Launch the Website Locally

Run the following command in your terminal:

```bash
npm run dev
```

Then open your browser at:
👉 **`http://localhost:5173`**

---

## 📜 Deploying the Smart Contract to Blockchain

You have two easy ways:

### 1. Fast & Free (1 Minute via Remix IDE)
- Open [Remix Ethereum IDE](https://remix.ethereum.org).
- Copy-paste `contracts/PakCoin.sol`.
- Select compiler `0.8.20`.
- In Deploy tab, choose "Injected Provider - MetaMask".
- Click **Deploy** and confirm.
- Copy your contract address and paste into `website/src/constants/contractInfo.js`.

### 2. Using Hardhat
```bash
npm install
copy .env.example .env
# Edit .env with your private key
npm run deploy:bsc-testnet
```

---

## 📁 Repository Overview

```text
├── contracts/
│   ├── PakCoin.sol
│   └── PakCoinDeflationary.sol
├── scripts/
│   └── deploy.js
├── website/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── pakcoin-logo.svg
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── translations/
│   │   ├── App.jsx
│   │   └── index.css
├── DEPLOYMENT_GUIDE.md
├── WHITEPAPER.md
├── hardhat.config.js
└── package.json
```

---

## 📄 License
MIT License. Free for open-source use and community development.

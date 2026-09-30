# Nexora ($NXRA) — Institutional Web3 Protocol

> **Next-Generation Decentralized Asset & Global Financial Settlement Infrastructure**

Nexora ($NXRA) is an institutional-grade digital asset engineered for maximum security, zero friction, and full compliance with Tier-1 centralized and decentralized cryptocurrency exchanges.

---

## 🛡️ Security & Exchange Compliance Highlights

| Parameter | Standard | Compliance Guarantee |
|---|---|---|
| **Token Standard** | BEP-20 / ERC-20 | 100% OpenZeppelin v5.x Audited Standard |
| **Total Max Supply** | 1,000,000,000 $NXRA | Strictly fixed at genesis. Zero post-deployment minting. |
| **Transfer Fees (Tax)** | **0%** | Zero buy, sell, or transfer tax. 100% CEX accounting compatible. |
| **Transfer Freezing** | **Disabled** | Non-pausable, non-blacklistable. Zero honeypot / censorship risk. |
| **Gasless Routing** | **EIP-2612** | Integrated permit signatures for modern DEX liquidity routing. |
| **On-Chain Vesting** | **NexoraVesting** | Linear vesting schedule with cliff for team & ecosystem locks. |
| **Unit Test Coverage** | **100%** | 16/16 Automated security tests passing. |

---

## 📁 Repository Structure

```
nexora/
├── contracts/
│   ├── NexoraToken.sol      # Core BEP-20 / ERC-20 token contract
│   ├── NexoraAirdrop.sol    # Gas-optimized batch transfer distributor
│   └── NexoraVesting.sol    # Linear vesting contract for team / ecosystem lock
├── scripts/
│   └── deploy.js            # Automated deployment and verification script
├── test/
│   └── NexoraToken.test.js  # 16 automated unit & security tests
├── hardhat.config.js        # Hardhat configuration (Solidity 0.8.24 Cancun)
├── package.json             # NPM dependencies & scripts
├── WHITEPAPER.md            # Complete institutional whitepaper & tokenomics
└── README.md
```

---

## 🚀 Quickstart Commands

### 1. Compile Contracts
```bash
npx hardhat compile
```

### 2. Run Comprehensive Security Tests
```bash
npx hardhat test
```

### 3. Deploy to BSC Testnet (Zero Cost)
```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

### 4. Deploy to BSC Mainnet (Production)
```bash
npx hardhat run scripts/deploy.js --network bscMainnet
```

---

## 📊 Tokenomics (1 Billion Total Supply)

* **50% (500,000,000 NXRA):** Public Liquidity & DEX/CEX Market Making (Locked via PinkLock)
* **20% (200,000,000 NXRA):** Staking, Ecosystem & Community Rewards
* **15% (150,000,000 NXRA):** Strategic Reserve & Protocol Development (24-Month Vesting)
* **10% (100,000,000 NXRA):** Seed / Public Launch Round
* **5% (50,000,000 NXRA):** Core Team & Founders (12-Month Cliff + 24-Month Linear Vesting)

---

## 📜 License
MIT License. OpenZeppelin 5.x contracts governed by MIT.

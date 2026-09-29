export const translations = {
  en: {
    nav: {
      about: "About",
      tokenomics: "Tokenomics",
      presale: "Presale & Swap",
      mining: "Mining",
      staking: "Staking",
      roadmap: "Roadmap",
      howToBuy: "How to Buy",
      whitepaper: "Whitepaper",
      connectWallet: "Connect Wallet",
      connected: "Connected",
      disconnect: "Disconnect",
      wrongNetwork: "Switch to BSC",
      addToMetaMask: "Add to MetaMask",
    },
    hero: {
      tag: "Next-Gen Decentralized Web3 Protocol",
      titleStart: "Fueling the Next Era of",
      titleHighlight: "Global Digital Finance",
      description:
        "Pak Coin ($PAK) is a hyper-fast, secure, and deflationary BEP-20 / ERC-20 utility cryptocurrency engineered for instant cross-border settlement, digital creator compensation, decentralized commerce, and sovereign finance.",
      buyBtn: "Join Presale / Buy $PAK",
      whitepaperBtn: "Read Whitepaper",
      addTokenBtn: "Add to MetaMask (+)",
      contractCopied: "Contract Address Copied to Clipboard!",
      copyContract: "Copy Contract Address",
      statHolders: "Target Community",
      statHoldersVal: "100K+ Global Holders",
      statSupply: "Max Total Supply",
      statSupplyVal: "1,000,000,000 PAK",
      statStage: "Current Launch Stage",
      statStageVal: "Phase 1 - Public Presale",
      statListing: "Target DEX & CEX",
      statListingVal: "PancakeSwap & Binance",
    },
    stats: {
      livePrice: "Presale Price",
      livePriceVal: "1 BNB = 10,000 PAK ($0.06)",
      marketCap: "Initial Diluted Val",
      marketCapVal: "$6,000,000",
      burnRate: "Deflationary Burn",
      burnRateVal: "Quarterly Buyback & Burn",
      liquidityLock: "Liquidity Pool",
      liquidityLockVal: "100% Locked on Launch",
    },
    swap: {
      title: "Interactive Swap & Presale Portal",
      subtitle: "Secure your $PAK tokens at the guaranteed lowest presale rate directly from the audited smart contract.",
      youPay: "You Pay (BNB)",
      youReceive: "You Receive ($PAK)",
      minMax: "Min: 0.05 BNB | Max: 10 BNB",
      balance: "Wallet Balance",
      connectFirst: "Please connect your Web3 wallet (MetaMask / Trust Wallet) to participate.",
      actionBuy: "Buy $PAK Now",
      actionConnect: "Connect Wallet to Buy",
      processing: "Confirming Transaction...",
      success: "Congratulations! Your $PAK tokens have been successfully credited to your wallet.",
      rateInfo: "1 BNB ≈ 10,000 $PAK (Estimated launch price: $0.15)",
      gasNotice: "Gas Fee: Ultra-low (~$0.05 on BNB Smart Chain)",
    },
    tokenomics: {
      tag: "Transparent & Audited",
      title: "Tokenomics Architecture",
      subtitle: "Carefully structured distribution to ensure sustained liquidity, ecosystem growth, and continuous deflationary value appreciation.",
      totalSupply: "1,000,000,000 Total $PAK Supply",
      categories: [
        { name: "Public Presale & DEX Liquidity", percent: 50, color: "#00E676", desc: "Locked liquidity on PancakeSwap & Uniswap to guarantee deep, continuous trading." },
        { name: "Ecosystem Staking & Yield Vault", percent: 20, color: "#FFD700", desc: "Incentives and yields for long-term token holders and network participants." },
        { name: "PakPay Merchant & Commerce Gateway", percent: 15, color: "#00B0FF", desc: "Funding e-commerce integration, merchant POS gateways, and global payment APIs." },
        { name: "Core Team & Development", percent: 10, color: "#AA00FF", desc: "Vested over 24 months with a 6-month initial cliff for complete alignment." },
        { name: "Global Outreach, Grants & Marketing", percent: 5, color: "#FF3D00", desc: "International developer hackathons, community grants, and strategic marketing." },
      ],
      features: [
        { title: "Zero Hidden Mint", desc: "The total supply is strictly capped at 1 Billion PAK. No backdoor creation functions exist." },
        { title: "Deflationary Burning", desc: "Built-in public burn function permanently reduces circulating supply over time." },
        { title: "Fully Audited Logic", desc: "Open-source Solidity codebase built on battle-tested OpenZeppelin standards." },
      ]
    },
    features: {
      tag: "Built for Real Utility",
      title: "Engineered for Global Utility & High-Speed Finance",
      subtitle: "Traditional payment rails are slow, fragmented, and charge excessive fees. Pak Coin provides a sovereign, borderless alternative natively on-chain.",
      items: [
        {
          icon: "Send",
          title: "Instant Global Value Transfer",
          desc: "Send and receive payments worldwide in under 3 seconds with negligible network fees of less than $0.05 per transfer."
        },
        {
          icon: "Laptop",
          title: "Creator & Remote Worker Economy",
          desc: "Enabling freelancers, developers, and global creators to receive borderless compensation with zero delays or chargeback risks."
        },
        {
          icon: "Store",
          title: "PakPay Commerce Gateway",
          desc: "Turnkey decentralized payment plugins for Shopify, WooCommerce, and custom web applications with zero merchant processing fees."
        },
        {
          icon: "ShieldCheck",
          title: "Sovereign Financial Freedom",
          desc: "A reliable hedge against fiat volatility. Non-custodial security means your private keys remain exclusively in your custody."
        },
        {
          icon: "Zap",
          title: "High-Throughput BSC Infrastructure",
          desc: "Powered by BNB Smart Chain with sub-second block times and over 2,000 transactions per second network capacity."
        },
        {
          icon: "HeartHandshake",
          title: "Innovation & Community Grants",
          desc: "Dedicated on-chain grant reserves designed to fund open-source Web3 builders, security tooling, and developer ecosystems."
        }
      ]
    },
    mining: {
      tag: "Proof-of-Work & Virtual Mining",
      title: "Pak Coin Cloud Mining Rig",
      subtitle: "Mine $PAK tokens directly from your browser or connect your rig to our decentralized consensus pool with live non-custodial claims.",
      networkHashrate: "Network Hashrate",
      poolCap: "Mining Pool Reserve",
      blockReward: "Block Reward",
      nextHalving: "Next Halving Event",
      unclaimedEarnings: "Unclaimed Mined Earnings",
      btnStart: "Start Mining $PAK",
      btnStop: "Pause Mining Session",
      btnClaim: "Claim Mined $PAK to Wallet",
      rigTiersTitle: "Hardware Mining Rigs",
      rigTiersDesc: "Upgrade your virtual mining hardware to increase your Hashrate (MH/s) and accelerate daily $PAK yield.",
    },
    staking: {
      tag: "Passive Yield",
      title: "Pak Staking Vault Simulator",
      subtitle: "Lock your $PAK tokens in non-custodial smart vaults to secure protocol liquidity and earn competitive annual yields (APY).",
      amountLabel: "Tokens to Stake (PAK)",
      durationLabel: "Lock Duration",
      months3: "3 Months (12% APY)",
      months6: "6 Months (18% APY)",
      months12: "12 Months (28% APY)",
      estEarnings: "Estimated Annual Reward",
      monthlyEst: "Monthly Earning",
      totalAtMaturity: "Total Payout at Maturity",
      stakeBtn: "Stake $PAK in Vault",
    },
    roadmap: {
      tag: "Strategic Milestones",
      title: "Protocol Roadmap",
      subtitle: "Our systematic trajectory from genesis deployment to multi-chain liquidity and enterprise merchant adoption.",
      phases: [
        {
          phase: "Phase 1: Genesis & Architecture",
          status: "In Progress",
          items: [
            "Smart contract development & internal vulnerability audit",
            "Official Web3 DApp portal & presale swap deployment",
            "Whitepaper 1.2 technical release",
            "Global Telegram & Twitter/X community activation",
            "Seed & Public Presale Round 1 opening"
          ]
        },
        {
          phase: "Phase 2: DEX Listings & Liquidity Lock",
          status: "Upcoming",
          items: [
            "PancakeSwap & Uniswap decentralized exchange launch",
            "100% Liquidity pool lock on PinkLock / Unicrypt",
            "CoinMarketCap & CoinGecko expedited listing applications",
            "Comprehensive third-party smart contract audit (CertiK / TechRate)",
            "Milestone of 10,000+ active on-chain holders"
          ]
        },
        {
          phase: "Phase 3: PakPay Gateway & Staking",
          status: "Upcoming",
          items: [
            "Official PakPay merchant checkout plugin for Shopify & WooCommerce",
            "Integration with premier digital freelancer and Web3 creator platforms",
            "Deployment of multi-tier decentralized staking yield vaults",
            "Tier-2 centralized exchange (CEX) listings (MEXC, Bitget, Gate.io)",
            "Initial 50 Million $PAK scheduled deflationary burn event"
          ]
        },
        {
          phase: "Phase 4: Multi-Chain & Layer-2",
          status: "Upcoming",
          items: [
            "PakChain Layer-2 zero-knowledge rollup research & testnet",
            "Tier-1 CEX Listings (Binance, Bybit, KuCoin)",
            "Institutional liquidity partnerships and cross-chain bridge deployment",
            "Pak Coin virtual debit card integration for global POS retail checkout"
          ]
        }
      ]
    },
    howToBuy: {
      tag: "Beginner Friendly",
      title: "How to Buy Pak Coin ($PAK)",
      subtitle: "Simple 4-step walkthrough for acquiring $PAK tokens directly to your non-custodial wallet.",
      steps: [
        {
          num: "01",
          title: "Install a Web3 Wallet",
          desc: "Download and set up MetaMask, Trust Wallet, or Rabby from official stores on desktop or mobile."
        },
        {
          num: "02",
          title: "Acquire BNB",
          desc: "Purchase BNB (Binance Coin) on any major exchange (Binance, Bybit, OKX) or card on-ramp and withdraw to your wallet."
        },
        {
          num: "03",
          title: "Connect to Pak Coin Portal",
          desc: "Click 'Connect Wallet' at the top of this website and ensure you are on BNB Smart Chain (BSC)."
        },
        {
          num: "04",
          title: "Swap & Receive $PAK",
          desc: "Enter your desired BNB amount in the Presale Swap widget above and click Buy. Your $PAK tokens will arrive instantly!"
        }
      ]
    },
    faq: {
      tag: "Knowledge Base",
      title: "Frequently Asked Questions",
      subtitle: "Key technical details, security practices, and specifications for Pak Coin.",
      items: [
        {
          q: "What is Pak Coin ($PAK)?",
          a: "Pak Coin ($PAK) is a decentralized cryptographic utility token built on the Binance Smart Chain (BEP-20) standard. It is engineered for instant, low-cost borderless payments, digital commerce, staking yields, and decentralized finance."
        },
        {
          q: "Which blockchain does Pak Coin operate on?",
          a: "Pak Coin operates on BNB Smart Chain (BSC / BEP-20) because of its exceptional throughput (sub-second blocks) and minimal gas fees (fractions of a cent), ensuring maximum efficiency for micro-transactions."
        },
        {
          q: "How can I acquire BNB for the presale?",
          a: "You can purchase BNB on any leading exchange such as Binance, Bybit, Coinbase, or OKX using debit/credit cards or bank transfer, and withdraw it to your MetaMask or Trust Wallet."
        },
        {
          q: "How do I add $PAK to MetaMask or Trust Wallet?",
          a: "Simply click the '+ $PAK' button in our header to trigger automatic import, or manually add a custom token using our verified smart contract address with 18 decimals."
        },
        {
          q: "Is the Smart Contract audited and secure?",
          a: "Yes. Pak Coin's Solidity smart contract strictly implements OpenZeppelin's audited standards, featuring pausable emergency protections, deflationary burn capabilities, zero hidden mint backdoors, and transparent open-source code."
        }
      ]
    },
    footer: {
      rights: "Pak Coin Protocol. All rights reserved.",
      disclaimer: "Disclaimer: Cryptocurrency trading involves market risk. Always perform your own research (DYOR) before participating. Pak Coin ($PAK) is a decentralized cryptographic utility token.",
      quickLinks: "Navigation",
      community: "Community Channels",
      contract: "Verified Smart Contract",
    }
  },
  ur: {
    nav: {
      about: "تعارف",
      tokenomics: "ٹوکنومکس",
      presale: "پری سیل و سواپ",
      mining: "مائننگ",
      staking: "سٹیکنگ",
      roadmap: "روڈ میپ",
      howToBuy: "خریدنے کا طریقہ",
      whitepaper: "وائٹ پیپر",
      connectWallet: "والیٹ جوڑیں",
      connected: "منسلک ہے",
      disconnect: "علیحدہ کریں",
      wrongNetwork: "نیٹ ورک تبدیل کریں",
      addToMetaMask: "میٹاماسک میں شامل کریں",
    },
    hero: {
      tag: "جدید ترین ڈی سینٹرلائزڈ Web3 پروٹوکول",
      titleStart: "ڈیجیٹل فنانس اور کرپٹو کا",
      titleHighlight: "نیا سنہری دور",
      description:
        "پاک کوائن ($PAK) ایک جدید، تیز رفتار اور محفوظ BEP-20 کرپٹو کرنسی ہے جو عالمی سطح پر فوری، انتہائی سستی اور خود مختار ڈیجیٹل ادائیگیوں، سٹیکنگ اور ای کامرس کے لیے بنائی گئی ہے۔",
      buyBtn: "ابھی $PAK خریدیں",
      whitepaperBtn: "وائٹ پیپر پڑھیں",
      addTokenBtn: "میٹاماسک میں شامل کریں (+)",
      contractCopied: "کنٹریکٹ ایڈریس کاپی ہو گیا!",
      copyContract: "کنٹریکٹ ایڈریس کاپی کریں",
      statHolders: "ہدف کمیونٹی",
      statHoldersVal: "100,000+ ہولڈرز",
      statSupply: "کل سپلائی",
      statSupplyVal: "1 ارب PAK کوائنز",
      statStage: "موجودہ مرحلہ",
      statStageVal: "فیز 1 - پبلک پری سیل",
      statListing: "منظور شدہ ایکسچینجز",
      statListingVal: "پین کیک سواپ اور بائننس",
    },
    stats: {
      livePrice: "پری سیل ریٹ",
      livePriceVal: "1 BNB = 10,000 PAK",
      marketCap: "ابتدائی مارکیٹ ویلیو",
      marketCapVal: "$6,000,000",
      burnRate: "ڈیفلیشنری برن",
      burnRateVal: "وقتاً فوقتاً مستقل کوائن برن",
      liquidityLock: "لیکویڈیٹی پول",
      liquidityLockVal: "100% مکمل محفوظ و لاکڈ",
    },
    swap: {
      title: "پری سیل اور فوری سواپ پورٹل",
      subtitle: "سمارٹ کنٹریکٹ کے ذریعے براہِ راست سب سے کم پری سیل قیمت پر اپنے $PAK ٹوکن حاصل کریں۔",
      youPay: "آپ ادا کریں گے (BNB)",
      youReceive: "آپ کو موصول ہوں گے ($PAK)",
      minMax: "کم از کم: 0.05 BNB | زیادہ سے زیادہ: 10 BNB",
      balance: "والیٹ بیلنس",
      connectFirst: "خریداری کے لیے اپنا Web3 والیٹ (MetaMask یا Trust Wallet) جوڑیں۔",
      actionBuy: "ابھی $PAK ٹوکن خریدیں",
      actionConnect: "والیٹ کنیکٹ کریں",
      processing: "ٹرانزیکشن کی تصدیق جاری ہے...",
      success: "مبارک ہو! آپ کے $PAK ٹوکن کامیابی سے آپ کے والیٹ میں منتقل ہو گئے ہیں۔",
      rateInfo: "1 BNB ≈ 10,000 $PAK (تخمینی لانچ قیمت: $0.15)",
      gasNotice: "گیس فیس: برائے نام (BNB اسمارٹ چین پر)",
    },
    tokenomics: {
      tag: "شفاف اور آڈٹ شدہ",
      title: "ٹوکنومکس اور کوائن کی تقسیم",
      subtitle: "ایک محفوظ اور مستقل معاشی نظام جو طویل مدتی قدر اور سرمایہ کاروں کی حفاظت کو یقینی بناتا ہے۔",
      totalSupply: "1,000,000,000 کل سپلائی (فکسڈ)",
      categories: [
        { name: "پبلک پری سیل اور DEX لیکویڈیٹی", percent: 50, color: "#00E676", desc: "پین کیک سواپ پر ٹریڈنگ کی روانی کے لیے 100 فیصد لیکویڈیٹی محفوظ کی جائے گی۔" },
        { name: "کمیونٹی سٹیکنگ اور انعامات", percent: 20, color: "#FFD700", desc: "ٹوکن رکھنے والوں اور نیٹ ورک کے صارفین کے لیے سالانہ منافع بخش انعامات۔" },
        { name: "پاک پے مرچنٹ گیٹ وے اور ای کامرس", percent: 15, color: "#00B0FF", desc: "عالمی ای کامرس، شاپ فائی اور آن لائن کاروبار میں ادائیگیاں رائج کرنے کے لیے۔" },
        { name: "کور ٹیم اور ڈویلپمنٹ", percent: 10, color: "#AA00FF", desc: "24 ماہ کے لیے لاکڈ تاکہ ٹیم کی لگن منصوبے کے ساتھ وابستہ رہے۔" },
        { name: "عالمی مارکیٹنگ اور کمیونٹی گرانٹس", percent: 5, color: "#FF3D00", desc: "بین الاقوامی آگاہی مہمات اور ڈیولپر گرانٹس۔" },
      ],
      features: [
        { title: "کوئی خفیہ منٹنگ نہیں", desc: "کل سپلائی 1 ارب ٹوکنز پر فکس ہے، مزید کوائن نہیں بنائے جا سکتے۔" },
        { title: "سکے جلانے کا نظام (Burn)", desc: "وقت کے ساتھ ساتھ کوائنز مستقل جلا کر سپلائی کم کی جائے گی تاکہ قدر میں اضافہ ہو۔" },
        { title: "اوپن سورس اور تصدیق شدہ", desc: "سولیڈیٹی کوڈ پبلک بلاک چین پر تصدیق کے لیے تیار ہے۔" },
      ]
    },
    features: {
      tag: "حقیقی افادیت",
      title: "تیز رفتار اور جدید عالمی کرپٹو افادیت",
      subtitle: "روایتی ادائیگیوں کے سست نظام اور بھاری فیسوں کے مقابلے میں پاک کوائن ایک جدید متبادل ہے۔",
      items: [
        {
          icon: "Send",
          title: "فوری عالمی ترسیلات (Instant Settlement)",
          desc: "دنیا بھر میں صرف 3 سیکنڈ میں فنڈز منتقل کریں، جس کی فیس چند سینٹس سے بھی کم ہوتی ہے۔"
        },
        {
          icon: "Laptop",
          title: "کریئیٹرز اور ریموٹ ورکرز کی معیشت",
          desc: "فری لانسرز اور ڈیجیٹل کریئیٹرز بغیر کسی بینک تاخیر کے براہ راست بلاک چین پر معاوضہ حاصل کریں۔"
        },
        {
          icon: "Store",
          title: "پاک پے (PakPay) ادائیگی گیٹ وے",
          desc: "شاپ فائی اور آن لائن اسٹورز کے لیے آسان کرپٹو کیش لیس ادائیگی سسٹم۔"
        },
        {
          icon: "ShieldCheck",
          title: "مالی خودمختاری اور تحفظ",
          desc: "مہنگائی کے خلاف اپنے اثاثوں کو جدید ڈیجیٹل نظام میں غیر مرکزی طور پر محفوظ رکھیں۔"
        },
        {
          icon: "Zap",
          title: "انتہائی تیز رفتار بائننس بلاک چین",
          desc: "BNB اسمارٹ چین پر مبنی، جو 2,000 سے زائد فی سیکنڈ ٹرانزیکشنز کی صلاحیت رکھتی ہے۔"
        },
        {
          icon: "HeartHandshake",
          title: "انوویشن اور ڈیولپر گرانٹس",
          desc: "اوپن سورس Web3 بنانے والوں کے لیے مختص خصوصی فنڈز۔"
        }
      ]
    },
    mining: {
      tag: "پروف آف ورک اور کلاؤڈ مائننگ",
      title: "پاک کوائن ورچوئل مائننگ اسٹیشن",
      subtitle: "براہ راست اپنے براؤزر سے $PAK ٹوکن مائن کریں یا اپنا رگ پول سے جوڑ کر نان کسٹوڈیل انعامات کلیم کریں۔",
      networkHashrate: "نیٹ ورک ہیش ریٹ",
      poolCap: "مائننگ پول ریزرو",
      blockReward: "بلاک انعام",
      nextHalving: "اگلا ہالونگ مرحلہ",
      unclaimedEarnings: "حاصل شدہ غیر کلیم شدہ ٹوکنز",
      btnStart: "مائننگ شروع کریں",
      btnStop: "مائننگ سیشن روکیں",
      btnClaim: "ٹوکنز والیٹ میں کلیم کریں",
      rigTiersTitle: "مائننگ ہارڈ ویئر رگس",
      rigTiersDesc: "زیادہ ہیش ریٹ (MH/s) اور تیز رفتار آمدنی کے لیے اپنا ورچوئل ہارڈ ویئر رگ اپ گریڈ کریں۔",
    },
    staking: {
      tag: "ماہانہ منافع",
      title: "پاک سٹیکنگ والٹ سمولیٹر",
      subtitle: "اپنے $PAK کوائنز والٹ میں سٹیک کریں اور سالانہ پرکشش منافع حاصل کریں۔",
      amountLabel: "سٹیک کرنے کی تعداد (PAK)",
      durationLabel: "مدت کا انتخاب",
      months3: "3 ماہ (12% سالانہ شرح)",
      months6: "6 ماہ (18% سالانہ شرح)",
      months12: "12 ماہ (28% سالانہ شرح)",
      estEarnings: "تخمینی منافع",
      monthlyEst: "ماہانہ تخمینہ",
      totalAtMaturity: "مدت مکمل ہونے پر کل رقم",
      stakeBtn: "ابھی والٹ میں سٹیک کریں",
    },
    roadmap: {
      tag: "منصوبہ بندی",
      title: "پروجیکٹ کا روڈ میپ",
      subtitle: "ابتدائی لانچ سے لے کر عالمی سطح تک ہمارے مرحلہ وار عملی اقدامات۔",
      phases: [
        {
          phase: "فیز 1: بنیاد اور لانچ",
          status: "جاری ہے",
          items: [
            "سمارٹ کنٹریکٹ کی سیکیورٹی کوڈنگ اور آڈٹ",
            "آفیشل ویب سائٹ اور پری سیل پورٹل کا آغاز",
            "وائٹ پیپر 1.2 کا باضابطہ اجرا",
            "ٹیلیگرام اور ٹوئٹر پر بین الاقوامی کمیونٹی کا قیام",
            "پری سیل راؤنڈ 1 کا باقاعدہ آغاز"
          ]
        },
        {
          phase: "فیز 2: پین کیک سواپ لسٹنگ اور لیکویڈیٹی",
          status: "اگلا مرحلہ",
          items: [
            "پین کیک سواپ (DEX) پر عوامی ٹریڈنگ کا آغاز",
            "100% لیکویڈیٹی پول کو باقاعدہ لاک کرنا",
            "CoinMarketCap اور CoinGecko پر لسٹنگ",
            "تھرڈ پارٹی سیکیورٹی آڈٹ کی تکمیل",
            "10,000 سے زائد ایکٹو ہولڈرز کا ہدف"
          ]
        },
        {
          phase: "فیز 3: پاک پے اور مرچنٹ استعمال",
          status: "منصوبہ بندی",
          items: [
            "پاک پے (PakPay) ای کامرس پلگ اِن کا باضابطہ اجرا",
            "بین الاقوامی کریئیٹر پلیٹ فارمز کے ساتھ شراکت",
            "ویب سائٹ پر لائیو سٹیکنگ پورٹل کا آغاز",
            "سینٹرلائزڈ ایکسچینجز (MEXC, Gate.io) پر لسٹنگ",
            "پہلے 5 کروڑ $PAK ٹوکن جلانے (Burn) کی تقریب"
          ]
        },
        {
          phase: "فیز 4: ملٹی چین اور لیئر 2",
          status: "منصوبہ بندی",
          items: [
            "پاک چین (PakChain - Layer 2) ٹیسٹ نیٹ کا آغاز",
            "ٹائر 1 ایکسچینجز (Binance, Bybit) پر لسٹنگ کی کوششیں",
            "پاک کوائن ورچوئل کارڈ کا اجرا روزمرہ خریداری کے لیے",
            "کراس چین برجز کا قیام"
          ]
        }
      ]
    },
    howToBuy: {
      tag: "آسان رہنمائی",
      title: "پاک کوائن خریدنے کا آسان طریقہ",
      subtitle: "صرف 4 آسان مراحل میں پاک کوائن حاصل کریں۔",
      steps: [
        {
          num: "01",
          title: "کرپٹو والیٹ ڈاؤنلوڈ کریں",
          desc: "اپنے موبائل یا کمپیوٹر میں ٹرسٹ والیٹ (Trust Wallet) یا میٹاماسک (MetaMask) انسٹال کریں۔"
        },
        {
          num: "02",
          title: "BNB حاصل کریں",
          desc: "کسی بھی معروف ایکسچینج (Binance, Bybit, OKX) سے BNB خرید کر اپنے والیٹ میں بھیجیں۔"
        },
        {
          num: "03",
          title: "ویب سائٹ سے والیٹ جوڑیں",
          desc: "اس ویب سائٹ کے اوپر موجود 'والیٹ جوڑیں' کے بٹن پر کلک کریں اور BNB چین منتخب کریں۔"
        },
        {
          num: "04",
          title: "سواپ کریں اور ٹوکن حاصل کریں",
          desc: "پری سیل خانے میں مطلوبہ BNB درج کریں اور 'خریدیں' کا بٹن دبائیں۔ $PAK ٹوکن فوراً آپ کے والیٹ میں آ جائیں گے!"
        }
      ]
    },
    faq: {
      tag: "عام سوالات",
      title: "اکثر پوچھے گئے سوالات",
      subtitle: "پاک کوائن کے حوالے سے تمام تکنیکی اور عمومی معلومات۔",
      items: [
        {
          q: "پاک کوائن ($PAK) کیا ہے؟",
          a: "پاک کوائن ایک غیر مرکزی (Decentralized) ڈیجیٹل ٹوکن ہے جو بائننس اسمارٹ چین پر بنایا گیا ہے تاکہ فوری، محفوظ اور کم لاگت میں عالمی ادائیگیاں، سٹیکنگ اور ڈیجیٹل کامرس ممکن ہو سکے۔"
        },
        {
          q: "پاک کوائن کس بلاک چین پر کام کرتا ہے؟",
          a: "یہ بائننس اسمارٹ چین (BSC / BEP-20) پر کام کرتا ہے، کیونکہ اس کی رفتار بے حد تیز ہے اور ٹرانزیکشن فیس صرف چند سینٹس ہوتی ہے۔"
        },
        {
          q: "خریداری کے لیے BNB کیسے حاصل کریں؟",
          a: "بائننس، بائی بٹ یا کسی بھی کریپٹو ایکسچینج سے آپ باآسانی کارڈ یا بینک سے BNB خرید کر اپنے میٹاماسک میں ٹرانسفر کر سکتے ہیں۔"
        },
        {
          q: "میں پاک کوائن کو میٹاماسک میں کیسے دیکھ سکتا ہوں؟",
          a: "ویب سائٹ پر اوپر موجود '+ $PAK' بٹن پر کلک کریں، یا کسٹم ٹوکن کے آپشن میں جا کر ہمارا سمارٹ کنٹریکٹ ایڈریس پیسٹ کریں۔"
        },
        {
          q: "کیا یہ سمارٹ کنٹریکٹ مکمل محفوظ ہے؟",
          a: "جی ہاں! پاک کوائن کا سمارٹ کنٹریکٹ بین الاقوامی معیار (OpenZeppelin) کے مطابق تیار کیا گیا ہے۔ اس میں کوئی خفیہ کوڈ نہیں ہے اور یہ پبلک بلاک چین پر مکمل تصدیق شدہ ہے۔"
        }
      ]
    },
    footer: {
      rights: "پاک کوائن پروٹوکول۔ جملہ حقوق محفوظ ہیں۔",
      disclaimer: "انتباہ: کرپٹو کرنسی میں مارکیٹ کے اتار چڑھاؤ کا خطرہ ہوتا ہے۔ سرمایہ کاری سے قبل اپنی تحقیق (DYOR) ضرور مکمل کریں۔ پاک کوائن ایک غیر مرکزی ڈیجیٹل یوٹیلیٹی ٹوکن ہے۔",
      quickLinks: "فوری نیویگیشن",
      community: "کمیونٹی چینلز",
      contract: "تصدیق شدہ کنٹریکٹ",
    }
  }
};

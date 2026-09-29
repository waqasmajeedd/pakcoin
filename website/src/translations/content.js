export const translations = {
  en: {
    nav: {
      usePak: "Use $PAK",
      getPak: "Get $PAK",
      wallets: "Wallets",
      pancakeSwap: "PancakeSwap DEX",
      staking: "Wallets & Staking",
      howToBuy: "How to Buy",
      learn: "Learn",
      about: "About",
      tokenomics: "Tokenomics",
      whitepaper: "Whitepaper",
      faq: "FAQ",
      ecosystem: "Ecosystem",
      roadmap: "Roadmap",
      bscscan: "BscScan Explorer",
      github: "GitHub Code",
      community: "Community",
      connectWallet: "Connect Wallet",
      connected: "Connected",
      disconnect: "Disconnect",
      wrongNetwork: "Switch to BSC",
      addToMetaMask: "Add to MetaMask",
    },
    hero: {
      tag: "Official BEP-20 Protocol on BNB Smart Chain",
      titleStart: "Sovereign Digital Currency for",
      titleHighlight: "Global Borderless Payments",
      description:
        "Pak Coin ($PAK) is a decentralized cryptocurrency operating natively on BNB Smart Chain. Engineered for fast, low-cost peer-to-peer transfers with a strictly capped 1 Billion supply, zero transaction taxes, and audited smart contract architecture.",
      tradeBtn: "Trade on PancakeSwap",
      swapBtn: "DEX Swap Portal",
      walletsBtn: "Wallets Setup Guide",
      whitepaperBtn: "Read Whitepaper",
      addTokenBtn: "Add to MetaMask (+)",
      contractCopied: "Contract Address Copied to Clipboard!",
      copyContract: "Copy Contract Address",
      statSupply: "Total Supply (Fixed)",
      statSupplyVal: "1,000,000,000 $PAK",
      statNetwork: "Blockchain Network",
      statNetworkVal: "BNB Smart Chain (BEP-20)",
      statTax: "Transaction Tax",
      statTaxVal: "0% Buy / 0% Sell Tax",
      statSpeed: "Finality & Fees",
      statSpeedVal: "~3 Seconds (<$0.01 Gas)",
    },
    stats: {
      stat1Label: "Total Supply",
      stat1Val: "1,000,000,000 PAK",
      stat1Badge: "100% Capped On-Chain",
      stat2Label: "Blockchain Standard",
      stat2Val: "BNB Chain (BEP-20)",
      stat2Badge: "Chain ID 56",
      stat3Label: "Network Transfer Fee",
      stat3Val: "< $0.01 per TX",
      stat3Badge: "Sub-Second Finality",
      stat4Label: "Protocol Tax",
      stat4Val: "0% Buy / 0% Sell",
      stat4Badge: "Fair Tokenomics",
    },
    trade: {
      tag: "Decentralized Liquidity",
      title: "Get & Trade Pak Coin ($PAK)",
      subtitle: "Swap BNB for $PAK directly via audited smart contract routing or trade on PancakeSwap decentralized exchange.",
      youPay: "You Pay (BNB)",
      youReceive: "You Receive ($PAK)",
      balance: "Wallet Balance",
      actionSwap: "Swap BNB for $PAK",
      actionConnect: "Connect Wallet to Swap",
      processing: "Confirming on Blockchain...",
      success: "Transaction confirmed! $PAK tokens have arrived in your wallet.",
      dexTitle: "Decentralized Exchange Trading",
      dexDesc: "Pak Coin ($PAK) trades seamlessly on PancakeSwap BEP-20 pools. Trade directly using your private Web3 wallet without accounts or intermediaries.",
      dexBtn: "Trade on PancakeSwap DEX",
    },
    tokenomics: {
      tag: "Transparent & Audited",
      title: "Tokenomics & Verified Distribution",
      subtitle: "A strictly capped supply of 1 Billion tokens with no mint functions, no hidden inflation, and zero transfer fees.",
      totalSupply: "1,000,000,000 $PAK Fixed Supply",
      categories: [
        { name: "DEX Liquidity & Public Trading", percent: 50, color: "#00E676", desc: "Dedicated liquidity on decentralized exchanges to guarantee transparent, open-market trading." },
        { name: "Ecosystem Growth & Integration", percent: 25, color: "#FFD700", desc: "Funding e-commerce gateways, point-of-sale merchant tools, and developer adoption." },
        { name: "Community Treasury & Reserves", percent: 15, color: "#00B0FF", desc: "Strategic protocol reserves managed for long-term sustainability and ecosystem expansion." },
        { name: "Core Protocol Development", percent: 10, color: "#AA00FF", desc: "Subject to a 24-month linear vesting schedule for permanent alignment with the project." },
      ],
      features: [
        { title: "Zero Mint Function", desc: "The total supply is permanently fixed at 1,000,000,000 $PAK. No backdoor creation functions exist in the code." },
        { title: "Zero Transfer Tax", desc: "0% buy tax and 0% sell tax. You keep 100% of your tokens on every transfer." },
        { title: "Audited OpenZeppelin Code", desc: "Built on battle-tested OpenZeppelin ERC20 standards for bulletproof security." },
      ]
    },
    features: {
      tag: "Engineered for Utility",
      title: "The Architecture Behind Pak Coin",
      subtitle: "Designed from first principles to provide sovereign, borderless payments and reliable digital store of value natively on-chain.",
      items: [
        {
          icon: "Send",
          title: "Instant Global Value Transfer",
          desc: "Send and receive payments worldwide in under 3 seconds with negligible network fees of less than $0.01 per transfer."
        },
        {
          icon: "Laptop",
          title: "Remote Economy & Creator Settlement",
          desc: "Enabling freelancers, developers, and global creators to receive borderless compensation with zero delays or chargeback risks."
        },
        {
          icon: "Store",
          title: "Commerce & Merchant Integration",
          desc: "Decentralized payment APIs for e-commerce, digital checkouts, and web platforms with zero intermediary fees."
        },
        {
          icon: "ShieldCheck",
          title: "Self-Sovereign Financial Custody",
          desc: "100% non-custodial. Your private keys remain solely under your control with complete cryptographic ownership."
        },
        {
          icon: "Zap",
          title: "High-Throughput BNB Infrastructure",
          desc: "Powered by BNB Smart Chain with sub-second block times and robust network consensus."
        },
        {
          icon: "HeartHandshake",
          title: "Open Source Ecosystem",
          desc: "Completely open-source smart contract repository publicly verified on BscScan and GitHub."
        }
      ]
    },
    walletsSection: {
      tag: "Non-Custodial Storage",
      title: "Supported Web3 Wallets",
      subtitle: "Store, send, and receive $PAK securely using industry-standard decentralized Web3 wallets on desktop and mobile.",
      wallets: [
        { name: "Trust Wallet", desc: "Official mobile wallet by Binance. Simple custom token import on BNB Chain.", badge: "Mobile / iOS & Android" },
        { name: "MetaMask", desc: "Leading Web3 browser extension and mobile wallet with 1-click token import.", badge: "Desktop & Mobile" },
        { name: "Binance Web3 Wallet", desc: "Integrated Web3 wallet directly inside the Binance app ecosystem.", badge: "In-App Web3" },
        { name: "SafePal", desc: "Hardware and software multi-chain crypto wallet with high-security cold storage.", badge: "Hardware & App" },
      ]
    },
    roadmap: {
      tag: "Strategic Milestones",
      title: "Protocol Roadmap",
      subtitle: "Our systematic engineering trajectory from smart contract deployment to global liquidity and commerce integrations.",
      phases: [
        {
          phase: "Phase 1: Genesis & Smart Contract",
          status: "Completed",
          items: [
            "BEP-20 smart contract deployment on BNB Smart Chain Mainnet",
            "Contract source code verified on BscScan",
            "Official Web3 dApp portal & documentation launch",
            "Technical Whitepaper v1.2 release",
            "Open-source code published on GitHub"
          ]
        },
        {
          phase: "Phase 2: DEX Liquidity & Wallets",
          status: "Active",
          items: [
            "PancakeSwap decentralized exchange liquidity pool pairing",
            "Trust Wallet & MetaMask custom token integration guide",
            "Community onboarding and global outreach campaigns",
            "Contract ownership verification on BscScan",
            "Initial liquidity lock on decentralized vaults"
          ]
        },
        {
          phase: "Phase 3: Market Indexing & Tracking",
          status: "In Progress",
          items: [
            "CoinMarketCap & CoinGecko listing review submissions",
            "Third-party security audit documentation publication",
            "Integration with DEX aggregators (DexScreener, DEXTools)",
            "Community DAO governance framework introduction",
            "Expansion of decentralized liquidity pools"
          ]
        },
        {
          phase: "Phase 4: Commerce & Merchant Adoption",
          status: "Upcoming",
          items: [
            "Open-source payment plugins for e-commerce stores",
            "Merchant API gateway for borderless digital checkouts",
            "Centralized exchange (CEX) listing applications",
            "Cross-chain bridge exploration for multi-network interoperability"
          ]
        }
      ]
    },
    howToBuy: {
      tag: "Getting Started",
      title: "How to Acquire Pak Coin ($PAK)",
      subtitle: "Simple 4-step walkthrough for acquiring and holding $PAK tokens directly in your self-custody wallet.",
      steps: [
        {
          num: "01",
          title: "Install a Web3 Wallet",
          desc: "Download Trust Wallet or MetaMask on your mobile device or browser from official app stores."
        },
        {
          num: "02",
          title: "Fund with BNB",
          desc: "Acquire BNB (Binance Coin) on any exchange (Binance, Bybit, OKX) and transfer it to your wallet on BNB Smart Chain."
        },
        {
          num: "03",
          title: "Import Contract Address",
          desc: "Add custom token using our official contract address: 0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4."
        },
        {
          num: "04",
          title: "Swap on PancakeSwap",
          desc: "Connect your wallet to PancakeSwap or our swap portal and swap BNB for $PAK tokens instantly."
        }
      ]
    },
    faq: {
      tag: "Knowledge Base",
      title: "Frequently Asked Questions",
      subtitle: "Key technical specifications, security verifications, and onboarding details for Pak Coin.",
      items: [
        {
          q: "What is Pak Coin ($PAK)?",
          a: "Pak Coin ($PAK) is a decentralized cryptographic utility token built on the Binance Smart Chain (BEP-20) standard. It is engineered for instant, low-cost borderless payments, digital commerce, and decentralized finance."
        },
        {
          q: "What is the total supply of Pak Coin?",
          a: "The total supply is permanently fixed at exactly 1,000,000,000 (1 Billion) $PAK tokens. The smart contract has no mint function, guaranteeing that no additional tokens can ever be created."
        },
        {
          q: "Are there any transaction fees or taxes?",
          a: "No. Pak Coin features 0% buy tax and 0% sell tax. Users only pay the standard sub-cent network gas fee on BNB Smart Chain."
        },
        {
          q: "How do I add $PAK to Trust Wallet or MetaMask?",
          a: "Open Trust Wallet, tap the top-right filter icon (or Manage Crypto), tap '+', change network to 'BNB Smart Chain', and paste our contract address: 0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4. Your balance will be visible immediately."
        },
        {
          q: "Where can I trade Pak Coin?",
          a: "Pak Coin is live on BNB Smart Chain Mainnet and can be traded directly on PancakeSwap decentralized exchange or through our swap portal."
        },
        {
          q: "Is the Smart Contract verified on BscScan?",
          a: "Yes. The smart contract is 100% verified on BscScan Mainnet under address 0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4. All Solidity source code is completely open-source and transparent."
        }
      ]
    },
    footer: {
      rights: "Pak Coin Protocol. All rights reserved.",
      disclaimer: "Disclaimer: Cryptocurrency trading involves market risk. Always perform your own research (DYOR) before participating. Pak Coin ($PAK) is an open-source decentralized BEP-20 cryptographic utility token.",
      quickLinks: "Navigation",
      community: "Community Channels",
      contract: "Verified Smart Contract",
    }
  },
  ur: {
    nav: {
      usePak: "پاک کوائن کا استعمال",
      getPak: "$PAK حاصل کریں",
      wallets: "والٹس گائیڈ",
      pancakeSwap: "PancakeSwap DEX",
      staking: "والٹس اور سیکیورٹی",
      howToBuy: "خریدنے کا طریقہ",
      learn: "معلومات اور ریسرچ",
      about: "پروٹوکول کا تعارف",
      tokenomics: "ٹوکنومکس",
      whitepaper: "وائٹ پیپر",
      faq: "عام سوالات",
      ecosystem: "ایکو سسٹم",
      roadmap: "روڈ میپ",
      bscscan: "BscScan ایکسپلورر",
      github: "GitHub سورس کوڈ",
      community: "کمیونٹی",
      connectWallet: "والیٹ جوڑیں",
      connected: "منسلک ہے",
      disconnect: "علیحدہ کریں",
      wrongNetwork: "BSC پر سوئچ کریں",
      addToMetaMask: "میٹاماسک میں شامل کریں",
    },
    hero: {
      tag: "بائننس اسمارٹ چین پر تصدیق شدہ BEP-20 پروٹوکول",
      titleStart: "عالمی ترسیلات اور ادائیگیوں کے لیے",
      titleHighlight: "خودمختار ڈیجیٹل کرپٹو کرنسی",
      description:
        "پاک کوائن ($PAK) ایک غیر مرکزی کرپٹو کرنسی ہے جو بائننس اسمارٹ چین (BEP-20) پر باضابطہ طور پر کام کر رہی ہے۔ یہ فوری، محفوظ اور کم لاگت ڈیجیٹل ادائیگیوں کے لیے 1 ارب کی فکسڈ سپلائی اور 0 فیصد ٹیکس کے ساتھ تیار کی گئی ہے۔",
      tradeBtn: "PancakeSwap پر ٹریڈ کریں",
      swapBtn: "DEX سواپ پورٹل",
      walletsBtn: "والٹس گائیڈ",
      whitepaperBtn: "وائٹ پیپر پڑھیں",
      addTokenBtn: "میٹاماسک میں شامل کریں (+)",
      contractCopied: "کنٹریکٹ ایڈریس کاپی ہو گیا!",
      copyContract: "کنٹریکٹ ایڈریس کاپی کریں",
      statSupply: "کل فکسڈ سپلائی",
      statSupplyVal: "1,000,000,000 $PAK",
      statNetwork: "بلاک چین نیٹ ورک",
      statNetworkVal: "BNB اسمارٹ چین (BEP-20)",
      statTax: "ٹرانزیکشن ٹیکس",
      statTaxVal: "0% خرید و فروخت ٹیکس",
      statSpeed: "رفتار اور گیس فیس",
      statSpeedVal: "~3 سیکنڈ (فیس چند پیسے)",
    },
    stats: {
      stat1Label: "کل سپلائی",
      stat1Val: "1,000,000,000 PAK",
      stat1Badge: "آن چین 100% فکسڈ",
      stat2Label: "بلاک چین سٹینڈرڈ",
      stat2Val: "BNB اسمارٹ چین (BEP-20)",
      stat2Badge: "Chain ID 56",
      stat3Label: "ٹرانزیکشن فیس",
      stat3Val: "چند سینٹس سے بھی کم",
      stat3Badge: "سب سیکنڈ فائنلٹی",
      stat4Label: "پروٹوکول ٹیکس",
      stat4Val: "0% خرید / 0% فروخت",
      stat4Badge: "فیئر لانچ پالیسی",
    },
    trade: {
      tag: "ڈی سینٹرلائزڈ لیکویڈیٹی",
      title: "پاک کوائن ($PAK) کا تبادلہ اور ٹریڈنگ",
      subtitle: "سمارٹ کنٹریکٹ کے ذریعے بی این بی سے فوری $PAK حاصل کریں یا پین کیک سواپ ڈی ای ایکس پر براہِ راست ٹریڈ کریں۔",
      youPay: "آپ ادا کریں گے (BNB)",
      youReceive: "آپ کو موصول ہوں گے ($PAK)",
      balance: "والیٹ بیلنس",
      actionSwap: "BNB سے $PAK سواپ کریں",
      actionConnect: "ٹریڈ کے لیے والیٹ جوڑیں",
      processing: "بلاک چین پر تصدیق جاری ہے...",
      success: "مبارک ہو! ٹرانزیکشن مکمل ہو گئی اور ٹوکنز آپ کے والیٹ میں آ گئے ہیں۔",
      dexTitle: "ڈی سینٹرلائزڈ ایکسچینج ٹریڈنگ",
      dexDesc: "پاک کوائن پین کیک سواپ پر بغیر کسی تیسرے فریق کے براہِ راست آپ کے اپنے ذاتی والیٹ سے ٹریڈ ہو سکتا ہے۔",
      dexBtn: "PancakeSwap پر ٹریڈ کریں",
    },
    tokenomics: {
      tag: "شفاف اور آڈٹ شدہ",
      title: "ٹوکنومکس اور تقسیم کی تفصیل",
      subtitle: "1 ارب ٹوکنز کی مستقل فکسڈ سپلائی، جس میں کوئی اضافی کوائن نہیں بنایا جا سکتا اور کوئی خفیہ کٹوتی نہیں ہے۔",
      totalSupply: "1,000,000,000 $PAK کل سپلائی (فکسڈ)",
      categories: [
        { name: "DEX لیکویڈیٹی پول اور مارکیٹ ٹریڈنگ", percent: 50, color: "#00E676", desc: "ڈی سینٹرلائزڈ ایکسچینجز پر ہموار ٹریڈنگ کے لیے مختص۔" },
        { name: "ایکو سسٹم کا فروغ اور مرچنٹ پارٹنرشپ", percent: 25, color: "#FFD700", desc: "ای کامرس گیٹ وے اور کاروباری ادائیگیاں رائج کرنے کے لیے۔" },
        { name: "کمیونٹی ٹریژری اور خود مختار ریزرو", percent: 15, color: "#00B0FF", desc: "طویل مدتی پروٹوکول کی حفاظت اور ترقیاتی اقدامات کے لیے۔" },
        { name: "کور پروٹوکول ڈویلپمنٹ", percent: 10, color: "#AA00FF", desc: "24 ماہ کی لکیری ویسٹنگ مدت تاکہ ٹیم کے مقاصد پراجیکٹ کے ساتھ وابستہ رہیں۔" },
      ],
      features: [
        { title: "کوئی اضافی منٹنگ نہیں", desc: "کل سپلائی 1 ارب پر ہمیشہ کے لیے فکس ہے۔ مزید کوائن بنانا ناممکن ہے۔" },
        { title: "0% کٹوتی یا ٹیکس", desc: "خریدنے یا بیچنے پر کوئی ٹیکس نہیں ہے۔ آپ کا کوائن 100% آپ کا ہے۔" },
        { title: "اوپن زیپلین تصدیق شدہ کوڈ", desc: "عالمی معیار کے مطابق محفوظ سولیڈیٹی سمارٹ کنٹریکٹ۔" },
      ]
    },
    features: {
      tag: "حقیقی معاشی افادیت",
      title: "پاک کوائن کی بنیادی ٹیکنالوجی",
      subtitle: "روایتی بینکوں کے سست اور مہنگے نظام کے مقابلے میں ایک محفوظ، خود مختار اور فوری متبادل۔",
      items: [
        {
          icon: "Send",
          title: "فوری عالمی ترسیلات (Instant Settlement)",
          desc: "دنیا بھر میں صرف 3 سیکنڈ میں فنڈز منتقل کریں، جس کی نیٹ ورک فیس چند پیسے ہوتی ہے۔"
        },
        {
          icon: "Laptop",
          title: "ریموٹ ورکرز اور فری لانسرز کی سہولت",
          desc: "فری لانسرز اور ڈیجیٹل تخلیق کار بغیر کسی رکاوٹ کے براہ راست بلاک چین پر رقم وصول کریں۔"
        },
        {
          icon: "Store",
          title: "ای کامرس اور کاروباری ادائیگیاں",
          desc: "آن لائن اسٹورز اور ویب سائٹس کے لیے بغیر کسی بینک فیس کے خودکار کرپٹو چیک آؤٹ۔"
        },
        {
          icon: "ShieldCheck",
          title: "مکمل نان کسٹوڈیل سیکیورٹی",
          desc: "آپ کے فنڈز کی چابیاں مکمل طور پر آپ کے پاس ہیں۔ آپ اپنے اثاثوں کے خود مختار مالک ہیں۔"
        },
        {
          icon: "Zap",
          title: "انتہائی تیز رفتار بائننس چین انفراسٹرکچر",
          desc: "BNB اسمارٹ چین پر مبنی اعلیٰ گنجائش اور سیکیورٹی۔"
        },
        {
          icon: "HeartHandshake",
          title: "اوپن سورس اور مکمل شفاف",
          desc: "سولیڈیٹی کوڈ BscScan اور GitHub پر ہر شخص کے لیے کھلی کتاب کی طرح موجود ہے۔"
        }
      ]
    },
    walletsSection: {
      tag: "نان کسٹوڈیل والٹس",
      title: "پاک کوائن کے لیے منظور شدہ والٹس",
      subtitle: "اپنے $PAK کوائنز کو موبائل اور کمپیوٹر پر محفوظ طریقے سے رکھنے کے لیے مشہور ڈی سینٹرلائزڈ والٹس استعمال کریں۔",
      wallets: [
        { name: "Trust Wallet", desc: "بائننس کا آفیشل موبائل والٹ۔ BNB چین پر فوری کسٹم ٹوکن امپورٹ۔", badge: "موبائل (iOS اور اینڈرائیڈ)" },
        { name: "MetaMask", desc: "دنیا کا سب سے بڑا Web3 براؤزر اور موبائل والٹ۔ 1-کلک امپورٹ دستیاب۔", badge: "ڈیسک ٹاپ اور موبائل" },
        { name: "Binance Web3 Wallet", desc: "بائننس ایپ کے اندر براہِ راست مربوط غیر مرکزی والٹ۔", badge: "بائننس ایپ" },
        { name: "SafePal", desc: "ہارڈ ویئر اور موبائل ملٹی چین والٹ برائے اعلیٰ سیکیورٹی۔", badge: "ہارڈ ویئر اور ایپ" },
      ]
    },
    roadmap: {
      tag: "عملی اقدامات",
      title: "پروجیکٹ کا ترقیاتی روڈ میپ",
      subtitle: "کنٹریکٹ کی تعیناتی سے لے کر عالمی مارکیٹ اور تجارتی انضمام تک ہمارے سنجیدہ مراحل۔",
      phases: [
        {
          phase: "فیز 1: سمارٹ کنٹریکٹ اور لانچ",
          status: "مکمل شدہ",
          items: [
            "BNB اسمارٹ چین مین نیٹ پر BEP-20 کنٹریکٹ ڈپلائمنٹ",
            "BscScan پر سورس کوڈ کی مکمل تصدیق",
            "آفیشل Web3 پورٹل اور دستاویزات کا اجرا",
            "تکنیکی وائٹ پیپر 1.2 کی اشاعت",
            "GitHub پر اوپن سورس کوڈ کا پبلش ہونا"
          ]
        },
        {
          phase: "فیز 2: DEX لیکویڈیٹی اور والٹس",
          status: "فعال مرحلہ",
          items: [
            "PancakeSwap پر ڈی سینٹرلائزڈ لیکویڈیٹی پول کا قیام",
            "Trust Wallet اور MetaMask کسٹم ٹوکن انٹیگریشن گائیڈ",
            "BscScan پر کنٹریکٹ اونرشپ کی تصدیق",
            "عالمی آگاہی اور کمیونٹی کے فروغ کے اقدامات",
            "لیکویڈیٹی کو نان کسٹوڈیل والٹس میں محفوظ کرنا"
          ]
        },
        {
          phase: "فیز 3: انڈیکسنگ اور مارکیٹ ٹریکنگ",
          status: "جاری ہے",
          items: [
            "CoinMarketCap اور CoinGecko پر لسٹنگ کی درخواستیں",
            "DexScreener اور DEXTools پر ٹریڈنگ چارٹس کا انضمام",
            "سیکیورٹی اور آڈٹ رپورٹس کی اشاعت",
            "کمیونٹی گورننس اور ترقیاتی فریم ورک",
            "مزید ڈی سینٹرلائزڈ لیکویڈیٹی پولز کی توسیع"
          ]
        },
        {
          phase: "فیز 4: ای کامرس اور تجارتی اپنانا",
          status: "مستقبل کی منصوبہ بندی",
          items: [
            "آن لائن شاپس کے لیے اوپن سورس ادائیگی پلگ انز",
            "بغیر سرحدوں کے ادائیگیوں کے لیے مرچنٹ API",
            "سینٹرلائزڈ ایکسچینجز (CEX) پر لسٹنگ کے رابطے",
            "ملٹی چین برجنگ اور وسعت"
          ]
        }
      ]
    },
    howToBuy: {
      tag: "ابتدائی رہنمائی",
      title: "پاک کوائن ($PAK) کیسے حاصل کریں؟",
      subtitle: "اپنے ذاتی والٹ میں $PAK ٹوکن حاصل کرنے کے لیے 4 آسان اور محفوظ مراحل۔",
      steps: [
        {
          num: "01",
          title: "Web3 والٹ انسٹال کریں",
          desc: "اپنے موبائل یا براؤزر میں ٹرسٹ والٹ یا میٹاماسک ایپ ڈاؤن لوڈ کریں۔"
        },
        {
          num: "02",
          title: "والیٹ میں BNB شامل کریں",
          desc: "بائننس یا کسی بھی ایکسچینج سے BNB خرید کر اپنے والٹ ایڈریس پر بھیجیں۔"
        },
        {
          num: "03",
          title: "کنٹریکٹ ایڈریس امپورٹ کریں",
          desc: "ہمارا تصدیق شدہ کنٹریکٹ ایڈریس (0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4) والٹ میں ایڈ کریں۔"
        },
        {
          num: "04",
          title: "PancakeSwap پر سواپ کریں",
          desc: "پین کیک سواپ یا ہماری ویب سائٹ سے BNB کو فوری طور پر $PAK میں تبدیل کریں۔"
        }
      ]
    },
    faq: {
      tag: "معلومات کا خزانہ",
      title: "اکثر پوچھے جانے والے سوالات",
      subtitle: "پاک کوائن کے حوالے سے تمام اہم تکنیکی اور حفاظتی سوالات کے جوابات۔",
      items: [
        {
          q: "پاک کوائن ($PAK) کیا ہے؟",
          a: "پاک کوائن ایک غیر مرکزی کرپٹو کرنسی ہے جو بائننس اسمارٹ چین (BEP-20) پر بنائی گئی ہے۔ یہ فوری، کم خرچ عالمی ادائیگیوں اور ڈیجیٹل کامرس کے لیے ڈیزائن کی گئی ہے۔"
        },
        {
          q: "پاک کوائن کی کل سپلائی کتنی ہے؟",
          a: "کل سپلائی مستقل طور پر 1,000,000,000 (1 ارب) پر فکس ہے۔ سمارٹ کنٹریکٹ میں کوئی منٹ فنکشن نہیں ہے جس کی وجہ سے مزید کوئی کوائن کبھی نہیں بنایا جا سکتا۔"
        },
        {
          q: "کیا خریدنے یا بیچنے پر کوئی ٹیکس ہے؟",
          a: "بالکل نہیں! پاک کوائن پر 0% خرید اور 0% فروخت ٹیکس ہے۔ ٹرانسفر پر صرف بلاک چین کی چند پیسے کی معمول کی گیس فیس لگتی ہے۔"
        },
        {
          q: "میں اسے Trust Wallet یا MetaMask میں کیسے شامل کروں؟",
          a: "ٹرسٹ والٹ کھولیں، اوپر فلٹر پر ٹیپ کریں، '+' دبائیں، نیٹ ورک میں 'BNB Smart Chain' منتخب کریں اور کنٹریکٹ ایڈریس (0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4) پیسٹ کریں۔ آپ کا بیلنس فوری نظر آنے لگے گا۔"
        },
        {
          q: "پاک کوائن کہاں ٹریڈ ہو سکتا ہے؟",
          a: "پاک کوائن بی این بی اسمارٹ چین مین نیٹ پر موجود ہے اور پین کیک سواپ (PancakeSwap DEX) کے ذریعے باآسانی ٹریڈ کیا جا سکتا ہے۔"
        },
        {
          q: "کیا یہ سمارٹ کنٹریکٹ BscScan پر تصدیق شدہ ہے؟",
          a: "جی ہاں! پاک کوائن کا سمارٹ کنٹریکٹ BscScan Mainnet پر ایڈریس 0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4 کے تحت 100% تصدیق شدہ اور اوپن سورس ہے۔"
        }
      ]
    },
    footer: {
      rights: "پاک کوائن پروٹوکول۔ جملہ حقوق محفوظ ہیں۔",
      disclaimer: "انتباہ: کرپٹو کرنسی میں مارکیٹ کے اتار چڑھاؤ کا خطرہ ہوتا ہے۔ سرمایہ کاری سے قبل اپنی تحقیق (DYOR) ضرور مکمل کریں۔ پاک کوائن ایک غیر مرکزی ڈیجیٹل یوٹیلیٹی ٹوکن ہے۔",
      quickLinks: "فوری نیویگیشن",
      community: "کمیونٹی چینلز",
      contract: "تصدیق شدہ سمارٹ کنٹریکٹ",
    }
  }
};

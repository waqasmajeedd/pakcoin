import React, { useState, useRef, useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import {
  Wallet,
  Globe,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  PlusCircle,
  Smartphone,
  ArrowDownUp,
  Coins,
  FileText,
  HelpCircle,
  Milestone,
  Code2,
  Send,
  ShieldCheck,
  Sparkles,
  Key,
  Check,
} from "lucide-react";

export const Navbar = ({ onOpenWhitepaper, onOpenSigner, onOpenTrustWallet }) => {
  const {
    account,
    truncatedAccount,
    chainId,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    addTokenToMetaMask,
    language,
    toggleLanguage,
    bnbBalance,
    pakBalance,
  } = useWeb3();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'use' | 'learn' | 'ecosystem' | 'community' | null
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations[language].nav;
  const isBSC = chainId === 56 || chainId === 97;

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setWalletDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#040a06]/90 border-b border-emerald-500/20" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo & Title (Zcash Style) */}
          <div
            className="flex items-center space-x-3 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative">
              <img
                src="./pakcoin-logo.svg"
                alt="Pak Coin"
                className="w-11 h-11 object-contain filter drop-shadow-[0_0_12px_rgba(0,230,118,0.5)]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">
                  PAK <span className="text-emerald-400">COIN</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  BEP-20
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/80 font-medium tracking-wide hidden sm:block">
                {language === "ur" ? "ڈی سینٹرلائزڈ خودمختار کرنسی" : "Privacy & Utility Protocol"}
              </p>
            </div>
          </div>

          {/* Center: Zcash-Style Dropdown Mega Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-gray-300">
            
            {/* 1. Use $PAK Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "use" ? null : "use")}
                className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDropdown === "use"
                    ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
                    : "hover:text-emerald-400 hover:bg-emerald-950/30"
                }`}
              >
                <span>{t.usePak}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "use" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "use" && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#06140a] border border-emerald-500/30 p-2.5 shadow-2xl space-y-1 animate-fadeIn">
                  <a
                    href="#presale"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900 shrink-0 mt-0.5">
                      <ArrowDownUp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.getPak} (Swap Portal)
                      </span>
                      <span className="text-[11px] text-gray-400">Direct BNB to $PAK presale swap</span>
                    </div>
                  </a>

                  <a
                    href={SOCIAL_LINKS.pancakeswap}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-900 shrink-0 mt-0.5">
                      <span>🥞</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs block group-hover:text-amber-300">
                          {t.pancakeSwap}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                      <span className="text-[11px] text-gray-400">Trade on decentralized DEX</span>
                    </div>
                  </a>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenTrustWallet();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900 shrink-0 mt-0.5">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.wallets} (Setup Guide)
                      </span>
                      <span className="text-[11px] text-gray-400">Trust Wallet & MetaMask 1-click</span>
                    </div>
                  </button>

                  <a
                    href="#staking"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900 shrink-0 mt-0.5">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.staking} (Yield Vaults)
                      </span>
                      <span className="text-[11px] text-gray-400">Earn up to 28% APY staking yields</span>
                    </div>
                  </a>

                  <a
                    href="#how-to-buy"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.howToBuy}
                      </span>
                      <span className="text-[11px] text-gray-400">4-step beginner walkthrough</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 2. Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "learn" ? null : "learn")}
                className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDropdown === "learn"
                    ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
                    : "hover:text-emerald-400 hover:bg-emerald-950/30"
                }`}
              >
                <span>{t.learn}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "learn" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "learn" && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#06140a] border border-emerald-500/30 p-2.5 shadow-2xl space-y-1 animate-fadeIn">
                  <a
                    href="#about"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.about}
                      </span>
                      <span className="text-[11px] text-gray-400">Vision, utility & payment rails</span>
                    </div>
                  </a>

                  <a
                    href="#tokenomics"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.tokenomics}
                      </span>
                      <span className="text-[11px] text-gray-400">1B fixed supply & 0% tax policy</span>
                    </div>
                  </a>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenWhitepaper();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-amber-300">
                        {t.whitepaper} v1.2
                      </span>
                      <span className="text-[11px] text-gray-400">Technical specification & deck</span>
                    </div>
                  </button>

                  <a
                    href="#faq"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.faq}
                      </span>
                      <span className="text-[11px] text-gray-400">Security, wallets & questions</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 3. Ecosystem Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "ecosystem" ? null : "ecosystem")}
                className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDropdown === "ecosystem"
                    ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
                    : "hover:text-emerald-400 hover:bg-emerald-950/30"
                }`}
              >
                <span>{t.ecosystem}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "ecosystem" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "ecosystem" && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#06140a] border border-emerald-500/30 p-2.5 shadow-2xl space-y-1 animate-fadeIn">
                  <a
                    href="#roadmap"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Milestone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                        {t.roadmap}
                      </span>
                      <span className="text-[11px] text-gray-400">Quarterly growth & CEX targets</span>
                    </div>
                  </a>

                  <a
                    href={SOCIAL_LINKS.bscscan}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                          {t.bscscan}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                      <span className="text-[11px] text-gray-400">Verified contract on BSC Mainnet</span>
                    </div>
                  </a>

                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs block group-hover:text-emerald-300">
                          {t.github}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                      <span className="text-[11px] text-gray-400">Open source smart contract repository</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 4. Community Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "community" ? null : "community")}
                className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDropdown === "community"
                    ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
                    : "hover:text-emerald-400 hover:bg-emerald-950/30"
                }`}
              >
                <span>{t.community}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "community" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "community" && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#06140a] border border-emerald-500/30 p-2.5 shadow-2xl space-y-1 animate-fadeIn">
                  <a
                    href={SOCIAL_LINKS.telegram}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-center space-x-3 transition-colors group"
                  >
                    <Send className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-bold text-white text-xs group-hover:text-emerald-300">
                        Telegram Global
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </div>
                  </a>

                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-center space-x-3 transition-colors group"
                  >
                    <svg className="w-4 h-4 fill-current text-emerald-400 shrink-0" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-bold text-white text-xs group-hover:text-emerald-300">
                        Twitter / X
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </div>
                  </a>

                  <a
                    href={SOCIAL_LINKS.discord}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl hover:bg-emerald-950/80 flex items-center space-x-3 transition-colors group"
                  >
                    <svg className="w-4 h-4 fill-current text-emerald-400 shrink-0" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-bold text-white text-xs group-hover:text-emerald-300">
                        Discord
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </div>
                  </a>
                </div>
              )}
            </div>

          </nav>

          {/* Right: Action Row (Language, Get $PAK, Connect Wallet) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              title="Toggle English / اردو"
              className="px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-900/50 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "en" ? "اردو" : "EN"}</span>
            </button>

            {/* Quick Add To MetaMask */}
            <button
              onClick={addTokenToMetaMask}
              title="Add $PAK to MetaMask"
              className="px-2.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:border-emerald-400 hover:text-emerald-200 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ $PAK</span>
            </button>

            {/* Zcash Style Action Button: Get $PAK */}
            <a
              href="#presale"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer flex items-center space-x-1"
            >
              <span>{t.getPak}</span>
            </a>

            {/* Wallet Button */}
            {!account ? (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_25px_rgba(0,230,118,0.6)] transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Wallet className="w-3.5 h-3.5 text-black" />
                <span>{isConnecting ? "Connecting..." : t.connectWallet}</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                  className="px-3.5 py-2 rounded-xl bg-[#0e2417] border border-emerald-500/40 text-white font-semibold text-xs hover:border-emerald-400 flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="font-mono text-emerald-300 font-bold">
                    {pakBalance} PAK
                  </span>
                  <span className="text-gray-300 hidden xl:inline">({truncatedAccount})</span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                {walletDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#07190c] border border-emerald-500/30 p-3 shadow-2xl space-y-2 text-xs animate-fadeIn z-50">
                    <div className="p-2 rounded-xl bg-[#051108] border border-emerald-500/15">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Wallet</span>
                      <span className="font-mono text-emerald-300 break-all text-[11px] block mt-0.5">
                        {account}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 px-1 text-gray-300">
                      <span>BNB Balance:</span>
                      <span className="font-mono font-bold text-white">{bnbBalance} BNB</span>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/20 flex gap-2">
                      <button
                        onClick={disconnectWallet}
                        className="flex-1 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-[11px] cursor-pointer text-center"
                      >
                        {t.disconnect}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
            >
              {language === "en" ? "اردو" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Zcash Style Categorized Navigation) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061209] border-b border-emerald-500/25 px-5 py-6 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Section: Use Pak Coin */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
              {t.usePak}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="#presale"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200 font-semibold"
              >
                {t.getPak} (Swap)
              </a>
              <a
                href={SOCIAL_LINKS.pancakeswap}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#1c1809] border border-amber-400/30 text-amber-300 font-semibold flex items-center justify-between"
              >
                <span>PancakeSwap</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrustWallet();
                }}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200 font-semibold text-left"
              >
                {t.wallets} Guide
              </button>
              <a
                href="#staking"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200 font-semibold"
              >
                {t.staking} Vaults
              </a>
            </div>
          </div>

          {/* Section: Learn */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
              {t.learn}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200"
              >
                {t.about}
              </a>
              <a
                href="#tokenomics"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200"
              >
                {t.tokenomics}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhitepaper();
                }}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-amber-300 font-bold text-left"
              >
                {t.whitepaper}
              </button>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200"
              >
                {t.faq}
              </a>
            </div>
          </div>

          {/* Section: Ecosystem & Community */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block">
              {t.ecosystem} & {t.community}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="#roadmap"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200"
              >
                {t.roadmap}
              </a>
              <a
                href={SOCIAL_LINKS.bscscan}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200 flex items-center justify-between"
              >
                <span>BscScan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200 flex items-center justify-between"
              >
                <span>Telegram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#091f11] border border-emerald-500/20 text-gray-200 flex items-center justify-between"
              >
                <span>Twitter / X</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="pt-2 border-t border-emerald-500/20 space-y-2.5">
            {!account ? (
              <button
                onClick={() => {
                  connectWallet();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-black flex items-center justify-center space-x-2 text-sm"
              >
                <Wallet className="w-4 h-4" />
                <span>{t.connectWallet}</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-[#08180d] border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Connected Wallet</span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">{pakBalance} $PAK</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs font-bold"
                >
                  {t.disconnect}
                </button>
              </div>
            )}

            <button
              onClick={addTokenToMetaMask}
              className="w-full py-2.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.addToMetaMask}</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};

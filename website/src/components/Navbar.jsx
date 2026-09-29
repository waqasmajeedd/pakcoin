import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG } from "../constants/contractInfo";
import {
  Wallet,
  Globe,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  PlusCircle,
  LogOut,
  Layers,
  Smartphone,
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const t = translations[language].nav;
  const isBSC = chainId === 56 || chainId === 97;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#050b07]/80 border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <img
                src="./pakcoin-logo.svg"
                alt="Pak Coin"
                className="w-12 h-12 object-contain animate-float filter drop-shadow-[0_0_12px_rgba(0,230,118,0.5)]"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-wider text-white">
                  PAK <span className="text-emerald-400">COIN</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  BEP-20
                </span>
              </div>
              <p className="text-xs text-emerald-400/80 font-medium tracking-wide">
                {language === "ur" ? "خود مختار ڈیجیٹل پروٹوکول" : "Next-Gen Decentralized Protocol"}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-gray-300">
            <a href="#about" className="hover:text-emerald-400 transition-colors">
              {t.about}
            </a>
            <a href="#tokenomics" className="hover:text-emerald-400 transition-colors">
              {t.tokenomics}
            </a>
            <a href="#presale" className="hover:text-emerald-400 transition-colors">
              {t.presale}
            </a>
            <a href="#mining" className="hover:text-amber-300 transition-colors flex items-center space-x-1 font-bold text-amber-400">
              <span>{t.mining}</span>
              <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-black animate-pulse">
                MINE
              </span>
            </a>
            <a href="#staking" className="hover:text-emerald-400 transition-colors">
              {t.staking}
            </a>
            <a href="#roadmap" className="hover:text-emerald-400 transition-colors">
              {t.roadmap}
            </a>
            <a href="#how-to-buy" className="hover:text-emerald-400 transition-colors">
              {t.howToBuy}
            </a>
            <button
              onClick={onOpenWhitepaper}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-1 font-bold transition-colors cursor-pointer"
            >
              <span>{t.whitepaper}</span>
            </button>
          </nav>

          {/* Action Buttons: Language + MetaMask + Connect */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="Toggle English / اردو"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-900/50 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>

            {/* Quick Add To MetaMask */}
            <button
              onClick={addTokenToMetaMask}
              title="Add $PAK to MetaMask"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:border-emerald-400 hover:text-emerald-200 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ $PAK</span>
            </button>

            {/* Trust Wallet Setup Guide */}
            <button
              onClick={onOpenTrustWallet}
              title="Trust Wallet & MetaMask Guide"
              className="px-3 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-200 text-xs font-semibold hover:border-emerald-400 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trust Wallet</span>
            </button>

            {/* BscScan Ownership Signer Button */}
            <button
              onClick={onOpenSigner}
              title="Generate BscScan Signature Hash"
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>🔑 Sign Hash</span>
            </button>

            {/* Wallet Button */}
            {!account ? (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:shadow-[0_0_25px_rgba(0,230,118,0.6)] transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Wallet className="w-4 h-4 text-black" />
                <span>{isConnecting ? "Connecting..." : t.connectWallet}</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 rounded-xl bg-[#0e2417] border border-emerald-500/40 text-white font-semibold text-sm hover:border-emerald-400 flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                      {pakBalance} $PAK
                    </span>
                    <span className="hidden sm:inline">{truncatedAccount}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-emerald-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#09180e] border border-emerald-500/30 shadow-2xl p-4 text-left backdrop-blur-2xl z-50">
                    <div className="pb-3 border-b border-emerald-500/20">
                      <p className="text-xs text-gray-400">Connected Address</p>
                      <p className="text-xs font-mono text-emerald-300 break-all mt-0.5">
                        {account}
                      </p>
                    </div>

                    <div className="py-2.5 border-b border-emerald-500/20 text-xs space-y-1">
                      <div className="flex justify-between text-gray-300">
                        <span>BNB Balance:</span>
                        <span className="font-bold text-white">{bnbBalance} BNB</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>PAK Balance:</span>
                        <span className="font-bold text-emerald-400">{pakBalance} PAK</span>
                      </div>
                    </div>

                    <div className="pt-3 space-y-2 text-xs">
                      {!isBSC && (
                        <button
                          onClick={() => switchNetwork(97)}
                          className="w-full py-1.5 px-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center space-x-1"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Switch to BSC Testnet</span>
                        </button>
                      )}
                      <button
                        onClick={disconnectWallet}
                        className="w-full py-1.5 px-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center space-x-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.disconnect}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-xs font-bold text-emerald-300"
            >
              {language === "en" ? "اردو" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-950/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#061209] border-b border-emerald-500/20 px-6 py-6 space-y-4 text-center">
          <nav className="flex flex-col space-y-3 font-semibold text-gray-200">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-emerald-400"
            >
              {t.about}
            </a>
            <a
              href="#tokenomics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-emerald-400"
            >
              {t.tokenomics}
            </a>
            <a
              href="#presale"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-emerald-400"
            >
              {t.presale}
            </a>
            <a
              href="#mining"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-amber-400 font-bold hover:text-amber-300"
            >
              ⛏️ {t.mining}
            </a>
            <a
              href="#staking"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-emerald-400"
            >
              {t.staking}
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-emerald-400"
            >
              {t.roadmap}
            </a>
            <a
              href="#how-to-buy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-emerald-400"
            >
              {t.howToBuy}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhitepaper();
              }}
              className="py-2 text-amber-400 font-bold"
            >
              {t.whitepaper}
            </button>
          </nav>

          <div className="pt-4 border-t border-emerald-500/20 space-y-2">
            {!account ? (
              <button
                onClick={() => {
                  connectWallet();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 text-black font-extrabold flex items-center justify-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>{t.connectWallet}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-emerald-400 font-mono">{truncatedAccount}</div>
                <button
                  onClick={disconnectWallet}
                  className="w-full py-2 rounded-lg bg-red-500/20 text-red-300 text-xs"
                >
                  {t.disconnect}
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrustWallet();
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center justify-center space-x-2"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>📱 Trust Wallet & MetaMask Guide</span>
            </button>
            <button
              onClick={addTokenToMetaMask}
              className="w-full py-2.5 rounded-lg border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.addToMetaMask}</span>
            </button>
            <a
              href="https://pancakeswap.finance/swap?outputCurrency=0xf472713Bb703ef09BC7097724a6Dd7dEaB117fC4"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center space-x-2"
            >
              <span>🥞 Trade on PancakeSwap DEX</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

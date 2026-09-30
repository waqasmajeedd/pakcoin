import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import {
  Smartphone,
  ShieldCheck,
  PlusCircle,
  Copy,
  Check,
  ExternalLink,
  Wallet,
  ArrowRight,
} from "lucide-react";

export const WalletsSection = ({ onOpenTrustWallet }) => {
  const { language, addTokenToMetaMask, showToast } = useWeb3();
  const t = translations[language].walletsSection;

  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.address);
    setCopied(true);
    showToast(
      language === "ur"
        ? "کنٹریکٹ ایڈریس کاپی ہو گیا!"
        : "Contract address copied to clipboard!"
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const walletIcons = {
    "Trust Wallet": "🛡️",
    "MetaMask": "🦊",
    "Binance Web3 Wallet": "🟡",
    "SafePal": "🔐",
  };

  return (
    <section id="wallets" className="relative py-20 lg:py-28 bg-[#040905] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.wallets.map((wallet, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-emerald-500/25 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/20">
                    {walletIcons[wallet.name] || "💼"}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                    {wallet.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {wallet.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  {wallet.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-emerald-500/15 flex flex-col gap-2">
                {wallet.name === "MetaMask" ? (
                  <button
                    onClick={addTokenToMetaMask}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-black" />
                    <span>{language === "ur" ? "1-کلک میٹاماسک میں شامل کریں" : "1-Click Add to MetaMask"}</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenTrustWallet}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{language === "ur" ? "ہدایات دیکھیں" : "Setup Guide"}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contract Parameter Reference Box */}
        <div className="mt-12 glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-400/30 max-w-4xl mx-auto shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                {language === "ur" ? "والٹ امپورٹ تفصیلات" : "Standard Custom Token Import Details"}
              </span>
              <h4 className="text-xl font-black text-white">
                Pak Coin ($PAK) Parameters
              </h4>
              <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-1">
                <span><strong>Symbol:</strong> PAK</span>
                <span><strong>Decimals:</strong> 18</span>
                <span><strong>Network:</strong> BNB Smart Chain (Chain ID: 56)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={copyContract}
                className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-black" />
                    <span>{language === "ur" ? "ایڈریس کاپی کریں" : "Copy Address"}</span>
                  </>
                )}
              </button>

              <a
                href={SOCIAL_LINKS.bscscan}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-950 border border-emerald-500/30 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all"
              >
                <span>BscScan</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import {
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileText,
  ExternalLink,
  Coins,
  Lock,
  Zap,
  Smartphone,
} from "lucide-react";

export const Hero = ({ onOpenWhitepaper, onOpenTrustWallet }) => {
  const { language, addTokenToMetaMask, showToast } = useWeb3();
  const t = translations[language].hero;

  const [copied, setCopied] = useState(false);

  const copyContractAddress = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.address);
    setCopied(true);
    showToast(t.contractCopied);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Neon Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Description & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-bold shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{t.tag}</span>
              <span className="text-[10px] text-amber-300 font-extrabold px-1.5 py-0.2 rounded bg-amber-400/20 border border-amber-400/40">
                BSC MAINNET
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {t.titleStart}{" "}
              <span className="gradient-pak text-glow-emerald block mt-1">
                {t.titleHighlight}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className={`text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal ${language === 'ur' ? 'urdu-font text-xl' : ''}`}>
              {t.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#swap"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(0,230,118,0.4)] hover:shadow-[0_0_35px_rgba(0,230,118,0.6)] transition-all flex items-center space-x-2 group cursor-pointer"
              >
                <span>{t.swapBtn || "DEX Swap Portal"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={SOCIAL_LINKS.pancakeswap}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#1c1809] hover:bg-[#2e260e] border border-amber-400/50 text-amber-300 font-extrabold text-sm sm:text-base transition-all flex items-center space-x-2 shadow-md hover:shadow-amber-400/20"
              >
                <span>🥞 PancakeSwap DEX</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>

              <button
                onClick={onOpenTrustWallet}
                className="px-5 py-3.5 rounded-xl bg-[#092013] hover:bg-[#10321e] border border-emerald-500/40 text-emerald-200 font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>{t.walletsBtn || "Wallets Guide"}</span>
              </button>

              <button
                onClick={onOpenWhitepaper}
                className="px-4 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/30 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{t.whitepaperBtn}</span>
              </button>
            </div>

            {/* Contract Address Bar */}
            <div className="pt-4 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-[#091a0f]/90 border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xl backdrop-blur-md">
                <div className="flex items-center space-x-2 text-gray-400 truncate w-full sm:w-auto">
                  <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-[11px]">
                    Contract:
                  </span>
                  <span className="font-mono text-gray-200 truncate">
                    {CONTRACT_CONFIG.address}
                  </span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={copyContractAddress}
                    className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                    title={t.copyContract}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={SOCIAL_LINKS.bscscan}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/20 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-all"
                    title="View on BscScan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-gray-400">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Audited OpenZeppelin Code</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Zero Mint Function (1B Capped)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>0% Transaction Tax</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Pak Coin Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-amber-500/20 rounded-3xl blur-2xl transform scale-95" />

              <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl">
                
                {/* Header inside Card */}
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="./pakcoin-logo.svg"
                      alt="Pak Coin"
                      className="w-12 h-12 rounded-full border border-emerald-500/40 p-1 bg-emerald-950"
                    />
                    <div>
                      <h3 className="font-extrabold text-white text-lg tracking-wide">
                        Pak Coin ($PAK)
                      </h3>
                      <p className="text-xs text-emerald-400 font-semibold">
                        BNB Smart Chain (BEP-20)
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    VERIFIED BEP-20
                  </span>
                </div>

                {/* Animated Central Coin Display */}
                <div className="my-6 flex flex-col items-center justify-center py-4 relative">
                  <div className="absolute w-44 h-44 rounded-full bg-emerald-500/10 animate-pulse-slow blur-xl" />
                  <img
                    src="./pakcoin-logo.svg"
                    alt="Pak Coin 3D Emblem"
                    className="w-44 h-44 object-contain animate-float drop-shadow-[0_10px_25px_rgba(0,230,118,0.5)] z-10"
                  />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-black text-white">
                      1,000,000,000 <span className="text-emerald-400">$PAK</span>
                    </div>
                    <div className="text-xs text-amber-400/90 font-medium mt-0.5">
                      Fixed Supply • Zero Tax • Non-Custodial
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#07170c] border border-emerald-500/20">
                    <span className="text-gray-400 block">{t.statSupply}</span>
                    <span className="text-white font-bold text-sm">{t.statSupplyVal}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#07170c] border border-emerald-500/20">
                    <span className="text-gray-400 block">{t.statNetwork}</span>
                    <span className="text-emerald-400 font-bold text-sm">BNB Chain (BEP-20)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#07170c] border border-emerald-500/20">
                    <span className="text-gray-400 block">{t.statTax}</span>
                    <span className="text-amber-400 font-bold text-sm">{t.statTaxVal}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#07170c] border border-emerald-500/20">
                    <span className="text-gray-400 block">{t.statSpeed}</span>
                    <span className="text-white font-bold text-sm">{t.statSpeedVal}</span>
                  </div>
                </div>

                {/* Quick CTA inside card */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <a
                    href="#swap"
                    className="block text-center py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-extrabold text-xs transition-all"
                  >
                    DEX Swap Portal ↓
                  </a>
                  <a
                    href={SOCIAL_LINKS.pancakeswap}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 font-extrabold text-xs transition-all flex items-center justify-center space-x-1"
                  >
                    <span>PancakeSwap</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

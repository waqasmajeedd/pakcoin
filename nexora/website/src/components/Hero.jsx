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
  Pickaxe,
  Terminal,
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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Description & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-400/40 text-amber-400 text-xs sm:text-sm font-bold shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>{t.tag}</span>
              <span className="text-[10px] text-cyan-300 font-extrabold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-400/40">
                BITCOIN HALVING
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {t.titleStart}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 text-glow-gold block mt-1">
                {t.titleHighlight}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className={`text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal ${language === 'ur' ? 'urdu-font text-xl' : ''}`}>
              {t.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#mining"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-[0_0_25px_rgba(244,183,40,0.4)] hover:shadow-[0_0_35px_rgba(244,183,40,0.6)] transition-all flex items-center space-x-2 group cursor-pointer"
              >
                <Pickaxe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{t.tradeBtn || "Launch Web3 Miner ⛏️"}</span>
              </a>

              <a
                href="#swap"
                className="px-5 py-3.5 rounded-2xl bg-[#121622] hover:bg-[#1A2030] border border-slate-700 hover:border-amber-400/40 text-slate-200 font-extrabold text-sm sm:text-base transition-all flex items-center space-x-2 shadow-md"
              >
                <Coins className="w-4 h-4 text-amber-400" />
                <span>{t.swapBtn || "Get $NXRA"}</span>
              </a>

              <button
                onClick={onOpenWhitepaper}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{t.whitepaperBtn}</span>
              </button>
            </div>

            {/* Contract Address Bar */}
            <div className="pt-4 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-[#0D1017] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xl backdrop-blur-md">
                <div className="flex items-center space-x-2 text-slate-400 truncate w-full sm:w-auto">
                  <span className="font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-[11px]">
                    Contract:
                  </span>
                  <span className="font-mono text-slate-200 truncate">
                    {CONTRACT_CONFIG.address}
                  </span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={copyContractAddress}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                    title={t.copyContract}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`${CONTRACT_CONFIG.supportedChains[56].blockExplorer}/token/${CONTRACT_CONFIG.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="View on BscScan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Audited OpenZeppelin 5.x</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Zero Mint Function (1B Capped)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>0% Transaction Tax</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Nexora Emblem Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-cyan-500/10 rounded-3xl blur-2xl transform scale-95" />

              <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
                
                {/* Header inside Card */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="./nexora-logo.svg"
                      alt="Nexora"
                      className="w-12 h-12 rounded-2xl border border-amber-400/30 p-1 bg-[#0A0D14]"
                    />
                    <div>
                      <h3 className="font-extrabold text-white text-lg tracking-wide">
                        Nexora Protocol
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold font-mono">
                        $NXRA • BEP-20 / PoW
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    BITCOIN PoW
                  </span>
                </div>

                {/* Animated Central Emblem Display */}
                <div className="my-6 flex flex-col items-center justify-center py-4 relative">
                  <div className="absolute w-44 h-44 rounded-full bg-amber-500/10 animate-pulse-slow blur-xl" />
                  <img
                    src="./nexora-logo.svg"
                    alt="Nexora 3D Emblem"
                    className="w-44 h-44 object-contain animate-float drop-shadow-[0_10px_30px_rgba(244,183,40,0.4)] z-10"
                  />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-black text-white font-mono">
                      1,000,000,000 <span className="text-amber-400">$NXRA</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">
                      500M PoW Mining Pool • 0% Tax • Non-Custodial
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block">{t.statSupply}</span>
                    <span className="text-white font-bold text-sm font-mono">{t.statSupplyVal}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block">{t.statNetwork}</span>
                    <span className="text-amber-400 font-bold text-sm font-mono">500M PoW Pool</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

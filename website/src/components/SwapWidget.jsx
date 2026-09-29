import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG } from "../constants/contractInfo";
import {
  ArrowDownUp,
  Wallet,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info,
  ExternalLink,
  Flame,
} from "lucide-react";

export const SwapWidget = () => {
  const {
    account,
    connectWallet,
    buyPakTokens,
    bnbBalance,
    pakBalance,
    language,
    showToast,
  } = useWeb3();

  const [bnbInput, setBnbInput] = useState("0.5");
  const [loading, setLoading] = useState(false);

  const t = translations[language].swap;

  // Calculation
  const numericBnb = parseFloat(bnbInput) || 0;
  const calculatedPak = (numericBnb * CONTRACT_CONFIG.presaleRate).toLocaleString();

  const presets = ["0.1", "0.25", "0.5", "1.0", "2.5", "5.0"];

  const handleBuy = async () => {
    if (!account) {
      connectWallet();
      return;
    }

    if (numericBnb < parseFloat(CONTRACT_CONFIG.minBuyBNB)) {
      showToast(`Minimum purchase is ${CONTRACT_CONFIG.minBuyBNB} BNB`);
      return;
    }
    if (numericBnb > parseFloat(CONTRACT_CONFIG.maxBuyBNB)) {
      showToast(`Maximum purchase is ${CONTRACT_CONFIG.maxBuyBNB} BNB`);
      return;
    }

    setLoading(true);
    try {
      await buyPakTokens(numericBnb);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="presale" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-700/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Presale Stage 1 Live</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Two-Column Layout: Presale Progress + Interactive Swap Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Presale Progress & Token Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-emerald-500/30 space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                    Fundraising Goal
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    680 / 1,000 <span className="text-emerald-400 text-lg font-bold">BNB</span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Progress</span>
                  <span className="text-xl font-black text-amber-400">68%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#051308] rounded-full h-3.5 p-0.5 border border-emerald-500/30 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,230,118,0.7)]"
                  style={{ width: "68%" }}
                />
              </div>

              {/* Presale Metrics List */}
              <div className="space-y-3 pt-2 text-xs divide-y divide-emerald-500/10">
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Soft Cap / Hard Cap:</span>
                  <span className="font-bold text-white">300 BNB / 1,000 BNB</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Token Presale Price:</span>
                  <span className="font-bold text-emerald-400">1 BNB = 10,000 PAK</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Projected Listing Price:</span>
                  <span className="font-bold text-amber-400">1 BNB = 6,000 PAK ($0.15)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Distribution:</span>
                  <span className="font-bold text-white">Instant Smart Contract Release</span>
                </div>
              </div>

              {/* Security Banner */}
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-start space-x-2.5 text-xs text-gray-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  100% automated via verified Solidity smart contract. All unsold tokens will be automatically burned.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Swap Calculator */}
          <div className="lg:col-span-7">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-amber-400/20">
                <div className="flex items-center space-x-2">
                  <ArrowDownUp className="w-5 h-5 text-amber-400" />
                  <h3 className="font-black text-white text-lg tracking-wide">
                    Swap BNB for $PAK
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30">
                  Instant Credit
                </span>
              </div>

              {/* Pay Input Box */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{t.youPay}</span>
                  {account && (
                    <span className="text-gray-400">
                      {t.balance}: <span className="text-emerald-400 font-mono font-bold">{bnbBalance} BNB</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center rounded-2xl bg-[#07130a] border border-emerald-500/30 focus-within:border-emerald-400 p-3.5 transition-all">
                  <input
                    type="number"
                    step="0.05"
                    min={CONTRACT_CONFIG.minBuyBNB}
                    max={CONTRACT_CONFIG.maxBuyBNB}
                    value={bnbInput}
                    onChange={(e) => setBnbInput(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent text-2xl font-black text-white focus:outline-none font-mono"
                  />
                  <div className="flex items-center space-x-2 pl-3 border-l border-emerald-500/20 shrink-0">
                    <div className="w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center font-bold text-amber-400 text-xs">
                      BNB
                    </div>
                    <span className="font-extrabold text-white text-sm">BNB</span>
                  </div>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {presets.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setBnbInput(amt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        bnbInput === amt
                          ? "bg-emerald-500 text-black shadow-md"
                          : "bg-[#091b10] border border-emerald-500/30 text-gray-300 hover:border-emerald-400"
                      }`}
                    >
                      {amt} BNB
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider Icon */}
              <div className="flex justify-center my-3">
                <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                  <ArrowDownUp className="w-4 h-4" />
                </div>
              </div>

              {/* Receive Output Box */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{t.youReceive}</span>
                  {account && (
                    <span className="text-gray-400">
                      {t.balance}: <span className="text-emerald-400 font-mono font-bold">{pakBalance} PAK</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center rounded-2xl bg-[#07130a] border border-emerald-500/30 p-3.5">
                  <div className="w-full text-2xl font-black text-emerald-400 font-mono">
                    {calculatedPak}
                  </div>
                  <div className="flex items-center space-x-2 pl-3 border-l border-emerald-500/20 shrink-0">
                    <img
                      src="./pakcoin-logo.svg"
                      alt="PAK"
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="font-extrabold text-white text-sm">PAK</span>
                  </div>
                </div>
              </div>

              {/* Rate & Gas Info */}
              <div className="mt-4 p-3 rounded-xl bg-[#0a180e] border border-emerald-500/20 text-xs space-y-1 text-gray-300">
                <div className="flex justify-between">
                  <span>Exchange Rate:</span>
                  <span className="font-bold text-amber-300">1 BNB = 10,000 $PAK</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Network:</span>
                  <span className="text-emerald-400">BNB Smart Chain (~$0.05)</span>
                </div>
                <div className="flex justify-between">
                  <span>Presale Limits:</span>
                  <span>{t.minMax}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                {!account ? (
                  <button
                    onClick={connectWallet}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-black text-base shadow-[0_0_25px_rgba(0,230,118,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Wallet className="w-5 h-5 text-black" />
                    <span>{t.actionConnect}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,215,0,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-60"
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                    <span>{loading ? t.processing : `${t.actionBuy} (${calculatedPak} PAK)`}</span>
                  </button>
                )}
              </div>

              {/* Note on Trust */}
              <p className="text-[11px] text-center text-gray-400 mt-4">
                Tokens are minted/transferred directly to your connected wallet upon confirmation.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

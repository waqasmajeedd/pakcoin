import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { Coins, Sparkles, TrendingUp, Lock, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export const StakingSimulator = () => {
  const { language, account, connectWallet, showToast } = useWeb3();
  const t = translations[language].staking;

  const [stakeAmount, setStakeAmount] = useState(50000);
  const [durationMonths, setDurationMonths] = useState(12);

  // APY Tiers
  const apyMap = {
    3: 0.12,  // 12%
    6: 0.18,  // 18%
    12: 0.28, // 28%
  };

  const currentApy = apyMap[durationMonths] || 0.28;
  const annualReward = Math.round(stakeAmount * currentApy);
  const periodReward = Math.round(stakeAmount * currentApy * (durationMonths / 12));
  const monthlyReward = Math.round(annualReward / 12);
  const totalMaturity = stakeAmount + periodReward;

  const handleSimulateStake = () => {
    if (!account) {
      connectWallet();
      return;
    }
    confetti({
      particleCount: 70,
      spread: 60,
      colors: ["#00E676", "#FFD700"],
    });
    showToast(
      language === "ur"
        ? `کامیابی! ${stakeAmount.toLocaleString()} $PAK ٹوکن ${durationMonths} ماہ کے لیے سٹیک کر دیے گئے۔`
        : `Simulated! ${stakeAmount.toLocaleString()} $PAK staked for ${durationMonths} months at ${(currentApy * 100)}% APY.`
    );
  };

  return (
    <section id="staking" className="relative py-20 lg:py-28 bg-[#040905]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Staking Card */}
        <div className="max-w-4xl mx-auto glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-400/30 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Input Side */}
            <div className="md:col-span-6 space-y-6">
              
              {/* Amount Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-300">
                  <label className="font-semibold text-gray-300">{t.amountLabel}</label>
                  <span className="text-amber-400 font-mono font-bold">
                    {stakeAmount.toLocaleString()} PAK
                  </span>
                </div>

                <input
                  type="range"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-[#051308] rounded-lg"
                />

                <div className="flex gap-2 pt-1">
                  {[10000, 50000, 100000, 500000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setStakeAmount(val)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                        stakeAmount === val
                          ? "bg-amber-400 text-black font-black border-amber-400"
                          : "bg-emerald-950/40 text-gray-300 border-emerald-500/20 hover:border-emerald-500/50"
                      }`}
                    >
                      {(val / 1000)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Lock Duration Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 block">
                  {t.durationLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { m: 3, apy: "12% APY", label: "3 Mo" },
                    { m: 6, apy: "18% APY", label: "6 Mo" },
                    { m: 12, apy: "28% APY", label: "12 Mo" },
                  ].map((tier) => (
                    <button
                      key={tier.m}
                      onClick={() => setDurationMonths(tier.m)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        durationMonths === tier.m
                          ? "glass-panel-gold border-amber-400 text-amber-300 shadow-lg scale-105"
                          : "bg-[#061409] border-emerald-500/20 text-gray-400 hover:border-emerald-500/40"
                      }`}
                    >
                      <span className="block font-black text-sm">{tier.label}</span>
                      <span className="block text-[11px] font-bold text-emerald-400">
                        {tier.apy}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Output Calculation Side */}
            <div className="md:col-span-6 bg-[#07170c] rounded-2xl p-6 border border-emerald-500/25 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                  Effective APY
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {currentApy * 100}%
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>{t.monthlyEst}:</span>
                  <span className="font-bold text-white font-mono">
                    +{monthlyReward.toLocaleString()} PAK / mo
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{t.estEarnings}:</span>
                  <span className="font-bold text-amber-400 font-mono">
                    +{periodReward.toLocaleString()} PAK
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-emerald-500/15 text-sm">
                  <span className="font-bold text-white">{t.totalAtMaturity}:</span>
                  <span className="font-black text-emerald-300 font-mono text-base">
                    {totalMaturity.toLocaleString()} PAK
                  </span>
                </div>
              </div>

              {/* Stake Button */}
              <button
                onClick={handleSimulateStake}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-black" />
                <span>{t.stakeBtn}</span>
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Non-custodial smart contract staking</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { PieChart, ShieldCheck, Flame, Lock, Layers, Zap } from "lucide-react";

export const Tokenomics = () => {
  const { language } = useWeb3();
  const t = translations[language].tokenomics;

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="tokenomics" className="relative py-20 lg:py-28 bg-[#040805]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <PieChart className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Central Metric */}
        <div className="mb-12 text-center">
          <div className="inline-block p-4 sm:p-6 rounded-3xl glass-panel border border-emerald-500/30 shadow-2xl">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-extrabold block">
              Fixed Max Total Supply
            </span>
            <div className="text-3xl sm:text-5xl font-black text-white font-mono mt-1 gradient-gold">
              1,000,000,000 $PAK
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Strictly Capped • Deflationary via Burn Mechanism
            </p>
          </div>
        </div>

        {/* Visual Allocation Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Allocation Bars */}
          <div className="lg:col-span-7 space-y-4">
            {t.categories.map((cat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveCategory(idx)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  activeCategory === idx
                    ? "glass-panel-gold border-amber-400/50 scale-[1.02]"
                    : "glass-card border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-md shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h4 className="font-extrabold text-white text-base">
                      {cat.name}
                    </h4>
                  </div>
                  <span
                    className="font-black text-xl font-mono"
                    style={{ color: cat.color }}
                  >
                    {cat.percent}%
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-3 pl-7">
                  {cat.desc}
                </p>

                {/* Bar */}
                <div className="w-full bg-[#030d06] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${cat.percent}%`,
                      backgroundColor: cat.color,
                      boxShadow: `0 0 10px ${cat.color}80`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Key Security Pillars & Contract Features */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
              <h3 className="text-xl font-black text-white flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span>Smart Contract Security</span>
              </h3>

              <div className="space-y-4">
                {t.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#07170c] border border-emerald-500/20 space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <h4 className="font-bold text-white text-sm">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-300 pl-4 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Security Badges Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/25 text-center">
                  <Lock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="font-bold text-white block">Liquidity Lock</span>
                  <span className="text-[11px] text-gray-400">100% on PinkSale</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/25 text-center">
                  <Flame className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <span className="font-bold text-white block">Burn Mechanism</span>
                  <span className="text-[11px] text-gray-400">Quarterly Burns</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

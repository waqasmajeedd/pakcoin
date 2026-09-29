import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { TrendingUp, DollarSign, Flame, Lock, Shield, Award } from "lucide-react";

export const StatsBar = () => {
  const { language } = useWeb3();
  const t = translations[language].stats;

  const items = [
    {
      icon: DollarSign,
      label: t.livePrice,
      value: t.livePriceVal,
      badge: "+180% Launch Target",
      badgeColor: "text-emerald-400 bg-emerald-950/80 border-emerald-500/30",
    },
    {
      icon: TrendingUp,
      label: t.marketCap,
      value: t.marketCapVal,
      badge: "Fully Diluted",
      badgeColor: "text-cyan-400 bg-cyan-950/80 border-cyan-500/30",
    },
    {
      icon: Lock,
      label: t.liquidityLock,
      value: t.liquidityLockVal,
      badge: "PinkLock 2 Years",
      badgeColor: "text-amber-400 bg-amber-950/80 border-amber-500/30",
    },
    {
      icon: Flame,
      label: t.burnRate,
      value: t.burnRateVal,
      badge: "Deflationary",
      badgeColor: "text-red-400 bg-red-950/80 border-red-500/30",
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-emerald-500/30 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-emerald-500/20">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-4 ${
                  idx !== 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-base sm:text-lg font-black text-white truncate mt-0.5">
                    {item.value}
                  </p>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 mt-1 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

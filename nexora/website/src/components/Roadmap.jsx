import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { Milestone, CheckCircle2, Clock, Sparkles } from "lucide-react";

export const Roadmap = () => {
  const { language } = useWeb3();
  const t = translations[language].roadmap;

  return (
    <section id="roadmap" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Milestone className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.phases.map((item, idx) => {
            const isCurrent = idx === 0;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? "glass-panel-gold border-amber-400/50 shadow-[0_0_30px_rgba(255,215,0,0.15)]"
                    : "glass-card border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                {/* Step Node */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isCurrent
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                          : "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-2xl font-black text-gray-400/50 font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-4">
                    {item.phase}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 text-xs text-gray-300 font-normal">
                    {item.items.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-2">
                        {isCurrent && bIdx < 3 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`leading-relaxed ${language === 'ur' ? 'urdu-font text-sm' : ''}`}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom line marker */}
                <div className="pt-6 mt-6 border-t border-emerald-500/15">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>Target Target</span>
                    <span className="font-bold text-emerald-400">
                      {idx === 0 ? "Q1 - Active" : `Q${idx + 1} 2026-2027`}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

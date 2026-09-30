import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import {
  Send,
  Laptop,
  Store,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

export const Features = () => {
  const { language } = useWeb3();
  const t = translations[language].features;

  const iconMap = {
    Send: Send,
    Laptop: Laptop,
    Store: Store,
    ShieldCheck: ShieldCheck,
    Zap: Zap,
    HeartHandshake: HeartHandshake,
  };

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-7 border border-emerald-500/20 hover:border-emerald-400/40 space-y-4 group relative overflow-hidden"
              >
                {/* Glow pill behind icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all shadow-md">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>

                <p className={`text-sm text-gray-300 leading-relaxed font-normal ${language === 'ur' ? 'urdu-font text-base' : ''}`}>
                  {item.desc}
                </p>

                <div className="pt-2 flex items-center space-x-1.5 text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

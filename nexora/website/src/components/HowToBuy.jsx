import React from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { HelpCircle, ArrowRight, ShieldCheck, Download, CreditCard, ArrowLeftRight, CheckCircle } from "lucide-react";

export const HowToBuy = () => {
  const { language } = useWeb3();
  const t = translations[language].howToBuy;

  const stepIcons = [Download, CreditCard, ArrowLeftRight, CheckCircle];

  return (
    <section id="how-to-buy" className="relative py-20 lg:py-28 bg-[#040805]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || CheckCircle;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-emerald-500/20 hover:border-emerald-400/50 space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/60 group-hover:text-emerald-300 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-emerald-500/30 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h3>

                <p className={`text-xs text-gray-300 leading-relaxed font-normal ${language === 'ur' ? 'urdu-font text-sm' : ''}`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Exchange helper banner */}
        <div className="mt-12 p-6 rounded-3xl glass-panel-gold border border-amber-400/30 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-extrabold text-white text-base">
              {language === 'ur' ? "کیا آپ کو BNB حاصل کرنے میں رہنمائی چاہیے؟" : "Need help acquiring BNB on BNB Chain?"}
            </h4>
            <p className="text-xs text-gray-300">
              {language === 'ur' 
                ? "آپ بائننس، بائی بٹ، یا کسی بھی معروف کریپٹو ایکسچینج سے باآسانی کارڈ یا بینک ٹرانسفر کے ذریعے BNB حاصل کر سکتے ہیں۔" 
                : "Acquire BNB instantly via Visa/Mastercard, Apple Pay, or bank wire on top exchanges like Binance, Bybit, or OKX."}
            </p>
          </div>
          <a
            href="#swap"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-lg transition-all shrink-0 cursor-pointer"
          >
            {language === 'ur' ? "سواپ پر واپس جائیں ↑" : "Go to Swap Portal ↑"}
          </a>
        </div>

      </div>
    </section>
  );
};

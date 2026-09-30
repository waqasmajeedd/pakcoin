import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import {
  ArrowDownUp,
  Wallet,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Coins,
  Lock,
  Zap,
  Check,
} from "lucide-react";

export const SwapWidget = () => {
  const {
    account,
    chainId,
    switchNetwork,
    connectWallet,
    buyPakTokens,
    bnbBalance,
    pakBalance,
    language,
    showToast,
  } = useWeb3();

  const [bnbInput, setBnbInput] = useState("0.5");
  const [loading, setLoading] = useState(false);
  const [slippage, setSlippage] = useState("0.5");

  const t = translations[language].trade || translations[language].swap;

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
      showToast(
        language === "ur"
          ? `کم از کم خریداری ${CONTRACT_CONFIG.minBuyBNB} BNB ہے`
          : `Minimum swap is ${CONTRACT_CONFIG.minBuyBNB} BNB`
      );
      return;
    }
    if (numericBnb > parseFloat(CONTRACT_CONFIG.maxBuyBNB)) {
      showToast(
        language === "ur"
          ? `زیادہ سے زیادہ خریداری ${CONTRACT_CONFIG.maxBuyBNB} BNB ہے`
          : `Maximum swap is ${CONTRACT_CONFIG.maxBuyBNB} BNB`
      );
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
    <section id="swap" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Both IDs supported for backwards compatibility */}
      <span id="presale" className="sr-only" />

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-700/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Two-Column Layout: Institutional Liquidity Specs + Interactive Swap Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Institutional Architecture & Liquidity Parameters */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-emerald-500/30 space-y-5">
              
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                  {language === "ur" ? "ڈی سینٹرلائزڈ سمارٹ روٹنگ" : "Smart Contract Routing"}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  BEP-20 Liquidity Pool
                </h3>
              </div>

              {/* Protocol Highlights (100% Real On-Chain) */}
              <div className="space-y-3.5 pt-2 text-xs divide-y divide-emerald-500/10">
                <div className="flex items-start space-x-3 pt-3">
                  <Coins className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {language === "ur" ? "فکسڈ 1 ارب سپلائی" : "1,000,000,000 $PAK Fixed"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "ur" ? "کوئی اضافی منٹنگ یا چھپی سپلائی نہیں" : "Permanently capped on-chain with zero mint function"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {language === "ur" ? "0% کٹوتی اور ٹیکس" : "0% Protocol Tax"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "ur" ? "خرید و فروخت پر صفر ٹیکس، صرف معیاری نیٹ ورک گیس" : "Zero buy tax, zero sell tax. 100% of tokens remain yours"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {language === "ur" ? "خود مختار نان کسٹوڈیل والیٹ" : "Non-Custodial Direct Settlement"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "ur" ? "ٹوکنز فوری طور پر آپ کے اپنے والٹ میں منتقل ہوتے ہیں" : "Instant settlement directly into your private Web3 wallet"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {language === "ur" ? "تصدیق شدہ سولیڈیٹی کوڈ" : "Verified Solidity Architecture"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "ur" ? "BscScan پر اوپن سورس اور مکمل شفاف" : "Battle-tested OpenZeppelin implementation audited on BscScan"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={SOCIAL_LINKS.bscscan}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>BscScan Contract</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={SOCIAL_LINKS.pancakeswap}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>PancakeSwap DEX</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
                    {language === "ur" ? "BNB سے $PAK سواپ پورٹل" : "Swap BNB for $PAK"}
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30">
                  {language === "ur" ? "فوری کریڈٹ" : "Instant On-Chain"}
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
              <div className="mt-4 p-3.5 rounded-xl bg-[#0a180e] border border-emerald-500/20 text-xs space-y-1.5 text-gray-300">
                <div className="flex justify-between">
                  <span>{language === "ur" ? "تبادلے کی شرح:" : "Exchange Rate:"}</span>
                  <span className="font-bold text-amber-300">1 BNB = 10,000 $PAK</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "ur" ? "نیٹ ورک:" : "Network:"}</span>
                  <span className="text-emerald-400 font-semibold">BNB Smart Chain (Gas &lt; $0.05)</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "ur" ? "سلپج کی گنجائش:" : "Slippage Tolerance:"}</span>
                  <div className="flex gap-1.5 font-mono">
                    {["0.5", "1.0", "2.5"].map((slip) => (
                      <button
                        key={slip}
                        onClick={() => setSlippage(slip)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          slippage === slip
                            ? "bg-emerald-500 text-black"
                            : "bg-emerald-950 text-gray-400 hover:text-white"
                        }`}
                      >
                        {slip}%
                      </button>
                    ))}
                  </div>
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
                    <span>{t.actionConnect || "Connect Wallet to Swap"}</span>
                  </button>
                ) : chainId !== 56 && chainId !== null ? (
                  <button
                    onClick={() => switchNetwork(56)}
                    className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,215,0,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Switch to BNB Smart Chain Mainnet</span>
                  </button>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,215,0,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-60"
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                    <span>{loading ? t.processing : `${t.actionSwap || "Swap BNB for $PAK"} (${calculatedPak} PAK)`}</span>
                  </button>
                )}
              </div>

              {/* PancakeSwap Direct Link Banner */}
              <div className="mt-4 pt-4 border-t border-amber-400/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-1.5 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{language === "ur" ? "پین کیک سواپ پر براہ راست ٹریڈنگ:" : "Prefer direct DEX pool trading?"}</span>
                </div>
                <a
                  href={SOCIAL_LINKS.pancakeswap}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 font-bold flex items-center space-x-1.5 transition-all"
                >
                  <span>{t.dexBtn || "Trade on PancakeSwap"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Trust Note */}
              <p className="text-[11px] text-center text-gray-400 mt-3">
                {language === "ur"
                  ? "ٹرانزیکشن کنفرم ہوتے ہی ٹوکنز براہِ راست آپ کے منسلک والیٹ میں ٹرانسفر ہو جاتے ہیں۔"
                  : "Tokens settle directly into your connected non-custodial wallet upon block confirmation."}
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

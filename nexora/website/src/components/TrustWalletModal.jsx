import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import {
  X,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  Sparkles,
  Info,
} from "lucide-react";

export const TrustWalletModal = ({ isOpen, onClose }) => {
  const { language, addTokenToMetaMask, showToast } = useWeb3();
  const [activeTab, setActiveTab] = useState("trustwallet"); // 'trustwallet' or 'metamask'
  const [copiedField, setCopiedField] = useState("");

  if (!isOpen) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(
      language === "ur"
        ? `${fieldName} کاپی ہو گیا!`
        : `${fieldName} copied to clipboard!`
    );
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#061009] border border-emerald-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-emerald-500/25 flex items-center justify-between bg-[#081b0e]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center space-x-2">
                <span>
                  {language === "ur"
                    ? "Trust Wallet اور MetaMask میں ٹوکن شو کرنے کا طریقہ"
                    : "Add Pak Coin ($PAK) to Your Wallet"}
                </span>
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                {language === "ur"
                  ? "صرف 1 منٹ میں اپنے والیٹ میں کوائن حاصل کریں"
                  : "Instant 30-Second Step-by-Step Setup Guide"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-950/80 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 pb-2 flex gap-3 bg-[#040c06] border-b border-emerald-500/15">
          <button
            onClick={() => setActiveTab("trustwallet")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === "trustwallet"
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "bg-emerald-950/40 text-gray-400 hover:text-white"
            }`}
          >
            <span>📱 Trust Wallet Guide</span>
          </button>
          <button
            onClick={() => setActiveTab("metamask")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === "metamask"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                : "bg-emerald-950/40 text-gray-400 hover:text-white"
            }`}
          >
            <span>🦊 MetaMask Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-300">
          
          {/* Important Info Alert Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start space-x-3 text-amber-200">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block text-white text-xs sm:text-sm">
                {language === "ur"
                  ? "کوائن خود بخود کیوں شو نہیں ہوتا؟"
                  : "Why doesn't the coin show automatically at first?"}
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed font-normal">
                {language === "ur"
                  ? "کسی بھی نئے بلاک چین ٹوکن کو والٹ کی مین لسٹ میں آنے کے لیے 'Add Custom Token' کے ذریعے ایک بار ایڈ کرنا پڑتا ہے۔ ایڈ کرتے ہی آپ کا پورا بیلنس ظاہر ہو جائے گا۔"
                  : "New BEP-20 smart contracts must be imported once using 'Add Custom Token'. Once added, your exact balance of 1 Billion $PAK appears immediately!"}
              </p>
            </div>
          </div>

          {/* Quick Copy Data Cards */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block">
              {language === "ur" ? "ضروری کنٹریکٹ تفصیلات (Contract Details)" : "Official Token Parameters"}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Contract Address */}
              <div className="sm:col-span-2 p-3 rounded-2xl bg-[#091b0f] border border-emerald-500/25 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">
                    Contract Address (BSC Mainnet)
                  </span>
                  <span className="font-mono text-emerald-300 text-xs sm:text-sm font-semibold truncate block">
                    {CONTRACT_CONFIG.address}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(CONTRACT_CONFIG.address, "Contract Address")}
                  className="px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 font-bold text-xs flex items-center space-x-1 shrink-0 cursor-pointer"
                >
                  {copiedField === "Contract Address" ? (
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
              </div>

              {/* Network */}
              <div className="p-3 rounded-2xl bg-[#091b0f] border border-emerald-500/25 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Network</span>
                  <span className="font-bold text-white text-xs sm:text-sm">BNB Smart Chain (BEP-20)</span>
                </div>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Chain ID 56
                </span>
              </div>

              {/* Symbol */}
              <div className="p-3 rounded-2xl bg-[#091b0f] border border-emerald-500/25 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Symbol</span>
                  <span className="font-bold text-amber-400 font-mono text-xs sm:text-sm">PAK</span>
                </div>
                <button
                  onClick={() => copyToClipboard("PAK", "Symbol")}
                  className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
                  title="Copy Symbol"
                >
                  {copiedField === "Symbol" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Decimals */}
              <div className="p-3 rounded-2xl bg-[#091b0f] border border-emerald-500/25 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Decimals</span>
                  <span className="font-bold text-white font-mono text-xs sm:text-sm">18</span>
                </div>
                <button
                  onClick={() => copyToClipboard("18", "Decimals")}
                  className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
                  title="Copy Decimals"
                >
                  {copiedField === "Decimals" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Token Name */}
              <div className="p-3 rounded-2xl bg-[#091b0f] border border-emerald-500/25 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Name</span>
                  <span className="font-bold text-white text-xs sm:text-sm">Pak Coin</span>
                </div>
                <button
                  onClick={() => copyToClipboard("Pak Coin", "Token Name")}
                  className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
                  title="Copy Name"
                >
                  {copiedField === "Token Name" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Step by Step Walkthrough */}
          {activeTab === "trustwallet" ? (
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block">
                {language === "ur" ? "Trust Wallet میں شامل کرنے کے 4 آسان مراحل:" : "4 Steps to Import in Trust Wallet:"}
              </span>

              <ol className="space-y-3 text-xs sm:text-sm">
                <li className="p-3 rounded-2xl bg-[#06160b] border border-emerald-500/20 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-white block font-bold">
                      {language === "ur" ? "Trust Wallet ایپ کھولیں" : "Open Trust Wallet App"}
                    </strong>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {language === "ur"
                        ? "اوپر دائیں کونے میں فلٹر آئیکن (یا نیچے 'Manage Crypto') پر ٹیپ کریں۔"
                        : "Tap the top-right filter toggle icon or scroll to the bottom and tap 'Manage Crypto'."}
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-2xl bg-[#06160b] border border-emerald-500/20 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-white block font-bold">
                      {language === "ur" ? "'+' (Add Custom Token) پر ٹیپ کریں" : "Tap '+' (Add Custom Token)"}
                    </strong>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {language === "ur"
                        ? "اوپر کونے میں موجود '+' پلس کے نشان کو دبائیں۔"
                        : "Tap the '+' icon at the top corner to open the Custom Token screen."}
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-2xl bg-[#06160b] border border-emerald-500/20 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-white block font-bold">
                      {language === "ur" ? "نیٹ ورک تبدیل کر کے 'BNB Smart Chain' منتخب کریں" : "Select Network: 'BNB Smart Chain'"}
                    </strong>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {language === "ur"
                        ? "ڈفالٹ Ethereum ہوگا، اسے بدل کر 'BNB Smart Chain' کر دیں۔"
                        : "By default it shows Ethereum. Change network to 'BNB Smart Chain'."}
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-2xl bg-[#06160b] border border-emerald-500/20 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center shrink-0 text-xs">
                    4
                  </span>
                  <div>
                    <strong className="text-white block font-bold">
                      {language === "ur" ? "ایڈریس پیسٹ کریں اور Save دبائیں" : "Paste Contract Address & Save"}
                    </strong>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {language === "ur"
                        ? "کنٹریکٹ ایڈریس پیسٹ کرتے ہی Pak Coin ($PAK) اور 18 خود بخود آ جائے گا۔ 'Import' یا 'Save' پر کلک کریں!"
                        : "Paste the contract address. Name, Symbol, and Decimals will automatically autofill. Tap Save/Import!"}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 block">
                {language === "ur" ? "MetaMask میں شامل کرنے کا طریقہ:" : "MetaMask Setup:"}
              </span>

              {/* 1-Click Direct Button */}
              <div className="p-5 rounded-2xl glass-panel-gold border border-amber-400/40 text-center space-y-3">
                <p className="text-xs text-gray-300">
                  {language === "ur"
                    ? "اگر آپ براؤزر میں ہیں تو صرف نیچے دیا گیا بٹن دبائیں، میٹاماسک میں ٹوکن خود بخود ایڈ ہو جائے گا:"
                    : "If you are on desktop or using a Web3 browser, click below for 1-click automatic import:"}
                </p>
                <button
                  onClick={addTokenToMetaMask}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm flex items-center justify-center space-x-2 mx-auto cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  <PlusCircle className="w-4 h-4 text-black" />
                  <span>1-Click: Add $PAK to MetaMask</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#06160b] border border-emerald-500/20 space-y-2 text-xs">
                <span className="font-bold text-white block">Manual MetaMask Mobile Steps:</span>
                <p className="text-gray-400">
                  1. Open MetaMask & Ensure you are on <strong>BNB Smart Chain</strong>.
                </p>
                <p className="text-gray-400">
                  2. Scroll down and tap <strong>"Import Tokens"</strong>.
                </p>
                <p className="text-gray-400">
                  3. Tap <strong>"Custom Token"</strong> tab and paste: <span className="font-mono text-emerald-300">{CONTRACT_CONFIG.address}</span>.
                </p>
                <p className="text-gray-400">
                  4. Tap <strong>"Import"</strong>. Your tokens will be visible immediately!
                </p>
              </div>
            </div>
          )}

          {/* Explorer Link */}
          <div className="pt-2 flex items-center justify-between border-t border-emerald-500/15 text-xs text-gray-400">
            <span>Verified on BscScan Mainnet</span>
            <a
              href={SOCIAL_LINKS.bscscan}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
            >
              <span>View Token Contract on BscScan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

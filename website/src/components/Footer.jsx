import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import { Copy, Check, ExternalLink, Send } from "lucide-react";

export const Footer = ({ onOpenWhitepaper }) => {
  const { language, showToast } = useWeb3();
  const t = translations[language].footer;

  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.address);
    setCopied(true);
    showToast(language === "ur" ? "ایڈریس کاپی ہو گیا!" : "Contract address copied!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="relative bg-[#020503] border-t border-emerald-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-emerald-950/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-500/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/pakcoin-logo.svg"
                alt="Pak Coin"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-black text-white tracking-wider">
                PAK <span className="text-emerald-400">COIN</span>
              </span>
            </div>
            <p className={`text-sm text-gray-400 max-w-sm leading-relaxed ${language === 'ur' ? 'urdu-font text-base' : ''}`}>
              {language === "ur"
                ? "پاک کوائن ($PAK) ایک غیر مرکزی خود مختار ڈیجیٹل اثاثہ ہے۔ کم ترین فیس، تیز رفتار عالمی ادائیگیاں اور محفوظ مالیاتی مستقبل۔"
                : "Pak Coin ($PAK) is a decentralized cryptocurrency powering instant borderless payments, staking yields, and Web3 commerce."}
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Telegram */}
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-200 transition-all"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              {/* X / Twitter */}
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-200 transition-all"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Discord */}
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-200 transition-all"
                title="Discord"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-200 transition-all"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About Pak Coin
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="hover:text-emerald-400 transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#presale" className="hover:text-emerald-400 transition-colors">
                  Presale Portal
                </a>
              </li>
              <li>
                <a href="#staking" className="hover:text-emerald-400 transition-colors">
                  Staking Simulator
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-emerald-400 transition-colors">
                  Project Roadmap
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenWhitepaper}
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  Read Whitepaper 1.2
                </button>
              </li>
            </ul>
          </div>

          {/* Contract & Explorer Box */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t.contract}
            </h4>
            <div className="p-4 rounded-2xl bg-[#071309] border border-emerald-500/20 space-y-3 text-xs">
              <span className="text-gray-400 block font-mono text-[11px] break-all">
                {CONTRACT_CONFIG.address}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={copyContract}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer border border-emerald-500/30"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={SOCIAL_LINKS.bscscan}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-gray-300 hover:text-white text-xs font-semibold flex items-center space-x-1 transition-all border border-emerald-500/20"
                >
                  <span>BscScan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 text-xs text-gray-400/80 space-y-4">
          <p className="leading-relaxed">
            {t.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-gray-400 text-[11px] pt-4 border-t border-emerald-500/10 gap-2">
            <span>© 2026 Pak Coin ($PAK). All rights reserved.</span>
            <span>Engineered for the Global Web3 Community ⚡</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

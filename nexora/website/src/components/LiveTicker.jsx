import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { CONTRACT_CONFIG, SOCIAL_LINKS } from "../constants/contractInfo";
import {
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Flame,
  Sparkles,
  Smartphone,
  Key,
} from "lucide-react";

export const LiveTicker = ({ onOpenTrustWallet, onOpenSigner }) => {
  const { latestBlock, bscOnline, language, showToast } = useWeb3();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.address);
    setCopied(true);
    showToast(
      language === "ur"
        ? "کنٹریکٹ ایڈریس کاپی ہو گیا!"
        : "Contract address copied to clipboard!"
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-[#031509] via-[#05220f] to-[#031509] border-b border-emerald-500/30 text-[11px] sm:text-xs text-gray-300 py-2 px-3 sm:px-6 relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left Side: Live BSC Status & Official Contract */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-1">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>BNB Chain Mainnet</span>
            {latestBlock && (
              <span className="text-[10px] text-emerald-300/80 font-mono hidden sm:inline">
                #{latestBlock}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 bg-[#06190c] px-2.5 py-0.5 rounded-lg border border-emerald-500/20 text-gray-300">
            <span className="text-[10px] uppercase font-bold text-amber-400">
              Contract:
            </span>
            <span className="font-mono text-emerald-300 text-[11px]">
              {CONTRACT_CONFIG.address.slice(0, 6)}...{CONTRACT_CONFIG.address.slice(-4)}
            </span>
            <button
              onClick={copyAddress}
              title="Copy Contract Address"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer ml-1"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <span className="hidden md:inline-flex items-center space-x-1 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>BEP-20 Verified</span>
          </span>
        </div>

        {/* Right Side: Quick Action Pills */}
        <div className="flex items-center space-x-2 text-[11px] shrink-0">
          {/* Trust Wallet / MetaMask Modal Trigger */}
          <button
            onClick={onOpenTrustWallet}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-500/30 text-emerald-200 font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Smartphone className="w-3 h-3 text-emerald-400" />
            <span>{language === "ur" ? "Trust Wallet میں شامل کریں" : "Trust Wallet Guide"}</span>
          </button>

          {/* PancakeSwap Direct Link */}
          <a
            href={SOCIAL_LINKS.pancakeswap}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold transition-all"
          >
            <span>🥞 PancakeSwap</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* BscScan Explorer */}
          <a
            href={SOCIAL_LINKS.bscscan}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-1 text-gray-400 hover:text-emerald-300 transition-colors"
          >
            <span>BscScan</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Signer Modal */}
          <button
            onClick={onOpenSigner}
            title="Generate BscScan Ownership Verification Signature"
            className="hidden lg:flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
          >
            <Key className="w-3 h-3" />
            <span>Verify Ownership</span>
          </button>
        </div>

      </div>
    </div>
  );
};

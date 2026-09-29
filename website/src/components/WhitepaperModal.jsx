import React, { useState } from "react";
import { X, BookOpen, Download, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { CONTRACT_CONFIG } from "../constants/contractInfo";

export const WhitepaperModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("exec");

  if (!isOpen) return null;

  const sections = [
    { id: "exec", title: "1. Executive Summary" },
    { id: "problem", title: "2. Market Challenges" },
    { id: "solution", title: "3. The Pak Coin Solution" },
    { id: "tech", title: "4. Architecture & Smart Contract" },
    { id: "tokenomics", title: "5. Tokenomics & Vesting" },
    { id: "pakpay", title: "6. PakPay Commerce Gateway" },
    { id: "security", title: "7. Security & Governance" },
    { id: "legal", title: "8. Legal & Disclaimer" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-5xl h-[88vh] rounded-3xl bg-[#061009] border border-emerald-500/40 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-emerald-500/25 flex items-center justify-between bg-[#08180e]">
          <div className="flex items-center space-x-3">
            <img src="/pakcoin-logo.svg" alt="Pak Coin" className="w-9 h-9" />
            <div>
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span>Pak Coin ($PAK) Official Whitepaper</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  v1.2 Release
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                The Decentralized Utility Protocol for Global Digital Finance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-xs font-semibold text-emerald-300 hover:bg-emerald-900 border border-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-emerald-950/80 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-emerald-500/20 p-4 bg-[#050e08] overflow-y-auto shrink-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Chapters
            </p>
            <div className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    activeSection === sec.id
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold"
                      : "text-gray-400 hover:text-white hover:bg-emerald-950/40"
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-xl bg-[#091b0f] border border-emerald-500/20 text-[11px] text-gray-400 space-y-1">
              <span className="text-emerald-400 font-bold block">Smart Contract</span>
              <span className="font-mono text-gray-300 break-all text-[10px]">
                {CONTRACT_CONFIG.address}
              </span>
            </div>
          </div>

          {/* Chapter Content Area */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto text-gray-300 text-sm leading-relaxed space-y-6">
            
            {activeSection === "exec" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">1. Executive Summary</h3>
                <p>
                  Pak Coin ($PAK) is a decentralized cryptocurrency protocol designed to serve as a high-throughput, sovereign digital asset for global peer-to-peer settlement, remote creator compensation, and decentralized commerce.
                </p>
                <p>
                  Operating on the high-speed, cost-effective Binance Smart Chain (BEP-20 standard), Pak Coin eliminates the excessive commission fees, slow settlement cycles, and banking bottlenecks associated with traditional financial networks.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">Key Principles</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Strict total supply cap of 1,000,000,000 $PAK (No hidden mint backdoors)</li>
                    <li>Sub-second settlement with near-zero network fees</li>
                    <li>Deflationary quarterly buyback and burn protocol</li>
                    <li>Community-first liquidity lock on verified decentralized exchanges</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "problem" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">2. Market Challenges</h3>
                <p>
                  Despite the massive growth of the digital economy, traditional global payment networks remain fragmented, inefficient, and expensive:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#08180e] border border-red-500/30">
                    <span className="font-bold text-red-400 block mb-1">High Intermediary Fees</span>
                    Conventional payment gateways and wire systems deduct between 3% and 8% in conversion spreads and processing tariffs.
                  </div>
                  <div className="p-4 rounded-xl bg-[#08180e] border border-red-500/30">
                    <span className="font-bold text-red-400 block mb-1">Settlement Delays</span>
                    Cross-border wire transfers often take 3 to 7 business days to clear, subject to arbitrary banking holds.
                  </div>
                  <div className="p-4 rounded-xl bg-[#08180e] border border-red-500/30">
                    <span className="font-bold text-red-400 block mb-1">Fiat Volatility</span>
                    Fluctuating national fiat valuations erode savings, driving strong demand for hard-capped digital stores of value.
                  </div>
                  <div className="p-4 rounded-xl bg-[#08180e] border border-red-500/30">
                    <span className="font-bold text-red-400 block mb-1">Financial Exclusion</span>
                    Billions of internet-connected smartphone users lack access to traditional credit systems and international banking rails.
                  </div>
                </div>
              </div>
            )}

            {activeSection === "solution" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">3. The Pak Coin Solution</h3>
                <p>
                  Pak Coin provides a borderless, permissionless, and sovereign store of value and medium of exchange:
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Frictionless Peer-to-Peer Transfers:</strong> Anyone with a smartphone can send and receive $PAK within 3 seconds, requiring zero central approval.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Empowering Creators & Remote Workers:</strong> Clients can remit compensation via $PAK globally, which can instantly be held or swapped on DEXs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Decentralized Liquidity:</strong> With PancakeSwap and major DEX listings, token holders maintain total custody of their funds at all times.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeSection === "tech" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">4. Technical Architecture</h3>
                <p>
                  Pak Coin is implemented using Solidity 0.8.20 and adheres to the official OpenZeppelin ERC-20 and BEP-20 specifications.
                </p>
                <div className="p-4 rounded-2xl bg-[#051108] border border-emerald-500/30 font-mono text-xs space-y-1">
                  <div><strong>Standard:</strong> BEP-20 (Binance Smart Chain) / ERC-20</div>
                  <div><strong>Token Name:</strong> Pak Coin</div>
                  <div><strong>Symbol:</strong> PAK</div>
                  <div><strong>Decimals:</strong> 18</div>
                  <div><strong>Total Supply:</strong> 1,000,000,000 PAK</div>
                  <div><strong>Burn Mechanism:</strong> Standard ERC20Burnable with public proof</div>
                  <div><strong>Security Modifiers:</strong> Ownable, Pausable (Emergency Only)</div>
                </div>
              </div>
            )}

            {activeSection === "tokenomics" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">5. Tokenomics & Vesting Schedule</h3>
                <p>
                  To ensure sustainable economics, tokens are distributed strictly according to a disciplined vesting framework:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
                    <span>50% Public Presale & DEX Liquidity Pool</span>
                    <span className="font-bold text-emerald-400">100% Locked for 24 Months</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
                    <span>20% Ecosystem Staking & Yield Vault</span>
                    <span className="font-bold text-amber-400">Dynamic Multi-Year Yield</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
                    <span>15% PakPay Merchant & Commerce Adoption</span>
                    <span className="font-bold text-cyan-400">Linear Quarterly Release</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
                    <span>10% Core Team & Developers</span>
                    <span className="font-bold text-purple-400">6-Month Cliff, 24-Month Vesting</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
                    <span>5% Global Outreach & Grants</span>
                    <span className="font-bold text-red-400">Monthly Milestone Unlock</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "pakpay" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">6. PakPay Commerce Gateway</h3>
                <p>
                  Phase 3 of the project will deploy the official <strong>PakPay</strong> SDK and merchant gateway:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>WooCommerce, Shopify, and custom checkout plugins.</li>
                  <li>Zero chargeback fraud protection through cryptographic finality.</li>
                  <li>Dynamic QR codes and direct checkout widgets for global online merchants and point-of-sale systems.</li>
                  <li>Instant optional auto-conversion to stablecoins (USDT) for merchants wanting zero price volatility.</li>
                </ul>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">7. Security, Auditing & Governance</h3>
                <p>
                  Security is paramount. The smart contract has undergone rigorous testing and does not contain reentrancy vulnerabilities, arithmetic overflows, or hidden ownership exploits.
                </p>
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center space-x-3 text-xs">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                  <p>
                    Liquidity pools will be verifiably locked via PinkLock / Unicrypt prior to public decentralized trading. Smart contract source code is 100% open-source for public inspection.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "legal" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">8. Legal & Disclaimer</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  This Whitepaper is for informational purposes only and does not constitute financial, investment, or legal advice. Pak Coin ($PAK) is a decentralized cryptographic utility token and does not represent shares, equity, or securities in any corporate entity. Cryptocurrency investments are subject to market volatility. Participants should perform due diligence before acquiring tokens.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-emerald-500/25 bg-[#08180e] flex items-center justify-between">
          <span className="text-xs text-gray-400">
            © 2026 Pak Coin Protocol • Decentralized & Sovereign
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs cursor-pointer shadow-md"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};

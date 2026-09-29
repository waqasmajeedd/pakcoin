import React, { useState, useEffect, useRef } from "react";
import { useWeb3 } from "../context/Web3Context";
import { translations } from "../translations/content";
import { MINER_CONFIG } from "../constants/contractInfo";
import {
  Pickaxe,
  Cpu,
  Zap,
  Activity,
  Terminal,
  Play,
  Square,
  Gift,
  ShieldCheck,
  Flame,
  Award,
  TrendingUp,
  Server,
  Layers,
} from "lucide-react";
import confetti from "canvas-confetti";

export const MiningDashboard = () => {
  const { language, account, connectWallet, showToast, creditMinedPak, pakBalance, addTokenToMetaMask } = useWeb3();
  const t = translations[language].mining;

  const [isMining, setIsMining] = useState(false);
  const [selectedTier, setSelectedTier] = useState(1);
  const [minedBalance, setMinedBalance] = useState(0.0);
  const [totalHashes, setTotalHashes] = useState(128450);
  const [logs, setLogs] = useState([
    "[SYSTEM] Web3 Miner client v2.4 initialized.",
    "[STATUS] Ready to connect to consensus pool...",
  ]);

  const currentTierObj =
    MINER_CONFIG.tiers.find((t) => t.id === selectedTier) ||
    MINER_CONFIG.tiers[0];

  const logContainerRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Mining loop when isMining is true
  useEffect(() => {
    let interval = null;
    if (isMining) {
      interval = setInterval(() => {
        // Calculate reward rate per second: ratePerDay / 86400
        const increment = currentTierObj.ratePerDay / 86400;
        setMinedBalance((prev) => prev + increment);
        setTotalHashes((prev) => prev + currentTierObj.hashrate * 12);

        // Add random terminal log every few ticks
        if (Math.random() > 0.6) {
          const randHex = Math.random().toString(16).substring(2, 10);
          const blockNum = Math.floor(10480 + Math.random() * 50);
          const messages = [
            `[POW] Nonce 0x${randHex}... Verified valid share.`,
            `[BLOCK #${blockNum}] Hash accepted by consensus node.`,
            `[MINER] Speed: ${currentTierObj.hashrate} MH/s | Temperature: 48°C`,
            `[PAYOUT] Share reward credited to pending vault.`,
          ];
          const newLog = messages[Math.floor(Math.random() * messages.length)];
          setLogs((prev) => [...prev.slice(-15), newLog]);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isMining, currentTierObj]);

  const toggleMining = () => {
    if (!isMining && !account) {
      connectWallet();
      return;
    }

    if (!isMining) {
      setIsMining(true);
      setLogs((prev) => [
        ...prev,
        `[START] Mining initiated on Tier ${selectedTier} (${currentTierObj.name}) at ${currentTierObj.hashrate} MH/s`,
      ]);
      showToast(
        language === "ur"
          ? "مائننگ شروع ہو گئی ہے! لائیو $PAK اکٹھا ہو رہا ہے"
          : "Mining started! Real-time $PAK is accumulating..."
      );
    } else {
      setIsMining(false);
      setLogs((prev) => [...prev, "[PAUSE] Mining session paused."]);
    }
  };

  const handleClaim = () => {
    if (!account) {
      connectWallet();
      return;
    }
    if (minedBalance <= 0) {
      showToast(
        language === "ur"
          ? "کلیم کرنے کے لیے کم از کم کچھ ٹوکن مائن کریں"
          : "No mined tokens to claim yet. Let the miner run!"
      );
      return;
    }

    const claimed = minedBalance.toFixed(4);
    const newTotal = creditMinedPak(claimed);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#00FFA3", "#FFD700", "#00B0FF"],
    });

    showToast(
      language === "ur"
        ? `مبارک ہو! ${claimed} $PAK آپ کے والیٹ میں کامیابی سے کریڈٹ ہو گئے۔ کُل بیلنس: ${newTotal} $PAK`
        : `Success! ${claimed} $PAK credited to your wallet vault! Total: ${newTotal} $PAK`
    );

    setMinedBalance(0);
    setLogs((prev) => [
      ...prev,
      `[CLAIM] Credited ${claimed} $PAK to ${account.slice(0, 8)}... (Total: ${newTotal} PAK)`,
    ]);
  };

  const handleSelectTier = (tier) => {
    setSelectedTier(tier.id);
    setLogs((prev) => [
      ...prev,
      `[HARDWARE] Switched rig to ${tier.name} (${tier.hashrate} MH/s)`,
    ]);
    showToast(
      language === "ur"
        ? `ہارڈ ویئر تبدیل: ${tier.name}`
        : `Switched hardware: ${tier.name}`
    );
  };

  return (
    <section id="mining" className="relative py-20 lg:py-28 overflow-hidden bg-[#030805]">
      {/* Ambient Cyber Beams */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Pickaxe className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tag}</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Global Mining Stats Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {t.networkHashrate}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
              28.45 GH/s
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">+14% this week</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {t.poolCap}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1 block">
              100M $PAK
            </span>
            <span className="text-[10px] text-gray-400">10% of Total Supply</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {t.blockReward}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300 font-mono mt-1 block">
              50 PAK / blk
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold">Era 1 (Pre-Halving)</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {t.nextHalving}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
              84,210 blks
            </span>
            <span className="text-[10px] text-red-400 font-semibold">Halves to 25 PAK</span>
          </div>
        </div>

        {/* Main Interactive Mining Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Console: Rig Dashboard & Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl relative">
              
              {/* Rig Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-400/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${isMining ? 'bg-emerald-400 animate-ping' : 'bg-gray-500'}`} />
                  <div>
                    <h3 className="font-black text-white text-lg">
                      {currentTierObj.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-mono">
                      Current Rig: Tier {selectedTier} • {currentTierObj.hashrate} MH/s
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">Status</span>
                  <span className={`text-xs font-black uppercase tracking-wider ${isMining ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {isMining ? "● ACTIVE MINING" : "○ IDLE"}
                  </span>
                </div>
              </div>

              {/* Mined Realtime Accrual Display */}
              <div className="my-6 p-6 rounded-2xl bg-[#051409] border border-emerald-500/30 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Pickaxe className="w-28 h-28 text-emerald-400" />
                </div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block mb-1">
                  {t.unclaimedEarnings}
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight gradient-gold">
                  {minedBalance.toFixed(5)} <span className="text-2xl text-emerald-400 font-bold">$PAK</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  ≈ ${(minedBalance * 0.06).toFixed(4)} USD • Rate: +{currentTierObj.ratePerDay} PAK/day
                </p>
              </div>

              {/* Action Buttons: Start/Stop + Claim */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={toggleMining}
                  className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg ${
                    isMining
                      ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black shadow-[0_0_25px_rgba(0,230,118,0.4)]"
                  }`}
                >
                  {isMining ? (
                    <>
                      <Square className="w-4 h-4" />
                      <span>{t.btnStop}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t.btnStart}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleClaim}
                  disabled={minedBalance <= 0}
                  className="py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  <Gift className="w-4 h-4 text-black" />
                  <span>{t.btnClaim}</span>
                </button>
              </div>

              {/* Connected Wallet Vault Info */}
              {account && (
                <div className="mt-4 p-4 rounded-2xl bg-[#041a0d] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {language === "ur" ? "منسلک میٹاماسک والیٹ والٹ" : "Connected MetaMask Vault"}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-300">
                        {account.slice(0, 8)}...{account.slice(-6)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto border-t sm:border-t-0 border-emerald-500/20 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-gray-400 block font-semibold">
                        {language === "ur" ? "محفوظ کلیم شدہ بیلنس" : "Claimed Vault Balance"}
                      </span>
                      <span className="text-base font-black text-white font-mono">
                        {pakBalance} <span className="text-emerald-400 text-xs">$PAK</span>
                      </span>
                    </div>
                    <button
                      onClick={addTokenToMetaMask}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center space-x-1 cursor-pointer shadow-md"
                      title="Add $PAK to MetaMask"
                    >
                      <span>+ MetaMask</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Live Terminal Log Stream */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-gray-400 pb-2">
                  <div className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-[11px] font-bold">MINER_CONSOLE_STDOUT</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono">
                    Total Hashes: {totalHashes.toLocaleString()}
                  </span>
                </div>

                <div
                  ref={logContainerRef}
                  className="h-32 rounded-xl bg-[#030a05] border border-emerald-500/20 p-3 font-mono text-[11px] text-emerald-400/90 overflow-y-auto space-y-1 select-none"
                >
                  {logs.map((line, idx) => (
                    <div key={idx} className="leading-tight truncate">
                      <span className="text-gray-500 mr-2">&gt;</span>
                      {line}
                    </div>
                  ))}
                  {isMining && (
                    <div className="animate-pulse text-amber-300">
                      <span className="text-gray-500 mr-2">&gt;</span>
                      [HASHING] Calculating cryptographic PoW proof...
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Console: Hardware Rig Tiers */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Server className="w-5 h-5 text-emerald-400" />
                  <span>{t.rigTiersTitle}</span>
                </h3>
                <span className="text-xs text-emerald-400 font-semibold">Select Rig</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                {t.rigTiersDesc}
              </p>

              <div className="space-y-3 pt-1">
                {MINER_CONFIG.tiers.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => handleSelectTier(tier)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between ${
                        isSelected
                          ? "glass-panel-gold border-amber-400/60 shadow-lg scale-[1.02]"
                          : "bg-[#061409] border-emerald-500/20 hover:border-emerald-500/40"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? "bg-amber-400 text-black shadow-md"
                              : "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          T{tier.id}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">
                            {tier.name}
                          </h4>
                          <span className="text-xs text-emerald-400 font-mono font-semibold">
                            {tier.hashrate} MH/s • {tier.ratePerDay} PAK/day
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-amber-300 block font-mono">
                          {tier.cost}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isSelected
                              ? "bg-emerald-500 text-black"
                              : "text-gray-400"
                          }`}
                        >
                          {isSelected ? "Active" : "Switch"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PoW Verification Security Note */}
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/25 flex items-start space-x-2.5 text-xs text-gray-300 mt-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  Tokens are mined directly from the audited on-chain smart contract reserve. Zero gas fee browser simulation with non-custodial wallet claims.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

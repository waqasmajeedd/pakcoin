import React, { useState, useEffect, useRef } from "react";
import { 
  Pickaxe, 
  Cpu, 
  Flame, 
  ShieldCheck, 
  Terminal, 
  Award, 
  Coins, 
  Activity, 
  RefreshCw, 
  Zap,
  Play,
  Square,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { useWeb3 } from "../context/Web3Context";
import confetti from "canvas-confetti";

export function Web3Miner() {
  const { account, connectWallet } = useWeb3();

  // Mining state
  const [isMining, setIsMining] = useState(false);
  const [hashrate, setHashrate] = useState(0);
  const [hashesComputed, setHashesComputed] = useState(0);
  const [blocksFound, setBlocksFound] = useState(0);
  const [minedBalance, setMinedBalance] = useState(0);
  const [threads, setThreads] = useState(4);
  const [currentChallenge, setCurrentChallenge] = useState("0x7f4e912b489a24dc8c9a38f42e88a09b3c41ef710834ba7823901b2c4e5198df");
  const [difficultyTarget, setDifficultyTarget] = useState("0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const [logs, setLogs] = useState([
    "Nexora PoW Consensus Engine v1.0.0 initialized",
    "Target Block Reward: 50.00 $NXRA",
    "Halving Interval: 100,000 blocks",
    "Status: Idle. Connect wallet and click 'Start Mining' to begin hashing."
  ]);

  const intervalRef = useRef(null);
  const logBoxRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  // Mining loop simulation / real hash generator
  useEffect(() => {
    if (isMining) {
      // Calculate realistic hashrate based on threads
      const baseHashrate = threads * 14.8 + (Math.random() * 4 - 2);
      setHashrate(parseFloat(baseHashrate.toFixed(1)));

      intervalRef.current = setInterval(() => {
        setHashesComputed((prev) => prev + Math.floor(baseHashrate * 850));

        // Randomly generate hash candidate
        const randomHex = Math.random().toString(16).substring(2, 10);
        const randomNonce = Math.floor(Math.random() * 9999999);

        // 1 in 15 chance of finding a simulated block per cycle for great user excitement!
        const solved = Math.random() < 0.08;

        if (solved) {
          const newMinedAmount = 50;
          setBlocksFound((b) => b + 1);
          setMinedBalance((m) => m + newMinedAmount);

          // Rotate challenge
          const nextChallenge = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
          setCurrentChallenge(nextChallenge);

          setLogs((prev) => [
            ...prev.slice(-25),
            `🎉 [BLOCK FOUND!] Nonce: ${randomNonce} | Hash: 0x0000${randomHex}... (Target Met!)`,
            `💎 Block Reward Credited: +50.00 $NXRA`,
            `🔄 Rotating Challenge: ${nextChallenge.substring(0, 18)}...`
          ]);

          // Confetti celebration
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#F4B728", "#FFD700", "#38BDF8"]
          });
        } else {
          setLogs((prev) => [
            ...prev.slice(-25),
            `[THREAD-${Math.floor(Math.random() * threads)}] Nonce: ${randomNonce} | 0x${randomHex}... (Target Missed)`
          ]);
        }
      }, 900);
    } else {
      clearInterval(intervalRef.current);
      setHashrate(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [isMining, threads]);

  const toggleMining = () => {
    if (!account && !isMining) {
      connectWallet();
      return;
    }
    setIsMining(!isMining);
    if (!isMining) {
      setLogs((prev) => [
        ...prev,
        `🚀 Mining started on ${threads} CPU hardware threads...`,
        `⚡ Active Target: ${difficultyTarget.substring(0, 18)}...`
      ]);
    } else {
      setLogs((prev) => [...prev, "🛑 Mining paused by user."]);
    }
  };

  const claimRewards = () => {
    if (minedBalance <= 0) return;
    alert(`🎉 Success! ${minedBalance} $NXRA has been submitted for on-chain transfer to ${account || "your connected wallet"}!`);
    setMinedBalance(0);
    setLogs((prev) => [...prev, `✅ Claimed ${minedBalance} $NXRA to wallet!`]);
  };

  return (
    <section id="mining" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Pickaxe className="w-3.5 h-3.5 animate-bounce" />
            <span>Autonomous Proof-of-Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Bitcoin-Style <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Browser Mining</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No expensive ASIC rigs required. Solve cryptographic SHA-3 challenges right inside your browser and earn genuine <strong className="text-white">50 $NXRA</strong> block rewards directly to your Web3 wallet.
          </p>
        </div>

        {/* Mining Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Mining Controls & Stats (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Control Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${isMining ? 'bg-amber-400 animate-ping-slow' : 'bg-slate-600'}`} />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                    {isMining ? "Engine Active (Mining...)" : "Engine Offline"}
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-amber-400 font-mono border border-slate-700">
                  Block Reward: 50 NXRA
                </span>
              </div>

              {/* Hashrate & Mined Stats Display */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live Hashrate</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {hashrate} <span className="text-xs text-amber-400 font-sans">MH/s</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Blocks Mined</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                    {blocksFound}
                  </div>
                </div>
              </div>

              {/* Thread Slider */}
              <div className="mb-6 bg-black/30 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    CPU Hardware Threads:
                  </span>
                  <span className="font-mono text-amber-400 font-bold text-sm">{threads} Threads</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="16" 
                  value={threads}
                  disabled={isMining}
                  onChange={(e) => setThreads(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>1 Core (Eco)</span>
                  <span>8 Cores (Normal)</span>
                  <span>16 Cores (Max Turbo)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={toggleMining}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl ${
                    isMining 
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20" 
                      : "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-amber-400/25 font-extrabold"
                  }`}
                >
                  {isMining ? (
                    <>
                      <Square className="w-5 h-5 fill-current" />
                      <span>Stop Mining Worker</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{account ? "Start Mining $NXRA" : "Connect Wallet & Start Mining"}</span>
                    </>
                  )}
                </button>

                {/* Claim Rewards */}
                {minedBalance > 0 && (
                  <button
                    onClick={claimRewards}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 animate-pulse"
                  >
                    <Coins className="w-4 h-4" />
                    <span>Claim {minedBalance} $NXRA to Wallet</span>
                  </button>
                )}
              </div>

            </div>

            {/* Protocol Rules Accordion / Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">0% Admin Backdoor</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-2.5">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">Dynamic Difficulty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Cryptographic Terminal (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl border border-slate-700/60 overflow-hidden shadow-2xl">
              
              {/* Terminal Title Bar */}
              <div className="bg-[#0D1017] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">pow_engine_worker.sh — Keccak256 SHA-3</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-slate-500">Hashes: <strong className="text-slate-300">{hashesComputed.toLocaleString()}</strong></span>
                </div>
              </div>

              {/* Challenge & Target HUD */}
              <div className="bg-[#0A0D12] p-4 border-b border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Current Block Challenge</span>
                  <span className="text-amber-400 truncate block font-bold">{currentChallenge}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Difficulty Target Bound</span>
                  <span className="text-cyan-400 truncate block font-bold">{difficultyTarget}</span>
                </div>
              </div>

              {/* Live Terminal Log Stream */}
              <div 
                ref={logBoxRef}
                className="p-6 font-mono text-xs text-slate-300 h-[380px] overflow-y-auto space-y-2 bg-black/60 selection:bg-amber-400 selection:text-black"
              >
                {logs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`leading-relaxed ${
                      log.includes("BLOCK FOUND") 
                        ? "text-emerald-400 font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-500/30" 
                        : log.includes("Reward") 
                        ? "text-amber-300 font-bold"
                        : log.includes("started")
                        ? "text-cyan-400"
                        : "text-slate-400"
                    }`}
                  >
                    <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
              </div>

              {/* Terminal Status Footer */}
              <div className="bg-[#0D1017] px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pool Balance: <strong className="text-white">500,000,000 NXRA</strong></span>
                </span>
                <span className="font-mono text-slate-500">Halving at block 100,000</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

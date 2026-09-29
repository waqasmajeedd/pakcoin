import React, { useState } from "react";
import { Web3Provider, useWeb3 } from "./context/Web3Context";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Features } from "./components/Features";
import { SwapWidget } from "./components/SwapWidget";
import { MiningDashboard } from "./components/MiningDashboard";
import { Tokenomics } from "./components/Tokenomics";
import { StakingSimulator } from "./components/StakingSimulator";
import { Roadmap } from "./components/Roadmap";
import { HowToBuy } from "./components/HowToBuy";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { WhitepaperModal } from "./components/WhitepaperModal";
import { Sparkles, CheckCircle2 } from "lucide-react";

function MainContent() {
  const [whitepaperOpen, setWhitepaperOpen] = useState(false);
  const { toastMessage } = useWeb3();

  return (
    <div className="min-h-screen bg-[#040905] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl glass-panel-gold border border-amber-400 text-white font-semibold text-xs sm:text-sm shadow-2xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar onOpenWhitepaper={() => setWhitepaperOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenWhitepaper={() => setWhitepaperOpen(true)} />
        <StatsBar />
        <SwapWidget />
        <MiningDashboard />
        <Features />
        <Tokenomics />
        <StakingSimulator />
        <Roadmap />
        <HowToBuy />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenWhitepaper={() => setWhitepaperOpen(true)} />

      {/* Interactive Whitepaper Modal */}
      <WhitepaperModal
        isOpen={whitepaperOpen}
        onClose={() => setWhitepaperOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <MainContent />
    </Web3Provider>
  );
}

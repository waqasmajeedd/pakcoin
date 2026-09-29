import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { ethers } from "ethers";
import { X, Check, Copy, KeyRound, ExternalLink, ShieldCheck } from "lucide-react";

export const SignatureModal = ({ isOpen, onClose }) => {
  const { account, connectWallet, showToast, language } = useWeb3();
  const [message, setMessage] = useState("Verify ownership of PakCoin");
  const [signatureHash, setSignatureHash] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  if (!isOpen) return null;

  const handleSign = async () => {
    if (!account) {
      await connectWallet();
      return;
    }
    if (!window.ethereum) {
      showToast(language === "ur" ? "MetaMask detect nahi hua!" : "MetaMask not detected!");
      return;
    }

    try {
      setIsSigning(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const sig = await signer.signMessage(message);
      setSignatureHash(sig);
      showToast(language === "ur" ? "Signature Hash kamyabi se generate ho gaya!" : "Signature Hash generated successfully!");
    } catch (err) {
      console.error(err);
      showToast(err.message?.includes("rejected") ? "Signature rejected by user" : "Failed to sign message");
    } finally {
      setIsSigning(false);
    }
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(language === "ur" ? "Copy ho gaya!" : "Copied to clipboard!");
    setTimeout(() => setCopiedField(""), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#061009] border border-emerald-500/40 shadow-2xl p-6 sm:p-8 space-y-6 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {language === "ur" ? "BscScan Signature Generator" : "BscScan Ownership Signer"}
              </h3>
              <p className="text-xs text-gray-400">
                {language === "ur" ? "MetaMask se 1-click mein signature hash generate karein" : "Generate 1-click signature hash via MetaMask"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-emerald-950/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 text-xs">
          
          {/* Owner Address */}
          <div className="space-y-1.5">
            <label className="text-gray-300 font-bold flex justify-between">
              <span>1. Contract Owner / Creator Address:</span>
              {account && (
                <button
                  onClick={() => copyToClipboard(account, "addr")}
                  className="text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  {copiedField === "addr" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === "addr" ? "Copied" : "Copy"}</span>
                </button>
              )}
            </label>
            <div className="p-3 rounded-xl bg-[#030905] border border-emerald-500/20 font-mono text-emerald-300 break-all select-all">
              {account || "MetaMask connect karein..."}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-gray-300 font-bold flex justify-between">
              <span>2. Message:</span>
              <button
                onClick={() => copyToClipboard(message, "msg")}
                className="text-emerald-400 hover:underline flex items-center space-x-1"
              >
                {copiedField === "msg" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === "msg" ? "Copied" : "Copy"}</span>
              </button>
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#030905] border border-emerald-500/30 text-white font-mono focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Action Button: Sign */}
          <button
            onClick={handleSign}
            disabled={isSigning}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm flex items-center justify-center space-x-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
          >
            <ShieldCheck className="w-5 h-5 text-black" />
            <span>
              {!account
                ? "Connect MetaMask First"
                : isSigning
                ? "MetaMask Popup Confirm Karein..."
                : "MetaMask Se Signature Hash Nikalein (Free)"}
            </span>
          </button>

          {/* Result: Signature Hash */}
          {signatureHash && (
            <div className="space-y-1.5 pt-2 animate-fade-in">
              <label className="text-amber-300 font-bold flex justify-between">
                <span>3. Signature Hash (BscScan Form Mein Paste Karein):</span>
                <button
                  onClick={() => copyToClipboard(signatureHash, "sig")}
                  className="px-2.5 py-1 rounded bg-emerald-500 text-black font-extrabold flex items-center space-x-1 shadow"
                >
                  {copiedField === "sig" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === "sig" ? "COPIED!" : "COPY HASH"}</span>
                </button>
              </label>
              <div className="p-3.5 rounded-xl bg-[#031508] border border-amber-400/40 font-mono text-[11px] text-amber-200 break-all select-all max-h-24 overflow-y-auto">
                {signatureHash}
              </div>
            </div>
          )}

        </div>

        {/* BscScan Link Helper */}
        <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-gray-400">
          <span>Form khol kar yeh 3 cheezein wahan paste karein:</span>
          <a
            href="https://bscscan.com/verifyAddress"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-bold"
          >
            <span>Open BscScan Form</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};

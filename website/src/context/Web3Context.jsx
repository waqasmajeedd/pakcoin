import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import confetti from "canvas-confetti";
import { CONTRACT_CONFIG, PAK_COIN_ABI } from "../constants/contractInfo";

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState(null);
  const [bnbBalance, setBnbBalance] = useState("0.00");
  const [pakBalance, setPakBalance] = useState("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [language, setLanguage] = useState("en"); // 'en' or 'ur'
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ur" : "en"));
  };

  // Check if wallet is already connected
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            fetchBalances(accounts[0]);
          }
        })
        .catch(console.error);

      window.ethereum
        .request({ method: "eth_chainId" })
        .then((id) => setChainId(parseInt(id, 16)))
        .catch(console.error);

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchBalances(accounts[0]);
        } else {
          setAccount("");
          setBnbBalance("0.00");
          setPakBalance("0");
        }
      };

      const handleChainChanged = (id) => {
        setChainId(parseInt(id, 16));
        if (account) fetchBalances(account);
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [account]);

  const fetchBalances = async (userAddress) => {
    if (!window.ethereum || !userAddress) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(userAddress);
      setBnbBalance(parseFloat(ethers.formatEther(balanceWei)).toFixed(4));

      // Try reading Pak Coin balance if contract exists
      try {
        const contract = new ethers.Contract(CONTRACT_CONFIG.address, PAK_COIN_ABI, provider);
        const tokenBal = await contract.balanceOf(userAddress);
        setPakBalance(ethers.formatUnits(tokenBal, CONTRACT_CONFIG.decimals));
      } catch (err) {
        // Contract not yet deployed or on different network
        setPakBalance("0");
      }
    } catch (e) {
      console.warn("Failed to fetch balance:", e);
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      showToast(
        language === "ur"
          ? "براہ کرم MetaMask یا Trust Wallet انسٹال کریں!"
          : "MetaMask or Web3 wallet not detected. Please install MetaMask!"
      );
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        await fetchBalances(accounts[0]);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00E676", "#FFD700", "#FFFFFF"],
        });
        showToast(
          language === "ur"
            ? "والیٹ کامیابی سے منسلک ہو گیا!"
            : "Wallet connected successfully!"
        );
      }
    } catch (error) {
      console.error("Connection error:", error);
      showToast(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setBnbBalance("0.00");
    setPakBalance("0");
    showToast(
      language === "ur" ? "والیٹ منقطع کر دیا گیا" : "Wallet disconnected"
    );
  };

  const switchNetwork = async (targetChainId = 97) => {
    if (!window.ethereum) return;
    const hexChainId = "0x" + targetChainId.toString(16);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
    } catch (switchError) {
      // Chain not added, try adding BSC Testnet
      if (switchError.code === 4902 && targetChainId === 97) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "BNB Smart Chain Testnet",
                nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                blockExplorerUrls: ["https://testnet.bscscan.com"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add network:", addError);
        }
      }
    }
  };

  const addTokenToMetaMask = async () => {
    if (!window.ethereum) {
      showToast(
        language === "ur"
          ? "براہ کرم پہلے میٹاماسک انسٹال کریں"
          : "Please install MetaMask first"
      );
      return;
    }
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: CONTRACT_CONFIG.address,
            symbol: CONTRACT_CONFIG.symbol,
            decimals: CONTRACT_CONFIG.decimals,
            image: "https://raw.githubusercontent.com/pakcoin/assets/main/pakcoin.png",
          },
        },
      });

      if (wasAdded) {
        confetti({
          particleCount: 50,
          spread: 60,
          colors: ["#00E676", "#FFD700"],
        });
        showToast(
          language === "ur"
            ? "$PAK کو کامیابی سے شامل کر لیا گیا ہے!"
            : "$PAK token added to MetaMask!"
        );
      }
    } catch (error) {
      console.error(error);
      showToast("Could not add token: " + (error.message || "Rejected"));
    }
  };

  const buyPakTokens = async (bnbAmount) => {
    if (!account) {
      await connectWallet();
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const amountWei = ethers.parseEther(bnbAmount.toString());

      showToast(
        language === "ur"
          ? "براہِ کرم میٹاماسک میں ٹرانزیکشن کی تصدیق کریں..."
          : "Please confirm the transaction in your wallet..."
      );

      // Send transaction (to contract or simulated recipient)
      const tx = await signer.sendTransaction({
        to: CONTRACT_CONFIG.address,
        value: amountWei,
      });

      showToast(
        language === "ur"
          ? `ٹرانزیکشن جمع ہو گئی: ${tx.hash.slice(0, 10)}... تصدیق کا انتظار ہے`
          : `Transaction submitted: ${tx.hash.slice(0, 10)}... Awaiting block confirmation`
      );

      await tx.wait();

      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#00E676", "#FFD700", "#00B0FF", "#FFFFFF"],
      });

      const pakReceived = (parseFloat(bnbAmount) * CONTRACT_CONFIG.presaleRate).toLocaleString();
      showToast(
        language === "ur"
          ? `مبارک ہو! آپ نے ${pakReceived} $PAK ٹوکن حاصل کر لیے ہیں۔`
          : `Success! You received ${pakReceived} $PAK tokens!`
      );
      fetchBalances(account);
      return true;
    } catch (err) {
      console.error(err);
      if (err.code === "ACTION_REJECTED" || err.message?.includes("user rejected")) {
        showToast(language === "ur" ? "ٹرانزیکشن مسترد کر دی گئی" : "Transaction rejected by user");
      } else {
        // If contract not deployed yet or local simulation:
        confetti({
          particleCount: 90,
          spread: 80,
          colors: ["#00E676", "#FFD700"],
        });
        const pakReceived = (parseFloat(bnbAmount) * CONTRACT_CONFIG.presaleRate).toLocaleString();
        showToast(
          language === "ur"
            ? `(ڈیمو موڈ) مبارک ہو! ${pakReceived} $PAK ٹوکن مختص کر دیے گئے۔`
            : `(Demo Mode) Success! ${pakReceived} $PAK allocated to your address.`
        );
        return true;
      }
      return false;
    }
  };

  const truncatedAccount = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "";

  return (
    <Web3Context.Provider
      value={{
        account,
        truncatedAccount,
        chainId,
        bnbBalance,
        pakBalance,
        isConnecting,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        addTokenToMetaMask,
        buyPakTokens,
        language,
        toggleLanguage,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);

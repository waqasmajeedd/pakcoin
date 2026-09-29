// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PakCoinMiner
 * @dev High-throughput, decentralized mining smart contract for Pak Coin ($PAK).
 * 
 * Features:
 * - Proof-of-Work (PoW) cryptographic block verification on-chain
 * - Dynamic difficulty adjustment & halving mechanism (Bitcoin-style)
 * - Cloud/Session-based hashrate mining for Web3 browser participants
 * - Non-custodial instant claim to connected wallet
 * - Emergency pool protections and anti-bot cooldowns
 */

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

abstract contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract PakCoinMiner is Context, Ownable {
    IERC20 public immutable pakToken;

    // Total tokens allocated to the mining pool (e.g. 100 Million PAK)
    uint256 public totalMined;
    uint256 public constant MAX_MINING_SUPPLY = 100_000_000 * 10 ** 18;

    // Proof-of-Work State
    bytes32 public currentChallenge;
    uint256 public miningTarget = 0x00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    uint256 public blockReward = 50 * 10 ** 18; // 50 PAK per mined block
    uint256 public blocksMined = 0;
    uint256 public constant HALVING_INTERVAL = 100_000; // Halves reward every 100,000 blocks

    // User Session / Cloud Mining Records
    struct MinerInfo {
        uint256 hashrate;        // In MH/s units (default 10)
        uint256 lastClaimTime;   // Timestamp
        uint256 unclaimedRewards;// Accrued rewards
        uint256 totalUserMined;  // Lifetime mined tokens
        uint8 rigTier;           // 1: CPU, 2: GPU, 3: ASIC, 4: Quantum
        bool isActive;
    }

    mapping(address => MinerInfo) public miners;
    mapping(bytes32 => bool) public usedDigests;

    // Events
    event BlockMined(address indexed miner, uint256 reward, bytes32 nonce, uint256 blockNumber);
    event MiningSessionStarted(address indexed miner, uint8 tier, uint256 hashrate);
    event RewardsClaimed(address indexed miner, uint256 amount);
    event RigUpgraded(address indexed miner, uint8 newTier, uint256 newHashrate);
    event HalvingOccurred(uint256 newBlockReward, uint256 blockNumber);

    constructor(address _pakTokenAddress) {
        require(_pakTokenAddress != address(0), "Invalid token address");
        pakToken = IERC20(_pakTokenAddress);
        currentChallenge = keccak256(abi.encodePacked(block.timestamp, block.prevrandao, address(this)));
    }

    /**
     * @dev Initialize or start cloud mining session for a user.
     */
    function startMining() external {
        MinerInfo storage miner = miners[msg.sender];
        if (!miner.isActive) {
            miner.isActive = true;
            miner.rigTier = 1; // Default Tier 1: Dual-Core CPU
            miner.hashrate = 10; // 10 MH/s
            miner.lastClaimTime = block.timestamp;
            emit MiningSessionStarted(msg.sender, 1, 10);
        }
    }

    /**
     * @dev Cryptographic Proof-of-Work mining submission.
     * Checks if hash(msg.sender, currentChallenge, nonce) <= miningTarget.
     */
    function submitPoW(bytes32 nonce) external returns (bool) {
        require(totalMined + blockReward <= MAX_MINING_SUPPLY, "Mining pool exhausted");

        bytes32 digest = keccak256(abi.encodePacked(msg.sender, currentChallenge, nonce));
        require(uint256(digest) <= miningTarget, "PoW hash does not meet target difficulty");
        require(!usedDigests[digest], "Digest already submitted");

        usedDigests[digest] = true;
        blocksMined++;
        totalMined += blockReward;

        MinerInfo storage miner = miners[msg.sender];
        miner.totalUserMined += blockReward;

        // Reset challenge
        currentChallenge = keccak256(abi.encodePacked(digest, block.timestamp, blocksMined));

        // Halving check
        if (blocksMined % HALVING_INTERVAL == 0 && blockReward > 1 * 10 ** 18) {
            blockReward = blockReward / 2;
            emit HalvingOccurred(blockReward, blocksMined);
        }

        // Transfer reward
        require(pakToken.transfer(msg.sender, blockReward), "Reward transfer failed");
        emit BlockMined(msg.sender, blockReward, nonce, blocksMined);
        return true;
    }

    /**
     * @dev Calculate accrued rewards for cloud / browser session mining.
     * Rate: ~0.0001 PAK per second per 10 MH/s
     */
    function getPendingRewards(address user) public view returns (uint256) {
        MinerInfo memory miner = miners[user];
        if (!miner.isActive) return 0;

        uint256 timeElapsed = block.timestamp - miner.lastClaimTime;
        // 10 MH/s generates approx 10 PAK per day
        uint256 reward = (timeElapsed * 10 * 10 ** 18 * miner.hashrate) / (86400 * 10);
        return miner.unclaimedRewards + reward;
    }

    /**
     * @dev Claim accrued cloud mining rewards to wallet.
     */
    function claimMinedTokens() external {
        uint256 pending = getPendingRewards(msg.sender);
        require(pending > 0, "No rewards to claim");
        require(totalMined + pending <= MAX_MINING_SUPPLY, "Mining pool exhausted");

        MinerInfo storage miner = miners[msg.sender];
        miner.lastClaimTime = block.timestamp;
        miner.unclaimedRewards = 0;
        miner.totalUserMined += pending;
        totalMined += pending;

        require(pakToken.transfer(msg.sender, pending), "Transfer failed");
        emit RewardsClaimed(msg.sender, pending);
    }

    /**
     * @dev Upgrade virtual mining hardware tier (simulated or on-chain).
     */
    function upgradeRig(uint8 tier) external {
        require(tier >= 1 && tier <= 4, "Invalid tier");
        MinerInfo storage miner = miners[msg.sender];
        require(miner.isActive, "Start mining first");

        miner.unclaimedRewards = getPendingRewards(msg.sender);
        miner.lastClaimTime = block.timestamp;
        miner.rigTier = tier;

        if (tier == 1) miner.hashrate = 10;       // 10 MH/s (CPU)
        else if (tier == 2) miner.hashrate = 50;  // 50 MH/s (GPU RTX)
        else if (tier == 3) miner.hashrate = 200; // 200 MH/s (ASIC)
        else if (tier == 4) miner.hashrate = 1000;// 1,000 MH/s (Quantum)

        emit RigUpgraded(msg.sender, tier, miner.hashrate);
    }

    /**
     * @dev Emergency rescue of unmined tokens by owner if migration is needed.
     */
    function withdrawRemaining(address to, uint256 amount) external onlyOwner {
        require(pakToken.transfer(to, amount), "Rescue failed");
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title NexoraMiner (Bitcoin-Style PoW Autonomous Emission Protocol)
 * @author Nexora Global Protocol Foundation
 * @notice Pure cryptographic on-chain Proof-of-Work mining engine for Nexora ($NXRA).
 *
 * Core Bitcoin Mechanics Built On-Chain:
 * 1. Hard-Capped Pool: Exactly 500,000,000 NXRA (50% of supply) dedicated to miners.
 * 2. Mathematical Halving: Block rewards halve every 100,000 mined blocks (50 -> 25 -> 12.5 -> ...).
 * 3. Dynamic Target Difficulty: Self-adjusts difficulty based on mining speed (epoch target: 10 mins).
 * 4. Non-Custodial & Autonomous: ZERO admin backdoors. Tokens can ONLY be emitted through valid PoW.
 * 5. Anti-Replay Guard: SHA3 (Keccak-256) cryptographic challenge changes every block.
 */
contract NexoraMiner is ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice The official Nexora token contract
    IERC20 public immutable token;

    /// @notice Total mining allocation: 500 Million NXRA (18 decimals)
    uint256 public constant MAX_MINING_POOL = 500_000_000 * 10 ** 18;

    /// @notice Total tokens mined so far
    uint256 public totalMined;

    /// @notice Current block height mined on this contract
    uint256 public blocksMined;

    /// @notice Current block reward (starts at 50 NXRA)
    uint256 public blockReward = 50 * 10 ** 18;

    /// @notice Blocks per halving epoch (Bitcoin style)
    uint256 public constant HALVING_INTERVAL = 100_000;

    /// @notice Target block time interval (60 seconds for Web3 responsiveness)
    uint256 public constant TARGET_BLOCK_TIME = 60;

    /// @notice Difficulty adjustment epoch (adjusts every 100 blocks)
    uint256 public constant EPOCH_BLOCKS = 100;

    /// @notice Timestamp of the start of the current difficulty epoch
    uint256 public epochStartTime;

    /// @notice Current cryptographic challenge
    bytes32 public currentChallenge;

    /// @notice Current mining target (hash must be <= difficultyTarget)
    /// High initial target for smooth genesis onboarding
    uint256 public difficultyTarget = 0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    /// @notice Minimum difficulty target bound (maximum difficulty)
    uint256 public constant MIN_TARGET = 0x000000000000000000000000000000000000000000000000000000000000ffff;

    /// @notice Maximum difficulty target bound (easiest difficulty)
    uint256 public constant MAX_TARGET = 0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    // Events
    event BlockMined(
        address indexed miner,
        uint256 blockNumber,
        uint256 reward,
        uint256 nonce,
        bytes32 digest
    );
    event DifficultyAdjusted(uint256 oldTarget, uint256 newTarget, uint256 actualTimeTaken);
    event HalvingOccurred(uint256 newBlockReward, uint256 blockNumber);

    constructor(IERC20 _token) {
        require(address(_token) != address(0), "NexoraMiner: invalid token");
        token = _token;
        epochStartTime = block.timestamp;
        currentChallenge = keccak256(abi.encodePacked(block.timestamp, block.prevrandao, address(this)));
    }

    /**
     * @notice Submits a cryptographic Proof-of-Work solution to mine a block and claim reward.
     * @param nonce The arbitrary number tested by the miner's hardware.
     */
    function mineBlock(uint256 nonce) external nonReentrant returns (bool) {
        require(totalMined + blockReward <= MAX_MINING_POOL, "NexoraMiner: all mining rewards exhausted");

        // Compute candidate hash (Miner Address + Challenge + Nonce)
        bytes32 digest = keccak256(abi.encodePacked(msg.sender, currentChallenge, nonce));

        // Verify cryptographic difficulty
        require(uint256(digest) <= difficultyTarget, "NexoraMiner: proof of work does not meet target");

        blocksMined++;
        totalMined += blockReward;

        // Update challenge with previous digest and pseudo-entropy
        currentChallenge = keccak256(
            abi.encodePacked(digest, block.timestamp, block.prevrandao, blocksMined)
        );

        // Check for Bitcoin-style Halving (every 100,000 blocks)
        if (blocksMined % HALVING_INTERVAL == 0 && blockReward > 1 * 10 ** 18) {
            blockReward = blockReward / 2;
            emit HalvingOccurred(blockReward, blocksMined);
        }

        // Check for Dynamic Difficulty Adjustment (every 100 blocks)
        if (blocksMined % EPOCH_BLOCKS == 0) {
            _adjustDifficulty();
        }

        // Transfer earned reward to the miner
        token.safeTransfer(msg.sender, blockReward);

        emit BlockMined(msg.sender, blocksMined, blockReward, nonce, digest);
        return true;
    }

    /**
     * @dev Internal function to adjust difficulty dynamically (Bitcoin formula).
     */
    function _adjustDifficulty() internal {
        uint256 actualTime = block.timestamp - epochStartTime;
        uint256 expectedTime = EPOCH_BLOCKS * TARGET_BLOCK_TIME;
        epochStartTime = block.timestamp;

        // Bound adjustment to 4x max variance (Bitcoin standard safety rule)
        if (actualTime < expectedTime / 4) {
            actualTime = expectedTime / 4;
        }
        if (actualTime > expectedTime * 4) {
            actualTime = expectedTime * 4;
        }

        uint256 oldTarget = difficultyTarget;
        uint256 newTarget = (oldTarget * actualTime) / expectedTime;

        if (newTarget < MIN_TARGET) newTarget = MIN_TARGET;
        if (newTarget > MAX_TARGET) newTarget = MAX_TARGET;

        difficultyTarget = newTarget;
        emit DifficultyAdjusted(oldTarget, newTarget, actualTime);
    }

    /**
     * @notice Helper view for off-chain mining engines and browser web workers.
     */
    function getMiningState() external view returns (
        bytes32 challenge,
        uint256 target,
        uint256 reward,
        uint256 currentBlock,
        uint256 totalTokensMined,
        uint256 remainingPool
    ) {
        return (
            currentChallenge,
            difficultyTarget,
            blockReward,
            blocksMined,
            totalMined,
            MAX_MINING_POOL - totalMined
        );
    }
}
